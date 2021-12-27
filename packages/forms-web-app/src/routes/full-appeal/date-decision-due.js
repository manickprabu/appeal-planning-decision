const express = require('express');

const dateDecisionDueController = require('../../controllers/full-planning/date-decision-due');
const fetchExistingAppealMiddleware = require('../../middleware/fetch-existing-appeal');
const combineDateInputsMiddleware = require('../../middleware/combine-date-inputs');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: decisionDateDueValidationRules,
} = require('../../validators/full-planning/date-decision-due');

const router = express.Router();

router.get(
  '/date-decision-due',
  [fetchExistingAppealMiddleware],
  dateDecisionDueController.getDateDecisionDue
);

router.post(
  '/date-decision-due',
  [fetchExistingAppealMiddleware, combineDateInputsMiddleware],
  decisionDateDueValidationRules('decision-date', 'the date the decision was due'),
  validationErrorHandler,
  dateDecisionDueController.postDateDecisionDue
);

module.exports = router;
