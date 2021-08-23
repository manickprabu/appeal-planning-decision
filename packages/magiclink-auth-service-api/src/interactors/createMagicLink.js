const jwtUtil = require('../util/jwt');
const logger = require('../util/logger');
const mapper = require('../mappers/magicLinkTokenMapper');

function createMagicLinkToken(magicLinkData) {
  logger.debug('Create magic link token');
  const tokenData = mapper.magicLinkDataToToken(magicLinkData);
  const jwt = jwtUtil.sign(tokenData);

  logger.debug('Magic link token created with success');
  return jwt;
}

/**
 * Creates a magic link URL that has a signed JWT token embedded.
 * The JWT contains the encrypted input magicLinkData and has an expiration time.
 *
 * @param protocol the magic link URL protocol
 * @param hostname the magic link URL hostname
 * @param magicLinkData data used for the magic link token payload.
 * @returns {string} magic link URL.
 */
module.exports = (protocol, hostname, magicLinkData) => {
  try {
    const magicLinkToken = createMagicLinkToken(magicLinkData);
    return `${protocol}://${hostname}/magiclink/${magicLinkToken}`;
  } catch (error) {
    logger.error(
      { err: { message: error.message, stacktrace: error.stack } },
      'An error occurred while trying to create magic link token',
    );
    throw new Error('An error occurred while trying to create magic link token');
  }
};
