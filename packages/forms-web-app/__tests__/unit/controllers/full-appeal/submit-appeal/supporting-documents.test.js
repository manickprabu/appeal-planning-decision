const appeal = require('@pins/business-rules/test/data/full-appeal');
const v8 = require('v8');
const {
  getSupportingDocuments,
  postSupportingDocuments,
} = require('../../../../../src/controllers/full-appeal/submit-appeal/supporting-documents');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const { mockReq, mockRes } = require('../../../mocks');
const {
  VIEW: {
    FULL_APPEAL: { NEW_SUPPORTING_DOCUMENTS, SUPPORTING_DOCUMENTS, TASK_LIST },
  },
} = require('../../../../../src/lib/full-appeal/views');
const TASK_STATUS = require('../../../../../src/services/task-status/task-statuses');

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/services/task.service');

describe('controllers/full-appeal/submit-appeal/supporting-documents', () => {
  let req;
  let res;

  const sectionName = 'appealDocumentsSection';
  const taskName = 'supportingDocuments';
  const errors = { 'supporting-documents': 'Select an option' };
  const errorSummary = [{ text: 'There was an error', href: '#' }];

  beforeEach(() => {
    req = v8.deserialize(
      v8.serialize({
        ...mockReq(appeal),
        body: {},
      })
    );
    res = mockRes();

    jest.resetAllMocks();
  });

  describe('getSupportingDocuments', () => {
    it('should call the correct template', () => {
      getSupportingDocuments(req, res);

      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(SUPPORTING_DOCUMENTS, {
        hasSupportingDocuments: true,
        hasPlansDrawings: true,
      });
    });
  });

  describe('postSupportingDocuments', () => {
    it('should re-render the template with errors if submission validation fails', async () => {
      req = {
        ...req,
        body: {
          'supporting-documents': undefined,
          errors,
          errorSummary,
        },
      };

      await postSupportingDocuments(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(SUPPORTING_DOCUMENTS, {
        hasPlansDrawings: true,
        errors,
        errorSummary,
      });
    });

    it('should re-render the template with errors if an error is thrown', async () => {
      const error = new Error('Internal Server Error');

      createOrUpdateAppeal.mockImplementation(() => {
        throw error;
      });

      await postSupportingDocuments(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith(SUPPORTING_DOCUMENTS, {
        hasSupportingDocuments: false,
        hasPlansDrawings: true,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
      });
    });

    it('should redirect to the correct page if `yes` has been selected', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };
      submittedAppeal.sectionStates.appealDocumentsSection.supportingDocuments =
        TASK_STATUS.COMPLETED;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'supporting-documents': 'yes',
        },
      };

      await postSupportingDocuments(req, res);

      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${NEW_SUPPORTING_DOCUMENTS}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if `no` has been selected', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };
      submittedAppeal[sectionName][taskName].hasSupportingDocuments = false;
      submittedAppeal.sectionStates.appealDocumentsSection.supportingDocuments =
        TASK_STATUS.COMPLETED;

      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {
          'supporting-documents': 'no',
        },
      };

      await postSupportingDocuments(req, res);

      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${TASK_LIST}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });
  });
});
