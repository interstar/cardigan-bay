(ns clj-ts.logic
  (:require
   [clojure.core.logic :as logic]
   [clojure.core.logic.pldb :as pldb]
   [clojure.string :as string]

))

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
                  (-> % last (string/lower-case))  )
         link-seq)))

(defn regenerate-db [server-state]
  (let [path (-> server-state :page-dir)
        pages (java.nio.file.Files/newDirectoryStream path "*.md")
        pages2 (java.nio.file.Files/newDirectoryStream path "*.md")

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
    new-db
    ))



(defn all-pages [server-state]
  (sort
   (pldb/with-db (:facts-db server-state)
     (logic/run* [p]
       (page p))
     )) )


(defn links [server-state]
  (pldb/with-db (:facts-db server-state)
    (logic/run* [p q]
      (link p q)
      (page p)
      (page q)
      )))

(defn links-to [server-state target]
  (pldb/with-db (:facts-db server-state)
    (logic/run* [p q]
      (link p q)
      (logic/== target q)
      )))

(defn broken-links [server-state]
  (pldb/with-db (:facts-db server-state)
    (logic/run* [p q]
      (link p q)
      (logic/nafc page q)
      )))


(defn orphans [server-state]
  (pldb/with-db (:facts-db server-state)
    (logic/run* [q]
      (logic/fresh [p]
        (page q)
        (logic/conda
         [(link p q) logic/fail]
         [logic/succeed])))))
