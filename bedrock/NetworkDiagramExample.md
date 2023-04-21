Here in [[CardiganBay]] we believe in hand-drawn network diagrams more than automatically calculated diagrams.

This page contains an example of a :network card.

*Note, this is still work in progress.  And may not be the final version of the data to define a network. Play with simple diagrams and see how useful they are. But note the format and drawing may well change in the future*

Current format is an EDN structure that defines :nodes as a list of 4 element vectors : [id pagename x y]

And :arcs as a list of connections between page ids: [id1 id2]

To re-iterate. Play with this if you like. Don't rely on it not to change.

See next card source for this example.

----
:network

{:nodes [
[1 "HelloWorld" 180 60]
[2 "CardiganBay" 100 200]
[3 "GettingStarted" 340 250]
[4 "CodeExamples" 200 400]
]
 :arcs [
[1 3]
[1 2]
[3 4]
]}
