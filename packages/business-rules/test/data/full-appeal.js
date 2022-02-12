const appeal = {
  id: 'fc7cb757-fe21-46dd-b3fd-121c385cd884',
  horizonId: 'HORIZON123',
  lpaCode: 'E69999999',
  decisionDate: new Date(),
  state: 'SUBMITTED',
  appealType: '1005',
  typeOfPlanningApplication: 'full-appeal',
  eligibility: {
    applicationCategories: 'none_of_these',
    applicationDecision: 'granted',
    enforcementNotice: false,
  },
  contactDetailsSection: {
    isOriginalApplicant: true,
    contact: {
      name: 'a name',
      email: 'testemail@example.com',
      companyName: 'Test Company',
    },
    appealingOnBehalfOf: {
      name: '',
      companyName: '',
    },
  },
  appealSiteSection: {
    siteAddress: {
      addressLine1: 'Site Address 1',
      addressLine2: 'Site Address 2',
      town: 'Site Town',
      county: 'Site County',
      postcode: 'SW1 1AA',
    },
    siteOwnership: {
      ownsSomeOfTheLand: false,
      ownsAllTheLand: true,
      knowsTheOwners: 'yes',
      hasIdentifiedTheOwners: 'i-agree',
    },
    agriculturalHolding: {
      isAgriculturalHolding: true,
      isTenant: true,
      hasOtherTenants: true,
    },
    visibleFromRoad: {
      isVisible: false,
      details: 'Access via the road at the side of the property',
    },
    healthAndSafety: {
      hasIssues: true,
      details: 'The site has poor mobile reception',
    },
  },
  planningApplicationDocumentsSection: {
    applicationNumber: 'ABCDE12345',
    originalApplication: {
      uploadedFile: {
        id: '372c8ba6-dfa6-4bba-bf9c-b024e3d8c282',
        name: 'originalApplication.pdf',
        fileName: 'originalApplication.pdf',
        originalFileName: 'originalApplication.pdf',
        location: '372c8ba6-dfa6-4bba-bf9c-b024e3d8c282/originalApplication.pdf',
        size: 1000,
      },
    },
    decisionLetter: {
      uploadedFile: {
        id: '89b73320-8165-43f9-83e8-43bc0d927140',
        name: 'decisionLetter.pdf',
        fileName: 'decisionLetter.pdf',
        originalFileName: 'decisionLetter.pdf',
        location: '89b73320-8165-43f9-83e8-43bc0d927140/decisionLetter.pdf',
        size: 1000,
      },
    },
    designAccessStatement: {
      isSubmitted: true,
      uploadedFile: {
        id: '4325a1bb-7bae-4d31-bdeb-8147248def03',
        name: 'designAccessStatement.pdf',
        fileName: 'designAccessStatement.pdf',
        originalFileName: 'designAccessStatement.pdf',
        location: '4325a1bb-7bae-4d31-bdeb-8147248def03/designAccessStatement.pdf',
        size: 1000,
      },
    },
  },
  appealDocumentsSection: {
    appealStatement: {
      uploadedFile: {
        id: '87e645e4-1050-458b-93df-1bff89b5b87c',
        name: 'appealStatement.pdf',
        fileName: 'appealStatement.pdf',
        originalFileName: 'appealStatement.pdf',
        location: '87e645e4-1050-458b-93df-1bff89b5b87c/appealStatement.pdf',
        size: 1000,
      },
      hasSensitiveInformation: false,
    },
    plansDrawings: {
      hasPlansDrawings: true,
      uploadedFile: {
        id: '89280aa4-d925-4525-8050-938d5db41a5a',
        name: 'plansDrawings.pdf',
        fileName: 'plansDrawings.pdf',
        originalFileName: 'plansDrawings.pdf',
        location: '89280aa4-d925-4525-8050-938d5db41a5a/plansDrawings.pdf',
        size: 1000,
      },
    },
  },
  appealSubmission: {
    appealPDFStatement: {
      uploadedFile: {
        id: '01739574-e34c-4da0-8163-17e55268af7c',
        name: 'appealPDFStatement.pdf',
        fileName: 'appealPDFStatement.pdf',
        originalFileName: 'appealPDFStatement.pdf',
        location: '01739574-e34c-4da0-8163-17e55268af7c/appealPDFStatement.pdf',
        size: 1000,
      },
    },
  },
  sectionStates: {
    contactDetailsSection: {
      isOriginalApplicant: 'NOT STARTED',
      contact: 'NOT STARTED',
      appealingOnBehalfOf: 'NOT STARTED',
    },
    appealSiteSection: {
      siteAddress: 'NOT STARTED',
      siteOwnership: 'NOT STARTED',
      agriculturalHolding: 'NOT STARTED',
      visibleFromRoad: 'NOT STARTED',
      healthAndSafety: 'NOT STARTED',
    },
    planningApplicationDocumentsSection: {
      applicationNumber: 'NOT STARTED',
      originalApplication: 'NOT STARTED',
      decisionLetter: 'NOT STARTED',
      designAccessStatement: 'NOT STARTED',
    },
    appealDocumentsSection: {
      appealStatement: 'NOT STARTED',
      plansDrawings: 'NOT STARTED',
    },
  },
};

module.exports = appeal;
