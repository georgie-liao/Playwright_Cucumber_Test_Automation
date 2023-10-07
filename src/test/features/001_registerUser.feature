Feature: TC001 User Registeration Tests

As a user, I want to be able to create an account so I can sign in to the portal.

When I fill the registration form and click on the submit button, I expect my user account is created successfuly. 

Background:
Given I navigate to the register page

  Scenario: Register new user account using valid username
    When I create a new user account
    Then I confirm user registration is successful

 