jest.mock('../../../../src/services/department.service');
const { validationResult } = require('express-validator');
const { getDepartmentData } = require('../../../../src/services/department.service');
const { rules } = require('../../../../src/validators/full-appeal/local-planning-department');
const { testExpressValidatorMiddleware } = require('../validation-middleware-helper');

const departmentsData = {
  departments: ['lpa1', 'lpa2'],
  eligibleDepartments: ['lpa1'],
};

getDepartmentData.mockResolvedValue(departmentsData);

describe('validators/local-planning-department', () => {
  describe('rules', () => {
    it('is configured with the expected rules', () => {
      const rule = rules()[0].builder.build();

      expect(rules().length).toEqual(1);
      expect(rule.fields).toEqual(['local-planning-department']);
      expect(rule.locations).toEqual(['body']);
      expect(rule.optional).toBeFalsy();
      expect(rule.stack).toHaveLength(3);
      expect(rule.stack[0].message).toEqual('Enter the name of the local planning department');
    });
  });
  describe('validator', () => {
    [
      {
        title: 'eligible local planning department provided',
        given: () => ({
          body: {
            'local-planning-department': 'lpa1',
          },
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(0);
        },
      },
      {
        title: 'ineligible local planning department provided',
        given: () => ({
          body: {
            'local-planning-department': 'lpa2',
          },
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(1);
          expect(result.errors[0].msg).toEqual('Ineligible Department');
        },
      },
      {
        title: 'local planning department is not provided',
        given: () => ({
          body: {},
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(1);
          expect(result.errors[0].location).toEqual('body');
          expect(result.errors[0].msg).toEqual('Enter the name of the local planning department');
          expect(result.errors[0].param).toEqual('local-planning-department');
        },
      },
      {
        title: 'unknown local planning department is provided',
        given: () => ({
          body: {
            'local-planning-department': 'lpa23',
          },
        }),
        expected: (result) => {
          expect(result.errors).toHaveLength(1);
          expect(result.errors[0].location).toEqual('body');
          expect(result.errors[0].msg).toEqual('Enter the name of the local planning department');
          expect(result.errors[0].param).toEqual('local-planning-department');
        },
      },
    ].forEach(({ title, given, expected }) => {
      it(`should return the expected validation outcome - ${title}`, async () => {
        const mockReq = given();
        const mockRes = jest.fn();

        await testExpressValidatorMiddleware(mockReq, mockRes, rules());
        const result = validationResult(mockReq);
        expected(result);
      });
    });
  });
});
