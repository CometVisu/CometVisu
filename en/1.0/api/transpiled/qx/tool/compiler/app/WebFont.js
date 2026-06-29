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
      "qx.tool.utils.Http": {},
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
   *      2017 GONICUS GmbH, http://www.gonicus.de
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * Cajus Pollmeier (pollmeier@gonicus.de, @cajus)
   *
   * *********************************************************************** */
  var fs = require("fs");
  var path = require("path");
  var tmp = require("tmp");
  var http = require("http");
  var fontkit = require("fontkit");
  var log = qx.tool.utils.LogManager.createLog("font");

  /**
   * Represents a WebFont provided by a Library
   */
  qx.Class.define("qx.tool.compiler.app.WebFont", {
    extend: qx.core.Object,
    construct: function construct(library) {
      qx.core.Object.constructor.call(this);
      this.__P_499_0 = library;
    },
    properties: {
      /** The name of the webfont */
      name: {
        check: "String"
      },
      /** The default size */
      defaultSize: {
        check: "Integer",
        init: 40
      },
      /**
       * Optional mapping filename. The path is relative to the location of the
       * `Manifest.json` file. The mapping file is in json format and should contain
       * a map of icon name to code point in hex:
       * `{ "my_icon": "ef99", "my_other_icon": "483c"}`
       */
      mapping: {
        init: null,
        nullable: true,
        check: "String"
      },
      /**
       * Characters that are used to test if the font has loaded properly. These
       * default to "WEei" in `qx.bom.webfont.Validator` and can be overridden
       * for certain cases like icon fonts that do not provide the predefined
       * characters.
       */
      comparisonString: {
        init: null,
        nullable: true,
        check: "String"
      },
      /** {String[]} Resources that make up the font; an array of Strings, each of which can be a URL or a local file */
      resources: {
        check: "Array"
      }
    },
    members: {
      __P_499_0: null,
      __P_499_1: null,
      /**
       * Helper which triggers a local font analyze run.
       *
       * @param filename {String} Filename for the local font
       * @return {Map<String,String>} mapping of glyphs to codepoints
       */
      _loadLocalFont: function _loadLocalFont(filename) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var fontpath;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                fontpath = path.join(_this.__P_499_0.getRootDir(), path.join(_this.__P_499_0.getResourcePath(), filename));
                _context.n = 1;
                return _this.__P_499_2(fontpath);
              case 1:
                return _context.a(2, _context.v);
            }
          }, _callee);
        }))();
      },
      /**
       * Helper which loads a remote font to analyze the result.
       *
       * @param url {String} URL for the font download
       * @return {Map<String,String>} mapping of glyphs to codepoints
       */
      _loadRemoteFont: function _loadRemoteFont(url) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var tmpFilename, result;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return qx.tool.utils.Http.downloadToTempFile(url, /^font\/(ttf|svg|eot|woff|woff2)$/);
              case 1:
                tmpFilename = _context2.v;
                _context2.n = 2;
                return _this2.__P_499_2(tmpFilename);
              case 2:
                result = _context2.v;
                fs.unlink(tmpFilename);
                return _context2.a(2, result);
            }
          }, _callee2);
        }))();
      },
      /**
       * Common code to extract the desired font information from a font file
       * on disk.
       *
       * @param filename {String} Path to font file
       * @return {Map<String,String>} mapping of glyphs to codepoints
       */
      __P_499_2: function __P_499_2(filename) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _font$GSUB;
          var font, resources, mapPath, data, map, ligatureName, lookupList, lookupListIndexes, defaultSize, _t;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.n = 1;
                return fontkit.open(filename);
              case 1:
                font = _context3.v;
                resources = {}; // If we have a mapping file, take qx.tool.compiler.Console.information instead
                // of anaylzing the font.
                if (!_this3.getMapping()) {
                  _context3.n = 6;
                  break;
                }
                mapPath = path.join(_this3.__P_499_0.getRootDir(), path.join(_this3.__P_499_0.getResourcePath(), _this3.getMapping()));
                _context3.p = 2;
                _context3.n = 3;
                return fs.promises.readFile(mapPath, {
                  encoding: "utf-8"
                });
              case 3:
                data = _context3.v;
                _context3.n = 5;
                break;
              case 4:
                _context3.p = 4;
                _t = _context3.v;
                log.error("Cannot read mapping file '".concat(mapPath, "': ").concat(_t.code));
                throw _t;
              case 5:
                map = JSON.parse(data);
                Object.keys(map).forEach(function (key) {
                  var codePoint = parseInt(map[key], 16);
                  var glyph = font.glyphForCodePoint(codePoint);
                  if (!glyph.id) {
                    qx.tool.compiler.Console.trace("WARN: no glyph found in ".concat(filename, " ").concat(key, ": ").concat(codePoint));
                    return;
                  }
                  resources["@" + _this3.getName() + "/" + key] = [Math.ceil(_this3.getDefaultSize() * glyph.advanceWidth / glyph.advanceHeight),
                  // width
                  _this3.getDefaultSize(),
                  // height
                  codePoint];
                }, _this3);
                return _context3.a(2, resources);
              case 6:
                if ((_font$GSUB = font.GSUB) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.lookupList) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.toArray()) !== null && _font$GSUB !== void 0 && _font$GSUB.length) {
                  _context3.n = 7;
                  break;
                }
                qx.tool.compiler.Console.error("The webfont in ".concat(filename, " does not have any ligatures"));
                return _context3.a(2, resources);
              case 7:
                // some IconFonts (MaterialIcons for example) use ligatures
                // to name their icons. This code extracts the ligatures
                // hat tip to Jossef Harush https://stackoverflow.com/questions/54721774/extracting-ttf-font-ligature-mappings/54728584
                ligatureName = {};
                lookupList = font.GSUB.lookupList.toArray();
                lookupListIndexes = font.GSUB.featureList[0].feature.lookupListIndexes;
                lookupListIndexes.forEach(function (index) {
                  var _subTable$coverage, _subTable$ligatureSet;
                  var subTable = lookupList[index].subTables[0];
                  var leadingCharacters = [];
                  if (subTable !== null && subTable !== void 0 && (_subTable$coverage = subTable.coverage) !== null && _subTable$coverage !== void 0 && _subTable$coverage.rangeRecords) {
                    subTable.coverage.rangeRecords.forEach(function (coverage) {
                      for (var i = coverage.start; i <= coverage.end; i++) {
                        var character = font.stringsForGlyph(i)[0];
                        leadingCharacters.push(character);
                      }
                    });
                  }
                  var ligatureSets = (subTable === null || subTable === void 0 || (_subTable$ligatureSet = subTable.ligatureSets) === null || _subTable$ligatureSet === void 0 ? void 0 : _subTable$ligatureSet.toArray()) || [];
                  ligatureSets.forEach(function (ligatureSet, ligatureSetIndex) {
                    var leadingCharacter = leadingCharacters[ligatureSetIndex];
                    ligatureSet.forEach(function (ligature) {
                      var character = font.stringsForGlyph(ligature.glyph)[0];
                      if (!character) {
                        // qx.tool.compiler.Console.log(`WARN: ${this.getName()} no character ${ligature}`);
                        return;
                      }
                      var ligatureText = leadingCharacter + ligature.components.map(function (x) {
                        return font.stringsForGlyph(x)[0];
                      }).join("");
                      var hexId = character.charCodeAt(0).toString(16);
                      if (ligatureName[hexId] == undefined) {
                        ligatureName[hexId] = [ligatureText];
                      } else {
                        ligatureName[hexId].push(ligatureText);
                      }
                    });
                  });
                });
                defaultSize = _this3.getDefaultSize();
                font.characterSet.forEach(function (codePoint) {
                  var _commands;
                  var glyph = font.glyphForCodePoint(codePoint);
                  var commands = null;
                  try {
                    var _glyph$path;
                    // This can throw an exception if the font does not support ligatures
                    commands = glyph === null || glyph === void 0 || (_glyph$path = glyph.path) === null || _glyph$path === void 0 ? void 0 : _glyph$path.commands;
                  } catch (ex) {
                    commands = null;
                  }
                  if (!((_commands = commands) !== null && _commands !== void 0 && _commands.length) && !glyph.layers) {
                    return;
                  }
                  var found = function found(gName) {
                    resources["@" + _this3.getName() + "/" + gName] = [Math.ceil(_this3.getDefaultSize() * glyph.advanceWidth / glyph.advanceHeight),
                    // width
                    defaultSize,
                    // height
                    codePoint];
                  };
                  if (glyph.name) {
                    found(glyph.name);
                  }
                  var names = ligatureName[codePoint.toString(16)];
                  if (names) {
                    names.forEach(found);
                  }
                }, _this3);
                return _context3.a(2, resources);
            }
          }, _callee3, null, [[2, 4]]);
        }))();
      },
      /**
       * Return bootstrap code that is executed before the Application starts.
       *
       * @param target  {qx.tool.compiler.targets.Target} the target
       * @param application  {qx.tool.compiler.app.Application} the application being built
       * @return {String}
       */
      getBootstrapCode: function getBootstrapCode(target, application) {
        var res = "";
        var font = {
          defaultSize: this.getDefaultSize(),
          lineHeight: 1,
          family: [this.getName()],
          fontFaces: [{
            paths: this.getResources()
          }]
        };
        if (this.getComparisonString()) {
          font.comparisonString = this.getComparisonString();
        }
        return res += "qx.$$fontBootstrap['" + this.getName() + "']=" + JSON.stringify(font, null, 2) + ";";
      },
      /**
       * Called by {Target} to compile the fonts, called once per application build
       * (NOTE:: right now, this is called for each application - that is soon to be fixed)
       *
       * @param target  {qx.tool.compiler.targets.Target} the target
       * @return {Promise}
       */
      generateForTarget: function generateForTarget(target) {
        var _this4 = this;
        if (this.__P_499_3) {
          return this.__P_499_3;
        }
        var generate = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
            var _iterator, _step, resource, basename, _t2;
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.p = _context4.n) {
                case 0:
                  _iterator = _createForOfIteratorHelper(_this4.getResources());
                  _context4.p = 1;
                  _iterator.s();
                case 2:
                  if ((_step = _iterator.n()).done) {
                    _context4.n = 9;
                    break;
                  }
                  resource = _step.value;
                  // Search for the first supported extension
                  basename = resource.match(/^.*[/\\]([^/\\\?#]+).*$/)[1]; // fontkit knows about these font formats
                  if (basename.match(/\.(ttf|otf|woff|woff2)$/)) {
                    _context4.n = 3;
                    break;
                  }
                  return _context4.a(3, 8);
                case 3:
                  if (!resource.match(/^https?:\/\//)) {
                    _context4.n = 5;
                    break;
                  }
                  _context4.n = 4;
                  return _this4._loadRemoteFont(resource);
                case 4:
                  _this4.__P_499_1 = _context4.v;
                  _context4.n = 7;
                  break;
                case 5:
                  _context4.n = 6;
                  return _this4._loadLocalFont(resource);
                case 6:
                  _this4.__P_499_1 = _context4.v;
                case 7:
                  return _context4.a(2, _this4.__P_499_1);
                case 8:
                  _context4.n = 2;
                  break;
                case 9:
                  _context4.n = 11;
                  break;
                case 10:
                  _context4.p = 10;
                  _t2 = _context4.v;
                  _iterator.e(_t2);
                case 11:
                  _context4.p = 11;
                  _iterator.f();
                  return _context4.f(11);
                case 12:
                  throw new Error("Failed to load/validate FontMap for webfont (expected ttf, otf, woff or woff2) ".concat(_this4.getName()));
                case 13:
                  return _context4.a(2);
              }
            }, _callee4, null, [[1, 10, 11, 12]]);
          }));
          return function generate() {
            return _ref.apply(this, arguments);
          };
        }();
        this.__P_499_3 = generate();
        return this.__P_499_3;
      },
      /**
       * Called by Target to add fonts to an application
       *
       * @param target  {qx.tool.compiler.targets.Target} the target
       * @param application  {qx.tool.compiler.app.Application} the application being built
       * @return {Promise}
       */
      generateForApplication: function generateForApplication(target, application) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                return _context5.a(2, _this5.__P_499_1 || null);
            }
          }, _callee5);
        }))();
      },
      /**
       * Returns a string representation of this for debugging
       *
       * @return {String} the name or resource of this font
       */
      toString: function toString() {
        var str = this.getName();
        if (!str) {
          str = JSON.stringify(this.getResources());
        }
        return str;
      }
    }
  });
  qx.tool.compiler.app.WebFont.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WebFont.js.map?dt=1782705794112