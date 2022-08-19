(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.Widget": {
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
   * Abstract structure definition for Progressive
   */
  qx.Class.define("qx.ui.progressive.structure.Abstract", {
    type: "abstract",
    extend: qx.core.Object,

    /**
     * The abstract structure for use by Progressive.  It defines the pane
     * container in which items are progressively rendered.
     *
     * @param pane {qx.ui.core.Widget|null}
     *   The container to use as the pane, applied to the Progressive
     *   structure.  If null, a qx.ui.core.Widget will be instantiated for
     *   use as the pane.
     */
    construct: function construct(pane) {
      qx.core.Object.constructor.call(this); // If no pane was specified. Create one.

      if (!pane) {
        this.__P_391_0 = new qx.ui.core.Widget();
        this.__P_391_1 = this.__P_391_0;
      } else {
        this.__P_391_0 = null;
        this.__P_391_1 = pane;
      }

      this.__P_391_1.getContentElement().setStyle("overflowY", "auto");
    },
    members: {
      __P_391_0: null,
      __P_391_1: null,

      /**
       * Apply the structure typically defined in the constructor to the
       * Progressive.
       *
       * @param progressive {qx.ui.progressive.Progressive}
       *   The Progressive to which the structure is to be applied.
       */
      applyStructure: function applyStructure(progressive) {
        throw new Error("applyStructure() is abstract");
      },

      /**
       * Get the pane in which this Progressive renders.
       *
       * @return {qx.ui.core.Widget}
       */
      getPane: function getPane() {
        return this.__P_391_1;
      }
    },
    destruct: function destruct() {
      if (this.__P_391_0) {
        this.__P_391_0.dispose();
      }

      this.__P_391_0 = this.__P_391_1 = null;
    }
  });
  qx.ui.progressive.structure.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1660930425522