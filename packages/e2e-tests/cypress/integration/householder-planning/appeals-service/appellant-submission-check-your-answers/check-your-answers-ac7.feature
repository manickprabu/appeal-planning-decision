@wip @has
Feature: A user checks their answers and wants to submit their appeal

  @AS-121
  Scenario: show other owner notification question and answer with a change link to the CYA page when the appellant/agent have informed the other owners
    Given an agent or appellant has provided information where they have informed the other owners
    When Check Your Answers is presented
    Then the positive answer for other owner notification is displayed with a change link
