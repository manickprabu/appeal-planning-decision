const { body } = require('express-validator');
const { isAfter, endOfDay } = require('date-fns');
const dateInputValidation = require('../custom/date-input');

const rules = () => {
  return [
    ...(dateInputValidation('decision-date', 'the date the decision was due') || []),
    body('decision-date').custom((value) => {
      const today = endOfDay(new Date());

      if (isAfter(new Date(value), today)) {
        throw new Error('The date the decision was due must be today or in the past');
      }

      return true;
    }),
  ];
};

module.exports = {
  rules,
};
