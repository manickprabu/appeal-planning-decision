const { isInThePast, isWithinDeadlinePeriod } = require('./appeal/decision-date');
const conditionalText = require('./common/conditional-text');
const { allOfValidOptions, allOfSelectedOptions } = require('./common/array');

module.exports = {
  appeal: {
    decisionDate: {
      isInThePast,
      isWithinDeadlinePeriod,
    },
    conditionalText,
    allOfValidOptions,
    allOfSelectedOptions,
  },
};
