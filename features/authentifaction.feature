@auth
Feature: Sign up, login and logout
  Scenario: Sign up via email
    When I visit "/signup/"
    Then Title should be "OnGrid Systems Decentralized Platform"
    And  I should see "Create an account"

    When I set "gordon@example.com" in field "email"
    And  I set "q123q123q123" in field "password1"
    And  I set "q123q123q123" in field "password2"
    And  I check recaptcha
    And  I agree to the Terms and Conditions
    And  I press "Sign up"
    Then I should see "We have sent you an email. Follow the link in email to continue registration."

  Scenario: Login via email
    Given investor gordon@example.com/q123q123q123

    When I visit "/login/"
    Then I should see "Sign in"

    When I set "gordon@example.com" in field "email"
    And  I set "q123q123q123" in field "password"
    And  I press "Sign in"
    Then Title should be "User office"
    And  I should be logged in

    When I press "Steps completed"
    And  I press "Log out"
    Then I should be logged out
