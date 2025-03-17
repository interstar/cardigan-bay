(ns clj-ts.static-export
  (:require [clojure.string :as string]
            [hiccup.core :as hiccup]
            [hiccup.page :as hpage]
            [markdown.core :as md]
            [clj-ts.common :as common]
            [clj-ts.types :as types]
            [clj-ts.card-server :as card-server]
            [clj-ts.pagestore :as pagestore]
            [cljstache.core :refer [render]]
            [cljs.reader :as reader]
            ))




(defn double-bracket-links
  "Turn the internal double-bracket-links into real links in the exported pages"
  [text pe ]
  (let [replace-link
        (fn [[_ m]]
          (do
            (if (.page-exists? (.page-store pe) m)
              (str "<a class=\"exported-internal-link\" href=\""
                   (.page-name->exported-link pe m)"\">"
                   m "</a>")
              (str "<em>" m "</em>"))))]
    (string/replace text
                    #"\[\[(.+?)\]\]"
                    replace-link)))



(defn process-script [s]
  (if (string/includes? s ";;;;PUBLIC")
    (let [broken (string/split s #";;;;PUBLIC")
          private (first broken)
          public (second broken)]
      [private public]
      )
    ["" s])
  )

(defn exported-workspace [card page-data]
  (let [id (-> (hash card) (string/replace "-" ""))
        fn-name (str "run" id)
        src-name (str "id" id)
        src-name-private (str "idp" id)
        output-name (str "out" id)
        ui-id (str "ui" id)  ;; Unique ID for custom UI
        workspace-id (str "workspace" id)  ;; ID for the workspace container
        editor-id (str "editor" id)  ;; ID for the editor section
        show-editor-id (str "show-editor" id)  ;; ID for the show editor button
        [private public] (process-script (:source_data card))
        
        ;; Serialize page data as an EDN string that can be embedded directly in the script
        page-data-str (pr-str page-data)
        
        final-script (str "(defn " fn-name " []\n"
          "  (let [public-src (->
                       (.getElementById js/document \"" src-name  "\")
                       .-value
                    )\n"
          "       private-src (->
                       (.getElementById js/document \"" src-name-private "\")
                       .-value
                    )\n"
          "       ;; Page data is directly embedded as an EDN string\n"
          "       page-data-value " page-data-str "\n"
          "       workspace-element (.getElementById js/document \"" workspace-id "\")\n"
          "       editor-element (.getElementById js/document \"" editor-id "\")\n"
          "       show-editor-button (.getElementById js/document \"" show-editor-id "\")\n"
          "       ui-element (.getElementById js/document \"" ui-id "\")\n"
          "       hide-workspace-fn (fn [] 
                               (set! (.. workspace-element -style -display) \"none\"))\n"
          "       show-workspace-fn (fn [] 
                               (set! (.. workspace-element -style -display) \"block\"))\n"
          "       toggle-workspace-fn (fn []
                                 (if (= (.. workspace-element -style -display) \"none\")
                                   (show-workspace-fn)
                                   (hide-workspace-fn)))\n"
          "       hide-editor-fn (fn []
                            (set! (.. editor-element -style -display) \"none\")
                            (set! (.. show-editor-button -style -display) \"block\"))\n"
          "       show-editor-fn (fn []
                            (set! (.. editor-element -style -display) \"block\")
                            (set! (.. show-editor-button -style -display) \"none\"))\n"
          "       toggle-editor-fn (fn []
                              (if (= (.. editor-element -style -display) \"none\")
                                (show-editor-fn)
                                (hide-editor-fn)))\n"
          "       print-fn (fn [& args] (.log js/console (clojure.string/join \" \" args)))\n"
          "       println-fn (fn [& args] 
                            (let [s (clojure.string/join \" \" args)]
                              (.log js/console s)
                              s))\n"
          "       ;; Create a consistent API object for both environments\n"
          "       cb-obj {:page-data page-data-value\n"
          "           :ui-element ui-element\n"
          "           :ui-element-id \"" ui-id "\"\n"
          "           :hide-workspace hide-workspace-fn\n"
          "           :show-workspace show-workspace-fn\n"
          "           :toggle-workspace toggle-workspace-fn\n"
          "           :hide-editor hide-editor-fn\n"
          "           :show-editor show-editor-fn\n"
          "           :toggle-editor toggle-editor-fn}\n"
          "       ;; Create a prefix to inject at the beginning of the user's script\n"
          "       cb-prefix (str \"(def cb {:page-data \" (pr-str page-data-value) \"\n"
          "                         :ui-element (.getElementById js/document \\\"" ui-id "\\\")\n"
          "                         :ui-element-id \\\"" ui-id "\\\"\n"
          "                         :hide-workspace (fn [] (set! (.. (.getElementById js/document \\\"" workspace-id "\\\") -style -display) \\\"none\\\"))\n"
          "                         :show-workspace (fn [] (set! (.. (.getElementById js/document \\\"" workspace-id "\\\") -style -display) \\\"block\\\"))\n"
          "                         :toggle-workspace (fn [] (if (= (.. (.getElementById js/document \\\"" workspace-id "\\\") -style -display) \\\"none\\\")\n"
          "                                               (set! (.. (.getElementById js/document \\\"" workspace-id "\\\") -style -display) \\\"block\\\")\n"
          "                                               (set! (.. (.getElementById js/document \\\"" workspace-id "\\\") -style -display) \\\"none\\\")))\n"
          "                         :hide-editor (fn [] (set! (.. (.getElementById js/document \\\"" editor-id "\\\") -style -display) \\\"none\\\")\n"
          "                                         (set! (.. (.getElementById js/document \\\"" show-editor-id "\\\") -style -display) \\\"block\\\"))\n"
          "                         :show-editor (fn [] (set! (.. (.getElementById js/document \\\"" editor-id "\\\") -style -display) \\\"block\\\")\n"
          "                                         (set! (.. (.getElementById js/document \\\"" show-editor-id "\\\") -style -display) \\\"none\\\"))\n"
          "                         :toggle-editor (fn [] (if (= (.. (.getElementById js/document \\\"" editor-id "\\\") -style -display) \\\"none\\\")\n"
          "                                            (do (set! (.. (.getElementById js/document \\\"" editor-id "\\\") -style -display) \\\"block\\\")\n"
          "                                                (set! (.. (.getElementById js/document \\\"" show-editor-id "\\\") -style -display) \\\"none\\\"))\n"
          "                                            (do (set! (.. (.getElementById js/document \\\"" editor-id "\\\") -style -display) \\\"none\\\")\n"
          "                                                (set! (.. (.getElementById js/document \\\"" show-editor-id "\\\") -style -display) \\\"block\\\"))))})\\n\")\n"
          "       ;; Combine the prefix with the user's script\n"
          "       modified-src (str cb-prefix private-src \" \" public-src)\n"
          "       result (try\n"
          "                (js/scittle.core.eval_string modified-src {:bindings {'page-data page-data-value\n"
          "                                                          'ui-element ui-element\n"
          "                                                          'ui-element-id \"" ui-id "\"\n"
          "                                                          '*print-fn* print-fn\n"
          "                                                          'println println-fn}})\n"
          "                (catch :default e\n"
          "                  (str \"Error: \" (.-message e))))\n"
          "       out (-> (.getElementById js/document \"" output-name  "\")
                       .-innerHTML
                       (set! result) )\n"
          "\n"
          "]\n"
          "   (.log js/console result)\n"
          "\n"
          "    ))\n")
        vname (str ".-" fn-name)
        set (str "(set! (" vname " js/window) " fn-name ")")
        
        ;; CSS styles for the workspace
        workspace-styles (str "<style>\n"
          ".scittle-workspace-container {\n"
          "  margin: 10px 0;\n"
          "  font-family: sans-serif;\n"
          "}\n"
          "\n"
          ".workspace-ui {\n"
          "  margin-bottom: 15px;\n"
          "}\n"
          "\n"
          ".scittle-workspace {\n"
          "  background-color: #f5f5f5;\n"
          "  border: 1px solid #ddd;\n"
          "  border-radius: 4px;\n"
          "  padding: 10px;\n"
          "  margin-bottom: 15px;\n"
          "}\n"
          "\n"
          ".workspace-editor-section {\n"
          "  margin-bottom: 10px;\n"
          "}\n"
          "\n"
          ".scittle-workspace textarea {\n"
          "  width: 100%;\n"
          "  min-height: 150px;\n"
          "  font-family: monospace;\n"
          "  padding: 8px;\n"
          "  border: 1px solid #ccc;\n"
          "  border-radius: 4px;\n"
          "  margin-bottom: 10px;\n"
          "  resize: vertical;\n"
          "}\n"
          "\n"
          ".workspace-buttons {\n"
          "  display: flex;\n"
          "  gap: 10px;\n"
          "  margin-bottom: 10px;\n"
          "}\n"
          "\n"
          ".workspace-buttons button {\n"
          "  padding: 8px 16px;\n"
          "  border-radius: 4px;\n"
          "  cursor: pointer;\n"
          "  border: none;\n"
          "}\n"
          "\n"
          ".workspace-buttons button:first-child {\n"
          "  background-color: #4CAF50;\n"
          "  color: white;\n"
          "  font-weight: bold;\n"
          "}\n"
          "\n"
          ".workspace-buttons button:nth-child(2) {\n"
          "  background-color: #ff9800;\n"
          "  color: white;\n"
          "}\n"
          "\n"
          "#" show-editor-id " {\n"
          "  background-color: #ff9800;\n"
          "  color: white;\n"
          "  border: none;\n"
          "  padding: 8px 16px;\n"
          "  border-radius: 4px;\n"
          "  cursor: pointer;\n"
          "  font-weight: bold;\n"
          "  margin-bottom: 10px;\n"
          "  display: none;\n"
          "}\n"
          "\n"
          "#" output-name " {\n"
          "  background-color: white;\n"
          "  border: 1px solid #ddd;\n"
          "  border-radius: 4px;\n"
          "  padding: 10px;\n"
          "  min-height: 50px;\n"
          "}\n"
          "</style>")
        
        ]

    (hiccup/html
     [:div {:class "scittle-workspace-container"}
      ;; Add CSS styles
      [:div {:dangerouslySetInnerHTML {:__html workspace-styles}}]
      
      ;; Add a div for custom UI (always visible)
      [:div {:id ui-id :class "workspace-ui"}]
      
      ;; Workspace content (can be hidden)
      [:div {:id workspace-id :class "scittle-workspace"}
       ;; Editor section (can be hidden independently)
       [:div {:id editor-id :class "workspace-editor-section"}
        [:input {:type :hidden
                 :id src-name-private
                 :value private}]
        [:textarea {:id src-name :cols 80 :rows 15}
         public]
        
        [:script {:type "application/x-scittle"}
         "\n"
         final-script
         "\n"
         set
         "\n"]
        [:div {:class "workspace-buttons"}
         [:button {:onclick (str fn-name "()")} "Run"]
         [:button {:onclick (str fn-name "(); document.getElementById('" editor-id "').style.display='none'; document.getElementById('" show-editor-id "').style.display='block';")} 
          "Hide Editor"]]]
       
       ;; Output section (always visible when workspace is visible)
       [:div {:id output-name}]]
      
      ;; Button to show editor (initially hidden)
      [:button {:id show-editor-id
                :style "display: none;"
                :onclick (str fn-name "(); document.getElementById('" editor-id "').style.display='block'; document.getElementById('" show-editor-id "').style.display='none';")}
       "Show Editor"]]))
  )

(defn card-specific-wrapper [card server-prepared page-data]
  (do
    (condp = (:render_type card)
      :manual-copy
      (str "<div class='manual-copy'>" server-prepared "</div>")
      :code
      (str "<code>" server-prepared "</code>")
      :raw
      (str "<pre>" server-prepared  "</pre>")
      :workspace (exported-workspace card page-data)
      :transclude "<div class='transcluded'>" server-prepared "</div>"
      server-prepared))
  )


(defn card->html
  "HTML for an exported card"
  [card pe page-data]
  (let [html
        (condp = (:source_type card)
          :patterning
          (:server_prepared_data card)

          :code
          (:server_prepared_data card)

          (-> (get card :server_prepared_data)
              (common/double-comma-table)
              (md/md-to-html-string)
              (common/auto-links)
              (double-bracket-links pe)))]
    (str "<div class=\"card-outer\">
<div class=\"card\">
" (card-specific-wrapper card html page-data)
         "</div></div>
")))




(defn ep [s] (if (nil? s) "NONE" s))

(deftype PageExporter [page-store export-extension export-link-pattern]
  types/IPageExporter

  (as-map [ex]
    {:page-store page-store
     :export-extension export-extension
     :export-link-pattern export-link-pattern})

  (report [ex]
    (str "Export Extension :\t" (ep export-extension ) "
Export Link Pattern :\t" (ep export-link-pattern) "
Example Exported Link :\t" (.page-name->exported-link ex "ExamplePage")
         ))

  (export-path [ex]
    (-> ex .page-store .export-path)
    )

  (page-name->export-file-path [ex page-name]
    (-> ex .page-store .export-path
        (.resolve (str page-name export-extension))))

  (page-name->exported-link [ex page-id]
    (str export-link-pattern page-id export-extension ))

  (media-name->exported-link [ex media-name]
    (str export-link-pattern "media/" media-name))

  (api-path [ex]
    (.resolve (-> ex .page-store .export-path) "api"))



  (load-template [ex]
    (try
      (let [tpl-path (.resolve (.system-path page-store) "export_resources/index.html")
            ]
        (println "Loading template
" tpl-path)
        (slurp (.toString tpl-path))
        )
      (catch Exception e
        (do (println "ERROR FINDING TEMPLATE
" e "
USING DEFAULT")
            (hiccup/html
             [:html
              [:head]
              [:body
               [:div "<!-- NOTE :: Cardigan Bay couldn't find custom template, using hardwired default -->"]
               [:div {:class "navbar"}]
               [:div
                [:h1 "{{page-title}}"]]
               [:div
                "{{{page-main-content}}}"]]])))))

  (load-main-css [ex]
    (try
      (let [css-path (.resolve (.system-path page-store) "export_resources/main.css")
            ]
        (println "Loading CSS
" css-path)
        (slurp (.toString css-path))
        )
      (catch Exception e
        (do (println "ERROR FINDING CSS FILE " e "
USING DEFAULT")
            "/* DEFAULT CSS IS EMPTY */"))))

  (export-media-dir [ex]
    (let [from-stream (.media-files-as-new-directory-stream page-store)
          to (.media-export-path page-store)]
      (try
        (doseq [file from-stream]
          (let [new-file (new java.io.FileOutputStream (.toFile (.resolve to (.getFileName file))))]
            (println "copying " (str file) " to " (str new-file))
            (java.nio.file.Files/copy file new-file)
            ))
        (catch Exception e (println (str "Something went wrong " e))))

      ))

  )

(defn make-page-exporter [page-store export-extension export-link-pattern]
  (->PageExporter page-store export-extension export-link-pattern))



(defn export-recentchanges-rss [server-state]
  (let [api-path (-> server-state :page-exporter .api-path)
        rc-rss (.resolve api-path "rc-rss.xml")
        link-fn (fn [p-name]
                  (str (:site-url server-state) p-name)) ]
    (spit (.toString rc-rss) (card-server/rss-recent-changes link-fn))
    ))

(defn export-main-css [server-state main-css]
  (let [
        css-path (.resolve (-> server-state :page-exporter .export-path)  "main.css" )]
    (println (str "Exporting main.css to " css-path))
    (try
      (spit (.toString css-path) main-css)
      (catch Exception e (println "Something went wrong ... " e)))
    ))

(defn export-page [page-name server-state tpl]
  (let [ps (:page-store server-state)
        ex (:page-exporter server-state)
        cards
        (card-server/load->cards-for-export
         page-name
         (fn [s] (double-bracket-links s ex)))
        page-data (card-server/collect-page-data cards)
        last-mod (.last-modified ps page-name)
        file-name (-> (.page-name->export-file-path ex page-name) .toString)

        rendered (string/join
                  "\n"
                  (map #(card->html % ex page-data)
                       (filter #(not (common/card-is-blank? %)) cards)))

        insert-page (hiccup/html
                     [:div
                      [:div
                       rendered]
                      [:div {:class "system"}
                       (card->html (card-server/backlinks page-name) ex page-data)]]
                     )
        page (render tpl
                     {:page-title page-name
                      :page-main-content insert-page
                      :time (java.time.LocalDateTime/now)
                      :last-modified last-mod
                      :wiki-name (.wiki-name server-state)})

        ]
    (println "Exporting " page-name)
    (println "Outfile = " file-name)
    (spit file-name page)
))


(defn export-list-of-pages [server-state page-names]
  (let [tpl (-> server-state :page-exporter .load-template)
        ]
    (doseq [p-name page-names]
      (println "Exporting " p-name)
      (try
        (export-page p-name server-state tpl )
        (catch Exception e (println e))
        ))))

(defn export-all-pages [server-state]
  (if (= :not-available (.all-pages server-state))
    :not-exported
    (let [css (-> server-state :page-exporter .load-main-css)
          all (.all-pages server-state)
          a2
          (filter
           (fn [name]
             (cond
                  (= "AllPages" name) false
                  (= "AllLinks" name) false
                  (= "BrokenLinks" name) false
                  (= "OrphanPages" name) false
                  :otherwise true  ))
           (.all-pages server-state)
           )]
      (export-list-of-pages server-state a2)
      (println "Export recentchanges rss")
      (export-recentchanges-rss server-state)
      (println "Export main.css")
      (export-main-css server-state css)
      (println "Exporting media")
      (.export-media-dir (:page-exporter server-state))
      )))


(defn export-recent-pages [server-state]
  (let [ps (:page-store server-state)
        css (-> server-state :page-exporter .load-main-css)
        recent-page-names (.recent-changes-as-page-list ps)]
      (export-list-of-pages server-state recent-page-names)
      (println "Export recentchanges rss")
      (export-recentchanges-rss server-state)
      (println "Export main.css")
      (export-main-css server-state css)
      (println "Exporting media")
      (.export-media-dir (:page-exporter server-state))
      )
  )



(defn export-one-page [page-name server-state]
  (let [tpl (-> server-state :page-exporter .load-template)]
    (export-page page-name server-state tpl)
    (export-recentchanges-rss server-state)
    (println "Exporting media")
    (.export-media-dir (:page-exporter server-state))

    ))
