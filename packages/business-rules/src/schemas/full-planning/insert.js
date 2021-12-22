const pinsYup = require('../../lib/pins-yup');
const { APPEAL_ID, APPEAL_STATE, TYPE_OF_PLANNING_APPLICATION } = require('../../constants');

const insert = pinsYup
  .object()
  .noUnknown(true)
  .shape({
    id: pinsYup.string().trim().uuid().required(),
    horizonId: pinsYup.string().trim().max(20).nullable(),
    lpaCode: pinsYup.string().trim().max(20).nullable(),
    state: pinsYup.string().oneOf(Object.values(APPEAL_STATE)).default(APPEAL_STATE.DRAFT),
    appealType: pinsYup.string().oneOf(Object.values(APPEAL_ID)),
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
    requiredDocumentsSection: pinsYup
      .object()
      .shape({
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
      })
      .noUnknown(true),
  });

module.exports = insert;
