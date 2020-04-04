
## Starting the Wiki

In development mode :

```
clj -A:dev:app [ARGS]
```


----

## Understanding the Wiki

The default markup is [Markdown](https://daringfireball.net/projects/markdown/syntax)


However CardiganBay tweaks it in the following ways :

Pages are a sequence of sections called "cards". The four horizontal dashes markup (ie. -<!-->-<!-->-<!-->-) on a line by themselves, has been re-purposed as the "card separator".

It will break your page up into separate cards.

For example, there is a card separator following this line ...

----

... we are now after the card separator. And you can see we are in a new card.

Here's another separator before a new card on a new theme ...

----

### Card Types

Each card in CardiganBay has a type, which tells us what its data is meant to represent, and how to render it. 

Cards which do not specify their type explicitly are taken to be of the :markdown type. And are therefore rendered on the client as Markdown.


To declare that a card has a type other than Markdown, you should specify the type as a :keyword, on a line by itself, immediately *after* the card separator.

For example, the next card after this has a :raw type.

----
:raw

This card has a :raw type. We treat it as plain-text and don't interpret it as markdown.

----

### Current Types

We will be adding more types over time, but the current types are 

* default / :markdown
* :raw
* :evalraw  
* :evalmd
* :system
* :embed 

See [[EvalExamples]] for how to embed Clojure code in a card.

See [[EmbeddingExamples]] for examples of cards that embed media from other sites.

:system cards are calls to specific system functions. At the moment these include queries such as those on [[AllPages]] [[AllLinks]] [[BrokenLinks]] and  [[OrphanPages]]

----

### Future Types
* :hiccup
* :transclude
* :transcludemd

