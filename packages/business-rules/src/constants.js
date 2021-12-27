const APPEAL_ID = {
  ENFORCEMENT_NOTICE: '1000',
  HOUSEHOLDER: '1001',
  ENFORCEMENT_LISTED_BUILDING: '1002',
  ADVERTISEMENT: '1003',
  PLANNING_OBLIGATION: '1004',
  PLANNING_SECTION_78: '1005',
  PLANNING_LISTED_BUILDING: '1006',
  COMMERCIAL: '1007',
  MINOR_COMMERCIAL: '1008',
  HEDGEROW: '1009',
  HIGH_HEDGES: '1010',
  FAST_TRACK_TREES: '1011',
  FULL_PLANNING: '1012',
};

const APPEAL_STATE = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
};

const PROCEDURE_TYPE = {
  WRITTEN_REPRESENTATION: 'Written Representation',
  HEARING: 'Hearing',
  INQUIRY: 'Inquiry',
};

const SECTION_STATE = {
  NOT_STARTED: 'NOT STARTED',
  IN_PROGRESS: 'IN PROGRESS',
  COMPLETED: 'COMPLETED',
};

const TYPE_OF_PLANNING_APPLICATION = {
  FULL_PLANNING: 'full-planning',
  HOUSEHOLDER_PLANNING: 'householder-planning',
  OUTLINE_PLANNING: 'outline-planning',
  PRIOR_APPROVAL: 'prior-approval',
  RESERVED_MATTERS: 'reserved-matters',
  REMOVAL_OR_VARIATION_OF_CONDITIONS: 'removal-or-variation-of-conditions',
  SOMETHING_ELSE: 'something-else',
  I_HAVE_NOT_MADE_A_PLANNING_APPLICATION: 'i-have-not-made-a-planning-application',
};

module.exports = {
  APPEAL_ID,
  APPEAL_STATE,
  PROCEDURE_TYPE,
  SECTION_STATE,
  TYPE_OF_PLANNING_APPLICATION,
};
