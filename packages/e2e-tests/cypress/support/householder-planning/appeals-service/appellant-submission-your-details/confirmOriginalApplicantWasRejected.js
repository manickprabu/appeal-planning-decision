export const confirmOriginalApplicantWasRejected = (errorMessage) => {
  cy.url().should('include', '/appellant-submission/applicant-name');
  cy.get('.govuk-error-summary__list')
    .invoke('text')
    .then((text) => {
      if (!Array.isArray(errorMessage)) {
        errorMessage = [errorMessage];
      }
      errorMessage.forEach((errorMessage) => expect(text).to.contain(errorMessage));
    });

  cy.title().should('match', /^Error: /);
  //cy.wait(Cypress.env('demoDelay'));
};
