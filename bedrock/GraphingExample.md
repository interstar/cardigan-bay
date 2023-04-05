This workspace is an example of a simple "graphing calculator" built using the Clojure facilities here.

You should note that Cardigan Bay has no specific graphing functions built in. We're not using an existing framework. Instead, this small code example implements its own drawing facilities using SVG. 

The function graphit takes three arguments : an input space (the dimensions of the space containing your data), the output space, or the dimensions of image to produce, and a list of points. It returns a chunk of SVG which is the visualization of those points.

It's a very crude example, but you should be able to see how it works. And how you could extend it to improve the visualization or embed other mathematical models in you Cardigan Bay.

Try changing the function `f` to visualize different mathematical functions. You can use Javascript's maths library in your f, as in  `(defn f [x] (js/Math.sin x))`

----
:workspace
 
(defn pair-to [k v] 
     (str (name k) "=\"" v "\"")
)

(defn args [args] 
  (apply str (map #(pair-to (first %) (second %)) args))
)

(defn tag 
  ([t s] (tag t {} s))
  ([t c s] (str "<" t " " (args c) ">" s "</" t ">"))
)

(def svg (partial tag "svg"))

;; (circle cx="" cy="" r="" fill="")
(def circle (partial tag "circle")) 

(defn polyline [points]
   (let [pts (apply str   (map #(str (first %) "," (second %) " ") points))]
     (tag "polyline" 
           {:style "stroke:green;stroke-width:1;fill:none"
            :points pts}
     "")
   )
)

(defn tx
  "transform a scalar from one space to another. o1 is origin min, o2 is origin max, t1 is target min, t2 is target max"
  [o1 o2 t1 t2 x]
  (+ (* (float (/ (- x o1) (- o2 o1))) (- t2 t1)) t1) )

(defn space [lo-x hi-x lo-y hi-y]
   {:lo-x lo-x :hi-x hi-x :lo-y lo-y :hi-y hi-y}
)


(defn scale-point [from-space to-space p]
   [
     (tx (:lo-x from-space) (:hi-x from-space) 
          (:lo-x to-space) (:hi-x to-space) (first p))
     (tx (:lo-y from-space) (:hi-y from-space)
          (:lo-y to-space) (:hi-y to-space) (second p))
   ]
)
 
(defn scale-points [from-space to-space pts]
   (map #(scale-point from-space to-space %) pts)
)

(defn graphit [from-space to-space points]   
    (svg {:width (:hi-x to-space) :height (:hi-y to-space)} 
       (polyline (scale-points from-space to-space points)))
)


(defn make-pts [xmin xmax step f] 
   (let [xs (range xmin xmax step)
         ys (map f xs)]
        (map vector xs ys) 
   ) 
) 

(defn input-space [pts] 
   (let [xs (map first pts)
         ys (map second pts)]
      (space (apply min xs) (apply max xs) (apply max ys) (apply min ys))
   )
)
 
(defn f [x] (* x x))

(def pts (make-pts 0 100 1 f))

(graphit 
   (input-space pts)
   (space 0 500 0 300)
   pts)