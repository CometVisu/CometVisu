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
      "qx.core.Object": {},
      "qx.event.message.Bus": {},
      "qx.event.message.Message": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.message.Bus", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_346_0: null,
      __P_346_1: null,
      __P_346_2: null,
      setUp: function setUp() {
        this.__P_346_0 = new qx.core.Object();
        this.__P_346_1 = new qx.core.Object();
        this.__P_346_2 = new qx.core.Object();
      },
      tearDown: function tearDown() {
        this.__P_346_0.dispose();
        this.__P_346_1.dispose();
        this.__P_346_2.dispose();
        var subscribers = qx.event.message.Bus.getSubscriptions();
        for (var key in subscribers) {
          delete subscribers[key];
        }
        this.assertJsonEquals({}, qx.event.message.Bus.getSubscriptions());
      },
      testDispatch: function testDispatch() {
        var bus = qx.event.message.Bus;
        var calls = 0;
        var that = this;
        bus.subscribe("*", function (message) {
          calls++;
          that.assertEquals("MyMessage", message.getName());
          that.assertEquals(10, message.getData());
        }, this.__P_346_0);
        bus.subscribe("MyMessage2", function (message) {
          that.assertFalse(true, "Wrong subscriber called!");
        }, this.__P_346_1);
        bus.subscribe("MyMessage", function (message) {
          calls++;
          that.assertEquals("MyMessage", message.getName());
          that.assertEquals(10, message.getData());
        }, this.__P_346_2);
        var msg = new qx.event.message.Message("MyMessage", 10);
        this.assertTrue(bus.dispatch(msg), "Message not dispatched");
        this.assertEquals(2, calls, "Wrong callbacks!");
        msg.dispose();
      },
      testDispatchWithDisposed: function testDispatchWithDisposed() {
        var bus = qx.event.message.Bus;
        var calls = 0;
        var that = this;
        bus.subscribe("*", function (message) {
          calls++;
          that.assertEquals("MyMessage", message.getName());
          that.assertEquals(10, message.getData());
        }, this.__P_346_0);
        this.__P_346_1.dispose();
        bus.subscribe("MyMessage", function (message) {
          that.assertFalse(true, "Wrong subscriber called!");
        }, this.__P_346_1);
        bus.subscribe("MyMessage", function (message) {
          calls++;
          that.assertEquals("MyMessage", message.getName());
          that.assertEquals(10, message.getData());
        }, this.__P_346_2);
        var msg = new qx.event.message.Message("MyMessage", 10);
        this.assertTrue(bus.dispatch(msg), "Message not dispatched");
        this.assertEquals(2, calls, "Wrong callbacks!");
        msg.dispose();
      },
      // see http://bugzilla.qooxdoo.org/show_bug.cgi?id=2996
      testWildcard: function testWildcard() {
        var flag1 = false;
        var flag2 = false;
        function handler1() {
          flag1 = true;
        }
        function handler2() {
          flag2 = true;
        }
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribe("*", handler1, this);
        messageBus.subscribe("mess*", handler2, this);
        var msg1 = new qx.event.message.Message("message", true);
        this.assertTrue(messageBus.dispatch(msg1), "Message not dispatched");
        this.assertTrue(flag1, "Handler1 (filter '*') was not called for message 'message'.");
        this.assertTrue(flag2, "Handler2 (filter 'mess*') was not called for message 'message'.");
        flag1 = false;
        flag2 = false;
        var msg2 = new qx.event.message.Message("massage", true);
        this.assertTrue(messageBus.dispatch(msg2), "Message not dispatched");
        this.assertTrue(flag1, "Handler1 (filter '*') was not called for message 'massage'.");
        this.assertFalse(flag2, "Handler2 (filter 'mess*') was wrongly called for message 'massage'.");
        msg1.dispose();
        msg2.dispose();
      },
      testRegex: function testRegex() {
        var flag1 = false;
        function handler1() {
          flag1 = true;
        }
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribe(/^test\.[a-z]+$/, handler1, this);
        var msg1 = new qx.event.message.Message("test.abc", true);
        this.assertTrue(messageBus.dispatch(msg1), "Message not dispatched");
        this.assertTrue(flag1, "Handler1 (filter /^test\\.[a-z]+$/) was not called for message '" + msg1.getName() + "'");
        var msg2 = new qx.event.message.Message("test.123", true);
        this.assertFalse(messageBus.dispatch(msg2), "Message was dispatched and shouldn't have been");
        msg1.dispose();
        msg2.dispose();
      },
      testSubscribeOnce: function testSubscribeOnce() {
        var flag1 = false;
        function handler1() {
          flag1 = true;
        }
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribeOnce("testSubscribeOnce", handler1, this);
        var msg1 = new qx.event.message.Message("testSubscribeOnce", true);
        this.assertTrue(messageBus.dispatch(msg1), "Message not dispatched");
        this.assertTrue(flag1, 'Handler (filter "testSubscribeOnce") was not called for message \'' + msg1.getName() + "'");
        flag1 = false;
        var msg2 = new qx.event.message.Message("testSubscribeOnce", true);
        this.assertFalse(messageBus.dispatch(msg2), "Message was dispatched but shouldn't have been.");
        msg1.dispose();
        msg2.dispose();
      },
      // see http://bugzilla.qooxdoo.org/show_bug.cgi?id=2996
      testUnsubscribe: function testUnsubscribe() {
        var flag = false;
        function handler() {
          flag = true;
        }
        function anotherHandler() {}
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribe("message", handler, this);
        messageBus.unsubscribe("message", anotherHandler, this);
        var msg1 = new qx.event.message.Message("message", true);
        this.assertTrue(messageBus.dispatch(msg1), "Message not dispatched");
        this.assertTrue(flag, "Handler was not called.");
        flag = false;
        messageBus.unsubscribe("message", handler, this);
        var msg2 = new qx.event.message.Message("message", true);
        this.assertFalse(messageBus.dispatch(msg2), "Message not dispatched");
        this.assertFalse(flag, "Handler was called although unsubscribed.");
        msg1.dispose();
        msg2.dispose();
      },
      testUnsubscribeAll: function testUnsubscribeAll() {
        var flag = false;
        function handler() {
          flag = true;
        }
        function anotherHandler() {}
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribe("message", handler, this);
        var msg1 = new qx.event.message.Message("message", true);
        this.assertTrue(messageBus.dispatch(msg1), "Message not dispatched");
        this.assertTrue(flag, "Handler was not called.");
        flag = false;
        messageBus.unsubscribe("message");
        var msg2 = new qx.event.message.Message("message", true);
        this.assertFalse(messageBus.dispatch(msg2), "Message not dispatched");
        this.assertFalse(flag, "Handler was called although unsubscribed.");
        msg1.dispose();
        msg2.dispose();
      },
      testWrongDispatch: function testWrongDispatch() {
        var flag = false;
        function handler() {
          flag = true;
        }
        var messageBus = qx.event.message.Bus.getInstance();
        messageBus.subscribe("message", handler, this);
        messageBus.subscribe("massage", handler, this);
        var msg = new qx.event.message.Message("trash", true);
        this.assertFalse(messageBus.dispatch(msg), "Message was dispatched");
        this.assertFalse(flag, "Handler was called.");
        msg.dispose();
      }
    }
  });
  qx.test.event.message.Bus.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Bus.js.map?dt=1731948115836