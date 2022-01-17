const { use } = require('../../router-mock');

const listedBuildingHouseholderRouter = require('../../../../../src/routes/householder-planning/eligibility/listed-building-householder');
const dateDecisionDueHouseholderRouter = require('../../../../../src/routes/householder-planning/eligibility/date-decision-due-householder');
const grantedOrRefusedRouter = require('../../../../../src/routes/householder-planning/eligibility/granted-or-refused-householder');

describe('routes/householder-planning/eligibility/index', () => {
  beforeEach(() => {
    jest.resetModules();

    // eslint-disable-next-line global-require
    require('../../../../../src/routes/householder-planning/eligibility/index');
  });

  it('should define the expected routes', () => {
    expect(use).toHaveBeenCalledWith(listedBuildingHouseholderRouter);
    expect(use).toHaveBeenCalledWith(dateDecisionDueHouseholderRouter);
    expect(use).toHaveBeenCalledWith(grantedOrRefusedRouter);

    expect(use.mock.calls.length).toBe(4);
  });
});
