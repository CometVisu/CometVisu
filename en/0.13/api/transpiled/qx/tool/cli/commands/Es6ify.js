function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(r) { var n = this.s["return"]; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, "throw": function _throw(r) { var n = this.s["return"]; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
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
      "qx.lang.Type": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.compiler.Es6ify": {},
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var fs = require("fs");
  var path = require("upath");
  var ignore = require("ignore");

  /**
   * Migrates code to ES6 (partially)
   */
  qx.Class.define("qx.tool.cli.commands.Es6ify", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "es6ify [files...]",
          describe: "help migrate code to ES6",
          builder: {
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            },
            gitPreCommit: {
              describe: "When used as a Git pre-commit hook"
            },
            overwrite: {
              type: "boolean",
              "default": true,
              describe: "Overwrite source files"
            },
            exclude: {
              type: "array",
              describe: "Paths to exclude"
            },
            arrowFunctions: {
              choices: ["never", "always", "careful", "aggressive"],
              "default": "careful"
            },
            singleLineBlocks: {
              type: "boolean",
              "default": false,
              describe: "Force braces around single line bodies for if, for, while, and do while"
            }
          }
        };
      }
    },
    members: {
      process: function (_process) {
        function process() {
          return _process.apply(this, arguments);
        }
        process.toString = function () {
          return _process.toString();
        };
        return process;
      }(function () {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var ignoreFileName, ig, exclude, processFile, result, lines, _iterator2, _step2, filename, scanImpl, files, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, file;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return qx.tool.cli.commands.Es6ify.superclass.prototype.process.call(_this);
              case 2:
                ignoreFileName = ".prettierignore";
                ig = ignore();
                _context3.prev = 4;
                _context3.t0 = ig;
                _context3.next = 8;
                return fs.promises.readFile(ignoreFileName);
              case 8:
                _context3.t1 = _context3.sent.toString();
                _context3.t0.add.call(_context3.t0, _context3.t1);
                _context3.next = 16;
                break;
              case 12:
                _context3.prev = 12;
                _context3.t2 = _context3["catch"](4);
                if (!(_context3.t2.code !== "ENOENT")) {
                  _context3.next = 16;
                  break;
                }
                throw _context3.t2;
              case 16:
                exclude = _this.argv.exclude;
                if (exclude) {
                  if (!qx.lang.Type.isArray(exclude)) {
                    exclude = [exclude];
                  }
                  ig.add(exclude);
                }
                processFile = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filename) {
                    var ify;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (!ig.ignores(filename)) {
                            _context.next = 2;
                            break;
                          }
                          return _context.abrupt("return");
                        case 2:
                          qx.tool.compiler.Console.info("Processing ".concat(filename, "..."));
                          ify = new qx.tool.compiler.Es6ify(filename);
                          ify.set({
                            arrowFunctions: _this.argv.arrowFunctions,
                            overwrite: _this.argv.overwrite,
                            singleLineBlocks: _this.argv.singleLineBlocks
                          });
                          _context.next = 7;
                          return ify.transform();
                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }));
                  return function processFile(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                if (!_this.argv.gitPreCommit) {
                  _context3.next = 53;
                  break;
                }
                _context3.next = 22;
                return qx.tool.utils.Utils.runCommand(process.cwd(), "git", "diff", "--cached", "--name-only", "--diff-filter=ACMR");
              case 22:
                result = _context3.sent;
                if (!(result.exitCode != 0)) {
                  _context3.next = 27;
                  break;
                }
                qx.tool.compiler.Console.error("Failed to run 'git diff': ".concat(JSON.stringify(result, null, 2)));
                process.exit(1);
                return _context3.abrupt("return");
              case 27:
                lines = result.output.split(/\n/).filter(function (str) {
                  return !!str.match(/^source\/class\/.*\.js$/);
                });
                _iterator2 = _createForOfIteratorHelper(lines);
                _context3.prev = 29;
                _iterator2.s();
              case 31:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 44;
                  break;
                }
                filename = _step2.value;
                _context3.next = 35;
                return processFile(filename);
              case 35:
                _context3.next = 37;
                return qx.tool.utils.Utils.runCommand(process.cwd(), "git", "add", filename);
              case 37:
                result = _context3.sent;
                if (!(result.exitCode != 0)) {
                  _context3.next = 42;
                  break;
                }
                qx.tool.compiler.Console.error("Failed to run 'git add ".concat(filename, "': ").concat(JSON.stringify(result, null, 2)));
                process.exit(1);
                return _context3.abrupt("return");
              case 42:
                _context3.next = 31;
                break;
              case 44:
                _context3.next = 49;
                break;
              case 46:
                _context3.prev = 46;
                _context3.t3 = _context3["catch"](29);
                _iterator2.e(_context3.t3);
              case 49:
                _context3.prev = 49;
                _iterator2.f();
                return _context3.finish(49);
              case 52:
                process.exit(0);
              case 53:
                scanImpl = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(filename) {
                    var basename, stat, _files, i, subname;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          basename = path.basename(filename);
                          _context2.next = 3;
                          return fs.promises.stat(filename);
                        case 3:
                          stat = _context2.sent;
                          if (!(stat.isFile() && basename.match(/\.js$/))) {
                            _context2.next = 9;
                            break;
                          }
                          _context2.next = 7;
                          return processFile(filename);
                        case 7:
                          _context2.next = 21;
                          break;
                        case 9:
                          if (!(stat.isDirectory() && (basename == "." || basename[0] != "."))) {
                            _context2.next = 21;
                            break;
                          }
                          _context2.next = 12;
                          return fs.promises.readdir(filename);
                        case 12:
                          _files = _context2.sent;
                          i = 0;
                        case 14:
                          if (!(i < _files.length)) {
                            _context2.next = 21;
                            break;
                          }
                          subname = path.join(filename, _files[i]);
                          _context2.next = 18;
                          return scanImpl(subname);
                        case 18:
                          i++;
                          _context2.next = 14;
                          break;
                        case 21:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2);
                  }));
                  return function scanImpl(_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }();
                files = _this.argv.files || [];
                if (files.length === 0) {
                  files.push("source");
                }
                _iteratorAbruptCompletion = false;
                _didIteratorError = false;
                _context3.prev = 58;
                _iterator = _asyncIterator(files);
              case 60:
                _context3.next = 62;
                return _iterator.next();
              case 62:
                if (!(_iteratorAbruptCompletion = !(_step = _context3.sent).done)) {
                  _context3.next = 69;
                  break;
                }
                file = _step.value;
                _context3.next = 66;
                return scanImpl(file);
              case 66:
                _iteratorAbruptCompletion = false;
                _context3.next = 60;
                break;
              case 69:
                _context3.next = 75;
                break;
              case 71:
                _context3.prev = 71;
                _context3.t4 = _context3["catch"](58);
                _didIteratorError = true;
                _iteratorError = _context3.t4;
              case 75:
                _context3.prev = 75;
                _context3.prev = 76;
                if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                  _context3.next = 80;
                  break;
                }
                _context3.next = 80;
                return _iterator["return"]();
              case 80:
                _context3.prev = 80;
                if (!_didIteratorError) {
                  _context3.next = 83;
                  break;
                }
                throw _iteratorError;
              case 83:
                return _context3.finish(80);
              case 84:
                return _context3.finish(75);
              case 85:
              case "end":
                return _context3.stop();
            }
          }, _callee3, null, [[4, 12], [29, 46, 49, 52], [58, 71, 75, 85], [76,, 80, 84]]);
        }))();
      })
    }
  });
  qx.tool.cli.commands.Es6ify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Es6ify.js.map?dt=1726089064747