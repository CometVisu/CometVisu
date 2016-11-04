define([], function() {
  var Config = {
    libraryVersion: 7,
    libraryCheck: true,
    // threshold where the mobile.css is loaded
    maxMobileScreenWidth: 480,
    // threshold where different colspans are used
    maxScreenWidthColspanS: 599,
    maxScreenWidthColspanM: 839,
    scrollSpeed : 0,

    defaultColumns : 12,
    minColumnWidth : 120,

    enableAddressQueue : false,

    backend : 'default',
    backendUrl : null,
    configSuffix : null,
    clientDesign : "",
    forceReload : false,
    use_maturity : false,
    templateEngine : new cv.TemplateEngine(),
    layoutManager : new cv.layout.Manager()
  };

  return Config;
});