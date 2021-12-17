const clamd = require('../../src/lib/clamd');

describe('lib/clamd', () => {
  describe('send file', () => {
    [
      {
        description: 'send infected pdf file to clamav server',
        given: () => Buffer.from([]),
        expected: true,
      },
    ].forEach(({ description, given, expected }) => {
      it(`should process negative file responses - ${description}`, async () => {
        const result = await clamd.sendFile(given());
        expect(result.isInfected).toEqual(expected);
      });
    });
  });
});
