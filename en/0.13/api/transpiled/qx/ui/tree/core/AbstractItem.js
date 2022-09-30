(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.basic.Label": {},
      "qx.ui.basic.Image": {},
      "qx.ui.tree.core.FolderOpenButton": {},
      "qx.ui.core.Spacer": {},
      "qx.util.PropertyUtil": {}
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
       * Fabian Jakobs (fjakobs)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * The AbstractItem serves as a common superclass for the {@link
   * qx.ui.tree.core.AbstractTreeItem} and {@link qx.ui.tree.VirtualTreeItem} classes.
   *
   * @childControl label {qx.ui.basic.Label} label of the tree item
   * @childControl icon {qx.ui.basic.Image} icon of the tree item
   * @childControl open {qx.ui.tree.core.FolderOpenButton} button to open/close a subtree
   */
  qx.Class.define("qx.ui.tree.core.AbstractItem", {
    extend: qx.ui.core.Widget,
    type: "abstract",
    include: [qx.ui.form.MModelProperty],
    implement: [qx.ui.form.IModel],

    /**
     * @param label {String?null} The tree item's caption text
     */
    construct: function construct(label) {
      qx.ui.core.Widget.constructor.call(this);

      if (label != null) {
        this.setLabel(label);
      }

      this._setLayout(new qx.ui.layout.HBox());

      this._addWidgets();

      this.initOpen();
    },
    properties: {
      /**
       * Whether the tree item is opened.
       */
      open: {
        check: "Boolean",
        init: false,
        event: "changeOpen",
        apply: "_applyOpen"
      },

      /**
       * Controls, when to show the open symbol. If the mode is "auto" , the open
       * symbol is shown only if the item has child items.
       */
      openSymbolMode: {
        check: ["always", "never", "auto"],
        init: "auto",
        event: "changeOpenSymbolMode",
        apply: "_applyOpenSymbolMode"
      },

      /**
       * The number of pixel to indent the tree item for each level.
       */
      indent: {
        check: "Integer",
        init: 19,
        apply: "_applyIndent",
        event: "changeIndent",
        themeable: true
      },

      /**
       * URI of "closed" icon. Can be any URI String supported by qx.ui.basic.Image.
       **/
      icon: {
        check: "String",
        apply: "_applyIcon",
        event: "changeIcon",
        nullable: true,
        themeable: true
      },

      /**
       * URI of "opened" icon. Can be any URI String supported by qx.ui.basic.Image.
       **/
      iconOpened: {
        check: "String",
        apply: "_applyIconOpened",
        event: "changeIconOpened",
        nullable: true,
        themeable: true
      },

      /**
       * The label/caption/text
       */
      label: {
        check: "String",
        apply: "_applyLabel",
        event: "changeLabel",
        init: ""
      }
    },
    members: {
      __P_447_0: null,
      __P_447_1: null,
      __P_447_2: null,

      /**
       * This method configures the tree item by adding its sub widgets like
       * label, icon, open symbol, ...
       *
       * This method must be overridden by sub classes.
       */
      _addWidgets: function _addWidgets() {
        throw new Error("Abstract method call.");
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "label":
            control = new qx.ui.basic.Label().set({
              alignY: "middle",
              anonymous: true,
              value: this.getLabel()
            });
            break;

          case "icon":
            control = new qx.ui.basic.Image().set({
              alignY: "middle",
              anonymous: true,
              source: this.getIcon()
            });
            break;

          case "open":
            control = new qx.ui.tree.core.FolderOpenButton().set({
              alignY: "middle"
            });
            control.addListener("changeOpen", this._onChangeOpen, this);
            control.addListener("resize", this._updateIndent, this);
            break;
        }

        return control || qx.ui.tree.core.AbstractItem.superclass.prototype._createChildControlImpl.call(this, id);
      },

      /*
      ---------------------------------------------------------------------------
        TREE ITEM CONFIGURATION
      ---------------------------------------------------------------------------
      */

      /**
       * Adds a sub widget to the tree item's horizontal box layout.
       *
       * @param widget {qx.ui.core.Widget} The widget to add
       * @param options {Map?null} The (optional) layout options to use for the widget
       */
      addWidget: function addWidget(widget, options) {
        this._add(widget, options);
      },

      /**
       * Adds the spacer used to render the indentation to the item's horizontal
       * box layout. If the spacer has been added before, it is removed from its
       * old position and added to the end of the layout.
       */
      addSpacer: function addSpacer() {
        if (!this.__P_447_2) {
          this.__P_447_2 = new qx.ui.core.Spacer();
        } else {
          this._remove(this.__P_447_2);
        }

        this._add(this.__P_447_2);
      },

      /**
       * Adds the open button to the item's horizontal box layout. If the open
       * button has been added before, it is removed from its old position and
       * added to the end of the layout.
       */
      addOpenButton: function addOpenButton() {
        this._add(this.getChildControl("open"));
      },

      /**
       * Event handler, which listens to open state changes of the open button
       *
       * @param e {qx.event.type.Data} The event object
       */
      _onChangeOpen: function _onChangeOpen(e) {
        if (this.isOpenable()) {
          this.setOpen(e.getData());
        }
      },

      /**
       * Adds the icon widget to the item's horizontal box layout. If the icon
       * widget has been added before, it is removed from its old position and
       * added to the end of the layout.
       */
      addIcon: function addIcon() {
        var icon = this.getChildControl("icon");

        if (this.__P_447_1) {
          this._remove(icon);
        }

        this._add(icon);

        this.__P_447_1 = true;
      },

      /**
       * Adds the label to the item's horizontal box layout. If the label
       * has been added before, it is removed from its old position and
       * added to the end of the layout.
       *
       * @param text {String?0} The label's contents
       */
      addLabel: function addLabel(text) {
        var label = this.getChildControl("label");

        if (this.__P_447_0) {
          this._remove(label);
        }

        if (text) {
          this.setLabel(text);
        } else {
          label.setValue(this.getLabel());
        }

        this._add(label);

        this.__P_447_0 = true;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyIcon: function _applyIcon(value, old) {
        // Set "closed" icon - even when "opened" - if no "opened" icon was
        // user-defined
        if (!this.__P_447_3()) {
          this.__P_447_4(value);
        } else if (!this.isOpen()) {
          this.__P_447_4(value);
        }
      },
      // property apply
      _applyIconOpened: function _applyIconOpened(value, old) {
        if (this.isOpen()) {
          // ... both "closed" and "opened" icon were user-defined
          if (this.__P_447_5() && this.__P_447_3()) {
            this.__P_447_4(value);
          } // .. only "opened" icon was user-defined
          else if (!this.__P_447_5() && this.__P_447_3()) {
              this.__P_447_4(value);
            }
        }
      },
      // property apply
      _applyLabel: function _applyLabel(value, old) {
        var label = this.getChildControl("label", true);

        if (label) {
          label.setValue(value);
        }
      },
      // property apply
      _applyOpen: function _applyOpen(value, old) {
        var open = this.getChildControl("open", true);

        if (open) {
          open.setOpen(value);
        } //
        // Determine source of icon for "opened" or "closed" state
        //


        var source; // Opened

        if (value) {
          // Never overwrite user-defined icon with themed "opened" icon
          source = this.__P_447_3() ? this.getIconOpened() : null;
        } // Closed
        else {
            source = this.getIcon();
          }

        if (source) {
          this.__P_447_4(source);
        }

        value ? this.addState("opened") : this.removeState("opened");
      },

      /**
      * Get user-defined value of "icon" property
      *
      * @return {var} The user value of the property "icon"
      */
      __P_447_5: function __P_447_5() {
        return qx.util.PropertyUtil.getUserValue(this, "icon");
      },

      /**
      * Get user-defined value of "iconOpened" property
      *
      * @return {var} The user value of the property "iconOpened"
      */
      __P_447_3: function __P_447_3() {
        return qx.util.PropertyUtil.getUserValue(this, "iconOpened");
      },

      /**
      * Set source of icon child control
      *
      * @param url {String} The URL of the icon
      */
      __P_447_4: function __P_447_4(url) {
        var icon = this.getChildControl("icon", true);

        if (icon) {
          icon.setSource(url);
        }
      },

      /*
      ---------------------------------------------------------------------------
        INDENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Whether the tree item can be opened.
       *
       * @return {Boolean} Whether the tree item can be opened.
       */
      isOpenable: function isOpenable() {
        var openMode = this.getOpenSymbolMode();
        return openMode === "always" || openMode === "auto" && this.hasChildren();
      },

      /**
       * Whether the open symbol should be shown
       *
       * @return {Boolean} Whether the open symbol should be shown.
       */
      _shouldShowOpenSymbol: function _shouldShowOpenSymbol() {
        throw new Error("Abstract method call.");
      },
      // property apply
      _applyOpenSymbolMode: function _applyOpenSymbolMode(value, old) {
        this._updateIndent();
      },

      /**
       * Update the indentation of the tree item.
       */
      _updateIndent: function _updateIndent() {
        var openWidth = 0;
        var open = this.getChildControl("open", true);

        if (open) {
          if (this._shouldShowOpenSymbol()) {
            open.show();
            var openBounds = open.getBounds();

            if (openBounds) {
              openWidth = openBounds.width;
            } else {
              return;
            }
          } else {
            open.exclude();
          }
        }

        if (this.__P_447_2) {
          this.__P_447_2.setWidth((this.getLevel() + 1) * this.getIndent() - openWidth);
        }
      },
      // property apply
      _applyIndent: function _applyIndent(value, old) {
        this._updateIndent();
      },

      /**
       * Computes the item's nesting level. If the item is not part of a tree
       * this function will return <code>null</code>.
       *
       * @return {Integer|null} The item's nesting level or <code>null</code>.
       */
      getLevel: function getLevel() {
        throw new Error("Abstract method call.");
      },
      // overridden
      syncWidget: function syncWidget(jobs) {
        this._updateIndent();
      },

      /**
       * Whether the item has any children
       *
       * @return {Boolean} Whether the item has any children.
       */
      hasChildren: function hasChildren() {
        throw new Error("Abstract method call.");
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_447_2");
    }
  });
  qx.ui.tree.core.AbstractItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractItem.js.map?dt=1664560774182