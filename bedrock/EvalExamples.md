
### Evaluation Examples

[[CardiganBay]] is written in [Clojure](https://clojure.org/), a language which I'm a big fan of, and want to use for scripting within the wiki.

There are two ways to embed Clojure code in your wiki.

* evaluation on the client
* evaluation on the server

In both cases, the code must be correct (without bugs or causing exceptions). And not try to use external resources or include libraries etc.

----
### Evaluation on the Client

We now have an interactive workspace running in the browser client that uses the Small Clojure Interpreter (<https://github.com/borkdude/sci>)

Use the card-type :workspace and some valid ClojureScript code in the card.

This will be rendered as an interactive workspace where the users can run (and potentially edit) your code snippet.

**Note that although you can directly edit and run the code in the interactive workspace, it will not currently be saved.** ([[OutstandingTask]]). If you want to permanently save the code you are working on, you must edit the full page and keep the code in the :workspace card.
 
The following card has an example of a client-side workspace.
----
:workspace

(map 
  #(str % ", ") 
  (filter even? (range 70)))

----

**Note : ** Right now, client-side evaluation works only on a live Cardigan Bay instance. Exported static files will render :evalclient cards as raw source-code. 
 
A medium-term goal is to allow exports to active single-page apps where this script would actually run in the page. But we are some way from that.

----
### Evaluation on the Server

The card-types :evalraw and :evalmd allow us to embed Clojure code in a page which is run on the server when the page is assembled. 


:evalraw evaluates the code and returns the result as a raw string, to be rendered as returned. :evalmd assumes that the code returned will itself be in markdown format and therefore should be run through the markdown renderer.

The next cards have examples of :evalraw and :evalmd

----
:evalraw

(map 
  #(str % ",") 
  (filter even? (range 10)))
----
:evalmd

(map #(str "* Item number **" % "**\n") (range 10))

----
:evalmd

(str "This is some text with a link to [[SandBox]]")

----
:evalmd

(for [x (range 10)] 
   (str x ",," (* x x) ",," (* x x x) "\n")
)

----
### IMPORTANT

**Please note that we don't do any security checking of Clojure to be run on the server, so this is a security risk. Don't run Cardigan Bay on a server where you think it might be accessible to hostile, Clojure-aware agents.**

Right now, Cardigan Bay is only recommended for private machines or protected private networks.

Unlike client-side evaluation, server-side code will be evaluated during exports.
