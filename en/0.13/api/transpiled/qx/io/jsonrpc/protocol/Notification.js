(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.jsonrpc.protocol.Message": {
        "construct": true,
        "require": true
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
   * A JSON-RPC v2.0 notification object
   * @see https://www.jsonrpc.org/specification#request_object
   */
  qx.Class.define("qx.io.jsonrpc.protocol.Notification", {
    extend: qx.io.jsonrpc.protocol.Message,
    properties: {
      method: {
        check: "String",
        nullable: false
      },
      params: {
        check: "Object",
        nullable: true,
        init: null
      }
    },
    /**
     * Notification constructor
     * @param {String} method
     * @param {Object?} params
     */
    construct: function construct(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      qx.io.jsonrpc.protocol.Message.constructor.call(this);
      this.set({
        method: method,
        params: params
      });
    }
  });
  qx.io.jsonrpc.protocol.Notification.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Notification.js.map?dt=1709410153350