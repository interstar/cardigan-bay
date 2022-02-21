[[CardiganBay]], the software behind this wiki now supports a card type of basic [[Patterning]] patterns.

The following cards, of type :patterning, can be used to make patterns. Note that the embedded SVG in these cards was generated from Patterning at [[ExportTime]]
 

You can learn more about Patterning here : <http://alchemyislands.com/bs/assets/patterning/tutorial_site/index.html#!/tutorial.fp>

And by looking at the following examples.
 
----
:patterning

(let [a-round
        (fn [n lc fc]
          (clock-rotate
           n (poly
              0 0.5 0.2 n
              {:stroke lc
               :fill fc
               :stroke-weight 2})))        
        ]
(grid-layout 4
  (repeat
    (a-round 5  (p-color 220 140 180) (p-color 190 255 200 100) )
  ))
)

----
:patterning

(defn a-round
  [n style]
  (clock-rotate
     n (poly 0 0.5 0.2 n style)))

(half-drop-grid-layout 4
(cycle [
 (a-round 6 {:stroke (p-color 140 220 180) 
             :fill (p-color 190 255 200 100) 
             :stroke-weight 2}
 )
 (a-round 9 {:fill (p-color 220 180 140 ) 
             :stroke (p-color 190 255 200 100) 
             :stroke-weight 2}
 )]))

----
:patterning

(defn rand-col [] (p-color (rand-int 255) (rand-int 255) (rand-int 255) ))

(defn a-round
  [n style]
  (clock-rotate
     n (poly 0 0.5 0.2 n style)))

(let
 [rand-color
  (fn [p]
   (let
    [c (rand-col)]
    (over-style
     {:fill c, :stroke-weight 2, :stroke (darker-color c)}
     p)))]
 (grid-layout
  8 
  (map rand-color (map #(a-round % {}) (cycle [3 4 5 6 7])))))

----
:patterning

(let
 [corner
  (stack
   (square {:fill (p-color 255 0 0 100)})
   (poly 0 0 0.9 4 {:fill (p-color 240 100 240)}))
  edge
  (stack
   (square {:fill (p-color 0 0 255)})
   (poly 0 0 0.5 8 {:fill (p-color 150 150 255)}))
  centre
  (poly 0 0 0.9 30 {:fill (p-color 150 255 140)})]
 (framed 11 (repeat corner) (repeat edge) centre))