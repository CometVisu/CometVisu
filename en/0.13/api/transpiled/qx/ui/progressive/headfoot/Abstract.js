(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * The abstract class for a header or footer for use with Progressive's Table
   * renderer.
   */
  qx.Class.define("qx.ui.progressive.headfoot.Abstract", {
    type: "abstract",
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.HBox());
    },
    members: {
      __P_646_0: null,
      /**
       * Join this header/footer to a Progressive.  This makes the Progressive
       * object available to the header/footer through the _progressive member.
       *
       * @param progressive {qx.ui.progressive.Progressive}
       *   Progressive object to which we're being joined.
       *
       */
      join: function join(progressive) {
        this.__P_646_0 = progressive;
      }
    },
    destruct: function destruct() {
      this.__P_646_0 = null;
    }
  });
  qx.ui.progressive.headfoot.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1717235414984