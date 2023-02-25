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
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.Style": {},
      "qx.bom.element.Style": {},
      "qx.bom.Document": {},
      "qx.dom.Node": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
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
   * Contains methods to control and query the element's box-sizing property.
   *
   * Supported values:
   *
   * * "content-box" = W3C model (dimensions are content specific)
   * * "border-box" = Microsoft model (dimensions are box specific incl. border and padding)
   */
  qx.Bootstrap.define("qx.bom.element.BoxSizing", {
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /** @type {Map} Internal data structure for __usesNativeBorderBox() */
      __P_135_0: {
        tags: {
          button: true,
          select: true
        },
        types: {
          search: true,
          button: true,
          submit: true,
          reset: true,
          checkbox: true,
          radio: true
        }
      },
      /**
       * Whether the given elements defaults to the "border-box" Microsoft model in all cases.
       *
       * @param element {Element} DOM element to query
       * @return {Boolean} true when the element uses "border-box" independently from the doctype
       */
      __P_135_1: function __P_135_1(element) {
        var map = this.__P_135_0;
        return map.tags[element.tagName.toLowerCase()] || map.types[element.type];
      },
      /**
       * Compiles the given box sizing into a CSS compatible string.
       *
       * @param value {String} Valid CSS box-sizing value
       * @return {String} CSS string
       */
      compile: function compile(value) {
        if (qx.core.Environment.get("css.boxsizing")) {
          var prop = qx.bom.Style.getCssName(qx.core.Environment.get("css.boxsizing"));
          return prop + ":" + value + ";";
        } else {}
      },
      /**
       * Returns the box sizing for the given element.
       *
       * @param element {Element} The element to query
       * @return {String} Box sizing value of the given element.
       */
      get: function get(element) {
        if (qx.core.Environment.get("css.boxsizing")) {
          return qx.bom.element.Style.get(element, "boxSizing", null, false) || "";
        }
        if (qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(element))) {
          if (!this.__P_135_1(element)) {
            return "content-box";
          }
        }
        return "border-box";
      },
      /**
       * Applies a new box sizing to the given element
       *
       * @param element {Element} The element to modify
       * @param value {String} New box sizing value to set
       */
      set: function set(element, value) {
        if (qx.core.Environment.get("css.boxsizing")) {
          // IE8 bombs when trying to apply an unsupported value
          try {
            element.style[qx.core.Environment.get("css.boxsizing")] = value;
          } catch (ex) {}
        } else {}
      },
      /**
       * Removes the local box sizing applied to the element
       *
       * @param element {Element} The element to modify
       */
      reset: function reset(element) {
        this.set(element, "");
      }
    }
  });
  qx.bom.element.BoxSizing.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BoxSizing.js.map?dt=1677362728004