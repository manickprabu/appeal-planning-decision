module.exports = () => {
  cy.get('[data-cy="reEnterTheDecisionDate"]').first().click();
  cy.wait(Cypress.env('demoDelay'));
};
