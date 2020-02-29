(ns clj-ts.server
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.edn :as edn]
            [clojure.pprint :as pp]


            [clj-ts.pagestore :as pagestore]

            [markdown.core :as md]
            [org.httpkit.server :refer [run-server]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.params :refer [wrap-params params-request]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.util.response :refer [not-found]]
            [clj-ts.common :refer [package-card card->type-and-card card->html]  ]

            [com.walmartlabs.lacinia :refer [execute]]
            [clojure.data.json :as json]
            )
  (:gen-class))

(comment  (def all-state (atom
                          {:page-dir "/home/interstar/repos/personal_wiki_pages/"
                           :logic-db "/home/interstar/repos/db.clj"})))







(defn page-request [request]
  (let [qs (:query-string request)
        p-name (second (string/split qs #"="))
        raw (if (pagestore/page-exists? p-name)
              (pagestore/get-page-from-file p-name)
              "PAGE DOES NOT EXIST")]
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
        cards (pagestore/raw->cards raw)]
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
    (pagestore/write-page-to-file! p-name body)
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}))


(defn card->raw [{:keys [id type data]}]
  (if  (=  type :markdown)
    (str "----\n" data)
    (str "----\n" type "\n" data )))

(defn get-flattened [request]
  (let [{:keys [p-name raw]} (page-request request)
        cards (apply str (map card->raw (pagestore/raw->cards raw)))]
    (println "GET FLATTENED :: " p-name)

    (pp/pprint cards)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body cards})
  )


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

(defn raw-db [request]
  (do
    (pagestore/regenerate-db!)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (str "<pre>" (with-out-str (pp/pprint (pagestore/raw-db))) "</pre>" )}))

(defn all-pages [request]
  (retn (pagestore/all-pages)))

(defn all-links [request]
  (retn (pagestore/links)))

(defn broken-links [request]
  (retn (pagestore/broken-links)))

(defn orphans [request]
  (retn (pagestore/orphans)))


;; GraphQL handler

(defn extract-query
  "Reads the `query` query parameters, which contains a JSON string
  for the GraphQL query associated with this request. Returns a
  string.  Note that this differs from the PersistentArrayMap returned
  by variable-map. e.g. The variable map is a hashmap whereas the
  query is still a plain string."
  [request]
  (let [body (-> request :body .bytes slurp (json/read-str :key-fn keyword) :query )]
    (case (:request-method request)
      :get  (get-in request [:query-params "query"])
      ;; Additional error handling because the clojure ring server still
      ;; hasn't handed over the values of the request to lacinia GraphQL
      ;; (-> request :body .bytes slurp edn/read-string)
      :post (try (-> request
                     :body
                     .bytes
                     slurp
                     (json/read-str :key-fn keyword)
                     :query)
                 (catch Exception e ""))
      :else "")))

(defn graphql-handler [request]
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (let [query (extract-query request)
               result (execute pagestore/pagestore-schema query nil nil)]
           (println "CCC " query)
           (println "DDD " result)
           (json/write-str result))})


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

      (= uri "/clj_ts/flattened")
      (get-flattened request)

      (= uri "/clj_ts/save")
      (save-page request)


      (= uri "/clj_ts/graphql")
      (graphql-handler request)

      (= uri "/clj_ts/db")
      (raw-db request)

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
      :otherwise
      (do
        (pagestore/update-pagedir! (-> config :page-dir))
        (println
         (str "Cardigan Bay Started.

Page Directory is " (pagestore/cwd) "

Port is " port))
        (-> #'handler
            (wrap-content-type)
            (wrap-keyword-params)
            (wrap-params)
            (wrap-reload)
            (wrap-resource "clj_ts")
            (run-server {:port port}))))) )
