(ns clj-ts.logic
  (:require
   [clojure.core.logic :as logic]
   [clojure.core.logic.pldb :as pldb]
))

(pldb/db-rel link from to)
(pldb/db-rel page p)

(def facts0
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
   [page 'toscratch]
   [page 'coolhunterdiagram]
   [page 'geekcoffee]
   [link 'geekcoffee 'arttoycafe]
   [page 'linksfromconferenceinbrasilia]
   [link 'linksfromconferenceinbrasilia 'posthumanism]
   [link 'linksfromconferenceinbrasilia 'integratedarts]
   [page 'guideforhackers]
   [link 'guideforhackers 'sdideskcodeorganization]
   ))

(defn all-pages []
  (pldb/with-db facts0
            (logic/run* [p]
              (page p))
            ) )


(defn links []
  (pldb/with-db facts0
    (logic/run* [p q]
      (link p q)
      (page p)
      (page q)
      )))

(defn broken-links []
  (pldb/with-db facts0
    (logic/run* [p q]
      (link p q)
      (logic/nafc page q)
      )))

(defn orphans []
  (pldb/with-db facts0
    (logic/run* [p q]
      (link p q)
      (logic/nafc page p)
      )))
