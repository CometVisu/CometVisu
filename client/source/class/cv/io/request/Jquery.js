/**
 * JQuery Wrapper for AJAX request that allows re-sending the request
 *
 * @author tobiasb
 * @since 2017
 *
 * @ignore($)
 * @asset(lib/jquery.js)
 */

qx.Class.define("cv.io.request.Jquery", {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(config) {
    this.__lastRequest = config;
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    requestData: {
      check: "Object",
      init: {},
      apply: "_applyRequestData"
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __lastRequest: null,
    __xhr: null,

    // property apply
    _applyRequestData: function(value) {
      if (!this.__lastRequest) {
        this.__lastRequest["data"] = value;
      }
    },

    removeListener: function(eventName) {
      delete this.__lastRequest[eventName];
    },

    addListener: function(eventName, callback, context) {
      this.__lastRequest[eventName] = callback.bind(context);
    },

    send: function() {
      if (this.__lastRequest) {
        $.ajax(this.__lastRequest);
      } else {
        this.error("no request settings found, skipping");
      }
    },

    /*
    ***********************************************************
      Methods that are forwarded to the native XHR object
    ***********************************************************
    */

    abort: function() {
      if (this.__xhr && this.__xhr.abort) {
        this.__xhr.abort();
      }
    },

    getResponseHeader: function(headerName) {
      if (this.__xhr) {
        return this.__xhr.getResponseHeader(headerName);
      } 
        return null;
    }
  }
});
