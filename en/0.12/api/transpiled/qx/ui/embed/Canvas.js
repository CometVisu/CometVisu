(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.util.DeferredCall": {
        "construct": true
      },
      "qx.html.Canvas": {},
      "qx.event.type.Data": {}
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
   * The Canvas widget embeds the HMTL canvas element
   * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#the-canvas">W3C-HTML5</a>]
   *
   * Note: This widget does not work in Internet Explorer < 9!
   * Check for browser support with qx.core.Environment.get("html.canvas").
   *
   * To paint something on the canvas and keep the content updated on resizes you
   * either have to override the {@link #_draw} method or redraw the content on
   * the {@link #redraw} event. The drawing context can be obtained by {@link #getContext2d}.
   *
   * Note that this widget operates on two different coordinate systems. The canvas
   * has its own coordinate system for drawing operations. This canvas coordinate
   * system is scaled to fit actual size of the DOM element. Each time the size of
   * the canvas dimensions is changed a redraw is required. In this case the
   * protected method {@link #_draw} is called and the event {@link #redraw}
   * is fired. You can synchronize the internal canvas dimension with the
   * CSS dimension of the canvas element by setting {@link #syncDimension} to
   * <code>true</code>.
   *
   * *Example*
   *
   * Here is a little example of how to use the canvas widget.
   *
   * <pre class='javascript'>
   * var canvas = new qx.ui.embed.Canvas().set({
   *   canvasWidth: 200,
   *   canvasHeight: 200,
   *   syncDimension: true
   * });
   * canvas.addListener("redraw", function(e)
   * {
   *   var data = e.getData();
   *   var width = data.width;
   *   var height = data.height;
   *   var ctx = data.context;
   *
   *   ctx.fillStyle = "rgb(200,0,0)";
   *   ctx.fillRect (20, 20, width-5, height-5);
   *
   *   ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
   *   ctx.fillRect (70, 70, 105, 100);
   * }, this);
   * </pre>
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/canvas.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.embed.Canvas", {
    extend: qx.ui.core.Widget,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param canvasWidth {Integer} The internal with of the canvas coordinates.
     * @param canvasHeight {Integer} The internal height of the canvas coordinates.
     */
    construct: function construct(canvasWidth, canvasHeight) {
      qx.ui.core.Widget.constructor.call(this);
      this.__P_303_0 = new qx.util.DeferredCall(this.__P_303_1, this);
      this.addListener("resize", this._onResize, this);

      if (canvasWidth !== undefined) {
        this.setCanvasWidth(canvasWidth);
      }

      if (canvasHeight !== undefined) {
        this.setCanvasHeight(canvasHeight);
      }
    },

    /*
     *****************************************************************************
        EVENTS
     *****************************************************************************
     */
    events: {
      /**
       * The redraw event is fired each time the canvas dimension change and the
       * canvas needs to be updated. The data field contains a map containing the
       * <code>width</code> and <code>height</code> of the canvas and the
       * rendering <code>context</code>.
       */
      "redraw": "qx.event.type.Data"
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
    properties: {
      /** Whether canvas and widget coordinates should be synchronized */
      syncDimension: {
        check: "Boolean",
        init: false
      },

      /** The internal with of the canvas coordinates */
      canvasWidth: {
        check: "Integer",
        init: 300,
        apply: "_applyCanvasWidth"
      },

      /** The internal height of the canvas coordinates */
      canvasHeight: {
        check: "Integer",
        init: 150,
        apply: "_applyCanvasHeight"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /** @type {qx.util.DeferredCall} */
      __P_303_0: null,

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      _createContentElement: function _createContentElement() {
        return new qx.html.Canvas();
      },

      /**
       * This methods triggers the redraw of the canvas' content
       */
      __P_303_1: function __P_303_1() {
        var canvas = this.getContentElement();
        var height = canvas.getHeight();
        var width = canvas.getWidth();
        var context = canvas.getContext2d();

        this._draw(width, height, context);

        this.fireNonBubblingEvent("redraw", qx.event.type.Data, [{
          width: width,
          height: height,
          context: context
        }]);
      },
      // property apply
      _applyCanvasWidth: function _applyCanvasWidth(value, old) {
        this.getContentElement().setWidth(value);

        this.__P_303_0.schedule();
      },
      // property apply
      _applyCanvasHeight: function _applyCanvasHeight(value, old) {
        this.getContentElement().setHeight(value);

        this.__P_303_0.schedule();
      },

      /**
       * Redraw the canvas
       */
      update: function update() {
        this.__P_303_0.schedule();
      },

      /**
       * Widget resize event handler. Updates the canvas dimension if needed.
       *
       * @param e {qx.event.type.Data} The resize event object
       */
      _onResize: function _onResize(e) {
        var data = e.getData();

        if (this.getSyncDimension()) {
          this.setCanvasHeight(data.height);
          this.setCanvasWidth(data.width);
        }
      },

      /**
       * Get the native canvas 2D rendering context
       * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#canvasrenderingcontext2d">W3C-HTML5</a>].
       * All drawing operations are performed on this context.
       *
       * @return {CanvasRenderingContext2D} The 2D rendering context.
       */
      getContext2d: function getContext2d() {
        return this.getContentElement().getContext2d();
      },

      /**
       * Template method, which can be used by derived classes to redraw the
       * content. It is called each time the canvas dimension change and the
       * canvas needs to be updated.
       *
       * @param width {Integer} New canvas width
       * @param height {Integer} New canvas height
       * @param context {CanvasRenderingContext2D} The rendering context to draw to
       */
      _draw: function _draw(width, height, context) {}
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this._disposeObjects("__P_303_0");
    }
  });
  qx.ui.embed.Canvas.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Canvas.js.map?dt=1625667791320