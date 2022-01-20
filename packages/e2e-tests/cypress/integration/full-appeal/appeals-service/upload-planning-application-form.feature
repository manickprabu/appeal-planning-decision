Feature: As an appellant/agent
  I want to add a copy of my original planning application form
  So that the planning Inspectorate can have the necessary evidence to support my appeal

  Scenario: 1. Navigate from 'Appeal a Planning Decision page' to 'Planning application from'
    Given an appellant is on the 'Appeal a Planning Decision page'
    When they select 'Upload documents from your planning application'
    Then 'Planning Application form' page is displayed

  Scenario Outline: 2. Appellant/agent uploads valid file using File Upload
    Given an appellant is on the 'Planning Application form' page
    When they upload a file '<filename>' and click on Continue button
    Then 'What is your planning application number' page is displayed
    # When they click on the 'Back' link
    # Then 'Planning Application form' page is displayed
    # And the uploaded file '<filename>' is displayed
    # Examples:
    #   | filename               |
    #   | upload-file-valid.doc  |
    #   | upload-file-valid.docx |
    #   | upload-file-valid.jpeg |
    #   | upload-file-valid.jpg  |
    #   | upload-file-valid.png  |
    #   | upload-file-valid.tif  |
    #   | upload-file-valid.tiff |
    #   | upload-file-valid.pdf  |

  Scenario: 3. Appellant/agent uploads valid file using Drag and Drop
    Given an appellant is on the 'Planning Application form' page
    When they drag and drop a file and click on Continue button
    Then 'What is your planning application number' page is displayed

  Scenario: 4. Appellant does not upload any document
    Given an appellant has not uploaded any document
    When they select 'Save and Continue'
    Then an error message 'Select your planning application form' is displayed

  Scenario Outline: 5. Appellant uploads a large file and an invalid file
    Given an appellant has uploaded a file '<filename>'
    When they select 'Save and Continue'
    Then an error message '<error message>' is displayed
    Examples:
      | filename                                | error message                                                                     |
      | upload_file_large.tiff                  | upload_file_large.tiff must be smaller than 15MB                                  |
      | appeal-statement-invalid-wrong-type.csv | appeal-statement-invalid-wrong-type.csv must be a DOC, DOCX, PDF, TIF, JPG or PNG |

  Scenario: 6. Navigate from 'Planning Application Form' page back to Task List
    Given an appellant is on the 'Planning Application' page
    When they click on the 'Back' link
    Then they are presented with the 'Appeal a planning decision' task list page
      #And the last task they are working on will show 'In progress'

# The below scenario is failing - a new task has been raised to work on this AS-4346
#  Scenario: 8. Navigate from Task List to 'Planning Application Form' page
#    Given an appellant is on the 'Appeal a Planning Decision page'
#    When they select 'Upload documents from your planning application'
#    Then 'Planning Application form' page is displayed
#    When they select 'Save and Continue'
#    Then 'What is your planning application number' page is displayed
