
## CardiganBay

CardiganBay is a new wiki-engine which aims to combine the best ideas from classic wiki with up-to-date technologies and an eye to the future. 


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
* As a Clojure program, the wiki engine runs on the Java Virtual Machine and can be distributed as an [UberJAR](https://stackoverflow.com/questions/11947037/what-is-an-uber-jar) file, without the need for potential users to install or understand any dependencies.

## Getting Started.

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
clj -A:dev:app PATH/TO/PAGES PORT
```

### Features of CardiganBay

* Classic wiki, edit pages
* create links using [[PageName]] format.
* RecentChanges
* List of Broken Links (links whose destinations don't exist)
* List of Orphan Pages (pages without links to them)

* Pages are sequences of cards, with card-types. 
* Support for embedding from YouTube, BandCamp and SoundCloud
* Support for embedding snippets of Clojure (to be executed on the server). Note that this is powerful but not secure. Be careful before enabling CardiganBay on a publicly accessible server.
* Easily distributed in a JAR file.

### DISCLAIMER

CardiganBay is currently actively developed Work-in-Progress and has some nice features. It also has some pretty rough edges, bugs, corner-cases, hardwired magic etc. And the current web-design is terrible. This software is probably not yet ready for usage in most of the real world except as a private notekeeping app. (Which is how I'm current using it.) And I don't recommend you currently use it.

OTH, if you're excited by the potential, please get involved. Send me a bug-report or feature request. Or start hacking. 

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

All the css is in `/resources/clj_ts/main.css`

All the layout / widgets of the UI are defined (in hiccup format) in `src/clj_ts/client.cljs`

**Most of the work on managing pages**, including parsing them into cards and handling the rendering of cards is in `src/clj_ts/pagestore.clj` 

**If you want to creat a new card type** or edit how a particular type is being rendered, have a look in `pagestore.clj` too.

Cards that are not Markdown or raw-text are usually represented with their type, and a small map in EDN format, with the required parameters.

**The core.logic stuff** happens in `src/clj_ts/logic.clj` If you want to capture more information in logic format or ask new queries on it, that's the place to look at.

I use my own [fsquery](https://github.com/interstar/FSQuery-CLJ) library to crawl the file system when building the logic db. 

The convention for using logic queries is that calls to them are embedded in :system type cards. (See pagestore/system-card to see how to add a new system command. 

## Final Comments / Queries

#### *Does CardiganBay deprecate [Project ThoughtStorms](https://github.com/interstar/ThoughtStorms)?*

**Pretty much, yes.**

Project ThoughtStorms is the code behind ThoughtStorms Wiki. The last version was the custom engine I wrote back in 2016 using Python.

CardiganBay is, indeed, intended as the new engine to sit behind ThoughtStorms wiki. However it is not quite ready nor an exact clone. So ThoughtStorms is still running on that Python server at the moment.

The plan is, though, that at some point, in the not too distant future, I'll move ThoughtStorms to this new wiki engine. At which point I don't plan to do any further work on that Python code-base nor on the Python libraries that underpin it.

I *like* Python. But I like Clojure a whole lot more. And the more I get into it, (and writing this has helped me with that) the more I see Clojure as the language I want to be using for most things in future. I don't need a legacy Python wiki code-base to be responsible for. And the world sure as hell doesn't need A.N.Other Python wiki-engine. Certainly not mine.

Whereas it feels like in Clojure I might yet be able to push my vision of wiki forward sufficiently to actually make something new and interesting.

#### *What was that you were saying about usage on mobile devices?*

Sorry to disappoint you, but right now there is no CardiganBay app. for Android. Possibly, because it's all Clojure (and therefore Java) there will be. Or maybe ClojureScript and ReactNative is the future. Long term there's an aspiration towards that but it's not in the immediate future.

**However** I am having success running normal CardiganBay on Ubuntu on the [UserLand VM](https://www.fossmint.com/userland-run-linux-distros-on-android/) on my Android tablet. And by success, I don't just mean that it kind of works. I spent [several weeks travelling](http://sdi.thoughtstorms.info/?p=1392) in January and was actually developing the software (with the CLI tools, and running Emacs all in the UserLand app on the tablet. While simultaneously using CardiganBay through the tablet's normal Chrome browser. With an 8" tablet, and external keyboard this was actually a pleasant experience, as it acts like a very small laptop / netbook. Even without the keyboard, I'm finding CardiganBay *usable* on the tablet. Though it's not as comfortable or slick an experience as it is writing in a well designed Android app.

The bottom line is that, even if this isn't the greatest user experience, for people who know about Linux, wiki and Clojure, this is totally usable right now. 

(Just use git when you get home to sync your work back into your laptop based notebook.)
