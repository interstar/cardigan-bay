[[CardiganBay]] now includes the [Patterning](https://github.com/interstar/Patterning-Core) library for making patterns.

Use card type :patterning to make a card which contains patterns.
 
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
