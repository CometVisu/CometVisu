(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Managed wrapper for the HTML canvas tag.
   */
  qx.Class.define("qx.html.Canvas", {
    extend: qx.html.Element,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param styles {Map?null} optional map of CSS styles, where the key is the name
     *    of the style and the value is the value to use.
     * @param attributes {Map?null} optional map of element attributes, where the
     *    key is the name of the attribute and the value is the value to use.
     */
    construct: function construct(styles, attributes) {
      qx.html.Element.constructor.call(this, "canvas", styles, attributes);
      this.__P_209_0 = document.createElement("canvas");
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_209_0: null,
      // overridden
      _createDomElement: function _createDomElement() {
        return this.__P_209_0;
      },

      /**
       * Get the canvas element [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvas">W3C-HMTL5</a>]
       *
       * @return {Element} The canvas DOM element.
       */
      getCanvas: function getCanvas() {
        return this.__P_209_0;
      },

      /**
       * Set the width attribute of the canvas element. This property controls the
       * size of the canvas coordinate space.
       *
       * @param width {Integer} canvas width
       */
      setWidth: function setWidth(width) {
        this.__P_209_0.width = width;
      },

      /**
       * Get the width attribute of the canvas element
       *
       * @return {Integer} canvas width
       */
      getWidth: function getWidth() {
        return this.__P_209_0.width;
      },

      /**
       * Set the height attribute of the canvas element. This property controls the
       * size of the canvas coordinate space.
       *
       * @param height {Integer} canvas height
       */
      setHeight: function setHeight(height) {
        this.__P_209_0.height = height;
      },

      /**
       * Get the height attribute of the canvas element
       *
       * @return {Integer} canvas height
       */
      getHeight: function getHeight() {
        return this.__P_209_0.height;
      },

      /**
       * Get the canvas' 2D rendering context
       * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvasrenderingcontext2d">W3C-HTML5</a>].
       * All drawing operations are performed on this context.
       *
       * @return {CanvasRenderingContext2D} The 2D rendering context.
       */
      getContext2d: function getContext2d() {
        return this.__P_209_0.getContext("2d");
      }
    }
  });
  qx.html.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1702895807920