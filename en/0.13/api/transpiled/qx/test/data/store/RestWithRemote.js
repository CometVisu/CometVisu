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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.io.rest.Resource": {},
      "qx.data.store.Rest": {},
      "qx.util.ResponseParser": {},
      "qx.ui.basic.Label": {},
      "qx.dev.unit.RequirementError": {}
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
   * @asset(qx/test/primitive.json)
   */

  qx.Class.define("qx.test.data.store.RestWithRemote", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements, qx.test.io.MRemoteTest],
    members: {
      setUp: function setUp() {
        var url = this.getUrl("qx/test/primitive.json"),
          res = this.res = new qx.io.rest.Resource({
            index: {
              method: "GET",
              url: url
            }
          }),
          store = this.store = new qx.data.store.Rest(res, "index");
        res.configureRequest(function (req) {
          req.setParser(qx.util.ResponseParser.PARSER.json);
        });
        this.require(["http"]);
      },
      tearDown: function tearDown() {
        this.res.dispose();
        this.store.dispose();
      },
      "test: populate store with response of resource action": function testPopulateStoreWithResponseOfResourceAction() {
        var _this = this;
        var res = this.res,
          store = this.store;
        res.addListener("success", function () {
          _this.resume(function () {
            this.assertEquals("String", store.getModel().getString());
          }, _this);
        });
        res.index();
        this.wait();
      },
      "test: bind model property": function testBindModelProperty() {
        var _this2 = this;
        var res = this.res,
          store = this.store,
          label = new qx.ui.basic.Label();
        res.addListener("success", function () {
          _this2.resume(function () {
            this.assertEquals("String", label.getValue());
          }, _this2);
        });
        res.index();
        store.bind("model.string", label, "value");
        this.wait();
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.data.store.RestWithRemote.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RestWithRemote.js.map?dt=1717235389012