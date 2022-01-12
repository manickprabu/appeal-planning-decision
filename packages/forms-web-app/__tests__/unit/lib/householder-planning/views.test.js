const { VIEW } = require('../../../../src/lib/householder-planning/views');

describe('lib/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({
      HOUSEHOLDER_PLANNING: {
        ELIGIBILITY: {
          LISTED_BUILDING: 'householder-planning/eligibility/listed-building-householder',
          ENFORCEMENT_NOTICE: 'householder-planning/eligibility/enforcement-notice-householder',
          CLAIMING_COSTS: 'householder-planning/eligibility/claiming-costs-householder',
          HAS_APPEAL_FORM: 'householder-planning/eligibility/results-householder',
        },
      },
    });
  });
});
