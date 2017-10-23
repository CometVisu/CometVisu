/**
 * Protractor jsdoc screenshot generation config
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
exports.config = {
  framework: 'jasmine',

  // so not use a selenium server
  directConnect: true,

  suites: {
    common: ['screenshots-spec.js']
  },
  capabilities: {
    browserName: 'chrome',
    'chromeOptions': {
      args: [
        // '--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--window-size=1300,800'
      ]
    }
  },

  onPrepare: function(){
    browser.ignoreSynchronization = true;

    // set implicit wait times in ms...
    browser.manage().timeouts().implicitlyWait(5000);
    // set browser size...
    browser.manage().window().setSize(1300, 800);
    return browser.getProcessedConfig().then(function(config) {
      if (config.params) {
        if (config.params.subDir) {
          browser.onlySubDir = config.params.subDir;
        }
        if (config.params.screenshots) {
          browser.screenshots = config.params.screenshots;
        }
        if (config.params.target) {
          browser.target = config.params.target;
        }
      }
    });
  }
};