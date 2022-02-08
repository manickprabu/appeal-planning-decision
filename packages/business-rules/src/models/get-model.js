const householderAppeal = require('./householder-appeal');
const fullAppeal = require('./full-appeal');
const isValid = require('../validation/appeal/type/is-valid');
const { APPEAL_ID } = require('../constants');
const BusinessRulesError = require('../lib/business-rules-error');

const getModel = (appealType) => {
  if (appealType && !isValid(appealType)) {
    throw new BusinessRulesError(`${appealType} is not a valid appeal type`);
  }

  switch (appealType) {
    case APPEAL_ID.PLANNING_SECTION_78:
      return fullAppeal;
    default:
      return householderAppeal;
  }
};

module.exports = getModel;
