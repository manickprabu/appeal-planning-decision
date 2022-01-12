const { use } = require('../../router-mock');

const listedBuildingHouseholderRouter = require('../../../../../src/routes/householder-planning/eligibility/listed-building-householder');
const claimingCostsHouseholderRouter = require('../../../../../src/routes/householder-planning/eligibility/claiming-costs-householder');


describe('routes/full-appeal/index', () => {
  beforeEach(() => {
    jest.resetModules();

    // eslint-disable-next-line global-require
    require('../../../../../src/routes/householder-planning/eligibility/index');
  });

  it('should define the expected routes', () => {
    expect(use).toHaveBeenCalledWith(listedBuildingHouseholderRouter);
    expect(use).toHaveBeenCalledWith(claimingCostsHouseholderRouter);

    expect(use.mock.calls.length).toBe(2);
  });
});
