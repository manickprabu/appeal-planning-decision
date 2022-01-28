const express = require('express');
const taskListRouter = require('./task-list');
const checkAnswersRouter = require('./check-answers');
const contactDetailsRouter = require('./contact-details');
const applicationFormRouter = require('./application-form');
const applicationNumberRouter = require('./application-number');
const designAccessStatementRouter = require('./design-access-statement');
const designAccessStatementSubmittedRouter = require('./design-access-statement-submitted');
const appealSiteAddressRouter = require('./appeal-site-address');
const applicantNameRouter = require('./applicant-name');
const decisionLetterRouter = require('./decision-letter');
const appealStatementRouter = require('./appeal-statement');
const originalApplicantRouter = require('./original-applicant');
const ownSomeOfTheLandRouter = require('./own-some-of-the-land');
const ownAllTheLandRouter = require('./own-all-the-land');
const knowTheOwnersRouter = require('./know-the-owners');
const agriculturalHoldingRouter = require('./agricultural-holding');
const areYouATenantRouter = require('./are-you-a-tenant');
const otherTenantsRouter = require('./other-tenants');
const declarationRouter = require('./declaration');
const appealSubmittedRouter = require('./appeal-submitted');
const declarationInformationRouter = require('./declaration-information');
const visibleFromRoadRouter = require('./visible-from-road');

const router = express.Router();

router.use(taskListRouter);
router.use(checkAnswersRouter);
router.use(contactDetailsRouter);
router.use(applicationFormRouter);
router.use(applicationNumberRouter);
router.use(designAccessStatementRouter);
router.use(designAccessStatementSubmittedRouter);
router.use(appealSiteAddressRouter);
router.use(applicantNameRouter);
router.use(decisionLetterRouter);
router.use(appealStatementRouter);
router.use(originalApplicantRouter);
router.use(ownSomeOfTheLandRouter);
router.use(ownAllTheLandRouter);
router.use(knowTheOwnersRouter);
router.use(agriculturalHoldingRouter);
router.use(areYouATenantRouter);
router.use(otherTenantsRouter);
router.use(declarationRouter);
router.use(appealSubmittedRouter);
router.use(declarationInformationRouter);
router.use(visibleFromRoadRouter);

module.exports = router;
