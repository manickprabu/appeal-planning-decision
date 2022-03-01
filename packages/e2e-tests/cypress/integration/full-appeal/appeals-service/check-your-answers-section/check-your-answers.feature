Feature: As an Appellant/Agent
  I want to be able to review and change my answers
  So that my appeal is accurate

  Background:
    Given appellant has completed full appeal eligibility journey

  #Scenario Outline: '<Acceptance_criteria>'- Appellant has submitted the application with '<contact_details>', own land as '<own_land>', agricultural holding as '<agricultural_holding>, visible from public land as '<visible_publicLand>', health and safety as '<health_and_safety>', '<appeal_decision>', design and access statement as '<design_access_statement>', plans and drawings as '<plans_and_drawings>' and supporting documents as '<supporting_documents>'
  Scenario Outline: <Acceptance_criteria>- <description>
    Given the appellant has provided details for '<contact_details>'
    And appellant provides the details for '<own_land>', '<own_some_land>', '<owns_rest_of_land>', '<agricultural_holding>', '<visible_publicLand>', '<tenant>', '<other_tenants>' and '<health_and_safety>'
    And appellant provides the details about '<appeal_decision>' preference
    And appellant uploads documents from planning application and design and access statement as '<design_access_statement>'
    And appellant uploads documents for appeal for plans and drawings '<plans_and_drawings>' and supporting documents '<supporting_documents>'
    When appellant clicks on Check your answers link
    Then appellant is displayed the check your answer page
    And appellant is displayed answers for '<contact_details>'
    And appellant is displayed answers for appeal site for '<own_land>', '<own_some_land>', '<owns_rest_of_land>', '<agricultural_holding>', '<visible_publicLand>', '<tenant>', '<other_tenants>' and '<health_and_safety>'
    And appellant is displayed answers for deciding your appeal for '<appeal_decision>'
    And appellant is displayed answers for planning application for '<design_access_statement>'
    And appellant is displayed answers for appeal for '<plans_and_drawings>' and '<supporting_documents>'
    Examples:
      | Acceptance_criteria | description                                                                                                               | contact_details | own_land | own_some_land | owns_rest_of_land                          | agricultural_holding | tenant | other_tenants | health_and_safety | visible_publicLand | appeal_decision         | design_access_statement | plans_and_drawings | supporting_documents |
      | AC-01               | Appellant owns all the land and appeal decision is written representations                                                | appellant       | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Written representations | no                      | no                 | no                   |
      | AC-02               | Agent - Appellant owns all the land and appeal decision is written representations                                        | agent           | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Written representations | no                      | no                 | no                   |
      | AC-03               | Appellant owns all the land and appeal decision is Hearing                                                                | appellant       | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Hearing                 | no                      | no                 | no                   |
      | AC-04               | Agent - Appellant owns all the land and appeal decision is Hearing                                                        | agent           | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Hearing                 | no                      | no                 | no                   |
      | AC-05               | Appellant owns all the land and appeal decision is Inquiry                                                                | appellant       | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Inquiry                 | no                      | no                 | no                   |
      | AC-06               | Agent - Appellant owns all the land and appeal decision is Inquiry                                                        | agent           | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Inquiry                 | no                      | no                 | no                   |
      | AC-07               | Appellant owns all the land and provides design access statement                                                          | appellant       | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Written representations | yes                     | no                 | no                   |
      | AC-08               | Agent - Appellant owns all the land and provides design access statement                                                  | agent           | yes      | no            | Yes, I know who owns all the land          | no                   | yes    | yes           | no                | yes                | Written representations | yes                     | no                 | no                   |
     | AC-09               | Appellant owns some of the land and knows all the owners and provides plans and drawings and supporting documents         | appellant       | no       | yes           | Yes, I know who owns all the land          | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-10               | Agent - Appellant owns some of the land and knows all the owners and provides plans and drawings and supporting documents | agent           | no       | yes           | Yes, I know who owns all the land          | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-11               | Appellant owns some of the land and knows some of the owners and is the only tenant of agricultural holding               | appellant       | no       | yes           | I know who owns some of the land           | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-12               | Agent - Appellant owns some of the land and knows some of the owners and is the only tenant of agricultural holding       | agent           | no       | yes           | I know who owns some of the land           | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-13               | Appellant owns some of the land and knows none of the owners and is one of the tenants of agricultural holding            | appellant       | no       | yes           | No, I do not know who owns any of the land | yes                  | yes    | yes           | no                | yes                | Written representations | no                      | yes                | yes                  |
      | AC-14               | Agent - Appellant owns some of the land and knows none of the owners and is one of the tenants of agricultural holding    | agent           | no       | yes           | No, I do not know who owns any of the land | yes                  | yes    | yes           | no                | yes                | Written representations | no                      | yes                | yes                  |
      | AC-15               | Appellant owns none of the land and knows all of the owners and is one of the tenants of agricultural holding             | appellant       | no       | no            | Yes, I know who owns all the land          | yes                  | yes    | yes           | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-16               | Agent - Appellant owns none of the land and knows all of the owners and is one of the tenants of agricultural holding     | agent           | no       | no            | Yes, I know who owns all the land          | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-17               | Appellant owns none of the land and knows some of the owners and is one of the tenants of agricultural holding            | appellant       | no       | no            | I know who owns some of the land           | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-18               | Agent - Appellant owns none of the land and knows some of the owners and is one of the tenants of agricultural holding    | agent           | no       | no            | I know who owns some of the land           | yes                  | yes    | no            | yes               | no                 | Written representations | no                      | yes                | yes                  |
      | AC-19               | Appellant owns none of the land and knows none of the owners and is the only tenants of agricultural holding              | appellant       | no       | no            | No, I do not know who owns any of the land | yes                  | yes    | no            | no                | yes                | Written representations | no                      | yes                | yes                  |
      | AC-20               | Agent -Appellant owns none of the land and knows none of the owners and is the only tenants of agricultural holding       | agent           | no       | no            | No, I do not know who owns any of the land | yes                  | yes    | no            | no                | yes                | Written representations | no                      | yes                | yes                  |
