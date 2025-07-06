Feature: Login functionality

  @positive
  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters valid username and password
    Then the user should see the logout message

  @negative
  Scenario: Login fails with invalid credentials
    Given the user is on the login page
    When the user enters invalid username and password
    Then the user should see an error message