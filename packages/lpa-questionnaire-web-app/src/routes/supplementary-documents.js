const express = require('express');
const { documentTypes } = require('@pins/common');
const addSupplementaryDocumentController = require('../controllers/supplementary-documents/add-supplementary-document');
const uploadedDocumentsController = require('../controllers/supplementary-documents/uploaded-documents');
const deleteSupplementaryDocumentController = require('../controllers/supplementary-documents/delete-supplementary-document');
const fetchExistingAppealReplyMiddleware = require('../middleware/common/fetch-existing-appeal-reply');
const fetchAppealMiddleware = require('../middleware/common/fetch-appeal');
const reqFilesToReqBodyFilesMiddleware = require('../middleware/req-files-to-req-body-files');
const combineDateInputsMiddleware = require('../middleware/combine-date-inputs');
const { validationErrorHandler } = require('../validators/validation-error-handler');
const supplementaryDocumentsValidationRules = require('../validators/supplementary-documents');
const checkIfSupplementaryDocuments = require('../middleware/check-if-supplementary-documents');
const alreadySubmittedMiddleware = require('../middleware/already-submitted');

const router = express.Router();

const getConfig = (req, res, next) => {
  req.documentType = documentTypes.supplementaryDocuments.name;

  next();
};

router.get(
  '/appeal-questionnaire/:id/supplementary-documents',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  addSupplementaryDocumentController.getAddDocument
);

router.post(
  '/appeal-questionnaire/:id/supplementary-documents',
  reqFilesToReqBodyFilesMiddleware('documents'),
  combineDateInputsMiddleware,
  supplementaryDocumentsValidationRules(),
  validationErrorHandler,
  getConfig,
  addSupplementaryDocumentController.postAddDocument
);

router.get(
  '/appeal-questionnaire/:id/supplementary-documents/uploaded-documents',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  checkIfSupplementaryDocuments,
  uploadedDocumentsController.getUploadedDocuments
);

router.get(
  '/appeal-questionnaire/:id/supplementary-documents/delete-document',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  deleteSupplementaryDocumentController.getDeleteDocument
);

router.post(
  '/appeal-questionnaire/:id/supplementary-documents/delete-document',
  [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
  deleteSupplementaryDocumentController.postDeleteDocument
);

module.exports = {
  router,
  getConfig,
};
