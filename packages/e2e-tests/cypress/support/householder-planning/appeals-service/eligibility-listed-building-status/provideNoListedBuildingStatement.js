import { clickSaveAndContinue } from '../appeal-navigation/clickSaveAndContinue';

export const provideNoListedBuildingStatement = () => {
  cy.visit('/eligibility/listed-building');

  cy.wait(Cypress.env('demoDelay'));
  clickSaveAndContinue();
  cy.wait(Cypress.env('demoDelay'));
};
