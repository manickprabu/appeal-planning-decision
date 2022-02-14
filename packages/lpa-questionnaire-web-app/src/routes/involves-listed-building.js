const express = require('express');
const involvesListedBuildingController = require('../controllers/involves-listed-building');
const fetchExistingAppealReplyMiddleware = require('../middleware/fetch-existing-appeal-reply');
const fetchAppealMiddleware = require('../middleware/fetch-appeal');
const { validationErrorHandler } = require('../validators/validation-error-handler');
const {
  rules: involvesListedBuildingValidationRules,
} = require('../validators/involves-listed-building');
const alreadySubmittedMiddleware = require('../middleware/already-submitted');

const router = express.Router();

router.get(
  '/appeal-questionnaire/:id/involves-listed-building',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  involvesListedBuildingController.getInvolvesListedBuilding
);

router.post(
  '/appeal-questionnaire/:id/involves-listed-building',
  involvesListedBuildingValidationRules(),
  validationErrorHandler,
  involvesListedBuildingController.postInvolvesListedBuilding
);

module.exports = router;
