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
      "qx.Promise": {},
      "qx.tool.compiler.Console": {}
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
  /* eslint-disable @qooxdoo/qx/no-illegal-private-usage */

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");
  /**
   * @external(qx/tool/loadsass.js)
   * @ignore(loadSass)
   */
  /* global loadSass */
  var sass = loadSass();

  /**
   * @ignore(process)
   */
  qx.Class.define("qx.tool.compiler.resources.ScssFile", {
    extend: qx.core.Object,
    construct: function construct(target, library, filename) {
      qx.core.Object.constructor.call(this);
      this.__P_508_0 = library;
      this.__filename = filename;
      this.__P_508_1 = target;
      this.__P_508_2 = {};
      this.__P_508_3 = {};
    },
    properties: {
      file: {
        nullable: false,
        check: "String",
        event: "changeFile"
      },
      themeFile: {
        init: false,
        check: "Boolean"
      }
    },
    members: {
      __P_508_0: null,
      __filename: null,
      __P_508_4: null,
      __P_508_5: null,
      __P_508_2: null,
      __P_508_3: null,
      /**
       * Compiles the SCSS, returns a list of files that were imported)
       *
       * @param outputFilename {String} output
       * @return {String[]} dependent files
       */
      compile: function compile(outputFilename) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var inputFileData;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this.__P_508_4 = path.dirname(outputFilename);
                _this.__P_508_5 = {};
                _context.n = 1;
                return _this.loadSource(_this.__filename, _this.__P_508_0);
              case 1:
                inputFileData = _context.v;
                _context.n = 2;
                return new qx.Promise(function (resolve, reject) {
                  sass.render({
                    // Always have file so that the source map knows the name of the original
                    file: _this.__filename,
                    // data provides the contents, `file` is only used for the sourcemap filename
                    data: inputFileData,
                    outputStyle: "compressed",
                    sourceMap: true,
                    outFile: path.basename(outputFilename),
                    /*
                     * Importer
                     */
                    importer: function importer(url, prev, done) {
                      var contents = _this.__P_508_2[url];
                      if (!contents) {
                        var tmp = _this.__P_508_3[url];
                        if (tmp) {
                          contents = _this.__P_508_2[tmp];
                        }
                      }
                      return contents ? {
                        contents: contents
                      } : null;
                    },
                    functions: {
                      "qooxdooUrl($filename, $url)": function qooxdooUrl$filename_$url($filename, $url, done) {
                        return _this.__P_508_6($filename, $url, done);
                      }
                    }
                  }, function (error, result) {
                    if (error) {
                      qx.tool.compiler.Console.error("Error status " + error.status + " in " + _this.__filename + "[" + error.line + "," + error.column + "]: " + error.message);
                      resolve(error); // NOT reject
                      return;
                    }
                    fs.writeFileAsync(outputFilename, result.css.toString(), "utf8").then(function () {
                      return fs.writeFileAsync(outputFilename + ".map", result.map.toString(), "utf8");
                    }).then(function () {
                      return resolve(null);
                    })["catch"](reject);
                  });
                });
              case 2:
                return _context.a(2, Object.keys(_this.__P_508_2));
            }
          }, _callee);
        }))();
      },
      _analyseFilename: function _analyseFilename(url, currentFilename) {
        var m = url.match(/^([a-z0-9_.]+):(\/?[^\/].*)/);
        if (m) {
          return {
            namespace: m[1],
            filename: m[2],
            externalUrl: null
          };
        }

        // It's a real URL like http://abc.com/..
        if (url.match(/^[a-z0-9_]+:\/\//)) {
          return {
            externalUrl: url
          };
        }

        // It's either absolute to the website (i.e. begins with a slash) or it's
        //  relative to the current file
        if (url[0] == "/") {
          return {
            namespace: null,
            filename: url
          };
        }

        // Must be relative to current file
        var dir = path.dirname(currentFilename);
        var filename = path.resolve(dir, url);
        var library = this.__P_508_1.getAnalyser().getLibraries().find(function (library) {
          return filename.startsWith(path.resolve(library.getRootDir()));
        });
        if (!library) {
          qx.tool.compiler.Console.error("Cannot find library for " + url + " in " + currentFilename);
          return null;
        }
        var libResourceDir = path.join(library.getRootDir(), this.isThemeFile() ? library.getThemePath() : library.getResourcePath());
        return {
          namespace: library.getNamespace(),
          filename: path.relative(libResourceDir, filename),
          externalUrl: null
        };
      },
      reloadSource: function reloadSource(filename) {
        filename = path.resolve(filename);
        delete this.__P_508_2[filename];
        return this.loadSource(filename);
      },
      loadSource: function loadSource(filename, library) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var absFilename, exists, name, tmp, contents, promises;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                filename = path.relative(process.cwd(), path.resolve(_this2.isThemeFile() ? library.getThemeFilename(filename) : library.getResourceFilename(filename)));
                absFilename = filename;
                if (path.extname(absFilename) == "") {
                  absFilename += ".scss";
                }
                exists = fs.existsSync(absFilename);
                if (!exists) {
                  name = path.basename(absFilename);
                  if (name[0] != "_") {
                    tmp = path.join(path.dirname(absFilename), "_" + name);
                    exists = fs.existsSync(tmp);
                    if (exists) {
                      absFilename = tmp;
                    }
                  }
                }
                if (exists) {
                  _context2.n = 1;
                  break;
                }
                _this2.__P_508_2[absFilename] = null;
                return _context2.a(2, null);
              case 1:
                if (!(_this2.__P_508_2[absFilename] !== undefined)) {
                  _context2.n = 2;
                  break;
                }
                return _context2.a(2, qx.Promise.resolve(_this2.__P_508_2[absFilename]));
              case 2:
                _context2.n = 3;
                return fs.readFileAsync(absFilename, "utf8");
              case 3:
                contents = _context2.v;
                promises = [];
                contents = contents.replace(/@import\s+["']([^;]+)["']/gi, function (match, p1, offset) {
                  var pathInfo = _this2._analyseFilename(p1, absFilename);
                  if (pathInfo.externalUrl) {
                    return '@import "' + pathInfo.externalUrl + '"';
                  }
                  var newLibrary = _this2.__P_508_1.getAnalyser().findLibrary(pathInfo.namespace);
                  if (!newLibrary) {
                    qx.tool.compiler.Console.error("Cannot find file to import, url=" + p1 + " in file " + absFilename);
                    return null;
                  }
                  promises.push(_this2.loadSource(pathInfo.filename, newLibrary));
                  var filename = _this2.isThemeFile() ? newLibrary.getThemeFilename(pathInfo.filename) : newLibrary.getResourceFilename(pathInfo.filename);
                  return '@import "' + path.relative(process.cwd(), filename) + '"';
                });
                contents = contents.replace(/\burl\s*\(\s*([^\)]+)*\)/gi, function (match, url) {
                  var c = url[0];
                  if (c === "'" || c === '"') {
                    url = url.substring(1);
                  }
                  c = url[url.length - 1];
                  if (c === "'" || c === '"') {
                    url = url.substring(0, url.length - 1);
                  }
                  //return `qooxdooUrl("${filename}", "${url}")`;
                  var pathInfo = _this2._analyseFilename(url, filename);
                  if (pathInfo) {
                    if (pathInfo.externalUrl) {
                      return "url(\"".concat(pathInfo.externalUrl, "\")");
                    }
                    if (pathInfo.namespace) {
                      var targetFile = path.relative(process.cwd(), path.join(_this2.__P_508_1.getOutputDir(), "resource", pathInfo.filename));
                      var relative = path.relative(_this2.__P_508_4, targetFile);
                      return "url(\"".concat(relative, "\")");
                    }
                  }
                  return "url(\"".concat(url, "\")");
                });
                _this2.__P_508_2[absFilename] = contents;
                _this2.__P_508_3[filename] = absFilename;
                _context2.n = 4;
                return qx.Promise.all(promises);
              case 4:
                return _context2.a(2, contents);
            }
          }, _callee2);
        }))();
      },
      getSourceFilenames: function getSourceFilenames() {
        return Object.keys(this.__P_508_2);
      },
      __P_508_6: function __P_508_6($filename, $url, done) {
        var currentFilename = $filename.getValue();
        var url = $url.getValue();
        var pathInfo = this._analyseFilename(url, currentFilename);
        if (pathInfo) {
          if (pathInfo.externalUrl) {
            return sass.types.String("url(" + pathInfo.externalUrl + ")");
          }
          if (pathInfo.namespace) {
            var targetFile = path.relative(process.cwd(), path.join(this.__P_508_1.getOutputDir(), "resource", pathInfo.filename));
            var relative = path.relative(this.__P_508_4, targetFile);
            return sass.types.String("url(" + relative + ")");
          }
        }
        return sass.types.String("url(" + url + ")");
      }
    }
  });
  qx.tool.compiler.resources.ScssFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScssFile.js.map?dt=1782967163516