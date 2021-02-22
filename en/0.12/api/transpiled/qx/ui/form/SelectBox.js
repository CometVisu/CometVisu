(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.AbstractSelectBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.ISingleSelection": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.core.MSingleSelectionHandling": {
        "require": true
      },
      "qx.ui.form.MModelSelection": {
        "require": true
      },
      "qx.ui.core.Spacer": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.basic.Image": {},
      "qx.bom.Viewport": {}
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
       * Martin Wittemann (martinwittemann)
       * Sebastian Werner (wpbasti)
       * Jonathan Weiß (jonathan_rass)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A form widget which allows a single selection. Looks somewhat like
   * a normal button, but opens a list of items to select when tapping on it.
   *
   * Keep in mind that the SelectBox widget has always a selected item (due to the
   * single selection mode). Right after adding the first item a <code>changeSelection</code>
   * event is fired.
   *
   * <pre class='javascript'>
   * var selectBox = new qx.ui.form.SelectBox();
   *
   * selectBox.addListener("changeSelection", function(e) {
   *   // ...
   * });
   *
   * // now the 'changeSelection' event is fired
   * selectBox.add(new qx.ui.form.ListItem("Item 1"));
   * </pre>
   *
   * @childControl spacer {qx.ui.core.Spacer} flexible spacer widget
   * @childControl atom {qx.ui.basic.Atom} shows the text and icon of the content
   * @childControl arrow {qx.ui.basic.Image} shows the arrow to open the popup
   */
  qx.Class.define("qx.ui.form.SelectBox", {
    extend: qx.ui.form.AbstractSelectBox,
    implement: [qx.ui.core.ISingleSelection, qx.ui.form.IModelSelection, qx.ui.form.IField],
    include: [qx.ui.core.MSingleSelectionHandling, qx.ui.form.MModelSelection],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.form.AbstractSelectBox.constructor.call(this);

      this._createChildControl("atom");

      this._createChildControl("spacer");

      this._createChildControl("arrow"); // Register listener


      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.addListener("tap", this._onTap, this);
      this.addListener("keyinput", this._onKeyInput, this);
      this.addListener("changeSelection", this.__P_308_0, this);
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
        init: "selectbox"
      },
      rich: {
        init: false,
        check: "Boolean",
        apply: "_applyRich"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.ui.form.ListItem} instance */
      __P_308_1: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      _applyRich: function _applyRich(value, oldValue) {
        this.getChildControl("atom").setRich(value);
      },
      // overridden
      _defaultFormat: function _defaultFormat(item) {
        if (item) {
          if (typeof item.isRich == "function" && item.isRich()) {
            this.setRich(true);
          }

          return item.getLabel();
        }

        return null;
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "spacer":
            control = new qx.ui.core.Spacer();

            this._add(control, {
              flex: 1
            });

            break;

          case "atom":
            control = new qx.ui.basic.Atom(" ");
            control.setCenter(false);
            control.setAnonymous(true);

            this._add(control, {
              flex: 1
            });

            break;

          case "arrow":
            control = new qx.ui.basic.Image();
            control.setAnonymous(true);

            this._add(control);

            break;
        }

        return control || qx.ui.form.SelectBox.prototype._createChildControlImpl.base.call(this, id);
      },
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS FOR SELECTION API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the list items for the selection.
       *
       * @return {qx.ui.form.ListItem[]} List items to select.
       */
      _getItems: function _getItems() {
        return this.getChildrenContainer().getChildren();
      },

      /**
       * Returns if the selection could be empty or not.
       *
       * @return {Boolean} <code>true</code> If selection could be empty,
       *    <code>false</code> otherwise.
       */
      _isAllowEmptySelection: function _isAllowEmptySelection() {
        return this.getChildrenContainer().getSelectionMode() !== "one";
      },

      /**
       * Event handler for <code>changeSelection</code>.
       *
       * @param e {qx.event.type.Data} Data event.
       */
      __P_308_0: function __P_308_0(e) {
        var listItem = e.getData()[0];
        var list = this.getChildControl("list");

        if (list.getSelection()[0] != listItem) {
          if (listItem) {
            list.setSelection([listItem]);
          } else {
            list.resetSelection();
          }
        }

        this.__P_308_2();

        this.__P_308_3();
      },

      /**
       * Sets the icon inside the list to match the selected ListItem.
       */
      __P_308_2: function __P_308_2() {
        var listItem = this.getChildControl("list").getSelection()[0];
        var atom = this.getChildControl("atom");
        var icon = listItem ? listItem.getIcon() : "";
        icon == null ? atom.resetIcon() : atom.setIcon(icon);
      },

      /**
       * Sets the label inside the list to match the selected ListItem.
       */
      __P_308_3: function __P_308_3() {
        var listItem = this.getChildControl("list").getSelection()[0];
        var atom = this.getChildControl("atom");
        var label = listItem ? listItem.getLabel() : "";
        var format = this.getFormat();

        if (format != null && listItem) {
          label = format.call(this, listItem);
        } // check for translation


        if (label && label.translate) {
          label = label.translate();
        }

        label == null ? atom.resetLabel() : atom.setLabel(label);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }

        this.addState("hovered");
      },

      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }

        this.removeState("hovered");

        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
        }
      },

      /**
       * Toggles the popup's visibility.
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onTap: function _onTap(e) {
        this.toggle();
      },
      // overridden
      _onKeyPress: function _onKeyPress(e) {
        var iden = e.getKeyIdentifier();

        if (iden == "Enter" || iden == "Space") {
          // Apply pre-selected item (translate quick selection to real selection)
          if (this.__P_308_1) {
            this.setSelection([this.__P_308_1]);
            this.__P_308_1 = null;
          }

          this.toggle();
        } else {
          qx.ui.form.SelectBox.prototype._onKeyPress.base.call(this, e);
        }
      },

      /**
       * Forwards key event to list widget.
       *
       * @param e {qx.event.type.KeyInput} Key event
       */
      _onKeyInput: function _onKeyInput(e) {
        // clone the event and re-calibrate the event
        var clone = e.clone();
        clone.setTarget(this._list);
        clone.setBubbles(false); // forward it to the list

        this.getChildControl("list").dispatchEvent(clone);
      },
      // overridden
      _onListPointerDown: function _onListPointerDown(e) {
        // Apply pre-selected item (translate quick selection to real selection)
        if (this.__P_308_1) {
          this.setSelection([this.__P_308_1]);
          this.__P_308_1 = null;
        }
      },
      // overridden
      _onListChangeSelection: function _onListChangeSelection(e) {
        var current = e.getData();
        var old = e.getOldData(); // Remove old listeners for icon and label changes.

        if (old && old.length > 0) {
          old[0].removeListener("changeIcon", this.__P_308_2, this);
          old[0].removeListener("changeLabel", this.__P_308_3, this);
        }

        if (current.length > 0) {
          // Ignore quick context (e.g. pointerover)
          // and configure the new value when closing the popup afterwards
          var popup = this.getChildControl("popup");
          var list = this.getChildControl("list");
          var context = list.getSelectionContext();

          if (popup.isVisible() && (context == "quick" || context == "key")) {
            this.__P_308_1 = current[0];
          } else {
            this.setSelection([current[0]]);
            this.__P_308_1 = null;
          } // Add listeners for icon and label changes


          current[0].addListener("changeIcon", this.__P_308_2, this);
          current[0].addListener("changeLabel", this.__P_308_3, this);
        } else {
          this.resetSelection();
        }
      },
      // overridden
      _onPopupChangeVisibility: function _onPopupChangeVisibility(e) {
        qx.ui.form.SelectBox.prototype._onPopupChangeVisibility.base.call(this, e); // Synchronize the current selection to the list selection
        // when the popup is closed. The list selection may be invalid
        // because of the quick selection handling which is not
        // directly applied to the selectbox


        var popup = this.getChildControl("popup");

        if (!popup.isVisible()) {
          var list = this.getChildControl("list"); // check if the list has any children before selecting

          if (list.hasChildren()) {
            list.setSelection(this.getSelection());
          }
        } else {
          // ensure that the list is never bigger that the max list height and
          // the available space in the viewport
          var distance = popup.getLayoutLocation(this);
          var viewPortHeight = qx.bom.Viewport.getHeight(); // distance to the bottom and top borders of the viewport

          var toTop = distance.top;
          var toBottom = viewPortHeight - distance.bottom;
          var availableHeigth = toTop > toBottom ? toTop : toBottom;
          var maxListHeight = this.getMaxListHeight();
          var list = this.getChildControl("list");

          if (maxListHeight == null || maxListHeight > availableHeigth) {
            list.setMaxHeight(availableHeigth);
          } else if (maxListHeight < availableHeigth) {
            list.setMaxHeight(maxListHeight);
          }
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCT
    *****************************************************************************
    */
    destruct: function destruct() {
      this.__P_308_1 = null;
    }
  });
  qx.ui.form.SelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SelectBox.js.map?dt=1614015658794