(ns clj-ts.patterning
  [:require

   [sci.core :as sci]


   ;; Patterning stuff
  [patterning.maths :as p-maths]
  [patterning.sshapes
   :refer [->SShape to-triangles add-style]
   :as sshapes]
  [patterning.strings :as p-strings]
  [patterning.groups :as groups :refer [over-style]]
  [patterning.layouts :refer [framed clock-rotate stack grid-layout diamond-layout
                              four-mirror four-round nested-stack checked-layout
                              half-drop-grid-layout random-turn-groups h-mirror ring
                              sshape-as-layout one-col-layout nested-stack]
   :as layouts]

   [patterning.library.std :refer [poly star nangle spiral diamond rect
                                   horizontal-line square drunk-line]
   :as std]
   [patterning.library.turtle :refer [basic-turtle] :as turtle]
   [patterning.view :refer [make-txpt make-svg] :as p-views]
   [patterning.color :refer [p-color remove-transparency rand-col darker-color] :as p-colors ]


   ])

(def patterning-ns

  {'clojure.core
   {
    ;; maths

    ;; sshapes
    '->SShape ->SShape
    'to-triangles to-triangles
    ;; strings

    ;; groups
    'over-style over-style
    ;; layouts
    'framed framed
    'clock-rotate clock-rotate
    'stack stack
    'grid-layout grid-layout
    'diamond-layout diamond-layout
    'four-mirror four-mirror
    'four-round four-round
    'nested-stack nested-stack
    'checked-layout checked-layout
    'half-drop-grid-layout half-drop-grid-layout
    'random-turn-groups random-turn-groups
    'h-mirror h-mirror 'ring ring
    'sshape-as-layout sshape-as-layout
    'one-col-layout one-col-layout
    ;; std
    'poly poly
    'star star
    'nangle nangle
    'spiral spiral
    'diamond diamond
    'rect rect
    'horizontal-line horizontal-line
    'square square
    'drunk-line drunk-line
    ;; turtle
    'basic-turtle basic-turtle
    ;; colors
    'p-color p-color
    'rand-col rand-col
    'darker-color darker-color
    'remove-transparency remove-transparency}}
)

(defn one-pattern
  "Evaluate one pattern"
  [data]
  (try
    (let [
          pattern
          (sci/eval-string
           data
           {:namespaces patterning-ns })
          svg (make-svg 500 500 pattern)

          ]

      (str
       "<div>"
       svg
       "</div>
</div>
""
 <div class='calculated-out'>
<pre>"

       data

       "</pre></div>"
       )

      )
    (catch java.lang.Exception e
      (let [sw (new java.io.StringWriter)
            pw (new java.io.PrintWriter sw) ]
        (.printStackTrace e pw)
        (println e)
        (str "<div class='calculated-out'><pre>
Exception :: " (.getMessage e) "

" (-> sw .toString) "</pre></div>"
             ) ) )))
