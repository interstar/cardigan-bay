This is an example of current Work In Progress on transclusion.



The following card transcludes a card from the pages CardiganBay, PatterningSupportInCardiganBay and VideoEmbedding

----
:transclude

{:from "CardiganBay" 
 :type :Markdown
 :ids ["1f4d36e3-75fd-5483-91ed-2a0ecfc72ab3" ]
}

----
:transclude

{:from "PatterningSupportInCardiganBay"
 :type :Markdown
 :ids ["1e088496-5ef1-5542-922d-0b386e9035ad" "38621dcd-8104-5d37-97fb-83a2b4b9c929"]
}

-------
:transclude

{:from "VideoEmbedding"
 :type :Markdown
:ids ["36658abe-9a09-5926-ad15-ff7ba4de43e8" ]
}

----

### Hint

There's an easy way to grab a card for transclusion. Open up the [[CardBar]] at the bottom of the card, and you'll see some data associated with it, including the hash, outlined in a box. Click this outlined hash to copy the full code for a transclusion of that card, to the clipboard. Now you can go to another page and paste it in.
