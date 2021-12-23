import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  applicationStatusDetailedText,
  applicationStatusText,
  linkProvideYourContactDetails,
  linkTellAboutTheAppealSite,
  linkUploadDocsFromPlanningApplication,
  linkUploadDocsForYourAppeal,
  linkCheckYourAnswers,
  statusProvideYourContactDetails,
  statusTellAboutTheAppealSite,
  statusUploadDocsFromPlanningApplication,
  statusUploadDocsForYourAppeal, statusCheckYourAnswers,
} from '../../../../support/full-planning/appeals-service/page-objects/appeal-form-task-list-po';
import { goToAppealsServicePage } from '../../../../support/common/go-to-page/goToAppealsServicePage';
import { verifyPageTitle } from '../../../../support/common/verify-page-title';

const pageHeading = 'Appeal a planning decision';
const url = 'full-appeal/task-list';
const pageTitle = 'Appeal a planning decision - Appeal a planning decision - GOV.UK';

Given('Appellant has been successful on their eligibility',()=> {
 goToAppealsServicePage(url);
})
When("they are on the 'Appeal a Planning Decision' page",()=> {
  verifyPageTitle(pageTitle);

})
Then('they are presented with the list of tasks that they are required to complete in order to submit their appeal',()=> {
  linkProvideYourContactDetails().should('exist');
  statusProvideYourContactDetails().should('exist');
  linkTellAboutTheAppealSite().should('exist');
  statusTellAboutTheAppealSite().should('exist');
  linkUploadDocsFromPlanningApplication().should('exist');
  statusUploadDocsFromPlanningApplication().should('exist');
  linkUploadDocsForYourAppeal().should('exist');
  statusUploadDocsForYourAppeal().should('exist');
  linkCheckYourAnswers().should('exist');
  statusCheckYourAnswers().should('exist');
})
Then('when a section has been completed they are able to see what has been completed or incompleted',()=> {
  applicationStatusText().should('exist');
  applicationStatusDetailedText().should('exist');
})

