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




(defn export-file-path
  "Calculate the file-path for the exported page"
  [page-name server-state]
  (str (.export-page-dir server-state) page-name (.export-page-extension server-state)))


(defn export-link
  "Calculate the link URL to an exported page (for links from other pages)"
  [page-id server-state]
  (str
   (.export-page-internal-link-path server-state) page-id (.export-page-extension server-state))
  )



(defn double-bracket-links
  "Turn the internal double-bracket-links into real links in the exported pages"
  [text server-state ]
  (let [replace-link
        (fn [[_ m]]
          (do
            (if (pagestore/page-exists? server-state m)
              (str "<a class=\"external-link\" href=\""
                   (export-link m server-state)"\">"
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
            (double-bracket-links server-state ))]
    (str "<div class=\"card-outer\">
<div class=\"card\">
" html
         "</div></div>
")))






(def tpl
  (try
    (slurp "resources/clj_ts/export_template/index.html" )
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

(def main-css
  (try
    (slurp "resources/clj_ts/main.css" )
    (catch Exception e
      (do (println "ERROR FINDING CSS TEMPLATE " e)
          ""))))

(def cb-image
  (try
    (slurp "resources/clj_ts/cardigan-bay.png" )
    (catch Exception e
      (do (println "ERROR finding CardiganBay PICTURE " e)
          "")))  )


(defn export-page [page-name server-state tpl]
  (let [cards (-> page-name card-server/load->cards)
        rendered (string/join "\n" (map #(card->html % server-state) cards))
        insert-page (hiccup/html
                     [:div
                      [:div
                       rendered]
                      [:div {:class "system"}
                       (card->html (card-server/backlinks page-name) server-state)]]
                     )
        page (render tpl {:page-title page-name :page-main-content insert-page :time (java.time.LocalDateTime/now) :wiki-name (.wiki-name server-state)})
        file (export-file-path page-name server-state)
        ]
    (println "Exporting " page-name)
    (println "Outfile = " file)
    (spit file page)
    (spit (str (.export-page-dir server-state) "main.css") main-css  )))


(defn export-all-pages [server-state]
  (doseq [p-name (remove #(or
                              (= % "systemrecentchanges"))
                         (card-server/all-pages))]

    (export-page p-name server-state tpl)
    ))

(defn export-one-page [page-name server-state]
  (export-page page-name server-state tpl)
  )
