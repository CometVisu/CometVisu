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
      "qx.test.io.MAssert": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the javascript framework for coders
  
     http://qooxdoo.org
  
     Copyright:
       2025 qooxdoo contributors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * Tests for qx.io.jsonrpc.Client with qx.test.io.request.PostMessage transport
   * @ignore(Worker)
   * @ignore(self)
   */
  qx.Class.define("qx.test.io.TestMAssert", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MAssert],
    members: {
      /**
       * Test the promise Assertion API
       */
      testPromiseAssertions: function testPromiseAssertions() {
        var _this = this;
        var p1 = new Promise(function (resolve) {
          return setTimeout(resolve, 10);
        });
        this.observePromise(p1);
        this.assertPromisePending(p1);
        this.wait(100, function () {
          return _this.assertPromiseFulfilled(p1);
        });
        var p2 = new Promise(function (_, reject) {
          return setTimeout(reject, 10);
        });
        this.observePromise(p2);
        this.wait(100, function () {
          _this.assertPromiseRejected(p2);
          _this.assertPromiseSettled(p2);
        });
      }
    }
  });
  qx.test.io.TestMAssert.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestMAssert.js.map?dt=1778272833290