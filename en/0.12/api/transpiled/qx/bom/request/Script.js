(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "construct": true,
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Emitter": {
        "construct": true
      },
      "qx.util.Uri": {},
      "qx.bom.client.Engine": {},
      "qx.bom.client.Browser": {}
    },
    "environment": {
      "provided": ["qx.debug.io"],
      "required": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * Script loader with interface similar to
   * <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
   *
   * The script loader can be used to load scripts from arbitrary sources.
   * <span class="desktop">
   * For JSONP requests, consider the {@link qx.bom.request.Jsonp} transport
   * that derives from the script loader.
   * </span>
   *
   * <div class="desktop">
   * Example:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Script();
   *  req.onload = function() {
   *    // Script is loaded and parsed and
   *    // globals set are available
   *  }
   *
   *  req.open("GET", url);
   *  req.send();
   * </pre>
   * </div>
   *
   * @ignore(qx.core, qx.core.Environment.*)
   * @require(qx.bom.request.Script#_success)
   * @require(qx.bom.request.Script#abort)
   * @require(qx.bom.request.Script#dispose)
   * @require(qx.bom.request.Script#isDisposed)
   * @require(qx.bom.request.Script#getAllResponseHeaders)
   * @require(qx.bom.request.Script#getResponseHeader)
   * @require(qx.bom.request.Script#setDetermineSuccess)
   * @require(qx.bom.request.Script#setRequestHeader)
   *
   * @group (IO)
   */
  qx.Bootstrap.define("qx.bom.request.Script", {
    implement: [qx.core.IDisposable],
    construct: function construct() {
      this.__P_112_0();

      this.__P_112_1 = qx.Bootstrap.bind(this._onNativeLoad, this);
      this.__P_112_2 = qx.Bootstrap.bind(this._onNativeError, this);
      this.__P_112_3 = qx.Bootstrap.bind(this._onTimeout, this);
      this.__P_112_4 = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
      this._emitter = new qx.event.Emitter(); // BUGFIX: Browsers not supporting error handler
      // Set default timeout to capture network errors
      //
      // Note: The script is parsed and executed, before a "load" is fired.

      this.timeout = this.__P_112_5() ? 0 : 15000;
    },
    events: {
      /** Fired at ready state changes. */
      "readystatechange": "qx.bom.request.Script",

      /** Fired on error. */
      "error": "qx.bom.request.Script",

      /** Fired at loadend. */
      "loadend": "qx.bom.request.Script",

      /** Fired on timeouts. */
      "timeout": "qx.bom.request.Script",

      /** Fired when the request is aborted. */
      "abort": "qx.bom.request.Script",

      /** Fired on successful retrieval. */
      "load": "qx.bom.request.Script"
    },
    members: {
      /**
       * @type {Number} Ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * LOADING:          2,
       * LOADING:          3,
       * DONE:             4
       *
       * Contrary to {@link qx.bom.request.Xhr#readyState}, the script transport
       * does not receive response headers. For compatibility, another LOADING
       * state is implemented that replaces the HEADERS_RECEIVED state.
       */
      readyState: null,

      /**
       * @type {Number} The status code.
       *
       * Note: The script transport cannot determine the HTTP status code.
       */
      status: null,

      /**
       * @type {String} The status text.
       *
       * The script transport does not receive response headers. For compatibility,
       * the statusText property is set to the status casted to string.
       */
      statusText: null,

      /**
       * @type {Number} Timeout limit in milliseconds.
       *
       * 0 (default) means no timeout.
       */
      timeout: null,

      /**
       * @type {Function} Function that is executed once the script was loaded.
       */
      __P_112_6: null,

      /**
       * Add an event listener for the given event name.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      on: function on(name, listener, ctx) {
        this._emitter.on(name, listener, ctx);

        return this;
      },

      /**
       * Initializes (prepares) request.
       *
       * @param method {String}
       *   The HTTP method to use.
       *   This parameter exists for compatibility reasons. The script transport
       *   does not support methods other than GET.
       * @param url {String}
       *   The URL to which to send the request.
       */
      open: function open(method, url) {
        if (this.__P_112_7) {
          return;
        } // Reset XHR properties that may have been set by previous request


        this.__P_112_0();

        this.__P_112_8 = null;
        this.__P_112_9 = url;

        if (this.__P_112_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Open native request with url: " + url);
        }

        this._readyStateChange(1);
      },

      /**
       * Appends a query parameter to URL.
       *
       * This method exists for compatibility reasons. The script transport
       * does not support request headers. However, many services parse query
       * parameters like request headers.
       *
       * Note: The request must be initialized before using this method.
       *
       * @param key {String}
       *  The name of the header whose value is to be set.
       * @param value {String}
       *  The value to set as the body of the header.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        if (this.__P_112_7) {
          return null;
        }

        var param = {};

        if (this.readyState !== 1) {
          throw new Error("Invalid state");
        }

        param[key] = value;
        this.__P_112_9 = qx.util.Uri.appendParamsToUrl(this.__P_112_9, param);
        return this;
      },

      /**
       * Sends request.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      send: function send() {
        if (this.__P_112_7) {
          return null;
        }

        var script = this.__P_112_11(),
            head = this.__P_112_4,
            that = this;

        if (this.timeout > 0) {
          this.__P_112_12 = window.setTimeout(this.__P_112_3, this.timeout);
        }

        if (this.__P_112_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Send native request");
        } // Attach script to DOM


        head.insertBefore(script, head.firstChild); // The resource is loaded once the script is in DOM.
        // Assume HEADERS_RECEIVED and LOADING and dispatch async.

        window.setTimeout(function () {
          that._readyStateChange(2);

          that._readyStateChange(3);
        });
        return this;
      },

      /**
       * Aborts request.
       * @return {qx.bom.request.Script} Self for chaining.
       */
      abort: function abort() {
        if (this.__P_112_7) {
          return null;
        }

        this.__P_112_8 = true;

        this.__P_112_13();

        this._emit("abort");

        return this;
      },

      /**
       * Helper to emit events and call the callback methods.
       * @param event {String} The name of the event.
       */
      _emit: function _emit(event) {
        this["on" + event]();

        this._emitter.emit(event, this);
      },

      /**
       * Event handler for an event that fires at every state change.
       *
       * Replace with custom method to get informed about the communication progress.
       */
      onreadystatechange: function onreadystatechange() {},

      /**
       * Event handler for XHR event "load" that is fired on successful retrieval.
       *
       * Note: This handler is called even when an invalid script is returned.
       *
       * Warning: Internet Explorer < 9 receives a false "load" for invalid URLs.
       * This "load" is fired about 2 seconds after sending the request. To
       * distinguish from a real "load", consider defining a custom check
       * function using {@link #setDetermineSuccess} and query the status
       * property. However, the script loaded needs to have a known impact on
       * the global namespace. If this does not work for you, you may be able
       * to set a timeout lower than 2 seconds, depending on script size,
       * complexity and execution time.
       *
       * Replace with custom method to listen to the "load" event.
       */
      onload: function onload() {},

      /**
       * Event handler for XHR event "loadend" that is fired on retrieval.
       *
       * Note: This handler is called even when a network error (or similar)
       * occurred.
       *
       * Replace with custom method to listen to the "loadend" event.
       */
      onloadend: function onloadend() {},

      /**
       * Event handler for XHR event "error" that is fired on a network error.
       *
       * Note: Some browsers do not support the "error" event.
       *
       * Replace with custom method to listen to the "error" event.
       */
      onerror: function onerror() {},

      /**
      * Event handler for XHR event "abort" that is fired when request
      * is aborted.
      *
      * Replace with custom method to listen to the "abort" event.
      */
      onabort: function onabort() {},

      /**
      * Event handler for XHR event "timeout" that is fired when timeout
      * interval has passed.
      *
      * Replace with custom method to listen to the "timeout" event.
      */
      ontimeout: function ontimeout() {},

      /**
       * Get a single response header from response.
       *
       * Note: This method exists for compatibility reasons. The script
       * transport does not receive response headers.
       *
       * @param key {String}
       *  Key of the header to get the value from.
       * @return {String|null} Warning message or <code>null</code> if the request
       * is disposed
       */
      getResponseHeader: function getResponseHeader(key) {
        if (this.__P_112_7) {
          return null;
        }

        if (this.__P_112_10("qx.debug")) {
          qx.Bootstrap.debug("Response header cannot be determined for requests made with script transport.");
        }

        return "unknown";
      },

      /**
       * Get all response headers from response.
       *
       * Note: This method exists for compatibility reasons. The script
       * transport does not receive response headers.
       * @return {String|null} Warning message or <code>null</code> if the request
       * is disposed
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        if (this.__P_112_7) {
          return null;
        }

        if (this.__P_112_10("qx.debug")) {
          qx.Bootstrap.debug("Response headers cannot be determined forrequests made with script transport.");
        }

        return "Unknown response headers";
      },

      /**
       * Determine if loaded script has expected impact on global namespace.
       *
       * The function is called once the script was loaded and must return a
       * boolean indicating if the response is to be considered successful.
       *
       * @param check {Function} Function executed once the script was loaded.
       *
       */
      setDetermineSuccess: function setDetermineSuccess(check) {
        this.__P_112_6 = check;
      },

      /**
       * Dispose object.
       */
      dispose: function dispose() {
        var script = this.__P_112_14;

        if (!this.__P_112_7) {
          // Prevent memory leaks
          if (script) {
            script.onload = script.onreadystatechange = null;

            this.__P_112_13();
          }

          if (this.__P_112_12) {
            window.clearTimeout(this.__P_112_12);
          }

          this.__P_112_7 = true;
        }
      },

      /**
       * Check if the request has already beed disposed.
       * @return {Boolean} <code>true</code>, if the request has been disposed.
       */
      isDisposed: function isDisposed() {
        return !!this.__P_112_7;
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED
      ---------------------------------------------------------------------------
      */

      /**
       * Get URL of request.
       *
       * @return {String} URL of request.
       */
      _getUrl: function _getUrl() {
        return this.__P_112_9;
      },

      /**
       * Get script element used for request.
       *
       * @return {Element} Script element.
       */
      _getScriptElement: function _getScriptElement() {
        return this.__P_112_14;
      },

      /**
       * Handle timeout.
       */
      _onTimeout: function _onTimeout() {
        this.__P_112_15();

        if (!this.__P_112_5()) {
          this._emit("error");
        }

        this._emit("timeout");

        if (!this.__P_112_5()) {
          this._emit("loadend");
        }
      },

      /**
       * Handle native load.
       */
      _onNativeLoad: function _onNativeLoad() {
        var script = this.__P_112_14,
            determineSuccess = this.__P_112_6,
            that = this; // Aborted request must not fire load

        if (this.__P_112_8) {
          return;
        } // BUGFIX: IE < 9
        // When handling "readystatechange" event, skip if readyState
        // does not signal loaded script


        if (this.__P_112_10("engine.name") === "mshtml" && this.__P_112_10("browser.documentmode") < 9) {
          if (!/loaded|complete/.test(script.readyState)) {
            return;
          } else {
            if (this.__P_112_10("qx.debug.io")) {
              qx.Bootstrap.debug(qx.bom.request.Script, "Received native readyState: loaded");
            }
          }
        }

        if (this.__P_112_10("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Received native load");
        } // Determine status by calling user-provided check function


        if (determineSuccess) {
          // Status set before has higher precedence
          if (!this.status) {
            this.status = determineSuccess() ? 200 : 500;
          }
        }

        if (this.status === 500) {
          if (this.__P_112_10("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Script, "Detected error");
          }
        }

        if (this.__P_112_12) {
          window.clearTimeout(this.__P_112_12);
        }

        window.setTimeout(function () {
          that._success();

          that._readyStateChange(4);

          that._emit("load");

          that._emit("loadend");
        });
      },

      /**
       * Handle native error.
       */
      _onNativeError: function _onNativeError() {
        this.__P_112_15();

        this._emit("error");

        this._emit("loadend");
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Element} Script element
       */
      __P_112_14: null,

      /**
       * @type {Element} Head element
       */
      __P_112_4: null,

      /**
       * @type {String} URL
       */
      __P_112_9: "",

      /**
       * @type {Function} Bound _onNativeLoad handler.
       */
      __P_112_1: null,

      /**
       * @type {Function} Bound _onNativeError handler.
       */
      __P_112_2: null,

      /**
       * @type {Function} Bound _onTimeout handler.
       */
      __P_112_3: null,

      /**
       * @type {Number} Timeout timer iD.
       */
      __P_112_12: null,

      /**
       * @type {Boolean} Whether request was aborted.
       */
      __P_112_8: null,

      /**
       * @type {Boolean} Whether request was disposed.
       */
      __P_112_7: null,

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Initialize properties.
       */
      __P_112_0: function __P_112_0() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = "";
      },

      /**
       * Change readyState.
       *
       * @param readyState {Number} The desired readyState
       */
      _readyStateChange: function _readyStateChange(readyState) {
        this.readyState = readyState;

        this._emit("readystatechange");
      },

      /**
       * Handle success.
       */
      _success: function _success() {
        this.__P_112_13();

        this.readyState = 4; // By default, load is considered successful

        if (!this.status) {
          this.status = 200;
        }

        this.statusText = "" + this.status;
      },

      /**
       * Handle failure.
       */
      __P_112_15: function __P_112_15() {
        this.__P_112_13();

        this.readyState = 4;
        this.status = 0;
        this.statusText = null;
      },

      /**
       * Looks up whether browser supports error handler.
       *
       * @return {Boolean} Whether browser supports error handler.
       */
      __P_112_5: function __P_112_5() {
        var isLegacyIe = this.__P_112_10("engine.name") === "mshtml" && this.__P_112_10("browser.documentmode") < 9;
        var isOpera = this.__P_112_10("engine.name") === "opera";
        return !(isLegacyIe || isOpera);
      },

      /**
       * Create and configure script element.
       *
       * @return {Element} Configured script element.
       */
      __P_112_11: function __P_112_11() {
        var script = this.__P_112_14 = document.createElement("script");
        script.src = this.__P_112_9;
        script.onerror = this.__P_112_2;
        script.onload = this.__P_112_1; // BUGFIX: IE < 9
        // Legacy IEs do not fire the "load" event for script elements.
        // Instead, they support the "readystatechange" event

        if (this.__P_112_10("engine.name") === "mshtml" && this.__P_112_10("browser.documentmode") < 9) {
          script.onreadystatechange = this.__P_112_1;
        }

        return script;
      },

      /**
       * Remove script element from DOM.
       */
      __P_112_13: function __P_112_13() {
        var script = this.__P_112_14;

        if (script && script.parentNode) {
          this.__P_112_4.removeChild(script);
        }
      },

      /**
       * Proxy Environment.get to guard against env not being present yet.
       *
       * @param key {String} Environment key.
       * @return {var} Value of the queried environment key
       * @lint environmentNonLiteralKey(key)
       */
      __P_112_10: function __P_112_10(key) {
        if (qx && qx.core && qx.core.Environment) {
          return qx.core.Environment.get(key);
        } else {
          if (key === "engine.name") {
            return qx.bom.client.Engine.getName();
          }

          if (key === "browser.documentmode") {
            return qx.bom.client.Browser.getDocumentMode();
          }

          if (key == "qx.debug.io") {
            return false;
          }

          throw new Error("Unknown environment key at this phase");
        }
      }
    },
    defer: function defer() {
      if (qx && qx.core && qx.core.Environment) {
        qx.core.Environment.add("qx.debug.io", false);
      }
    }
  });
  qx.bom.request.Script.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Script.js.map?dt=1613590611562