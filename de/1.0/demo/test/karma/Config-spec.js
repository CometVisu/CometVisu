/* Config-spec.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


describe('test cv.Config error reporting setup', function () {
  var originalSentry;

  beforeEach(function () {
    originalSentry = window.Sentry;
    cv.Config.sentryEnabled = false;
    cv.Config.transactionId = undefined;
  });

  afterEach(function () {
    if (originalSentry === undefined) {
      delete window.Sentry;
    } else {
      window.Sentry = originalSentry;
    }
    cv.Config.sentryEnabled = false;
    cv.Config.transactionId = undefined;
  });

  it('should not enable error reporting when the Sentry SDK was not loaded', function () {
    delete window.Sentry;

    expect(function () {
      cv.Config.enableErrorReporting(true);
    }).not.toThrow();

    expect(cv.Config.sentryEnabled).toBe(false);
    expect(cv.Config.transactionId).toBeUndefined();
  });

  it('should not enable error reporting when only a partial Sentry object exists', function () {
    // rewriteframes.min.js creates a partial window.Sentry without the core API
    window.Sentry = {
      Integrations: {},
      rewriteFramesIntegration: function () {}
    };

    expect(function () {
      cv.Config.enableErrorReporting(true);
    }).not.toThrow();

    expect(cv.Config.sentryEnabled).toBe(false);
    expect(cv.Config.transactionId).toBeUndefined();
  });

  it('should enable error reporting and set tags when the SDK is fully loaded', function () {
    window.Sentry = { setTag: jasmine.createSpy('setTag') };

    cv.Config.enableErrorReporting(true);

    expect(cv.Config.sentryEnabled).toBe(true);
    expect(cv.Config.transactionId).toBeDefined();
    expect(window.Sentry.setTag).toHaveBeenCalledWith('transaction_id', cv.Config.transactionId);
    expect(window.Sentry.setTag).toHaveBeenCalledWith('build.date', cv.Version.DATE);
    expect(window.Sentry.setTag).toHaveBeenCalledWith('build.branch', cv.Version.BRANCH);
  });

  it('should not touch Sentry when error reporting was not requested', function () {
    window.Sentry = { setTag: jasmine.createSpy('setTag') };

    cv.Config.enableErrorReporting(false);

    expect(cv.Config.sentryEnabled).toBe(false);
    expect(cv.Config.transactionId).toBeUndefined();
    expect(window.Sentry.setTag).not.toHaveBeenCalled();
  });
});
