const { mockRes } = require('../../../../forms-web-app/__tests__/unit/mocks');
const controller = require('../../../src/controllers/proxy-controller');
const { mockReq } = require('../mocks');

describe('controllers/proxy-controller', () => {
  let req; 
  let res;

  beforeEach(() => {
    req = mockReq()
    res = mockRes()

    jest.resetAllMocks();
  })

  it('should process file sent via form data', async () => {
    const mockRequest = {
      ...req,
      files: {
        file: Buffer.from([])
      }
    };

    await controller.processFile(mockRequest, res);
    expect(res.send).toHaveBeenCalledWith({
      file: "",
      isInfected: true,
      viruses: []
    })
  });

  it('should return error for file that has not been sent', async () => {
    const mockRequest = {
      ...req,
      files: {
        file: undefined
      }
    };

    await controller.processFile(mockRequest, res);
    expect(res.send).toHaveBeenCalled()

  });
});
