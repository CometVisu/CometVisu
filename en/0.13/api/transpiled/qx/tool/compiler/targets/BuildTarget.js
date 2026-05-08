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
      "qx.tool.compiler.targets.Target": {
        "require": true
      },
      "qx.tool.compiler.targets.meta.Uglify": {}
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
   * ************************************************************************/
  /**
   * Compiles a "build" application, minified and self contained application
   */
  qx.Class.define("qx.tool.compiler.targets.BuildTarget", {
    extend: qx.tool.compiler.targets.Target,
    properties: {
      /** Whether to minify the output */
      minify: {
        init: "mangle",
        check: ["off", "minify", "mangle", "beautify"],
        nullable: false
      },
      /** Whether to preserve unminified output */
      saveUnminified: {
        init: false,
        check: "Boolean",
        nullable: false
      },
      /** Whether to save the source in the map file */
      saveSourceInMap: {
        init: false,
        check: "Boolean",
        nullable: false
      },
      /** Deploy directory (guaranteed to have a trailing slash) */
      deployDir: {
        init: null,
        nullable: true,
        check: "String",
        transform: "_transformOutputDir"
      },
      /** Whether to deploy the source maps */
      deployMap: {
        init: false,
        check: "Boolean",
        nullable: false
      },
      defaultEnvironment: {
        init: {
          "qx.debug": false
        },
        refine: true
      }
    },
    events: {
      /**
       * Fired when minification begins, data is a map containing:
       *  application {qx.tool.compiler.app.Application} the app being minified
       *  part: {String} the part being minified
       *  filename: {String} the part filename
       */
      minifyingApplication: "qx.event.type.Data",
      /**
       * Fired when minification is done, data is a map containing:
       *  application {qx.tool.compiler.app.Application} the app being minified
       *  part: {String} the part being minified
       *  filename: {String} the part filename
       */
      minifiedApplication: "qx.event.type.Data"
    },
    members: {
      /*
       * @Override
       */
      _writeApplication: function _writeApplication() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var appMeta, doUglify, bootMeta, bootPart;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                appMeta = _this.getAppMeta();
                appMeta.setSourceUri(".");
                _context.n = 1;
                return appMeta.syncAssets();
              case 1:
                doUglify = appMeta.getTarget().getMinify() != "off";
                bootMeta = appMeta.getBootMetaJs();
                bootPart = appMeta.getParts()[0];
                appMeta.getPackages().forEach(function (pkg) {
                  pkg.setEmbedAllJavascript(true);
                  if (bootPart.hasPackage(pkg)) {
                    pkg.setNeedsWriteToDisk(false);
                    bootMeta.addEmbeddedJs(pkg.getJavascript());
                  }
                  if (doUglify && pkg.isNeedsWriteToDisk()) {
                    pkg.getJavascript().wrap(new qx.tool.compiler.targets.meta.Uglify(appMeta, pkg.getJavascript()));
                  }
                });
                if (doUglify) {
                  appMeta.getBootMetaJs().wrap(new qx.tool.compiler.targets.meta.Uglify(appMeta, bootMeta));
                }
                _context.n = 2;
                return qx.tool.compiler.targets.BuildTarget.superclass.prototype._writeApplication.call(_this);
              case 2:
                return _context.a(2, _context.v);
            }
          }, _callee);
        }))();
      },
      /*
       * @Override
       */
      toString: function toString() {
        return "Build Target: " + this.getOutputDir();
      }
    }
  });
  qx.tool.compiler.targets.BuildTarget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BuildTarget.js.map?dt=1778272844164