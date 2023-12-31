function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var schema;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (Object.prototype.hasOwnProperty.call(_this.__P_45_3, schemaFile)) {
                  _context.next = 4;
                  break;
                }
                schema = _this.__P_45_3[schemaFile] = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri(schemaFile));
                if (schema.isLoaded()) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var timer = setTimeout(function () {
                    reject(new Error('timeout loading schema file'));
                  }, 5000);
                  schema.addListenerOnce('changeLoaded', function () {
                    clearTimeout(timer);
                    resolve(schema);
                  });
                }));
              case 4:
                return _context.abrupt("return", _this.__P_45_3[schemaFile]);
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
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
        var _this2 = this;
        var ajaxRequest = new qx.io.request.Xhr(this.__filename);
        ajaxRequest.set({
          accept: 'application/xml'
        });
        ajaxRequest.addListenerOnce('success', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
            var req, xml, includeXml, _iterator, _step, include, target, _iterator2, _step2, includedChild;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  req = e.getTarget(); // Response parsed according to the server's response content type
                  xml = req.getResponse();
                  if (xml && typeof xml === 'string') {
                    xml = qx.xml.Document.fromString(xml);
                  }
                  // embed all includes
                  _iterator = _createForOfIteratorHelper(xml.querySelectorAll('schema include'));
                  _context2.prev = 4;
                  _iterator.s();
                case 6:
                  if ((_step = _iterator.n()).done) {
                    _context2.next = 17;
                    break;
                  }
                  include = _step.value;
                  _context2.next = 10;
                  return _this2.loadXml('resource/' + include.getAttribute('schemaLocation'));
                case 10:
                  includeXml = _context2.sent;
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
                  _context2.next = 6;
                  break;
                case 17:
                  _context2.next = 22;
                  break;
                case 19:
                  _context2.prev = 19;
                  _context2.t0 = _context2["catch"](4);
                  _iterator.e(_context2.t0);
                case 22:
                  _context2.prev = 22;
                  _iterator.f();
                  return _context2.finish(22);
                case 25:
                  _this2.__P_45_4 = xml;

                  // parse the data, to have at least a list of root-level-elements
                  _this2._parseXSD();
                case 27:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, null, [[4, 19, 22, 25]]);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        ajaxRequest.send();
      },
      loadXml: function loadXml(file) {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
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
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * parse the schema once
       */
      _parseXSD: function _parseXSD() {
        var _this3 = this;
        // make a list of root-level elements
        this.__P_45_4.querySelectorAll('schema > element').forEach(function (element) {
          var name = element.getAttribute('name');
          _this3.__P_45_0[name] = new cv.ui.manager.model.schema.Element(element, _this3);
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

//# sourceMappingURL=Schema.js.map?dt=1704036750020