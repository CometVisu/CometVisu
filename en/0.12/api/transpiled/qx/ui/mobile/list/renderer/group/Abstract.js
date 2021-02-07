(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Composite": {
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
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Base class for all group item renderer.
   */
  qx.Class.define("qx.ui.mobile.list.renderer.group.Abstract", {
    extend: qx.ui.mobile.container.Composite,
    type: "abstract",
    construct: function construct(layout) {
      qx.ui.mobile.container.Composite.constructor.call(this, layout);
      this.initSelectable();
    },
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "group-item"
      },

      /**
       * Whether the row is selectable.
       */
      selectable: {
        check: "Boolean",
        init: false,
        apply: "_applyAttribute"
      },
      //overridden
      activatable: {
        refine: true,
        init: true
      }
    },
    members: {
      // abstract method

      /**
       * Resets all defined child widgets. Override this method in your custom
       * list item renderer and reset all widgets displaying data. Needed as the
       * renderer is used for every row and otherwise data of a different row
       * might be displayed, when not all data displaying widgets are used for the row.
       * Gets called automatically by the {@link qx.ui.mobile.list.provider.Provider}.
       *
       */
      reset: function reset() {},
      // overridden
      _getTagName: function _getTagName() {
        return "li";
      }
    }
  });
  qx.ui.mobile.list.renderer.group.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1612698484178