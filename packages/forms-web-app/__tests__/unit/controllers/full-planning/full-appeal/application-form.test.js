const { documentTypes } = require('@pins/common');
const {
  getApplicationForm,
  postApplicationForm,
} = require('../../../../../src/controllers/full-planning/full-appeal/application-form');
const { APPEAL_DOCUMENT } = require('../../../../../src/lib/empty-appeal');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const { createDocument } = require('../../../../../src/lib/documents-api-wrapper');
const { getTaskStatus } = require('../../../../../src/services/task.service');
const TASK_STATUS = require('../../../../../src/services/task-status/task-statuses');
const { mockReq, mockRes } = require('../../../mocks');
const { VIEW } = require('../../../../../src/lib/full-planning/views');
const file = require('../../../../fixtures/file-upload');

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/lib/documents-api-wrapper');
jest.mock('../../../../../src/services/task.service');

describe('controllers/full-planning/full-appeal/application-form', () => {
  let req;
  let res;
  let appeal;

  const sectionName = 'requiredDocumentsSection';
  const taskName = 'originalApplication';

  beforeEach(() => {
    appeal = {
      ...APPEAL_DOCUMENT.empty,
      id: 'da368e66-de7b-44c4-a403-36e5bf5b000b',
    };
    req = {
      ...mockReq(),
      body: {},
      session: {
        appeal,
      },
    };
    res = mockRes();

    jest.resetAllMocks();
  });

  describe('getApplicationForm', () => {
    it('should call the correct template', () => {
      getApplicationForm(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICATION_FORM);
    });
  });

  describe('postApplicationForm', () => {
    it('should re-render the template with errors if submission validation fails', async () => {
      req = {
        ...req,
        body: {
          errors: { 'file-upload': 'Select a file upload' },
          errorSummary: [{ text: 'There was an error', href: '#' }],
        },
        files: {
          'file-upload': {},
        },
      };

      await postApplicationForm(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICATION_FORM, {
        appeal,
        errorSummary: [{ text: 'There was an error', href: '#' }],
        errors: { 'file-upload': 'Select a file upload' },
      });
    });

    it('should re-render the template with errors if an error is thrown', async () => {
      const error = new Error('Internal Server Error');

      createDocument.mockImplementation(() => Promise.reject(error));

      await postApplicationForm(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICATION_FORM, {
        appeal: req.session.appeal,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
      });
    });

    it('should redirect to the correct page if valid', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      createDocument.mockReturnValue(file);
      getTaskStatus.mockReturnValue(TASK_STATUS.NOT_STARTED);
      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      req = {
        ...req,
        body: {},
        files: {
          'file-upload': file,
        },
      };

      await postApplicationForm(req, res);

      expect(createDocument).toHaveBeenCalledWith(
        appeal,
        file,
        null,
        documentTypes.originalApplication.name
      );
      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith('/full-appeal/application-number');
      expect(req.session.appeal).toEqual(submittedAppeal);
    });
  });
});
