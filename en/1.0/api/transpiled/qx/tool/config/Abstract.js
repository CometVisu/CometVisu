function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      __P_521_0: null,
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
        if (!this.__P_521_0) {
          throw new Error("Cannot validate - no schema available! Please load the model first.");
        }
        try {
          qx.tool.utils.Json.validate(data, this.__P_521_0);
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
        return this.__P_521_0;
      },
      /**
       * Returns true if the config file exists, false if not
       * @return {Promise<Boolean>}
       */
      exists: function exists() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return fs.existsAsync(_this.getDataPath());
              case 1:
                return _context.a(2, _context.v);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var data, templateFunction, dataSchemaInfo, dataVersion, schemaVersion, s, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                data = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : undefined;
                if (!(data === undefined)) {
                  _context2.n = 12;
                  break;
                }
                if (!_this2.isLoaded()) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2, _this2);
              case 1:
                _context2.n = 2;
                return fs.existsAsync(_this2.getDataPath());
              case 2:
                if (!_context2.v) {
                  _context2.n = 4;
                  break;
                }
                _t = qx.tool.utils.Json;
                _context2.n = 3;
                return fs.readFileAsync(_this2.getDataPath(), "utf8");
              case 3:
                data = _t.parseJson.call(_t, _context2.v);
                _context2.n = 12;
                break;
              case 4:
                if (!_this2.isCreateIfNotExists()) {
                  _context2.n = 11;
                  break;
                }
                _context2.n = 5;
                return qx.tool.config.Manifest.getInstance().exists();
              case 5:
                if (!_context2.v) {
                  _context2.n = 9;
                  break;
                }
                // but only if we have a template
                templateFunction = _this2.getTemplateFunction();
                if (!templateFunction) {
                  _context2.n = 7;
                  break;
                }
                data = templateFunction.bind(_this2)();
                if (qx.lang.Type.isObject(data)) {
                  _context2.n = 6;
                  break;
                }
                throw new Error("Template for config file ".concat(_this2.getRelativeDataPath(), " is invalid. Must be an object."));
              case 6:
                _context2.n = 8;
                break;
              case 7:
                throw new Error("Cannot create config file ".concat(_this2.getRelativeDataPath(), " without a template."));
              case 8:
                _context2.n = 10;
                break;
              case 9:
                throw new Error("Cannot create config file ".concat(_this2.getRelativeDataPath(), " since no Manifest exists. Are you in the library root?"));
              case 10:
                _context2.n = 12;
                break;
              case 11:
                throw new Error("Cannot load config file: ".concat(_this2.getRelativeDataPath(), " does not exist. Are you in the library root?"));
              case 12:
                if (data.$schema === undefined) {
                  // don't validate if there is no schema
                  _this2.setValidate(false);
                }
                // load schema if validation is enabled
                if (!(_this2.isValidate() && _this2.getVersion() !== null)) {
                  _context2.n = 17;
                  break;
                }
                // check initial data
                dataSchemaInfo = qx.tool.utils.Json.getSchemaInfo(data);
                if (dataSchemaInfo) {
                  _context2.n = 13;
                  break;
                }
                throw new Error("Invalid data: no schema found, must be of schema ".concat(_this2.getSchemaUri(), "!"));
              case 13:
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
                if (_this2.__P_521_0) {
                  _context2.n = 17;
                  break;
                }
                s = _this2.getSchemaPath();
                _context2.n = 14;
                return fs.existsAsync(s);
              case 14:
                if (_context2.v) {
                  _context2.n = 15;
                  break;
                }
                throw new Error("No schema file exists at ".concat(_this2.getSchemaPath()));
              case 15:
                _context2.n = 16;
                return qx.tool.utils.Json.loadJsonAsync(s);
              case 16:
                _this2.__P_521_0 = _context2.v;
              case 17:
                // validate and save
                _this2.setData(data);
                _this2.setLoaded(true);
                return _context2.a(2, _this2);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _this3.validate();
                _context3.n = 1;
                return qx.tool.utils.Json.saveJsonAsync(_this3.getDataPath(), _this3.getData());
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.config.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1782967164409