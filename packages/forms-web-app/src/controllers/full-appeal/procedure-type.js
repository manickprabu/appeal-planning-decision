const logger = require('../../lib/logger');
const {
  VIEW: {
    FULL_APPEAL: { PROCEDURE_TYPE: currentPage },
    FULL_APPEAL: { TASK_LIST: taskListPage },
  },
} = require('../../lib/views');
const { createOrUpdateAppeal } = require('../../lib/appeals-api-wrapper');
const {
  validApplicationDecisionOptions,
} = require('../../validators/full-appeal/granted-or-refused');

// const {
//   FULL_APPEAL: { PLANNING_APPLICATION_STATUS },
// } = require('../../constants');

exports.getProcedureType = async (req, res) => {
  const { appeal } = req.session;
  const procedureType = appeal.eligibility.procedureType ?? null;
  res.render(currentPage, {
    procedureType,
    backLink: taskListPage,
  });
};

exports.postProcedureType = async (req, res) => {
  const { body } = req;
  const { appeal } = req.session;
  const { errors = {}, errorSummary = [] } = body;

  const procedureType = body['procedure-type'];

  appeal.eligibility.procedureType = procedureType;

  if (Object.keys(errors).length > 0) {
    return res.render(currentPage, {
      procedureType,
      errors,
      errorSummary,
      backLink: taskListPage,
    });
  }

  try {
    req.session.appeal = await createOrUpdateAppeal(appeal);
  } catch (e) {
    logger.error(e);

    return res.render(currentPage, {
      procedureType,
      errors,
      errorSummary: [{ text: e.toString(), href: '#' }],
      backLink: taskListPage,
    });
  }

  return res.redirect(taskListPage);
};
