const {
  constants: { APPEAL_ID },
  models,
} = require('@pins/business-rules');
const {
  statusSiteOwnership,
} = require('../../../../src/services/task-status/status-site-ownership');
const TASK_STATUS = require('../../../../src/services/task-status/task-statuses');

const appeal = models.getModel(APPEAL_ID.HOUSEHOLDER);

describe('services/task-status/status-site-ownership', () => {
  [
    {
      given: appeal,
      expected: TASK_STATUS.NOT_STARTED,
    },
    {
      given: {
        ...appeal,
        appealSiteSection: {
          ...appeal.appealSiteSection,
          siteOwnership: {
            ...appeal.appealSiteSection.siteOwnership,
            ownsWholeSite: true,
          },
        },
      },
      expected: TASK_STATUS.COMPLETED,
    },
    {
      given: {
        ...appeal,
        appealSiteSection: {
          ...appeal.appealSiteSection,
          siteOwnership: {
            ...appeal.appealSiteSection.siteOwnership,
            ownsWholeSite: false,
          },
        },
      },
      expected: TASK_STATUS.IN_PROGRESS,
    },
    {
      given: {
        ...appeal,
        appealSiteSection: {
          ...appeal.appealSiteSection,
          siteOwnership: {
            ...appeal.appealSiteSection.siteOwnership,
            ownsWholeSite: false,
            haveOtherOwnersBeenTold: true,
          },
        },
      },
      expected: TASK_STATUS.COMPLETED,
    },
    {
      given: {
        ...appeal,
        appealSiteSection: {
          ...appeal.appealSiteSection,
          siteOwnership: {
            ...appeal.appealSiteSection.siteOwnership,
            ownsWholeSite: false,
            haveOtherOwnersBeenTold: false,
          },
        },
      },
      expected: TASK_STATUS.COMPLETED,
    },
  ].forEach(({ given, expected }) => {
    it('should return the expected status', () => {
      expect(statusSiteOwnership(given)).toEqual(expected);
    });
  });
});
