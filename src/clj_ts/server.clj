(ns clj-ts.server
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.edn :as edn]
            [clj-ts.markdown.core :as md]
            [org.httpkit.server :refer [run-server]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.params :refer [wrap-params params-request]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.util.response :refer [not-found]])
  (:gen-class))

(def root "/home/phil/Documents/projects/thoughtstorms-wiki/thoughtstorms-wiki-data/pages/")

  
(defn page-name-to-file-name [page-name]
  (str root (string/lower-case page-name) ".md"))

(defn get-page-from-file [p-name]
  (slurp (page-name-to-file-name p-name)))
      

(defn page-request [request]
  (let [qs (:query-string request)
        p-name (second (string/split qs #"="))]
    {:p-name p-name :raw (get-page-from-file p-name)}))

(defn get-page [request]
  (let [{:keys [p-name raw]} (page-request request)]         
    (println "GET PAGE :: " p-name)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (md/md-to-html-string raw)}))
        
(defn get-raw [request]
  (let [{:keys [p-name raw]} (page-request request)]                 
    (println "GET RAW :: " p-name)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body raw}))

(defn save-page [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        p-name (:page form-body)
        body (:data form-body)]        
    (println "SAVE PAGE :: " p-name)
    (spit (page-name-to-file-name p-name) body)    
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}))

; runs when any request is received
(defn handler [{:keys [uri request-method] :as request}]
  (let []
    (cond 
      ; view a page 
      (= uri "/clj_ts/view")
      (get-page request)
      
      (= uri "/clj_ts/raw")
      (get-raw request)
      
      (= uri "/clj_ts/save")
      (save-page request)
      
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
  (-> #'handler
      (wrap-content-type)
      (wrap-keyword-params)
      (wrap-params)
      (wrap-reload)
      (wrap-resource "clj_ts")
      (run-server {:port 4545})))

