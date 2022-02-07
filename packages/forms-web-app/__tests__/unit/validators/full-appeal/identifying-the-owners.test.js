const { validationResult } = require('express-validator');
const { rules } = require('../../../../src/validators/full-appeal/identifying-the-owners');
const { testExpressValidatorMiddleware } = require('../validation-middleware-helper');

describe('validators/full-appeal/identifying-the-owners', () => {
  const res = jest.fn();
  const fieldName = 'identifying-the-owners';

  it('should not return an error if a valid value is given', async () => {
    const req = {
      body: {
        [fieldName]: 'i-agree',
      },
    };

    await testExpressValidatorMiddleware(req, res, rules);

    const result = validationResult(req);

    expect(result.errors).toHaveLength(0);
  });

  it('should return an error if an value is not given', async () => {
    const req = {
      body: {
        [fieldName]: undefined,
      },
    };

    await testExpressValidatorMiddleware(req, res, rules);

    const result = validationResult(req);

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].location).toEqual('body');
    expect(result.errors[0].msg).toEqual(`Confirm if you've attempted to identify the landowners`);
    expect(result.errors[0].param).toEqual(fieldName);
    expect(result.errors[0].value).toEqual(undefined);
  });

  it('should return an error if an invalid value is given', async () => {
    const req = {
      body: {
        [fieldName]: 'not valid',
      },
    };

    await testExpressValidatorMiddleware(req, res, rules);

    const result = validationResult(req);

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].location).toEqual('body');
    expect(result.errors[0].msg).toEqual('Invalid value');
    expect(result.errors[0].param).toEqual(fieldName);
    expect(result.errors[0].value).toEqual('not valid');
  });
});
