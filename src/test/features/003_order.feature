Feature: TC003 Order Process Tests

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario Outline: Authenticated Users - Add to cart
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the login button
    When user search for a "<book>"
    And user add the book to the cart
    Then the cart badge should get updated

    Examples:
      | username | password    | book            |
      | Georgel  | P@ssw0rd123 | Roomies         |

  @fail
  Scenario: UnAuthenticated User - Add to cart
    When user search for book "All of Us with Wings"
    And user add the book to the cart
    Then the cart badge should get updated