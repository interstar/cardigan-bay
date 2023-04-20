(ns clj-ts.networks
  (:require
   [reagent.core :as r]
   [reagent.dom :as dom]))

;;;;;;;;;;;;;;;;;;; NETWORK DIAGRAM


(defn node [id label x y]
  {:id id :label label :x x :y y :width 0 :height 0})

(defn arc [n1 n2]
  {:n1 n1 :n2 n2})

(defn network []
  {:nodes [] :arcs [] :nid 0 :aid 0 :selected-node -1 :last-selected-node -1 :editing-node -1})


(defn add-node [net x y ctx]
  (let [id (:nid net)
        label (str "  " id "  ")
        node (node id label x y)
        text-width (.measureText ctx label)
        padding 10
        width (+ (.-width text-width) (* 2 padding))
        height 40
        new-node (assoc node :width width :height height)]
    (-> net
        (update :nodes conj new-node)
        (update :nid inc))))


(defn add-arc [net nid1 nid2]
  (js/console.log "ADD ARC " nid1 nid2 net)
  (update net :arcs conj (arc nid1 nid2)))

(defn hit [node x y]
  (let [half-width (/ (:width node) 2)
        half-height (/ (:height node) 2)
        x1 (- (:x node) half-width)
        y1 (- (:y node) half-height)
        x2 (+ (:x node) half-width)
        y2 (+ (:y node) half-height)]
    (js/console.log "In HIT detection " (and (<= x1 x x2)  (<= y1 y y2)) )
    (and (<= x1 x x2)
         (<= y1 y y2))))




(defn move-node [node x y]
  (assoc node :x x :y y))

(defn set-label [node label]
  (assoc node :label label))

(defn find-node [net id]
  (first (filter #(= (:id %) id) (:nodes net))))

(declare delete-arc)

(defn delete-node [net id]
  (let [filtered-nodes (filter #(not= (:id %) id) (:nodes net))
        filtered-arcs (filter #(not (or (= (:n1 %) id) (= (:n2 %) id))) (:arcs net))]
    (assoc net :nodes filtered-nodes
                :arcs filtered-arcs)))



(defn draw-node [ctx node selected? editing?]
  (let [x (:x node)
        y (:y node)
        label (:label node)
        font-size 20 ; Change font size here
        font-family "Arial"
        font-setting (str font-size "px " font-family)
        _ (set! (.-font ctx) font-setting) ; Set the new font size
        text-width (.measureText ctx label)
        padding 10
        width (+ (.-width text-width) (* 2 padding))
        height 40
        half-width (/ width 2)
        half-height (/ height 2)]
    (set! (.-strokeStyle ctx) (if selected? "red" "blue"))
    (set! (.-lineWidth ctx) 2)
    (.beginPath ctx)
    (.rect ctx (- x half-width) (- y half-height) width height)
    (set! (.-fillStyle ctx) (if editing? "black" "white"))
    (.fill ctx) ; Fill the node's background with color
    (.stroke ctx)
    (set! (.-fillStyle ctx) (if editing? "white" "black")) ; Switch the fillStyle for drawing the text
    (.fillText ctx label (- x half-width) (+ y (- half-height (/ font-size 2)))))) ; Adjust Y position




(defn draw-arc [ctx arc net]
  (let [n1 (find-node net (:n1 arc))
        n2 (find-node net (:n2 arc))]
    (set! (.-strokeStyle ctx) "#1E1E1E")
    (set! (.-lineWidth ctx) 1)
    (.beginPath ctx)
    (.moveTo ctx (:x n1) (:y n1))
    (.lineTo ctx (:x n2) (:y n2))
    (.stroke ctx)))

(defn draw-network [ctx net]
  (doseq [arc (:arcs net)] (draw-arc ctx arc net))
  (doseq [node (:nodes net)] (draw-node ctx node (= (:id node) (:last-selected-node net)) (= (:id node) (:editing-node net)))))


(defn handle-mouse-up [net ctx x y]
  (let [selected-node-id (:selected-node net)
        hit-node-id (->> (:nodes net)
                         (filter #(hit % x y))
                         (map :id)
                         first)]
    (cond
      (= selected-node-id -1) ; If no node was selected initially, create a new node
      (add-node net x y ctx)
      (and hit-node-id (not= selected-node-id hit-node-id)) ; If dragging from one node to another, create an arc
      (add-arc net selected-node-id hit-node-id)
      (and selected-node-id (not hit-node-id)) ; If moving the node
      (assoc net :selected-node -1
             :nodes (map #(if (= (:id %) selected-node-id)
                            (move-node % x y)
                            %)
                          (:nodes net)))
      :else ; If clicking on a node without moving it, start editing the node
      (assoc net :editing-node selected-node-id))))



(defn handle-mouse-down [net ctx x y]
  (let [selected-node-id (->> (:nodes net)
                               (filter #(hit % x y))
                               (map :id)
                               first)
        editing-node-id (:editing-node net)]
    (cond
      (and editing-node-id (= editing-node-id selected-node-id)) ; If clicking on the editing node, do nothing
      net
      :else ; If clicking on another node or outside, stop editing and select the new node
      (assoc net :selected-node (or selected-node-id -1)
             :editing-node -1))))



(defn on-input-change [net e node-id ctx]
  (let [new-label (.-value (.-target e))
        updated-nodes (map #(if (= (:id %) node-id)
                              (let [text-width (.measureText ctx new-label)
                                    padding 10
                                    width (+ (.-width text-width) (* 2 padding))
                                    height 40]
                                (-> %
                                    (set-label new-label)
                                    (assoc :width width :height height)))
                              %)
                            (:nodes net))]
    (assoc net :nodes updated-nodes)))


(defn node->edn [node]
  [(str (:id node)) (:label node) (:x node) (:y node)])

(defn arc->edn [arc]
  [(str (:n1 arc)) (str (:n2 arc))])


(defn to-edn [net] {:nodes (map node->edn (:nodes net)) :arcs (map arc->edn (:arcs net))})


(defn get-x-y [e canvas]
  (let [rect (.getBoundingClientRect canvas)
        x (- (.-clientX e) (.-left rect))
        y (- (.-clientY e) (.-top rect))]
    (js/console.log x "," y)
    [x y]))





;; Update the node-editor component
(defn node-editor [net-ref editing-node ctx]
  [:div {:style {:display "flex"
                 :flex-direction "column"
                 :align-items "center"
                 :justify-content "center"
                 :position "absolute"
                 :top 0 :left 0
                 :width "500px" :height "500px"
                 :zIndex 1
                 :background-color "rgba(0, 0, 0, 0.5)"}}
   [:input {:type "text"
            :value (:label editing-node)
            :style {:width "150px"} ; Set the input width to 150px
            :onBlur #(swap! net-ref assoc :editing-node -1)
            :onChange #(swap! net-ref on-input-change % (:id editing-node) ctx)
            :onKeyDown #(when (= (.-key %) "Enter")
                          (do
                            (.preventDefault %)
                            (.blur (.-target %))))}]
   [:div {:style {:display "flex" :justify-content "space-between" :width "100%" :margin-top "10px"}}
    [:button {:onClick #(swap! net-ref delete-node (:id editing-node))}
     "Delete"]
    [:button {:onClick #(swap! net-ref assoc :editing-node -1)}
     "Cancel"]]])

;; Update the network-canvas component to pass the context to the node-editor component
(defn network-canvas []
  (let [canvas-id (str (gensym "network-canvas-"))
        net-ref (r/atom (network))]
    (fn []
      (let [net @net-ref
            editing-node-id (:editing-node net)
            editing-node (when (not= editing-node-id -1)
                           (find-node net editing-node-id))]
        [:div {:style {:position "relative"}}
         [:canvas
          {:id canvas-id
           :width 500
           :height 500
           :style {:border "1px solid black"}
           :onMouseDown #(let [canvas (js/document.getElementById canvas-id)
                               ctx (.getContext canvas "2d")
                               [x y] (get-x-y % canvas)]
                           (swap! net-ref handle-mouse-down ctx x y))
           :onMouseUp #(let [canvas (js/document.getElementById canvas-id)
                             ctx (.getContext canvas "2d")
                             [x y] (get-x-y % canvas)]
                         (swap! net-ref handle-mouse-up ctx x y))}]
         (r/after-render
          (fn []
            (when-let [canvas (js/document.getElementById canvas-id)]
              (let [ctx (.getContext canvas "2d")]
                (.clearRect ctx 0 0 500 500)
                (draw-network ctx net)))))
         (when editing-node
           [node-editor net-ref editing-node (-> (js/document.getElementById canvas-id)
                                                 (.getContext "2d"))]) ; Pass the context to node-editor
         [:pre {:style {:white-space "pre-wrap"}} (to-edn net)]]))))




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
