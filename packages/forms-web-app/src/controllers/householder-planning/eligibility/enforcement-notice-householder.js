const { APPEAL_ID } = require('@pins/business-rules/src/constants');
const {
  FULL_APPEAL: { PLANNING_APPLICATION_STATUS: status },
} = require('../../../constants');
const logger = require('../../../lib/logger');
const { createOrUpdateAppeal } = require('../../../lib/appeals-api-wrapper');
const {
  VIEW: {
    HOUSEHOLDER_PLANNING: {
      ELIGIBILITY: { ENFORCEMENT_NOTICE_HOUSEHOLDER: currentPage },
    },
  },
} = require('../../../lib/householder-planning/views');
const {
  validEnforcementNoticeHouseholderOptions,
} = require('../../../validators/householder-planning/eligibility/enforcement-notice-householder');

const navigationPages = {
  nextPage: '/before-you-start/claiming-costs-householder',
  shutterPage: '/before-you-start/use-a-different-service',
};

const decisionDateEnforcementNoticeMapper = (key) => {
  const pages = {
    [`${APPEAL_ID.HOUSEHOLDER}_${status.GRANTED}`]: '/before-you-start/decision-date-householder',
    [`${APPEAL_ID.HOUSEHOLDER}_${status.REFUSED}`]: '/before-you-start/decision-date-householder',
    [`${APPEAL_ID.HOUSEHOLDER}_${status.NODECISION}`]:
      '/before-you-start/date-decision-due-householder',
  };

  return pages[key];
};

const getPreviousPagePath = (appealType, applicationDecision) => {
  return decisionDateEnforcementNoticeMapper(`${appealType}_${applicationDecision}`);
};

exports.getEnforcementNoticeHouseholder = (req, res) => {
  const { appeal } = req.session;

  navigationPages.previousPage = getPreviousPagePath(
    appeal.appealType,
    appeal.eligibility.applicationDecision
  );
  res.render(currentPage, {
    appeal,
    previousPage: navigationPages.previousPage,
  });
};

exports.postEnforcementNoticeHouseholder = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  const { appeal } = req.session;

  navigationPages.previousPage = getPreviousPagePath(
    appeal.appealType,
    appeal.eligibility.applicationDecision
  );

  let hasReceivedEnforcementNoticeHouseholder = null;
  if (validEnforcementNoticeHouseholderOptions.includes(req.body['enforcement-notice'])) {
    hasReceivedEnforcementNoticeHouseholder = req.body['enforcement-notice'] === 'yes';
  }

  if (Object.keys(errors).length > 0) {
    res.render(currentPage, {
      appeal: {
        ...appeal,
        eligibility: {
          ...appeal.eligibility,
          enforcementNotice: hasReceivedEnforcementNoticeHouseholder,
        },
      },
      errors,
      errorSummary,
      previousPage: navigationPages.previousPage,
    });
    return;
  }

  try {
    req.session.appeal = await createOrUpdateAppeal({
      ...appeal,
      eligibility: {
        ...appeal.eligibility,
        enforcementNotice: hasReceivedEnforcementNoticeHouseholder,
      },
    });
  } catch (e) {
    logger.error(e);

    res.render(currentPage, {
      appeal,
      errors,
      errorSummary: [{ text: e.toString(), href: '#' }],
      previousPage: navigationPages.previousPage,
    });
    return;
  }

  if (hasReceivedEnforcementNoticeHouseholder) {
    res.redirect(navigationPages.shutterPage);
    return;
  }

  res.redirect(navigationPages.nextPage);
};
