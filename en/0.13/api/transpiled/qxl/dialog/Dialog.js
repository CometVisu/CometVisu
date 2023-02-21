function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.Window": {
        "construct": true,
        "require": true
      },
      "qxl.dialog.MDialog": {
        "require": true
      },
      "qxl.dialog.Alert": {},
      "qxl.dialog.Confirm": {},
      "qxl.dialog.Prompt": {},
      "qx.core.Init": {
        "construct": true
      },
      "qxl.dialog.Select": {},
      "qx.core.Assert": {},
      "qxl.dialog.Form": {},
      "qxl.dialog.MForm": {
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.ui.core.Blocker": {
        "construct": true
      },
      "qx.ui.core.FocusHandler": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2007-2020 Christian Boulanger and others
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       *  Christian Boulanger (cboulanger)
       *  Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Base class for dialog widgets
   * @ignore(qxl.dialog.alert)
   * @ignore(qxl.dialog.error)
   * @ignore(qxl.dialog.warning)
   * @ignore(qxl.dialog.confirm)
   * @ignore(qxl.dialog.prompt)
   * @ignore(qxl.dialog.form)
   * @ignore(qxl.dialog.select)
   * @ignore(Promise)
   *
   */
  qx.Class.define("qxl.dialog.Dialog", {
    extend: qx.ui.window.Window,
    include: [qxl.dialog.MDialog],
    statics: {
      /**
       * for backwards-compability
       * @type {Boolean}
       */
      __P_544_0: false,
      /**
       * Enforce the use of a coloured blocker.
       * Added for backwards-compability with pre-1.2 versions
       * @param  value {Boolean}
       * @return {void}
       */
      useBlocker: function useBlocker(value) {
        qxl.dialog.Dialog.__P_544_0 = value;
      },
      /**
       * Returns a dialog instance by type
       * @param type {String} The dialog type to get
       * @return {qxl.dialog.Dialog}
       */
      getInstanceByType: qxl.dialog.MDialog.getInstanceByType,
      /**
       * Shortcut for alert dialog
       * @param message {String} The message to display
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Alert} The widget instance
       */
      alert: function alert() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var caption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        return new qxl.dialog.Alert({
          message: message,
          callback: callback,
          context: context,
          caption: caption,
          image: "qxl.dialog.icon.info"
        }).show();
      },
      /**
       * Shortcut for error dialog
       * @param message {String} The message to display
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Alert} The widget instance
       */
      error: function error() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var caption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        return new qxl.dialog.Alert({
          message: message,
          callback: callback,
          context: context,
          caption: caption,
          image: "qxl.dialog.icon.error"
        }).show();
      },
      /**
       * Shortcut for warning dialog
       * @param message {String} The message to display
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Alert} The widget instance
       */
      warning: function warning() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var caption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        return new qxl.dialog.Alert({
          message: message,
          callback: callback,
          context: context,
          caption: caption,
          image: "qxl.dialog.icon.warning"
        }).show();
      },
      /**
       * Shortcut for confirm dialog
       * @param message {String} The message to display
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Confirm} The widget instance
       */
      confirm: function confirm() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var caption = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        return new qxl.dialog.Confirm({
          message: message,
          callback: callback,
          context: context,
          caption: caption
        }).show();
      },
      /**
       * Shortcut for prompt dialog
       * @param message {String} The message to display
       * @param callback {Function} The callback function
       * @param context {Object} The context to use with the callback function
       * @param value {String} The default value of the prompt textfield
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Prompt} The widget instance
       *
       */
      prompt: function prompt() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
        var caption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        return new qxl.dialog.Prompt({
          message: message,
          callback: callback,
          context: context,
          value: value,
          caption: caption
        }).show();
      },
      /**
       * Shortcut for select dialog
       * @param message {String} The message to display
       * @param options {Array?} Options to select from. If omitted, "Yes" (true) or "No" (false) will be used.
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param allowCancel {Boolean?} Default: true. If the cancel button is pressed, the result value will be undefined.
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Select} The widget instance
       */
      select: function select() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var allowCancel = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var caption = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
        var defaultOptions = [{
          label: qx.core.Init.getApplication().tr("Yes"),
          value: true
        }, {
          label: qx.core.Init.getApplication().tr("No"),
          value: false
        }];
        return new qxl.dialog.Select({
          message: message,
          allowCancel: allowCancel,
          options: options || defaultOptions,
          callback: callback,
          context: context,
          caption: caption
        }).show();
      },
      /**
       * Shortcut for form dialog. Cannot be reused.
       * @param message {String} The message to display
       * @param formData {Map} Map of form data. See {@link qxl.dialog.Form.formData}
       * @param callback {Function?} The callback function
       * @param context {Object?} The context to use with the callback function
       * @param caption {String?} The caption of the dialog window
       * @return {qxl.dialog.Form} The widget instance
       */
      form: function form(message, formData) {
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var caption = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
        qx.core.Assert.assertMap(formData);
        return new qxl.dialog.Form({
          message: message,
          formData: formData,
          allowCancel: true,
          callback: callback,
          context: context,
          caption: caption
        }).show();
      },
      // ease use for form element writers
      registerFormElementHandlers: qxl.dialog.MForm.registerFormElementHandlers
    },
    /**
     * Constructor
     * @param properties {Map|String|undefined} If you supply a map, all the
     * corresponding properties will be set. If a string is given, use it
     * as to set the 'message' property.
     */
    construct: function construct(properties) {
      qx.ui.window.Window.constructor.call(this);
      this.set({
        visibility: "hidden",
        allowClose: false,
        allowMaximize: false,
        allowMinimize: false,
        alwaysOnTop: true,
        modal: true,
        movable: false,
        resizable: false,
        showClose: false,
        showMaximize: false,
        showMinimize: false,
        showStatusbar: false
      });
      this.setLayout(new qx.ui.layout.Grow());
      var root = qx.core.Init.getApplication().getRoot();
      root.add(this);
      // use blocker (for backwards-compability)
      this.__P_544_1 = new qx.ui.core.Blocker(root);
      this.__P_544_1.setOpacity(this.getBlockerOpacity());
      this.__P_544_1.setColor(this.getBlockerColor());
      // handle focus
      qx.ui.core.FocusHandler.getInstance().addRoot(this);
      // resize the window when viewport size changes
      this.addListener("resize", this.center, this);
      root.addListener("resize", this.center, this);
      this._createWidgetContent(properties);
      // set properties from constructor param
      if (_typeof(properties) == "object") {
        this.set(properties);
      } else if (typeof properties == "string") {
        this.setMessage(properties);
      }
      // escape key
      root.addListener("keyup", this._handleEscape, this);
    },
    properties: {
      /**
       * Whether the dialog is shown. If true, call the show() method. If false,
       * call the hide() method.
       */
      show: {
        check: "Boolean",
        nullable: true,
        event: "changeShow",
        apply: "_applyShow"
      },
      /**
       * Whether to block the ui while the widget is displayed
       */
      useBlocker: {
        check: "Boolean",
        init: false
      },
      /**
       * The blocker's color
       */
      blockerColor: {
        check: "String",
        init: "black"
      },
      /**
       * The blocker's opacity
       */
      blockerOpacity: {
        check: "Number",
        init: 0.5
      }
    },
    members: {
      /**
       * A reference to the widget that previously had the focus
       */
      __P_544_2: null,
      /**
       * Show the widget. Overriding methods must call this parent method.
       * Returns the widget instance for chaining.
       * @return {this} The widget instance
       */
      show: function show() {
        if (this.isUseBlocker() || qxl.dialog.Dialog.__P_544_0) {
          // make sure the dialog is above any opened window
          var root = qx.core.Init.getApplication().getRoot();
          var maxWindowZIndex = root.getZIndex();
          var windows = root.getWindows();
          for (var i = 0; i < windows.length; i++) {
            var zIndex = windows[i].getZIndex();
            maxWindowZIndex = Math.max(maxWindowZIndex, zIndex);
          }
          this.setZIndex(maxWindowZIndex + 1);
          this.__P_544_1.blockContent(maxWindowZIndex);
        }
        this.setVisibility("visible");
        this.__P_544_2 = qx.ui.core.FocusHandler.getInstance().getActiveWidget();
        if (this.__P_544_2) {
          try {
            this.__P_544_2.blur();
          } catch (e) {}
          //this.__previousFocus.setFocusable(false);
        }

        return this;
      },
      /**
       * Hide the widget. Overriding methods must call this parent method.
       * Returns the widget instance for chaining.
       * @return {qxl.dialog.Dialog} The widget instance
       */
      hide: function hide() {
        if (this.isUseBlocker() || qxl.dialog.Dialog.__P_544_0) {
          this.__P_544_1.unblock();
        }
        if (this.__P_544_2) {
          try {
            //this.__previousFocus.setFocusable(true);
            this.__P_544_2.focus();
          } catch (e) {}
        }
        this.setVisibility("hidden");
        return this;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      var root = qx.core.Init.getApplication().getRoot();
      root.removeListener("resize", this.center, this);
      root.removeListener("keyup", this._handleEscape, this);
    }
  });
  qxl.dialog.Dialog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dialog.js.map?dt=1677017733059