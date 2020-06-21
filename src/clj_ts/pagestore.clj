(ns clj-ts.pagestore
  (:require
            [clojure.string :as string]
            ))

;; Diagnostic T
(defn P [x label] (do (println (str label " :: " x)) x))





;; Basic functions

(defn page-name->file-path [server-state page-name ]
  (let [mdn (str (string/lower-case page-name) ".md")]
    (-> server-state :page-dir
        (#(.resolve % mdn)) )))


(defn dedouble [s] (string/replace s #"\/\/" "/"))

(defn page-name->url [server-state page-name]
  (dedouble (str (-> server-state :site-url) "/view/" page-name))
  )


(defn page-exists? [server-state p-name]
  (-> (page-name->file-path server-state p-name) .toFile .exists))


(defn read-page [server-state page]
  (do
    (if (instance? java.nio.file.Path page)
      (-> page .toFile slurp)
      (-> page (#(page-name->file-path server-state %)) .toFile slurp))))

(defn write-page! [server-state page data]
  (if (instance? java.nio.file.Path page)
    (spit page data)
    (-> page  page-name->file-path .toFile (spit data))))






;; RecentChanges
;; We store recent-changes in a page called "systemrecentchanges".

(defn update-recent-changes! [server-state pagename]
  (let [pn "systemrecentchanges"
        rcc (read-page server-state pn)
        file-path (page-name->file-path pn)

        filter-step (fn [xs] (filter #(not (string/includes? % (str "[[" pagename "]]"))) xs ) )
        curlist (-> rcc string/split-lines filter-step )
        newlist (cons
                 (str "* [[" pagename "]] (" (.toString (java.util.Date.)) ")")
                 curlist
                 )
        ]
    (spit file-path (string/join "\n" (take 30 newlist)))))


(defn write-page-to-file! [server-state p-name body ]
  (do
    (write-page! p-name body)
    (update-recent-changes! p-name)
    ))




(defn cwd [server-state] (-> server-state :page-dir))

(defn assert-valid [new-pd s]
  (do
    (assert (instance? java.nio.file.Path new-pd)
            (str s " received "
                 new-pd " which is not a Java Path")))
  )
