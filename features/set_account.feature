@set_account
Feature: Set ETH account for user
  Scenario: Set ETH account for user
    Given investor gordon@example.com/q123q123q123
    And logged in as gordon@example.com/q123q123q123

    When I press "Steps completed"
    And  I wait a little bit
    And  I press "Provide your ETH address"
    Then I should see "Add your ETH account"
    When I set "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f" in field "Add your ETH account"
    Then I should see "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f" in field "Add your ETH account"
    When I press "Send"
    Then I should see "Dashboard"
