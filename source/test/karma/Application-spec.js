/**
 * Application-spec
 *
 * @author tobiasb
 * @since 2016
 */

describe('load the application', function () {

  // beforeEach(function(done) {
  //   cv.Config.configSuffix = "demo";
  //   cv.Config.testMode = false;
  //   qx.event.message.Bus.subscribe("setup.dom.finished", function() {
  //     console.log("app loaded");
  //     done();
  //   }, this);
  //   qx.core.Init.getApplication().loadConfig();
  // });
  //
  // afterEach(function() {
  //   cv.Config.testMode = false;
  // });
  //
  // it('load the demo config', function () {
  //   console.log("testing demo");
  // });
  it('should fail', function () {
    expect(true).toBeFalsy();
  })
});