Feature: Claiming Cost
  As an appellant
  I want to claim the costs incurred for the appeal

  Scenario: AC01 - Appellant doesn't want to claim costs
    Given appellant is on the claiming cost page
    When appellant selects 'No' from the options for cost
    And appellant clicks on the continue button
    Then an appellant gets navigated to HAS Appeal form

  Scenario: AC02 - Appellant claiming cost
    Given appellant is on the claiming cost page
    When appellant selects 'Yes' from the options for cost
    And appellant clicks on the continue button
    Then an appellants gets routed to shutter page which notifies them to use a different service

  Scenario: AC03 - appellant makes no selection and is provided an error
    Given appellant is on the claiming cost page
    And appellant clicks on the continue button
    Then appellant sees an error message 'Select yes if your are claiming costs as part of your appeal'

  Scenario: AC-04 - Back Link
    Given appellant is on the claiming cost page
    When appellant selects 'Yes' from the options
    And appellant selects the back button
    Then appellant is navigated to the enforcement notice page
    And information they have inputted will not be saved




