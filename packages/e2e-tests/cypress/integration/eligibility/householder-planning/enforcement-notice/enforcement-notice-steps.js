import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { goToAppealsPage } from '../../../../support/common/go-to-page/goToAppealsPage';
import { verifyPageHeading } from '../../../../support/common/verify-page-heading';
import { verifyPageTitle } from '../../../../support/common/verify-page-title';
import {
  getEnforcementNoticeErrorMessage,
  getEnforcementNoticeNo, getEnforcementNoticeYes,
} from '../../../../support/eligibility/page-objects/enforcement-notice-po';
import { getErrorMessageSummary } from '../../../../support/common-page-objects/common-po';
import { verifyErrorMessage } from '../../../../support/common/verify-error-message';
import { getBackLink } from '../../../../support/common-page-objects/common-po';
import { getContinueButton } from '../../../../support/householder-planning/appeals-service/page-objects/common-po';
import { selectPlanningApplicationType } from '../../../../support/eligibility/planning-application-type/select-planning-application-type';
import { selectPlanningApplicationDecision } from '../../../../support/eligibility/granted-or-refused-application/select-planning-application-decision';
import { selectListedBuildingDecision } from '../../../../support/eligibility/listed-building/select-listed-building-decision';
import { enterDateDecisionDue } from '../../../../support/eligibility/date-decision-due/enter-date-decision-due';
import { getDate, getMonth, getYear } from 'date-fns';
import { allowedDatePart, getPastDate } from '../../../../support/common/getDate';
const pageHeading = 'Have you received an enforcement notice?';
const pageTitle = 'Have you received an enforcement notice? - Before you start - Appeal a planning decision - GOV.UK';
const url = `before-you-start/enforcement-notice-householder`;
const typeOfPlanningPageUrl = `before-you-start/type-of-planning-application`;

Given('appellant is on the enforcement notice page for householder planning', () => {
  goToAppealsPage(url);
  verifyPageHeading(pageHeading);
  verifyPageTitle(pageTitle);
});

Given('appellant is on the enforcement notice page for {string}', (application_type) => {
  goToAppealsPage(typeOfPlanningPageUrl);
  selectPlanningApplicationType(application_type);
  getContinueButton().click();
  selectListedBuildingDecision('No');
  getContinueButton().click();
  selectPlanningApplicationDecision('Granted');
  getContinueButton().click();
  const validDate = getPastDate(allowedDatePart.MONTH, 3);
  enterDateDecisionDue( {day: getDate(validDate), month: getMonth(validDate)+1, year: getYear(validDate) } );

  verifyPageHeading(pageHeading);
  verifyPageTitle(pageTitle);
});

When('appellant selects {string} from the enforcement notice options', (enforcementOption) => {
  if (enforcementOption === 'No') {
    getEnforcementNoticeNo().check();
  } else {
    getEnforcementNoticeYes().check();
  }
});

When('appellant clicks on the continue button on enforcement notice page', () => {
  getContinueButton().click();
});

When('appellant clicks the back button', () => {
  getBackLink().click();
});

Then('appellant gets navigated to was your planning application claiming costs page', () => {
  cy.url().should('contain', '/before-you-start/claiming-costs-householder');
});

Then('appellant is navigated to the enforcement notice householder shutter page', () => {
  cy.url().should('contain', '/before-you-start/use-a-different-service');
});

Then('appellant is navigated to the householder decision date page', () => {
  cy.url().should('contain', '/before-you-start/decision-date-householder');
});

Then('appellant sees an error message {string}', (errorMessage) => {
  verifyErrorMessage(errorMessage, getEnforcementNoticeErrorMessage, getErrorMessageSummary);
})

Then('information they have inputted will not be saved', () => {
  goToAppealsPage(url);
  getEnforcementNoticeYes().should('not.be.checked');
})
