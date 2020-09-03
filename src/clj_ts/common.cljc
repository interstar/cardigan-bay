(ns clj-ts.common
  (:require [clojure.string :as string]

            [markdown.core :as md]
            [hasch.core :refer [uuid5 edn-hash]]
            [clj-ts.command-line :as command-line]))


(defn raw-card->type-and-data [c]
  (let [card (string/trim c)
        rex #"^\s+:(\S+)" ]
    (if
      (not (re-find rex c))
      [:markdown c]
      [(->> c (re-find rex) second keyword)
       (string/replace-first c rex "")] ) ))


(defn package-card [id, raw-type, delivered-type, raw-data]
  {:raw_type raw-type
   :delivered_type delivered-type
   :id id
   :raw_data raw-data
   :raw_hash (-> raw-data (edn-hash) (uuid5))})


(defn card->raw [{:keys [id raw_type raw_data]}]
  (if  (=  type :markdown)
    raw_data
    (str "\n" raw_type "\n" (string/trim raw_data) )) )


(defn append-to-card [card extra]
  (package-card (:id card) (:raw_type card) (:delivered_type card) (str (:raw_data card) extra)))

;; Cards in card list

(defn match-hash [card hash]
  (= (.toString (:raw_hash card))
     (.toString hash)))

(defn find-card-by-hash [cards hash]
  "Take a list of cards and return the one that matches hash or nil"
  (let [results (filter #(match-hash % hash) cards )]
    (if (> (count results) 0)
      (first results)
      nil)))

(defn remove-card-by-hash [cards hash]
  "Take a list of cards and return the list without the card that matches hash"
  (remove #(match-hash % hash) cards)
   )

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
  (-> card :raw_data
      (double-comma-table)
      #?(:clj (md/md-to-html-string)
         :cljs (md/md->html))
      (auto-links)
      (double-bracket-links)

      ))

;; Cards with commands

(defn contains-commands? [card]
  (let [[type data] (raw-card->type-and-data card)
        lines (string/split-lines data)]
    (if
        (some command-line/command-line? lines) true false)))



(defn gather-all-commands [card]
  (let [[type data] (raw-card->type-and-data card)
        lines (string/split-lines data)
        pseq (command-line/parsed-seq lines)
        ]
    (conj pseq
          {:type type
           :stripped (string/join "\n" (:non-commands pseq) )}
          )
    ))
