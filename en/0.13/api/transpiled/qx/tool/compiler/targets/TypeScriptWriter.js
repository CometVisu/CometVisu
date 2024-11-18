function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.Promise": {},
      "qx.tool.utils.Utils": {},
      "qx.lang.String": {},
      "qx.tool.compiler.jsdoc.Parser": {},
      "qx.lang.Type": {}
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
   *      * JBaron (Peter, @jbaron)
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *
   * *********************************************************************** */

  var path = require("upath");
  var fs = require("fs");
  var _require = require("util"),
    promisify = _require.promisify;
  var readFile = promisify(fs.readFile);

  /**
   * Generates TypeScript .d.ts files
   */
  qx.Class.define("qx.tool.compiler.targets.TypeScriptWriter", {
    extend: qx.core.Object,
    /**
     *
     * @param {qx.tool.compiler.MetaDatabase} metaDb loaded database
     */
    construct: function construct(metaDb) {
      qx.core.Object.constructor.call(this);
      this.__P_500_0 = metaDb;
    },
    properties: {
      outputTo: {
        init: "qooxdoo.d.ts",
        check: "String"
      }
    },
    members: {
      /** @type {qx.tool.compiler.MetaDatabase} */
      __P_500_0: null,
      /** @type {Stream} where to write the .d.ts */
      __P_500_1: null,
      __P_500_2: null,
      /** @type {qx.tool.compiler.MetaExtraction} */
      __P_500_3: null,
      /** @type {object} */
      __P_500_4: null,
      /** Current indent */
      __P_500_5: "    ",
      /**
       * Opens the stream to write to
       */
      open: function open() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var time, str, baseDeclaration;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                time = new Date();
                _this.__P_500_1 = fs.createWriteStream(_this.getOutputTo());
                _this.__P_500_2 = new qx.Promise();
                _this.__P_500_1.on("close", function () {
                  return _this.__P_500_2.resolve();
                });
                _this.write("// Generated declaration file at ".concat(time, "\n"));
                str = path.join(qx.tool.utils.Utils.getTemplateDir(), "TypeScriptWriter-base_declaration.d.ts");
                _context.next = 8;
                return fs.promises.readFile(str, "utf8");
              case 8:
                baseDeclaration = _context.sent;
                _this.write(baseDeclaration + "\n");
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Closes the stream
       */
      close: function close() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var globalFile;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.__P_500_1.end();
              case 2:
                _this2.__P_500_1 = null;
                _context2.next = 5;
                return _this2.__P_500_2;
              case 5:
                _this2.__P_500_2 = null;

                // add global declaration file for tooling (eg, text editor) support
                globalFile = path.join(process.cwd(), "source", "global.d.ts");
                if (!fs.existsSync(globalFile)) {
                  fs.writeFileSync(globalFile, ["// the reference directive enables tooling to discover the generated type definitions", "/// <reference path=\"../".concat(_this2.getOutputTo(), "\" />"), "", "// add custom global declarations here"].join("\n"));
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Processes a list of filename and generates the .d.ts
       *
       */
      process: function process() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var classnames, lastPackageName, declared, _iterator, _step, classname, metaData, pos, packageName;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.open();
              case 2:
                classnames = _this3.__P_500_0.getClassnames();
                classnames.sort();
                lastPackageName = null;
                declared = false;
                _iterator = _createForOfIteratorHelper(classnames);
                _context3.prev = 7;
                _iterator.s();
              case 9:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 20;
                  break;
                }
                classname = _step.value;
                metaData = _this3.__P_500_0.getMetaData(classname);
                pos = classname.lastIndexOf(".");
                packageName = "";
                if (pos > -1) {
                  packageName = classname.substring(0, pos);
                }
                if (lastPackageName != packageName) {
                  if (lastPackageName) {
                    _this3.write("}\n\n");
                  }
                  if (packageName) {
                    _this3.write("declare module " + packageName + " {\n");
                    declared = true;
                  } else {
                    declared = false;
                  }
                  lastPackageName = packageName;
                } else {
                  _this3.write("\n");
                }
                _context3.next = 18;
                return _this3.writeClass(metaData, declared);
              case 18:
                _context3.next = 9;
                break;
              case 20:
                _context3.next = 25;
                break;
              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](7);
                _iterator.e(_context3.t0);
              case 25:
                _context3.prev = 25;
                _iterator.f();
                return _context3.finish(25);
              case 28:
                if (lastPackageName) {
                  _this3.write("}\n");
                }
                _context3.next = 31;
                return _this3.close();
              case 31:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[7, 22, 25, 28]]);
        }))();
      },
      /**
       * Write a piece of code to the declaration file
       */
      write: function write(msg) {
        this.__P_500_1.write(msg);
      },
      /**
       * Write the class or interface declaration
       */
      writeClass: function writeClass(meta, declared) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var _meta$jsdoc;
          var extendsClause, superTypes, superType, type, name, pos;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (meta.className) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _this4.__P_500_3 = meta;
                _this4.__P_500_4 = _this4.__P_500_0.getHierarchyFlat(meta);
                // qx.tool.compiler.Console.info("Processing class " + meta.packageName + "." + meta.name);
                extendsClause = "";
                if (meta.superClass && meta.superClass !== "Object" && meta.superClass !== "Array" && meta.superClass !== "Error") {
                  if (meta.type === "interface" && Array.isArray(meta.superClass)) {
                    superTypes = meta.superClass.map(function (sup) {
                      return _this4.getType(sup);
                    });
                    superTypes.filter(function (sup) {
                      return sup != "any";
                    });
                    if (superTypes.length) {
                      extendsClause = " extends " + superTypes.join(", ");
                    }
                  } else {
                    superType = _this4.getType(meta.superClass);
                    if (superType != "any") {
                      extendsClause = " extends " + superType;
                    }
                  }
                }
                type = "class "; // default for class and mixins
                if (meta.type === "interface") {
                  type = "interface ";
                } else if (meta["abstract"]) {
                  type = "abstract " + type;
                }
                if (!declared) {
                  type = "declare " + type;
                }
                _this4.__P_500_6((_meta$jsdoc = meta.jsdoc) === null || _meta$jsdoc === void 0 ? void 0 : _meta$jsdoc.raw, meta.location);
                _this4.write("  // " + meta.className + "\n");
                name = meta.className;
                pos = name.lastIndexOf(".");
                if (pos > -1) {
                  name = name.substring(pos + 1);
                }
                _this4.write("  " + type + name + extendsClause);
                if (meta.interfaces && meta.interfaces.length) {
                  _this4.write(" implements " + meta.interfaces.map(function (itf) {
                    return _this4.getType(itf);
                  }).join(", "));
                }
                _this4.write(" {\n");
                if (meta.type == "class" && meta.construct) {
                  _this4.writeConstructor(meta.construct);
                }
                _this4.writeClassBody(meta);
                _this4.write("\n  }\n");
                _this4.__P_500_3 = null;
                _this4.__P_500_4 = null;
              case 22:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Writes the body of the class (excl. constructor) and processes mixins
       */
      writeClassBody: function writeClassBody(meta) {
        if (meta.isSingleton) {
          this.writeMembers({
            getInstance: {
              type: "function",
              access: "public",
              returnType: meta.className,
              appearsIn: []
            }
          }, meta, true);
        }
        if (meta.type !== "interface") {
          this.writeMembers(meta.statics, meta, true);
        }
        this.writeMembers(meta.members, meta);
        if (meta.properties) {
          this.writeProperties(meta);
        }
      },
      /**
       * Writes the property accessors
       */
      writeProperties: function writeProperties(meta) {
        var names = [];
        var types = [];
        for (var propertyName in meta.properties) {
          var _propertyMeta$appears, _propertyMeta$json$ch, _propertyMeta$json, _propertyMeta$json2, _propertyMeta$json3;
          names.push(propertyName);
          var propertyMeta = meta.properties[propertyName];
          if ((_propertyMeta$appears = propertyMeta.appearsIn) !== null && _propertyMeta$appears !== void 0 && _propertyMeta$appears.length) {
            var superLikeName = propertyMeta.appearsIn.slice(-1)[0];
            var superLikeMeta = this.__P_500_0.getMetaData(superLikeName);
            var superLikeProperty = superLikeMeta.properties[propertyName];
            superLikeProperty.jsdoc = propertyMeta.jsdoc;
            propertyMeta = superLikeProperty;
          }
          var upname = qx.lang.String.firstUp(propertyName);
          var type = (_propertyMeta$json$ch = (_propertyMeta$json = propertyMeta.json) === null || _propertyMeta$json === void 0 ? void 0 : _propertyMeta$json.check) !== null && _propertyMeta$json$ch !== void 0 ? _propertyMeta$json$ch : "any";
          if (Array.isArray(type)) {
            // `[t1, t2]` -> `t1|t2`
            type = JSON.stringify(type).replace(/,/g, "|").slice(1, -1);
          } else if (typeof type === "string") {
            if (!type.match(/^[a-z\d\s.\|\<\>\&\(\)\[\]]+$/i) || type === "[[ ObjectMethod Function ]]") {
              type = "any";
            }
          } else {
            type = "any";
          }
          types.push(type);
          if (!((_propertyMeta$json2 = propertyMeta.json) !== null && _propertyMeta$json2 !== void 0 && _propertyMeta$json2.group)) {
            this.__P_500_7("get" + upname, {
              location: propertyMeta.location,
              returnType: type,
              jsdoc: {
                raw: ["Gets the ".concat(propertyName, " property")]
              },
              override: propertyMeta.override
            });
            if (typeof type === "string" && type.toLowerCase() === "boolean") {
              this.__P_500_7("is" + upname, {
                location: propertyMeta.location,
                returnType: type,
                jsdoc: {
                  raw: ["Gets the ".concat(propertyName, " property")]
                },
                override: propertyMeta.override
              });
            }
          }
          this.__P_500_7("set" + upname, {
            location: propertyMeta.location,
            parameters: [{
              name: "value",
              type: type
            }],
            returnType: type,
            jsdoc: {
              raw: ["Sets the ".concat(propertyName, " property")]
            },
            override: propertyMeta.override
          });
          this.__P_500_7("reset" + upname, {
            location: propertyMeta.location,
            jsdoc: {
              raw: ["Resets the ".concat(propertyName, " property")]
            },
            override: propertyMeta.override
          });
          if ((_propertyMeta$json3 = propertyMeta.json) !== null && _propertyMeta$json3 !== void 0 && _propertyMeta$json3.async) {
            this.__P_500_7("get" + upname + "Async", {
              location: propertyMeta.location,
              returnType: "Promise<".concat(type, ">"),
              jsdoc: {
                raw: ["Gets the ".concat(propertyName, " property, asynchronously")]
              },
              override: propertyMeta.override
            });
            if (typeof type === "string" && type.toLowerCase() === "boolean") {
              this.__P_500_7("is" + upname + "Async", {
                location: propertyMeta.location,
                returnType: "Promise<".concat(type, ">"),
                jsdoc: {
                  raw: ["Gets the ".concat(propertyName, " property, asynchronously")]
                },
                override: propertyMeta.override
              });
            }
            this.__P_500_7("set" + upname + "Async", {
              location: propertyMeta.location,
              parameters: [{
                name: "value",
                type: type
              }],
              returnType: "Promise<".concat(type, ">"),
              jsdoc: {
                raw: ["Sets the ".concat(propertyName, " property")]
              },
              override: propertyMeta.override
            });
          }
        }
        if (!names.length) {
          return;
        }
        var override = this.__P_500_8(meta);
        var superIsQxClass = !!this.__P_500_0.getMetaData(meta.superClass);
        var objType = "{";
        for (var i = 0; i < Math.min(names.length, types.length); i++) {
          objType += "\n".concat(this.__P_500_5, "  ").concat(names[i], "?: ").concat(types[i], ";");
        }
        objType += "\n".concat(this.__P_500_5, "}");
        this.__P_500_7("set", {
          parameters: [{
            name: "data",
            type: objType + (superIsQxClass ? " & Parameters<globalThis.".concat(meta.superClass, "[\"set\"]>[0]") : "")
          }],
          returnType: "this",
          jsdoc: {
            raw: ["Sets several properties at once"]
          },
          override: override
        });
        this.__P_500_7("get", {
          parameters: [{
            name: "prop",
            type: names.map(function (name) {
              return "\"".concat(name, "\"");
            }).join(" | ") + (superIsQxClass ? " | Parameters<globalThis.".concat(meta.superClass, "[\"get\"]>[0]") : "")
          }],
          returnType: "this",
          jsdoc: {
            raw: ["Gets a property by name"]
          },
          override: override
        });
      },
      /**
       * Determines if any class in the hierarchy defines any properties
       * @param {qx.tool.compiler.MetaExtraction} meta
       * @returns {Boolean}
       */
      __P_500_8: function __P_500_8(meta) {
        var _arguments$,
          _this5 = this;
        var firstpass = (_arguments$ = arguments[1]) !== null && _arguments$ !== void 0 ? _arguments$ : true;
        if (!firstpass) {
          var _meta$properties;
          if (Object.keys((_meta$properties = meta === null || meta === void 0 ? void 0 : meta.properties) !== null && _meta$properties !== void 0 ? _meta$properties : {}).length) {
            return true;
          }
          if (meta !== null && meta !== void 0 && meta.mixins) {
            return meta.mixins.some(function (mixin) {
              var mixinMeta = _this5.__P_500_0.getMetaData(mixin);
              return _this5.__P_500_8(mixinMeta, false);
            });
          }
        }
        if (meta !== null && meta !== void 0 && meta.superClass) {
          var superClassMeta = this.__P_500_0.getMetaData(meta.superClass);
          return this.__P_500_8(superClassMeta, false);
        }
        return false;
      },
      /**
       * Do the mapping of types from Qooxdoo to TypeScript
       *
       * @param {String|String[]} typename the name of the type to convert
       * @return {String} the Typescript name, if possible
       */
      getType: function getType(typename) {
        var _this6 = this;
        if (Array.isArray(typename)) {
          return typename.map(function (t) {
            return _this6.getType(t);
          }).join("|");
        }
        // TODO: use an AST parser to handle modifying complex type expressions

        // handle certain cases
        var defaultType = "any";
        if (!typename || typename == "[[ Function ]]") {
          return defaultType;
        }
        if (_typeof(typename) == "object") {
          if ("type" in typename) {
            var _typename$dimensions;
            var dimensions = (_typename$dimensions = typename.dimensions) !== null && _typename$dimensions !== void 0 ? _typename$dimensions : 1;
            typename = typename.type + "[]".repeat(dimensions - 1);
          } else {
            typename = this.getType(typename.name);
          }
        }

        // handle transformations

        if (typename === "Array") {
          return "any[]";
        }

        //mapping
        var fromTypes = Object.keys(qx.tool.compiler.targets.TypeScriptWriter.TYPE_MAPPINGS);
        var re = new RegExp("(^|[^.a-zA-Z0-9])(".concat(fromTypes.join("|").replace("*", "\\*"), ")($|[^.a-zA-Z0-9<])"));

        // regexp matches overlapping strings, so we need to loop
        while (typename.match(re)) {
          typename = typename.replace(re, function (match, p1, p2, p3) {
            return "".concat(p1).concat(qx.tool.compiler.targets.TypeScriptWriter.TYPE_MAPPINGS[p2]).concat(p3);
          });
        }

        //nullables
        typename = typename.replace(/\?.*$/, "");

        // handle global types
        if (this.__P_500_0.getMetaData(typename) && typename.indexOf(".") != -1 || this.__P_500_0.getMetaData(typename.replace(/\[\]/g, "")) && typename.replace(/\[\]/g, "").indexOf(".") != -1) {
          return "globalThis." + typename;
        }
        typename = typename.replace("Promise<", "globalThis.Promise<");
        typename = typename.replace(/(^|[^.a-zA-Z])(var|\*)([^.a-zA-Z]|$)/g, "$1any$3");

        // this will do for now, but it will fail on an expression like `Array<Record<string, any>>`
        typename = typename.replace(/(?<!qx\.data\.)Array<([^>]+)>/g, "($1)[]");

        // We don't know the type
        // qx.tool.compiler.Console.error("Unknown type: " + typename);
        return typename;
      },
      /**
       * Write a constructor
       */
      writeConstructor: function writeConstructor(methodMeta) {
        this.write(this.__P_500_5 + "constructor (" + this.__P_500_9(methodMeta.params) + ");\n");
      },
      /**
       * @typedef {Object} MemberConfig
       * @property {object} location
       * @property {Boolean} access
       * @property {Boolean} abstract
       * @property {Boolean} override
       * @property {Boolean} async
       * @property {Boolean} static
       * @property {Array} parameters JSDoc parameters and types
       * @property {any} returnType JSDoc return type
       * @property {object} jsdoc
       *
       * @param {string} methodName
       * @param {MemberConfig} config
       */
      __P_500_7: function __P_500_7(methodName, config) {
        var _config$jsdoc;
        var declaration = "";
        if (config.access === "protected" || config.access === "public") {
          declaration += config.access + " ";
        } else if (config.access === "private") {
          return;
        }
        if (config["static"]) {
          declaration += "static ";
        }
        if (config["abstract"]) {
          declaration += "abstract ";
        }
        if (config.override) {
          declaration += "override ";
        }
        declaration += this.__P_500_10(methodName) + "(";
        if (config.parameters) {
          declaration += this.__P_500_9(config.parameters);
        }
        declaration += ")";
        var returnType = "void";
        if (config.returnType) {
          returnType = this.getType(config.returnType);
        }
        declaration += ": " + returnType;
        this.__P_500_6((_config$jsdoc = config.jsdoc) === null || _config$jsdoc === void 0 ? void 0 : _config$jsdoc.raw, config.location);
        this.write(this.__P_500_5 + "// ".concat(this.__P_500_3.className).concat(config["static"] ? "#" : ".").concat(methodName, "\n"));
        this.write(this.__P_500_5 + declaration + ";" + "\n");
      },
      /**
       * @typedef {Object} FieldConfig
       * @property {object} location
       * @property {Boolean} access
       * @property {Boolean} abstract
       * @property {Boolean} override
       * @property {Boolean} async
       * @property {Boolean} static
       * @property {Array} type
       * @property {object} jsdoc
       *
       * @param {string} fieldName
       * @param {FieldConfig} config
       */
      __P_500_11: function __P_500_11(fieldName, config) {
        var _config$jsdoc2;
        var declaration = "";
        if (config.access === "protected" || config.access === "public") {
          declaration += config.access + " ";
        } else if (config.access === "private") {
          return;
        }
        if (config["static"]) {
          declaration += "static ";
        }
        if (config["abstract"]) {
          declaration += "abstract ";
        }
        if (config.override) {
          declaration += "override ";
        }
        declaration += this.__P_500_10(fieldName) + ": " + config.type;
        this.__P_500_6((_config$jsdoc2 = config.jsdoc) === null || _config$jsdoc2 === void 0 ? void 0 : _config$jsdoc2.raw, config.location);
        this.write(this.__P_500_5 + "// ".concat(this.__P_500_3.className).concat(config["static"] ? "#" : ".").concat(fieldName, "\n"));
        this.write(this.__P_500_5 + declaration + ";" + "\n");
      },
      /**
       * Writes the JSDoc content and adds a link to the source code
       * @param {string[]} jsdoc
       * @param {object} location
       */
      __P_500_6: function __P_500_6(jsdoc, location) {
        var _this7 = this,
          _jsdoc;
        var fixup = function fixup(source) {
          source = source
          // to ensure that links work correctly, include the full class path
          .replace(/\{@link #([^}]+)\}/g, "{@link ".concat(_this7.__P_500_3.className, ".$1}"));
          if (source.match(/@param|@return/)) {
            var typeExpr = qx.tool.compiler.jsdoc.Parser.getTypeExpression(source);
            if (typeExpr) {
              source = source.slice(0, typeExpr.start - 1).trim() + " " + source.slice(typeExpr.end + 1, source.length).trim();
            }
            if (source.trim().match(/^\*\s*(@param|@return(s?))$/)) {
              return "";
            }
          }
          return source.trim();
        };
        jsdoc = ((_jsdoc = jsdoc) !== null && _jsdoc !== void 0 ? _jsdoc : []).map(fixup).filter(function (line) {
          return line.trim().length;
        });
        if (jsdoc.length) {
          jsdoc.push("*");
        }
        var sourceCodePath = path.join(process.cwd(), this.__P_500_0.getRootDir(), this.__P_500_3.classFilename);

        // currently, VSCode does not support the use of `%file:%line:%column` in
        // in-file links, though it supports them in all other contexts.
        // TODO: find/create issue at microsoft/vscode regarding the above
        var locationSpecifier = ""; // location?.start
        //   ? `:${location.start.line}:${location.start.column}`
        //   : "";

        this.write("".concat(this.__P_500_5, "/**\n") + [].concat(_toConsumableArray(jsdoc), ["* [source code](".concat(sourceCodePath).concat(locationSpecifier, ")"), "*/\n"]).map(function (line) {
          return "".concat(_this7.__P_500_5, " ").concat(line);
        }).join("\n"));
      },
      __P_500_9: function __P_500_9(params) {
        var _this8 = this;
        var forceOptional = false;
        var arr = params.map(function (paramMeta) {
          var decl = paramMeta.name;
          var optional = paramMeta.optional;
          if (paramMeta.name == "varargs") {
            optional = true;
          }
          if (optional || forceOptional) {
            decl += "?";
            forceOptional = true;
          }
          decl += ": ";
          var type = "any";
          if (paramMeta.type) {
            var tmp = null;
            if (qx.lang.Type.isArray(paramMeta.type)) {
              if (paramMeta.type.length == 1) {
                tmp = paramMeta.type[0];
              }
            } else {
              tmp = paramMeta.type;
            }
            if (tmp) {
              type = _this8.getType(tmp);
              if (tmp.dimensions) {
                type += "[]";
              }
            }
          }
          decl += type;
          return decl;
        });
        return arr.join(", ");
      },
      /**
       * Write all the methods of a type
       */
      writeMembers: function writeMembers(body, classMeta) {
        var _this9 = this;
        var isStatic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!body || !Object.keys(body).length) {
          return;
        }
        var access = isStatic ? "statics" : "members";
        for (var name in body) {
          var _classMeta$mixins, _memberMeta$appearsIn;
          var memberMeta = Object.getOwnPropertyDescriptor(body, name).value;

          // this prevents destruction of type information by base classes which include the `qx.core.MProperty` mixin
          if ((name === "get" || name === "set") && (_classMeta$mixins = classMeta.mixins) !== null && _classMeta$mixins !== void 0 && _classMeta$mixins.includes("qx.core.MProperty")) {
            continue;
          }
          if ((_memberMeta$appearsIn = memberMeta.appearsIn) !== null && _memberMeta$appearsIn !== void 0 && _memberMeta$appearsIn.length) {
            var superLikeName = memberMeta.appearsIn.slice(-1)[0];
            var superLikeMeta = this.__P_500_0.getMetaData(superLikeName);
            var superLikeMember = superLikeMeta[access][name];
            superLikeMember.jsdoc = memberMeta.jsdoc;
            memberMeta = superLikeMember;
          }
          if (memberMeta.type === "function") {
            var _memberMeta$jsdoc;
            this.__P_500_7(name, {
              location: memberMeta.location,
              access: classMeta.type !== "interface" && memberMeta.access,
              "abstract": classMeta.type !== "interface" && memberMeta["abstract"],
              async: memberMeta.async,
              "static": isStatic,
              parameters: memberMeta.params,
              returnType: _typeof(memberMeta.returnType) === "object" && "type" in memberMeta.returnType ? memberMeta.returnType.type : memberMeta.returnType,
              jsdoc: (_memberMeta$jsdoc = memberMeta.jsdoc) !== null && _memberMeta$jsdoc !== void 0 ? _memberMeta$jsdoc : {},
              override: memberMeta.override
            });
          } else {
            var _memberMeta$jsdoc2, _memberMeta$jsdoc3, _memberMeta$jsdoc5, _memberMeta$jsdoc6;
            var type = "any";
            if ((_memberMeta$jsdoc2 = memberMeta.jsdoc) !== null && _memberMeta$jsdoc2 !== void 0 && _memberMeta$jsdoc2["@return"] || (_memberMeta$jsdoc3 = memberMeta.jsdoc) !== null && _memberMeta$jsdoc3 !== void 0 && _memberMeta$jsdoc3["@param"]) {
              var _memberMeta$jsdoc4, _memberMeta$jsdoc$Pa, _memberMeta$jsdoc$Pa2;
              // TODO: move anon fn type gen into metadata?
              var returnType = this.getType((_memberMeta$jsdoc4 = memberMeta.jsdoc) === null || _memberMeta$jsdoc4 === void 0 || (_memberMeta$jsdoc4 = _memberMeta$jsdoc4["@return"]) === null || _memberMeta$jsdoc4 === void 0 ? void 0 : _memberMeta$jsdoc4[0].type);
              var paramaterList = (_memberMeta$jsdoc$Pa = (_memberMeta$jsdoc$Pa2 = memberMeta.jsdoc["@param"]) === null || _memberMeta$jsdoc$Pa2 === void 0 ? void 0 : _memberMeta$jsdoc$Pa2.map(function (p) {
                return "".concat(p.paramName).concat(p.optional ? "?" : "", ": ").concat(_this9.getType(p.type));
              })) !== null && _memberMeta$jsdoc$Pa !== void 0 ? _memberMeta$jsdoc$Pa : [];
              type = "((".concat(paramaterList.join(", "), ") => ").concat(returnType, ")");
            } else if (!!((_memberMeta$jsdoc5 = memberMeta.jsdoc) !== null && _memberMeta$jsdoc5 !== void 0 && _memberMeta$jsdoc5["@type"])) {
              type = this.getType(memberMeta.jsdoc["@type"][0].type);
            }
            this.__P_500_11(name, {
              location: memberMeta.location,
              access: classMeta.type !== "interface" && memberMeta.access,
              "abstract": classMeta.type !== "interface" && memberMeta["abstract"],
              "static": isStatic,
              type: type,
              jsdoc: (_memberMeta$jsdoc6 = memberMeta.jsdoc) !== null && _memberMeta$jsdoc6 !== void 0 ? _memberMeta$jsdoc6 : {},
              override: memberMeta.override
            });
          }
        }
      },
      /**
       * Escapes the name with quote marks, only if necessary
       *
       * @param name
       *          {String} the name to escape
       * @return {String} the escaped (if necessary) name
       */
      __P_500_10: function __P_500_10(name) {
        if (!name.match(/^[$a-zA-Z_][$a-zA-Z0-9_]*$/)) {
          return '"' + name + '"';
        }
        return name;
      }
    },
    statics: {
      TYPE_MAPPINGS: {
        Event: "qx.event.type.Event",
        LocalizedString: "qx.locale.LocalizedString",
        LayoutItem: "qx.ui.core.LayoutItem",
        Widget: "qx.ui.core.Widget",
        Decorator: "qx.ui.decoration.Decorator",
        MWidgetController: "qx.ui.list.core.MWidgetController",
        AbstractTreeItem: "qx.ui.tree.core.AbstractTreeItem",
        Axis: "qx.ui.virtual.core.Axis",
        ILayer: "qx.ui.virtual.core.ILayer",
        Pane: "qx.ui.virtual.core.Pane",
        IDesktop: "qx.ui.window.IDesktop",
        IWindowManager: "qx.ui.window.IWindowManager",
        DateFormat: "qx.util.format.DateFormat",
        Class: "qx.Class",
        Interface: "qx.Interface",
        Mixin: "qx.Mixin",
        Theme: "qx.Theme",
        Boolean: "boolean",
        Number: "number",
        String: "string",
        document: "Document",
        Stylesheet: "StyleSheet",
        Element: "HTMLElement",
        Object: "object",
        Map: "Record<string, any>",
        Iterable: "Iterable<any>",
        Iterator: "Iterator<any>",
        Array: "Array<any>",
        RegEx: "RegExp",
        // TODO: deprecate the below types as they are non-standard aliases for builtin types without any tangible benefit
        "var": "any",
        "*": "any",
        arguments: "any"
      }
    }
  });
  qx.tool.compiler.targets.TypeScriptWriter.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TypeScriptWriter.js.map?dt=1731948130803