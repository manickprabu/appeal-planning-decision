@has
Feature: A user checks their answers and wants to submit their appeal

  Background:
    Given appellant has completed householder appeal eligibility journey

  Scenario: other owner notification question is displayed when the Appellant/agent does not own whole site
    Given an agent or appellant is reviewing their answers and they do not wholly own the site
    When Check Your Answers is presented
    Then the answer for other owner notification is displayed with a change link
