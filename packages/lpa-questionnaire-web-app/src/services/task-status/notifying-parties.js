const { COMPLETED, NOT_STARTED } = require('./task-statuses');

module.exports = (appealReply) => {
  if (!appealReply) return null;

  const { uploadedFiles = [] } = appealReply.optionalDocumentsSection?.interestedPartiesAppeal;

  return uploadedFiles.length ? COMPLETED : NOT_STARTED;
};
