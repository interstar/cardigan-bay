(ns vse-cljs.core
  (:require
   #_[om.core :as om :include-macros true]
   [sablono.core :as sab :include-macros true]
   [cljs.spec :as s]
   [reagent.core :as r]
   [clojure.string :refer [includes?]]
   )

  (:require-macros
   [devcards.core :as dc :refer [defcard deftest]]))

(enable-console-print!)


(s/def ::node-id string?)
(s/def ::node-name string?)
(s/def ::x number?)
(s/def ::y number?)
(s/def ::width number?)
(s/def ::height number?)
(s/def ::node-data string?)

(s/def ::Node (s/keys :req-un [::node-id ::node-name ::x ::y ::width ::height ::node-data ::selected] ) )

(s/def ::from ::node-id)
(s/def ::to ::node-id)
(s/def ::arc-data string?)

(s/def ::Arc (s/keys :req-un [::from ::to ::arc-data]))

(s/def ::nodes (s/coll-of ::Node))
(s/def ::arcs (s/coll-of ::Arc))

(s/def ::Network (s/keys :req-un (::nodes ::arcs )))

(defn make-node [id name x y data]
  {:node-id (str id) :node-name name :x (- x 15) :y (- y 10) :width 30 :height 20 :node-data data :selected false})

(defn make-arc [n1 n2 data]
  {:from (:node-id n1) :to (:node-id n2) :arc-data data })


(defn node-rendered [node]
  {:pre [(or (s/valid? ::Node node)
             (js/console.log (str node  (s/explain ::Node node))))]}
  [:rect {:id (str (:node-id node)) :x (:x node) :y  (:y node)
          :width (:width node) :height (:height node)
          :stroke (if (:selected node) "red" "green") :stroke-width 2 :fill "yellow"}]
)

(defn node-centre [node]
  (let [w2 (/ (:width node) 2)
        h2 (/ (:height node) 2)]
    [(-> node :x (+ w2)) (-> node :y (+ h2)) ]))

(defn hit-node [[ex wy] {:keys [x y node-id node-name node-data] :as node} ]
  (cond (< ex x) false
        (> ex (+ x 30)) false
        (< wy y) false
        (> wy (+ y 30)) false
        :else true))

(defn arc-rendered [arc nodes]
  (let [find-it (fn [k] (first (filter #(= (-> arc k) (:node-id %)) nodes ) ))
        n1 (find-it :from)
        n2 (find-it :to)
        [nx1 ny1] (node-centre n1)
        [nx2 ny2] (node-centre n2)]
    [:line {:x1 nx1 :y1 ny1 :x2 nx2 :y2 ny2
            :style {:stroke "rgb(100 200 100" :stroke-width 2}}]
    )
  )


(defn canvas
  ([id w h nodes arcs] (canvas id w h nodes arcs identity identity identity))
  ([id w h nodes arcs mousedown-handler mouseup-handler mousedrag-handler]
   [:div
    [:h3 "Canvas"]
    [:div
     [:svg {:id (str id) :width (str w) :height (str h)
            :on-mouse-down mousedown-handler
            :on-mouse-up mouseup-handler
            :on-mouse-move mousedrag-handler
            }
      [:rect {:id (str "background-" id) :x 0 :y 0 :width (str w) :height (str h) :stroke-width 1 :stroke "black" :fill "white"}]
      (for [a arcs] (arc-rendered a nodes))
      (for [n nodes]
        (node-rendered n))
      ]]]))




(defcard first
  (sab/html (canvas "first" 100 100 [] []) ))

(defcard second
  (let [n1 (make-node 1 "hello" 50 50 "")
        n2 (make-node 2 "world" 120 120 "")
        n3 (make-node 3 "boo!" 200 220 "")
        a1 (make-arc n1 n2 "arc")
        c (canvas "second" 300 300 [n1 n2 n3] [a1])]

*    (sab/html [:div
               c
               [:div [:code (str c)]]] )))



(defn event-parse [e]
  (let [target (-> e .-target)
        id (-> target .-id)
        dim (-> target .getBoundingClientRect)
        left (-> dim .-left )
        top (-> dim .-top )
        x (-> e .-clientX (#(- % left)) )
        y (-> e .-clientY (#(- % top))) ]
    [id x y]))


(defcard test-hit
  (let [n1 (make-node 1 "click me" 150 150 "")]
    (sab/html [:div
               (canvas "test-hit" 300 300 [n1] []
                       (fn [e]
                         (let [[id x y] (event-parse e)]

                           (if (includes? id "background")
                             ()
                             (js/alert (str "Hit " id )))))
                       identity identity)])))


(defn split-find [p network]
  {:pre (s/valid? ::Network network)}
  (loop [nodes (:nodes network) found [] others []]
    (cond (empty? nodes) [found others]
          (p (first nodes))
          (recur (rest nodes) (first nodes) others)
          :otherwise (recur (rest nodes) found (cons (first nodes) others))
          )))

(defn split-find-by-node-id [id network]
  (split-find #(= (:node-id %) id) network ) )

(defn node-by-id [id network]
  (first  (split-find-by-node-id id network))
  )

(defn update-network [network extra]  (conj network extra))

(defn update-node-by-id [id new-data network]
  (let [[found others] (split-find-by-node-id id network)
        new-node (conj found new-data)]
    (update-network network
                    {:nodes (cons
                             new-node
                             others)})))

(defn has-selected? [network]
  (some #(-> % :selected) (:nodes network)))

(defn get-selected [network]
  (first (split-find #(= true (:selected %))  network) ))

(defn panel [selected]
  [:div
   [:h3 "Selected"]
   (if (empty? selected) [:p "None"]
       [:div
        [:div (str "Id: " (:node-id selected) )]
        [:div (str "Name: " (:node-name selected))]
        [:div (str "x,y: " (node-centre selected))]
        [:div (str "data: " (:node-data selected))]]
       )])


(defn add-arc [n1 n2 data network]
  (update-network network {:arcs (cons (make-arc n1 n2 data) (:arcs network))})
  )

(defcard third
  (defn move [network]
    (r/with-let [next-id (if (nil? (:next-id @network)) 0 (:next-id @network) )]

      (sab/html [:div
                 (let [nodes (:nodes @network)
                       arcs (:arcs @network)
                       this-id "third"
                       update! (fn [changes]
                                 (reset! network
                                         (update-network @network changes)))


                       mouse-down
                       (fn [e]
                         (let [[id x y] (event-parse e)]

                           (if (includes? id "background") ;; hit the background
                             (update! {:nodes
                                       (cons
                                        (make-node
                                         (str this-id "--" next-id)
                                         (str "Node " next-id) x y "" )
                                        (:nodes @network))
                                       :next-id (+ 1 next-id)})

                             ;; alternatively we hit a node,
                             (if (not (has-selected? @network))
                               ;; nothing is already selected so we select this node
                               (let [new-network (update-node-by-id
                                                  id
                                                  {:selected true}
                                                  @network)]
                                 (reset! network new-network))

                               ;; something is already selected, is it the same thing?
                               (let [current (get-selected @network)]

                                 (if (= (:node-id current) id)
                                   ;; it ID the previously selected node, so we're going to unselect
                                   (let [new-network (update-node-by-id
                                                      id
                                                      {:selected false}
                                                      @network)]
                                     (reset! network new-network))
                                   ;; it's a different node so we make an arc
                                   (let [n1 (get-selected @network)
                                         n2 (node-by-id id @network)]
                                     (js/console.log (str "making arc " n1 "   " n2))
                                     (js/console.log (str (:arcs @network)))
                                     (js/console.log (str n1 " //// " n2))
                                     (reset! network (add-arc n1 n2 "a new arc" @network)
                                             )) ) )))))

                       mouse-drag
                       (fn [e]
                         (let [[id x y] (event-parse e)]
                           (if (> (-> e .-buttons) 0)
                             (if (has-selected? @network)
                               (reset! network (update-node-by-id
                                                (:node-id  (get-selected @network))
                                                {:x x :y y}
                                                @network))
                               ))))

                       ]
                   (canvas this-id 500 300 (:nodes @network)
                         (:arcs @network) mouse-down identity mouse-drag
                         ))
                 (panel (get-selected @network))
                 ]))))


;;=====================================================================================

(defcard
  "# Contas

Exemplo de interatividade em React (com Reagent)
"
(defn contas-component [orc]
    (r/with-let [som (reduce + @orc)
                 entrada (r/atom 0)]

    (sab/html
      [:div
       [:table [:tbody
                [:tr [:th "Receitas"] [:th "Gastas"]]
                (for [item @orc ]
                  (if (< 0 item)
                    [:tr [:td item] [:td]]
                    [:tr [:td] [:td [:span {:style {:color "red"} } (- 0 item)]] ])) ]]
       [:div "Som : " som]
       [:div
        [:input {:type "text"
                 :value @entrada
                 :on-change #(reset! entrada (-> % .-target .-value (* 1) ))
                 }]

        [:button {:on-click #(reset! orc (cons @entrada @orc))} "Adicionar"]

        ]

       ] ))))


(defn main []
  ;; conditionally start the app based on whether the #main-app-area
  ;; node is on the page
  (if-let [node (.getElementById js/document "main-app-area")]
    (.render js/ReactDOM (sab/html [:div "This is working"]) node)))

(main)

;; remember to run lein figwheel and then browse to
;; http://localhost:3449/cards.html
