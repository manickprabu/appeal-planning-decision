export const selectYes = () => cy.get('[data-cy="answer-yes"]');
export const selectNo = () => cy.get('[data-cy="answer-no"]');
export const selectSomeOf = () => cy.get('[data-cy="answer-some"]');
export const errorMessageOwnAllLand = () => cy.get('#own-all-the-land-error');
export const errorMessageOwnSomeLand = () => cy.get('#own-some-of-the-land-error');
export const errorMessageKnowTheOwners = () => cy.get('#know-the-owners-error');
export const errorMessageAgriculturalHolding = () => cy.get('#agricultural-holding-error');
export const hintTextAgriculturalHolding = () => cy.get('#agricultural-holding-hint');
export const errorMessageAreYouATenant = () => cy.get('#are-you-a-tenant-error');
export const errorMessageOtherTenants = () => cy.get('#other-tenants-error');
export const textBox = () => cy.get('#visible-from-road-details');
export const checkBoxIdentifyingTheOwners = () => cy.get('[data-cy=identifying-the-owners]');
export const errorMessageIdentifyingTheOwners = () => cy.get('#identifying-the-owners-error');
export const checkBoxLabelIdentifyingTheOwners = () => cy.get(".govuk-label");
export const statementTitle = () => cy.get(".govuk-heading-m");
export const listItem1IdentifyingTheOwners = () => cy.findAllByText('searching the land registry');
export const listItem2IdentifyingTheOwners = () => cy.findAllByText('putting up a site notice at the appeal site');
export const tellingTheLandOwnersToldAboutAppeal = () => cy.get('[data-cy=telling-the-landowners-toldAboutMyAppeal]');
export const tellingTheLandOwnersWithinLast21Days = () => cy.get('[data-cy=telling-the-landowners-withinLast21Days]');
export const tellingTheLandOwnersUseCopyOfTheForm = () => cy.get('[data-cy=telling-the-landowners-useCopyOfTheForm]');
export const tellingTheLandownersText = () =>cy.findByText('You must have told all the landowners about your appeal.');
export const tellingTheLandownersFormInAnnex = () => cy.findByRole('link',{name:"form in annexe 2A or 2B of the 'making your appeal' guidance"});
export const errorMessageTellingTheLandowners = () => cy.get('#telling-the-landowners-error');
export const tellingTheOtherLandownersText =() =>cy.findByText('You must have told all the other landowners about your appeal.');
