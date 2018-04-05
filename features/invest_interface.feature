@invest
Feature: Invest form
  Scenario: Open invest form and check calculator
    Given logged in as gordon/q123

    When I press "INVEST"
    Then I should see "Invest form"
    And  I should see "0 LTY tokens + 0% = 0 LTY" in field "Tokens"

    When I set "2" in field "Amount"
    Then I should see "1726.30 LTY tokens + 40% = 2416.82 LTY" in field "Tokens"
