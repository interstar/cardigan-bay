(ns clj-ts.logic
  (:require
   [clojure.core.logic :as logic]
   [clojure.core.logic.pldb :as pldb]
   [clojure.string :as string]
   [fsquery.core :as fsquery]
))

(pldb/db-rel link from to)
(pldb/db-rel page p)


(def facts
  (atom
   (pldb/db
    [link 'grupoadalberto 'altamiraraujojunior]
    [link 'grupoadalberto 'viniciussilvadelima]
    [page 'tablestuff]
    [link 'tablestuff 'pagetype]
    [link 'tablestuff 'tablename]
    [page 'wikisandxml]
    [page 'tablename]
    [link 'wikisandxml 'topicmaps]
    [page 'cds]
    [page 'arttoycafe]
    [page 'toscratch]
    [page 'coolhunterdiagram]
    [page 'geekcoffee]
    [link 'geekcoffee 'arttoycafe]
    [page 'linksfromconferenceinbrasilia]
    [link 'linksfromconferenceinbrasilia 'posthumanism]
    [link 'linksfromconferenceinbrasilia 'integratedarts]
    [page 'guideforhackers]
    [link 'guideforhackers 'sdideskcodeorganization]
    )))

(defn regenerate-db! [path]
  (let [
        fsq (-> (fsquery/make-fsquery path)
                (fsquery/ext "md")
                (fsquery/files-only))

        add-page
        (fn [db page-name]
          (-> db (pldb/db-fact page page-name)))

        add-link
        (fn [db [from to]]
          (-> db (pldb/db-fact link from to)))

        extract-page-name (fn [n] (-> n :abs (string/split #"/") last (string/split #"\." ) first))

        extract-links
        (fn [page-node n]
          (map #(vector (-> page-node :relative (string/split #"\.") first ) (-> % last (string/lower-case)))
               (re-seq #"\[\[(.+?)\]\]" (fsquery/slurp-it n))))

        all-page-names (map extract-page-name (fsquery/start-walk fsq))
        all-links (-> (fsquery/start-walk fsq)
                      (#(map extract-links % %))
                      (#(apply concat %)))

        new-db
        (->
         (pldb/db )
         ((fn [db] (reduce add-page db all-page-names)))
         ((fn [db] (reduce add-link db all-links)))
         )]
    (println "DB recreated")

    (reset! facts new-db)
    ))


(defn raw-db [] @facts)

(defn all-pages []
  (sort
   (pldb/with-db @facts
     (logic/run* [p]
       (page p))
     )) )


(defn links []
  (pldb/with-db @facts
    (logic/run* [p q]
      (link p q)
      (page p)
      (page q)
      )))

(defn broken-links []
  (pldb/with-db @facts
    (logic/run* [p q]
      (link p q)
      (logic/nafc page q)
      )))

(defn orphans []
  (pldb/with-db @facts
    (logic/run* [p q]
      (link p q)
      (logic/nafc page p)
      )))
