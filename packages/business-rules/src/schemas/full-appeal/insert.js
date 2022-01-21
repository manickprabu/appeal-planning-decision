const pinsYup = require('../../lib/pins-yup');
const parseDateString = require('../../utils/parse-date-string');
const {
  APPEAL_ID,
  APPEAL_STATE,
  APPLICATION_DECISION,
  TYPE_OF_PLANNING_APPLICATION,
} = require('../../constants');

const insert = pinsYup
  .object()
  .noUnknown(true)
  .shape({
    id: pinsYup.string().trim().uuid().required(),
    horizonId: pinsYup.string().trim().max(20).nullable(),
    lpaCode: pinsYup.string().trim().max(20).nullable(),
    state: pinsYup.string().oneOf(Object.values(APPEAL_STATE)).default(APPEAL_STATE.DRAFT),
    appealType: pinsYup.lazy((appealType) => {
      if (appealType) {
        return pinsYup.string().oneOf(Object.values(APPEAL_ID));
      }
      return pinsYup.string().nullable();
    }),
    decisionDate: pinsYup.date().transform(parseDateString).nullable(),
    eligibility: pinsYup
      .object()
      .shape({
        applicationCategories: pinsYup.lazy((applicationCategories) => {
          if (applicationCategories) {
            return pinsYup.string().matches('none_of_these');
          }
          return pinsYup.string().nullable();
        }),
        applicationDecision: pinsYup.lazy((applicationDecision) => {
          if (applicationDecision) {
            return pinsYup.string().oneOf(Object.values(APPLICATION_DECISION));
          }
          return pinsYup.string().nullable();
        }),
        enforcementNotice: pinsYup.bool().nullable(),
      })
      .noUnknown(true),
    beforeYouStartSection: pinsYup
      .object()
      .shape({
        typeOfPlanningApplication: pinsYup.lazy((typeOfPlanningApplication) => {
          if (typeOfPlanningApplication) {
            return pinsYup.string().oneOf(Object.values(TYPE_OF_PLANNING_APPLICATION));
          }
          return pinsYup.string().nullable();
        }),
      })
      .noUnknown(true),
    aboutYouSection: pinsYup
      .object()
      .shape({
        yourDetails: pinsYup.object().shape({
          isOriginalApplicant: pinsYup.bool().nullable(),
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
                name: pinsYup.string().trim().max(255).ensure(),
                originalFileName: pinsYup.string().trim().max(255).ensure(),
                id: pinsYup.string().trim().uuid().nullable().default(null),
              })
              .noUnknown(true),
            hasSensitiveInformation: pinsYup.bool().nullable().default(null),
          })
          .noUnknown(true),
      })
      .noUnknown(true),
    contactDetailsSection: pinsYup
      .object()
      .shape({
        name: pinsYup.lazy((name) => {
          if (name) {
            return pinsYup
              .string()
              .min(2)
              .max(80)
              .matches(/^[a-z\-' ]+$/i)
              .required();
          }
          return pinsYup.string().nullable();
        }),
        companyName: pinsYup.string().max(50).nullable(),
        email: pinsYup.string().email().max(255).nullable(),
      })
      .noUnknown(true),
    appealSiteSection: pinsYup
      .object()
      .shape({
        siteAddress: pinsYup
          .object()
          .shape({
            addressLine1: pinsYup.string().max(60).nullable(),
            addressLine2: pinsYup.string().max(60).nullable(),
            town: pinsYup.string().max(60).nullable(),
            county: pinsYup.string().max(60).nullable(),
            postcode: pinsYup.string().max(8).nullable(),
          })
          .noUnknown(true),
        ownsSomeOfTheLand: pinsYup.bool().nullable(),
      })
      .noUnknown(true),
    planningApplicationDocumentsSection: pinsYup
      .object()
      .shape({
        applicationNumber: pinsYup.string().max(30).nullable(),
        isDesignAccessStatementSubmitted: pinsYup.bool().nullable(),
        originalApplication: pinsYup
          .object()
          .shape({
            uploadedFile: pinsYup
              .object()
              .shape({
                name: pinsYup.string().trim().max(255).ensure(),
                originalFileName: pinsYup.string().trim().max(255).ensure(),
                id: pinsYup.string().trim().uuid().nullable().default(null),
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
                name: pinsYup.string().trim().max(255).ensure(),
                originalFileName: pinsYup.string().trim().max(255).ensure(),
                id: pinsYup.string().trim().uuid().nullable().default(null),
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
                name: pinsYup.string().trim().max(255).ensure(),
                originalFileName: pinsYup.string().trim().max(255).ensure(),
                id: pinsYup.string().trim().uuid().nullable().default(null),
              })
              .noUnknown(true),
          })
          .noUnknown(true),
      })
      .noUnknown(true),
    sectionStates: pinsYup.object().shape({}),
  });

module.exports = insert;
