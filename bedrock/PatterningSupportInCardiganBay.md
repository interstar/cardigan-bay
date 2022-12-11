The Clojure [Patterning library](https://github.com/interstar/Patterning-Core) is incorporated into Cardigan Bay so that patterns can be added to pages. 

Patterning has its own documentation / tutorial site at : <http://alchemyislands.com/tutorials/HelloWorld.html> which is, itself, a site made with CardiganBay. So everything you see there should also work here in this wiki.

Though because Patterning is still work in progress the API / function names might well change.
 
----
## Patterning Overview


A basic pattern (also known as a "group") is made from SShapes. 

SShape stands for "styled shape" and is effectively the equivalent of a *path* in something like SVG. It consists of a style information in a Clojure *map*, plus a Clojure vector of points.

You make an SShape with something like

    (->SShape {:stroke (p-color 255 0 0) :stroke-weight 2 
               :fill (p-color 200 100 100 100)}
       [[-1 1] [1 1] [0 -1] [-1 1]]
    )

The first argument is the style map. The second is the vector of points

This is NOT a "pattern" in patterning yet. To make it a pattern, you need to put it into a group, which is just another Clojure vector. So by putting [ ] around it, like so.

    [(->SShape {:stroke (p-color 255 0 0) :stroke-weight 2 
                :fill (p-color 200 100 100 100)}
       [[-1 1] [1 1] [0 -1] [-1 1]]
    )]

or with the *group* function.

    (group (->SShape {:stroke (p-color 255 0 0) :stroke-weight 2 
                :fill (p-color 200 100 100 100)}
       [[-1 1] [1 1] [0 -1] [-1 1]]
    ))

In the following card, you can see this primitive pattern.
----
:patterning

(group (->SShape {:stroke (p-color 255 0 0) :stroke-weight 2 :fill (p-color 200 100 100 100)}
       [[-1 1] [1 1] [0 -1] [-1 1]]
    ))

----

### Working with Patterns

A group or pattern, then, is a vector that can contain a number of such SShapes.

The rest of the patterning library consists of functions that transform groups / patterns; and functions that compose and combine patterns to make more complex ones. 

#### On Coordinates

It's important to understand that Patterning is written as "*scale independent*". In other words, you think of a pattern being defined in a virtual co-ordinate system between the coordinates (-1,-1) and (1,1).

Patterns are assumed to be drawn within this space, and be roughly bounded by a 2X2 box starting at (-1,-1). You can, if you like, draw outside this box, but many functions will assume that your pattern fits within it, and when they combine patterns into larger layouts such as grids, patterns that leak outside of this box may well overlap with others or even get clipped.

The `(reframe p)` function scales your pattern back into this box if you have drawn it too large. This turns out to be very useful as your algorithms become more complex.

#### Transforming Patterns

Patterning comes with standard functions for scaling, rotating and translating patterns. And for stretching them (independent scaling in the x and y axes), reflecting and mirroring them.

There are a couple of more unusual functions.

`(wobble [qx qy] pattern)`

adds a certain amount of noise (up to qx and qy) to the coordinates of each point in a pattern.

`(over-style new-style pattern)`

allows certain attributes of a style to be over-written (in a non-mutable way, of course) with those from new-style.

*Note that we can use Clojure's threading macros. But that we must use thread-last (ie. ->>) because a pattern is always the *last* argument to the functions that transform it.*

----
:patterning

(->> 

    (group (->SShape {:stroke (p-color 255 0 0) :stroke-weight 2 
                      :fill (p-color 200 100 100 100)}
       [[-1 1] [1 1] [0 -1] [-1 1]]
    ))
       
    (over-style {:fill (p-color 200 150 255)} )
    (wobble [0.2 0.2])

    (scale 0.5)
        
)



----



#### Combining Patterns

Patterns are combined with functions called *layouts*. A layout takes one or more patterns + some other arguments, and returns another pattern.


The simplest way to combine patterns is to simply superimpose them on top of each other.

This is what the `stack` function does.

    (stack p1 p2 p3)

composes the three patterns.

Another common thing to do is to make a grid layout. However grids, like many of the "layout engines" are slightly more powerful and complex. They don't take a single pattern, but instead a sequence of patterns, and then place each item from the sequence at one square in the grid.

For this reason, you must pass grid-layout a collection or even infinite sequence of patterns to be laid out in the grid.

----
:patterning

(->> 

    (group (->SShape {:stroke (p-color 255 0 0) 
                      :fill (p-color 255 240 200)}
       [[-1 1] [1 -1] [1 1] [-1 1]]
    ))
    repeat    
    (grid-layout 5)
)

----
A couple of things to notice. 

One is that grid-layout resized everything so that the output fits back within the same 2x2 virtual coordinate space as the original triangle. This is the standard behaviour for layouts. As your patterns become more complex and "bigger" the final output stays the same size and the elements within your patterns become smaller.

The second thing is that we used `repeat` as a convenient way to turn our pattern into a stream of patterns for the grid, which allowed us to continue using the thread-last macro. Unfortunately once we're using more complex layouts we might have to revert to a more standard way of invoking functions.

For example, we can use the fact we are sending a sequence to the layout with Clojure's `cycle` function, to produce a chequerboard pattern.

----
:patterning

(def black-square [(->SShape {:fill (p-color 0 0 0)} 
                             [[-1 -1] [1 -1] [1 1] [-1 1] [-1 -1]]
                   )]
)

(def white-square (over-style {:fill (p-color 255 255 255)} black-square))

(grid-layout 9 (cycle [black-square white-square]))
 
----

The previous example, unfortunately, is a bit of a kludge. Note that it's making a 9x9 grid. It won't work for an even-sized grid because in even-sized grids, having filled the first column, the next square, at the top of the second column is the same colour as your initial one.

Fortunately we have the `checked-layout` which takes two distinct streams and alternates them in a chequered pattern.

----
:patterning


(def black-square [(->SShape {:fill (p-color 0 0 0)} 
                             [[-1 -1] [1 -1] [1 1] [-1 1] [-1 -1]]
                   )]
)

(def white-square (over-style {:fill (p-color 255 255 255)} black-square))

(checked-layout 8 (repeat black-square) (repeat white-square))
----
A layout function might do more than just make small copies of the original pattern though. They can make tranformations, as in the `four-mirror`

----
:patterning 
(->> 

    (group (->SShape {:stroke (p-color 255 0 0) 
                      :fill (p-color 255 240 200)}
       [[-1 1] [1 -1] [1 1] [-1 1]]
    ))
    (scale 0.6)
    four-mirror
)

----

And even more sophisticated layouts such as the `framed` layout that takes three pattern / pattern sequences, uses one for the corners of a frame, one for the edges, and makes one large inner pattern.

----
:patterning

(def yellow-red {:stroke (p-color 255 0 0) 
                :fill (p-color 255 240 200)}) 

(def corner 
   (->>
    [(->SShape yellow-red
         [[-1 1] [1 -1] [-1 -1] [-1 1]])]
    (scale 0.8))
)



(defn knot []
   (rotate (/ PI 2)
     (stack
       [(->SShape yellow-red [[-1 0.6] [-0.4 0.6] [0.4 -0.6] [1 -0.6]])]
       [(->SShape yellow-red [[-1 -0.6] [-0.4 -0.6] [0.4 0.6] [1 0.6]])]
       (poly 1 0 0.3 8 yellow-red)
     )
   )
)


 

(defn a-round
  [n style]
  (clock-rotate
     n (poly 0 0.5 0.4 n style)))


(def inner
(->
 (let
  [lc (p-color  140 180 220) fc (p-color 190 200 255 100)]
  (grid-layout
   4 
   (iterate (partial scale 0.9) (a-round 9 {:stroke lc :fill fc})
   )
  )
 )
 v-reflect
)
)


(framed 14
    (repeat corner )
    (repeat (knot))
    (scale 0.95
      inner
    )
  )

----

The following card contains a test pattern. If it throws an error you are on an older version of Cardigan Bay. If it's working, then this version has both l-systems and the turtle.

----
:patterning

(def engrave {:stroke-weight 1 :stroke (p-color 0 0 0)})

(defn plant [d s]
(scale 0.8 (reframe
(let
 [grow (l-system [["F" s]])]
 (basic-turtle
  [0 1]
  0.2 
  (/ PI -2) 
  (/ PI d) 
  (grow 3 "F") 
  {} 
  engrave))
))
)

(def plants
  (map plant 
      (cycle (range 3 9)) 
      (iterate 
       (fn [_] 
          (rand-nth ["F[+F]F[-F][FF]"  
                     "F[-F]F[+F][F-F]"
                     "F[-F+F]+FF" ] )) 
       "F[-F+F]+FF" )
 )
)


(def triangle
  (stack
    [(->SShape engrave [[-1 1] [1 -1]])]
    (take 4
      (nested-stack 
        (repeat engrave)
        [(->SShape engrave
           [ [-1 1] [-1 -1] [1 -1] ] )]
        #(- % 0.2)
      )
    )
  )
) 

(defn crdl [_ ]
  (clock-rotate (rand-nth [0 0 5 8 11])
    (drunk-line 10 0.1 engrave ))) 

(defn inner [n]
  (stack
    (square engrave)
    (checked-layout
       n
       plants
       (random-turn-groups
         (repeat triangle))
    )
  )
)



(defn knot []
   (rotate (/ PI 2)
     (stack
       [(->SShape engrave [[-1 0.6] [-0.4 0.6] [0.4 -0.6] [1 -0.6]])]
       [(->SShape engrave [[-1 -0.6] [-0.4 -0.6] [0.4 0.6] [1 0.6]])]
       (poly 1 0 0.3 8 engrave)
     )
   )
)

(stack
  (rect -1 -1 2 2)
  (framed 14
    (repeat [])
    (repeat (knot))
    (scale 0.95
      (inner 9)
    )
  )
)

----
As of the current release, Cardigan Bay currently supports the following patterning functions:


maths

* PI
* sin
* cos
* half-PI

sshapes

* ->SShape
* to-triangles

strings

groups (aka "patterns")

* group
* over-style
* scale
* translate
* translate-to
* h-reflect
* v-reflect
* stretch
* rotate
* wobble
* reframe

layouts

* framed
* clock-rotate
* stack
* grid-layout
* diamond-layout
* four-mirror
* four-round
* nested-stack
* checked-layout
* half-drop-grid-layout
* random-turn-groups
* h-mirror  ring
* sshape-as-layout
* one-col-layout

std

* poly
* star
* nangle
* spiral
* diamond
* rect
* horizontal-line
* square
* drunk-line

turtle

* basic-turtle

L-Systems

* l-system

colors

* p-color
* rand-col
* darker-color
* remove-transparency

