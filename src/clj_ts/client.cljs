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
               :editing false}))


;; PageStore

(declare double-bracket-links)

(defn load-page! [page-name]
  (let [lcpn (lower-case page-name)]
    (.send XhrIo
           (str "/clj_ts/view?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)
                   page (-> data
                            double-bracket-links)]
               (swap! db assoc
                      :current-data (str page)
                      :current-page (str page-name))))

           "GET")
    (.send XhrIo
           (str "/clj_ts/raw?page=" lcpn)
           (fn [e]
             (let [status (-> e .-target .getStatusText)
                   data (-> e .-target .getResponseText .toString)]
               (swap! db assoc
                      :edited-data data)
               (js/console.log @db)))

           "GET")))

(defn generate-form-data [params]
  (let [form-data (js/FormData.)]
    (doseq [[k v] params]
      (.append form-data (name k) v))
    form-data))


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
          (load-page! page-name)
          (r/force-update-all)))
      "POST"
      (pr-str {:page page-name
               :data new-data}))))

(load-page! "HelloWorld")


;; Rendering Views

(defn double-bracket-links [page]
  (replace page #"\[\[(.+?)\]\]"
    (str "<span class=\"wikilink\" data=\"$1\" >$1</span>")))


(defn nav-input [value]
  [:input {:type "text"
           :value @value
           :on-change #(reset! value (-> % .-target .-value))}])

(defn nav-bar []
  (let [current (r/atom "ThoughtStorms")]
    (fn []
       (let [editing (-> @db :editing)]
         [:div
          [:a {:on-click (fn [] (load-page! "HelloWorld")) } "HelloWorld"]
          " | "
          [nav-input current]
          [:button
           {:on-click (fn [] (load-page! @current))} ">"]
          " | "
          (if editing
            [:span
             [:button {:on-click
                       (fn []
                         (do
                           (swap! db assoc :editing (not editing))
                           (load-page! (-> @db :current-page ))))}  "Cancel"]
             [:button {:on-click
                       (fn []
                         (do
                           (swap! db assoc :editing (not editing))
                           (save-page!)
                           (load-page! (-> @db :current-page ))))} "Save"]]

            [:span [:button {:on-click #(swap! db assoc :editing (not editing))} "Edit"]])]))))


(defn main-container []
  [:div {:class "main-container"}
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
             (load-page! data))))
       :dangerouslySetInnerHTML {:__html (-> @db :current-data)}}])])



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
