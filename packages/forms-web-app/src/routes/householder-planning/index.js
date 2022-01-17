/* eslint-disable import/no-unresolved */
const express = require('express');

const router = express.Router();

const eligibilityRouter = require('./eligibility');

router.use('/', eligibilityRouter);

module.exports = router;
