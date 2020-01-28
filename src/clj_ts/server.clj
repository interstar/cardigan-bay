(ns clj-ts.server
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.edn :as edn]
            [clojure.pprint :as pp]

            [clj-ts.logic :as ldb]

            [markdown.core :as md]
            [org.httpkit.server :refer [run-server]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.params :refer [wrap-params params-request]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.util.response :refer [not-found]]
            [clj-ts.common :refer [raw->cards card->html] ]
            )
  (:gen-class))

(def all-state (atom
            {:page-dir "/home/interstar/repos/personal_wiki_pages/"
             :logic-db "/home/interstar/repos/db.clj"}))


(defn page-name-to-file-name [page-name]
  (let [mkname (fn [path] (str path (string/lower-case page-name) ".md"))]
    (-> @all-state :page-dir mkname)))

(defn get-page-from-file [p-name]
  (slurp (page-name-to-file-name p-name)))


(defn page-request [request]
  (let [qs (:query-string request)
        p-name (second (string/split qs #"="))
        file-exists? (.exists (io/file (page-name-to-file-name p-name)))
        raw (if file-exists? (get-page-from-file p-name) "PAGE DOES NOT EXIST")]
    {:p-name p-name :raw raw}))




(defn render-page [p-name raw]
  (let [cards (string/split raw #"----")
        card #(str "<div class='card'>" (md/md-to-html-string %) "</div>")]
    (apply str  (map card  cards))))

(defn get-page [request]
  (let [{:keys [p-name raw]} (page-request request)]
    (println "GET PAGE :: " p-name)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (render-page p-name  raw)}
    ))

(defn get-raw [request]
  (let [{:keys [p-name raw]} (page-request request)]
    (println "GET RAW :: " p-name)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body raw}))

(defn get-edn-cards [request]
  (let [{:keys [p-name raw]} (page-request request)
        cards (raw->cards p-name raw)]
    (println "GET EDN :: " p-name)

    (pp/pprint cards)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body cards})
  )

(defn save-page [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        p-name (:page form-body)
        body (:data form-body)]
    (println "SAVE PAGE :: " p-name)
    (spit (page-name-to-file-name p-name) body)
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}))


; Logic using pages

(defn wrap-results-as-list [res]
  (str
   "<div>"
   (apply str
          "<ul>"
          (for [p res]
            (apply str "<li>"
                   (if (coll? p)
                     (string/join ",," (for [q p]  (str "<a href=''>" q "</a>")))
                     (str "<a href=''>" p "</a>")
                     )
                   "</li>") ))
   "</ul></div>")
  )


(defn retn [res]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body (wrap-results-as-list res)})

(defn all-pages [request]
  (do
    (ldb/regenerate-db! (:page-dir @all-state) )
    (retn (ldb/all-pages))))

(defn all-links [request]
  (retn (ldb/links)))

(defn broken-links [request]
  (retn (ldb/broken-links)))

(defn orphans [request]
  (retn (ldb/orphans)))




; runs when any request is received
(defn handler [{:keys [uri request-method] :as request}]
  (let []
    (cond
      ; view a page
      (= uri "/clj_ts/view")
      (get-page request)

      (= uri "/clj_ts/raw")
      (get-raw request)

      (= uri "/clj_ts/cards")
      (get-edn-cards request)

      (= uri "/clj_ts/save")
      (save-page request)


      (= uri "/clj_ts/all")
      (all-pages request)

      (= uri "/clj_ts/links")
      (all-links request)

      (= uri "/clj_ts/broken-links")
      (broken-links request)

      (= uri "/clj_ts/orphans")
      (orphans request)

      :otherwise

      (or
          ; if the request is a static file
          (let [file (io/file (System/getProperty "user.dir") (str "." uri))]
            (when (.isFile file)
              {:status 200
               :body file}))
          (not-found "Page not found")))))



; runs when the server starts
(defn -main [& args]
  (let [
        config (-> "config.edn" slurp (edn/read-string))
        port (if (nil? (:post config)) 4545 (:port config))
        ]
    (print "Welcome to Cardigan Bay")
    (cond
      (nil? (:page-dir config))
      (do
        (println "Please give a directory where your pages are stored, as the page-dir in config.edn ")
        (System/exit 0))
      (nil? (:logic-db config))
      (do
        (println "Please give a logic db file, as logic-db in config.edn"))
      :otherwise
      (do
        (reset! all-state config)
        (println
         (str "Cardigan Bay Started.

Page Directory is " (-> @all-state :page-dir) "

Port is " port))
        (-> #'handler
            (wrap-content-type)
            (wrap-keyword-params)
            (wrap-params)
            (wrap-reload)
            (wrap-resource "clj_ts")
            (run-server {:port port}))))) )
