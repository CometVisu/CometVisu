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
      "qx.bom.request.Script": {
        "construct": true,
        "require": true
      },
      "qx.util.Uri": {}
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
  qx.Bootstrap.define("qx.bom.request.Jsonp", {
    extend: qx.bom.request.Script,
    construct: function construct() {
      // Borrow super-class constructor
      qx.bom.request.Script.apply(this);

      this.__P_122_0();
    },
    members: {
      /**
       * @type {Object} Parsed JSON response.
       */
      responseJson: null,

      /**
       * @type {Number} Identifier of this instance.
       */
      __P_122_1: null,

      /**
       * @type {String} Callback parameter.
       */
      __P_122_2: null,

      /**
       * @type {String} Callback name.
       */
      __P_122_3: null,

      /**
       * @type {Boolean} Whether callback was called.
       */
      __P_122_4: null,

      /**
       * @type {Boolean} Whether a custom callback was created automatically.
       */
      __P_122_5: null,

      /**
       * @type {String} The generated URL for the current request
       */
      __P_122_6: null,

      /**
       * @type {Boolean} Whether request was disposed.
       */
      __P_122_7: null,

      /** Prefix used for the internal callback name. */
      __P_122_8: "",

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
        if (this.__P_122_7) {
          return;
        }

        var query = {},
            callbackParam,
            callbackName,
            that = this; // Reset properties that may have been set by previous request

        this.responseJson = null;
        this.__P_122_4 = false;
        callbackParam = this.__P_122_2 || "callback";
        callbackName = this.__P_122_3 || this.__P_122_8 + "qx.bom.request.Jsonp." + this.__P_122_1 + ".callback"; // Default callback

        if (!this.__P_122_3) {
          // Store globally available reference to this object
          this.constructor[this.__P_122_1] = this; // Custom callback
        } else {
          // Dynamically create globally available callback (if it does not
          // exist yet) with user defined name. Delegate to this object’s
          // callback method.
          if (!window[this.__P_122_3]) {
            this.__P_122_5 = true;

            window[this.__P_122_3] = function (data) {
              that.callback(data);
            };
          } else {
            if (qx.core.Environment.get("qx.debug.io")) {
              qx.Bootstrap.debug(qx.bom.request.Jsonp, "Callback " + this.__P_122_3 + " already exists");
            }
          }
        }

        if (qx.core.Environment.get("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Jsonp, "Expecting JavaScript response to call: " + callbackName);
        }

        query[callbackParam] = callbackName;
        this.__P_122_6 = url = qx.util.Uri.appendParamsToUrl(url, query);

        this.__P_122_9("open", [method, url]);
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
      callback: function callback(data) {
        if (this.__P_122_7) {
          return;
        } // Signal callback was called


        this.__P_122_4 = true; // Sanitize and parse

        // Set response
        this.responseJson = data; // Delete global reference to this

        this.constructor[this.__P_122_1] = undefined;

        this.__P_122_10();
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
      setCallbackParam: function setCallbackParam(param) {
        this.__P_122_2 = param;
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
      setCallbackName: function setCallbackName(name) {
        this.__P_122_3 = name;
        return this;
      },

      /**
       * Set the prefix used in front of 'qx.' in case 'qx' is not available
       * (for qx.Website e.g.)
       * @internal
       * @param prefix {String} The prefix to put in front of 'qx'
       */
      setPrefix: function setPrefix(prefix) {
        this.__P_122_8 = prefix;
      },

      /**
       * Returns the generated URL for the current / last request
       *
       * @internal
       * @return {String} The current generated URL for the request
       */
      getGeneratedUrl: function getGeneratedUrl() {
        return this.__P_122_6;
      },
      dispose: function dispose() {
        // In case callback was not called
        this.__P_122_10();

        this.__P_122_9("dispose");
      },

      /**
       * Handle native load.
       */
      _onNativeLoad: function _onNativeLoad() {
        // Indicate erroneous status (500) if callback was not called.
        //
        // Why 500? 5xx belongs to the range of server errors. If the callback was
        // not called, it is assumed the server failed to provide an appropriate
        // response. Since the exact reason of the error is unknown, the most
        // generic message ("500 Internal Server Error") is chosen.
        this.status = this.__P_122_4 ? 200 : 500;

        this.__P_122_9("_onNativeLoad");
      },

      /**
       *  Delete custom callback if dynamically created before.
       */
      __P_122_10: function __P_122_10() {
        if (this.__P_122_5 && window[this.__P_122_3]) {
          window[this.__P_122_3] = undefined;
          this.__P_122_5 = false;
        }
      },

      /**
       * Call overridden method.
       *
       * @param method {String} Name of the overridden method.
       * @param args {Array} Arguments.
       */
      __P_122_9: function __P_122_9(method, args) {
        qx.bom.request.Script.prototype[method].apply(this, args || []);
      },

      /**
       * Generate ID.
       */
      __P_122_0: function __P_122_0() {
        // Add random digits to date to allow immediately following requests
        // that may be send at the same time
        this.__P_122_1 = "qx" + new Date().valueOf() + ("" + Math.random()).substring(2, 5);
      }
    }
  });
  qx.bom.request.Jsonp.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsonp.js.map?dt=1643469609058