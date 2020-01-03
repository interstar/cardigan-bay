(ns clj-ts.common
  (:require [clojure.string :as string]
            [markdown.core :as md]) )

(defn raw->cards [p-name raw]
  (let [cards (string/split raw #"----")
        card (fn [c i]
               {:type :html
                :id (str "card " i)
                :data
                (md/md-to-html-string c)
                }) ]
    (apply vector (map card cards (iterate inc 0)))))


(defn double-bracket-links [page]
  (replace page #"\[\[(.+?)\]\]"
           (str "<span class=\"wikilink\" data=\"$1\" >$1</span>")))

(defn card->html [card]
  (-> card :data (md/md-to-html-string) (double-bracket-links)))
