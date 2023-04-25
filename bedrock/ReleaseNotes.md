
This is [[CardiganBay]] *0.8.0*

# Release 0.8.0 Notes

A lot of big changes, and some fixes.

### Breaking Changes

There's been a change to the way we pass parameters to Cardigan Bay when starting up.

* Command line arguments still work ... BUT 
* You are now encouraged to keep most of your configurations in a file called `<page-directory>/system/config.edn`

When Cardigan Bay starts it will start by reading the command line arguments. But then read the config.edn file. 

*The parameters defined in config.edn will take precedence over those defined on the command line.*

**Astute observers will note that the one parameter which can NOT be given in the config.edn file is the :directory ... as Cardigan Bay needs to know the directory *before* it can find the config.edn file**

I've dithered about this for a while, but of all the options I considered, this seems the least confusing in practice. Basically either run Cardigan Bay with the default bedrock directory under the place where the code sits. Or, pass the -d flag on the command line as you have currently been doing, to point it at a different page directory. All the other parameters can now be kept within that page directory, in system/config.edn

### Non-breaking Changes

**Card level editing**. This is the BIG ONE anyone who has used CB will have been waiting for. You can now edit an individual card. It's not particularly pretty yet (though hopefully it will get prettier soon), but now, when you open up the card bar at the bottom of a card, there's another edit-box with just the source of that particular card. So you can now do more focused editing.

Note, that while this is very useful, particularly on longer pages, it will **never** replace the one-big-text-box philosophy of Cardigan Bay. There will *always* be a canonical single text file view of a page.

**Workspace Saving**. This is also a big deal. As the server now has the ability to accept individual card updates, it means that the Workspace finally gets a [Save] button. So as you are working on code interactively in the workspace, you can hit the save button to store it. No need to copy and paste it into the page level editor.

**Network Cards**. These are still an *experimental* feature. But it's always been the intention for Cardigan Bay to support a type of card which is a hand-drawn network diagram of boxes and arrows. Each node is, itself, a link to a page. So you can make graphical overviews of topics that are then covered on their own pages. There's currently no graphical editor for this card type. But this version of CB does at least now have a reasonable looking rendering. (The graphical editor is being worked on, but not yet enabled)

**Media Directory Cards**. CB already has the `<page-directory>/media/`  as a place to store your media files. There is now a  :system command for listing the media directory. And an extra card type for linking to a media file.
----
# Release 0.7.4 Notes

Cardigan Bay now officially does Transclusion of cards from one page to another. 

See [[TransclusionExample]] for how it's done.

A version of transclusion existed in Cardigan Bay before, but it was buggy to the extent of risking damage to your data. And not officially supported.

As of 0.7.4 those bugs are fixed. There is now a transclusion card type which causes a number of cards to be pulled from another page into this page. You can reorder and move cards containing transclusions. And the hash displayed on the Card Bar now doubles up as a button which copies the boilerplate for transcluding the card, to the clipboard.

I've fixed the bug that internal links in captions of embedded videos and similar cards weren't working when the page was exported. This is now fine.

Internally there's been some important code changes. Namely a revision and cleaning up of the processing / rendering code (in order to fix this). The hash-identity of a card is now far more robust. Previously automated moving / resequencing of cards risked adding extra blank lines to them, leading to them receiving different hash values.
----
# Release 0.7.3 Notes

There's been a considerable overhaul of the look Cardigan Bay, with improved CSS, some changes to hopefully make the UI a lot more friendly and intelligible to new users.

Patterning support has been enhanced (including adding l-systems etc.)

The Export All link on the main menu has been replaced by an Export Recent Pages link. This exports only the pages listed on RecentChanges. So rather than re-exporting the whole wiki after making a few changes, you can now just re-export what's changed.

The "Quick Paste" bar in the editor has been replaced by a "Copy Bar". When you press the buttons, instead of the snippet being inserted into the edit box directly, it's now copied to the clipboard. It was decided that it's more logical to select a snippet and then find where to insert it (using normal browser paste) than position the cursor first and then press the button. The copy bar is also in several pages. Page 0 is things useful for convenient text editing, especially on mobile (eg quick paste of pairs of double square brackets etc.) The second page has the embedded media types. And the third page useful snippets of Clojure.

More documentation in bedrock.
----
# Release 0.7.2 Notes

Blank cards are now stripped from exported pages.

Navigating to new pages automatically scrolls to the top of the page

Browser's native JS libraries (eg. js/Math etc.) are now accessible from Workspaces in live versions of Cardigan Bay AND exported flat pages.
----
# Release 0.7.1 Notes

Now added private / public separation for Workspaces.
----
# Release *0.7.0*

### Breaking Changes

index.html template for exporter, and main.css should now be placed in system/export_resources/ (where "system" is the system directory)

If you started with a previous version of Cardigan Bay and customized your index.html template and main.css for exporting, make sure you have copied both into system/export_resources/

If you want to be able to export functioning :workspaces then make sure you have added the Scittle dependency in the latest index.html template to your custom template.


### Non-breaking Changes

Reordering cards no longer reloads page.

Moving cards from one page to another no longer reloads page, and therefore preserves back button behaviour

Bug with quote marks in search terms now fixed

Text search now returns number of results

Now added a :patterning card type with code from Patterning library. (See the [[PatterningExamples]] page for more information)

Now added Scittle (https://github.com/babashka/scittle) as a dependency of our exported pages. This means :workspace code now runs in our exports. (See [[WorkspaceExample]] page for more details)