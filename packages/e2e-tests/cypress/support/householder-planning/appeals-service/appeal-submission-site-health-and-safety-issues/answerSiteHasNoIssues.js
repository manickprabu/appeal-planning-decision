export const answerSiteHasNoIssues = () => {
  cy.get('#site-access-safety-2').click();
  //cy.wait(Cypress.env('demoDelay'));
};
