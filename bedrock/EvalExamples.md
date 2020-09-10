
### Evaluation Examples

The card-types :evalraw and :evalmd allow us to embed Clojure code in a page which is run on the server when the page is assembled. 

To run. the code must be correct (without bugs or causing exceptions). And not try to use external resources or include libraries etc. 

:evalraw evaluates the code and returns the result as a raw string, to be rendered as returned. :evalmd assumes that the code returned will itself be in markdown format and therefore should be run through the markdown renderer.

The next cards have examples of :evalraw and :evalmd

----
:evalraw

(map 
  #(str % "\n") 
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