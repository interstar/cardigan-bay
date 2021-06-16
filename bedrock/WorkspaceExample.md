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
----
:markdown


**Note : ** Right now, client-side evaluation works only on a live Cardigan Bay instance. Exported static files will render :workspace cards as raw source-code. 
 
A medium-term goal is to allow exports to active single-page apps where this script would actually run in the page. But we are some way from that.