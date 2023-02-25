function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "qx.lang.Type": {},
      "qx.Interface": {},
      "qx.io.transport.ITransport": {},
      "qx.io.exception.Transport": {}
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
   * This class provides a the base class for all clients that use the
   * transport implementations in this namespace. Since the static method
   * `registerTransport` cannot be inherited by subclasses, they mus proxy it
   * by adding `registerTransport : qx.io.transport.AbstractClient.registerTransport`
   * to their `statics` section.
   *
   */
  qx.Class.define("qx.io.transport.AbstractClient", {
    extend: qx.core.Object,
    type: "abstract",
    statics: {
      /**
       * Register a transport class for use with uris that match the given
       * regular expression. The client will use the transport which first
       * matches, starting with the last added transport
       * @param {RegExp} uriRegExp
       *    A regular expression which the URI must match
       * @param {qx.io.transport.ITransport}  transportClass
       *    The qooxdoo class implementing the transport
       */
      registerTransport: function registerTransport(uriRegExp, transportClass) {
        if (!this.constructor.__P_263_0) {
          this.constructor.__P_263_0 = [];
        }
        if (!qx.lang.Type.isRegExp(uriRegExp)) {
          throw new Error("First argument must be a regular expression!");
        }
        if (!qx.Interface.classImplements(transportClass, qx.io.transport.ITransport)) {
          throw new Error("Transport class must implement qx.io.transport.ITransport");
        }
        this.constructor.__P_263_0.push({
          uriRegExp: uriRegExp,
          transport: transportClass
        });
      }
    },
    properties: {
      /**
       * The transport object
       */
      transport: {
        check: "qx.io.transport.ITransport"
      }
    },
    members: {
      /**
       * Given a transport object implementing {@link qx.io.transport.ITransport}
       * select that transport; if a string URI is passed, select one that has
       * been registered for that class of URIs.
       * @param {qx.io.transport.ITransport|String} transportOrUri
       * @throws qx.io.exception.Transport
       */
      selectTransport: function selectTransport(transportOrUri) {
        var transport;
        var uri;
        if (qx.lang.Type.isString(transportOrUri)) {
          if (!this.constructor.__P_263_0) {
            throw new Error("No transport has been registered. Put @use(qx.io.transport.X) in the doc block of your class, X being the transport class of your choice (such as qx.io.transport.Xhr for http transport).");
          }
          uri = transportOrUri;
          var _iterator = _createForOfIteratorHelper(this.constructor.__P_263_0.reverse()),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var registeredTransport = _step.value;
              if (uri.match(registeredTransport.uriRegExp)) {
                // eslint-disable-next-line new-cap
                transport = new registeredTransport.transport(uri);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (!transport) {
            throw new qx.io.exception.Transport("No matching transport for URI '".concat(transportOrUri, "'"), qx.io.exception.Transport.INVALID_URI);
          }
        } else {
          if (!(transportOrUri instanceof qx.core.Object) || !qx.Interface.classImplements(transportOrUri.constructor, qx.io.transport.ITransport)) {
            throw new Error("Argument must be an qooxdoo object implementing qx.io.transport.ITransport");
          }
          transport = transportOrUri;
        }
        this.setTransport(transport);
      }
    }
  });
  qx.io.transport.AbstractClient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractClient.js.map?dt=1677345935141