(ns clj-ts.embed
  (:require [org.httpkit.client :as http]
            [org.httpkit.sni-client :as sni]
            [clojure.string :as string]
            [remus :refer [parse-url parse-file parse-stream]]
            [clj-ts.common :as common]
            [clojure.data.json :as json]
            [hiccup.core :refer [html]]))


  (alter-var-root #'org.httpkit.client/*default-client* (fn [_] sni/default-client))

(defn http-call
  [url params method]
  (let [get-it (fn []
                 (cond
                   (= method :post)
                   @(http/post url {:form-params params})

                   (= method :get)
                   @(http/get url {:form-params params})))

        {:keys [status headers body error]
         :as resp}
        (get-it)]
    (if error
      (str "Failed, exception: " error)
      (do
        (println "HTTP GET success: " status)
        body))
    ))


(defn generic-embed [data inner caption-renderer]
  (let [title (:title data)
        caption (:caption data)
        extra-link (:extra-link data)]

    (str

     (if title (str "<div><h3>" title "</h3></div>") "")
     (if extra-link (str "<div>" extra-link "</div>") "")
     "<div class=\"embed_div\">"

     inner

     "
</div>
"
     (if caption (str "<div class='embed-caption'>" (caption-renderer caption) "</div>") "")
)))

(defn generic-oembed [oembed url method]
  (let [d0 (println (str "api : " oembed " url: " url))
        call (http-call oembed
                        {:format "json" :url url}
                        method
                        )
        d1 (println (str "Generic OEmbed got " call) )]
    (if (= 404 (get "status" call))

      (str "OEmbed call failed

API : " oembed " URL : " url)
      (try
        (str (->
              call
              json/read-str (get "html")))
        (catch Exception e
          (str (.getMessage e) " " oembed " " url "  " (str call)))))))


(defn resizable-iframe [url]
  (let [uid (str "iframe" (string/replace (gensym) #"_" "xxXxx"))]
    (str
     "<iframe class='resizable-iframe' id='" uid "' src='" url "' style='width:100%; height:300px;'"
     " allowfullscreen></iframe>"

     ))
  )

;; Matching

(def youtube-pattern
  #"https://www.youtube.com/watch\?v=(\S+)"
  )

(def mastodon-pattern
  #"https?:\/\/((www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6})\/(\@\w+)\/(\w+)"
 )

;; Code

(defn youtube [data caption-renderer]
  (let [url (:url data)
        id (->
            (re-matches youtube-pattern url)
            second)]
    (generic-embed
         data
         (str
          "   <div class='youtube-embedded'>
<iframe src='http://www.youtube.com/embed/" id  "'
        style=\" width:100%; height:100%;\"
        frameborder='0' allowfullscreen>
</iframe>
</div>
")
         caption-renderer)))


(defn youtube2 [data caption-renderer]
  (generic-embed
   data
   (generic-oembed "https://www.youtube.com/oembed" (:url data) :post)
   caption-renderer)
  )


(defn vimeo [data caption-renderer]

  (let [url (:url data)
        id (->  (string/split url #"/") last)]
    (generic-embed
     data
     (str
      "<div class=\"vimeo-embedded\">
<iframe src='https://player.vimeo.com/video/" id "' width='640' height='360' frameborder='0' allow='autoplay; fullscreen' allowfullscreen></iframe>
<p><a href='https://vimeo.com/" id "'>"

                   url "</a></p>
</div>
")
     caption-renderer)))


(defn soundcloud [data caption-renderer]
  (generic-embed
   data
   (generic-oembed "https://soundcloud.com/oembed" (:url data) :post)
   caption-renderer))

(defn bandcamp [{:keys [id url description title caption] :as data} caption-renderer]
  (generic-embed
   data
   (str
    "<div class=\"embed_div\"><div class='bandcamp-embedded'>
<iframe style='border: 0; width: 550px; height: 655px;'
src='https://bandcamp.com/EmbeddedPlayer/album=" id "/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/'
seamless><a href='" url "'>" description "</a></iframe></div></div>"
    )
   caption-renderer)
  )

(defn twitter [data caption-renderer]
  (let [url (:url data)
        api (str  "https://publish.twitter.com/oembed?url=" url)
        {:keys [status headers body error]}
        @(http/get api)]
    (generic-embed
     (conj {:extra-link (str "<a href='http://threadviewer.com/"
                             (-> url ((fn [s] (string/split s #"/"))) last)
                             "'>ThreadView</a>") } data)
     (if error
       (str "Failed, exception: " error)
       (do
         (println "HTTP GET success: " status)
         (-> body json/read-str (get "html"))))
     caption-renderer)))


(defn mastodon [data caption-renderer]
  (let [url (:url data)
        match (re-matches mastodon-pattern url)
        new-url
        (str "https://" (nth match 1) "/" (nth match 3) "/" (nth match 4) "/embed")
        ]
    (generic-embed
     data
     (resizable-iframe new-url)

     caption-renderer)))

(defn strip-tags [html]
  (if (nil? html) "NO DESCRIPTION"
      (let [processed (clojure.string/replace html #"\<([^>])+\>" "")]
        processed)))

(defn rss [data caption-renderer]
  (let [url (:url data)
        result (parse-url url)
        feed (:feed result)
        desc (:description feed)
        entries
        (map
         (fn [e]
           (let [stripped (str (strip-tags (-> e :description :value)))
                 txt
                 (str (if (:title e) (:title e)
                          (apply str (take 40 stripped)))) ]

             (str
              "[" txt "](" (:link e) ") ... ,, "
              (:published-date e) "\n"  )))
         (:entries feed)
         )
    ]
    (generic-embed
     data
     (caption-renderer (apply str (doall entries)))
     caption-renderer))
  )

(defn media-img [data render-context caption-renderer server-state]
  (let [src (:src data)
        width (if (:width data) (:width data) "100%") ]
    (generic-embed
     data
     (if (:for-export? render-context)
       (str "<img src='"
            (-> server-state :page-exporter (.media-name->exported-link src))
            "' class='embedded_image_for_export' width='" width "' />")
       (str "<img src='/media/" src "' class='embedded_image' width='" width  "' />")
       )
     caption-renderer)))

(defn img [data caption-renderer]
  (let [src (:url data)
        width (if (:width data) (:width data) "100%")]
    (generic-embed
     data
     (str "<img src='" src "' class='embedded_image' width='" width "' />")
     caption-renderer
     )))

(defn codepen [data caption-renderer]
  (generic-embed
   data
   (generic-oembed "https://codepen.io/api/oembed" (:url data) :get)
   caption-renderer))

(defn process [s render-context caption-renderer server-state]
  (let [data (read-string s)]
    (try
      (condp = (:type data)

        :media-img
        (media-img data render-context caption-renderer server-state)

        :img
        (img data caption-renderer)

        :youtube
        (youtube data caption-renderer)

        :vimeo
        (vimeo data caption-renderer)

        :bandcamp
        (bandcamp data caption-renderer)

        :soundcloud
        (soundcloud data caption-renderer)

        :twitter
        (twitter data caption-renderer)

        :mastodon
        (mastodon data caption-renderer)

        :rss
        (rss data caption-renderer)

        :codepen
        (codepen data caption-renderer)

        :oembed
        (generic-oembed (:api data) (:url data)
                        (if (:method data) (:method data) :post))

        (str "Not recognised type:  " (:type data) )
        )
      (catch Exception e (str "Embedding failed with embed type " (:type data) "<br/>

and data
<br/>
" data "
<br/>
" e)
             )
      )
 )
)

(defn boilerplate  [url timestamp]
  (let [f (fn [url type m]
            (apply str (drop 14 (string/replace (common/embed-boilerplate type) m url) )))]
    (cond
      (string/includes? url "youtube")
      (f url :youtube "URL GOES HERE")

      (string/includes? url "soundcloud")
      (f url :soundcloud "URL GOES HERE")

      (string/includes? url "bandcamp")
      (f url :bandcamp "URL GOES HERE")

      (string/includes? url "twitter")
      (f url :twitter "URL GOES HERE")

      (string/includes? url "codepen")
      (f url :codepen "URL GOES HERE")

      (not (nil? (re-matches mastodon-pattern url)))
      (f url :mastodon "URL GOES HERE")


      (or
       (string/includes? url ".rss")
       (string/includes? url "rss.xml")
       (string/includes? url "/feed/")
       (string/includes? url "feeds.feedburner.com/"))
      (f url :rss "URL GOES HERE")

      :else
      (str "Bookmarked at " timestamp  ",, <" url ">

"))))
