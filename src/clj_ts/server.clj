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

(def page-dir (atom "./pages/"))

(defn page-name-to-file-name [page-name]
  (str @page-dir (string/lower-case page-name) ".md"))

(defn get-page-from-file [p-name]
  (slurp (page-name-to-file-name p-name)))


(defn page-request [request]
  (let [qs (:query-string request)
        p-name (second (string/split qs #"="))
        file-exists? (.exists (io/file (page-name-to-file-name p-name)))
        raw (if file-exists? (get-page-from-file p-name) "PAGE DOES NOT EXIST")]
    {:p-name p-name :raw raw}))


(defn raw->cards [p-name raw]
  (let [cards (string/split raw #"----")
        card (fn [c]
               [:div {:class "card"
                      :dangerouslySetInnerHTML {:__html (md/md-to-html-string c)  }
                      }]) ]
    (into vector (concat [:div] (map card cards)))))

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
    (println "GET RAW :: " p-name)
    (println raw)
    (println cards)
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
  (let [port 4545
        pd (-> "pagedir.edn" slurp (edn/read-string) :page-dir)]
    (if (nil? pd)
      (do
        (println "Welcome to Clj-TS

Please give a directory where your pages are stored

lein run ~/Documents/pages/ ")
        (System/exit 0))
      (do
        (reset! page-dir pd )
        (println
         (str "CLJ-TS Started.

Page Directory is " @page-dir "

Port is " port))
        (-> #'handler
            (wrap-content-type)
            (wrap-keyword-params)
            (wrap-params)
            (wrap-reload)
            (wrap-resource "clj_ts")
            (run-server {:port port}))))) )
