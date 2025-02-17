const express = require('express');
const localPlanningDepartmentRouter = require('./local-planning-department');
const typeOfPlanningApplicationRouter = require('./type-of-planning-application');
const anyOfFollowingRouter = require('./any-of-following');
const grantedOrRefusedRouter = require('./granted-or-refused');
const useADifferentServiceRouter = require('./use-a-different-service');
const outOfTimeRouter = require('./out-of-time');
const enforcementNoticeRouter = require('./enforcement-notice');
const decisionDateRouter = require('./decision-date');
const dateDecisionDueRouter = require('./date-decision-due');
const priorApprovalExistingHomeRouter = require('./prior-approval-existing-home');

const router = express.Router();

router.use(localPlanningDepartmentRouter);
router.use(typeOfPlanningApplicationRouter);
router.use(anyOfFollowingRouter);
router.use(grantedOrRefusedRouter);
router.use(useADifferentServiceRouter);
router.use(outOfTimeRouter);
router.use(enforcementNoticeRouter);
router.use(decisionDateRouter);
router.use(dateDecisionDueRouter);
router.use(priorApprovalExistingHomeRouter);

module.exports = router;
