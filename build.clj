(ns build
  (:require [clojure.tools.build.api :as b]
            [clojure.string :as str]
            [cljs.build.api :as cljs]))

(def class-dir "target/classes")
(def basis (b/create-basis {:project "deps.edn"
                           :aliases [:dev :app]}))
(def uber-file "target/cardigan-bay.jar")

(defn clean [_]
  (b/delete {:path "target"})
  (b/delete {:path "resources/clj_ts/main.out"})
  (b/delete {:path "resources/clj_ts/main.js"}))

(defn compile-cljs [_]
  (let [out-file "resources/clj_ts/main.js"
        out-dir "resources/clj_ts/main.out"]
    (println "Building main.js")
    (println "Current directory:" (System/getProperty "user.dir"))
    (println "Checking if client.cljs exists:" (.exists (java.io.File. "src/clj_ts/client.cljs")))
    
    ;; First try development build
    (println "Attempting development build first...")
    (cljs/build
     "src"
     {:main 'clj-ts.client
      :output-to out-file
      :output-dir out-dir
      :optimizations :none
      :target :browser
      :verbose true
      :source-paths ["src"]
      :asset-path "main.out"
      :pretty-print true})
    
    ;; If development build succeeds, try advanced compilation
    (println "Development build succeeded, attempting advanced compilation...")
    (cljs/build
     "src"
     {:main 'clj-ts.client
      :output-to out-file
      :output-dir out-dir
      :optimizations :advanced
      :target :browser
      :verbose true
      :source-paths ["src"]
      :asset-path "main.out"
      :pretty-print true})))

(defn uberjar [_]
  (clean nil)
  (compile-cljs nil)
  (b/copy-dir {:src-dirs ["src" "resources"]
               :target-dir class-dir})
  (b/compile-clj {:basis basis
                  :src-dirs ["src"]
                  :class-dir class-dir})
  (b/uber {:class-dir class-dir
           :uber-file uber-file
           :basis basis
           :main 'clj-ts.server})) 