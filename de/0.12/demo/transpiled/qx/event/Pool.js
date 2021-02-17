(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.util.ObjectPool": {
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
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * Central instance pool for event objects. All event objects dispatched by the
   * event loader are pooled using this class.
   */
  qx.Class.define("qx.event.Pool", {
    extend: qx.util.ObjectPool,
    type: "singleton",
    // Even though this class contains almost no code it is required because the
    // legacy code needs a place to patch the event pooling behavior.

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.util.ObjectPool.constructor.call(this, 30);
    }
  });
  qx.event.Pool.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pool.js.map?dt=1613588842348