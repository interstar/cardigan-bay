### Hacker Roadmap

**Where is the source?**

On GitHub : <https://github.com/interstar/cardigan-bay>

On GitLab : <https://gitlab.com/interstar/cardigan-bay>


----


**Want to change the look of CardiganBay?**

For coders working with the source-code, the main css is in 

`resources/clj_ts/main.css`

However, this is supplemented with 

`bedrock/system/custom/custom.css`

which can be modified and customised even if you are working with a standard build.

**NB:** if replace *bedrock* with the path to your main pages directory if you aren't using the default bedrock that came with your copy of CardiganBay.


All the layout / widgets of the UI are defined (in hiccup format) in 

`src/clj_ts/client.cljs`


----


**Most of the work on managing pages**, including parsing them into cards and handling the rendering of cards is in

`src/clj_ts/common.cljc` - common functions for parsing raw text into cards and manipulating lists of cards) that can be used both on the server and in the client.

`src/clj_ts/card_server.clj` - the main functionality for creating / manipulating the wiki full of cards. Look here first for the main "actions" the system can do.

`src/clj_ts/pagestore.clj` - the bit that deals with the pages stored as plain files in the file-syste


----

**If you want to creat a new card type** or edit how a particular type is being rendered, have a look in  `src/clj_ts/card_server.clj` 

But *also* look at `resources/gql_schema.edn` for enums related to graphql communication between client and server

Cards that are not Markdown or raw-text are usually written with their type, and a small map in [EDN](https://github.com/edn-format/edn) format of the required parameters. EDN is similar to JSON but (IMHO) slightly more elegant and expressive.  


----

**GraphQL Schema**

Is in 

`resources/gql_schema.edn`

We're using graphql (via lacinia) for most communication between client and server. (Not all, eg. card-move isn't yet). But eventually we should be doing all the things that it makes sense to do with gql with it.


----

**The core.logic stuff** happens in 

`src/clj_ts/logic.clj` 

If you want to capture more information in logic format or ask new queries on it, that's the place to look at.

The convention for using logic queries is that calls to them are embedded in :system type cards. (See `card-server/system-card` to see how to add a new system command.)

Note that it's almost certain I'll be moving away from core.logic for the database in the near future, because it is so slow. I'm not sure how I will manage this stuff : possibly Datascript. Possibly an internal relational database. Possibly just a few basic pre-canned vectors.


----

**Where's the web-server?**

`src/clj_ts/server.clj`

----
**I want to change the look of the exported flat pages**

* `/resources/clj_ts/export_template/` has the index.html and main.css that are used when exporting the wiki as flat files.

----

## Starting the Wiki

In development mode :

```
clj -A:dev:app [ARGS]
```
**What ARGS**?

```
clj -A:dev:app -n "WikiName" -s "http://myserver.com/" -d "/PATH/TO/PAGE/DIRECTORY" -e "/PATH/TO/EXPORT/DIRECTORY" -p PORT
```

**What about building it as a JAR?**

See [[MyBuildScript]]

