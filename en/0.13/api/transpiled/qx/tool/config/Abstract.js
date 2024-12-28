function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.Promisify": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.lang.Type": {
        "construct": true
      },
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.Utils": {},
      "qx.util.ResourceManager": {},
      "qx.tool.config.Manifest": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019 The qooxdoo developers
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
  
  ************************************************************************ */

  var fs = qx.tool.utils.Promisify.fs;
  var process = require("process");
  var path = require("upath");
  var semver = require("semver");
  var get_value = require("get-value");
  var set_value = require("set-value");
  var unset_value = require("unset-value");

  /**
   * An abstract model for config files
   */
  qx.Class.define("qx.tool.config.Abstract", {
    extend: qx.core.Object,
    statics: {
      /**
       * The base URL of all json schema definitions
       */
      schemaBaseUrl: "https://qooxdoo.org/schema"
    },
    construct: function construct(config) {
      qx.core.Object.constructor.call(this);
      if (qx.lang.Type.isObject(config)) {
        this.set(config);
      }
      for (var _i = 0, _arr = ["fileName", "version"]; _i < _arr.length; _i++) {
        var prop = _arr[_i];
        if (!this.get(prop)) {
          throw new Error("Property ".concat(prop, " must be set when instantiating ").concat(this.classname));
        }
      }
      if (!config.baseDir) {
        this.setBaseDir(process.cwd());
      }
    },
    properties: {
      /**
       * Name of the config file
       */
      fileName: {
        check: "String"
      },
      /**
       * The path to the directory containing the config file
       * Defaults to process.cwd()
       */
      baseDir: {
        check: "String"
      },
      /**
       * Schema version of the config file
       * If string, validate all data against this version of the schema
       * If null, do not validate
       */
      version: {
        validate: function validate(version) {
          return semver.coerce(version) !== null;
        },
        check: "String",
        nullable: true
      },
      /**
       * The config data
       */
      data: {
        check: "Object",
        event: "changeData",
        validate: "_validateData",
        nullable: false
      },
      /**
       * Flag to indicate that data has changed and needs to be saved
       */
      dirty: {
        check: "Boolean",
        init: false,
        event: "changeDirty"
      },
      /**
       * Flag to indicate that data has been loaded
       */
      loaded: {
        check: "Boolean",
        init: false,
        event: "changeLoaded"
      },
      /**
       * Whether to throw an Error if validation fails (false, default),
       * or to simply output a warning to the console (true)
       */
      warnOnly: {
        check: "Boolean",
        init: false
      },
      /**
       * Whether to validate the model data (default: true)
       */
      validate: {
        check: "Boolean",
        init: true
      },
      /**
       * Whether to create the file if it doesn't exist yet (default: false)
       * Setting this to true doesn't automatically create it, you still need to
       * call save(). It just prevents an error during loading the config data.
       * Only works if a "templateFunction" has been set.
       */
      createIfNotExists: {
        check: "Boolean",
        init: false
      },
      /**
       * A function that returns the config file template which is used if no
       * file exists and the "createIfNotExists" property is set to true
       */
      templateFunction: {
        check: "Function",
        nullable: false
      }
    },
    members: {
      /**
       * The json-schema object
       */
      __P_511_0: null,
      /**
       * Validates the given data against the schema that the model has been
       * initialized with. Throws if not valid.
       * @param data The config data
       * @private
       */
      _validateData: function _validateData(data) {
        if (!this.isValidate() || this.getVersion() === null) {
          return;
        }
        if (!this.__P_511_0) {
          throw new Error("Cannot validate - no schema available! Please load the model first.");
        }
        try {
          qx.tool.utils.Json.validate(data, this.__P_511_0);
        } catch (e) {
          var msg = "Error validating data for ".concat(this.getRelativeDataPath(), ": ").concat(e.message);
          if (this.isWarnOnly()) {
            qx.tool.compiler.Console.warn(msg);
          } else {
            throw new qx.tool.utils.Utils.UserError(msg);
          }
        }
      },
      /**
       * The path to the configuration file
       * @return {String}
       */
      getDataPath: function getDataPath() {
        return path.join(this.getBaseDir(), this.getFileName());
      },
      /**
       * The path to the configuration file, relative to CWD
       */
      getRelativeDataPath: function getRelativeDataPath() {
        return path.relative(process.cwd(), this.getDataPath());
      },
      /**
       * Returns the part of the schema URI that is identical for all paths
       * @private
       */
      _getSchemaFileName: function _getSchemaFileName() {
        var _this$getFileName$spl = this.getFileName().split(/\./),
          _this$getFileName$spl2 = _slicedToArray(_this$getFileName$spl, 2),
          name = _this$getFileName$spl2[0],
          ext = _this$getFileName$spl2[1];
        var version = String(semver.coerce(this.getVersion())).replace(/\./g, "-");
        return "".concat(name, "-").concat(version, ".").concat(ext);
      },
      /**
       * Path to the schema json file in the file system
       * @return {String}
       */
      getSchemaPath: function getSchemaPath() {
        return qx.util.ResourceManager.getInstance().toUri("qx/tool/schema/".concat(this._getSchemaFileName()));
      },
      /**
       * Returns the URL of the JSON schema
       * @return {String}
       */
      getSchemaUri: function getSchemaUri() {
        return qx.tool.config.Abstract.schemaBaseUrl + "/" + this._getSchemaFileName();
      },
      /**
       * Returns the json-schema object
       * @return {Object}
       */
      getSchema: function getSchema() {
        return this.__P_511_0;
      },
      /**
       * Returns true if the config file exists, false if not
       * @return {Promise<Boolean>}
       */
      exists: function exists() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fs.existsAsync(_this.getDataPath());
              case 2:
                return _context.abrupt("return", _context.sent);
              case 3:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * This method can be used to get the config model singleton in a initialized
       * state. It loads the config data into the model, unless data has already been
       * loaded. If no argument is given, load from the file specified when the
       * instance was created. If an json object is passed, use that data. In both
       * cases, the data is validated against the schema that the model has been
       * initialized with, unless it is missing schema information (for
       * backwards-compatibility). Returns the instance for chaining. To reload
       * the data, set the "loaded" property to false first.
       *
       * @param {Object|undefined} data The json data
       * @return {qx.tool.config.Abstract} Returns the instance for chaining
       */
      load: function load() {
        var _arguments = arguments,
          _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var data, templateFunction, dataSchemaInfo, dataVersion, schemaVersion, s;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                data = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : undefined;
                if (!(data === undefined)) {
                  _context2.next = 32;
                  break;
                }
                if (!_this2.isLoaded()) {
                  _context2.next = 4;
                  break;
                }
                return _context2.abrupt("return", _this2);
              case 4:
                _context2.next = 6;
                return fs.existsAsync(_this2.getDataPath());
              case 6:
                if (!_context2.sent) {
                  _context2.next = 14;
                  break;
                }
                _context2.t0 = qx.tool.utils.Json;
                _context2.next = 10;
                return fs.readFileAsync(_this2.getDataPath(), "utf8");
              case 10:
                _context2.t1 = _context2.sent;
                data = _context2.t0.parseJson.call(_context2.t0, _context2.t1);
                _context2.next = 32;
                break;
              case 14:
                if (!_this2.isCreateIfNotExists()) {
                  _context2.next = 31;
                  break;
                }
                _context2.next = 17;
                return qx.tool.config.Manifest.getInstance().exists();
              case 17:
                if (!_context2.sent) {
                  _context2.next = 28;
                  break;
                }
                // but only if we have a template
                templateFunction = _this2.getTemplateFunction();
                if (!templateFunction) {
                  _context2.next = 25;
                  break;
                }
                data = templateFunction.bind(_this2)();
                if (qx.lang.Type.isObject(data)) {
                  _context2.next = 23;
                  break;
                }
                throw new Error("Template for config file ".concat(_this2.getRelativeDataPath(), " is invalid. Must be an object."));
              case 23:
                _context2.next = 26;
                break;
              case 25:
                throw new Error("Cannot create config file ".concat(_this2.getRelativeDataPath(), " without a template."));
              case 26:
                _context2.next = 29;
                break;
              case 28:
                throw new Error("Cannot create config file ".concat(_this2.getRelativeDataPath(), " since no Manifest exists. Are you in the library root?"));
              case 29:
                _context2.next = 32;
                break;
              case 31:
                throw new Error("Cannot load config file: ".concat(_this2.getRelativeDataPath(), " does not exist. Are you in the library root?"));
              case 32:
                if (data.$schema === undefined) {
                  // don't validate if there is no schema
                  _this2.setValidate(false);
                }
                // load schema if validation is enabled
                if (!(_this2.isValidate() && _this2.getVersion() !== null)) {
                  _context2.next = 49;
                  break;
                }
                // check initial data
                dataSchemaInfo = qx.tool.utils.Json.getSchemaInfo(data);
                if (dataSchemaInfo) {
                  _context2.next = 37;
                  break;
                }
                throw new Error("Invalid data: no schema found, must be of schema ".concat(_this2.getSchemaUri(), "!"));
              case 37:
                dataVersion = semver.major(semver.coerce(dataSchemaInfo.version));
                schemaVersion = semver.major(semver.coerce(_this2.getVersion())); // use version given in the config file, but warn if we expect a different one
                if (dataVersion !== schemaVersion) {
                  _this2.warn("Possible schema version mismatch in ".concat(_this2.getDataPath(), ": expected v").concat(schemaVersion, ", found v").concat(dataVersion, "."));
                  if (dataVersion) {
                    _this2.setVersion(dataSchemaInfo.version);
                  } else {
                    // don't validate if there is no schema
                    _this2.setValidate(false);
                  }
                }
                // load schema
                if (_this2.__P_511_0) {
                  _context2.next = 49;
                  break;
                }
                s = _this2.getSchemaPath();
                _context2.next = 44;
                return fs.existsAsync(s);
              case 44:
                if (_context2.sent) {
                  _context2.next = 46;
                  break;
                }
                throw new Error("No schema file exists at ".concat(_this2.getSchemaPath()));
              case 46:
                _context2.next = 48;
                return qx.tool.utils.Json.loadJsonAsync(s);
              case 48:
                _this2.__P_511_0 = _context2.sent;
              case 49:
                // validate and save
                _this2.setData(data);
                _this2.setLoaded(true);
                return _context2.abrupt("return", _this2);
              case 52:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns a value from the configuration map
       * @param prop_path {String|Array} The property path. See https://github.com/jonschlinkert/get-value#usage
       * @param options {*?} See https://github.com/jonschlinkert/get-value#options
       * @return {*}
       */
      getValue: function getValue(prop_path, options) {
        return get_value(this.getData(), prop_path, options);
      },
      /**
       * Sets a value from the configuration map and validates the result against
       * the json schema of the model
       * @param prop_path {String|Array} The property path. See https://github.com/jonschlinkert/set-value#usage
       * @param value {*}
       * @param options {*?} See https://github.com/jonschlinkert/get-value#options
       * @return {qx.tool.config.Abstract} Returns the instance for chaining
       */
      setValue: function setValue(prop_path, value, options) {
        var originalValue = this.getValue(prop_path, options);
        set_value(this.getData(), prop_path, value, {
          preservePaths: false
        });
        try {
          this.validate();
        } catch (e) {
          // revert change
          if (originalValue === undefined) {
            unset_value(this.getData(), prop_path);
          } else {
            set_value(this.getData(), prop_path, originalValue, {
              preservePaths: false
            });
          }
          // throw
          throw e;
        }
        this.setDirty(true);
        return this;
      },
      /**
       * Unsets a property from the configuration map and validates the model
       * @param prop_path {String|Array} The property path. See https://github.com/jonschlinkert/set-value#usage
       * @param options {*?} See https://github.com/jonschlinkert/get-value#options
       * @return {qx.tool.config.Abstract} Returns the instance for chaining
       */
      unset: function unset(prop_path, options) {
        var originalValue = this.getValue(prop_path, options);
        unset_value(this.getData(), prop_path);
        try {
          this.validate();
        } catch (e) {
          // revert value
          set_value(this.getData(), prop_path, originalValue, {
            preservePaths: false
          });

          // throw
          throw e;
        }
        this.setDirty(true);
        return this;
      },
      /**
       * Transforms a value at a given property path, using a function.
       * @param prop_path {String|Array}
       *    The property path. See https://github.com/jonschlinkert/set-value#usage
       * @param transformFunc {Function}
       *    The transformation function, which receives the value of the property
       *    and returns the transformed value, which then is validated and saved.
       * @param options {*?} See https://github.com/jonschlinkert/get-value#options
       * @return {qx.tool.config.Abstract} Returns the instance for chaining
       */
      transform: function transform(prop_path, transformFunc, options) {
        var transformedValue = transformFunc(this.getValue(prop_path, options));
        if (transformedValue === undefined) {
          throw new Error("Return value of transformation fuction must not be undefined.");
        }
        this.setValue(prop_path, transformedValue, options);
        return this;
      },
      /**
       * Given a map containing property paths as keys and arbitrary values,
       * return the map with values that are true if the property path exists
       * and false otherwise.
       * @param propOrMap
       * @return {boolean|*}
       */
      keyExists: function keyExists(propOrMap) {
        if (qx.lang.Type.isString(propOrMap)) {
          return this.getValue(propOrMap) !== undefined;
        } else if (qx.lang.Type.isObject(propOrMap)) {
          var res = false;
          var _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(propOrMap)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var key = _step.value;
              propOrMap[key] = this.keyExists(key);
              res = res || propOrMap[key];
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return res;
        }
        throw new TypeError("Invalid argument");
      },
      /**
       * Validates the stored config model data. Used when data is changed
       * outside of the API. Will not validate if validate property is false.
       */
      validate: function validate() {
        this._validateData(this.getData());
      },
      /**
       * Save the data to the config file
       * @return {Promise<void>}
       */
      save: function save() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _this3.validate();
                _context3.next = 3;
                return qx.tool.utils.Json.saveJsonAsync(_this3.getDataPath(), _this3.getData());
              case 3:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.config.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1735383874144