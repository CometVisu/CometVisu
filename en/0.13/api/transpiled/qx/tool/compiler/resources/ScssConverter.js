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
      "qx.tool.compiler.resources.ResourceConverter": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.files.Utils": {},
      "qx.tool.compiler.resources.ScssFile": {}
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
   *      * Henner Kollmann (henner.kollmann@gmx.de)
   *
   *
   * *********************************************************************** */

  var path = require("upath");
  /**
   * @external(qx/tool/loadsass.js)
   * @ignore(loadSass)
   */
  /* global loadSass */
  var sass = loadSass();
  var fs = qx.tool.utils.Promisify.fs;
  qx.Class.define("qx.tool.compiler.resources.ScssConverter", {
    extend: qx.tool.compiler.resources.ResourceConverter,
    construct: function construct() {
      qx.tool.compiler.resources.ResourceConverter.constructor.call(this);
    },
    members: {
      matches: function matches(filename) {
        filename = path.basename(filename);
        return filename[0] != "_" && filename.endsWith(".scss");
      },
      getDestFilename: function getDestFilename(target, asset) {
        var filename;
        if (!qx.tool.compiler.resources.ScssConverter.isNewCompiler()) {
          filename = path.join(target.getOutputDir(), "resource", asset.getFilename().replace(/\bscss\b/g, "css"));
        } else {
          filename = path.join(target.getOutputDir(), "resource", asset.getFilename().replace(/\.scss$/, ".css"));
        }
        return filename;
      },
      convert: function convert(target, asset, srcFilename, destFilename, isThemeFile) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var copyFilename, scssFile;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!qx.tool.compiler.resources.ScssConverter.COPY_ORIGINAL_FILES) {
                  _context.n = 1;
                  break;
                }
                copyFilename = path.join(target.getOutputDir(), "resource", asset.getFilename());
                _context.n = 1;
                return qx.tool.utils.files.Utils.copyFile(srcFilename, copyFilename);
              case 1:
                if (qx.tool.compiler.resources.ScssConverter.isNewCompiler()) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2, _this.legacyMobileSassConvert(target, asset, srcFilename, destFilename));
              case 2:
                scssFile = new qx.tool.compiler.resources.ScssFile(target, asset.getLibrary(), asset.getFilename());
                scssFile.setThemeFile(isThemeFile);
                return _context.a(2, scssFile.compile(destFilename));
            }
          }, _callee);
        }))();
      },
      /**
       * The traditional SASS compilation; it does not use the newer advanced SASS compiler and so
       * does not support relative `url()` paths and automatically has Qooxdoo SASS built in.
       */
      legacyMobileSassConvert: function legacyMobileSassConvert(target, asset, srcFilename, destFilename) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var copyFilename, qooxdooPath, data, sassOptions, result;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!qx.tool.compiler.resources.ScssConverter.COPY_ORIGINAL_FILES) {
                  _context2.n = 1;
                  break;
                }
                copyFilename = path.join(target.getOutputDir(), "resource", asset.getFilename());
                _context2.n = 1;
                return qx.tool.utils.files.Utils.copyFile(srcFilename, copyFilename);
              case 1:
                qooxdooPath = target.getAnalyser().getQooxdooPath();
                _context2.n = 2;
                return fs.readFileAsync(srcFilename, "utf8");
              case 2:
                data = _context2.v;
                if (!(!data || !data.trim())) {
                  _context2.n = 5;
                  break;
                }
                _context2.n = 3;
                return fs.writeFileAsync(destFilename, "");
              case 3:
                _context2.n = 4;
                return fs.unlinkAsync(destFilename + ".map");
              case 4:
                _context2.n = 8;
                break;
              case 5:
                sassOptions = {
                  data: data,
                  includePaths: [path.dirname(srcFilename), path.join(qooxdooPath, "source/resource/qx/mobile/scss"), path.join(qooxdooPath, "source/resource/qx/scss")],
                  outFile: destFilename,
                  sourceMap: destFilename + ".map",
                  outputStyle: "compressed"
                };
                _context2.n = 6;
                return qx.tool.utils.Promisify.call(function (cb) {
                  return sass.render(sassOptions, function (err, result) {
                    if (err) {
                      cb(new Error(err.message));
                    } else {
                      cb(null, result);
                    }
                  });
                });
              case 6:
                result = _context2.v;
                _context2.n = 7;
                return fs.writeFileAsync(destFilename, result.css);
              case 7:
                _context2.n = 8;
                return fs.writeFileAsync(destFilename + ".map", result.map);
              case 8:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
    },
    statics: {
      /** @type {Boolean} Default is true for the API, the CLI will set this to null */
      USE_V6_COMPILER: true,
      /** @type {Boolean} Whether to copy .scss files */
      COPY_ORIGINAL_FILES: false,
      isNewCompiler: function isNewCompiler() {
        if (qx.tool.compiler.resources.ScssConverter.USE_V6_COMPILER === null) {
          console.warn("DEPRECATED: Using the Qooxdoo v5 style of SASS Compilation; this is backwards compatible but the default will change in v7 to use the new style (see https://git.io/JfTPV for details, and how to disable this warning).");
          qx.tool.compiler.resources.ScssConverter.USE_V6_COMPILER = false;
        }
        return qx.tool.compiler.resources.ScssConverter.USE_V6_COMPILER;
      }
    }
  });
  qx.tool.compiler.resources.ScssConverter.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScssConverter.js.map?dt=1778272844065