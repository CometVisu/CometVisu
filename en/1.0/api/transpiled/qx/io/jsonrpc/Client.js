function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.Promise": {},
      "qx.io.jsonrpc.protocol.Notification": {},
      "qx.io.jsonrpc.protocol.Result": {},
      "qx.io.jsonrpc.protocol.Error": {},
      "qx.io.exception.Protocol": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest": {},
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
      this.__P_264_0 = [];
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
      __P_264_0: null,
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
       * Fires "error" event and rejects the pending requests' promises.
       * The method will be renamed and made private in v8.
       * @param exception
       * @private
       */
      _throwTransportException: function _throwTransportException(exception) {
        this.fireDataEvent("error", exception);
        this.__P_264_0.forEach(function (request) {
          if (request instanceof qx.io.jsonrpc.protocol.Request) {
            // this rejects the request's promise
            request.handleTransportException(exception);
          }
        });
        if (!qx.core.Environment.get("qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest")) {
          throw exception; // will be removed in v8 since it is not caught anywhere
        }
      },
      /**
       * Send the given JSON-RPC message object using the configured transport
       *
       * @param {qx.io.jsonrpc.protocol.Message|qx.io.jsonrpc.protocol.Batch} message
       * @return {qx.Promise} Promise that resolves (with no data) when the message has been successfully
       * sent out. As this means different things depending on the transport implementation, it is best
       * not to base any kind of business logic on the fulfillment of that promise.
       *
       * The current behavior is to return the promise from the transport `send()` implementation, which
       * might be rejected with a {@link qx.io.exception.Transport} in case of a transport error.
       * This has caused problems with "unhandled promise rejection" errors, so a new behaviour will be
       * the default in v8: The returned promise is already resolved, and any rejection of the transport
       * promise will only be forwarded to the promise(s) of the request(s) contained in the the `message`
       * argument. The returned promise will never be rejected. This behavior can be enabled by setting
       * the environment variable `qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest` to `true` in v7.
       * In v8, the default of `qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest` will become `true`,
       * and that environment variable will become deprecated.
       *
       * In any case, the result of the jsonrpc request is retrieved by awaiting {@link qx.io.jsonrpc.protocol.Request}'s
       * promise, which is resolved with the jsonrpc server's response or is rejected either  with a
       * {@link qx.io.exception.Transport} in case of a transport error or with {@link qx.io.protocol.Error}
       * in case of a jsonrpc error.
       */
      send: function send(message) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var messages, requests, transportPromise;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (message instanceof qx.io.jsonrpc.protocol.Message || message instanceof qx.io.jsonrpc.protocol.Batch) {
                  _context.n = 1;
                  break;
                }
                throw new Error("Argument must be instanceof qx.io.jsonrpc.protocol.Message or qx.io.jsonrpc.protocol.Batch");
              case 1:
                // filter by type
                messages = message instanceof qx.io.jsonrpc.protocol.Batch ? message.getBatch().toArray() : [message];
                requests = messages.filter(function (message) {
                  return message instanceof qx.io.jsonrpc.protocol.Request;
                }); // store requests
                requests.forEach(function (request) {
                  var id = request.getId();
                  if (_this2.__P_264_0[id] !== undefined) {
                    throw new qx.io.exception.Transport("Request ID ".concat(id, " is already in use"), qx.io.exception.Transport.INVALID_ID, {
                      request: message.toObject()
                    });
                  }
                  _this2.__P_264_0[id] = request;
                });

                // inform listeners
                _this2.fireDataEvent("outgoingRequest", message);

                // debugging
                if (qx.core.Environment.get("qx.io.jsonrpc.debug")) {
                  _this2.debug(">>> Outgoing json-rpc message: " + message);
                }

                // send it async, using transport-specific implementation
                transportPromise = _this2.getTransport().send(message.toString());
                if (!qx.core.Environment.get("qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest")) {
                  _context.n = 2;
                  break;
                }
                // forward rejections to the requests' promises, which will be standard behavior in v8
                transportPromise["catch"](function (error) {
                  // wrap error in transport exception
                  if (!(error instanceof qx.io.exception.Transport)) {
                    error = new qx.io.exception.Transport(error.toString(), qx.io.exception.Transport.FORWARDED, error);
                  }
                  _this2._throwTransportException(error);
                });
                // return a resolved promise so that the actual completion of the transport is not awaited
                return _context.a(2, qx.Promise.resolve());
              case 2:
                return _context.a(2, transportPromise);
              case 3:
                return _context.a(2);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var request;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                request = new qx.io.jsonrpc.protocol.Request(_this3._prependMethodPrefix(method), params); // await completion of transport
                _context2.n = 1;
                return _this3.send(request);
              case 1:
                _context2.n = 2;
                return request.getPromise();
              case 2:
                return _context2.a(2, _context2.v);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var notification;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                notification = new qx.io.jsonrpc.protocol.Notification(_this4._prependMethodPrefix(method), params);
                _context3.n = 1;
                return _this4.send(notification);
              case 1:
                return _context3.a(2);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                qx.core.Assert.assertInstance(batch, qx.io.jsonrpc.protocol.Batch);
                if (_this5.getMethodPrefix()) {
                  batch.getBatch().forEach(function (message) {
                    return message.setMethod(_this5._prependMethodPrefix(message.getMethod()));
                  });
                }
                // await completion of transport
                _context4.n = 1;
                return _this5.send(batch);
              case 1:
                _context4.n = 2;
                return qx.Promise.all(batch.getPromises());
              case 2:
                return _context4.a(2, _context4.v);
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
       * @throws {qx.io.exception.Transport} For transport-related errors
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
          request = this.__P_264_0[id];
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
          // handle jsonrpc (not transport-related) errors
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
        this.__P_264_0[id] = true;
      }
    },
    environment: {
      /**
       * If true, log detailed information on the jsonrpc traffic in the console
       */
      "qx.io.jsonrpc.debug": false,
      /**
       * If true, forward transport errors to the running jsonrpc requests' promise instead of rejecting
       * the promise returned by {@link #send}. Default is `false`.
        * @deprecated
       * Behavior in v8 will be as if the environment variable value is `true`, but the environment variable will no longer be available.
       */
      "qx.io.jsonrpc.forwardTransportPromiseRejectionToRequest": false
    }
  });
  qx.io.jsonrpc.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1782705779488