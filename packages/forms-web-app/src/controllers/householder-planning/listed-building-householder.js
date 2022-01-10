const logger = require('../../lib/logger');
const { createOrUpdateAppeal } = require('../../lib/appeals-api-wrapper');

const { VIEW } = require('../../lib/views');

const listedBuilding = VIEW.HOUSEHOLDER_PLANNING.LISTED_BUILDING;
const backLink = `/${VIEW.FULL_APPEAL.TYPE_OF_PLANNING_APPLICATION}`;

exports.getListedBuildingHouseholder = async (req, res) => {
  res.render(listedBuilding, { backLink });
};

const redirect = (selection, res) => {
  if (selection === 'yes') {
    res.redirect(`/${VIEW.FULL_APPEAL.USE_A_DIFFERENT_SERVICE}`);
    return;
  }

  res.redirect(`/${VIEW.HOUSEHOLDER_PLANNING.ENFORCEMENT_NOTICE}`);
};

exports.postListedBuildingHouseholder = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  const { appeal } = req.session;

  const selection = body['listed-building-householder'];

  if (errors['listed-building-householder']) {
    res.render(listedBuilding, {
      appeal,
      errors,
      errorSummary,
      backLink,
    });
  }

  appeal.eligibility = {
    ...appeal.eligibility,
    isListedBuilding: selection === 'yes',
  };

  if (!errors['listed-building-householder']) {
    try {
      req.session.appeal = await createOrUpdateAppeal(appeal);
      redirect(selection, res);
    } catch (e) {
      logger.error(e);

      res.render(listedBuilding, {
        appeal,
        errors,
        errorSummary: [{ text: e.toString(), href: 'pageId' }],
        backLink,
      });
    }
  }
};
