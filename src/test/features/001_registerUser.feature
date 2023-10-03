Feature: TC001 User Registeration Tests

Background:
Given I navigate to the register page

  Scenario: Register new user account using valid username
    When I create a new user account
    Then I confirm user registration is successful

 