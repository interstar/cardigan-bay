This is [[CardiganBay]] *0.7.0*

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