const logger = require('../lib/logger');
const { VIEW } = require('../lib/views');
const getAppealSideBarDetails = require('../lib/appeal-sidebar-details');
const { getTaskStatus } = require('../services/task.service');
const { createOrUpdateAppealReply } = require('../lib/appeal-reply-api-wrapper');
const { renderView, redirect } = require('../util/render');

const sectionName = 'tbc';
const taskName = 'involvesListedBuilding';

exports.getInvolvesListedBuilding = (req, res) => {
  let { involvesListedBuilding } = req.session.appealReply[sectionName][taskName];

  if (typeof involvesListedBuilding === 'boolean') {
    involvesListedBuilding = involvesListedBuilding ? 'yes' : 'no';
  }

  renderView(res, VIEW.INVOLVES_LISTED_BUILDING, {
    prefix: 'appeal-questionnaire',
    appeal: getAppealSideBarDetails(req.session.appeal),
    backLink: req.session.backLink ? req.session.backLink : `/${req.params.id}/${VIEW.TASK_LIST}`,
    involvesListedBuilding,
  });
};

exports.postInvolvesListedBuilding = async (req, res) => {
  const {
    body,
    session: { appealReply },
  } = req;
  const { errors = {}, errorSummary = [] } = body;

  const values = {
    'appeal-reference-numbers': body['appeal-reference-numbers'],
    'adjacent-appeals': body['adjacent-appeals'],
  };

  if (Object.keys(errors).length > 0) {
    renderView(res, VIEW.INVOLVES_LISTED_BUILDING, {
      prefix: 'appeal-questionnaire',
      appeal: getAppealSideBarDetails(req.session.appeal),
      backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
      errors,
      errorSummary,
      involvesListedBuilding,
    });
    return;
  }

  const task = appealReply[sectionName][taskName];
  task.adjacentAppeals = body['adjacent-appeals'] === 'yes';
  task.appealReferenceNumbers =
    body['adjacent-appeals'] === 'yes' ? body['appeal-reference-numbers'] : '';
  appealReply.sectionStates[sectionName][taskName] = getTaskStatus(
    appealReply,
    sectionName,
    taskName
  );

  try {
    req.session.appealReply = await createOrUpdateAppealReply(appealReply);
  } catch (e) {
    logger.error(e);

    renderView(res, VIEW.OTHER_APPEALS, {
      prefix: 'appeal-questionnaire',
      appeal: getAppealSideBarDetails(req.session.appeal),
      backLink: req.session.backLink || `/${req.params.id}/${VIEW.TASK_LIST}`,
      errors,
      errorSummary: [{ text: e.toString() }],
      values,
    });

    return;
  }

  redirect(res, 'appeal-questionnaire', `${req.params.id}/${VIEW.TASK_LIST}`, req.session.backLink);
};
