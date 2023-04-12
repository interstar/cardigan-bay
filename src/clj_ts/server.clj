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
            [clj-ts.embed :as embed]

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
        cards (card-server/raw->cards raw :false)]


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
               result (execute card-server/pagestore-schema query nil nil)
               out (json/write-str result)]
           out
           )})



(defn icons-handler [request]
  (let [uri (:uri request)
        icon-name (second (re-matches #"/icons/(\S+)" uri))
        file (io/file (System/getProperty "user.dir") (str "." uri))]
    (when (.isFile file)
               {:status 200
                :body file
                :headers {"Content-Type" "image/png"}})))

(defn move-card-handler [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        page-name (:from form-body)
        hash (:hash form-body)
        new-page-name (:to form-body)]
    (println "Moving card " hash " on " page-name " to " new-page-name)
    (card-server/move-card page-name hash new-page-name)
    {:status 200
     :headers {"Content-Type" "text/html"}
     :body "thank you"}))

(defn reorder-card-handler [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        page-name (:page form-body)
        hash (:hash form-body)
        direction (:direction form-body)]
    (println "Reordering card " hash " " direction)
    (card-server/reorder-card page-name hash direction)

    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}
    ))

(defn replace-card-handler [request]
  (let [form-body (-> request :body .bytes slurp edn/read-string)
        page-name (:page form-body)
        hash (:hash form-body)
        source-type (:source_type form-body)
        new-val (:data form-body)]
    (println form-body)
    (println "Replacing card " hash " on " page-name " with " new-val)
    (card-server/replace-card page-name hash source-type new-val)
    {:status 200 :headers {"Content-Type" "text/html"} :body "thank you"}
    ))

(defn bookmarklet-handler [request]
  (let [url (-> request :params :url)
        data (embed/boilerplate url (java.time.LocalDateTime/now)  )
        ]
    (do
      (if (string/includes? data  "Bookmarked at ")
        (card-server/prepend-card-to-page! "InQueue" :markdown data)
        (card-server/prepend-card-to-page! "InQueue" :embed data ))
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
     :headers {"Location" (str "/view/" (-> card-server/server-state :start-page)) }}))


(defn export-recent-pages-handler [request]
  (do
    (println "Exporting recent pages ... in background")
    (future
      (do
        (export/export-recent-pages (card-server/server-state))
        (println "Export finished")))
    {:status 303
     :headers {"Location"  "/view/RecentChanges" }}))

(defn media-file-handler [request]
  (let [file-name (-> request :uri
                      (#(re-matches #"/media/(\S+)"  %))
                      second)
        file (card-server/load-media-file file-name)]
    (println "Media file request " file-name)
    (if (.isFile file)
      {:status 200
       :body file}
      (not-found "Media file not found"))
    ))

(defn custom-file-handler [request]
  (let [file-name (-> request :uri
                      (#(re-matches #"/custom/(\S+)"  %))
                      second)
        file (card-server/load-custom-file file-name)]
    (println "Custom file request " file-name)
    (if (.isFile file)
      {:status 200
       :body file}
      (not-found "Media file not found"))
    ))

; runs when any request is received
(defn handler [{:keys [uri request-method] :as request}]
  (let [qs (:query-string request)
        view-matches (re-matches #"/view/(\S+)" uri)]
    (println (str  "URI: " uri ", " qs ))

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

      (= uri "/api/replacecard")
      (replace-card-handler request)

      (= uri "/api/rss/recentchanges")
      {:status 200
       :headers {"Content-Type" "application/rss+xml"}
       :body (card-server/rss-recent-changes
              (fn [p-name]
                (str (-> (card-server/server-state)
                         :page-exporter
                         (.page-name->exported-link p-name)))))}


      (= uri "/api/bookmarklet")
      (bookmarklet-handler request)

      (= uri "/api/exportpage")
      (export-page-handler request)

      (= uri "/api/exportallpages")
      (export-all-pages-handler request)

      (= uri "/api/exportrecentpages")
      (export-recent-pages-handler request)

      (= uri "/custom/main.css")
      (custom-file-handler request)

      (re-matches  #"/icons/(\S+)" uri)
      (icons-handler request)

      (re-matches #"/media/(\S+)" uri)
      (media-file-handler request)

      (re-matches #"/custom/(\S+)" uri)
      (custom-file-handler request)


      view-matches
      (let [pagename (-> view-matches second )]
        (do
          (card-server/set-start-page! pagename)
          {:status 303
           :headers {"Location" "/index.html"}
           }))


      :otherwise
      (do
        (println "in last clause")
        (or
         ;; if the request is a static file
         (let [file (io/file (System/getProperty "user.dir") (str "." uri))]
           (println file)
           (when (.isFile file)
             {:status 200
              :body file}))
         (not-found
          (do
            (println "Page not found " uri ) "Page not found")))))))



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

  ["-s" "--site SITE" "Site URL "
   :default "/"
   :parse-fn str
   ]

  ["-i" "--init INIT" "Start Page"
   :default "HelloWorld"
   :parse-fn str]

  ["-l" "--links LINK" "Export Links"
   :default "./"
   :parse-fn str]

  ["-x" "--extension EXPORTED_EXTENSION" "Exported Extension"
   :default ".html"
   :parse-fn str]

  ["-e" "--export-dir DIR" "Export Directory"
   :default "./bedrock/exported/"
   :parse-fn str]

  ["-b" "--beginner IS_BEGINNER" "Is Beginner Rather Than Expert"
   :default false
   :parse-fn boolean]

  ])


; runs when the server starts
(defn -main [& args]
  (let [
        as (if *command-line-args* *command-line-args* args)
        xs (parse-opts as cli-options)
        opts (get xs :options)
        dx2 (println opts)

        ps (pagestore/make-page-store (:directory opts) (:export-dir opts))
        dx (println (:site opts) (:links opts))

        pe (export/make-page-exporter ps (:extension opts) (:links opts))]

    (println "
Welcome to Cardigan Bay
=======================")

    (card-server/initialize-state! (:name opts) (:site opts) (:port opts) (:init opts) nil ps pe)

    (println
     (str "
CardServer Created.

Wiki Name is :\t"
          (:wiki-name (card-server/server-state)) "
Site URL is :\t" (:site-url (card-server/server-state)) "
Start Page is :\t" (:start-page (card-server/server-state))"
Port No is :\t" (:port-no (card-server/server-state)) "

PageStore Report
"
          (-> (card-server/server-state) :page-store .report)

          "
PageExporter Report
"
          (-> (card-server/server-state) :page-exporter .report)
          "
-----------------------------------------------------------------------------------------------
"
          ))



    (card-server/regenerate-db!)

    (-> #'handler
        (wrap-content-type)
        (wrap-keyword-params)
        (wrap-params)
        (wrap-reload)
        (wrap-resource "clj_ts")
        (run-server {:port (:port opts)}))) )
