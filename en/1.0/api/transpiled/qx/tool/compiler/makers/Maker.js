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
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.Analyser": {}
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
   *      2011-2017 Zenesis Limited, http://www.zenesis.com
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

  var path = require("upath");

  /**
   * Base class for makers; does not include anything about targets, locales, etc (see AbstractAppMaker)
   */
  qx.Class.define("qx.tool.compiler.makers.Maker", {
    extend: qx.core.Object,
    type: "abstract",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this._compiledClasses = {};
    },
    properties: {
      /** Database filename relative to the target's output directory; if null, defaults to db.json; absolute paths can be used */
      dbFilename: {
        init: null,
        nullable: true,
        check: "String",
        apply: "__P_503_0"
      },
      /** Map of environment settings */
      environment: {
        init: null,
        nullable: true
      },
      /** Blocks automatic deleting of the output directory */
      noErase: {
        init: false,
        check: "Boolean"
      },
      /** Whether the make has succeeded, null during/before make */
      success: {
        init: null,
        nullable: true,
        check: "Boolean"
      },
      /** Whether the make has any warnings, null during/before make */
      hasWarnings: {
        init: null,
        nullable: true,
        check: "Boolean"
      }
    },
    events: {
      making: "qx.event.type.Event",
      made: "qx.event.type.Event",
      writingApplications: "qx.event.type.Event",
      writingApplication: "qx.event.type.Data",
      writtenApplication: "qx.event.type.Data",
      writtenApplications: "qx.event.type.Event"
    },
    members: {
      /** {Analyser} current analyser (created on demand) */
      _analyser: null,
      /** Lookup of classes which have been compiled this session; this is a map where the keys are
       * the class name and the value is `true`, it is erased periodically
       */
      _compiledClasses: null,
      /**
       * Makes the application
       *
       * @abstract
       */
      make: function make() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                throw new Error("No implementation for " + _this.classname + ".make");
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Returns the output directory, with a trailing slash
       *
       * @returns {String}
       * @abstract
       */
      getOutputDir: function getOutputDir() {
        throw new Error("No implementation for " + this.classname + ".getOutputDir");
      },
      /**
       * Erases the output directory
       */
      eraseOutputDir: function eraseOutputDir() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var dir, pwd;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                dir = path.resolve(_this2.getOutputDir());
                pwd = path.resolve(process.cwd());
                if (!(pwd.startsWith(dir) && dir.length <= pwd.length)) {
                  _context2.n = 1;
                  break;
                }
                throw new Error("Output directory (" + dir + ") is a parent directory of PWD");
              case 1:
                _context2.n = 2;
                return qx.tool.utils.files.Utils.deleteRecursive(_this2.getOutputDir());
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Apply for databaseName property
       * @param value
       * @param oldValue
       * @private
       */
      __P_503_0: function __P_503_0(value, oldValue) {
        if (this._analyser) {
          throw new Error("Cannot change the database filename once an Analyser has been created");
        }
      },
      /**
       * Gets the analyser, creating it if necessary
       * @returns {Analyser}
       */
      getAnalyser: function getAnalyser() {
        var _this3 = this;
        if (this._analyser) {
          return this._analyser;
        }
        this._analyser = this._createAnalyser();
        this._analyser.addListener("compiledClass", function (evt) {
          var data = evt.getData();
          _this3._compiledClasses[data.classFile.getClassName()] = true;
        });
        return this._analyser;
      },
      /**
       * Returns a list of classes which have been compiled in this session
       *
       * @param eraseAfter {Boolean?} if true, the list is reset after returning
       * @return {Map} list of class names that have been compiled
       */
      getRecentlyCompiledClasses: function getRecentlyCompiledClasses(eraseAfter) {
        var classes = this._compiledClasses;
        if (eraseAfter) {
          this._compiledClasses = {};
        }
        return classes;
      },
      /**
       * Creates the analyser
       * @returns {Analyser}
       * @protected
       */
      _createAnalyser: function _createAnalyser() {
        var analyser = this._analyser = new qx.tool.compiler.Analyser(path.join(this.getOutputDir(), this.getDbFilename() || "db.json"));
        analyser.setOutputDir(this.getOutputDir());
        return analyser;
      }
    }
  });
  qx.tool.compiler.makers.Maker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Maker.js.map?dt=1782705794276