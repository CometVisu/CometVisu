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
      "qx.ui.layout.Grow": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Clipping area for the table header and table pane.
   */
  qx.Class.define("qx.ui.table.pane.Clipper", {
    extend: qx.ui.container.Composite,
    construct: function construct() {
      qx.ui.container.Composite.constructor.call(this, new qx.ui.layout.Grow());
      this.setMinWidth(0);
    },
    members: {
      /**
       * Scrolls the element's content to the given left coordinate
       *
       * @param value {Integer} The vertical position to scroll to.
       */
      scrollToX: function scrollToX(value) {
        this.getContentElement().scrollToX(value, false);
      },

      /**
       * Scrolls the element's content to the given top coordinate
       *
       * @param value {Integer} The horizontal position to scroll to.
       */
      scrollToY: function scrollToY(value) {
        this.getContentElement().scrollToY(value, true);
      }
    }
  });
  qx.ui.table.pane.Clipper.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Clipper.js.map?dt=1664548995320