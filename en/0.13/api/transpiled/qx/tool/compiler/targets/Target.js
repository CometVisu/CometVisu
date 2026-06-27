function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      __P_510_0: null,
      /** @type {qx.tool.compiler.targets.meta.ApplicationMeta} for the current application */
      __P_510_1: null,
      /**
       * Initialises the target, creating directories etc
       */
      open: function open() {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                return _context.a(2);
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
        if (this.__P_510_0 === null) {
          this.__P_510_0 = {};
        }
        this.__P_510_0[fromFile] = toUri;
      },
      /**
       * Converts a filename to a URI, taking into account mappings added via `addMapping`.  If there is
       * no mapping, null is returned
       *
       * @param filename {String} the filename to map
       * @return {String} the URI for the file, null if not found
       */
      getPathMapping: function getPathMapping(filename) {
        if (this.__P_510_0) {
          var absFilename = path.resolve(filename);

          // Search
          for (var fromFile in this.__P_510_0) {
            if (absFilename.startsWith(fromFile)) {
              var toUri = this.__P_510_0[fromFile];
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var t, analyser, rm, appMeta, targetUri, dir, appRootDir, mapTo, requiredLibs, externals, addExternal, name, bootJs, bootPackage, partsData, matchBundle, lastPackage, packages, assetUris, cldr, assets;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                t = _this;
                analyser = application.getAnalyser();
                rm = analyser.getResourceManager();
                appMeta = _this.__P_510_1 = new qx.tool.compiler.targets.meta.ApplicationMeta(_this, application);
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
                _context2.n = 1;
                return qx.tool.utils.Utils.makeDirs(appRootDir);
              case 1:
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
                _context2.n = 2;
                return t.fireDataEventAsync("checkEnvironment", {
                  application: application,
                  environment: appMeta.getEnvironment()
                });
              case 2:
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
                _context2.n = 3;
                return rm.saveDatabase();
              case 3:
                _context2.n = 4;
                return analyser.getCldr("en");
              case 4:
                cldr = _context2.v;
                _context2.n = 5;
                return bootPackage.addLocale("C", cldr);
              case 5:
                _context2.n = 6;
                return _this._writeTranslations();
              case 6:
                assets = {};
                rm.getAssetsForPaths(assetUris).forEach(function (asset) {
                  bootPackage.addAsset(asset);
                  assets[asset.getFilename()] = asset.toString();
                });
                if (!(analyser.getApplicationTypes().indexOf("browser") > -1)) {
                  _context2.n = 8;
                  break;
                }
                appMeta.addPreBootCode("qx.$$fontBootstrap={};\n");
                _context2.n = 7;
                return _this.__P_510_2(application, appMeta, assets);
              case 7:
                _context2.n = 8;
                return _this.__P_510_3(application, appMeta, assets, bootPackage);
              case 8:
                _context2.n = 9;
                return _this._writeApplication();
              case 9:
                _this.__P_510_1 = null;
              case 10:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Writes the fonts defined in provides.webfonts
       * @deprecated
       */
      __P_510_2: function __P_510_2(application, appMeta, assets) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var analyser, requiredLibs, appLibrary, fontsToLoad, addLibraryFonts, loadFont, _i, _Object$keys, fontName, _fontsToLoad$fontName, font, library;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
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
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2);
              case 1:
                addLibraryFonts(appLibrary);
                loadFont = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(library, font) {
                    var res, resources, key, code, _t;
                    return _regenerator().w(function (_context3) {
                      while (1) switch (_context3.p = _context3.n) {
                        case 0:
                          _context3.p = 0;
                          // check if font is asset somewhere
                          res = font.getResources().filter(function (res) {
                            return assets[res];
                          });
                          if (!(res.length === 0)) {
                            _context3.n = 1;
                            break;
                          }
                          qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.noResources", font.toString(), application.getName(), font.getResources().join(","));
                          return _context3.a(2);
                        case 1:
                          font.setResources(res);
                          _context3.n = 2;
                          return font.generateForTarget(_this2);
                        case 2:
                          _context3.n = 3;
                          return font.generateForApplication(_this2, application);
                        case 3:
                          resources = _context3.v;
                          for (key in resources) {
                            appMeta.addResource(key, resources[key]);
                          }
                          code = font.getBootstrapCode(_this2, application);
                          if (code) {
                            appMeta.addPreBootCode(code);
                          }
                          _context3.n = 5;
                          break;
                        case 4:
                          _context3.p = 4;
                          _t = _context3.v;
                          qx.tool.compiler.Console.print("qx.tool.compiler.webfonts.error", font.toString(), _t.toString());
                        case 5:
                          return _context3.a(2);
                      }
                    }, _callee3, null, [[0, 4]]);
                  }));
                  return function loadFont(_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }();
                _i = 0, _Object$keys = Object.keys(fontsToLoad);
              case 2:
                if (!(_i < _Object$keys.length)) {
                  _context4.n = 4;
                  break;
                }
                fontName = _Object$keys[_i];
                _fontsToLoad$fontName = fontsToLoad[fontName], font = _fontsToLoad$fontName.font, library = _fontsToLoad$fontName.library;
                _context4.n = 3;
                return loadFont(library, font);
              case 3:
                _i++;
                _context4.n = 2;
                break;
              case 4:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      },
      /**
       * Writes the fonts defined in provides.fonts
       */
      __P_510_3: function __P_510_3(application, appMeta, assets, bootPackage) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var analyser, rm, addResourcesToBuild, fontNames, _iterator2, _step2, _loop, key, code, _ret, _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
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
                _context6.p = 1;
                _loop = /*#__PURE__*/_regenerator().m(function _loop() {
                  var fontName, font, resources, fontFaces, fontCss, cssUrls, cssResources, _iterator3, _step3, urlOrPath, types, hasLocalFontResources, hasUrlFontResources, _iterator4, _step4, fontFace, useLocalFonts, _iterator5, _step5, _fontFace;
                  return _regenerator().w(function (_context5) {
                    while (1) switch (_context5.n) {
                      case 0:
                        fontName = _step2.value;
                        font = analyser.getFont(fontName);
                        if (font) {
                          _context5.n = 1;
                          break;
                        }
                        return _context5.a(2, {
                          v: void 0
                        });
                      case 1:
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
                      case 2:
                        return _context5.a(2);
                    }
                  }, _loop);
                });
                _iterator2.s();
              case 2:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.n = 5;
                  break;
                }
                return _context6.d(_regeneratorValues(_loop()), 3);
              case 3:
                _ret = _context6.v;
                if (!_ret) {
                  _context6.n = 4;
                  break;
                }
                return _context6.a(2, _ret.v);
              case 4:
                _context6.n = 2;
                break;
              case 5:
                _context6.n = 7;
                break;
              case 6:
                _context6.p = 6;
                _t2 = _context6.v;
                _iterator2.e(_t2);
              case 7:
                _context6.p = 7;
                _iterator2.f();
                return _context6.f(7);
              case 8:
                return _context6.a(2);
            }
          }, _callee5, null, [[1, 6, 7, 8]]);
        }))();
      },
      /**
       * Handles the output of translations and locales
       */
      _writeTranslations: function _writeTranslations() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var appMeta, analyser, policy;
          return _regenerator().w(function (_context7) {
            while (1) switch (_context7.n) {
              case 0:
                appMeta = _this4.getAppMeta();
                analyser = appMeta.getAnalyser();
                if (!_this4.isUpdatePoFiles()) {
                  _context7.n = 3;
                  break;
                }
                policy = _this4.getLibraryPoPolicy();
                if (!(policy != "ignore")) {
                  _context7.n = 2;
                  break;
                }
                _context7.n = 1;
                return analyser.updateTranslations(appMeta.getAppLibrary(), _this4.getLocales(), appMeta.getLibraries(), policy == "all");
              case 1:
                _context7.n = 3;
                break;
              case 2:
                _context7.n = 3;
                return analyser.updateTranslations(appMeta.getAppLibrary(), _this4.getLocales(), null, false);
              case 3:
                _context7.n = 4;
                return _this4._writeLocales();
              case 4:
                if (!_this4.getWriteAllTranslations()) {
                  _context7.n = 6;
                  break;
                }
                _context7.n = 5;
                return _this4._writeAllTranslations();
              case 5:
                _context7.n = 7;
                break;
              case 6:
                _context7.n = 7;
                return _this4._writeRequiredTranslations();
              case 7:
                return _context7.a(2);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          var t, appMeta, analyser, bootPackage, loadLocaleData, promises;
          return _regenerator().w(function (_context9) {
            while (1) switch (_context9.n) {
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
                promises = t.getLocales().map(/*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(localeId) {
                    var cldr, pkg;
                    return _regenerator().w(function (_context8) {
                      while (1) switch (_context8.n) {
                        case 0:
                          _context8.n = 1;
                          return loadLocaleData(localeId);
                        case 1:
                          cldr = _context8.v;
                          pkg = _this5.isI18nAsParts() ? appMeta.getLocalePackage(localeId) : bootPackage;
                          pkg.addLocale(localeId, cldr);
                        case 2:
                          return _context8.a(2);
                      }
                    }, _callee7);
                  }));
                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                _context9.n = 1;
                return qx.Promise.all(promises);
              case 1:
                return _context9.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Writes all translations
       */
      _writeAllTranslations: function _writeAllTranslations() {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
          var t, appMeta, analyser, bootPackage, translations, promises;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
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
                _context0.n = 1;
                return qx.Promise.all(promises);
              case 1:
                return _context0.a(2);
            }
          }, _callee9);
        }))();
      },
      /**
       * Writes only those translations which are actually required
       */
      _writeRequiredTranslations: function _writeRequiredTranslations() {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var t, appMeta, analyser, db, bootPackage, translations, promises;
          return _regenerator().w(function (_context1) {
            while (1) switch (_context1.n) {
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
                _context1.n = 1;
                return qx.Promise.all(promises);
              case 1:
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
              case 2:
                return _context1.a(2);
            }
          }, _callee0);
        }))();
      },
      /**
       * Writes the application
       */
      _writeApplication: function _writeApplication() {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
          var t, appMeta, application, appRootDir, bootMeta, arr, i, pkg, bootPackage, appSummary;
          return _regenerator().w(function (_context10) {
            while (1) switch (_context10.n) {
              case 0:
                t = _this8;
                _context10.n = 1;
                return _this8.fireEventAsync("writingApplication");
              case 1:
                appMeta = _this8.getAppMeta();
                application = appMeta.getApplication();
                appRootDir = appMeta.getApplicationRoot();
                if (appMeta.getAppLibrary()) {
                  _context10.n = 2;
                  break;
                }
                qx.tool.compiler.Console.print("qx.tool.compiler.target.missingAppLibrary", application.getName());
                return _context10.a(2);
              case 2:
                bootMeta = appMeta.getBootMetaJs();
                arr = appMeta.getPackages(), i = 0;
              case 3:
                if (!(i < arr.length)) {
                  _context10.n = 5;
                  break;
                }
                pkg = arr[i];
                if (pkg.isEmpty()) {
                  pkg.setNeedsWriteToDisk(false);
                  bootMeta.addEmbeddedJs(pkg.getJavascript());
                }
                _context10.n = 4;
                return pkg.getJavascript().unwrap().writeToDisk();
              case 4:
                i++;
                _context10.n = 3;
                break;
              case 5:
                _context10.n = 6;
                return appMeta.getBootMetaJs().unwrap().writeToDisk();
              case 6:
                _context10.n = 7;
                return _this8._writeIndexHtml();
              case 7:
                if (t.isWriteCompileInfo()) {
                  _context10.n = 9;
                  break;
                }
                _context10.n = 8;
                return _this8.fireEventAsync("writtenApplication");
              case 8:
                return _context10.a(2);
              case 9:
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
                _context10.n = 10;
                return fs.writeFileAsync(appRootDir + "/compile-info.json", JSON.stringify(appSummary, null, 2) + "\n", {
                  encoding: "utf8"
                });
              case 10:
                _context10.n = 11;
                return _this8.fireEventAsync("writtenApplication");
              case 11:
                return _context10.a(2);
            }
          }, _callee1);
        }))();
      },
      /**
       * Called to generate index.html
       */
      _writeIndexHtml: function _writeIndexHtml() {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
          var t, appMeta, application, resDir, timeStamp, pathToTarget, indexJsTimestamp, indexJsFilename, TEMPLATE_VARS, replaceVars, defaultIndexHtml, bootDir, indexHtml, stats;
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.n) {
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
                  _context12.n = 1;
                  break;
                }
                return _context12.a(2);
              case 1:
                if (_this9.isGenerateIndexHtml()) {
                  _context12.n = 2;
                  break;
                }
                return _context12.a(2);
              case 2:
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
                  _context12.n = 4;
                  break;
                }
                bootDir = path.join(appMeta.getAppLibrary().getRootDir(), application.getBootPath());
                _context12.n = 3;
                return qx.tool.utils.files.Utils.safeStat(bootDir);
              case 3:
                stats = _context12.v;
                if (!(stats && stats.isDirectory())) {
                  _context12.n = 4;
                  break;
                }
                _context12.n = 4;
                return qx.tool.utils.files.Utils.sync(bootDir, resDir, /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(from, to) {
                    var data;
                    return _regenerator().w(function (_context11) {
                      while (1) switch (_context11.n) {
                        case 0:
                          if (from.endsWith(".html")) {
                            _context11.n = 1;
                            break;
                          }
                          return _context11.a(2, true);
                        case 1:
                          _context11.n = 2;
                          return fs.readFileAsync(from, "utf8");
                        case 2:
                          data = _context11.v;
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
                          _context11.n = 3;
                          return fs.writeFileAsync(to, data, "utf8");
                        case 3:
                          return _context11.a(2, false);
                      }
                    }, _callee10);
                  }));
                  return function (_x4, _x5) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              case 4:
                if (indexHtml) {
                  _context12.n = 5;
                  break;
                }
                indexHtml = defaultIndexHtml;
                _context12.n = 5;
                return fs.writeFileAsync(resDir + "index.html", replaceVars(indexHtml), {
                  encoding: "utf8"
                });
              case 5:
                if (!application.getWriteIndexHtmlToRoot()) {
                  _context12.n = 6;
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
                _context12.n = 6;
                return fs.writeFileAsync(t.getOutputDir() + "index.html", replaceVars(indexHtml), {
                  encoding: "utf8"
                });
              case 6:
                return _context12.a(2);
            }
          }, _callee11);
        }))();
      },
      getAppMeta: function getAppMeta() {
        return this.__P_510_1;
      }
    }
  });
  qx.tool.compiler.targets.Target.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Target.js.map?dt=1782595072514