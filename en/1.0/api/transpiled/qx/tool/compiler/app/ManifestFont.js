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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2023 Zenesis Limited https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (@johnspackman)
  
  ************************************************************************ */

  var fs = require("fs");
  var path = require("path");

  /**
   * Represents a font as defined in the Manifest.json's
   *
   * @typedef Sources
   * @param {String?} family the family name that is in the font files (defaults to the name of the font)
   * @param {String[]?} paths the filenames of font files inside the resources dircetory
   * @param {String[]?} urls the urls of font files in a CDN
   *
   */
  qx.Class.define("qx.tool.compiler.app.ManifestFont", {
    extend: qx.core.Object,
    construct: function construct(name) {
      qx.core.Object.constructor.call(this);
      this.setName(name);
    },
    properties: {
      /** The name of the font - this is the key in Manifest.json provides.fonts */
      name: {
        check: "String"
      },
      /** Default size of the font */
      defaultSize: {
        init: null,
        nullable: true,
        check: "Integer"
      },
      /** Comparison string to be used */
      comparisonString: {
        init: null,
        nullable: true,
        check: "String"
      },
      /** CSS filenames or URLs to be loaded (indicating that font-face will be defined outside of Qooxdoo) */
      css: {
        init: null,
        check: "Array",
        nullable: true
      },
      /** Font faces that have to be defined, including the resource paths or urls */
      fontFaces: {
        init: null,
        check: "Array",
        nullable: true
      },
      /** Glyphs filename (relative to resources of the library that defines it) */
      glyphs: {
        init: null,
        nullable: true,
        check: "String"
      },
      /** Family names for the browser to search for */
      family: {
        init: null,
        nullable: true,
        check: "Array"
      }
    },
    members: {
      /** @type{Map<String,Object>} font data required by the Qooxdoo app at runtime */
      __P_497_0: null,
      /**
       * Updates this from the data in the Manifest.json
       *
       * @param {Object} data the data from Manifest
       * @param {qx.tool.compiler.app.Library} library the library
       */
      updateFromManifest: function updateFromManifest(data, library) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var toSet, glyphsFilename, glyphsData, name, defaultSize, key, glyph;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                toSet = {};
                ["defaultSize", "comparisonString", "css", "fontFaces", "glyphs", "family"].forEach(function (name) {
                  if (data.hasOwnProperty(name)) {
                    toSet[name] = data[name];
                  }
                });
                _this.set(toSet);
                if (!(data.glyphs !== undefined)) {
                  _context.n = 2;
                  break;
                }
                glyphsFilename = library.getResourceFilename(data.glyphs);
                _context.n = 1;
                return fs.promises.readFile(glyphsFilename, "utf8");
              case 1:
                glyphsData = _context.v;
                glyphsData = JSON.parse(glyphsData);
                _this.__P_497_0 = {};
                name = _this.getName();
                defaultSize = _this.getDefaultSize();
                for (key in glyphsData) {
                  glyph = glyphsData[key];
                  _this.__P_497_0["@" + name + "/" + key] = [
                  // width
                  Math.ceil(defaultSize * glyph.advanceWidth / glyph.advanceHeight) || defaultSize,
                  // height
                  defaultSize, glyph.codePoint];
                }
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Generates the font data used by the application; loads the data if not already loaded
       *
       * @returns {Map<String,Object>}
       */
      getApplicationFontData: function getApplicationFontData() {
        return this.__P_497_0;
      },
      /**
       * Return bootstrap code that is executed before the Application starts.
       *
       * @param {qx.tool.compiler.targets.Target} target the target
       * @param {qx.tool.compiler.app.Application} application the application being built
       * @param {Boolean} useLocalFonts whether to use local fonts or use CSS
       * @return {String} code to include in the output
       */
      getBootstrapCode: function getBootstrapCode(target, application, useLocalFonts) {
        var res = "";
        var font = {
          family: this.getFamily() || [this.getName()]
        };
        if (!useLocalFonts) {
          if (this.getCss()) {
            font.css = this.getCss();
          }
        } else {
          font.fontFaces = this.getFontFaces();
        }
        if (this.getDefaultSize() !== null) {
          font.defaultSize = this.getDefaultSize();
        }
        if (this.getComparisonString() !== null) {
          font.comparisonString = this.getComparisonString();
        }
        return res += "qx.$$fontBootstrap['" + this.getName() + "']=" + JSON.stringify(font, null, 2) + ";";
      }
    }
  });
  qx.tool.compiler.app.ManifestFont.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ManifestFont.js.map?dt=1782705793987