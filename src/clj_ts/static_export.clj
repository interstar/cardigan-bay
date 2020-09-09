(ns clj-ts.static-export
  (:require [clojure.string :as string]
            [hiccup.core :as hiccup]
            [hiccup.page :as hpage]
            [markdown.core :as md]
            [clj-ts.common :as common]
            [clj-ts.card-server :as card-server]
            ))


(defn render [raw page-name server-root ext]
  (let [cards (card-server/raw->cards raw)
        ]
    cards))

(defn static-page-url [server-state]
  (str (-> server-state :site-url) "/view/"))

(defn double-bracket-links [text server-state ]
  (string/replace text #"\[\[(.+?)\]\]"
                  (str "<a class=\"external-link\" href=\"" (static-page-url server-state) "$1\">$1</a>")))

(defn card->html [card server-state]
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


(defn default-export-dir [server-state]
  (str (:page-dir server-state) "/exported/"))

(defn export-file [page-name server-state]
  (let [full-name
        (str (default-export-dir server-state) page-name )]
    full-name))

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
        file (export-file page-name server-state)
        ]
    (spit file page)))

(defn export-all-pages [server-state]
  (doseq [p-name (remove #(or (= % "alllinks")
                              (= % "allpages")
                              (= % "brokenlinks")
                              (= % "orphanpages")
                              (= % "recentchanges")
                              (= % "systemrecentchanges"))
                         (card-server/all-pages))]
    (println "Exporting " p-name)
    (export-page p-name server-state)
    ))
