### Code Examples

[[CardiganBay]] is written in [Clojure](https://clojure.org/), a language which I'm a big fan of, and want to use for scripting within the wiki.

There are two ways to embed Clojure code in your wiki.

* evaluation on the client
* evaluation on the server

In both cases, the code needs to be correct (without bugs or causing exceptions). And can't use external resources or include libraries etc.
----
### Evaluation in the Browser

You can run code in the browser in two ways.

1) To evaluate small Clojure expressions, for example to do simple ad hoc calculations you can just type them into the [[TheNavBar]] and press the [Run It] button. The result will be printed to [[TheTranscript]] 

2) There is a Workspace card into which you can type longer Clojure code and have it run. Full details are on  [[WorkspaceExample]]. You can also look at the  [[GraphingExample]] which shows you how to implement a simple "graphing calculator" using a workspace.
----
### Evaluation on the Server

The card-types :evalraw and :evalmd allow us to embed Clojure code in a page which is run on the server when the page is assembled.

:evalraw evaluates the code and returns the result as a raw string, to be rendered as returned. 

:evalmd assumes that the code returned will itself be in markdown format and therefore should be run through the markdown renderer.

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
See also [[PatterningExamples]]
----

### IMPORTANT

**Eval on the server is now using the Small Clojure Interpreter. That *should be* a sandboxed environment, But we don't do any extra security checking**.

So this may be a security risk. 

At time of writing, I have no reason to think that it is, but running Cardigan Bay on an open server is at your own risk.

Right now, Cardigan Bay is mainly recommended for private machines or protected private networks. You can then export the pages as flat files to a public server.

Unlike client-side evaluation, server-side code will be evaluated during exports.