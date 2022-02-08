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
  FULL_APPEAL: 'full-appeal',
  HOUSEHOLDER_PLANNING: 'householder-planning',
  OUTLINE_PLANNING: 'outline-planning',
  PRIOR_APPROVAL: 'prior-approval',
  RESERVED_MATTERS: 'reserved-matters',
  REMOVAL_OR_VARIATION_OF_CONDITIONS: 'removal-or-variation-of-conditions',
  SOMETHING_ELSE: 'something-else',
  I_HAVE_NOT_MADE_A_PLANNING_APPLICATION: 'i-have-not-made-a-planning-application',
};

const APPLICATION_DECISION = {
  GRANTED: 'granted',
  REFUSED: 'refused',
  NODECISIONRECEIVED: 'nodecisionreceived',
};

const APPLICATION_CATEGORIES = {
  LISTED_BUILDING: 'a_listed_building',
  MAJOR_DWELLINGS: 'major_dwellings',
  MAJOR_GENERAL_INDUSTRY_STORAGE_WAREHOUSING: 'major_general_industry_storage_warehousing',
  MAJOR_RATAIL_AND_SERVICES: 'major_retail_and_services',
  MAJOR_TRAVELLING_AND_CARAVAN_PITCHES: 'major_travelling_and_caravan_pitches',
  NON_OF_THESE: 'none_of_these',
};

const KNOW_THE_OWNERS = {
  YES: 'yes',
  SOME: 'some',
  NO: 'no',
};

const I_AGREE = 'i-agree';

module.exports = {
  APPEAL_ID,
  APPEAL_STATE,
  APPLICATION_DECISION,
  APPLICATION_CATEGORIES,
  KNOW_THE_OWNERS,
  PROCEDURE_TYPE,
  SECTION_STATE,
  TYPE_OF_PLANNING_APPLICATION,
  I_AGREE,
};
