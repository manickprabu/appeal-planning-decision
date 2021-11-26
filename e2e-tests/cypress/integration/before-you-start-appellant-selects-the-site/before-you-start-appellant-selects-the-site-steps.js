import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { goToPage } from '../../support/go-to-page/goToPage';
import { verifyPageHeading } from '../../support/common/verify-page-heading';
import { verifyPageTitle } from '../../support/common/verify-page-title';
import { selectSiteOption } from '../../support/before-you-start-appellant-selects-the-site/select-site-option';
import { getBackLink, getContinueButton } from '../../support/page-objects/common-po';
const pageHeading = 'Is your appeal about any of the following?';
const url = '/before-you-start/any-of-following';
const pageTitle = 'Is your appeal about any of the following? - Before you start - Appeal a householder planning decision - GOV.UK';
Given('an appellant is on the is your appeal about any of the following page',()=>{
  goToPage(url);
  verifyPageHeading(pageHeading);
  verifyPageTitle(pageTitle);
});

When('appellant selects {string} from the list of options',(option)=>{
selectSiteOption(option);
});

When('appellant clicks the continue button',()=>{
  getContinueButton().click();
});

Then('appellant gets routed to the have you received an enforcement notice page',()=>{
  cy.url().should('contain','/before-you-start/enforcement-notice');
});

When('an appellant selects the back button',()=>{
  getBackLink().click();
});
Then('an appellants gets routed to shutter page which notifies them to use a different service',()=>{
  cy.url().should('contain', '/before-you-start/use-a-different-service');
});

Then('an appellant is taken back to the what type of planning application did you make page',()=>{
  cy.url().should('contain','/before-you-start/type-of-planning-application');
});

Then('{string} gets deselected',(option)=>{

});

