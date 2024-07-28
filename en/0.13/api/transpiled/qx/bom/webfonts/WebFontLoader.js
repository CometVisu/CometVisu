function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
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
      "qx.bom.webfonts.Validator": {},
      "qx.bom.webfonts.WebFont": {},
      "qx.util.ResourceManager": {},
      "qx.lang.Array": {},
      "qx.Promise": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.Stylesheet": {},
      "qx.bom.client.OperatingSystem": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * Loads web fonts
   */
  qx.Class.define("qx.bom.webfonts.WebFontLoader", {
    extend: qx.core.Object,
    construct: function construct(fontFamily) {
      qx.core.Object.constructor.call(this);
      this.setFontFamily(fontFamily);
      this.__P_162_0 = {};
    },
    properties: {
      /** The font name that this font is known by */
      fontFamily: {
        check: "String"
      },
      /** The fontFaces which need to be defined */
      fontFaces: {
        nullable: true,
        apply: "_applyFontFaces"
      },
      /** CSS urls or paths which need to be loaded */
      css: {
        nullable: true,
        check: "Array"
      },
      /**
       * Characters that are used to test if the font has loaded properly. These
       * default to "WEei" in `qx.bom.webfont.Validator` and can be overridden
       * for certain cases like icon fonts that do not provide the predefined
       * characters.
       */
      comparisonString: {
        check: "String",
        init: null,
        nullable: true
      },
      /**
       * Version identifier that is appended to the URL to be loaded. Fonts
       * that are defined thru themes may be managed by the resource manager.
       * In this case updated fonts persist due to aggressive fontface caching
       * of some browsers. To get around this, set the `version` property to
       * the version of your font. It will be appended to the CSS URL and forces
       * the browser to re-validate.
       *
       * The version needs to be URL friendly, so only characters, numbers,
       * dash and dots are allowed here.
       */
      version: {
        check: function check(value) {
          return value === null || typeof value === "string" && /^[a-zA-Z0-9.-]+$/.test(value);
        },
        init: null,
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      __P_162_1: null,
      __P_162_2: null,
      _validators: null,
      getValidator: function getValidator(fontWeight, fontStyle) {
        fontWeight = fontWeight || "normal";
        fontStyle = fontStyle || "normal";
        var id = fontWeight + "::" + fontStyle;
        var validator = this.__P_162_0[id];
        if (!validator) {
          validator = this.__P_162_0[id] = new qx.bom.webfonts.Validator(this.getFontFamily(), this.getComparisonString(), fontWeight, fontStyle);
          validator.setTimeout(qx.bom.webfonts.WebFont.VALIDATION_TIMEOUT);
          validator.validate();
        }
        return validator;
      },
      /**
       * Called to load the font details into the browser
       */
      load: function load() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var fontFaces;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                (_this.getCss() || []).forEach(function (url) {
                  if (!url.match(/^https?:/)) {
                    url = qx.util.ResourceManager.getInstance().toUri(url);
                  }
                  if (_this.getVersion()) {
                    url += url.indexOf("?") < 0 ? "?" : "&";
                    url += _this.getVersion();
                  }
                  qx.bom.webfonts.WebFontLoader.__P_162_3(url);
                });
                fontFaces = _this.getFontFaces();
                if (fontFaces) {
                  fontFaces.forEach(function (fontFace) {
                    if (fontFace.paths) {
                      fontFace.paths = fontFace.paths.map(function (path) {
                        if (!path.match(/^https?:/)) {
                          path = qx.util.ResourceManager.getInstance().toUri(path);
                        }
                        if (_this.getVersion()) {
                          path += path.indexOf("?") < 0 ? "?" : "&";
                          path += _this.getVersion();
                        }
                        return path;
                      });
                    }
                  });
                  _this.__P_162_1 = qx.lang.Array.clone(fontFaces);
                  _this.__P_162_2 = new qx.Promise();
                }
                _this.__P_162_4();
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      promiseLoaded: function promiseLoaded() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.__P_162_2;
              case 2:
                return _context2.abrupt("return", _context2.sent);
              case 3:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Adds the font faces in __fontFacesQueue
       */
      __P_162_4: function __P_162_4() {
        var _this3 = this;
        if (this.__P_162_1 == null) {
          return;
        }
        var fontFace = this.__P_162_1.pop();
        this.__P_162_5(fontFace);
        if (this.__P_162_1.length == 0) {
          this.__P_162_1 = null;
          this.__P_162_2.resolve(true);
        }
        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          // old IEs need a break in between adding @font-face rules
          setTimeout(function () {
            return _this3.__P_162_4();
          }, 100);
        } else {
          this.__P_162_4();
        }
      },
      /**
       * Adds a font face definition to the browser
       *
       * @param {*} fontFace - POJO of from the array in Manifest.json
       * @returns
       */
      __P_162_5: function __P_162_5(fontFace) {
        var fontFamily = fontFace.fontFamily || this.getFontFamily();
        var fontLookupKey = qx.bom.webfonts.WebFontLoader.createFontLookupKey(fontFamily, fontFace.fontWeight || "normal", fontFace.fontStyle || "normal");
        if (qx.bom.webfonts.WebFontLoader.__P_162_6[fontLookupKey]) {
          return;
        }
        if (!qx.bom.webfonts.WebFontLoader.__P_162_7) {
          var _styleSheet = qx.bom.Stylesheet.createElement();
          qx.bom.webfonts.WebFontLoader.__P_162_7 = _styleSheet;
        }
        var sourcesMap = {};
        var MATCH_FORMAT = new RegExp(".(" + qx.bom.webfonts.WebFontLoader.getPreferredFormats().join("|") + ")");

        /*
         * When compiling a `@font-face` rule, note that the first "src:" must never specify a format
         * and that EOT must go first if there is one
         */

        var fontFaceSrcRules = [];
        for (var i = 0; i < fontFace.paths.length; i++) {
          var match = MATCH_FORMAT.exec(fontFace.paths[i]);
          if (!match) {
            continue;
          }
          var fontFormat = match[1];
          var url = fontFace.paths[i];
          if (this.getVersion()) {
            url += "?" + this.getVersion();
          }
          fontFaceSrcRules.push({
            url: url,
            format: fontFormat
          });
          if (fontFormat == "eot") {
            fontFaceSrcRules.push({
              url: url + "?#iefix'",
              format: "embedded-opentype"
            });
          }
        }
        fontFaceSrcRules = fontFaceSrcRules.sort(function (a, b) {
          a.fontFormat == "embedded-opentype" ? -1 : 0;
        });
        var strSources = "src: ";
        for (var _i = 0; _i < fontFaceSrcRules.length; _i++) {
          if (_i > 0) {
            strSources += ", ";
          }
          strSources += "url('" + new URL(fontFaceSrcRules[_i].url, document.baseURI).href + "')";
          if (_i > 0) {
            strSources += " format('" + fontFaceSrcRules[_i].format + "')";
          }
        }
        strSources += ";\n";
        var rule = "font-family: " + fontFamily + ";\n";
        rule += strSources + "\n";
        rule += "font-style: " + (fontFace.fontStyle || "normal") + ";\n";
        rule += "font-weight: " + (fontFace.fontWeight || "normal") + ";\n";
        rule = "@font-face {\n" + rule + "}\n";
        var styleSheet = qx.bom.webfonts.WebFontLoader.__P_162_7;
        try {
          if (qx.core.Environment.get("browser.name") == "ie" && qx.core.Environment.get("browser.documentmode") < 9) {
            var cssText = qx.bom.webfonts.WebFontLoader.__P_162_8(styleSheet.cssText);
            cssText += rule;
            styleSheet.cssText = cssText;
          } else {
            styleSheet.insertRule(rule, styleSheet.cssRules.length);
          }
        } catch (ex) {}
        qx.bom.webfonts.WebFontLoader.__P_162_6[fontLookupKey] = true;
      },
      // property apply
      _applyFontFaces: function _applyFontFaces(fontFaces, old) {
        var families = [];
        for (var i = 0, l = fontFaces.length; i < l; i++) {
          var fontFace = fontFaces[i];
          var familyName = this._quoteFontFamily(fontFace.family || this.getFontFamily());
          if (families.indexOf(familyName) < 0) {
            families.push(familyName);
          }
        }
      },
      /**
       * Makes sure font-family names containing spaces are properly quoted
       *
       * @param familyName {String} A font-family CSS value
       * @return {String} The quoted family name
       */
      _quoteFontFamily: function _quoteFontFamily(familyName) {
        return familyName.replace(/["']/g, "");
      }
    },
    statics: {
      /**
       * List of known font definition formats (i.e. file extensions). Used to
       * identify the type of each font file configured for a web font.
       */
      FONT_FORMATS: ["eot", "woff2", "woff", "ttf", "svg"],
      /**
       * Timeout (in ms) to wait before deciding that a web font was not loaded.
       */
      VALIDATION_TIMEOUT: 5000,
      /** @type{String[]} array of supported font formats, most preferred first */
      __P_162_9: null,
      /** */
      __P_162_10: {},
      __P_162_6: {},
      /** Loader instances indexed by font family name */
      __P_162_11: {},
      /**
       * Gets/creates a loader
       *
       * @param {String} name font family name
       * @param {Boolean?} create whether to create one if one does not exist (default to false)
       * @returns
       */
      getLoader: function getLoader(name, create) {
        var loader = qx.bom.webfonts.WebFontLoader.__P_162_11[name];
        if (!loader && create) {
          loader = qx.bom.webfonts.WebFontLoader.__P_162_11[name] = new qx.bom.webfonts.WebFontLoader(name);
        }
        return loader;
      },
      /**
       * Adds a stylesheet, once per url
       *
       * @param {String} url
       */
      __P_162_3: function __P_162_3(url) {
        if (qx.bom.webfonts.WebFontLoader.__P_162_10[url]) {
          return;
        }
        qx.bom.Stylesheet.includeFile(url);
        qx.bom.webfonts.WebFontLoader.__P_162_10[url] = true;
      },
      /**
       * Creates a lookup key to index the created fonts.
       * @param familyName {String} font-family name
       * @param fontWeight {String} the font-weight.
       * @param fontStyle {String} the font-style.
       * @return {string} the font lookup key
       */
      createFontLookupKey: function createFontLookupKey(familyName, fontWeight, fontStyle) {
        var lookupKey = familyName + "_" + (fontWeight ? fontWeight : "normal") + "_" + (fontStyle ? fontStyle : "normal");
        return lookupKey;
      },
      /**
       * Uses a naive regExp match to determine the format of each defined source
       * file for a webFont. Returns a map with the format names as keys and the
       * corresponding source URLs as values.
       *
       * @param sources {String[]} Array of source URLs
       * @return {Map} Map of formats and URLs
       */
      __P_162_12: function __P_162_12(sources) {
        var formats = qx.bom.webfonts.WebFontLoader.FONT_FORMATS;
        var sourcesMap = {};
        var reg = new RegExp(".(" + formats.join("|") + ")");
        for (var i = 0, l = sources.length; i < l; i++) {
          var match = reg.exec(sources[i]);
          if (match) {
            var type = match[1];
            sourcesMap[type] = sources[i];
          }
        }
        return sourcesMap;
      },
      /**
       * Returns the preferred font format(s) for the currently used browser. Some
       * browsers support multiple formats, e.g. WOFF and TTF or WOFF and EOT. In
       * those cases, WOFF is considered the preferred format.
       *
       * @return {String[]} List of supported font formats ordered by preference
       * or empty Array if none could be determined
       */
      getPreferredFormats: function getPreferredFormats() {
        if (qx.bom.webfonts.WebFontLoader.__P_162_9) {
          return qx.bom.webfonts.WebFontLoader.__P_162_9;
        }
        var preferredFormats = [];
        var browser = qx.core.Environment.get("browser.name");
        var browserVersion = qx.core.Environment.get("browser.version");
        var os = qx.core.Environment.get("os.name");
        var osVersion = qx.core.Environment.get("os.version");
        if (browser == "edge" && browserVersion >= 14 || browser == "firefox" && browserVersion >= 69 || browser == "chrome" && browserVersion >= 36) {
          preferredFormats.push("woff2");
        }
        if (browser == "ie" && qx.core.Environment.get("browser.documentmode") >= 9 || browser == "edge" && browserVersion >= 12 || browser == "firefox" && browserVersion >= 3.6 || browser == "chrome" && browserVersion >= 6) {
          preferredFormats.push("woff");
        }
        if (browser == "edge" && browserVersion >= 12 || browser == "opera" && browserVersion >= 10 || browser == "safari" && browserVersion >= 3.1 || browser == "firefox" && browserVersion >= 3.5 || browser == "chrome" && browserVersion >= 4 || browser == "mobile safari" && os == "ios" && osVersion >= 4.2) {
          preferredFormats.push("ttf");
        }
        if (browser == "ie" && browserVersion >= 4) {
          preferredFormats.push("eot");
        }
        if (browser == "mobileSafari" && os == "ios" && osVersion >= 4.1) {
          preferredFormats.push("svg");
        }
        return qx.bom.webfonts.WebFontLoader.__P_162_9 = preferredFormats;
      },
      /**
       * IE 6 and 7 omit the trailing quote after the format name when
       * querying cssText. This needs to be fixed before cssText is replaced
       * or all rules will be invalid and no web fonts will work any more.
       *
       * @param cssText {String} CSS text
       * @return {String} Fixed CSS text
       */
      __P_162_8: function __P_162_8(cssText) {
        return cssText.replace("'eot)", "'eot')").replace("('embedded-opentype)", "('embedded-opentype')");
      }
    }
  });
  qx.bom.webfonts.WebFontLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WebFontLoader.js.map?dt=1722151818180