An example embedded ClojureScript workspace. It uses the Small Clojure Interpreter (<https://github.com/borkdude/sci>), running in the browser.

Note that the output of the code is expected to be either a string or [hiccup](https://github.com/weavejester/hiccup) surrounded by [:div :]
----
:workspace

;; Write some code
[:div
[:ol
(map (fn [x] [:li x]) (range 20))
]]

----


A new, experimental feature of Cardigan Bay is that workspaces **are** now executable when exported to static HTML pages.

This is an exciting new feature. It means that we can add dynamic in-page calculations to public facing wikis and digital gardens.

The technology works (using SCI again, via [Scittle](https://github.com/babashka/scittle)) but presentation is still basic.

In the above Workspace example, we wrote code that output hiccup format which was automatically rendered as HTML. 

In an *exported* Workspace, hiccup isn't available. So if you want to write a program that renders correctly, you'll need it to produce HTML itself (unless plain text is sufficient)

Look at the example in the Workspace below. Note that if you run it in a live Cardigan Bay, the tags won't render correctly. But in an exported page they will.


----
:workspace

;; Code that renders as expected in exported pages.

(str
(apply str
  "<h3>Some numbers</h3>"
  (map (fn [x] (str "<li>" x "</li>")) (range 20))
)
  "Total:" (reduce + (range 20))
)

----

To test this feature and see what exported workspaces look like, simply hit the Export button for this page and see the exported html file (probably at bedrock/exported/WorkspaceExample )
