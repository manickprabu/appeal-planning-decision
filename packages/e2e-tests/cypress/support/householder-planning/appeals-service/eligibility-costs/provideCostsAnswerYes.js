export const provideCostsAnswerYes = () => {
  cy.get('[data-cy="answer-yes"]').click();
  //cy.wait(Cypress.env('demoDelay'));
};
