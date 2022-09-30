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
      "qx.bom.element.Location": {},
      "qx.ui.core.Widget": {}
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
  
  ************************************************************************ */

  /**
   * Each focus root delegates the focus handling to instances of the FocusHandler.
   */
  qx.Class.define("qx.ui.core.FocusHandler", {
    extend: qx.core.Object,
    type: "singleton",

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Create data structure

      this.__P_292_0 = {};
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      /**
       * Activate changing focus with the tab key (default: true)
       */
      useTabNavigation: {
        check: 'Boolean',
        init: true
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_292_0: null,
      __P_292_1: null,
      __P_292_2: null,
      __P_292_3: null,

      /**
       * Connects to a top-level root element (which initially receives
       * all events of the root). This are normally all page and application
       * roots, but no inline roots (they are typically sitting inside
       * another root).
       *
       * @param root {qx.ui.root.Abstract} Any root
       */
      connectTo: function connectTo(root) {
        // this.debug("Connect to: " + root);
        root.addListener("keypress", this.__P_292_4, this);
        root.addListener("focusin", this._onFocusIn, this, true);
        root.addListener("focusout", this._onFocusOut, this, true);
        root.addListener("activate", this._onActivate, this, true);
        root.addListener("deactivate", this._onDeactivate, this, true);
      },

      /**
       * Registers a widget as a focus root. A focus root comes
       * with an separate tab sequence handling.
       *
       * @param widget {qx.ui.core.Widget} The widget to register
       */
      addRoot: function addRoot(widget) {
        // this.debug("Add focusRoot: " + widget);
        this.__P_292_0[widget.toHashCode()] = widget;
      },

      /**
       * Deregisters a previous added widget.
       *
       * @param widget {qx.ui.core.Widget} The widget to deregister
       */
      removeRoot: function removeRoot(widget) {
        // this.debug("Remove focusRoot: " + widget);
        delete this.__P_292_0[widget.toHashCode()];
      },

      /**
       * Get the active widget
       *
       * @return {qx.ui.core.Widget|null} The active widget or <code>null</code>
       *    if no widget is active
       */
      getActiveWidget: function getActiveWidget() {
        return this.__P_292_1;
      },

      /**
       * Whether the given widget is the active one
       *
       * @param widget {qx.ui.core.Widget} The widget to check
       * @return {Boolean} <code>true</code> if the given widget is active
       */
      isActive: function isActive(widget) {
        return this.__P_292_1 == widget;
      },

      /**
       * Get the focused widget
       *
       * @return {qx.ui.core.Widget|null} The focused widget or <code>null</code>
       *    if no widget has the focus
       */
      getFocusedWidget: function getFocusedWidget() {
        return this.__P_292_2;
      },

      /**
       * Whether the given widget is the focused one.
       *
       * @param widget {qx.ui.core.Widget} The widget to check
       * @return {Boolean} <code>true</code> if the given widget is focused
       */
      isFocused: function isFocused(widget) {
        return this.__P_292_2 == widget;
      },

      /**
       * Whether the given widgets acts as a focus root.
       *
       * @param widget {qx.ui.core.Widget} The widget to check
       * @return {Boolean} <code>true</code> if the given widget is a focus root
       */
      isFocusRoot: function isFocusRoot(widget) {
        return !!this.__P_292_0[widget.toHashCode()];
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Internal event handler for activate event.
       *
       * @param e {qx.event.type.Focus} Focus event
       */
      _onActivate: function _onActivate(e) {
        var target = e.getTarget();
        this.__P_292_1 = target; //this.debug("active: " + target);

        var root = this.__P_292_5(target);

        if (root != this.__P_292_3) {
          this.__P_292_3 = root;
        }
      },

      /**
       * Internal event handler for deactivate event.
       *
       * @param e {qx.event.type.Focus} Focus event
       */
      _onDeactivate: function _onDeactivate(e) {
        var target = e.getTarget();

        if (this.__P_292_1 == target) {
          this.__P_292_1 = null;
        }
      },

      /**
       * Internal event handler for focusin event.
       *
       * @param e {qx.event.type.Focus} Focus event
       */
      _onFocusIn: function _onFocusIn(e) {
        var target = e.getTarget();

        if (target != this.__P_292_2) {
          this.__P_292_2 = target;
          target.visualizeFocus();
        }
      },

      /**
       * Internal event handler for focusout event.
       *
       * @param e {qx.event.type.Focus} Focus event
       */
      _onFocusOut: function _onFocusOut(e) {
        var target = e.getTarget();

        if (target == this.__P_292_2) {
          this.__P_292_2 = null;
          target.visualizeBlur();
        }
      },

      /**
       * Internal event handler for TAB key.
       *
       * @param e {qx.event.type.KeySequence} Key event
       */
      __P_292_4: function __P_292_4(e) {
        if (e.getKeyIdentifier() != "Tab" || !this.isUseTabNavigation()) {
          return;
        }

        if (!this.__P_292_3) {
          return;
        } // Stop all key-events with a TAB keycode


        e.stopPropagation();
        e.preventDefault(); // Support shift key to reverse widget detection order

        var current = this.__P_292_2;

        if (!e.isShiftPressed()) {
          var next = current ? this.__P_292_6(current) : this.__P_292_7();
        } else {
          var next = current ? this.__P_292_8(current) : this.__P_292_9();
        } // If there was a widget found, focus it


        if (next) {
          next.tabFocus();
        }
      },

      /*
      ---------------------------------------------------------------------------
        UTILS
      ---------------------------------------------------------------------------
      */

      /**
       * Finds the next focus root, starting with the given widget.
       *
       * @param widget {qx.ui.core.Widget} The widget to find a focus root for.
       * @return {qx.ui.core.Widget|null} The focus root for the given widget or
       * <code>true</code> if no focus root could be found
       */
      __P_292_5: function __P_292_5(widget) {
        var roots = this.__P_292_0;

        while (widget) {
          if (roots[widget.toHashCode()]) {
            return widget;
          }

          widget = widget.getLayoutParent();
        }

        return null;
      },

      /*
      ---------------------------------------------------------------------------
        TAB SUPPORT IMPLEMENTATION
      ---------------------------------------------------------------------------
      */

      /**
       * Compares the order of two widgets
       *
       * @param widget1 {qx.ui.core.Widget} Widget A
       * @param widget2 {qx.ui.core.Widget} Widget B
       * @return {Integer} A sort() compatible integer with values
       *   small than 0, exactly 0 or bigger than 0.
       */
      __P_292_10: function __P_292_10(widget1, widget2) {
        if (widget1 === widget2) {
          return 0;
        } // Sort-Check #1: Tab-Index


        var tab1 = widget1.getTabIndex() || 0;
        var tab2 = widget2.getTabIndex() || 0;

        if (tab1 != tab2) {
          return tab1 - tab2;
        } // Computing location


        var el1 = widget1.getContentElement().getDomElement();
        var el2 = widget2.getContentElement().getDomElement();
        var Location = qx.bom.element.Location;
        var loc1 = Location.get(el1);
        var loc2 = Location.get(el2); // Sort-Check #2: Top-Position

        if (loc1.top != loc2.top) {
          return loc1.top - loc2.top;
        } // Sort-Check #3: Left-Position


        if (loc1.left != loc2.left) {
          return loc1.left - loc2.left;
        } // Sort-Check #4: zIndex


        var z1 = widget1.getZIndex();
        var z2 = widget2.getZIndex();

        if (z1 != z2) {
          return z1 - z2;
        }

        return 0;
      },

      /**
       * Returns the first widget.
       *
       * @return {qx.ui.core.Widget} Returns the first (positioned) widget from
       *    the current root.
       */
      __P_292_7: function __P_292_7() {
        return this.__P_292_11(this.__P_292_3, null);
      },

      /**
       * Returns the last widget.
       *
       * @return {qx.ui.core.Widget} Returns the last (positioned) widget from
       *    the current root.
       */
      __P_292_9: function __P_292_9() {
        return this.__P_292_12(this.__P_292_3, null);
      },

      /**
       * Returns the widget after the given one.
       *
       * @param widget {qx.ui.core.Widget} Widget to start with
       * @return {qx.ui.core.Widget} The found widget.
       */
      __P_292_6: function __P_292_6(widget) {
        var root = this.__P_292_3;

        if (root == widget) {
          return this.__P_292_7();
        }

        while (widget && widget.getAnonymous()) {
          widget = widget.getLayoutParent();
        }

        if (widget == null) {
          return [];
        }

        var result = [];

        this.__P_292_13(root, widget, result);

        result.sort(this.__P_292_10);
        var len = result.length;
        return len > 0 ? result[0] : this.__P_292_7();
      },

      /**
       * Returns the widget before the given one.
       *
       * @param widget {qx.ui.core.Widget} Widget to start with
       * @return {qx.ui.core.Widget} The found widget.
       */
      __P_292_8: function __P_292_8(widget) {
        var root = this.__P_292_3;

        if (root == widget) {
          return this.__P_292_9();
        }

        while (widget && widget.getAnonymous()) {
          widget = widget.getLayoutParent();
        }

        if (widget == null) {
          return [];
        }

        var result = [];

        this.__P_292_14(root, widget, result);

        result.sort(this.__P_292_10);
        var len = result.length;
        return len > 0 ? result[len - 1] : this.__P_292_9();
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL API USED BY METHODS ABOVE
      ---------------------------------------------------------------------------
      */

      /**
       * Collects all widgets which are after the given widget in
       * the given parent widget. Append all found children to the
       * <code>list</code>.
       *
       * @param parent {qx.ui.core.Widget} Parent widget
       * @param widget {qx.ui.core.Widget} Child widget to start with
       * @param result {Array} Result list
       */
      __P_292_13: function __P_292_13(parent, widget, result) {
        var children = parent.getLayoutChildren();
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i]; // Filter spacers etc.

          if (!(child instanceof qx.ui.core.Widget)) {
            continue;
          }

          if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible()) {
            if (child.isTabable() && this.__P_292_10(widget, child) < 0) {
              result.push(child);
            }

            this.__P_292_13(child, widget, result);
          }
        }
      },

      /**
       * Collects all widgets which are before the given widget in
       * the given parent widget. Append all found children to the
       * <code>list</code>.
       *
       * @param parent {qx.ui.core.Widget} Parent widget
       * @param widget {qx.ui.core.Widget} Child widget to start with
       * @param result {Array} Result list
       */
      __P_292_14: function __P_292_14(parent, widget, result) {
        var children = parent.getLayoutChildren();
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i]; // Filter spacers etc.

          if (!(child instanceof qx.ui.core.Widget)) {
            continue;
          }

          if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible()) {
            if (child.isTabable() && this.__P_292_10(widget, child) > 0) {
              result.push(child);
            }

            this.__P_292_14(child, widget, result);
          }
        }
      },

      /**
       * Find first (positioned) widget. (Sorted by coordinates, zIndex, etc.)
       *
       * @param parent {qx.ui.core.Widget} Parent widget
       * @param firstWidget {qx.ui.core.Widget?null} Current first widget
       * @return {qx.ui.core.Widget} The first (positioned) widget
       */
      __P_292_11: function __P_292_11(parent, firstWidget) {
        var children = parent.getLayoutChildren();
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i]; // Filter spacers etc.

          if (!(child instanceof qx.ui.core.Widget)) {
            continue;
          } // Ignore focus roots completely


          if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible()) {
            if (child.isTabable()) {
              if (firstWidget == null || this.__P_292_10(child, firstWidget) < 0) {
                firstWidget = child;
              }
            } // Deep iteration into children hierarchy


            firstWidget = this.__P_292_11(child, firstWidget);
          }
        }

        return firstWidget;
      },

      /**
       * Find last (positioned) widget. (Sorted by coordinates, zIndex, etc.)
       *
       * @param parent {qx.ui.core.Widget} Parent widget
       * @param lastWidget {qx.ui.core.Widget?null} Current last widget
       * @return {qx.ui.core.Widget} The last (positioned) widget
       */
      __P_292_12: function __P_292_12(parent, lastWidget) {
        var children = parent.getLayoutChildren();
        var child;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i]; // Filter spacers etc.

          if (!(child instanceof qx.ui.core.Widget)) {
            continue;
          } // Ignore focus roots completely


          if (!this.isFocusRoot(child) && child.isEnabled() && child.isVisible()) {
            if (child.isTabable()) {
              if (lastWidget == null || this.__P_292_10(child, lastWidget) > 0) {
                lastWidget = child;
              }
            } // Deep iteration into children hierarchy


            lastWidget = this.__P_292_12(child, lastWidget);
          }
        }

        return lastWidget;
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeMap("__P_292_0");

      this.__P_292_2 = this.__P_292_1 = this.__P_292_3 = null;
    }
  });
  qx.ui.core.FocusHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FocusHandler.js.map?dt=1664552174143