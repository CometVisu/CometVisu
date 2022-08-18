(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
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
       * Andreas Ecker (ecker)
       * Til Schneider (til132)
       * Jonathan Weiß (jonathan_rass)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Abstract base class for iframe widgets.
   */
  qx.Class.define("qx.ui.embed.AbstractIframe", {
    extend: qx.ui.core.Widget,

    /**
     * @param source {String} URL which should initially set.
     */
    construct: function construct(source) {
      qx.ui.core.Widget.constructor.call(this);

      if (source) {
        this.setSource(source);
      }

      this._getIframeElement().addListener("navigate", this.__P_302_0, this);
    },
    events: {
      /**
       * The "load" event is fired after the iframe content has successfully been loaded.
       */
      "load": "qx.event.type.Event",

      /**
      * The "navigate" event is fired whenever the location of the iframe
      * changes.
      *
      * Useful to track user navigation and internally used to keep the source
      * property in sync. Only works when the destination source is of same
      * origin than the page embedding the iframe.
      */
      "navigate": "qx.event.type.Data"
    },
    properties: {
      /**
       * Source URL of the iframe.
       */
      source: {
        check: "String",
        apply: "_applySource",
        init: "about:blank"
      },

      /**
       * Name of the iframe.
       */
      frameName: {
        check: "String",
        init: "",
        apply: "_applyFrameName"
      }
    },
    members: {
      /**
       * Get the Element wrapper for the iframe
       *
       * @abstract
       * @return {qx.html.Iframe} the iframe element wrapper
       */
      _getIframeElement: function _getIframeElement() {
        throw new Error("Abstract method call");
      },
      // property apply
      _applySource: function _applySource(value, old) {
        this._getIframeElement().setSource(value);
      },
      // property apply
      _applyFrameName: function _applyFrameName(value, old) {
        this._getIframeElement().setAttribute("name", value);
      },

      /**
       * Get the DOM window object of an iframe.
       *
       * @return {Window} The DOM window object of the iframe.
       */
      getWindow: function getWindow() {
        return this._getIframeElement().getWindow();
      },

      /**
       * Get the DOM document object of an iframe.
       *
       * @return {Document} The DOM document object of the iframe.
       */
      getDocument: function getDocument() {
        return this._getIframeElement().getDocument();
      },

      /**
       * Get the HTML body element of the iframe.
       *
       * @return {Element} The DOM node of the <code>body</code> element of the iframe.
       */
      getBody: function getBody() {
        return this._getIframeElement().getBody();
      },

      /**
       * Get the current name.
       *
       * @return {String} The iframe's name.
       */
      getName: function getName() {
        return this._getIframeElement().getName();
      },

      /**
       * Reload the contents of the iframe.
       *
       */
      reload: function reload() {
        this._getIframeElement().reload();
      },

      /**
      * Handle user navigation. Sync actual URL of iframe with source property.
      *
      * @param e {qx.event.type.Data} navigate event
      */
      __P_302_0: function __P_302_0(e) {
        var actualUrl = e.getData();

        if (actualUrl) {
          this.setSource(actualUrl);
        }

        this.fireDataEvent("navigate", actualUrl);
      }
    }
  });
  qx.ui.embed.AbstractIframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractIframe.js.map?dt=1660800167498