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
  (media-files-as-new-directory-stream [ps])
  (media-export-path [ps])

  (read-recentchanges [ps])
  (write-recentchanges! [ps new-rc] )
  (load-media-file [ps file-name])




)

(defprotocol IPageExporter
  (as-map [ex])
  (page-name->export-file-path [ex page-name])
  (page-name->exported-link [ex page-name])
  (media-name->exported-link [ex media-name])
  (load-template [ex])
  (api-path [ex])
  (export-media-dir [ex])
  (report [ex])
  )
