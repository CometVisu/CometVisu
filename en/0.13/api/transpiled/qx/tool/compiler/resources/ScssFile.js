function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      this.__P_497_0 = library;
      this.__filename = filename;
      this.__P_497_1 = target;
      this.__P_497_2 = {};
      this.__P_497_3 = {};
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
      __P_497_0: null,
      __filename: null,
      __P_497_4: null,
      __P_497_5: null,
      __P_497_2: null,
      __P_497_3: null,
      /**
       * Compiles the SCSS, returns a list of files that were imported)
       *
       * @param outputFilename {String} output
       * @return {String[]} dependent files
       */
      compile: function compile(outputFilename) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var inputFileData;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _this.__P_497_4 = path.dirname(outputFilename);
                _this.__P_497_5 = {};
                _context.next = 4;
                return _this.loadSource(_this.__filename, _this.__P_497_0);
              case 4:
                inputFileData = _context.sent;
                _context.next = 7;
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
                      var contents = _this.__P_497_2[url];
                      if (!contents) {
                        var tmp = _this.__P_497_3[url];
                        if (tmp) {
                          contents = _this.__P_497_2[tmp];
                        }
                      }
                      return contents ? {
                        contents: contents
                      } : null;
                    },
                    functions: {
                      "qooxdooUrl($filename, $url)": function qooxdooUrl$filename_$url($filename, $url, done) {
                        return _this.__P_497_6($filename, $url, done);
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
              case 7:
                return _context.abrupt("return", Object.keys(_this.__P_497_2));
              case 8:
              case "end":
                return _context.stop();
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
        var library = this.__P_497_1.getAnalyser().getLibraries().find(function (library) {
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
        delete this.__P_497_2[filename];
        return this.loadSource(filename);
      },
      loadSource: function loadSource(filename, library) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var absFilename, exists, name, tmp, contents, promises;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
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
                  _context2.next = 8;
                  break;
                }
                _this2.__P_497_2[absFilename] = null;
                return _context2.abrupt("return", null);
              case 8:
                if (!(_this2.__P_497_2[absFilename] !== undefined)) {
                  _context2.next = 10;
                  break;
                }
                return _context2.abrupt("return", qx.Promise.resolve(_this2.__P_497_2[absFilename]));
              case 10:
                _context2.next = 12;
                return fs.readFileAsync(absFilename, "utf8");
              case 12:
                contents = _context2.sent;
                promises = [];
                contents = contents.replace(/@import\s+["']([^;]+)["']/gi, function (match, p1, offset) {
                  var pathInfo = _this2._analyseFilename(p1, absFilename);
                  if (pathInfo.externalUrl) {
                    return '@import "' + pathInfo.externalUrl + '"';
                  }
                  var newLibrary = _this2.__P_497_1.getAnalyser().findLibrary(pathInfo.namespace);
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
                      var targetFile = path.relative(process.cwd(), path.join(_this2.__P_497_1.getOutputDir(), "resource", pathInfo.filename));
                      var relative = path.relative(_this2.__P_497_4, targetFile);
                      return "url(\"".concat(relative, "\")");
                    }
                  }
                  return "url(\"".concat(url, "\")");
                });
                _this2.__P_497_2[absFilename] = contents;
                _this2.__P_497_3[filename] = absFilename;
                _context2.next = 20;
                return qx.Promise.all(promises);
              case 20:
                return _context2.abrupt("return", contents);
              case 21:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      getSourceFilenames: function getSourceFilenames() {
        return Object.keys(this.__P_497_2);
      },
      __P_497_6: function __P_497_6($filename, $url, done) {
        var currentFilename = $filename.getValue();
        var url = $url.getValue();
        var pathInfo = this._analyseFilename(url, currentFilename);
        if (pathInfo) {
          if (pathInfo.externalUrl) {
            return sass.types.String("url(" + pathInfo.externalUrl + ")");
          }
          if (pathInfo.namespace) {
            var targetFile = path.relative(process.cwd(), path.join(this.__P_497_1.getOutputDir(), "resource", pathInfo.filename));
            var relative = path.relative(this.__P_497_4, targetFile);
            return sass.types.String("url(" + relative + ")");
          }
        }
        return sass.types.String("url(" + url + ")");
      }
    }
  });
  qx.tool.compiler.resources.ScssFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScssFile.js.map?dt=1729101255532