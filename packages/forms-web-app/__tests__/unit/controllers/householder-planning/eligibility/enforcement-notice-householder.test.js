const appeal = require('@pins/business-rules/test/data/householder-appeal');
const enforcementNoticeController = require('../../../../../src/controllers/householder-planning/eligibility/enforcement-notice-householder');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const {
  VIEW: {
    HOUSEHOLDER_PLANNING: {
      ELIGIBILITY: { ENFORCEMENT_NOTICE_HOUSEHOLDER: currentPage },
    },
  },
} = require('../../../../../src/lib/householder-planning/views');
const getPreviousPagePath = require('../../../../../src/lib/get-previous-page-path');
const logger = require('../../../../../src/lib/logger');
const { mockReq, mockRes } = require('../../../mocks');

const navigationPages = {
  nextPage: '/before-you-start/claiming-costs-householder',
  shutterPage: '/before-you-start/use-a-different-service',
  previousPage: '/before-you-start/decision-date-householder',
};

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/lib/logger');
jest.mock('../../../../../src/lib/get-previous-page-path');

describe('controllers/householder-planning/eligibility/enforcement-notice-householder', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq(appeal);
    res = mockRes();

    appeal.eligibility.appealType = '1001';
    appeal.eligibility.applicationDecision = 'granted';

    getPreviousPagePath.mockImplementation(() => {
      return '/before-you-start/decision-date-householder';
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getEnforcementNoticeHouseholder', () => {
    it('should call the correct template', () => {
      req.session.appeal.appealType = '1001';
      req.session.appeal.eligibility.applicationDecision = 'granted';

      enforcementNoticeController.getEnforcementNoticeHouseholder(req, res);

      expect(res.render).toHaveBeenCalledWith(currentPage, {
        enforcementNotice: appeal.eligibility.enforcementNotice,
        previousPage: navigationPages.previousPage,
      });
    });
  });

  describe('postEnforcementNoticeHouseholder', () => {
    it('should re-render the template with errors if there is any validation error', async () => {
      const mockRequest = {
        ...req,
        body: {
          'enforcement-notice': 'bad value',
          errors: { a: 'b' },
          errorSummary: [{ text: 'There were errors here', href: '#' }],
        },
      };

      await enforcementNoticeController.postEnforcementNoticeHouseholder(mockRequest, res);

      expect(createOrUpdateAppeal).not.toHaveBeenCalled();

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(currentPage, {
        enforcementNotice: appeal.eligibility.enforcementNotice,
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
        previousPage: navigationPages.previousPage,
      });
    });

    it('should re-render the template with errors if there is any api call error', async () => {
      const mockRequest = {
        ...req,
        body: {},
      };

      mockRequest.session.appeal.appealType = '1001';
      mockRequest.session.appeal.eligibility.applicationDecision = 'granted';
      const error = new Error('Cheers');
      createOrUpdateAppeal.mockImplementation(() => Promise.reject(error));

      await enforcementNoticeController.postEnforcementNoticeHouseholder(mockRequest, res);

      expect(res.redirect).not.toHaveBeenCalled();

      expect(logger.error).toHaveBeenCalledWith(error);

      expect(res.render).toHaveBeenCalledWith(currentPage, {
        enforcementNotice: appeal.eligibility.enforcementNotice,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
        previousPage: navigationPages.previousPage,
      });
    });

    it('should redirect to `/householder-planning/eligibility/use-a-different-service` if `enforcement-notice` is `yes`', async () => {
      const mockRequest = {
        ...req,
        body: {
          'enforcement-notice': 'yes',
        },
      };
      await enforcementNoticeController.postEnforcementNoticeHouseholder(mockRequest, res);

      expect(createOrUpdateAppeal).toHaveBeenCalledWith({
        ...appeal,
        eligibility: {
          ...appeal.eligibility,
          enforcementNotice: true,
        },
      });

      expect(res.redirect).toHaveBeenCalledWith(navigationPages.shutterPage);
    });

    it('should redirect to `/householder-planning/eligibility/claiming-costs-householder` if `enforcement-notice` is `no`', async () => {
      const mockRequest = {
        ...req,
        body: {
          'enforcement-notice': 'no',
        },
      };
      await enforcementNoticeController.postEnforcementNoticeHouseholder(mockRequest, res);

      expect(createOrUpdateAppeal).toHaveBeenCalledWith({
        ...appeal,
        eligibility: {
          ...appeal.eligibility,
          enforcementNotice: false,
        },
      });

      expect(res.redirect).toHaveBeenCalledWith(navigationPages.nextPage);
    });
  });
});
