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
      "qx.tool.utils.files.Utils": {}
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
   * ************************************************************************/

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  var crypto = require("crypto");
  var sourceMap = require("source-map-js");

  /**
   * Copies multiple javascript source files into a single destination, preserving (merging)
   * source maps as it goes.
   *
   * This will not rewrite the output files if the file content will not change.
   */
  qx.Class.define("qx.tool.compiler.targets.SourceCodeCopier", {
    extend: qx.core.Object,
    /**
     * Constructor
     * @param outputFilename {String} the destination file for combined output
     */
    construct: function construct(outputFilename) {
      qx.core.Object.constructor.call(this);
      var pos = outputFilename.lastIndexOf(".");
      var basename = outputFilename.substring(0, pos);
      this.__P_509_0 = basename + "-tmp.js";
      this.__P_509_1 = basename + ".js";
      this.__P_509_2 = basename + ".js.map";
      this.__P_509_3 = fs.createWriteStream(this.__P_509_0);
      this.__P_509_4 = crypto.createHash("sha256");
      this.__P_509_4.setEncoding("hex");
      this.__P_509_5 = new sourceMap.SourceMapGenerator({
        file: this.__P_509_2
      });
      this.__P_509_6 = 0;
    },
    members: {
      /** {String} Output filename for combined javascript */
      __P_509_1: null,
      /** {String} output filename for temporary code */
      __P_509_0: null,
      /** {String} output filename for the combined sourcemap */
      __P_509_2: null,
      /** {String} write stream for javascript */
      __P_509_3: null,
      /** {crypto.createHash} hash accumulator for combined javascript */
      __P_509_4: null,
      /** {String} hash value for existing combined javascript */
      __P_509_7: null,
      __P_509_5: null,
      __P_509_6: null,
      /**
       * Returns the file the code is copied to
       */
      getOutputFilename: function getOutputFilename() {
        return this.__P_509_1;
      },
      /**
       * Opens the output
       */
      open: function open() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var stat, hash, data;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.utils.files.Utils.safeStat(_this.__P_509_1);
              case 1:
                stat = _context.v;
                if (!stat) {
                  _context.n = 3;
                  break;
                }
                hash = crypto.createHash("sha256");
                hash.setEncoding("hex");
                _context.n = 2;
                return fs.readFileAsync(_this.__P_509_1, "utf8");
              case 2:
                data = _context.v;
                hash.write(data);
                _this.__P_509_7 = _this.__P_509_4.read();
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Helper method to write output
       * @param str {String} data to write
       */
      __P_509_8: function __P_509_8(str) {
        this.__P_509_4.write(str);
        this.__P_509_3.write(str);
      },
      /**
       * Adds a source file to the output
       *
       * @param jsFilename {String} filename to add
       * @param jsUri {String} uri of the file being added, relative to the output directory
       */
      addSourceFile: function addSourceFile(jsFilename, jsUri) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var jsMapFilename, numLines, data, i, stat, source, map;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                jsMapFilename = jsFilename + ".map";
                numLines = 0;
                _context2.n = 1;
                return fs.readFileAsync(jsFilename, "utf8");
              case 1:
                data = _context2.v;
                data = data.replace(/\/\/[@#]\ssourceMappingURL[^\r\n]*/g, "//");
                data += "\n";
                _this2.__P_509_8(data);
                for (i = 0; i < data.length; i++) {
                  if (data[i] === "\n") {
                    numLines++;
                  }
                }
                _context2.n = 2;
                return qx.tool.utils.files.Utils.safeStat(jsMapFilename);
              case 2:
                stat = _context2.v;
                if (!stat) {
                  _context2.n = 4;
                  break;
                }
                source = jsUri || jsFilename;
                _context2.n = 3;
                return fs.readFileAsync(jsMapFilename, "utf8");
              case 3:
                data = _context2.v;
                map = new sourceMap.SourceMapConsumer(data);
                map.eachMapping(function (mapping) {
                  mapping = {
                    generated: {
                      line: mapping.generatedLine + _this2.__P_509_6,
                      column: mapping.generatedColumn
                    },
                    original: {
                      line: mapping.originalLine || 1,
                      column: mapping.originalColumn || 1
                    },
                    source: source
                  };
                  _this2.__P_509_5.addMapping(mapping);
                });
                map.sources.forEach(function (origSource) {
                  return _this2.__P_509_5.setSourceContent(source, map.sourceContentFor(origSource));
                });
              case 4:
                _this2.__P_509_6 += numLines;
              case 5:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Closes the output
       */
      close: function close() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var hashValue;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _this3.__P_509_8("\n//# sourceMappingURL=" + path.basename(_this3.__P_509_2) + "\n");
                _this3.__P_509_3.end();
                _this3.__P_509_4.end();
                hashValue = _this3.__P_509_4.read();
                if (!(!_this3.__P_509_7 || hashValue !== _this3.__P_509_7)) {
                  _context3.n = 3;
                  break;
                }
                _context3.n = 1;
                return fs.renameAsync(_this3.__P_509_0, _this3.__P_509_1);
              case 1:
                _context3.n = 2;
                return fs.writeFileAsync(_this3.__P_509_2, JSON.stringify(JSON.parse(_this3.__P_509_5.toString()), null, 2), "utf8");
              case 2:
                return _context3.a(2, true);
              case 3:
                _context3.n = 4;
                return fs.unlinkAsync(_this3.__P_509_0);
              case 4:
                return _context3.a(2, false);
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.SourceCodeCopier.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SourceCodeCopier.js.map?dt=1778272844203