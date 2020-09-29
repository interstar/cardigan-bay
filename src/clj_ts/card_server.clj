(ns clj-ts.card-server
  [:require
   [clojure.string :as string]
   [clojure.pprint :refer [pprint]]

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



;; Card Server State is ALL the global state for the application.
;; NOTHING mutable should be stored anywhere else but in the card-server-state atom.

;; The data is in the format of something that implements the CardServer protocol,
;; Currently a CardServerRecord which contains a map of the stateful data

;; The reason for this is that some of these pieces of data can either be given
;; explicitly OR if they aren't explicitly given, defaults can be calculated
;; from other data.

;; For example, a directory for exporting flat copies of pages can be given explicitly
;; Or if not, is calculated as being the "/exported/" subdirectory of the page-dir

;; The reason for the CardServerRecord, then, rather than a standard map,
;; is that we can encapsulate all these decisions (what the defaults are and how to
;; calculate them) in one place and hide them within accessors of the class.
;; Other parts of the code don't need to know one way or the other whether the data
;; they are accessing was explicitly put into the record or if it a calculated default.


(defprotocol CardServer
  (wiki-name [cs])
  (site-url [cs])
  (port-no [cs])
  (facts-db [cs])

  (start-page [cs])
  (page-store [cs])
  (page-exporter [cs])

  (as-map [cs])
  )


(deftype CardServerRecord [cs-rec]
  CardServer
  (wiki-name [cs]
    (:wiki-name cs-rec "Yet Another CardiganBay Wiki"))
  (site-url [cs]
    (:site-url cs-rec "/"))
  (port-no [cs]
    (:port-no cs-rec 4545))
  (facts-db [cs]
    (:facts-db cs-rec))

  (start-page [cs]
    (:start-page cs-rec "HelloWorld"))

  (page-store [cs]
    {:pre (assert (not (nil? (:page-store cs-rec))))}
    (:page-store cs-rec))

  (page-exporter [cs]
    {:pre [(not (nil? (:page-exporter cs-rec)))]}
    (:page-exporter)
    )



  (as-map [cs]
    {:wiki-name (wiki-name cs)
     :site-url (site-url cs)
     :port-no (port-no cs)
     :facts-db (facts-db cs)

     :start-page (start-page cs)
     :page-store (-> (page-store cs) .as-map)
     :page-exporter (-> (page-exporter cs) .as-map)
     })
  )



;; State Management is done at the card-server level

(def card-server-state
  (atom (new CardServerRecord {:start-page "HelloWorld" :git-repo? false})))


(defn server-state
  "Other modules should always get the card-server data through calling this function.
  Rather than relying on knowing the name of the atom"
  [] @card-server-state)

(defn set-state!
  "The official API call to update any of the key-value pairs in the card-server state"
  [key val]
  (let [current (-> (server-state) .as-map)
        new-state (assoc current key val)]
    (reset! card-server-state (CardServerRecord. new-state))
))

;; convenience functions for updating state
(defn set-wiki-name! [wname]
  (set-state! :wiki-name wname))

(defn set-site-url! [url]
  (set-state! :site-url url))


(defn set-facts-db! [facts]
  (set-state! :facts-db))

(defn set-start-page! [pagename]
  (set-state! :start-page pagename))


(defn set-port! [port]
  (set-state! :port-no port))

(defn set-page-store! [page-store]
  {:pre [(= (type page-store) common/IPageStore)]}
  (set-state! :page-store page-store))

(defn set-page-exporter! [page-exporter]
  {:pre [(= (type page-exporter) common/IPageExporter)]}
  (set-state! :page-exporer page-exporter))

;; PageStore delegation

(declare regenerate-db!)

(defn write-page-to-file! [p-name body]
  (let [ps (.page-store (server-state))]
    (.write-page-to-file! ps p-name body)
    (regenerate-db!)
    ))


(defn update-pagedir! [new-pd new-ed]
  (let [
        new-ps (pagestore/make-page-store
                new-pd
                new-ed)]
    (set-page-store! new-ps)
    (regenerate-db!)
    ))

(defn page-exists? [page-name]
  (-> (.page-store (server-state))
      (.page-exists? page-name)))

(defn read-page [page-name]
  (-> (.page-store (server-state))
      (.read-page page-name)))


;; Logic delegation

(defn regenerate-db! []
  (future
    (set-state! :facts-db (ldb/regenerate-db (server-state)))
    (println "Finished building logic db")) )

(defn raw-db [] (-> (server-state) .facts-db))

(defn all-pages [] (ldb/all-pages (server-state)))

(defn links [] (ldb/links (server-state)))

(defn broken-links [] (ldb/broken-links (server-state)))

(defn orphans [] (ldb/orphans (server-state)))

(defn links-to [target] (ldb/links-to (server-state) target))



;; Card Processing

(defn server-eval
  "Evaluate Clojure code embedded in a card. Evaluated on the server. Be careful."
  [data]
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

      :recentchanges
      (let [src (pagestore/load-recent-changes) ]
        (common/package-card
         "recentchanges" :system :markdown src src))

      :about
      (let [ps (.page-store (server-state))
            sr (str "### System Information

**Wiki Name**,, " (-> (server-state) .wiki-name  )  "
**PageStore Directory** (relative to code) ,, " (:page-path ps) "
**Is Git Repo?**  ,, " (:git-repo? ps) "
**Site Url Root** ,, " (:site-url ps) "
**Export Dir** ,, " (:export-path ps)
                    )]
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

(defn bookmark-card [data]
  (let [{:keys [url timestamp]} (read-string data)]
    (str "
Bookmarked " timestamp  ",, <" url ">

")))

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

      :bookmark
      (common/package-card i :bookmark :markdown data (bookmark-card data))

      ;; not recognised
      (common/package-card i source-type source-type data data)
      )))

(defn raw->cards [raw]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards)))


(declare backlinks)

(defn load->cards [page-name]
  (-> page-name
      (-> (server-state) .page-store (.read-page page-name))
      raw->cards
      ))

(defn generate-system-cards [page-name]
 [(backlinks page-name)] )

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-card
    "Not yet tested"
  [context arguments value]
  (let [{:keys [page_name hash]} arguments
        ps (.page-store (server-state))]
    (if (.page-exists? ps page_name)
      (-> (load->cards page_name)
          (common/find-card-by-hash hash))
      (common/package-card 0 :markdown :markdown
                           (str "Card " hash " doesn't exist in " page_name)
                           (str "Card " hash " doesn't exist in " page_name)))))

(defn resolve-source-page [context arguments value]
  (let [{:keys [page_name]} arguments
        ps (.page-store (server-state))]
    (if (.page-exists? ps page_name)
      {:page_name page_name
       :body (pagestore/read-page (server-state) page_name)}
      {:page_name page_name
       :body "PAGE DOES NOT EXIST"})))


(defn resolve-page [context arguments value]
  (let [{:keys [page_name]} arguments
        ps (-> (server-state) .page-store)
        wiki-name (-> (server-state) .wiki-name)
        site-url (-> (server-state) .site-url)
        port (-> (server-state) .port-no)]

    (if (.page-exists? ps page_name)
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :port port
       :cards (load->cards page_name)
       :system_cards (generate-system-cards page_name)
       }
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :port port
       :cards (raw->cards "PAGE DOES NOT EXIST")
       :system_cards
       (let [sim-names (map
                        #(str "\n- [[" % "]]")
                        (.similar-page-names
                         ps page_name))  ]
         (if (empty? sim-names) []
             [(common/package-card
               :similarly_name_pages :system :markdown ""
               (str "Here are some similarly named pages :"
                    (apply str sim-names)))]))
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

(defn reorder-card [page-name hash direction]
  (let [cards (load->cards page-name)
        new-cards (if (= "up" direction)
          (common/move-card-up cards hash)
          (common/move-card-down cards hash))
        ]
    (write-page-to-file! page-name (common/cards->raw new-cards))))
