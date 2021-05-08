(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.core.AbstractVirtualBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      },
      "qx.event.type.Focus": {
        "construct": true
      },
      "qx.ui.form.TextField": {},
      "qx.ui.form.Button": {},
      "qx.data.SingleValueBinding": {},
      "qx.lang.Type": {},
      "qx.util.Delegate": {},
      "qx.lang.String": {}
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
       * Daniel Wagner (d_wagner)
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */

  /**
   * A virtual form widget that allows text entry as well as selection from a
   * drop-down.
   *
   * @childControl textfield {qx.ui.form.TextField} Field for text entry.
   * @childControl button {qx.ui.form.Button} Opens the drop-down.
   */
  qx.Class.define("qx.ui.form.VirtualComboBox", {
    extend: qx.ui.form.core.AbstractVirtualBox,
    implement: [qx.ui.form.IStringForm],
    construct: function construct(model) {
      qx.ui.form.core.AbstractVirtualBox.constructor.call(this, model);

      var textField = this._createChildControl("textfield");

      this._createChildControl("button");

      var dropdown = this.getChildControl("dropdown");
      dropdown.getChildControl("list").setSelectionMode("single");
      this.__P_167_0 = dropdown.getSelection();

      this.__P_167_0.addListener("change", this.__P_167_1, this);

      this.bind("value", textField, "value");
      textField.bind("value", this, "value"); // forward the focusin and focusout events to the textfield. The textfield
      // is not focusable so the events need to be forwarded manually.

      this.addListener("focusin", function (e) {
        textField.fireNonBubblingEvent("focusin", qx.event.type.Focus);
      }, this);
      this.addListener("focusout", function (e) {
        textField.fireNonBubblingEvent("focusout", qx.event.type.Focus);
        this.fireNonBubblingEvent("blur", qx.event.type.Focus);
      }, this);
    },
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "virtual-combobox"
      },
      // overridden
      width: {
        refine: true,
        init: 120
      },

      /**
       * The currently selected or entered value.
       */
      value: {
        nullable: true,
        event: "changeValue"
      },

      /**
       * String value which will be shown as a hint if the field is all of:
       * unset, unfocused and enabled. Set to null to not show a placeholder
       * text.
       */
      placeholder: {
        check: "String",
        nullable: true,
        apply: "_applyPlaceholder"
      },

      /**
       * Formatting function that will be applied to the value of a selected model
       * item's label before it is written to the text field. Also used to find
       * and preselect the first list entry that begins with the current content
       * of the text field when the drop-down list is opened. Can be used e.g. to
       * strip HTML tags from rich-formatted item labels. The function will be
       * called with the item's label (String) as the only parameter.
       */
      defaultFormat: {
        check: "Function",
        init: null,
        nullable: true
      }
    },
    members: {
      /** @type {var} Binding id between local value and text field value. */
      __P_167_2: null,

      /** @type {var} Binding id between text field value and local value. */
      __P_167_3: null,

      /** @type {qx.data.Array} the drop-down selection. */
      __P_167_0: null,

      /** @type {Boolean} Indicator to ignore selection changes from the list. */
      __P_167_4: null,

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Returns the current selection. This method only works if the widget is
       * already created and added to the document.
       *
       * @return {String|null} The current text selection.
       */
      getTextSelection: function getTextSelection() {
        return this.getChildControl("textfield").getTextSelection();
      },

      /**
       * Returns the current selection length. This method only works if the
       * widget is already created and added to the document.
       *
       * @return {Integer|null} The current text selection length.
       */
      getTextSelectionLength: function getTextSelectionLength() {
        return this.getChildControl("textfield").getTextSelectionLength();
      },

      /**
       * Set the selection to the given start and end (zero-based). If no end
       * value is given the selection will extend to the end of the textfield's
       * content. This method only works if the widget is already created and
       * added to the document.
       *
       * @param start {Integer} Start of the selection (zero-based).
       * @param end {Integer} End of the selection.
       */
      setTextSelection: function setTextSelection(start, end) {
        this.getChildControl("textfield").setTextSelection(start, end);
      },

      /**
       * Clears the current selection. This method only works if the widget is
       * already created and added to the document.
       */
      clearTextSelection: function clearTextSelection() {
        this.getChildControl("textfield").clearTextSelection();
      },

      /**
       * Selects the whole content.
       */
      selectAllText: function selectAllText() {
        this.getChildControl("textfield").selectAllText();
      },

      /**
       * Clear any text selection, then select all text.
       */
      resetAllTextSelection: function resetAllTextSelection() {
        this.clearTextSelection();
        this.selectAllText();
      },
      // overridden
      tabFocus: function tabFocus() {
        var field = this.getChildControl("textfield");
        field.getFocusElement().focus();
        field.selectAllText();
      },
      // overridden
      focus: function focus() {
        qx.ui.form.VirtualComboBox.prototype.focus.base.call(this);
        this.getChildControl("textfield").getFocusElement().focus();
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
          case "textfield":
            control = new qx.ui.form.TextField();
            control.setFocusable(false);
            control.addState("inner");

            this._add(control, {
              flex: 1
            });

            break;

          case "button":
            control = new qx.ui.form.Button();
            control.setFocusable(false);
            control.setKeepActive(true);
            control.addState("inner");
            control.addListener("execute", this.toggle, this);

            this._add(control);

            break;
        }

        return control || qx.ui.form.VirtualComboBox.prototype._createChildControlImpl.base.call(this, id, hash);
      },
      // overridden
      _beforeOpen: function _beforeOpen() {
        this.__P_167_5();
      },
      // overridden
      _handleKeyboard: function _handleKeyboard(event) {
        var action = this._getAction(event);

        switch (action) {
          case "select":
            this.setValue(this.getChildControl("textfield").getValue());
            break;

          default:
            qx.ui.form.VirtualComboBox.prototype._handleKeyboard.base.call(this, event);

            break;
        }
      },
      // overridden
      _getAction: function _getAction(event) {
        var keyIdentifier = event.getKeyIdentifier();
        var isOpen = this.getChildControl("dropdown").isVisible();

        var isModifierPressed = this._isModifierPressed(event);

        if (!isOpen && !isModifierPressed && keyIdentifier === "Enter") {
          return "select";
        } else {
          return qx.ui.form.VirtualComboBox.prototype._getAction.base.call(this, event);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT LISTENERS
      ---------------------------------------------------------------------------
      */
      // overridden
      _handlePointer: function _handlePointer(event) {
        qx.ui.form.VirtualComboBox.prototype._handlePointer.base.call(this, event);

        var type = event.getType();

        if (type !== "tap") {
          return;
        }

        this.close();
      },

      /**
       * Handler to synchronize selection changes with the value property.
       *
       * @param event {qx.event.type.Data} The change event from the qx.data.Array.
       */
      __P_167_1: function __P_167_1(event) {
        if (this.__P_167_4 == true) {
          return;
        }

        var selected = this.__P_167_0.getItem(0);

        if (selected) {
          selected = this.__P_167_6(selected);
          this.setValue(selected);
        }
      },

      /*
      ---------------------------------------------------------------------------
        APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyPlaceholder: function _applyPlaceholder(value, old) {
        this.getChildControl("textfield").setPlaceholder(value);
      },

      /*
      ---------------------------------------------------------------------------
        HELPER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Selects the first list item that starts with the text field's value.
       */
      __P_167_5: function __P_167_5() {
        var value = this.getValue();
        var dropdown = this.getChildControl("dropdown");
        var selection = dropdown.getSelection();
        var selected = selection.getItem(0); // try to preselect the matching item even if there is no current selection

        if (selected === undefined || this.__P_167_6(selected) !== value) {
          // only reset the old selection if there is one
          if (selected !== undefined) {
            // reset the old selection
            this.__P_167_4 = true;
            selection.removeAll();
            this.__P_167_4 = false;
          } // No calculation is needed when the value is empty


          if (value == null || value == "") {
            return;
          }

          var model = this.getModel();

          var lookupTable = dropdown.getChildControl("list")._getLookupTable();

          for (var i = 0, l = lookupTable.length; i < l; i++) {
            var modelItem = model.getItem(lookupTable[i]);

            var itemLabel = this.__P_167_6(modelItem);

            if (itemLabel && itemLabel.indexOf(value) == 0) {
              dropdown.setPreselected(modelItem);
              break;
            }
          }
        }
      },

      /**
       * Helper method to convert the model item to a String.
       *
       * @param modelItem {var} The model item to convert.
       * @return {String} The converted value.
       */
      __P_167_6: function __P_167_6(modelItem) {
        var labelOptions = this.getLabelOptions();
        var formatter = this.getDefaultFormat();
        var labelPath = this.getLabelPath();
        var result = null;

        if (labelPath != null) {
          result = qx.data.SingleValueBinding.resolvePropertyChain(modelItem, labelPath);
        } else if (qx.lang.Type.isString(modelItem)) {
          result = modelItem;
        }

        var converter = qx.util.Delegate.getMethod(labelOptions, "converter");

        if (converter != null) {
          result = converter(result);
        }

        if (result != null && formatter != null) {
          result = formatter(qx.lang.String.stripTags(result));
        }

        return result;
      }
    },
    destruct: function destruct() {
      var textField = this.getChildControl("textfield");
      this.removeAllBindings();
      textField.removeAllBindings();

      this.__P_167_0.removeListener("change", this.__P_167_1, this);

      this.__P_167_0 = null;
    }
  });
  qx.ui.form.VirtualComboBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualComboBox.js.map?dt=1620513285221