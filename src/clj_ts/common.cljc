(ns clj-ts.common
  (:require [clojure.string :as string]

            [markdown.core :as md]
            [hasch.core :refer [uuid5 edn-hash]]) )


(defn extract-type [c]
  (let [fl (-> c (string/split-lines) first)
        ]))

(defn extract-data [c]
  )



(defn card->type-and-card [c]
  (let [card (string/trim c)
        rex #"^\s+:(\S+)" ]
    (if
      (not (re-find rex c))
      [:markdown c]
      [(->> c (re-find rex) second keyword)
       (string/replace-first c rex "")] ) ))

(defn package-card [id, type, deltype, data]
  {:type type
   :delivered_type deltype
   :id (str "card " id)
   :data data
   :hash (-> data (edn-hash) (uuid5))})


(defn auto-links [raw]
  (string/replace raw #"\s+(http(s)?://(\S))\s+"
                  (str "<a href=\"$1\">$1</span>")))

(defn double-bracket-links [page]
  (string/replace page #"\[\[(.+?)\]\]"
           (str "<span class=\"wikilink\" data=\"$1\" >$1</span>")))



(defn tag [t s] (str "<" t ">" s "</" t ">"))
(defn td [s] (tag "td" s))
(defn tr [s] (tag "tr" s))

(defn double-comma-table [raw]
  (loop [lines (string/split-lines raw) in-table false build [  ] ]
    (if (empty? lines) (string/join "\n" build)
        (let [line (first lines)]
          (if (string/includes? line ",,")
            (let [items (string/split line #",,")
                  row (tr (apply str (for [i items] (td i))))]
              (if in-table
                (recur (rest lines) true (conj build row))
                (recur (rest lines) true (conj build "<table class='double-comma-table'>" row))))
            (if in-table
              (recur (rest lines) false (conj build "</table>" line ) )
              (recur (rest lines) false (conj build line )))
            )
          ))
    ))

(defn blugh [raw]
  "BLUGHed")

(defn card->html [card]
  (-> card :data
      (double-comma-table)
      #?(:clj (md/md-to-html-string)
         :cljs (md/md->html))
      (auto-links)
      (double-bracket-links)

      ))
