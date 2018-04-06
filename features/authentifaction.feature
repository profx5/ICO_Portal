@auth
Feature: Sign up, login and logout
  Scenario: Sign up, login and logout
    When I visit "/signup/"
    Then Title should be "Sign Up"

    When I set "gordon" in field "Username"
    And  I set "q123" in field "Password"
    And  I set "q123" in field "Password confirmation"
    And  I press "Sign Up"
    Then Title should be "Login"

    When I set "gordon" in field "Username"
    And  I set "q123" in field "Password"
    And  I press "Login"
    Then Title should be "User office"
    And  I should be logged in

    When I press "LOG OUT"
    Then I should be logged out
