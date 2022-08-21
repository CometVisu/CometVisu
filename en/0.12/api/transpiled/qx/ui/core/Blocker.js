(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.theme.manager.Meta": {
        "construct": true
      },
      "qx.theme.manager.Color": {},
      "qx.event.Registration": {},
      "qx.event.handler.Focus": {},
      "qx.ui.core.Widget": {},
      "qx.html.Blocker": {},
      "qx.event.type.Event": {},
      "qx.ui.core.FocusHandler": {}
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
   * This class blocks events and can be included into all widgets.
   *
   * The {@link #block} and {@link #unblock} methods provided by this class can be used
   * to block any event from the widget. When blocked,
   * the blocker widget overlays the widget to block, including the padding area.
   *
   * @ignore(qx.ui.root.Abstract)
   */
  qx.Class.define("qx.ui.core.Blocker", {
    extend: qx.core.Object,
    events: {
      /**
       * Fires after {@link #block} executed.
       */
      blocked: "qx.event.type.Event",

      /**
       * Fires after {@link #unblock} executed.
       */
      unblocked: "qx.event.type.Event"
    },

    /**
     * Creates a blocker for the passed widget.
     *
     * @param widget {qx.ui.core.Widget} Widget which should be added the blocker
     */
    construct: function construct(widget) {
      qx.core.Object.constructor.call(this);
      this._widget = widget;
      widget.addListener("resize", this.__P_269_0, this);
      widget.addListener("move", this.__P_269_0, this);
      widget.addListener("disappear", this.__P_269_1, this);

      if (qx.Class.isDefined("qx.ui.root.Abstract") && widget instanceof qx.ui.root.Abstract) {
        this._isRoot = true;
        this.setKeepBlockerActive(true);
      } // dynamic theme switch


      {
        qx.theme.manager.Meta.getInstance().addListener("changeTheme", this._onChangeTheme, this);
      }
      this.__P_269_2 = [];
      this.__P_269_3 = [];
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Color of the blocker
       */
      color: {
        check: "Color",
        init: null,
        nullable: true,
        apply: "_applyColor",
        themeable: true
      },

      /**
       * Opacity of the blocker
       */
      opacity: {
        check: "Number",
        init: 1,
        apply: "_applyOpacity",
        themeable: true
      },

      /**
       * If this property is enabled, the blocker created with {@link #block}
       * will always stay activated. This means that the blocker then gets all keyboard
       * events, this is useful to block keyboard input on other widgets.
       * Take care that only one blocker instance will be kept active, otherwise your
       * browser will freeze.
       *
       * Setting this property to true is ignored, if the blocker is attached to a
       * widget with a focus handler, as this would mean that the focus handler
       * tries to activate the widget behind the blocker.
       *
       * fixes:
       *     https://github.com/qooxdoo/qooxdoo/issues/9449
       *     https://github.com/qooxdoo/qooxdoo/issues/8104
       */
      keepBlockerActive: {
        check: "Boolean",
        init: false
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_269_4: null,
      __P_269_5: 0,
      __P_269_2: null,
      __P_269_3: null,
      __P_269_6: null,
      _widget: null,
      _isRoot: false,
      __P_269_7: null,

      /**
       * Adjust html element size on layout resizes.
       *
       * @param e {qx.event.type.Data} event object
       */
      __P_269_0: function __P_269_0(e) {
        var data = e.getData();

        if (this.isBlocked()) {
          this._updateBlockerBounds(data);
        }
      },

      /**
       * Widget re-appears: Update blocker size/position and attach to (new) parent
       */
      __P_269_8: function __P_269_8() {
        this._updateBlockerBounds(this._widget.getBounds());

        if (this._widget.isRootWidget()) {
          this._widget.getContentElement().add(this.getBlockerElement());
        } else {
          this._widget.getLayoutParent().getContentElement().add(this.getBlockerElement());
        }
      },

      /**
       * Remove the blocker if the widget disappears
       */
      __P_269_1: function __P_269_1() {
        if (this.isBlocked()) {
          this.getBlockerElement().getParent().remove(this.getBlockerElement());

          this._widget.addListenerOnce("appear", this.__P_269_8, this);
        }
      },

      /**
       * set the blocker's size and position
       * @param bounds {Map} Map with the new width, height, left and top values
       */
      _updateBlockerBounds: function _updateBlockerBounds(bounds) {
        this.getBlockerElement().setStyles({
          width: bounds.width + "px",
          height: bounds.height + "px",
          left: bounds.left + "px",
          top: bounds.top + "px"
        });
      },
      // property apply
      _applyColor: function _applyColor(value, old) {
        var color = qx.theme.manager.Color.getInstance().resolve(value);

        this.__P_269_9("backgroundColor", color);
      },
      // property apply
      _applyOpacity: function _applyOpacity(value, old) {
        this.__P_269_9("opacity", value);
      },

      /**
       * Handler for the theme change.
       * @signature function()
       */
      _onChangeTheme: function _onChangeTheme() {
        this._applyColor(this.getColor());
      },

      /**
       * Set the style to all blockers (blocker and content blocker).
       *
       * @param key {String} The name of the style attribute.
       * @param value {String} The value.
       */
      __P_269_9: function __P_269_9(key, value) {
        var blockers = [];
        this.__P_269_4 && blockers.push(this.__P_269_4);

        for (var i = 0; i < blockers.length; i++) {
          blockers[i].setStyle(key, value);
        }
      },

      /**
       * Backup the current active and focused widget.
       */
      _backupActiveWidget: function _backupActiveWidget() {
        var focusHandler = qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);
        var activeWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getActive());
        var focusedWidget = qx.ui.core.Widget.getWidgetByElement(focusHandler.getFocus());

        this.__P_269_2.push(activeWidget);

        this.__P_269_3.push(focusedWidget);

        if (activeWidget) {
          activeWidget.deactivate();
        }

        if (focusedWidget && focusedWidget.isFocusable()) {
          focusedWidget.blur();
        }
      },

      /**
       * Restore the current active and focused widget.
       */
      _restoreActiveWidget: function _restoreActiveWidget() {
        var widget;
        var focusElementsLength = this.__P_269_3.length;

        if (focusElementsLength > 0) {
          widget = this.__P_269_3.pop();

          if (widget && !widget.isDisposed() && widget.isFocusable()) {
            widget.focus();
          }
        }

        var activeElementsLength = this.__P_269_2.length;

        if (activeElementsLength > 0) {
          widget = this.__P_269_2.pop();

          if (widget && !widget.isDisposed()) {
            widget.activate();
          }
        }
      },

      /**
       * Creates the blocker element.
       *
       * @return {qx.html.Element} The blocker element
       */
      __P_269_10: function __P_269_10() {
        return new qx.html.Blocker(this.getColor(), this.getOpacity());
      },

      /**
       * Get/create the blocker element
       *
       * @param widget {qx.ui.core.Widget} The blocker will be added to this
       * widget's content element
       * @return {qx.html.Element} The blocker element
       */
      getBlockerElement: function getBlockerElement(widget) {
        if (!this.__P_269_4) {
          this.__P_269_4 = this.__P_269_10();

          this.__P_269_4.setStyle("zIndex", 15);

          if (!widget) {
            if (this._isRoot) {
              widget = this._widget;
            } else {
              widget = this._widget.getLayoutParent();
            }
          }

          widget.getContentElement().add(this.__P_269_4);

          this.__P_269_4.exclude();
        }

        return this.__P_269_4;
      },

      /**
       * Block all events from this widget by placing a transparent overlay widget,
       * which receives all events, exactly over the widget.
       */
      block: function block() {
        this._block();
      },

      /**
       * Adds the blocker to the appropriate element and includes it.
       *
       * @param zIndex {Number} All child widgets with a zIndex below this value will be blocked
       * @param blockContent {Boolean} append the blocker to the widget's content if true
       */
      _block: function _block(zIndex, blockContent) {
        if (!this._isRoot && !this._widget.getLayoutParent()) {
          if (!this.__P_269_7) {
            this.__P_269_7 = this._widget.addListenerOnce("appear", this._block.bind(this, zIndex));
          }

          return;
        }

        var parent;

        if (this._isRoot || blockContent) {
          parent = this._widget;
        } else {
          parent = this._widget.getLayoutParent();
        }

        var blocker = this.getBlockerElement(parent);

        if (zIndex != null) {
          blocker.setStyle("zIndex", zIndex);
        }

        this.__P_269_5++;

        if (this.__P_269_5 < 2) {
          this._backupActiveWidget();

          var bounds = this._widget.getBounds(); // no bounds -> widget not yet rendered -> bounds will be set on resize


          if (bounds) {
            this._updateBlockerBounds(bounds);
          }

          blocker.include();

          if (!blockContent) {
            blocker.activate();
          }

          blocker.addListener("deactivate", this.__P_269_11, this);
          blocker.addListener("keypress", this.__P_269_12, this);
          blocker.addListener("keydown", this.__P_269_12, this);
          blocker.addListener("keyup", this.__P_269_12, this);
          this.fireEvent("blocked", qx.event.type.Event);
        }
      },

      /**
       * Returns whether the widget is blocked.
       *
       * @return {Boolean} Whether the widget is blocked.
       */
      isBlocked: function isBlocked() {
        return this.__P_269_5 > 0;
      },

      /**
       * Unblock the widget blocked by {@link #block}, but it takes care of
       * the amount of {@link #block} calls. The blocker is only removed if
       * the number of {@link #unblock} calls is identical to {@link #block} calls.
       */
      unblock: function unblock() {
        if (this.__P_269_7) {
          this._widget.removeListenerById(this.__P_269_7);

          this.__P_269_7 = null;
        }

        if (!this.isBlocked()) {
          return;
        }

        this.__P_269_5--;

        if (this.__P_269_5 < 1) {
          this.__P_269_13();

          this.__P_269_5 = 0;
        }
      },

      /**
       * Unblock the widget blocked by {@link #block}, but it doesn't take care of
       * the amount of {@link #block} calls. The blocker is directly removed.
       */
      forceUnblock: function forceUnblock() {
        if (this.__P_269_7) {
          this._widget.removeListenerById(this.__P_269_7);

          this.__P_269_7 = null;
        }

        if (!this.isBlocked()) {
          return;
        }

        this.__P_269_5 = 0;

        this.__P_269_13();
      },

      /**
       * Unblock the widget blocked by {@link #block}.
       */
      __P_269_13: function __P_269_13() {
        this._restoreActiveWidget();

        var blocker = this.getBlockerElement();
        blocker.removeListener("deactivate", this.__P_269_11, this);
        blocker.removeListener("keypress", this.__P_269_12, this);
        blocker.removeListener("keydown", this.__P_269_12, this);
        blocker.removeListener("keyup", this.__P_269_12, this);
        blocker.exclude();
        this.fireEvent("unblocked", qx.event.type.Event);
      },

      /**
       * Block direct child widgets with a zIndex below <code>zIndex</code>
       *
       * @param zIndex {Integer} All child widgets with a zIndex below this value
       *     will be blocked
       */
      blockContent: function blockContent(zIndex) {
        this._block(zIndex, true);
      },

      /**
       * Stops the passed "Tab" event.
       *
       * @param e {qx.event.type.KeySequence} event to stop.
       */
      __P_269_12: function __P_269_12(e) {
        if (e.getKeyIdentifier() == "Tab") {
          e.stop();
        }
      },

      /**
       * Sets the blocker element to active.
       */
      __P_269_11: function __P_269_11() {
        //
        // If this._widget is attached to the focus handler as a focus root,
        // activating the blocker after this widget was deactivated,
        // leads to the focus handler re-activate the widget behind
        // the blocker, loosing tab handling for this._widget which is
        // visually in front. Hence we prevent activating the
        // blocker in this situation.
        //
        // fixes:
        //  https://github.com/qooxdoo/qooxdoo/issues/9449
        //  https://github.com/qooxdoo/qooxdoo/issues/8104
        //
        if (this.getKeepBlockerActive() && !qx.ui.core.FocusHandler.getInstance().isFocusRoot(this._widget)) {
          this.getBlockerElement().activate();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      // remove dynamic theme listener
      {
        qx.theme.manager.Meta.getInstance().removeListener("changeTheme", this._onChangeTheme, this);
      }

      this._widget.removeListener("resize", this.__P_269_0, this);

      this._widget.removeListener("move", this.__P_269_0, this);

      this._widget.removeListener("appear", this.__P_269_8, this);

      this._widget.removeListener("disappear", this.__P_269_1, this);

      if (this.__P_269_7) {
        this._widget.removeListenerById(this.__P_269_7);
      }

      this._disposeObjects("__P_269_4", "__P_269_6");

      this.__P_269_2 = this.__P_269_3 = this._widget = null;
    }
  });
  qx.ui.core.Blocker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Blocker.js.map?dt=1661116926351