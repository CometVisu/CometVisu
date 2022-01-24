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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * Base class for all list item renderer.
   */
  qx.Class.define("qx.ui.mobile.list.renderer.Abstract", {
    extend: qx.ui.mobile.container.Composite,
    type: "abstract",

    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */
    construct: function construct(layout) {
      qx.ui.mobile.container.Composite.constructor.call(this, layout);
      this.initSelectable();
      this.initRemovable();
      this.initShowArrow();
    },

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "list-item"
      },

      /**
       * Whether the row is selected.
       */
      selected: {
        check: "Boolean",
        init: false,
        apply: "_applySelected"
      },

      /**
       * Whether the row is selectable.
       */
      selectable: {
        check: "Boolean",
        init: true,
        apply: "_applyAttribute"
      },

      /**
       * Whether the row is removable.
       */
      removable: {
        check: "Boolean",
        init: false,
        apply: "_applyRemovable"
      },

      /**
       * Whether to show an arrow in the row.
       */
      showArrow: {
        check: "Boolean",
        init: false,
        apply: "_applyShowArrow"
      },
      //overridden
      activatable: {
        refine: true,
        init: true
      }
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
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
      },

      /**
       * Returns the row index of a certain DOM element in the list from the given event.
       *
       * @param evt {qx.event.type.Event} The causing event.
       * @return {Integer} the index of the row.
       */
      getRowIndexFromEvent: function getRowIndexFromEvent(evt) {
        return this.getRowIndex(evt.getOriginalTarget());
      },

      /**
       * Returns the row index of a certain DOM element in the list.
       *
       * @param element {Element} DOM element to retrieve the index from.
       * @return {Integer} the index of the row.
       */
      getRowIndex: function getRowIndex(element) {
        while (element.tagName != "LI") {
          element = element.parentNode;
        }

        return element.getAttribute("data-row");
      },
      // property apply
      _applyShowArrow: function _applyShowArrow(value, old) {
        if (value) {
          this.addCssClass("arrow");
        } else {
          this.removeCssClass("arrow");
        }
      },
      // property apply
      _applyRemovable: function _applyRemovable(value, old) {
        if (value) {
          this.addCssClass("removable");
        } else {
          this.removeCssClass("removable");
        }
      },
      // property apply
      _applySelected: function _applySelected(value, old) {
        if (value) {
          this.addCssClass("selected");
        } else {
          this.removeCssClass("selected");
        }
      }
    }
  });
  qx.ui.mobile.list.renderer.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1643061806436