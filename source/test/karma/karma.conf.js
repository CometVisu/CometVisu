/* karma.conf.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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


// Karma configuration
// Generated on Sat Mar 05 2016 11:10:08 GMT+0100 (CET)
const fs = require('fs');
const path = require('path');

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
      'source/test/karma/helper-spec.js',
      { pattern: 'source/cv/polyfill.js', included: true },
      { pattern: 'source/test/karma/*-spec.js' },
      { pattern: 'source/test/karma/**/*-spec.js' },
      { pattern: 'source/test/fixtures/*', included: false, served: true },
      'source/test/fixtures/karma/**',
      { pattern: 'source/resource/**/*', included: false, served: true, watched: false },
      { pattern: 'source/transpiled/**/*', included: false, served: true, watched: false },
      { pattern: 'source/**/*.map', included: false, served: true, watched: false },
      { pattern: 'source/rest/manager/*.php', included: false, served: true, watched: false },
      { pattern: 'source/version', included: false, served: true, watched: false }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'source/transpiled/cv/{*.js,!(report)/**/*.js}': ['coverage'],
      'source/test/fixtures/karma/*.xml': ['html2js']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false // print the time elapsed for each spec
    },

    coverageReporter : {
      dir: '../coverage/',
      reporters: [
        {
          type: 'text-summary'
        }, {
          type: 'html',
          subdir: '.'
        }, {
          type: 'lcovonly',
          subdir: '.',
          file: 'lcov.info'
        }
      ]
    },
   /* remapOptions: {
      mapFileName: function (file) {
        const relPath = file.split('/transpiled/')[1];
        let filePath = path.join('source', 'class', relPath);
        if (!fs.existsSync(filePath)) {
          // check for client source
          filePath = path.join('client', filePath);
        }
        return filePath;
      },
      readJSON: function (filePath) {
        const path = filePath.split('?')[0];
        if (fs.existsSync(path)) {
          const content = JSON.parse(fs.readFileSync(path));
          content.file = path;
          return content;
        }
        return null;
      }
    },
    remapCoverageReporter: {
      'text-summary': null, // to show summary in console
      html: 'coverage',
      lcovonly: 'coverage/lcov.info'
    },*/

    // web server port
    port: 9876,

    proxies: {
      '/source/resource/designs/get_designs.php': '/base/source/test/fixtures/designs.json',
      '/resource/plugins/tr064/soap.php': '/base/source/test/fixtures/tr064_soap.json',
      '/resource/plugins/tr064/proxy.php': '/base/source/test/fixtures/tr064_proxy.xml',
      '/source/cv': '/base/source/cv',
      '/external/qooxdoo': '/base/external/qooxdoo',
      '/source/resource': '/base/source/resource',
      '/cgi-bin': '/base/source/resource/test',
      '/rest/manager': '/base/source/rest/manager',
      '/version': '/base/version'
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
      Chrome_ci: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },

    html2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'source/test/fixtures/karma/'
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    qooxdooFramework: {
      testSources: true,
      codePath: 'source/',
      scriptFile: 'cv/index.js',
      dbFile: 'db.json'
    }
  });
};
