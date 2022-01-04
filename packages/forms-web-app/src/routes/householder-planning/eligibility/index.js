const express = require('express');

const router = express.Router();

const listedBuildingHouseholderRouter = require('./listed-building-householder');
const grantedOrRefusedRouter = require('./granted-or-refused');

router.use(listedBuildingHouseholderRouter);
router.use(grantedOrRefusedRouter);

module.exports = router;
