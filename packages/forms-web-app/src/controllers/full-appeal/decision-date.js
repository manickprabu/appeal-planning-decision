const { isBefore } = require('date-fns');
const { rules } = require('@pins/business-rules');
const { APPEAL_ID } = require('@pins/business-rules/src/constants');
const logger = require('../../lib/logger');

const { createOrUpdateAppeal } = require('../../lib/appeals-api-wrapper');
const { VIEW } = require('../../lib/views');

exports.getDecisionDate = async (req, res) => {
  res.render(VIEW.FULL_APPEAL.DECISION_DATE, {
    backLink: `/before-you-start/granted-or-refused`,
  });
};

exports.postDecisionDate = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  const { appeal } = req.session;

  if (Object.keys(errors).length > 0) {
    return res.render(VIEW.FULL_APPEAL.DECISION_DATE, {
      decisionDate: {
        day: body['decision-date-day'],
        month: body['decision-date-month'],
        year: body['decision-date-year'],
      },
      errors,
      errorSummary,
      backLink: `/before-you-start/granted-or-refused`,
    });
  }

  const enteredDate = new Date(
    body['decision-date-year'],
    (parseInt(body['decision-date-month'], 10) - 1).toString(),
    body['decision-date-day']
  );

  const deadlineDate = rules.appeal.deadlineDate(enteredDate, APPEAL_ID.PLANNING_SECTION_78);
  const { time, duration } = rules.appeal.deadlinePeriod(APPEAL_ID.PLANNING_SECTION_78);

  if (isBefore(enteredDate, deadlineDate)) {
    req.session.appeal.eligibility.appealDeadline = deadlineDate;
    req.session.appeal.eligibility.appealPeriod = `${time} ${duration}`;

    return res.redirect(`/before-you-start/you-cannot-appeal`);
  }

  try {
    req.session.appeal = await createOrUpdateAppeal({
      ...appeal,
      decisionDate: enteredDate.toISOString(),
    });
    return res.redirect(`/before-you-start/enforcement-notice`);
  } catch (e) {
    logger.error(e);

    return res.render(VIEW.FULL_APPEAL.DECISION_DATE, {
      appeal,
      errors,
      errorSummary: [{ text: e.toString(), href: 'decision-date' }],
      backLink: `/before-you-start/granted-or-refused`,
    });
  }
};
