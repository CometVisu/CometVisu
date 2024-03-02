function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.transport.AbstractClient": {
        "construct": true,
        "require": true
      },
      "qx.io.jsonrpc.protocol.Parser": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qx.io.jsonrpc.protocol.Request": {},
      "qx.io.jsonrpc.protocol.Message": {},
      "qx.io.jsonrpc.protocol.Batch": {},
      "qx.io.exception.Transport": {},
      "qx.io.jsonrpc.protocol.Notification": {},
      "qx.Promise": {},
      "qx.io.jsonrpc.protocol.Result": {},
      "qx.io.jsonrpc.protocol.Error": {},
      "qx.io.exception.Protocol": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.io.jsonrpc.debug": {}
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
   * This class provides a JSON-RPC client object with auto-configuration of the
   * transport used (based on the URI passed).
   */
  qx.Class.define("qx.io.jsonrpc.Client", {
    extend: qx.io.transport.AbstractClient,
    statics: {
      // statics are not inherited from parent class
      registerTransport: qx.io.transport.AbstractClient.registerTransport
    },
    events: {
      /**
       * Event fired before a request message is sent to the server.
       * Event data is the {@link qx.io.jsonrpc.protocol.Message} to
       * be sent. This also allows listeners to configure the transport
       * object beforehand.
       */
      outgoingRequest: "qx.event.type.Data",
      /**
       * Event fired when a request results in an error. Event data is an instance of
       * {@link qx.io.exception.Transport}, {@link qx.io.exception.Protocol},
       * or {@link qx.io.exception.Cancel}.
       * Event fired when a message is received from the endpoint. Event data
       * is an UTF-8 encoded string
       */
      error: "qx.event.type.Data",
      /**
       * Event fired when a peer-originated JSON-RPC message has been
       * received from the peer endpoint. Event data is an instance of {@link
       * qx.io.jsonrpc.message.Batch}, {@link qx.io.jsonrpc.message.Request}
       * or {@link qx.io.jsonrpc.protocol.Notification}.
       */
      incomingRequest: "qx.event.type.Data"
    },
    /**
     * @param {qx.io.transport.ITransport|String} transportOrUri
     *    Transport object, which must implement {@link qx.io.transport.ITransport}
     *    or a string URI, which will trigger auto-detection of transport, as long as an
     *    appropriate transport has been registered with the static `registerTransport()` function.
     * @param {String?} methodPrefix
     *    Optional service name which will be prepended to the method
     * @param {qx.io.jsonrpc.protocol.Parser?} parser
     *    Optional parser object, which needs to be an instance of a subclass of {@link qx.io.jsonrpc.protocol.Parser}
     */
    construct: function construct(transportOrUri, methodPrefix, parser) {
      var _this = this;
      qx.io.transport.AbstractClient.constructor.call(this);
      this.selectTransport(transportOrUri);
      // listen for incoming messages
      this.getTransport().addListener("message", function (evt) {
        return _this.handleIncoming(evt.getData());
      });
      if (!methodPrefix) {
        methodPrefix = "";
      }
      this.setMethodPrefix(methodPrefix);
      if (!parser) {
        parser = new qx.io.jsonrpc.protocol.Parser();
      }
      this.setParser(parser);
      this.__P_254_0 = [];
    },
    properties: {
      /**
       * An optional string which is prepended to the method name by the {@link #sendRequest}
       * and {@link #sendNotification} methods
       */
      methodPrefix: {
        check: "String",
        nullable: true
      },
      /**
       * The parser object, which must be a subclass of {@link qx.io.jsonrpc.protocol.Parser}
       */
      parser: {
        check: "qx.io.jsonrpc.protocol.Parser"
      }
    },
    members: {
      /**
       * A cache of the requests which have been sent out and are still pending
       */
      __P_254_0: null,
      /**
       * If a service name has been configured, prepend it to the method name,
       * unless it has already been prefixed
       * @param {String} method
       * @return {String}
       * @private
       */
      _prependMethodPrefix: function _prependMethodPrefix(method) {
        qx.core.Assert.assertString(method);
        var methodPrefix = this.getMethodPrefix();
        if (methodPrefix && !method.startsWith(methodPrefix)) {
          return "".concat(methodPrefix).concat(method);
        }
        return method;
      },
      /**
       * Fires "error" event and throws the error after informing pending requests
       * about the error.
       * @param exception
       * @private
       */
      _throwTransportException: function _throwTransportException(exception) {
        this.fireDataEvent("error", exception);
        this.__P_254_0.forEach(function (request) {
          if (request instanceof qx.io.jsonrpc.protocol.Request) {
            request.handleTransportException(exception);
          }
        });
        throw exception;
      },
      /**
       * Send the given JSON-RPC message object using the configured transport
       *
       * @param {qx.io.jsonrpc.protocol.Message|qx.io.jsonrpc.protocol.Batch} message
       * @return {qx.Promise} Promise that resolves (with no data)
       * when the message has been successfully sent out, and rejects
       * when there is an error or a cancellation up to that point.
       */
      send: function send(message) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var messages, requests;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (message instanceof qx.io.jsonrpc.protocol.Message || message instanceof qx.io.jsonrpc.protocol.Batch) {
                  _context.next = 2;
                  break;
                }
                throw new Error("Argument must be instanceof qx.io.jsonrpc.protocol.Message or qx.io.jsonrpc.protocol.Batch");
              case 2:
                // filter by type
                messages = message instanceof qx.io.jsonrpc.protocol.Batch ? message.getBatch().toArray() : [message];
                requests = messages.filter(function (message) {
                  return message instanceof qx.io.jsonrpc.protocol.Request;
                }); // store requests
                requests.forEach(function (request) {
                  var id = request.getId();
                  if (_this2.__P_254_0[id] !== undefined) {
                    throw new qx.io.exception.Transport("Request ID ".concat(id, " is already in use"), qx.io.exception.Transport.INVALID_ID, {
                      request: message.toObject()
                    });
                  }
                  _this2.__P_254_0[id] = request;
                });

                // inform listeners
                _this2.fireDataEvent("outgoingRequest", message);

                // debugging
                if (qx.core.Environment.get("qx.io.jsonrpc.debug")) {
                  _this2.debug(">>> Outgoing json-rpc message: " + message);
                }

                // send it async, using transport-specific implementation
                return _context.abrupt("return", _this2.getTransport().send(message.toString()));
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Sends a single JSON-RPC request. If a method prefix name has been configured,
       * it will be prepended to the method name.
       * @param {String} method
       * @param {Array|Object?} params
       * @return {qx.Promise} Promise that resolves with the result to that request,
       * and rejects with an exception in the {@link qx.io.jsonrpc.exception} namespace.
       */
      sendRequest: function sendRequest(method, params) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var request;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                request = new qx.io.jsonrpc.protocol.Request(_this3._prependMethodPrefix(method), params);
                _context2.next = 3;
                return _this3.send(request);
              case 3:
                _context2.next = 5;
                return request.getPromise();
              case 5:
                return _context2.abrupt("return", _context2.sent);
              case 6:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Sends a single JSON-RPC notification. Will use the method prefix
       * @param {String} method
       * @param {Array|Object?} params
       * @return {qx.Promise} Promise that resolves immediately, (i.e. when the
       * notification has been sent out (which is synchronous)
       */
      sendNotification: function sendNotification(method, params) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var notification;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                notification = new qx.io.jsonrpc.protocol.Notification(_this4._prependMethodPrefix(method), params);
                _context3.next = 3;
                return _this4.send(notification);
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Send the given message batch. Will use the method prefix.
       * @param {qx.io.jsonrpc.protocol.Batch} batch
       * @return {qx.Promise} Promise that resolves with an array of the responses
       * to all requests in the batch, or rejects with any error that occurs.
       */
      sendBatch: function sendBatch(batch) {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                qx.core.Assert.assertInstance(batch, qx.io.jsonrpc.protocol.Batch);
                if (_this5.getMethodPrefix()) {
                  batch.getBatch().forEach(function (message) {
                    return message.setMethod(_this5._prependMethodPrefix(message.getMethod()));
                  });
                }
                _context4.next = 4;
                return _this5.send(batch);
              case 4:
                _context4.next = 6;
                return qx.Promise.all(batch.getPromises());
              case 6:
                return _context4.abrupt("return", _context4.sent);
              case 7:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Receives and handles an incoming JSON-RPC compliant message data
       * @param {String} json JSON data
       */
      handleIncoming: function handleIncoming(json) {
        var _this6 = this;
        if (qx.core.Environment.get("qx.io.jsonrpc.debug")) {
          this.debug("<<< Incoming json-rpc message: " + json);
        }
        var message;
        try {
          message = this.getParser().parse(json);
          // act on each message
          this.handleMessage(message);
        } catch (e) {
          this._throwTransportException(e);
        } finally {
          // cleanup
          if (message instanceof qx.io.jsonrpc.protocol.Batch) {
            message.getBatch().forEach(function (msg) {
              return _this6._cleanup(msg);
            });
          } else if (message instanceof qx.io.jsonrpc.protocol.Message) {
            this._cleanup(message);
          }
        }
      },
      /**
       * Clean up after a message has been received
       * @param {qx.io.jsonrpc.protocol.Message} message
       * @private
       */
      _cleanup: function _cleanup(message) {
        message.dispose();
      },
      /**
       * Handle an incoming message or batch of messages
       * @param {qx.io.jsonrpc.protocol.Message|qx.io.jsonrpc.protocol.Batch} message Message or Batch
       */
      handleMessage: function handleMessage(message) {
        var _this7 = this;
        // handle batches
        if (message instanceof qx.io.jsonrpc.protocol.Batch) {
          message.getBatch().forEach(function (msg) {
            return _this7.handleMessage(msg);
          });
          return;
        }
        // handle individual message
        qx.core.Assert.assertInstance(message, qx.io.jsonrpc.protocol.Message);
        var request;
        var id;
        if (message instanceof qx.io.jsonrpc.protocol.Result || message instanceof qx.io.jsonrpc.protocol.Error) {
          // handle results and errors, which are responses to sent requests
          id = message.getId();
          request = this.__P_254_0[id];
          if (request === undefined) {
            // no request with this id exists
            throw new qx.io.exception.Transport("Invalid jsonrpc response data: Unknown id ".concat(id, "."), qx.io.exception.Transport.UNKNOWN_ID, message.toObject());
          }
          if (request === true) {
            // the request has already been responded to
            throw new qx.io.exception.Transport("Invalid jsonrpc response data: multiple responses with same id ".concat(id, "."), qx.io.exception.Transport.DUPLICATE_ID, message.toObject());
          }
        }
        // handle the different message types
        if (message instanceof qx.io.jsonrpc.protocol.Result) {
          // resolve the individual promise
          request.getPromise().resolve(message.getResult());
        } else if (message instanceof qx.io.jsonrpc.protocol.Error) {
          var error = message.getError();
          var ex = new qx.io.exception.Protocol(error.message, error.code, message.toObject());

          // inform listeners
          this.fireDataEvent("error", ex);
          // reject the individual promise
          request.getPromise().reject(ex);
        } else if (message instanceof qx.io.jsonrpc.protocol.Request || message instanceof qx.io.jsonrpc.protocol.Notification) {
          // handle peer-originated requests and notifications
          this.fireDataEvent("incomingRequest", message);
        } else {
          throw new Error("Unhandled message:" + message.toString());
        }
        // mark request as handled (and remove reference so it can be gc'ed)
        this.__P_254_0[id] = true;
      }
    },
    environment: {
      "qx.io.jsonrpc.debug": false
    }
  });
  qx.io.jsonrpc.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1709410153293