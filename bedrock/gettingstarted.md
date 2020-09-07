

## Understanding the Wiki

The default markup is [Markdown](https://daringfireball.net/projects/markdown/syntax)


However CardiganBay adds to it in the following ways :

- Pages are broken into a sequence of cards. 
- Each card has a card *type* which defines how it is rendered. 
- By default, cards are "Markdown" type, but there are more specialized types with their own rendering etc.
- There are a few extra markup tricks. See [[ExtraMarkupExamples]]


----

### Sequence of Cards

In [[CardiganBay]], pages are made of a sequence of sections called "cards". 

The four horizontal dashes markup (ie. -<!-->-<!-->-<!-->-) on a line by themselves, has been re-purposed as the "card separator".

It will break your page up into separate cards.

For example, there is a card separator following this line ...


----

... we are now after the card separator. And you can see we are in a new card.

Here's another separator before a new card with a new header, on a new theme ...


----

### Card Types

Each card in CardiganBay has a type, which tells us what its data is meant to represent, and how to render it. 

Cards which do not specify their type explicitly are taken to be of the :markdown type. And are therefore rendered on the client as Markdown.


To declare that a card has a type other than Markdown, you should specify the type as a :keyword, on a line by itself, immediately *after* the card separator.

For example, the next card after this has a :raw type.

----
:raw
This card has a :raw type. 

We treat it as plain-text and **don't** interpret it as markdown.
----

### Current Types

We will be adding more types over time, but the current types are 

* default / :markdown
* :raw
* :evalraw  
* :evalmd
* :system
* :embed 
* :transclude (experimental)

See [[EvalExamples]] for how to embed Clojure code in a card.

See [[EmbeddingExamples]] for examples of cards that embed media from other sites.

:system cards are calls to specific system functions. At the moment these include queries such as those on [[AllPages]] [[AllLinks]] [[BrokenLinks]] and  [[OrphanPages]]

:transclusion is still very experimental and shouldn't be relied on yet. It's buggy, and doesn't do everything we want. See a [[TransclusionExample]]

----

### Future Types

These are currently in the "ideation" phase. They seem like cool ideas, and will be important functionality but they aren't fully specced, let alone implemented. If you are impatient to see them, get involved :-)

* :bookmark (a card created by posting an external link to CardiganBay, and representing an important external resource)
* :hiccup (complex html represented in hiccup format)
* :transclude (working, fully functional, including transclusion of individual cards. Or from other Cardigan Bay instances.)
* :gallery of images
* :network_diagram / mind-map. I had something like this back in an earlier product, SdiDesk. And network cards would behave similarly.
* :outline
* :spreadsheet (grid data with embeddable clojure functionality)
* :widget (full embedded interactive widgets running in clientside clojurescript.)

