import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  selectNo,
  selectYes,
} from '../../../../../support/full-appeal/appeals-service/page-objects/own-the-land-po';
import {
  healthAndSafetyIssuesProvideDetails,
  errorMessageHealthSafetyIssuesDetails,
  errorMessageHealthSafetyIssues,
} from '../../../../../support/full-appeal/appeals-service/page-objects/health-safety-issues-po';
import {
  getBackLink,
  getErrorMessageSummary,
  getSaveAndContinueButton,
} from '../../../../../support/common-page-objects/common-po';
import {
  aboutAppealSiteSectionLink,
  pageCaptionText,
} from '../../../../../support/full-appeal/appeals-service/page-objects/task-list-page-po';
import { provideAddressLine1 } from '../../../../../support/common/appeal-submission-appeal-site-address/provideAddressLine1';
import { providePostcode } from '../../../../../support/common/appeal-submission-appeal-site-address/providePostcode';
import { verifyPageHeading } from '../../../../../support/common/verify-page-heading';
import { verifyPageTitle } from '../../../../../support/common/verify-page-title';
import { verifyErrorMessage } from '../../../../../support/common/verify-error-message';
import { selectRadioButton } from '../../../../../support/full-appeal/appeals-service/selectRadioButton';

const url = 'full-appeal/submit-appeal/health-safety-issues';
const agriculturalHoldingUrl = 'full-appeal/submit-appeal/agricultural-holding';
const visibleFromRoadUrl = 'full-appeal/submit-appeal/visible-from-road';
const siteAddressUrl = 'full-appeal/submit-appeal/appeal-site-address';
const taskListUrl = 'full-appeal/submit-appeal/task-list';
const ownAllOfLandUrl = 'full-appeal/submit-appeal/own-all-the-land';
const textPageCaption = 'Tell us about the appeal site';
const pageTitleHealthSafetyIssues = 'Are there any health and safety issues on the appeal site? - Appeal a planning decision - GOV.UK';
const pageHeadingHealthSafetyIssues = 'Are there any health and safety issues on the appeal site?';
const addressLine1 = '10 Bradmore Way';
const postcode = 'RG6 1BC';
const healthSafetyIssuesDetailsError = 'Tell us about the health and safety issues';
const healthSafetyIssuesError = 'Select yes if there are any health and safety issues on the appeal site';
const maxCharacterError = 'Health and safety information must be 255 characters or less';

Given("an appellant or agent is on the 'Is the site visible from a public road?' page", () => {
  aboutAppealSiteSectionLink().click();
  cy.url().should('contain', siteAddressUrl);
  provideAddressLine1(addressLine1);
  providePostcode(postcode);
  getSaveAndContinueButton().click();
  cy.url().should('contain', ownAllOfLandUrl);
  selectYes().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', agriculturalHoldingUrl);
  selectNo().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', visibleFromRoadUrl);
});
When("the user selects {string} and clicks 'Continue'", (option) => {
  selectRadioButton(option);
});
When("the user selects 'Yes' and enters details about the health and safety issues and clicks 'Continue'", () => {
  selectYes().click();
  healthAndSafetyIssuesProvideDetails().type(`{selectall}{backspace}The site has no mobile reception`);
  getSaveAndContinueButton().click();
});
Then("the 'Are there any health and safety issues on the appeal site?' page is displayed", () => {
  cy.url().should('contain', url);
});
Given("an appellant or agent is on the 'Are there any health and safety issues on the appeal site?' page", () => {
  aboutAppealSiteSectionLink().click();
  cy.url().should('contain', siteAddressUrl);
  provideAddressLine1(addressLine1);
  providePostcode(postcode);
  getSaveAndContinueButton().click();
  cy.url().should('contain', ownAllOfLandUrl);
  selectYes().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', agriculturalHoldingUrl);
  selectNo().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', visibleFromRoadUrl);
  selectYes().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', url);
  cy.checkPageA11y();
  verifyPageHeading(pageHeadingHealthSafetyIssues);
  verifyPageTitle(pageTitleHealthSafetyIssues)
  pageCaptionText().should('contain', textPageCaption);
});
Then("the user is taken to the 'Task List' page", () => {
  cy.url().should('contain', taskListUrl);
});
When( "the user selects No and Enter more than 255 characters in the text box and clicks 'Continue'", () => {
  const count = 255;
  const value = 'x'.repeat(count + 1);
  selectYes().click();
  healthAndSafetyIssuesProvideDetails().clear().type(value);
  getSaveAndContinueButton().click();
} );
Then('they are presented with an error message {string}', (errorMessage) => {
  switch (errorMessage) {
    case healthSafetyIssuesDetailsError:
      verifyErrorMessage(healthSafetyIssuesDetailsError, errorMessageHealthSafetyIssuesDetails, getErrorMessageSummary);
      break;
    case healthSafetyIssuesError:
      verifyErrorMessage(healthSafetyIssuesError, errorMessageHealthSafetyIssues, getErrorMessageSummary);
      break;
    case maxCharacterError:
      verifyErrorMessage(maxCharacterError, errorMessageHealthSafetyIssuesDetails, getErrorMessageSummary);
      break;
  }
});
When("they click on the 'Back' link",()=> {
  getBackLink().click();
});
Then("they are taken to the 'Is the site visible from a public road?' page", () => {
  cy.url().should('contain', visibleFromRoadUrl);
});
