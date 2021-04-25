Here in [[CardiganBay]] we believe in hand-drawn network diagrams more than automatically calculated diagrams.

This page contains an example of a :network card.

**This is not the final version of the data to define a network. This is just work in progress, as a way to play with simple diagrams and see how useful they are. DO NOT RELY ON THIS FORMAT NOT TO CHANGE**

Current format is an EDN structure that defines :nodes as a list of 3 element triples : pagename, x, y

And :arcs as a list of connections between page-names

To re-iterate. Play with this if you like. Don't rely on it not to change.

See next card source for this example.

----
:network


{:nodes [
["HelloWorld" 180 60]
["CardiganBay" 100 250]
["GettingStarted" 340 300]
["EvalExamples" 200 340]
]
 :arcs [
["HelloWorld" "GettingStarted"]
["HelloWorld" "CardiganBay"]
]}
