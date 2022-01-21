(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Element": {
        "require": true
      },
      "qx.bom.Iframe": {
        "require": true
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.Registration": {},
      "qx.bom.element.Style": {},
      "qx.bom.element.Opacity": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.dom.Element": {},
      "qx.bom.element.Attribute": {},
      "qx.bom.Document": {},
      "qx.bom.element.Dimension": {},
      "qx.bom.element.Location": {},
      "qx.event.Timer": {},
      "qx.dom.Node": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  /**
   * This class provides an unified blocker which offers three different modes.
   *
   * *Blocker modes*
   *
   * * block the whole document
   * * block the content of an element
   * * act as an underlying blocker for an element to shim native controls
   *
   *
   * The third mode is mainly necessary for IE browsers.
   *
   *
   * The first mode is the easiest to use. Just use the {@link #block} method
   * without a parameter.
   * The second and third mode are taking a DOM element as parameter for the
   * {@link #block} method. Additionally one need to setup the "zIndex" value
   * correctly to get the right results (see at {@link #setBlockerZIndex} method).
   *
   *
   * The zIndex value defaults to the value "10000". Either you set an appropriate
   * value for the blocker zIndex or for your DOM element to block. If you want
   * to block the content of your DOM element it has to have at least the zIndex
   * value of "10001" with default blocker values.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   * @require(qx.bom.Element)
   * @require(qx.bom.Iframe)
   */
  qx.Class.define("qx.bom.Blocker", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this.__P_76_0();
    },
    members: {
      __P_76_1: null,
      __P_76_2: null,
      __P_76_3: null,
      __P_76_4: false,
      __P_76_5: 10000,
      __P_76_6: 0,
      __P_76_7: "transparent",

      /*
      ---------------------------------------------------------------------------
        PUBLIC API
      ---------------------------------------------------------------------------
      */

      /**
       * Blocks the whole document (if no parameter is given) or acts as an
       * underlying blocker for native controls.
       *
       * @param element {element?null} If no element is given the whole document is blocked.
       */
      block: function block(element) {
        if (!this.__P_76_4) {
          qx.event.Registration.addListener(window, "resize", this.__P_76_8, this);
          this.__P_76_3 = element;

          var styles = this.__P_76_9();

          this.__P_76_10(styles);

          this.__P_76_4 = true;
        }
      },

      /**
       * Releases the blocking
       */
      unblock: function unblock() {
        if (this.__P_76_4) {
          this.__P_76_11();

          qx.event.Registration.removeListener(window, "resize", this.__P_76_8, this);
          this.__P_76_4 = false;
        }
      },

      /**
       * Whether the blocker is already active.
       *
       * @return {Boolean} Blocker active
       */
      isBlocked: function isBlocked() {
        return this.__P_76_4;
      },

      /**
       * Returns the blocker element. Useful if the element should be animated.
       *
       * @return {Element} DOM element
       */
      getBlockerElement: function getBlockerElement() {
        return this.__P_76_2;
      },

      /**
       * Sets the color of the blocker element. Be sure to set also a suitable
       * opacity value to get the desired result.
       *
       * @param color {String} CSS color value
       * @see #setBlockerOpacity
       */
      setBlockerColor: function setBlockerColor(color) {
        qx.bom.element.Style.set(this.__P_76_2, "backgroundColor", color);
      },

      /**
       * Returns the current blocker color.
       *
       * @return {String} CSS color value
       */
      getBlockerColor: function getBlockerColor() {
        return qx.bom.element.Style.get(this.__P_76_2, "backgroundColor");
      },

      /**
       * Sets the blocker opacity. Be sure to set also a suitable blocker color
       * value to get the desired result.
       *
       * @param opacity {String} CSS opacity value
       * @see #setBlockerColor
       */
      setBlockerOpacity: function setBlockerOpacity(opacity) {
        qx.bom.element.Opacity.set(this.__P_76_2, opacity);
      },

      /**
       * Returns the blocker opacity value.
       *
       * @return {Integer} CSS opacity value
       */
      getBlockerOpacity: function getBlockerOpacity() {
        return qx.bom.element.Opacity.get(this.__P_76_2);
      },

      /**
       * Set the zIndex of the blocker element. For most use cases you do not need
       * to manipulate this value.
       *
       * @param zIndex {Integer} CSS zIndex value
       */
      setBlockerZIndex: function setBlockerZIndex(zIndex) {
        qx.bom.element.Style.set(this.__P_76_2, "zIndex", zIndex);
      },

      /**
       * Returns the blocker zIndex value
       *
       * @return {Integer} CSS zIndex value
       */
      getBlockerZIndex: function getBlockerZIndex() {
        return qx.bom.element.Style.get(this.__P_76_2, "zIndex");
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE API
      ---------------------------------------------------------------------------
      */

      /**
       * Setups the elements and registers a "resize" event.
       */
      __P_76_0: function __P_76_0() {
        this.__P_76_12();

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          this.__P_76_13();
        }
      },

      /**
       * Create blocker element and set initial styles.
       */
      __P_76_12: function __P_76_12() {
        this.__P_76_2 = qx.dom.Element.create("div");
        qx.bom.element.Style.setStyles(this.__P_76_2, {
          display: "block",
          opacity: this.__P_76_6,
          backgroundColor: this.__P_76_7
        });
        this.setBlockerZIndex(this.__P_76_5);
      },

      /**
       * Create iframe blocker element and set initial styles.
       *
       * Needed to block native form elements
       * // see: http://www.macridesweb.com/oltest/IframeShim.html
       */
      __P_76_13: function __P_76_13() {
        this.__P_76_1 = qx.bom.Iframe.create();
        qx.bom.element.Attribute.set(this.__P_76_1, "allowTransparency", false);
        qx.bom.element.Attribute.set(this.__P_76_1, "src", "javascript:false;");
        qx.bom.element.Style.setStyles(this.__P_76_1, {
          display: "block",
          opacity: this.__P_76_6
        });
      },

      /**
       * Calculates the necessary styles for the blocker element.
       * Either the values of the document or of the element to block are used.
       *
       * @return {Map} Object with necessary style infos
       */
      __P_76_9: function __P_76_9() {
        var styles = {
          position: "absolute"
        };

        if (this.__P_76_14()) {
          styles.left = "0px";
          styles.top = "0px";
          styles.right = null;
          styles.bottom = null;
          styles.width = qx.bom.Document.getWidth() + "px";
          styles.height = qx.bom.Document.getHeight() + "px";
        } else {
          styles.width = qx.bom.element.Dimension.getWidth(this.__P_76_3) + "px";
          styles.height = qx.bom.element.Dimension.getHeight(this.__P_76_3) + "px";
          styles.left = qx.bom.element.Location.getLeft(this.__P_76_3) + "px";
          styles.top = qx.bom.element.Location.getTop(this.__P_76_3) + "px";
        }

        return styles;
      },

      /**
       * Apply the given styles and inserts the blocker.
       *
       * @param styles {Object} styles to apply
       */
      __P_76_10: function __P_76_10(styles) {
        var target = document.body;
        qx.bom.element.Style.setStyles(this.__P_76_2, styles);
        qx.dom.Element.insertEnd(this.__P_76_2, target);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          styles.zIndex = this.getBlockerZIndex() - 1;
          qx.bom.element.Style.setStyles(this.__P_76_1, styles);
          qx.dom.Element.insertEnd(this.__P_76_1, document.body);
        }
      },

      /**
       * Remove the blocker elements.
       */
      __P_76_11: function __P_76_11() {
        qx.dom.Element.remove(this.__P_76_2);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          qx.dom.Element.remove(this.__P_76_1);
        }
      },

      /**
       * Reacts on window resize and adapts the new size for the blocker element
       * if the whole document is blocked.
       *
       * @param e {qx.event.type.Event} event instance
       */
      __P_76_8: function __P_76_8(e) {
        if (this.__P_76_14()) {
          // reset the blocker to get the right calculated document dimension
          this.__P_76_15({
            width: "0px",
            height: "0px"
          }); // If the HTML document is very large, the getWidth() and getHeight()
          // returns the old size (it seems that the rendering engine is to slow).


          qx.event.Timer.once(function () {
            var dimension = {
              width: qx.bom.Document.getWidth() + "px",
              height: qx.bom.Document.getHeight() + "px"
            };

            this.__P_76_15(dimension);
          }, this, 0);
        }
      },

      /**
       * Does the resizing for blocker element and blocker iframe element (IE)
       *
       * @param dimension {Object} Map with width and height as keys
       */
      __P_76_15: function __P_76_15(dimension) {
        qx.bom.element.Style.setStyles(this.__P_76_2, dimension);

        if (qx.core.Environment.get("engine.name") == "mshtml") {
          qx.bom.element.Style.setStyles(this.__P_76_1, dimension);
        }
      },

      /**
       * Checks whether the whole document is be blocked.
       *
       * @return {Boolean} block mode
       */
      __P_76_14: function __P_76_14() {
        return this.__P_76_3 == null || qx.dom.Node.isWindow(this.__P_76_3) || qx.dom.Node.isDocument(this.__P_76_3);
      }
    }
  });
  qx.bom.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1642804666912