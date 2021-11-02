jest.mock('../../../src/validators/schema/magiclinkDataValidator');

const magicLinkDataValidator = require('../../../src/validators/schema/magiclinkDataValidator');
const validateMagicLinkPayload = require('../../../src/middleware/validate-magiclink-payload');
const { mockReq, mockRes } = require('../mocks');
const magicLinkData = require('../../resources/magicLinkData.json');
const ApiError = require('../../../src/error/apiError');

const req = mockReq();
req.body = magicLinkData;
const res = mockRes();
const next = jest.fn();

describe('middleware.validate-magiclink-payload', () => {
  describe('with valid payload', () => {
    it('should call the next function', async () => {
      magicLinkDataValidator.validate.mockResolvedValue(magicLinkData);

      await validateMagicLinkPayload(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('with invalid payload', () => {
    it('should call the next function with ApiError', async () => {
      const validationError = new Error('ValidationError');
      magicLinkDataValidator.validate.mockRejectedValue(validationError);

      await validateMagicLinkPayload(req, res, next);

      expect(next).toHaveBeenCalledWith(ApiError.badRequest(validationError));
    });
  });
});
