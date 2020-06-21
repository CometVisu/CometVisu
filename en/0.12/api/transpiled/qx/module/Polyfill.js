(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.lang.normalize.Function": {
        "require": true
      },
      "qx.lang.normalize.String": {
        "require": true
      },
      "qx.lang.normalize.Date": {
        "require": true
      },
      "qx.lang.normalize.Array": {
        "require": true
      },
      "qx.lang.normalize.Error": {
        "require": true
      },
      "qx.lang.normalize.Object": {
        "require": true
      },
      "qx.lang.normalize.Number": {
        "require": true
      },
      "qx.Bootstrap": {
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
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Adds JavaScript features that may not be supported by all clients.
   *
   * @require(qx.lang.normalize.Function)
   * @require(qx.lang.normalize.String)
   * @require(qx.lang.normalize.Date)
   * @require(qx.lang.normalize.Array)
   * @require(qx.lang.normalize.Error)
   * @require(qx.lang.normalize.Object)
   * @require(qx.lang.normalize.Number)
   *
   * @group (Polyfill)
   */
  qx.Bootstrap.define("qx.module.Polyfill", {});
  qx.module.Polyfill.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Polyfill.js.map?dt=1592777090765