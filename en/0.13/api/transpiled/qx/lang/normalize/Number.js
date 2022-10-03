(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.client.EcmaScript": {
        "defer": "load",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "ecmascript.number.EPSILON": {
          "defer": true,
          "className": "qx.bom.client.EcmaScript"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 The Qooxdoo Project
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Cajus Pollmeier (cajus)
  
  ************************************************************************ */

  /**
   * This class is responsible for the normalization of the native 'String' object.
   * It checks if these methods are available and, if not, appends them to
   * ensure compatibility in all browsers.
   * For usage samples, check out the attached links.
   *
   * @group (Polyfill)
   */
  qx.Bootstrap.define("qx.lang.normalize.Number", {
    statics: {
      EPSILON: 2e-52
    },
    defer: function defer(statics) {
      if (!qx.core.Environment.get("ecmascript.number.EPSILON")) {
        Number.prototype.EPSILON = statics.EPSILON;
      }
    }
  });
  qx.lang.normalize.Number.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Number.js.map?dt=1664789588491