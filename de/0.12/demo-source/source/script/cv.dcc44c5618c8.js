/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 *
 * The JSONP data store is a specialization of {@link qx.data.store.Json}. It
 * differs in the type of transport used ({@link qx.io.request.Jsonp}). In
 * order to fulfill requirements of the JSONP service, the method
 * {@link #setCallbackParam} can be used.
 *
 * Please note that the upgrade notices described in {@link qx.data.store.Json}
 * also apply to this class.
 *
 */
qx.Class.define("qx.data.store.Jsonp",
{
  extend : qx.data.store.Json,

  /**
   * @param url {String?} URL of the JSONP service.
   * @param delegate {Object?null} The delegate containing one of the methods
   *   specified in {@link qx.data.store.IStoreDelegate}.
   * @param callbackParam {String?} The name of the callback param. See
   *   {@link qx.bom.request.Jsonp#setCallbackParam} for more details.
   */
  construct : function(url, delegate, callbackParam) {
    if (callbackParam != undefined) {
      this.setCallbackParam(callbackParam);
    }

    this.base(arguments, url, delegate);
  },


  properties : {
    /**
     * The name of the callback parameter of the service. See
     * {@link qx.bom.request.Jsonp#setCallbackParam} for more details.
     */
    callbackParam : {
      check : "String",
      init : "callback",
      nullable : true
    },


    /**
    * The name of the callback function. See
    * {@link qx.bom.request.Jsonp#setCallbackName} for more details.
    *
    * Note: Ignored when legacy transport is used.
    */
    callbackName : {
      check : "String",
      nullable : true
    }
  },


  members :
  {

    // overridden
    _createRequest: function(url) {
      // dispose old request
      if (this._getRequest()) {
        this._getRequest().dispose();
      }

      var req = new qx.io.request.Jsonp();
      this._setRequest(req);

      // default when null
      req.setCallbackParam(this.getCallbackParam());
      req.setCallbackName(this.getCallbackName());

      // send
      req.setUrl(url);

      // register the internal event before the user has the change to
      // register its own event in the delegate
      req.addListener("success", this._onSuccess, this);

      // check for the request configuration hook
      var del = this._delegate;
      if (del && qx.lang.Type.isFunction(del.configureRequest)) {
        this._delegate.configureRequest(req);
      }

      // map request phase to it’s own phase
      req.addListener("changePhase", this._onChangePhase, this);

      // add failed, aborted and timeout listeners
      req.addListener("fail", this._onFail, this);

      req.send();
    }
  }
});
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
 * Query JSONP services using the script element. Requests may be cross-origin.
 *
 * Configuration of the request is done with properties. Events are fired for
 * various states in the life cycle of a request, such as "success". Request
 * data is transparently processed.
 *
 * For an introduction to JSONP, please refer to
 * <a href="http://ajaxian.com/archives/jsonp-json-with-padding">Ajaxian.com</a>.
 *
 * Here is how to request a JSON file from a REST service and listen to
 * the "success" event:
 *
 * <pre class="javascript">
 * var req = new qx.io.request.Jsonp();
 * req.setUrl("http://feeds.delicious.com/v2/json/popular");
 *
 * // Some services have a fixed callback name
 * // req.setCallbackName("callback");
 *
 * req.addListener("success", function(e) {
 *   var req = e.getTarget();
 *
 *   // HTTP status code indicating success, e.g. 200
 *   req.getStatus();
 *
 *   // "success"
 *   req.getPhase();
 *
 *   // JSON response
 *   req.getResponse();
 * }, this);
 *
 * // Send request
 * req.send();
 * </pre>
 *
 * Some noteable features:
 *
 * * Abstraction of low-level request
 * * Convenient setup using properties
 * * Fine-grained events
 * * Symbolic phases
 * * Transparent processing of request data
 * * Stream-lined authentication
 * * Flexible callback handling
 * * Cross-origin requests
 *
 * In order to debug requests, set the environment flag
 * <code>qx.debug.io</code>.
 *
 * Internally uses {@link qx.bom.request.Jsonp}.
 */
qx.Class.define("qx.io.request.Jsonp",
{
  extend: qx.io.request.AbstractRequest,

  events:
  {

    /**
     * Fired when request completes without error and data has been received.
     */
    "success": "qx.event.type.Event",

    /**
     * Fired when request completes without error.
     *
     * Every request receiving a response completes without error. This means
     * that even for responses that do not call the callback, a "load" event
     * is fired. If you are only interested in the JSON data received, consider
     * listening to the {@link #success} event instead.
     */
    "load": "qx.event.type.Event",

    /**
     * Fired when request completes without error but no data was received.
     *
     * The underlying script transport does not know the HTTP status of the
     * response. However, if the callback was not called (no data received)
     * an erroneous status (500) is assigned to the transport’s status
     * property.
     *
     * Note: If you receive an unexpected "statusError", check that the JSONP
     * service accepts arbitrary callback names given as the "callback"
     * parameter. In case the service expects another parameter for the callback
     * name, use {@link #setCallbackParam}. Should the service respond with a
     * hard-coded callback, set a custom callback name with
     * {@link #setCallbackName}.
     */
    "statusError": "qx.event.type.Event"
  },

  properties:
  {
    /**
     * Whether to allow request to be answered from cache.
     *
     * Allowed values:
     *
     * * <code>true</code>: Allow caching (Default)
     * * <code>false</code>: Prohibit caching. Appends nocache parameter to URL.
     */
    cache: {
      check: "Boolean",
      init: true
    }
  },

  members:
  {
    /*
    ---------------------------------------------------------------------------
      CONFIGURE TRANSPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Create JSONP transport.
     *
     * @return {qx.bom.request.Jsonp} Transport.
     */
    _createTransport: function() {
      return new qx.bom.request.Jsonp();
    },

    /**
     * Get configured URL.
     *
     * Append request data to URL. Also append random string
     * to URL if required by value of {@link #cache}.
     *
     * @return {String} The configured URL.
     */
    _getConfiguredUrl: function() {
      var url = this.getUrl(),
          serializedData;

      if (this.getRequestData()) {
        serializedData = this._serializeData(this.getRequestData());
        url = qx.util.Uri.appendParamsToUrl(url, serializedData);
      }

      if (!this.getCache()) {
        // Make sure URL cannot be served from cache and new request is made
        url = qx.util.Uri.appendParamsToUrl(url, {nocache: new Date().valueOf()});
      }

      return url;
    },

    /**
     * Return the transport’s responseJson property.
     *
     * See {@link qx.bom.request.Jsonp}.
     *
     * @return {Object} The parsed response of the request.
     */
    _getParsedResponse: function() {
      return this._transport.responseJson;
    },

    /*
    ---------------------------------------------------------------------------
      CALLBACK MANAGEMENT
    ---------------------------------------------------------------------------
    */

    /**
     * Set callback parameter.
     *
     * See {@link qx.bom.request.Jsonp#setCallbackParam}.
     *
     * @param param {String} Name of the callback parameter.
     */
    setCallbackParam: function(param) {
      this._transport.setCallbackParam(param);
    },

    /**
     * Set callback name.
     *
     * See {@link qx.bom.request.Jsonp#setCallbackName}.
     *
     * @param name {String} Name of the callback function.
     */
    setCallbackName: function(name) {
      this._transport.setCallbackName(name);
    }
  }
});
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
 * A special script loader handling JSONP responses. Automatically
 * provides callbacks and populates responseJson property.
 *
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.Jsonp();
 *
 *  // Some services have a fixed callback name
 *  // req.setCallbackName("callback");
 *
 *  req.onload = function() {
 *    // Handle data received
 *    req.responseJson;
 *  }
 *
 *  req.open("GET", url);
 *  req.send();
 * </pre>
 *
 * @require(qx.bom.request.Script#open)
 * @require(qx.bom.request.Script#on)
 * @require(qx.bom.request.Script#onreadystatechange)
 * @require(qx.bom.request.Script#onload)
 * @require(qx.bom.request.Script#onloadend)
 * @require(qx.bom.request.Script#onerror)
 * @require(qx.bom.request.Script#onabort)
 * @require(qx.bom.request.Script#ontimeout)
 * @require(qx.bom.request.Script#send)
 *
 * @group (IO)
 */
qx.Bootstrap.define("qx.bom.request.Jsonp",
{
  extend : qx.bom.request.Script,

  construct : function()
  {
    // Borrow super-class constructor
    qx.bom.request.Script.apply(this);

    this.__generateId();
  },

  members :
  {
    /**
     * @type {Object} Parsed JSON response.
     */
    responseJson: null,

    /**
     * @type {Number} Identifier of this instance.
     */
    __id: null,

    /**
     * @type {String} Callback parameter.
     */
    __callbackParam: null,

    /**
     * @type {String} Callback name.
     */
    __callbackName: null,

    /**
     * @type {Boolean} Whether callback was called.
     */
    __callbackCalled: null,

    /**
     * @type {Boolean} Whether a custom callback was created automatically.
     */
    __customCallbackCreated: null,

    /**
     * @type {String} The generated URL for the current request
     */
    __generatedUrl: null,

    /**
     * @type {Boolean} Whether request was disposed.
     */
    __disposed: null,

    /** Prefix used for the internal callback name. */
    __prefix : "",

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
    open: function(method, url) {
      if (this.__disposed) {
        return;
      }

      var query = {},
          callbackParam,
          callbackName,
          that = this;

      // Reset properties that may have been set by previous request
      this.responseJson = null;
      this.__callbackCalled = false;

      callbackParam = this.__callbackParam || "callback";
      callbackName = this.__callbackName || this.__prefix +
        "qx.bom.request.Jsonp." + this.__id + ".callback";

      // Default callback
      if (!this.__callbackName) {

        // Store globally available reference to this object
        this.constructor[this.__id] = this;

      // Custom callback
      } else {

        // Dynamically create globally available callback (if it does not
        // exist yet) with user defined name. Delegate to this object’s
        // callback method.
        if (!window[this.__callbackName]) {
          this.__customCallbackCreated = true;
          window[this.__callbackName] = function(data) {
            that.callback(data);
          };
        } else {
          if (qx.core.Environment.get("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Jsonp, "Callback " +
              this.__callbackName + " already exists");
          }
        }

      }

      if (qx.core.Environment.get("qx.debug.io")) {
        qx.Bootstrap.debug(qx.bom.request.Jsonp,
          "Expecting JavaScript response to call: " + callbackName);
      }

      query[callbackParam] = callbackName;
      this.__generatedUrl = url = qx.util.Uri.appendParamsToUrl(url, query);

      this.__callBase("open", [method, url]);
    },

    /**
     * Callback provided for JSONP response to pass data.
     *
     * Called internally to populate responseJson property
     * and indicate successful status.
     *
     * Note: If you write a custom callback you’ll need to call
     * this method in order to notify the request about the data
     * loaded. Writing a custom callback should not be necessary
     * in most cases.
     *
     * @param data {Object} JSON
     */
    callback: function(data) {
      if (this.__disposed) {
        return;
      }

      // Signal callback was called
      this.__callbackCalled = true;

      // Sanitize and parse
      if (qx.core.Environment.get("qx.debug")) {
        data = qx.lang.Json.stringify(data);
        data = qx.lang.Json.parse(data);
      }

      // Set response
      this.responseJson = data;

      // Delete global reference to this
      this.constructor[this.__id] = undefined;

      this.__deleteCustomCallback();
    },

    /**
     * Set callback parameter.
     *
     * Some JSONP services expect the callback name to be passed labeled with a
     * special URL parameter key, e.g. "jsonp" in "?jsonp=myCallback". The
     * default is "callback".
     *
     * @param param {String} Name of the callback parameter.
     * @return {qx.bom.request.Jsonp} Self reference for chaining.
     */
    setCallbackParam: function(param) {
      this.__callbackParam = param;
      return this;
    },


    /**
     * Set callback name.
     *
     * Must be set to the name of the callback function that is called by the
     * script returned from the JSONP service. By default, the callback name
     * references this instance’s {@link #callback} method, allowing to connect
     * multiple JSONP responses to different requests.
     *
     * If the JSONP service allows to set custom callback names, it should not
     * be necessary to change the default. However, some services use a fixed
     * callback name. This is when setting the callbackName is useful. A
     * function is created and made available globally under the given name.
     * The function receives the JSON data and dispatches it to this instance’s
     * {@link #callback} method. Please note that this function is only created
     * if it does not exist before.
     *
     * @param name {String} Name of the callback function.
     * @return {qx.bom.request.Jsonp} Self reference for chaining.
     */
    setCallbackName: function(name) {
      this.__callbackName = name;
      return this;
    },


    /**
     * Set the prefix used in front of 'qx.' in case 'qx' is not available
     * (for qx.Website e.g.)
     * @internal
     * @param prefix {String} The prefix to put in front of 'qx'
     */
    setPrefix : function(prefix) {
      this.__prefix = prefix;
    },


    /**
     * Returns the generated URL for the current / last request
     *
     * @internal
     * @return {String} The current generated URL for the request
     */
    getGeneratedUrl : function() {
      return this.__generatedUrl;
    },


    dispose: function() {
      // In case callback was not called
      this.__deleteCustomCallback();

      this.__callBase("dispose");
    },

    /**
     * Handle native load.
     */
    _onNativeLoad: function() {

      // Indicate erroneous status (500) if callback was not called.
      //
      // Why 500? 5xx belongs to the range of server errors. If the callback was
      // not called, it is assumed the server failed to provide an appropriate
      // response. Since the exact reason of the error is unknown, the most
      // generic message ("500 Internal Server Error") is chosen.
      this.status = this.__callbackCalled ? 200 : 500;

      this.__callBase("_onNativeLoad");
    },

    /**
     *  Delete custom callback if dynamically created before.
     */
    __deleteCustomCallback: function() {
      if (this.__customCallbackCreated && window[this.__callbackName]) {
        window[this.__callbackName] = undefined;
        this.__customCallbackCreated = false;
      }
    },

    /**
     * Call overridden method.
     *
     * @param method {String} Name of the overridden method.
     * @param args {Array} Arguments.
     */
    __callBase: function(method, args) {
      qx.bom.request.Script.prototype[method].apply(this, args || []);
    },

    /**
     * Generate ID.
     */
    __generateId: function() {
      // Add random digits to date to allow immediately following requests
      // that may be send at the same time
      this.__id = "qx" + (new Date().valueOf()) + ("" + Math.random()).substring(2,5);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * This store uses the {@link qx.data.store.Jsonp} store to query Yahoo's
 * YQL service. (http://developer.yahoo.com/yql/)
 *
 * If you want to test your queries, take a look at the YQL console:
 * http://developer.yahoo.com/yql/console/
 */
qx.Class.define("qx.data.store.Yql",
{
  extend : qx.data.store.Jsonp,

  /**
   * @param query {String} The query for YQL.
   * @param delegate {Object?null} The delegate containing one of the methods
   *   specified in {@link qx.data.store.IStoreDelegate}.
   * @param https {Boolean?null} If https should be used.
   */
  construct : function(query, delegate, https)
  {
    var prefix = https ? "https" : "http";
    var url = prefix + "://query.yahooapis.com/v1/public/yql?q=" +
    encodeURIComponent(query) +
    "&format=json&diagnostics=false&" +
    "env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    this.base(arguments, url, delegate, "callback");
  }
});
