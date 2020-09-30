(ns clj-ts.server
  (:require [clojure.java.io :as io]
            [clojure.string :as string]
            [clojure.edn :as edn]
            [clojure.pprint :as pp]

            [clojure.tools.cli :refer [parse-opts]]

            [clj-ts.card-server :as card-server]
            [clj-ts.common :as common]
            [clj-ts.static-export :as export]
            [clj-ts.pagestore :as pagestore]

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


;; Requests

(defn page-request [request]
  (let [qs (:query-string request)
        p-name (second (string/split qs #"="))
        raw (if (card-server/page-exists? p-name)
              (card-server/read-page p-name)
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
        cards (card-server/raw->cards raw)]


    (pp/pprint cards)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body cards})
  )

(defn save-page [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        p-name (:page form-body)
        body (:data form-body)]
    (card-server/write-page-to-file! p-name body)
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}))




(defn get-flattened [request]
  (let [{:keys [p-name raw]} (page-request request)
        cards (-> p-name card-server/load->cards common/cards->raw )]

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
    (card-server/regenerate-db!)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (str "<pre>" (with-out-str (pp/pprint (.raw-db (card-server/server-state)))) "</pre>" )}))


(defn get-start-page [request]
  {:status 200
   :headers {"Content-Type" "text/text"}
   :body (-> (card-server/server-state) .start-page)})

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
               result (execute card-server/pagestore-schema query nil nil)]
           (json/write-str result))})



(defn icons-handler [request]
  (let [uri (:uri request)
        icon-name (second (re-matches  #"/icons/(\S+)" uri))
        file (io/file (System/getProperty "user.dir") (str "." uri))]
    (when (.isFile file)
               {:status 200
                :body file
                :headers {"Content-Type" "image/png"}})))

(defn move-card-handler [request]
  (let [ps (:params request)]
    (card-server/move-card (:from ps) (:hash ps) (:to ps))
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body (str
            "<head>
  <meta http-equiv=\"Refresh\" content=\"0; URL=/view/"
(:to ps)
"\">
</head>")}))

(defn reorder-card-handler [request]
  (let [ps (:params request)
        page-name (:page ps)
        hash (:hash ps)
        direction (:direction ps)]
    (println )
    (card-server/reorder-card page-name hash direction)
    {:status 303
     :headers {"Location" (str  "/view/" page-name)}}))

(defn bookmarklet-handler [request]
  (let [url (-> request :params :url)
        new-card (str "{:url \"" url "\" :timestamp \""
                      (java.time.LocalDateTime/now) "\"  }")
        ]
    (do
      (card-server/append-card-to-page! "InQueue" :bookmark new-card )
      {:status 303
       :headers {"Location" "/view/InQueue"} }))
)

(defn export-page-handler [request]
  (let [page-name (-> request :params :page)]
    (do
      (println "In Export Handler. Page is  " page-name)
      (export/export-one-page page-name (card-server/server-state))
      {:status 303
       :headers {"Location" (str  "/view/" page-name)}})
    ))

(defn export-all-pages-handler [request]
  (do
    (println "Exporting all pages ... in background")
    (future
      (do
        (export/export-all-pages (card-server/server-state))
        (println "Export finished")))
    {:status 303
     :headers {"Location" "/view/HelloWorld" }}))

; runs when any request is received
(defn handler [{:keys [uri request-method] :as request}]
  (let [qs (:query-string request)
        m (re-matches #"/view/(\S+)" uri)]

    (cond

      (= uri "/")
      {:status 303
       :headers {"Location" "/index.html"} }

      (= uri "/startpage")
      (get-start-page request)

      (= uri "/clj_ts/old")
      (get-page request)


      (= uri "/clj_ts/save")
      (save-page request)


      (= uri "/clj_ts/graphql")
      (graphql-handler request)

      (= uri "/api/system/db")
      (raw-db request)

      (= uri "/api/movecard")
      (move-card-handler request)

      (= uri "/api/reordercard")
      (reorder-card-handler request)

      (= uri "/api/rss/recentchanges")
      {:status 200
       :headers {"Content-Type" "application/rss+xml"}
       :body (card-server/rss-recent-changes )}


      (= uri "/api/bookmarklet")
      (bookmarklet-handler request)

      (= uri "/api/exportpage")
      (export-page-handler request)

      (= uri "/api/exportallpages")
      (export-all-pages-handler request)

      (re-matches  #"/icons/(\S+)" uri)
      (icons-handler request)

      m
      (let [pagename (-> m second )]
        (do
          (card-server/set-start-page! pagename)
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
   :parse-fn str]

  ["-n" "--name NAME" "Wiki Name"
   :default "Yet Another CardiganBay Wiki"
   :parse-fn str]

  ["-s" "--site SITE" "Site Root URL "
   :default "/"
   :parse-fn str
   ]

  ["-e" "--export-dir DIR" "Export Directory"
   :default "./bedrock/exported/"
   :parse-fn str]]

  )


; runs when the server starts
(defn -main [& args]
  (let [
        as (if *command-line-args* *command-line-args* args)
        xs (parse-opts as cli-options)
        opts (get xs :options)

        port (:port opts)
        name (:name opts)
        site-root (:site opts)

        page-dir (:directory opts)
        export-dir (:export-dir opts)

        ps (pagestore/make-page-store page-dir export-dir)
        pe (export/make-page-exporter ps "" "/view/") ]

    (println "Welcome to Cardigan Bay")

    (card-server/initialize-state! name site-root port "HelloWorld" nil ps pe)

    (println "Cardigan Bay Started")
    (println (.as-map ps))
    (println
     (str "Page Directory is "  (-> ps .as-map :page-path .toString) "

System Directory is " (-> ps .as-map :system-path .toString) "

Export Directory is " (-> ps .as-map :export-path .toString)
          ))

    (println (card-server/server-state))
    (println
     (str "

Port is " (-> (card-server/server-state) :port-no ) "

Wiki Name is " (-> (card-server/server-state) :wiki-name) "

Site URL is " (-> (card-server/server-state) :site-url)))

    (-> #'handler
        (wrap-content-type)
        (wrap-keyword-params)
        (wrap-params)
        (wrap-reload)
        (wrap-resource "clj_ts")
        (run-server {:port port}))) )
