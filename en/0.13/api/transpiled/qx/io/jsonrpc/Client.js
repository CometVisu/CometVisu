function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

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
      this.selectTransport(transportOrUri); // listen for incoming messages

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
      this.__P_246_0 = [];
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
      __P_246_0: null,

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

        this.__P_246_0.forEach(function (request) {
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

                  if (_this2.__P_246_0[id] !== undefined) {
                    throw new qx.io.exception.Transport("Request ID ".concat(id, " is already in use"), qx.io.exception.Transport.INVALID_ID, {
                      request: message.toObject()
                    });
                  }

                  _this2.__P_246_0[id] = request;
                }); // inform listeners

                _this2.fireDataEvent("outgoingRequest", message); // debugging


                if (qx.core.Environment.get("qx.io.jsonrpc.debug")) {
                  _this2.debug(">>> Outgoing json-rpc message: " + message);
                } // send it async, using transport-specific implementation


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
          message = this.getParser().parse(json); // act on each message

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
        } // handle individual message


        qx.core.Assert.assertInstance(message, qx.io.jsonrpc.protocol.Message);
        var request;
        var id;

        if (message instanceof qx.io.jsonrpc.protocol.Result || message instanceof qx.io.jsonrpc.protocol.Error) {
          // handle results and errors, which are responses to sent requests
          id = message.getId();
          request = this.__P_246_0[id];

          if (request === undefined) {
            // no request with this id exists
            throw new qx.io.exception.Transport("Invalid jsonrpc response data: Unknown id ".concat(id, "."), qx.io.exception.Transport.UNKNOWN_ID, message.toObject());
          }

          if (request === true) {
            // the request has already been responded to
            throw new qx.io.exception.Transport("Invalid jsonrpc response data: multiple responses with same id ".concat(id, "."), qx.io.exception.Transport.DUPLICATE_ID, message.toObject());
          }
        } // handle the different message types


        if (message instanceof qx.io.jsonrpc.protocol.Result) {
          // resolve the individual promise
          request.getPromise().resolve(message.getResult());
        } else if (message instanceof qx.io.jsonrpc.protocol.Error) {
          var error = message.getError();
          var ex = new qx.io.exception.Protocol(error.message, error.code, message.toObject()); // inform listeners

          this.fireDataEvent("error", ex); // reject the individual promise

          request.getPromise().reject(ex);
        } else if (message instanceof qx.io.jsonrpc.protocol.Request || message instanceof qx.io.jsonrpc.protocol.Notification) {
          // handle peer-originated requests and notifications
          this.fireDataEvent("incomingRequest", message);
        } else {
          throw new Error("Unhandled message:" + message.toString());
        } // mark request as handled (and remove reference so it can be gc'ed)


        this.__P_246_0[id] = true;
      }
    },
    environment: {
      "qx.io.jsonrpc.debug": false
    }
  });
  qx.io.jsonrpc.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1685978125026