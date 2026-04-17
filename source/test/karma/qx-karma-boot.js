/**
 * Karma Qooxdoo bootstrap finalization.
 *
 * This file is loaded after all Qooxdoo transpiled scripts but before test specs.
 *
 * Problem: The Qooxdoo index.js normally calls qx.$$loader.init() which dynamically
 * loads all scripts and calls signalStartup() asynchronously (via setTimeout(..., 0)).
 * Karma-qooxdoo already includes all scripts as static <script> tags, so the dynamic
 * loading in init() is both redundant and creates a race condition.
 *
 * The karma.conf.js preprocessor replaces init() with just importPackageData(),
 * preventing the dynamic loading race. This script then calls signalStartup()
 * directly to complete the bootstrap:
 *
 * signalStartup() does:
 * 1. executePendingDefers() - finalize all class definitions
 * 2. delayDefer = false - future class definitions finalize immediately
 * 3. scriptLoaded = true - enable the Application "ready" event
 * 4. Application.onScriptLoaded() - starts the Application
 *
 * The Application is later cleaned up by helper-spec.js's resetApplication().
 */
(function() {
  var l = qx.$$loader;
  if (l && typeof l.signalStartup === 'function') {
    l.signalStartup();
  }
})();
