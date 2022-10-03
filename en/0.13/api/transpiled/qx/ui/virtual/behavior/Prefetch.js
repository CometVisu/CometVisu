(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.core.queue.Manager": {}
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
   * Behavior to support pre-rendering of invisible areas of a virtual scroller.
   * If applied to a scroller it will start a timer and increase the rendered area
   * of the scroller after a certain period of time. Subsequent scrolling will not
   * have to render this pre-computed area again.
   *
   */
  qx.Class.define("qx.ui.virtual.behavior.Prefetch", {
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param scroller {qx.ui.virtual.core.Scroller} The scroller to prefetch
     * @param settings {Map} This map contains minimum and maximum pixels to
     * prefetch near the view port.
     * <ul>
     *   <li>minLeft: minimum pixels to prefetch left to the view port</li>
     *   <li>maxLeft: maximum pixels to prefetch left to the view port</li>
     *   <li>minRight: minimum pixels to prefetch right to the view port</li>
     *   <li>maxRight: maximum pixels to prefetch right to the view port</li>
     *   <li>minAbove: minimum pixels to prefetch above the view port</li>
     *   <li>maxAbove: maximum pixels to prefetch above the view port</li>
     *   <li>minBelow: minimum pixels to prefetch below the view port</li>
     *   <li>maxBelow: maximum pixels to prefetch below the view port</li>
     * </ul>
     */
    construct: function construct(scroller, settings) {
      qx.core.Object.constructor.call(this);
      this.setPrefetchX(settings.minLeft, settings.maxLeft, settings.minRight, settings.maxRight);
      this.setPrefetchY(settings.minAbove, settings.maxAbove, settings.minBelow, settings.maxBelow);
      this.__P_454_0 = new qx.event.Timer(this.getInterval());

      this.__P_454_0.addListener("interval", this._onInterval, this);

      if (scroller) {
        this.setScroller(scroller);
      }
    },

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      /** @type {qx.ui.virtual.core.Scroller} The scroller to prefetch */
      scroller: {
        check: "qx.ui.virtual.core.Scroller",
        nullable: true,
        init: null,
        apply: "_applyScroller"
      },

      /** @type {Integer} Polling interval */
      interval: {
        check: "Integer",
        init: 200,
        apply: "_applyInterval"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_454_1: null,
      __P_454_2: null,
      __P_454_0: null,
      __P_454_3: null,
      __P_454_4: null,

      /**
       * Configure horizontal prefetching
       *
       * @param minLeft {Integer} minimum pixels to prefetch left to the view port
       * @param maxLeft {Integer} maximum pixels to prefetch left to the view port
       * @param minRight {Integer} minimum pixels to prefetch right to the view port
       * @param maxRight {Integer} maximum pixels to prefetch right to the view port
       */
      setPrefetchX: function setPrefetchX(minLeft, maxLeft, minRight, maxRight) {
        this.__P_454_1 = [minLeft, maxLeft, minRight, maxRight];
      },

      /**
       * Configure vertical prefetching
       *
       * @param minAbove {Integer} minimum pixels to prefetch above the view port
       * @param maxAbove {Integer} maximum pixels to prefetch above the view port
       * @param minBelow {Integer} minimum pixels to prefetch below the view port
       * @param maxBelow {Integer} maximum pixels to prefetch below the view port
       */
      setPrefetchY: function setPrefetchY(minAbove, maxAbove, minBelow, maxBelow) {
        this.__P_454_2 = [minAbove, maxAbove, minBelow, maxBelow];
      },

      /**
       * Update prefetching
       */
      _onInterval: function _onInterval() {
        var px = this.__P_454_1;

        if (px[1] && px[3]) {
          this.getScroller().getPane().prefetchX(px[0], px[1], px[2], px[3]);
          qx.ui.core.queue.Manager.flush();
        }

        var py = this.__P_454_2;

        if (py[1] && py[3]) {
          this.getScroller().getPane().prefetchY(py[0], py[1], py[2], py[3]);
          qx.ui.core.queue.Manager.flush();
        }
      },
      // property apply
      _applyScroller: function _applyScroller(value, old) {
        if (old) {
          if (this.__P_454_3) {
            old.getChildControl("scrollbar-x").removeListenerById(this.__P_454_3);
          }

          if (this.__P_454_4) {
            old.getChildControl("scrollbar-y").removeListenerById(this.__P_454_4);
          }
        }

        if (value) {
          if (!value.getContentElement().getDomElement()) {
            this.__P_454_0.stop();

            value.addListenerOnce("appear", this.__P_454_0.start, this.__P_454_0);
          } else {
            this.__P_454_0.restart();
          } //        if (value.hasChildControl("scrollbar-x"))
          //        {


          this.__P_454_3 = value.getChildControl("scrollbar-x").addListener("scroll", this.__P_454_0.restart, this.__P_454_0); //        }
          //        if (value.hasChildControl("scrollbar-y"))
          //        {

          this.__P_454_4 = value.getChildControl("scrollbar-y").addListener("scroll", this.__P_454_0.restart, this.__P_454_0); //        }
        } else {
          this.__P_454_0.stop();
        }
      },
      // property apply
      _applyInterval: function _applyInterval(value, old) {
        this.__P_454_0.setInterval(value);
      }
    },

    /*
     *****************************************************************************
        DESTRUCT
     *****************************************************************************
     */
    destruct: function destruct() {
      this.setScroller(null);
      this.__P_454_1 = this.__P_454_2 = null;

      this._disposeObjects("__P_454_0");
    }
  });
  qx.ui.virtual.behavior.Prefetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Prefetch.js.map?dt=1664784649740