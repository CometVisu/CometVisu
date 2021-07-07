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
      "qx.event.Emitter": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.core.ObjectRegistry": {
        "construct": true
      },
      "qx.lang.Type": {},
      "qx.util.Request": {},
      "qx.bom.request.Xhr": {},
      "qx.util.Uri": {},
      "qx.lang.Function": {},
      "qx.util.ResponseParser": {},
      "qx.lang.Json": {},
      "qx.bom.request.Script": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.debug.io": {
          "className": "qx.bom.request.Script"
        }
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
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * This class is internal because it's tailored to {@link qx.io.rest.Resource}
   * which needs more functionality than {@link qx.bom.request.Xhr} provides.
   * The usage of {@link qx.io.request.Xhr} isn't possible either due to it's qx.Class nature.
   *
   * For alternatives to this class have a look at:
   *
   * * "qx.bom.request.Xhr" (low level, cross-browser XHR abstraction compatible with spec)
   * * "qx.io.request.Xhr" (high level XHR abstraction)
   *
   * A wrapper of {@link qx.bom.request.Xhr} which offers:
   *
   * * set/get HTTP method, URL, request data and headers
   * * retrieve the parsed response as object (content-type recognition)
   * * more fine-grained events such as success, fail, ...
   * * supports hash code for request identification
   *
   * It does *not* comply the interface defined by {@link qx.bom.request.IRequest}.
   *
   * <div class="desktop">
   * Example:
   *
   * <pre class="javascript">
   *  var req = new qx.bom.request.SimpleXhr("/some/path/file.json");
   *  req.setRequestData({"a":"b"});
   *  req.once("success", function successHandler() {
   *    var response = req.getResponse();
   *  }, this);
   *  req.once("fail", function successHandler() {
   *    var response = req.getResponse();
   *  }, this);
   *  req.send();
   * </pre>
   * </div>
   *
   * @internal
   */
  qx.Bootstrap.define("qx.bom.request.SimpleXhr", {
    extend: qx.event.Emitter,
    implement: [qx.core.IDisposable],

    /**
     * @param url {String?} The URL of the resource to request.
     * @param method {String?"GET"} The HTTP method.
     */
    construct: function construct(url, method) {
      if (url !== undefined) {
        this.setUrl(url);
      }

      this.useCaching(true);
      this.setMethod(method !== undefined ? method : "GET");
      this._transport = this._registerTransportListener(this._createTransport());
      qx.core.ObjectRegistry.register(this);
      this.__P_124_0 = {};
      this.__P_124_1 = this._createResponseParser();
    },
    members: {
      /*
      ---------------------------------------------------------------------------
        PUBLIC
      ---------------------------------------------------------------------------
      */

      /**
       * Sets a request header.
       *
       * @param key {String} Key of the header.
       * @param value {String} Value of the header.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      setRequestHeader: function setRequestHeader(key, value) {
        this.__P_124_0[key] = value;
        return this;
      },

      /**
       * Gets a request header.
       *
       * @param key {String} Key of the header.
       * @return {String} The value of the header.
       */
      getRequestHeader: function getRequestHeader(key) {
        return this.__P_124_0[key];
      },

      /**
       * Returns a single response header
       *
       * @param header {String} Name of the header to get.
       * @return {String} Response header
       */
      getResponseHeader: function getResponseHeader(header) {
        return this._transport.getResponseHeader(header);
      },

      /**
       * Returns all response headers
       * @return {String} String of response headers
       */
      getAllResponseHeaders: function getAllResponseHeaders() {
        return this._transport.getAllResponseHeaders();
      },

      /**
       * Sets the URL.
       *
       * @param url {String} URL to be requested.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      setUrl: function setUrl(url) {
        if (qx.lang.Type.isString(url)) {
          this.__P_124_2 = url;
        }

        return this;
      },

      /**
       * Gets the URL.
       *
       * @return {String} URL to be requested.
       */
      getUrl: function getUrl() {
        return this.__P_124_2;
      },

      /**
       * Sets the HTTP-Method.
       *
       * @param method {String} The method.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      setMethod: function setMethod(method) {
        if (qx.util.Request.isMethod(method)) {
          this.__P_124_3 = method;
        }

        return this;
      },

      /**
       * Gets the HTTP-Method.
       *
       * @return {String} The method.
       */
      getMethod: function getMethod() {
        return this.__P_124_3;
      },

      /**
       * Sets the request data to be send as part of the request.
       *
       * The request data is transparently included as URL query parameters or embedded in the
       * request body as form data.
       *
       * @param data {String|Object} The request data.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      setRequestData: function setRequestData(data) {
        if (qx.lang.Type.isString(data) || qx.lang.Type.isObject(data) || ["ArrayBuffer", "Blob", "FormData"].indexOf(qx.lang.Type.getClass(data)) !== -1) {
          this.__P_124_4 = data;
        }

        return this;
      },

      /**
       * Gets the request data.
       *
       * @return {String} The request data.
       */
      getRequestData: function getRequestData() {
        return this.__P_124_4;
      },

      /**
       * Gets parsed response.
       *
       * If problems occurred an empty string ("") is more likely to be returned (instead of null).
       *
       * @return {String|null} The parsed response of the request.
       */
      getResponse: function getResponse() {
        if (this.__P_124_5 !== null) {
          return this.__P_124_5;
        } else {
          return this._transport.responseXML !== null ? this._transport.responseXML : this._transport.responseText;
        }

        return null;
      },

      /**
       * Gets low-level transport.
       *
       * Note: To be used with caution!
       *
       * This method can be used to query the transport directly,
       * but should be used with caution. Especially, it
       * is not advisable to call any destructive methods
       * such as <code>open</code> or <code>send</code>.
       *
       * @return {Object} An instance of a class found in
       *  <code>qx.bom.request.*</code>
       */
      // This method mainly exists so that some methods found in the
      // low-level transport can be deliberately omitted here,
      // but still be accessed should it be absolutely necessary.
      //
      // Valid use cases include to query the transport’s responseXML
      // property if performance is critical and any extra parsing
      // should be avoided at all costs.
      //
      getTransport: function getTransport() {
        return this._transport;
      },

      /**
       * Sets (i.e. override) the parser for the response parsing.
       *
       * @see qx.util.ResponseParser#setParser
       *
       * @param parser {String|Function}
       * @return {Function} The parser function
       */
      setParser: function setParser(parser) {
        return this.__P_124_1.setParser(parser);
      },

      /**
       * Sets the timout limit in milliseconds.
       *
       * @param millis {Number} limit in milliseconds.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      setTimeout: function setTimeout(millis) {
        if (qx.lang.Type.isNumber(millis)) {
          this.__P_124_6 = millis;
        }

        return this;
      },

      /**
       * The current timeout in milliseconds.
       *
       * @return {Number} The current timeout in milliseconds.
       */
      getTimeout: function getTimeout() {
        return this.__P_124_6;
      },

      /**
       * Whether to allow request to be answered from cache.
       *
       * Allowed values:
       *
       * * <code>true</code>: Allow caching (Default)
       * * <code>false</code>: Prohibit caching. Appends 'nocache' parameter to URL.
       *
       * Consider setting a Cache-Control header instead. A request’s Cache-Control
       * header may contain a number of directives controlling the behavior of
       * any caches in between client and origin server and allows therefore a more
       * fine grained control over caching. If such a header is provided, the setting
       * of setCache() will be ignored.
       *
       * * <code>"no-cache"</code>: Force caches to submit request in order to
       * validate the freshness of the representation. Note that the requested
       * resource may still be served from cache if the representation is
       * considered fresh. Use this directive to ensure freshness but save
       * bandwidth when possible.
       * * <code>"no-store"</code>: Do not keep a copy of the representation under
       * any conditions.
       *
       * See <a href="http://www.mnot.net/cache_docs/#CACHE-CONTROL">
       * Caching tutorial</a> for an excellent introduction to Caching in general.
       * Refer to the corresponding section in the
       * <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9">
       * HTTP 1.1 specification</a> for more details and advanced directives.
       *
       * It is recommended to choose an appropriate Cache-Control directive rather
       * than prohibit caching using the nocache parameter.
       *
       * @param value {Boolean}
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      useCaching: function useCaching(value) {
        if (qx.lang.Type.isBoolean(value)) {
          this.__P_124_7 = value;
        }

        return this;
      },

      /**
       * Whether requests are cached.
       *
       * @return {Boolean} Whether requests are cached.
       */
      isCaching: function isCaching() {
        return this.__P_124_7;
      },

      /**
       * Whether request completed (is done).
        * @return {Boolean} Whether request is completed.
       */
      isDone: function isDone() {
        return this._transport.readyState === qx.bom.request.Xhr.DONE;
      },

      /**
       * Returns unique hash code of object.
       *
       * @return {Integer} unique hash code of the object
       */
      toHashCode: function toHashCode() {
        return this.$$hash;
      },

      /**
       * Returns true if the object is disposed.
       *
       * @return {Boolean} Whether the object has been disposed
       */
      isDisposed: function isDisposed() {
        return !!this.__P_124_8;
      },

      /**
       * Sends request.
       *
       * Relies on set before:
       * * a HTTP method
       * * an URL
       * * optional request headers
       * * optional request data
       */
      send: function send() {
        var curTimeout = this.getTimeout(),
            hasRequestData = this.getRequestData() !== null,
            hasCacheControlHeader = this.__P_124_0.hasOwnProperty("Cache-Control"),
            isBodyForMethodAllowed = qx.util.Request.methodAllowsRequestBody(this.getMethod()),
            curContentType = this.getRequestHeader("Content-Type"),
            serializedData = this._serializeData(this.getRequestData(), curContentType); // add GET params if needed


        if (this.getMethod() === "GET" && hasRequestData) {
          this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(), serializedData));
        } // cache prevention


        if (this.isCaching() === false && !hasCacheControlHeader) {
          // Make sure URL cannot be served from cache and new request is made
          this.setUrl(qx.util.Uri.appendParamsToUrl(this.getUrl(), {
            nocache: new Date().valueOf()
          }));
        } // set timeout


        if (curTimeout) {
          this._transport.timeout = curTimeout;
        } // initialize request


        this._transport.open(this.getMethod(), this.getUrl(), true); // set all previously stored headers on initialized request


        for (var key in this.__P_124_0) {
          this._transport.setRequestHeader(key, this.__P_124_0[key]);
        } // send


        if (!isBodyForMethodAllowed) {
          // GET & HEAD
          this._transport.send();
        } else {
          // POST & PUT ...
          if (typeof curContentType === "undefined" && ["ArrayBuffer", "Blob", "FormData"].indexOf(qx.Bootstrap.getClass(serializedData)) === -1) {
            // by default, set content-type urlencoded for requests with body
            this._transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          }

          this._transport.send(serializedData);
        }
      },

      /**
       * Aborts request.
       *
       * Cancels any network activity.
       * @return {qx.bom.request.SimpleXhr} Self for chaining.
       */
      abort: function abort() {
        this._transport.abort();

        return this;
      },

      /**
       * Disposes object and wrapped transport.
       * @return {Boolean} <code>true</code> if the object was successfully disposed
       */
      dispose: function dispose() {
        if (this._transport.dispose()) {
          this.__P_124_1 = null;
          this.__P_124_8 = true;
          return true;
        }

        return false;
      },

      /*
      ---------------------------------------------------------------------------
        PROTECTED
      ---------------------------------------------------------------------------
      */

      /**
       * Holds transport.
       */
      _transport: null,

      /**
       * Creates XHR transport.
       *
       * May be overridden to change type of resource.
       * @return {qx.bom.request.IRequest} Transport.
       */
      _createTransport: function _createTransport() {
        return new qx.bom.request.Xhr();
      },

      /**
       * Registers common listeners on given transport.
       *
       * @param transport {qx.bom.request.IRequest} Transport.
       * @return {qx.bom.request.IRequest} Transport.
       */
      _registerTransportListener: function _registerTransportListener(transport) {
        transport.onreadystatechange = qx.lang.Function.bind(this._onReadyStateChange, this);
        transport.onloadend = qx.lang.Function.bind(this._onLoadEnd, this);
        transport.ontimeout = qx.lang.Function.bind(this._onTimeout, this);
        transport.onerror = qx.lang.Function.bind(this._onError, this);
        transport.onabort = qx.lang.Function.bind(this._onAbort, this);
        transport.onprogress = qx.lang.Function.bind(this._onProgress, this);
        return transport;
      },

      /**
       * Creates response parser.
       *
       * @return {qx.util.ResponseParser} parser.
       */
      _createResponseParser: function _createResponseParser() {
        return new qx.util.ResponseParser();
      },

      /**
       * Sets the response.
       *
       * @param response {String} The parsed response of the request.
       */
      _setResponse: function _setResponse(response) {
        this.__P_124_5 = response;
      },

      /**
       * Serializes data.
       *
       * @param data {String|Map} Data to serialize.
       * @param contentType {String?} Content-Type which influences the serialization.
       * @return {String|null} Serialized data.
       */
      _serializeData: function _serializeData(data, contentType) {
        var isPost = this.getMethod() === "POST",
            isJson = /application\/.*\+?json/.test(contentType);

        if (!data) {
          return null;
        }

        if (qx.lang.Type.isString(data)) {
          return data;
        }

        if (isJson && (qx.lang.Type.isObject(data) || qx.lang.Type.isArray(data))) {
          return qx.lang.Json.stringify(data);
        }

        if (qx.lang.Type.isObject(data)) {
          return qx.util.Uri.toParameter(data, isPost);
        }

        if (["ArrayBuffer", "Blob", "FormData"].indexOf(qx.Bootstrap.getClass(data)) !== -1) {
          return data;
        }

        return null;
      },

      /*
      ---------------------------------------------------------------------------
        PRIVATE
      ---------------------------------------------------------------------------
      */

      /**
       * {Array} Request headers.
       */
      __P_124_0: null,

      /**
       * {Object} Request data (i.e. body).
       */
      __P_124_4: null,

      /**
       * {String} HTTP method to use for request.
       */
      __P_124_3: "",

      /**
       * {String} Requested URL.
       */
      __P_124_2: "",

      /**
       * {Object} Response data.
       */
      __P_124_5: null,

      /**
       * {Function} Parser.
       */
      __P_124_1: null,

      /**
       * {Boolean} Whether caching will be enabled.
       */
      __P_124_7: null,

      /**
       * {Number} The current timeout in milliseconds.
       */
      __P_124_6: null,

      /**
       * {Boolean} Whether object has been disposed.
       */
      __P_124_8: null,

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Adds an event listener for the given event name which is executed only once.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      addListenerOnce: function addListenerOnce(name, listener, ctx) {
        this.once(name, listener, ctx);
        return this;
      },

      /**
       * Adds an event listener for the given event name.
       *
       * @param name {String} The name of the event to listen to.
       * @param listener {Function} The function to execute when the event is fired
       * @param ctx {var?} The context of the listener.
       * @return {qx.bom.request.Xhr} Self for chaining.
       */
      addListener: function addListener(name, listener, ctx) {
        this._transport._emitter.on(name, listener, ctx);

        return this;
      },

      /**
       * Handles "readyStateChange" event.
       */
      _onReadyStateChange: function _onReadyStateChange() {
        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug("Fire readyState: " + this._transport.readyState);
        }

        if (this.isDone()) {
          this.__P_124_9();
        }
      },

      /**
       * Called internally when readyState is DONE.
       */
      __P_124_9: function __P_124_9() {
        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug("Request completed with HTTP status: " + this._transport.status);
        }

        var response = this._transport.responseText;

        var contentType = this._transport.getResponseHeader("Content-Type"); // Successful HTTP status


        if (qx.util.Request.isSuccessful(this._transport.status)) {
          // Parse response
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug("Response is of type: '" + contentType + "'");
          }

          this._setResponse(this.__P_124_1.parse(response, contentType));

          this.emit("success"); // Erroneous HTTP status
        } else {
          try {
            this._setResponse(this.__P_124_1.parse(response, contentType));
          } catch (e) {// ignore if it does not work
          } // A remote error failure


          if (this._transport.status !== 0) {
            this.emit("fail");
          }
        }
      },

      /**
       * Handles "loadEnd" event.
       */
      _onLoadEnd: function _onLoadEnd() {
        this.emit("loadEnd");
      },

      /**
       * Handles "abort" event.
       */
      _onAbort: function _onAbort() {
        this.emit("abort");
      },

      /**
       * Handles "timeout" event.
       */
      _onTimeout: function _onTimeout() {
        this.emit("timeout"); // A network error failure

        this.emit("fail");
      },

      /**
       * Handles "error" event.
       */
      _onError: function _onError() {
        this.emit("error"); // A network error failure

        this.emit("fail");
      },

      /**
       * Handles "error" event.
       */
      _onProgress: function _onProgress() {
        this.emit("progress");
      }
    }
  });
  qx.bom.request.SimpleXhr.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SimpleXhr.js.map?dt=1625667776807