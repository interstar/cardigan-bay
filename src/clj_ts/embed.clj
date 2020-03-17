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
  (str (->
        (http-call oembed {:format "json" :url url })
        json/read-str (get "html"))))

(defn youtube [data]
  (let [url (:url data)
        id (->
            (re-matches #"https://www.youtube.com/watch\?v=(\S+)" url)
            second) ]
     (str "<div class='youtube-embedded'><iframe width='400' height='271' src='http://www.youtube.com/embed/" id  "' frameborder='0' allowfullscreen></iframe></div>")
     ))


(defn youtube2 [data]
  (generic-oembed "https://www.youtube.com/oembed" (:url data) )
  )

(defn soundcloud [data]
  (generic-oembed "https://soundcloud.com/oembed" (:url data)))

(defn bandcamp [{:keys [id url description]}]
  (str "<div class='bandcamp-embedded'><iframe style='border: 0; width: 550px; height: 555px;' src='https://bandcamp.com/EmbeddedPlayer/album=" id "/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/' seamless><a href='" url "'>" description "</a></iframe></div>")
  )


(defn process [s]
  (let [data (read-string s)]
    (condp = (:type data)
      :youtube
      (youtube data)

      :bandcamp
      (bandcamp data)

      :soundcloud
      (soundcloud data)

      :oembed
      (generic-oembed (:api data) (:url data))

      (str "Not recognised type:  " (:type data) )
      )
 )
)
