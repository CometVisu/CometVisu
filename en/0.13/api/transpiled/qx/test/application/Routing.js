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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.bom.History": {},
      "qx.application.Routing": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.application.Routing", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_302_0: null,
      __P_302_1: null,
      setUp: function setUp() {
        this.__P_302_1 = qx.bom.History.getInstance().getState();
        this.__P_302_0 = new qx.application.Routing();
      },
      tearDown: function tearDown() {
        qx.bom.History.getInstance().setState(this.__P_302_1);
        this.__P_302_0.dispose();
      },
      testGet: function testGet() {
        var handler = this.spy();
        this.__P_302_0.onGet("/abc", handler);
        this.__P_302_0.executeGet("/abc");
        this.assertCalledOnce(handler);
      },
      testBack: function testBack() {
        var aHandler = this.spy();
        var bHandler = this.spy();
        this.__P_302_0.onGet("/a", aHandler);
        this.__P_302_0.onGet("/b", bHandler);
        this.__P_302_0.executeGet("/a");
        this.__P_302_0.executeGet("/b");
        this.__P_302_0.back();
        this.assertCalledTwice(aHandler);
        this.assertCalledOnce(bHandler);
      },
      /**
       * Tests the ability of app routing to detect and remove route cycles.
       * After A >> B >> C >> B >> routing.back(), the routing should display A and not C.
       */
      testBackCycle: function testBackCycle() {
        var aHandler = this.spy();
        var bHandler = this.spy();
        var cHandler = this.spy();
        this.__P_302_0.onGet("/a", aHandler);
        this.__P_302_0.onGet("/b", bHandler);
        this.__P_302_0.onGet("/c", cHandler);
        this.__P_302_0.executeGet("/a");
        this.__P_302_0.executeGet("/b");
        this.__P_302_0.executeGet("/c");
        this.__P_302_0.executeGet("/b");
        this.__P_302_0.back();
        this.assertCalledTwice(aHandler);
        this.assertCalledTwice(bHandler);
        this.assertCalledOnce(cHandler);
      },
      testGetCustomData: function testGetCustomData() {
        var handler = this.spy();
        this.__P_302_0.onGet("/abc", handler);
        this.__P_302_0.executeGet("/abc", {
          a: true
        });
        this.assertCalledOnce(handler);
        this.assertTrue(handler.args[0][0].customData.a);
      },
      testGetCustomDataTwoInstances: function testGetCustomDataTwoInstances() {
        var r2 = new qx.application.Routing();
        var handler = this.spy();
        this.__P_302_0.onGet("/abc", handler);
        r2.executeGet("/abc", {
          a: true
        });
        this.assertCalledOnce(handler);
        this.assertTrue(handler.args[0][0].customData.a);
        r2.dispose();
      },
      testOn: function testOn() {
        var handler = this.spy();
        this.__P_302_0.on("/", handler);
        this.__P_302_0.execute("/");
        this.assertCalledOnce(handler);
      },
      testPost: function testPost() {
        var handler = this.spy();
        this.__P_302_0.onPost("/abc", handler);
        this.__P_302_0.executePost("/abc");
        this.assertCalledOnce(handler);
      },
      testPostParam: function testPostParam() {
        var handler = this.spy();
        var data = {
          data: "test"
        };
        this.__P_302_0.onPost("/{id}/affe", handler);
        this.__P_302_0.executePost("/123456/affe", data, "custom data");
        this.assertCalledOnce(handler);
        this.assertCalledWith(handler, {
          customData: "custom data",
          params: {
            id: "123456",
            data: "test"
          },
          path: "/123456/affe"
        });
      },
      testDelete: function testDelete() {
        var handler = this.spy();
        this.__P_302_0.onDelete("/abc", handler);
        this.__P_302_0.executeDelete("/abc");
        this.assertCalledOnce(handler);
      },
      testPut: function testPut() {
        var handler = this.spy();
        this.__P_302_0.onPut("/abc", handler);
        this.__P_302_0.executePut("/abc");
        this.assertCalledOnce(handler);
      },
      testAny: function testAny() {
        var handler = this.spy();
        this.__P_302_0.onAny("/abc", handler);
        this.__P_302_0.executePost("/abc");
        this.__P_302_0.executeDelete("/abc");
        this.assertCalledTwice(handler);
      },
      testInit: function testInit() {
        var handler = this.spy();
        var defaultHandler = this.spy();
        this.__P_302_0.dispose();
        this.__P_302_0 = new qx.application.Routing();
        this.__P_302_0.onGet("/a/b/c", handler);
        this.assertNotCalled(handler);
        this.__P_302_0.onGet("/", defaultHandler);
        this.assertNotCalled(defaultHandler);
        this.__P_302_0.init();
        this.assertNotCalled(handler);
        this.assertCalledOnce(defaultHandler);
        qx.bom.History.getInstance().setState("/a/b/c");
        this.assertCalledOnce(handler);
      },
      testGetPathOrFallback: function testGetPathOrFallback() {
        this.__P_302_0.on("/registered", function () {});
        this.assertEquals("/", this.__P_302_0._getPathOrFallback(""));
        this.assertEquals("/", this.__P_302_0._getPathOrFallback(null));
        this.assertEquals("/", this.__P_302_0._getPathOrFallback("/not/registered"));
        this.assertEquals("/given/default", this.__P_302_0._getPathOrFallback("use_default_instead_of_this", "/given/default"));
        this.assertEquals("/registered", this.__P_302_0._getPathOrFallback("/registered"));
      }
    }
  });
  qx.test.application.Routing.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Routing.js.map?dt=1722153823487