(ns clj-ts.pagestore
  (:require
            [clojure.string :as string]
            ))

;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))

;; Data structures / types

(defprotocol IPageStore
  (as-map [ps])
  (page-name->path [ps page-name])
  (name->system-path [ps name])
  (page-exists? [ps page-name])
  (last-modified [ps page-name])
  (read-page [ps page])
  (write-page! [ps page data])
  (read-system-file [ps name])
  (write-system-file! [ps name data])
  (report [ps])
  (similar-page-names [ps p-name])
)

(deftype PageStore [page-dir system-dir export-dir git-repo?]
  IPageStore

  (as-map [this]
    {:page-dir page-dir
     :system-dir system-dir
     :export-dir export-dir})

  (page-name->path [this page-name]
    (.resolve page-dir (str page-name ".md")))

  (name->system-path [this name]
    (.resolve system-dir name  ))

  (page-exists? [this p-name]
    (-> (page-name->path this p-name) .toFile .exists))

  (last-modified [this p-name]
    (-> (page-name->path this p-name) .toFile .lastModified (#(java.util.Date. %))))

  (read-page [this page]
    (if (instance? java.nio.file.Path page)
      (-> page .toFile slurp)
      (-> page (#(page-name->path this %)) .toFile slurp)
      ))

  (write-page! [this page data]
    (if (instance? java.nio.file.Path page)
      (spit (.toString page) data)
      (let [x (-> page (#(page-name->path this %)))]
        (spit (.toString x) data))))

  (read-system-file [this name]
    (if (instance? java.nio.file.Path name)
      (-> name .toFile slurp)
      (-> name (#(name->system-path this %)) .toFile slurp)
      ))

  (write-system-file! [this name data]
    (if (instance? java.nio.file.Path name)
      (spit (.toString name) data)
      (let [x (-> name (#(name->system-path this %)))]
        (spit (.toString x) data))))

  (report [this]
    (str "Page Directory :\t" (str page-dir) "\n"
         "Is Git Repo? :\t" (str git-repo?)
         "System Directory :\t" (str system-dir) "\n"
         "Export Directory :\t" (str export-dir) "\n"
         ))

  (similar-page-names [this p-name]
    (let [all-pages (java.nio.file.Files/newDirectoryStream
                     (.resolve page-dir "*.md"))
          all-names (map #(-> (.getFileName %)
                              .toString
                              (string/split #"\.")
                            butlast
                            last)
                         all-pages) ]
      (filter #(= (string/lower-case %) (string/lower-case p-name) ) all-names )
      ))

  )


;; Constructing

(defn make-page-store [page-dir-as-string export-dir-as-string]
  (let [page-dir-path
        (->
         (java.nio.file.Paths/get page-dir-as-string (make-array java.lang.String 0))
         (.toAbsolutePath)
         (.normalize))
        system-dir-path
        (->
         (java.nio.file.Paths/get page-dir-as-string (into-array java.lang.String ["system"]))
         (.toAbsolutePath)
         (.normalize))
        export-dir-path
        (->
         (java.nio.file.Paths/get export-dir-as-string (make-array java.lang.String 0))
         (.toAbsolutePath)
         (.normalize))
        git-repo? false
        ps (->PageStore page-dir-path system-dir-path export-dir-path git-repo?)
        ]
    (assert (-> page-dir-path .toFile .exists )
            (str "Given page-store directory " page-dir-as-string " does not exist."))

    (assert (-> page-dir-path .toFile .isDirectory)
            (str "page-store " page-dir-as-string " is not a directory."))

    (assert (-> system-dir-path .toFile .exists)
            (str "There is no system director. Please make a directory called 'system' under the directory "
                 page-dir-as-string))

    (assert (-> system-dir-path .toFile .isDirectory)
            (str "There is a file called 'system' under " page-dir-as-string
                 " but it is not a directory. Please remove that file and create a directory with that name"))
    (println "Created PageStore :")
    (println (.report ps))
    ps))

;; Basic functions


(defn dedouble [s] (string/replace s #"\/\/" "/"))

(defn page-name->url [server-state page-name]
  (dedouble (str (-> server-state .site-url) "/view/" page-name))
  )


;; RecentChanges
;; We store recent-changes in a system file called "recentchanges".

(defn update-recent-changes! [ps pagename]
  (let [pn "recentchanges"
        rcc (.read-system-file ps pn)

        filter-step (fn [xs] (filter #(not (string/includes? % (str "[[" pagename "]]"))) xs ) )
        curlist (-> rcc string/split-lines filter-step )
        newlist (cons
                 (str "* [[" pagename "]] (" (.toString (java.util.Date.)) ")")
                 curlist
                 )]
    (write-system-file! ps pn (string/join "\n" (take 80 newlist)) )
))


(defn write-page-to-file! [server-state p-name body ]
  (let [ps (.page-store server-state)]
    (write-page! ps p-name body)
    (update-recent-changes! ps p-name)
    ))



(defn cwd [server-state] (-> server-state .page-dir))

(defn assert-valid [new-pd s]
  (do
    (assert (instance? java.nio.file.Path new-pd)
            (str s " received "
                 new-pd " which is not a Java Path")))
  )
