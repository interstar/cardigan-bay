An example embedded ClojureScript Workspace. It uses the Small Clojure Interpreter (<https://github.com/borkdude/sci>), running in the browser.

Note that the output of the code is expected to be either a string or [hiccup](https://github.com/weavejester/hiccup) surrounded by [:div :]
----
:workspace

;; Write some code
[:div 
[:ul {:style {:font-size "small"}}
(map (fn [x] [:li (str x ", " (reduce + (range x)))]) (range 10))
]]
----

### Publishing Code

A new, experimental feature of Cardigan Bay is that workspaces **are** now executable when exported to static HTML pages.

This is an exciting new feature. It means that we can add dynamic in-page calculations to public facing wikis and digital gardens.

The technology works (using SCI again, via [Scittle](https://github.com/babashka/scittle)) but presentation is still basic.

In the above Workspace example, we wrote code that output hiccup format which was automatically rendered as HTML. 

In an *exported* Workspace, hiccup isn't available. So if you want to write a program that renders correctly, you'll need it to produce HTML itself (unless plain text is sufficient)

Look at the example in the Workspace below. Note that if you run it in a live Cardigan Bay, the tags won't render correctly. But in an exported page they will.


----
:workspace

;; Code that renders as expected in exported pages.

(defn li [x] (str "<li>" x "</li>"))

(str
(apply str
  "<h3>Some numbers</h3>"
  (map li (range 20))
)
  "Total:" (reduce + (range 20))
)
----

To test this feature and see what exported workspaces look like, simply hit the Export button for this page and see the exported html file (probably at bedrock/exported/WorkspaceExample )

----
### Simplifying Published Code

You'll notice when you look at the above example, that all the exported code can be seen and edited in the textarea of the published page.

That's convenient if you want to give your readers access to the whole thing. But it can also be confusing. Especially for inexperienced readers.

Sometimes you have an algorithm or model you want to make available to people, without them having to look at, or think about, the whole thing.

You just want to allow them to put in some parameters and see how the algorithm works out or the model behaves.

For this we can separate the code into two sections : private and public.

This is done by placing a single comment in the code with four semi-colons and the word PUBLIC, as in 

;;;;PUBLIC

Clojure ignores this line, as it's justs a comment. But the exporter treats it as a separator : all the code *before* this line is considered **private** while all code after it is **public**. In the exported version of the page, the private code will be hidden, and can encapsulate as much complexity as you like. While the public code can by used to present a clean API / interface to the user, which is easily understood and changed.

See the following example in the exported page to understand how it works


----
:workspace

 
(defn tag [t s] (str "<" t ">" s "</" t ">"))

(defn ul [s] (tag "ul" s))
(defn li [s] (tag "li" s))
(defn div [s] (tag "div" s))

(defn total [xs] (reduce + xs))

(defn list-and-total [title xs]
  (str
     (tag "h3" title)
     (ul 
       (apply str (map li xs)) 
     )
     "Total:" (total xs)
  )
)

;;;;PUBLIC

(list-and-total "A List of Numbers" (range 20))