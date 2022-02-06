const { add, isBefore } = require('date-fns');
const { rules, constants, validation } = require('@pins/business-rules');

const logger = require('../../../lib/logger');
const { createOrUpdateAppeal } = require('../../../lib/appeals-api-wrapper');
const { VIEW } = require('../../../lib/householder-planning/views');

const backLink = `/before-you-start/granted-or-refused-householder`;
const shutter = `/before-you-start/you-cannot-appeal`;
const enforcementNoticeHouseholder = `/before-you-start/enforcement-notice-householder`;

exports.getDecisionDateHouseholder = async (req, res) => {
  res.render(VIEW.HOUSEHOLDER_PLANNING.ELIGIBILITY.DECISION_DATE_HOUSEHOLDER, {
    backLink: `/before-you-start/granted-or-refused-householder`,
  });
};

exports.postDecisionDateHouseholder = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  const { appeal } = req.session;

  if (Object.keys(errors).length > 0) {
    return res.render(VIEW.HOUSEHOLDER_PLANNING.ELIGIBILITY.DECISION_DATE_HOUSEHOLDER, {
      decisionDateHouseholder: {
        day: body['decision-date-householder-day'],
        month: body['decision-date-householder-month'],
        year: body['decision-date-householder-year'],
      },
      errors,
      errorSummary,
      backLink,
    });
  }

  const enteredDate = new Date(
    body['decision-date-householder-year'],
    (parseInt(body['decision-date-householder-month'], 10) - 1).toString(),
    body['decision-date-householder-day']
  );

  const refusedDeadlineDate = rules.appeal.deadlineDate(
    enteredDate,
    appeal.appealType,
    appeal.eligibility.applicationDecision
  );

  const isWithinExpiryPeriod = validation.appeal.decisionDate.isWithinDecisionDateExpiryPeriod(
    enteredDate,
    appeal.appealType,
    appeal.eligibility.applicationDecision
  );

  if (!isWithinExpiryPeriod) {
    const { duration, time } = rules.appeal.deadlinePeriod(
      appeal.appealType,
      appeal.eligibility.applicationDecision
    );
    req.session.appeal.eligibility.appealDeadline = refusedDeadlineDate;
    req.session.appeal.eligibility.appealPeriod = `${time} ${duration}`;

    return res.redirect(shutter);
  }

  try {
    req.session.appeal = await createOrUpdateAppeal({
      ...appeal,
      decisionDate: enteredDate.toISOString(),
    });
    return res.redirect(enforcementNoticeHouseholder);
  } catch (e) {
    logger.error(e);

    return res.render(VIEW.HOUSEHOLDER_PLANNING.ELIGIBILITY.DECISION_DATE_HOUSEHOLDER, {
      appeal,
      errors,
      errorSummary: [{ text: e.toString(), href: 'decision-date-householder' }],
      backLink,
    });
  }
};
