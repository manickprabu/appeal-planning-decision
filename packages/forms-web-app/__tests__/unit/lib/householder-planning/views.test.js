const { VIEW } = require('../../../../src/lib/householder-planning/views');

describe('/lib/householder-planning/views', () => {
  it('should have the expected defined constants', () => {
    expect(VIEW).toEqual({
      HOUSEHOLDER_PLANNING: {
        ELIGIBILITY: {
          ENFORCEMENT_NOTICE_HOUSEHOLDER:
            'householder-planning/eligibility/enforcement-notice-householder',
        },
      },
    });
  });
});
