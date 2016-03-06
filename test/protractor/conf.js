// conf.js
exports.config = {
  framework: 'jasmine',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['**/*spec.js'],

  // so not use a selenium server
  directConnect: true,

  onPrepare: function(){
    browser.ignoreSynchronization = true;

    // set implicit wait times in ms...
    browser.manage().timeouts().implicitlyWait(1000);
    // set browser size...
    browser.manage().window().setSize(1024, 800);
  }
}