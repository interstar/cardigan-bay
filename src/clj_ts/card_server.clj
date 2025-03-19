(ns clj-ts.card-server
  [:require
   [clojure.string :as string]
   [clojure.pprint :refer [pprint]]

   [clj-ts.logic :as ldb]
   [clj-ts.pagestore :as pagestore]
   [clj-ts.common :as common]
   [clj-ts.types :as types]
   [clj-ts.embed :as embed]
   [clj-ts.patterning :as patterning]

   [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
   [com.walmartlabs.lacinia.schema :as schema]
   [clojure.java.io :as io]
   [clojure.edn :as edn]
   [clj-rss.core :as rss]

   [sci.core :as sci]

   [hiccup.core :refer [html]]


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
  (links-to [cs p-name] (dnn cs links-to p-name)))





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



;; Useful for errors

(defn exception-stack [e]
  (let [sw (new java.io.StringWriter)
        pw (new java.io.PrintWriter sw)]
    (.printStackTrace e pw)
    (str "Exception :: " (.getMessage e) (-> sw .toString) ))  )

;; Other functions

(defn search [term]
  (let [db (-> (server-state) :facts-db)
        all-pages (.all-pages db)

        name-res (pagestore/name-search (server-state) all-pages
                                        (re-pattern term))

        count-names (count name-res)

        res (pagestore/text-search (server-state) all-pages
                                   (re-pattern term))

        count-res (count res)

        name-list (apply str (map #(str "* [[" % "]]\n") name-res))
        res-list (apply str (map #(str "* [[" % "]]\n") res))


        out
        (str "

*" count-names " PageNames containing \"" term "\"*\n
" name-list "

*" count-res " Pages containing \" " term "\"*\n "
             res-list
            )]

    out
    )
  )

;; Card Processing

;; We're going to use a map to store flags and other gubbins needed
;; in the rendering pipeline. Particularly to track whether we're
;; doing something in a normal rendering context or an export context
;; And whether a card is system generated or human generated.

;; We'll call it render-context
;; {:for-export false :user-authored? true}

(defn server-eval
  "Evaluate Clojure code embedded in a card. Evaluated with SCI
   but on the server. I hope there's no risk for this ...
   BUT ..."
  [data page-data]
  (let [code data
        evaluated
        (try
          (#(apply str (sci/eval-string code 
                                       {:bindings {'page-data page-data}})))
          (catch Exception e (exception-stack e)))]
    evaluated
    ))

(defn server-eval-hiccup
  "Evaluate Clojure code that returns hiccup, then convert to HTML"
  [data page-data]
  (try
    (let [result (sci/eval-string data {:bindings {'page-data page-data}})]
      (if (and (vector? result) (keyword? (first result)))
        (html result)
        (str "<div class='error'>Code did not return valid hiccup. Got: " 
             (with-out-str (pprint result)) "</div>")))
    (catch Exception e
      (str "<div class='error'><h3>Error evaluating code</h3><pre>" 
           (exception-stack e) "</pre></div>"))))

(defn server-custom-script
  "Evaluate a script from system/custom/ with arguments"
  [data]
  (do
    (println "In server-custom-script")
    (str "This will (eventually) run a custom script: " data))
  )


(defn ldb-query->mdlist-card [i source_data title result qname f render-context]
  (let [items (apply str (map f result))
        body (str "*" title "* " "*(" (count result) " items)*\n\n" items )  ]
    (common/package-card i :system :markdown source_data body render-context)))

(defn item1 [s] (str "* [[" s "]]\n"))

(defn file-link [data]
  (let [{:keys [file-name label] } (-> data read-string)]
    (str "<a href='" "/media/" file-name "'>"
         (if label label file-name)
         "</a>")
    ))


(defn system-card [i data render-context]
  (let [
        info (read-string data)
        cmd (:command info)
        db (-> (server-state) :facts-db)
        ps (-> (server-state) :page-store)]

    (condp = cmd
      :allpages
      (ldb-query->mdlist-card i data "All Pages" (.all-pages db) :allpages item1 render-context)

      :alllinks
      (ldb-query->mdlist-card
       i data "All Links" (.all-links db) :alllinks
       (fn [[a b]] (str "[[" a "]],, &#8594;,, [[" b "]]\n"))
       render-context)

      :brokenlinks
      (ldb-query->mdlist-card
       i data "Broken Internal Links" (.broken-links db) :brokenlinks
       (fn [[a b]] (str "[[" a "]],, &#8603;,, [[" b "]]\n"))
       render-context)

      :orphanpages
      (ldb-query->mdlist-card
       i data "Orphan Pages" (.orphan-pages db) :orphanpages item1
       render-context)

      :recentchanges
      (let [src (.read-recentchanges ps) ]
        (common/package-card
         "recentchanges" :system :markdown src src render-context))

      :search
      (let [res (search (:query info) ) ]
        (common/package-card
         "search" :system :markdown
         data res render-context))

      :about
      (let [sr (str "### System Information

**Wiki Name**,, " (:wiki-name (server-state)   )  "
**PageStore Directory** (relative to code) ,, " (.page-path ps) "
**Is Git Repo?**  ,, " (.git-repo? ps) "
**Site Url Root** ,, " (:site-url (server-state)) "
**Export Dir** ,, " (.export-path ps) "
**Number of Pages** ,, " (count (.all-pages db))
                    )]
        (common/package-card i :system :markdown data sr render-context))

      :customscript
      (let [return-type (or (:return-type data) :markdown)
            sr (server-custom-script data) ]
        (common/package-card i :customscript return-type data sr render-context))


      :filelist
      (let  [file-names
             (-> (.page-store (server-state))
                 .media-list)
             file-list
             (str "<ul>\n"
                  (apply
                   str
                   (map #(str "<li> <a href='/media/" %  "'>" % "</a></li>\n")
                        file-names))
                  "</ul>") ]
        (common/package-card i :system :html data file-list render-context))


      ;; not recognised
      (let [d (str "Not recognised system command in " data  " -- cmd " cmd )]
        (common/package-card i :system :raw data d render-context)))
    ))



(declare card-maps->processed)

(defn transclude [i data render-context]
  (let [{:keys [from process ids]} (read-string data)
        ps (.page-store (server-state))
        matched-cards (.get-cards-from-page ps from ids)
        cards (card-maps->processed (* 100 i) matched-cards render-context)

        body (str "### Transcluded from [[" from "]]")
        ]
    (concat [(common/package-card i :transclude :markdown body body render-context)] cards )))

(defn bookmark-card [data]
  (let [{:keys [url timestamp]} (read-string data)]
    (str "
Bookmarked " timestamp  ": <" url ">

")))



(defn afind [n ns]
  (cond (empty? ns) nil
        (= n (-> ns first first))
        (-> ns first rest)
        :otherwise (afind n (rest ns))))




;;; Network drawing

(defn calculate-node-size [label {:keys [font-size padding]}]
  (let [text-width (* (count label) font-size 0.6) ; Assuming each character has a width of 0.6 * font-size
        rect-width (+ text-width (* 2 padding))
        rect-height 40]
    [rect-width rect-height]))




(defn node->svg [node style-map]
  (let [[id label x y] node
        font-size (:font-size style-map)
        font-family (:font-family style-map)
        text-anchor (:text-anchor style-map)
        text-y-offset (/ font-size 2)
        padding (:padding style-map)
        [rect-width rect-height] (calculate-node-size label style-map)]
    [:g {:key id}
     [:rect {:x (- x (/ rect-width 2)) :y (- y (/ rect-height 2))
             :width rect-width :height rect-height
             :stroke "black" :fill "white"}]
     [:text {:x x :y (+ y text-y-offset) :font-family font-family
             :font-size font-size :text-anchor text-anchor
             :class "wikilink" :data label}
      label]]))



(defn line-rect-intersect [x1 y1 x2 y2 w h]
  (let [dx (- x2 x1)
        dy (- y2 y1)
        half-w (/ w 2)
        half-h (/ h 2)
        left   (- x2 half-w)
        right  (+ x2 half-w)
        top    (- y2 half-h)
        bottom (+ y2 half-h)

        t-min-x (if (not= dx 0) (/ (- left x1) dx) Double/POSITIVE_INFINITY)
        t-max-x (if (not= dx 0) (/ (- right x1) dx) Double/NEGATIVE_INFINITY)

        t-min-y (if (not= dy 0) (/ (- top y1) dy) Double/POSITIVE_INFINITY)
        t-max-y (if (not= dy 0) (/ (- bottom y1) dy) Double/NEGATIVE_INFINITY)

        t-enter (max (min t-min-x t-max-x) (min t-min-y t-max-y))
        ]
    [(+ x1 (* t-enter dx)) (+ y1 (* t-enter dy))]))




(defn arc->svg [arc nodes style-map]
  (let [[n1 n2] arc
        node1 (some #(when (= (first %) n1) %) nodes)
        node2 (some #(when (= (first %) n2) %) nodes)
        [x1 y1] [(nth node1 2) (nth node1 3)]
        [x2 y2] [(nth node2 2) (nth node2 3)]
        [w1 h1] (calculate-node-size (nth node1 1) style-map)
        [w2 h2] (calculate-node-size (nth node2 1) style-map)
        [src-x src-y] (line-rect-intersect x2 y2 x1 y1 w1 h1) ; Reversed the origin and destination nodes
        [dest-x dest-y] (line-rect-intersect x1 y1 x2 y2 w2 h2)
        ]
    [:line {:x1 src-x :y1 src-y :x2 dest-x :y2 dest-y
            :stroke "black" :stroke-width 2 :marker-end "url(#arrow)"}]))






(defn network->svg [network]
  (let [style-map {:font-size 20
                   :font-family "Arial"
                   :text-anchor "middle"
                   :padding 10}]
    [:svg {:width "100%" :height "100%" :viewBox "0 0 500 500"}
     [:defs
      [:marker {:id "arrow" :markerWidth 10 :markerHeight 10 :refX 9 :refY 3
                :orient "auto" :markerUnits "strokeWidth"}
       [:path {:d "M0,0 L0,6 L9,3 z" :fill "black"}]]]
     (map #(node->svg % style-map) (network :nodes))
     (map #(arc->svg % (network :nodes) style-map) (network :arcs))]))



(defn network-card [i data  render-context]
  (let [svg (html (network->svg (read-string data))) ]
    (common/package-card
     i :network :markdown data
     svg render-context))
)

;;;;;;;;;;;;;;;;;;




;;;;;;;;;;;;;;;;;;

(defn collect-page-data
  "Extracts and merges data from all :data cards in a list of cards.
   Returns a map containing all the data."
  [cards]
  (let [data-cards (filter #(= (:source_type %) :data) cards)
        parsed-data (map #(try 
                            (read-string (:source_data %))
                            (catch Exception e 
                              (println "Error parsing data card:" (:source_data %))
                              {})) 
                         data-cards)]
    (do
      (println "Found" (count data-cards) "data cards")
      (reduce merge {} parsed-data))))

(defn process-card-map
  [i {:keys [source_type source_data]} render-context]
  (try
    (if (= source_type :transclude)
      (transclude i source_data render-context)
      [(condp = source_type
         :markdown (common/package-card i source_type :markdown source_data source_data render-context)
         :manual-copy (common/package-card i source_type :manual-copy source_data source_data render-context)

         :raw (common/package-card i source_type :raw source_data source_data render-context)

         :code
         (common/package-card i :code :code source_data source_data render-context)

         :data
         (let [the-data (read-string source_data)]
           (common/package-card i :data :data source_data 
                              (with-out-str (pprint the-data))
                              render-context))

         :evalraw
         (common/package-card i :evalraw :raw source_data 
                             (server-eval source_data 
                                         (or (:page-data render-context) {})) 
                             render-context)

         :evalmd
         (common/package-card i :evalmd :markdown source_data 
                             (server-eval source_data 
                                         (or (:page-data render-context) {})) 
                             render-context)

         :evalhiccup
         (common/package-card i :evalhiccup :html source_data
                             (server-eval-hiccup source_data
                                               (or (:page-data render-context) {}))
                             render-context)

         :workspace
         (common/package-card i source_type :workspace source_data source_data render-context)

         :system
         (system-card i source_data render-context)

         :hiccup
         (let [hiccup-data (try
                             (read-string source_data)
                             (catch Exception e
                               [:div {:class "error"}
                                [:h3 "Error parsing hiccup"]
                                [:pre (exception-stack e)]]))]
           (if (and (vector? hiccup-data) (keyword? (first hiccup-data)))
             (common/package-card i :hiccup :html source_data 
                                (html hiccup-data) 
                                render-context)
             (common/package-card i :hiccup :html source_data
                                (str "<div class='error'>Invalid hiccup data: " 
                                     source_data "</div>")
                                render-context)))

         :embed
         (common/package-card i source_type :html source_data
                              (embed/process source_data
                                             render-context
                                             (if (:for-export? render-context)
                                               (:link-renderer render-context)
                                               (fn [s] (common/md->html s)))
                                             (server-state))
                              render-context)

         :bookmark
         (common/package-card i :bookmark :markdown source_data (bookmark-card source_data) render-context)


         :network
         (network-card i source_data render-context)

         :patterning
         (common/package-card i :patterning :html source_data
                              (patterning/one-pattern source_data) render-context)

         :filelink
         (common/package-card i :filelink  :html source_data
                              (file-link source_data) render-context)


         ;; not recognised
         (common/package-card i source_type source_type source_data source_data render-context)
         )])
    (catch
        Exception e
      [(common/package-card
        i :raw :raw source_data
        (str "Error \n\nType was\n" source_type
             "\nSource was\n" source_data
             "\n\nStack trace\n"
             (exception-stack e))
        render-context)])
    )
  )

(defn card-maps->processed [id-start card-maps render-context]
  (let [page-data (collect-page-data card-maps)
        render-context-with-data (assoc render-context :page-data page-data)]
    (mapcat process-card-map 
            (iterate inc id-start) 
            card-maps 
            (repeat render-context-with-data))))

(defn raw->cards [raw render-context]
  (let [card-maps (common/raw-text->card-maps raw)]
    (card-maps->processed 0 card-maps render-context)))

(declare backlinks)

(defn load->cards [page-name]
  (-> (server-state) .page-store
      (.read-page page-name)
      (raw->cards {:user-authored? true :for-export? false}))
  )

(defn load->cards-for-export [page-name link-renderer]
  (-> (server-state) .page-store
      (.read-page page-name)
      (raw->cards {:user-authored? true
                   :for-export? true
                   :link-renderer link-renderer})))

(defn generate-system-cards [page-name]
 [(backlinks page-name)] )

(defn load-one-card [page-name hash]
  (let [cards (load->cards page-name)]
    (common/find-card-by-hash cards hash)))

;; GraphQL resolvers

(defn resolve-text-search [context arguments value]
  (let [{:keys [query_string]} arguments
        out (search query_string)]
    {:result_text out}
    ))

(defn resolve-card
    "Not yet tested"
  [context arguments value render-context]
  (let [{:keys [page_name hash]} arguments
        ps (.page-store (server-state))]
    (if (.page-exists? ps page_name)
      (-> (load->cards page_name)
          (common/find-card-by-hash hash))
      (common/package-card 0 :markdown :markdown
                           (str "Card " hash " doesn't exist in " page_name)
                           (str "Card " hash " doesn't exist in " page_name)
                           render-context) )))

(defn resolve-source-page [context arguments value]
  (let [{:keys [page_name]} arguments
        ps (.page-store (server-state))]
    (if (.page-exists? ps page_name)
      {:page_name page_name
       :body (pagestore/read-page (server-state) page_name)}
      {:page_name page_name
       :body
       (str "A PAGE CALLED " page_name " DOES NOT EXIST


Check if the name you typed, or in the link you followed is correct.

If you would *like* to create a page with this name, simply click the [Edit] button to edit this text. When you save, you will create the page")
       })))

(defn resolve-page [context arguments value]
  (let [{:keys [page_name]} arguments
        ps (:page-store (server-state))
        wiki-name (:wiki-name (server-state))
        site-url (:site-url (server-state))
        port (:port-no (server-state))
        start-page-name (:start-page (server-state))
        ip (try
             (let [dgs (new DatagramSocket)]
               (.connect dgs (InetAddress/getByName "8.8.8.8") 10002)
               (-> dgs .getLocalAddress .getHostAddress))

             (catch Exception e (str e))
            )
        ]

    (if (.page-exists? ps page_name)
      (let [cards (load->cards page_name)
            page-data (collect-page-data cards)]
        (println "Page data for" page_name ":")
        (println page-data)
        {:page_name page_name
         :wiki_name wiki-name
         :site_url site-url
         :port port
         :ip ip
         :public_root (str site-url "/view/")
         :start_page_name start-page-name
         :cards cards
         :system_cards (generate-system-cards page_name)
         :page_data (pr-str page-data)
         })
      {:page_name page_name
       :wiki_name wiki-name
       :site_url site-url
       :port port
       :ip ip
       :start_page_name start-page-name
       :public_root (str site-url "/view/")
       :page_data "{}"
       :cards (raw->cards
               (str "<div style='color:#990000'>A PAGE CALLED " page_name " DOES NOT EXIST


Check if the name you typed, or in the link you followed is correct.

If you would *like* to create a page with this name, simply click the [Edit] button to edit this text. When you save, you will create the page
</div>")
               {:user-authored? false :for-export? false})
       :system_cards
       (let [sim-names (map
                        #(str "\n- [[" % "]]")
                        (.similar-page-names
                         ps page_name))  ]
         (if (empty? sim-names) []
             [(common/package-card
               :similarly_name_pages :system :markdown ""
               (str "Here are some similarly named pages :"
                    (apply str sim-names)) false)]))
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
       "Backlinks Not Available"
       false)

      (= bl '())
      (common/package-card
       :backlinks :system :markdown
       "No Backlinks"
       "No Backlinks"
       false)

      :otherwise
      (ldb-query->mdlist-card
       "backlinks" "backlinks" "Backlinks" bl
       :calculated
       (fn [[a b]] (str "* [[" a "]] \n"))
       false))))



;; transforms on pages

(defn append-card-to-page! [page-name type body]
  (let [page-body (try
                    (pagestore/read-page (server-state) page-name)
                    (catch Exception e (str "Automatically created a new page : " page-name "\n\n"))
                    )
        new-body (str page-body "----
" type "
" body)]
    (write-page-to-file! page-name new-body )))

(defn prepend-card-to-page! [page-name type body]
  (let [page-body (try
                    (pagestore/read-page (server-state) page-name)
                    (catch Exception e (str "Automatically created a new page : " page-name "\n\n"))
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
  (if (= page-name destination-name) nil ;; don't try to move to self
      (let [ps (.page-store (server-state))
            from-cards (.get-page-as-card-maps ps page-name)
            card (common/find-card-by-hash from-cards hash)
            stripped (into [] (common/remove-card-by-hash from-cards hash))
            stripped_raw (common/cards->raw stripped)
            ]
        (if (not (nil? card))
          (do
            (append-card-to-page! destination-name (:source_type card) (:source_data card))
            (write-page-to-file! page-name stripped_raw))))))

(defn reorder-card [page-name hash direction]
  (let [ps (.page-store (server-state))
        cards (.get-page-as-card-maps ps page-name)
        new-cards (if (= "up" direction)
          (common/move-card-up cards hash)
          (common/move-card-down cards hash))
        ]
    (write-page-to-file! page-name (common/cards->raw new-cards))))


(defn replace-card [page-name hash source-type new-body]
  (let [ps (.page-store (server-state))
        cards (.get-page-as-card-maps ps page-name)
        new-card (common/raw-card-text->card-map (str source-type "\n" new-body))
        d1 (println "THE NEW CARD :: " new-card)
        new-cards (common/replace-card
                   cards
                   #(common/match-hash % hash)
                   new-card)]
    (write-page-to-file! page-name (common/cards->raw new-cards))))

;;;; Media and Custom files

(defn load-media-file [file-name]
  (-> (server-state) :page-store (.load-media-file file-name)))


(defn load-custom-file [file-name]
  (-> (server-state) :page-store (.load-custom-file file-name)))

;;file (io/file (System/getProperty "user.dir") (str "." uri))
