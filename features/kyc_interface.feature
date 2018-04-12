@kyc
Feature: KYC passing
  Scenario: KYC passing
    Given investor gordon@example.com/q123
    And   logged in as gordon@example.com/q123

    When I press "Pass KYC"
    Then I should see "KYC from"

    When I set "John" in field "First name"
    And  I set "Doe" in field "Last name"
    And  I set "01/01/1990" in field "Birth date"
    And  I set "Russia" in field "Country"
    And  I set "922311" in field "Document no"
    And  I choose file "photo.jpg" in field "photo"
    And  I choose file "selfie.jpg" in field "selfie"
    And  I check checkbox "Agree to terms and conditions"
    And  I press "Submit KYC"
    Then I should see "Your KYC is waiting for approval"

    When Admin approve KYC for user "gordon@example.com"
    And  I refresh page
    Then I should not see "Your KYC is waiting for approval"
