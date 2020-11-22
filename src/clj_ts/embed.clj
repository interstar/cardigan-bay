(ns clj-ts.embed
  (:require [org.httpkit.client :as http]
            [org.httpkit.sni-client :as sni]
            [clojure.string :as string]
            [clojure.data.json :as json]))


  (alter-var-root #'org.httpkit.client/*default-client* (fn [_] sni/default-client))

(defn http-call [url params]
  (let [{:keys [status headers body error]
         :as resp}
        @(http/post url {:form-params params})]
    (if error
      (str "Failed, exception: " error)
      (do
        (println "HTTP GET success: " status)
        body))
    ))

(defn generic-oembed [oembed url caption-renderer]
  (let [call (http-call oembed {:format "json" :url url }) ]
    (try
      (str (->
            call
            json/read-str (get "html")))
      (catch Exception e
        (str (.getMessage e) " " oembed " " url "  " (str call))))))

(defn youtube [data caption-renderer]
  (let [url (:url data)
        title (:title data)
        caption (:caption data)
        id (->
            (re-matches #"https://www.youtube.com/watch\?v=(\S+)" url)
            second) ]
    (str
     (if  title (str "<div><h3>" title "</h3></div>") "")
     "<div class=\"embed_div\">"
     "   <div class='youtube-embedded'>
<iframe src='http://www.youtube.com/embed/" id  "'
        style=\"position: absolute; top:0; left:0; width:100%; height:100%;\"
        frameborder='0' allowfullscreen>
</iframe>
</div>
""</div>"
     (if caption (str "<div class='embed-caption'>" (caption-renderer caption) "</div>") ""))
     ))


(defn youtube2 [data caption-renderer]
  (generic-oembed "https://www.youtube.com/oembed" (:url data) caption-renderer )
  )


(defn vimeo [data caption-renderer]
  (let [url (:url data)
        caption (:caption data)
        id (-> url (string/split #"/") last)
        title (:title data)]
    (str
     (if title (str "<div><h3>" title "</h3></div>"))
     "<div class=\"embed-div\"><div class=\"vimeo-embedded\">
<iframe src='https://player.vimeo.com/video/" id "' width='640' height='360' frameborder='0' allow='autoplay; fullscreen' allowfullscreen></iframe>
<p><a href='https://vimeo.com/" id "'>" (caption-renderer caption) "</a></p>
</div></div>
")
    ))


(defn soundcloud [data caption-renderer]
  (generic-oembed "https://soundcloud.com/oembed" (:url data) caption-renderer))

(defn bandcamp [{:keys [id url description title caption]} caption-renderer]
  (str
   (if  title (str "<div><h3>" title "</h3></div>") "")
   "<div class=\"embed_div\"><div class='bandcamp-embedded'>
<iframe style='border: 0; width: 550px; height: 555px;'
src='https://bandcamp.com/EmbeddedPlayer/album=" id "/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/'
seamless><a href='" url "'>" description "</a></iframe></div></div>"
   (if caption (str "<div class='embed-caption'>" (caption-renderer caption) "</div>") "")
   )
  )

(defn twitter [data caption-renderer]
  (let [url (:url data)
        api (str  "https://publish.twitter.com/oembed?url=" url)
        {:keys [status headers body error]}
        @(http/get api)]
    (if error
      (str "Failed, exception: " error)
      (do
        (println "HTTP GET success: " status)
        (-> body json/read-str (get "html"))))
    ))

(defn media-img [data for-export? caption-renderer server-state]
  (let [src (:src data)
        width (if (:width data) (:width data) "100%") ]
    (if for-export?
      (str "<div class='embed_div'><img src='"
           (-> server-state :page-exporter (.media-name->exported-link src))
           "' class='embedded_image_for_export' width='" width "' /></div>")
      (str "<div class='embed_div'><img src='/media/" src "' class='embedded_image' width='" width  "' /></div>")
      )))

(defn process [s for-export? caption-renderer server-state]
  (let [data (read-string s)]
    (condp = (:type data)

      :media-img
      (media-img data for-export? caption-renderer server-state)

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

      :oembed
      (generic-oembed (:api data) (:url data) caption-renderer)

      (str "Not recognised type:  " (:type data) )
      )
 )
)
