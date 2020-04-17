(ns clj-ts.logic
  (:require
   [clojure.core.logic :as logic]
   [clojure.core.logic.pldb :as pldb]
   [clojure.string :as string]
   [fsquery.core :as fsquery]
   [fsquery.fsnode :as fsnode]
))

(pldb/db-rel link from to)
(pldb/db-rel page p)


(def facts
  (atom
   (pldb/db )))



(defn extract-links [page-node n]
  (map #(vector (-> page-node
                    ((fn [x] (-> x :java-file .getName)))
                    (string/split #"\.") first )
                (-> % last (string/lower-case)))
       (re-seq #"\[\[(.+?)\]\]" (fsnode/slurp-it n))))

(defn regenerate-db! [path]
  (let [
        fsq (-> (fsquery/make-fsquery path)
                (fsquery/ext "md")
                (fsquery/files-only)
                (fsquery/no-follow #"\.work"))

        add-page
        (fn [db page-name]
          (-> db (pldb/db-fact page page-name)))

        add-link
        (fn [db [from to]]
          (-> db (pldb/db-fact link from to)))

        extract-page-name (fn [n] (-> n :abs (string/split #"/") last (string/split #"\." ) first))


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

(defn links-to [target]
  (pldb/with-db @facts
    (logic/run* [p q]
      (link p q)
      (logic/== target q)
      )))

(defn broken-links []
  (pldb/with-db @facts
    (logic/run* [p q]
      (link p q)
      (logic/nafc page q)
      )))


(defn orphans []
  (pldb/with-db @facts
    (logic/run* [q]
      (logic/fresh [p]
        (page q)
        (logic/conda
         [(link p q) logic/fail]
         [logic/succeed])))))
