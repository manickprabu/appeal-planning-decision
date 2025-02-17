const express = require('express');
const fetchExistingAppealMiddleware = require('../../middleware/fetch-existing-appeal');
const typeOfPlanningApplicationController = require('../../controllers/full-appeal/type-of-planning-application');
const {
  rules: typeOfPlanningDepartmentValidationRules,
} = require('../../validators/full-appeal/type-of-planning-application');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const router = express.Router();

router.get(
  '/type-of-planning-application',
  [fetchExistingAppealMiddleware],
  typeOfPlanningApplicationController.getTypeOfPlanningApplication
);

router.post(
  '/type-of-planning-application',
  typeOfPlanningDepartmentValidationRules(),
  validationErrorHandler,
  typeOfPlanningApplicationController.postTypeOfPlanningApplication
);

module.exports = router;
