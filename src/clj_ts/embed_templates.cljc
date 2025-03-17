(ns clj-ts.embed-templates
  (:require [clojure.string :as string]))

;; Centralized boilerplate templates for embeds
;; This file is used by both client and server code

(defn embed-boilerplate 
  "Returns boilerplate template for various embed types.
   Used by both client-side and server-side code."
  [type]
  (condp = type
    :markdown
    "
----

"
    :youtube
    "
----
:embed

{:type :youtube
 :url \"https://www.youtube.com/watch?v=\"
 :title \"\"
 :caption \"\"
}

"
    :vimeo
    "
----
:embed

{:type :vimeo
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"
}

"
    :media-img
    "
----
:embed

{:type :media-img
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"
}
"
    :img
    "
----
:embed

{:type :img
:url \"URL GOES HERE\"
:title \"\"
:caption \"\"
}
"
    :soundcloud
    "
----
:embed

{:type :soundcloud
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"

}


"
    :bandcamp
    "
----
:embed

{:type :bandcamp
 :id IDHERE
 :url \"URL GOES HERE\"
 :description \"DESCRIPTION GOES HERE\"
 :title \"\"
 :caption \"\"

}

"
    :twitter
    "
----
:embed

{:type :twitter
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"
}

"
    :mastodon
    "
----
:embed

{:type :mastodon
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"
}

"
    :codepen
    "
----
:embed

{:type :codepen
 :url \"URL GOES HERE\"
 :title \"\"
 :caption \"\"
}

"
    :rss
    "
----
:embed

{:type :rss
 :url \"URL GOES HERE\"
 :caption \"\"
 :title \"\"}
"
    :oembed
    "
----
:embed

{:type :oembed
 :url \"URL GOES HERE\"
 :api \"API ENDPOINT\"
 :title \"\"
 :caption \"\"}
"
    (str "
----

NO BOILERPLATE FOR EMBED TYPE " type "
----
")))

;; Helper functions for working with templates

(defn replace-url-in-template 
  "Replaces the URL placeholder in a template with the actual URL.
   For YouTube, it handles the special case of the video ID."
  [template-type url]
  (let [template (embed-boilerplate template-type)]
    (condp = template-type
      :youtube
      (string/replace template "https://www.youtube.com/watch?v=" url)
      
      :vimeo
      (string/replace template "URL GOES HERE" url)
      
      ;; For other types, replace the standard placeholder
      (string/replace template "URL GOES HERE" url))))

(defn format-for-bookmarklet
  "Formats a template for use in the bookmarklet by removing the initial lines."
  [template-type url]
  (let [result (replace-url-in-template template-type url)]
    (apply str (drop 14 result)))) 