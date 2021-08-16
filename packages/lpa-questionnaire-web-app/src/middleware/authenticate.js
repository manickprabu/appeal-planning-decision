const { validate: validateUuid } = require('uuid');
const authenticationService = require('../services/authentication/authentication.service');
const { getAppeal } = require('../lib/appeals-api-wrapper');
const logger = require('../lib/logger');
const ExpiredJWTError = require('../services/authentication/error/ExpiredJWTError');

async function getLPACode(appealId) {
  if (!appealId || !validateUuid(appealId)) {
    logger.error('AppealId is undefined.');
    return undefined;
  }

  try {
    logger.debug({ appealId }, 'Get appeal by id');
    const appeal = await getAppeal(appealId);
    if (appeal.errors) {
      logger.error(`Get appeal by id returned error response. ${JSON.stringify(appeal)}`);
    }
    return appeal.lpaCode;
  } catch (err) {
    logger.error({ err }, 'Error retrieving appeal');
    return undefined;
  }
}

function handleTokenExpired(req, res, err) {
  req.log.debug('Cookie JWT token is expired. User will be redirected to login page.');

  const { userInformation } = err.jwtPayload;
  if (!userInformation.lpaCode) {
    req.log.error('Cookie token is missing lpaCode.');
    return res.status(404).send();
  }

  return res.redirect(`/${userInformation.lpaCode}/authentication/your-email/session-expired`);
}

async function handleTokenInvalidError(req, res, err) {
  req.log.debug({ err }, 'User is not authenticated and will be redirected to login page.');

  const lpaCode = await getLPACode(req.params?.id);
  if (!lpaCode) {
    req.log.error(
      `LPA code not found. Failure occurred while trying to redirect user to /:lpaCode/authentication/your-email page.`
    );
    return res.status(404).send();
  }

  req.session.redirectURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return res.redirect(`/${lpaCode}/authentication/your-email`);
}

module.exports = async (req, res, next) => {
  return authenticationService
    .authenticate(req, res)
    .then((token) => {
      req.userInformation = token.userInformation;
      req.log.debug('User is authenticated.');
      return next();
    })
    .catch((err) => {
      if (err instanceof ExpiredJWTError) {
        return handleTokenExpired(req, res, err);
      }
      return handleTokenInvalidError(req, res, err);
    });
};
