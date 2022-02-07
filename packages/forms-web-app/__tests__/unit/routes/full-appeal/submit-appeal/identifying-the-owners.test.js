const { get, post } = require('../../router-mock');
const {
  getIdentifyingTheOwners,
  postIdentifyingTheOwners,
} = require('../../../../../src/controllers/full-appeal/submit-appeal/identifying-the-owners');
const fetchExistingAppealMiddleware = require('../../../../../src/middleware/fetch-existing-appeal');
const {
  validationErrorHandler,
} = require('../../../../../src/validators/validation-error-handler');
const {
  rules: identifyingTheOwnersValidationRules,
} = require('../../../../../src/validators/full-appeal/identifying-the-owners');

jest.mock('../../../../../src/middleware/fetch-existing-appeal');

describe('routes/full-appeal/submit-appeal/identifying-the-owners', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../../src/routes/full-appeal/submit-appeal/identifying-the-owners');
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      '/submit-appeal/identifying-the-owners',
      [fetchExistingAppealMiddleware],
      getIdentifyingTheOwners
    );
    expect(post).toHaveBeenCalledWith(
      '/submit-appeal/identifying-the-owners',
      identifyingTheOwnersValidationRules,
      validationErrorHandler,
      postIdentifyingTheOwners
    );
  });
});
