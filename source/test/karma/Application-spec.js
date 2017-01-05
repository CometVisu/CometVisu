/**
 * Application-spec
 *
 * @author tobiasb
 * @since 2016
 */

describe('load the application', function () {

  // beforeEach(function(done) {
  //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  //   cv.Config.configSuffix = "demo";
  //   cv.Config.testMode = true;
  //   cv.Config.enableCache = false;
  //   cv.MessageBroker.getInstance().subscribe("setup.dom.finished", function() {
  //     console.log("app loaded");
  //     done();
  //   }, this);
  //   var l = qx.$$loader;
  //   var bootPackageHash=l.parts[l.boot][0];
  //   l.importPackageData(qx.$$packageData[bootPackageHash]);
  //   qx.util.ResourceManager.getInstance().__registry = qx.$$resources;
  //   console.log("signalStartup");
  //   qx.$$loader.signalStartup();
  // });
  //
  // afterEach(function() {
  //   cv.Config.testMode = false;
  //   var body = qx.bom.Selector.query("body")[0];
  //   // load empty HTML structure
  //   qx.dom.Element.empty(body);
  //   qx.bom.Html.clean([cv.Application.HTML_STRUCT], null, body);
  // });
  //
  // it('load the demo config', function () {
  //   console.log("testing demo");
  // });
});