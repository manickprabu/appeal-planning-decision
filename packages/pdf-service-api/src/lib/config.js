/**
 * Config
 *
 * This is the single-source-of-truth for the application. All
 * config should be driven by environment variables where different
 * values are required
 */

const path = require('path');

module.exports = {
  appeals: {
    url: process.env.APPEALS_SERVICE_API_URL,
  },
  docs: {
    api: {
      path: process.env.DOCS_API_PATH || path.join(__dirname, '..', '..', 'api'),
    },
  },
  gotenberg: {
    url: process.env.GOTENBERG_URL,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
  },
  localPlanningAuthorities: {
    url: process.env.LOCAL_PLANNING_AUTHORITIES_SERVICE_API_URL,
  },
  server: {
    port: Number(process.env.SERVER_PORT || 3000),
    showErrors: process.env.SERVER_SHOW_ERRORS === 'true',
    terminationGracePeriod: Number(
      (process.env.SERVER_TERMINATION_GRACE_PERIOD_SECONDS || 0) * 1000
    ),
  },
};
