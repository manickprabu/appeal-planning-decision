const express = require('express');

const router = express.Router();

const listedBuildingHouseholderRouter = require('./listed-building-householder');
const claimingCostsHouseholderRouter = require('./claiming-costs-householder');

router.use(listedBuildingHouseholderRouter);
router.use(claimingCostsHouseholderRouter);

module.exports = router;
