const express = require('express');
const taskListRouter = require('./task-list');
const checkAnswersRouter = require('./check-answers');
const contactDetailsRouter = require('./contact-details');
const applicationFormRouter = require('./application-form');
const applicationNumberRouter = require('./application-number');

const router = express.Router();

router.use(taskListRouter);
router.use(checkAnswersRouter);
router.use(contactDetailsRouter);
router.use(applicationFormRouter);
router.use(applicationNumberRouter);

module.exports = router;
