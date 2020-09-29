(ns clj-ts.common
  (:require [clojure.string :as string]

            [markdown.core :as md]
            [hasch.core :refer [uuid5 edn-hash]]
            [clj-ts.command-line :as command-line]))


;; Types

(defprotocol IPageStore
  (as-map [ps])
  (page-name->path [ps page-name])
  (name->system-path [ps name])
  (page-exists? [ps page-name])
  (system-file-exists? [ps name])
  (last-modified [ps page-name])
  (read-page [ps page])
  (write-page! [ps page data])
  (read-system-file [ps name])
  (write-system-file! [ps name data])
  (report [ps])
  (similar-page-names [ps p-name])
  (pages-as-new-directory-stream [ps])
)


(defprotocol IPageExporter
  (as-map [ex])
  (page-name->export-file-path [ex page-name])
  (page-name->exported-link [ex page-name])
  (export-page [ex page-name tpl] )
  (load-template [ex])
  )

;; Cards

(defn raw-card->type-and-data [c]
  (let [card (string/trim c)
        rex #"^\s+:(\S+)" ]
    (if
      (not (re-find rex c))
      [:markdown c]
      [(->> c (re-find rex) second keyword)
       (string/replace-first c rex "")] ) ))


(defn package-card [id, source-type, render-type, source-data server-prepared-data]
  {:source_type source-type
   :render_type render-type
   :source_data source-data
   :server_prepared_data server-prepared-data
   :id id
   :hash (-> source-data (edn-hash) (uuid5))})


(defn card->raw [{:keys [id source_type source_data]}]
  (if (= source_type :markdown)
    source_data
    (str "\n" source_type "\n" (string/trim source_data) )) )


(defn match-hash [card hash]
  (= (.toString (:hash card))
     (.toString hash)))

(defn neh [card hash]
  (not (match-hash card hash)))

;; Cards in card list

(defn find-card-by-hash
  "Take a list of cards and return the one that matches hash or nil"
  [cards hash]
  (let [results (filter #(match-hash % hash) cards )]
    (if (> (count results) 0)
      (first results)
      nil)))

(defn remove-card-by-hash
  "Take a list of cards and return the list without the card that matches hash"
  [cards hash]
  (remove #(match-hash % hash) cards)
   )

(defn sub-card
  "Replace the first card that matches p with new-card. If no card matches, return cards unchanged"
  [cards p new-card]
  (let [un-p #(not (p %))
        before (take-while un-p cards)
        after (rest (drop-while un-p cards))]
    (if (= 0 (count (filter p cards)))
      cards
      (concat before [new-card] after)
      )))


(defn move-card-up
  "Move a card (id by hash) one up"
  [cards hash]
  (let [c (find-card-by-hash cards hash)]
    (if (nil? c) cards
        (let [before (take-while #(neh % hash) cards)
              after (rest (drop-while #(neh % hash) cards))
              res (remove nil?
                          (concat
                           (butlast before)
                           [c]
                           [(last before)]
                           after))]
          res
          ))))

(defn move-card-down
  "Move a card (id by hash) one down"
  [cards hash]
  (let [c (find-card-by-hash cards hash)]
    (if (nil? c) cards
        (let [before (take-while #(neh % hash) cards)
              after (rest (drop-while #(neh % hash) cards))
              res (remove nil?
                          (concat
                           before
                           [(first after)]
                           [c]
                           (rest after)))]
          res
          )))
  )

(defn cards->raw [cards]
  (string/join "\n----" (map card->raw cards)))


;; Rendering / special Markup

(defn auto-links [text]
    (string/replace text #"\s+(http(s)?://(\S))\s+"
                    (str "<a href=\"$1\">$1</span>")))

(defn double-bracket-links [text]
  (string/replace text #"\[\[(.+?)\]\]"
           (str "<span class=\"wikilink\" data=\"$1\">$1</span>")))


(defn tag [t s] (str "<" t ">" s "</" t ">"))
(defn td [s] (tag "td" s))
(defn tr [s] (tag "tr" s))
(defn th [s] (tag "th" s))


(defn double-comma-table [raw]
  (loop [lines (string/split-lines raw) in-table false build [  ] ]
    (if (empty? lines)
      (if in-table
        (str (string/join "\n" build)
             "\n</table></div>")
        (string/join "\n" build) )

        (let [line (first lines)]
          (if (string/includes? line ",,")
            (let [items (string/split line #",,")
                  row (tr (apply str (for [i items] (td i))))]
              (if in-table
                (recur (rest lines) true (conj build row))
                (recur (rest lines) true (conj build "<div class=\"embed_div\"><table class='double-comma-table'>" row))))
            (if in-table
              (recur (rest lines) false (conj build "</table></div>" line ) )
              (recur (rest lines) false (conj build line )))
            )
          ))
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
