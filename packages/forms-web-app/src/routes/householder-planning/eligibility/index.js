const express = require('express');

const router = express.Router();

const listedBuildingHouseholderRouter = require('./listed-building-householder');
const grantedOrRefusedHouseholderRouter = require('./granted-or-refused-householder');

router.use(listedBuildingHouseholderRouter);
router.use(grantedOrRefusedHouseholderRouter);

module.exports = router;
