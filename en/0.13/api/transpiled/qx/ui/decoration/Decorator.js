(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.decoration.Abstract": {
        "require": true
      },
      "qx.ui.decoration.IDecorator": {
        "require": true
      },
      "qx.ui.decoration.MBackgroundColor": {
        "require": true
      },
      "qx.ui.decoration.MBorderRadius": {
        "require": true
      },
      "qx.ui.decoration.MBoxShadow": {
        "require": true
      },
      "qx.ui.decoration.MDoubleBorder": {
        "require": true
      },
      "qx.ui.decoration.MLinearBackgroundGradient": {
        "require": true
      },
      "qx.ui.decoration.MBorderImage": {
        "require": true
      },
      "qx.ui.decoration.MTransition": {
        "require": true
      },
      "qx.lang.String": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Decorator including all decoration possibilities from mixins:
   *
   * <ul>
   * <li>Background color</li>
   * <li>Background image</li>
   * <li>Background gradient</li>
   * <li>Single and double borders</li>
   * <li>Border radius</li>
   * <li>Box shadow</li>
   * </ul>
   */
  qx.Class.define("qx.ui.decoration.Decorator", {
    extend: qx.ui.decoration.Abstract,
    implement: [qx.ui.decoration.IDecorator],
    include: [qx.ui.decoration.MBackgroundColor, qx.ui.decoration.MBorderRadius, qx.ui.decoration.MBoxShadow, qx.ui.decoration.MDoubleBorder, qx.ui.decoration.MLinearBackgroundGradient, qx.ui.decoration.MBorderImage, qx.ui.decoration.MTransition],
    members: {
      __P_560_0: false,
      /**
       * Returns the configured padding minus the border width.
       * @return {Map} Map of top, right, bottom and left padding values
       */
      getPadding: function getPadding() {
        var insets = this.getInset();
        var slices = this._getDefaultInsetsForBorderImage();
        var borderTop = insets.top - (slices.top ? slices.top : this.getWidthTop());
        var borderRight = insets.right - (slices.right ? slices.right : this.getWidthRight());
        var borderBottom = insets.bottom - (slices.bottom ? slices.bottom : this.getWidthBottom());
        var borderLeft = insets.left - (slices.left ? slices.left : this.getWidthLeft());
        return {
          top: insets.top ? borderTop : this.getInnerWidthTop(),
          right: insets.right ? borderRight : this.getInnerWidthRight(),
          bottom: insets.bottom ? borderBottom : this.getInnerWidthBottom(),
          left: insets.left ? borderLeft : this.getInnerWidthLeft()
        };
      },
      /**
       * Returns the styles of the decorator as a map with property names written
       * in javascript style (e.g. <code>fontWeight</code> instead of <code>font-weight</code>).
       *
       * @param css {Boolean?} <code>true</code> if hyphenated CSS names should be returned.
       * @return {Map} style information
       */
      getStyles: function getStyles(css) {
        if (css) {
          return this._getStyles();
        }
        var jsStyles = {};
        var cssStyles = this._getStyles();
        for (var property in cssStyles) {
          jsStyles[qx.lang.String.camelCase(property)] = cssStyles[property];
        }
        return jsStyles;
      },
      /**
       * Collects all the style information from the decorators.
       *
       * @return {Map} style information
       */
      _getStyles: function _getStyles() {
        var styles = {};
        for (var name in this) {
          if (name.indexOf("_style") == 0 && this[name] instanceof Function) {
            this[name](styles);
          }
        }
        for (var name in styles) {
          if (qx.lang.Type.isArray(styles[name])) {
            styles[name] = styles[name].join(", ");
          }
        }
        this.__P_560_0 = true;
        return styles;
      },
      // overridden
      _getDefaultInsets: function _getDefaultInsets() {
        var directions = ["top", "right", "bottom", "left"];
        var defaultInsets = {};
        for (var name in this) {
          if (name.indexOf("_getDefaultInsetsFor") == 0 && this[name] instanceof Function) {
            var currentInsets = this[name]();
            for (var i = 0; i < directions.length; i++) {
              var direction = directions[i];
              // initialize with the first insets found
              if (defaultInsets[direction] == undefined) {
                defaultInsets[direction] = currentInsets[direction];
              }
              // take the largest inset
              if (currentInsets[direction] > defaultInsets[direction]) {
                defaultInsets[direction] = currentInsets[direction];
              }
            }
          }
        }

        // check if the mixins have created a default insets
        if (defaultInsets["top"] != undefined) {
          return defaultInsets;
        }
        // return a fallback which is 0 for all insets
        return {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      },
      // overridden
      _isInitialized: function _isInitialized() {
        return this.__P_560_0;
      },
      /**
       * Ensures that every propertyValue specified in propertyNames is an array.
       * The value arrays are extended and repeated to match in length.
       * @param propertyNames {Array} Array containing the propertyNames.
       * @return {Array} Array containing the extended value arrays.
       */
      _getExtendedPropertyValueArrays: function _getExtendedPropertyValueArrays(propertyNames) {
        // transform non-array values to an array containing that value
        var propertyValues = propertyNames.map(function (propName) {
          var value = this.get(propName);
          if (!qx.lang.Type.isArray(value)) {
            value = [value];
          }
          return value;
        }, this);

        // Because it's possible to set multiple values for a property there's
        // a chance that not all properties have the same number of values set.
        // Extend the value arrays by repeating existing values until all
        // arrays match in length.
        var items = Math.max.apply(Math, propertyValues.map(function (prop) {
          return prop.length;
        }));
        for (var i = 0; i < propertyValues.length; i++) {
          this.__P_560_1(propertyValues[i], items);
        }
        return propertyValues;
      },
      /**
       * Extends an array up to the given length by repeating the elements already present.
       * @param array {Array} Incoming array. Has to contain at least one element.
       * @param to {Integer} Desired length. Must be greater than or equal to the the length of arr.
       */
      __P_560_1: function __P_560_1(array, to) {
        var initial = array.length;
        while (array.length < to) {
          array.push(array[array.length % initial]);
        }
      }
    }
  });
  qx.ui.decoration.Decorator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decorator.js.map?dt=1722153847751