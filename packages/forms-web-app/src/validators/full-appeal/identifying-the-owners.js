const { body } = require('express-validator');

const rules = [
  body('identifying-the-owners')
    .notEmpty()
    .withMessage(`Confirm if you've attempted to identify the landowners`)
    .bail()
    .equals('i-agree'),
];

module.exports = {
  rules,
};
