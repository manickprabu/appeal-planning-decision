export const confirmNavigationWhoAreYouPage = () => {
  cy.url().should('include', '/appellant-submission/who-are-you');
  cy.wait(Cypress.env('demoDelay'));
}
