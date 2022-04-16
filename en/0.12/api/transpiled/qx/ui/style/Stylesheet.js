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
      "qx.bom.Stylesheet": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Global class which handles the single stylesheet used for qx.desktop.
   */
  qx.Class.define("qx.ui.style.Stylesheet", {
    type: "singleton",
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_398_0 = qx.bom.Stylesheet.createElement();
      this.__P_398_1 = [];
    },
    members: {
      __P_398_1: null,
      __P_398_0: null,

      /**
       * Adds a rule to the global stylesheet.
       * @param selector {String} The CSS selector to add the rule for.
       * @param css {String} The rule's content.
       */
      addRule: function addRule(selector, css) {
        if (this.hasRule(selector)) {
          return;
        }

        qx.bom.Stylesheet.addRule(this.__P_398_0, selector, css);

        this.__P_398_1.push(selector);
      },

      /**
       * Check if a rule exists.
       * @param selector {String} The selector to check.
       * @return {Boolean} <code>true</code> if the rule exists
       */
      hasRule: function hasRule(selector) {
        return this.__P_398_1.indexOf(selector) != -1;
      },

      /**
       * Remove the rule for the given selector.
       * @param selector {String} The selector to identify the rule.
       */
      removeRule: function removeRule(selector) {
        delete this.__P_398_1[this.__P_398_1.indexOf(selector)];
        qx.bom.Stylesheet.removeRule(this.__P_398_0, selector);
      }
    }
  });
  qx.ui.style.Stylesheet.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Stylesheet.js.map?dt=1650122797458