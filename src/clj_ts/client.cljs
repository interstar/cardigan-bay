(ns clj-ts.client
  (:require
            [reagent.core :as r]
            [clojure.string :refer [lower-case]]
            [clojure.string :as string]
            [cljs.core.async :refer [<! timeout]]
            [cljs.core :refer [js->clj]]
            [cljs.reader :refer [read-string]]



            [markdown.core :as md]
            [clj-ts.common :refer [raw-card->type-and-data package-card
                                   double-comma-table
                                   double-bracket-links auto-links ]]
            ;;[clj-ts.common :refer [card->html ]]
            )
  (:import goog.net.XhrIo)
  (:require-macros [cljs.core.async.macros :refer [go]]))



;; State
(defonce db (r/atom
              {:current-page "HelloWorld"
               :raw ""
               :cooked []
               :editing false
               :past ["HelloWorld"]
               :future []
               :wiki-name "Wiki Name"
               :site-url "Site URL"}))


;; PageStore


(defn load-page! [page-name new-past new-future]
  (let [lcpn (lower-case page-name)

        query (str "{\"query\" : \"query GetPage {
  raw_page(page_name: \\\"" lcpn "\\\" ) {
    page_name
    body
  }
  cooked_page(page_name:  \\\"" lcpn "\\\") {
    page_name
    wiki_name
    site_url
    cards {
      type
      id
      data
      hash
      delivered_type
    }
  }
} \",\"variables\":null, \"operationName\":\"GetPage\"}")]
    (.send XhrIo
           "/clj_ts/graphql"
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   edn (-> e .-target .getResponseText .toString
                           (#(.parse js/JSON %)) js->clj )
                   data (-> edn (get "data"))
                   raw (-> data (get "raw_page") (get "body"))
                   cooked (-> data (get "cooked_page") (get "cards"))
                   site-url (-> data (get "cooked_page") (get "site_url"))
                   wiki-name (-> data (get "cooked_page") (get "wiki_name"))
                   ]

               (swap! db assoc
                      :current-page page-name
                      :site-url site-url
                      :wiki-name wiki-name
                      :raw  raw
                      :cooked cooked
                      :past new-past
                      :future new-future)
               ))
           "POST",
           query )))

(defn generate-form-data [params]
  (let [form-data (js/FormData.)]
    (doseq [[k v] params]
      (.append form-data (name k) v))
    form-data))

(declare reload!)

(defn save-page! []
  (let [page-name (-> @db :current-page)
        new-data (-> js/document
                     (.getElementById "edit-field")
                     .-value)
        form-data (generate-form-data
                    {"page" page-name
                     "data" new-data})]
    (.send XhrIo
      "/clj_ts/save"
      (fn [e]
        (go
          (<! (timeout 1000))
          (reload!)
          (r/force-update-all)))
      "POST"
      (pr-str {:page page-name
               :data new-data}))))



;; Nav and History

(defn go-new! [p-name]
  (load-page! p-name (conj (-> @db :past) (-> @db :current-page))  []))

(defn forward! [p-name]
  (load-page! p-name (conj (-> @db :past) (-> @db :current-page)) (pop (-> @db :future)) )
  )

(defn reload! []
  (load-page! (:current-page @db) (-> @db :past) (-> @db :future)))

(defn back! []
  (load-page! (-> @db :past last) (pop (-> @db :past)) (conj (-> @db :future) (-> @db :current-page))  ))


;; Process page

(defn stamp! [stamp]
  (do
    (swap! db assoc
           :editing true
           :raw (str (-> @db :raw) "\n----\n:stamp\n" {:type stamp} ))))

;; RUN

(let [start-page
      (.send XhrIo
      "/startpage"
      (fn [e]
        (-> e .-target .getResponseText .toString go-new!)))])


;; Rendering Views

(defn process-card [i card]
  (let [[type, data] (raw-card->type-and-data card)]
    (condp = type
      :markdown (package-card i type :markdown data)
      :raw (package-card i type :raw data)
      :server-eval (package-card i type :calculated data)
      (package-card i type type data)
      )))

(defn raw->cards [raw]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards)))



(defn nav-input [value]
  [:input {:type "text"
           :id "navinputbox"
           :value @value
           :on-change #(reset! value (-> % .-target .-value))}])

(defn nav-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
       (let [editing (-> @db :editing)]
         [:div {:class "navbar"}
          [:div {:id "nav1"}

           [:span {:on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]
           " || "
           [:span {:on-click (fn [] (go-new! "AboutThisWiki"))} "AboutThisWiki"]
           " || "
           [:span {:on-click (fn [] (go-new! "RecentChanges"))} "RecentChanges"]
           " || "
           [:span {:on-click (fn [] (go-new! "SandBox"))} "SandBox"]]
          [:div {:id "nav2"}

           [:button
            {:class "big-btn"
             :on-click (fn [] (back!))}
            [:img {:src "/icons/skip-back.png"}] " Back"]

           [nav-input current]
           [:button
            {:class "big-btn"
             :on-click (fn [] (go-new! @current))}
            [:img {:src "/icons/arrow-right.png"}] " Go!"]

           [:button
            {:class "big-btn"
             :on-click (fn [] (forward! (-> @db :future last)))} ""
            [:img {:src "/icons/skip-forward.png"}] " Forward"]
           ]


          ] ))))


(defn tool-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
      (let [editing (-> @db :editing)]
        [:div
         (if editing
           [:span
            [:button {:class "big-btn"
                      :on-click
                      (fn []
                        (do
                          (swap! db assoc :editing (not editing))
                          (reload!)))}
             [:img {:src "/icons/x.png"}] " Cancel"]
            [:button {:class "big-btn"
                      :on-click
                      (fn []
                        (do
                          (swap! db assoc :editing (not editing))
                          (save-page!)) )}
             [:img {:src "/icons/save.png"}] " Save"]]

           [:span
            [:button {:class "big-btn"
                      :on-click
                      #(swap! db assoc :editing (not editing))}
                        [:img {:src "/icons/edit.png"}] " Edit"]])



         (comment
           " :: Stamps :: "
           [:button {:class "big-btn"
                     :on-click
                     (fn []
                       (stamp! :delete ))} "Delete"]
           " | "
           [:button {:class "big-btn"
                     :on-click
                     (fn []
                       (stamp! :fix)) } "Fix"])]))
    ))



(defn card->html [card]
  (-> (get card "data")
      (double-comma-table)
      (md/md->html)
      (auto-links)
      (double-bracket-links)))


(defn one-card [card]
  (let [type (get card "delivered_type")
        data (get card "data")
        metaid  (str "cardmeta" (get card "hash") )
        inner-html
        (condp = type
          ":raw"
          (str "<pre>" data "</pre>")
          ":markdown"
          (card->html card)
          ":html"
          (str data)
          ":stamp"
          (str data)
          (str "UNKNOWN TYPE(" type ") " data))
        ]
    ;;(js/console.log (pr-str card))

    [:div {:class :card-outer}
     [:span [:button (str  "@" metaid)] ]
     [:div {:class :card-meta :id metaid}
      [:span (get card "id")] " | "
      [:span (get card "hash")] " | Original type: "
      [:span (get card "type")] " | Delivered type: "
      [:span (get card "delivered_type")]
      ]
     [:div
      {:class "card"
       :on-click
       (fn [e]
         (let [tag (-> e .-target)
               classname (.getAttribute tag "class")
               data (.getAttribute tag "data")
               x (-> @db :dirty)]

           (if (= classname "wikilink")
             (go-new! data))))
       :dangerouslySetInnerHTML
       {:__html inner-html}} ]])
  )



(defn card-list []
  [:div
   (try
     (let [cards (-> @db :cooked  )]
       (for [card cards]

         (one-card card) ))
     (catch :default e
       (js/alert e)))
   ])

(defn main-container []

  [:div
   (if (-> @db :editing)
     [:div {:class "edit-box"}
      [:textarea {:id "edit-field" :cols 80 :rows 40}
       (-> @db :raw)]]
     [:div
      (card-list)]
     )])

;;

; Main page
(defn content []
  [:div {:class "main-container"}
   [:div {:class "headerbar"}
    [:div
     [:div [nav-bar]]
     [:h2 (-> @db :current-page)
      [:span {:class "tslink"}
       [:a {:href (str "http://thoughtstorms.info/view/" (-> @db :current-page))} "(TS)" ]] ]
     ]
    [:div [tool-bar]]]
   [main-container]])


;; tells reagent to begin rendering




(r/render-component [content]
                   (.querySelector js/document "#app"))

(js/document.addEventListener
 "keypress"
 (fn [e]
   (let [kc (.-charCode e)]
     (if (= 69 kc)
       (swap! db assoc
              :editing true))
     (-> js/document (.getElementById "edit-field") (.focus) )
     )))
