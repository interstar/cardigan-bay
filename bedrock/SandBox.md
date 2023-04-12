Yes we can!!!!!
----
This is a page for experimenting with adding markup, cards of specific types etc. to check how they work.
----
:evalmd

(str "### " (+ 1 2 3 4 5))
----
:workspace

(defn f [x y]
  (+ (* x x) (* y y))
) 

;;;;PUBLIC
(f 2 3)
----
:system

{:command :search
 :query ":network"
}
----
:evalmd

(defn f [x]
(str "Hello Teenage America : " x " + " x " = "  (+ x x))
)

(f 7)
----
:system

{:command :search
 :query "Hello"
}
----
:system

{:command :allpages}