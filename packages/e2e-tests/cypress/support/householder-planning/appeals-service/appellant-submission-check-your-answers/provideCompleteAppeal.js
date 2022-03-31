import { clickSaveAndContinue } from '../appeal-navigation/clickSaveAndContinue';
import { provideDetailsName } from '../appellant-submission-your-details/provideDetailsName';
import { provideDetailsEmail } from '../appellant-submission-your-details/provideDetailsEmail';
import { provideNameOfOriginalApplicant } from '../appellant-submission-your-details/provideNameOfOriginalApplicant';
import { providePlanningApplicationNumber } from '../appellant-submission-planning-application-number/providePlanningApplicationNumber';
import { uploadPlanningApplicationFile } from '../appellant-submission-upload-application/uploadPlanningApplicationFile';
import { uploadDecisionLetterFile } from '../appellant-submission-decision-letter/uploadDecisionLetterFile';
import { checkNoSensitiveInformation } from '../appeal-statement-submission/checkNoSensitiveInformation';
import { uploadAppealStatementFile } from '../appeal-statement-submission/uploadAppealStatementFile';
import { uploadSupportingDocuments } from '../appellant-submission-supporting-documents/uploadSupportingDocuments';
import { answerOwnsTheWholeAppeal } from '../appeal-submission-appeal-site-ownership/answerOwnsTheWholeAppeal';
import { answerDoesNotOwnTheWholeAppeal } from '../appeal-submission-appeal-site-ownership/answerDoesNotOwnTheWholeAppeal';
import { answerHaveToldOtherOwnersAppeal } from '../appeal-submission-appeal-site-ownership/answerHaveToldOtherOwnersAppeal';
import { answerHaveNotToldOtherOwnersAppeal } from '../appeal-submission-appeal-site-ownership/answerHaveNotToldOtherOwnersAppeal';
import { answerCanSeeTheWholeAppeal } from '../appeal-submission-access-to-appeal-site/answerCanSeeTheWholeAppeal';
import { answerCannotSeeTheWholeAppeal } from '../appeal-submission-access-to-appeal-site/answerCannotSeeTheWholeAppeal';
import { provideMoreDetails } from '../appeal-submission-access-to-appeal-site/provideMoreDetails';
import { answerSiteHasIssues } from '../appeal-submission-site-health-and-safety-issues/answerSiteHasIssues';
import { provideSafetyIssuesConcerns } from '../appeal-submission-site-health-and-safety-issues/provideSafetyIssuesConcerns';
import { answerSiteHasNoIssues } from '../appeal-submission-site-health-and-safety-issues/answerSiteHasNoIssues';
import { provideAnswerYes } from '../appellant-submission-your-details/provideAnswerYes';
import { provideAnswerNo } from '../appellant-submission-your-details/provideAnswerNo';
import { goToAppealsPage } from '../../../common/go-to-page/goToAppealsPage';
import { pageURLAppeal } from '../../../../integration/common/householder-planning/appeals-service/pageURLAppeal';
import { linkYourDetails } from '../page-objects/task-list-po';
import {provideAddressLine1} from "../../../common/appeal-submission-appeal-site-address/provideAddressLine1";
import {provideAddressLine2} from "../../../common/appeal-submission-appeal-site-address/provideAddressLine2";
import {provideTownOrCity} from "../../../common/appeal-submission-appeal-site-address/provideTownOrCity";
import {provideCounty} from "../../../common/appeal-submission-appeal-site-address/provideCounty";
import {providePostcode} from "../../../common/appeal-submission-appeal-site-address/providePostcode";


export const provideCompleteAppeal = (appeal, options = {}) => {
 cy.url().should('contain', pageURLAppeal.goToTaskListPage );
  linkYourDetails().click();

cy.url().should('contain',pageURLAppeal.goToWhoAreYouPage);

  if (appeal.aboutYouSection.yourDetails.isOriginalApplicant) {
    provideAnswerYes();
  } else {
    provideAnswerNo();
  }
  clickSaveAndContinue();

  provideDetailsName(appeal.aboutYouSection.yourDetails.name);
  provideDetailsEmail(appeal.aboutYouSection.yourDetails.email);
  clickSaveAndContinue();

  if (!appeal.aboutYouSection.yourDetails.isOriginalApplicant) {
   provideNameOfOriginalApplicant(appeal.aboutYouSection.yourDetails.appealingOnBehalfOf);
   clickSaveAndContinue();
  }

  goToAppealsPage(pageURLAppeal.goToPlanningApplicationNumberPage);
  providePlanningApplicationNumber(appeal.requiredDocumentsSection.applicationNumber);

  goToAppealsPage(pageURLAppeal.goToPlanningApplicationSubmission);
  uploadPlanningApplicationFile(
    appeal.requiredDocumentsSection.originalApplication.uploadedFile.name,
  );
  clickSaveAndContinue();

  goToAppealsPage(pageURLAppeal.goToDecisionLetterPage);
  uploadDecisionLetterFile(appeal.requiredDocumentsSection.decisionLetter.uploadedFile.name);
  clickSaveAndContinue();

  goToAppealsPage(pageURLAppeal.goToAppealStatementSubmission);
  checkNoSensitiveInformation();
  uploadAppealStatementFile(appeal.yourAppealSection.appealStatement.uploadedFile.name);
  clickSaveAndContinue();

  if (appeal.yourAppealSection.otherDocuments.uploadedFiles.length > 0) {
   goToAppealsPage(pageURLAppeal.goToSupportingDocumentsPage);
   uploadSupportingDocuments(
      appeal.yourAppealSection.otherDocuments.uploadedFiles.map((file) => file.name),
    );
   clickSaveAndContinue();
  }

 //goToSiteAddressPage();
  goToAppealsPage(pageURLAppeal.goToSiteAddressPage);

 provideAddressLine1(appeal.appealSiteSection.siteAddress.addressLine1);
 provideAddressLine2(appeal.appealSiteSection.siteAddress.addressLine2);
 provideTownOrCity(appeal.appealSiteSection.siteAddress.town);
 provideCounty(appeal.appealSiteSection.siteAddress.county);
 providePostcode(appeal.appealSiteSection.siteAddress.postcode);
 clickSaveAndContinue();

  goToAppealsPage(pageURLAppeal.goToWholeSiteOwnerPage);
  if (appeal.appealSiteSection.siteOwnership.ownsWholeSite) {
   answerOwnsTheWholeAppeal();
   clickSaveAndContinue();
  } else {
   answerDoesNotOwnTheWholeAppeal();
   clickSaveAndContinue();

    if (appeal.appealSiteSection.siteOwnership.haveOtherOwnersBeenTold) {
     answerHaveToldOtherOwnersAppeal();
    } else {
     answerHaveNotToldOtherOwnersAppeal();
    }
   clickSaveAndContinue();
  }

  goToAppealsPage(pageURLAppeal.goToSiteAccessPage);
  if (appeal.appealSiteSection.siteAccess.canInspectorSeeWholeSiteFromPublicRoad) {
   answerCanSeeTheWholeAppeal();
  } else {
   answerCannotSeeTheWholeAppeal();
   provideMoreDetails(appeal.appealSiteSection.siteAccess.howIsSiteAccessRestricted);
  }
  clickSaveAndContinue();

  goToAppealsPage(pageURLAppeal.goToHealthAndSafetyPage);
  if (appeal.appealSiteSection.healthAndSafety.hasIssues) {
   answerSiteHasIssues();
   provideSafetyIssuesConcerns(appeal.appealSiteSection.healthAndSafety.healthAndSafetyIssues);
  } else {
   answerSiteHasNoIssues();
  }
  clickSaveAndContinue();
};
