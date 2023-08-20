(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.progressive.structure.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.progressive.headfoot.Null": {
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
   * Structure definition for Progressive
   */
  qx.Class.define("qx.ui.progressive.structure.Default", {
    extend: qx.ui.progressive.structure.Abstract,
    /**
     * The default structure for use by Progressive.  It includes a header, a
     * footer, and a pane.
     *
     * @param header {qx.ui.progressive.headfoot.Abstract|null}
     *   The heading to apply to the Progressive structure.  If null, then no
     *   header will be visible.
     *
     * @param footer {qx.ui.progressive.headfoot.Abstract|null}
     *   The footer to apply to the Progressive structure.  If null then no
     *   footer will be visible.
     *
     * @param pane {qx.ui.core.Widget|null}
     *   The container to use as the pane, applied to the Progressive
     *   structure.  If null, a qx.ui.core.Widget will be instantiated for
     *   use as the pane.
     */
    construct: function construct(header, footer, pane) {
      qx.ui.progressive.structure.Abstract.constructor.call(this, pane);

      // If no header was specified, use null header
      if (!header) {
        this.__P_427_0 = new qx.ui.progressive.headfoot.Null();
        this.__P_427_1 = this.__P_427_0;
      } else {
        this.__P_427_0 = null;
        this.__P_427_1 = header;
      }

      // If no footer was specified, use a null footer
      if (!footer) {
        this.__P_427_2 = new qx.ui.progressive.headfoot.Null();
        this.__P_427_3 = this.__P_427_2;
      } else {
        this.__P_427_2 = null;
        this.__P_427_3 = footer;
      }
    },
    members: {
      __P_427_1: null,
      __P_427_3: null,
      __P_427_0: null,
      __P_427_2: null,
      // overridden
      applyStructure: function applyStructure(progressive) {
        // Tell the header/footer components who their Progressive is
        this.__P_427_1.join(progressive);
        this.__P_427_3.join(progressive);

        // Add the header, pane, and footer to the Progressive.
        progressive.add(this.__P_427_1);
        progressive.add(this.getPane(), {
          flex: 1
        });
        progressive.add(this.__P_427_3);
      },
      /**
       * Return the header
       *
       * @return {qx.ui.progressive.headfoot.Abstract}
       */
      getHeader: function getHeader() {
        return this.__P_427_1;
      },
      /**
       * Return the footer
       *
       * @return {qx.ui.progressive.headfoot.Abstract}
       */
      getFooter: function getFooter() {
        return this.__P_427_3;
      }
    },
    destruct: function destruct() {
      if (this.__P_427_0) {
        this.__P_427_0.dispose();
        this.__P_427_0 = null;
      }
      if (this.__P_427_2) {
        this.__P_427_2.dispose();
        this.__P_427_2 = null;
      }
      this.__P_427_1 = this.__P_427_3 = null;
    }
  });
  qx.ui.progressive.structure.Default.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Default.js.map?dt=1692560733302