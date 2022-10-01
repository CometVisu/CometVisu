(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.scroll.IScrollBar": {
        "require": true
      },
      "qx.html.Element": {},
      "qx.bom.element.Scroll": {},
      "qx.ui.core.queue.Layout": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.AnimationFrame": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The scroll bar widget wraps the native browser scroll bars as a qooxdoo widget.
   * It can be uses instead of the styled qooxdoo scroll bars.
   *
   * Scroll bars are used by the {@link qx.ui.container.Scroll} container. Usually
   * a scroll bar is not used directly.
   *
   * *Example*
   *
   * Here is a little example of how to use the widget.
   *
   * <pre class='javascript'>
   *   var scrollBar = new qx.ui.core.scroll.NativeScrollBar("horizontal");
   *   scrollBar.set({
   *     maximum: 500
   *   })
   *   this.getRoot().add(scrollBar);
   * </pre>
   *
   * This example creates a horizontal scroll bar with a maximum value of 500.
   *
   * *External Documentation*
   *
   * <a href='http://qooxdoo.org/docs/#desktop/widget/scrollbar.md' target='_blank'>
   * Documentation of this widget in the qooxdoo manual.</a>
   */
  qx.Class.define("qx.ui.core.scroll.NativeScrollBar", {
    extend: qx.ui.core.Widget,
    implement: qx.ui.core.scroll.IScrollBar,

    /**
     * @param orientation {String?"horizontal"} The initial scroll bar orientation
     */
    construct: function construct(orientation) {
      qx.ui.core.Widget.constructor.call(this);
      this.addState("native");
      this.getContentElement().addListener("scroll", this._onScroll, this);
      this.addListener("pointerdown", this._stopPropagation, this);
      this.addListener("pointerup", this._stopPropagation, this);
      this.addListener("pointermove", this._stopPropagation, this);
      this.addListener("appear", this._onAppear, this);
      this.getContentElement().add(this._getScrollPaneElement());
      this.getContentElement().setStyle("box-sizing", "content-box"); // Configure orientation

      if (orientation != null) {
        this.setOrientation(orientation);
      } else {
        this.initOrientation();
      } // prevent drag & drop on scrolling


      this.addListener("track", function (e) {
        e.stopPropagation();
      }, this);
    },
    events: {
      /**
       * Fired as soon as the scroll animation ended.
       */
      scrollAnimationEnd: 'qx.event.type.Event'
    },
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "scrollbar"
      },
      // interface implementation
      orientation: {
        check: ["horizontal", "vertical"],
        init: "horizontal",
        apply: "_applyOrientation"
      },
      // interface implementation
      maximum: {
        check: "PositiveInteger",
        apply: "_applyMaximum",
        init: 100
      },
      // interface implementation
      position: {
        check: "Number",
        init: 0,
        apply: "_applyPosition",
        event: "scroll"
      },

      /**
       * Step size for each tap on the up/down or left/right buttons.
       */
      singleStep: {
        check: "Integer",
        init: 20
      },
      // interface implementation
      knobFactor: {
        check: "PositiveNumber",
        nullable: true
      }
    },
    members: {
      __P_312_0: null,
      __P_312_1: null,
      __P_312_2: null,
      __P_312_3: null,

      /**
       * Get the scroll pane html element.
       *
       * @return {qx.html.Element} The element
       */
      _getScrollPaneElement: function _getScrollPaneElement() {
        if (!this.__P_312_1) {
          this.__P_312_1 = new qx.html.Element();
        }

        return this.__P_312_1;
      },

      /*
      ---------------------------------------------------------------------------
        WIDGET API
      ---------------------------------------------------------------------------
      */
      // overridden
      renderLayout: function renderLayout(left, top, width, height) {
        var changes = qx.ui.core.scroll.NativeScrollBar.superclass.prototype.renderLayout.call(this, left, top, width, height);

        this._updateScrollBar();

        return changes;
      },
      // overridden
      _getContentHint: function _getContentHint() {
        var scrollbarWidth = qx.bom.element.Scroll.getScrollbarWidth();
        return {
          width: this.__P_312_0 ? 100 : scrollbarWidth,
          maxWidth: this.__P_312_0 ? null : scrollbarWidth,
          minWidth: this.__P_312_0 ? null : scrollbarWidth,
          height: this.__P_312_0 ? scrollbarWidth : 100,
          maxHeight: this.__P_312_0 ? scrollbarWidth : null,
          minHeight: this.__P_312_0 ? scrollbarWidth : null
        };
      },
      // overridden
      _applyEnabled: function _applyEnabled(value, old) {
        qx.ui.core.scroll.NativeScrollBar.superclass.prototype._applyEnabled.call(this, value, old);

        this._updateScrollBar();
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyMaximum: function _applyMaximum(value) {
        this._updateScrollBar();
      },
      // property apply
      _applyPosition: function _applyPosition(value) {
        var content = this.getContentElement();

        if (this.__P_312_0) {
          content.scrollToX(value);
        } else {
          content.scrollToY(value);
        }
      },
      // property apply
      _applyOrientation: function _applyOrientation(value, old) {
        var isHorizontal = this.__P_312_0 = value === "horizontal";
        this.set({
          allowGrowX: isHorizontal,
          allowShrinkX: isHorizontal,
          allowGrowY: !isHorizontal,
          allowShrinkY: !isHorizontal
        });

        if (isHorizontal) {
          this.replaceState("vertical", "horizontal");
        } else {
          this.replaceState("horizontal", "vertical");
        }

        this.getContentElement().setStyles({
          overflowX: isHorizontal ? "scroll" : "hidden",
          overflowY: isHorizontal ? "hidden" : "scroll"
        }); // Update layout

        qx.ui.core.queue.Layout.add(this);
      },

      /**
       * Update the scroll bar according to its current size, max value and
       * enabled state.
       */
      _updateScrollBar: function _updateScrollBar() {
        var isHorizontal = this.__P_312_0;
        var bounds = this.getBounds();

        if (!bounds) {
          return;
        }

        if (this.isEnabled()) {
          var containerSize = isHorizontal ? bounds.width : bounds.height;
          var innerSize = this.getMaximum() + containerSize;
        } else {
          innerSize = 0;
        } // Scrollbars don't work properly in IE/Edge if the element with overflow has
        // exactly the size of the scrollbar. Thus we move the element one pixel
        // out of the view and increase the size by one.


        if (qx.core.Environment.get("engine.name") == "mshtml" || qx.core.Environment.get("browser.name") == "edge") {
          var bounds = this.getBounds();
          this.getContentElement().setStyles({
            left: (isHorizontal ? bounds.left : bounds.left - 1) + "px",
            top: (isHorizontal ? bounds.top - 1 : bounds.top) + "px",
            width: (isHorizontal ? bounds.width : bounds.width + 1) + "px",
            height: (isHorizontal ? bounds.height + 1 : bounds.height) + "px"
          });
        }

        this._getScrollPaneElement().setStyles({
          left: 0,
          top: 0,
          width: (isHorizontal ? innerSize : 1) + "px",
          height: (isHorizontal ? 1 : innerSize) + "px"
        });

        this.updatePosition(this.getPosition());
      },
      // interface implementation
      scrollTo: function scrollTo(position, duration) {
        // if a user sets a new position, stop any animation
        this.stopScrollAnimation();

        if (duration) {
          var from = this.getPosition();
          this.__P_312_3 = new qx.bom.AnimationFrame();

          this.__P_312_3.on("frame", function (timePassed) {
            var newPos = parseInt(timePassed / duration * (position - from) + from);
            this.updatePosition(newPos);
          }, this);

          this.__P_312_3.on("end", function () {
            this.setPosition(Math.max(0, Math.min(this.getMaximum(), position)));
            this.__P_312_3 = null;
            this.fireEvent("scrollAnimationEnd");
          }, this);

          this.__P_312_3.startSequence(duration);
        } else {
          this.updatePosition(position);
        }
      },

      /**
       * Helper to set the new position taking care of min and max values.
       * @param position {Number} The new position.
       */
      updatePosition: function updatePosition(position) {
        this.setPosition(Math.max(0, Math.min(this.getMaximum(), position)));
      },
      // interface implementation
      scrollBy: function scrollBy(offset, duration) {
        this.scrollTo(this.getPosition() + offset, duration);
      },
      // interface implementation
      scrollBySteps: function scrollBySteps(steps, duration) {
        var size = this.getSingleStep();
        this.scrollBy(steps * size, duration);
      },

      /**
       * If a scroll animation is running, it will be stopped.
       */
      stopScrollAnimation: function stopScrollAnimation() {
        if (this.__P_312_3) {
          this.__P_312_3.cancelSequence();

          this.__P_312_3 = null;
        }
      },

      /**
       * Scroll event handler
       *
       * @param e {qx.event.type.Event} the scroll event
       */
      _onScroll: function _onScroll(e) {
        var container = this.getContentElement();
        var position = this.__P_312_0 ? container.getScrollX() : container.getScrollY();
        this.setPosition(position);
      },

      /**
       * Listener for appear which ensured the scroll bar is positioned right
       * on appear.
       *
       * @param e {qx.event.type.Data} Incoming event object
       */
      _onAppear: function _onAppear(e) {
        this._applyPosition(this.getPosition());
      },

      /**
       * Stops propagation on the given even
       *
       * @param e {qx.event.type.Event} the event
       */
      _stopPropagation: function _stopPropagation(e) {
        e.stopPropagation();
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_312_1");
    }
  });
  qx.ui.core.scroll.NativeScrollBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NativeScrollBar.js.map?dt=1664609809740