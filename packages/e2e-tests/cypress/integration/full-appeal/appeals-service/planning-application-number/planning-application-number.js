import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import {
   getBackLink,
  getErrorMessageSummary, getFileUploadButton,
} from '../../../../support/common-page-objects/common-po';
import { goToAppealsPage } from '../../../../support/common/go-to-page/goToAppealsPage';
import {
  appNumberHint, pageCaption,
  planningApplicationNumber,
  planningAppNumberErrorMessage,
} from '../../../../support/full-appeal/appeals-service/page-objects/planning-application-number-po';
import { verifyPageTitle } from '../../../../support/common/verify-page-title';
import { verifyErrorMessage } from '../../../../support/common/verify-error-message';
import { verifyPageHeading } from '../../../../support/common/verify-page-heading';
import { getSaveAndContinueButton } from '../../../../support/householder-planning/lpa-questionnaire/PageObjects/common-page-objects';
import { acceptCookiesBanner } from '../../../../support/common/accept-cookies-banner';

const url = 'full-appeal/submit-appeal/application-number';
const planningAppFormUrl = 'full-appeal/submit-appeal/application-form';
const designAccessStatementUrl = 'full-appeal/submit-appeal/design-access-statement-submitted';
const textPageCaption = 'Upload documents from your planning application';
const pageTitle = "What's the original planning application number? - Appeal a planning decision - GOV.UK";
const pageHeading = 'What is your planning application number?';
const textAppNumberHint = 'You can find this on the decision letter from your local planning department';
const textPlanningAppNumber = 'PNO-1001';
const largeTextPlanningAppNumber = 'PNo/0001-This is just a sample test for inputting more than 30 characters in the field';


Given("an agent is on the 'Planning Application form' page",()=> {
  goToAppealsPage(planningAppFormUrl);
  acceptCookiesBanner();
  getFileUploadButton().attachFile('upload-file-valid.jpeg');
});
When("they click the 'Continue' on File upload page",()=> {
  getSaveAndContinueButton().click();
});
When("they click the 'Continue'",()=> {
  getSaveAndContinueButton().click();
});
Then("'What is your Planning Application Number' page is displayed",()=> {
  cy.url().should('contain', url);
});

Given("an agent is on the 'What is your Planning Application number' page",()=> {
  goToAppealsPage(url);
  acceptCookiesBanner();
  pageCaption().should('contain', textPageCaption);
  verifyPageHeading(pageHeading);
  verifyPageTitle(pageTitle);
  appNumberHint().should('contain', textAppNumberHint);
  planningApplicationNumber().clear();
});
When("they enter text into the box and click 'Continue'",()=> {
  planningApplicationNumber().type(textPlanningAppNumber);
  getSaveAndContinueButton().click();
});
Then("the page 'Did you submit a design and access statement with your application?' is displayed",()=> {
  cy.url().should('contain', designAccessStatementUrl);
});

Then('an error message {string} is displayed',(errorMessage)=> {
  verifyErrorMessage(errorMessage,planningAppNumberErrorMessage,getErrorMessageSummary);
});

Given("an agent has entered more than 30 characters into the text box",()=> {
  goToAppealsPage(url);
  acceptCookiesBanner();
  planningApplicationNumber().clear().type(largeTextPlanningAppNumber);
});

Given("an agent is on the 'What is your planning application' page",()=> {
  goToAppealsPage(planningAppFormUrl)
  getFileUploadButton().attachFile('appeal-statement-valid.jpeg', { subjectType: 'drag-n-drop' });
  getSaveAndContinueButton().click();
});
When("they click on the 'Back' link",()=> {
  getBackLink().click();
});
Then("they are presented with the 'Planning Application form' page",()=> {
  cy.url().should('contain', planningAppFormUrl);
});
