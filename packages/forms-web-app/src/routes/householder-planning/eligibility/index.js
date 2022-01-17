const express = require('express');

const router = express.Router();

const dateDecisionDueHouseholderRouter = require('./date-decision-due-householder');
const listedBuildingHouseholderRouter = require('./listed-building-householder');
const enforcementNoticeRouter = require('./enforcement-notice-householder');
const grantedOrRefusedRouter = require('./granted-or-refused-householder');

router.use(listedBuildingHouseholderRouter);
router.use(enforcementNoticeRouter);
router.use(grantedOrRefusedRouter);
router.use(dateDecisionDueHouseholderRouter);

module.exports = router;
