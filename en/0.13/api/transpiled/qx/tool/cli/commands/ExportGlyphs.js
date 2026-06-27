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
      "qx.tool.cli.commands.Command": {
        "require": true
      },
      "qx.tool.utils.Http": {},
      "qx.tool.compiler.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2023 Zenesis Limited (https://www.zenesis.com)
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (@johnspackman)
  
  ************************************************************************ */

  var fs = require("fs");
  var path = require("upath");
  var fontkit = require("fontkit");
  var tmp = require("tmp");

  /**
   * Exports font ligatures as a map
   */
  qx.Class.define("qx.tool.cli.commands.ExportGlyphs", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "export-glyphs font-file glyph-file",
          describe: "export font glyphs & ligatures"
        };
      }
    },
    members: {
      /**
       * @override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var _font$GSUB;
          var filename, font, glyphs, ligatureName, lookupList, lookupListIndexes;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                filename = _this.argv.fontFile;
                if (!filename.match(/^https?:\/\//)) {
                  _context.n = 2;
                  break;
                }
                _context.n = 1;
                return qx.tool.utils.Http.downloadToTempFile(filename, /^font\/(ttf|svg|eot|woff|woff2)$/);
              case 1:
                filename = _context.v;
              case 2:
                _context.n = 3;
                return fontkit.open(filename);
              case 3:
                font = _context.v;
                if ((_font$GSUB = font.GSUB) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.lookupList) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.toArray()) !== null && _font$GSUB !== void 0 && _font$GSUB.length) {
                  _context.n = 4;
                  break;
                }
                qx.tool.compiler.Console.error("The webfont in ".concat(filename, " does not have any ligatures"));
                return _context.a(2);
              case 4:
                glyphs = {}; // some IconFonts (MaterialIcons for example) use ligatures
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
                    glyphs[gName] = {
                      advanceWidth: glyph.advanceWidth,
                      advanceHeight: glyph.advanceHeight,
                      codePoint: codePoint
                    };
                  };
                  if (glyph.name) {
                    found(glyph.name);
                  }
                  var names = ligatureName[codePoint.toString(16)];
                  if (names) {
                    names.forEach(found);
                  }
                });
                _context.n = 5;
                return fs.promises.writeFile(_this.argv.glyphFile, JSON.stringify(glyphs, null, 2), "utf8");
              case 5:
                return _context.a(2);
            }
          }, _callee);
        }))();
      }
    }
  });
  qx.tool.cli.commands.ExportGlyphs.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ExportGlyphs.js.map?dt=1782595069972