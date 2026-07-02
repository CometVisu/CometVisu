function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      this.__P_171_0 = {};
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
      __P_171_1: null,
      __P_171_2: null,
      _validators: null,
      getValidator: function getValidator(fontWeight, fontStyle) {
        fontWeight = fontWeight || "normal";
        fontStyle = fontStyle || "normal";
        var id = fontWeight + "::" + fontStyle;
        var validator = this.__P_171_0[id];
        if (!validator) {
          validator = this.__P_171_0[id] = new qx.bom.webfonts.Validator(this.getFontFamily(), this.getComparisonString(), fontWeight, fontStyle);
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var fontFaces;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                (_this.getCss() || []).forEach(function (url) {
                  if (!url.match(/^https?:/)) {
                    url = qx.util.ResourceManager.getInstance().toUri(url);
                  }
                  if (_this.getVersion()) {
                    url += url.indexOf("?") < 0 ? "?" : "&";
                    url += _this.getVersion();
                  }
                  qx.bom.webfonts.WebFontLoader.__P_171_3(url);
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
                  _this.__P_171_1 = qx.lang.Array.clone(fontFaces);
                  _this.__P_171_2 = new qx.Promise();
                }
                _this.__P_171_4();
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      promiseLoaded: function promiseLoaded() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return _this2.__P_171_2;
              case 1:
                return _context2.a(2, _context2.v);
            }
          }, _callee2);
        }))();
      },
      /**
       * Adds the font faces in __fontFacesQueue
       */
      __P_171_4: function __P_171_4() {
        var _this3 = this;
        if (this.__P_171_1 == null) {
          return;
        }
        var fontFace = this.__P_171_1.pop();
        this.__P_171_5(fontFace);
        if (this.__P_171_1.length == 0) {
          this.__P_171_1 = null;
          this.__P_171_2.resolve(true);
        }
        if (qx.core.Environment.get("engine.name") == "mshtml" && (parseInt(qx.core.Environment.get("engine.version")) < 9 || qx.core.Environment.get("browser.documentmode") < 9)) {
          // old IEs need a break in between adding @font-face rules
          setTimeout(function () {
            return _this3.__P_171_4();
          }, 100);
        } else {
          this.__P_171_4();
        }
      },
      /**
       * Adds a font face definition to the browser
       *
       * @param {*} fontFace - POJO of from the array in Manifest.json
       * @returns
       */
      __P_171_5: function __P_171_5(fontFace) {
        var fontFamily = fontFace.fontFamily || this.getFontFamily();
        var fontLookupKey = qx.bom.webfonts.WebFontLoader.createFontLookupKey(fontFamily, fontFace.fontWeight || "normal", fontFace.fontStyle || "normal");
        if (qx.bom.webfonts.WebFontLoader.__P_171_6[fontLookupKey]) {
          return;
        }
        if (!qx.bom.webfonts.WebFontLoader.__P_171_7) {
          var _styleSheet = qx.bom.Stylesheet.createElement();
          qx.bom.webfonts.WebFontLoader.__P_171_7 = _styleSheet;
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
        var styleSheet = qx.bom.webfonts.WebFontLoader.__P_171_7;
        try {
          if (qx.core.Environment.get("browser.name") == "ie" && qx.core.Environment.get("browser.documentmode") < 9) {
            var cssText = qx.bom.webfonts.WebFontLoader.__P_171_8(styleSheet.cssText);
            cssText += rule;
            styleSheet.cssText = cssText;
          } else {
            styleSheet.insertRule(rule, styleSheet.cssRules.length);
          }
        } catch (ex) {}
        qx.bom.webfonts.WebFontLoader.__P_171_6[fontLookupKey] = true;
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
      __P_171_9: null,
      /** */
      __P_171_10: {},
      __P_171_6: {},
      /** Loader instances indexed by font family name */
      __P_171_11: {},
      /**
       * Gets/creates a loader
       *
       * @param {String} name font family name
       * @param {Boolean?} create whether to create one if one does not exist (default to false)
       * @returns
       */
      getLoader: function getLoader(name, create) {
        var loader = qx.bom.webfonts.WebFontLoader.__P_171_11[name];
        if (!loader && create) {
          loader = qx.bom.webfonts.WebFontLoader.__P_171_11[name] = new qx.bom.webfonts.WebFontLoader(name);
        }
        return loader;
      },
      /**
       * Adds a stylesheet, once per url
       *
       * @param {String} url
       */
      __P_171_3: function __P_171_3(url) {
        if (qx.bom.webfonts.WebFontLoader.__P_171_10[url]) {
          return;
        }
        qx.bom.Stylesheet.includeFile(url);
        qx.bom.webfonts.WebFontLoader.__P_171_10[url] = true;
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
      __P_171_12: function __P_171_12(sources) {
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
        if (qx.bom.webfonts.WebFontLoader.__P_171_9) {
          return qx.bom.webfonts.WebFontLoader.__P_171_9;
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
        return qx.bom.webfonts.WebFontLoader.__P_171_9 = preferredFormats;
      },
      /**
       * IE 6 and 7 omit the trailing quote after the format name when
       * querying cssText. This needs to be fixed before cssText is replaced
       * or all rules will be invalid and no web fonts will work any more.
       *
       * @param cssText {String} CSS text
       * @return {String} Fixed CSS text
       */
      __P_171_8: function __P_171_8(cssText) {
        return cssText.replace("'eot)", "'eot')").replace("('embedded-opentype)", "('embedded-opentype')");
      }
    }
  });
  qx.bom.webfonts.WebFontLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WebFontLoader.js.map?dt=1782967145143