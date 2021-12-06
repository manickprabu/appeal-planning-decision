const { get, post } = require('../router-mock');
const anyOfFollowingController = require('../../../../src/controllers/before-you-start/any-of-following');
const {
  rules: anyOfFollowingRules,
} = require('../../../../src/validators/before-you-start/any-of-following');

describe('routes/before-you-start/any-of-following', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../../src/routes/before-you-start/any-of-following');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/', anyOfFollowingController.getAnyOfFollowing);
    expect(post).toHaveBeenCalledWith(
      '/',
      anyOfFollowingRules(),
      anyOfFollowingController.postAnyOfFollowing
    );
  });
});
