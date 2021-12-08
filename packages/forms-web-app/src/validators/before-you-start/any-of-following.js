const { body } = require('express-validator');

const rules = () => {
  return [
    body('option')
      .custom((value, { req }) => {
        const { option } = req.body;

        if (typeof option === 'undefined' || option === '') {
          throw new Error('Option has not been selected');
        }

        return option;
      })
      .withMessage('Select if your appeal is about any of the following'),
  ];
};

module.exports = {
  rules,
};
