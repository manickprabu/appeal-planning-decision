const express = require('express');
const fetchAppealMiddleware = require('../middleware/common/fetch-appeal');
const fetchExistingAppealReplyMiddleware = require('../middleware/common/fetch-existing-appeal-reply');

const router = express.Router();

const homeRouter = require('./home');
const filesRouter = require('./files');
const taskListRouter = require('./task-list');
const confirmAnswersRouter = require('./confirm-answers');
const accuracySubmissionRouter = require('./accuracy-submission');
const otherAppealsRouter = require('./other-appeals');
const extraConditionsRouter = require('./extra-conditions');
const { router: interestedPartiesRouter } = require('./interested-parties');
const { router: representationsRouter } = require('./representations');
const { router: notifyingPartiesRouter } = require('./notifying-parties');
const healthSafetyRouter = require('./health-safety');
const developmentPlanRouter = require('./development-plan');
const { router: uploadPlansRouter } = require('./upload-plans');
const { router: officersReportRouter } = require('./officers-report');
const { router: siteNoticesRouter } = require('./site-notices');
const { router: conservationAreaMapRouter } = require('./conservation-area-map');
const { router: planningHistoryRouter } = require('./planning-history');
const { router: otherPoliciesRouter } = require('./other-policies');
const { router: statutoryDevelopmentRouter } = require('./statutory-development');
const informationSubmittedRouter = require('./information-submitted');
const booleanQuestionRouter = require('./question-type/boolean');
const { router: supplementaryDocumentsRouter } = require('./supplementary-documents');
const alreadySubmittedRouter = require('./already-submitted');
const contactUsRouter = require('./contact-us');
const fullAppealRouter = require('./full-appeal');

router.use(contactUsRouter);
router.use(homeRouter);
router.use(filesRouter);
router.use(taskListRouter);
router.use(confirmAnswersRouter);
router.use(accuracySubmissionRouter);
router.use(otherAppealsRouter);
router.use(extraConditionsRouter);
router.use(interestedPartiesRouter);
router.use(representationsRouter);
router.use(notifyingPartiesRouter);
router.use(healthSafetyRouter);
router.use(developmentPlanRouter);
router.use(uploadPlansRouter);
router.use(officersReportRouter);
router.use(siteNoticesRouter);
router.use(conservationAreaMapRouter);
router.use(planningHistoryRouter);
router.use(otherPoliciesRouter);
router.use(statutoryDevelopmentRouter);
router.use(informationSubmittedRouter);
router.use(booleanQuestionRouter);
router.use(supplementaryDocumentsRouter);
router.use(alreadySubmittedRouter);

router.use(
  '/full-appeal/:id/questionnaire',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware],
  fullAppealRouter
);

module.exports = router;
