/* eslint-disable import/no-unresolved */
const express = require('express');

const listedBuildingHouseholderRouter = require('./listed-building-householder');

const router = express.Router();

router.use(listedBuildingHouseholderRouter);

module.exports = router;
