import { Before } from 'cypress-cucumber-preprocessor/steps';

const page = {
  id: 'enterAppealSite',
  heading: 'Would the Inspector need to enter the appeal site?',
  section: 'About the appeal site',
  title:
    'Would the Inspector need to enter the appeal site? - Appeal Questionnaire - Appeal a householder planning decision - GOV.UK',
  url: 'site-access',
  emptyError: 'Select yes if the Inspector would need to enter the appeal site',
  textEmptyError: 'Enter the reasons the Inspector would need to enter the appeal site',
  textChildOf: 'Yes',
  textMock:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. enterAppealSite.',
};

Before(() => {
  cy.wrap(page).as('page');
});
