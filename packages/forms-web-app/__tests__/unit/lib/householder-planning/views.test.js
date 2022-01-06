const { VIEW } = require('../../../../src/lib/householder-planning/views');

describe('/lib/householder-planning/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({
      HOUSEHOLDER_PLANNING: {
        ELIGIBILITY: {
          DATE_DECISION_DUE_HOUSEHOLDER:
            'householder-planning/eligibility/date-decision-due-householder',
          LISTED_BUILDING: 'householder-planning/eligibility/listed-building-householder',
          ENFORCEMENT_NOTICE: 'householder-planning/eligibility/enforcement-notice-householder',
          GRANTED_OR_REFUSED_HOUSEHOLDER:
            'householder-planning/eligibility/granted-or-refused-householder',
        },
      },
    });
  });
});
