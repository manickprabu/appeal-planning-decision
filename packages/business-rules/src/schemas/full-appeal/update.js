const pinsYup = require('../../lib/pins-yup');
const parseDateString = require('../../utils/parse-date-string');
const {
  APPLICATION_DECISION,
  APPEAL_ID,
  APPEAL_STATE,
  KNOW_THE_OWNERS,
  TYPE_OF_PLANNING_APPLICATION,
  I_AGREE,
} = require('../../constants');

const update = pinsYup
  .object()
  .noUnknown(true)
  .shape({
    id: pinsYup.string().trim().uuid().required(),
    horizonId: pinsYup.string().trim().max(20).nullable(),
    lpaCode: pinsYup.string().trim().max(20).required(),
    state: pinsYup.string().oneOf(Object.values(APPEAL_STATE)).required(),
    appealType: pinsYup.string().oneOf(Object.values(APPEAL_ID)).required(),
    typeOfPlanningApplication: pinsYup
      .string()
      .oneOf(Object.values(TYPE_OF_PLANNING_APPLICATION))
      .required(),
    decisionDate: pinsYup.lazy((decisionDate) => {
      return pinsYup
        .date()
        .isInThePast(decisionDate)
        .isWithinDeadlinePeriod(decisionDate)
        .transform(parseDateString)
        .required();
    }),
    eligibility: pinsYup
      .object()
      .shape({
        applicationCategories: pinsYup.string().matches('none_of_these').required(),
        applicationDecision: pinsYup.string().oneOf(Object.values(APPLICATION_DECISION)).required(),
        enforcementNotice: pinsYup.bool().required(),
      })
      .noUnknown(true),
    aboutYouSection: pinsYup
      .object()
      .shape({
        yourDetails: pinsYup.object().shape({
          isOriginalApplicant: pinsYup.bool().required(),
          appealingOnBehalfOf: pinsYup
            .string()
            .max(80)
            .matches(/^[a-z\-' ]*$/i)
            .nullable(),
          companyName: pinsYup.string().nullable(),
        }),
      })
      .noUnknown(true),
    yourAppealSection: pinsYup
      .object()
      .shape({
        appealStatement: pinsYup
          .object()
          .shape({
            uploadedFile: pinsYup
              .object()
              .shape({
                name: pinsYup.string().trim().max(255).required(),
                originalFileName: pinsYup.string().trim().max(255).required(),
                id: pinsYup.string().trim().uuid().required(),
              })
              .noUnknown(true),
            hasSensitiveInformation: pinsYup.bool().required(),
          })
          .noUnknown(true),
      })
      .noUnknown(true),
    contactDetailsSection: pinsYup
      .object()
      .shape({
        name: pinsYup
          .string()
          .min(2)
          .max(80)
          .matches(/^[a-z\-' ]+$/i)
          .required(),
        companyName: pinsYup.string().max(50).nullable(),
        email: pinsYup.string().email().max(255).required(),
      })
      .noUnknown(true),
    appealSubmission: pinsYup.object().shape({
      appealPDFStatement: pinsYup
        .object()
        .shape({
          uploadedFile: pinsYup
            .object()
            .shape({
              name: pinsYup.string().trim().max(255).required(),
              originalFileName: pinsYup.string().trim().max(255).required(),
              id: pinsYup.string().trim().uuid().required(),
              fileName: pinsYup.string().trim().max(255).required(),
              location: pinsYup.string().trim().required(),
              size: pinsYup.number().positive().integer().required(),
            })
            .noUnknown(true),
        })
        .noUnknown(true),
    }),
    appealSiteSection: pinsYup
      .object()
      .shape({
        siteAddress: pinsYup
          .object()
          .shape({
            addressLine1: pinsYup.string().max(60).required(),
            addressLine2: pinsYup.string().max(60).nullable(),
            town: pinsYup.string().max(60).nullable(),
            county: pinsYup.string().max(60).nullable(),
            postcode: pinsYup.string().max(8).required(),
          })
          .noUnknown(true),
        ownsSomeOfTheLand: pinsYup.bool().required(),
        ownsAllTheLand: pinsYup.bool().required(),
        knowsTheOwners: pinsYup.string().oneOf(Object.values(KNOW_THE_OWNERS)).required(),
        identifyingTheOwners: pinsYup.lazy((identifyingTheOwners) => {
          if (identifyingTheOwners) {
            return pinsYup.string().oneOf([I_AGREE]);
          }
          return pinsYup.string().nullable();
        }),
        isAgriculturalHolding: pinsYup.bool().required(),
        isAgriculturalHoldingTenant: pinsYup.bool().required(),
        areOtherTenants: pinsYup.bool().required(),
        isVisibleFromRoad: pinsYup.bool().required(),
        visibleFromRoadDetails: pinsYup.lazy((visibleFromRoadDetails) => {
          return pinsYup.mixed().conditionalText({
            fieldValue: visibleFromRoadDetails,
            fieldName: 'visibleFromRoadDetails',
            targetFieldName: 'isVisibleFromRoad',
            emptyError: 'Tell us how visibility is restricted',
            tooLongError: 'How visibility is restricted must be $maxLength characters or less',
          });
        }),
        hasHealthSafetyIssues: pinsYup.bool().required(),
        healthSafetyIssuesDetails: pinsYup.lazy((healthSafetyIssuesDetails) => {
          return pinsYup.mixed().conditionalText({
            fieldValue: healthSafetyIssuesDetails,
            fieldName: 'healthSafetyIssuesDetails',
            targetFieldName: 'hasHealthSafetyIssues',
            targetFieldValue: true,
            emptyError: 'Tell us about the health and safety issues',
            tooLongError: 'Health and safety information must be $maxLength characters or less',
          });
        }),
      })
      .noUnknown(true),
    planningApplicationDocumentsSection: pinsYup
      .object()
      .shape({
        applicationNumber: pinsYup.string().max(30).required(),
        isDesignAccessStatementSubmitted: pinsYup.bool().required(),
        originalApplication: pinsYup
          .object()
          .shape({
            uploadedFile: pinsYup
              .object()
              .shape({
                name: pinsYup.string().trim().max(255).required(),
                originalFileName: pinsYup.string().trim().max(255).required(),
                id: pinsYup.string().trim().uuid().required(),
              })
              .noUnknown(true),
          })
          .noUnknown(true),
        designAccessStatement: pinsYup
          .object()
          .shape({
            uploadedFile: pinsYup
              .object()
              .shape({
                name: pinsYup.string().trim().max(255).required(),
                originalFileName: pinsYup.string().trim().max(255).required(),
                id: pinsYup.string().trim().uuid().required(),
              })
              .noUnknown(true),
          })
          .noUnknown(true),
        decisionLetter: pinsYup
          .object()
          .shape({
            uploadedFile: pinsYup
              .object()
              .shape({
                name: pinsYup.string().trim().max(255).required(),
                originalFileName: pinsYup.string().trim().max(255).required(),
                id: pinsYup.string().trim().uuid().required(),
              })
              .noUnknown(true),
          })
          .noUnknown(true),
      })
      .noUnknown(true),
    sectionStates: pinsYup.object().shape({}),
  });

module.exports = update;
