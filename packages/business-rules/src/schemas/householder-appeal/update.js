const pinsYup = require('../../lib/pins-yup');
const parseDateString = require('../../utils/parse-date-string');
const singleDocumentUpdate = require('../components/update/single-document');
const multiDocumentUpdate = require('../components/update/multi-document');
const sectionState = require('../components/section-state');
const {
  APPLICATION_DECISION,
  APPEAL_ID,
  APPEAL_STATE,
  TYPE_OF_PLANNING_APPLICATION,
} = require('../../constants');

const update = pinsYup
  .object()
  .noUnknown(true)
  .shape({
    id: pinsYup.string().uuid().required(),
    horizonId: pinsYup.string().trim().max(20).nullable(),
    lpaCode: pinsYup.string().trim().max(20).required(),
    appealType: pinsYup.lazy((appealType) => {
      if (appealType) {
        return pinsYup.string().oneOf(Object.values(APPEAL_ID));
      }
      return pinsYup.string().nullable();
    }),
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
    submissionDate: pinsYup.date().transform(parseDateString).nullable(),
    state: pinsYup.string().oneOf(Object.values(APPEAL_STATE)).required(),
    eligibility: pinsYup
      .object()
      .shape({
        applicationDecision: pinsYup
          .mixed()
          .test(
            'applicationDecision',
            `eligibility.applicationDecision must be one of the following values: ${Object.values(
              APPLICATION_DECISION,
            ).join(', ')}`,
            function test(applicationDecision) {
              if (applicationDecision) {
                return pinsYup
                  .string()
                  .oneOf(Object.values(APPLICATION_DECISION))
                  .isValidSync(applicationDecision);
              }
              if (this.options.parent.householderPlanningPermission) {
                return pinsYup
                  .bool()
                  .required()
                  .isValidSync(this.options.parent.householderPlanningPermission);
              }
              return false;
            },
          ),
        enforcementNotice: pinsYup.bool().required(),
        householderPlanningPermission: pinsYup.bool().required(),
        isClaimingCosts: pinsYup.bool().required(),
        isListedBuilding: pinsYup.bool().required(),
      })
      .noUnknown(true),
    aboutYouSection: pinsYup
      .object()
      .shape({
        yourDetails: pinsYup.object().shape({
          isOriginalApplicant: pinsYup.bool().required(),
          name: pinsYup
            .string()
            .min(2)
            .max(80)
            .matches(/^[a-z\-' ]+$/i)
            .required(),
          email: pinsYup.string().email().max(255).required(),
          appealingOnBehalfOf: pinsYup
            .string()
            .max(80)
            .matches(/^[a-z\-' ]*$/i)
            .nullable(),
        }),
      })
      .noUnknown(true),
    requiredDocumentsSection: pinsYup
      .object()
      .shape({
        applicationNumber: pinsYup.string().max(30).required(),
        originalApplication: singleDocumentUpdate().required(),
        decisionLetter: singleDocumentUpdate().required(),
      })
      .noUnknown(true),
    yourAppealSection: pinsYup.object().shape({
      appealStatement: singleDocumentUpdate().shape({
        hasSensitiveInformation: pinsYup.bool().required(),
      }),
      otherDocuments: multiDocumentUpdate().required(),
    }),
    appealSubmission: pinsYup.object().shape({
      appealPDFStatement: singleDocumentUpdate().required(),
    }),
    appealSiteSection: pinsYup.object().shape({
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
      siteOwnership: pinsYup
        .object()
        .shape({
          ownsWholeSite: pinsYup.bool().required(),
          haveOtherOwnersBeenTold: pinsYup.bool().nullable(),
        })
        .noUnknown(true),
      siteAccess: pinsYup
        .object()
        .shape({
          canInspectorSeeWholeSiteFromPublicRoad: pinsYup.bool().required(),
          howIsSiteAccessRestricted: pinsYup.string().max(255).nullable(),
        })
        .noUnknown(true),
      healthAndSafety: pinsYup
        .object()
        .shape({
          hasIssues: pinsYup.bool().required(),
          healthAndSafetyIssues: pinsYup.string().max(255).nullable(),
        })
        .noUnknown(true),
    }),
    sectionStates: pinsYup.object().shape({
      aboutYouSection: pinsYup
        .object()
        .shape({
          yourDetails: sectionState().required(),
        })
        .noUnknown(true),
      requiredDocumentsSection: pinsYup
        .object()
        .shape({
          applicationNumber: sectionState().required(),
          originalApplication: sectionState().required(),
          decisionLetter: sectionState().required(),
        })
        .noUnknown(true),
      yourAppealSection: pinsYup
        .object()
        .shape({
          appealStatement: sectionState().required(),
          otherDocuments: sectionState().required(),
        })
        .noUnknown(true),
      appealSiteSection: pinsYup
        .object()
        .shape({
          siteAddress: sectionState().required(),
          siteAccess: sectionState().required(),
          siteOwnership: sectionState().required(),
          healthAndSafety: sectionState().required(),
        })
        .noUnknown(true),
    }),
  });

module.exports = update;
