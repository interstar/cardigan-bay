(ns clj-ts.pagestore
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as string]
            [clj-ts.logic :as ldb]
            [clj-ts.embed :as embed]

            [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
            [com.walmartlabs.lacinia.schema :as schema]

            [clj-rss.core :as rss]

            [clj-ts.common :as common]
            ))

;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))

;; State management

(def page-store-state
  (atom {}))

(defn set-state! [key val]
  (swap! page-store-state assoc key val))


(defn set-wiki-name! [wname]
  (set-state! :wiki-name wname))

(defn set-site-url! [url]
  (set-state! :site-url url))


;; Basic functions

(defn page-name->file-path [page-name]
  (let [mdn (str (string/lower-case page-name) ".md")]

    (-> @page-store-state :page-dir
        (#(.resolve % mdn)) )))


(defn dedouble [s] (string/replace s #"\/\/" "/"))

(defn page-name->url [page-name]
  (dedouble (str (-> @page-store-state :site-url) "/view/" page-name))
  )


(defn page-exists? [p-name]
  (-> (page-name->file-path p-name) .toFile .exists))


(defn read-page [page]
  (do
    (if (instance? java.nio.file.Path page)
      (-> page .toFile slurp)
      (-> page page-name->file-path .toFile slurp))))

(defn write-page! [page data]
  (if (instance? java.nio.file.Path page)
    (spit page data)
    (-> page  page-name->file-path .toFile (spit data))))


(defn regenerate-db! []
  (ldb/regenerate-db! (-> @page-store-state :page-dir)) )



;; RecentChanges
;; We store recent-changes in a page called "systemrecentchanges".

(defn update-recent-changes! [pagename]
  (let [pn "systemrecentchanges"
        rcc (read-page pn)
        file-path (page-name->file-path pn)

        filter-step (fn [xs] (filter #(not (string/includes? % (str "[[" pagename "]]"))) xs ) )
        curlist (-> rcc string/split-lines filter-step )
        newlist (cons
                 (str "* [[" pagename "]] (" (.toString (java.util.Date.)) ")")
                 curlist
                 )
        ]
    (spit file-path (string/join "\n" (take 30 newlist)))))


(defn write-page-to-file! [p-name body]
  (do
    (write-page! p-name body)
    (update-recent-changes! p-name)
    (regenerate-db!)
    ))

(defn update-pagedir! [new-pd]
  (do
    (assert (instance? java.nio.file.Path new-pd)
            (str "update-pagedir! received "
                 new-pd " which is not a Java Path"))
    (let [git-path (.resolve new-pd ".git")
          git? (-> git-path .toFile .exists)]
      (swap! page-store-state assoc :page-dir new-pd)
      (swap! page-store-state assoc :git-repo git?)
      (regenerate-db!))))


(defn cwd [] (-> @page-store-state :page-dir))



;; Logic delegation

(defn raw-db [] (ldb/raw-db))

(defn all-pages [] (ldb/all-pages))

(defn links [] (ldb/links))

(defn broken-links [] (ldb/broken-links))

(defn orphans [] (ldb/orphans))

(defn links-to [target] (ldb/links-to target))


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
        raw (-> from read-page)
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


(declare backlinks)

(defn load->cards [page-name]
  (-> page-name
      read-page
      raw->cards
      (concat [(backlinks page-name)])))

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-cooked-card [context arguments value]
  (let [{:keys [page_name hash]} arguments]
    (if (page-exists? page_name)
      (-> (load->cards page_name)
          (common/find-card-by-hash hash))
      (common/package-card 0 :markdown :markdown
                           (str "Card " hash " doesn't exist in " page_name)))))

(defn resolve-raw-card [context arguments value]
  (-> (resolve-cooked-card context arguments value) (common/card->raw)))

(defn resolve-raw-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (page-exists? page_name)
      {:page_name page_name
       :body (read-page page_name)}
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
                         :resolve-raw-card resolve-raw-card
                         :resolve-cooked-card resolve-cooked-card
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
        rc (-> (read-page "systemrecentchanges")
               string/split-lines
               (#(map make-link %)))]
    (rss/channel-xml {:title "RecentChanges"
                      :link (-> @page-store-state :site-url)
                      :description "Recent Changes in CardiganBay Wiki"}
                     rc
                     )))


;; Backlinks

(defn backlinks [page-name]
  (ldb-query->mdlist-card "backlinks" (links-to page-name) :calculated
                          (fn [[a b]] (str "* [[" a "]] \n"))))



;; transforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (read-page page-name)
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
