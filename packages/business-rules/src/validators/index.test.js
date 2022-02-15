const index = require('./index');
const { isInThePast, isWithinDeadlinePeriod } = require('./appeal/decision-date');
const conditionalText = require('./common/conditional-text');
const { allOf } = require('./common/array');

describe('validators/index', () => {
  it(`should export the expected data shape`, () => {
    expect(index).toEqual({
      appeal: {
        decisionDate: {
          isInThePast,
          isWithinDeadlinePeriod,
        },
        conditionalText,
        allOf,
      },
    });
  });
});
