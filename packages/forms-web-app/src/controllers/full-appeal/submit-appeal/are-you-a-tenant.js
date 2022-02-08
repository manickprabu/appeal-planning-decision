const logger = require('../../../lib/logger');
const { createOrUpdateAppeal } = require('../../../lib/appeals-api-wrapper');
const {
  VIEW: {
    FULL_APPEAL: { ARE_YOU_A_TENANT, OTHER_TENANTS, TELLING_THE_TENANTS },
  },
} = require('../../../lib/full-appeal/views');
const { getTaskStatus } = require('../../../services/task.service');

const sectionName = 'appealSiteSection';
const taskName = 'agriculturalHolding';

const getAreYouATenant = (req, res) => {
  const {
    appeal: { [sectionName]: { [taskName]: { isTenant } = {} } = {} },
  } = req.session;
  res.render(ARE_YOU_A_TENANT, {
    isTenant,
  });
};

const postAreYouATenant = async (req, res) => {
  const {
    body,
    body: { errors = {}, errorSummary = [] },
    session: { appeal },
  } = req;

  if (Object.keys(errors).length > 0) {
    return res.render(ARE_YOU_A_TENANT, {
      errors,
      errorSummary,
    });
  }

  const isTenant = body['are-you-a-tenant'] === 'yes';

  try {
    appeal[sectionName] = appeal[sectionName] || { [taskName]: {} };
    appeal[sectionName][taskName].isTenant = isTenant;
    appeal.sectionStates[sectionName] = appeal.sectionStates[sectionName] || {};
    appeal.sectionStates[sectionName][taskName] = getTaskStatus(appeal, sectionName, taskName);
    req.session.appeal = await createOrUpdateAppeal(appeal);
  } catch (err) {
    logger.error(err);

    return res.render(ARE_YOU_A_TENANT, {
      isTenant,
      errors,
      errorSummary: [{ text: err.toString(), href: '#' }],
    });
  }

  return isTenant ? res.redirect(`/${OTHER_TENANTS}`) : res.redirect(`/${TELLING_THE_TENANTS}`);
};

module.exports = {
  getAreYouATenant,
  postAreYouATenant,
};
