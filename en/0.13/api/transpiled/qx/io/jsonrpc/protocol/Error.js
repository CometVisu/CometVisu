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
      },
      "qx.lang.Type": {
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
   * A JSON-RPC v2.0 error message object, which is a response to a {@link qx.io.jsonrpc.protocol.Request},
   * indicating a failure during the processing of the request on the server.
   * @see https://www.jsonrpc.org/specification#error_object
   */
  qx.Class.define("qx.io.jsonrpc.protocol.Error", {
    extend: qx.io.jsonrpc.protocol.Message,
    properties: {
      /**
       * The integer id of the request
       * @var {Number}
       */
      id: {
        check: function check(value) {
          return qx.lang.Type.isNumber(value) && parseInt(value, 10) === value;
        }
      },
      /**
       * The error object
       * @var {Object}
       */
      error: {
        check: function check(value) {
          return qx.lang.Type.isObject(value) && "code" in value && "message" in value;
        }
      }
    },
    /**
     * The response messsage constructor
     * @param {Number} id^
     * @param {Number} code
     * @param {String} message
     * @param {*?} data
     */
    construct: function construct(id, code, message, data) {
      qx.io.jsonrpc.protocol.Message.constructor.call(this);
      this.setId(id);
      if (!qx.lang.Type.isNumber(code) || parseInt(code, 10) !== code) {
        throw new Error("Code must be an integer");
      }
      var errorObj = {
        code: code,
        message: message
      };
      if (data) {
        errorObj.data = data;
      }
      this.setError(errorObj);
    }
  });
  qx.io.jsonrpc.protocol.Error.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Error.js.map?dt=1692560713535