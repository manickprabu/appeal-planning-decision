const express = require('express');

const router = express.Router({ mergeParams: true });

const taskListRouter = require('./task-list');

router.use(taskListRouter);

module.exports = router;
