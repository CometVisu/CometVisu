function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.popup.Popup": {
        "construct": true,
        "require": true
      },
      "qx.core.Assert": {
        "construct": true
      },
      "qx.ui.form.core.AbstractVirtualBox": {
        "construct": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.ui.list.List": {},
      "qx.bom.Viewport": {},
      "qx.util.Delegate": {},
      "qx.ui.form.ListItem": {},
      "qx.theme.manager.Font": {},
      "qx.bom.Font": {},
      "qx.bom.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A drop-down (popup) widget which contains a virtual list for selection.
   *
   * @childControl list {qx.ui.list.List} The virtual list.
   *
   * @internal
   */
  qx.Class.define("qx.ui.form.core.VirtualDropDownList", {
    extend: qx.ui.popup.Popup,

    /**
     * Creates the drop-down list.
     *
     * @param target {qx.ui.form.core.AbstractVirtualBox} The composite widget.
     */
    construct: function construct(target) {
      qx.core.Assert.assertNotNull(target, "Invalid parameter 'target'!");
      qx.core.Assert.assertNotUndefined(target, "Invalid parameter 'target'!");
      qx.core.Assert.assertInterface(target, qx.ui.form.core.AbstractVirtualBox, "Invalid parameter 'target'!");
      qx.ui.popup.Popup.constructor.call(this, new qx.ui.layout.VBox());
      this._target = target;

      this._createChildControl("list");

      this.addListener("changeVisibility", this.__P_327_0, this);
      this.__P_327_1 = new qx.data.Array();
      this.initSelection(this.__P_327_1);
    },
    properties: {
      // overridden
      autoHide: {
        refine: true,
        init: false
      },
      // overridden
      keepActive: {
        refine: true,
        init: true
      },

      /** Current selected items. */
      selection: {
        check: "qx.data.Array",
        event: "changeSelection",
        apply: "_applySelection",
        nullable: false,
        deferredInit: true
      },

      /**
       * Allow the drop-down to grow wider than its parent.
       */
      allowGrowDropDown: {
        init: false,
        nullable: false,
        check: "Boolean",
        apply: "_adjustSize",
        event: "changeAllowGrowDropDown"
      }
    },
    events: {
      /**
       * This event is fired as soon as the content of the selection property changes, but
       * this is not equal to the change of the selection of the widget. If the selection
       * of the widget changes, the content of the array stored in the selection property
       * changes. This means you have to listen to the change event of the selection array
       * to get an event as soon as the user changes the selected item.
       * <pre class="javascript">obj.getSelection().addListener("change", listener, this);</pre>
       */
      "changeSelection": "qx.event.type.Data"
    },
    members: {
      /** @type {qx.ui.form.core.AbstractVirtualBox} The composite widget. */
      _target: null,

      /** @type {var} The pre-selected model item. */
      _preselected: null,

      /**
       * @type {Boolean} Indicator to ignore selection changes from the
       * {@link #selection} array.
       */
      __P_327_2: false,

      /** @type {Boolean} Indicator to ignore selection changes from the list. */
      __P_327_3: false,

      /** @type {qx.data.Array} The initial selection array. */
      __P_327_1: null,

      /**
       * When the drop-down is allowed to grow wider than its parent,
       * this member variable will contain the cached maximum list item width in pixels.
       * This variable gets updated whenever the model or model length changes.
       *
       * @type {Number}
       */
      __P_327_4: 0,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Shows the drop-down.
       */
      open: function open() {
        this.placeToWidget(this._target, true);
        this.show();
      },

      /**
       * Hides the drop-down.
       */
      close: function close() {
        this.hide();
      },

      /**
       * Pre-selects the drop-down item corresponding to the given model object.
       *
       * @param modelItem {Object} Item to be pre-selected.
       */
      setPreselected: function setPreselected(modelItem) {
        this._preselected = modelItem;
        this.__P_327_3 = true;
        var listSelection = this.getChildControl("list").getSelection();
        var helper = new qx.data.Array([modelItem]);

        this.__P_327_5(helper, listSelection);

        helper.dispose();
        this.__P_327_3 = false;
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "list":
            control = new qx.ui.list.List().set({
              focusable: false,
              keepFocus: true,
              keepActive: true,
              height: null,
              width: null,
              maxHeight: this._target.getMaxListHeight(),
              selectionMode: "one",
              quickSelection: true
            });
            control.getSelection().addListener("change", this._onListChangeSelection, this);
            control.addListener("tap", this._handlePointer, this);
            control.addListener("changeModel", this._onChangeModel, this);
            control.addListener("changeModelLength", this._onChangeModelLength, this);
            control.addListener("changeDelegate", this._onChangeDelegate, this);
            this.add(control, {
              flex: 1
            });
            break;
        }

        return control || qx.ui.form.core.VirtualDropDownList.prototype._createChildControlImpl.base.call(this, id, hash);
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */

      /**
       * Handles the complete keyboard events dispatched on the widget.
       *
       * @param event {qx.event.type.KeySequence} The keyboard event.
       */
      _handleKeyboard: function _handleKeyboard(event) {
        if (this.isVisible() && event.getKeyIdentifier() === "Enter") {
          this.__P_327_6();

          return;
        }

        var clone = event.clone();
        clone.setTarget(this.getChildControl("list"));
        clone.setBubbles(false);
        this.getChildControl("list").dispatchEvent(clone);
      },

      /**
       * Handles all mouse events dispatched on the widget.
       *
       * @param event {qx.event.type.Mouse} The mouse event.
       */
      _handlePointer: function _handlePointer(event) {
        this.__P_327_6();
      },

      /**
       * Handler for the local selection change. The method is responsible for
       * the synchronization between the own selection and the selection
       * form the drop-down.
       *
       * @param event {qx.event.type.Data} The data event.
       */
      __P_327_7: function __P_327_7(event) {
        if (this.__P_327_2) {
          return;
        }

        var selection = this.getSelection();
        var listSelection = this.getChildControl("list").getSelection();
        this.__P_327_3 = true;

        this.__P_327_5(selection, listSelection);

        this.__P_327_3 = false;
        this.__P_327_2 = true;

        this.__P_327_5(listSelection, selection);

        this.__P_327_2 = false;
      },

      /**
       * Handler for the selection change on the list. The method is responsible
       * for the synchronization between the list selection and the own selection.
       *
       * @param event {qx.event.type.Data} The data event.
       */
      _onListChangeSelection: function _onListChangeSelection(event) {
        if (this.__P_327_3) {
          return;
        }

        var listSelection = this.getChildControl("list").getSelection();

        if (this.isVisible()) {
          this.setPreselected(listSelection.getItem(0));
        } else {
          this.__P_327_2 = true;

          this.__P_327_5(listSelection, this.getSelection());

          this.__P_327_2 = false;
        }
      },

      /**
       * Handler for the own visibility changes. The method is responsible that
       * the list selects the current selected item.
       *
       * @param event {qx.event.type.Data} The event.
       */
      __P_327_0: function __P_327_0(event) {
        if (this.isVisible()) {
          if (this._preselected == null) {
            var selection = this.getSelection();
            var listSelection = this.getChildControl("list").getSelection();

            this.__P_327_5(selection, listSelection);
          }

          this._adjustSize();
        } else {
          this.setPreselected(null);
        }
      },

      /**
       * Handler for the model change event.
       * Called when the whole model changes, not when its length changes.
       *
       * @param event {qx.event.type.Data} The change event.
       * @protected
       */
      _onChangeModel: function _onChangeModel(event) {
        if (this.getAllowGrowDropDown()) {
          this._recalculateMaxListItemWidth();
        }

        this._adjustSize();
      },

      /**
       * Handler for the model length change event.
       * Called whenever items get added or removed from the model,
       * not when the model itself changes.
       *
       * @param event {qx.event.type.Data}
       * @protected
       */
      _onChangeModelLength: function _onChangeModelLength(event) {
        if (this.getAllowGrowDropDown()) {
          this._recalculateMaxListItemWidth();
        }

        this._adjustSize();
      },

      /**
       * Handler for the delegate change event.
       *
       * @param event {qx.event.type.Data} The change event.
       */
      _onChangeDelegate: function _onChangeDelegate(event) {
        this.getSelection().removeAll();
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applySelection: function _applySelection(value, old) {
        value.addListener("change", this.__P_327_7, this);

        if (old != null) {
          old.removeListener("change", this.__P_327_7, this);
        }

        this.__P_327_5(value, this.getChildControl("list").getSelection(value));
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Helper method to select the current preselected item, also closes the
       * drop-down.
       */
      __P_327_6: function __P_327_6() {
        if (this._preselected != null) {
          var selection = this.getSelection();
          selection.splice(0, 1, this._preselected);
          this._preselected = null;
          this.close();
        }
      },

      /**
       * Helper method to synchronize both selection. The target selection has
       * the same selection like the source selection after the synchronization.
       *
       * @param source {qx.data.Array} The source selection.
       * @param target {qx.data.Array} The target selection.
       */
      __P_327_5: function __P_327_5(source, target) {
        if (source.equals(target)) {
          return;
        }

        if (source.getLength() <= 0) {
          target.removeAll();
        } else {
          // build arguments array for splice(0, target.length, source[0], source[1], ...)
          var spliceArg = [0, target.length];
          spliceArg = spliceArg.concat(source.toArray()); // use apply since it allow to use an array as the argument array
          // (calling splice directly with an array insert it in the array on which splice is called)
          // don't forget to dispose the array created by splice

          target.splice.apply(target, spliceArg).dispose();
        }
      },

      /**
       * Adjust the drop-down to the available width and height, by calling
       * {@link #_adjustWidth} and {@link #_adjustHeight}.
       */
      _adjustSize: function _adjustSize() {
        if (!this._target.getBounds()) {
          this.addListenerOnce("appear", this._adjustSize, this);
          return;
        }

        this._adjustWidth();

        this._adjustHeight();
      },

      /**
       * Adjust the drop-down to the available width. The width is limited by
       * the current width from the _target, unless allowGrowDropDown is true.
       */
      _adjustWidth: function _adjustWidth() {
        var width = this._target.getBounds().width;

        var uiList = this.getChildControl('list');

        if (this.getAllowGrowDropDown()) {
          // Let the drop-down handle its own width.
          this.setWidth(null);

          if (this.__P_327_4 > 0) {
            uiList.setWidth(this.__P_327_4);
          } else {
            uiList.setWidth(width);
          }
        } else {
          // Make the drop-down as wide as the virtual-box that it is owned by.
          this.setWidth(width);
          uiList.resetWidth();
        }
      },

      /**
       * Adjust the drop-down to the available height. Ensure that the list
       * is never bigger that the max list height and the available space
       * in the viewport.
       */
      _adjustHeight: function _adjustHeight() {
        var availableHeight = this._getAvailableHeight();

        if (availableHeight === null) {
          return;
        }

        var maxHeight = this._target.getMaxListHeight();

        var list = this.getChildControl("list");
        var itemsHeight = list.getPane().getRowConfig().getTotalSize();

        if (maxHeight == null || itemsHeight < maxHeight) {
          maxHeight = itemsHeight;
        }

        if (maxHeight > availableHeight) {
          maxHeight = availableHeight;
        }

        var minHeight = list.getMinHeight();

        if (null !== minHeight && minHeight > maxHeight) {
          maxHeight = minHeight;
        }

        list.setMaxHeight(maxHeight);
      },

      /**
       * Calculates the available height in the viewport.
       *
       * @return {Integer|null} Available height in the viewport.
       */
      _getAvailableHeight: function _getAvailableHeight() {
        var distance = this.getLayoutLocation(this._target);

        if (!distance) {
          return null;
        }

        var viewPortHeight = qx.bom.Viewport.getHeight(); // distance to the bottom and top borders of the viewport

        var toTop = distance.top;
        var toBottom = viewPortHeight - distance.bottom;
        return toTop > toBottom ? toTop : toBottom;
      },

      /**
       * Loop over all model items to recalculate the maximum list item width.
       *
       * @protected
       */
      _recalculateMaxListItemWidth: function _recalculateMaxListItemWidth() {
        var maxWidth = 0;
        var list = this.getChildControl("list");
        var model = list.getModel();

        if (model && model.length) {
          var createWidget = qx.util.Delegate.getMethod(list.getDelegate(), "createItem");

          if (!createWidget) {
            createWidget = function createWidget() {
              return new qx.ui.form.ListItem();
            };
          }

          var tempListItem = createWidget(); // Make sure the widget has the correct padding properties.

          tempListItem.syncAppearance();
          var styles;
          var font = tempListItem.getFont();

          if (font) {
            styles = qx.theme.manager.Font.getInstance().resolve(font).getStyles();
          }

          if (!styles) {
            styles = qx.bom.Font.getDefaultStyles();
          }

          var paddingX = list.getPaddingLeft() + list.getPaddingRight() + tempListItem.getPaddingLeft() + tempListItem.getPaddingRight() + tempListItem.getMarginLeft() + tempListItem.getMarginRight();
          var label = tempListItem.getChildControl('label');

          if (label) {
            // Make sure the widget has the correct padding properties.
            label.syncAppearance();
            paddingX += label.getPaddingLeft() + label.getPaddingRight() + label.getMarginLeft() + label.getMarginRight();
          }

          model.forEach(function (item) {
            var width = 0;
            var content;

            if (typeof item === "string") {
              content = item;
            } else if (_typeof(item) === "object" && item !== null) {
              content = item.get(list.getLabelPath());
            }

            if (content) {
              width = qx.bom.Label.getHtmlSize(content, styles, undefined).width + paddingX;

              if (width > maxWidth) {
                maxWidth = width;
              }
            }
          });
          tempListItem.dispose();
        }

        this.__P_327_4 = maxWidth;
      },

      /**
       * Get the cached maximum list item width.
       *
       * @return {Number}
       * @protected
       */
      _getMaxListItemWidth: function _getMaxListItemWidth() {
        return this.__P_327_4;
      }
    },
    destruct: function destruct() {
      if (this.__P_327_1) {
        this.__P_327_1.dispose();
      }
    }
  });
  qx.ui.form.core.VirtualDropDownList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualDropDownList.js.map?dt=1642804684309