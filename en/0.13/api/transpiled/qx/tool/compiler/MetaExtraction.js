function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.tool.utils.Json": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.BabelHelpers": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.compiler.jsdoc.Parser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  var fs = require("fs");
  var path = require("upath");
  qx.Class.define("qx.tool.compiler.MetaExtraction", {
    extend: qx.core.Object,
    construct: function construct(metaRootDir) {
      qx.core.Object.constructor.call(this);
      this.setMetaRootDir(metaRootDir || null);
    },
    properties: {
      /** Root directory for meta data; if provided then paths are stored relative, not absolute, which helps make
       * meta directories relocatable
       */
      metaRootDir: {
        init: null,
        nullable: true,
        check: "String"
      }
    },
    statics: {
      /** Meta Data Version - stored in meta data files */
      VERSION: 0.3
    },
    members: {
      /** @type{Object} the parsed data*/
      __P_482_0: null,
      /**
       * Loads the meta from disk
       *
       * @param {String} filename
       */
      loadMeta: function loadMeta(filename) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var metaData;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return qx.tool.utils.Json.loadJsonAsync(filename);
              case 2:
                metaData = _context.sent;
                if ((metaData === null || metaData === void 0 ? void 0 : metaData.version) === qx.tool.compiler.MetaExtraction.VERSION) {
                  _this.__P_482_0 = metaData;
                } else {
                  _this.__P_482_0 = null;
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      /**
       * Saves the meta to disk
       *
       * @param {String} filename
       */
      saveMeta: function saveMeta(filename) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return qx.tool.utils.Utils.makeParentDir(filename);
              case 2:
                _context2.next = 4;
                return qx.tool.utils.Json.saveJsonAsync(filename, _this2.__P_482_0);
              case 4:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the actual meta data
       *
       * @returns {*}
       */
      getMetaData: function getMetaData() {
        return this.__P_482_0;
      },
      /**
       * Checks whether the meta data is out of date compared to the last modified
       * timestamp of the classname
       *
       * @returns {Boolean}
       */
      isOutOfDate: function isOutOfDate() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _this3$__P_482_;
          var classFilename, stat, lastModified;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                classFilename = _this3.__P_482_0.classFilename;
                if (_this3.getMetaRootDir()) {
                  classFilename = path.join(_this3.getMetaRootDir(), classFilename);
                }
                _context3.next = 4;
                return fs.promises.stat(classFilename);
              case 4:
                stat = _context3.sent;
                lastModified = (_this3$__P_482_ = _this3.__P_482_0) === null || _this3$__P_482_ === void 0 ? void 0 : _this3$__P_482_.lastModified;
                if (!(lastModified && lastModified == stat.mtime.getTime())) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return", false);
              case 8:
                return _context3.abrupt("return", true);
              case 9:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }))();
      },
      /**
       * Parses the file and returns the metadata
       *
       * @param {String} classFilename the .js file to parse
       * @return {Object}
       */
      parse: function parse(classFilename) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var stat, babelCore, src, babelConfig, plugins, config, result;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return qx.tool.utils.files.Utils.correctCase(classFilename);
              case 2:
                classFilename = _context4.sent;
                _context4.next = 5;
                return fs.promises.stat(classFilename);
              case 5:
                stat = _context4.sent;
                _this4.__P_482_0 = {
                  version: qx.tool.compiler.MetaExtraction.VERSION,
                  lastModified: stat.mtime.getTime(),
                  lastModifiedIso: stat.mtime.toISOString()
                };
                if (_this4.getMetaRootDir()) {
                  _this4.__P_482_0.classFilename = path.relative(_this4.getMetaRootDir(), classFilename);
                } else {
                  _this4.__P_482_0.classFilename = path.resolve(classFilename);
                }
                babelCore = require("@babel/core");
                _context4.next = 11;
                return fs.promises.readFile(classFilename, "utf8");
              case 11:
                src = _context4.sent;
                babelConfig = {
                  options: {
                    modules: false
                  }
                };
                plugins = [require("@babel/plugin-syntax-jsx"), _this4.__P_482_1()];
                config = {
                  ast: true,
                  babelrc: false,
                  sourceFileName: classFilename,
                  filename: classFilename,
                  sourceMaps: false,
                  presets: [[{
                    plugins: plugins
                  }]],
                  parserOpts: {
                    allowSuperOutsideMethod: true,
                    sourceType: "script"
                  },
                  generatorOpts: {
                    retainLines: true,
                    compact: false
                  },
                  passPerPreset: true
                };
                result = babelCore.transform(src, config);
                return _context4.abrupt("return", _this4.__P_482_0);
              case 17:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * The Babel plugin
       *
       * @returns {Object}
       */
      __P_482_1: function __P_482_1() {
        var metaData = this.__P_482_0;
        var t = this;
        return {
          visitor: {
            Program: function Program(path) {
              path.skip();
              var found = false;
              path.get("body").forEach(function (path) {
                var node = path.node;
                if (node.type == "ExpressionStatement" && node.expression.type == "CallExpression") {
                  var str = qx.tool.utils.BabelHelpers.collapseMemberExpression(node.expression.callee);
                  var m = str.match(/^qx\.([a-z]+)\.define$/i);
                  var definingType = m && m[1];
                  if (definingType) {
                    if (found) {
                      qx.tool.compiler.Console.warn("Ignoring class '".concat(node.expression.arguments[0].value, "' in file '").concat(metaData.classFilename, "' because a class, mixin, or interface was already found in this file."));
                      return;
                    }
                    found = true;
                    metaData.type = definingType.toLowerCase();
                    metaData.location = {
                      start: node.loc.start,
                      end: node.loc.end
                    };
                    metaData.className = node.expression.arguments[0].value;
                    if (typeof metaData.className != "string") {
                      metaData.className = null;
                    }
                    metaData.jsdoc = qx.tool.utils.BabelHelpers.getJsDoc(node.leadingComments);
                    t.__P_482_2(path.get("expression.arguments")[1]);
                  }
                }
              });
            }
          }
        };
      },
      /**
       * Scans the class definition
       *
       * @param {NodePath} path
       */
      __P_482_2: function __P_482_2(path) {
        var _this5 = this;
        var metaData = this.__P_482_0;
        var getFunctionParams = function getFunctionParams(node) {
          if (node.type == "ObjectMethod") {
            return node.params;
          }
          if (node.value.type == "FunctionExpression") {
            return node.value.params;
          }
          throw new Error("Don't know how to get parameters from " + node.type);
        };
        var collapseParamMeta = function collapseParamMeta(node, meta) {
          getFunctionParams(node).forEach(function (param, i) {
            var name = qx.tool.utils.BabelHelpers.collapseParam(param, i);
            meta.params.push({
              name: name
            });
          });
        };
        path.skip();
        var ctorAnnotations = {};
        path.get("properties").forEach(function (path) {
          var property = path.node;
          var propertyName;
          if (property.key.type === "Identifier") {
            propertyName = property.key.name;
          } else if (property.key.type === "StringLiteral") {
            propertyName = property.key.value;
          }

          // Extend
          if (propertyName == "extend") {
            metaData.superClass = qx.tool.utils.BabelHelpers.collapseMemberExpression(property.value);
          }

          // Class Annotations
          else if (propertyName == "@") {
            metaData.annotation = path.get("value").toString();
          }

          // Core
          else if (propertyName == "implement" || propertyName == "include") {
            var name = propertyName == "include" ? "mixins" : "interfaces";
            metaData[name] = [];
            // eg: `include: [qx.my.first.MMixin, qx.my.next.MMixin, ..., qx.my.last.MMixin]`
            if (property.value.type == "ArrayExpression") {
              property.value.elements.forEach(function (element) {
                metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(element));
              });
            }
            // eg: `include: qx.my.MMixin`
            else if (property.value.type == "MemberExpression") {
              metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(property.value));
            }
            // eg, `include: qx.core.Environment.filter({...})`
            else if (property.value.type === "CallExpression") {
              var calleeLiteral = "";
              var current = property.value.callee;
              while (current) {
                var suffix = calleeLiteral ? ".".concat(calleeLiteral) : "";
                if (current.type === "MemberExpression") {
                  calleeLiteral = current.property.name + suffix;
                  current = current.object;
                  continue;
                } else if (current.type === "Identifier") {
                  calleeLiteral = current.name + suffix;
                  break;
                }
                throw new Error("".concat(metaData.className, ": error parsing mixin types: cannot resolve ").concat(property.value.callee.type, " in CallExpression"));
              }
              if (calleeLiteral === "qx.core.Environment.filter") {
                var _property$value$argum;
                var properties = (_property$value$argum = property.value.arguments[0]) === null || _property$value$argum === void 0 ? void 0 : _property$value$argum.properties;
                properties === null || properties === void 0 || properties.forEach(function (prop) {
                  return metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(prop.value));
                });
              } else {
                _this5.warn("".concat(metaData.className, ": could not determine mixin types from call `").concat(calleeLiteral, "`. Type support for this class may be limited."));
              }
            }
          }

          // Type
          else if (propertyName == "type") {
            metaData.isSingleton = property.value.value == "singleton";
            metaData["abstract"] = property.value.value == "abstract";
          }

          // Constructor & Destructor Annotations
          else if (propertyName == "@construct" || propertyName == "@destruct") {
            ctorAnnotations[propertyName] = path.get("value").toString();
          }

          // Constructor & Destructor Methods
          else if (propertyName == "construct" || propertyName == "destruct") {
            var memberMeta = metaData[propertyName] = {
              type: "function",
              params: [],
              location: {
                start: path.node.loc.start,
                end: path.node.loc.end
              }
            };
            collapseParamMeta(property, memberMeta);
          }

          // Events
          else if (propertyName == "events") {
            metaData.events = {};
            property.value.properties.forEach(function (event) {
              var name = event.key.name;
              metaData.events[name] = {
                type: null,
                jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(event.leadingComments)
              };
              if (event.value.type == "StringLiteral") {
                metaData.events[name].type = event.value.value;
                metaData.events[name].location = {
                  start: event.loc.start,
                  end: event.loc.end
                };
              }
            });
          }

          // Properties
          else if (propertyName == "properties") {
            _this5.__P_482_3(path.get("value.properties"));
          }

          // Members & Statics
          else if (propertyName == "members" || propertyName == "statics") {
            var type = propertyName;
            var annotations = {};
            metaData[type] = {};
            path.get("value.properties").forEach(function (memberPath) {
              var member = memberPath.node;
              var name = qx.tool.utils.BabelHelpers.collapseMemberExpression(member.key);
              if (name[0] == "@") {
                annotations[name] = memberPath.get("value").toString();
                return;
              }
              var memberMeta = metaData[type][name] = {
                jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(member.leadingComments)
              };
              memberMeta.access = name.startsWith("__") ? "private" : name.startsWith("_") ? "protected" : "public";
              memberMeta.location = {
                start: member.loc.start,
                end: member.loc.end
              };
              if (member.type === "ObjectMethod" || member.type === "ObjectProperty" && member.value.type === "FunctionExpression") {
                memberMeta.type = "function";
                memberMeta.params = [];
                collapseParamMeta(member, memberMeta);
              }
            });
            for (var metaName in annotations) {
              var bareName = metaName.substring(1);
              var _memberMeta = metaData[type][bareName];
              if (_memberMeta) {
                _memberMeta.annotation = annotations[metaName];
              }
            }
          }
        });
        if (ctorAnnotations["@construct"] && metaData.construct) {
          metaData.construct.annotation = ctorAnnotations["@construct"];
        }
        if (ctorAnnotations["@destruct"] && metaData.destruct) {
          metaData.destruct.annotation = ctorAnnotations["@destruct"];
        }
      },
      /**
       * Scans the properties in the class definition
       *
       * @param {NodePath[]} paths
       */
      __P_482_3: function __P_482_3(paths) {
        var metaData = this.__P_482_0;
        if (!metaData.properties) {
          metaData.properties = {};
        }
        paths.forEach(function (path) {
          path.skip();
          var property = path.node;
          var name = qx.tool.utils.BabelHelpers.collapseMemberExpression(property.key);
          metaData.properties[name] = {
            location: {
              start: path.node.loc.start,
              end: path.node.loc.end
            },
            json: qx.tool.utils.BabelHelpers.collectJson(property.value, true),
            jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(property.leadingComments)
          };
        });
      },
      fixupJsDoc: function fixupJsDoc(typeResolver) {
        var metaData = this.__P_482_0;
        var fixupEntry = function fixupEntry(obj) {
          if (obj && obj.jsdoc) {
            var _obj$jsdoc$Return;
            qx.tool.compiler.jsdoc.Parser.parseJsDoc(obj.jsdoc, typeResolver);
            if (obj.jsdoc["@param"] && obj.params) {
              var paramsLookup = {};
              obj.params.forEach(function (param) {
                paramsLookup[param.name] = param;
              });
              obj.jsdoc["@param"].forEach(function (paramDoc) {
                var param = paramsLookup[paramDoc.paramName];
                if (param) {
                  if (paramDoc.type) {
                    param.type = paramDoc.type;
                  }
                  if (paramDoc.optional !== undefined) {
                    param.optional = paramDoc.optional;
                  }
                  if (paramDoc.defaultValue !== undefined) {
                    param.defaultValue = paramDoc.defaultValue;
                  }
                }
              });
            }
            var returnDoc = (_obj$jsdoc$Return = obj.jsdoc["@return"]) === null || _obj$jsdoc$Return === void 0 ? void 0 : _obj$jsdoc$Return[0];
            if (returnDoc) {
              obj.returnType = {
                type: returnDoc.type
              };
              if (returnDoc.optional !== undefined) {
                obj.returnType.optional = returnDoc.optional;
              }
              if (returnDoc.defaultValue !== undefined) {
                obj.returnType.defaultValue = returnDoc.defaultValue;
              }
            }
          }
        };
        var fixupSection = function fixupSection(sectionName) {
          var section = metaData[sectionName];
          if (section) {
            for (var name in section) {
              fixupEntry(section[name]);
            }
          }
        };
        fixupSection("properties");
        fixupSection("events");
        fixupSection("members");
        fixupSection("statics");
        fixupEntry(metaData.clazz);
        fixupEntry(metaData.construct);
        fixupEntry(metaData.destruct);
        fixupEntry(metaData.defer);
      }
    }
  });
  qx.tool.compiler.MetaExtraction.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MetaExtraction.js.map?dt=1726089067776