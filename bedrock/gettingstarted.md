
The default markup is [Markdown](https://daringfireball.net/projects/markdown/syntax)


However Cardigan Bay tweaks it in the following ways :

Pages are a sequence of sections called "cards". The four horizontal dashes markup (ie. -<!-->-<!-->-<!-->-) on a line by themselves, has been re-purposed as the "card separator".

It will break your page up into separate cards.

For example, there is a card separator following this line ...

----

... we are now after the card separator. And you can see we are in a new card.

Here's another separator before a new card on a new theme ...

----

### Card Types

Each card in Cardigan Bay has a type, which tells us what its data is meant to represent, and how to render it. 

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

See [[EvalExamples]] for more on evaluating code in your pages.

:system cards are calls to specific system functions. At the moment these include queries such as those on [[AllPages]] [[AllLinks]] [[BrokenLinks]] and  [[OrphanPages]]

----

### Future Types
* :hiccup
* :transclude
* :transcludemd

