const express = require('express');

const grantedOrRefusedRouter = require('./granted-or-refused');

const router = express.Router();

router.use(grantedOrRefusedRouter);

module.exports = router;
