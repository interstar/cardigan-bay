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

----
:patterning

(let
 [orange (p-color 254 129 64)]
 (stack
  (square {:fill (p-color 50 80 100)})
  (checked-layout
   18
   (cycle
    [(clock-rotate
      8
      (drunk-line 10 0.1 {:stroke orange, :stroke-weight 1}))
     (clock-rotate
      5
      (drunk-line 10 0.1 {:stroke orange, :stroke-weight 2}))])
   (random-turn-groups
    (repeat
     [(->SShape
       {:fill (p-color 230 180 90), :stroke orange}
       [[-1 -1] [1 -1] [-1 1]])])))))

----
:patterning

(defn a-round
  [n style]
  (clock-rotate
     n (poly 0 0.5 0.4 n style)))

(->
 (let
  [lc (p-color 220 140 180) fc (p-color 255 190 200 100)]
  (grid-layout
   4 
   (iterate (partial scale 0.9) (a-round 9 {:stroke lc :fill fc})
   )
  )
 )
 h-reflect
)
