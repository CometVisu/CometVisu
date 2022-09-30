(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.element.Style": {},
      "qx.bom.client.Engine": {
        "defer": "load",
        "require": true
      },
      "qx.bom.client.Browser": {
        "defer": "load",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "defer": true,
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "defer": true,
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "defer": true,
          "className": "qx.bom.client.Browser"
        },
        "browser.quirksmode": {
          "defer": true,
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
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
  
  ************************************************************************ */

  /**
   * Contains methods to control and query the element's cursor property
   */
  qx.Bootstrap.define("qx.bom.element.Cursor", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** Internal helper structure to map cursor values to supported ones */
      __P_135_0: {},

      /**
       * Compiles the given cursor into a CSS compatible string.
       *
       * @param cursor {String} Valid CSS cursor name
       * @return {String} CSS string
       */
      compile: function compile(cursor) {
        return "cursor:" + (this.__P_135_0[cursor] || cursor) + ";";
      },

      /**
       * Returns the computed cursor style for the given element.
       *
       * @param element {Element} The element to query
       * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
       *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
       *   The computed mode is the default one.
       * @return {String} Computed cursor value of the given element.
       */
      get: function get(element, mode) {
        return qx.bom.element.Style.get(element, "cursor", mode, false);
      },

      /**
       * Applies a new cursor style to the given element
       *
       * @param element {Element} The element to modify
       * @param value {String} New cursor value to set
       */
      set: function set(element, value) {
        element.style.cursor = this.__P_135_0[value] || value;
      },

      /**
       * Removes the local cursor style applied to the element
       *
       * @param element {Element} The element to modify
       */
      reset: function reset(element) {
        element.style.cursor = "";
      }
    },
    defer: function defer(statics) {
      // < IE 9
      if (qx.core.Environment.get("engine.name") == "mshtml" && (parseFloat(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9) && !qx.core.Environment.get("browser.quirksmode")) {
        statics.__P_135_0["nesw-resize"] = "ne-resize";
        statics.__P_135_0["nwse-resize"] = "nw-resize";
      }
    }
  });
  qx.bom.element.Cursor.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Cursor.js.map?dt=1664560752216