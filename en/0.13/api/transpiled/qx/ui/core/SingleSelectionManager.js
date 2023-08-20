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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * Responsible for the single selection management.
   *
   * The class manage a list of {@link qx.ui.core.Widget} which are returned from
   * {@link qx.ui.core.ISingleSelectionProvider#getItems}.
   *
   * @internal
   */
  qx.Class.define("qx.ui.core.SingleSelectionManager", {
    extend: qx.core.Object,
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * Construct the single selection manager.
     *
     * @param selectionProvider {qx.ui.core.ISingleSelectionProvider} The provider
     * for selection.
     */
    construct: function construct(selectionProvider) {
      qx.core.Object.constructor.call(this);
      this.__P_320_0 = selectionProvider;
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /** Fires after the selection was modified */
      changeSelected: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * If the value is <code>true</code> the manager allows an empty selection,
       * otherwise the first selectable element returned from the
       * <code>qx.ui.core.ISingleSelectionProvider</code> will be selected.
       */
      allowEmptySelection: {
        check: "Boolean",
        init: true,
        apply: "__P_320_1"
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      /** @type {qx.ui.core.Widget} The selected widget. */
      __P_320_2: null,
      /** @type {qx.ui.core.ISingleSelectionProvider} The provider for selection management */
      __P_320_0: null,
      /*
      ---------------------------------------------------------------------------
         PUBLIC API
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the current selected element.
       *
       * @return {qx.ui.core.Widget|null} The current selected widget or
       *    <code>null</code> if the selection is empty.
       */
      getSelected: function getSelected() {
        return this.__P_320_2;
      },
      /**
       * Selects the passed element.
       *
       * @param item {qx.ui.core.Widget} Element to select.
       * @throws {Error} if the element is not a child element.
       */
      setSelected: function setSelected(item) {
        if (!this.__P_320_3(item)) {
          throw new Error("Could not select " + item + ", because it is not a child element!");
        }
        this.__P_320_4(item);
      },
      /**
       * Reset the current selection. If {@link #allowEmptySelection} is set to
       * <code>true</code> the first element will be selected.
       */
      resetSelected: function resetSelected() {
        this.__P_320_4(null);
      },
      /**
       * Return <code>true</code> if the passed element is selected.
       *
       * @param item {qx.ui.core.Widget} Element to check if selected.
       * @return {Boolean} <code>true</code> if passed element is selected,
       *    <code>false</code> otherwise.
       * @throws {Error} if the element is not a child element.
       */
      isSelected: function isSelected(item) {
        if (!this.__P_320_3(item)) {
          throw new Error("Could not check if " + item + " is selected," + " because it is not a child element!");
        }
        return this.__P_320_2 === item;
      },
      /**
       * Returns <code>true</code> if selection is empty.
       *
       * @return {Boolean} <code>true</code> if selection is empty,
       *    <code>false</code> otherwise.
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__P_320_2 == null;
      },
      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        var items = this.__P_320_0.getItems();
        var result = [];
        for (var i = 0; i < items.length; i++) {
          if (this.__P_320_0.isItemSelectable(items[i])) {
            result.push(items[i]);
          }
        }

        // in case of an user selectable list, remove the enabled items
        if (!all) {
          for (var i = result.length - 1; i >= 0; i--) {
            if (!result[i].getEnabled()) {
              result.splice(i, 1);
            }
          }
        }
        return result;
      },
      /*
      ---------------------------------------------------------------------------
         APPLY METHODS
      ---------------------------------------------------------------------------
      */
      // apply method
      __P_320_1: function __P_320_1(value, old) {
        if (!value) {
          this.__P_320_4(this.__P_320_2);
        }
      },
      /*
      ---------------------------------------------------------------------------
         HELPERS
      ---------------------------------------------------------------------------
      */
      /**
       * Set selected element.
       *
       * If passes value is <code>null</code>, the selection will be reseted.
       *
       * @param item {qx.ui.core.Widget | null} element to select, or
       *    <code>null</code> to reset selection.
       */
      __P_320_4: function __P_320_4(item) {
        var oldSelected = this.__P_320_2;
        var newSelected = item;
        if (newSelected != null && oldSelected === newSelected) {
          return;
        }
        if (!this.isAllowEmptySelection() && newSelected == null) {
          var firstElement = this.getSelectables(true)[0];
          if (firstElement) {
            newSelected = firstElement;
          }
        }
        this.__P_320_2 = newSelected;
        this.fireDataEvent("changeSelected", newSelected, oldSelected);
      },
      /**
       * Checks if passed element is a child element.
       *
       * @param item {qx.ui.core.Widget} Element to check if child element.
       * @return {Boolean} <code>true</code> if element is child element,
       *    <code>false</code> otherwise.
       */
      __P_320_3: function __P_320_3(item) {
        var items = this.__P_320_0.getItems();
        for (var i = 0; i < items.length; i++) {
          if (items[i] === item) {
            return true;
          }
        }
        return false;
      }
    },
    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      if (this.__P_320_0.toHashCode) {
        this._disposeObjects("__P_320_0");
      } else {
        this.__P_320_0 = null;
      }
      this._disposeObjects("__P_320_2");
    }
  });
  qx.ui.core.SingleSelectionManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SingleSelectionManager.js.map?dt=1692560722515