const express = require('express');
const outOfTimeController = require('../../controllers/full-planning/out-of-time-shutter-page');

const router = express.Router();
router.get('/you-cannot-appeal', outOfTimeController.getOutOfTimeShutterPage);

module.exports = router;
