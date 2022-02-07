const express = require('express');
const {
  getIdentifyingTheOwners,
  postIdentifyingTheOwners,
} = require('../../../controllers/full-appeal/submit-appeal/identifying-the-owners');
const fetchExistingAppealMiddleware = require('../../../middleware/fetch-existing-appeal');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: identifyingTheOwnersValidationRules,
} = require('../../../validators/full-appeal/identifying-the-owners');

const router = express.Router();

const controllerUrl = '/submit-appeal/identifying-the-owners';

router.get(controllerUrl, [fetchExistingAppealMiddleware], getIdentifyingTheOwners);
router.post(
  controllerUrl,
  identifyingTheOwnersValidationRules,
  validationErrorHandler,
  postIdentifyingTheOwners
);

module.exports = router;
