import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { input, labelText, textArea } from '../../support/PageObjects/common-page-objects';

const ACCURACY_SUBMISSION_PAGE = 'accuracy-submission'
const ACCURACY_SUBMISSION_NO = 'accurate-submission-no';
const ACCURACY_SUBMISSION_REASON = 'inaccuracy-reason';

const EXTRA_CONDITIONS_PAGE = 'extra-conditions';
const EXTRA_CONDITIONS_PAGE_TEXTAREA = 'extra-conditions-text'
const EXTRA_CONDITIONS_PAGE_NO = 'has-extra-conditions-no'
const EXTRA_CONDITIONS_PAGE_YES = 'has-extra-conditions-yes'

const appeal = require('../../fixtures/completedAppeal.json');
const reply = require('../../fixtures/completedAppealReply.json');

Given('answers have been saved to the questionnaire', () => {
  cy.insertAppealAndCreateReply(appeal, reply);
});

When('the questionnaire is revisited in a new session', () => {
  cy.clearCookies();
  cy.goToCheckYourAnswersPage();
});

Then('previously entered data will be visible', () => {
  cy.goToPage(ACCURACY_SUBMISSION_PAGE);

  cy.get('@appealReply').then( (appealReply) => {
    input(ACCURACY_SUBMISSION_NO).should('be.checked'); //should care about content of reply object but in a rush..
    labelText(ACCURACY_SUBMISSION_REASON).should('have.value', reply.aboutAppealSection.submissionAccuracy.inaccuracyReason);
  });
});

When('changes are made in a new session', () => {
  cy.clearCookies();
  cy.goToPage(EXTRA_CONDITIONS_PAGE);

  cy.get('@appealReply').then( (appealReply) => {
    input(EXTRA_CONDITIONS_PAGE_YES).should('be.checked');
    textArea(EXTRA_CONDITIONS_PAGE_TEXTAREA).should('have.value', reply.aboutAppealSection.extraConditions.extraConditions);

    input(EXTRA_CONDITIONS_PAGE_NO).click();
    cy.clickSaveAndContinue();
  });
});

Then('the changes over write the previously saved answers', () => {
  cy.goToPage(EXTRA_CONDITIONS_PAGE);
  input(EXTRA_CONDITIONS_PAGE_NO).should('be.checked');
});
