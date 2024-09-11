(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.jsonrpc.protocol.Notification": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {},
      "qx.Promise": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
        2020 Christian Boulanger
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * A JSON-RPC v2.0 request object
   *
   * @see https://www.jsonrpc.org/specification#request_object
   */
  qx.Class.define("qx.io.jsonrpc.protocol.Request", {
    extend: qx.io.jsonrpc.protocol.Notification,
    statics: {
      /**
       * Static counter for all request ids
       */
      __P_256_0: 0,
      getCurrentId: function getCurrentId() {
        return qx.io.jsonrpc.protocol.Request.__P_256_0;
      },
      resetId: function resetId() {
        qx.io.jsonrpc.protocol.Request.__P_256_0 = 0;
      }
    },
    properties: {
      /**
       * The integer id of the request
       */
      id: {
        check: function check(value) {
          return qx.lang.Type.isNumber(value) && parseInt(value, 10) === value;
        }
      }
    },
    /**
     * JSON-RPC request constructor
     * @param {String} method
     * @param {Array|Object?} params
     * @param {Number?} id
     *    Optional integer id. If not provided, an auto-incremented id will be
     *    used.
     */
    construct: function construct(method, params, id) {
      qx.io.jsonrpc.protocol.Notification.constructor.call(this, method, params);
      if (id === undefined) {
        id = ++qx.io.jsonrpc.protocol.Request.__P_256_0;
      }
      this.set({
        id: id
      });
      this.__P_256_1 = new qx.Promise();
    },
    members: {
      __P_256_1: null,
      /**
       * Getter for promise which resolves with the result to the request
       * @return {qx.Promise}
       */
      getPromise: function getPromise() {
        return this.__P_256_1;
      },
      /**
       * Determines how an exception during transport is handled. Standard
       * behavior is to reject the request's promise with that exception.
       * Classes inheriting from this class might handle it differently, i.e.
       * by allowing the transport to retry after a timeout occurred.
       * @param {qx.io.exception.Transport} exception
       */
      handleTransportException: function handleTransportException(exception) {
        try {
          this.getPromise().reject(exception);
        } catch (e) {
          this.warn("Promise has already been rejected");
        }
      }
    }
  });
  qx.io.jsonrpc.protocol.Request.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Request.js.map?dt=1726089046990