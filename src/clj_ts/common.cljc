(ns clj-ts.common
  (:require [clojure.string :as string]
            #?(:clj [markdown.core :as md]
               :cljs [markdown.core :as md])
            #?(:clj [hasch.core :refer [uuid5 edn-hash]]
               :cljs [hasch.core :refer [uuid5 edn-hash]])
            [clj-ts.embed-templates :as templates]))



;; ======================================================
;; Cards

(defn split-by-hyphens [input]
  (->> (string/split input #"-{4,}")
       (map string/trim)
       (remove string/blank?)))

(defn hash-it [card-data]
  (-> card-data (edn-hash) (uuid5)))

(defn raw-card-text->card-map [c]
  (let [card (string/trim c)
        rex #"^:(\S+)"
        data (string/replace-first card rex "")]
    (if
     (not (re-find rex card))
      {:source_type :markdown
       :source_data  card
       :hash (hash-it card)}
      {:source_type (->> c (re-find rex) second keyword)
       :source_data data
       :hash (hash-it data)})))


(defn raw-text->card-maps [raw]
  (->> raw split-by-hyphens
       (map raw-card-text->card-map)))


(defn package-card [id source-type render-type source-data server-prepared-data render-context]
  {:source_type source-type
   :render_type render-type
   :source_data source-data
   :server_prepared_data server-prepared-data
   :id id
   :hash (hash-it source-data)
   :user_authored? (:user-authored? render-context)})


(defn card->raw [{:keys [source_type source_data]}]
  (if (= source_type :markdown)
    source_data
    (str source_type "\n\n" (string/trim source_data))))


(defn card-is-blank? [{:keys [source_data]}]
  (= "" (string/trim source_data)))

(defn match-hash [card hash]
  (= (.toString (:hash card))
     (.toString hash)))

(defn neh [card hash] ;; Not equal hash
  (not (match-hash card hash)))




;; Cards in card list


(defn find-card-by-hash
  "Take a list of cards and return the one that matches hash or nil"
  [cards hash]
  (let [results (filter #(match-hash % hash) cards)]
    (if (> (count results) 0)
      (first results)
      nil)))

(defn remove-card-by-hash
  "Take a list of cards and return the list without the card that matches hash"
  [cards hash]
  (remove #(match-hash % hash) cards))

(defn replace-card
  "Replace the first card that matches p with new-card. If no card matches, return cards unchanged"
  [cards p new-card]
  (let [un-p #(not (p %))
        before (take-while un-p cards)
        after (rest (drop-while un-p cards))]
    (if (= 0 (count (filter p cards)))
      cards
      (concat before [new-card] after))))


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
          res))))

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
          res))))

(defn move-card-to-top
  "Move a card (id by hash) to the top of the list"
  [cards hash]
  (let [c (find-card-by-hash cards hash)]
    (if (nil? c) cards
        (let [others (remove #(match-hash % hash) cards)]
          (concat [c] others)))))

(defn move-card-to-bottom
  "Move a card (id by hash) to the bottom of the list"
  [cards hash]
  (let [c (find-card-by-hash cards hash)]
    (if (nil? c) cards
        (let [others (remove #(match-hash % hash) cards)]
          (concat others [c])))))


(defn cards->raw [cards]
  (string/join "\n----\n" (map card->raw cards)))


;; Rendering / special Markup

(defn auto-links [text]
  (string/replace text #"(http(s)?\\/\\/(\S+))"
                  (str "<a href=\"$1\">$1</a>")))

(defn double-bracket-links [text]
  (-> text
      ;; First, handle the alternative text syntax [[display text|PageName]]
      (string/replace #"\[\[([^\[\]|]+?)\|([^\[\]|]+?)\]\]"
                      (str "<span class=\"wikilink\" data=\"$2\">$1</span>"))
      ;; Then, handle the traditional [[PageName]] syntax
      (string/replace #"\[\[(.+?)\]\]"
                      (str "<span class=\"wikilink\" data=\"$1\">$1</span>"))))

(defn tag [t s] (str "<" t ">" s "</" t ">"))
(defn td [s] (tag "td" s))
(defn tr [s] (tag "tr" s))
(defn th [s] (tag "th" s))


(defn double-comma-table [raw]
  (loop [lines (string/split-lines raw) in-table false build []]
    (if (empty? lines)
      (if in-table
        (str (string/join "\n" build)
             "\n</table></div>")
        (string/join "\n" build))

      (let [line (first lines)]
        (if (string/includes? line ",,")
          (let [items (string/split line #",,")
                row (tr (apply str (for [i items] (td i))))]
            (if in-table
              (recur (rest lines) true (conj build row))
              (recur (rest lines) true (conj build "<div class=\"embed_div\"><table class='double-comma-table'>" row))))
          (if in-table
            (recur (rest lines) false (conj build "</table></div>" line))
            (recur (rest lines) false (conj build line))))))))


(defn md->html [s]
  (-> s
      (double-comma-table)
      (md/md-to-html-string)
      (auto-links)
      (double-bracket-links)))


;;; BOILERPLATE

(def embed-boilerplate templates/embed-boilerplate)
