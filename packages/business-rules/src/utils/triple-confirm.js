const { STANDARD_TRIPLE_CONFIRM_OPTIONS } = require('../constants');

const buildTripleConfirmMessage = (context) =>
  `You must have ${JSON.stringify(STANDARD_TRIPLE_CONFIRM_OPTIONS)} for ${
    context.path
  } but you have ${JSON.stringify(context.value)}`;

const validateTripleConfirm = (value) => {
  if (Array.isArray(value)) {
    return STANDARD_TRIPLE_CONFIRM_OPTIONS.every((item) => value.includes(item));
  }
  return true;
};

module.exports = {
  buildTripleConfirmMessage,
  validateTripleConfirm,
};
