const express = require('express');
const localPlanningDepartmentRouter = require('./local-planning-department');
const typeOfPlanningApplicationRouter = require('./type-of-planning-application');
const useDiffrentServiceRouter = require('./use-a-different-service');

const router = express.Router();
router.use(localPlanningDepartmentRouter);
router.use(typeOfPlanningApplicationRouter);
router.use(useDiffrentServiceRouter);

module.exports = router;
