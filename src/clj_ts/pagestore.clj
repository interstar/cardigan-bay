(ns clj-ts.pagestore
  (:require [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as string]
            [clj-ts.logic :as ldb]
            [clj-ts.embed :as embed]

            [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
            [com.walmartlabs.lacinia.schema :as schema]

            [clj-ts.common :refer [package-card card->type-and-card card->html]  ]
            ))





(def page-store-state
  (atom {:page-dir "./bedrock/"}))

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





;; Logic delegation

(defn raw-db [] (ldb/raw-db))

(defn all-pages [] (ldb/all-pages))

(defn links [] (ldb/links))

(defn broken-links [] (ldb/broken-links))

(defn orphans [] (ldb/orphans))


;; Card Processing

(defn server-eval [data]
  (let [code (read-string data)
        evaluated
        (try
          (#(apply str (eval code)))
          (catch Exception e
            (let [sw (new java.io.StringWriter)
                  pw (new java.io.PrintWriter sw) ]
              (.printStackTrace e pw)
              (str "Exception :: " (.getMessage e) (-> sw .toString) ))))]
    evaluated
    ))



(defn ldb-query->mdlist-card [i result qname f]
  (let [items (apply str (map f result))]
    (package-card i qname :markdown
                  (str "*" (count result) " items*\n\n" items ) )))

(defn item1 [s] (str "* [[" s "]]\n"))


(defn system-card [i data]
  (let [info (read-string data)
        cmd (:command info)]
    (condp = cmd
      :allpages
      (ldb-query->mdlist-card i (all-pages) :allpages item1)

      :alllinks
      (ldb-query->mdlist-card
       i (links) :alllinks
       (fn [[a b]] (str "* [[" a "]] **->** [[" b "]]\n")))


      :brokenlinks
      (ldb-query->mdlist-card
       i (broken-links) :brokenlinks
       (fn [[a b]] (str "* [[" a "]] **X->** [[" b "]]\n")))

      :orphanpages
      (ldb-query->mdlist-card
       i (orphans) :orphanpages item1)

      ;; not recognised
      (package-card i :system :raw (str "Not recognised system command in " data  " -- cmd " cmd )))
    ))

(defn process-card [i card]
  (let [[type, data] (card->type-and-card card)]
    (condp = type
      :markdown (package-card i type :markdown data)
      :raw (package-card i type :raw data)
      :evalraw
      (package-card i type :raw (server-eval data))

      :evalmd
      (package-card i type :markdown (server-eval data))

      :system
      (system-card i data)

      :embed
      (package-card i type :html (embed/process data))

      ;; not recognised
      (package-card i type type data)
      )))

(defn raw->cards [raw]
  (let [cards (string/split  raw #"----")]
    (map process-card (iterate inc 0) cards)))


;; GraphQL resolvers

(defn resolve-raw-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (page-exists? page_name)
      {:page_name page_name
       :body (get-page-from-file page_name)}
      {:page_name page_name
       :body "PAGE DOES NOT EXIST"})))


(defn resolve-cooked-page [context arguments value]
  (let [{:keys [page_name]} arguments]
    (if (page-exists? page_name)
      {:page_name page_name
       :cards (-> page_name get-page-from-file raw->cards)}
      {:page_name page_name
       :cards (raw->cards "PAGE DOES NOT EXIST")})))


;; [schema-file (io/file (System/getProperty "user.dir") "clj_ts/gql_schema.edn")]
(def pagestore-schema
  (-> "gql_schema.edn"
      io/resource
      slurp
      edn/read-string
      (attach-resolvers {:resolve-raw-page resolve-raw-page
                         :resolve-cooked-page resolve-cooked-page
                         })
      schema/compile))
