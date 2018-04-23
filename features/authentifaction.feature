@auth
Feature: Sign up, login and logout
  Scenario: Sign up via email
    When I visit "/signup/"
    Then Title should be "Sign Up"

    When I set "gordon@example.com" in field "Email"
    And  I set "q123q123q123" in field "Password"
    And  I set "q123q123q123" in field "Password confirmation"
    And  I check recaptcha
    And  I press "Sign Up"
    Then I should see "We have sent you an email. Follow the link in email to continue registration"

  Scenario: Login via email
    Given investor gordon@example.com/q123q123q123
    When I visit "/login/"
    When I set "gordon@example.com" in field "Email"
    And  I set "q123q123q123" in field "Password"
    And  I press "Login"
    Then Title should be "User office"
    And  I should be logged in

    When I set "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f" in field "ethereum_address"
    And  I press "Add own Ethereum account"
    Then I should see address "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f"

    When I press "LOG OUT"
    Then I should be logged out
