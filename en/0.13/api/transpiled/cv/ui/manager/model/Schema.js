function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
      "qx.util.ResourceManager": {},
      "qx.io.request.Xhr": {},
      "qx.xml.Document": {},
      "cv.ui.manager.model.schema.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Schema.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   *
   */
  qx.Class.define('cv.ui.manager.model.Schema', {
    extend: qx.core.Object,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(filename) {
      qx.core.Object.constructor.call(this);
      if (!filename || !filename.match(/\.xsd$/)) {
        throw new Error('no, empty or invalid filename given, can not instantiate without one');
      }
      this.__filename = filename;
      this.setStructure(filename.endsWith('visu_config_tile.xsd') ? 'tile' : 'pure');
      this.__P_45_0 = {};
      this.__P_45_1 = {};
      this.__P_45_2 = {};
      this._cacheXSD();
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      __P_45_3: {},
      getInstance: function getInstance(schemaFile) {
        if (!Object.prototype.hasOwnProperty.call(this.__P_45_3, schemaFile)) {
          this.__P_45_3[schemaFile] = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri(schemaFile));
        }
        return this.__P_45_3[schemaFile];
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      loaded: {
        check: 'Boolean',
        init: false,
        event: 'changeLoaded'
      },
      structure: {
        check: ['pure', 'tile'],
        apply: '_applyStructure'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __filename: null,
      /**
       * object of the schema/xsd
       * @var object
       */
      __P_45_4: null,
      /**
       * object of allowed root-level elements
       * @var object
       */
      __P_45_0: null,
      /**
       * cache for referenced nods
       * @var object
       */
      __P_45_1: null,
      /**
       * cache for getTypeNode
       * @var object
       */
      __P_45_2: null,
      /**
       * cache for #text-SchemaElement
       * @var object
       */
      __P_45_5: null,
      /**
       * cache for #comment-SchemaElement
       * @var object
       */
      __P_45_6: null,
      /**
       * @var {Array<String>}
       */
      _widgetNames: null,
      /**
       * @var {String}
       */
      __P_45_7: null,
      /**
       * @var {String}
       */
      __P_45_8: null,
      /**
       * @var {String}
       */
      __P_45_9: null,
      _applyStructure: function _applyStructure(structure) {
        if (structure === 'tile') {
          this.__P_45_7 = 'config';
          this.__P_45_8 = 'main';
          this.__P_45_9 = 'cv-page';
        } else {
          this.__P_45_7 = 'pages';
          this.__P_45_9 = 'page';
        }
      },
      onLoaded: function onLoaded(callback, context) {
        if (this.isLoaded()) {
          callback.call(context);
        } else {
          this.addListenerOnce('changeLoaded', callback, context);
        }
      },
      /**
       * load and cache the xsd from the server
       */
      _cacheXSD: function _cacheXSD() {
        var _this = this;
        var ajaxRequest = new qx.io.request.Xhr(this.__filename);
        ajaxRequest.set({
          accept: 'application/xml'
        });
        ajaxRequest.addListenerOnce('success', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
            var req, xml, includeXml, _iterator, _step, include, target, _iterator2, _step2, includedChild;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    req = e.getTarget(); // Response parsed according to the server's response content type
                    xml = req.getResponse();
                    if (xml && typeof xml === 'string') {
                      xml = qx.xml.Document.fromString(xml);
                    }
                    // embed all includes
                    _iterator = _createForOfIteratorHelper(xml.querySelectorAll('schema include'));
                    _context.prev = 4;
                    _iterator.s();
                  case 6:
                    if ((_step = _iterator.n()).done) {
                      _context.next = 17;
                      break;
                    }
                    include = _step.value;
                    _context.next = 10;
                    return _this.loadXml('resource/' + include.getAttribute('schemaLocation'));
                  case 10:
                    includeXml = _context.sent;
                    target = include.parentElement;
                    include.remove();
                    _iterator2 = _createForOfIteratorHelper(includeXml.querySelectorAll('schema > *'));
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        includedChild = _step2.value;
                        target.appendChild(includedChild);
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  case 15:
                    _context.next = 6;
                    break;
                  case 17:
                    _context.next = 22;
                    break;
                  case 19:
                    _context.prev = 19;
                    _context.t0 = _context["catch"](4);
                    _iterator.e(_context.t0);
                  case 22:
                    _context.prev = 22;
                    _iterator.f();
                    return _context.finish(22);
                  case 25:
                    _this.__P_45_4 = xml;

                    // parse the data, to have at least a list of root-level-elements
                    _this._parseXSD();
                  case 27:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[4, 19, 22, 25]]);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        ajaxRequest.send();
      },
      loadXml: function loadXml(file) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", new Promise(function (resolve, reject) {
                    var ajaxRequest = new qx.io.request.Xhr(file);
                    ajaxRequest.set({
                      accept: 'application/xml'
                    });
                    ajaxRequest.addListenerOnce('success', function (e) {
                      var req = e.getTarget();
                      // Response parsed according to the server's response content type
                      var xml = req.getResponse();
                      if (xml && typeof xml === 'string') {
                        xml = qx.xml.Document.fromString(xml);
                      }
                      resolve(xml);
                    });
                    ajaxRequest.addListenerOnce('statusError', function (e) {
                      var req = e.getTarget();
                      reject(new Error(req.getStatusText()));
                    });
                    ajaxRequest.send();
                  }));
                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      /**
       * parse the schema once
       */
      _parseXSD: function _parseXSD() {
        var _this2 = this;
        // make a list of root-level elements
        this.__P_45_4.querySelectorAll('schema > element').forEach(function (element) {
          var name = element.getAttribute('name');
          _this2.__P_45_0[name] = new cv.ui.manager.model.schema.Element(element, _this2);
        });
        this.setLoaded(true);
      },
      getElementNode: function getElementNode(name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_45_0, name)) {
          return this.__P_45_0[name];
        }
        throw new Error('schema/xsd appears to be invalid, element ' + name + ' not allowed on root level');
      },
      /**
       * dive into the schema and find the element that is being pulled in by a ref.
       * Do so recursively.
       * referenced nodes can be top-level-nodes only!
       *
       * @param   type       string  Type of the node (e.g. element, attributeGroup, ...)
       * @param   refName    string  Name as per the ref-attribute
       * @param   noFallback boolean Don't look up other types as fallback, if the requested type is not found
       * @return  object          jQuery-object of the ref'ed element
       */
      getReferencedNode: function getReferencedNode(type, refName, noFallback) {
        if (Object.prototype.hasOwnProperty.call(this.__P_45_1, type) && Object.prototype.hasOwnProperty.call(this.__P_45_1[type], refName)) {
          return this.__P_45_1[type][refName];
        }
        var fallbackType = type === 'simpleType' ? 'complexType' : 'simpleType';
        if (!noFallback) {
          if (Object.prototype.hasOwnProperty.call(this.__P_45_1, fallbackType) && Object.prototype.hasOwnProperty.call(this.__P_45_1[fallbackType], refName)) {
            return this.__P_45_1[fallbackType][refName];
          }
        }
        var selector = 'schema > ' + type + '[name="' + refName + '"]';
        var ref = this.__P_45_4.querySelector(selector);
        if (!ref && !noFallback) {
          try {
            ref = this.getReferencedNode(fallbackType, refName, true);
          } catch (e) {}
        }
        if (!ref) {
          throw new Error('schema/xsd appears to be invalid, reference ' + type + ' "' + refName + '" can not be found');
        }
        if (ref.hasAttribute('ref')) {
          // do it recursively, if necessary
          ref = this.getReferencedNode(type, ref.getAttribute('ref'));
        }
        if (!Object.prototype.hasOwnProperty.call(this.__P_45_1, type)) {
          this.__P_45_1[type] = {};
        }

        // fill the cache
        this.__P_45_1[type][refName] = ref;
        return ref;
      },
      /**
       * get the definition of a type, be it complex or simple
       *
       * @param   type    string  Type of type to find (either simple or complex)
       * @param   name    string  Name of the type to find
       */
      getTypeNode: function getTypeNode(type, name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_45_2, type) && Object.prototype.hasOwnProperty.call(this.__P_45_2[type], name)) {
          return this.__P_45_2[type][name];
        }
        var typeNode = this.__P_45_4.querySelector(type + 'Type[name="' + name + '"]');
        if (!typeNode) {
          throw new Error('schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found');
        }
        if (typeof this.__P_45_2[type] == 'undefined') {
          this.__P_45_2[type] = {};
        }

        // fill the cache
        this.__P_45_2[type][name] = typeNode;
        return typeNode;
      },
      /**
       * get a SchemaElement for a #text-node
       *
       * @return  object  SchemaElement for #text-node
       */
      getTextNodeSchemaElement: function getTextNodeSchemaElement() {
        if (this.__P_45_5 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_45_4.createElement('element');
          tmpXML.setAttribute('name', '#text');
          tmpXML.setAttribute('type', 'xsd:string');
          this.__P_45_5 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }
        return this.__P_45_5;
      },
      /**
       * get a SchemaElement for a #comment-node
       *
       * @return  object  SchemaElement for #comment-node
       */
      getCommentNodeSchemaElement: function getCommentNodeSchemaElement() {
        if (this.__P_45_6 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_45_4.createElement('element');
          tmpXML.setAttribute('name', '#comment');
          tmpXML.setAttribute('type', 'xsd:string');
          tmpXML.setAttribute('minOccurs', '0');
          tmpXML.setAttribute('maxOccurs', 'unbounded');
          this.__P_45_6 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }
        return this.__P_45_6;
      },
      /**
       * get the DOM for this Schema
       *
       * @return  object  DOM
       */
      getSchemaDOM: function getSchemaDOM() {
        return this.__P_45_4;
      },
      /**
       * A CometVisu-Schema specific helper function that returns an array of all widget names.
       * @returns {Array<String>}
       */
      getWidgetNames: function getWidgetNames() {
        if (!this._widgetNames) {
          var root = this.getElementNode(this.__P_45_7);
          var pageParent = root;
          if (this.__P_45_8) {
            pageParent = root.getSchemaElementForElementName(this.__P_45_8);
          }
          var page = pageParent.getSchemaElementForElementName(this.__P_45_9);
          this._widgetNames = Object.keys(page.getAllowedElements()).filter(function (name) {
            return !name.startsWith('#') && name !== 'layout';
          });
        }
        return this._widgetNames;
      },
      isRoot: function isRoot(name) {
        return name === this.__P_45_7;
      },
      isPage: function isPage(name) {
        return name = this.__P_45_9;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_45_4 = null;
      this._disposeObjects("__P_45_6", "__P_45_5");
      this._disposeMap("__P_45_0");
      this.__P_45_1 = null;
      this.__P_45_2 = null;
      this._widgetNames = null;
    }
  });
  cv.ui.manager.model.Schema.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Schema.js.map?dt=1673093841448