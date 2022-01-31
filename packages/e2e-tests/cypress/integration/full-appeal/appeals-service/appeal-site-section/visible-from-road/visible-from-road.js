import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  selectNo,
  selectYes,
} from '../../../../../support/full-appeal/appeals-service/page-objects/own-the-land-po';
import {
  provideDetails,
  errorMessageVisibleFromRoadDetails,
  errorMessageVisibleFromRoad,
} from '../../../../../support/full-appeal/appeals-service/page-objects/visible-from-road-po';
import {
  getBackLink,
  getErrorMessageSummary,
  getSaveAndContinueButton,
} from '../../../../../support/common-page-objects/common-po';
import { goToAppealsPage } from '../../../../../support/common/go-to-page/goToAppealsPage';
import {
  aboutAppealSiteSectionLink,
  pageCaptionText,
} from '../../../../../support/full-appeal/appeals-service/page-objects/task-list-page-po';
import { provideAddressLine1 } from '../../../../../support/common/appeal-submission-appeal-site-address/provideAddressLine1';
import { providePostcode } from '../../../../../support/common/appeal-submission-appeal-site-address/providePostcode';
import { acceptCookiesBanner } from '../../../../../support/common/accept-cookies-banner';
import { verifyPageHeading } from '../../../../../support/common/verify-page-heading';
import { verifyPageTitle } from '../../../../../support/common/verify-page-title';
import { verifyErrorMessage } from '../../../../../support/common/verify-error-message';

const url = 'full-appeal/submit-appeal/visible-from-road';
const agriculturalHoldingUrl = 'full-appeal/submit-appeal/agricultural-holding';
const healthSafetyIssuesUrl = '/full-appeal/submit-appeal/health-safety-issues';
const siteAddressUrl = 'full-appeal/submit-appeal/appeal-site-address';
const taskListUrl = 'full-appeal/submit-appeal/task-list';
const ownAllOfLandUrl = 'full-appeal/submit-appeal/own-all-the-land';
const textPageCaption = 'Tell us about the appeal site';
const pageTitleVisibleFromRoad = 'Is the site visible from a public road? - Appeal a planning decision - GOV.UK';
const pageHeadingVisibleFromRoad = 'Is the site visible from a public road?';
const addressLine1 = '10 Bradmore Way';
const postcode = 'RG6 1BC';
const visibleFromRoadDetailsError = 'Tell us how visibility is restricted';
const visibleFromRoadError = 'Select yes if the site is visible from a public road';

Given("an appellant or agent is on the 'Is the appeal site part of an agricultural holding?' page", () => {
  goToAppealsPage(taskListUrl);
  acceptCookiesBanner();
  aboutAppealSiteSectionLink().click();
  cy.url().should('contain', siteAddressUrl);
  provideAddressLine1(addressLine1);
  providePostcode(postcode);
  getSaveAndContinueButton().click();
  cy.url().should('contain', ownAllOfLandUrl);
  selectYes().click();
  getSaveAndContinueButton().click();
  cy.url().should('contain', agriculturalHoldingUrl);
});
When("the user selects {string} and clicks 'Continue'", (option) => {
  switch (option) {
    case 'Yes':
      selectYes().click();
      getSaveAndContinueButton().click();
      break;
    case 'No':
      selectNo().click();
      getSaveAndContinueButton().click();
      break;
    case 'None of the options':
      getSaveAndContinueButton().click();
      break;
  }
});
When("the user selects 'No' and enters details about how the visibility is restricted and clicks 'Continue'", (option) => {
  selectNo().click();
  provideDetails();
  getSaveAndContinueButton().click();
});
Then("the 'Is the site visible from a public road?' page is displayed", () => {
  cy.url().should('contain', url);
  });
Given("an appellant or agent is on the 'Is the site visible from a public road?' page", () => {
  goToAppealsPage(url);
  acceptCookiesBanner();
  verifyPageHeading(pageHeadingVisibleFromRoad);
  verifyPageTitle(pageTitleVisibleFromRoad)
  pageCaptionText().should('contain', textPageCaption);
  })
Then("the user is taken to the next page 'Are there any health and safety issues on the appeal site?'", () => {
  cy.url().should('contain', healthSafetyIssuesUrl);
});
Then('they are presented with an error message {string}', (errorMessage) => {
  switch (errorMessage) {
    case visibleFromRoadDetailsError:
      verifyErrorMessage(visibleFromRoadDetailsError, errorMessageVisibleFromRoadDetails, getErrorMessageSummary);
      break;
    case visibleFromRoadError:
      verifyErrorMessage(visibleFromRoadError, errorMessageVisibleFromRoad, getErrorMessageSummary);
      break;
  }
});
When("they click on the 'Back' link",()=> {
  getBackLink().click();
});
Then("they are presented with the 'Is the appeal site part of an agricultural holding?' page", () => {
  cy.url().should('contain', agriculturalHoldingUrl);
});
