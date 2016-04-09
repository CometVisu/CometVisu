/**
 * Protractor end-to-end test settings
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
exports.config = {
  framework: 'jasmine',

  // so not use a selenium server
  directConnect: true,

  suites: {
    common: ['specs/*spec.js'],
    widgets: ['specs/widgets/*spec.js']
  },

  onPrepare: function(){
    browser.ignoreSynchronization = true;

    // set implicit wait times in ms...
    browser.manage().timeouts().implicitlyWait(1000);
    // set browser size...
    browser.manage().window().setSize(1024, 800);
  }
};