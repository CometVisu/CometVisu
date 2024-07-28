(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qx.io.jsonrpc.protocol.Message": {},
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
   * An object representing a JSON-RPC v2.0 batch message object. You can add
   * one or more of the following message objects to the batch:
   *  - {@link qx.io.jsonrpc.protocol.Request}
   *  - {@link qx.io.jsonrpc.protocol.Notification}
   *  - {@link qx.io.jsonrpc.protocol.Result}
   *  - {@link qx.io.jsonrpc.protocol.Error}
   *  @see https://www.jsonrpc.org/specification#batch
   */
  qx.Class.define("qx.io.jsonrpc.protocol.Batch", {
    extend: qx.core.Object,
    properties: {
      batch: {
        check: "qx.data.Array"
      }
    },
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.setBatch(new qx.data.Array());
    },
    members: {
      /**
       * Adds a request or notification to the batch
       * @param {qx.io.jsonrpc.protocol.Message} message
       * @return {qx.io.jsonrpc.protocol.Batch}
       */
      add: function add(message) {
        qx.core.Assert.assertInstance(message, qx.io.jsonrpc.protocol.Message);
        this.getBatch().push(message);
        // return the instance for chaining
        return this;
      },
      /**
       * Adds a request to the batch
       * @param method
       * @param params
       */
      addRequest: function addRequest(method, params) {
        this.add(new qx.io.jsonrpc.protocol.Request(method, params));
        return this;
      },
      /**
       * Adds a notification to the batch
       * @param method
       * @param params
       */
      addNotification: function addNotification(method, params) {
        this.add(new qx.io.jsonrpc.protocol.Notification(method, params));
        return this;
      },
      /**
       * Returns an array of the promises of the requests in the batch
       * @return {qx.Promise[]}
       */
      getPromises: function getPromises() {
        return this.getBatch().map(function (message) {
          return message.getPromise();
        });
      },
      /**
       * Returns the message as a native object
       * @return {*}
       */
      toObject: function toObject() {
        return this.getBatch().toArray().map(function (message) {
          return message.toObject();
        });
      },
      /**
       * Returns the message as a JSON string
       * @return {String}
       */
      toString: function toString() {
        return JSON.stringify(this.getBatch().toArray().map(function (message) {
          return message.toObject();
        }));
      }
    }
  });
  qx.io.jsonrpc.protocol.Batch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Batch.js.map?dt=1722151825439