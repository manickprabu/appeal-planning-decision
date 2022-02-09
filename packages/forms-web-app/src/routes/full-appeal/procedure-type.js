const express = require('express');

const procedureTypeController = require('../../controllers/full-appeal/procedure-type');
const fetchExistingAppealMiddleware = require('../../middleware/fetch-existing-appeal');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: decisionDateDueValidationRules,
} = require('../../validators/full-appeal/procedure-type');

const router = express.Router();

router.get(
  '/procedure-type',
  [fetchExistingAppealMiddleware],
  procedureTypeController.getProcedureType
);

router.post(
  '/procedure-type',
  [fetchExistingAppealMiddleware],
  decisionDateDueValidationRules(),
  validationErrorHandler,
  procedureTypeController.postProcedureType
);

module.exports = router;
