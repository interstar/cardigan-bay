(ns clj-ts.client
  (:require
            [reagent.core :as r]
            [clojure.string :refer [lower-case replace]]
            [clojure.string :as string]
            [cljs.core.async :refer [<! timeout]]
            [cljs.core :refer [clj->js]]
            [cljs.reader :refer [read-string]]

            [venia.core :as venia]

            [markdown.core :as md]
            [clj-ts.common :refer [card->type-and-card package-card  card->html]])
  (:import goog.net.XhrIo)
  (:require-macros [cljs.core.async.macros :refer [go]]))



;; State
(defonce db (r/atom
              {:current-page "HelloWorld"
               :raw ""
               :editing false
               :past ["HelloWorld"]
               :future []}))


;; PageStore

(defn Yload-page! [page-name new-past new-future]
  (let [lcpn (lower-case page-name)]
    (.send XhrIo
           (str "/clj_ts/flattened?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)
                   ]
               (swap! db assoc
                      :current-page page-name
                      :raw  data
                      :past new-past
                      :future new-future)
               ))
           "GET")))


(defn load-page! [page-name new-past new-future]
  (let [lcpn (lower-case page-name)
        xxx
        "query GetPage($pn: String!) {
  raw_page(page_name: $pn) {
    page_name
    body
  }
  cooked_page(page_name: $pn) {
    page_name
    cards {
      type
      id
      data
      hash
    }
  }
}"
        query (venia/graphql-query
                 {:venia/operation {:operation/type :query
                                    :operation/name "GetPage"}
                  :venia/variables [{:variable/name "pagename"
                                     :variable/type :String}]
                  :venia/queries
                  [{:query/data
                    [:raw_page {:page_name lcpn}
                     [:page_name :body]
                     ]}
                   {:query/data
                    [:cooked_page {:page_name lcpn}
                     [:page_name [:cards [:type :id :data :hash]]]]}
                  ]
                  })]
    (js/console.log (str  " MMMM " query))
    (.send XhrIo
           "/clj_ts/graphql"
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)
                   ]
               (js/console.log "DDDDDD " data)
               (swap! db assoc
                      :current-page page-name
                      :raw  data
                      :past new-past
                      :future new-future)
               ))
           "POST",
           (str "{" query "}") )))

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
           :raw (str (-> @db :raw) "\n\n" stamp ))))

;; RUN

(go-new! "HelloWorld")


;; Rendering Views


(defn process-card [i card]
  (let [[type, data] (card->type-and-card card)]
    (condp = type
      :markdown (package-card i type data)
      :raw (package-card i type data)
      :server-dynamic (package-card i type data)
      (package-card i type data)
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
          [:span {:on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]
         " || "
          [:a {:href "/clj_ts/all"} "All Pages"]
          " || "
          [:a {:href "/clj_ts/db"} "Database"]
          " || "
          [:a {:href "/clj_ts/links"} "Links"]
          " || "
          [:a {:href "/clj_ts/broken-links"} "Broken Links"]
          " || "
          [:a {:href "/clj_ts/orphans"} "Orphans"]
          " || "
          [:button
           {:class "big-btn"
            :on-click (fn [] (back!))} "<"]
          [:button
           {:class "big-btn"
            :on-click (fn [] (forward! (-> @db :future last)))} ">" ]
          [nav-input current]
          [:button
           {:class "big-btn"
            :on-click (fn [] (go-new! @current))} "Go!"]
          " || "



          [:div
           (if editing
             [:span
              [:button {:class "big-btn"
                        :on-click
                        (fn []
                          (do
                            (swap! db assoc :editing (not editing))
                            (reload!)))}  "Cancel"]
              [:button {:class "big-btn"
                        :on-click
                        (fn []
                          (do
                            (swap! db assoc :editing (not editing))
                            (save-page!)) )} "Save"]]

             [:span
              [:button {:class "big-btn"
                        :on-click
                        #(swap! db assoc :editing (not editing))} "Edit"]])
           "Stamps :: "
           [:button {:class "big-btn"
                     :on-click
                     (fn []
                       (stamp! "==DELETE==" ))} "Delete"]
           " | "
           [:button {:class "big-btn"
                     :on-click
                     (fn []
                       (stamp! "==FIX==")) } "Fix"]] ] ))))




(defn one-card [card]
  (let [inner-html
        (condp = (-> card :type)
          :raw
          (str "<pre>" (->  card :data) "</pre>")
          :markdown (card->html card)
          (str "UNKNOWN TYPE(" (:type card) ") " (-> card :data)))
        ]
    (js/console.log card)

    [:div
     [:div
      [:span (-> card :id)] " | "
      [:span (-> card :hash)] " | "
      [:span (-> card :type)]
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
     (let [cards (-> @db :raw raw->cards  )]
       (for [card cards]
         (one-card card) ))
     (catch :default e
       (js/alert e)))
   ])

(defn main-container []
  [:div {:class "main-container"}
   (if (-> @db :editing)
     [:div
      [:textarea {:id "edit-field" :cols 80 :rows 40}
       (-> @db :raw)]]
     [:div

      (card-list)])])

;;

; Main page
(defn content []
  [:div
   [:div {:class "headerbar"}
    [:div
     [:h2 (-> @db :current-page)
      [:span
       [:a {:href (str "http://thoughtstorms.info/view/" (-> @db :current-page))} "(TS)" ]] ]
     [:div [nav-bar]]]
    [main-container]
    ]])


; tells reagent to begin rendering
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
