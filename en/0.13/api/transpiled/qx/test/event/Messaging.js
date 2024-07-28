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
      "qx.event.Messaging": {}
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

  qx.Class.define("qx.test.event.Messaging", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_344_0: null,
      setUp: function setUp() {
        this.__P_344_0 = new qx.event.Messaging();
      },
      testTwoChannels: function testTwoChannels() {
        var handlerGet = this.spy();
        var handlerPost = this.spy();
        var ctx = {
          a: 12
        };
        var data = {
          data: "test"
        };
        this.__P_344_0.on("GET", "/get", handlerGet, ctx);
        this.__P_344_0.emit("GET", "/get", null, data);
        this.assertCalledOnce(handlerGet);
        this.assertCalledOn(handlerGet, ctx);
        this.assertCalledWith(handlerGet, {
          customData: data,
          params: {},
          path: "/get"
        });
        this.assertNotCalled(handlerPost);
        this.__P_344_0.on("POST", "/post", handlerPost, ctx);
        this.__P_344_0.emit("POST", "/post", null, data);
        this.assertCalledOnce(handlerPost);
        this.assertCalledOn(handlerPost, ctx);
        this.assertCalledWith(handlerPost, {
          customData: data,
          params: {},
          path: "/post"
        });
        this.assertCalledOnce(handlerGet);
      },
      testGet: function testGet() {
        var handler = this.spy();
        var ctx = {
          a: 12
        };
        var data = {
          data: "test"
        };
        this.__P_344_0.on("get", "/", handler, ctx);
        this.__P_344_0.emit("get", "/", null, data);
        this.assertCalledOnce(handler);
        this.assertCalledOn(handler, ctx);
        this.assertCalledWith(handler, {
          customData: data,
          params: {},
          path: "/"
        });
      },
      testRegExp: function testRegExp() {
        var handler = this.spy();
        var ctx = {
          a: 12
        };
        var data = {
          data: "abcdef"
        };
        this.__P_344_0.on("xyz", /^xyz/g, handler, ctx);
        this.__P_344_0.emit("xyz", "xyzabc", null, data);
        this.__P_344_0.emit("xyz", "abcxyz", null, data);
        this.assertCalledOnce(handler);
        this.assertCalledOn(handler, ctx);
        this.assertCalledWith(handler, {
          customData: data,
          params: {},
          path: "xyzabc"
        });
      },
      testGetAll: function testGetAll() {
        var handler = this.spy();
        this.__P_344_0.on("a", /.*/, handler);
        this.__P_344_0.emit("a", "xyzabc");
        this.__P_344_0.emit("a", "abcxyz");
        this.assertCalledTwice(handler);
      },
      testAny: function testAny() {
        var handler = this.spy();
        this.__P_344_0.onAny(/.*/, handler);
        this.__P_344_0.emit("a", "xyzabc");
        this.__P_344_0.emit("b", "abcxyz");
        this.assertCalledTwice(handler);
      },
      testTwice: function testTwice() {
        var handler = this.spy();
        var ctx = {
          a: 12
        };
        var data = {
          data: "test"
        };
        this.__P_344_0.on("GET", "/", handler, ctx);
        this.__P_344_0.emit("GET", "/", null, data);
        this.__P_344_0.emit("GET", "/", null, data);
        this.assertCalledTwice(handler);
        this.assertCalledOn(handler, ctx);
        this.assertCalledWith(handler, {
          customData: data,
          params: {},
          path: "/"
        });
      },
      testParam: function testParam() {
        var handler = this.spy();
        var ctx = {
          a: 12
        };
        var data = {
          data: "test"
        };
        this.__P_344_0.on("POST", "/{id}/affe", handler, ctx);
        this.__P_344_0.emit("POST", "/123456/affe", data);
        this.assertCalledOnce(handler);
        this.assertCalledOn(handler, ctx);
        this.assertCalledWith(handler, {
          customData: undefined,
          params: {
            id: "123456",
            data: "test"
          },
          path: "/123456/affe"
        });
      },
      testMultipleParam: function testMultipleParam() {
        var handler = this.spy();
        var data = {
          data: "test"
        };
        this.__P_344_0.on("POST", "/{id}-{name}/affe", handler);
        this.__P_344_0.emit("POST", "/123456-xyz/affe", data);
        this.assertCalledOnce(handler);
        this.assertCalledWith(handler, {
          customData: undefined,
          params: {
            id: "123456",
            name: "xyz",
            data: "test"
          },
          path: "/123456-xyz/affe"
        });
      },
      testRemove: function testRemove() {
        var handler = this.spy();
        var id = this.__P_344_0.on("GET", "/", handler);
        this.__P_344_0.emit("GET", "/");
        this.assertCalledOnce(handler);
        this.__P_344_0.remove(id);
        this.__P_344_0.emit("GET", "/");
        this.assertCalledOnce(handler);
      },
      testHas: function testHas() {
        this.__P_344_0.on("GET", "/affe", function () {});
        this.__P_344_0.on("POST", "/affe", function () {});
        this.assertTrue(this.__P_344_0.has("GET", "/affe"));
        this.assertTrue(this.__P_344_0.has("POST", "/affe"));
        this.assertFalse(this.__P_344_0.has("get", "/affe"));
        this.assertFalse(this.__P_344_0.has("GET", "/banane"));
        this.assertFalse(this.__P_344_0.has("PUT", "/affe"));
        this.assertFalse(this.__P_344_0.has("banane", "/affe"));
      }
    }
  });
  qx.test.event.Messaging.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Messaging.js.map?dt=1722151832165