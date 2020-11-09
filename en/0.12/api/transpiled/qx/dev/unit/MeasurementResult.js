(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Performance test result object. Used to communicate measurements to the unit
   * testing framework.
   */
  qx.Class.define("qx.dev.unit.MeasurementResult", {
    extend: Object,

    /**
     *
     * @param message {String} Description
     * @param iterations {Number} Amount of times the tested code was executed
     * @param ownTime {Number} Elapsed JavaScript execution time
     * @param renderTime {Number} Elapsed DOM rendering time
     */
    construct: function construct(message, iterations, ownTime, renderTime) {
      this.__P_157_0 = message;
      this.__P_157_1 = iterations;
      this.__P_157_2 = ownTime;
      this.__P_157_3 = renderTime;
    },
    members: {
      __P_157_0: null,
      __P_157_1: null,
      __P_157_2: null,
      __P_157_3: null,

      /**
       * Returns the stored data as a map.
       * @return {Map} The stored data.
       */
      getData: function getData() {
        return {
          message: this.__P_157_0,
          iterations: this.__P_157_1,
          ownTime: this.__P_157_2,
          renderTime: this.__P_157_3
        };
      },

      /**
       * Returns a readable summary of this result
       *
       * @return {String} Result summary
       */
      toString: function toString() {
        return ["Measured: " + this.__P_157_0, "Iterations: " + this.__P_157_1, "Time: " + this.__P_157_2 + "ms", "Render time: " + this.__P_157_3 + "ms"].join("\n");
      }
    }
  });
  qx.dev.unit.MeasurementResult.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MeasurementResult.js.map?dt=1604955471076