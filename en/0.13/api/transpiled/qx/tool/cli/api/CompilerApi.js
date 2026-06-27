function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.tool.cli.api.AbstractApi": {
        "construct": true,
        "require": true
      },
      "qx.tool.cli.commands.Command": {},
      "qx.tool.utils.Json": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2019 Zenesis Limited, http://www.zenesis.com
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  var path = require("path");
  var fs = qx.tool.utils.Promisify.fs;

  /**
   * Provides an API for the compiler
   *
   */
  qx.Class.define("qx.tool.cli.api.CompilerApi", {
    extend: qx.tool.cli.api.AbstractApi,
    construct: function construct() {
      var _this = this;
      qx.tool.cli.api.AbstractApi.constructor.call(this);
      this.__P_474_0 = {};
      this.__P_474_1 = true;
      this.addListener("changeCommand", function () {
        _this.afterCommandLoaded(_this.getCommand());
      });
    },
    properties: {
      /** Default filename to load from */
      configFilename: {
        check: "String",
        nullable: false
      },
      /** The current command */
      command: {
        init: null,
        nullable: true,
        check: "qx.tool.cli.commands.Command",
        event: "changeCommand"
      }
    },
    members: {
      __P_474_0: null,
      /**
       * Called after the command is loaded
       * @param cmd {qx.tool.cli.commands.Command} current command
       */
      afterCommandLoaded: function afterCommandLoaded(cmd) {
        // Nothing
      },
      /**
       * Register compiler tests
       * @param cmd {qx.tool.cli.commands.Command} current command
       */
      beforeTests: function beforeTests(cmd) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
            }
          }, _callee);
        }))();
      } // Nothing
      ,
      /**
       * called after deployment happens
       *
       * @param data {Object}  contains deployment infos with the following properties:
       *           targetDir  : {String}  The target dir of the build
       *           deployDir  : {String}  The output dir for the deployment
       *           argv       : {Object}  Arguments
       *           application: {Object}  application to build
       * @return {Promise<void>}
       */
      afterDeploy: function afterDeploy(data) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      } // Nothing
      ,
      /**
       * Loads the configuration data
       *
       * @overridden
       */
      load: function load() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var compileJsonPath, config;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                compileJsonPath = path.join(_this2.getRootDir(), _this2.getConfigFilename());
                config = {};
                _context3.n = 1;
                return fs.existsAsync(compileJsonPath);
              case 1:
                if (!_context3.v) {
                  _context3.n = 3;
                  break;
                }
                _context3.n = 2;
                return qx.tool.utils.Json.loadJsonAsync(compileJsonPath);
              case 2:
                config = _context3.v;
                _context3.n = 4;
                break;
              case 3:
                _this2.__P_474_1 = false;
              case 4:
                _this2.setConfiguration(config);
                return _context3.a(2, qx.tool.cli.api.CompilerApi.superclass.prototype.load.call(_this2));
            }
          }, _callee3);
        }))();
      },
      compileJsonExists: function compileJsonExists() {
        return this.__P_474_1;
      },
      /**
       * runs after the whole process is finished
       * @param cmd {qx.tool.cli.commands.Command} current command
       * @param res {boolean} result of the just finished process
       */
      afterProcessFinished: function afterProcessFinished(cmd, res) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      } // Nothing
      ,
      /**
       * Called after all libraries have been loaded and added to the compilation data
       */
      afterLibrariesLoaded: function afterLibrariesLoaded() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var arr, i;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                arr = _this3.getLibraryApis(), i = 0;
              case 1:
                if (!(i < arr.length)) {
                  _context5.n = 3;
                  break;
                }
                _context5.n = 2;
                return arr[i].afterLibrariesLoaded();
              case 2:
                i++;
                _context5.n = 1;
                break;
              case 3:
                return _context5.a(2);
            }
          }, _callee5);
        }))();
      },
      /**
       * Adds a library configuration
       *
       * @param libraryApi {LibraryApi} the configuration for the library
       */
      addLibraryApi: function addLibraryApi(libraryApi) {
        var dir = path.resolve(libraryApi.getRootDir());
        this.__P_474_0[dir] = libraryApi;
      },
      /**
       * Returns an array of library configurations
       *
       * @return {LibraryApi[]}
       */
      getLibraryApis: function getLibraryApis() {
        return Object.values(this.__P_474_0);
      }
    }
  });
  qx.tool.cli.api.CompilerApi.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CompilerApi.js.map?dt=1782595069378