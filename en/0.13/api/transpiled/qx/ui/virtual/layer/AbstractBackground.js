(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.layer.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Color": {},
      "qx.theme.manager.Decoration": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Abstract base class for the {@link Row} and {@link Column} layers.
   */
  qx.Class.define("qx.ui.virtual.layer.AbstractBackground", {
    extend: qx.ui.virtual.layer.Abstract,
    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */
    /**
     * @param colorEven {Color?null} color for even indexes
     * @param colorOdd {Color?null} color for odd indexes
     */
    construct: function construct(colorEven, colorOdd) {
      qx.ui.virtual.layer.Abstract.constructor.call(this);
      if (colorEven) {
        this.setColorEven(colorEven);
      }
      if (colorOdd) {
        this.setColorOdd(colorOdd);
      }
      this.__P_480_0 = {};
      this.__P_480_1 = {};
    },
    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */

    properties: {
      /** color for event indexes */
      colorEven: {
        nullable: true,
        check: "Color",
        apply: "_applyColorEven",
        themeable: true
      },
      /** color for odd indexes */
      colorOdd: {
        nullable: true,
        check: "Color",
        apply: "_applyColorOdd",
        themeable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_480_2: null,
      __P_480_3: null,
      __P_480_0: null,
      __P_480_1: null,
      /*
      ---------------------------------------------------------------------------
        COLOR HANDLING
      ---------------------------------------------------------------------------
      */
      /**
       * Sets the color for the given index
       *
       * @param index {Integer} Index to set the color for
       * @param color {Color|null} the color to set. A value of <code>null</code>
       *    will reset the color.
       */
      setColor: function setColor(index, color) {
        if (color) {
          this.__P_480_0[index] = qx.theme.manager.Color.getInstance().resolve(color);
        } else {
          delete this.__P_480_0[index];
        }
      },
      /**
       * Clear all colors set using {@link #setColor}.
       */
      clearCustomColors: function clearCustomColors() {
        this.__P_480_0 = {};
        this.updateLayerData();
      },
      /**
       * Get the color at the given index
       *
       * @param index {Integer} The index to get the color for.
       * @return {Color} The color at the given index
       */
      getColor: function getColor(index) {
        var customColor = this.__P_480_0[index];
        if (customColor) {
          return customColor;
        } else {
          return index % 2 == 0 ? this.__P_480_2 : this.__P_480_3;
        }
      },
      // property apply
      _applyColorEven: function _applyColorEven(value, old) {
        if (value) {
          this.__P_480_2 = qx.theme.manager.Color.getInstance().resolve(value);
        } else {
          this.__P_480_2 = null;
        }
        this.updateLayerData();
      },
      // property apply
      _applyColorOdd: function _applyColorOdd(value, old) {
        if (value) {
          this.__P_480_3 = qx.theme.manager.Color.getInstance().resolve(value);
        } else {
          this.__P_480_3 = null;
        }
        this.updateLayerData();
      },
      /**
       * Sets the decorator for the given index
       *
       * @param index {Integer} Index to set the color for
       * @param decorator {qx.ui.decoration.IDecorator|null} the decorator to set. A value of
       *    <code>null</code> will reset the decorator.
       */
      setBackground: function setBackground(index, decorator) {
        if (decorator) {
          this.__P_480_1[index] = qx.theme.manager.Decoration.getInstance().resolve(decorator);
        } else {
          delete this.__P_480_1[index];
        }
        this.updateLayerData();
      },
      /**
       * Get the decorator at the given index
       *
       * @param index {Integer} The index to get the decorator for.
       * @return {qx.ui.decoration.IDecorator} The decorator at the given index
       */
      getBackground: function getBackground(index) {
        return this.__P_480_1[index];
      }
    },
    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this.__P_480_0 = this.__P_480_1 = null;
    }
  });
  qx.ui.virtual.layer.AbstractBackground.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractBackground.js.map?dt=1677345955247