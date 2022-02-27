(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.form.MValue": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      },
      "qx.ui.mobile.form.MState": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.mobile.container.Composite": {}
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
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * A toggle Button widget
   *
   * If the user tap the button, the button toggles between the <code>ON</code>
   * and <code>OFF</code> state.
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var button = new qx.ui.mobile.form.ToggleButton(false,"YES","NO");
   *
   *   button.addListener("changeValue", function(e) {
   *     alert(e.getData());
   *   }, this);
   *
   *   this.getRoot.add(button);
   * </pre>
   *
   * This example creates a toggle button and attaches an
   * event listener to the {@link #changeValue} event.
   */
  qx.Class.define("qx.ui.mobile.form.ToggleButton", {
    extend: qx.ui.mobile.core.Widget,
    include: [qx.ui.mobile.form.MValue, qx.ui.form.MForm, qx.ui.form.MModelProperty, qx.ui.mobile.form.MState],
    implement: [qx.ui.form.IField, qx.ui.form.IForm, qx.ui.form.IModel],

    /**
     * @param value {Boolean?null} The value of the button
     * @param labelChecked {Boolean?"ON"} The value of the text display when toggleButton is active
     * @param labelUnchecked {Boolean?"OFF"} The value of the text display when toggleButton is inactive
     */
    construct: function construct(value, labelChecked, labelUnchecked) {
      qx.ui.mobile.core.Widget.constructor.call(this);

      if (labelChecked && labelUnchecked) {
        this.__P_367_0 = labelUnchecked;
        this.__P_367_1 = labelChecked;
      }

      this._setAttribute("data-label-checked", this.__P_367_1);

      this._setAttribute("data-label-unchecked", this.__P_367_0);

      this.__P_367_2 = this._createSwitch();

      this._add(this.__P_367_2);

      if (value) {
        this.setValue(value);
      }

      this.addListener("tap", this._onTap, this);
      this.addListener("swipe", this._onSwipe, this);
      this.addCssClass("gap");
    },
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "togglebutton"
      }
    },
    members: {
      __P_367_2: null,
      __P_367_3: false,
      __P_367_0: "OFF",
      __P_367_1: "ON",
      __P_367_4: 0,

      /**
       * Returns the child control of the toggle button.
       *
       * @return {qx.ui.mobile.container.Composite} the child control.
       */
      _getChild: function _getChild() {
        return this.__P_367_2;
      },

      /**
       * Creates the switch control of the widget.
       * @return {qx.ui.mobile.container.Composite} The switch control.
       */
      _createSwitch: function _createSwitch() {
        var toggleButtonSwitch = new qx.ui.mobile.container.Composite();
        toggleButtonSwitch.addCssClass("togglebutton-switch");
        return toggleButtonSwitch;
      },

      /**
       * Sets the value [true/false] of this toggle button.
       * It is called by setValue method of qx.ui.mobile.form.MValue mixin
       * @param value {Boolean} the new value of the toggle button
       */
      _setValue: function _setValue(value) {
        if (typeof value !== 'boolean') {
          throw new Error("value for " + this + " should be boolean");
        }

        if (value) {
          this.addCssClass("checked");
        } else {
          this.removeCssClass("checked");
        }

        this.__P_367_3 = value;
      },

      /**
       * Gets the value [true/false] of this toggle button.
       * It is called by getValue method of qx.ui.mobile.form.MValue mixin
       * @return {Boolean} the value of the toggle button
       */
      _getValue: function _getValue() {
        return this.__P_367_3;
      },

      /**
       * Toggles the value of the button.
       */
      toggle: function toggle() {
        this.setValue(!this.getValue());
      },

      /**
       * Event handler. Called when the tap event occurs.
       * Toggles the button.
       *
       * @param evt {qx.event.type.Tap} The tap event.
       */
      _onTap: function _onTap(evt) {
        if (this._checkLastPointerTime()) {
          this.toggle();
        }
      },

      /**
       * Event handler. Called when the swipe event occurs.
       * Toggles the button, when.
       *
       * @param evt {qx.event.type.Swipe} The swipe event.
       */
      _onSwipe: function _onSwipe(evt) {
        if (this._checkLastPointerTime()) {
          var direction = evt.getDirection();

          if (direction == "left") {
            if (this.__P_367_3 == true) {
              this.toggle();
            }
          } else {
            if (this.__P_367_3 == false) {
              this.toggle();
            }
          }
        }
      },

      /**
       * Checks if last touch event (swipe,tap) is more than 500ms ago.
       * Bugfix for several simulator/emulator, when tap is immediately followed by a swipe.
       * @return {Boolean} <code>true</code> if the last event was more than 500ms ago
       */
      _checkLastPointerTime: function _checkLastPointerTime() {
        var elapsedTime = new Date().getTime() - this.__P_367_4;

        this.__P_367_4 = new Date().getTime();
        return elapsedTime > 500;
      }
    },
    destruct: function destruct() {
      this.removeListener("tap", this._onTap, this);
      this.removeListener("swipe", this._onSwipe, this);

      this._disposeObjects("__P_367_2", "__P_367_0", "__P_367_1");
    }
  });
  qx.ui.mobile.form.ToggleButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToggleButton.js.map?dt=1645980672971