const {
  constants: { APPEAL_ID },
  models,
} = require('@pins/business-rules');
const {
  getAreYouATenant,
  postAreYouATenant,
} = require('../../../../../src/controllers/full-appeal/submit-appeal/are-you-a-tenant');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const { getTaskStatus } = require('../../../../../src/services/task.service');
const { mockReq, mockRes } = require('../../../mocks');
const {
  VIEW: {
    FULL_APPEAL: { ARE_YOU_A_TENANT, OTHER_TENANTS, TELLING_THE_TENANTS },
  },
} = require('../../../../../src/lib/full-appeal/views');

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/services/task.service');

describe('controllers/full-appeal/submit-appeal/are-you-a-tenant', () => {
  let req;
  let res;
  let appeal;

  const sectionName = 'appealSiteSection';
  const taskName = 'agriculturalHolding';
  const appealId = 'da368e66-de7b-44c4-a403-36e5bf5b000b';
  const errors = { 'are-you-a-tenant': 'Select an option' };
  const errorSummary = [{ text: 'There was an error', href: '#' }];
  const model = models.getModel(APPEAL_ID.PLANNING_SECTION_78);

  beforeEach(() => {
    appeal = {
      ...model,
      id: appealId,
      appealSiteSection: {
        agriculturalHolding: {
          isTenant: false,
        },
      },
    };
    req = {
      ...mockReq(appeal),
      body: {},
    };
    res = mockRes();

    jest.resetAllMocks();
  });

  describe('getAreYouATenant', () => {
    it('should call the correct template', () => {
      getAreYouATenant(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(ARE_YOU_A_TENANT, {
        isTenant: false,
      });
    });

    it('should call the correct template when appeal.appealSiteSection is not defined', () => {
      delete appeal.appealSiteSection;

      getAreYouATenant(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(ARE_YOU_A_TENANT, {
        isTenant: undefined,
      });
    });
  });

  describe('postAreYouATenant', () => {
    it('should re-render the template with errors if submission validation fails', async () => {
      req = {
        ...req,
        body: {
          'are-you-a-tenant': undefined,
          errors,
          errorSummary,
        },
      };

      await postAreYouATenant(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(ARE_YOU_A_TENANT, {
        errors,
        errorSummary,
      });
    });

    it('should re-render the template with errors if an error is thrown', async () => {
      const error = new Error('Internal Server Error');

      createOrUpdateAppeal.mockImplementation(() => {
        throw error;
      });

      await postAreYouATenant(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(ARE_YOU_A_TENANT, {
        isTenant: false,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
      });
    });

    it('should redirect to the correct page if `yes` has been selected', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'yes',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${OTHER_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `no` has been selected', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'no',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${TELLING_THE_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `yes` has been selected and appeal.appealSiteSection is not defined', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      delete appeal.appealSiteSection;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'yes',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${OTHER_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `no` has been selected and appeal.appealSiteSection is not defined', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      delete appeal.appealSiteSection;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'no',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${TELLING_THE_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `yes` has been selected and appeal.sectionStates.appealSiteSection is not defined', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      delete appeal.sectionStates.appealSiteSection;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'yes',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${OTHER_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `no` has been selected and appeal.sectionStates.appealSiteSection is not defined', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      delete appeal.sectionStates.appealSiteSection;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'are-you-a-tenant': 'no',
        },
      };

      await postAreYouATenant(req, res);

      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${TELLING_THE_TENANTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });
  });
});
