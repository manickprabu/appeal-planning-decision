const procedureTypeController = require('../../../../src/controllers/full-appeal/procedure-type');
const { createOrUpdateAppeal } = require('../../../../src/lib/appeals-api-wrapper');
const { VIEW } = require('../../../../src/lib/views');
const logger = require('../../../../src/lib/logger');
const { APPEAL_DOCUMENT } = require('../../../../src/lib/empty-appeal');
const { mockReq, mockRes } = require('../../mocks');

jest.mock('../../../../src/lib/appeals-api-wrapper');
jest.mock('../../../../src/lib/logger');

describe('controllers/full-appeal/procedure-type', () => {
  let req;
  let res;
  let appeal;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    ({ empty: appeal } = APPEAL_DOCUMENT);

    jest.resetAllMocks();
  });

  describe('getProcedureType', () => {
    it('should call the correct template', () => {
      procedureTypeController.getProcedureType(req, res);

      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.PROCEDURE_TYPE, {
        procedureType: null,
        backLink: VIEW.FULL_APPEAL.TASK_LIST,
      });
    });
  });

  describe('postProcedureType', () => {
    it('should re-render the template with a validation error for no selection made', async () => {
      const mockRequest = {
        ...req,
        body: {
          'procedure-type': null,
          errors: {
            'procedure-type':
              'Select the procedure that you think is most appropriate for this appeal',
          },
          errorSummary: [
            {
              text: 'Select the procedure that you think is most appropriate for this appeal',
              href: '#',
            },
          ],
        },
      };
      await procedureTypeController.postProcedureType(mockRequest, res);

      expect(createOrUpdateAppeal).not.toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.PROCEDURE_TYPE, {
        procedureType: null,
        errors: {
          'procedure-type':
            'Select the procedure that you think is most appropriate for this appeal',
        },
        errorSummary: [
          {
            text: 'Select the procedure that you think is most appropriate for this appeal',
            href: '#',
          },
        ],
        backLink: VIEW.FULL_APPEAL.TASK_LIST,
      });
    });

    it('should re-render the template with errors if there is any api call error', async () => {
      const mockRequest = {
        ...req,
        body: {},
      };

      const error = new Error('Api call error');
      createOrUpdateAppeal.mockImplementation(() => Promise.reject(error));

      await procedureTypeController.postProcedureType(mockRequest, res);

      expect(res.redirect).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(error);
      expect(res.render).toHaveBeenCalledWith(VIEW.FULL_APPEAL.PROCEDURE_TYPE, {
        procedureType: undefined,
        errors: {},
        errorSummary: [{ text: error.toString(), href: '#' }],
        backLink: VIEW.FULL_APPEAL.TASK_LIST,
      });
    });

    it('should redirect to tasklist page if selection is made with no errors', async () => {
      const mockRequest = {
        ...req,
        body: {
          'procedure-type': 'hearing',
        },
      };
      await procedureTypeController.postProcedureType(mockRequest, res);

      appeal.eligibility.procedureType = 'hearing';

      expect(createOrUpdateAppeal).toHaveBeenCalledWith(appeal);
      expect(res.redirect).toHaveBeenCalledWith(VIEW.FULL_APPEAL.TASK_LIST);
    });
  });
});
