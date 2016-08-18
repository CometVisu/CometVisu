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

  onPrepare: function(){
    browser.ignoreSynchronization = true;

    // set implicit wait times in ms...
    browser.manage().timeouts().implicitlyWait(1000);
    // set browser size...
    browser.manage().window().setSize(1300, 800);
    return browser.getProcessedConfig().then(function(config) {
      if (config.params && config.params.subDir) {
        browser.onlySubDir = config.params.subDir;
      }
    });
  }
};