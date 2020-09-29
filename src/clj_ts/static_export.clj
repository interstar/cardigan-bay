(ns clj-ts.static-export
  (:require [clojure.string :as string]
            [hiccup.core :as hiccup]
            [hiccup.page :as hpage]
            [markdown.core :as md]
            [clj-ts.common :as common]
            [clj-ts.card-server :as card-server]
            [clj-ts.pagestore :as pagestore]
            [cljstache.core :refer [render]]
            ))


(deftype PageExporter [page-store export-extension export-link-pattern]
  common/IPageExporter

  (as-map [ex]
    {:page-store page-store
     :export-extension export-extension
     :export-link-pattern export-link-pattern})

  (page-name->export-file-path [ex page-name]
    (-> ex :page-store .export-path
        (.resolve (str page-name export-extension))))

  (page-name->exported-link [ex page-id]
    (str export-link-pattern page-id export-extension ))


  (load-template [ex]
    (try
      (let [tpl-path (.resolve (:system-path page-store) "index.html")]
        (slurp (.toString tpl-path)))
      (catch Exception e
        (do (println "ERROR FINDING TEMPLATE " e "
USING DEFAULT")
            (hiccup/html
             [:html
              [:head]
              [:body
               [:div {:class "navbar"}]
               [:div
                [:h1 "{{page-title}}"]]
               [:div
                "{{{page-main-content}}}"]]])))))


  (export-page [ex page-name tpl]
    (let [ps (.page-store ex)
        cards (card-server/load->cards page-name)
        last-mod (.last-modified ps page-name)

        file-name (-> (.page-name->export-file-path ex page-name) .toString)

        rendered (string/join "\n" (map #(card->html % server-state) cards))
        insert-page (hiccup/html
                     [:div
                      [:div
                       rendered]
                      [:div {:class "system"}
                       (card->html (card-server/backlinks page-name) server-state)]]
                     )
        page (render tpl
                     {:page-title page-name
                      :page-main-content insert-page
                      :time (java.time.LocalDateTime/now)
                      :last-modified last-mod
                      :wiki-name (.wiki-name server-state)})

        ]
    (println "Exporting " page-name)
    (println "Outfile = " file)
    (spit file-name page)
))
  )



(defn double-bracket-links
  "Turn the internal double-bracket-links into real links in the exported pages"
  [text ps ]
  (let [replace-link
        (fn [[_ m]]
          (do
            (if (.page-exists? ps m)
              (str "<a class=\"exported-internal-link\" href=\""
                   (.page-name->exported-link ps m)"\">"
                   m "</a>")
              (str "<em>" m "</em>"))))]
    (string/replace text
                    #"\[\[(.+?)\]\]"
                    replace-link)))

(defn card->html
  "HTML for an exported card"
  [card server-state]
  (let [html
        (-> (get card :server_prepared_data)
            (common/double-comma-table)
            (md/md-to-html-string)
            (common/auto-links)
            (double-bracket-links (.page-store server-state) ))]
    (str "<div class=\"card-outer\">
<div class=\"card\">
" html
         "</div></div>
")))











(defn export-all-pages [server-state]
  (doseq [p-name (card-server/all-pages)]
    (.export-page  (.page-export server-state) tpl)
    ))

(defn export-one-page [page-name server-state]
  (export-page page-name server-state tpl)
  )
