import {Given} from 'cypress-cucumber-preprocessor/steps';
import { goToPage } from '../../support/go-to-page/go-to-page';
import { verifyPageTitle } from '../../support/common/verify-page-title';
import { verifyPageHeading } from '../../support/common/verify-page-heading';
import { selectPlanningApplicationType } from '../../support/before-you-start-planning-application-type/select-planning-application-type';
import { getBackLink, getContinueButton } from '../../support/page-objects/common-po';
import { getHouseHolderPlanningRadio } from '../../support/page-objects/planning-application-type-po';

const pageTitle = 'What type of planning application is your appeal about? - Before you start - Appeal a householder planning decision - GOV.UK';
const pageHeading = 'What type of planning application is your appeal about?';
const url = '/before-you-start/type-of-planning-application';
Given('an appellant is on the select the type of planning application you made page',()=>{
  goToPage(url);
  verifyPageTitle(pageTitle);
  verifyPageHeading(pageHeading);
});

When('appellant selects {string} planning application type',(applicationType)=>{
  selectPlanningApplicationType(applicationType);
});

When('appellant clicks on the continue button',()=>{
  getContinueButton().click();
});

When('an appellant selects the back button',()=>{
getBackLink().click();
})

Then('appellant is navigated to the About A Listed Building Page',()=>{
  cy.url().should('contain','/before-you-start/listed-building');
});

Then('appellant is navigated to the is your planning application about any of the following page',()=>{
  cy.url().should('contain','/before-you-start/appeal-about');
});
Then('appellant sees an error message {string}',(errorMessage)=>{

});

Then('an appellant is navigated to the what local planning department did you submit your application to page',()=>{
cy.url().should('contain','/before-you-start/local-planning-depart');
});
Then('any information they have inputted for planning type will not be saved',()=>{
  goToPage(url);
  getHouseHolderPlanningRadio().should('not.be.checked');
});

Then('an appellants gets routed to shutter page which notifies them to use a different service',()=>{
  cy.url().should('contain', '/before-you-start/not-made-an-application');
})
