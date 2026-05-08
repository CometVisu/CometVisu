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
      }
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

  /**
   * Represents a "index.js" that is generated as part of a compile
   */
  qx.Class.define("qx.tool.compiler.targets.meta.BootJs", {
    extend: qx.tool.compiler.targets.meta.AbstractJavascriptMeta,
    construct: function construct(appMeta) {
      qx.tool.compiler.targets.meta.AbstractJavascriptMeta.constructor.call(this, appMeta, "".concat(appMeta.getApplicationRoot(), "index.js"));
      this.__P_514_0 = [];
      this.__P_514_1 = {};
    },
    properties: {
      needsWriteToDisk: {
        init: true,
        refine: true
      }
    },
    members: {
      __P_514_0: null,
      __P_514_2: null,
      /**
       * Adds Javascript which is to be added to the end of the index.js, just before the app
       * is finalised
       *
       * @param jsMeta {AbstractJavascriptMeta} the jaavscript to add
       */
      addEmbeddedJs: function addEmbeddedJs(jsMeta) {
        if (!this.__P_514_1[jsMeta.toHashCode()]) {
          this.__P_514_0.push(jsMeta);
          this.__P_514_1[jsMeta.toHashCode()] = jsMeta;
        }
      },
      /*
       * @Override
       */
      writeSourceCodeToStream: function writeSourceCodeToStream(ws) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var appMeta, application, target, appRootDir, urisBefore, inlines, i, uri, filename, data, MAP, lines, _i, line, match, keyword, replace, j, newLine, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                appMeta = _this._appMeta;
                application = appMeta.getApplication();
                target = appMeta.getTarget();
                appRootDir = appMeta.getApplicationRoot();
                urisBefore = [];
                if (target.isInlineExternalScripts()) {
                  _context.n = 1;
                  break;
                }
                urisBefore = appMeta.getPreloads().urisBefore;
                _context.n = 7;
                break;
              case 1:
                inlines = [];
                urisBefore = appMeta.getPreloads().urisBefore.filter(function (uri) {
                  // This is a http url, we cannot inline it
                  if (uri.startsWith("__external__:")) {
                    return true;
                  }
                  inlines.push(uri);
                  return false;
                });
                i = 0;
              case 2:
                if (!(i < inlines.length)) {
                  _context.n = 7;
                  break;
                }
                uri = inlines[i];
                filename = path.join(target.getOutputDir(), "resources", uri);
                _context.p = 3;
                _context.n = 4;
                return fs.readFileAsync(filename, {
                  encoding: "utf-8"
                });
              case 4:
                data = _context.v;
                ws.write(data);
                ws.write("\n");
                _context.n = 6;
                break;
              case 5:
                _context.p = 5;
                _t = _context.v;
                if (!(_t.code != "ENOENT")) {
                  _context.n = 6;
                  break;
                }
                throw _t;
              case 6:
                i++;
                _context.n = 2;
                break;
              case 7:
                MAP = {
                  EnvSettings: appMeta.getEnvironment(),
                  Libraries: appMeta.getLibraries().map(function (library) {
                    return library.getNamespace();
                  }),
                  SourceUri: appMeta.getSourceUri(),
                  ResourceUri: appMeta.getResourceUri(),
                  Resources: appMeta.getResources(),
                  Translations: {
                    C: null
                  },
                  Locales: {
                    C: null
                  },
                  Parts: {},
                  Packages: {},
                  UrisBefore: urisBefore,
                  CssBefore: appMeta.getPreloads().cssBefore,
                  Boot: "boot",
                  ClosureParts: {},
                  BootIsInline: false,
                  NoCacheParam: false,
                  DecodeUrisPlug: undefined,
                  BootPart: undefined,
                  TranspiledPath: undefined,
                  PreBootCode: appMeta.getPreBootCode()
                };
                appMeta.getParts().forEach(function (part) {
                  return part.serializeInto(MAP.Parts);
                });
                appMeta.getPackages().forEach(function (pkg) {
                  return pkg.serializeInto(MAP.Packages);
                });
                if (application.getType() !== "browser") {
                  MAP.TranspiledPath = path.relative(appRootDir, path.join(target.getOutputDir(), "transpiled"));
                }
                appMeta.getTarget().getLocales().forEach(function (localeId) {
                  MAP.Translations[localeId] = null;
                  MAP.Locales[localeId] = null;
                });
                _this.__P_514_2 = [];
                _context.n = 8;
                return fs.readFileAsync(application.getLoaderTemplate(), {
                  encoding: "utf-8"
                });
              case 8:
                data = _context.v;
                lines = data.split("\n");
                _i = 0;
              case 9:
                if (!(_i < lines.length)) {
                  _context.n = 19;
                  break;
                }
                line = lines[_i];
              case 10:
                if (!(match = line.match(/\%\{([^}]+)\}/))) {
                  _context.n = 17;
                  break;
                }
                keyword = match[1];
                replace = "";
                if (!(keyword == "BootPart")) {
                  _context.n = 15;
                  break;
                }
                j = 0;
              case 11:
                if (!(j < _this.__P_514_0.length)) {
                  _context.n = 14;
                  break;
                }
                _this.__P_514_2.push(ws.getLineNumber());
                _context.n = 12;
                return _this.__P_514_0[j].unwrap().writeSourceCodeToStream(ws);
              case 12:
                ws.write("\n");
              case 13:
                j++;
                _context.n = 11;
                break;
              case 14:
                _context.n = 16;
                break;
              case 15:
                if (MAP[keyword] !== undefined) {
                  if (keyword == "PreBootCode") {
                    replace = MAP[keyword];
                  } else {
                    replace = JSON.stringify(MAP[keyword], null, 2);
                  }
                }
              case 16:
                newLine = line.substring(0, match.index) + replace + line.substring(match.index + keyword.length + 3);
                line = newLine;
                _context.n = 10;
                break;
              case 17:
                if (line.match(/^\s*delayDefer:\s*false\b/)) {
                  line = line.replace(/false/, "true");
                }
                ws.write(line + "\n");
              case 18:
                _i++;
                _context.n = 9;
                break;
              case 19:
                return _context.a(2);
            }
          }, _callee, null, [[3, 5]]);
        }))();
      },
      /*
       * @Override
       */
      getSourceMap: function getSourceMap() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var res, target, i, s, mapTo;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!(_this2.__P_514_2 === null)) {
                  _context2.n = 1;
                  break;
                }
                throw new Error("Cannot get the source map for ".concat(_this2, " until the stream has been written"));
              case 1:
                _context2.n = 2;
                return _this2._copySourceMap(_this2.__P_514_0, _this2.__P_514_2);
              case 2:
                res = _context2.v;
                target = _this2._appMeta.getTarget();
                for (i = 0; i < res.sources.length; i++) {
                  s = path.relative("", res.sources[i]);
                  mapTo = target.getPathMapping(s);
                  res.sources[i] = mapTo ? mapTo : res.sources[i];
                }
                return _context2.a(2, res);
            }
          }, _callee2);
        }))();
      }
    }
  });
  qx.tool.compiler.targets.meta.BootJs.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BootJs.js.map?dt=1778272844656