@invest
Feature: Invest form
  Scenario: Open invest form and check calculator
    Given investor gordon@example.com/q123q123q123
    And   investor has eth account "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f"
    And   exchange rate for currency "ETH" with rate "300"
    And   exchange rate for currency "LTC" with rate "300"
    And   exchange rate for currency "DOGE" with rate "300"
    And   exchange rate for currency "BTC" with rate "300"
    And   logged in as gordon@example.com/q123q123q123
    And   ico info with total supply "51050"
    And   phase with name "Current phase" and bonus "40%"

    When I press "Steps completed"
    And  I wait a little bit
    And  I press "Buy tokens"
    Then I should see "Select payment method"
    When I press "Ethereum"
    And  I clear input in field "Amount, min 0.033 ETH"
    And  I set "100" in field "Amount, min 0.033 ETH"
    And  I press "Buy"
    Then I should see "21000.00"
