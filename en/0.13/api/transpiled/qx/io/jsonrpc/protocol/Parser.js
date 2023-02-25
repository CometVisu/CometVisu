(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.io.exception.Transport": {},
      "qx.lang.Type": {},
      "qx.io.jsonrpc.protocol.Batch": {},
      "qx.io.jsonrpc.protocol.Result": {},
      "qx.io.jsonrpc.protocol.Error": {},
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.jsonrpc.protocol.Notification": {}
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
   * The parser object has a parse() method, which takes a UTF-encoded string and
   * returns an instance of the correponding subclass of {@link qx.io.jsonrpc.protocol.Message} or
   * a {@link qx.io.jsonrpc.protocol.Batch} instance.
   */
  qx.Class.define("qx.io.jsonrpc.protocol.Parser", {
    extend: qx.core.Object,
    members: {
      /**
       * Given an UTF-8 encoded string, return the corresponding message object,
       * which is one of {@link qx.io.jsonrpc.protocol.Batch}, {@link qx.io.jsonrpc.protocol.Notification},
       * {@link qx.io.jsonrpc.protocol.Request}, {@link qx.io.jsonrpc.protocol.Result}, or
       * {@link qx.io.jsonrpc.protocol.Error}.
       *
       * @param {String} message
       * @return {qx.io.jsonrpc.protocol.Message}
       * @throws {qx.io.exception.Transport}
       */
      parse: function parse(message) {
        var _this = this;
        try {
          message = JSON.parse(message);
        } catch (e) {
          throw new qx.io.exception.Transport(e.toString(), qx.io.exception.Transport.INVALID_JSON, {
            message: message
          });
        }
        if (message === null) {
          throw new qx.io.exception.Transport("No data", qx.io.exception.Transport.NO_DATA);
        }
        // batch
        if (qx.lang.Type.isArray(message)) {
          var batch = new qx.io.jsonrpc.protocol.Batch();
          message.forEach(function (item) {
            return batch.add(_this.parse(JSON.stringify(item)));
          });
          return batch;
        }
        // individual message
        var _message = message,
          id = _message.id,
          result = _message.result,
          method = _message.method,
          params = _message.params,
          error = _message.error;
        if (id !== undefined && result !== undefined && error === undefined && method === undefined) {
          return new qx.io.jsonrpc.protocol.Result(id, result);
        }
        if (id !== undefined && result === undefined && error !== undefined && method === undefined) {
          return new qx.io.jsonrpc.protocol.Error(id, error.code, error.message, error.data);
        }
        if (id !== undefined && result === undefined && error === undefined && method !== undefined) {
          return new qx.io.jsonrpc.protocol.Request(method, params, id);
        }
        if (id === undefined && result === undefined && error === undefined && method !== undefined) {
          return new qx.io.jsonrpc.protocol.Notification(method, params);
        }
        throw new qx.io.exception.Transport("Cannot parse message data.", qx.io.exception.Transport.INVALID_MSG_DATA, {
          message: message
        });
      }
    }
  });
  qx.io.jsonrpc.protocol.Parser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Parser.js.map?dt=1677345934113