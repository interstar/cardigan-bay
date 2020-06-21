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
      {:type :error :result parsed}
      )))


(defn command-line? [s]
  (not= :error (:type (parser s))))
