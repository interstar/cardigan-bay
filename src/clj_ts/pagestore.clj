(ns clj-ts.pagestore
  (:require
   [clojure.string :as string]
   [clj-ts.common :refer [IPageStore]])
  )

;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))

;; Data structures / types



(deftype PageStore [page-path system-path export-path git-repo? ]
  IPageStore

  (as-map [this]
    {:page-path page-path
     :system-path system-path
     :export-path export-path
     :git-repo? git-repo?
    })

  (page-name->path [this page-name]
    (.resolve page-path (str page-name ".md")))

  (name->system-path [this name]
    (.resolve system-path name  ))

  (page-exists? [this p-name]
    (-> (.page-name->path this p-name) .toFile .exists))

  (system-file-exists? [this name]
    (-> (.name->system-path this name) .toFile .exists))

  (last-modified [this p-name]
    (-> (.page-name->path this p-name) .toFile .lastModified (#(java.util.Date. %))))

  (read-page [this page]
    (if (instance? java.nio.file.Path page)
      (-> page .toFile slurp)
      (-> page (#(.page-name->path this %)) .toFile slurp)
      ))

  (write-page! [this page data]
    (if (instance? java.nio.file.Path page)
      (spit (.toString page) data)
      (let [x (-> page (#(.page-name->path this %)))]
        (spit (.toString x) data))))

  (read-system-file [this name]
    (if (instance? java.nio.file.Path name)
      (-> name .toFile slurp)
      (-> name (#(.name->system-path this %)) .toFile slurp)
      ))

  (write-system-file! [this name data]
    (if (instance? java.nio.file.Path name)
      (spit (.toString name) data)
      (let [x (-> name (#(.name->system-path this %)))]
        (spit (.toString x) data))))

  (report [this]
    (str "Page Directory :\t" (str page-path) "\n"
         "Is Git Repo? :\t" (str git-repo?)
         "System Directory :\t" (str system-path) "\n"
         "Export Directory :\t" (str export-path) "\n"
         ))

  (similar-page-names [this p-name]
    (let [all-pages (java.nio.file.Files/newDirectoryStream
                     (.resolve page-path "*.md"))
          all-names (map #(-> (.getFileName %)
                              .toString
                              (string/split #"\.")
                            butlast
                            last)
                         all-pages) ]
      (filter #(= (string/lower-case %) (string/lower-case p-name) ) all-names )
      ))

  (pages-as-new-directory-stream [this]
    (java.nio.file.Files/newDirectoryStream page-path "*.md"))

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
        git-path (.resolve page-dir-path ".git")
        git-repo? (-> git-path .toFile .exists)
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

    (assert (-> export-dir-path .toFile .exists)
            (str  "Given export-dir-path " export-dir-as-string " does not exist."))

    (assert (-> export-dir-path .toFile .isDirectory)
            (str "export-path " export-dir-as-string " is not a directory."))
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
    (.write-system-file! ps pn (string/join "\n" (take 80 newlist)) )
))


(defn load-recent-changes [ps]
  (.read-system-file ps "recentchanges"))


;; API for writing a file

(defn write-page-to-file! [server-state p-name body ]
  (let [ps (.page-store server-state)]
    (.write-page! ps p-name body)
    (update-recent-changes! ps p-name)
    ))

(defn read-page [server-state p-name]
  (-> (.page-store server-state)
      (.read-page p-name)))
