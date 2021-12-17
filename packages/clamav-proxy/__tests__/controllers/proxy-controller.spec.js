const controller = require('../../src/controllers/proxy-controller');

describe('controllers/proxy-controller', () => {
  it('should process file sent via form data', async () => {
    const req = {};
    const res = {};

    await controller.processFile(req, res);
  });

  it('should return error for file that has not been sent', async () => {
    const req = {};
    const res = {};

    await controller.processFile(req, res);
  });
});
