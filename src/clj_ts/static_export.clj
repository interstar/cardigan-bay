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
      (let [tpl-path (.resolve (.system-path page-store) "index.html")]
        (println "Loading template
" tpl-path)
        (slurp (.toString tpl-path)))
      (catch Exception e
        (do (println "ERROR FINDING TEMPLATE
" e "
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

(defn export-page [page-name server-state tpl]
  (let [ps (:page-store server-state)
        ex (:page-exporter server-state)
        cards (card-server/load->cards-for-export page-name)
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
  (if (= :not-available (.all-pages server-state))
    :not-exported
    (let [tpl (-> server-state :page-exporter .load-template)
          all   (.all-pages server-state)
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
      (doseq [p-name a2]
        (println "Exporting " p-name)
        (try
          (export-page p-name server-state tpl )
(catch Exception e (println e))
          )
        )
      (println "Export recentchanges rss")
      (export-recentchanges-rss server-state)
      (println "Exporting media")
      (.export-media-dir (:page-exporter server-state))
      )))

(defn export-one-page [page-name server-state]
  (let [tpl (-> server-state :page-exporter .load-template)]
    (export-page page-name server-state tpl)
    (export-recentchanges-rss server-state)
    (println "Exporting media")
    (.export-media-dir (:page-exporter server-state))

    ))
