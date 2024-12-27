(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.io.request.Jsonp": {},
      "qx.util.Uri": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */
  /**
   *
   * @asset(qx/test/jsonp_primitive.php)
   */

  qx.Class.define("qx.test.io.request.JsonpWithRemote", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MRemoteTest, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.require(["http", "php"]);
      },
      tearDown: function tearDown() {
        this.req.dispose();
      },
      "test: fetch json": function test_fetch_json() {
        var _this = this;
        var req = this.req = new qx.io.request.Jsonp(),
          url = this.noCache(this.getUrl("qx/test/jsonp_primitive.php"));
        req.addListener("load", function (e) {
          _this.resume(function () {
            this.assertObject(req.getResponse());
            this.assertTrue(req.getResponse()["boolean"]);
          }, _this);
        });
        req.setUrl(url);
        req.send();
        this.wait();
      },
      noCache: function noCache(url) {
        return qx.util.Uri.appendParamsToUrl(url, "nocache=" + new Date().valueOf());
      }
    }
  });
  qx.test.io.request.JsonpWithRemote.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=JsonpWithRemote.js.map?dt=1735341778450