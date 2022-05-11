[[CardiganBay]] is intended to be used as a personal wiki tool, running on your local machine. When you want to make your work public, you export either individual pages or the whole wiki as flat HTML files (which don't need any server support) and copy them to any public-facing server you have access to.


Some pages in your wiki will contain "dynamic" data. That is, they show you things that are imported from elsewhere, or recalculated, whenever the user navigates to a page.

This includes RSS Feeds (see [[SocialEmbedding]]), Patterns (see [[PatterningExamples]]), embedded searches ([[ASearchExample]]), Clojure scripts that run on the server and some system queries.

When you export static HTML pages, all this dynamic data is recalculated, at this time, and what is written to the exported pages is normal HTML. There is no dynamic server behind an exported site.

The time this happens is called *export time*.
