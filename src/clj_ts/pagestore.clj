(ns clj-ts.pagestore
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as string]
            [clj-ts.logic :as ldb]
            ))




(def page-store-state
  (atom {:page-dir "/home/interstar/repos/personal_wiki_pages/" }))

(defn page-name-to-file-name [page-name]
  (let [mkname (fn [path] (str path (string/lower-case page-name) ".md"))]
    (-> @page-store-state :page-dir mkname)))


(defn page-exists? [p-name]
  (.exists (io/file (page-name-to-file-name p-name))))

(defn get-page-from-file [p-name]
  (slurp (page-name-to-file-name p-name)))


(defn regenerate-db! []
  (ldb/regenerate-db! (-> @page-store-state :page-dir)) )

(defn write-page-to-file! [p-name body]
  (do
    (spit (page-name-to-file-name p-name) body)
    (regenerate-db!)
    ))

(defn update-pagedir! [new-pd]
  (do
    (swap! page-store-state assoc :page-dir new-pd)
    (regenerate-db!)))


(defn cwd [] (-> @page-store-state :page-dir))

(defn raw-db [] (ldb/raw-db))

(defn all-pages [] (ldb/all-pages))

(defn links [] (ldb/links))

(defn broken-links [] (ldb/broken-links))

(defn orphans [] (ldb/orphans))
