(defproject clj-ts "0.1.0-SNAPSHOT"
  :aot [clj-ts.server]
  :main clj-ts.server
  :clean-targets ^{:protect false} [:target-path])
