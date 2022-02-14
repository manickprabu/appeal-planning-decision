const { body } = require('express-validator');

const rules = () => {
  return [
    body('involves-listed-building')
      .notEmpty()
      .withMessage('Select yes if the proposed development involves a listed building')
      .bail(),
  ];
};

module.exports = {
  rules,
};
