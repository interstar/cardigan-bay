Cards in [[CardiganBay]] have types :


For example, the next card after this has a :raw type.

----
:raw

This card has a :raw type. 

We treat it as plain-text and **don't** interpret it as markdown.
----

### Current Types

We will be adding more types over time, but the current types are 

* **:markdown** - this is also the default if a type isn't specified
* **:raw**
* Embedded Clojure code. See [[EvalExamples]] for how this works.
  * **:evalraw** (eval Clojure and treat the result it produces as "raw")
  * **:evalmd** (eval Clojure and treat the result it produces as "markdown")
* **:system** - System cards contain calls to built-in system functions. At the moment these include queries such as those on [[AllPages]] [[AllLinks]] [[BrokenLinks]] and  [[OrphanPages]].
* **:embed** - See [[EmbeddingExamples]] for examples of cards that embed media from other sites.
* **:bookmark** - These are usually created created by posting an external link to CardiganBay. They are for easily capturing references to external resources and putting them into the wiki. See [[BookmarkingInstructions]] for full details.
* **:transclude** (experimental) - Transclusion is still **very experimental** and shouldn't be relied on yet. It's **buggy**, and doesn't do everything we want. But you can see a [[TransclusionExample]]

----

### Future Types

These are currently in the "ideation" phase. They seem like cool ideas, and will be important functionality but they aren't fully specced, let alone implemented. If you are impatient to see them, get involved :-)

* *:hiccup* (complex html represented in hiccup format)
* *:transclude* (working, fully functional, including transclusion of individual cards. Or from other Cardigan Bay instances.)
* *:gallery* of images
* *:network_diagram* / mind-map. I had something like this back in an earlier product, SdiDesk. And network cards would behave similarly.
* *:outline*
* *:spreadsheet* (grid data with embeddable clojure functionality)
* *:widget* (full embedded interactive widgets running in clientside clojurescript.)

