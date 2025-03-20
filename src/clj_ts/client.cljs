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


;; Nav and History Functions - Defined early to avoid unresolved symbol errors

(declare load-page!)

(defn go-new! [p-name]
  (do
    ;; Don't reload or update history if we're already on this page
    (when (not= p-name (:current-page @db))
      (let [current-page (-> @db :current-page)
            new-past (conj (-> @db :past) current-page)]
        (load-page! p-name new-past [])
        (swap! db assoc :mode :viewing)
        ;; Add entry to browser history with both the page and navigation stacks
        (.pushState js/history 
                  (clj->js {:page p-name 
                            :previous current-page
                            :past new-past
                            :future []})
                  ""
                  (str "#" p-name))))
    ;; Always ensure we're in viewing mode, even if navigating to same page
    (swap! db assoc :mode :viewing)))

(defn back! []
  (when (seq (:past @db))
    (let [prev-page (-> @db :past last)
          new-past (pop (-> @db :past))
          new-future (conj (-> @db :future) (-> @db :current-page))
          current-page (-> @db :current-page)]
      (load-page! prev-page new-past new-future)
      ;; Update browser history without triggering a popstate event
      (.replaceState js/history 
                    (clj->js {:page prev-page
                             :previous current-page
                             :past new-past
                             :future new-future})
                    ""
                    (str "#" prev-page)))))

(defn forward! [p-name]
  (when (and p-name (seq (:future @db)))
    (let [new-past (conj (-> @db :past) (-> @db :current-page))
          new-future (pop (-> @db :future))
          current-page (-> @db :current-page)]
      (load-page! p-name new-past new-future)
      ;; Update browser history without triggering a popstate event
      (.replaceState js/history 
                    (clj->js {:page p-name
                             :previous current-page
                             :past new-past
                             :future new-future})
                    ""
                    (str "#" p-name)))))

(defn reload! []
  (load-page! (:current-page @db) (-> @db :past) (-> @db :future)))

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

               (js/console.log "Page loaded:" page-name)
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

(defn handle-popstate [e]
  (let [raw-state (.-state e)
        state (when raw-state (js->clj raw-state :keywordize-keys true))
        page (when (map? state) (:page state))
        prev-pages (when (map? state) (:past state []))
        next-pages (when (map? state) (:future state []))]
    (js/console.log "Popstate event:" (clj->js state) "page:" page 
                    "past:" (clj->js prev-pages)
                    "future:" (clj->js next-pages))
    (when (and page 
               (not= page (:current-page @db))
               (not= (:mode @db) :editing)) ; Don't navigate while editing
      ;; Update both the current page and the navigation stacks
      (swap! db assoc :past (vec prev-pages))
      (swap! db assoc :future (vec next-pages))
      (load-page! page (vec prev-pages) (vec next-pages)))))

;; Register the popstate handler when the app loads
(.addEventListener js/window "popstate" handle-popstate)

;; Add an initial history entry for the start page
(let [history-state (.-state js/history)
      start-page (or (:current-page @db) "HelloWorld")
      page-from-hash (when (not= "" (-> js/window .-location .-hash))
                       (subs (-> js/window .-location .-hash) 1))]
  (when (or (nil? history-state) 
            (= history-state "null") 
            (= (js->clj history-state) {}))
    (.replaceState js/history 
                  (clj->js {:page (or page-from-hash start-page)
                           :past []
                           :future []})
                  ""
                  (str "#" (or page-from-hash start-page)))))

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

(let [page-from-hash (when (not= "" (-> js/window .-location .-hash))
                       (subs (-> js/window .-location .-hash) 1))]
      (.send XhrIo
      "/startpage"
      (fn [e]
      (let [server-start-page (-> e .-target .getResponseText .toString)
            target-page (if (and page-from-hash (not= "" page-from-hash))
                          page-from-hash
                          server-start-page)]
        (js/console.log "Loading initial page:" target-page 
                        "from hash:" page-from-hash 
                        "server start:" server-start-page)
        ;; Initialize history with the target page
        (let [history-state (.-state js/history)]
          (when (or (nil? history-state) 
                    (= history-state "null") 
                    (= (js->clj history-state) {}))
            (.replaceState js/history 
                          (clj->js {:page target-page
                                   :past []
                                   :future []})
                          ""
                          (str "#" target-page))))
        ;; Load the page without pushing new history state
        (load-page! target-page [] [])
        (swap! db assoc :mode :viewing)))))



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

;; Card Components - Helper Functions and Components
;; Forward declarations for functions used before they're defined
(declare card-info-panel card-send-panel card-edit-panel card-bar workspace)

;; Helper for handling link clicks
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

;; Helper function to process workspace script into private and public parts
(defn process-script [src]
  (let [parts (string/split src #"//\s*PUBLIC\s*")
        private (if (> (count parts) 1) (first parts) "")
        public-raw (if (> (count parts) 1) (second parts) src)
        ;; Trim leading whitespace/newlines while preserving indentation structure
        public (string/replace public-raw #"^\s*\n+" "")]
    [private public]))

;; Execute code in the workspace
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

;; Temporary workspace function implementation
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

;; Render data card content
(defn render-data-type [data]
  [:div.data-card 
   {:dangerouslySetInnerHTML 
    {:__html (str "<pre>" 
               (-> data
                  (string/replace "&" "&amp;")
                  (string/replace "<" "&lt;")
                  (string/replace ">" "&gt;"))
               "</pre>")}}])

;; Renders card content based on card type
(defn render-card-content [rtype data card]
  (condp = rtype
    ":code"     [:div {:dangerouslySetInnerHTML {:__html (str "<code>" data "</code>")}}]
    ":raw"      [:div {:dangerouslySetInnerHTML {:__html (str "<pre>" data "</pre>")}}]
    ":data"     [render-data-type data]
    ":markdown" [:div {:dangerouslySetInnerHTML {:__html (card->html card)}}]
    ":manual-copy" [:div {:dangerouslySetInnerHTML 
                          {:__html (str "<div class='manual-copy'>" (card->html card) "</div>")}}]
    ":html"     [:div {:dangerouslySetInnerHTML {:__html (str data)}}]
    ":stamp"    [:div {:dangerouslySetInnerHTML {:__html (str data)}}]
    ":workspace" [workspace card]
    ;; Handle any other cases that might be data cards
    (if (and (string? rtype) (= (subs rtype 0 5) ":data"))
      [render-data-type data]
      [:div (str "UNKNOWN TYPE ( " rtype " ) " data)])))

;; Card movement controls (top, up, down, bottom buttons)
(defn card-movement-controls [card]
  [:div.card-controls {:style {:display "flex" :align-items "center"}}
   ;; Move to top button
   [:span.card-action-button
    {:on-click #(card-reorder! (-> @db :current-page) (get card "hash") "top")
     :title "Move to top"}
    [:img {:src "/icons/chevrons-up.png" :style {:transform "scale(1.3)"}}]]
   
   ;; Move up button
   [:span.card-action-button
    {:on-click #(card-reorder! (-> @db :current-page) (get card "hash") "up")
     :title "Move up"}
    [:img {:src "/icons/chevrons-up.png"}]]
   
   ;; Move down button
   [:span.card-action-button
    {:on-click #(card-reorder! (-> @db :current-page) (get card "hash") "down")
     :title "Move down"}
           [:img {:src "/icons/chevrons-down.png"}]]

   ;; Move to bottom button
   [:span.card-action-button
    {:on-click #(card-reorder! (-> @db :current-page) (get card "hash") "bottom")
     :title "Move to bottom"}
    [:img {:src "/icons/chevrons-down.png" :style {:transform "scale(1.3)"}}]]])

;; Toggle button for showing/hiding card options
(defn card-options-toggle [toggle-fn visible?]
  [:span.card-action-button
   {:on-click toggle-fn
    :style {:size "smaller" :float "right" :margin-left "auto"}
    :title "Toggle card options"}
   (if visible?
             [:img {:src "/icons/eye-off.png"}]
     [:img {:src "/icons/eye.png"}])])

;; Toggle button for showing/hiding card content
(defn card-visibility-toggle [toggle-fn visible?]
  [:span.card-action-button
   {:on-click toggle-fn
    :style {:size "smaller" :float "right"}
    :title "Toggle card visibility"}
   (if visible?
     [:img {:src "/icons/minimize-2.svg"}]
     [:img {:src "/icons/maximize-2.svg"}])])

;; Card info panel showing ID, hash, and types
(defn card-info-panel [card]
        [:div
         [:span "ID: " (get card "id")] " | "
   [:span.mini-button
    {:on-click #(clip-hash (-> @db :current-page) (get card "hash"))}
    "Hash: " (get card "hash")] " | Source type: "
         [:span (get card "source_type")] " | Render type: "
   [:span (get card "render_type")]])

;; Card send panel for moving a card to another page
(defn card-send-panel [card sendval]
  [:div.send-to-bar
         [:h4 "Send to Another Page"]
   [:div.send-to-inner
    [:input {:name "hash" :id "sendhash" :type "hidden" :value (get card "hash")}]
    [:input {:name "from" :id "sendcurrent" :type "hidden" :value (-> @db :current-page)}]
          [:input {:type "text"
                  :id "sendto-inputbox"
                  :value @sendval
                  :on-change #(reset! sendval (-> % .-target .-value))}]

    [:button {:on-click #(card-send-to-page!
                       (-> @db :current-page)
                       (get card "hash")
                          @sendval)}
     "Send"]]])

;; Card edit panel for editing card content
(defn card-edit-panel [card toggle-fn text-val]
  [:div.edit-card
         [:h4 "Edit Card"]
         [:div
          [:span
     [:button.big-btn
      {:on-click (fn [e]
                   (toggle-fn e)
                       (reload!))}
            [:img {:src "/icons/x.png"}] " Cancel"]
     [:button.big-btn
      {:on-click (fn [e]
                         (swap! db assoc :mode :viewing)
                   (toggle-fn e)
                         (save-card!
                          (-> @db :current-page)
                          (get card "hash")
                          (get card "source_type")
                          (-> js/document
                        (.getElementById (str "edit-" (get card "hash")))
                        .-value)))}
      [:img {:src "/icons/save.png"}] " Save"]]]
         [:div
[:textarea {:id (str "edit-" (get card "hash"))
            :rows 10
            :width "100%"
            :value @text-val
                :on-change #(reset! text-val (-> % .-target .-value))}]]])

;; Card bar component for additional card actions and options
(defn card-bar [card]
  (let [state (r/atom {:toggle "none"})
        sendval (r/atom "")
        text-val (r/atom (get card "source_data"))
        toggle-fn (fn [e]
                    (if (= (:toggle @state) "none")
                      (do
                        (swap! state assoc :toggle "block")
                        (reset! text-val (get card "source_data")))
                      (swap! state assoc :toggle "none")))]
    
    (fn [card]
      [:div.card-meta
       [:div {:id (str "cardmeta" (get card "hash"))
              :class :card-bar
              :style {:spacing-top "5px" :display (:toggle @state)}}
        [:div [:h3 "Card Bar"]]
        [card-info-panel card]
        
        [:hr]
        [card-send-panel card sendval]
        
        [:hr]
        [card-edit-panel card toggle-fn text-val]]])))

;; Main card component
(defn one-card [card]
  (let [content-state (r/atom {:toggle "block"})
        options-state (r/atom {:toggle "none"})
        
        toggle-content! (fn [e]
                         (if (= (:toggle @content-state) "none")
                           (swap! content-state assoc :toggle "block")
                           (swap! content-state assoc :toggle "none")))
        
        toggle-options! (fn [e]
                         (if (= (:toggle @options-state) "none")
                           (swap! options-state assoc :toggle "block")
                           (swap! options-state assoc :toggle "none")))]
    
    (fn [card]
      (let [rtype (get card "render_type")
            data (get card "server_prepared_data")]
        [:div.card-outer {:id (str "card-" (get card "hash"))}
         ;; Card header with maximize/minimize control
         [:div.card-meta
          [:div {:style {:display "flex" :justify-content "flex-end"}}
           [card-visibility-toggle toggle-content! (= (:toggle @content-state) "none")]]]
         
         ;; Card content (can be hidden)
         [:div {:style {:spacing-top "5px"
                        :display (:toggle @content-state)}}
          [:div.card {:on-click on-click-for-links}
           [render-card-content rtype data card]]]
         
         ;; Card footer with movement controls and eye toggle
         [:div.card-meta
          [:div {:style {:display "flex" :align-items "center"}}
           [card-movement-controls card]
           [card-options-toggle toggle-options! (= (:toggle @options-state) "block")]]]
         
         ;; Card options panel (can be hidden)
         [:div.card-meta
          [:div {:id (str "cardmeta" (get card "hash"))
                 :class :card-bar
                 :style {:spacing-top "5px" :display (:toggle @options-state)}}
           [:div [:h3 "Card Bar"]]
           [card-info-panel card]
           
           [:hr]
           [card-send-panel card (r/atom "")]
           
           [:hr]
           [card-edit-panel card toggle-options! (r/atom (get card "source_data"))]]]]))))




(defn card-list []
  [:div
   [:div
    (try
      (let [cards (-> @db :cards)]
        (for [card (filter not-blank? cards)]
          (try
            ^{:key (get card "hash")} [one-card card]
            (catch :default e
              (js/console.error "Error rendering card:" e)
              [:div {:class :card-outer}
               [:div {:class "card"}
                [:h4 "Error rendering card"]]]))))
      (catch :default e
        (js/console.error "Error in card list:" e)
        [:div {:class :card-outer}
         [:div {:class "card"}
          [:h4 "Error loading cards"]]]))]

   [:div
    (try
      (let [cards (-> @db :system-cards)]
        (for [card cards]
          (try
            ^{:key (get card "hash")} [one-card card]
      (catch :default e
              (js/console.error "Error rendering system card:" e)
              [:div {:class :card-outer}
               [:div {:class "card"}
                [:h4 "Error rendering system card"]]]))))
      (catch :default e
        (js/console.error "Error in system card list:" e)
        [:div.card-outer
         [:div.card
          [:h4 "Error loading system cards"]]]))]])


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
      [:div [card-list]]

      :network-editor
      [:div [network-canvas]]

      :transcript
      [:div [transcript]]
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
           (str "javascript:(function(){window.location='http://localhost:" (-> db :port) "/api/bookmarklet?url='+document.URL;})();")} "Bookmark to this Wiki"]] ]]
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
