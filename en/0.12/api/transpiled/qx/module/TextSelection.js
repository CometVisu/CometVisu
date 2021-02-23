(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.Selection": {},
      "qxWeb": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
       * Daniel Wagner (danielwagner)
  
  ************************************************************************ */

  /**
   * Text selection manipulation module
   */
  qx.Bootstrap.define("qx.module.TextSelection", {
    statics: {
      /**
       * Checks if the given DOM node is a text input field or textarea
       *
       * @param el {Element} The node to check
       * @return {Boolean} <code>true</code> if the given node is an input field
       *
       * @attach {qxWeb}
       */
      __P_238_0: function __P_238_0(el) {
        var tag = el.tagName ? el.tagName.toLowerCase() : null;
        return tag === "input" || tag === "textarea";
      },

      /**
       * Returns the first text child node of the given element
       *
       * @param el {Element} DOM element
       * @return {Node|null} text node
       *
       * @attach {qxWeb}
       */
      __P_238_1: function __P_238_1(el) {
        for (var i = 0, l = el.childNodes.length; i < l; i++) {
          if (el.childNodes[i].nodeType === 3) {
            return el.childNodes[i];
          }
        }

        return null;
      }
    },
    members: {
      /**
       * Get the text selection of the first element.
       *
       * @return {String|null}
       */
      getTextSelection: function getTextSelection() {
        var el = this[0];

        if (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          return el ? qx.bom.Selection.get(el) : null;
        }

        return null;
      },

      /**
       * Get the length of the text selection of the first element.
       *
       *
       * @return {Integer|null}
       *
       * @attach {qxWeb}
       */
      getTextSelectionLength: function getTextSelectionLength() {
        var el = this[0];

        if (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          return el ? qx.bom.Selection.getLength(el) : null;
        }

        return null;
      },

      /**
       * Get the start of the text selection of the first element.
       *
       * @return {Integer|null}
       *
       * @attach {qxWeb}
       */
      getTextSelectionStart: function getTextSelectionStart() {
        var el = this[0];

        if (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          return el ? qx.bom.Selection.getStart(el) : null;
        }

        return null;
      },

      /**
       * Get the end of the text selection of the first element.
       *
       * @return {Integer|null}
       *
       * @attach {qxWeb}
       */
      getTextSelectionEnd: function getTextSelectionEnd() {
        var el = this[0];

        if (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          return el ? qx.bom.Selection.getEnd(el) : null;
        }

        return null;
      },

      /**
       * Set the text selection of the first element in the collection
       * with the given start and end value.
       * If no end value is passed the selection will extend to the end.
       *
       * @param start {Integer} start of the selection (zero based)
       * @param end {Integer} end of the selection
       * @return {qxWeb} The collection for chaining.
       *
       * @attach {qxWeb}
       */
      setTextSelection: function setTextSelection(start, end) {
        var el = this[0];

        if (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          if (el) {
            qx.bom.Selection.set(el, start, end);
          }
        }

        return this;
      },

      /**
       * Clears the text selection of all elements.
       *
       * @return {qxWeb} The collection for chaining.
       *
       * @attach {qxWeb}
       */
      clearTextSelection: function clearTextSelection() {
        this._forEachElement(function (el) {
          if (!qx.module.TextSelection.__P_238_0(el)) {
            el = qx.module.TextSelection.__P_238_1(el);
          }

          if (el) {
            qx.bom.Selection.clear(el);
          }
        });

        return this;
      }
    },
    defer: function defer(statics) {
      qxWeb.$attachAll(this);
    }
  });
  qx.module.TextSelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextSelection.js.map?dt=1614107135528