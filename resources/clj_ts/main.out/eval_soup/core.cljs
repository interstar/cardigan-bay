(ns eval-soup.core
  (:require [clojure.string :as str]
            [cljs.core.async :refer [chan put!]]
            [cljs.js :refer [empty-state eval js-eval]]
            [cljs.tools.reader :refer [read-string]]
            [clojure.walk :refer [walk]])
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:import goog.net.XhrIo))

(defn ^:private fix-goog-path [path]
  ; goog/string -> goog/string/string
  ; goog/string/StringBuffer -> goog/string/stringbuffer
  (let [parts (str/split path #"/")
        last-part (last parts)
        new-parts (concat
                    (butlast parts)
                    (if (= last-part (str/lower-case last-part))
                      [last-part last-part]
                      [(str/lower-case last-part)]))]
    (str/join "/" new-parts)))

(defn ^:private custom-load!
  ([opts cb]
   (if (re-matches #"^goog/.*" (:path opts))
     (custom-load!
       (update opts :path fix-goog-path)
       [".js"]
       cb)
     (custom-load!
       opts
       (if (:macros opts)
         [".clj" ".cljc"]
         [".cljs" ".cljc" ".js"])
       cb)))
  ([opts extensions cb]
   (if-let [extension (first extensions)]
     (try
       (.send XhrIo
         (str (:path opts) extension)
         (fn [e]
           (if (.isSuccess (.-target e))
             (cb {:lang (if (= extension ".js") :js :clj)
                  :source (.. e -target getResponseText)})
             (custom-load! opts (rest extensions) cb))))
       (catch js/Error _
         (custom-load! opts (rest extensions) cb)))
     (cb {:lang :clj :source ""}))))

(defn ^:private str->form [ns-sym s]
  (try
    (binding [*ns* (create-ns ns-sym)]
      (read-string {:read-cond :allow} s))
    (catch js/Error _)))

(defn ^:private eval-forms [forms cb *state *current-ns custom-load]
  (let [opts {:eval js-eval
              :load custom-load
              :context :expr
              :def-emits-var true}
        channel (chan)
        *forms (atom forms)
        *results (atom [])]
    (go (while (seq @*forms)
          (try
            (let [current-ns @*current-ns
                  form (first @*forms)
                  opts (assoc opts :ns current-ns)]
              (when (list? form)
                (when (= 'ns (first form))
                  (reset! *current-ns (second form))))
              (if (instance? js/Error form)
                (put! channel {:error form})
                (eval *state form opts #(put! channel %))))
            (catch js/Error e (put! channel {:error e})))
          (swap! *forms rest)
          (let [{:keys [value] :as res} (<! channel)
                res (if (instance? cljs.core.async.impl.channels.ManyToManyChannel value)
                      {:value (<! value)}
                      res)]
            (swap! *results conj res)))
      (cb (mapv #(or (:error %) (:value %))
            @*results)))))

(defn ^:private wrap-macroexpand [form]
  (if (coll? form)
    (list 'macroexpand (list 'quote form))
    form))

(defn ^:private add-timeout-reset [form]
  (list 'do '(cljs.user/ps-reset-timeout!) form))

(defn ^:private add-timeout-checks [timeout form]
  (if (and (seq? form) (= 'quote (first form)))
    form
    (let [form (walk (partial add-timeout-checks timeout) identity form)]
      (if (and (seq? form) (= 'recur (first form)))
        (list 'do (list 'cljs.user/ps-check-for-timeout! timeout) form)
        form))))

(defn ^:private add-timeouts-if-necessary [timeout forms expanded-forms]
  (for [i (range (count forms))
        :let [expanded-form (get expanded-forms i)]]
    (if (and (coll? expanded-form)
             (contains? (set (flatten expanded-form)) 'recur))
      (add-timeout-reset (add-timeout-checks timeout expanded-form))
      (get forms i))))

(defonce ^:private *cljs-state (empty-state))

(defn code->results
  "Evaluates each form, providing the results in a callback.
  If any of the forms are strings, it will read them first."
  ([forms cb]
   (code->results forms cb {}))
  ([forms cb {:keys [*current-ns
                     *state
                     custom-load
                     timeout
                     disable-timeout?]
              :or {*current-ns (atom 'cljs.user)
                   *state *cljs-state
                   custom-load custom-load!
                   timeout 4000
                   disable-timeout? false}
              :as opts}]
   (let [forms (mapv #(if (string? %) (str->form @*current-ns %) %) forms)
         init-forms (vec
                      (concat
                        ['(ns cljs.user)]
                        (when-not disable-timeout?
                          ['(def ps-last-time (atom 0))
                           '(defn ps-reset-timeout! []
                              (reset! ps-last-time (.getTime (js/Date.))))
                           '(defn ps-check-for-timeout! [timeout]
                              (when (> (- (.getTime (js/Date.)) @ps-last-time) timeout)
                                (throw (js/Error. "Execution timed out."))))])
                        ['(set! *print-err-fn* (fn [_]))
                         (list 'ns @*current-ns)]))
         timeout-cb (fn [results]
                      (eval-forms
                        (add-timeouts-if-necessary timeout forms results)
                        cb
                        *state
                        *current-ns
                        custom-load))
         init-cb (fn [results]
                   (eval-forms
                     (if disable-timeout?
                       forms
                       (map wrap-macroexpand forms))
                     (if disable-timeout?
                       cb
                       timeout-cb)
                     *state
                     *current-ns
                     custom-load))]
     (eval-forms init-forms init-cb *state *current-ns custom-load))))

