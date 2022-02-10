const express = require('express');

const procedureTypeController = require('../controllers/procedure-type');
const fetchExistingAppealMiddleware = require('../../../forms-web-app/src/middleware/fetch-existing-appeal');
const {
  validationErrorHandler,
} = require('../../../forms-web-app/src/validators/validation-error-handler');
const { rules: decisionDateDueValidationRules } = require('../validators/procedure-type');

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
