(ns clj-ts.types)




;; Types

(defprotocol IPageStore
  (as-map [ps])
  (page-name->path [ps page-name])
  (name->system-path [ps name])
  (page-exists? [ps page-name])
  (system-file-exists? [ps name])
  (last-modified [ps page-name])
  (read-page [ps page])
  (write-page! [ps page data])
  (read-system-file [ps name])
  (write-system-file! [ps name data])
  (report [ps])
  (similar-page-names [ps p-name])
  (pages-as-new-directory-stream [ps])
)

(defprotocol IPageExporter
  (as-map [ex])
  (page-name->export-file-path [ex page-name])
  (page-name->exported-link [ex page-name])
  (load-template [ex])
  (report [ex])
  )
