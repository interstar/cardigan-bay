Some examples of card types that embed media from other sites :


* YouTube
* SoundCloud
* BandCamp
* Twitter
* Generic oEmbed. This is also pulling from soundcloud but note that it could be anywhere. The source of the data is specified in the :api argument.

----
:embed

{:type :youtube
 :url "https://www.youtube.com/watch?v=3WHPcsJ2BRY"}

----
:embed

{:type :soundcloud
 :url "https://soundcloud.com/mentufacturer/sets/the-feelings-mixtape"}

----
:embed

{:type :bandcamp
 :id 3725429300
 :url "http://mentufacturer.bandcamp.com/album/muerck"
 :description "Muerck by Mentufacturer"
}

----
:embed

{:type :twitter
 :url "https://twitter.com/interstar/status/1239982130291228677" 
}


----
:embed

{:type :oembed
 :api "https://soundcloud.com/oembed"
 :url "https://soundcloud.com/mentufacturer/sets/fernanda-design-tree"
}


----