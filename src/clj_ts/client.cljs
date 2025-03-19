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
   [garden.core :as css]

   [clj-ts.networks :refer [network-canvas]]
   [clj-ts.common :refer [raw-card-text->card-map
                          double-comma-table embed-boilerplate
                          double-bracket-links auto-links ]]
   [clj-ts.embed-templates :as templates]
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
    page_data
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
                   start-page-name (-> data (get "server_prepared_page") (get "start_page_name"))
                   page-data-str (-> data (get "server_prepared_page") (get "page_data"))
                   page-data (try 
                               (read-string page-data-str) 
                               (catch js/Error e 
                                 (js/console.error "Error parsing page data:" e)
                                 {}))
                   ]

               (js/console.log "Page data loaded:" (clj->js page-data))
               (swap! db assoc
                      :current-page page-name
                      :site-url site-url
                      :wiki-name wiki-name
                      :port port
                      :ip ip
                      :start-page-name start-page-name
                      :raw raw
                      :cards cards
                      :system-cards system-cards
                      :page-data page-data
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


(defn save-card! [page-name hash source-type new-val]
  (let [form-data (generate-form-data
                   {"page" page-name
                    "hash" hash
                    "source_type" source-type
                    "new" new-val})]
    (.send XhrIo
           "/api/replacecard"
           (fn [e]
             (go
               (<! (timeout 500))
               (reload!)
               (r/force-update-all)))
           "POST"
           (pr-str {:page page-name
                    :data new-val
                    :hash hash
                    :source_type source-type}))

    ))


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
     [:li [:span {:class "clickable" :on-click (fn [] (back!))}
           [:img {:src "/icons/skip-back.png"}]]]
     [:li [:span {:class "clickable" :on-click (fn [] (forward! (-> @db :future last)))} ""
           [:img {:src "/icons/skip-forward.png"}]]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "InQueue")) } "InQueue"] ]
     [:li [:span {:class "clickable" :on-click (fn [] (swap! db assoc :mode :transcript))} "Transcript"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "RecentChanges"))} "RecentChanges"] ]
     [:li [:a {:href "/api/exportrecentpages"} "Export Recent Pages"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "Help"))} "Help"]]]))

(defn editing-menu []
  (fn []
    [:ul
     ]))

(defn transcript-menu []
  (fn []
    [:ul
     [:li [:span {:class "clickable" :on-click (fn [] (back!))}
           [:img {:src "/icons/skip-back.png"}]]]
     [:li [:span {:class "clickable" :on-click (fn [] (forward! (-> @db :future last)))} ""
           [:img {:src "/icons/skip-forward.png"}]]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "InQueue")) } "InQueue"] ]
     [:li [:span {:class "clickable" :on-click  (fn [] (swap! db assoc :mode :viewing))} "Return to View Page"] ]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "RecentChanges"))} "RecentChanges"] ]
     [:li [:a {:href "/api/exportrecentpages"} "Export Recent Pages"]]
     [:li [:span {:class "clickable" :on-click (fn [] (go-new! "Help"))} "Help"]]

     ])
  )

(defn top-menu []
  (fn []
    (let [start-page-name (-> @db :start-page-name)
          wiki-name (-> @db :wiki-name)]
      [:header {:class "fixed-menu"}
       [:div  {:class "nav-wrapper"}
        [:span {:class "website-title"} wiki-name]


        [:nav {:class "left-menu"}

         [:label {:for "menu-toggle" :class "menu-icon"} "\u2630"]
         [:input {:type "checkbox" :id "menu-toggle"}]
         (mode-selected
          [viewing-menu]
          [editing-menu ]
          [transcript-menu ]
          )]]
] ))
  )





(defn nav-input [value]
  [:input {:type "text"
           :id "navinputbox"
           :value @value
           :placeholder "Type a page-name, a term to search for, or a Clojure expression."
          :on-change #(reset! value (-> % .-target .-value))}])


;;;; Paste Bar

(defn send-to-clipboard [s]
  (-> (js/Promise.resolve (.writeText js/navigator.clipboard s))
      (.then (fn [_] (js/console.log (str "Text copied to clipboard " s))))
      (.catch (fn [error] (js/console.error "Failed to copy text:", error)))))

(defn clip-button [label text]
  [:button {:class "big-btn"
            :on-click
            (fn [e]
              (send-to-clipboard text))}
   label]
  )

(defn boilerplate-button
  ([label tag]
   (clip-button label (embed-boilerplate tag)))
  ([label tag new-url]
   (clip-button label (templates/replace-url-in-template tag new-url))))



(defn paged [class  & pages]
  (let [index (r/atom 0)]
    (fn []
      [:div {:class class
             :style {:display "flex"
                     :flex-direction "column"}}
       [:div
        [:span
         {:id "copy-bar-button"
          :class "mini-button"
          :on-click #(reset! index (mod (inc @index) (count pages)))}
         "Copy Bar : " (str @index) ]
       ]

       (nth pages @index)

       ])))




(defn copybar []
  (fn []
    [paged "copybar"
     [:div
      (boilerplate-button "Divider" :markdown)

      (clip-button "[[]]" "[[PAGENAME]]")
      (clip-button "[]()" "[LINKTEXT](URL)")
      (clip-button "<>" "<URL>")
      (clip-button "£" "£")
      (clip-button "?" "?")
      (clip-button "=" "=")
      (clip-button "$" "$")
      ]
     [:div
      (boilerplate-button "Image" :img)

      (clip-button "Search" "
----
:system

{:command :search
 :query \"\"
}

----")


      (boilerplate-button "YouTube" :youtube "https://www.youtube.com/watch?v=IDNUMBER")
      (boilerplate-button "Vimeo" :vimeo "http://vimeo.com/IDNUMBER")

      (boilerplate-button "SoundCloud" :soundcloud)
      (boilerplate-button "BandCamp" :bandcamp)
      (boilerplate-button "Twitter" :twitter)
      (boilerplate-button "RSS Feed" :rss)

      ]
     [:div
      (clip-button "Code Workspace" "
----
:workspace

;; Write some code

(str \"Hello Teenage America : 2 + 2 = \" (+ 2 2))


----")

      (clip-button "Code on Server" "
----
:evalmd

;; Write some code.
;; Note that if the result of your executed code is a number
;; You must convert it to a string.

(str \"### \" (+ 1 2 3))

")

      (clip-button "(F x)" "(F x)")
      (clip-button "()" "(XX)")
      (clip-button "[]" "[XX]")
      (clip-button "{}" "{KEY VAL}")
      (clip-button "#()" "#(OP )")
      (clip-button "(map...)" "(map #(OP ) XS)")
      (clip-button "(reduce...)" "(reduce #(OP ) INITIAL XS)")
      (clip-button "(filter...)" "(filter #(OP ) XS)")
      (clip-button "(str..." "(str )")

      (clip-button "(defn...)" "

(defn FNAME [ARGS]
  (BODY)
)

")


      (clip-button "(cond...)" "

(cond
  (EXP1) RES1
  (EXP2) RES2
  :else ELSE
)

")

      (clip-button "(for..." "

(for [X XS]

)

"                  )
      (clip-button "(-> ...)" "

  (-> XX
    (FF)
  )

")

      (clip-button ";;;;PUBLIC" ";;;;PUBLIC")

      ]]))

(defn nav-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
      (let [mode (-> @db :mode)
            start-page-name (-> @db :start-page-name)]

        (if (= mode :editing)
              [:div {:class "navbar"}
               [copybar]
               ]

              [:div {:class "navbar"}

               [nav-input current]

               [:div {:id "nav3"}



                [:button
                 {:class "big-btn"
                  :on-click (fn [] (go-new! @current))}
                                        ;[:img {:src "/icons/arrow-right.png"}]
                 "View It"]

                [:button
                 {:class "big-btn"
                  :on-click
                  (fn []
                    (search-text! (-> @current str)))}
                 "Find It"]

                [:button
                 {:class "big-btn"
                  :on-click
                  (fn []
                    (let [code (-> @current str)
                          result (sci/eval-string code)]
                      (prepend-transcript! code result)
                      )
                    )}
                 "Run It"]




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




(defn clip-hash [from-page hash]
  (send-to-clipboard
   (str "----
:transclude

{:from \"" from-page "\"
 :ids [\"" hash "\"] } "))
  )

(defn card-bar [card]
  (let [meta-id  (str "cardmeta" (get card "hash") )
        state (r/atom {:toggle "none"})
        sendval (r/atom "")
        text-val (r/atom (get card "source_data")) ;; Edit box


        toggle! (fn [e]
          (do
            (if (= (-> @state :toggle) "none")
              (do
                (swap! state #(conj % {:toggle "block"}))
                ; Update text-val instead of setting the textarea value directly
                (reset! text-val (get card "source_data")))
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
       [:div {:id meta-id
              :class :card-bar
              :style {:spacing-top "5px" :display (-> @state :toggle)
                                  }}
        [:div [:h3 "Card Bar"]]
        [:div
         [:span "ID: " (get card "id")] " | "
         [:span {:class "mini-button"
                 :on-click
                 (fn [e] (clip-hash (-> @db :current-page)
                                    (get card "hash")))
                 }
          "Hash: "(get card "hash")] " | Source type: "
         [:span (get card "source_type")] " | Render type: "
         [:span (get card "render_type")]]

        [:hr]
        [:div {:class :send-to-bar}
         [:h4 "Send to Another Page"]
         [:div {:class :send-to-inner}


          [:input { :name "hash" :id "sendhash" :type "hidden" :value (get card "hash")}]
          [:input { :name "from" :id "sendcurrent" :type "hidden" :value (-> @db :current-page )}]
          [:input {:type "text"
                  :id "sendto-inputbox"
                  :value @sendval
                  :on-change #(reset! sendval (-> % .-target .-value))}]

          [:button {:on-click
                    (fn [e]
                      (card-send-to-page!
                       (-> @db :current-page)
                       (get card "hash")
                       @sendval))}  "Send"]]

         ]
        [:hr]
        [:div {:class "edit-card"}
         [:h4 "Edit Card"]
         [:div
          [:span
           [:button {:class "big-btn"
                     :on-click
                     (fn [e]
                       (toggle! e)
                       (reload!))}
            [:img {:src "/icons/x.png"}] " Cancel"]
           [:button {:class "big-btn"
                     :on-click
                     (fn [e]
                       (do
                         (swap! db assoc :mode :viewing)
                         (toggle! e)
                         (save-card!
                          (-> @db :current-page)
                          (get card "hash")
                          (get card "source_type")
                          (-> js/document
                              (.getElementById (str "edit-" (get card "hash")) )
                              .-value)
                          )))}
            [:img {:src "/icons/save.png"}] " Save"]
             ]]
         [:div
          ; Bind the textarea value to text-val and add :on-change handler to update text-val
[:textarea {:id (str "edit-" (get card "hash"))
            :rows 10
            :width "100%"
            :value @text-val
            :on-change #(reset! text-val (-> % .-target .-value))}]


          ]

         ]
        ]
       ])))




(defn process-script [src]
  (let [parts (string/split src #"//\s*PUBLIC\s*")
        private (if (> (count parts) 1) (first parts) "")
        public-raw (if (> (count parts) 1) (second parts) src)
        ;; Trim leading whitespace/newlines while preserving indentation structure
        public (string/replace public-raw #"^\s*\n+" "")]
    [private public]))

(defn execute-code [card private public ui-id toggle-workspace-visibility! toggle-editor-visibility! state]
  (let [page-data (:page-data @db)
        _ (js/console.log "Executing with page data:" (clj->js page-data))
        ui-element (.getElementById js/document ui-id)
        ;; Create a consistent API object for both environments
        cb-api {:page-data page-data
                :ui-element ui-element
                :ui-element-id ui-id
                :hide-workspace (fn [] (toggle-workspace-visibility!))
                :show-workspace (fn [] (toggle-workspace-visibility!))
                :toggle-workspace (fn [] (toggle-workspace-visibility!))
                :hide-editor (fn [] 
                               (when (:editor-visible @state)
                                 (toggle-editor-visibility!)))
                :show-editor (fn [] 
                               (when (not (:editor-visible @state))
                                 (toggle-editor-visibility!)))
                :toggle-editor (fn [] (toggle-editor-visibility!))}
        src (str private " " public)
        result (try
                 (let [eval-result (sci/eval-string
                                    src
                                    {:bindings {'replace replace
                                                'cb cb-api
                                                'page-data page-data
                                                'ui-element ui-element
                                                'ui-element-id ui-id  ;; Pass the UI element ID to the script
                                                'hide-workspace (fn [] (toggle-workspace-visibility!))
                                                'show-workspace (fn [] (toggle-workspace-visibility!))
                                                'toggle-workspace (fn [] (toggle-workspace-visibility!))
                                                'hide-editor (fn [] 
                                                               (when (:editor-visible @state)
                                                                 (toggle-editor-visibility!)))
                                                'show-editor (fn [] 
                                                               (when (not (:editor-visible @state))
                                                                 (toggle-editor-visibility!)))
                                                'toggle-editor (fn [] (toggle-editor-visibility!))
                                                '*print-fn* (fn [& args] 
                                                              (js/console.log (apply str args)))
                                                'println (fn [& args] 
                                                           (let [s (apply str args)]
                                                             (js/console.log s)
                                                             s))}
                                     :classes {'js goog/global
                                               :allow :all}})]
                   ;; Handle hiccup output
                   (cond
                     ;; If the result is a hiccup vector, render it as hiccup
                     (and (vector? eval-result) (keyword? (first eval-result)))
                     (r/render-component eval-result (js/document.createElement "div"))
                     
                     ;; Otherwise, return the result as is
                     :else eval-result))
                 (catch :default e
                   (str "Error: " (.-message e))))]
    result))

(defn workspace [card]
  (let [id (-> (hash card) str (string/replace "-" ""))
        state (r/atom {:output ""
                       :workspace-visible true
                       :editor-visible true
                       :src (get card "source_data")})
        ui-id (str id "-ui")
        toggle-workspace-visibility! (fn []
                                       (swap! state update :workspace-visible not))
        toggle-editor-visibility! (fn []
                                    (swap! state update :editor-visible not))
        
        ;; Calculate optimal textarea rows based on line count
        calculate-rows (fn [text]
                         (let [lines (count (string/split-lines text))
                               min-rows 10
                               max-rows 30]
                           (max min-rows (min lines max-rows))))]
    
    (fn [card]
      (let [[private public] (process-script (get card "source_data"))
            ;; Initialize state src if it's the first render
            _ (when (= (:src @state) (get card "source_data"))
                (swap! state assoc :src public))
            ;; Calculate rows based on content
            rows (calculate-rows (:src @state))]
        [:div.workspace-container
         ;; Add a div for custom UI (always visible)
         [:div {:id ui-id :class "workspace-ui"}]
         
         ;; Workspace content (can be hidden)
         (when (:workspace-visible @state)
           [:div.workspace
            ;; Editor section (can be hidden independently)
            (when (:editor-visible @state)
              [:div.workspace-editor-section
               [:textarea.workspace-editor {:value (:src @state)
                                            :rows rows
                                            :on-change #(swap! state assoc :src (.. % -target -value))}]
               [:div.workspace-buttons
                [:button.workspace-run {:on-click #(let [result (execute-code card private (:src @state) ui-id toggle-workspace-visibility! toggle-editor-visibility! state)]
                                                     (swap! state assoc :output (cond
                                                                                  ;; If result is a DOM element (from hiccup rendering)
                                                                                  (instance? js/HTMLElement result)
                                                                                  (let [output-html (.-outerHTML result)]
                                                                                    output-html)
                                                                                  
                                                                                  ;; If result is a string
                                                                                  (string? result)
                                                                                  result
                                                                                  
                                                                                  ;; Otherwise convert to string
                                                                                  :else
                                                                                  (str result))))} "Run"]
                [:button.workspace-hide-editor {:on-click #(swap! state assoc :editor-visible false)} "Hide Editor"]]])
            
            ;; Output section (always visible when workspace is visible)
            [:div.workspace-output {:dangerouslySetInnerHTML {:__html (:output @state)}}]])
         
         ;; Show buttons (only visible when respective elements are hidden)
         (when (not (:workspace-visible @state))
           [:button.workspace-show {:on-click #(swap! state assoc :workspace-visible true)} "Show Workspace"])
         
         (when (and (:workspace-visible @state) (not (:editor-visible @state)))
           [:button.workspace-show-editor {:on-click #(swap! state assoc :editor-visible true)} "Show Editor"])]))))

(defn card-top-bar [card]

  )

(defn on-click-for-links [e]
  (let [target (-> e .-target)
        target-tag-name (-> target .-tagName string/lower-case)
        interactive-elements #{"textarea" "input" "select" "button"}]
    ;; Ignore clicks on interactive elements
    (when-not (contains? interactive-elements target-tag-name)
      (let [wikilink-el (loop [el target]
                          (cond
                            (nil? el) nil
                            (= (.getAttribute el "class") "wikilink") el
                            :else (recur (.-parentElement el))))]
        (when wikilink-el
          (let [data (.getAttribute wikilink-el "data")]
            ;; Stop propagation only for wiki link clicks
            (.stopPropagation e)
            (go-new! data)))))))

(defn render-data-type [data]
  ;; Render data type using the .data-card class defined in external CSS
  ;; The data is already pretty-printed on the server
  [:div {:class "data-card" 
         :dangerouslySetInnerHTML {:__html (str "<pre>" 
                                               ;; Ensure HTML entities are properly escaped
                                               (-> data
                                                  (string/replace "&" "&amp;")
                                                  (string/replace "<" "&lt;")
                                                  (string/replace ">" "&gt;"))
                                               "</pre>")}}])

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
    (fn [card]
      (let [rtype (get card "render_type")
            data (get card "server_prepared_data")
            
            inner
            (condp = rtype
              ":code"
              (inner-html (str "<code>" data "</code>"))

              ":raw"
              (inner-html (str "<pre>" data "</pre>"))

              ":data"
              (render-data-type data)
              
              (condp = rtype
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

                ":workspace"
                [workspace card]

                ;; Handle any other cases that might be data cards
                (if (and (string? rtype) (= (subs rtype 0 5) ":data"))
                  (render-data-type data)
                  (str "UNKNOWN TYPE ( " rtype " ) " data))))

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
            :on-click on-click-for-links}
           inner]]

         [card-bar card]
         ]))))



(defn card-list []
  [:div
   [:div
    (try
      (let [cards (-> @db :cards)]
        (for [card (filter not-blank? cards)]
          (try
            ^{:key (get card "hash")} [one-card card] ; Add a key based on the card's hash
            (catch :default e
              [:div {:class :card-outer}
               [:div {:class "card"}
                [:h4 "Error"]
                (str e)]]))))
      (catch :default e
        (do
          (js/console.log "ERROR")
          (js/console.log (str e))
          (js/alert e))))]

   [:div
    (try
      (let [cards (-> @db :system-cards)]
        (for [card cards]
          ^{:key (get card "hash")} [one-card card] ; Add a key based on the card's hash
          ))
      (catch :default e
        (js/alert e)))]])


(defn transcript []
  [:div {:class "transcript"
         :dangerouslySetInnerHTML {:__html (-> @db :transcript)}
         :on-click on-click-for-links}])

(defn main-container []
  [:div
   [:div
    (condp = (-> @db :mode)

      :editing
      [:div {:class "edit-box"}
       [:textarea
        {:id "edit-field" 
         :cols 80 
         :rows 40 
         :width "90%"
         :value (-> @db :raw)
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
         :on-change #(swap! db assoc :raw (-> % .-target .-value))
         }]]

      :viewing
      [:div
       [card-list]]

      :network-editor
      [:div
       [network-canvas]]

      :transcript
      [:div
       [transcript]]
      )]
   ])







;; ===========================================================================

; Main page
(defn content []
  [:div
   ;; Removing workspace styles which are now in external CSS files
   [top-menu]
   [:div {:class "navbar-spacer"}]
   [:div {:class "headerbar"}
    [nav-bar]]
   [:div {:class "main-container"}
    [:div {:class "context-box"}
     [:h2
      (if (= (-> @db :mode) :transcript)
        "Transcript"
        [:span
         (-> @db :current-page)
         [:span {:class "tslink"}
          [:a {:href (str
                      (string/replace (-> @db :site-url) #"/$" "")
                      "/" (-> @db :current-page))} " (public)"]]])]
     [:div [tool-bar]]
     [main-container]]
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
   (let [target-tag-name (-> e .-target .-tagName string/lower-case)
         interactive-elements #{"textarea" "input" "select" "button"}]
     ;; Only handle keypress events if they're not from an interactive element
     (when-not (contains? interactive-elements target-tag-name)
   (js/console.log "KEYPRESS EVENT")
   (let [kc (.-charCode e)]
         (js/console.log "pressed " (.-charCode e)))))))
