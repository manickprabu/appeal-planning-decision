const { get } = require('../router-mock');

const useExistingServiceEnforcementNotice = require('../../../../src/controllers/full-appeal/use-existing-service-enforcement-notice');

describe('routes/full-appeal/use-existing-service-enforcement-notice', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/full-appeal/use-existing-service-enforcement-notice');
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/use-existing-service-enforcement-notice',
      useExistingServiceEnforcementNotice.getUseExistingServiceEnforcementNotice
    );
  });
});
