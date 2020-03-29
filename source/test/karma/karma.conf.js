// Karma configuration
// Generated on Sat Mar 05 2016 11:10:08 GMT+0100 (CET)

module.exports = function(config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../../compiled/',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qooxdoo', 'jasmine'],

    // list of files / patterns to load in the browser => auto-filled by the qooxdoo adapter
    files: [
      "source/test/karma/helper-spec.js",
      { pattern: "source/test/karma/*-spec.js" },
      { pattern: "source/test/karma/**/*-spec.js" },
      { pattern: "source/test/fixtures/**", included: false },
      { pattern: "source/resource/**/*", included: false, served: true, watched: false },
      { pattern: "source/transpiled/**/*", included: false, served: true, watched: false },
      { pattern: "source/**/*.map", included: false, served: true, watched: false }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'source/cv/{*.js,!(report)/**/*.js}': 'sourcemap'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec' ], //, 'coverage'],

    specReporter: {
      maxLogLines: 5,         // limit number of lines logged per test
      suppressErrorSummary: true,  // do not print error summary
      suppressFailed: false,  // do not print information about failed tests
      suppressPassed: false,  // do not print information about passed tests
      suppressSkipped: true,  // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },

    coverageReporter : {
      dir: 'coverage',
      reporters: [
        { type: 'html'},
        { type : 'text-summary' }
      ]
    },

    // web server port
    port: 9876,

    proxies: {
      '/source/resource/designs/get_designs.php': '/base/source/test/fixtures/designs.json',
      '/source/resource/designs': '/base/source/resource/designs',
      '/resource/plugins/tr064/soap.php': '/base/source/test/fixtures/tr064_soap.json',
      '/resource/plugins/tr064/proxy.php': '/base/source/test/fixtures/tr064_proxy.xml',
      '/source/cv': '/base/source/cv',
      '/external/qooxdoo': '/base/external/qooxdoo',
      '/source/resource': '/base/source/resource',
      '../source/resource': '/base/source/resource',
      '/cgi-bin': '/base/source/resource/test'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    browserNoActivityTimeout: 6000000,
    browserDisconnectTimeout: 6000000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    customLaunchers: {
      Chrome_travis: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
},


  // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    qooxdooFramework: {
      testSources: true,
      codePath: 'source/',
      scriptFile: "cv/boot.js"
    }
  });
};
