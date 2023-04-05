 This is a page for experimenting with adding markup, cards of specific types etc. to check how they work. 
 
----
:evalmd

;; Write some code.
;; Note that if the result of your executed code is a number
;; You must convert it to a string.

(str "### " (+ 1 2 3))


----
:workspace
(defn f [x y]
  (+ (* x x) (* y y))
) 

;;;;PUBLIC
(f 6 3)

----
:evalmd

;; Write some code.
;; Note that if the result of your executed code is a number
;; You must convert it to a string.

(defn f [x]
(str "Hello Teenage America : " x " + " x " = "  (+ x x))
)

(f 4)  