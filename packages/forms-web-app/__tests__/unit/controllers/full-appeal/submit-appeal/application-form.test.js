const {
  constants: { APPEAL_ID },
  models,
} = require('@pins/business-rules');
const { documentTypes } = require('@pins/common');
const {
  getApplicationForm,
  postApplicationForm,
} = require('../../../../../src/controllers/full-appeal/submit-appeal/application-form');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const { createDocument } = require('../../../../../src/lib/documents-api-wrapper');
const { getTaskStatus } = require('../../../../../src/services/task.service');
const TASK_STATUS = require('../../../../../src/services/task-status/task-statuses');
const { mockReq, mockRes } = require('../../../mocks');
const {
  VIEW: {
    FULL_APPEAL: { APPLICATION_FORM, APPLICATION_NUMBER },
  },
} = require('../../../../../src/lib/full-appeal/views');
const file = require('../../../../fixtures/file-upload');

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/lib/documents-api-wrapper');
jest.mock('../../../../../src/services/task.service');

describe('controllers/full-appeal/submit-appeal/application-form', () => {
  let req;
  let res;
  let appeal;

  const sectionName = 'planningApplicationDocumentsSection';
  const taskName = documentTypes.originalApplication.name;
  const appealId = 'da368e66-de7b-44c4-a403-36e5bf5b000b';
  const errors = { 'file-upload': 'Select a file upload' };
  const errorSummary = [{ text: 'There was an error', href: '#' }];
  const model = models.getModel(APPEAL_ID.PLANNING_SECTION_78);

  beforeEach(() => {
    appeal = {
      ...model,
      id: appealId,
      [sectionName]: {
        [taskName]: {
          uploadedFile: file,
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

  describe('getApplicationForm', () => {
    it('should call the correct template', () => {
      getApplicationForm(req, res);
      expect(res.render).toHaveBeenCalledWith(APPLICATION_FORM, {
        appealId,
        uploadedFile: file,
      });
    });
  });

  describe('postApplicationForm', () => {
    it('should re-render the template with errors if submission validation fails', async () => {
      req = {
        ...req,
        body: {
          errors,
          errorSummary,
        },
        files: {
          'file-upload': {},
        },
      };

      await postApplicationForm(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(APPLICATION_FORM, {
        appealId,
        uploadedFile: file,
        errorSummary,
        errors,
      });
    });

    it('should re-render the template with errors if an error is thrown', async () => {
      const error = new Error('Internal Server Error');

      createOrUpdateAppeal.mockImplementation(() => Promise.reject(error));

      await postApplicationForm(req, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(APPLICATION_FORM, {
        appealId,
        uploadedFile: file,
        errorSummary: [{ text: error.toString(), href: '#' }],
      });
    });

    it('should redirect to the correct page if valid and a file is being uploaded', async () => {
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

      expect(createDocument).toHaveBeenCalledWith(appeal, file, null, taskName);
      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${APPLICATION_NUMBER}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if valid and a file is not being uploaded', async () => {
      const submittedAppeal = {
        ...appeal,
        state: 'SUBMITTED',
      };

      getTaskStatus.mockReturnValue(TASK_STATUS.NOT_STARTED);
      createOrUpdateAppeal.mockReturnValue(submittedAppeal);

      await postApplicationForm(req, res);

      expect(createDocument).not.toHaveBeenCalled();
      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${APPLICATION_NUMBER}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });

    it('should redirect to the correct page if valid if appeal.planningApplicationDocumentsSection.originalApplication does not exist', async () => {
      delete appeal.planningApplicationDocumentsSection.originalApplication;

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

      expect(createDocument).toHaveBeenCalledWith(appeal, file, null, taskName);
      expect(getTaskStatus).toHaveBeenCalledWith(appeal, sectionName, taskName);
      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(`/${APPLICATION_NUMBER}`);
      expect(req.session.appeal).toEqual(submittedAppeal);
    });
  });
});
