@regression
Feature: Test Equal Experts Hotel Booking App
    As a QA
    I want to be able to verify the equal experts booking app
    So that I can prove my SDET capabilities

    Scenario: Submitting form with empty fields should return a server error
        Given I am on the booking form
        And I setup an interrupt for a "POST" request to the "**/booking" service
        When I save the booking
        Then I should see an "Internal Server Error"

    Scenario Outline: Submitting form with missing required fields should return a server error
        Given I am on the booking form
        And I setup an interrupt for a "POST" request to the "**/booking" service
        And I fill in the form with the required "<field>" missing
        When I save the booking
        Then I should see an "Internal Server Error"

        Examples: Fields to Leave Empty
            | field          |
            | firstname      |
            | lastname       |
            | totalprice     |
            | checkin        |
            | checkout       |

    Scenario Outline: Submitting form with non numeric or decimal price field should return a server error
        Given I am on the booking form
        And I setup an interrupt for a "POST" request to the "**/booking" service
        And I fill in the booking form
        And I set the value of the "totalprice" field to "<value>"
        When I save the booking
        Then I should see an "Internal Server Error"

        Examples: Non numeric or demical values
            | value     |
            | text      |
            | 100.0.0   |
            | @£$%      |

    Scenario Outline: Wrongly formatted checkin or checkout date should return a server error
        Given I am on the booking form
        And I setup an interrupt for a "POST" request to the "**/booking" service
        And I fill in the booking form
        And I set the value of the "<input>" field to "<value>"
        When I save the booking
        Then I should see an "Internal Server Error"
        # Expected date format is YYYY-MM-DD or MM-DD-YYYY
        Examples: Date Formats
            |   input    | value         |
            |   checkin  | 28-02-2021    |
            |   checkin  | 2022-28-02    |
            |   checkout | 28-02-2021    |
            |   checkout | 2022-28-02    |

    Scenario: Successfully make a booking
        Given I am on the booking form
        And I setup an interrupt for a "POST" request to the "**/booking" service
        And I fill in the booking form
        When I save the booking
        Then my booking should be successful
        And I should see my booking listed

    Scenario: Delete a booking
        Given I successfully make a booking
        And I setup an interrupt for a "DELETE" request to the "**/booking/*" service
        When I delete my booking
        Then my booking should be successfully deleted
        Then I should not see my booking listed
