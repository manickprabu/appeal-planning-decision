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
  validEnforcementNoticeOptions,
} = require('../../../validators/householder-planning/eligibility/enforcement-notice-householder');
const getPreviousPagePath = require('../../../lib/get-previous-page-path');

const navigationPages = {
  nextPage: '/before-you-start/claiming-costs-householder',
  shutterPage: '/before-you-start/use-a-different-service',
};

exports.getEnforcementNotice = (req, res) => {
  navigationPages.previousPage = getPreviousPagePath(req);
  res.render(currentPage, {
    appeal: req.session.appeal,
    previousPage: navigationPages.previousPage,
  });
};

exports.postEnforcementNotice = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  const { appeal } = req.session;
  navigationPages.previousPage = getPreviousPagePath(req);

  let hasReceivedEnforcementNotice = null;
  if (validEnforcementNoticeOptions.includes(req.body['enforcement-notice'])) {
    hasReceivedEnforcementNotice = req.body['enforcement-notice'] === 'yes';
  }

  if (Object.keys(errors).length > 0) {
    res.render(currentPage, {
      appeal: {
        ...appeal,
        eligibility: {
          ...appeal.eligibility,
          enforcementNotice: hasReceivedEnforcementNotice,
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
        enforcementNotice: hasReceivedEnforcementNotice,
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

  if (hasReceivedEnforcementNotice) {
    res.redirect(navigationPages.shutterPage);
    return;
  }

  res.redirect(navigationPages.nextPage);
};
