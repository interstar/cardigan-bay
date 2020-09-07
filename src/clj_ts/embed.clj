(ns clj-ts.embed
  (:require [org.httpkit.client :as http]
            [org.httpkit.sni-client :as sni]
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

(defn generic-oembed [oembed url]
  (let [call (http-call oembed {:format "json" :url url }) ]
    (try
      (str (->
            call
            json/read-str (get "html")))
      (catch Exception e
        (str (.getMessage e) " " oembed " " url "  " (str call))))))

(defn youtube [data]
  (let [url (:url data)
        id (->
            (re-matches #"https://www.youtube.com/watch\?v=(\S+)" url)
            second) ]
     (str "<div class=\"embed_div\">
<div class='youtube-embedded'>
<iframe src='http://www.youtube.com/embed/" id  "'
        style=\"position: absolute; top:0; left:0; width:100%; height:100%;\"
        frameborder='0' allowfullscreen>
</iframe>
</div>
</div>")
     ))


(defn youtube2 [data]
  (generic-oembed "https://www.youtube.com/oembed" (:url data) )
  )

(defn soundcloud [data]
  (generic-oembed "https://soundcloud.com/oembed" (:url data)))

(defn bandcamp [{:keys [id url description]}]
  (str "<div class=\"embed_div\"><div class='bandcamp-embedded'>
<iframe style='border: 0; width: 550px; height: 555px;'
src='https://bandcamp.com/EmbeddedPlayer/album=" id "/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/'
seamless><a href='" url "'>" description "</a></iframe></div></div>")
  )

(defn twitter [data]
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

(defn process [s]
  (let [data (read-string s)]
    (condp = (:type data)
      :youtube
      (youtube data)

      :bandcamp
      (bandcamp data)

      :soundcloud
      (soundcloud data)

      :twitter
      (twitter data)

      :oembed
      (generic-oembed (:api data) (:url data))

      (str "Not recognised type:  " (:type data) )
      )
 )
)
