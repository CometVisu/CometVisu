function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.tool.utils.LogManager": {
        "usage": "dynamic",
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
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.Json": {},
      "qx.tool.compiler.app.WebFont": {}
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

  var path = require("path");
  var fs = require("fs");
  var async = require("async");
  var log = qx.tool.utils.LogManager.createLog("library");

  /**
   * A Qooxdoo Library or application; typical usage is to call .loadManifest to configure from
   * the library itself
   */
  qx.Class.define("qx.tool.compiler.app.Library", {
    extend: qx.core.Object,
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_485_0 = {};
      this.__P_485_1 = {};
      this.__P_485_2 = {};
    },
    properties: {
      /** The namespace of the library */
      namespace: {
        check: "String"
      },
      /** The version of the library */
      version: {
        check: "String"
      },
      /** The directory; transformed into an absolute path */
      rootDir: {
        check: "String",
        transform: "_transformRootDir"
      },
      /** The path to source files, relative to rootDir */
      sourcePath: {
        init: "source/class",
        check: "String"
      },
      /** The path to generated transpiled files, relative to rootDir */
      transpiledPath: {
        init: "source/transpiled",
        check: "String"
      },
      /** The info section form the Manifest */
      libraryInfo: {
        check: "Map"
      },
      /** The path to resource files, relative to rootDir */
      resourcePath: {
        init: "source/resource",
        check: "String"
      },
      /** The path to resource files, relative to rootDir */
      themePath: {
        init: "source/theme",
        check: "String"
      },
      /** The path to translation files, relative to rootDir */
      translationPath: {
        init: "source/translation",
        check: "String"
      },
      /**
       * {WebFont[]} List of webfonts provided
       * @deprecated
       */
      webFonts: {
        init: null,
        nullable: true,
        check: "Array"
      },
      /** Array of external scripts required by the library */
      addScript: {
        init: null
      },
      /** Array of external stylesheets required by the library */
      addCss: {
        init: null
      },
      /**  Array of requires resources of the library */
      requires: {
        init: null
      }
    },
    members: {
      __P_485_0: null,
      __P_485_1: null,
      __P_485_3: null,
      __P_485_2: null,
      __P_485_4: null,
      /**
       * Transform for rootDir; converts it to an absolute path
       * @param value
       * @returns {*}
       * @private
       */
      _transformRootDir: function _transformRootDir(value) {
        //      if (value)
        //        value = path.resolve(value);
        return value;
      },
      /**
       * Loads the Manifest.json from the directory and uses it to configure
       * properties
       * @param loadFromDir {String} directory
       */
      loadManifest: function loadManifest(loadFromDir) {
        if (this.__P_485_3) {
          return this.__P_485_3;
        }
        return this.__P_485_3 = this.__P_485_5(loadFromDir);
      },
      __P_485_5: function __P_485_5(loadFromDir) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var Console, rootDir, data, key, check, pos, fixLibraryPath, sourcePath, resourcePath, m, fonts;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                Console = qx.tool.compiler.Console.getInstance();
                rootDir = loadFromDir;
                _context2.next = 4;
                return qx.tool.utils.files.Utils.correctCase(path.resolve(loadFromDir));
              case 4:
                rootDir = _context2.sent;
                _this.setRootDir(rootDir);
                _context2.next = 8;
                return qx.tool.utils.Json.loadJsonAsync(rootDir + "/Manifest.json");
              case 8:
                data = _context2.sent;
                if (data) {
                  _context2.next = 11;
                  break;
                }
                throw new Error(Console.decode("qx.tool.compiler.library.emptyManifest", rootDir));
              case 11:
                _this.setNamespace(data.provides.namespace);
                _this.setVersion(data.info.version);
                if (data.provides.environmentChecks) {
                  for (key in data.provides.environmentChecks) {
                    check = data.provides.environmentChecks[key];
                    pos = key.indexOf("*");
                    if (pos > -1) {
                      _this.__P_485_2[key] = {
                        matchString: key.substring(0, pos),
                        startsWith: true,
                        className: check
                      };
                    } else {
                      _this.__P_485_2[key] = {
                        matchString: key,
                        className: check
                      };
                    }
                  }
                }
                fixLibraryPath = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(dir) {
                    var d, correctedDir;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          d = path.resolve(rootDir, dir);
                          if (fs.existsSync(d)) {
                            _context.next = 4;
                            break;
                          }
                          _this.warn(Console.decode("qx.tool.compiler.library.cannotFindPath", _this.getNamespace(), dir));
                          return _context.abrupt("return", dir);
                        case 4:
                          _context.next = 6;
                          return qx.tool.utils.files.Utils.correctCase(d);
                        case 6:
                          correctedDir = _context.sent;
                          if (!(correctedDir.substring(0, rootDir.length + 1) != rootDir + path.sep)) {
                            _context.next = 10;
                            break;
                          }
                          _this.warn(Console.decode("qx.tool.compiler.library.cannotCorrectCase", rootDir));
                          return _context.abrupt("return", dir);
                        case 10:
                          correctedDir = correctedDir.substring(rootDir.length + 1);
                          return _context.abrupt("return", correctedDir);
                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function fixLibraryPath(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                _context2.next = 17;
                return fixLibraryPath(data.provides["class"]);
              case 17:
                sourcePath = _context2.sent;
                _this.setSourcePath(sourcePath);
                if (!data.provides.resource) {
                  _context2.next = 24;
                  break;
                }
                _context2.next = 22;
                return fixLibraryPath(data.provides.resource);
              case 22:
                resourcePath = _context2.sent;
                _this.setResourcePath(resourcePath);
              case 24:
                _this.setLibraryInfo(data.info);
                if (data.provides.transpiled) {
                  _this.setTranspiledPath(data.provides.transpiled);
                } else {
                  m = sourcePath.match(/^(.*)\/([^/]+)$/);
                  if (m && m.length == 3) {
                    _this.setTranspiledPath(m[1] + "/transpiled");
                  } else {
                    _this.setTranspiledPath("transpiled");
                  }
                }
                if (data.provides.translation) {
                  _this.setTranslationPath(data.provides.translation);
                }
                if (data.provides.webfonts) {
                  fonts = [];
                  if (data.provides.webfonts.length) {
                    qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.deprecated");
                  }
                  data.provides.webfonts.forEach(function (wf) {
                    var font = new qx.tool.compiler.app.WebFont(_this).set(wf);
                    fonts.push(font);
                  });
                  _this.setWebFonts(fonts);
                }
                _this.__P_485_4 = data.provides.fonts || {};
                if (data.externalResources) {
                  if (data.externalResources.script) {
                    _this.setAddScript(data.externalResources.script);
                  }
                  if (data.externalResources.css) {
                    _this.setAddCss(data.externalResources.css);
                  }
                }
                if (data.requires) {
                  _this.setRequires(data.requires);
                }
                if (data.provides && data.provides.boot) {
                  qx.tool.compiler.Console.print("qx.tool.cli.compile.deprecatedProvidesBoot", rootDir);
                }
              case 32:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the provides.fonts data from the manifest
       *
       * @returns {Array}
       */
      getFontsData: function getFontsData() {
        return this.__P_485_4;
      },
      /**
       * Scans the filing system looking for classes; there are occasions (ie Qooxdoo's qxWeb module)
       * where the class name does not comply with the namespace, this method is used to find those
       * files and also to prepopulate the known symbols list
       * @param cb {Function} (err, classes) returns an array of class names
       */
      scanForClasses: function scanForClasses(cb) {
        var t = this;
        var classes = [];
        function scanDir(folder, packageName, cb) {
          fs.readdir(folder, function (err, filenames) {
            if (err) {
              cb(err);
              return;
            }
            async.each(filenames, function (filename, cb) {
              if (filename[0] == ".") {
                cb();
                return;
              }
              fs.stat(path.join(folder, filename), function (err, stat) {
                if (err || !stat) {
                  cb(err);
                  return;
                }
                if (stat.isDirectory()) {
                  var tmp = packageName;
                  if (tmp.length) {
                    tmp += ".";
                  }
                  tmp += filename;
                  scanDir(path.join(folder, filename), tmp, cb);
                  return;
                }

                // Make sure it looks like a file
                var match = filename.match(/(.*)(\.\w+)$/);
                if (!match) {
                  log.trace("Skipping file " + folder + "/" + filename);
                  cb();
                  return;
                }

                // Class name
                var className = match[1];
                var extension = match[2];
                if (packageName.length) {
                  className = packageName + "." + className;
                }
                if (className.match(/__init__/)) {
                  cb();
                  return;
                }
                if (extension == ".js" || extension == ".ts") {
                  t.__P_485_0[className] = "class";
                  t.__P_485_1[className] = extension;
                  classes.push(className);
                } else {
                  t.__P_485_0[filename] = "resource";
                }
                if (Boolean(packageName) && !t.__P_485_0[packageName]) {
                  t.__P_485_0[packageName] = "package";
                  var pos;
                  tmp = packageName;
                  while ((pos = tmp.lastIndexOf(".")) > -1) {
                    tmp = tmp.substring(0, pos);
                    t.__P_485_0[tmp] = "package";
                  }
                }
                cb();
              });
            }, cb);
          });
        }
        var rootDir = path.join(t.getRootDir(), t.getSourcePath());
        if (!fs.existsSync(rootDir)) {
          var Console = qx.tool.compiler.Console.getInstance();
          qx.tool.compiler.Console.warn(Console.decode("qx.tool.compiler.library.cannotFindPath", t.getNamespace(), rootDir));
          cb(null, []);
          return;
        }
        scanDir(rootDir, "", function (err) {
          cb(err, classes);
        });
      },
      /**
       * Detects whether the filename is one of the library's fonts
       *
       * @param {String} filename
       * @returns {Boolean}
       */
      isFontAsset: function isFontAsset(filename) {
        var isWebFont = false;
        if (filename.endsWith("svg")) {
          var fonts = this.getWebFonts() || [];
          isWebFont = fonts.find(function (webFont) {
            return webFont.getResources().find(function (resource) {
              return resource == filename;
            });
          });
          if (!isWebFont) {
            for (var fontId in this.__P_485_4) {
              var fontData = this.__P_485_4[fontId];
              isWebFont = (fontData.fontFaces || []).find(function (fontFace) {
                return (fontFace.paths || []).find(function (resource) {
                  return resource == filename;
                });
              });
              if (isWebFont) {
                break;
              }
            }
          }
        }
        return isWebFont;
      },
      /**
       * Detects the type of a symbol, "class", "resource", "package", "environment", or null if not found
       *
       * @param {String} name
       * @return {{symbolType,name,className}?}
       */
      getSymbolType: function getSymbolType(name) {
        if (!name.length) {
          return null;
        }
        var t = this;
        var type = this.__P_485_0[name];
        if (type) {
          return {
            symbolType: t.__P_485_0[name],
            className: type == "class" ? name : null,
            name: name
          };
        }
        function testEnvironment(check) {
          if (!check) {
            return null;
          }
          var match = false;
          if (check.startsWith) {
            match = name.startsWith(check.matchString);
          } else {
            match = name == check.matchString;
          }
          if (match) {
            return {
              symbolType: "environment",
              className: check.className,
              name: name
            };
          }
          return null;
        }
        var result = testEnvironment(this.__P_485_2[name]);
        if (result) {
          return result;
        }
        for (var key in this.__P_485_2) {
          var check = this.__P_485_2[key];
          if (check.startsWith) {
            result = testEnvironment(check);
            if (result !== null) {
              return result;
            }
          }
        }
        var tmp = name;
        var pos;
        while ((pos = tmp.lastIndexOf(".")) > -1) {
          tmp = tmp.substring(0, pos);
          type = this.__P_485_0[tmp];
          if (type) {
            if (type == "class") {
              return {
                symbolType: "member",
                className: tmp,
                name: name
              };
            }
            return null;
          }
        }
        return null;
      },
      /**
       * Checks whether the classname is an actual class, in this library
       *
       * @param classname {String} classname to look for
       * @return {Boolean}
       */
      isClass: function isClass(classname) {
        var type = this.__P_485_0[classname];
        return type === "class";
      },
      /**
       * Returns all known symbols as a map indexed by symbol name
       */
      getKnownSymbols: function getKnownSymbols() {
        return this.__P_485_0;
      },
      /**
       * Returns the original extension of the class file that implemented the
       * given class name.
       *
       * @param {String} className
       */
      getSourceFileExtension: function getSourceFileExtension(className) {
        return this.__P_485_1[className];
      },
      /**
       * Returns the full filename for the file within this library
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getFilename: function getFilename(filename) {
        return path.join(this.getRootDir(), this.getSourcePath(), filename);
      },
      /**
       * Returns the full filename for the file within this library's resources
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getResourceFilename: function getResourceFilename(filename) {
        return path.join(this.getRootDir(), this.getResourcePath(), filename);
      },
      /**
       * Returns the full filename for the file within this library's theme
       *
       * @param filename {String} the filename relative to this library
       * @return {String} the full filename
       */
      getThemeFilename: function getThemeFilename(filename) {
        return path.join(this.getRootDir(), this.getThemePath(), filename);
      }
    },
    statics: {
      /**
       * Helper method to create a Library instance and load it's manifest
       *
       * @param rootDir {String} directory of the library (must contain a Manifest.json)
       * @return {Library}
       */
      createLibrary: function createLibrary(rootDir) {
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var lib;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                lib = new qx.tool.compiler.app.Library();
                _context3.next = 3;
                return lib.loadManifest(rootDir);
              case 3:
                return _context3.abrupt("return", lib);
              case 4:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      }
    }
  });
  qx.tool.compiler.app.Library.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Library.js.map?dt=1731948128974