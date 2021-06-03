Some examples of card types that embed media from other sites :


* YouTube
* SoundCloud
* BandCamp
* Twitter
* An RSS Feed
* Generic oEmbed. This is also pulling from soundcloud but note that it could be anywhere. The source of the data is specified in the :api argument.

----
:embed
{:type :youtube
 :url "https://www.youtube.com/watch?v=3WHPcsJ2BRY"
 :title "A YouTube Video"}

----
:embed
{:type :soundcloud
 :url "https://soundcloud.com/mentufacturer/sets/the-feelings-mixtape"
 :title "A SoundCloud Playlist"}

----
:embed
{:type :bandcamp
 :id 3725429300
 :url "http://mentufacturer.bandcamp.com/album/muerck"
 :description "Muerck by Mentufacturer"
 :title "A BandCamp album"
}

----
:embed
{:type :twitter
 :url "https://twitter.com/interstar/status/1239982130291228677" 
 :title "A Tweet"
}

----
:embed
{:type :rss
 :url "http://scripting.com/rss.xml"
 :caption "[[RSS]] feed from [[DaveWiner]]"
 :title "An RSS Feed"}

----
:embed
{:type :codepen
 :url "https://codepen.io/StriveMath/pen/WNpMwKR"
 :title "CodePen"
}

----
:embed
{:type :oembed
 :url "https://www.ted.com/talks/Fralph_langner_cracking_stuxnet_a_21st_century_cyberweapon"
 :api "https://www.ted.com/services/v1/oembed.json"}