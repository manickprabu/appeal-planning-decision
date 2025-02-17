import { Before } from 'cypress-cucumber-preprocessor/steps';

const page = {
  id: 'siteSeenPublicLand',
  heading: 'Can the Inspector see the relevant parts of the appeal site from public land?',
  section: 'About the appeal site',
  title:
    'Can the Inspector see the relevant parts of the appeal site from public land? - Appeal Questionnaire - Appeal a householder planning decision - GOV.UK',
  url: 'public-land',
  emptyError: 'Select yes if relevant parts of the site can be seen from public land',
};

Before(() => {
  cy.wrap(page).as('page');
});
