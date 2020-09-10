### Hacker Roadmap

**Want to change the look of CardiganBay?**

All the css is in 

* `resources/clj_ts/main.css`

All the layout / widgets of the UI are defined (in hiccup format) in 

* `src/clj_ts/client.cljs`

----



**Most of the work on managing pages**, including parsing them into cards and handling the rendering of cards is in

* `src/clj_ts/common.cljc` - common functions for parsing raw text into cards and manipulating lists of cards) that can be used both on the server and in the client.
* `src/clj_ts/card_server.clj` - the main functionality for creating / manipulating the wiki full of cards. Look here for your  
* `src/clj_ts/pagestore.clj` - the bit that deals with the file-system

----

**If you want to creat a new card type** or edit how a particular type is being rendered, have a look in  `src/clj_ts/card_server.clj` 

But *also* look at `resources/gql_schema.edn` for enums related to graphql communication between client and server

Cards that are not Markdown or raw-text are usually represented with their type, and a small map in EDN format, with the required parameters.

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

* `src/clj_ts/server.clj`----
:markdown

## Starting the Wiki

In development mode :

```
clj -A:dev:app [ARGS]
```



