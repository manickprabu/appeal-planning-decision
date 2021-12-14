const multiDocument = require('./multi-document');

describe('schemas/components/insert/multi-document', () => {
  const config = {};

  let data;

  beforeEach(() => {
    data = {
      uploadedFiles: [
        {
          name: 'test-pdf.pdf',
          originalFileName: 'test-pdf.pdf',
          id: '50b9d223-84c9-4b87-a8ed-5ab1b0ab42d0',
        },
      ],
    };
  });

  it('should handle valid data', async () => {
    const result = await multiDocument().validate(data, config);
    expect(result).toEqual(data);
  });

  it('should ignore invalid fields', async () => {
    const data2 = {
      ...data,
      unknownField1: 'unknown field 1',
      unknownField2: 'unknown field 2',
      unknownField3: 'unknown field 3',
    };

    const result = await multiDocument().validate(data2, config);
    expect(result).toEqual(data);
  });
});
