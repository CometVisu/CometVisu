function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
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
      "qx.core.Object": {
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

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var sourceMap = require("source-map-js");

  /**
   * An AbstractJavascriptMeta provides an abstraction of some source code, and might be
   * comprised of a number of input files which are merged together as required.
   *
   * This object could represent a file which already exists on disk (eg a transpiled
   * source file), or something that is generated on the fly (such as a index.js), or
   * a compilation of files (eg a part)
   */
  qx.Class.define("qx.tool.compiler.targets.meta.AbstractJavascriptMeta", {
    extend: qx.core.Object,
    /**
     * Constructor
     *
     * @param appMeta {qx.tool.compiler.targets.meta.ApplicationMeta}
     * @param filename {String} the sourcefile
     * @param originalSourceFile {String?} the URI to give to the source map
     */
    construct: function construct(appMeta, filename, originalSourceFile) {
      qx.core.Object.constructor.call(this);
      this._appMeta = appMeta;
      this.__filename = filename;
      this.__P_512_0 = originalSourceFile;
    },
    properties: {
      /** If true, this is generated on the fly and needs to be output */
      needsWriteToDisk: {
        init: false,
        check: "Boolean"
      }
    },
    members: {
      _appMeta: null,
      __filename: null,
      __P_512_0: null,
      __P_512_1: null,
      /**
       * Returns the ApplicationMeta
       *
       * @return {ApplicationMeta}
       */
      getAppMeta: function getAppMeta() {
        return this._appMeta;
      },
      /**
       * Returns the filename for the output of this JS
       *
       * @return {String}
       */
      getFilename: function getFilename() {
        return this.__filename;
      },
      wrap: function wrap(jsMeta) {
        this.__P_512_1 = jsMeta;
      },
      getWrapper: function getWrapper() {
        return this.__P_512_1;
      },
      unwrap: function unwrap() {
        if (this.__P_512_1) {
          return this.__P_512_1.unwrap();
        }
        return this;
      },
      /**
       * Writes the file to disk, if appropriate
       */
      writeToDisk: function writeToDisk() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var ws, map;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!_this.isNeedsWriteToDisk()) {
                  _context2.n = 3;
                  break;
                }
                ws = new qx.tool.utils.Utils.LineCountingTransform();
                ws.pipe(fs.createWriteStream(_this.__filename, "utf8"));
                _context2.n = 1;
                return new Promise(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve) {
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          ws.on("finish", resolve);
                          _context.n = 1;
                          return _this.writeSourceCodeToStream(ws);
                        case 1:
                          ws.end();
                        case 2:
                          return _context.a(2);
                      }
                    }, _callee);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 1:
                _context2.n = 2;
                return _this.getSourceMap();
              case 2:
                map = _context2.v;
                if (!map) {
                  _context2.n = 3;
                  break;
                }
                _context2.n = 3;
                return fs.writeFileAsync(_this.__filename + ".map", JSON.stringify(map, null, 2), "utf8");
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Writes the source code as a stream, merging source files etc
       * as necessary
       *
       * @param ws {NodeJS.WritableStream} the stream to write to
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                throw new Error("No implementation for ".concat(_this2.classname, ".writeSourceCodeToStream"));
              case 1:
                return _context3.a(2);
            }
          }, _callee3);
        }))();
      },
      /**
       * Reads the source map as a string
       */
      getSourceMap: function getSourceMap() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                return _context4.a(2, null);
            }
          }, _callee4);
        }))();
      },
      /**
       * Utility method that merges multiple source maps
       */
      _copySourceMap: function _copySourceMap(jsMetas, lineOffsets) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var generator, _loop, map, i, res, _i;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.n) {
              case 0:
                generator = new sourceMap.SourceMapGenerator({
                  file: _this3.getFilename() + ".map"
                });
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var js, lineOffset, data;
                  return _regenerator().w(function (_context5) {
                    while (1) switch (_context5.n) {
                      case 0:
                        js = jsMetas[i];
                        lineOffset = lineOffsets[i];
                        _context5.n = 1;
                        return js.getSourceMap();
                      case 1:
                        data = _context5.v;
                        if (data) {
                          map = new sourceMap.SourceMapConsumer(data);
                          map.eachMapping(function (mapping) {
                            mapping = {
                              generated: {
                                line: mapping.generatedLine + lineOffset,
                                column: mapping.generatedColumn
                              },
                              original: {
                                line: mapping.originalLine || 1,
                                column: mapping.originalColumn || 1
                              },
                              source: mapping.source || js.getFilename()
                            };
                            generator.addMapping(mapping);
                          });
                          if (_this3._appMeta.getTarget().getSaveSourceInMap && _this3._appMeta.getTarget().getSaveSourceInMap()) {
                            map.sources.forEach(function (source) {
                              return generator.setSourceContent(source, map.sourceContentFor(source));
                            });
                          }
                        }
                      case 2:
                        return _context5.a(2);
                    }
                  }, _loop);
                });
                i = 0;
              case 1:
                if (!(i < jsMetas.length)) {
                  _context6.n = 3;
                  break;
                }
                return _context6.d(_regeneratorValues(_loop()), 2);
              case 2:
                i++;
                _context6.n = 1;
                break;
              case 3:
                res = JSON.parse(generator.toString());
                if (_this3._appMeta.getTarget().getSourceMapRelativePaths && _this3._appMeta.getTarget().getSourceMapRelativePaths()) {
                  for (_i = 0; _i < res.sources.length; _i++) {
                    res.sources[_i] = path.relative("", res.sources[_i]);
                  }
                }
                return _context6.a(2, res);
            }
          }, _callee5);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.AbstractJavascriptMeta.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractJavascriptMeta.js.map?dt=1778272844568