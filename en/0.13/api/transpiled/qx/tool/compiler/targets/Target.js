function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      "qx.tool.compiler.targets.meta.ApplicationMeta": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.compiler.targets.meta.BootJs": {},
      "qx.tool.compiler.targets.meta.PolyfillJs": {},
      "qx.tool.compiler.targets.meta.Browserify": {},
      "qx.tool.compiler.app.Application": {},
      "qx.tool.compiler.targets.meta.Javascript": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.compiler.app.Cldr": {},
      "qx.Promise": {},
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

  var fs = qx.tool.utils.Promisify.fs;
  var path = require("upath");

  /**
   * A target for building an application, instances of Target control the generation of transpiled
   * source and collection into an application, including minifying etc
   */
  qx.Class.define("qx.tool.compiler.targets.Target", {
    extend: qx.core.Object,
    /**
     * Constructor
     * @param outputDir {String} output directory
     */
    construct: function construct(outputDir) {
      qx.core.Object.constructor.call(this);
      this.setOutputDir(outputDir);
    },
    properties: {
      /** Type of compilation */
      type: {
        init: "source",
        nullable: false,
        check: ["source", "build"]
      },
      /** Output directory (guaranteed to have a trailing slash) */
      outputDir: {
        init: "output",
        nullable: false,
        check: "String",
        transform: "_transformOutputDir"
      },
      /**
       * Whether to generate the index.html
       */
      generateIndexHtml: {
        init: true,
        check: "Boolean"
      },
      /**
       * Whether the generated artifacts (ie resources and transpiled) are private to the application; this requires
       * the web server to mount the resources and transpiled directories inside the application directory
       */
      privateArtifacts: {
        init: false,
        check: "Boolean"
      },
      /**
       * Environment property map
       */
      environment: {
        init: null,
        nullable: true
      },
      /**
       * Target type default environment property map
       */
      defaultEnvironment: {
        init: null,
        inheritable: true,
        nullable: true
      },
      /**
       * List of environment keys to preserve in code, ie reserve for runtime detection
       * and exclude from code elimination
       */
      preserveEnvironment: {
        init: null,
        nullable: true,
        check: "Array"
      },
      /**
       * The analyser being generated
       */
      analyser: {
        nullable: false
      },
      /**
       * Whether to inline external scripts
       */
      inlineExternalScripts: {
        init: false,
        check: "Boolean"
      },
      /**
       * Whether to prefer local fonts instead of CDNs
       */
      preferLocalFonts: {
        init: false,
        check: "Boolean"
      },
      /**
       * Types of fonts to be included
       */
      fontTypes: {
        init: ["woff"],
        check: "Array"
      },
      /**
       * Whether to add timestamps to all URLs (cache busting)
       */
      addTimestampsToUrls: {
        init: true,
        check: "Boolean"
      },
      /** Locales being generated */
      locales: {
        nullable: false,
        init: ["en"],
        transform: "_transformLocales"
      },
      /** Whether to break locale & translation data out into separate parts */
      i18nAsParts: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /** Whether to write all translation strings (as opposed to just those used by the classes) */
      writeAllTranslations: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /** Whether to update the source .po files with new strings */
      updatePoFiles: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /** What to do with library transation strings */
      libraryPoPolicy: {
        init: "ignore",
        check: ["ignore", "untranslated", "all"]
      },
      /**
       * Whether to write a summary of the compile info to disk, ie everything about dependencies and
       * resources that are used to create the index.js file, but stored as pure JSON for third party code
       * to use.
       */
      writeCompileInfo: {
        init: false,
        nullable: false,
        check: "Boolean"
      },
      /**
       * Whether to write information about the libraries into the boot script
       */
      writeLibraryInfo: {
        init: true,
        nullable: false,
        check: "Boolean"
      },
      /**
       * Whether to use relative paths in source maps
       */
      sourceMapRelativePaths: {
        init: false,
        nullable: false,
        check: "Boolean"
      }
    },
    events: {
      /**
       * Fired after all enviroment data is collected, but before compilation begins; this
       * is an  opportunity to adjust the environment for the target.  The event data contains:
       *  application {qx.tool.compiler.app.Application} the app
       *  enviroment: {Object} enviroment data
       */
      checkEnvironment: "qx.event.type.Data",
      /**
       * Fired when an application is about to be serialized to disk; the appMeta is fully
       * populated, and this is an opportunity to amend the meta data before it is serialized
       * into files on disk
       */
      writingApplication: "qx.event.type.Event",
      /**
       * Fired when an application has been serialized to disk
       */
      writtenApplication: "qx.event.type.Event"
    },
    members: {
      /** @type {Map} maps filenames to uris */
      __P_499_0: null,
      /** @type {qx.tool.compiler.targets.meta.ApplicationMeta} for the current application */
      __P_499_1: null,
      /**
       * Initialises the target, creating directories etc
       */
      open: function open() {
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Transforms outputDir so that it always includes a trailing slash
       *
       * @param value
       * @returns {*}
       * @private
       */
      _transformOutputDir: function _transformOutputDir(value) {
        if (value) {
          if (value[value.length - 1] != "/") {
            value += "/";
          }
        }
        return value;
      },
      /**
       * Returns the root for applications
       */
      getApplicationRoot: function getApplicationRoot(application) {
        return path.join(this.getOutputDir(), this.getProjectDir(application)) + "/";
      },
      /**
       * Returns the project dir
       *
       * @returns String
       */
      getProjectDir: function getProjectDir(application) {
        return application.getOutputPath() || application.getName();
      },
      /**
       * Returns the URI for the root of the output, relative to the application
       */
      _getOutputRootUri: function _getOutputRootUri(application) {
        if (this.isPrivateArtifacts()) {
          return "";
        }
        var dir = this.getApplicationRoot(application);
        var targetUri = path.relative(dir, this.getOutputDir()) + "/";
        return targetUri;
      },
      /**
       * Adds a path mapping, where any reference to a file in `fromFile` is remapped to be
       * loaded via the `toUri.
       *
       * @param fromFile {String} the directory (or filename) to map
       * @param toUri {String} the URI to map to
       */
      addPathMapping: function addPathMapping(fromFile, toUri) {
        fromFile = path.resolve(fromFile);
        if (this.__P_499_0 === null) {
          this.__P_499_0 = {};
        }
        this.__P_499_0[fromFile] = toUri;
      },
      /**
       * Converts a filename to a URI, taking into account mappings added via `addMapping`.  If there is
       * no mapping, null is returned
       *
       * @param filename {String} the filename to map
       * @return {String} the URI for the file, null if not found
       */
      getPathMapping: function getPathMapping(filename) {
        if (this.__P_499_0) {
          var absFilename = path.resolve(filename);

          // Search
          for (var fromFile in this.__P_499_0) {
            if (absFilename.startsWith(fromFile)) {
              var toUri = this.__P_499_0[fromFile];
              filename = toUri + absFilename.substring(fromFile.length);
              return filename;
            }
          }
        }
        return null;
      },
      /**
       * Converts a filename to a URI, taking into account mappings added via `addMapping`.  If there is
       * no mapping, the filename can be modified to be relative to a given path (ie the directory where
       * the index.html is located)
       *
       * @param filename {String} the filename to map
       * @param relativeTo {String?} optional path that the filename needs to be relative to if there is no mapping
       * @return {String} the URI for the file
       */
      mapToUri: function mapToUri(filename, relativeTo) {
        var mapTo = this.getPathMapping(filename);
        if (mapTo !== null) {
          return mapTo;
        }
        if (relativeTo) {
          filename = path.relative(relativeTo, filename);
        }
        return filename;
      },
      /**
       * Generates the application
       *
       * @param application {qx.tool.compiler.app.Application} the application
       * @param environment {Object} the environment
       */
      generateApplication: function generateApplication(application, environment) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var t, analyser, rm, appMeta, targetUri, dir, appRootDir, mapTo, requiredLibs, externals, addExternal, name, bootJs, bootPackage, partsData, matchBundle, lastPackage, packages, assetUris, cldr, assets;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                t = _this;
                analyser = application.getAnalyser();
                rm = analyser.getResourceManager();
                appMeta = _this.__P_499_1 = new qx.tool.compiler.targets.meta.ApplicationMeta(_this, application);
                appMeta.setAddTimestampsToUrls(_this.getAddTimestampsToUrls());
                targetUri = "";
                if (!_this.isPrivateArtifacts() || application.getType() != "browser") {
                  dir = _this.getApplicationRoot(application);
                  targetUri = path.relative(dir, _this.getOutputDir()) + "/";
                }
                appRootDir = _this.getApplicationRoot(application);
                mapTo = _this.getPathMapping(path.join(appRootDir, _this.getOutputDir(), "transpiled/"));
                appMeta.setSourceUri(mapTo ? mapTo : targetUri + "transpiled/");
                mapTo = _this.getPathMapping(path.join(appRootDir, _this.getOutputDir(), "resource"));
                appMeta.setResourceUri(mapTo ? mapTo : targetUri + "resource");
                requiredLibs = application.getRequiredLibraries();
                _context2.next = 15;
                return qx.tool.utils.Utils.makeDirs(appRootDir);
              case 15:
                appMeta.setEnvironment({
                  "qx.application": application.getClassName(),
                  "qx.revision": "",
                  "qx.theme": application.getTheme()
                });
                externals = {};
                addExternal = function addExternal(arr, type) {
                  if (arr) {
                    arr.forEach(function (filename) {
                      if (externals[filename.toLowerCase()]) {
                        return;
                      }
                      externals[filename.toLowerCase()] = true;
                      var actualType = type || (filename.endsWith(".js") ? "urisBefore" : "cssBefore");
                      if (filename.match(/^https?:/)) {
                        appMeta.addExternal(actualType, filename);
                      } else {
                        var asset = rm.getAsset(filename);
                        if (asset) {
                          var str = asset.getDestFilename(t);
                          str = path.relative(appRootDir, str);
                          appMeta.addPreload(actualType, str);
                        }
                      }
                    });
                  }
                };
                requiredLibs.forEach(function (libnamespace) {
                  var library = analyser.findLibrary(libnamespace);
                  appMeta.addLibrary(library);
                  if (_this.isWriteLibraryInfo()) {
                    var libraryInfoMap = appMeta.getEnvironmentValue("qx.libraryInfoMap", {});
                    libraryInfoMap[libnamespace] = library.getLibraryInfo();
                  }
                  addExternal(library.getAddScript(), "urisBefore");
                  addExternal(library.getAddCss(), "cssBefore");
                });

                /*
                 * Environment
                 */
                for (name in environment) {
                  appMeta.setEnvironmentValue(name, environment[name]);
                }
                _context2.next = 22;
                return t.fireDataEventAsync("checkEnvironment", {
                  application: application,
                  environment: appMeta.getEnvironment()
                });
              case 22:
                /*
                 * Boot files
                 */
                bootJs = new qx.tool.compiler.targets.meta.BootJs(appMeta);
                bootPackage = appMeta.createPackage();
                appMeta.setBootMetaJs(bootJs);
                bootPackage.addJavascriptMeta(new qx.tool.compiler.targets.meta.PolyfillJs(appMeta));

                // Add browserified CommonJS modules, if any. The Browserify
                // class will always bundle local modules specified for an
                // application in compile.json, but will not bundle `require()`d
                // modules that are Node modules.
                if (appMeta.getEnvironmentValue("qx.compiler.applicationType") == "browser") {
                  bootPackage.addJavascriptMeta(new qx.tool.compiler.targets.meta.Browserify(appMeta));
                }

                /*
                 * Assemble the Parts
                 */
                partsData = application.getPartsDependencies();
                matchBundle = qx.tool.compiler.app.Application.createWildcardMatchFunction(application.getBundleInclude(), application.getBundleExclude());
                lastPackage = bootPackage;
                packages = {
                  boot: bootPackage
                };
                partsData.forEach(function (partData, index) {
                  var partMeta = appMeta.createPart(partData.name);
                  if (index == 0) {
                    partMeta.addPackage(bootPackage);
                  }
                  partData.classes.forEach(function (classname) {
                    var classFilename = classname.replace(/\./g, "/") + ".js";
                    var transpiledClassFilename = path.join(_this.getOutputDir(), "transpiled", classFilename);
                    var db = analyser.getDatabase();
                    var dbClassInfo = db.classInfo[classname];
                    var library = analyser.findLibrary(dbClassInfo.libraryName);
                    var sourcePath = library.getFilename(classFilename);
                    var jsMeta = new qx.tool.compiler.targets.meta.Javascript(appMeta, transpiledClassFilename, sourcePath);
                    var packageName = matchBundle(classname) ? "__bundle" : partData.name;
                    var pkg = packages[packageName];
                    if (!pkg || pkg !== lastPackage) {
                      pkg = packages[packageName] = appMeta.createPackage();
                      if (packageName == "__bundle") {
                        pkg.setEmbedAllJavascript(true);
                      }
                      partMeta.addPackage(pkg);
                    }
                    if (dbClassInfo.externals) {
                      addExternal(dbClassInfo.externals);
                    }
                    pkg.addJavascriptMeta(jsMeta);
                    pkg.addClassname(classname);
                    lastPackage = pkg;
                  });
                });
                assetUris = application.getAssetUris(t, rm, appMeta.getEnvironment()); // Save any changes that getAssets collected
                _context2.next = 35;
                return rm.saveDatabase();
              case 35:
                _context2.next = 37;
                return analyser.getCldr("en");
              case 37:
                cldr = _context2.sent;
                _context2.next = 40;
                return bootPackage.addLocale("C", cldr);
              case 40:
                _context2.next = 42;
                return _this._writeTranslations();
              case 42:
                assets = {};
                rm.getAssetsForPaths(assetUris).forEach(function (asset) {
                  bootPackage.addAsset(asset);
                  assets[asset.getFilename()] = asset.toString();
                });
                if (!(analyser.getApplicationTypes().indexOf("browser") > -1)) {
                  _context2.next = 50;
                  break;
                }
                appMeta.addPreBootCode("qx.$$fontBootstrap={};\n");
                _context2.next = 48;
                return _this.__P_499_2(application, appMeta, assets);
              case 48:
                _context2.next = 50;
                return _this.__P_499_3(application, appMeta, assets, bootPackage);
              case 50:
                _context2.next = 52;
                return _this._writeApplication();
              case 52:
                _this.__P_499_1 = null;
              case 53:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Writes the fonts defined in provides.webfonts
       * @deprecated
       */
      __P_499_2: function __P_499_2(application, appMeta, assets) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var analyser, requiredLibs, appLibrary, fontsToLoad, addLibraryFonts, loadFont, _i, _Object$keys, fontName, _fontsToLoad$fontName, font, library;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                analyser = application.getAnalyser();
                requiredLibs = application.getRequiredLibraries(); // Get a list of all fonts to load; use the font name as a unique identifier, and
                //  prioritise the application's library's definitions - this allows the application
                //  the opportunity to override the font definitions.  This is important when the
                //  library uses the open source/free versions of a font but the application
                //  developer has purchased the commercial/full version of the font (eg FontAwesome)
                appLibrary = appMeta.getAppLibrary();
                fontsToLoad = {};
                addLibraryFonts = function addLibraryFonts(library) {
                  var fonts = library.getWebFonts();
                  if (!fonts) {
                    return;
                  }
                  fonts.forEach(function (font) {
                    fontsToLoad[font.getName()] = {
                      font: font,
                      library: library
                    };
                  });
                };
                requiredLibs.forEach(function (libnamespace) {
                  var library = analyser.findLibrary(libnamespace);
                  if (library != appLibrary) {
                    addLibraryFonts(library);
                  }
                });
                if (addLibraryFonts) {
                  _context4.next = 8;
                  break;
                }
                return _context4.abrupt("return");
              case 8:
                addLibraryFonts(appLibrary);
                loadFont = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(library, font) {
                    var res, resources, key, code;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.prev = 0;
                          // check if font is asset somewhere
                          res = font.getResources().filter(function (res) {
                            return assets[res];
                          });
                          if (!(res.length === 0)) {
                            _context3.next = 5;
                            break;
                          }
                          qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.noResources", font.toString(), application.getName(), font.getResources().join(","));
                          return _context3.abrupt("return");
                        case 5:
                          font.setResources(res);
                          _context3.next = 8;
                          return font.generateForTarget(_this2);
                        case 8:
                          _context3.next = 10;
                          return font.generateForApplication(_this2, application);
                        case 10:
                          resources = _context3.sent;
                          for (key in resources) {
                            appMeta.addResource(key, resources[key]);
                          }
                          code = font.getBootstrapCode(_this2, application);
                          if (code) {
                            appMeta.addPreBootCode(code);
                          }
                          _context3.next = 19;
                          break;
                        case 16:
                          _context3.prev = 16;
                          _context3.t0 = _context3["catch"](0);
                          qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.error", font.toString(), _context3.t0.toString());
                        case 19:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3, null, [[0, 16]]);
                  }));
                  return function loadFont(_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }();
                _i = 0, _Object$keys = Object.keys(fontsToLoad);
              case 11:
                if (!(_i < _Object$keys.length)) {
                  _context4.next = 19;
                  break;
                }
                fontName = _Object$keys[_i];
                _fontsToLoad$fontName = fontsToLoad[fontName], font = _fontsToLoad$fontName.font, library = _fontsToLoad$fontName.library;
                _context4.next = 16;
                return loadFont(library, font);
              case 16:
                _i++;
                _context4.next = 11;
                break;
              case 19:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Writes the fonts defined in provides.fonts
       */
      __P_499_3: function __P_499_3(application, appMeta, assets, bootPackage) {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          var analyser, rm, addResourcesToBuild, fontNames, _iterator2, _step2, _loop, key, code, _ret;
          return _regeneratorRuntime().wrap(function _callee5$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                analyser = application.getAnalyser();
                rm = analyser.getResourceManager();
                addResourcesToBuild = function addResourcesToBuild(resourcePaths) {
                  var _iterator = _createForOfIteratorHelper(rm.getAssetsForPaths(resourcePaths)),
                    _step;
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      var asset = _step.value;
                      bootPackage.addAsset(asset);
                      assets[asset.getFilename()] = asset.toString();
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                };
                fontNames = application.getFonts();
                _iterator2 = _createForOfIteratorHelper(fontNames);
                _context6.prev = 5;
                _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                  var fontName, font, resources, fontFaces, fontCss, cssUrls, cssResources, _iterator3, _step3, urlOrPath, types, hasLocalFontResources, hasUrlFontResources, _iterator4, _step4, fontFace, useLocalFonts, _iterator5, _step5, _fontFace;
                  return _regeneratorRuntime().wrap(function _loop$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        fontName = _step2.value;
                        font = analyser.getFont(fontName);
                        if (font) {
                          _context5.next = 4;
                          break;
                        }
                        return _context5.abrupt("return", {
                          v: void 0
                        });
                      case 4:
                        resources = font.getApplicationFontData();
                        for (key in resources) {
                          appMeta.addResource(key, resources[key]);
                        }
                        fontFaces = font.getFontFaces() || []; // Break out the CSS into local resource files and URLs
                        fontCss = font.getCss() || [];
                        cssUrls = [];
                        cssResources = [];
                        _iterator3 = _createForOfIteratorHelper(fontCss);
                        try {
                          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                            urlOrPath = _step3.value;
                            if (urlOrPath.match(/^https?:/)) {
                              cssUrls.push(urlOrPath);
                            } else {
                              cssResources.push(urlOrPath);
                            }
                          }

                          // Exclude font files that we do not want to include
                        } catch (err) {
                          _iterator3.e(err);
                        } finally {
                          _iterator3.f();
                        }
                        types = _this3.getFontTypes();
                        hasLocalFontResources = false;
                        hasUrlFontResources = false;
                        if (types.length) {
                          _iterator4 = _createForOfIteratorHelper(fontFaces);
                          try {
                            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                              fontFace = _step4.value;
                              fontFace.paths = fontFace.paths.filter(function (filename) {
                                var pos = filename.lastIndexOf(".");
                                if (pos > -1) {
                                  var ext = filename.substring(pos + 1);
                                  if (types.indexOf(ext) > -1) {
                                    return true;
                                  }
                                }
                                if (!filename.match(/^https?:/)) {
                                  hasLocalFontResources = true;
                                } else {
                                  hasUrlFontResources = true;
                                }
                                return false;
                              });
                            }
                          } catch (err) {
                            _iterator4.e(err);
                          } finally {
                            _iterator4.f();
                          }
                        }

                        // It is important to always prefer local fonts if we have them and are not instructed to prefer CDNs
                        useLocalFonts = cssUrls.length == 0 && !hasUrlFontResources;
                        if (_this3.isPreferLocalFonts() && (cssResources.length > 0 || hasLocalFontResources)) {
                          useLocalFonts = true;
                        }

                        // Make sure we add any CSS and font resource files to the target output
                        if (useLocalFonts) {
                          addResourcesToBuild(cssResources);
                          _iterator5 = _createForOfIteratorHelper(fontFaces);
                          try {
                            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                              _fontFace = _step5.value;
                              addResourcesToBuild(_fontFace.paths);
                            }
                          } catch (err) {
                            _iterator5.e(err);
                          } finally {
                            _iterator5.f();
                          }
                        }
                        code = font.getBootstrapCode(_this3, application, useLocalFonts);
                        if (code) {
                          appMeta.addPreBootCode(code);
                        }
                      case 21:
                      case "end":
                        return _context5.stop();
                    }
                  }, _loop);
                });
                _iterator2.s();
              case 8:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.next = 15;
                  break;
                }
                return _context6.delegateYield(_loop(), "t0", 10);
              case 10:
                _ret = _context6.t0;
                if (!_ret) {
                  _context6.next = 13;
                  break;
                }
                return _context6.abrupt("return", _ret.v);
              case 13:
                _context6.next = 8;
                break;
              case 15:
                _context6.next = 20;
                break;
              case 17:
                _context6.prev = 17;
                _context6.t1 = _context6["catch"](5);
                _iterator2.e(_context6.t1);
              case 20:
                _context6.prev = 20;
                _iterator2.f();
                return _context6.finish(20);
              case 23:
              case "end":
                return _context6.stop();
            }
          }, _callee5, null, [[5, 17, 20, 23]]);
        }))();
      },
      /**
       * Handles the output of translations and locales
       */
      _writeTranslations: function _writeTranslations() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var appMeta, analyser, policy;
          return _regeneratorRuntime().wrap(function _callee6$(_context7) {
            while (1) switch (_context7.prev = _context7.next) {
              case 0:
                appMeta = _this4.getAppMeta();
                analyser = appMeta.getAnalyser();
                if (!_this4.isUpdatePoFiles()) {
                  _context7.next = 11;
                  break;
                }
                policy = _this4.getLibraryPoPolicy();
                if (!(policy != "ignore")) {
                  _context7.next = 9;
                  break;
                }
                _context7.next = 7;
                return analyser.updateTranslations(appMeta.getAppLibrary(), _this4.getLocales(), appMeta.getLibraries(), policy == "all");
              case 7:
                _context7.next = 11;
                break;
              case 9:
                _context7.next = 11;
                return analyser.updateTranslations(appMeta.getAppLibrary(), _this4.getLocales(), null, false);
              case 11:
                _context7.next = 13;
                return _this4._writeLocales();
              case 13:
                if (!_this4.getWriteAllTranslations()) {
                  _context7.next = 18;
                  break;
                }
                _context7.next = 16;
                return _this4._writeAllTranslations();
              case 16:
                _context7.next = 20;
                break;
              case 18:
                _context7.next = 20;
                return _this4._writeRequiredTranslations();
              case 20:
              case "end":
                return _context7.stop();
            }
          }, _callee6);
        }))();
      },
      /**
       * Transform method for locales property; ensures that all locales are case correct, ie
       * have the form aa_BB (for example "en_GB" is correct but "en_gb" is invalid)
       *
       * @param value {String[]} array of locale IDs
       * @return {String[]} the modified array
       */
      _transformLocales: function _transformLocales(value) {
        if (!value) {
          return value;
        }
        return value.map(function (localeId) {
          localeId = localeId.toLowerCase();
          var pos = localeId.indexOf("_");
          if (pos > -1) {
            localeId = localeId.substring(0, pos) + localeId.substring(pos).toUpperCase();
          }
          return localeId;
        });
      },
      /**
       * Writes the required locale CLDR data, incorporating inheritance.  Note that locales in CLDR can
       * have a "parent locale", where the locale inherits all settings from the parent except where explicitly
       * set in the locale.  This is in addition to the inheritance between language and locale, eg where "en_GB"
       * overrides settings from "en".  Qooxdoo client understands that if a setting is not provided in
       * "en_GB" it must look to "en", but it does not understand the "parent locale" inheritance, so this
       * method must flatten the "parent locale" inheritance.
       */
      _writeLocales: function _writeLocales() {
        var _this5 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
          var t, appMeta, analyser, bootPackage, loadLocaleData, promises;
          return _regeneratorRuntime().wrap(function _callee8$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                loadLocaleData = function _loadLocaleData(localeId) {
                  var combinedCldr = null;
                  function accumulateCldr(localeId) {
                    return analyser.getCldr(localeId).then(function (cldr) {
                      if (!combinedCldr) {
                        combinedCldr = cldr;
                      } else {
                        for (var name in cldr) {
                          var value = combinedCldr[name];
                          if (value === null || value === undefined) {
                            combinedCldr[name] = cldr[name];
                          }
                        }
                      }
                      var parentLocaleId = qx.tool.compiler.app.Cldr.getParentLocale(localeId);
                      if (parentLocaleId) {
                        return accumulateCldr(parentLocaleId);
                      }
                      return combinedCldr;
                    });
                  }
                  return accumulateCldr(localeId);
                };
                t = _this5;
                appMeta = _this5.getAppMeta();
                analyser = appMeta.getAnalyser();
                bootPackage = appMeta.getPackages()[0];
                promises = t.getLocales().map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(localeId) {
                    var cldr, pkg;
                    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                      while (1) switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return loadLocaleData(localeId);
                        case 2:
                          cldr = _context8.sent;
                          pkg = _this5.isI18nAsParts() ? appMeta.getLocalePackage(localeId) : bootPackage;
                          pkg.addLocale(localeId, cldr);
                        case 5:
                        case "end":
                          return _context8.stop();
                      }
                    }, _callee7);
                  }));
                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context9.next = 8;
                return qx.Promise.all(promises);
              case 8:
              case "end":
                return _context9.stop();
            }
          }, _callee8);
        }))();
      },
      /**
       * Writes all translations
       */
      _writeAllTranslations: function _writeAllTranslations() {
        var _this6 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
          var t, appMeta, analyser, bootPackage, translations, promises;
          return _regeneratorRuntime().wrap(function _callee9$(_context10) {
            while (1) switch (_context10.prev = _context10.next) {
              case 0:
                t = _this6;
                appMeta = _this6.getAppMeta();
                analyser = appMeta.getAnalyser();
                bootPackage = appMeta.getPackages()[0];
                translations = {};
                promises = [];
                t.getLocales().forEach(function (localeId) {
                  var pkg = _this6.isI18nAsParts() ? appMeta.getLocalePackage(localeId) : bootPackage;
                  function addTrans(library, localeId) {
                    return analyser.getTranslation(library, localeId).then(function (translation) {
                      var id = library.getNamespace() + ":" + localeId;
                      translations[id] = translation;
                      var entries = translation.getEntries();
                      for (var msgid in entries) {
                        pkg.addTranslationEntry(localeId, entries[msgid]);
                      }
                    });
                  }
                  appMeta.getLibraries().forEach(function (library) {
                    if (library === appMeta.getAppLibrary()) {
                      return;
                    }
                    promises.push(addTrans(library, localeId));
                  });
                  // translation from main app should overwrite package translations
                  promises.push(addTrans(appMeta.getAppLibrary(), localeId));
                });
                _context10.next = 9;
                return qx.Promise.all(promises);
              case 9:
              case "end":
                return _context10.stop();
            }
          }, _callee9);
        }))();
      },
      /**
       * Writes only those translations which are actually required
       */
      _writeRequiredTranslations: function _writeRequiredTranslations() {
        var _this7 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
          var t, appMeta, analyser, db, bootPackage, translations, promises;
          return _regeneratorRuntime().wrap(function _callee10$(_context11) {
            while (1) switch (_context11.prev = _context11.next) {
              case 0:
                t = _this7;
                appMeta = _this7.getAppMeta();
                analyser = appMeta.getAnalyser();
                db = analyser.getDatabase();
                bootPackage = appMeta.getPackages()[0];
                translations = {};
                promises = [];
                t.getLocales().forEach(function (localeId) {
                  var pkg = _this7.isI18nAsParts() ? appMeta.getLocalePackage(localeId) : bootPackage;
                  appMeta.getLibraries().forEach(function (library) {
                    promises.push(analyser.getTranslation(library, localeId).then(function (translation) {
                      var id = library.getNamespace() + ":" + localeId;
                      translations[id] = translation;
                      var entry = translation.getEntry("");
                      if (entry) {
                        pkg.addTranslationEntry(localeId, entry);
                      }
                    }));
                  });
                });
                _context11.next = 10;
                return qx.Promise.all(promises);
              case 10:
                appMeta.getPackages().forEach(function (pkg) {
                  pkg.getClassnames().forEach(function (classname) {
                    var dbClassInfo = db.classInfo[classname];
                    if (!dbClassInfo.translations) {
                      return;
                    }
                    t.getLocales().forEach(function (localeId) {
                      var localePkg = _this7.isI18nAsParts() ? appMeta.getLocalePackage(localeId) : pkg;
                      dbClassInfo.translations.forEach(function (transInfo) {
                        var entry;
                        var id = appMeta.getAppLibrary().getNamespace() + ":" + localeId;
                        // search in main app first
                        var translation = translations[id];
                        if (translation) {
                          entry = translation.getEntry(transInfo.msgid);
                        }
                        var idLib = dbClassInfo.libraryName + ":" + localeId;
                        if (!entry && id !== idLib) {
                          var _translation = translations[idLib];
                          if (_translation) {
                            entry = _translation.getEntry(transInfo.msgid);
                          }
                        }
                        if (entry) {
                          localePkg.addTranslationEntry(localeId, entry);
                        }
                      });
                    });
                  });
                });
              case 11:
              case "end":
                return _context11.stop();
            }
          }, _callee10);
        }))();
      },
      /**
       * Writes the application
       */
      _writeApplication: function _writeApplication() {
        var _this8 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
          var t, appMeta, application, appRootDir, bootMeta, arr, i, pkg, bootPackage, appSummary;
          return _regeneratorRuntime().wrap(function _callee11$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                t = _this8;
                _context12.next = 3;
                return _this8.fireEventAsync("writingApplication");
              case 3:
                appMeta = _this8.getAppMeta();
                application = appMeta.getApplication();
                appRootDir = appMeta.getApplicationRoot();
                if (appMeta.getAppLibrary()) {
                  _context12.next = 9;
                  break;
                }
                qx.tool.compiler.Console.print("qx.tool.compiler.target.missingAppLibrary", application.getName());
                return _context12.abrupt("return");
              case 9:
                bootMeta = appMeta.getBootMetaJs();
                arr = appMeta.getPackages(), i = 0;
              case 11:
                if (!(i < arr.length)) {
                  _context12.next = 19;
                  break;
                }
                pkg = arr[i];
                if (pkg.isEmpty()) {
                  pkg.setNeedsWriteToDisk(false);
                  bootMeta.addEmbeddedJs(pkg.getJavascript());
                }
                _context12.next = 16;
                return pkg.getJavascript().unwrap().writeToDisk();
              case 16:
                i++;
                _context12.next = 11;
                break;
              case 19:
                _context12.next = 21;
                return appMeta.getBootMetaJs().unwrap().writeToDisk();
              case 21:
                _context12.next = 23;
                return _this8._writeIndexHtml();
              case 23:
                if (t.isWriteCompileInfo()) {
                  _context12.next = 27;
                  break;
                }
                _context12.next = 26;
                return _this8.fireEventAsync("writtenApplication");
              case 26:
                return _context12.abrupt("return");
              case 27:
                bootPackage = appMeta.getPackages()[0];
                appSummary = {
                  appClass: application.getClassName(),
                  libraries: appMeta.getLibraries().map(function (lib) {
                    return lib.getNamespace();
                  }),
                  parts: [],
                  resources: bootPackage.getAssets().map(function (asset) {
                    return asset.getFilename();
                  }),
                  locales: _this8.getLocales(),
                  environment: appMeta.getEnvironment(),
                  urisBefore: appMeta.getPreloads().urisBefore,
                  cssBefore: appMeta.getPreloads().cssBefore
                };
                application.getPartsDependencies().forEach(function (partData) {
                  appSummary.parts.push({
                    classes: partData.classes,
                    include: partData.include,
                    exclude: partData.exclude,
                    minify: partData.minify,
                    name: partData.name
                  });
                });
                _context12.next = 32;
                return fs.writeFileAsync(appRootDir + "/compile-info.json", JSON.stringify(appSummary, null, 2) + "\n", {
                  encoding: "utf8"
                });
              case 32:
                _context12.next = 34;
                return _this8.fireEventAsync("writtenApplication");
              case 34:
              case "end":
                return _context12.stop();
            }
          }, _callee11);
        }))();
      },
      /**
       * Called to generate index.html
       */
      _writeIndexHtml: function _writeIndexHtml() {
        var _this9 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
          var t, appMeta, application, resDir, timeStamp, pathToTarget, indexJsTimestamp, indexJsFilename, TEMPLATE_VARS, replaceVars, defaultIndexHtml, bootDir, indexHtml, stats;
          return _regeneratorRuntime().wrap(function _callee13$(_context14) {
            while (1) switch (_context14.prev = _context14.next) {
              case 0:
                replaceVars = function _replaceVars(code) {
                  for (var varName in TEMPLATE_VARS) {
                    code = code.replace(new RegExp("\\${".concat(varName, "}"), "g"), TEMPLATE_VARS[varName]);
                  }
                  return code;
                };
                t = _this9;
                appMeta = _this9.getAppMeta();
                application = appMeta.getApplication();
                if (application.isBrowserApp()) {
                  _context14.next = 6;
                  break;
                }
                return _context14.abrupt("return");
              case 6:
                if (_this9.isGenerateIndexHtml()) {
                  _context14.next = 8;
                  break;
                }
                return _context14.abrupt("return");
              case 8:
                resDir = _this9.getApplicationRoot(application);
                timeStamp = new Date().getTime();
                pathToTarget = path.relative(path.join(t.getOutputDir(), t.getProjectDir(application)), t.getOutputDir()) + "/";
                indexJsTimestamp = "";
                if (_this9.isAddTimestampsToUrls()) {
                  indexJsFilename = path.join(appMeta.getApplicationRoot(), "index.js");
                  indexJsTimestamp = "?" + fs.statSync(indexJsFilename).mtimeMs;
                }
                TEMPLATE_VARS = {
                  resourcePath: pathToTarget + "resource/",
                  targetPath: pathToTarget,
                  appPath: "",
                  preBootJs: "",
                  appTitle: application.getTitle() || "Qooxdoo Application",
                  timeStamp: timeStamp,
                  indexJsTimestamp: indexJsTimestamp
                };
                /* eslint-disable no-template-curly-in-string */
                defaultIndexHtml = "<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <title>${appTitle}</title>\n</head>\n<body>\n  <!-- This index.html can be customised by creating a boot/index.html (do not include Qooxdoo application script tags like\n       the one below because they will be added automatically)\n    -->\n${preBootJs}\n  <script type=\"text/javascript\" src=\"${appPath}index.js${indexJsTimestamp}\"></script>\n</body>\n</html>\n";
                /* eslint-enable no-template-curly-in-string */
                bootDir = application.getBootPath();
                indexHtml = null;
                if (!bootDir) {
                  _context14.next = 25;
                  break;
                }
                bootDir = path.join(appMeta.getAppLibrary().getRootDir(), application.getBootPath());
                _context14.next = 21;
                return qx.tool.utils.files.Utils.safeStat(bootDir);
              case 21:
                stats = _context14.sent;
                if (!(stats && stats.isDirectory())) {
                  _context14.next = 25;
                  break;
                }
                _context14.next = 25;
                return qx.tool.utils.files.Utils.sync(bootDir, resDir, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(from, to) {
                    var data;
                    return _regeneratorRuntime().wrap(function _callee12$(_context13) {
                      while (1) switch (_context13.prev = _context13.next) {
                        case 0:
                          if (from.endsWith(".html")) {
                            _context13.next = 2;
                            break;
                          }
                          return _context13.abrupt("return", true);
                        case 2:
                          _context13.next = 4;
                          return fs.readFileAsync(from, "utf8");
                        case 4:
                          data = _context13.sent;
                          if (path.basename(from) == "index.html") {
                            if (!data.match(/\$\{\s*preBootJs\s*\}/)) {
                              /* eslint-disable no-template-curly-in-string */
                              data = data.replace("</body>", "\n${preBootJs}\n</body>");
                              /* eslint-enable no-template-curly-in-string */
                              qx.tool.compiler.Console.print("qx.tool.compiler.target.missingPreBootJs", from);
                            }
                            if (!data.match(/\s*index.js\s*/)) {
                              /* eslint-disable no-template-curly-in-string */
                              data = data.replace("</body>", '\n  <script type="text/javascript" src="${appPath}index.js${indexJsTimestamp}"></script>\n</body>');

                              /* eslint-enable no-template-curly-in-string */
                              qx.tool.compiler.Console.print("qx.tool.compiler.target.missingBootJs", from);
                            }
                            indexHtml = data;
                          }
                          data = replaceVars(data);
                          _context13.next = 9;
                          return fs.writeFileAsync(to, data, "utf8");
                        case 9:
                          return _context13.abrupt("return", false);
                        case 10:
                        case "end":
                          return _context13.stop();
                      }
                    }, _callee12);
                  }));
                  return function (_x4, _x5) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              case 25:
                if (indexHtml) {
                  _context14.next = 29;
                  break;
                }
                indexHtml = defaultIndexHtml;
                _context14.next = 29;
                return fs.writeFileAsync(resDir + "index.html", replaceVars(indexHtml), {
                  encoding: "utf8"
                });
              case 29:
                if (!application.getWriteIndexHtmlToRoot()) {
                  _context14.next = 34;
                  break;
                }
                pathToTarget = "";
                TEMPLATE_VARS = {
                  resourcePath: "resource/",
                  targetPath: "",
                  appPath: t.getProjectDir(application) + "/",
                  preBootJs: "",
                  appTitle: application.getTitle() || "Qooxdoo Application",
                  timeStamp: timeStamp,
                  indexJsTimestamp: indexJsTimestamp
                };
                _context14.next = 34;
                return fs.writeFileAsync(t.getOutputDir() + "index.html", replaceVars(indexHtml), {
                  encoding: "utf8"
                });
              case 34:
              case "end":
                return _context14.stop();
            }
          }, _callee13);
        }))();
      },
      getAppMeta: function getAppMeta() {
        return this.__P_499_1;
      }
    }
  });
  qx.tool.compiler.targets.Target.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Target.js.map?dt=1722151847399