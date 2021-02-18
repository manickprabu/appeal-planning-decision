const { styleTag } = require('./styles/gds-style');

const appealTemplate = (appeal) => {
  const timeSubmitted = new Date(appeal.timeSubmitted).toDateString();
  let originalApplicant = '';
  if (!appeal.aboutYouSection.yourDetails.isOriginalApplicant) {
    originalApplicant = `
      <div class='govuk-summary-list__row'>
        <dt class='govuk-summary-list__key'>Original applicant</dt>
        <dd class='govuk-summary-list__value'>
          <span>${appeal.aboutYouSection.yourDetails.appealingOnBehalfOf}</span>
        </dd>
      </div>
    `;
  }

  let documentNames = '';
  const documents = appeal.yourAppealSection.otherDocuments.uploadedFiles.map((doc) => {
    documentNames = `<span>${documentNames + doc.name}</span><br/>`;
    return doc;
  });
  let documentCount = 'No files uploaded';
  if (documents.length > 0) {
    documentCount =
      documents.length === 1 ? `1 file uploaded` : `${documents.length} files uploaded`;
  }
  const otherDocuments = `
      <p>${documentCount}</p>
      ${documentNames}
    `;

  const line1 = appeal.appealSiteSection.siteAddress.addressLine1
    ? `<span>${appeal.appealSiteSection.siteAddress.addressLine1}</span><br/>`
    : '';
  const line2 = appeal.appealSiteSection.siteAddress.addressLine2
    ? `<span>${appeal.appealSiteSection.siteAddress.addressLine2}</span><br/>`
    : '';
  const line3 = appeal.appealSiteSection.siteAddress.town
    ? `<span>${appeal.appealSiteSection.siteAddress.town}</span><br/>`
    : '';
  const line4 = appeal.appealSiteSection.siteAddress.county
    ? `<span>${appeal.appealSiteSection.siteAddress.county}</span><br/>`
    : '';
  const line5 = appeal.appealSiteSection.siteAddress.postcode
    ? `<span>${appeal.appealSiteSection.siteAddress.postcode}</span><br/>`
    : '';
  const seeWholeSite = appeal.appealSiteSection.siteAccess.canInspectorSeeWholeSiteFromPublicRoad
    ? `Yes`
    : `${appeal.appealSiteSection.siteAccess.howIsSiteAccessRestricted}`;
  const healthAndSafety = appeal.appealSiteSection.healthAndSafety.hasIssues
    ? `${appeal.appealSiteSection.healthAndSafety.healthAndSafetyIssues}`
    : `No`;

  return `
  <html>
    <head>
      ${styleTag}
    </head>
    <body class='govuk-template__body '>
      <div class='govuk-width-container govuk-body '>
        <main id='main-content' role='main'>
          <div class='govuk-main-wrapper govuk-main-wrapper--auto-spacing'>
            <div class='govuk-grid-row'>
              <div class='govuk-grid-column-full'>
                <h1 class='govuk-heading-l'>Householder planning appeal</h1>
                <p>Submitted to the Planning Inspectorate on ${timeSubmitted}</p>
                <h2 class='govuk-heading-m'>Before you start</h2>
                <dl class='govuk-summary-list govuk-summary-list govuk-!-margin-bottom-9'>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Local planning department</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${appeal.lpaName}</span>
                    </dd>
                  </div>
                </dl>
                <h2 class='govuk-heading-m'>About you</h2>
                <dl class='govuk-summary-list govuk-summary-list govuk-!-margin-bottom-9'>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Was the original planning application made in your name?</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${
                        appeal.aboutYouSection.yourDetails.isOriginalApplicant ? 'Yes' : 'No'
                      }</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Your name</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${appeal.aboutYouSection.yourDetails.name}</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Your email</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${appeal.aboutYouSection.yourDetails.email}</span>
                    </dd>
                  </div>
                  ${originalApplicant}
                </dl>
                <h2 class='govuk-heading-m'>About the original planning application</h2>
                <dl class='govuk-summary-list govuk-summary-list govuk-!-margin-bottom-9'>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Planning application number</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${appeal.requiredDocumentsSection.applicationNumber}</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Planning application form</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${
                        appeal.requiredDocumentsSection.originalApplication.uploadedFile.name
                      }</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Decision letter</dt>
                     <dd class='govuk-summary-list__value'>
                       <span>${
                         appeal.requiredDocumentsSection.decisionLetter.uploadedFile.name
                       }</span>
                     </dd>
                  </div>
                </dl>
                <h2 class='govuk-heading-m'>About your appeal</h2>
                <dl class='govuk-summary-list govuk-summary-list govuk-!-margin-bottom-9'>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Your appeal statement</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${appeal.yourAppealSection.appealStatement.uploadedFile.name}</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Documents to support your appeal</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${otherDocuments}</span>
                    </dd>
                  </div>
                </dl>
                <h2 class='govuk-heading-m'>Visiting the appeal site</h2>
                <dl class='govuk-summary-list govuk-summary-list govuk-!-margin-bottom-9'>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Address of the appeal site</dt>
                    <dd class='govuk-summary-list__value'>
                      ${line1 + line2 + line3 + line4 + line5}
                     </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Do you own the whole appeal site?</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${
                        appeal.appealSiteSection.siteOwnership.ownsWholeSite ? 'Yes' : 'No'
                      }</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Can the Inspector see the whole of the appeal site from a public road?</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${seeWholeSite}</span>
                    </dd>
                  </div>
                  <div class='govuk-summary-list__row'>
                    <dt class='govuk-summary-list__key'>Any health and safety issues?</dt>
                    <dd class='govuk-summary-list__value'>
                      <span>${healthAndSafety}</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  </html>
  `;
};

module.exports = appealTemplate;
