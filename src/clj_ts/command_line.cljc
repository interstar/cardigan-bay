(ns clj-ts.command-line
  (:require [instaparse.core :as insta]))


(def parse
  (insta/parser
   "
  <Command> = <'!'> <space> Move | <'!'> Tags
  Move = <'>>'> PageName
  Tags = (<space> Tag)*
  PageName = Name
  Tag = <'+'> Name
  <Name> = #'[A-Za-z0-9]+'
  space = #'\\s+'

"))

(defn parser [s]
  (let [parsed (parse s)
        f (first parsed)]
    (cond
      (= :Move (first f)) {:type :Move :page-name (-> parsed first second second)}
      (= :Tags (first f)) {:type :Tags :tags (-> parsed first rest)}
      :otherwise
      {:type :error :original s :result parsed}
      )))

(defn parsed-seq [xs]
  (let [ps (map parser xs)
        commands (filter #(not= :error (:type %)) ps)
        moves (filter #(= (:type %) :Move) commands)
        raw-tags (map :tags (filter #(= (:type %) :Tags) commands))
        has-move? (> (count moves) 0)
        ]
    {:commands commands
     :non-commands
     (map #(:original %) (filter #(= :error (:type %)) ps))
     :ps ps
     :size (count commands)
     :has-commands? (> (count commands) 0)
     :has-tags? (> (count raw-tags) 0)
     :tags raw-tags ;;(flatten (map keyword raw-tags))
     :has-move? has-move?
     :move-destination (if has-move? (-> moves first :page-name) nil)}
    ))

(defn command-line? [s]
  (not= :error (:type (parser s))))
