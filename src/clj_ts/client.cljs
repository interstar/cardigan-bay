(ns clj-ts.client
  (:require
            [reagent.core :as r]
            [clojure.string :refer [lower-case]]
            [clojure.string :as string]
            [cljs.core.async :refer [<! timeout]]
            [cljs.core :refer [js->clj]]
            [cljs.reader :refer [read-string]]



            [markdown.core :as md]
            [clj-ts.common :refer [raw-card->type-and-data
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
               :cards []
               :past ["HelloWorld"]
               :future []
               :wiki-name "Wiki Name"
               :site-url "Site URL"
               :editing false
               :mode :page}))


;; PageStore


(defn load-page! [page-name new-past new-future]
  (let [lcpn (lower-case page-name)

        query (str "{\"query\" : \"query GetPage {
  source_page(page_name: \\\"" lcpn "\\\" ) {
    page_name
    body
  }
  server_prepared_page(page_name:  \\\"" lcpn "\\\") {
    page_name
    wiki_name
    site_url
    cards {
      id
      hash
      source_type
      source_data
      render_type
      server_prepared_data
    }
    system_cards {
      id
      hash
      source_type
      source_data
      render_type
      server_prepared_data
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
                   raw (-> data (get "source_page") (get "body"))
                   cards (-> data (get "server_prepared_page") (get "cards"))
                   system-cards (-> data (get "server_prepared_page") (get "system_cards"))
                   site-url (-> data (get "server_prepared_page") (get "site_url"))
                   wiki-name (-> data (get "server_prepared_page") (get "wiki_name"))
                   ]

               (js/console.log "Cards " cards)
               (js/console.log "System Cards " system-cards)

               (swap! db assoc
                      :current-page page-name
                      :site-url site-url
                      :wiki-name wiki-name
                      :raw  raw
                      :cards cards
                      :system-cards system-cards
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
----
:bookmark          (reload!)
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
           [:span {:on-click (fn [] (go-new! "SandBox"))} "SandBox"]

           " || "
           [:a {:href "/api/exportallpages"} "Export All Pages"]


           ]
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

           [:button {:class "big-btn"}
            [:a {:href "/api/rss/recentchanges"} [:img {:src "/icons/rss.png"}]]]


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
             [:img {:src "/icons/edit.png"}] " Edit"]

            [:button {:class "big-btn"}
             [:a {:href (str "/api/exportpage?page=" (-> @db :current-page))}
              [:img {:src "/icons/package.png"}]
              " Export"]]])



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
  (-> (get card "server_prepared_data")
      (double-comma-table)
      (md/md->html)
      (auto-links)
      (double-bracket-links)))


(defn card-bar [card]
  (let [meta-id  (str "cardmeta" (get card "hash") )
        state (r/atom {:toggle "none"})
        toggle! (fn [e]
                  (do

                    (if (= (-> @state :toggle) "none")
                      (swap! state #(conj % {:toggle "block"}) )
                      (swap! state #(conj % {:toggle "none"})))))]
    (fn [card]
      [:div {:class :card-meta}
       [:span {:on-click toggle! :style {:size "smaller" :float "right"}}
        (if (= (-> @state :toggle) "none")
          [:img {:src "/icons/eye.png"}]
          [:img {:src "/icons/eye-off.png"}]
          )

        ]
       [:div {:id meta-id :style {:spacing-top "5px" :display (-> @state :toggle)
                                  }}
        [:div [:h4 "Card Bar"]]
        [:div
         [:span "ID: " (get card "id")] " | Hash: "
         [:span (get card "hash")] " | Source type: "
         [:span (get card "source_type")] " | Render type: "
         [:span (get card "render_type")]]
        [:div

         [:form {:action "/api/movecard"}
          "Send to Another Page : "
          [:input { :name "to"}]
          [:input { :name "hash" :type "hidden" :value (get card "hash")}]
          [:input { :name "from" :type "hidden" :value (-> @db :current-page )}]
          [:img {:src "/icons/send.png"}]  [:input { :type "submit" :value "Send"}]
          ]
         ]
        ]
       ])))

(defn one-card [card]
  (let [rtype (get card "render_type")
        data (get card "server_prepared_data")
        inner-html
        (condp = rtype
          ":raw"
          (str "<pre>" data "</pre>")
          ":markdown"
          (card->html card)
          ":html"
          (str data)
          ":stamp"
          (str data)
          (str "UNKNOWN TYPE(" type ") " data))]
    ;;(js/console.log (pr-str card))

    [:div {:class :card-outer}

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
       {:__html inner-html}} ]
     [card-bar card]
     ]))



(defn card-list []
  [:div
   [:div
    (try
      (let [cards (-> @db :cards)]
        (for [card cards]
          (one-card card))
        )
      (catch :default e
        (js/alert e)))

    ]
   [:div
    (try
      (let [cards (-> @db :system-cards)]
        (for [card cards]
          (one-card card))
        )
      (catch :default e
        (js/alert e)))]
   ])

(defn main-container []

  [:div
   (if (= :page (-> @db :mode ))
     [:div
      (if (-> @db :editing)
        [:div {:class "edit-box"}
         [:textarea {:id "edit-field" :cols 80 :rows 40}
          (-> @db :raw)]]
        [:div
         (card-list)]
        )]
     [:div
      [:h2 "Bookmark"]])])

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
   [main-container]
   [:div {:class "footer"}
    [:span
     [:span "This is " (-> @db :wiki-name) " wiki!"]
     [:span " || Home : " [:a {:href (-> @db :site-url)} (-> @db :site-url)] " || " ]
     [:span [:a {:href "/api/system/db"} "DB"] " || "]
     [:a {:href "https://github.com/interstar/cardigan-bay"} "Cardigan Bay "]
     "(c) Phil Jones 2020  | "
     [:a {:href "javascript:(function(){window.location='http://localhost:4545/api/bookmarklet?url='+document.URL;})();"} "Bookmark to this Wiki"]] ]])


;; tells reagent to begin rendering




(r/render-component [content]
                   (.querySelector js/document "#app"))

(js/document.addEventListener
 "keypress"
 (fn [e]
   (let [kc (.-charCode e)]
     (if (and (.ctrlKey e) (= 69 kc))
       (swap! db assoc
              :editing true))
     (-> js/document (.getElementById "edit-field") (.focus) )
     )))
