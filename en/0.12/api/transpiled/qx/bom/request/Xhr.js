(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
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
      "qx.bom.request.Script": {
        "require": true
      },
      "qx.util.Request": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Transport": {
        "require": true
      }
    },
    "environment": {
      "provided": ["qx.debug.io"],
      "required": {
        "qx.debug.io": {
          "className": "qx.bom.request.Script"
        },
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "io.xhr": {
          "className": "qx.bom.client.Transport"
        },
        "browser.version": {
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /**
   * A wrapper of the XMLHttpRequest host object (or equivalent). The interface is
   * similar to <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
   *
   * Hides browser inconsistencies and works around bugs found in popular
   * implementations.
   *
   * <div class="desktop">
   * Example:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Xhr();
   *  req.onload = function() {
   *    // Handle data received
   *    req.responseText;
   *  }
   *
   *  req.open("GET", url);
   *  req.send();
   * </pre>
   *
   * Example for binary data:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.Xhr();
   *  req.onload = function() {
   *    // Handle data received
   *    var blob = req.response;
   *    img.src = URL.createObjectURL(blob);
   *  }
   *
   *  req.open("GET", url);
   *  req.responseType = "blob";
   *  req.send();
   * </pre>
   
   * </div>
   *
   * @ignore(XDomainRequest)
   * @ignore(qx.event, qx.event.GlobalError.*)
   *
   * @require(qx.bom.request.Xhr#open)
   * @require(qx.bom.request.Xhr#send)
   * @require(qx.bom.request.Xhr#on)
   * @require(qx.bom.request.Xhr#onreadystatechange)
   * @require(qx.bom.request.Xhr#onload)
   * @require(qx.bom.request.Xhr#onloadend)
   * @require(qx.bom.request.Xhr#onerror)
   * @require(qx.bom.request.Xhr#onabort)
   * @require(qx.bom.request.Xhr#ontimeout)
   * @require(qx.bom.request.Xhr#setRequestHeader)
   * @require(qx.bom.request.Xhr#getAllResponseHeaders)
   * @require(qx.bom.request.Xhr#getRequest)
   * @require(qx.bom.request.Xhr#overrideMimeType)
   * @require(qx.bom.request.Xhr#dispose)
   * @require(qx.bom.request.Xhr#isDisposed)
   *
   * @group (IO)
   */
  qx.Bootstrap.define("qx.bom.request.Xhr", {
    extend: Object,
    implement: [qx.core.IDisposable],
    construct: function construct() {
      var boundFunc = qx.Bootstrap.bind(this.__P_125_0, this); // GlobalError shouldn't be included in qx.Website builds so use it
      // if it's available but otherwise ignore it (see ignore stated above).

      if (qx.event && qx.event.GlobalError && qx.event.GlobalError.observeMethod) {
        this.__P_125_1 = qx.event.GlobalError.observeMethod(boundFunc);
      } else {
        this.__P_125_1 = boundFunc;
      }

      this.__P_125_2 = qx.Bootstrap.bind(this.__P_125_3, this);
      this.__P_125_4 = qx.Bootstrap.bind(this.__P_125_5, this);
      this.__P_125_6 = qx.Bootstrap.bind(this.__P_125_7, this);

      this.__P_125_8();

      this._emitter = new qx.event.Emitter(); // BUGFIX: IE
      // IE keeps connections alive unless aborted on unload

      if (window.attachEvent) {
        this.__P_125_9 = qx.Bootstrap.bind(this.__P_125_10, this);
        window.attachEvent("onunload", this.__P_125_9);
      }
    },
    statics: {
      UNSENT: 0,
      OPENED: 1,
      HEADERS_RECEIVED: 2,
      LOADING: 3,
      DONE: 4
    },
    events: {
      /** Fired at ready state changes. */
      "readystatechange": "qx.bom.request.Xhr",

      /** Fired on error. */
      "error": "qx.bom.request.Xhr",

      /** Fired at loadend. */
      "loadend": "qx.bom.request.Xhr",

      /** Fired on timeouts. */
      "timeout": "qx.bom.request.Xhr",

      /** Fired when the request is aborted. */
      "abort": "qx.bom.request.Xhr",

      /** Fired on successful retrieval. */
      "load": "qx.bom.request.Xhr",

      /** Fired on progress. */
      "progress": "qx.bom.request.Xhr"
    },
    members: {
      /*
      ---------------------------------------------------------------------------
        PUBLIC
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Number} Ready state.
       *
       * States can be:
       * UNSENT:           0,
       * OPENED:           1,
       * HEADERS_RECEIVED: 2,
       * LOADING:          3,
       * DONE:             4
       */
      readyState: 0,

      /**
       * @type {String} The response of the request as text.
       */
      responseText: "",

      /**
       * @type {Object} The response of the request as a Document object.
       */
      response: null,

      /**
       * @type {Object} The response of the request as object.
       */
      responseXML: null,

      /**
       * @type {Number} The HTTP status code.
       */
      status: 0,

      /**
       * @type {String} The HTTP status text.
       */
      statusText: "",

      /**
       * @type {String} The response Type to use in the request
       */
      responseType: "",

      /**
       * @type {Number} Timeout limit in milliseconds.
       *
       * 0 (default) means no timeout. Not supported for synchronous requests.
       */
      timeout: 0,

      /**
       * @type {Object} Wrapper to store data of the progress event which contains the keys
         <code>lengthComputable</code>, <code>loaded</code> and <code>total</code>
       */
      progress: null,

      /**
       * Initializes (prepares) request.
       *
       * @ignore(XDomainRequest)
       *
       * @param method {String?"GET"}
       *  The HTTP method to use.
       * @param url {String}
       *  The URL to which to send the request.
       * @param async {Boolean?true}
       *  Whether or not to perform the operation asynchronously.
       * @param user {String?null}
       *  Optional user name to use for authentication purposes.
       * @param password {String?null}
       *  Optional password to use for authentication purposes.
       */
      open: function open(method, url, async, user, password) {
        this.__P_125_11(); // Mimick native behavior


        if (typeof url === "undefined") {
          throw new Error("Not enough arguments");
        } else if (typeof method === "undefined") {
          method = "GET";
        } // Reset flags that may have been set on previous request


        this.__P_125_12 = false;
        this.__P_125_13 = false;
        this.__P_125_14 = false; // Store URL for later checks

        this.__P_125_15 = url;

        if (typeof async == "undefined") {
          async = true;
        }

        this.__P_125_16 = async; // Default values according to spec.

        this.status = 0;
        this.statusText = this.responseText = "";
        this.responseXML = null;
        this.response = null; // BUGFIX
        // IE < 9 and FF < 3.5 cannot reuse the native XHR to issue many requests

        if (!this.__P_125_17() && this.readyState > qx.bom.request.Xhr.UNSENT) {
          // XmlHttpRequest Level 1 requires open() to abort any pending requests
          // associated to the object. Since we're dealing with a new object here,
          // we have to emulate this behavior. Moreover, allow old native XHR to be garbage collected
          //
          // Dispose and abort.
          //
          this.dispose(); // Replace the underlying native XHR with a new one that can
          // be used to issue new requests.

          this.__P_125_8();
        } // Restore handler in case it was removed before


        this.__P_125_18.onreadystatechange = this.__P_125_1;

        try {
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Xhr, "Open native request with method: " + method + ", url: " + url + ", async: " + async);
          }

          this.__P_125_18.open(method, url, async, user, password); // BUGFIX: IE, Firefox < 3.5
          // Some browsers do not support Cross-Origin Resource Sharing (CORS)
          // for XMLHttpRequest. Instead, an exception is thrown even for async requests
          // if URL is cross-origin (as per XHR level 1). Use the proprietary XDomainRequest
          // if available (supports CORS) and handle error (if there is one) this
          // way. Otherwise just assume network error.
          //
          // Basically, this allows to detect network errors.

        } catch (OpenError) {
          // Only work around exceptions caused by cross domain request attempts
          if (!qx.util.Request.isCrossDomain(url)) {
            // Is same origin
            throw OpenError;
          }

          if (!this.__P_125_16) {
            this.__P_125_19 = OpenError;
          }

          if (this.__P_125_16) {
            // Try again with XDomainRequest
            // (Success case not handled on purpose)
            // - IE 9
            if (window.XDomainRequest) {
              this.readyState = 4;
              this.__P_125_18 = new XDomainRequest();
              this.__P_125_18.onerror = qx.Bootstrap.bind(function () {
                this._emit("readystatechange");

                this._emit("error");

                this._emit("loadend");
              }, this);

              if (qx.core.Environment.get("qx.debug.io")) {
                qx.Bootstrap.debug(qx.bom.request.Xhr, "Retry open native request with method: " + method + ", url: " + url + ", async: " + async);
              }

              this.__P_125_18.open(method, url, async, user, password);

              return;
            } // Access denied
            // - IE 6: -2146828218
            // - IE 7: -2147024891
            // - Legacy Firefox


            window.setTimeout(qx.Bootstrap.bind(function () {
              if (this.__P_125_20) {
                return;
              }

              this.readyState = 4;

              this._emit("readystatechange");

              this._emit("error");

              this._emit("loadend");
            }, this));
          }
        } // BUGFIX: IE < 9
        // IE < 9 tends to cache overly aggressive. This may result in stale
        // representations. Force validating freshness of cached representation.


        if (qx.core.Environment.get("engine.name") === "mshtml" && qx.core.Environment.get("browser.documentmode") < 9 && this.__P_125_18.readyState > 0) {
          this.__P_125_18.setRequestHeader("If-Modified-Since", "-1");
        } // BUGFIX: Firefox
        // Firefox < 4 fails to trigger onreadystatechange OPENED for sync requests


        if (qx.core.Environment.get("engine.name") === "gecko" && parseInt(qx.core.Environment.get("engine.version"), 10) < 2 && !this.__P_125_16) {
          // Native XHR is already set to readyState DONE. Fake readyState
          // and call onreadystatechange manually.
          this.readyState = qx.bom.request.Xhr.OPENED;

          this._emit("readystatechange");
        }
      },

      /**
       * Sets an HTTP request header to be used by the request.
       *
       * Note: The request must be initialized before using this method.
       *
       * @param key {String}
       *  The name of the header whose value is to be set.
       * @param value {String}
       *  The value to set as the body of the header.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        this.__P_125_11(); // Detect conditional requests


        if (key == "If-Match" || key == "If-Modified-Since" || key == "If-None-Match" || key == "If-Range") {
          this.__P_125_14 = true;
        }

        this.__P_125_18.setRequestHeader(key, value);

        return this;
      },

      /**
       * Sends request.
       *
       * @param data {String|Document?null}
       *  Optional data to send.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      send: function send(data) {
        this.__P_125_11(); // BUGFIX: IE & Firefox < 3.5
        // For sync requests, some browsers throw error on open()
        // while it should be on send()
        //


        if (!this.__P_125_16 && this.__P_125_19) {
          throw this.__P_125_19;
        } // BUGFIX: Opera
        // On network error, Opera stalls at readyState HEADERS_RECEIVED
        // This violates the spec. See here http://www.w3.org/TR/XMLHttpRequest2/#send
        // (Section: If there is a network error)
        //
        // To fix, assume a default timeout of 10 seconds. Note: The "error"
        // event will be fired correctly, because the error flag is inferred
        // from the statusText property. Of course, compared to other
        // browsers there is an additional call to ontimeout(), but this call
        // should not harm.
        //


        if (qx.core.Environment.get("engine.name") === "opera" && this.timeout === 0) {
          this.timeout = 10000;
        } // Timeout


        if (this.timeout > 0) {
          this.__P_125_21 = window.setTimeout(this.__P_125_6, this.timeout);
        } // BUGFIX: Firefox 2
        // "NS_ERROR_XPC_NOT_ENOUGH_ARGS" when calling send() without arguments


        data = typeof data == "undefined" ? null : data; // Whitelisting the allowed data types regarding the spec
        // -> http://www.w3.org/TR/XMLHttpRequest2/#the-send-method
        // All other data input will be transformed to a string to e.g. prevent
        // an SendError in Firefox (at least <= 31) and to harmonize it with the
        // behaviour of all other browsers (Chrome, IE and Safari)

        var dataType = qx.Bootstrap.getClass(data);
        data = data !== null && this.__P_125_22.indexOf(dataType) === -1 ? data.toString() : data; // Some browsers may throw an error when sending of async request fails.
        // This violates the spec which states only sync requests should.

        try {
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Xhr, "Send native request");
          }

          if (this.__P_125_16) {
            this.__P_125_18.responseType = this.responseType;
          }

          this.__P_125_18.send(data);
        } catch (SendError) {
          if (!this.__P_125_16) {
            throw SendError;
          } // BUGFIX
          // Some browsers throws error when file not found via file:// protocol.
          // Synthesize readyState changes.


          if (this._getProtocol() === "file:") {
            this.readyState = 2;

            this.__P_125_23();

            var that = this;
            window.setTimeout(function () {
              if (that.__P_125_20) {
                return;
              }

              that.readyState = 3;

              that.__P_125_23();

              that.readyState = 4;

              that.__P_125_23();
            });
          }
        } // BUGFIX: Firefox
        // Firefox fails to trigger onreadystatechange DONE for sync requests


        if (qx.core.Environment.get("engine.name") === "gecko" && !this.__P_125_16) {
          // Properties all set, only missing native readystatechange event
          this.__P_125_0();
        } // Set send flag


        this.__P_125_13 = true;
        return this;
      },

      /**
       * Abort request - i.e. cancels any network activity.
       *
       * Note:
       *  On Windows 7 every browser strangely skips the loading phase
       *  when this method is called (because readyState never gets 3).
       *
       *  So keep this in mind if you rely on the phases which are
       *  passed through. They will be "opened", "sent", "abort"
       *  instead of normally "opened", "sent", "loading", "abort".
       *
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      abort: function abort() {
        this.__P_125_11();

        this.__P_125_12 = true;

        this.__P_125_18.abort();

        if (this.__P_125_18 && this.readyState !== qx.bom.request.Xhr.DONE) {
          this.readyState = this.__P_125_18.readyState;
        }

        return this;
      },

      /**
       * Helper to emit events and call the callback methods.
       * @param event {String} The name of the event.
       */
      _emit: function _emit(event) {
        if (this["on" + event]) {
          this["on" + event]();
        }

        this._emitter.emit(event, this);
      },

      /**
       * Event handler for XHR event that fires at every state change.
       *
       * Replace with custom method to get informed about the communication progress.
       */
      onreadystatechange: function onreadystatechange() {},

      /**
       * Event handler for XHR event "load" that is fired on successful retrieval.
       *
       * Note: This handler is called even when the HTTP status indicates an error.
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
      * Event handler for XHR event "progress".
      *
      * Replace with custom method to listen to the "progress" event.
      */
      onprogress: function onprogress() {},

      /**
       * Add an event listener for the given event name.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      on: function on(name, listener, ctx) {
        this._emitter.on(name, listener, ctx);

        return this;
      },

      /**
       * Get a single response header from response.
       *
       * @param header {String}
       *  Key of the header to get the value from.
       * @return {String}
       *  Response header.
       */
      getResponseHeader: function getResponseHeader(header) {
        this.__P_125_11();

        if (qx.core.Environment.get("browser.documentmode") === 9 && this.__P_125_18.aborted) {
          return "";
        }

        return this.__P_125_18.getResponseHeader(header);
      },

      /**
       * Get all response headers from response.
       *
       * @return {String} All response headers.
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        this.__P_125_11();

        if (qx.core.Environment.get("browser.documentmode") === 9 && this.__P_125_18.aborted) {
          return "";
        }

        return this.__P_125_18.getAllResponseHeaders();
      },

      /**
       * Overrides the MIME type returned by the server
       * and must be called before @send()@.
       *
       * Note:
       *
       * * IE doesn't support this method so in this case an Error is thrown.
       * * after calling this method @getResponseHeader("Content-Type")@
       *   may return the original (Firefox 23, IE 10, Safari 6) or
       *   the overridden content type (Chrome 28+, Opera 15+).
       *
       *
       * @param mimeType {String} The mimeType for overriding.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      overrideMimeType: function overrideMimeType(mimeType) {
        this.__P_125_11();

        if (this.__P_125_18.overrideMimeType) {
          this.__P_125_18.overrideMimeType(mimeType);
        } else {
          throw new Error("Native XHR object doesn't support overrideMimeType.");
        }

        return this;
      },

      /**
       * Get wrapped native XMLHttpRequest (or equivalent).
       *
       * Can be XMLHttpRequest or ActiveX.
       *
       * @return {Object} XMLHttpRequest or equivalent.
       */
      getRequest: function getRequest() {
        return this.__P_125_18;
      },

      /*
      ---------------------------------------------------------------------------
        HELPER
      ---------------------------------------------------------------------------
      */

      /**
       * Dispose object and wrapped native XHR.
       * @return {Boolean} <code>true</code> if the object was successfully disposed
       */
      dispose: function dispose() {
        if (this.__P_125_20) {
          return false;
        }

        window.clearTimeout(this.__P_125_21); // Remove unload listener in IE. Aborting on unload is no longer required
        // for this instance.

        if (window.detachEvent) {
          window.detachEvent("onunload", this.__P_125_9);
        } // May fail in IE


        try {
          this.__P_125_18.onreadystatechange;
        } catch (PropertiesNotAccessable) {
          return false;
        } // Clear out listeners


        var noop = function noop() {};

        this.__P_125_18.onreadystatechange = noop;
        this.__P_125_18.onload = noop;
        this.__P_125_18.onerror = noop;
        this.__P_125_18.onprogress = noop; // Abort any network activity

        this.abort(); // Remove reference to native XHR

        this.__P_125_18 = null;
        this.responseText = null;
        this.__P_125_20 = true;
        return true;
      },

      /**
       * Check if the request has already beed disposed.
       * @return {Boolean} <code>true</code>, if the request has been disposed.
       */
      isDisposed: function isDisposed() {
        return !!this.__P_125_20;
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED
      ---------------------------------------------------------------------------
      */

      /**
       * Create XMLHttpRequest (or equivalent).
       *
       * @return {Object} XMLHttpRequest or equivalent.
       *
       * @ignore(XMLHttpRequest)
       */
      _createNativeXhr: function _createNativeXhr() {
        var xhr = qx.core.Environment.get("io.xhr");

        if (xhr === "xhr") {
          return new XMLHttpRequest();
        }

        if (xhr == "activex") {
          return new window.ActiveXObject("Microsoft.XMLHTTP");
        }

        qx.Bootstrap.error(this, "No XHR support available.");
      },

      /**
       * Get protocol of requested URL.
       *
       * @return {String} The used protocol.
       */
      _getProtocol: function _getProtocol() {
        var url = this.__P_125_15;
        var protocolRe = /^(\w+:)\/\//; // Could be http:// from file://

        if (url !== null && url.match) {
          var match = url.match(protocolRe);

          if (match && match[1]) {
            return match[1];
          }
        }

        return window.location.protocol;
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE
      ---------------------------------------------------------------------------
      */

      /**
       * @type {Object} XMLHttpRequest or equivalent.
       */
      __P_125_18: null,

      /**
       * @type {Boolean} Whether request is async.
       */
      __P_125_16: null,

      /**
       * @type {Function} Bound __onNativeReadyStateChange handler.
       */
      __P_125_1: null,

      /**
       * @type {Function} Bound __onNativeAbort handler.
       */
      __P_125_2: null,

      /**
       * @type {Function} Bound __onNativeProgress handler.
       */
      __P_125_4: null,

      /**
       * @type {Function} Bound __onUnload handler.
       */
      __P_125_9: null,

      /**
       * @type {Function} Bound __onTimeout handler.
       */
      __P_125_6: null,

      /**
       * @type {Boolean} Send flag
       */
      __P_125_13: null,

      /**
       * @type {String} Requested URL
       */
      __P_125_15: null,

      /**
       * @type {Boolean} Abort flag
       */
      __P_125_12: null,

      /**
       * @type {Boolean} Timeout flag
       */
      __P_125_24: null,

      /**
       * @type {Boolean} Whether object has been disposed.
       */
      __P_125_20: null,

      /**
       * @type {Number} ID of timeout timer.
       */
      __P_125_21: null,

      /**
       * @type {Error} Error thrown on open, if any.
       */
      __P_125_19: null,

      /**
       * @type {Boolean} Conditional get flag
       */
      __P_125_14: null,

      /**
       * @type {Array} Whitelist with all allowed data types for the request payload
       */
      __P_125_22: null,

      /**
       * Init native XHR.
       */
      __P_125_8: function __P_125_8() {
        // Create native XHR or equivalent and hold reference
        this.__P_125_18 = this._createNativeXhr(); // Track native ready state changes

        this.__P_125_18.onreadystatechange = this.__P_125_1; // Track native abort, when supported

        if (qx.Bootstrap.getClass(this.__P_125_18.onabort) !== "Undefined") {
          this.__P_125_18.onabort = this.__P_125_2;
        } // Track native progress, when supported


        if (qx.Bootstrap.getClass(this.__P_125_18.onprogress) !== "Undefined") {
          this.__P_125_18.onprogress = this.__P_125_4;
          this.progress = {
            lengthComputable: false,
            loaded: 0,
            total: 0
          };
        } // Reset flags


        this.__P_125_20 = this.__P_125_13 = this.__P_125_12 = false; // Initialize data white list

        this.__P_125_22 = ["ArrayBuffer", "Blob", "File", "HTMLDocument", "String", "FormData"];
      },

      /**
       * Track native abort.
       *
       * In case the end user cancels the request by other
       * means than calling abort().
       */
      __P_125_3: function __P_125_3() {
        // When the abort that triggered this method was not a result from
        // calling abort()
        if (!this.__P_125_12) {
          this.abort();
        }
      },

      /**
       * Track native progress event.
       @param e {Event} The native progress event.
       */
      __P_125_5: function __P_125_5(e) {
        this.progress.lengthComputable = e.lengthComputable;
        this.progress.loaded = e.loaded;
        this.progress.total = e.total;

        this._emit("progress");
      },

      /**
       * Handle native onreadystatechange.
       *
       * Calls user-defined function onreadystatechange on each
       * state change and syncs the XHR status properties.
       */
      __P_125_0: function __P_125_0() {
        var nxhr = this.__P_125_18,
            propertiesReadable = true;

        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Xhr, "Received native readyState: " + nxhr.readyState);
        } // BUGFIX: IE, Firefox
        // onreadystatechange() is called twice for readyState OPENED.
        //
        // Call onreadystatechange only when readyState has changed.


        if (this.readyState == nxhr.readyState) {
          return;
        } // Sync current readyState


        this.readyState = nxhr.readyState; // BUGFIX: IE
        // Superfluous onreadystatechange DONE when aborting OPENED
        // without send flag

        if (this.readyState === qx.bom.request.Xhr.DONE && this.__P_125_12 && !this.__P_125_13) {
          return;
        } // BUGFIX: IE
        // IE fires onreadystatechange HEADERS_RECEIVED and LOADING when sync
        //
        // According to spec, only onreadystatechange OPENED and DONE should
        // be fired.


        if (!this.__P_125_16 && (nxhr.readyState == 2 || nxhr.readyState == 3)) {
          return;
        } // Default values according to spec.


        this.status = 0;
        this.statusText = this.responseText = "";
        this.responseXML = null;
        this.response = null;

        if (this.readyState >= qx.bom.request.Xhr.HEADERS_RECEIVED) {
          // In some browsers, XHR properties are not readable
          // while request is in progress.
          try {
            this.status = nxhr.status;
            this.statusText = nxhr.statusText;
            this.response = nxhr.response;

            if (this.responseType === "" || this.responseType === "text") {
              this.responseText = nxhr.responseText;
            }

            if (this.responseType === "" || this.responseType === "document") {
              this.responseXML = nxhr.responseXML;
            }
          } catch (XhrPropertiesNotReadable) {
            propertiesReadable = false;
          }

          if (propertiesReadable) {
            this.__P_125_25();

            this.__P_125_26();
          }
        }

        this.__P_125_23(); // BUGFIX: IE
        // Memory leak in XMLHttpRequest (on-page)


        if (this.readyState == qx.bom.request.Xhr.DONE) {
          // Allow garbage collecting of native XHR
          if (nxhr) {
            nxhr.onreadystatechange = function () {};
          }
        }
      },

      /**
       * Handle readystatechange. Called internally when readyState is changed.
       */
      __P_125_23: function __P_125_23() {
        // Cancel timeout before invoking handlers because they may throw
        if (this.readyState === qx.bom.request.Xhr.DONE) {
          // Request determined DONE. Cancel timeout.
          window.clearTimeout(this.__P_125_21);
        } // Always fire "readystatechange"


        this._emit("readystatechange");

        if (this.readyState === qx.bom.request.Xhr.DONE) {
          this.__P_125_27();
        }
      },

      /**
       * Handle readystatechange. Called internally by
       * {@link #__readyStateChange} when readyState is DONE.
       */
      __P_125_27: function __P_125_27() {
        // Fire "timeout" if timeout flag is set
        if (this.__P_125_24) {
          this._emit("timeout"); // BUGFIX: Opera
          // Since Opera does not fire "error" on network error, fire additional
          // "error" on timeout (may well be related to network error)


          if (qx.core.Environment.get("engine.name") === "opera") {
            this._emit("error");
          }

          this.__P_125_24 = false; // Fire either "abort", "load" or "error"
        } else {
          if (this.__P_125_12) {
            this._emit("abort");
          } else {
            if (this.__P_125_28()) {
              this._emit("error");
            } else {
              this._emit("load");
            }
          }
        } // Always fire "onloadend" when DONE


        this._emit("loadend");
      },

      /**
       * Check for network error.
       *
       * @return {Boolean} Whether a network error occurred.
       */
      __P_125_28: function __P_125_28() {
        var error; // Infer the XHR internal error flag from statusText when not aborted.
        // See http://www.w3.org/TR/XMLHttpRequest2/#error-flag and
        // http://www.w3.org/TR/XMLHttpRequest2/#the-statustext-attribute
        //
        // With file://, statusText is always falsy. Assume network error when
        // response is empty.

        if (this._getProtocol() === "file:") {
          error = !this.responseText;
        } else {
          error = this.status === 0;
        }

        return error;
      },

      /**
       * Handle faked timeout.
       */
      __P_125_7: function __P_125_7() {
        // Basically, mimick http://www.w3.org/TR/XMLHttpRequest2/#timeout-error
        var nxhr = this.__P_125_18;
        this.readyState = qx.bom.request.Xhr.DONE; // Set timeout flag

        this.__P_125_24 = true; // No longer consider request. Abort.

        nxhr.aborted = true;
        nxhr.abort();
        this.responseText = "";
        this.responseXML = null; // Signal readystatechange

        this.__P_125_23();
      },

      /**
       * Normalize status property across browsers.
       */
      __P_125_25: function __P_125_25() {
        var isDone = this.readyState === qx.bom.request.Xhr.DONE; // BUGFIX: Most browsers
        // Most browsers tell status 0 when it should be 200 for local files

        if (this._getProtocol() === "file:" && this.status === 0 && isDone) {
          if (!this.__P_125_28()) {
            this.status = 200;
          }
        } // BUGFIX: IE
        // IE sometimes tells 1223 when it should be 204


        if (this.status === 1223) {
          this.status = 204;
        } // BUGFIX: Opera
        // Opera tells 0 for conditional requests when it should be 304
        //
        // Detect response to conditional request that signals fresh cache.


        if (qx.core.Environment.get("engine.name") === "opera") {
          if (isDone && // Done
          this.__P_125_14 && // Conditional request
          !this.__P_125_12 && // Not aborted
          this.status === 0 // But status 0!
          ) {
              this.status = 304;
            }
        }
      },

      /**
       * Normalize responseXML property across browsers.
       */
      __P_125_26: function __P_125_26() {
        // BUGFIX: IE
        // IE does not recognize +xml extension, resulting in empty responseXML.
        //
        // Check if Content-Type is +xml, verify missing responseXML then parse
        // responseText as XML.
        if (qx.core.Environment.get("engine.name") == "mshtml" && (this.getResponseHeader("Content-Type") || "").match(/[^\/]+\/[^\+]+\+xml/) && this.responseXML && !this.responseXML.documentElement) {
          var dom = new window.ActiveXObject("Microsoft.XMLDOM");
          dom.async = false;
          dom.validateOnParse = false;
          dom.loadXML(this.responseText);
          this.responseXML = dom;
        }
      },

      /**
       * Handler for native unload event.
       */
      __P_125_10: function __P_125_10() {
        try {
          // Abort and dispose
          if (this) {
            this.dispose();
          }
        } catch (e) {}
      },

      /**
       * Helper method to determine whether browser supports reusing the
       * same native XHR to send more requests.
       * @return {Boolean} <code>true</code> if request object reuse is supported
       */
      __P_125_17: function __P_125_17() {
        var name = qx.core.Environment.get("engine.name");
        var version = qx.core.Environment.get("browser.version");
        return !(name == "mshtml" && version < 9 || name == "gecko" && version < 3.5);
      },

      /**
       * Throw when already disposed.
       */
      __P_125_11: function __P_125_11() {
        if (this.__P_125_20) {
          throw new Error("Already disposed");
        }
      }
    },
    defer: function defer() {
      qx.core.Environment.add("qx.debug.io", false);
    }
  });
  qx.bom.request.Xhr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Xhr.js.map?dt=1620144806423