(ns clj-ts.common
  (:require [clojure.string :as string]
            [markdown.core :as md]) )

(defn raw->cards [raw]
  (let [cards (string/split raw #"----")
        card (fn [c i]
               {:type :html
                :id (str "card " i)
                :data c
                }) ]
    (map card cards (iterate inc 0))))


(defn double-bracket-links [page]
  (string/replace page #"\[\[(.+?)\]\]"
           (str "<span class=\"wikilink\" data=\"$1\" >$1</span>")))

(defn card->html [card]
  (-> card :data
      #?(:clj (md/md-to-html-string)
         :cljs (md/md->html))
      (double-bracket-links)))
