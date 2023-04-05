That NavBar (or "Navigation Bar") appears at the top of the Cardigan Bay screen.

It's similar to, and inspired by the browser's navbar, in that it's a place to type the names of pages to visit or terms to be searched. But it is also inspired by command-line terminals, allowing you to interact with Cardigan Bay textually.

At the moment there are three things you can do on the NavBar.

1. Type the name of a page to visit or create.
1. Type a term to be searched.
1. Type a Clojure expression to be evaluated.

The three buttons [View It], [Find It] and [Run It] perform each of these functions.

Typing, say, "HelloWorld" into the NavBar and hitting the [View It] button will take you to the HelloWorld page. (The term "View" was considered more intuitive than "Go". You can take it to mean  "I want to see the page HelloWorld")

If the page you are trying to view doesn't exist, just as in the case of following a link to a non-existent page, you have the option of [Edit]ing the dummy page and saving it. This will create the page.

If you type some text into the NavBar and hit the [Find It] button,  this will trigger a search of the text both in the names of pages and the bodies of pages. The results of both these searches will be printed to [[TheTranscript]]

If you want to run a small Clojure expression, type it in the NavBar and hit the [Run It] button. The result will, again, be printed to [[TheTranscript]] 

----
### The Copy Bar

When you switch to Edit mode in Cardigan Bay, the NavBar disappears, and is replaced by the Copy Bar. (See [[RemovingNavBarDuringEditing]] for an explanation)

The Copy Bar is a replacement for the previous Quick Paste bar. It provides a number of boilerplate "snippets" of  things you may want to add to a page, such a embed cards, search cards, workspaces or even simple Markdown and Clojure code.

These are particularly useful on mobile devices where the kinds of brackets and and obscure symbols you need particularly for Clojure are often awkward to reach on the touch keyboard. But particularly the [[CardTypes]] are also useful for anyone who needs to remember the exact format of the data-structure for a particular media embedding.

Originally this was a Quick Paste bar in which clicking the button pasted the snippet into the text at the current position of the cursor. However this was found to be confusing, as users were not always aware where the cursor was. So now the buttons copy the snippet to the clipboard, and you can then find the place in the text you want to insert it, and use standard paste.
