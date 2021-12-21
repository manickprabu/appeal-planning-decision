const { mockRes } = require('../../../../forms-web-app/__tests__/unit/mocks');
const controller = require('../../../src/controllers/proxy-controller');
const { mockReq } = require('../mocks');

describe('controllers/proxy-controller', () => {
  let req, res

  beforeEach(() => {
    req = mockReq()
    res = mockRes()
  })

  it('should process file sent via form data', async () => {
    const mockRequest = {
      ...req,
      files: {
        file: Buffer.from([])
      }
    };

    await controller.processFile(mockRequest, res);
    expect(req.send).toHaveBeenCalled()
  });

  it('should return error for file that has not been sent', async () => {
    const mockRequest = {
      ...req,
      files: {
        file: Buffer.from([])
      }
    };

    await controller.processFile(mockRequest, res);
    expect(req.send).toHaveBeenCalled()

  });
});
