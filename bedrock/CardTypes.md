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
* **:raw** - don't run the text through markdown or other preprocessing
* **:workspace** - a ClojureScript embedded workspace. The card contains the default code that can be modified by the user and executed on the client. See [[WorkspaceExample]]. 
* **:embed** - See [[EmbeddingExamples]] for examples of cards that embed media from other sites. Included embed types are video (YouTube and Vimeo), music (BandCamp and SoundCloud), Tweets, RSS feeds, CodePen and generic OEmbed from any site that supports it.
* **:system** - System cards contain calls to built-in system functions. At the moment these include full text search (see [[SearchPage]] for an example), and the queries on metadata such as those on [[AllPages]] [[AllLinks]] [[BrokenLinks]], [[OrphanPages]] and [[RecentChanges]].
* **:evalraw** and **:evalmd** - Clojure code that is run on the server and whose output is rendered either as "raw" or through the Markdown processor.(See [[EvalExamples]])
* **:patterning** - The [Patterning library](https://github.com/interstar/Patterning-Core) has been made available to scripts within the special :patterning card type. See [[PatterningSupportInCardiganBay]]. Note that only a subset of the current Patterning API is available and this is subject to change. Patterning itself is likely to stay, but the API might change in future.

### Experimental Unsupported

There's some work-in progress towards these types, but they are not guaranteed to work or stay 

* **:transclude** - Transclusion is still **very experimental** and shouldn't be relied on yet. It's **buggy**, and doesn't do everything we want. But you can see a [[TransclusionExample]]
* **:network** - Beginning investigations into drawing a navigable network diagram of pages. Not automatically generated, hand-written. This format is not suitable for writing by humans yet. And probably won't stay constant, so don't use. [[NetworkDiagramExample]]

----

### Future Types

These are currently in the "ideation" phase. They seem like cool ideas, and will be important functionality but they aren't fully specced, let alone implemented. If you are impatient to see them, get involved :-)

* *:hiccup* (complex html represented in hiccup format)
* *:gallery* of images
* *:outline*
* *:spreadsheet* (grid data with embeddable clojure functionality)
* *:widget* (full embedded interactive widgets written in clientside clojurescript.)

