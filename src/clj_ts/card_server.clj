(ns clj-ts.card-server
  [:require
   [clojure.string :as string]
   [clojure.pprint :refer [pprint]]

   [clj-ts.logic :as ldb]
   [clj-ts.pagestore :as pagestore]
   [clj-ts.common :as common]
   [clj-ts.types :as types]
   [clj-ts.embed :as embed]


   [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
   [com.walmartlabs.lacinia.schema :as schema]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [clj-rss.core :as rss]
   ]
  (:import (java.net InetAddress)
           (java.net DatagramSocket))

  )



;; Card Server State is ALL the global state for the application.
;; NOTHING mutable should be stored anywhere else but in the card-server-state atom.

;; Card Server state is just a defrecord.
;; But two components : the page-store and page-exporter are
;; deftypes in their own right.
;; page-store has all the file-system information that the wiki reads and writes.
;; page-exporter the other info for exporting flat files

(defprotocol ICardServerRecord)



(defmacro dnn [cs m & args]
  `(let [db# (:facts-db ~cs)]
     (if (nil? db#) :not-available
         (. db# ~m ~@args))
     ))



(defrecord CardServerRecord
    [wiki-name site-url port-no start-page facts-db page-store page-exporter]

  ldb/IFactsDb
  (raw-db [cs] (dnn cs raw-db))
  (all-pages [cs] (dnn cs all-pages) )
  (all-links [cs] (dnn cs all-links) )
  (broken-links [cs] (dnn cs broken-links))
  (orphan-pages [cs] (dnn cs orphan-pages))
  (links-to [cs p-name] (dnn cs links-to p-name))

)



;; State Management is done at the card-server level

(def the-server-state  (atom :dummy))

(defn initialize-state! [wiki-name site-url port-no start-page logic-db page-store page-exporter]
  (reset! the-server-state
          (->CardServerRecord
           wiki-name
           site-url
           port-no
           start-page
           logic-db
           page-store
           page-exporter) )
  )

(defn server-state
  "Other modules should always get the card-server data through calling this function.
  Rather than relying on knowing the name of the atom"
  [] @the-server-state)

(defn set-state!
  "The official API call to update any of the key-value pairs in the card-server state"
  [key val]
  (swap! the-server-state assoc key val))

;; convenience functions for updating state
(defn set-wiki-name! [wname]
  (set-state! :wiki-name wname))

(defn set-site-url! [url]
  (set-state! :site-url url))

(defn set-start-page! [pagename]
  (set-state! :start-page pagename))

(defn set-port! [port]
  (set-state! :port-no port))

(defn set-facts-db! [facts]
  {:pre [(satisfies? ldb/IFactsDb facts)]}
  (set-state! :facts-db facts))

(defn set-page-store! [page-store]
  {:pre [(satisfies? types/IPageStore page-store)]}
  (set-state! :page-store page-store))

(defn set-page-exporter! [page-exporter]
  {:pre [(= (type page-exporter) types/IPageExporter)]}
  (set-state! :page-exporer page-exporter))



;; PageStore delegation

(declare regenerate-db!)

(defn write-page-to-file! [p-name body]
  (do
    (pagestore/write-page-to-file! (server-state) p-name body)
    (regenerate-db!)
    ))


(defn update-pagedir! [new-pd new-ed]
  (let [new-ps
        (pagestore/make-page-store
         new-pd
         new-ed)]
    (set-page-store! new-ps)
    (regenerate-db!)))

(defn page-exists? [page-name]
  (-> (.page-store (server-state))
      (.page-exists? page-name)))

(defn read-page [page-name]
  (-> (.page-store (server-state))
      (.read-page page-name)))



;; Logic delegation

(defn regenerate-db! []
  (future
    (println "Starting to rebuild logic db")
    (let [f (ldb/regenerate-db (server-state)) ]
      (set-facts-db! f )
      (println "Finished building logic db"))) )





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
        cmd (:command info)
        db (-> (server-state) :facts-db)
        ps (-> (server-state) :page-store)]

    (condp = cmd
      :allpages
      (ldb-query->mdlist-card i "All Pages" (.all-pages db) :allpages item1)

      :alllinks
      (ldb-query->mdlist-card
       i "All Links" (.all-links db) :alllinks
       (fn [[a b]] (str "[[" a "]],, &#8594;,, [[" b "]]\n")))

      :brokenlinks
      (ldb-query->mdlist-card
       i "Broken Internal Links" (.broken-links db) :brokenlinks
       (fn [[a b]] (str "[[" a "]],, &#8603;,, [[" b "]]\n")))

      :orphanpages
      (ldb-query->mdlist-card
       i "Orphan Pages" (.orphan-pages db) :orphanpages item1)

      :recentchanges
      (let [src (.read-recentchanges ps) ]
        (common/package-card
         "recentchanges" :system :markdown src src))

      :search
      (let [res (pagestore/text-search (server-state) (.all-pages db)
                                       (re-pattern (:query info)))
            out
            (str "*Searching pages containing \" " (:query info) "\"*\n "
                 (apply str (map #(str "* [[" % "]]\n") res))) ]


        (common/package-card (str "search " i) :system :markdown out out))

      :about
      (let [sr (str "### System Information

**Wiki Name**,, " (:wiki-name (server-state)   )  "
**PageStore Directory** (relative to code) ,, " (.page-path ps) "
**Is Git Repo?**  ,, " (.git-repo? ps) "
**Site Url Root** ,, " (:site-url (server-state)) "
**Export Dir** ,, " (.export-path ps) "
**Number of Pages** ,, " (count (.all-pages db))


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

(defn afind [n ns]
  (cond (empty? ns) nil
        (= n (-> ns first first))
        (-> ns first rest)
        :otherwise (afind n (rest ns))))

(defn network-card [i data for-export?]
  (try
    (let [nodes (-> data read-string :nodes)
          arcs (-> data read-string :arcs)
          links (-> data read-string :links)
          node (fn [[n x y]]
                 (let [[node-target node-label] (get links n [n n])
                       inner
                       (str "<text class='wikilink' data='" node-target "'  x='" x "' y='" (+ y 20)
                            "' text-anchor=\"middle\" fill=\"black\">" node-label "</text>"
                            ) ]
                   (str "<circle cx='" x "' cy='" y "'
stroke=\"green\" r=\"20\" stroke-width=\"2\" fill=\"yellow\" />"
                        (if for-export?
                          (str "<a href='./" node-target "'>"
                               inner
                               "</a>")
                          inner
                          ))))
          arc (fn [[n1 n2]]
                (let
                    [a1 (afind n1 nodes)
                     a2 (afind n2 nodes)]
                  (if
                      (and a1 a2)
                    (let [[x1 y1] a1
                          [x2 y2] a2]
                      (str  "<line x1='" x1 "' y1='" y1 "' x2='" x2 "' y2='" y2 "' stroke=\"#000\"
  stroke-width=\"2\" marker-end=\"url(#arrowhead)\"/>")
                      )
                    "")))
          svg (str "<svg width=\"500\" height=\"400\">
<defs>
    <marker id=\"arrowhead\" markerWidth=\"10\" markerHeight=\"7\"
    refX=\"-5\" refY=\"3.5\" orient=\"auto\">
      <polygon points=\"-5 0, 0 3.5, -5 7\" />
    </marker>
  </defs>
"
                   (apply str
                          (map arc arcs))
                   (apply str
                          (map node nodes )
                          )

                   "</svg>")
          ]

      (common/package-card i :network :markdown data svg)
      )
    (catch Exception e (common/package-card i :network :markdown data (str e)))
    )
  )

(defn process-card
  [i card for-export?]
  (let [[source-type, data] (common/raw-card->type-and-data card)]
    (condp = source-type
      :markdown (common/package-card i source-type :markdown data data)
      :manual-copy (common/package-card i source-type :manual-copy data data)

      :raw (common/package-card i source-type :raw data data)
      :evalraw
      (common/package-card i :evalraw :raw data (server-eval data))

      :evalmd
      (common/package-card i :evalmd :markdown data (server-eval data))

      :workspace
      (common/package-card i source-type :workspace data data)

      :system
      (system-card i data)

      :embed
      (common/package-card i source-type :html data
                           (embed/process data for-export?
                                          (fn [s] (common/md->html s))
                                          (server-state)))

      :transclude
      (transclude i data)

      :bookmark
      (common/package-card i :bookmark :markdown data (bookmark-card data))


      :network
      (network-card i data for-export?)

      ;; not recognised
      (common/package-card i source-type source-type data data)
      )))

(defn raw->cards [raw for-export?]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards (repeat for-export?))))


(declare backlinks)

(defn load->cards [page-name]
  (-> (server-state) .page-store
      (.read-page page-name)
      (raw->cards false))
  )

(defn load->cards-for-export [page-name]
  (-> (server-state) .page-store
      (.read-page page-name)
      (raw->cards true)))

(defn generate-system-cards [page-name]
 [(backlinks page-name)] )

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-text-search [context arguments value]
  (let [{:keys [query_string]} arguments

        res (pagestore/text-search (server-state)
                                   (.all-pages (-> (server-state)
                                                   :facts-db))
                                   (re-pattern query_string))
        out
        (str "*Pages containing \" " query_string "\"*\n "
             (apply str (map #(str "* [[" % "]]\n") res))) ]

    {:result_text out}
    ))

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
        ps (:page-store (server-state))
        wiki-name (:wiki-name (server-state))
        site-url (:site-url (server-state))
        port (:port-no (server-state))
        ip (try
             (let [dgs (new DatagramSocket)]
               (.connect dgs (InetAddress/getByName "8.8.8.8") 10002)
               (-> dgs .getLocalAddress .getHostAddress))

             (catch Exception e (str e))
            )

        ]

    (if (.page-exists? ps page_name)
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :port port
       :ip ip
       :cards (load->cards page_name)
       :system_cards (generate-system-cards page_name)
       }
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :port port
       :ip ip
       :cards (raw->cards "PAGE DOES NOT EXIST" :false)
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
                         :resolve-text-search resolve-text-search
                         })
      schema/compile))


;; RecentChanges as RSS

(defn rss-recent-changes [link-fn]
  (let [ps (:page-store (server-state))
        make-link (fn [s]
                    (let [m (re-matches #"\* \[\[(\S+)\]\] (\(.+\))" s)
                          [pname date] [(second m) (nth m 2)]]
                      {:title (str pname " changed on " date)
                       :link (link-fn pname)}
                      ))
        rc (-> (.read-recentchanges ps)
               string/split-lines
               (#(map make-link %)))]
    (rss/channel-xml {:title "RecentChanges"
                      :link (-> (server-state) :site-url)
                      :description "Recent Changes in CardiganBay Wiki"}
                     rc
                     )))


;; Backlinks

(defn backlinks [page-name]
  (let [bl (.links-to (server-state) page-name)]
    (cond
      (= bl :not-available)
      (common/package-card
       :backlinks :system :markdown
       "Backlinks Not Available"
       "Backlinks Not Available")

      (= bl '())
      (common/package-card
       :backlinks :system :markdown
       "No Backlinks"
       "No Backlinks")

      :otherwise
      (ldb-query->mdlist-card
       "backlinks" "Backlinks" bl
       :calculated
       (fn [[a b]] (str "* [[" a "]] \n"))))))



;; trasforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (try
                    (pagestore/read-page (server-state) page-name)
                    (catch Exception e (str "New page : " page-name "\n\n"))
                    )
        new-body (str page-body "----
" type "
" body)]
    (write-page-to-file! page-name new-body )))

(defn prepend-card-to-page! [page-name type body]
  (let [page-body (try
                    (pagestore/read-page (server-state) page-name)
                    (catch Exception e (str "New page : " page-name "\n\n"))
                    )
        new-body (str
                      "----
" type "
" body "

----
"
                      page-body)
        ]
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


;;;; Media files

(defn load-media-file [file-name]
  (-> (server-state) :page-store (.load-media-file file-name)))

;;file (io/file (System/getProperty "user.dir") (str "." uri))
