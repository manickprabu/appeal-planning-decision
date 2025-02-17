const express = require('express');
const fetchAppealMiddleware = require('../middleware/common/fetch-appeal');
const fetchExistingAppealReplyMiddleware = require('../middleware/common/fetch-existing-appeal-reply');
const confirmAnswersController = require('../controllers/confirm-answers');
const alreadySubmittedMiddleware = require('../middleware/already-submitted');

const router = express.Router();

router.get(
  '/appeal-questionnaire/:id/confirm-answers',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  confirmAnswersController
);

module.exports = router;
