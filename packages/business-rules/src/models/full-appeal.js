const appeal = {
  id: null,
  horizonId: null,
  lpaCode: null,
  decisionDate: null,
  submissionDate: null,
  state: 'DRAFT',
  appealType: null,
  eligibility: {
    applicationCategories: null,
    applicationDecision: null,
    enforcementNotice: null,
    typeOfPlanningApplication: null,
  },
  contactDetailsSection: {
    isOriginalApplicant: null,
    contact: {
      name: null,
      email: null,
      companyName: null,
    },
    appealingOnBehalfOf: {
      name: null,
      companyName: null,
    },
  },
  appealSiteSection: {
    siteAddress: {
      addressLine1: null,
      addressLine2: null,
      town: null,
      county: null,
      postcode: null,
    },
    siteOwnership: {
      ownsSomeOfTheLand: null,
      ownsAllTheLand: null,
      knowsTheOwners: null,
      hasIdentifiedTheOwners: null,
    },
    agriculturalHolding: {
      isAgriculturalHolding: null,
      isTenant: null,
      hasOtherTenants: null,
    },
    visibleFromRoad: {
      isVisible: null,
      details: null,
    },
    healthAndSafety: {
      hasIssues: null,
      details: null,
    },
  },
  planningApplicationDocumentsSection: {
    applicationNumber: null,
    originalApplication: {
      uploadedFile: {
        name: '',
        originalFileName: '',
        id: null,
      },
    },
    decisionLetter: {
      uploadedFile: {
        name: '',
        originalFileName: '',
        id: null,
      },
    },
    designAccessStatement: {
      isSubmitted: null,
      uploadedFile: {
        name: '',
        originalFileName: '',
        id: null,
      },
    },
  },
  appealDocumentsSection: {
    appealStatement: {
      uploadedFile: {
        name: '',
        originalFileName: '',
        id: null,
      },
      hasSensitiveInformation: null,
    },
  },
  appealSubmission: {
    appealPDFStatement: {
      uploadedFile: {
        name: '',
        originalFileName: '',
        id: null,
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
      visibilityFromRoad: 'NOT STARTED',
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
    },
  },
};

module.exports = appeal;
