Feature: TC003 Order Process Tests

As a user, I want to be able to place orders on the portal. 

When I sign in to the portal and order books, I expect the order is successfuly placed.

  Background:
    Given User navigates to the application
    And User signs in to the portal

@test
  Scenario Outline: empty the cart 
    When user clear the cart
    Then the cart should be empty 


  Scenario Outline: Authenticated Users - Add book to cart
    When user search for book name "<book>"
    And user add the book to the cart
    Then the cart badge should get updated
    When user verify the book in the cart
    Examples:
      |book|
      |The Martian|

  @fail
  Scenario: UnAuthenticated User - Add book to cart
    When user search for book "All of Us with Wings"
    And user add the book to the cart
    Then the cart badge should get updated