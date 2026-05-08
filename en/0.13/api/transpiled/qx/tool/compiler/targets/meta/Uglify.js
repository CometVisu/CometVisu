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
      "qx.tool.compiler.targets.meta.AbstractJavascriptMeta": {
        "construct": true,
        "require": true
      },
      "qx.tool.utils.Utils": {},
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

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var UglifyJS = require("terser");
  qx.Class.define("qx.tool.compiler.targets.meta.Uglify", {
    extend: qx.tool.compiler.targets.meta.AbstractJavascriptMeta,
    /**
     * Constructor
     *
     * @param appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
     * @param jsMeta {AbstractJavascriptMeta} the source
     */
    construct: function construct(appMeta, jsMeta) {
      qx.tool.compiler.targets.meta.AbstractJavascriptMeta.constructor.call(this, appMeta, jsMeta.getFilename());
      this.__P_520_0 = jsMeta;
    },
    properties: {
      needsWriteToDisk: {
        init: true,
        refine: true
      }
    },
    members: {
      __P_520_0: null,
      /*
       * @Override
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var uglifyOpts, application, outJsFilename, baseJsFilename, inSourceCode, inSourceMap, result, err, _t;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                uglifyOpts = {
                  compress: {
                    sequences: false
                  },
                  output: {
                    comments: "some"
                  }
                };
                _t = _this._appMeta.getTarget().getMinify();
                _context3.n = _t === "off" ? 1 : _t === "minify" ? 2 : _t === "beautify" ? 3 : _t === "mangle" ? 4 : 5;
                break;
              case 1:
                return _context3.a(2);
              case 2:
                uglifyOpts.mangle = false;
                return _context3.a(3, 5);
              case 3:
                uglifyOpts.mangle = false;
                uglifyOpts.output.beautify = true;
                return _context3.a(3, 5);
              case 4:
                uglifyOpts.mangle = true;
                return _context3.a(3, 5);
              case 5:
                application = _this._appMeta.getApplication();
                outJsFilename = _this.__P_520_0.getFilename();
                baseJsFilename = path.basename(outJsFilename);
                _context3.n = 6;
                return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                  var ss, ws;
                  return _regenerator().w(function (_context2) {
                    while (1) switch (_context2.n) {
                      case 0:
                        ss = new qx.tool.utils.Utils.ToStringWriteStream();
                        ws = new qx.tool.utils.Utils.LineCountingTransform();
                        ws.pipe(ss);
                        _context2.n = 1;
                        return new Promise(/*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve) {
                            return _regenerator().w(function (_context) {
                              while (1) switch (_context.n) {
                                case 0:
                                  ws.on("finish", resolve);
                                  _context.n = 1;
                                  return _this.__P_520_0.writeSourceCodeToStream(ws);
                                case 1:
                                  ws.end();
                                case 2:
                                  return _context.a(2);
                              }
                            }, _callee);
                          }));
                          return function (_x) {
                            return _ref2.apply(this, arguments);
                          };
                        }());
                      case 1:
                        return _context2.a(2, ss.toString());
                    }
                  }, _callee2);
                }))();
              case 6:
                inSourceCode = _context3.v;
                _context3.n = 7;
                return _this.__P_520_0.getSourceMap();
              case 7:
                inSourceMap = _context3.v;
                _this.fireDataEvent("minifyingApplication", {
                  application: application,
                  filename: baseJsFilename
                });
                uglifyOpts.sourceMap = {
                  content: inSourceMap,
                  url: baseJsFilename + ".map",
                  includeSources: true
                };
                _context3.n = 8;
                return UglifyJS.minify(inSourceCode, uglifyOpts);
              case 8:
                result = _context3.v;
                err = result.error;
                if (!err) {
                  _context3.n = 9;
                  break;
                }
                if (err.name == "SyntaxError") {
                  qx.tool.compiler.Console.print("qx.tool.compiler.build.uglifyParseError", err.line, err.col, err.message, baseJsFilename);
                }
                throw new Error("UglifyJS failed to minimise: " + (err.message || err));
              case 9:
                _context3.n = 10;
                return fs.writeFileAsync(outJsFilename, result.code, {
                  encoding: "utf8"
                });
              case 10:
                _context3.n = 11;
                return fs.writeFileAsync(outJsFilename + ".map", result.map, {
                  encoding: "utf8"
                });
              case 11:
                if (!_this._appMeta.getTarget().isSaveUnminified()) {
                  _context3.n = 13;
                  break;
                }
                _context3.n = 12;
                return fs.writeFileAsync(outJsFilename + ".unminified", inSourceCode, {
                  encoding: "utf8"
                });
              case 12:
                _context3.n = 13;
                return fs.writeFileAsync(outJsFilename + ".unminified.map", JSON.stringify(inSourceMap, null, 2), {
                  encoding: "utf8"
                });
              case 13:
                _this.fireDataEvent("minifiedApplication", {
                  application: application,
                  filename: baseJsFilename
                });
              case 14:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.Uglify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Uglify.js.map?dt=1778272844873