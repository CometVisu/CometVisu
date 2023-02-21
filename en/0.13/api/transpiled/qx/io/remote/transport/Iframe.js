(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.transport.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.bom.client.Engine": {
        "construct": true,
        "defer": "load",
        "require": true
      },
      "qx.bom.Iframe": {
        "construct": true
      },
      "qx.bom.element.Style": {
        "construct": true
      },
      "qx.dom.Element": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.dom.Node": {
        "construct": true
      },
      "qx.event.Registration": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.bom.Event": {
        "construct": true,
        "defer": "runtime"
      },
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.Exchange": {
        "defer": "runtime"
      },
      "qx.lang.Json": {},
      "qx.util.ResourceManager": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "construct": true,
          "className": "qx.bom.client.Engine",
          "defer": true
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
       2006 Derrell Lipman
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
       * Andreas Junghans (lucidcake)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */

  /**
   * Transports requests to a server using an IFRAME.
   *
   * This class should not be used directly by client programmers.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @asset(qx/static/blank.gif)
   */
  qx.Class.define("qx.io.remote.transport.Iframe", {
    extend: qx.io.remote.transport.Abstract,
    implement: [qx.core.IDisposable],
    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.io.remote.transport.Abstract.constructor.call(this);

      // Unique identifiers for iframe and form
      var vUniqueId = new Date().valueOf();
      var vFrameName = "frame_" + vUniqueId;
      var vFormName = "form_" + vUniqueId;

      // This is to prevent the "mixed secure and insecure content" warning in IE with https
      var vFrameSource;
      if (qx.core.Environment.get("engine.name") == "mshtml") {
        /* eslint-disable-next-line no-script-url */
        vFrameSource = "javascript:void(0)";
      }

      // Create a hidden iframe.
      // The purpose of the iframe is to receive data coming back from the server (see below).
      this.__P_256_0 = qx.bom.Iframe.create({
        id: vFrameName,
        name: vFrameName,
        src: vFrameSource
      });
      qx.bom.element.Style.set(this.__P_256_0, "display", "none");

      // Create form element with textarea as conduit for request data.
      // The target of the form is the hidden iframe, which means the response
      // coming back from the server is written into the iframe.
      this.__P_256_1 = qx.dom.Element.create("form", {
        id: vFormName,
        name: vFormName,
        target: vFrameName
      });
      qx.bom.element.Style.set(this.__P_256_1, "display", "none");
      qx.dom.Element.insertEnd(this.__P_256_1, qx.dom.Node.getBodyElement(document));
      this.__P_256_2 = qx.dom.Element.create("textarea", {
        id: "_data_",
        name: "_data_"
      });
      qx.dom.Element.insertEnd(this.__P_256_2, this.__P_256_1);

      // Finally, attach iframe to DOM and add listeners
      qx.dom.Element.insertEnd(this.__P_256_0, qx.dom.Node.getBodyElement(document));
      qx.event.Registration.addListener(this.__P_256_0, "load", this._onload, this);

      // qx.event.handler.Iframe does not yet support the readystatechange event
      this.__P_256_3 = qx.lang.Function.listener(this._onreadystatechange, this);
      qx.bom.Event.addNativeListener(this.__P_256_0, "readystatechange", this.__P_256_3);
    },
    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

    statics: {
      /**
       * Capabilities of this transport type.
       *
       * @internal
       */
      handles: {
        synchronous: false,
        asynchronous: true,
        crossDomain: false,
        fileUpload: true,
        programmaticFormFields: true,
        responseTypes: ["text/plain", "text/javascript", "application/json", "application/xml", "text/html"]
      },
      /**
       * Returns always true, because iframe transport is supported by all browsers.
       *
       * @return {Boolean}
       */
      isSupported: function isSupported() {
        return true;
      },
      /*
      ---------------------------------------------------------------------------
        EVENT LISTENER
      ---------------------------------------------------------------------------
      */

      /**
       * For reference:
       * http://msdn.microsoft.com/en-us/library/ie/ms534359%28v=vs.85%29.aspx
       *
       * @internal
       */
      _numericMap: {
        uninitialized: 1,
        loading: 2,
        loaded: 2,
        interactive: 3,
        complete: 4
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_256_2: null,
      __P_256_4: 0,
      __P_256_1: null,
      __P_256_0: null,
      __P_256_3: null,
      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */
      /**
       * Sends a request with the use of a form.
       *
       */
      send: function send() {
        var vMethod = this.getMethod();
        var vUrl = this.getUrl();

        // --------------------------------------
        //   Adding parameters
        // --------------------------------------
        var vParameters = this.getParameters(false);
        var vParametersList = [];
        for (var vId in vParameters) {
          var value = vParameters[vId];
          if (value instanceof Array) {
            for (var i = 0; i < value.length; i++) {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
            }
          } else {
            vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
          }
        }
        if (vParametersList.length > 0) {
          vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + vParametersList.join("&");
        }

        // --------------------------------------------------------
        //   Adding data parameters (if no data is already present)
        // --------------------------------------------------------
        if (this.getData() === null) {
          var vParameters = this.getParameters(true);
          var vParametersList = [];
          for (var vId in vParameters) {
            var value = vParameters[vId];
            if (value instanceof Array) {
              for (var i = 0; i < value.length; i++) {
                vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value[i]));
              }
            } else {
              vParametersList.push(encodeURIComponent(vId) + "=" + encodeURIComponent(value));
            }
          }
          if (vParametersList.length > 0) {
            this.setData(vParametersList.join("&"));
          }
        }

        // --------------------------------------
        //   Adding form fields
        // --------------------------------------
        var vFormFields = this.getFormFields();
        for (var vId in vFormFields) {
          var vField = document.createElement("textarea");
          vField.name = vId;
          vField.appendChild(document.createTextNode(vFormFields[vId]));
          this.__P_256_1.appendChild(vField);
        }

        // --------------------------------------
        //   Preparing form
        // --------------------------------------
        this.__P_256_1.action = vUrl;
        this.__P_256_1.method = vMethod;

        // --------------------------------------
        //   Sending data
        // --------------------------------------
        this.__P_256_2.appendChild(document.createTextNode(this.getData()));
        this.__P_256_1.submit();
        this.setState("sending");
      },
      /**
       * Converting complete state to numeric value and update state property
       *
       * @signature function(e)
       * @param e {qx.event.type.Event} event object
       */
      _onload: qx.event.GlobalError.observeMethod(function (e) {
        // Timing-issue in Opera
        // Do not switch state to complete in case load event fires before content
        // of iframe was updated
        if (qx.core.Environment.get("engine.name") == "opera" && this.getIframeHtmlContent() == "") {
          return;
        }
        if (this.__P_256_1.src) {
          return;
        }
        this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
      }),
      /**
       * Converting named readyState to numeric value and update state property
       *
       * @signature function(e)
       * @param e {qx.event.type.Event} event object
       */
      _onreadystatechange: qx.event.GlobalError.observeMethod(function (e) {
        this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__P_256_0.readyState]);
      }),
      /**
       * Switches the readystate by setting the internal state.
       *
       * @param vReadyState {String} readystate value
       */
      _switchReadyState: function _switchReadyState(vReadyState) {
        // Ignoring already stopped requests
        switch (this.getState()) {
          case "completed":
          case "aborted":
          case "failed":
          case "timeout":
            this.warn("Ignore Ready State Change");
            return;
        }

        // Updating internal state
        while (this.__P_256_4 < vReadyState) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__P_256_4]);
        }
      },
      /*
      ---------------------------------------------------------------------------
        REQUEST HEADER SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Sets a request header with the given value.
       *
       * This method is not implemented at the moment.
       *
       * @param vLabel {String} request header name
       * @param vValue {var} request header value
       */
      setRequestHeader: function setRequestHeader(vLabel, vValue) {},
      /*
      ---------------------------------------------------------------------------
        RESPONSE HEADER SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the value of the given response header.
       *
       * This method is not implemented at the moment and returns always "null".
       *
       * @param vLabel {String} Response header name
       * @return {null} Returns null
       */
      getResponseHeader: function getResponseHeader(vLabel) {
        return null;
      },
      /**
       * Provides an hash of all response headers.
       *
       * This method is not implemented at the moment and returns an empty map.
       *
       * @return {Map} empty map
       */
      getResponseHeaders: function getResponseHeaders() {
        return {};
      },
      /*
      ---------------------------------------------------------------------------
        STATUS SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the current status code of the request if available or -1 if not.
       * This method needs implementation (returns always 200).
       *
       * @return {Integer} status code
       */
      getStatusCode: function getStatusCode() {
        return 200;
      },
      /**
       * Provides the status text for the current request if available and null otherwise.
       * This method needs implementation (returns always an empty string)
       *
       * @return {String} status code text
       */
      getStatusText: function getStatusText() {
        return "";
      },
      /*
      ---------------------------------------------------------------------------
        FRAME UTILITIES
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the DOM window object of the used iframe.
       *
       * @return {Object} DOM window object
       */
      getIframeWindow: function getIframeWindow() {
        return qx.bom.Iframe.getWindow(this.__P_256_0);
      },
      /**
       * Returns the document node of the used iframe.
       *
       * @return {Object} document node
       */
      getIframeDocument: function getIframeDocument() {
        return qx.bom.Iframe.getDocument(this.__P_256_0);
      },
      /**
       * Returns the body node of the used iframe.
       *
       * @return {Object} body node
       */
      getIframeBody: function getIframeBody() {
        return qx.bom.Iframe.getBody(this.__P_256_0);
      },
      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */
      /**
       * Returns the iframe content (innerHTML) as text.
       *
       * @return {String} iframe content as text
       */
      getIframeTextContent: function getIframeTextContent() {
        var vBody = this.getIframeBody();
        if (!vBody) {
          return null;
        }
        if (!vBody.firstChild) {
          return "";
        }

        // Mshtml returns the content inside a PRE
        // element if we use plain text
        if (vBody.firstChild.tagName && vBody.firstChild.tagName.toLowerCase() == "pre") {
          return vBody.firstChild.innerHTML;
        } else {
          return vBody.innerHTML;
        }
      },
      /**
       * Returns the iframe content as HTML.
       *
       * @return {String} iframe content as HTML
       */
      getIframeHtmlContent: function getIframeHtmlContent() {
        var vBody = this.getIframeBody();
        return vBody ? vBody.innerHTML : null;
      },
      /**
       * Returns the length of the content as fetched thus far.
       * This method needs implementation (returns always 0).
       *
       * @return {Integer} Returns 0
       */
      getFetchedLength: function getFetchedLength() {
        return 0;
      },
      /**
       * Returns the content of the response
       *
       * @return {null | String} null or text of the response (=iframe content).
       */
      getResponseContent: function getResponseContent() {
        if (this.getState() !== "completed") {
          return null;
        }
        var vText = this.getIframeTextContent();
        switch (this.getResponseType()) {
          case "text/plain":
            return vText;
          case "text/html":
            vText = this.getIframeHtmlContent();
            return vText;
          case "application/json":
            vText = this.getIframeHtmlContent();
            try {
              return vText && vText.length > 0 ? qx.lang.Json.parse(vText) : null;
            } catch (ex) {
              return this.error("Could not execute json: (" + vText + ")", ex);
            }
          case "text/javascript":
            vText = this.getIframeHtmlContent();
            try {
              return vText && vText.length > 0 ? window.eval(vText) : null;
            } catch (ex) {
              return this.error("Could not execute javascript: (" + vText + ")", ex);
            }
          case "application/xml":
            vText = this.getIframeDocument();
            return vText;
          default:
            this.warn("No valid responseType specified (" + this.getResponseType() + ")!");
            return null;
        }
      }
    },
    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer() {
      // basic registration to qx.io.remote.Exchange
      // the real availability check (activeX stuff and so on) follows at the first real request
      qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe, "qx.io.remote.transport.Iframe");
    },
    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__P_256_0) {
        qx.event.Registration.removeListener(this.__P_256_0, "load", this._onload, this);
        qx.bom.Event.removeNativeListener(this.__P_256_0, "readystatechange", this.__P_256_3);

        // Reset source to a blank image for gecko
        // Otherwise it will switch into a load-without-end behaviour
        if (qx.core.Environment.get("engine.name") == "gecko") {
          this.__P_256_0.src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif");
        }

        // Finally, remove element node
        qx.dom.Element.remove(this.__P_256_0);
      }
      if (this.__P_256_1) {
        qx.dom.Element.remove(this.__P_256_1);
      }
      this.__P_256_0 = this.__P_256_1 = this.__P_256_2 = null;
    }
  });
  qx.io.remote.transport.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1677017703651