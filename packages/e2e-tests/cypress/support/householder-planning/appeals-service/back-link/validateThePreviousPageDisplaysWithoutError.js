export const validateThePreviousPageDisplaysWithoutError = () => {
  cy.get('[data-cy="error-wrapper"]').should('not.exist');
  cy.title().should('not.match', /^Error: /);
};
