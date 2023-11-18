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
      "qxl.dialog.Dialog": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.TextField": {},
      "qx.lang.Function": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "module.objectid": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2007-2019 Christian Boulanger and others
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * Prompts the user with a question or request for information and a text
   * field in which the user can type something. Similar to window.prompt(),
   * but asyncronous
   */
  qx.Class.define("qxl.dialog.Prompt", {
    extend: qxl.dialog.Dialog,
    properties: {
      /**
       * The default value of the textfield
       * @type {String}
       */
      value: {
        check: "String",
        nullable: true,
        event: "changeValue"
      },
      /**
       * A placeholder text
       */
      placeholder: {
        check: "String",
        nullable: true,
        apply: "_applyPlaceholder"
      },
      /**
       * A regular expression used to determine valid input
       */
      filter: {
        check: "RegExp",
        nullable: true,
        apply: "_applyFilter"
      },
      /**
       * The maximum length of the input
       */
      maxLength: {
        check: "Integer",
        nullable: true,
        apply: "_applyMaxLength"
      }
    },
    members: {
      _textField: null,
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = new qx.ui.container.Composite();
        container.setLayout(new qx.ui.layout.VBox(10));
        this.add(container);
        var hbox = new qx.ui.container.Composite();
        hbox.setLayout(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setWidth(200);
        this._message.setAllowStretchX(true);
        hbox.add(this._message, {
          flex: 1
        });
        this._textField = new qx.ui.form.TextField();
        this.bind("value", this._textField, "value");
        this._textField.bind("value", this, "value");
        this._textField.addListener("appear", function (e) {
          qx.lang.Function.delay(this.focus, 1, this);
        }, this._textField);
        this._textField.addListener("keyup", function (e) {
          if (e.getKeyCode() === 13) {
            this._handleOk();
          } else if (e.getKeyCode() === 27) {
            this._handleCancel();
          }
        }, this);
        container.add(this._textField);
        this._textField.addListener("keypress", function (e) {
          if (e.getKeyIdentifier().toLowerCase() === "enter") {
            this.hide();
            this.fireEvent("ok");
            if (this.getCallback()) {
              this.getCallback().call(this.getContext(), this._textField.getValue());
            }
          }
        }, this);
        var buttonPane = this._createButtonPane();
        buttonPane.add(this._createOkButton());
        buttonPane.add(this._createCancelButton());
        container.add(buttonPane);
        // object id
        if (qx.core.Environment.get("module.objectid") === true) {
          this._textField.setQxObjectId("text");
          this.addOwnedQxObject(this._textField);
        }
      },
      /**
       * Applies the 'placeholder' property
       * @param value
       * @param old
       */
      _applyPlaceholder: function _applyPlaceholder(value, old) {
        this._textField.setPlaceholder(value);
      },
      /**
       * Applies the 'filter' property
       * @param value
       * @param old
       */
      _applyFilter: function _applyFilter(value, old) {
        this._textField.setFilter(value);
      },
      /**
       * Applies the 'maxLength' propery
       * @param value
       * @param old
       */
      _applyMaxLength: function _applyMaxLength(value, old) {
        this._textField.setMaxLength(value);
      },
      /**
       * Handle click on the OK button
       */
      _handleOk: function _handleOk() {
        this.hide();
        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), this.getValue());
        }
      }
    }
  });
  qxl.dialog.Prompt.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Prompt.js.map?dt=1700345616231