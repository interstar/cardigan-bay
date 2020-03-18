[[CardiganBay]] is a new wiki-engine with a number of interesting features.

Some of these are "classics" from the very dawn of wiki.

Others are new and reflect changing requirements for changing times.

This page describes the philosophy of CardiganBay, the motivations behind it, and the technical decisions that flow from them.

Not everything here is currently implemented, but everything is being planned.

----

### CardiganBay motivations


I need a new wiki-engine that can 
* Be the engine to manage and maintain my long-running, publicly facing, and somewhat in need of cleaning up [ThoughtStormsWiki](http://thoughtstorms.info/view/ThoughtStorms).
* Be an engine to manage a couple of smaller, more specific wikis and sites, with some specialized media types embedded in pages. 
* Be the engine to run my own private notebook of ideas. Replacing my long defunct [SdiDesk](http://thoughtstorms.info/view/SdiDesk) and more recent [OutlinerWithWikiLinking](http://thoughtstorms.info/view/OutlinerWithWikiLinking)
* Be something I can use when travelling. To work on these notebooks even when I'm away from my main machine or off-line.
* Be a platform to explore new ideas and functionalities for wiki.
* Be a platform not simply for writing and capturing information, but for making sense of, and finding meaning in it.
* Be a platform to help me DO things as well as write about them.
 
----

### Goals

The wiki-engine should

* Be built with new technologies appropriate to 2020
* Nevertheless embody some of the classic wiki values and ideas that I've found valuable over the last 20 years.
* Be compatible with useful existing contemporary standards. 
* And a viable citizen in an internet of the 2020s, in a world dominated by social media etc.
  * Support embedding to and from other social media.
  * But nevertheless help to promote other open / free standards
  * And collaboration with other wikis
* Support transclusion
  * from one page to another (to help reduce redundancy)
  * from one CardiganBay wiki to another
  * eventually from other wiki-engines 
* Run on servers, local desktop machines, and mobile devices like tablets and phones. 
* Be great for capturing new information. But equally useful for cleaning, refactoring and reworking it to keep it up-to-date and relevant. 
* Manage several wikis from a single instance of the engine. And to be able to perform operations that cut across them. Eg. to migrate or copy pages or cards from one to the other, to do diffs etc.
* Be able to publish collections of pages as stand-alone sites.
* Be able, increasingly, to analyse and ask questions about the contents of the wiki. To help us classify, fix broken links, merge pages, discover interesting insights and overviews.
* Accept executable code, making it active notebook similar to JuPyter Notebook etc.
* Support user customization. Where possible, customization information should live within the wiki and be editable by the user.

----

### Design decisions

* A classic wiki with named pages.
* Names of pages are [concrete](http://thoughtstorms.info/view/ConcretePageNames). (Ie. the name is the id of the page) This allows for spontaneous discovery and link-making (when writing on one page, we can guess the names of relevant other pages without having to look them up.)
* Pages are made from a sequence of "cards"
* Each card has an explicit *type*. By default, *Markdown*, but other types for other media or data which are rendered (or even editable) differently. This is how we support embedding from YouTube, SoundCloud, BandCamp etc. There's an Embedded type which is used for embedded media from elsewhere.
* **Despite the emphasis on cards, full pages always have a canonical representation which is a single, plain-text file.** And pages can be edited in their entirety in a single box. (This was [my main beef with the SmallestFederatedWiki](http://thoughtstorms.info/view/LeavingTheSFW))
* Borrowing from [SmallestFederatedWiki](http://fed.wiki.org/view/welcome-visitors) the wiki engine is intended to have a single user. The expectation is that collaboration happens when each user has their own fork of the wiki data. 
* **Unlike SFW** we rely on external tools such as Git to manage and merge forks rather than trying to do this ourselves.
* The wiki engine is a personal tool rather than intended for a public server. The assumption is that public facing sites will be exported as either completely flat sites, or minimal engines without editing capabilities.



### Technical Decisions

* The wiki is a Single Page App written in [Clojure](https://clojure.org/) / ClojureScript. 
* It uses [Reagent](https://reagent-project.github.io/) (the ClojureScript wrapper for React) as its client-side framework.
* All UI components are therefore written in [hiccup format](https://github.com/weavejester/hiccup)
* Communication between client and server is mainly through [GraphQL](https://graphql.org/)
* [Markdown](https://daringfireball.net/projects/markdown/) is the default markup type
* By default cards of other types that need to contain some structured data will use [EDN](https://github.com/edn-format/edn)
* Where possible embedding uses [oembed](https://oembed.com/).
* Pages are stored as simple text files in the file system
* Assume [git](https://git-scm.com/) for managing page history / version control, rather than writing our own.
* We capture information about the collection of pages in a [Core.Logic](https://github.com/clojure/core.logic) database. And, as much as possible, use core.logic logic programming to query and reason about it. Eg. to find broken links, orphaned pages etc.
* As a Clojure program, the wiki engine runs on the Java Virtual Machine and can be distributed as an UberJAR file, without the need for potential users to install or understand any dependencies.
