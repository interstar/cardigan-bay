
### Evaluation Examples

The [[CardTypes]] :evalraw and :evalmd allow us to embed Clojure code in a page which can be run on the server. To run the code must be correct (without bugs or causing exceptions). And not try to use external resources, include libraries etc.

:evalraw evaluates the code and returns the result as a raw string, to be rendered as returned. :evalmd assumes that the code returned will itself be in markdown format and therefore should be run through the markdown 

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