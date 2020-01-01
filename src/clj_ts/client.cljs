(ns clj-ts.client
  (:require
            [reagent.core :as r]
            [clojure.string :refer [lower-case replace]]
            [cljs.core.async :refer [<! timeout]]
            [cljs.reader :refer [read-string]])
  (:import goog.net.XhrIo)
  (:require-macros [cljs.core.async.macros :refer [go]]))



;; State
(defonce db (r/atom
              {:current-page ""
               :current-data ""
               :edited-data ""
               :cards ""
               :editing false
               :past ["HelloWorld"]
               :future []}))


;; PageStore

(declare double-bracket-links)

(defn load-page! [page-name update-fn]
  (let [lcpn (lower-case page-name)]
    (.send XhrIo
           (str "/clj_ts/view?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)
                   page (-> data
                            double-bracket-links)]
               (update-fn page-name page)
               ))

           "GET")
    (.send XhrIo
           (str "/clj_ts/raw?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)]
               (swap! db assoc
                      :edited-data data)
               (js/console.log @db)))

           "GET")
    (.send XhrIo
           (str "/clj_ts/cards?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)]
               (swap! db assoc
                      :cards (read-string (str "[" data "]")))
               (js/console.log @db)
               (js/alert data)
               (js/alert (-> @db :cards str))))

           "GET")) )

(defn generate-form-data [params]
  (let [form-data (js/FormData.)]
    (doseq [[k v] params]
      (.append form-data (name k) v))
    form-data))

(declare reload!)

(defn save-page! []
  (let [page-name (-> @db :current-page)
        new-data (-> js/document
                     (.getElementById "edit-field")
                     .-value)
        form-data (generate-form-data
                    {"page" page-name
                     "data" new-data})]
    (.send XhrIo
      "/clj_ts/save"
      (fn [e]
        (go
          (<! (timeout 1000))
          (reload!)
          (r/force-update-all)))
      "POST"
      (pr-str {:page page-name
               :data new-data}))))



;; Nav and History

(defn go-new! [p-name]
  (let [update-fn
        (fn [page-name page]
          (swap! db assoc
                 :current-data (str page)
                 :current-page (str page-name)
                 :past (conj (-> @db :past) (-> @db :current-page))
                 :future [])) ]
    (load-page! p-name update-fn)))

(defn forward! [p-name]
  (let [update-fn
        (fn [page-name page]
          (swap! db assoc
                 :current-data (str page)
                 :current-page (str page-name)
                 :past (conj (-> @db :past) (-> @db :current-page))
                 :future (pop (-> @db :future)))) ]
    (load-page! p-name update-fn)))

(defn reload! []
  (let [update-fn
        (fn [page-name page]
          (swap! db assoc
                 :current-page (str page-name)
                 :current-data (str page)))]
    (load-page! (:current-page @db) update-fn )))

(defn back! []
  (let [update-fn
        (fn [page-name page]
          (swap! db assoc
                 :current-data (str page)
                 :current-page (str page-name)
                 :past (pop (-> @db :past))
                 :future (conj (-> @db :future) (-> @db :current-page)) ))
        destination (-> @db :past last)]
    (load-page! destination update-fn)))


;; Process page

(defn stamp! [stamp]
  (do
    (swap! db assoc
           :editing true
           :edited-data (str (-> @db :edited-data) "\n\n" stamp ))))

;; RUN

(go-new! "HelloWorld")


;; Rendering Views

(defn double-bracket-links [page]
  (replace page #"\[\[(.+?)\]\]"
    (str "<span class=\"wikilink\" data=\"$1\" >$1</span>")))


(defn nav-input [value]
  [:input {:type "text"
           :id "navinputbox"
           :value @value
           :on-change #(reset! value (-> % .-target .-value))}])

(defn nav-bar []
  (let [current (r/atom (-> @db :future last))]
    (fn []
       (let [editing (-> @db :editing)]
         [:div
          [:span {:on-click (fn [] (go-new! "HelloWorld")) } "HelloWorld"]
          " | "
          [:button
           {:on-click (fn [] (back!))} "<"]
          [:button
           {:on-click (fn [] (forward! (-> @db :future last)))} ">" ]
          [nav-input current]
          [:button
           {:on-click (fn [] (go-new! @current))} "Go!"]
          " | "
          (if editing
            [:span
             [:button {:on-click
                       (fn []
                         (do
                           (swap! db assoc :editing (not editing))
                           (reload!)))}  "Cancel"]
             [:button {:on-click
                       (fn []
                         (do
                           (swap! db assoc :editing (not editing))
                           (save-page!)) )} "Save"]]

            [:span
             [:button {:on-click
                       #(swap! db assoc :editing (not editing))} "Edit"]])


          [:div "Stamps :: "
           [:button {:on-click
                     (fn []
                       (stamp! "==DELETE==" ))} "Delete"]
           " | "
           [:button {:on-click
                     (fn []
                       (stamp! "==FIX==")) } "Fix"]] ] ))))



(defn card-list []
  [:div
   [:pre
    [:div (-> @db :cards str)]]
   ])

(defn main-container []
  [:div {:class "main-container"}
   (card-list)
   (if (-> @db :editing)
     [:div
      [:textarea {:id "edit-field" :cols 80 :rows 40}
       (-> @db :edited-data)]]


     [:div
      {:on-click
       (fn [e]
         (let [tag (-> e .-target)
               classname (.getAttribute tag "class")
               data (.getAttribute tag "data")
               x (-> @db :dirty)]
           (if (= classname "wikilink")
             (go-new! data))))
       :dangerouslySetInnerHTML {:__html (-> @db :current-data)}}]

     )])



;;

; Main page
(defn content []
  [:div
   [:div
    [:h2 (-> @db :current-page)]
    [:div [nav-bar]]
    [main-container]]])


; tells reagent to begin rendering
(r/render-component [content]
  (.querySelector js/document "#app"))
