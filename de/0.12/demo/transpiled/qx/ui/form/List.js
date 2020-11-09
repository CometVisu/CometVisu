(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.scroll.AbstractScrollArea": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.IMultiSelection": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.core.MRemoteChildrenHandling": {
        "require": true
      },
      "qx.ui.core.MMultiSelectionHandling": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.ui.core.selection.ScrollArea": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.layout.VBox": {},
      "qx.bom.element.Attribute": {}
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
       * Andreas Ecker (ecker)
       * Martin Wittemann (martinwittemann)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A list of items. Displays an automatically scrolling list for all
   * added {@link qx.ui.form.ListItem} instances. Supports various
   * selection options: single, multi, ...
   */
  qx.Class.define("qx.ui.form.List", {
    extend: qx.ui.core.scroll.AbstractScrollArea,
    implement: [qx.ui.core.IMultiSelection, qx.ui.form.IForm, qx.ui.form.IField, qx.ui.form.IModelSelection],
    include: [qx.ui.core.MRemoteChildrenHandling, qx.ui.core.MMultiSelectionHandling, qx.ui.form.MForm, qx.ui.form.MModelSelection],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param horizontal {Boolean?false} Whether the list should be horizontal.
     */
    construct: function construct(horizontal) {
      qx.ui.core.scroll.AbstractScrollArea.constructor.call(this); // Create content

      this.__P_116_0 = this._createListItemContainer(); // Used to fire item add/remove events

      this.__P_116_0.addListener("addChildWidget", this._onAddChild, this);

      this.__P_116_0.addListener("removeChildWidget", this._onRemoveChild, this); // Add to scrollpane


      this.getChildControl("pane").add(this.__P_116_0); // Apply orientation

      if (horizontal) {
        this.setOrientation("horizontal");
      } else {
        this.initOrientation();
      } // Add keypress listener


      this.addListener("keypress", this._onKeyPress);
      this.addListener("keyinput", this._onKeyInput); // initialize the search string

      this.__P_116_1 = "";
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /**
       * This event is fired after a list item was added to the list. The
       * {@link qx.event.type.Data#getData} method of the event returns the
       * added item.
       */
      addItem: "qx.event.type.Data",

      /**
       * This event is fired after a list item has been removed from the list.
       * The {@link qx.event.type.Data#getData} method of the event returns the
       * removed item.
       */
      removeItem: "qx.event.type.Data"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "list"
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      // overridden
      width: {
        refine: true,
        init: 100
      },
      // overridden
      height: {
        refine: true,
        init: 200
      },

      /**
       * Whether the list should be rendered horizontal or vertical.
       */
      orientation: {
        check: ["horizontal", "vertical"],
        init: "vertical",
        apply: "_applyOrientation"
      },

      /** Spacing between the items */
      spacing: {
        check: "Integer",
        init: 0,
        apply: "_applySpacing",
        themeable: true
      },

      /** Controls whether the inline-find feature is activated or not */
      enableInlineFind: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_116_1: null,
      __P_116_2: null,

      /** @type {qx.ui.core.Widget} The children container */
      __P_116_0: null,

      /** @type {Class} Pointer to the selection manager to use */
      SELECTION_MANAGER: qx.ui.core.selection.ScrollArea,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      getChildrenContainer: function getChildrenContainer() {
        return this.__P_116_0;
      },

      /**
       * Handle child widget adds on the content pane
       *
       * @param e {qx.event.type.Data} the event instance
       */
      _onAddChild: function _onAddChild(e) {
        this.fireDataEvent("addItem", e.getData());
      },

      /**
       * Handle child widget removes on the content pane
       *
       * @param e {qx.event.type.Data} the event instance
       */
      _onRemoveChild: function _onRemoveChild(e) {
        this.fireDataEvent("removeItem", e.getData());
      },

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Used to route external <code>keypress</code> events to the list
       * handling (in fact the manager of the list)
       *
       * @param e {qx.event.type.KeySequence} KeyPress event
       */
      handleKeyPress: function handleKeyPress(e) {
        if (!this._onKeyPress(e)) {
          this._getManager().handleKeyPress(e);
        }
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED API
      ---------------------------------------------------------------------------
      */

      /**
       * This container holds the list item widgets.
       *
       * @return {qx.ui.container.Composite} Container for the list item widgets
       */
      _createListItemContainer: function _createListItemContainer() {
        return new qx.ui.container.Composite();
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        var content = this.__P_116_0; // save old layout for disposal

        var oldLayout = content.getLayout(); // Create new layout

        var horizontal = value === "horizontal";
        var layout = horizontal ? new qx.ui.layout.HBox() : new qx.ui.layout.VBox(); // Configure content

        content.setLayout(layout);
        content.setAllowGrowX(!horizontal);
        content.setAllowGrowY(horizontal); // Configure spacing

        this._applySpacing(this.getSpacing()); // dispose old layout


        if (oldLayout) {
          oldLayout.dispose();
        }
      },
      // property apply
      _applySpacing: function _applySpacing(value, old) {
        this.__P_116_0.getLayout().setSpacing(value);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for <code>keypress</code> events.
       *
       * @param e {qx.event.type.KeySequence} KeyPress event
       * @return {Boolean} Whether the event was processed
       */
      _onKeyPress: function _onKeyPress(e) {
        // Execute action on press <ENTER>
        if (e.getKeyIdentifier() == "Enter" && !e.isAltPressed()) {
          var items = this.getSelection();

          for (var i = 0; i < items.length; i++) {
            items[i].fireEvent("action");
          }

          return true;
        }

        return false;
      },

      /*
      ---------------------------------------------------------------------------
        FIND SUPPORT
      ---------------------------------------------------------------------------
      */

      /**
       * Handles the inline find - if enabled
       *
       * @param e {qx.event.type.KeyInput} key input event
       */
      _onKeyInput: function _onKeyInput(e) {
        // do nothing if the find is disabled
        if (!this.getEnableInlineFind()) {
          return;
        } // Only useful in single or one selection mode


        var mode = this.getSelectionMode();

        if (!(mode === "single" || mode === "one")) {
          return;
        } // Reset string after a second of non pressed key


        if (new Date().valueOf() - this.__P_116_2 > 1000) {
          this.__P_116_1 = "";
        } // Combine keys the user pressed to a string


        this.__P_116_1 += e.getChar(); // Find matching item

        var matchedItem = this.findItemByLabelFuzzy(this.__P_116_1); // if an item was found, select it

        if (matchedItem) {
          this.setSelection([matchedItem]);
        } // Store timestamp


        this.__P_116_2 = new Date().valueOf();
      },

      /**
       * Takes the given string and tries to find a ListItem
       * which starts with this string. The search is not case sensitive and the
       * first found ListItem will be returned. If there could not be found any
       * qualifying list item, null will be returned.
       *
       * @param search {String} The text with which the label of the ListItem should start with
       * @return {qx.ui.form.ListItem} The found ListItem or null
       */
      findItemByLabelFuzzy: function findItemByLabelFuzzy(search) {
        // lower case search text
        search = search.toLowerCase(); // get all items of the list

        var items = this.getChildren(); // go threw all items

        for (var i = 0, l = items.length; i < l; i++) {
          // get the label of the current item
          var currentLabel = items[i].getLabel(); // if the label fits with the search text (ignore case, begins with)

          if (currentLabel && currentLabel.toLowerCase().indexOf(search) == 0) {
            // just return the first found element
            return items[i];
          }
        } // if no element was found, return null


        return null;
      },

      /**
       * Find an item by its {@link qx.ui.basic.Atom#getLabel}.
       *
       * @param search {String} A label or any item
       * @param ignoreCase {Boolean?true} description
       * @return {qx.ui.form.ListItem} The found ListItem or null
       */
      findItem: function findItem(search, ignoreCase) {
        // lowercase search
        if (ignoreCase !== false) {
          search = search.toLowerCase();
        }

        ; // get all items of the list

        var items = this.getChildren();
        var item; // go through all items

        for (var i = 0, l = items.length; i < l; i++) {
          item = items[i]; // get the content of the label; text content when rich

          var label;

          if (item.isRich()) {
            var control = item.getChildControl("label", true);

            if (control) {
              var labelNode = control.getContentElement().getDomElement();

              if (labelNode) {
                label = qx.bom.element.Attribute.get(labelNode, "text");
              }
            }
          } else {
            label = item.getLabel();
          }

          if (label != null) {
            if (label.translate) {
              label = label.translate();
            }

            if (ignoreCase !== false) {
              label = label.toLowerCase();
            }

            if (label.toString() == search.toString()) {
              return item;
            }
          }
        }

        return null;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_116_0");
    }
  });
  qx.ui.form.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1604956074516