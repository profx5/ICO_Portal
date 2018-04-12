@auth
Feature: Sign up, login and logout
  Scenario: Sign up via email
    When I visit "/signup/"
    Then Title should be "Sign Up"

    When I set "gordon@example.com" in field "Email"
    And  I set "q123" in field "Password"
    And  I set "q123" in field "Password confirmation"
    And  I check recaptcha
    And  I press "Sign Up"
    Then I should see "We have sent you an email. Follow the link in email to continue registration"

  Scenario: Login via email
    Given investor gordon@example.com/q123
    When I visit "/login/"
    When I set "gordon@example.com" in field "Email"
    And  I set "q123" in field "Password"
    And  I press "Login"
    Then Title should be "User office"
    And  I should be logged in

    When I press "LOG OUT"
    Then I should be logged out
