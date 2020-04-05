(ns clj-ts.common
  (:require [clojure.string :as string]

            [markdown.core :as md]
            [hasch.core :refer [uuid5 edn-hash]]) )


;; Manage Cards



(defn raw-card->type-and-data [c]
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
   :id id
   :data data
   :hash (-> data (edn-hash) (uuid5))})


(defn card->raw [{:keys [id type data]}]
  (if  (=  type :markdown)
    data
    (str "\n" type "\n" (string/trim data) )))


(defn append-to-card [card extra]
  (package-card (:id card) (:type card) (:delivered_type card) (str (:data card) extra)))

;; Cards in card list

(defn find-card-by-hash [cards hash]
  "Take a list of cards and return the one that matches hash or nil"
  (let [results (filter #(= hash (:hash %)) cards )]
    (if (> (count results) 0)
      (first results)
      nil)))

(defn sub-card [cards p new-card]
  "Replace the first card that matches p with new-card. If no card matches, return cards unchanged"
  (let [un-p #(not (p %))
        before (take-while un-p cards)
        after (rest (drop-while un-p cards))]
    (if (= 0 (count (filter p cards)))
      cards
      (concat before [new-card] after)
      )))


(defn append-to-card-by-hash [cards hash extra]
  (let [old (find-card-by-hash cards hash)
        new (append-to-card old extra)]
    (sub-card cards #(= hash (:hash %)) new)))

(defn cards->raw [cards]
  (string/join "\n----" (map card->raw cards)))

;; Rendering / special Markup

(defn auto-links [raw]
    (string/replace raw #"\s+(http(s)?://(\S))\s+"
                    (str "<a href=\"$1\">$1</span>")))

(defn double-bracket-links [page]
  (string/replace page #"\[\[(.+?)\]\]"
           (str "<span class=\"wikilink\" data=\"$1\">$1</span>")))


(defn tag [t s] (str "<" t ">" s "</" t ">"))
(defn td [s] (tag "td" s))
(defn tr [s] (tag "tr" s))

(defn double-comma-table [raw]
  (loop [lines (string/split-lines raw) in-table false build [  ] ]
    (if (empty? lines)
      (if in-table
        (str (string/join "\n" build)
             "\n</table>")
        (string/join "\n" build) )

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


(defn card->html [card]
  (-> card :data
      (double-comma-table)
      #?(:clj (md/md-to-html-string)
         :cljs (md/md->html))
      (auto-links)
      (double-bracket-links)

      ))
