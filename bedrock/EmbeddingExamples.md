Some examples of card types that embed media from other sites :

[[VideoEmbedding]]
* YouTube
* Vimeo

[[MusicEmbedding]]
* SoundCloud
* BandCamp


[[SocialEmbedding]]
* Twitter
* An RSS Feed

Other
* CodePen (see below)
* Generic oEmbed. This is also pulling from soundcloud but note that it could be anywhere. The source of the data is specified in the :api argument.

----
:embed
{:type :codepen
 :url "https://codepen.io/StriveMath/pen/WNpMwKR"
 :title "CodePen"
}----
:embed
{:type :oembed
 :title "Raw OEmbed"
 :method :get
 :url "https%3A%2F%2Fwww.ted.com%2Ftalks%2Fralph_langner_cracking_stuxnet_a_21st_century_cyberweapon"
 :api "https://www.ted.com/services/v1/oembed.json"}