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
      "qx.tool.compiler.targets.meta.AbstractJavascriptMeta": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.Utils": {}
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
   *      2011-2021 Zenesis Limited, http://www.zenesis.com
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

  var path = require("upath");

  /**
   * A PackageJavascript is the serialisation of the javascript required to produce a package;
   * at the minimum, this is the locales and resources provided by the package, but also can be
   * the javascript code from loaded classes, all merged into one .js file for the browser.
   */
  qx.Class.define("qx.tool.compiler.targets.meta.PackageJavascript", {
    extend: qx.tool.compiler.targets.meta.AbstractJavascriptMeta,
    /**
     * Constructor
     */
    construct: function construct(appMeta, pkg) {
      qx.tool.compiler.targets.meta.AbstractJavascriptMeta.constructor.call(this, appMeta, "".concat(appMeta.getApplicationRoot(), "package-").concat(pkg.getPackageIndex(), ".js"));
      this.__P_517_0 = pkg;
    },
    properties: {
      needsWriteToDisk: {
        init: true,
        refine: true
      }
    },
    members: {
      __P_517_1: null,
      /*
       * @Override
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var pkg, data, packageWs, strip;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                pkg = _this.__P_517_0;
                data = {
                  locales: pkg.getLocales(),
                  resources: {},
                  translations: pkg.getTranslations()
                };
                pkg.getAssets().forEach(function (asset) {
                  var ext = path.extname(asset.getFilename());
                  if (ext.length) {
                    ext = ext.substring(1);
                  }
                  var fileInfo = asset.getFileInfo();
                  var arr = data.resources[asset.getFilename()] = [fileInfo.width, fileInfo.height, ext, asset.getLibrary().getNamespace()];
                  if (fileInfo.composite !== undefined) {
                    arr.push(fileInfo.composite);
                    arr.push(fileInfo.x);
                    arr.push(fileInfo.y);
                  }
                });
                if (!pkg.isEmbedAllJavascript()) {
                  _context2.n = 2;
                  break;
                }
                _this.__P_517_1 = [];
                packageWs = new qx.tool.utils.Utils.LineCountingTransform();
                strip = new qx.tool.utils.Utils.StripSourceMapTransform();
                strip.pipe(packageWs);
                packageWs.pipe(ws, {
                  end: false
                });
                _context2.n = 1;
                return new Promise(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve) {
                    var i, js;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          i = 0;
                        case 1:
                          if (!(i < pkg.getJavascriptMetas().length)) {
                            _context.n = 4;
                            break;
                          }
                          js = pkg.getJavascriptMetas()[i];
                          _this.__P_517_1.push(packageWs.getLineNumber());
                          _context.n = 2;
                          return js.unwrap().writeSourceCodeToStream(strip);
                        case 2:
                          strip.write("\n");
                        case 3:
                          i++;
                          _context.n = 1;
                          break;
                        case 4:
                          resolve();
                        case 5:
                          return _context.a(2);
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 1:
                ws.write("//# sourceMappingURL=".concat(path.basename(_this.getFilename()), ".map?dt=").concat(new Date().getTime(), "\n"));
              case 2:
                ws.write("qx.$$packageData['".concat(_this.__P_517_0.getPackageIndex(), "'] = ").concat(JSON.stringify(data, null, 2), ";\n"));
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /*
       * @Override
       */
      writeToDisk: function writeToDisk() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var i;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return qx.tool.compiler.targets.meta.PackageJavascript.superclass.prototype.writeToDisk.call(_this2);
              case 1:
                if (_this2.__P_517_0.isEmbedAllJavascript()) {
                  _context3.n = 4;
                  break;
                }
                i = 0;
              case 2:
                if (!(i < _this2.__P_517_0.getJavascriptMetas().length)) {
                  _context3.n = 4;
                  break;
                }
                _context3.n = 3;
                return _this2.__P_517_0.getJavascriptMetas()[i].unwrap().writeToDisk();
              case 3:
                i++;
                _context3.n = 2;
                break;
              case 4:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /*
       * @Override
       */
      getSourceMap: function getSourceMap() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (_this3.__P_517_0.isEmbedAllJavascript()) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2, null);
              case 1:
                if (!(_this3.__P_517_1 === null)) {
                  _context4.n = 2;
                  break;
                }
                throw new Error("Cannot get the source map for ".concat(_this3, " until the stream has been written"));
              case 2:
                return _context4.a(2, _this3._copySourceMap(_this3.__P_517_0.getJavascriptMetas(), _this3.__P_517_1));
            }
          }, _callee4);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.PackageJavascript.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PackageJavascript.js.map?dt=1782595073060