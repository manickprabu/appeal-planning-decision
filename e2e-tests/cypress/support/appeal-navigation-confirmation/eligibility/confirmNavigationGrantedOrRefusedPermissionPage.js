module.exports = () => {
    cy.url().should('include', '/eligibility/granted-or-refused-permission');
    cy.wait(Cypress.env('demoDelay'));
}
