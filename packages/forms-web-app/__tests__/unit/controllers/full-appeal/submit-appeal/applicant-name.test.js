const applicantNameController = require('../../../../../src/controllers/full-appeal/submit-appeal/applicant-name');
const { createOrUpdateAppeal } = require('../../../../../src/lib/appeals-api-wrapper');
const { VIEW } = require('../../../../../src/lib/full-appeal/views');
const logger = require('../../../../../src/lib/logger');
const {
  getTaskStatus,
  getNextTask,
  FULL_APPEAL_SECTIONS,
} = require('../../../../../src/services/task.service');
const { APPEAL_DOCUMENT } = require('../../../../../src/lib/empty-appeal');
const { mockReq, mockRes } = require('../../../mocks');

jest.mock('../../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../../src/services/task.service');
jest.mock('../../../../../src/lib/logger');

const sectionName = 'aboutYouSection';
const taskName = 'yourDetails';

describe('controllers/full-appeal/submit-appeal/applicant-name', () => {
  let req;
  let res;
  let appeal;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    ({ empty: appeal } = APPEAL_DOCUMENT);

    jest.resetAllMocks();
  });

  describe('getApplicantName', () => {
    it('should call the correct template', () => {
      applicantNameController.getApplicantName(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICANT_NAME, {
        appeal: req.session.appeal,
      });
    });
  });

  describe('postApplicantName', () => {
    it('should re-render the template with errors if there is any validator error', async () => {
      const fakeBehalfAppellantName = 'Jim Jacobson';
      const mockRequest = {
        ...req,
        body: {
          'behalf-appellant-name': fakeBehalfAppellantName,
          errors: { a: 'b' },
          errorSummary: [{ text: 'There were errors here', href: '#' }],
        },
      };

      await applicantNameController.postApplicantName(mockRequest, res);

      expect(res.redirect).not.toHaveBeenCalled();

      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICANT_NAME, {
        appeal: {
          ...req.session.appeal,
          [sectionName]: {
            ...req.session.appeal[sectionName],
            [taskName]: {
              appealingOnBehalfOf: fakeBehalfAppellantName,
              email: null,
              isOriginalApplicant: null,
              name: null,
            },
          },
        },
        errorSummary: [{ text: 'There were errors here', href: '#' }],
        errors: { a: 'b' },
      });
    });

    it('should re-render the template with errors if there is any api call error', async () => {
      const mockRequest = {
        ...req,
        body: {},
      };

      const error = new Error('Cheers');
      createOrUpdateAppeal.mockImplementation(() => Promise.reject(error));

      await applicantNameController.postApplicantName(mockRequest, res);

      expect(getTaskStatus).toHaveBeenCalledWith(
        appeal,
        sectionName,
        taskName,
        FULL_APPEAL_SECTIONS
      );

      expect(res.redirect).not.toHaveBeenCalled();

      expect(logger.error).toHaveBeenCalledWith(error);

      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.APPLICANT_NAME, {
        appeal: req.session.appeal,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
      });
    });

    it('should redirect to the task list if valid', async () => {
      const fakeBehalfAppellantName = 'Jim Jacobson';
      const fakeCompanyName = 'Test Company';
      const fakeTaskStatus = 'FAKE_STATUS';

      getTaskStatus.mockImplementation(() => fakeTaskStatus);

      getNextTask.mockReturnValue({
        href: `/${VIEW.FULL_APPEAL.TASK_LIST}`,
      });
      const mockRequest = {
        ...req,
        body: {
          'behalf-appellant-name': 'Jim Jacobson',
          'company-name': fakeCompanyName,
        },
      };

      await applicantNameController.postApplicantName(mockRequest, res);

      expect(getTaskStatus).toHaveBeenCalledWith(
        appeal,
        sectionName,
        taskName,
        FULL_APPEAL_SECTIONS
      );

      expect(createOrUpdateAppeal).toHaveBeenCalledWith({
        ...appeal,
        [sectionName]: {
          ...appeal[sectionName],
          [taskName]: {
            appealingOnBehalfOf: fakeBehalfAppellantName,
            companyName: fakeCompanyName,
            email: null,
            isOriginalApplicant: null,
            name: null,
          },
        },
        sectionStates: {
          ...appeal.sectionStates,
          [sectionName]: {
            ...appeal.sectionStates[sectionName],
            [taskName]: fakeTaskStatus,
          },
        },
      });

      expect(res.redirect).toHaveBeenCalledWith(`/${VIEW.FULL_APPEAL.TASK_LIST}`);
    });
  });
});
