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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.tool.compiler.app.Library": {},
      "qx.tool.compiler.targets.meta.AbstractJavascriptMeta": {},
      "qx.tool.utils.Promisify": {},
      "qx.tool.compiler.targets.meta.Part": {},
      "qx.tool.compiler.targets.meta.Package": {}
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

  /**
   * ApplicationMeta collects all the data about an application being compiled by a target,
   * in a form easily navigated and well documented.
   *
   * It provides an abstraction where the target can choose to restructure and reorganise the
   * output as it progresses - for example, a target may start by assembling a number of
   * javascript files, and then bundle them together, effectively replacing several files
   * with just one intermediate file; the target can then replace the intermediate file with
   * a minified file etc.
   */
  qx.Class.define("qx.tool.compiler.targets.meta.ApplicationMeta", {
    extend: qx.core.Object,
    construct: function construct(target, application) {
      qx.core.Object.constructor.call(this);
      this.__P_513_0 = target;
      this.__P_513_1 = application;
      this.__P_513_2 = [];
      this.__P_513_3 = {
        urisBefore: [],
        cssBefore: []
      };
      this.__P_513_4 = [];
      this.__P_513_5 = {};
      this.__P_513_6 = [];
      this.__P_513_7 = [];
      this.__P_513_8 = {};
    },
    properties: {
      /** The environment for the build */
      environment: {
        // Any object
      },
      /**
       * Whether to add timestamps to all URLs (cache busting)
       */
      addTimestampsToUrls: {
        init: true,
        check: "Boolean"
      },
      appLibrary: {
        check: "qx.tool.compiler.app.Library"
      },
      bootMetaJs: {
        check: "qx.tool.compiler.targets.meta.AbstractJavascriptMeta"
      },
      sourceUri: {
        check: "String"
      },
      resourceUri: {
        check: "String"
      }
    },
    members: {
      /** {qx.tool.compiler.targets.Target} the target */
      __P_513_0: null,
      /** {qx.tool.compiler.app.Application} the application */
      __P_513_1: null,
      /** {qx.tool.compiler.app.Libary[]} the libraries */
      __P_513_2: null,
      /** {Map} uris and CSS to load */
      __P_513_3: null,
      /** {String[]} code to run before boot */
      __P_513_4: null,
      /** {Map} list of resource paths, indexed by resource id */
      __P_513_5: null,
      /** {Package[]} list of packages */
      __P_513_6: null,
      /** {Part[]} list of parts */
      __P_513_7: null,
      /**
       * Sets an environment variable
       *
       * @param key {String} the name of the variable
       * @param value {Object} the value
       */
      setEnvironmentValue: function setEnvironmentValue(key, value) {
        var env = this.getEnvironment();
        if (value === undefined) {
          delete env[key];
        } else {
          env[key] = value;
        }
      },
      /**
       * Returns an environment value
       *
       * @param key {String} the key to lookup
       * @param defaultValue {Object?} optional default value to use if the key is not found
       * @return {Object} the value, or undefined if not found
       */
      getEnvironmentValue: function getEnvironmentValue(key, defaultValue) {
        var env = this.getEnvironment();
        var value = env[key];
        if (value === undefined) {
          if (defaultValue !== undefined) {
            env[key] = defaultValue;
          }
          value = defaultValue;
        }
        return value;
      },
      /**
       * Returns the application
       *
       * @return {qx.tool.compiler.app.Application}
       */
      getApplication: function getApplication() {
        return this.__P_513_1;
      },
      /**
       * Returns the target
       *
       * @return {qx.tool.compiler.targets.Target}
       */
      getTarget: function getTarget() {
        return this.__P_513_0;
      },
      /**
       * Returns the application root
       *
       * @return {String} the folder
       */
      getApplicationRoot: function getApplicationRoot() {
        return this.__P_513_0.getApplicationRoot(this.__P_513_1);
      },
      /**
       * Returns the Analyser
       *
       * @return {qx.tool.compiler.Analyser}
       */
      getAnalyser: function getAnalyser() {
        return this.__P_513_1.getAnalyser();
      },
      /**
       * Syncs all assets into the output directory
       */
      syncAssets: function syncAssets() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var i, pkg;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                i = 0;
              case 1:
                if (!(i < _this.__P_513_6.length)) {
                  _context.n = 3;
                  break;
                }
                pkg = _this.__P_513_6[i];
                _context.n = 2;
                return qx.tool.utils.Promisify.poolEachOf(pkg.getAssets(), 10, function (asset) {
                  return asset.sync(_this.__P_513_0);
                });
              case 2:
                i++;
                _context.n = 1;
                break;
              case 3:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Adds a library
       *
       * @param library {qx.tool.compiler.app.Library}
       */
      addLibrary: function addLibrary(library) {
        this.__P_513_2.push(library);
      },
      /**
       * Returns the library that contains the application class
       *
       * @return {qx.tool.compiler.app.Library}
       */
      getAppLibrary: function getAppLibrary() {
        var appLibrary = this.__P_513_1.getAnalyser().getLibraryFromClassname(this.__P_513_1.getClassName());
        return appLibrary;
      },
      /**
       * Returns the list of libraries
       *
       * @return {qx.tool.compiler.app.Library[]}
       */
      getLibraries: function getLibraries() {
        return this.__P_513_2;
      },
      /**
       * Adds an external resource (JS or CSS) to be loaded which is a http[s] URL
       *
       * @param type {String} either "urisBefore" or "cssBefore"
       * @param uri {String} uri to load
       */
      addExternal: function addExternal(type, uri) {
        this.__P_513_3[type].push("__external__:" + uri);
      },
      /**
       * Adds an external resource (JS or CSS) to be loaded, which is a resource path
       *
       * @param type {String} either "urisBefore" or "cssBefore"
       * @param uri {String} uri to load
       */
      addPreload: function addPreload(type, uri) {
        this.__P_513_3[type].push(uri);
      },
      /**
       * Returns the list of preloads, which is a map by type
       *
       * @return {Map}
       */
      getPreloads: function getPreloads() {
        return this.__P_513_3;
      },
      /**
       * Adds code to be run before the boot code is run
       *
       * @param code {String} the code to run
       */
      addPreBootCode: function addPreBootCode(code) {
        this.__P_513_4.push(code);
      },
      /**
       * Returns the code to be run before the boot code
       *
       * @return {String} the code
       */
      getPreBootCode: function getPreBootCode() {
        return this.__P_513_4.join("\n");
      },
      /**
       * Creates a new Part and adds it
       *
       * @param name {String} identifier
       * @return {Part}
       */
      createPart: function createPart(name) {
        var part = new qx.tool.compiler.targets.meta.Part(this.getTarget(), name, this.__P_513_7.length);
        this.__P_513_7.push(part);
        this.__P_513_8[name] = part;
        return part;
      },
      /**
       * Returns a list of all parts
       *
       * @return {Part[]}
       */
      getParts: function getParts() {
        return this.__P_513_7;
      },
      /**
       * Returns a part with a given name
       *
       * @param name {String} the name to look for
       */
      getPart: function getPart(name) {
        return this.__P_513_8[name] || null;
      },
      /**
       * Returns a list of all packages
       *
       * @return {Package[]}
       */
      getPackages: function getPackages() {
        return this.__P_513_6;
      },
      /**
       * Creates a package and adds it
       *
       * @return {Package}
       */
      createPackage: function createPackage() {
        var pkg = new qx.tool.compiler.targets.meta.Package(this, this.__P_513_6.length);
        this.__P_513_6.push(pkg);
        return pkg;
      },
      /**
       * Gets a package for specific locale, creating a part with the name set to the localeId
       * if there isn't one already.  Used for when i18nAsParts == true
       *
       * @param localeId {String} the locale to look for
       * @return {Package}
       */
      getLocalePackage: function getLocalePackage(localeId) {
        var part = this.getPart(localeId);
        if (!part) {
          part = this.createPart(localeId);
          part.addPackage(this.createPackage());
        }
        var pkg = part.getDefaultPackage();
        return pkg;
      },
      /**
       * Adds a resource
       *
       * @param key {String} the resource identifier
       * @param path {String} the path to the resource
       */
      addResource: function addResource(key, path) {
        this.__P_513_5[key] = path;
      },
      /**
       * Returns all of the resources
       *
       * @return {Map}
       */
      getResources: function getResources() {
        return this.__P_513_5;
      }
    }
  });
  qx.tool.compiler.targets.meta.ApplicationMeta.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ApplicationMeta.js.map?dt=1778272844606