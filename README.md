
## CardiganBay

CardiganBay is a new wiki-engine which aims to combine the best ideas from classic wiki with up-to-date technologies and an eye to the future. 


![How it looks](http://sdi.thoughtstorms.info/wp-content/uploads/2023/04/Screenshot-from-2023-04-05-20-45-15.png)

[Easy Install and Introduction on YouTube](https://www.youtube.com/watch?v=H7_THeK9EBw)

### CardiganBay motivations

I need a new wiki-engine that can 
* Be the engine to manage and maintain my long-running, publicly facing, and somewhat in need of cleaning up [ThoughtStormsWiki](http://thoughtstorms.info/view/ThoughtStorms).
* Be an engine to manage a couple of smaller, more specific wikis and sites, with some specialized media types embedded in pages. 
* Be the engine to run my own private notebook of ideas. Replacing my long defunct [SdiDesk](http://thoughtstorms.info/view/SdiDesk) and more recent [OutlinerWithWikiLinking](http://thoughtstorms.info/view/OutlinerWithWikiLinking)
* Be something I can use when travelling. To work on these notebooks even when I'm away from my main machine or off-line.
* Be a platform to explore new ideas and functionalities for wiki.
* Be a platform not simply for writing and capturing information, but for making sense of, and finding meaning in it.
* Be a platform to help me DO things as well as write about them.
 


### Design decisions

* A classic wiki with named pages.
* Names of pages are [concrete](http://thoughtstorms.info/view/ConcretePageNames). (Ie. the name is the id of the page) This allows for spontaneous discovery and link-making (when writing on one page, we can guess the names of relevant other pages without having to look them up.)
* Pages are made from a sequence of "cards"
* Each card has an explicit *type*. By default, *Markdown*, but other types for other media or data which are rendered (or even editable) differently. This is how we support embedding from YouTube, SoundCloud, BandCamp etc. There's an Embedded type which is used for embedded media from elsewhere.
* **Despite the emphasis on cards, full pages always have a canonical representation which is a single, plain-text file.** And pages can be edited in their entirety in a single textbox. (This was [my main beef with the SmallestFederatedWiki](http://thoughtstorms.info/view/LeavingTheSFW))
* Borrowing from [SmallestFederatedWiki](http://fed.wiki.org/view/welcome-visitors) the wiki engine is intended to have a single user. The expectation is that collaboration happens when each user has their own fork of the wiki data. 
* **Unlike SFW** we rely on external tools such as Git to manage and merge forks rather than trying to do this ourselves.
* The wiki engine is a personal tool rather than intended for a public server. The assumption is that public facing sites will be exported as either completely flat sites, or minimal engines without editing capabilities.



### Technical Decisions

* The wiki is a Single Page App written in [Clojure](https://clojure.org/) / ClojureScript. 
* It uses [Reagent](https://reagent-project.github.io/) (the ClojureScript wrapper for React) as its client-side framework.
* All UI components are therefore written in [hiccup format](https://github.com/weavejester/hiccup)
* Communication between client and server is mainly through [GraphQL](https://graphql.org/)
* [Markdown](https://daringfireball.net/projects/markdown/) is the default markup type
* By default, cards of other types that need to contain some structured data will use [EDN](https://github.com/edn-format/edn)
* Where possible embedding uses [oembed](https://oembed.com/).
* Pages are stored as simple text files in the file system
* Assume [git](https://git-scm.com/) for managing page history / version control, rather than writing our own.
* We have been capturing information about the collection of pages in a [Core.Logic](https://github.com/clojure/core.logic) database. And, as much as possible, use core.logic logic programming to query and reason about it. Eg. to find broken links, orphaned pages etc. *This decision is currently under review. It works but it's very slow. Would something like DataScript be better?*
* As a Clojure program, the wiki engine runs on the Java Virtual Machine and can be distributed as an [UberJAR](https://stackoverflow.com/questions/11947037/what-is-an-uber-jar) file, without the need for potential users to install or understand any dependencies.


## Quick Start (for Users)

*[See also on YouTube in video form](https://www.youtube.com/watch?v=H7_THeK9EBw)*

Make sure you have Java on your machine. 

Go to https://github.com/interstar/cardigan-bay/releases and download the latest zip file. 

Unzip it.

**On Linux.** (And hopefully Mac)

```
cd cardigan
./go.sh
```

This should run the jar file. Using the default pages in `bedrock`.

(**On Windows**, go to the unzipped folder and run the `go.bat` file.)

On either OS, then go to http://localhost:4545/index.html in your browser.

You are now looking at and can edit your wiki.


## Getting Started (as Developer)

CardiganBay is a Clojure project, originally kickstarted in [LightMod](https://sekao.net/lightmod/) but now compiled and run using the CLI tools.


Make sure you have the JDK and Clojure CLI tool installed.

Then

```
git clone https://github.com/interstar/cardigan-bay.git cb
cd cb
clj -A:dev:app

```

Then navigate to http://localhost:4545/index.html in your browser.

You should be running your wiki. By default CardiganBay starts on port 4545 and looks in the local `bedrock` directory for its pages. You'll find several pages with the beginnings of some documentation and examples there.

To change the page directory and port run with these as command line arguments, eg. 

```
clj -A:dev:app -d PATH/TO/PAGES PORT
```

### Features of CardiganBay

* Classic wiki, with editable pages.
* create links using [[PageName]] format.
* RecentChanges
* **Automatic backlinks** (Because you guys all seem to love this) 
* List of Broken Links (links whose destination pages don't exist)
* List of Orphan Pages (pages without links to them)

* Pages are sequences of cards, with card-types.
* 
* Support for embedding from YouTube, Vimeo, BandCamp, SoundCloud, Twitter, RSS Feeds and generic OEmbed servers
* Support for embedding snippets of Clojure (executed on the server). 
* Experimental support for embedding an interactive ClojureScript workspace (executed on the browser).
* Card oriented manipulation (eg. Move Card to another page)
* Support for Patterning patterns (https://github.com/interstar/Patterning-Core) embedded in pages.

* Exports flat HTML pages to make a static site. You can configure your own template / css for how this looks.

* Easily distributed in a JAR file.

### DISCLAIMER

CardiganBay is currently actively developed Work-in-Progress and has some nice features. It also has some pretty rough edges, bugs, corner-cases, hardwired magic etc. And the current web-design is not quite so terrible as it was, but nothing to be proud of. 

This software is probably not yet ready for usage in most of the real world except as a private notekeeping app. (Which is how I'm current using it.) I can't guarantee that a bug won't delete your data, so I highly recommend you only use this if you are keeping backups of your pages (ideally in git or similar)

OTOH, if you're excited by the potential, please get involved. Send me a bug-report or feature request. Or start hacking.

### Building for Distribution

```
clj -A:prod:app

```

Will build everything into an UberJAR.

You can then run the UberJAR like this :

```
java -jar PATH/TO/clj-ts-0.1.0-SNAPSHOT-standalone.jar PATH/TO/PAGES PORT

```

### Hacker Roadmap

**Want to change the look of CardiganBay?**

All the css is in 

* `resources/clj_ts/main.css`

All the layout / widgets of the UI are defined (in hiccup format) in 

* `src/clj_ts/client.cljs`

----



**Most of the work on managing pages**, including parsing them into cards and handling the rendering of cards is in

* `src/clj_ts/common.cljc` - common functions for parsing raw text into cards and manipulating lists of cards) that can be used both on the server and in the client.
* `src/clj_ts/card_server.clj` - the main functionality for creating / manipulating the wiki full of cards.
* `src/clj_ts/pagestore.clj` - the bit that deals with the file-system

----

**If you want to creat a new card type** or edit how a particular type is being rendered, have a look in  `src/clj_ts/card_server.clj` 

But *also* look at `resources/gql_schema.edn` for enums related to graphql communication between client and server

Cards that are not Markdown or raw-text are usually represented with their type, and a small map in EDN format, with the required parameters.

A non Markdown card usually looks like this
```
----
:cardtype

{:some "cardtype specific data"
 :in [:EDN "format"] 
 }
 
----
```
----

**GraphQL Schema**

Is in `resources/gql_schema.edn`. We're using graphql (via lacinia) for most communication between client and server. (Not all, for example card-move isn't yet). But eventually we should be doing all the things that it makes sense to do with gql with it.

----

**The core.logic stuff** happens in 

* `src/clj_ts/logic.clj` 

If you want to capture more information in logic format or ask new queries on it, that's the place to look at.

The convention for using logic queries is that calls to them are embedded in :system type cards. (See `card-server/system-card` to see how to add a new system command.)

----

**Where's the web-server?**

* `src/clj_ts/server.clj`


## Final Comments / Queries

#### *Does CardiganBay deprecate [Project ThoughtStorms](https://github.com/interstar/ThoughtStorms)?*

**Pretty much. CardiganBay has now replaced Project ThoughtStorms. It's used to manage ThoughtStorms wiki's pages, and the public ThoughtStorms site is now just static HTML exported from Cardigan Bay**

I *like* Python (the language of the previous ThoughtStorms server). But I like Clojure a whole lot more. And the more I get into it, (and writing this has helped me with that) the more I see Clojure as the language I want to be using for most things in future. I don't need a legacy Python wiki code-base to be responsible for. And the world sure as hell doesn't need A.N.Other Python wiki-engine. Certainly not mine.

Whereas it feels like in Clojure I might yet be able to push my vision of wiki forward sufficiently to actually make something new and interesting.

#### *What was that you were saying about usage on mobile devices?*

Sorry to disappoint you, but right now there is no CardiganBay app. for Android. Possibly, because it's all Clojure (and therefore Java) there will be. Or maybe ClojureScript and ReactNative is the future. Long term there's an aspiration towards that but it's not in the immediate future.

**However** I am having success running normal CardiganBay on Ubuntu on the [UserLand VM](https://www.fossmint.com/userland-run-linux-distros-on-android/) on my Android tablet. And by success, I don't just mean that it kind of works. I spent [several weeks travelling](http://sdi.thoughtstorms.info/?p=1392) in Jan 2020 and was actually developing the software (with the CLI tools, and running Emacs all in the UserLand app on the tablet.) While simultaneously using CardiganBay through the tablet's normal Chrome browser. With an 8" tablet and external keyboard this was actually a pleasant experience, as it acts like a very small laptop / netbook. Even without the keyboard, I'm finding CardiganBay *usable* on the tablet. Though it's not as comfortable or slick an experience as it is writing in a well designed Android app.

The bottom line is that, even if this isn't the greatest user experience, for people who know about Linux, wiki and Clojure, this is totally usable right now. 

(Just use git when you get home to sync your work back into your laptop based notebook.)
