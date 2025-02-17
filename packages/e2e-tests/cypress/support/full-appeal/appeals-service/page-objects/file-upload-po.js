export const errorFileUploadField = () => cy.get('#file-upload-error');
export const errorFileUploadSummary = () => cy.get('.govuk-list > :nth-child(1) > a');
export const filesYouCanUpload = () => cy.findAllByText('Files you can upload');
export const filesCanUploadHintText = () => cy.get('.govuk-details__summary-text');
export const uploadedFileLabel = () => cy.findAllByText('Uploaded file');
export const uploadedFileLabelMultipleFiles = () => cy.findAllByText('Uploaded files');
export const uploadedFileName = () => cy.get('.govuk-link');
export const replaceTheFileLabel = () => cy.findAllByText('Replace the file');
export const sectionText = () => cy.get('.govuk-body');
export const dragAndDropAFile = () => cy.findAllByText('Drag and drop or choose a file');
export const dragAndDropMultipleFiles = () => cy.findAllByText('Drag and drop or choose files');
export const plansOrDrawingsErrorMessage = () => cy.get('#plans-drawings-error');
export const supportingDocumentsErrorMessage = () => cy.get('#supporting-documents-error');



