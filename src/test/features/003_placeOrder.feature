Feature: TC003 Order Process Tests

As a user, I want to be able to place orders on the portal. 

When I sign in to the portal and order books, I expect the order is successfuly placed.

  Background:
    Given User navigates to the application
    And User signs in to the portal

  Scenario Outline: empty the cart 
    When user clear the cart
    Then the cart should be empty 

@test
  Scenario Outline: Authenticated user place order tests
    When user search for book "<book>"
    And user add the book to the cart
    Then there should be a pop up message "One Item added to cart"
    And the cart badge should display a number "1"

    When user open the cart 
    Then the cart should display the correct book information

    When user click on Checkout
    And user enter shipping address
    Then the Order Summary should display correct information

    When user click on Place Order 
    Then order should be placed successfuly
    And order history details are shown correctly 

    Examples:
      |book|
      |The Martian|
