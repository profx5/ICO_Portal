@kyc
Feature: KYC passing
  Scenario: KYC passing
    Given investor gordon@example.com/q123q123q123
    And   investor has eth account "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f"
    And   logged in as gordon@example.com/q123q123q123

    When I press "Steps completed"
    And  I wait a little bit
    And  I press "Submit KYC"
    Then I should see "Verification (KYC)"

    When I set "John" in field "First Name"
    And  I set "Doe" in field "Last Name"
    And  I set "Regal" in field "Middle Name"
    And  I set "19171212" in field "Date of birth"
    And  I set "Russia" in field "Place of birth"
    And  I set "922311" in field "Personal identification code"
    And  I set "+79160072321" in field "Phone number"
    And  I set "email@email.com" in field "Email"
    And  I set "Zelenograd, OnGrid Systems" in field "Place of residence"
    And  I set "Software Developer" in field "Profession or field of activity"
    And  I check checkbox "I confirm that the investor is a beneficial owner"
    And  I set PEP field to "Yes"
    And  I choose file "photo.jpg" in field "id_document_photo"
    And  I choose file "selfie.jpg" in field "bill_photo"
    And  I check checkbox "I confirm that all the data and documents submitted are correct"
    And  I press "Send data"
    Then I should see "You've successfully send your data! Our managers are validating your data. Soon the status will be updated!"
    When I close modal window
    Then I should see "Thank you for your application! Our managers are validating your data now."

    When Admin approve KYC for user "gordon@example.com"
    And  I refresh page
    Then I should not see "Your KYC is waiting for approval"
