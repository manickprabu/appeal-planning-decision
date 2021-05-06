const express = require('express');

const csvTestController = require('../controllers/csv-test');

const router = express.Router();

router.get('/', csvTestController.get);

module.exports = router;
