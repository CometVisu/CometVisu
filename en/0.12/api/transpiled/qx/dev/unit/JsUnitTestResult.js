(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestResult": {
        "construct": true,
        "require": true
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

  /**
   * Test result class, which can export the results to JSUnit
   */
  qx.Class.define("qx.dev.unit.JsUnitTestResult", {
    extend: qx.dev.unit.TestResult,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.dev.unit.TestResult.constructor.call(this);
      this.__P_153_0 = [];
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_153_0: null,

      /**
       * Run the test
       * @param test {qx.dev.unit.TestFunction} The test.
       * @param testFunction {Function} A reference to a test function.
       */
      run: function run(test, testFunction) {
        var testFunctionName = "$test_" + test.getFullName().replace(/\W/g, "_");

        this.__P_153_0.push(testFunctionName);

        window[testFunctionName] = testFunction;
      },

      /**
       * Export the test functions to JSUnit
       */
      exportToJsUnit: function exportToJsUnit() {
        var self = this; // global

        window.exposeTestFunctionNames = function () {
          return self.__P_153_0;
        }; // global


        window.isTestPageLoaded = true;
      }
    }
  });
  qx.dev.unit.JsUnitTestResult.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=JsUnitTestResult.js.map?dt=1613588096344