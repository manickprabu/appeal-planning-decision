jest.mock("../../../src/lib/clamd")
jest.mock('clamscan')

const clamd = require('../../../src/lib/clamd');

describe('lib/clamd', () => {
  it("should send valid file", async () => {
    const file = Buffer.from([])
    const result = await clamd.sendFile(file);
    expect(result.isInfected).toEqual(expected);
  })

  it("should send invalid file", async () => {
    const result = await clamd.sendFile(undefined);
    expect(result.isInfected).toEqual(expected);
  })
});
