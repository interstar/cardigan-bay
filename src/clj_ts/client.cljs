(ns clj-ts.client
  (:require
   [reagent.core :as r]
   [reagent.dom :as dom]
   [clojure.string :refer [lower-case trim replace]]
   [clojure.string :as string]
   [cljs.core.async :refer [<! timeout]]
   [cljs.core :refer [js->clj]]
   [cljs.reader :refer [read-string]]
   [cljs.pprint :refer [pprint]]


   [sci.core :as sci]
   [markdown.core :as md]


   [clj-ts.common :refer [raw-card-text->raw-card-map
                          double-comma-table embed-boilerplate
                          double-bracket-links auto-links ]]
   ;;[clj-ts.common :refer [card->html ]]

   )
  (:import goog.net.XhrIo)

  (:require-macros [cljs.core.async.macros :refer [go]]))



;; State
(defonce db (r/atom
              {:current-page "HelloWorld"
               :raw ""
               :transcript ""
               :cards []
               :past ["HelloWorld"]
               :future []
               :wiki-name "Wiki Name"
               :site-url "Site URL"
               :mode :viewing
               ;;:mode :page WHAT WAS THIS? WAS IT USED?
               :port 4545}))


;; PageStore



(defn load-page! [page-name new-past new-future]
  (let [lcpn page-name

        query (str "{\"query\" : \"query GetPage {
  source_page(page_name: \\\"" lcpn "\\\" ) {
    page_name
    body
  }
  server_prepared_page(page_name:  \\\"" lcpn "\\\") {
    page_name
    wiki_name
    site_url
    port
    ip
    start_page_name
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
                   port (-> data (get "server_prepared_page") (get "port"))
                   ip (-> data (get "server_prepared_page") (get "ip"))
                   start-page-name (-> data (get "server_prepared_page")  (get "start_page_name"))

                   ]


               (swap! db assoc
                      :current-page page-name
                      :site-url site-url
                      :wiki-name wiki-name
                      :port port
                      :ip ip
                      :start-page-name start-page-name
                      :raw  raw
                      :cards cards
                      :system-cards system-cards
                      :past new-past
                      :future new-future
                      :mode :viewing
)
               )
             (js/window.scroll 0 0)
             )
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


(defn card-reorder! [page-name hash direction]

  (.send XhrIo
         "/api/reordercard"
         (fn [e]

           (go
             (<! (timeout 200))

             (reload!)
             (r/force-update-all)))
         "POST"
         (pr-str {:page page-name
                  :hash hash
                  :direction direction}))
  )

(declare go-new!)

(defn card-send-to-page! [page-name hash new-page-name]

  (.send XhrIo
         "/api/movecard"
         (fn [e]
           (go
             (<! (timeout 200))
             (go-new! new-page-name)))
         "POST"
         (pr-str {:from page-name
                  :to new-page-name
                  :hash hash}))
  )


(declare prepend-transcript!)
(declare string->html)

(defn search-text! [query-text]
  (let [cleaned-query
        (-> query-text
            (#(replace % "\"" "" ))
            (#(replace % "'" "")))
        query (str "{\"query\" : \"query TextSearch  {
text_search(query_string:\\\"" cleaned-query "\\\"){     result_text }
}\",  \"variables\":null, \"operationName\":\"TextSearch\"   }")]
(.send XhrIo
      "/clj_ts/graphql"
      (fn [e]
        (let [status (-> e .-target .getStatusText)
              edn (-> e .-target .getResponseText .toString
                      (#(.parse js/JSON %)) js->clj )
              data (-> edn (get "data"))
              result (-> data (get "text_search") (get "result_text"))
              ]
          (prepend-transcript! (str "Searching for " cleaned-query) (string->html result))
          ))
      "POST"
      query)
    ))


;; Nav and History

(defn go-new! [p-name]
  (do
    (load-page! p-name (conj (-> @db :past) (-> @db :current-page))  [])
    (swap! db assoc :mode :viewing)
    ))

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
           :mode :editing
           :raw (str (-> @db :raw) "\n----\n:stamp\n" {:type stamp} ))))


(defn insert-text-at-cursor! [s]
  (let [ta (-> js/document
               (.getElementById "edit-field"))
        text (-> ta .-value)
        selectionStart (-> ta .-selectionStart)
        new (str
             (subs text 0 selectionStart)
             s
             (subs text selectionStart))
        ]
    (swap! db assoc :raw new)
    (-> ta (.-value) (set! new) )))


(defn prepend-transcript! [code result]
  (do
    (swap! db assoc :transcript
           (str "<p> > " code "
<br/>
" result "
</p>
" (-> @db :transcript)))
    (swap! db assoc :mode :transcript)) )


;; RUN

(let [start-page
      (.send XhrIo
      "/startpage"
      (fn [e]
        (-> e .-target .getResponseText .toString go-new!)))])



;; Rendering Views

(defn mode-selected [viewing editing transcript]
  (condp = (-> @db :mode)
    :viewing viewing
    :editing editing
    :transcript transcript
    (str "Unknown mode " (-> @db :mode))
    )
  )

(defn viewing-menu []
  (fn []
    [:ul
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "InQueue")) } "InQueue"] ]
     [:li [:span {:class "clickable" :on-click (fn [] (swap! db assoc :mode :transcript))} "Transcript"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "RecentChanges"))} "RecentChanges"] ]
     [:li [:a {:href "/api/exportallpages"} "Export All Pages"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "Help"))} "Help"]]]))

(defn editing-menu []
  (fn []
    [:ul
     ]))

(defn transcript-menu []
  (fn []
    [:ul
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "InQueue")) } "InQueue"] ]
     [:li [:span {:class "clickable" :on-click  (fn [] (swap! db assoc :mode :viewing))} "Return to View Page"] ]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "RecentChanges"))} "RecentChanges"] ]
     [:li [:a {:href "/api/exportallpages"} "Export All Pages"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "Help"))} "Help"]]

     ])
  )

(defn top-menu []
  (fn []
    (let [start-page-name (-> @db :start-page-name)
          wiki-name (-> @db :wiki-name)]
      [:header {:class "fixed-menu"}
       [:div
        [:span {:class "website-title"} wiki-name]]
       [:nav {:class "left-menu"}
        [:label {:for "menu-toggle" :class "menu-icon"} "\u2630"]
        [:input {:type "checkbox" :id "menu-toggle"}]
        (mode-selected
         [viewing-menu]
         [editing-menu ]
         [transcript-menu ]
         )]] ))
  )

(defn nav-input [value]
  [:input {:type "text"
           :id "navinputbox"
           :value @value
           :placeholder "Type a page-name to go to, a term to search for, or a Clojure expression to execute."
          :on-change #(reset! value (-> % .-target .-value))}])

(defn boilerplate-button [label tag]
  [:button {:class "big-btn"
            :on-click
            (fn [e]
              (insert-text-at-cursor! (embed-boilerplate tag)))}
   label]
  )

(defn pastebar []
  [:div {:class "pastebar"}
   [:div
    "Quick Paste Bar"]
   [:div

    [:button {:class "big-btn"
              :on-click
              (fn [e]
                (insert-text-at-cursor! (embed-boilerplate :markdown)))}
     "New Card"]

    [:button {:class "big-btn"
              :on-click
              (fn [e]
                (insert-text-at-cursor! "
----
:system

{:command :search
 :query \"\"
}

----"))}
     "Search Card"]

    [:button {:class "big-btn"
              :on-click
              (fn [e]
                (insert-text-at-cursor! "
----
:workspace

;; Write some code
[:div
(str \"Hello Teenage America\")
]

----"))}
     "Code Workspace"]

    [:button {:class "big-btn"
              :on-click
              (fn [e]
                (insert-text-at-cursor! "
----
:evalmd

;; Write some code.
;; Note that if the result of your executed code is a number
;; You must convert it to a string.

(str \"### \" (+ 1 2 3))

"))}
     "Code on Server"]


    (boilerplate-button "YouTube Card" :youtube)
    (boilerplate-button "Vimeo Card" :vimeo)
    (boilerplate-button "Image Card" :img)
    (boilerplate-button "SoundCloud Card" :soundcloud)
    (boilerplate-button "BandCamp Card" :bandcamp)
    (boilerplate-button "Twitter Card" :twitter)
    (boilerplate-button "RSS Feed" :rss)

]])

(defn nav-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
      (let [mode (-> @db :mode)
            start-page-name (-> @db :start-page-name)]

        (if (= mode :editing)
              [:div {:class "navbar"}
               [pastebar]
               ]

              [:div {:class "navbar"}

               [nav-input current]

               [:div {:id "nav3"}

                [:button
                 {:class "big-btn"
                  :on-click (fn [] (back!))}
                 [:img {:src "/icons/skip-back.png"}] " Back"]

                [:button
                 {:class "big-btn"
                  :on-click (fn [] (go-new! @current))}
                                        ;[:img {:src "/icons/arrow-right.png"}]
                 " Go To"]

                [:button
                 {:class "big-btn"
                  :on-click
                  (fn []
                    (search-text! (-> @current str)))}
                 "Search"]

                [:button
                 {:class "big-btn"
                  :on-click
                  (fn []
                    (let [code (-> @current str)
                          result (sci/eval-string code)]
                      (prepend-transcript! code result)
                      )
                    )}
                 "Execute"]

                [:button
                 {:class "big-btn"
                  :on-click (fn [] (forward! (-> @db :future last)))} ""
                 [:img {:src "/icons/skip-forward.png"}] " Forward"]


                ]])))))




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn tool-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
      (let [mode (-> @db :mode)]
        [:div
         (condp = mode
           :editing
           [:div
            [:span
             [:button {:class "big-btn"
                       :on-click
                       (fn []
                         (do
                           (swap! db assoc :mode :viewing)
                           (reload!)))}
              [:img {:src "/icons/x.png"}] " Cancel"]
             [:button {:class "big-btn"
                       :on-click
                       (fn []
                         (do
                           (swap! db assoc :mode :viewing)
                           (save-page!)) )}
              [:img {:src "/icons/save.png"}] " Save"]




             ]]



           :viewing
           [:span
            [:button {:class "big-btn"
                      :on-click
                      #(swap! db assoc :mode :editing)}
             [:img {:src "/icons/edit.png"}] " Edit"]

            [:button {:class "big-btn"}
             [:a {:href (str "/api/exportpage?page=" (-> @db :current-page))}
              [:img {:src "/icons/package.png"}]
              " Export"]]

            ]
           :transcript
           [:span
            [:button {:class "big-btn"
                      :on-click
                      #(swap! db assoc :mode :viewing)}
             [:img {:src "/icons/x.png"}] " Return"]]
           )


         ]))
    ))


(defn not-blank? [card]
  (not= "" (string/trim (get card "source_data")))
  )

(defn string->html [s]
  (-> s
      (double-comma-table)
      (md/md->html)
      (auto-links)
      (double-bracket-links)
      ))

(defn card->html [card]
  (-> (get card "server_prepared_data")
      (string->html)))


(defn send-to-input-box [value]
  [:input {:type "text"
           :id "sendto-inputbox"
           :value @value
          :on-change #(reset! value (-> % .-target .-value))}])



(defn card-bar [card]
  (let [meta-id  (str "cardmeta" (get card "hash") )
        state (r/atom {:toggle "none"})
        sendval (r/atom "")
        toggle! (fn [e]
                  (do
                    (if (= (-> @state :toggle) "none")
                      (swap! state #(conj % {:toggle "block"}) )
                      (swap! state #(conj % {:toggle "none"})))))
        close! (fn [e]
                 (swap! state #(conj % {:toggle "none"})))

        ]

    (fn [card]
      [:div {:class :card-meta}
         [:div
          [:span {:on-click (fn [e] (card-reorder!
                                       (-> @db :current-page)
                                       (get card "hash")
                                       "up"))}
           [:img {:src "/icons/chevrons-up.png"}]
           ]
          [:span {:on-click (fn [e] (card-reorder!
                                       (-> @db :current-page)
                                       (get card "hash")
                                       "down"))}
           [:img {:src "/icons/chevrons-down.png"}]]

          [:span {:on-click toggle! :style {:size "smaller" :float "right"}}
           (if (= (-> @state :toggle) "none")
             [:img {:src "/icons/eye.png"}]
             [:img {:src "/icons/eye-off.png"}]
             )

           ]]
       [:div {:id meta-id :style {:spacing-top "5px" :display (-> @state :toggle)
                                  }}
        [:div [:h4 "Card Bar"]]
        [:div
         [:span "ID: " (get card "id")] " | Hash: "
         [:span (get card "hash")] " | Source type: "
         [:span (get card "source_type")] " | Render type: "
         [:span (get card "render_type")]]

        [:div
         [:span
          "Send to Another Page : "
          [send-to-input-box sendval]

          [:input { :name "hash" :id "sendhash" :type "hidden" :value (get card "hash")}]
          [:input { :name "from" :id "sendcurrent" :type "hidden" :value (-> @db :current-page )}]
          [:img {:src "/icons/send.png"}]
          [:button {:on-click
                    (fn [e]
                      (card-send-to-page!
                       (-> @db :current-page)
                       (get card "hash")
                       @sendval))}  "Send"]
          ]
         ]
        ]
       ])))




(defn workspace [card]
  (let [state (r/atom {:code-toggle true
                       :calc-toggle false
                       :result-toggle true
                       :code (get card "server_prepared_data")
                       :calc []
                       :result ""})


        id (str "ws" (get card "hash"))
        code-id (str id "-code")
        calc-id (str id "-calc")
        result-id (str id "-result")

        toggle-code!
        (fn [e]
          (js/console.log (str "Toggle code " (-> @state :code-toggle)))

          (swap! state #(conj % {:code-toggle (-> @state :code-toggle not)})))

        toggle-calc!
        (fn [e]
          (js/console.log (str "Toggle calc " (-> @state :calc-toggle)) )
          (swap! state #(conj % {:calc-toggle (-> @state :calc-toggle not)})))

        toggle-result!
        (fn [e]
          (js/console.log "Toggle result "  (-> @state :result-toggle))
          (swap! state #(conj % {:result-toggle (-> @state :result-toggle not)})))

        display
        (fn [d]
          (if d "block" "none"))

        execute-code
        (fn [e]
          (let [result
                (sci/eval-string
                 (-> @state :code)
                 {:bindings {'replace replace}
                  :classes {'js goog/global
                            :allow :all}}

                 )]
            (swap! state #(conj % {:calc result :result result})))
          )
        ]

    (fn [card]
      (let []
        [:div {:class :workspace}
         [:h3 "Workspace"]
         [:p {:class :workspace-note} [:i "Note : this is a ClojureScript workspace based on "
                 [:a {:href "https://github.com/borkdude/sci"} "SCI"]
                 ". Be aware that it does not save any changes you make in the textbox.

You'll need to  edit the page fully to make permanent changes to the code. "]]
         [:div {:class :workspace-buttons}
          [:button {:class :workspace-button :on-click execute-code} "Run"]
          [:button {:class :workspace-button :on-click toggle-code!} "Code"]
          [:button {:class :workspace-button :on-click toggle-calc!} "Calculated"]
          [:button {:class :workspace-button :on-click toggle-result!} "Output"]]
         [:div {:class :code :style {:padding "3px"
                                     :display (display (-> @state :code-toggle))} }
          [:h4 "Source"]
          [:textarea {:cols 60 :rows 10
                      :on-change
                      (fn [e] (swap! state #(conj % {:code (-> e .-target .-value )})))}
           (trim (-> @state :code))]]
         [:div {:class :calculated-out :style {:padding "3px"
                                               :display (display (-> @state :calc-toggle))}}
          [:h4 "Calculated"]
          [:pre
           (with-out-str (pprint (str (-> @state :calc))))
           ]]
         [:div {:class :results :style {:padding "3px"
                                        :display (display (-> @state :result-toggle))}}
          [:h4 "Result"]
          [:div
           (let [result (-> @state :result)]
             (cond

               (number? result)
               (str result)

               (string? result)
               (if (= (first result) \<)
                 [:div {:dangerouslySetInnerHTML {:__html result}} ]
                 result
                 )

               (= (first result) :div)
               result


               :else
               (str result)))] ]
         ]))))


(defn card-top-bar [card]

  )

(defn on-click-for-links [e]
  (let [tag (-> e .-target)
                    classname (.getAttribute tag "class")
                    data (.getAttribute tag "data")
                    x (-> @db :dirty)]

                (if (= classname "wikilink")
                  (go-new! data)))
  )

(defn one-card [card]
  (let [
        inner-html
        (fn [s] [:div {:dangerouslySetInnerHTML {:__html s}}])

        state2 (r/atom {:toggle "block"})

        toggle!
        (fn [e]
          (do
            (if (= (-> @state2 :toggle) "none")
              (swap! state2 #(conj % {:toggle "block"}) )
              (swap! state2 #(conj % {:toggle "none"})))))

        ]
    ;;(js/console.log (pr-str card))

    (fn [card]
      (let [rtype (get card "render_type")
            data (get card "server_prepared_data")
            inner
            (condp = rtype

              ":code"
              (inner-html (str "<code>" data "</code>"))

              ":raw"
              (inner-html (str "<pre>" data "</pre>"))

              ":markdown"
              (inner-html (card->html card))

              ":manual-copy"
              (inner-html
               (str "<div class='manual-copy'>"
                    (card->html card)
                    "</div>"))

              ":html"
              (inner-html (str data))

              ":stamp"
              (inner-html (str data))

              ":hiccup"
              "THIS SHOULD BE HICCUP RENDERED"

              ":workspace"
              [workspace card]

              (str "UNKNOWN TYPE ( " rtype " ) " data))

            ]
        [:div {:class :card-outer}

         [:div {:class :card-meta}
          [:span {:on-click toggle! :style {:size "smaller" :float "right"}}
           (if (= (-> @state2 :toggle) "none")
             [:img {:src "/icons/maximize-2.svg"}]
             [:img {:src "/icons/minimize-2.svg"}]
             )]]

         [:div
          {:style {:spacing-top "5px"
                   :display (-> @state2 :toggle)}}
          [:div
           {:class "card"
            :on-click on-click-for-links

            }

           inner ]]
         [card-bar card]
         ]))))



(defn card-list []
  [:div
   [:div
    (try
      (let [cards (-> @db :cards)]
        (for [card (filter not-blank? cards)]

          (try
            [one-card card]
            (catch :default e
              [:div {:class :card-outer}
               [:div {:class "card"}
                [:h4 "Error"]
                (str e)]]))
          )
        )
      (catch :default e
        (do
          (js/console.log "ERROR")
          (js/console.log (str e))
          (js/alert e))))

    ]
   [:div
    (try
      (let [cards (-> @db :system-cards)]
        (for [card cards]
          [one-card card]
          )
        )
      (catch :default e
        (js/alert e)))]
   ])



(defn transcript []
  [:div {:class "transcript"
         :dangerouslySetInnerHTML {:__html (-> @db :transcript)}
         :on-click on-click-for-links

         }
   ])

(defn main-container []

  [:div
   [:div
    (condp = (-> @db :mode)

      :editing
      [:div {:class "edit-box"}
       [:textarea
        {:id "edit-field" :cols 80 :rows 40 :width "90%"
         :on-key-press
         (fn [e]
           (js/console.log "KEYPRESS ON TEXTAREA")
           (let [kc (.-charCode e)]
             (js/console.log "pressed " kc)
             (if (= (-> @db :mode) :editing)
               (cond
                 (and (.-ctrlKey e) (= 81))
                 (insert-text-at-cursor! "THIS IS INSERTED")
                 :else '())
               (if (and (.-ctrlKey e) (= 69 kc))
                 (swap! db assoc
                        :mode :editing)
                 (-> js/document (.getElementById "edit-field") (.focus) )))))
         }
        (-> @db :raw)]]

      :viewing
      [:div
       [card-list]]

      :transcript
      [:div
       [transcript]]
      )]
   ])







;; ===========================================================================

; Main page
(defn content []
  [:div
   [top-menu]
   [:div {:class "main-container"}
    [:div {:class "headerbar"}
     [nav-bar]]
   [:div {:class "context-box"}
    [:h2
     (if (= (-> @db :mode) :transcript)
       "Transcript"
       [:span
        (-> @db :current-page)
        [:span {:class "tslink"}
         [:a {:href (str
                     (string/replace (-> @db :site-url) #"/$" "")
                     "/" (-> @db :current-page))} " (public)" ]]]) ]

      [:div [tool-bar]]
    [main-container]
    ]
   [:div {:class "footer"}
    [:span
     [:span (-> @db :wiki-name) " || " ]
     [:span (-> @db :mode) " || "]
     [:span " || Home : " [:a {:href (-> @db :site-url)} (-> @db :site-url)] " || " ]
     [:span [:a {:href "/api/system/db"} "DB"] " || "]
     [:a {:href "https://github.com/interstar/cardigan-bay"} "Cardigan Bay "]
     "(c) Phil Jones 2020-2022  || "
     [:span "IP: "(str (-> @db :ip) ) " || "]
     [:a {:href
          (str "javascript:(function(){window.location='http://localhost:" (-> @db :port) "/api/bookmarklet?url='+document.URL;})();")} "Bookmark to this Wiki"]] ]]
   ]

  )


;; tells reagent to begin rendering




(r/render-component [content]
                   (.querySelector js/document "#app"))





(js/document.addEventListener
 "keypress"
 (fn [e]
   (js/console.log "KEYPRESS EVENT")
   (let [kc (.-charCode e)]

     (js/console.log "pressed " (.-charCode e))

     )))
