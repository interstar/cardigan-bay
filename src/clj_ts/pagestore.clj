(ns clj-ts.pagestore
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as string]
            [clj-ts.logic :as ldb]
            [clj-ts.embed :as embed]

            [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
            [com.walmartlabs.lacinia.schema :as schema]

            [clj-rss.core :as rss]
            [fsquery.core :as fsquery]
            [fsquery.fsnode :as fsnode]
            [clj-ts.common :as common]
            ))

;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))

;; State management

(def page-store-state
  (atom {:page-dir "./bedrock/"
         :wiki-name "Yet Another CardiganBay Wiki"
         :site-url "/"
         :git-repo "default"
         }))

(defn set-state! [key val]
  (swap! page-store-state assoc key val))


(defn set-wiki-name! [wname]
  (set-state! :wiki-name wname))

(defn set-site-url! [url]
  (set-state! :site-url url))


;; Basic functions

(defn page-name->file-name [page-name]
  (let [mkname (fn [path] (str path (string/lower-case page-name) ".md"))]
    (-> @page-store-state :page-dir mkname)))


(defn dedouble [s] (string/replace s #"\/\/" "/"))

(defn page-name->url [page-name]
  (dedouble (str (-> @page-store-state :site-url) "/view/" page-name))
  )


(defn page-exists? [p-name]
  (.exists (io/file (page-name->file-name p-name))))

(defn get-page-from-file [p-name]
  (slurp (page-name->file-name p-name)))




(defn regenerate-db! []
  (ldb/regenerate-db! (-> @page-store-state :page-dir)) )



;; RecentChanges
;; We store recent-changes in a page called "systemrecentchanges".

(defn update-recent-changes! [pagename]
  (let [pn "systemrecentchanges"
        fnm (page-name->file-name pn)
        rcc (get-page-from-file pn)
        filter-step (fn [xs] (filter #(not (string/includes? % (str "[[" pagename "]]"))) xs ) )
        curlist (-> rcc string/split-lines filter-step )
        newlist (cons
                 (str "* [[" pagename "]] (" (.toString (java.util.Date.)) ")")
                 curlist
                 )
        ]
    (spit fnm (string/join "\n" (take 30 newlist)))))


(defn write-page-to-file! [p-name body]
  (do
    (spit (page-name->file-name p-name) body)
    (update-recent-changes! p-name)
    (regenerate-db!)
    ))

(defn update-pagedir! [new-pd]
  (let [path (dedouble (str new-pd "/.git") )
        git? (.exists (io/file path))]
    (swap! page-store-state assoc :page-dir new-pd)
    (swap! page-store-state assoc :git-repo git?)
    (regenerate-db!)))


(defn cwd [] (-> @page-store-state :page-dir))



;; Logic delegation

(defn raw-db [] (ldb/raw-db))

(defn all-pages [] (ldb/all-pages))

(defn links [] (ldb/links))

(defn broken-links [] (ldb/broken-links))

(defn orphans [] (ldb/orphans))


;; Card Processing

(defn server-eval [data]
  (let [code (read-string data)
        evaluated
        (try
          (#(apply str (eval code)))
          (catch Exception e
            (let [sw (new java.io.StringWriter)
                  pw (new java.io.PrintWriter sw) ]
              (.printStackTrace e pw)
              (str "Exception :: " (.getMessage e) (-> sw .toString) ))))]
    evaluated
    ))



(defn ldb-query->mdlist-card [i result qname f]
  (let [items (apply str (map f result))]
    (common/package-card i qname :markdown
                  (str "*" (count result) " items*\n\n" items ) )))

(defn item1 [s] (str "* [[" s "]]\n"))


(defn system-card [i data]
  (let [info (read-string data)
        cmd (:command info)]
    (condp = cmd
      :allpages
      (ldb-query->mdlist-card i (all-pages) :allpages item1)

      :alllinks
      (ldb-query->mdlist-card
       i (links) :alllinks
       (fn [[a b]] (str "* [[" a "]] **->** [[" b "]]\n")))


      :brokenlinks
      (ldb-query->mdlist-card
       i (broken-links) :brokenlinks
       (fn [[a b]] (str "* [[" a "]] **X->** [[" b "]]\n")))

      :orphanpages
      (ldb-query->mdlist-card
       i (orphans) :orphanpages item1)

      :about
      (common/package-card i :system :markdown
                    (str "### System Information

**Wiki Name**,, " (-> @page-store-state :wiki-name  )  "
**PageStore Directory** (relative to code) ,, " (-> @page-store-state :page-dir) "
**Is Git Repo?**  ,, " (-> @page-store-state :git-repo) "
**Site Url Root** ,, " (-> @page-store-state :site-url) ))

      ;; not recognised
      (common/package-card i :system :raw (str "Not recognised system command in " data  " -- cmd " cmd )))
    ))


(defn transclude [i data]
  (let [{:keys [from process]} (read-string data)
        raw (get-page-from-file from)
        return-type (if (nil? process) :markdown process)
        head (str "*Transcluded from [[" from "]]* \n")]
    (common/package-card i :transclude return-type (str head raw))
    ))

(defn process-card [i card]
  (let [[type, data] (common/raw-card->type-and-data card)]
    (condp = type
      :markdown (common/package-card i type :markdown data)
      :raw (common/package-card i type :raw data)
      :evalraw
      (common/package-card i type :raw (server-eval data))

      :evalmd
      (common/package-card i type :markdown (server-eval data))

      :system
      (system-card i data)

      :embed
      (common/package-card i type :html (embed/process data))

      :transclude
      (transclude i data)

      ;; not recognised
      (common/package-card i type type data)
      )))

(defn raw->cards [raw]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards)))

(defn load->cards [page-name]
  (-> page-name
      get-page-from-file
      raw->cards))


;; GraphQL resolvers

(defn resolve-raw-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (page-exists? page_name)
      {:page_name page_name
       :body (get-page-from-file page_name)}
      {:page_name page_name
       :body "PAGE DOES NOT EXIST"})))


(defn resolve-cooked-page [context arguments value]
  (let [{:keys [page_name]} arguments
        wiki-name (-> @page-store-state :wiki-name)
        site-url (-> @page-store-state :site-url)]

    (if (page-exists? page_name)
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :cards (load->cards page_name)
       :editable true}
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :editable true
       :cards (raw->cards "PAGE DOES NOT EXIST")
       })))




;; [schema-file (io/file (System/getProperty "user.dir") "clj_ts/gql_schema.edn")]
(def pagestore-schema
  (-> "gql_schema.edn"
      io/resource
      slurp

      edn/read-string


      (attach-resolvers {:resolve-raw-page resolve-raw-page
                         :resolve-cooked-page resolve-cooked-page
                         })
      schema/compile))


;; RecentChanges as RSS

(defn rss-recent-changes []
  (let [make-link (fn [s]
                    (let [m (re-matches #"\* \[\[(\S+)\]\] (\(.+\))" s)
                          [pname date] [(second m) (nth m 2)]]
                      {:title (str pname " changed on " date)
                       :link (page-name->url pname)}
                      ))
        rc (-> (get-page-from-file "systemrecentchanges")
               string/split-lines
               (#(map make-link %)))]
    (rss/channel-xml {:title "RecentChanges"
                      :link (-> @page-store-state :site-url)
                      :description "Recent Changes in CardiganBay Wiki"}
                     rc
                     )))

;; transforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (get-page-from-file page-name)
        new-body (str page-body "----
:" type "
" body)]
    (write-page-to-file! page-name new-body )))



(defn find-card-by-hash [page-name hash]
  (common/find-card-by-hash (load->cards) hash)
)


(defn append-to-card! [page-name hash extra]
  (let [cards (load->cards)
        card (find-card-by-hash page-name hash)
]
    (if (nil? card)
      (throw (Exception. (str "No card with hash " hash " in cards : " (pr-str cards)) ))

      (let [new-cards (common/append-to-card-by-hash cards hash extra)])
      )
    ))
