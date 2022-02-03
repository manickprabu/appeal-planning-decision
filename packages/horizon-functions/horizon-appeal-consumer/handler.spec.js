const handler = require('./handler');
const lpa = require('./src/getLpaData');
const horizon = require('./src/callHorizon');
const documents = require('./src/publishDocuments');

describe('functions/horizon-appeal-consumer', () => {
  it('should submit householder data', async () => {
    const context = {};
    const event = {
      appealId: '12345',
    };

    const getLpaDataSpy = jest.spyOn(lpa, 'getLpaData');
    const callHorizonSpy = jest.spyOn(horizon, 'callHorizon');
    const publishDocumentsSpy = jest.spyOn(documents, 'publishDocuments');

    await handler(context, event);
    expect(getLpaDataSpy).toBeCalled();
    expect(callHorizonSpy).toBeCalled();
    expect(publishDocumentsSpy).toBeCalled();
  });

  it('should not be able to submit householder data with wrong location', () => {
    jest.mock('./src/getLpaData', () => ({
      getLpaDataSpy: jest.fn(() => ({
        lpa: {
          england: false,
          wales: false,
          ireland: true,
        },
      })),
    }));

    const context = {};
    const event = {
      _id: '12345',
      appeal: {
        appealType: '1001',
        decisionDate: new Date(),
        updatedAt: new Date(),
        requiredDocumentsSection: {
          applicationNumber: '',
        },
        appealSiteSection: {
          siteAddress: {
            addressLine1: '',
            addressLine2: '',
            town: '',
            county: '',
            postcode: '',
          },
          siteOwnership: {
            ownsWholeSite: 'Certificate A',
          },
          siteAccess: {
            canInspectorSeeWholeSiteFromPublicRoad: true,
          },
        },
      },
    };

    handler(context, event);
    expect(context).toBeCalled();
  });
});
