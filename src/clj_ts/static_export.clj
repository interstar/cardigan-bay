(ns clj-ts.static-export
  (:require [clojure.string :as string]
            [hiccup.core :as hiccup]
            [hiccup.page :as hpage]
            [markdown.core :as md]
            [clj-ts.common :as common]
            [clj-ts.card-server :as card-server]
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
  (string/replace text #"\[\[(.+?)\]\]"
                  (fn [[_ m]]
                    (str "<a class=\"external-link\" href=\""
                         (export-link (string/lower-case m) server-state)"\">"
                         m "</a>"))))

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




(defn export-page [page-name server-state]
  (let [cards (-> page-name card-server/load->cards)
        rendered (string/join "\n" (map #(card->html % server-state) cards))
        page (hiccup/html

              [:html
               [:head
                [:link {:rel "stylesheet" :type "text/css" :href "main.css" }]

                ]
               [:body
                [:h2 page-name]
                [:div
                 rendered]]]
              )
        file (export-file-path page-name server-state)
        ]
    (println "Exporting " page-name)
    (println "Outfile = " file)
    (spit file page)))

(defn export-all-pages [server-state]
  (doseq [p-name (remove #(or (= % "alllinks")
                              (= % "allpages")
                              (= % "brokenlinks")
                              (= % "orphanpages")
                              (= % "recentchanges")
                              (= % "systemrecentchanges"))
                         (card-server/all-pages))]
    (export-page p-name server-state)
    ))
