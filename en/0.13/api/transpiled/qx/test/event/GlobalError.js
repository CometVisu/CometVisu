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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.event.GlobalError": {},
      "qx.core.WindowError": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
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
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.event.GlobalError", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MRequirements,
    members: {
      hasGlobalErrorHandling: function hasGlobalErrorHandling() {
        return true;
      },
      hasNoGlobalErrorHandling: function hasNoGlobalErrorHandling() {
        return !this.hasGlobalErrorHandling();
      },
      setUp: function setUp() {
        this.errorHandler = qx.event.GlobalError;
        this.called = false;
        this.calledParams = [];
        this.errorHandler.setErrorHandler(this.onError, this);
      },
      tearDown: function tearDown() {
        this.errorHandler.setErrorHandler(null);
        if (window.onerror) {
          window.onerror = null;
        }
      },
      onError: function onError(ex) {
        this.assertEquals(1, arguments.length);
        this.called = true;
        this.calledParams.push(ex);
      },
      testObserveMethod: function testObserveMethod() {
        this.require(["GlobalErrorHandling"]);
        var fail = function fail() {
          throw new Error("fail");
        };
        var wrappedFail = this.errorHandler.observeMethod(fail);
        this.assertFalse(this.called);
        wrappedFail();
        this.assertTrue(this.called);
      },
      testDontWrapIfSettingIsOff: function testDontWrapIfSettingIsOff() {
        this.require(["NoGlobalErrorHandling"]);
        var fcn = function fcn() {};
        var wrapped = this.errorHandler.observeMethod(fcn);
        this.assertIdentical(fcn, wrapped);
      },
      testWrappedParameterAndReturnValue: function testWrappedParameterAndReturnValue() {
        this.require(["GlobalErrorHandling"]);
        var fcn = function fcn(a, b, c) {
          var args = [a, b, c];
          return args;
        };
        var wrapped = this.errorHandler.observeMethod(fcn);
        this.assertJsonEquals(fcn(1, "2", true), wrapped(1, "2", true));
      },
      testObserveMethodButNoHandler: function testObserveMethodButNoHandler() {
        this.require(["GlobalErrorHandling"]);
        var fail = function fail() {
          throw new Error("fail");
        };
        var wrappedFail = this.errorHandler.observeMethod(fail);
        this.errorHandler.setErrorHandler(null, null);
        this.assertException(wrappedFail);
        this.errorHandler.setErrorHandler(this.onError, this);
        wrappedFail();
      },
      testHandlerContext: function testHandlerContext() {
        this.require(["GlobalErrorHandling"]);
        var fail = function fail() {
          throw new Error("fail");
        };
        var self = null;
        var handler = function handler(ex) {
          self = this;
        };
        this.errorHandler.setErrorHandler(handler, this);
        var wrappedFail = this.errorHandler.observeMethod(fail);
        wrappedFail();
        this.assertEquals(this, self);
      },
      testHandleError: function testHandleError() {
        this.require(["GlobalErrorHandling"]);
        var error = new Error("New Error");
        this.errorHandler.handleError(error);
        this.assertTrue(this.called);
        this.assertEquals(error, this.calledParams[0]);
      },
      testOnWindowError: function testOnWindowError() {
        this.require(["GlobalErrorHandling"]);

        // reset the handler
        this.errorHandler.setErrorHandler(null);
        var wasHandled = false;
        var handler = function handler(ex) {
          this.resume(function () {
            wasHandled = true;
            this.assertInstance(ex, qx.core.WindowError);
            this.assertMatch(ex.toString(), "Doofer Fehler");
            this.assertString(ex.getUri());
            this.assertInteger(ex.getLineNumber());

            // this.debug(ex.toString() + " at " + ex.getUri() + ":" + ex.getLineNumber());
          }, this);
        };
        this.errorHandler.setErrorHandler(handler, this);

        // callback is NOT wrapped!
        window.setTimeout(function () {
          throw new Error("Doofer Fehler");
        }, 0);

        // Opera and Webkit do not support window.onerror
        // make sure the test fails once they support it
        var self = this;
        window.setTimeout(function () {
          if (wasHandled) {
            return;
          }
          self.resume(function () {
            if (qx.core.Environment.get("engine.name") == "opera" || qx.core.Environment.get("engine.name") == "webkit") {
              this.warn("window.onerror is not supported by Opera and Webkit");
            } else {
              this.fail("window.onerror should be supported! Note: this test fails in IE if the debugger is active!");
            }
          }, self);
        }, 100);
        this.wait(500);
      },
      testOnWindowErrorWrapped: function testOnWindowErrorWrapped() {
        this.require(["GlobalErrorHandling"]);

        // reset error handler on startup
        this.errorHandler.setErrorHandler(null);
        var wasHandled = false;
        var wasNativeHandled = false;
        var self = this;
        var originalMsg = null;
        var originalUri = null;
        var originalLineNumber = null;
        // append a native onerror method
        window.onerror = function (msg, uri, lineNumber) {
          wasNativeHandled = true;
          self.assertMatch(msg, "Doofer Fehler");
          self.assertString(uri);
          self.assertInteger(lineNumber);
          originalMsg = msg;
          originalUri = uri;
          originalLineNumber = lineNumber;
        };
        var handler = function handler(ex) {
          this.resume(function () {
            wasHandled = true;
            this.assertTrue(wasNativeHandled, "native handler not called.");
            this.assertInstance(ex, qx.core.WindowError);
            this.assertEquals(originalMsg, ex.toString());
            this.assertEquals(originalUri, ex.getUri());
            this.assertEquals(originalLineNumber, ex.getLineNumber());

            // this.debug(ex.toString() + " at " + ex.getUri() + ":" + ex.getLineNumber());
          }, this);
        };
        this.errorHandler.setErrorHandler(handler, this);

        // callback is NOT wrapped!
        window.setTimeout(function () {
          throw new Error("Doofer Fehler");
        }, 0);

        // Opera and Webkit do not support window.onerror
        // make sure the test fails once they support it
        var self = this;
        window.setTimeout(function () {
          if (wasHandled) {
            return;
          }
          self.resume(function () {
            if (qx.core.Environment.get("engine.name") == "opera" || qx.core.Environment.get("engine.name") == "webkit") {
              this.warn("window.onerror is not supported by Opera and Webkit");
            } else {
              this.fail("window.onerror should be supported! Note: this test fails in IE if the debugger is active!");
            }
          }, self);
        }, 100);
        this.wait(500);
      }
    }
  });
  qx.test.event.GlobalError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalError.js.map?dt=1735222427938