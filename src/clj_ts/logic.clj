(ns clj-ts.logic
  (:require
   [clojure.core.logic :as logic]
   [clojure.core.logic.pldb :as pldb]
   [clojure.string :as string]
   [clojure.core.async
             :as a
             :refer [>! <! >!! <!! go chan buffer close! thread
                     alts! alts!! timeout]]

))

;; Relations in the DB
(pldb/db-rel link from to)
(pldb/db-rel page p)



;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))

(defn path->pagename [path]
  (-> path .getFileName .toString (string/split #"\.") first))


(defn extract-links [path]
  (let [text (-> path .toFile slurp)
        link-seq (re-seq #"\[\[(.+?)\]\]" text)]
    (map #(vector (path->pagename path)
                  (-> % last )  )
         link-seq)))





(defprotocol IFactsDb
  (raw-db [db])
  (all-pages [db])
  (all-links [db])
  (broken-links [db])
  (orphan-pages [db])
  (links-to [db target])
  )

(deftype FactsDb [facts]
    IFactsDb

    (raw-db [this] facts)

    (all-pages [this]
      (sort
       (pldb/with-db facts
         (logic/run* [p]
           (page p))
         )) )

    (all-links [this]
      (pldb/with-db facts
        (logic/run* [p q]
          (link p q)
          )))

    (links-to [this target]
      (do
        (println "IN Logic links-to " target)
        (println this)
        (println "FACTS :: " facts)
        (let [x
              (pldb/with-db facts
                (logic/run* [p q]
                  (link p q)
                  (logic/== target q)
                  ))]
          (println "JJJJJ " x)
          x)))

    (broken-links [this]
      (pldb/with-db facts
        (logic/run* [p q]
          (link p q)
          (logic/nafc page q)
          )))

    (orphan-pages [this]
      (pldb/with-db facts
        (logic/run* [q]
          (logic/fresh [p]
            (page q)
            (logic/conda
             [(link p q) logic/fail]
             [logic/succeed])))))

    )


(defn regenerate-db [page-store]
  (let [pages (.pages-as-new-directory-stream page-store)
        pages2 (.pages-as-new-directory-stream page-store)
        all-page-names
        (map path->pagename pages)

        all-links (-> pages2
                      (#(map extract-links %))
                      (#(apply concat %)))

        add-page
        (fn [db page-name]
          (-> db (pldb/db-fact page page-name)))

        add-link
        (fn [db [from to]]
          (-> db (pldb/db-fact link from to)))

        new-db
        (->
         (pldb/db )
         ((fn [db] (reduce add-page db all-page-names)))
         ((fn [db] (reduce add-link db all-links)))
         )
        ]
    (->FactsDb  new-db)
    ))
