import { goToAppealsPage } from '../../../common/go-to-page/goToAppealsPage';

export const doNotAgreeToTheDeclaration = () => {
 goToAppealsPage('appellant-submission/submission');

  cy.get('[data-cy="title"]').should('contain', 'Declaration');

  cy.get('[data-cy="appellant-confirmation"]').should('not.have.attr', 'checked');

  cy.wait(Cypress.env('demoDelay'));
  cy.get('[data-cy="accept-and-send"]').click();
  cy.wait(Cypress.env('demoDelay'));
};
