(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.log.Logger": {},
      "qx.log.appender.RingBuffer": {},
      "qx.bom.client.EcmaScript": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.core.Object": {},
      "qx.core.IDisposable": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "ecmascript.error.stacktrace": {
          "className": "qx.bom.client.EcmaScript"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  /* global test */
  qx.Class.define("qx.test.log.Logger", {
    extend: qx.dev.unit.TestCase,
    statics: {
      TEST_CONSTANT: "abc"
    },
    members: {
      setUp: function setUp() {
        this.__P_355_0 = qx.log.Logger.getLevel();
      },
      tearDown: function tearDown() {
        qx.log.Logger.setLevel(this.__P_355_0);
      },
      __P_355_1: function __P_355_1(exception) {
        var appender = new qx.log.appender.RingBuffer();
        qx.log.Logger.setLevel("debug");
        qx.log.Logger.clear();
        qx.log.Logger.register(appender);
        qx.log.Logger.debug(exception);
        var events = appender.getAllLogEvents();
        this.assertEquals(1, events.length);
        if (qx.core.Environment.get("ecmascript.error.stacktrace")) {
          if (exception instanceof Error || qx.core.Environment.get("engine.name") !== "gecko") {
            this.assert(events[0].items[0].trace.length > 0);
          }
        }
        qx.log.Logger.unregister(appender);
      },
      testLogException: function testLogException() {
        var exception = this.newException();
        this.__P_355_1(exception);
      },
      testLogDOMException: function testLogDOMException() {
        var exception = this.newDOMException();
        this.__P_355_1(exception);
      },
      testKonstantDeprecation: function testKonstantDeprecation() {
        // call the method to see if its not throwing an error
        qx.log.Logger.deprecatedConstantWarning(qx.test.log.Logger, "TEST_CONSTANT");
        this.assertEquals("abc", qx.test.log.Logger.TEST_CONSTANT);
      },
      /**
       * @ignore(test.DisposableObject)
       */
      testContextObject: function testContextObject() {
        var appender = new qx.log.appender.RingBuffer();
        qx.log.Logger.setLevel("debug");
        qx.log.Logger.clear();
        qx.log.Logger.register(appender);
        qx.Class.define("test.DisposableObject", {
          extend: qx.core.Object,
          implement: qx.core.IDisposable
        });
        var obj = new qx.core.Object();
        var dispObj = new test.DisposableObject();
        qx.log.Logger.debug(qx.core.Object, "m1");
        qx.log.Logger.debug(obj, "m2");
        qx.log.Logger.debug(qxWeb(), "m3");
        qx.log.Logger.debug(dispObj, "m4");
        var events = appender.getAllLogEvents();
        this.assertEquals(qx.core.Object, events[0].clazz);
        this.assertEquals(qx.core.Object, events[1].clazz);
        this.assertEquals(qxWeb, events[2].clazz);
        this.assertEquals(dispObj.toHashCode(), events[3].object);
        qx.log.Logger.unregister(appender);
        dispObj.dispose();
        qx.Class.undefine("test.DisposableObject");
      },
      newException: function newException() {
        var exc;
        try {
          throw new Error();
        } catch (e) {
          exc = e;
        }
        return exc;
      },
      newDOMException: function newDOMException() {
        var exc;
        try {
          document.body.appendChild(null);
        } catch (e) {
          exc = e;
        }
        return exc;
      }
    }
  });
  qx.test.log.Logger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Logger.js.map?dt=1735222429419