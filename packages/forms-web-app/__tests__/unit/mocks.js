jest.mock('../../src/lib/logger');

const {
  constants: { APPEAL_ID },
  models,
} = require('@pins/business-rules');
const logger = require('../../src/lib/logger');

const model = models.getModel(APPEAL_ID.HOUSEHOLDER);

const mockReq = (appeal = model) => ({
  cookies: {},
  log: logger,
  params: {},
  session: {
    appeal,
  },
});

const mockRes = () => ({
  clearCookie: jest.fn(),
  cookie: jest.fn(),
  locals: jest.fn(),
  redirect: jest.fn(),
  render: jest.fn(),
  sendStatus: jest.fn(),
  status: jest.fn(),
});

module.exports = {
  mockReq,
  mockRes,
};
