(ns clj-ts.core-test
  (:require [clojure.test :refer :all]
            [clj-ts.common :as common]
            ))


(deftest basic-cards
  (testing "Making and analysing cards"
    (let [c (common/package-card 1 :markdown :another "hello teenage america")]
      (is (= (:type c) :markdown))
      (is (= (:delivered_type c) :another))
      (is (= (:id c) 1))
      (is (= (:data c) "hello teenage america")))))


(deftest basic-search-and-replace
  (testing "Searching cards"
    (let [cards [(common/package-card 1 :a :b "hello")
                 (common/package-card 2 :a :b "teenage")
                 (common/package-card 3 :a :b "america")]
          h (-> cards second :hash)
          new-card (common/package-card 22 :b :a "boomer")
          h2 (:hash new-card)
          c2 (common/sub-card cards #(= 2 (:id %)) new-card )
          nc2 (common/package-card 33 :c :d "brazil")
          c3 (common/sub-card cards #(= 4 (:id %)) nc2)]
      (is (= 2 (->
                (common/find-card-by-hash cards h)
                :id)))
      (is (nil? (common/find-card-by-hash cards "777")))
      (is (= 3 (count c2)))
      (is (= 22 (-> (common/find-card-by-hash c2 h2) :id)))
      (is (= c3 cards)))))

(deftest double-bracket
  (testing "Double bracket links"
    (is (= (common/double-bracket-links "hello world") "hello world"))
    (is (= (common/double-bracket-links "hello [[world]]") "hello <span class=\"wikilink\" data=\"world\">world</span>"))  ) )

(deftest double-comma-table
  (testing "Double comma table"
    (is (= (common/double-comma-table "hello world") "hello world"))
    (is (= (common/double-comma-table "hello,, world")
           "<table class='double-comma-table'>
<tr><td>hello</td><td> world</td></tr>
</table>"))
    (is (= (common/double-comma-table "hello\nteenage,,america")
           "hello
<table class='double-comma-table'>
<tr><td>teenage</td><td>america</td></tr>
</table>"))))
