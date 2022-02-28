(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
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
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.remote.Exchange": {
        "defer": "runtime"
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

  /**
   * Transports requests to a server using dynamic script tags.
   *
   * This class should not be used directly by client programmers.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.io.remote.transport.Script", {
    extend: qx.io.remote.transport.Abstract,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.io.remote.transport.Abstract.constructor.call(this);
      var vUniqueId = ++qx.io.remote.transport.Script.__P_226_0;

      if (vUniqueId >= 2000000000) {
        qx.io.remote.transport.Script.__P_226_0 = vUniqueId = 1;
      }

      this.__P_226_1 = null;
      this.__P_226_0 = vUniqueId;
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /**
       * Unique identifier for each instance.
       *
       * @internal
       */
      __P_226_0: 0,

      /**
       * Registry for all script transport instances.
       *
       * @internal
       */
      _instanceRegistry: {},

      /**
       * Internal URL parameter prefix.
       *
       * @internal
       */
      ScriptTransport_PREFIX: "_ScriptTransport_",

      /**
       * Internal URL parameter ID.
       *
       * @internal
       */
      ScriptTransport_ID_PARAM: "_ScriptTransport_id",

      /**
       * Internal URL parameter data prefix.
       *
       * @internal
       */
      ScriptTransport_DATA_PARAM: "_ScriptTransport_data",

      /**
       * Capabilities of this transport type.
       *
       * @internal
       */
      handles: {
        synchronous: false,
        asynchronous: true,
        crossDomain: true,
        fileUpload: false,
        programmaticFormFields: false,
        responseTypes: ["text/plain", "text/javascript", "application/json"]
      },

      /**
       * Returns always true, because script transport is supported by all browsers.
       * @return {Boolean} <code>true</code>
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
        "uninitialized": 1,
        "loading": 2,
        "loaded": 2,
        "interactive": 3,
        "complete": 4
      },

      /**
       * This method can be called by the script loaded by the ScriptTransport
       * class.
       *
       * @signature function(id, content)
       * @param id {String} Id of the corresponding transport object,
       *     which is passed as an URL parameter to the server an
       * @param content {String} This string is passed to the content property
       *     of the {@link qx.io.remote.Response} object.
       */
      _requestFinished: qx.event.GlobalError.observeMethod(function (id, content) {
        var vInstance = qx.io.remote.transport.Script._instanceRegistry[id];

        if (vInstance == null) {} else {
          vInstance._responseContent = content;

          vInstance._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
        }
      })
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_226_2: 0,
      __P_226_1: null,
      __P_226_0: null,

      /*
      ---------------------------------------------------------------------------
        USER METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Sends the request using "script" elements
       *
       */
      send: function send() {
        var vUrl = this.getUrl(); // --------------------------------------
        //   Adding parameters
        // --------------------------------------

        vUrl += (vUrl.indexOf("?") >= 0 ? "&" : "?") + qx.io.remote.transport.Script.ScriptTransport_ID_PARAM + "=" + this.__P_226_0;
        var vParameters = this.getParameters();
        var vParametersList = [];

        for (var vId in vParameters) {
          if (vId.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX) == 0) {
            this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): " + qx.io.remote.transport.Script.ScriptTransport_PREFIX);
          }

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
          vUrl += "&" + vParametersList.join("&");
        } // --------------------------------------
        //   Sending data
        // --------------------------------------


        var vData = this.getData();

        if (vData != null) {
          vUrl += "&" + qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM + "=" + encodeURIComponent(vData);
        }

        qx.io.remote.transport.Script._instanceRegistry[this.__P_226_0] = this;
        this.__P_226_1 = document.createElement("script"); // IE needs this (it ignores the
        // encoding from the header sent by the
        // server for dynamic script tags)

        this.__P_226_1.charset = "utf-8";
        this.__P_226_1.src = vUrl;
        document.body.appendChild(this.__P_226_1);
      },

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
        } // Updating internal state


        while (this.__P_226_2 < vReadyState) {
          this.setState(qx.io.remote.Exchange._nativeMap[++this.__P_226_2]);
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
       * @param vLabel {String} Request header name
       * @param vValue {var} Request header value
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
       * @return {String} always an empty string.
       */
      getStatusText: function getStatusText() {
        return "";
      },

      /*
      ---------------------------------------------------------------------------
        RESPONSE DATA SUPPORT
      ---------------------------------------------------------------------------
      */

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
       * Returns the content of the response.
       *
       * @return {null | String} If successful content of response as string.
       */
      getResponseContent: function getResponseContent() {
        if (this.getState() !== "completed") {
          return null;
        }

        switch (this.getResponseType()) {
          case "text/plain": // server is responsible for using a string as the response

          case "application/json":
          case "text/javascript":
            var ret = this._responseContent;
            return ret === 0 ? 0 : ret || null;

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
      qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script, "qx.io.remote.transport.Script");
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      if (this.__P_226_1) {
        delete qx.io.remote.transport.Script._instanceRegistry[this.__P_226_0];
        document.body.removeChild(this.__P_226_1);
      }

      this.__P_226_1 = this._responseContent = null;
    }
  });
  qx.io.remote.transport.Script.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Script.js.map?dt=1646073045040