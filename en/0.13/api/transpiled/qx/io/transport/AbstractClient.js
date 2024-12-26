function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
        if (!this.constructor.__P_273_0) {
          this.constructor.__P_273_0 = [];
        }
        if (!qx.lang.Type.isRegExp(uriRegExp)) {
          throw new Error("First argument must be a regular expression!");
        }
        if (!qx.Interface.classImplements(transportClass, qx.io.transport.ITransport)) {
          throw new Error("Transport class must implement qx.io.transport.ITransport");
        }
        this.constructor.__P_273_0.push({
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
          if (!this.constructor.__P_273_0) {
            throw new Error("No transport has been registered. Put @use(qx.io.transport.X) in the doc block of your class, X being the transport class of your choice (such as qx.io.transport.Xhr for http transport).");
          }
          uri = transportOrUri;
          var _iterator = _createForOfIteratorHelper(this.constructor.__P_273_0.reverse()),
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

//# sourceMappingURL=AbstractClient.js.map?dt=1735222423291