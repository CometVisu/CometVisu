(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Node": {
        "construct": true,
        "require": true
      },
      "qx.html.Element": {
        "defer": "runtime"
      },
      "qx.util.DeferredCall": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019-2020 Zenesis Limited, https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (https://github.com/johnspackman, john.spackman@zenesis.com)
  
  ************************************************************************ */

  /**
   * DOM representation of Text nodes
   */
  qx.Class.define("qx.html.Text", {
    extend: qx.html.Node,
    /*
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */
    /**
     * Creates a new Text
     *
     * @param value
     *          {String?} the value of the text
     */
    construct: function construct(text) {
      qx.html.Node.constructor.call(this, "#text");
      if (text) {
        this.__P_253_0 = text;
      }
    },
    /*
     * ****************************************************************************
     * MEMBERS
     * ****************************************************************************
     */

    members: {
      __P_253_0: null,
      /*
       * @Override
       */
      _createDomElement: function _createDomElement() {
        return window.document.createTextNode(this.__P_253_0 || "");
      },
      /*
       * @Override
       */
      isRoot: function isRoot() {
        return false;
      },
      /*
       * @Override
       */
      _copyData: function _copyData(fromMarkup, propertiesFromDom) {
        qx.html.Text.superclass.prototype._copyData.call(this, fromMarkup, propertiesFromDom);
        var elem = this._domNode;
        elem.nodeValue = this.__P_253_0 || "";
      },
      /*
       * @Override
       */
      _useNodeImpl: function _useNodeImpl(domNode) {
        this.setText(domNode.nodeValue);
      },
      /**
       * @Override
       */
      _syncData: function _syncData() {
        qx.html.Text.superclass.prototype._syncData.call(this);
        var elem = this._domNode;
        elem.nodeValue = this.__P_253_0 || "";
      },
      /*
       * @Override
       */
      _serializeImpl: function _serializeImpl(serializer) {
        serializer.rawTextInBody(this.__P_253_0);
      },
      /**
       * @Override
       */
      useMarkup: function useMarkup(html) {
        throw new Error("Could not overwrite existing text node!");
      },
      /**
       * Sets the text value
       *
       * @param value {String?} the text value of for the text node
       * @param direct {Boolean?} whether to set the DOM node immediately if there is one
       */
      setText: function setText(value, direct) {
        this.__P_253_0 = value;
        if (direct && this._domNode) {
          this._domNode.nodeValue = value;
        } else {
          qx.html.Element._modified[this.$$hash] = this;
          qx.html.Element._scheduleFlush("element");
        }
      },
      /**
       * Returns the value of the node
       *
       * @return {String} the text node
       */
      getText: function getText() {
        return this.__P_253_0;
      }
    },
    /*
     * ****************************************************************************
     * DEFER
     * ****************************************************************************
     */
    defer: function defer(statics) {
      statics.__P_253_1 = new qx.util.DeferredCall(statics.flush, statics);
    },
    /*
     * ****************************************************************************
     * DESTRUCT
     * ****************************************************************************
     */
    destruct: function destruct() {
      if (this.toHashCode()) {
        delete qx.html.Element._modified[this.toHashCode()];
        delete qx.html.Element._scroll[this.toHashCode()];
      }
      this.__P_253_2 = this.__P_253_3 = this.__P_253_4 = this.__P_253_5 = this.__P_253_6 = this.__P_253_7 = this.__P_253_8 = null;
    }
  });
  qx.html.Text.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Text.js.map?dt=1722153819661