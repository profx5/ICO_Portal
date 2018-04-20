@invest
Feature: Invest form
  Scenario: Open invest form and check calculator
    Given investor gordon@example.com/q123
    And   ico info with usd eth rate "51050"
    And   phase with name "Current phase" and bonus "40%"
    And   logged in as gordon@example.com/q123

    When I press "INVEST"
    Then I should see "Invest form"
    And  I should see "0 LTY tokens + 0% = 0 LTY" in field "Tokens"

    When I set "2" in field "Amount"
    Then I should see "1021 LTY tokens + 40% = 1429.40 LTY" in field "Tokens"
