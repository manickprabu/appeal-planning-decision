const { yourAppealDetailsPageHeadingSelector } = require('./selectors');

const defaultOptions = { script: true, failOnStatusCode: true };

export const appellantViewsYourAppealDetailsInvalid = ({ script, failOnStatusCode } = defaultOptions) => {
  cy.visit('/your-planning-appeal/your-appeal-details', { script, failOnStatusCode });
};
