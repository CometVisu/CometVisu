function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.tool.utils.Utils": {},
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.MetaExtraction": {},
      "qx.tool.utils.files.Utils": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  var fs = require("fs");
  var path = require("upath");
  qx.Class.define("qx.tool.compiler.MetaDatabase", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_481_0 = {};
      this.__P_481_1 = {};
      this.__P_481_2 = {};
      this.__P_481_3 = {};
      this.__P_481_4 = {};
    },
    properties: {
      /** Where the meta files for individual classes are stored */
      rootDir: {
        init: "compiled/meta",
        check: "String"
      }
    },
    members: {
      /** @type{Map<String,qx.tool.compiler.MetaExtraction>} list of meta indexed by classname */
      __P_481_0: null,
      /** @type{Map<String,Boolean} list of classes which need to have their second pass */
      __P_481_3: null,
      /** The database */
      __P_481_4: null,
      /**
       * Saves the database
       */
      save: function save() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.utils.Utils.makeDirs(_this.getRootDir());
              case 2:
                _this.__P_481_4.classnames = Object.keys(_this.__P_481_0);
                _context.next = 5;
                return qx.tool.utils.Json.saveJsonAsync(_this.getRootDir() + "/db.json", _this.__P_481_4);
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      getDatabase: function getDatabase() {
        return this.__P_481_4;
      },
      /**
       * Loads the database and all of the meta data
       */
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var filename, data, _iterator, _step, classname, _filename, meta, classFilename;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                filename = _this2.getRootDir() + "/db.json";
                if (fs.existsSync(filename)) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                _this2.__P_481_0 = {};
                _this2.__P_481_3 = {};
                _context2.next = 7;
                return qx.tool.utils.Json.loadJsonAsync(filename);
              case 7:
                data = _context2.sent;
                _this2.__P_481_4 = data;
                _iterator = _createForOfIteratorHelper(data.classnames);
                _context2.prev = 10;
                _iterator.s();
              case 12:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 27;
                  break;
                }
                classname = _step.value;
                _filename = _this2.getRootDir() + "/" + classname.replace(/\./g, "/") + ".json";
                if (!fs.existsSync(_filename)) {
                  _context2.next = 25;
                  break;
                }
                _context2.next = 18;
                return qx.tool.utils.Utils.makeParentDir(_filename);
              case 18:
                meta = new qx.tool.compiler.MetaExtraction(_this2.getRootDir());
                _context2.next = 21;
                return meta.loadMeta(_filename);
              case 21:
                _this2.__P_481_0[classname] = meta;
                classFilename = meta.getMetaData().classFilename;
                classFilename = path.resolve(path.join(_this2.getRootDir(), classFilename));
                _this2.__P_481_1[classFilename] = meta;
              case 25:
                _context2.next = 12;
                break;
              case 27:
                _context2.next = 32;
                break;
              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2["catch"](10);
                _iterator.e(_context2.t0);
              case 32:
                _context2.prev = 32;
                _iterator.f();
                return _context2.finish(32);
              case 35:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[10, 29, 32, 35]]);
        }))();
      },
      /**
       * Implementation of `qx.tool.compiler.jsdoc.ITypeResolver`
       *
       * @param {*} currentClassMeta
       * @param {String} type
       * @returns {String}
       */
      resolveType: function resolveType(currentClassMeta, type) {
        if (!type) {
          return type;
        }

        // in certain limited circumstances, the code at the end of this method will break usage of vanilla JS types
        // for example, usage of `String` within a class `qx.bom.*` will instead resolve to `qx.bom.String`
        // to prevent this, the following object traps the most common vanilla JS types
        var plainJsTypes = {
          string: "string",
          number: "number",
          "boolean": "boolean",
          object: "Record<any, any>",
          array: "Array<any>",
          "function": "((...args: any[]) => any)",
          map: "Map<any, any>",
          set: "Set<any>",
          regexp: "RegExp",
          date: "Date",
          error: "Error",
          promise: "Promise<any>"
        };
        if (plainJsTypes[type.toLowerCase()]) {
          return plainJsTypes[type.toLowerCase()];
        }
        var pos = currentClassMeta.className.lastIndexOf(".");
        var packageName = pos > -1 ? currentClassMeta.className.substring(0, pos) : null;
        if (packageName) {
          pos = type.indexOf(".");
          if (pos < 0 && this.__P_481_0[packageName + "." + type]) {
            return packageName + "." + type;
          }
        }
        return type;
      },
      /**
       * Adds a file to the database
       *
       * @param {String} filename
       * @param {Boolean} force
       */
      addFile: function addFile(filename, force) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var meta, metaData;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return qx.tool.utils.files.Utils.correctCase(filename);
              case 2:
                filename = _context3.sent;
                filename = path.resolve(filename);
                meta = _this3.__P_481_1[filename];
                _context3.t0 = meta && !force;
                if (!_context3.t0) {
                  _context3.next = 10;
                  break;
                }
                _context3.next = 9;
                return meta.isOutOfDate();
              case 9:
                _context3.t0 = !_context3.sent;
              case 10:
                if (!_context3.t0) {
                  _context3.next = 12;
                  break;
                }
                return _context3.abrupt("return");
              case 12:
                meta = new qx.tool.compiler.MetaExtraction(_this3.getRootDir());
                _context3.next = 15;
                return meta.parse(filename);
              case 15:
                metaData = _context3.sent;
                if (!(metaData.className === undefined)) {
                  _context3.next = 18;
                  break;
                }
                return _context3.abrupt("return");
              case 18:
                _this3.__P_481_0[metaData.className] = meta;
                _this3.__P_481_1[filename] = meta;
                _this3.__P_481_3[metaData.className] = true;
              case 21:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Returns a list of all class names
       *
       * @return {String[]}
       */
      getClassnames: function getClassnames() {
        return Object.keys(this.__P_481_0);
      },
      /**
       * Returns the meta data for a class
       *
       * @param {String} className
       * @returns
       */
      getMetaData: function getMetaData(className) {
        var _this$__P_481_0$class;
        return ((_this$__P_481_0$class = this.__P_481_0[className]) === null || _this$__P_481_0$class === void 0 ? void 0 : _this$__P_481_0$class.getMetaData()) || null;
      },
      /**
       * Once all meta data has been loaded, this method traverses the database
       * to add information that can only be added once all classes are known,
       * eg which methods override other methods and where they were overridden from
       */
      reparseAll: function reparseAll() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var classnames, derivedClassLookup, i, className, derived, _iterator2, _step2, derivedClass, _i, _classnames, _className, meta, metaData, typeResolver, filename;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                classnames = Object.keys(_this4.__P_481_3);
                _this4.__P_481_3 = {};
                derivedClassLookup = _this4.__P_481_5();
                for (i = 0; i < classnames.length; i++) {
                  className = classnames[i];
                  derived = derivedClassLookup[className];
                  _iterator2 = _createForOfIteratorHelper(derived.values());
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      derivedClass = _step2.value;
                      if (!classnames.includes(derivedClass)) {
                        classnames.push(derivedClass);
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }
                _i = 0, _classnames = classnames;
              case 5:
                if (!(_i < _classnames.length)) {
                  _context4.next = 21;
                  break;
                }
                _className = _classnames[_i];
                meta = _this4.__P_481_0[_className];
                metaData = meta.getMetaData();
                typeResolver = {
                  resolveType: _this4.resolveType.bind(_this4, metaData)
                };
                meta.fixupJsDoc(typeResolver);
                _this4.__P_481_6(metaData);
                _this4.__P_481_7(metaData, "members");
                _this4.__P_481_7(metaData, "statics");
                _this4.__P_481_7(metaData, "properties");
                filename = _this4.getRootDir() + "/" + _className.replace(/\./g, "/") + ".json";
                _context4.next = 18;
                return meta.saveMeta(filename);
              case 18:
                _i++;
                _context4.next = 5;
                break;
              case 21:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      __P_481_5: function __P_481_5() {
        var lookup = {};
        var add = function add(key, item) {
          var _lookup$key;
          (_lookup$key = lookup[key]) !== null && _lookup$key !== void 0 ? _lookup$key : lookup[key] = new Set();
          lookup[key].add(item);
        };
        for (var classname in this.__P_481_0) {
          var _lookup$classname, _metaData$mixins, _metaData$interfaces;
          (_lookup$classname = lookup[classname]) !== null && _lookup$classname !== void 0 ? _lookup$classname : lookup[classname] = new Set(); // ensuring this makes operations with the lookup simpler
          var metaData = this.__P_481_0[classname].getMetaData();
          if (metaData.superClass) {
            add(metaData.superClass, classname);
          }
          var _iterator3 = _createForOfIteratorHelper((_metaData$mixins = metaData.mixins) !== null && _metaData$mixins !== void 0 ? _metaData$mixins : []),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var mixin = _step3.value;
              add(mixin, classname);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          var _iterator4 = _createForOfIteratorHelper((_metaData$interfaces = metaData.interfaces) !== null && _metaData$interfaces !== void 0 ? _metaData$interfaces : []),
            _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var iface = _step4.value;
              add(iface, classname);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
        return lookup;
      },
      /**
       * Finds info about a method
       *
       * @param {*} metaData starting point
       * @param {String} methodName name of the method
       * @param {Boolean} firstPass
       * @returns {*} meta data values to add to the method
       */
      __P_481_8: function __P_481_8(metaData, methodName, firstPass) {
        if (!firstPass) {
          var _metaData$members;
          var method = (_metaData$members = metaData.members) === null || _metaData$members === void 0 ? void 0 : _metaData$members[methodName];
          if (method) {
            return {
              overriddenFrom: metaData.className
            };
          }
        }
        if (metaData.mixins) {
          var _iterator5 = _createForOfIteratorHelper(metaData.mixins),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var mixinName = _step5.value;
              var mixinMeta = this.__P_481_0[mixinName];
              if (mixinMeta) {
                var _mixinMetaData$member;
                var mixinMetaData = mixinMeta.getMetaData();
                var _method = (_mixinMetaData$member = mixinMetaData.members) === null || _mixinMetaData$member === void 0 ? void 0 : _mixinMetaData$member[methodName];
                if (_method) {
                  return {
                    mixin: mixinName
                  };
                }
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
        if (!metaData.superClass) {
          return null;
        }
        var superMeta = this.__P_481_0[metaData.superClass];
        if (superMeta) {
          return this.__P_481_8(superMeta.getMetaData(), methodName, false);
        }
        return null;
      },
      /**
       * @param {*} metaData class metadata
       * @param {string} entryKind name of the entry type
       * @param {string} entryName name of the entry
       * @returns {string[]} list of classes where the entry appears
       */
      __P_481_9: function __P_481_9(metaData, entryKind, entryName) {
        var getSuperLikes = function getSuperLikes(meta) {
          var _meta$mixins, _meta$interfaces;
          return [].concat(_toConsumableArray((_meta$mixins = meta.mixins) !== null && _meta$mixins !== void 0 ? _meta$mixins : []), _toConsumableArray(meta.superClass ? [meta.superClass] : []), _toConsumableArray((_meta$interfaces = meta.interfaces) !== null && _meta$interfaces !== void 0 ? _meta$interfaces : []));
        };
        var resolve = function resolve(meta) {
          var _meta$entryKind;
          if ((_meta$entryKind = meta[entryKind]) !== null && _meta$entryKind !== void 0 && _meta$entryKind[entryName]) {
            appearances.push(meta.className);
          }
        };
        var appearances = [];
        var toResolve = getSuperLikes(metaData);
        while (toResolve.length) {
          var currentMeta = this.__P_481_0[toResolve.shift()];
          if (currentMeta) {
            resolve(currentMeta.getMetaData());
            toResolve.push.apply(toResolve, _toConsumableArray(getSuperLikes(currentMeta.getMetaData())));
          }
        }
        return appearances;
      },
      /**
       * Discovers data about the members in the hierarchy, eg whether overridden etc
       *
       * @param {*} metaData
       */
      __P_481_6: function __P_481_6(metaData) {
        if (!metaData.members) {
          return;
        }
        if (metaData["abstract"]) {
          var _metaData$interfaces2;
          var _iterator6 = _createForOfIteratorHelper((_metaData$interfaces2 = metaData.interfaces) !== null && _metaData$interfaces2 !== void 0 ? _metaData$interfaces2 : []),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _this$__P_481_0$itf;
              var itf = _step6.value;
              var itfMembers = (_this$__P_481_0$itf = this.__P_481_0[itf]) === null || _this$__P_481_0$itf === void 0 ? void 0 : _this$__P_481_0$itf.getMetaData().members;
              for (var memberName in itfMembers !== null && itfMembers !== void 0 ? itfMembers : {}) {
                var member = itfMembers[memberName];
                if (!metaData.members[memberName]) {
                  metaData.members[memberName] = _objectSpread(_objectSpread({}, member), {}, {
                    "abstract": true,
                    fromInterface: itf
                  });
                }
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
        for (var methodName in metaData.members) {
          var methodMeta = metaData.members[methodName];
          var superMethod = this.__P_481_8(metaData, methodName, true);
          if (superMethod) {
            for (var key in superMethod) {
              methodMeta[key] = superMethod[key];
            }
          }
        }
      },
      /**
       * Detects the superlike (class/mixin/interface) appearances and includes the
       * mixin entries into the class metadata
       * @param {*} metaData
       * @param {string} kind
       */
      __P_481_7: function __P_481_7(metaData, kind) {
        var _metaData$kind, _metaData$mixins2;
        (_metaData$kind = metaData[kind]) !== null && _metaData$kind !== void 0 ? _metaData$kind : metaData[kind] = {};
        var _iterator7 = _createForOfIteratorHelper((_metaData$mixins2 = metaData.mixins) !== null && _metaData$mixins2 !== void 0 ? _metaData$mixins2 : []),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _this$__P_481_0$mixin;
            var mixin = _step7.value;
            var mixinMeta = (_this$__P_481_0$mixin = this.__P_481_0[mixin]) === null || _this$__P_481_0$mixin === void 0 ? void 0 : _this$__P_481_0$mixin.getMetaData();
            for (var _name in (_mixinMeta$kind = mixinMeta === null || mixinMeta === void 0 ? void 0 : mixinMeta[kind]) !== null && _mixinMeta$kind !== void 0 ? _mixinMeta$kind : {}) {
              var _mixinMeta$kind;
              var appearsIn = this.__P_481_9(metaData, kind, _name);
              var _meta = qx.lang.Object.clone(mixinMeta[kind][_name]);
              _meta.mixin = mixin;
              _meta.appearsIn = appearsIn;
              metaData[kind][_name] = _meta;
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        for (var name in (_metaData$kind2 = metaData[kind]) !== null && _metaData$kind2 !== void 0 ? _metaData$kind2 : {}) {
          var _metaData$kind2;
          var meta = metaData[kind][name];
          meta.appearsIn = this.__P_481_9(metaData, kind, name);
        }
      },
      /**
       * Gets a flattened type hierarchy for a class
       * @param {string|object} metaOrClassName - the classname or the meta data of the class to get the hierarchy for
       * @returns the type hierarchy
       *
       */
      getHierarchyFlat: function getHierarchyFlat(metaOrClassName) {
        var meta = typeof metaOrClassName === "string" ? this.getMetaData(metaOrClassName) : metaOrClassName;
        var data = {
          className: meta.className,
          superClasses: {},
          mixins: {},
          interfaces: {}
        };
        var toResolve = [meta];
        while (toResolve.length) {
          var currentMeta = toResolve.shift();
          if (currentMeta.superClass) {
            var superClassMeta = this.getMetaData(currentMeta.superClass);
            if (superClassMeta) {
              data.superClasses[superClassMeta.className] = superClassMeta;
              toResolve.push(superClassMeta);
            }
          }
          if (currentMeta.mixins) {
            var _iterator8 = _createForOfIteratorHelper(currentMeta.mixins),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var mixin = _step8.value;
                var mixinMeta = this.getMetaData(mixin);
                if (mixinMeta) {
                  data.mixins[mixinMeta.className] = mixinMeta;
                  toResolve.push(mixinMeta);
                }
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
          }
          if (currentMeta.interfaces) {
            var _iterator9 = _createForOfIteratorHelper(currentMeta.interfaces),
              _step9;
            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var iface = _step9.value;
                var ifaceMeta = this.getMetaData(iface);
                if (ifaceMeta) {
                  data.interfaces[ifaceMeta.className] = ifaceMeta;
                  toResolve.push(ifaceMeta);
                }
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }
          }
        }
        return data;
      }
    }
  });
  qx.tool.compiler.MetaDatabase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MetaDatabase.js.map?dt=1731948128612