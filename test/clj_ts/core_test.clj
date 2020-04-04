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

(deftest raw-and-cards
  (testing "raw to card two way conversion"
    (let [r1 "hello teenage america"
          [t1 d1] (common/raw-card->type-and-data r1)
          r2 "
:unusual
hello teenage america"
          [t2 d2] (common/raw-card->type-and-data r2)
          c1 (common/package-card 1 t1 t1 d1)
          c2 (common/package-card 2 t2 t2 d2)]
      (is (= t1 :markdown))
      (is (= d1 "hello teenage america"))
      (is (= t2 :unusual))
      (is (= d2 "\nhello teenage america"))
      (is (= (common/card->raw c1) r1))
      (is (= (common/card->raw c2) r2))
      )))

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

(deftest cards-test
  (testing "Cards"
    (let [cards [(common/package-card 1 :markdown :boo "hello")
                 (common/package-card 2 :a :b "teenage")
                 (common/package-card 3 :a :b "america")]]
      (is (= (common/cards->raw cards)
             "hello
----
:a
teenage
----
:a
america")))))

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
