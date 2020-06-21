(ns clj-ts.card-server
  [:require
   [clojure.string :as string]

   [clj-ts.logic :as ldb]
   [clj-ts.pagestore :as pagestore]
   [clj-ts.common :as common]
   [clj-ts.embed :as embed]



   [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
   [com.walmartlabs.lacinia.schema :as schema]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [clj-rss.core :as rss]
   ])


;; State Management is done at the card-server level

(def card-server-state
  (atom {:start-page "HelloWorld"}))


(defn server-state []
  ;; THIS IS THE DEFINITIVE REPRESENTATION OF CARD-SERVER STATE TO BE SHARED BETWEEN MODULES
  {:wiki-name (-> @card-server-state :wiki-name)
   :site-url (-> @card-server-state :site-url)
   :facts-db (-> @card-server-state :facts-db)
   :page-dir (-> @card-server-state :page-dir)
   :git-repo? (-> @card-server-state :git-repo?)
   :start-page (-> @card-server-state :start-page)
   })

(defn set-state! [key val]
  (swap! card-server-state assoc key val))


(defn set-wiki-name! [wname]
  (set-state! :wiki-name wname))

(defn set-site-url! [url]
  (set-state! :site-url url))

(defn set-facts-db! [facts]
  (set-state! :facts-db))

(defn set-start-page! [pagename]
  (set-state! :start-page pagename))




;; PageStore delegation

(declare regenerate-db!)

(defn write-page-to-file! [p-name body]
  (do
    (pagestore/write-page-to-file! (server-state) p-name body)
    (regenerate-db!)
    ))


(defn update-pagedir! [new-pd]
  (do
    (pagestore/assert-valid new-pd "card-server/update-pagedir!")
    (let [git-path (.resolve new-pd ".git")
          git? (-> git-path .toFile .exists)]
      (swap! card-server-state assoc :page-dir new-pd)
      (swap! card-server-state assoc :git-repo? git?)
      (regenerate-db!)
      )))

(defn page-exists? [page-name]
  (pagestore/page-exists? (server-state) page-name))

(defn read-page [page-name]
  (pagestore/read-page (server-state) page-name))

(defn cwd [] (pagestore/cwd (server-state)))

;; Logic delegation

(defn regenerate-db! []
  (set-state! :facts-db (ldb/regenerate-db (server-state))) )

(defn raw-db [] (-> (server-state) :facts-db))

(defn all-pages [] (ldb/all-pages (server-state)))

(defn links [] (ldb/links (server-state)))

(defn broken-links [] (ldb/broken-links (server-state)))

(defn orphans [] (ldb/orphans (server-state)))

(defn links-to [target] (ldb/links-to (server-state) target))



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

**Wiki Name**,, " (-> (server-state) :wiki-name  )  "
**PageStore Directory** (relative to code) ,, " (-> (server-state) :page-dir) "
**Is Git Repo?**  ,, " (-> (server-state) :git-repo) "
**Site Url Root** ,, " (-> (server-state) :site-url) ))

      ;; not recognised
      (common/package-card i :system :raw (str "Not recognised system command in " data  " -- cmd " cmd )))
    ))


(defn transclude [i data]
  (let [{:keys [from process]} (read-string data)
        raw (-> from (#(pagestore/read-page (server-state) %)) )
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
      (#(pagestore/read-page (server-state) %))
      raw->cards
      (concat [(backlinks page-name)])))

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-cooked-card [context arguments value]
  (let [{:keys [page_name hash]} arguments]
    (if (pagestore/page-exists? (server-state) page_name)
      (-> (load->cards page_name)
          (common/find-card-by-hash hash))
      (common/package-card 0 :markdown :markdown
                           (str "Card " hash " doesn't exist in " page_name)))))

(defn resolve-raw-card [context arguments value]
  (-> (resolve-cooked-card context arguments value) (common/card->raw)))

(defn resolve-raw-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (pagestore/page-exists? (server-state) page_name)
      {:page_name page_name
       :body (pagestore/read-page (server-state) page_name)}
      {:page_name page_name
       :body "PAGE DOES NOT EXIST"})))


(defn resolve-cooked-page [context arguments value]
  (let [{:keys [page_name]} arguments
        wiki-name (-> (server-state) :wiki-name)
        site-url (-> (server-state) :site-url)]

    (if (pagestore/page-exists? (server-state) page_name)
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
                       :link (pagestore/page-name->url (server-state) pname)}
                      ))
        rc (-> (pagestore/read-page (server-state) "systemrecentchanges")
               string/split-lines
               (#(map make-link %)))]
    (rss/channel-xml {:title "RecentChanges"
                      :link (-> (server-state) :site-url)
                      :description "Recent Changes in CardiganBay Wiki"}
                     rc
                     )))


;; Backlinks

(defn backlinks [page-name]
  (ldb-query->mdlist-card "backlinks" (links-to page-name) :calculated
                          (fn [[a b]] (str "* [[" a "]] \n"))))



;; transforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (pagestore/read-page (server-state) page-name)
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
