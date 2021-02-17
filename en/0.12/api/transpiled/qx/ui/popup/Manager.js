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
      "qx.bom.Element": {
        "construct": true
      },
      "qx.ui.core.Widget": {
        "require": true
      },
      "qx.lang.Array": {}
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
   * This singleton is used to manager multiple instances of popups and their
   * state.
   */
  qx.Class.define("qx.ui.popup.Manager", {
    type: "singleton",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Create data structure, use an array because order matters [BUG #4323]

      this.__P_368_0 = []; // Register pointerdown handler

      qx.event.Registration.addListener(document.documentElement, "pointerdown", this.__P_368_1, this, true); // Hide all popups on window blur

      qx.bom.Element.addListener(window, "blur", this.hideAll, this);
    },
    properties: {
      /**
       * Function that is used to determine if a widget is contained within another one.
       **/
      containsFunction: {
        check: "Function",
        init: qx.ui.core.Widget.contains
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_368_0: null,

      /**
       * Registers a visible popup.
       *
       * @param obj {qx.ui.popup.Popup} The popup to register
       */
      add: function add(obj) {
        this.__P_368_0.push(obj);

        this.__P_368_2();
      },

      /**
       * Removes a popup from the registry
       *
       * @param obj {qx.ui.popup.Popup} The popup which was excluded
       */
      remove: function remove(obj) {
        qx.lang.Array.remove(this.__P_368_0, obj);

        this.__P_368_2();
      },

      /**
       * Excludes all currently open popups,
       * except those with {@link qx.ui.popup.Popup#autoHide} set to false.
       */
      hideAll: function hideAll() {
        var l = this.__P_368_0.length,
            current = {};

        while (l--) {
          current = this.__P_368_0[l];

          if (current.getAutoHide()) {
            current.exclude();
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        INTERNAL HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Updates the zIndex of all registered items to push
       * newly added ones on top of existing ones
       *
       */
      __P_368_2: function __P_368_2() {
        var min = 1e7;

        for (var i = 0; i < this.__P_368_0.length; i++) {
          this.__P_368_0[i].setZIndex(min++);
        }
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Event handler for pointer down events
       *
       * @param e {qx.event.type.Pointer} Pointer event object
       */
      __P_368_1: function __P_368_1(e) {
        // Get the corresponding widget of the target since we are dealing with
        // DOM elements here. This is necessary because we have to be aware of
        // Inline applications which are not covering the whole document and
        // therefore are not able to get all pointer events when only the
        // application root is monitored.
        var target = qx.ui.core.Widget.getWidgetByElement(e.getTarget());
        var reg = this.__P_368_0;

        for (var i = 0; i < reg.length; i++) {
          var obj = reg[i];

          if (!obj.getAutoHide() || target == obj || this.getContainsFunction()(obj, target)) {
            continue;
          }

          obj.exclude();
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      qx.event.Registration.removeListener(document.documentElement, "pointerdown", this.__P_368_1, this, true);

      this._disposeArray("__P_368_0");
    }
  });
  qx.ui.popup.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1613590631095