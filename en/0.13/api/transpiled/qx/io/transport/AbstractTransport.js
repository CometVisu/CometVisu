function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Abstract class for JSON-RPC transports
   *
   * For the moment, any special configuration of the transport, such as
   * authentication, must be done on the level of the underlying implementation,
   * an abstract API will be added later.
   */
  qx.Class.define("qx.io.transport.AbstractTransport", {
    extend: qx.core.Object,
    type: "abstract",
    properties: {
      /**
       *  A representation of the the endpoint, which is either a uri (a String)
       *  or an object (such as in the case of the PostMessage transport)
       */
      endpoint: {
        check: function check(v) {
          return typeof v == "string" || _typeof(v) == "object";
        },
        nullable: true,
        event: "changeEndpoint"
      }
    },
    events: {
      /**
       * Event fired when a message is received from the endpoint. Event data
       * is an UTF-8 encoded string
       */
      message: "qx.event.type.Data"
    },
    /**
     * Constructor
     * @param {String|Object} endpoint
     */
    construct: function construct(endpoint) {
      qx.core.Object.constructor.call(this);
      this.setEndpoint(endpoint);
    }
  });
  qx.io.transport.AbstractTransport.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractTransport.js.map?dt=1702901313244