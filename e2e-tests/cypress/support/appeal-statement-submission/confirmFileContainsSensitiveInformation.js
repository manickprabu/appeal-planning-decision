module.exports = () => {
  cy.get('.govuk-error-summary__list').invoke('text').then((text) => {
    expect(text).to.contain('Confirm that your statement does not include sensitive information');
  });
  cy.wait(Cypress.env('demoDelay'));
  //Accessibility Testing
  cy.checkPageA11y({
    // known issue: https://github.com/alphagov/govuk-frontend/issues/979
    exclude: ['.govuk-radios__input'],
  });
};
