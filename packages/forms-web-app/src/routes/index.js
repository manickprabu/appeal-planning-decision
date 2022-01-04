const express = require('express');

const router = express.Router();

const appellantSubmissionRouter = require('./appellant-submission');
const fullPlanningAppellantSubmissionRouter = require('./full-planning/full-appeal');
const eligibilityRouter = require('./eligibility');
const homeRouter = require('./home');
const fullPlanningEligibilityRouter = require('./full-planning');
const householderPlanningEligibilityRouter = require('./householder-planning/eligibility');
const cookieRouter = require('./cookies');
const guidancePagesRouter = require('./guidance-pages');
const yourPlanningAppealRouter = require('./your-planning-appeal');
const checkDecisionDateDeadline = require('../middleware/check-decision-date-deadline');

router.use('/', homeRouter);
router.use(guidancePagesRouter);
router.use('/cookies', cookieRouter);
router.use('/appellant-submission', checkDecisionDateDeadline, appellantSubmissionRouter);
router.use('/full-appeal', checkDecisionDateDeadline, fullPlanningAppellantSubmissionRouter);
router.use('/eligibility', checkDecisionDateDeadline, eligibilityRouter);
router.use('/your-planning-appeal', yourPlanningAppealRouter);
router.use('/before-you-start', fullPlanningEligibilityRouter);
router.use('/before-you-start', householderPlanningEligibilityRouter);

module.exports = router;
