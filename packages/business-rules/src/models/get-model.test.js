const getModel = require('./get-model');
const householderAppeal = require('./householder-appeal');
const fullAppeal = require('./full-appeal');
const { APPEAL_ID } = require('../constants');

describe('schemas/get-model', () => {
  describe('getModel', () => {
    it('should throw an error if an invalid appeal type is given', () => {
      expect(() => getModel('100')).toThrow('100 is not a valid appeal type');
    });

    it('should return the householder appeal schema if an appeal type is not given', () => {
      const model = getModel(null);
      expect(model).toEqual(householderAppeal);
    });

    it('should return the full appeal schema if the full appeal appeal type is given', () => {
      const model = getModel(APPEAL_ID.PLANNING_SECTION_78);
      expect(model).toEqual(fullAppeal);
    });
  });
});
