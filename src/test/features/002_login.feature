Feature: TC002 User Authentication Tests

As a user, I want to sign into my account on The Book Store platform to efficiently manage my profile, place orders, and track their status.

Upon entering correct credentials, I expect a seamless and successful sign-in experience at The Book Store.

However, if I input incorrect username or password details, the sign-in process should promptly fail, accompanied by a clear and helpful error message.


  Background: 
    Given User navigates to the application
    And User click on the login link
@test
  Scenario: Login should be success
    And User enter the username as "Georgel"
    And User enter the password as "P@ssw0rd123"
    When User click on the login button
    Then Login should be success

  Scenario: Login with invalid username
    Given User enter the username as "wrong-username" 
    And User enter the password as "P@ssw0rd123"
    When User click on the login button
    Then Login should fail


    Scenario: Login with invalid password
    Given User enter the username as "Georgel" 
    And User enter the password as "wrong-password"
    When User click on the login button
    Then Login should fail
