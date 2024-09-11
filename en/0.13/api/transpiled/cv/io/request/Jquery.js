(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * JQuery Wrapper for AJAX request that allows re-sending the request
   *
   * @author tobiasb
   * @since 2017
   *
   * @ignore($)
   * @asset(lib/jquery.js)
   */

  qx.Class.define('cv.io.request.Jquery', {
    extend: qx.core.Object,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct(config) {
      this.__P_785_0 = config;
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      requestData: {
        check: 'Object',
        init: {},
        apply: '_applyRequestData'
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_785_0: null,
      __P_785_1: null,
      // property apply
      _applyRequestData: function _applyRequestData(value) {
        if (!this.__P_785_0) {
          this.__P_785_0['data'] = value;
        }
      },
      removeListener: function removeListener(eventName) {
        delete this.__P_785_0[eventName];
      },
      addListener: function addListener(eventName, callback, context) {
        this.__P_785_0[eventName] = callback.bind(context);
      },
      send: function send() {
        if (this.__P_785_0) {
          $.ajax(this.__P_785_0);
        } else {
          this.error('no request settings found, skipping');
        }
      },
      /*
      ***********************************************************
        Methods that are forwarded to the native XHR object
      ***********************************************************
      */
      abort: function abort() {
        if (this.__P_785_1 && this.__P_785_1.abort) {
          this.__P_785_1.abort();
        }
      },
      getResponseHeader: function getResponseHeader(headerName) {
        if (this.__P_785_1) {
          return this.__P_785_1.getResponseHeader(headerName);
        }
        return null;
      }
    }
  });
  cv.io.request.Jquery.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jquery.js.map?dt=1726089089777