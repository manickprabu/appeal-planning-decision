const { get, post } = require('./router-mock');
const involvesListedBuildingController = require('../../../src/controllers/involves-listed-building');
const fetchExistingAppealReplyMiddleware = require('../../../src/middleware/fetch-existing-appeal-reply');
const fetchAppealMiddleware = require('../../../src/middleware/fetch-appeal');
const alreadySubmittedMiddleware = require('../../../src/middleware/already-submitted');
const { validationErrorHandler } = require('../../../src/validators/validation-error-handler');
const { rules: involvesListedBuildingValidationRules } = require('../../../src/validators/involves-listed-building');

jest.mock('../../../src/validators/involves-listed-building');

describe('routes/listed-building', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/involves-listed-building');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith(
      `/appeal-questionnaire/:id/involves-listed-building`,
      [fetchAppealMiddleware, fetchExistingAppealReplyMiddleware, alreadySubmittedMiddleware],
      involvesListedBuildingController.getInvolvesListedBuilding
    );

    expect(post).toHaveBeenCalledWith(
      `/appeal-questionnaire/:id/involves-listed-building`,
      listedBuildingValidationRules(),
      validationErrorHandler,
      involvesListedBuildingController.postInvolvesListedBuilding
    );
  });
});
