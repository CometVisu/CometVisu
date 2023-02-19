(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Input": {
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Registration": {
        "construct": true
      }
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
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  /**
   * The mixin contains all functionality to provide a value property for input
   * widgets.
   *
   * @require(qx.event.handler.Input)
   */
  qx.Mixin.define("qx.ui.mobile.form.MValue", {
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    /**
     * @param value {var?null} The value of the widget.
     */
    construct: function construct(value) {
      if (value) {
        this.setValue(value);
      }
      if (this._getTagName() == "input" || this._getTagName() == "textarea") {
        qx.event.Registration.addListener(this.getContentElement(), "change", this._onChangeContent, this);
        qx.event.Registration.addListener(this.getContentElement(), "input", this._onInput, this);
      }
      this.addListener("focus", this._onFocus, this);
      this.addListener("blur", this._onBlur, this);
    },
    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */

    events: {
      /**
       * The event is fired on every keystroke modifying the value of the field.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current value of the text field.
       */
      input: "qx.event.type.Data",
      /**
       * The event is fired each time the text field looses focus and the
       * text field values has changed.
       *
       * If you change {@link #liveUpdate} to true, the changeValue event will
       * be fired after every keystroke and not only after every focus loss. In
       * that mode, the changeValue event is equal to the {@link #input} event.
       *
       * The method {@link qx.event.type.Data#getData} returns the
       * current text value of the field.
       */
      changeValue: "qx.event.type.Data"
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /**
       * Whether the {@link #changeValue} event should be fired on every key
       * input. If set to true, the changeValue event is equal to the
       * {@link #input} event.
       */
      liveUpdate: {
        check: "Boolean",
        init: false
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_401_0: null,
      __P_401_1: null,
      __P_401_2: null,
      /**
       * Converts the incoming value.
       *
       * @param value {var} The value to convert
       * @return {var} The converted value
       */
      _convertValue: function _convertValue(value) {
        if (typeof value === "boolean") {
          return value;
        } else if (typeof value === "number") {
          return value;
        } else {
          return value || "";
        }
      },
      /**
       * Handler for <code>focus</code> event.
       */
      _onFocus: function _onFocus() {
        this.__P_401_2 = true;
      },
      /**
       * Handler for <code>blur</code> event.
       */
      _onBlur: function _onBlur() {
        this.__P_401_2 = false;
      },
      /**
       * Returns whether this widget has focus or not.
       * @return {Boolean} <code>true</code> or <code>false</code>
       */
      hasFocus: function hasFocus() {
        return this.__P_401_2;
      },
      /**
       * Sets the value.
       *
       * @param value {var} The value to set
       */
      setValue: function setValue(value) {
        value = this._convertValue(value);
        if (this.__P_401_0 != value) {
          if (this._setValue) {
            this._setValue(value);
          } else {
            this._setAttribute("value", value);
          }
          this.__P_401_3(value);
        }
      },
      /**
       * Returns the set value.
       *
       * @return {var} The set value
       */
      getValue: function getValue() {
        return this._convertValue(this._getValue ? this._getValue() : this._getAttribute("value"));
      },
      /**
       * Resets the value.
       */
      resetValue: function resetValue() {
        this.setValue(null);
      },
      /**
       * Event handler. Called when the {@link #changeValue} event occurs.
       *
       * @param evt {qx.event.type.Data} The event, containing the changed content.
       */
      _onChangeContent: function _onChangeContent(evt) {
        this.__P_401_3(this._convertValue(evt.getData()));
      },
      /**
       * Event handler. Called when the {@link #input} event occurs.
       *
       * @param evt {qx.event.type.Data} The event, containing the changed content.
       */
      _onInput: function _onInput(evt) {
        var data = evt.getData();
        this.fireDataEvent("input", data, true);
        if (this.getLiveUpdate()) {
          if (this._setValue) {
            this._setValue(data);
          } else {
            this.__P_401_3(this._convertValue(data));
          }
        }
      },
      /**
       * Returns the caret position of this widget.
       * @return {Integer} the caret position.
       */
      _getCaretPosition: function _getCaretPosition() {
        var val = this.getContentElement().value;
        if (val && this._getAttribute("type") !== "number") {
          return val.slice(0, this.getContentElement().selectionStart).length;
        } else {
          return val.length;
        }
      },
      /**
       * Sets the caret position on this widget.
       * @param position {Integer} the caret position.
       */
      _setCaretPosition: function _setCaretPosition(position) {
        if (position != null && this.hasFocus()) {
          if (this._getAttribute("type") !== "number" && this.getContentElement().setSelectionRange) {
            this.getContentElement().setSelectionRange(position, position);
          }
        }
      },
      /**
       * Fires the {@link #changeValue} event.
       *
       * @param value {var} The current value to fire.
       */
      __P_401_3: function __P_401_3(value) {
        if (this.__P_401_0 != value) {
          this.__P_401_0 = value;
          this.fireDataEvent("changeValue", value);
        }
      }
    },
    destruct: function destruct() {
      this.removeListener("focus", this._onFocus, this);
      this.removeListener("blur", this._onBlur, this);
    }
  });
  qx.ui.mobile.form.MValue.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MValue.js.map?dt=1676809326349