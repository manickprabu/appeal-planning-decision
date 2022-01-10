const express = require('express');

const enforcementNoticeRouter = require('./enforcement-notice-householder');

const router = express.Router();

router.use(enforcementNoticeRouter);

module.exports = router;
