Feature: Get referral link

  Scenario: Get referral link
    Given investor gordon@example.com/q123q123q123
    And   investor has eth account "0xb79D16cE900cCb086C4D1b2c0aE44bDD1be5eE9f"
    And   logged in as gordon@example.com/q123q123q123

    When  I press "get referral link"
    Then  I should see "Referral link: "
    And   I should see referral link in field id "referralLink"
