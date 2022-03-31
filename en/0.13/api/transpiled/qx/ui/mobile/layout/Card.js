(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.event.handler.Transition": {},
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.layout.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.CardAnimation": {
        "construct": true
      },
      "qx.bom.client.CssTransform": {
        "require": true
      },
      "qx.bom.AnimationFrame": {},
      "qx.ui.mobile.core.MResize": {},
      "qx.event.Registration": {},
      "qx.bom.element.Class": {},
      "qx.bom.element.Animation": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.transform.3d": {
          "className": "qx.bom.client.CssTransform"
        }
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
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * A card layout.
   *
   * The card layout lays out widgets in a stack. Call show to display a widget.
   * Only the widget which show method is called is displayed. All other widgets are excluded.
   *
   *
   * *Example*
   *
   * Here is a little example of how to use the Card layout.
   *
   * <pre class="javascript">
   * var layout = new qx.ui.mobile.layout.Card());
   * var container = new qx.ui.mobile.container.Composite(layout);
   *
   * var label1 = new qx.ui.mobile.basic.Label("1");
   * container.add(label1);
   * var label2 = new qx.ui.mobile.basic.Label("2");
   * container.add(label2);
   *
   * label2.show();
   * </pre>
   *
   * @use(qx.event.handler.Transition)
   */
  qx.Class.define("qx.ui.mobile.layout.Card", {
    extend: qx.ui.mobile.layout.Abstract,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.mobile.layout.Abstract.constructor.call(this);
      this.__P_370_0 = new qx.ui.mobile.layout.CardAnimation();
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** Fired when the animation of a page transition starts */
      animationStart: "qx.event.type.Data",

      /** Fired when the animation of a page transition ends */
      animationEnd: "qx.event.type.Data"
    },

    /*
     *****************************************************************************
        PROPERTIES
     *****************************************************************************
     */
    properties: {
      /** The default animation to use for page transition */
      defaultAnimation: {
        check: "String",
        init: "slide"
      },

      /** Flag which indicates, whether animation is needed, or widgets should only swap. */
      showAnimation: {
        check: "Boolean",
        init: true
      },

      /** Transition duration of each animation. */
      animationDuration: {
        check: "Integer",
        init: 350
      }
    },

    /*
     *****************************************************************************
        MEMBERS
     *****************************************************************************
     */
    members: {
      __P_370_1: null,
      __P_370_2: null,
      __P_370_3: null,
      __P_370_4: null,
      __P_370_5: null,
      __P_370_0: null,
      // overridden
      _getCssClasses: function _getCssClasses() {
        return ["layout-card", "qx-vbox"];
      },
      // overridden
      connectToChildWidget: function connectToChildWidget(widget) {
        qx.ui.mobile.layout.Card.prototype.connectToChildWidget.base.call(this);

        if (widget) {
          widget.addCssClass("layout-card-item");
          widget.addCssClass("qx-flex1");
          widget.exclude();
        }
      },
      // overridden
      disconnectFromChildWidget: function disconnectFromChildWidget(widget) {
        qx.ui.mobile.layout.Card.prototype.disconnectFromChildWidget.base.call(this);
        widget.removeCssClass("layout-card-item");
      },
      // overridden
      updateLayout: function updateLayout(widget, action, properties) {
        if (action == "visible") {
          this._showWidget(widget, properties);
        }

        qx.ui.mobile.layout.Card.prototype.updateLayout.base.call(this, widget, action, properties);
      },

      /**
       * Setter for this.__cardAnimation.
       * @param value {qx.ui.mobile.layout.CardAnimation} the new CardAnimation object.
       */
      setCardAnimation: function setCardAnimation(value) {
        this.__P_370_0 = value;
      },

      /**
       * Getter for this.__cardAnimation.
       * @return {qx.ui.mobile.layout.CardAnimation} the current CardAnimation object.
       */
      getCardAnimation: function getCardAnimation() {
        return this.__P_370_0;
      },

      /**
       * Shows the widget with the given properties.
       *
       * @param widget {qx.ui.mobile.core.Widget} The target widget
       * @param properties {Map} The layout properties to set. Key / value pairs.
       */
      _showWidget: function _showWidget(widget, properties) {
        if (this.__P_370_1 == widget) {
          return;
        }

        if (this.__P_370_3) {
          this.__P_370_6();
        }

        this.__P_370_1 = widget;

        if (this.__P_370_2 && this.getShowAnimation() && qx.core.Environment.get("css.transform.3d")) {
          properties = properties || {}; // both are explicit identity checks for null

          if (properties.animation === null || this.getCardAnimation().getMap()[properties.animation] === null) {
            this._swapWidget();

            return;
          }

          this.__P_370_4 = properties.animation || this.getDefaultAnimation();

          if (properties.action && properties.action === "back") {
            this.__P_370_5 = true;
          } else {
            properties.reverse = properties.reverse === null ? false : properties.reverse;
            this.__P_370_5 = properties.reverse;
          }

          qx.bom.AnimationFrame.request(function () {
            this.__P_370_7(widget);
          }, this);
        } else {
          this._swapWidget();
        }
      },

      /**
       * Excludes the current widget and sets the next widget to the current widget.
       */
      _swapWidget: function _swapWidget() {
        if (this.__P_370_2) {
          this.__P_370_2.removeCssClass("active");

          this.__P_370_2.exclude();
        }

        this.__P_370_2 = this.__P_370_1;

        this.__P_370_2.addCssClass("active");
      },

      /**
       * Fix size, only if widget has mixin MResize set,
       * and nextWidget is set.
       *
       * @param widget {qx.ui.mobile.core.Widget} The target widget which should have a fixed size.
       */
      _fixWidgetSize: function _fixWidgetSize(widget) {
        if (widget) {
          var hasResizeMixin = qx.Class.hasMixin(widget.constructor, qx.ui.mobile.core.MResize);

          if (hasResizeMixin) {
            // Size has to be fixed for animation.
            widget.fixSize();
          }
        }
      },

      /**
       * Releases recently fixed widget size (width/height). This is needed for allowing further
       * flexbox layouting.
       *
       * @param widget {qx.ui.mobile.core.Widget} The target widget which should have a flexible size.
       */
      _releaseWidgetSize: function _releaseWidgetSize(widget) {
        if (widget) {
          var hasResizeMixin = qx.Class.hasMixin(widget.constructor, qx.ui.mobile.core.MResize);

          if (hasResizeMixin) {
            // Size has to be released after animation.
            widget.releaseFixedSize();
          }
        }
      },

      /**
       * Starts the animation for the page transition.
       *
       * @param widget {qx.ui.mobile.core.Widget} The target widget
       */
      __P_370_7: function __P_370_7(widget) {
        if (widget.isDisposed()) {
          return;
        } // Fix size of current and next widget, then start animation.


        this.__P_370_3 = true;
        this.fireDataEvent("animationStart", [this.__P_370_2, widget]);

        var fromElement = this.__P_370_2.getContainerElement();

        var toElement = widget.getContainerElement();
        qx.event.Registration.addListener(fromElement, "animationEnd", this._onAnimationEnd, this);
        qx.event.Registration.addListener(toElement, "animationEnd", this._onAnimationEnd, this);

        var fromCssClasses = this.__P_370_8("out");

        var toCssClasses = this.__P_370_8("in");

        this._widget.addCssClass("animationParent");

        var toElementAnimation = this.__P_370_0.getAnimation(this.__P_370_4, "in", this.__P_370_5);

        var fromElementAnimation = this.__P_370_0.getAnimation(this.__P_370_4, "out", this.__P_370_5);

        qx.bom.element.Class.addClasses(toElement, toCssClasses);
        qx.bom.element.Class.addClasses(fromElement, fromCssClasses);
        qx.bom.element.Animation.animate(toElement, toElementAnimation);
        qx.bom.element.Animation.animate(fromElement, fromElementAnimation);
      },

      /**
       * Event handler. Called when the animation of the page transition ends.
       *
       * @param evt {qx.event.type.Event} The causing event
       */
      _onAnimationEnd: function _onAnimationEnd(evt) {
        this.__P_370_6();

        this.fireDataEvent("animationEnd", [this.__P_370_2, this.__P_370_1]);
      },

      /**
       * Stops the animation for the page transition.
       */
      __P_370_6: function __P_370_6() {
        if (this.__P_370_3) {
          var fromElement = this.__P_370_2.getContainerElement();

          var toElement = this.__P_370_1.getContainerElement();

          qx.event.Registration.removeListener(fromElement, "animationEnd", this._onAnimationEnd, this);
          qx.event.Registration.removeListener(toElement, "animationEnd", this._onAnimationEnd, this);
          qx.bom.element.Class.removeClasses(fromElement, this.__P_370_8("out"));
          qx.bom.element.Class.removeClasses(toElement, this.__P_370_8("in"));

          this._swapWidget();

          this._widget.removeCssClass("animationParent");

          this.__P_370_3 = false;
        }
      },

      /**
       * Returns the animation CSS classes for a given direction. The direction
       * can be <code>in</code> or <code>out</code>.
       *
       * @param direction {String} The direction of the animation. <code>in</code> or <code>out</code>.
       * @return {String[]} The CSS classes for the set animation.
       */
      __P_370_8: function __P_370_8(direction) {
        var classes = ["animationChild", this.__P_370_4, direction];

        if (this.__P_370_5) {
          classes.push("reverse");
        }

        return classes;
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_370_0");
    }
  });
  qx.ui.mobile.layout.Card.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Card.js.map?dt=1648710503882