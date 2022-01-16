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
      "qx.event.Registration": {
        "construct": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.ui.tooltip.ToolTip": {},
      "qx.ui.core.Widget": {},
      "qx.ui.form.IForm": {}
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
       * Andreas Ecker (ecker)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * The tooltip manager globally manages the tooltips of all widgets. It will
   * display tooltips if the user hovers a widgets with a tooltip and hides all
   * other tooltips.
   */
  qx.Class.define("qx.ui.tooltip.Manager", {
    type: "singleton",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Register events

      qx.event.Registration.addListener(document.body, "pointerover", this.__P_424_0, this, true); // Instantiate timers

      this.__P_424_1 = new qx.event.Timer();

      this.__P_424_1.addListener("interval", this.__P_424_2, this);

      this.__P_424_3 = new qx.event.Timer();

      this.__P_424_3.addListener("interval", this.__P_424_4, this); // Init pointer position


      this.__P_424_5 = {
        left: 0,
        top: 0
      };
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /** Holds the current ToolTip instance */
      current: {
        check: "qx.ui.tooltip.ToolTip",
        nullable: true,
        apply: "_applyCurrent"
      },

      /** Show all invalid form fields tooltips . */
      showInvalidToolTips: {
        check: "Boolean",
        init: true
      },

      /** Show all tooltips. */
      showToolTips: {
        check: "Boolean",
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_424_5: null,
      __P_424_3: null,
      __P_424_1: null,
      __P_424_6: null,
      __P_424_7: null,

      /**
       * Get the shared tooltip, which is used to display the
       * {@link qx.ui.core.Widget#toolTipText} and
       * {@link qx.ui.core.Widget#toolTipIcon} properties of widgets.
       * You can use this public shared instance to e.g. customize the
       * look and feel.
       *
       * @return {qx.ui.tooltip.ToolTip} The shared tooltip
       */
      getSharedTooltip: function getSharedTooltip() {
        if (!this.__P_424_6) {
          this.__P_424_6 = new qx.ui.tooltip.ToolTip().set({
            rich: true
          });
        }

        return this.__P_424_6;
      },

      /**
       * Get the shared tooltip, which is used to display the
       * {@link qx.ui.core.Widget#toolTipText} and
       * {@link qx.ui.core.Widget#toolTipIcon} properties of widgets.
       * You can use this public shared instance to e.g. customize the
       * look and feel of the validation tooltips like
       * <code>getSharedErrorTooltip().getChildControl("atom").getChildControl("label").set({rich: true, wrap: true, width: 80})</code>
       *
       * @return {qx.ui.tooltip.ToolTip} The shared tooltip
       */
      getSharedErrorTooltip: function getSharedErrorTooltip() {
        if (!this.__P_424_7) {
          this.__P_424_7 = new qx.ui.tooltip.ToolTip().set({
            appearance: "tooltip-error",
            rich: true
          });

          this.__P_424_7.setLabel(""); // trigger label widget creation


          this.__P_424_7.syncAppearance();
        }

        return this.__P_424_7;
      },

      /*
      ---------------------------------------------------------------------------
        PROPERTY APPLY ROUTINES
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyCurrent: function _applyCurrent(value, old) {
        // Return if the new tooltip is a child of the old one
        if (old && qx.ui.core.Widget.contains(old, value)) {
          return;
        } // If old tooltip existing, hide it and clear widget binding


        if (old) {
          if (!old.isDisposed()) {
            old.exclude();
          }

          this.__P_424_1.stop();

          this.__P_424_3.stop();
        }

        var Registration = qx.event.Registration;
        var el = document.body; // If new tooltip is not null, set it up and start the timer

        if (value) {
          this.__P_424_1.startWith(value.getShowTimeout()); // Register hide handler


          Registration.addListener(el, "pointerout", this.__P_424_8, this, true);
          Registration.addListener(el, "focusout", this.__P_424_9, this, true);
          Registration.addListener(el, "pointermove", this.__P_424_10, this, true);
        } else {
          // Deregister hide handler
          Registration.removeListener(el, "pointerout", this.__P_424_8, this, true);
          Registration.removeListener(el, "focusout", this.__P_424_9, this, true);
          Registration.removeListener(el, "pointermove", this.__P_424_10, this, true);
        }
      },

      /*
      ---------------------------------------------------------------------------
        TIMER EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event listener for the interval event of the show timer.
       *
       * @param e {qx.event.type.Event} Event object
       */
      __P_424_2: function __P_424_2(e) {
        var current = this.getCurrent();

        if (current && !current.isDisposed()) {
          this.__P_424_3.startWith(current.getHideTimeout());

          if (current.getPlaceMethod() == "widget") {
            current.placeToWidget(current.getOpener());
          } else {
            current.placeToPoint(this.__P_424_5);
          }

          current.show();
        }

        this.__P_424_1.stop();
      },

      /**
       * Event listener for the interval event of the hide timer.
       *
       * @param e {qx.event.type.Event} Event object
       */
      __P_424_4: function __P_424_4(e) {
        var current = this.getCurrent();

        if (current && !current.getAutoHide()) {
          return;
        }

        if (current && !current.isDisposed()) {
          current.exclude();
        }

        this.__P_424_3.stop();

        this.resetCurrent();
      },

      /*
      ---------------------------------------------------------------------------
        POINTER EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Global pointer move event handler
       *
       * @param e {qx.event.type.Pointer} The move pointer event
       */
      __P_424_10: function __P_424_10(e) {
        var pos = this.__P_424_5;
        pos.left = Math.round(e.getDocumentLeft());
        pos.top = Math.round(e.getDocumentTop());
      },

      /**
       * Searches for the tooltip of the target widget. If any tooltip instance
       * is found this instance is bound to the target widget and the tooltip is
       * set as {@link #current}
       *
       * @param e {qx.event.type.Pointer} pointerover event
       */
      __P_424_0: function __P_424_0(e) {
        var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget()); // take first coordinates as backup if no move event will be fired (e.g. touch devices)

        this.__P_424_10(e);

        this.showToolTip(target);
      },

      /**
       * Explicitly show tooltip for particular form item.
       *
       * @param target {Object | null} widget to show tooltip for
       */
      showToolTip: function showToolTip(target) {
        if (!target) {
          return;
        }

        var tooltip, tooltipText, tooltipIcon, invalidMessage; // Search first parent which has a tooltip

        while (target != null) {
          tooltip = target.getToolTip();
          tooltipText = target.getToolTipText() || null;
          tooltipIcon = target.getToolTipIcon() || null;

          if (qx.Class.hasInterface(target.constructor, qx.ui.form.IForm) && !target.isValid()) {
            invalidMessage = target.getInvalidMessage();
          }

          if (tooltip || tooltipText || tooltipIcon || invalidMessage) {
            break;
          }

          target = target.getLayoutParent();
        } //do nothing if


        if (!target //don't have a target
        // tooltip is disabled and the value of showToolTipWhenDisabled is false
        || !target.getEnabled() && !target.isShowToolTipWhenDisabled() //tooltip is blocked
        || target.isBlockToolTip() //an invalid message isn't set and tooltips are disabled
        || !invalidMessage && !this.getShowToolTips() //an invalid message is set and invalid tooltips are disabled
        || invalidMessage && !this.getShowInvalidToolTips()) {
          return;
        }

        if (invalidMessage) {
          tooltip = this.getSharedErrorTooltip().set({
            label: invalidMessage
          });
        }

        if (!tooltip) {
          tooltip = this.getSharedTooltip().set({
            label: tooltipText,
            icon: tooltipIcon
          });
        }

        this.setCurrent(tooltip);
        tooltip.setOpener(target);
      },

      /**
       * Resets the property {@link #current} if there was a
       * tooltip and no new one is created.
       *
       * @param e {qx.event.type.Pointer} pointerout event
       */
      __P_424_8: function __P_424_8(e) {
        var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget());

        if (!target) {
          return;
        }

        var related = qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());

        if (!related && e.getPointerType() == "mouse") {
          return;
        }

        var tooltip = this.getCurrent(); // If there was a tooltip and
        // - the destination target is the current tooltip
        //   or
        // - the current tooltip contains the destination target

        if (tooltip && (related == tooltip || qx.ui.core.Widget.contains(tooltip, related))) {
          return;
        } // If the destination target exists and the target contains it


        if (related && target && qx.ui.core.Widget.contains(target, related)) {
          return;
        }

        if (tooltip && !tooltip.getAutoHide()) {
          return;
        } // If there was a tooltip and there is no new one


        if (tooltip && !related) {
          this.setCurrent(null);
        } else {
          this.resetCurrent();
        }
      },

      /*
      ---------------------------------------------------------------------------
        FOCUS EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Reset the property {@link #current} if the
       * current tooltip is the tooltip of the target widget.
       *
       * @param e {qx.event.type.Focus} blur event
       */
      __P_424_9: function __P_424_9(e) {
        var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget());

        if (!target) {
          return;
        }

        var tooltip = this.getCurrent();

        if (tooltip && !tooltip.getAutoHide()) {
          return;
        } // Only set to null if blurred widget is the
        // one which has created the current tooltip


        if (tooltip && tooltip == target.getToolTip()) {
          this.setCurrent(null);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // Deregister events
      qx.event.Registration.removeListener(document.body, "pointerover", this.__P_424_0, this, true); // Dispose timers

      this._disposeObjects("__P_424_1", "__P_424_3", "__P_424_6");

      this.__P_424_5 = null;
    }
  });
  qx.ui.tooltip.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1642362618498