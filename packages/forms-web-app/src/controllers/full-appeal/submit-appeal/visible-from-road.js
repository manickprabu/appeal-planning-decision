const logger = require('../../../lib/logger');
const { createOrUpdateAppeal } = require('../../../lib/appeals-api-wrapper');
const {
  VIEW: {
    FULL_APPEAL: { HEALTH_SAFETY_ISSUES, VISIBLE_FROM_ROAD },
  },
} = require('../../../lib/full-appeal/views');
const { COMPLETED } = require('../../../services/task-status/task-statuses');

const sectionName = 'appealSiteSection';
const taskName = 'visibleFromRoad';

const getVisibleFromRoad = (req, res) => {
  const {
    appeal: {
      [sectionName]: {
        visibleFromRoad,
        agriculturalHolding: { hasOtherTenants, isAgriculturalHolding, isTenant },
      },
    },
  } = req.session;
  res.render(VISIBLE_FROM_ROAD, {
    hasOtherTenants,
    isAgriculturalHolding,
    isTenant,
    visibleFromRoad,
  });
};

const postVisibleFromRoad = async (req, res) => {
  const {
    body,
    body: { errors = {}, errorSummary = [] },
    session: {
      appeal,
      appeal: {
        [sectionName]: {
          agriculturalHolding: { hasOtherTenants, isAgriculturalHolding, isTenant },
        },
      },
    },
  } = req;

  const visibleFromRoad = {
    isVisible: body['visible-from-road'] && body['visible-from-road'] === 'yes',
    details: body['visible-from-road-details'],
  };

  if (Object.keys(errors).length > 0) {
    return res.render(VISIBLE_FROM_ROAD, {
      hasOtherTenants,
      isAgriculturalHolding,
      isTenant,
      visibleFromRoad,
      errors,
      errorSummary,
    });
  }

  try {
    appeal[sectionName][taskName] = visibleFromRoad;
    appeal.sectionStates[sectionName][taskName] = COMPLETED;

    req.session.appeal = await createOrUpdateAppeal(appeal);
  } catch (err) {
    logger.error(err);

    return res.render(VISIBLE_FROM_ROAD, {
      hasOtherTenants,
      isAgriculturalHolding,
      isTenant,
      visibleFromRoad,
      errors,
      errorSummary: [{ text: err.toString(), href: '#' }],
    });
  }

  return res.redirect(`/${HEALTH_SAFETY_ISSUES}`);
};

module.exports = {
  getVisibleFromRoad,
  postVisibleFromRoad,
};
