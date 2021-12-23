export const visitServiceStartPage = (options = {}) => {
  cy.visit('/', { failOnStatusCode: false, ...options });
  cy.wait(Cypress.env('demoDelay'));
};
