/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const {
  initialiseOptionalJavaScripts,
} = require('../../../../src/lib/client-side/javascript-requiring-consent');

const { readCookie } = require('../../../../src/lib/client-side/cookie/cookie-jar');
const { initialiseGoogleAnalytics } = require('../../../../src/lib/client-side/google-analytics');
const googleTagManager = require('../../../../src/lib/client-side/google-tag-manager');

jest.mock('../../../../src/lib/client-side/cookie/cookie-jar');
jest.mock('../../../../src/lib/client-side/google-analytics');
jest.mock('../../../../src/lib/client-side/google-tag-manager');

describe('lib/client-side/javascript-requiring-consent', () => {
  describe('initialiseOptionalJavaScripts', () => {
    test('return early if cookie is null', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => null);

      initialiseOptionalJavaScripts(document, null);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith('Consent not yet given for optional JavaScripts.');

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('return early if cookie is not `JSON.parse`-able', () => {
      jest.spyOn(console, 'error').mockImplementation();

      readCookie.mockImplementation(() => 'string value here');

      initialiseOptionalJavaScripts(document, null);

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Unable to decode the value of cookie: cookie_policy',
        new SyntaxError('Unexpected token s in JSON at position 0')
      );

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('return early if `usage` is not defined', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => JSON.stringify({ a: 'b' }));

      initialiseOptionalJavaScripts(document, null);

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('return early if `usage=false and googleTagManager featureFlag undefined`', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => JSON.stringify({ usage: false }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          foo: true, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        'Declined consent. Third party cookies are not enabled.'
      );

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('return early if `usage=false and googleTagManager featureFlag false`', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => JSON.stringify({ usage: false }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: false, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        'Declined consent. Third party cookies are not enabled.'
      );

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('return early if `usage=false and googleTagManagerId is undefined`', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => JSON.stringify({ usage: false }));

      const config = {
        server: {
          foo: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: true, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        'Declined consent. Third party cookies are not enabled.'
      );

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('Deny Consent to Google Tag manager then return early if `usage=false and googleTagManagerId and googleTagManager feature flag is true`', () => {
      jest.spyOn(console, 'log').mockImplementation();

      readCookie.mockImplementation(() => JSON.stringify({ usage: false }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: true, // googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        'Declined consent. Third party cookies are not enabled.'
      );

      expect(googleTagManager.denyConsent).toHaveBeenCalled();

      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('calls through to Google Analytics if `usage=true and google tag manager feature flag undefined`', () => {
      readCookie.mockImplementation(() => JSON.stringify({ usage: true }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          foo: true, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      expect(initialiseGoogleAnalytics).toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('calls through to Google Analytics if `usage=true and google tag manager feature flag false`', () => {
      readCookie.mockImplementation(() => JSON.stringify({ usage: true }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: false, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      expect(initialiseGoogleAnalytics).toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('calls through to Google Analytics if `usage=true and googleTagManagerId undefined`', () => {
      readCookie.mockImplementation(() => JSON.stringify({ usage: true }));

      const config = {
        server: {
          foo: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: true, // no googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      expect(initialiseGoogleAnalytics).toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
      expect(googleTagManager.grantConsent).not.toHaveBeenCalled();
    });

    test('calls through to Google Tag Manager if `usage=true and googleTagManagerId and googleTagManager feature flag is true`', () => {
      jest.spyOn(console, 'log').mockImplementation();
      readCookie.mockImplementation(() => JSON.stringify({ usage: true }));

      const config = {
        server: {
          googleTagManagerId: 'some-test-value',
        },
        featureFlag: {
          googleTagManager: true, //  googletagmanager feature flag.
        },
      };

      initialiseOptionalJavaScripts(document, config);

      expect(googleTagManager.grantConsent).toHaveBeenCalled();
      expect(initialiseGoogleAnalytics).not.toHaveBeenCalled();
      expect(googleTagManager.denyConsent).not.toHaveBeenCalled();
    });
  });
});
