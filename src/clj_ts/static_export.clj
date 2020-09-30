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

(defn card->html
  "HTML for an exported card"
  [card pe]
  (let [html
        (-> (get card :server_prepared_data)
            (common/double-comma-table)
            (md/md-to-html-string)
            (common/auto-links)
            (double-bracket-links pe))]
    (str "<div class=\"card-outer\">
<div class=\"card\">
" html
         "</div></div>
")))






(deftype PageExporter [page-store export-extension export-link-pattern]
  types/IPageExporter

  (as-map [ex]
    {:page-store page-store
     :export-extension export-extension
     :export-link-pattern export-link-pattern})

  (report [ex]
    (println "AAA " ex)
    (str "A PageExporter
Export Extension :\t" (:export-extension ex) "
Export Link Pattern :\t" (:export-link-pattern ex) "
Page Store ::
" (.page-store ex)))

  (page-name->export-file-path [ex page-name]
    (-> ex .page-store .export-path
        (.resolve (str page-name export-extension))))

  (page-name->exported-link [ex page-id]
    (str export-link-pattern page-id export-extension ))


  (load-template [ex]
    (try
      (let [tpl-path (.resolve (:system-path page-store) "index.html")]
        (println "Loading template
" tpl-path)
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
)

(defn make-page-exporter [page-store export-extension export-link-pattern]
  (let [ex  (->PageExporter page-store export-extension export-link-pattern)]
    (println (.report ex))
    ex))


(defn export-page [page-name server-state tpl]
  (let [ps (:page-store server-state)
        ex (:page-exporter server-state)
        cards (card-server/load->cards page-name)
        last-mod (.last-modified ps page-name)
        file-name (-> (.page-name->export-file-path ex page-name) .toString)

        rendered (string/join "\n" (map #(card->html % ex) cards))

        insert-page (hiccup/html
                     [:div
                      [:div
                       rendered]
                      [:div {:class "system"}
                       (card->html (card-server/backlinks page-name) ex)]]
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




(defn export-all-pages [server-state]
  (if (not= :not-available (.all-pages server-state))
    :not-exported
    (let [tpl (-> server-state :page-exporter .load-template)]
      (doseq [p-name (.all-pages server-state)]
        (export-page p-name server-state tpl)
        ))))

(defn export-one-page [page-name server-state]
  (let [tpl (-> server-state :page-exporter .load-template)]
    (export-page page-name server-state tpl))
  )
