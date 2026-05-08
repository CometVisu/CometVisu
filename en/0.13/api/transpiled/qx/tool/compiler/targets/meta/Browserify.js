function _regeneratorKeys(e) { var n = Object(e), r = []; for (var t in n) r.unshift(t); return function e() { for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e; return e.done = !0, e; }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.compiler.targets.meta.AbstractJavascriptMeta": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.files.Utils": {},
      "qx.lang.Object": {},
      "qx.tool.compiler.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo-compiler
   *
   *    Copyright:
   *      2022 Derrell Lipman
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * Derrell Lipman (@derrell)
   *
   * ************************************************************************/

  var hash = require("object-hash");

  /**
   *
   */
  qx.Class.define("qx.tool.compiler.targets.meta.Browserify", {
    extend: qx.tool.compiler.targets.meta.AbstractJavascriptMeta,
    construct: function construct(appMeta) {
      qx.tool.compiler.targets.meta.AbstractJavascriptMeta.constructor.call(this, appMeta, "".concat(appMeta.getApplicationRoot(), "commonjs-browserify.js"));
      this.setNeedsWriteToDisk(true);
    },
    members: {
      __P_515_0: null,
      __P_515_1: null,
      __P_515_2: function __P_515_2() {
        if (this.__P_515_0 === null) {
          var commonjsModules = new Set();
          var references = {};
          var db = this.getAppMeta().getAnalyser().getDatabase();
          var localModules = this.getAppMeta().getApplication().getLocalModules() || {};
          // Get a Set of unique `require`d CommonJS module names from
          // all classes
          var _loop = function _loop() {
            var classInfo = db.classInfo[className];
            if (classInfo.commonjsModules) {
              Object.keys(classInfo.commonjsModules).forEach(function (moduleName) {
                // Ignore this found `require()` if its a local modules
                if (!(moduleName in localModules)) {
                  // Add this module name to the set of module names
                  commonjsModules.add(moduleName);
                }
                // Add the list of references from which this module was require()d
                if (!references[moduleName]) {
                  references[moduleName] = new Set();
                }
                references[moduleName].add(_toConsumableArray(classInfo.commonjsModules[moduleName]));
              });
            }
          };
          for (var className in db.classInfo) {
            _loop();
          }
          this.__P_515_0 = _toConsumableArray(commonjsModules);
          this.__P_515_1 = references;
        }
        return {
          commonjsModules: this.__P_515_0,
          references: this.__P_515_1
        };
      },
      /**
       * @Override
       */
      writeToDisk: function writeToDisk() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _db$modulesInfo2;
          var localModules, db, _this$__P_515_, commonjsModules, modules, modulesInfo, doIt, requireName, _db$modulesInfo, stat, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                localModules = _this.getAppMeta().getApplication().getLocalModules();
                db = _this.getAppMeta().getAnalyser().getDatabase();
                _this$__P_515_ = _this.__P_515_2(), commonjsModules = _this$__P_515_.commonjsModules;
                modules = [];
                modulesInfo = {};
                _context.n = 1;
                return qx.tool.utils.files.Utils.safeStat(_this.getFilename());
              case 1:
                doIt = !!!_context.v;
                // Include any dynamically determined `require()`d modules
                if (commonjsModules.length > 0) {
                  modules.push(commonjsModules);
                }
                // Include any local modules specified for the application
                // in compile.json
                if (!localModules) {
                  _context.n = 4;
                  break;
                }
                modulesInfo.localModules = {};
                _t = _regeneratorKeys(localModules);
              case 2:
                if ((_t2 = _t()).done) {
                  _context.n = 4;
                  break;
                }
                requireName = _t2.value;
                modules.push(requireName);
                _context.n = 3;
                return qx.tool.utils.files.Utils.safeStat(localModules[requireName]);
              case 3:
                stat = _context.v;
                modulesInfo.localModules[requireName] = stat.mtime.getTime();
                doIt || (doIt = modulesInfo.localModules[requireName] > ((db === null || db === void 0 || (_db$modulesInfo = db.modulesInfo) === null || _db$modulesInfo === void 0 ? void 0 : _db$modulesInfo.localModules[requireName]) || 0));
                _context.n = 2;
                break;
              case 4:
                modulesInfo.modulesHash = hash(modules);
                doIt || (doIt = modulesInfo.modulesHash !== ((db === null || db === void 0 || (_db$modulesInfo2 = db.modulesInfo) === null || _db$modulesInfo2 === void 0 ? void 0 : _db$modulesInfo2.modulesHash) || ""));
                if (!doIt) {
                  _context.n = 5;
                  break;
                }
                db.modulesInfo = modulesInfo;
                _context.n = 5;
                return _this.getAppMeta().getAnalyser().saveDatabase();
              case 5:
                _this.setNeedsWriteToDisk(doIt);
                return _context.a(2, qx.tool.compiler.targets.meta.Browserify.superclass.prototype.writeToDisk.call(_this));
            }
          }, _callee);
        }))();
      },
      /**
       * @Override
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var localModules, _this2$__P_515_, commonjsModules, references;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!(_this2.getAppMeta().getEnvironmentValue("qx.compiler.applicationType") == "browser")) {
                  _context2.n = 1;
                  break;
                }
                localModules = _this2.getAppMeta().getApplication().getLocalModules();
                _this2$__P_515_ = _this2.__P_515_2(), commonjsModules = _this2$__P_515_.commonjsModules, references = _this2$__P_515_.references;
                if (!(commonjsModules.length > 0 || localModules)) {
                  _context2.n = 1;
                  break;
                }
                _context2.n = 1;
                return _this2.__P_515_3(commonjsModules, references, localModules, ws);
              case 1:
                _context2.n = 2;
                return new Promise(function (resolve) {
                  ws.write("\n", resolve);
                });
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      __P_515_3: function __P_515_3(commonjsModules, references, localModules, ws) {
        var _this3 = this;
        var babelify = require("babelify");
        var preset = require("@babel/preset-env");
        var browserify = require("browserify");
        var builtins = require("browserify/lib/builtins.js");

        // For some reason, `process` is not require()able, but `_process` is.
        // Make them equivalent.
        builtins.process = builtins._process;
        return new Promise(function (resolve, reject) {
          var _this3$getAppMeta$get;
          var options = {
            builtins: builtins,
            ignoreMissing: true,
            insertGlobals: true,
            detectGlobals: true
          };
          qx.lang.Object.mergeWith(options, ((_this3$getAppMeta$get = _this3.getAppMeta().getAnalyser().getBrowserifyConfig()) === null || _this3$getAppMeta$get === void 0 ? void 0 : _this3$getAppMeta$get.options) || {}, false);
          var b = browserify([], options);
          b._mdeps.on("missing", function (id, parent) {
            var message = [];
            message.push("ERROR: could not locate require()d module: \"".concat(id, "\""));
            message.push("  required from:");
            try {
              _toConsumableArray(references[id]).forEach(function (refs) {
                refs.forEach(function (ref) {
                  message.push("    ".concat(ref));
                });
              });
            } catch (e) {
              message.push("    <compile.json:application.localModules'>");
            }
            qx.tool.compiler.Console.error(message.join("\n"));
          });

          // Include any dynamically determined `require()`d modules
          if (commonjsModules.length > 0) {
            b.require(commonjsModules);
          }

          // Include any local modules specified for the application
          // in compile.json
          if (localModules) {
            for (var requireName in localModules) {
              b.require(localModules[requireName], {
                expose: requireName
              });
            }
          }
          // Ensure ES6 local modules are converted to CommonJS format
          b.transform(babelify, {
            presets: [preset],
            sourceMaps: false,
            global: true
          });
          b.bundle(function (e, output) {
            var _this4 = this;
            if (e) {
              // THIS IS A HACK!
              // In case of error dependency walker never returns from
              // ```if (self.inputPending > 0) return setTimeout(resolve);```
              // because inputPending is not decremented anymore.
              // so set it to 0 here.
              var d = b.pipeline.get("deps");
              d.get(0).inputPending = 0;
              qx.tool.compiler.Console.error("Unable to browserify - this is probably because a module is being require()'d which is not compatible with Browserify:\n".concat(e.message));
              setTimeout(function () {
                _this4.emit("end");
              });
              return;
            }
            // in case of end event output can not be writen.
            // so catch the error and ignore it
            try {
              ws.write(output);
            } catch (err) {}
            resolve(null);
          });
        });
      },
      /**
       * @Override
       */
      getSourceMap: function getSourceMap() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, null);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.Browserify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Browserify.js.map?dt=1778272844707