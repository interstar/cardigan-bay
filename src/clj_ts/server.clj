(ns clj-ts.server
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.edn :as edn]
            [clojure.pprint :as pp]

            [clojure.tools.cli :refer [parse-opts]]
            [clj-ts.pagestore :as pagestore]
            [clj-ts.common :as common]

            [markdown.core :as md]
            [org.httpkit.server :refer [run-server]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.params :refer [wrap-params params-request]]
            [ring.middleware.reload :refer [wrap-reload]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.util.response :refer [not-found]]


            [com.walmartlabs.lacinia :refer [execute]]
            [clojure.data.json :as json]
            )
  (:gen-class))



(def all-state
  (atom {:start-page "HelloWorld"
         }))

(defn set-state! [key val]
  (swap! all-state assoc key val))

(defn set-start-page! [pagename]
  (set-state! :start-page pagename))

;; Requests

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
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (render-page p-name  raw)}
    ))

(defn get-raw [request]
  (let [{:keys [p-name raw]} (page-request request)]
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body raw}))

(defn get-edn-cards [request]
  (let [{:keys [p-name raw]} (page-request request)
        cards (pagestore/raw->cards raw)]


    (pp/pprint cards)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body cards})
  )

(defn save-page [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        p-name (:page form-body)
        body (:data form-body)]
    (pagestore/write-page-to-file! p-name body)
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}))




(defn get-flattened [request]
  (let [{:keys [p-name raw]} (page-request request)
        cards (-> p-name pagestore/load->cards common/cards->raw )]

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


(defn get-start-page [request]
  {:status 200
   :headers {"Content-Type" "text/text"}
   :body (-> @all-state :start-page)})

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
           (json/write-str result))})


; runs when any request is received
(defn handler [{:keys [uri request-method] :as request}]
  (let [m (re-matches #"/view/(\S+)" uri)]
    (cond

      (= uri "/startpage")
      (get-start-page request)

      (= uri "/clj_ts/old")
      (get-page request)


      (= uri "/clj_ts/save")
      (save-page request)


      (= uri "/clj_ts/graphql")
      (graphql-handler request)

      (= uri "/clj_ts/db")
      (raw-db request)

      (= uri "/rss/recentchanges")
      {:status 200
       :headers {"Content-Type" "application/rss+xml"}
       :body (pagestore/rss-recent-changes )}

      m
      (let [pagename (-> m second )]
        (do
          (set-start-page! pagename)
          {:status 303
           :headers {"Location" "/index.html"}
           }))


      :otherwise

      (or
          ; if the request is a static file
          (let [file (io/file (System/getProperty "user.dir") (str "." uri))]
            (when (.isFile file)
              {:status 200
               :body file}))
          (not-found "Page not found")))))



;; Parse command line args
(def cli-options
 [
  ["-p" "--port PORT" "Port number"
   :default 4545
   :parse-fn #(Integer/parseInt %)
   :validate [#(< 0 % 0x10000) "Must be a number between 0 and 65536"]]
  ["-d" "--directory DIR" "Pages directory"
   :default "./bedrock/"
   :parse-fn str
   ]
  ["-n" "--name NAME" "Wiki Name"
   :default "Yet Another CardiganBay Wiki"
   :parse-fn str]
  ["-s" "--site SITE" "Site Root URL "
   :default "/"
   :parse-fn str
   ]
  ]

  )


; runs when the server starts
(defn -main [& args]
  (let [
        as (if *command-line-args* *command-line-args* args)
        xs (parse-opts as cli-options)

        opts (get xs :options)

        port (:port opts)
        page-dir (:directory opts)
        name (:name opts)
        site-root (:site opts)]
    (println "Welcome to Cardigan Bay")

    (pagestore/update-pagedir! page-dir)
    (pagestore/set-site-url! site-root)
    (pagestore/set-wiki-name! name)

    (println
     (str "Cardigan Bay Started.

Page Directory is " (pagestore/cwd) "

Port is " port "

Wiki Name is " name "

Site URL is " site-root))

    (-> #'handler
        (wrap-content-type)
        (wrap-keyword-params)
        (wrap-params)
        (wrap-reload)
        (wrap-resource "clj_ts")
        (run-server {:port port}))) )
