const { use } = require('../../router-mock');

const grantedOrRefusedRouter = require('../../../../../src/routes/householder-planning/eligibility/granted-or-refused');

describe('routes/householder-planning/index', () => {
  beforeEach(() => {
    jest.resetModules();

    // eslint-disable-next-line global-require
    require('../../../../../src/routes/householder-planning/eligibility/index');
  });

  it('should define the expected routes', () => {
    expect(use).toHaveBeenCalledWith(grantedOrRefusedRouter);

    expect(use.mock.calls.length).toBe(1);
  });
});
