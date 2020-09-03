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
  (future
    (set-state! :facts-db (ldb/regenerate-db (server-state)))) )

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



(defn ldb-query->mdlist-card [i title result qname f]
  (let [items (apply str (map f result))
        body (str "*" title "* " "*(" (count result) " items)*\n\n" items )  ]
    (common/package-card i :system :markdown body body)))

(defn item1 [s] (str "* [[" s "]]\n"))


(defn system-card [i data]
  (let [info (read-string data)
        cmd (:command info)]
    (condp = cmd
      :allpages
      (ldb-query->mdlist-card i "All Pages" (all-pages) :allpages item1)

      :alllinks
      (ldb-query->mdlist-card
       i "All Links" (links) :alllinks
       (fn [[a b]] (str "* [[" a "]] **->** [[" b "]]\n")))


      :brokenlinks
      (ldb-query->mdlist-card
       i "Broken Internal Links" (broken-links) :brokenlinks
       (fn [[a b]] (str "* [[" a "]] **X->** [[" b "]]\n")))

      :orphanpages
      (ldb-query->mdlist-card
       i "Orphan Pages" (orphans) :orphanpages item1)

      :about
      (let [sr (str "### System Information

**Wiki Name**,, " (-> (server-state) :wiki-name  )  "
**PageStore Directory** (relative to code) ,, " (-> (server-state) :page-dir) "
**Is Git Repo?**  ,, " (-> (server-state) :git-repo) "
**Site Url Root** ,, " (-> (server-state) :site-url) )]
        (common/package-card i :system :markdown sr sr))

      ;; not recognised
      (let [d (str "Not recognised system command in " data  " -- cmd " cmd )]
        (common/package-card i :system :raw d d )))
    ))


(defn transclude [i data]
  (let [{:keys [from process]} (read-string data)
        raw (-> from (#(pagestore/read-page (server-state) %)) )
        return-type (if (nil? process) :markdown process)
        head (str "*Transcluded from [[" from "]]* \n")
        body (str head raw)]
    (common/package-card i :transclude return-type body body)))

(defn process-card [i card]
  (let [[source-type, data] (common/raw-card->type-and-data card)]
    (condp = source-type
      :markdown (common/package-card i source-type :markdown data data)
      :raw (common/package-card i source-type :raw data data)
      :evalraw
      (common/package-card i :evalraw :raw data (server-eval data))

      :evalmd
      (common/package-card i :evalmd :markdown data (server-eval data))

      :system
      (system-card i data)

      :embed
      (common/package-card i source-type :html data (embed/process data))

      :transclude
      (transclude i data)

      ;; not recognised
      (common/package-card i source-type source-type data data)
      )))

(defn raw->cards [raw]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards)))


(declare backlinks)

(defn load->cards [page-name]
  (-> page-name
      (#(pagestore/read-page (server-state) %))
      raw->cards
      ))

(defn generate-system-cards [page-name]
 [(backlinks page-name)] )

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-card [context arguments value]
  "Not yet tested"
  (let [{:keys [page_name hash]} arguments]
    (if (pagestore/page-exists? (server-state) page_name)
      (-> (load->cards page_name)
          (common/find-card-by-hash hash))
      (common/package-card 0 :markdown :markdown
                           (str "Card " hash " doesn't exist in " page_name)
                           (str "Card " hash " doesn't exist in " page_name)))))

(defn resolve-source-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (pagestore/page-exists? (server-state) page_name)
      {:page_name page_name
       :body (pagestore/read-page (server-state) page_name)}
      {:page_name page_name
       :body "PAGE DOES NOT EXIST"})))


(defn resolve-page [context arguments value]
  (let [{:keys [page_name]} arguments
        wiki-name (-> (server-state) :wiki-name)
        site-url (-> (server-state) :site-url)]

    (if (pagestore/page-exists? (server-state) page_name)
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :cards (load->cards page_name)
       :system_cards (generate-system-cards page_name)
       }
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :cards (raw->cards "PAGE DOES NOT EXIST")
       :system_cards []
       })))



;; [schema-file (io/file (System/getProperty "user.dir") "clj_ts/gql_schema.edn")]
(def pagestore-schema
  (-> "gql_schema.edn"
      io/resource
      slurp

      edn/read-string

      (attach-resolvers {:resolve-source-page resolve-source-page
                         :resolve-page resolve-page
                         :resolve-card resolve-card
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
  (ldb-query->mdlist-card "backlinks" "Backlinks" (links-to page-name) :calculated
                          (fn [[a b]] (str "* [[" a "]] \n"))))



;; transforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (try
                    (pagestore/read-page (server-state) page-name)
                    (catch Exception e (str "New page : " page-name "\n\n"))
                    )
        new-body (str page-body "----
" type "
" body)]
    (write-page-to-file! page-name new-body )))


(defn move-card [page-name hash destination-name]
  (let [from-cards (load->cards page-name)
        card (common/find-card-by-hash from-cards hash)
        stripped (into [] (common/remove-card-by-hash from-cards hash))
        stripped_raw (common/cards->raw stripped)
        ]
    (if (not (nil? card))
      (do
        (append-card-to-page! destination-name (:source_type card) (:source_data card))
        (write-page-to-file! page-name stripped_raw)))))
