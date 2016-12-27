/**
 * Application-spec
 *
 * @author tobiasb
 * @since 2016
 */

describe('load the application', function () {

  beforeEach(function(done) {
    console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    cv.Config.configSuffix = "demo";
    cv.MessageBroker.getInstance().subscribe("setup.dom.finished", function() {
      console.log("app loaded");
      done();
    }, this);
    var l = qx.$$loader;
    var bootPackageHash=l.parts[l.boot][0];
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    qx.util.ResourceManager.getInstance().__registry = qx.$$resources;
    console.log("signalStartup");
    qx.$$loader.signalStartup();
  });

  it('load the demo config', function () {
    console.log("testing demo");
  });
});