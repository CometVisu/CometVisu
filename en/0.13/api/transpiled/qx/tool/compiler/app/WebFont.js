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
      this.__P_489_0 = library;
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
      __P_489_0: null,
      __P_489_1: null,
      /**
       * Helper which triggers a local font analyze run.
       *
       * @param filename {String} Filename for the local font
       * @return {Map<String,String>} mapping of glyphs to codepoints
       */
      _loadLocalFont: function _loadLocalFont(filename) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var fontpath;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                fontpath = path.join(_this.__P_489_0.getRootDir(), path.join(_this.__P_489_0.getResourcePath(), filename));
                _context.next = 3;
                return _this.__P_489_2(fontpath);
              case 3:
                return _context.abrupt("return", _context.sent);
              case 4:
              case "end":
                return _context.stop();
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var tmpFilename, result;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return qx.tool.utils.Http.downloadToTempFile(url, /^font\/(ttf|svg|eot|woff|woff2)$/);
              case 2:
                tmpFilename = _context2.sent;
                _context2.next = 5;
                return _this2.__P_489_2(tmpFilename);
              case 5:
                result = _context2.sent;
                fs.unlink(tmpFilename);
                return _context2.abrupt("return", result);
              case 8:
              case "end":
                return _context2.stop();
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
      __P_489_2: function __P_489_2(filename) {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _font$GSUB;
          var font, resources, mapPath, data, map, ligatureName, lookupList, lookupListIndexes, defaultSize;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return fontkit.open(filename);
              case 2:
                font = _context3.sent;
                resources = {}; // If we have a mapping file, take qx.tool.compiler.Console.information instead
                // of anaylzing the font.
                if (!_this3.getMapping()) {
                  _context3.next = 19;
                  break;
                }
                mapPath = path.join(_this3.__P_489_0.getRootDir(), path.join(_this3.__P_489_0.getResourcePath(), _this3.getMapping()));
                _context3.prev = 6;
                _context3.next = 9;
                return fs.promises.readFile(mapPath, {
                  encoding: "utf-8"
                });
              case 9:
                data = _context3.sent;
                _context3.next = 16;
                break;
              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](6);
                log.error("Cannot read mapping file '".concat(mapPath, "': ").concat(_context3.t0.code));
                throw _context3.t0;
              case 16:
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
                return _context3.abrupt("return", resources);
              case 19:
                if ((_font$GSUB = font.GSUB) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.lookupList) !== null && _font$GSUB !== void 0 && (_font$GSUB = _font$GSUB.toArray()) !== null && _font$GSUB !== void 0 && _font$GSUB.length) {
                  _context3.next = 22;
                  break;
                }
                qx.tool.compiler.Console.error("The webfont in ".concat(filename, " does not have any ligatures"));
                return _context3.abrupt("return", resources);
              case 22:
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
                return _context3.abrupt("return", resources);
              case 29:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[6, 12]]);
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
        if (this.__P_489_3) {
          return this.__P_489_3;
        }
        var generate = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _iterator, _step, resource, basename;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _iterator = _createForOfIteratorHelper(_this4.getResources());
                  _context4.prev = 1;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context4.next = 20;
                    break;
                  }
                  resource = _step.value;
                  // Search for the first supported extension
                  basename = resource.match(/^.*[/\\]([^/\\\?#]+).*$/)[1]; // fontkit knows about these font formats
                  if (basename.match(/\.(ttf|otf|woff|woff2)$/)) {
                    _context4.next = 8;
                    break;
                  }
                  return _context4.abrupt("continue", 18);
                case 8:
                  if (!resource.match(/^https?:\/\//)) {
                    _context4.next = 14;
                    break;
                  }
                  _context4.next = 11;
                  return _this4._loadRemoteFont(resource);
                case 11:
                  _this4.__P_489_1 = _context4.sent;
                  _context4.next = 17;
                  break;
                case 14:
                  _context4.next = 16;
                  return _this4._loadLocalFont(resource);
                case 16:
                  _this4.__P_489_1 = _context4.sent;
                case 17:
                  return _context4.abrupt("return", _this4.__P_489_1);
                case 18:
                  _context4.next = 3;
                  break;
                case 20:
                  _context4.next = 25;
                  break;
                case 22:
                  _context4.prev = 22;
                  _context4.t0 = _context4["catch"](1);
                  _iterator.e(_context4.t0);
                case 25:
                  _context4.prev = 25;
                  _iterator.f();
                  return _context4.finish(25);
                case 28:
                  throw new Error("Failed to load/validate FontMap for webfont (expected ttf, otf, woff or woff2) ".concat(_this4.getName()));
                case 29:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, null, [[1, 22, 25, 28]]);
          }));
          return function generate() {
            return _ref.apply(this, arguments);
          };
        }();
        this.__P_489_3 = generate();
        return this.__P_489_3;
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
          return _regeneratorRuntime().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this5.__P_489_1 || null);
              case 1:
              case "end":
                return _context5.stop();
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

//# sourceMappingURL=WebFont.js.map?dt=1735222439319