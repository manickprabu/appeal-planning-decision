const express = require('express');

const grantedOrRefusedPermissionController = require('../../controllers/eligibility/granted-or-refused-permission');
const fetchExistingAppealMiddleware = require('../../middleware/fetch-existing-appeal');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: householderPlanningPermissionStatusRules,
} = require('../../validators/eligibility/granted-or-refused-permission');

const router = express.Router();

/* Get eligibility granted-or-refused-permission out page */
router.get(
  '/granted-or-refused-permission-out',
  grantedOrRefusedPermissionController.getGrantedOrRefusedPermissionOut
);

/* Get eligibility granted-or-refused-permission input page */
router.get(
  '/granted-or-refused-permission',
  fetchExistingAppealMiddleware,
  grantedOrRefusedPermissionController.getGrantedOrRefusedPermission
);

/* Post eligibility granted-or-refused-permission */
router.post(
  '/granted-or-refused-permission',
  householderPlanningPermissionStatusRules(),
  validationErrorHandler,
  grantedOrRefusedPermissionController.postGrantedOrRefusedPermission
);

module.exports = router;
