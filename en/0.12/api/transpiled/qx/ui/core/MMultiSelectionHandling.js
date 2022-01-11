(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {},
      "qx.lang.Array": {}
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
       * Sebastian Werner (wpbasti)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * This mixin links all methods to manage the multi selection from the
   * internal selection manager to the widget.
   */
  qx.Mixin.define("qx.ui.core.MMultiSelectionHandling", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      // Create selection manager
      var clazz = this.SELECTION_MANAGER;
      var manager = this.__P_279_0 = new clazz(this); // Add widget event listeners

      this.addListener("pointerdown", manager.handlePointerDown, manager);
      this.addListener("tap", manager.handleTap, manager);
      this.addListener("pointerover", manager.handlePointerOver, manager);
      this.addListener("pointermove", manager.handlePointerMove, manager);
      this.addListener("losecapture", manager.handleLoseCapture, manager);
      this.addListener("keypress", manager.handleKeyPress, manager);
      this.addListener("addItem", manager.handleAddItem, manager);
      this.addListener("removeItem", manager.handleRemoveItem, manager); // Add manager listeners

      manager.addListener("changeSelection", this._onSelectionChange, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fires after the value was modified */
      "changeValue": "qx.event.type.Data",

      /** Fires after the selection was modified */
      "changeSelection": "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * The selection mode to use.
       *
       * For further details please have a look at:
       * {@link qx.ui.core.selection.Abstract#mode}
       */
      selectionMode: {
        check: ["single", "multi", "additive", "one"],
        init: "single",
        apply: "_applySelectionMode"
      },

      /**
       * Enable drag selection (multi selection of items through
       * dragging the pointer in pressed states).
       *
       * Only possible for the selection modes <code>multi</code> and <code>additive</code>
       */
      dragSelection: {
        check: "Boolean",
        init: false,
        apply: "_applyDragSelection"
      },

      /**
       * Enable quick selection mode, where no tap is needed to change the selection.
       *
       * Only possible for the modes <code>single</code> and <code>one</code>.
       */
      quickSelection: {
        check: "Boolean",
        init: false,
        apply: "_applyQuickSelection"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.core.selection.Abstract} The selection manager */
      __P_279_0: null,

      /** @type {Boolean} used to control recursion in onSelectionChange */
      __P_279_1: false,

      /*
      ---------------------------------------------------------------------------
        USER API
      ---------------------------------------------------------------------------
      */

      /**
       * setValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @param items {null|qx.ui.core.Widget[]} Items to select.
       * @returns {null|TypeError} The status of this operation.
       */
      setValue: function setValue(items) {
        if (null === items) {
          this.__P_279_0.clearSelection();

          return null;
        }

        try {
          this.setSelection(items);
          return null;
        } catch (e) {
          return e;
        }
      },

      /**
       * getValue implements part of the {@link qx.ui.form.IField} interface.
       *
       * @returns {qx.ui.core.Widget[]} The selected widgets or null if there are none.
       */
      getValue: function getValue() {
        return this.__P_279_0.getSelection();
      },

      /**
       * resetValue implements part of the {@link qx.ui.form.IField} interface.
       */
      resetValue: function resetValue() {
        this.__P_279_0.clearSelection();
      },

      /**
       * Selects all items of the managed object.
       */
      selectAll: function selectAll() {
        this.__P_279_0.selectAll();
      },

      /**
       * Detects whether the given item is currently selected.
       *
       * @param item {qx.ui.core.Widget} Any valid selectable item.
       * @return {Boolean} Whether the item is selected.
       * @throws {Error} if the item is not a child element.
       */
      isSelected: function isSelected(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not test if " + item + " is selected, because it is not a child element!");
        }

        return this.__P_279_0.isItemSelected(item);
      },

      /**
       * Adds the given item to the existing selection.
       *
       * Use {@link #setSelection} instead if you want to replace
       * the current selection.
       *
       * @param item {qx.ui.core.Widget} Any valid item.
       * @throws {Error} if the item is not a child element.
       */
      addToSelection: function addToSelection(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not add + " + item + " to selection, because it is not a child element!");
        }

        this.__P_279_0.addItem(item);
      },

      /**
       * Removes the given item from the selection.
       *
       * Use {@link #resetSelection} when you want to clear
       * the whole selection at once.
       *
       * @param item {qx.ui.core.Widget} Any valid item
       * @throws {Error} if the item is not a child element.
       */
      removeFromSelection: function removeFromSelection(item) {
        if (!qx.ui.core.Widget.contains(this, item)) {
          throw new Error("Could not remove " + item + " from selection, because it is not a child element!");
        }

        this.__P_279_0.removeItem(item);
      },

      /**
       * Selects an item range between two given items.
       *
       * @param begin {qx.ui.core.Widget} Item to start with
       * @param end {qx.ui.core.Widget} Item to end at
       */
      selectRange: function selectRange(begin, end) {
        this.__P_279_0.selectItemRange(begin, end);
      },

      /**
       * Clears the whole selection at once. Also
       * resets the lead and anchor items and their
       * styles.
       */
      resetSelection: function resetSelection() {
        this.__P_279_0.clearSelection();
      },

      /**
       * Replaces current selection with the given items.
       *
       * @param items {qx.ui.core.Widget[]} Items to select.
       * @throws {Error} if one of the items is not a child element and if
       *    the mode is set to <code>single</code> or <code>one</code> and
       *    the items contains more than one item.
       */
      setSelection: function setSelection(items) {
        // Block recursion so that when selection changes modelSelection, the modelSelection
        //  cannot change selection again; this is important because modelSelection does not
        //  necessarily match selection, for example when the item's model properties are
        //  null.
        if (this.__P_279_1) {
          return;
        }

        for (var i = 0; i < items.length; i++) {
          if (!qx.ui.core.Widget.contains(this, items[i])) {
            throw new Error("Could not select " + items[i] + ", because it is not a child element!");
          }
        }

        if (items.length === 0) {
          this.resetSelection();
        } else {
          var currentSelection = this.getSelection();

          if (!qx.lang.Array.equals(currentSelection, items)) {
            this.__P_279_0.replaceSelection(items);
          }
        }
      },

      /**
       * Returns an array of currently selected items.
       *
       * Note: The result is only a set of selected items, so the order can
       * differ from the sequence in which the items were added.
       *
       * @return {qx.ui.core.Widget[]} List of items.
       */
      getSelection: function getSelection() {
        return this.__P_279_0.getSelection();
      },

      /**
       * Returns an array of currently selected items sorted
       * by their index in the container.
       *
       * @return {qx.ui.core.Widget[]} Sorted list of items
       */
      getSortedSelection: function getSortedSelection() {
        return this.__P_279_0.getSortedSelection();
      },

      /**
       * Whether the selection is empty
       *
       * @return {Boolean} Whether the selection is empty
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.__P_279_0.isSelectionEmpty();
      },

      /**
       * Returns the last selection context.
       *
       * @return {String | null} One of <code>tap</code>, <code>quick</code>,
       *    <code>drag</code> or <code>key</code> or <code>null</code>.
       */
      getSelectionContext: function getSelectionContext() {
        return this.__P_279_0.getSelectionContext();
      },

      /**
       * Returns the internal selection manager. Use this with
       * caution!
       *
       * @return {qx.ui.core.selection.Abstract} The selection manager
       */
      _getManager: function _getManager() {
        return this.__P_279_0;
      },

      /**
       * Returns all elements which are selectable.
       *
       * @param all {Boolean} true for all selectables, false for the
       *   selectables the user can interactively select
       * @return {qx.ui.core.Widget[]} The contained items.
       */
      getSelectables: function getSelectables(all) {
        return this.__P_279_0.getSelectables(all);
      },

      /**
       * Invert the selection. Select the non selected and deselect the selected.
       */
      invertSelection: function invertSelection() {
        this.__P_279_0.invertSelection();
      },

      /**
       * Returns the current lead item. Generally the item which was last modified
       * by the user (tapped on etc.)
       *
       * @return {qx.ui.core.Widget} The lead item or <code>null</code>
       */
      _getLeadItem: function _getLeadItem() {
        var mode = this.__P_279_0.getMode();

        if (mode === "single" || mode === "one") {
          return this.__P_279_0.getSelectedItem();
        } else {
          return this.__P_279_0.getLeadItem();
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySelectionMode: function _applySelectionMode(value, old) {
        this.__P_279_0.setMode(value);
      },
      // property apply
      _applyDragSelection: function _applyDragSelection(value, old) {
        this.__P_279_0.setDrag(value);
      },
      // property apply
      _applyQuickSelection: function _applyQuickSelection(value, old) {
        this.__P_279_0.setQuick(value);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>changeSelection</code> event on selection manager.
       *
       * @param e {qx.event.type.Data} Data event
       */
      _onSelectionChange: function _onSelectionChange(e) {
        if (this.__P_279_1) {
          return;
        }

        this.__P_279_1 = true;

        try {
          this.fireDataEvent("changeSelection", e.getData(), e.getOldData());
          this.fireDataEvent("changeValue", e.getData(), e.getOldData());
        } finally {
          this.__P_279_1 = false;
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_279_0");
    }
  });
  qx.ui.core.MMultiSelectionHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MMultiSelectionHandling.js.map?dt=1641882220725