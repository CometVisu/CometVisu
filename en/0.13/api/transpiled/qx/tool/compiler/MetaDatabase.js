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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      this.__P_492_0 = {};
      this.__P_492_1 = {};
      this.__P_492_2 = {};
      this.__P_492_3 = {};
      this.__P_492_4 = {};
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
      __P_492_0: null,
      /** @type{Map<String,Boolean} list of classes which need to have their second pass */
      __P_492_3: null,
      /** The database */
      __P_492_4: null,
      /**
       * Saves the database
       */
      save: function save() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.utils.Utils.makeDirs(_this.getRootDir());
              case 1:
                _this.__P_492_4.classnames = Object.keys(_this.__P_492_0);
                _context.n = 2;
                return qx.tool.utils.Json.saveJsonAsync(_this.getRootDir() + "/db.json", _this.__P_492_4);
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      getDatabase: function getDatabase() {
        return this.__P_492_4;
      },
      /**
       * Loads the database and all of the meta data
       */
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var filename, data, _iterator, _step, classname, _filename, meta, classFilename, _t;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                filename = _this2.getRootDir() + "/db.json";
                if (fs.existsSync(filename)) {
                  _context2.n = 1;
                  break;
                }
                return _context2.a(2);
              case 1:
                _this2.__P_492_0 = {};
                _this2.__P_492_3 = {};
                _context2.n = 2;
                return qx.tool.utils.Json.loadJsonAsync(filename);
              case 2:
                data = _context2.v;
                _this2.__P_492_4 = data;
                _iterator = _createForOfIteratorHelper(data.classnames);
                _context2.p = 3;
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context2.n = 8;
                  break;
                }
                classname = _step.value;
                _filename = _this2.getRootDir() + "/" + classname.replace(/\./g, "/") + ".json";
                if (!fs.existsSync(_filename)) {
                  _context2.n = 7;
                  break;
                }
                _context2.n = 5;
                return qx.tool.utils.Utils.makeParentDir(_filename);
              case 5:
                meta = new qx.tool.compiler.MetaExtraction(_this2.getRootDir());
                _context2.n = 6;
                return meta.loadMeta(_filename);
              case 6:
                _this2.__P_492_0[classname] = meta;
                classFilename = meta.getMetaData().classFilename;
                classFilename = path.resolve(path.join(_this2.getRootDir(), classFilename));
                _this2.__P_492_1[classFilename] = meta;
              case 7:
                _context2.n = 4;
                break;
              case 8:
                _context2.n = 10;
                break;
              case 9:
                _context2.p = 9;
                _t = _context2.v;
                _iterator.e(_t);
              case 10:
                _context2.p = 10;
                _iterator.f();
                return _context2.f(10);
              case 11:
                return _context2.a(2);
            }
          }, _callee2, null, [[3, 9, 10, 11]]);
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
          if (pos < 0 && this.__P_492_0[packageName + "." + type]) {
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var meta, metaData, _t2;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return qx.tool.utils.files.Utils.correctCase(filename);
              case 1:
                filename = _context3.v;
                filename = path.resolve(filename);
                meta = _this3.__P_492_1[filename];
                _t2 = meta && !force;
                if (!_t2) {
                  _context3.n = 3;
                  break;
                }
                _context3.n = 2;
                return meta.isOutOfDate();
              case 2:
                _t2 = !_context3.v;
              case 3:
                if (!_t2) {
                  _context3.n = 4;
                  break;
                }
                return _context3.a(2);
              case 4:
                meta = new qx.tool.compiler.MetaExtraction(_this3.getRootDir());
                _context3.n = 5;
                return meta.parse(filename);
              case 5:
                metaData = _context3.v;
                if (!(metaData.className === undefined)) {
                  _context3.n = 6;
                  break;
                }
                return _context3.a(2);
              case 6:
                _this3.__P_492_0[metaData.className] = meta;
                _this3.__P_492_1[filename] = meta;
                _this3.__P_492_3[metaData.className] = true;
              case 7:
                return _context3.a(2);
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
        return Object.keys(this.__P_492_0);
      },
      /**
       * Returns the meta data for a class
       *
       * @param {String} className
       * @returns
       */
      getMetaData: function getMetaData(className) {
        var _this$__P_492_0$class;
        return ((_this$__P_492_0$class = this.__P_492_0[className]) === null || _this$__P_492_0$class === void 0 ? void 0 : _this$__P_492_0$class.getMetaData()) || null;
      },
      /**
       * Once all meta data has been loaded, this method traverses the database
       * to add information that can only be added once all classes are known,
       * eg which methods override other methods and where they were overridden from
       */
      reparseAll: function reparseAll() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var classnames, derivedClassLookup, i, className, derived, _iterator2, _step2, derivedClass, _i, _classnames, _className, meta, metaData, typeResolver, filename;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                classnames = Object.keys(_this4.__P_492_3);
                _this4.__P_492_3 = {};
                derivedClassLookup = _this4.__P_492_5();
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
              case 1:
                if (!(_i < _classnames.length)) {
                  _context4.n = 3;
                  break;
                }
                _className = _classnames[_i];
                meta = _this4.__P_492_0[_className];
                metaData = meta.getMetaData();
                typeResolver = {
                  resolveType: _this4.resolveType.bind(_this4, metaData)
                };
                meta.fixupJsDoc(typeResolver);
                _this4.__P_492_6(metaData);
                _this4.__P_492_7(metaData, "members");
                _this4.__P_492_7(metaData, "statics");
                _this4.__P_492_7(metaData, "properties");
                filename = _this4.getRootDir() + "/" + _className.replace(/\./g, "/") + ".json";
                _context4.n = 2;
                return meta.saveMeta(filename);
              case 2:
                _i++;
                _context4.n = 1;
                break;
              case 3:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      __P_492_5: function __P_492_5() {
        var lookup = {};
        var add = function add(key, item) {
          var _lookup$key;
          (_lookup$key = lookup[key]) !== null && _lookup$key !== void 0 ? _lookup$key : lookup[key] = new Set();
          lookup[key].add(item);
        };
        for (var classname in this.__P_492_0) {
          var _lookup$classname, _metaData$mixins, _metaData$interfaces;
          (_lookup$classname = lookup[classname]) !== null && _lookup$classname !== void 0 ? _lookup$classname : lookup[classname] = new Set(); // ensuring this makes operations with the lookup simpler
          var metaData = this.__P_492_0[classname].getMetaData();
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
      __P_492_8: function __P_492_8(metaData, methodName, firstPass) {
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
              var mixinMeta = this.__P_492_0[mixinName];
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
        var superMeta = this.__P_492_0[metaData.superClass];
        if (superMeta) {
          return this.__P_492_8(superMeta.getMetaData(), methodName, false);
        }
        return null;
      },
      /**
       * @param {*} metaData class metadata
       * @param {string} entryKind name of the entry type
       * @param {string} entryName name of the entry
       * @returns {string[]} list of classes where the entry appears
       */
      __P_492_9: function __P_492_9(metaData, entryKind, entryName) {
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
          var currentMeta = this.__P_492_0[toResolve.shift()];
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
      __P_492_6: function __P_492_6(metaData) {
        if (!metaData.members) {
          return;
        }
        if (metaData["abstract"]) {
          var _metaData$interfaces2;
          var _iterator6 = _createForOfIteratorHelper((_metaData$interfaces2 = metaData.interfaces) !== null && _metaData$interfaces2 !== void 0 ? _metaData$interfaces2 : []),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _this$__P_492_0$itf;
              var itf = _step6.value;
              var itfMembers = (_this$__P_492_0$itf = this.__P_492_0[itf]) === null || _this$__P_492_0$itf === void 0 ? void 0 : _this$__P_492_0$itf.getMetaData().members;
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
          var superMethod = this.__P_492_8(metaData, methodName, true);
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
      __P_492_7: function __P_492_7(metaData, kind) {
        var _metaData$kind, _metaData$mixins2;
        (_metaData$kind = metaData[kind]) !== null && _metaData$kind !== void 0 ? _metaData$kind : metaData[kind] = {};
        var _iterator7 = _createForOfIteratorHelper((_metaData$mixins2 = metaData.mixins) !== null && _metaData$mixins2 !== void 0 ? _metaData$mixins2 : []),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _this$__P_492_0$mixin;
            var mixin = _step7.value;
            var mixinMeta = (_this$__P_492_0$mixin = this.__P_492_0[mixin]) === null || _this$__P_492_0$mixin === void 0 ? void 0 : _this$__P_492_0$mixin.getMetaData();
            for (var _name in (_mixinMeta$kind = mixinMeta === null || mixinMeta === void 0 ? void 0 : mixinMeta[kind]) !== null && _mixinMeta$kind !== void 0 ? _mixinMeta$kind : {}) {
              var _mixinMeta$kind;
              var appearsIn = this.__P_492_9(metaData, kind, _name);
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
          meta.appearsIn = this.__P_492_9(metaData, kind, name);
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

//# sourceMappingURL=MetaDatabase.js.map?dt=1782595071430