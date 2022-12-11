Cardigan Bay is intended to be an individual authoring tool. (Or used by a group,  using something like the git version control system to share a collection of files in common).

When you wish to make your wiki public, you export it as a flat site (ie. a collection of stand-alone html files). This is as easy as clicking the "Export All Pages" button on the main menu.

The exported files will be in the `YOURDIR/exports` directory. (For this wiki, in  `bedrock/exports`) 

You can then host them or distribute them any way you like. 

If you have changed a single page and want to re-export it without re-exporting the rest of the wiki, you can use the "Export" button alongside the "Edit" button on the page.
----
### Styling the Exported Site

Exported pages can also be styled however you like. The directory `bedrock/system/export_resources/` which is part of this default *bedrock* wiki, contains two files : index.html and main.css which are the template and css file which determine the look of the static site.

You can customize them as much as you like, noting that the template contains slots for page-title, wiki-name, page-main-content (where all the content for the page is actually placed), and page-last-modified and time (export time). 

Even the main menu of an exported site is part of this template, meaning you can remove or customize it too.

**It is STRONGLY recommended that you leave the line `<script src="https://cdn.jsdelivr.net/npm/scittle@0.1.2/dist/scittle.js" type="application/javascript"></script>` (or equivalent) in the header of your template.**

This pulls in the Scittle small ClojureScript interpreter. It's the only JS dependency in the static sites, and it is there to enable ClojureScript Workspaces and custom scripts in your wiki to also run in the exported site.

This is what allows a Cardigan Bay to be an "alive" or "magical" experience that is active rather than just passive. (See [[WorkspaceExample]] for more details.)