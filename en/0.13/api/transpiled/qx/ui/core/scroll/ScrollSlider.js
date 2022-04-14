(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Slider": {
        "construct": true,
        "require": true
      }
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Minimal modified version of the {@link qx.ui.form.Slider} to be
   * used by {@link qx.ui.core.scroll.ScrollBar}.
   *
   * @internal
   */
  qx.Class.define("qx.ui.core.scroll.ScrollSlider", {
    extend: qx.ui.form.Slider,
    // overridden
    construct: function construct(orientation) {
      qx.ui.form.Slider.constructor.call(this, orientation); // Remove roll/keypress events

      this.removeListener("keypress", this._onKeyPress);
      this.removeListener("roll", this._onRoll);
    },
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case "knob":
            control = qx.ui.core.scroll.ScrollSlider.prototype._createChildControlImpl.base.call(this, id);
            control.addListener("dblclick", function (e) {
              e.stopPropagation();
            });
        }

        return control || qx.ui.core.scroll.ScrollSlider.prototype._createChildControlImpl.base.call(this, id);
      },
      // overridden
      getSizeHint: function getSizeHint(compute) {
        // get the original size hint
        var hint = qx.ui.core.scroll.ScrollSlider.prototype.getSizeHint.base.call(this); // set the width or height to 0 depending on the orientation.
        // this is necessary to prevent the ScrollSlider to change the size
        // hint of its parent, which can cause errors on outer flex layouts
        // [BUG #3279]

        if (this.getOrientation() === "horizontal") {
          hint.width = 0;
        } else {
          hint.height = 0;
        }

        return hint;
      }
    }
  });
  qx.ui.core.scroll.ScrollSlider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScrollSlider.js.map?dt=1649957687670