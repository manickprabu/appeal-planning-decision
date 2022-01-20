const express = require('express');

const router = express.Router();

const claimingCostsHouseholderRouter = require('./claiming-costs-householder');
const enforcementNoticeRouter = require('./enforcement-notice-householder');
const grantedOrRefusedRouter = require('./granted-or-refused-householder');
const listedBuildingHouseholderRouter = require('./listed-building-householder');
const decisionDateHouseholderRouter = require('./decision-date-householder');

router.use(claimingCostsHouseholderRouter);
router.use(enforcementNoticeRouter);
router.use(grantedOrRefusedRouter);
router.use(listedBuildingHouseholderRouter);
router.use(decisionDateHouseholderRouter);

module.exports = router;
