(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.form.renderer.AbstractRenderer": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.form.ToggleButton": {
        "require": true
      },
      "qx.ui.mobile.form.RadioButton": {
        "require": true
      },
      "qx.ui.mobile.form.TextField": {
        "require": true
      },
      "qx.ui.mobile.form.PasswordField": {
        "require": true
      },
      "qx.ui.mobile.form.NumberField": {
        "require": true
      },
      "qx.ui.mobile.form.CheckBox": {
        "require": true
      },
      "qx.ui.mobile.form.SelectBox": {
        "require": true
      },
      "qx.ui.mobile.form.TextArea": {},
      "qx.bom.client.Scroll": {
        "require": true
      },
      "qx.ui.mobile.layout.VBox": {},
      "qx.ui.mobile.layout.HBox": {},
      "qx.ui.mobile.container.Scroll": {},
      "qx.ui.mobile.form.Row": {},
      "qx.ui.mobile.form.Label": {},
      "qx.ui.mobile.basic.Label": {},
      "qx.dom.Element": {},
      "qx.bom.element.Class": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Gabriel Munteanu (gabios)
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Single renderer is a class used to render forms into a mobile page.
   * It displays a label above or next to each form element.
   *
   */
  qx.Class.define("qx.ui.mobile.form.renderer.Single", {
    extend: qx.ui.mobile.form.renderer.AbstractRenderer,
    construct: function construct(form) {
      this.__P_368_0 = [];
      this._rows = [];
      this._labels = [];
      qx.ui.mobile.form.renderer.AbstractRenderer.constructor.call(this, form);
      this.addCssClass("single");
    },
    statics: {
      /** @type {Array} qx.Mobile form widgets which are rendered in one single line. */
      ONE_LINE_WIDGETS: [qx.ui.mobile.form.ToggleButton, qx.ui.mobile.form.RadioButton, qx.ui.mobile.form.TextField, qx.ui.mobile.form.PasswordField, qx.ui.mobile.form.NumberField, qx.ui.mobile.form.CheckBox, qx.ui.mobile.form.SelectBox]
    },
    members: {
      _rows: null,
      _labels: null,
      _onFormChange: function _onFormChange() {
        this._disposeArray("_labels");

        this._disposeArray("_rows");

        this._rows = [];
        this._labels = [];

        qx.ui.mobile.form.renderer.Single.prototype._onFormChange.base.call(this);
      },

      /**
       * A collection of error containers used to keep the error messages
       * resulted after form validation.
       * Also useful to clear them when the validation passes.
       */
      __P_368_0: null,
      // override
      _getTagName: function _getTagName() {
        return "ul";
      },

      /**
      * Determines whether the given item can be display in one line
      * or whether a separate line for the text label is needed.
      * @param item {qx.ui.mobile.core.Widget} the widget which should be added.
      * @return {Boolean} it indicates whether the widget can be displayed
      *  in same line as the label.
      */
      _isOneLineWidget: function _isOneLineWidget(item) {
        var widgets = qx.ui.mobile.form.renderer.Single.ONE_LINE_WIDGETS;

        for (var i = 0; i < widgets.length; i++) {
          var widget = widgets[i];

          if (item instanceof widget) {
            return true;
          }
        }

        return false;
      },
      // override
      addItems: function addItems(items, names, title) {
        if (title !== null) {
          this._addGroupHeader(title);
        }

        this._addGroupHeaderRow();

        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i];
          var name = names[i];
          var isLastItem = i == items.length - 1;

          if (item instanceof qx.ui.mobile.form.TextArea) {
            if (qx.core.Environment.get("qx.mobile.nativescroll") == false) {
              this._addToScrollContainer(item, name);
            } else {
              this._addRow(item, name, new qx.ui.mobile.layout.VBox());
            }
          } else {
            if (this._isOneLineWidget(item)) {
              this._addRow(item, name, new qx.ui.mobile.layout.HBox());
            } else {
              this._addRow(item, name, new qx.ui.mobile.layout.VBox());
            }
          }

          if (!item.isValid()) {
            this.showErrorForItem(item);
          }

          if (!isLastItem) {
            this._addSeparationRow();
          }
        }

        this._addGroupFooterRow();
      },

      /**
       * Wraps the given item with a {@link qx.ui.mobile.container.Scroll scroll} container.
       * @param item {qx.ui.mobile.core.Widget} A form item to render.
       * @param name {String} A name for the form item.
       */
      _addToScrollContainer: function _addToScrollContainer(item, name) {
        var scrollContainer = new qx.ui.mobile.container.Scroll();
        scrollContainer.addCssClass("form-row-scroll");
        scrollContainer.add(item, {
          flex: 1
        });

        this._addRow(scrollContainer, name, new qx.ui.mobile.layout.VBox());
      },

      /**
      * Adds a label and its according widget in a row and applies the given layout.
      * @param item {qx.ui.mobile.core.Widget} A form item to render.
      * @param name {String} A name for the form item.
      * @param layout {qx.ui.mobile.layout.Abstract} layout of the rendered row.
      */
      _addRow: function _addRow(item, name, layout) {
        var row = new qx.ui.mobile.form.Row(layout);
        row.addCssClass("form-row-content");

        if (name !== null) {
          var label = new qx.ui.mobile.form.Label(name);
          label.setLabelFor(item.getId());
          row.add(label, {
            flex: 1
          });

          this._labels.push(label);
        }

        row.add(item);

        this._add(row);

        this._rows.push(row);
      },

      /**
       * Adds a separation line into the form.
       */
      _addSeparationRow: function _addSeparationRow() {
        var row = new qx.ui.mobile.form.Row();
        row.addCssClass("form-separation-row");

        this._add(row);

        this._rows.push(row);
      },

      /**
       * Adds an row group header.
       */
      _addGroupHeaderRow: function _addGroupHeaderRow() {
        var row = new qx.ui.mobile.form.Row();
        row.addCssClass("form-row-group-first");

        this._add(row);

        this._rows.push(row);
      },

      /**
       * Adds an row group footer.
       */
      _addGroupFooterRow: function _addGroupFooterRow() {
        var row = new qx.ui.mobile.form.Row();
        row.addCssClass("form-row-group-last");

        this._add(row);

        this._rows.push(row);
      },

      /**
       * Adds a row with the name of a group of elements
       * When you want to group certain form elements, this methods implements
       * the way the header of that group is presented.
       * @param title {String} the title shown in the group header
       */
      _addGroupHeader: function _addGroupHeader(title) {
        var row = new qx.ui.mobile.form.Row();
        row.addCssClass("form-row-group-title");
        var titleLabel = new qx.ui.mobile.basic.Label(title);
        row.add(titleLabel);

        this._add(row);

        this._labels.push(titleLabel);

        this._rows.push(row);
      },
      // override
      addButton: function addButton(button) {
        var row = new qx.ui.mobile.form.Row(new qx.ui.mobile.layout.HBox());
        row.add(button, {
          flex: 1
        });

        this._add(row);

        this._rows.push(row);
      },
      // override
      showErrorForItem: function showErrorForItem(item) {
        var errorNode = qx.dom.Element.create('div');
        errorNode.innerHTML = item.getInvalidMessage();
        qx.bom.element.Class.add(errorNode, 'form-element-error');
        qx.dom.Element.insertAfter(errorNode, this._getParentRow(item).getContainerElement());

        this.__P_368_0.push(errorNode);
      },

      /**
       * Shows a single item of this form
       * @param item {qx.ui.form.IForm} form item which should be hidden.
       */
      showItem: function showItem(item) {
        this._getParentRow(item).removeCssClass("exclude");
      },

      /**
       * Hides a single item of this form
       * @param item {qx.ui.form.IForm} form item which should be hidden.
       */
      hideItem: function hideItem(item) {
        this._getParentRow(item).addCssClass("exclude");
      },

      /**
      * Returns the parent row of the item.
      *
      * @param item {qx.ui.form.IForm} the form item.
      * @return {qx.ui.mobile.core.Widget} the parent row.
      */
      _getParentRow: function _getParentRow(item) {
        var parent = item.getLayoutParent();

        while (!parent.hasCssClass("form-row")) {
          parent = parent.getLayoutParent();
        }

        return parent;
      },
      // override
      resetForm: function resetForm() {
        for (var i = 0; i < this.__P_368_0.length; i++) {
          qx.dom.Element.remove(this.__P_368_0[i]);
        }
      }
    },

    /*
     *****************************************************************************
        DESTRUCTOR
     *****************************************************************************
     */
    destruct: function destruct() {
      this.resetForm();

      this._disposeArray("_labels");

      this._disposeArray("_rows");
    }
  });
  qx.ui.mobile.form.renderer.Single.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Single.js.map?dt=1620144829670