function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var ignoreFileName, ig, exclude, processFile, result, lines, _iterator2, _step2, filename, _scanImpl, files, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, _t, _t2, _t3, _t4;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.p = _context3.n) {
              case 0:
                _context3.n = 1;
                return qx.tool.cli.commands.Es6ify.superclass.prototype.process.call(_this);
              case 1:
                ignoreFileName = ".prettierignore";
                ig = ignore();
                _context3.p = 2;
                _t = ig;
                _context3.n = 3;
                return fs.promises.readFile(ignoreFileName);
              case 3:
                _t.add.call(_t, _context3.v.toString());
                _context3.n = 5;
                break;
              case 4:
                _context3.p = 4;
                _t2 = _context3.v;
                if (!(_t2.code !== "ENOENT")) {
                  _context3.n = 5;
                  break;
                }
                throw _t2;
              case 5:
                exclude = _this.argv.exclude;
                if (exclude) {
                  if (!qx.lang.Type.isArray(exclude)) {
                    exclude = [exclude];
                  }
                  ig.add(exclude);
                }
                processFile = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(filename) {
                    var ify;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.n) {
                        case 0:
                          if (!ig.ignores(filename)) {
                            _context.n = 1;
                            break;
                          }
                          return _context.a(2);
                        case 1:
                          qx.tool.compiler.Console.info("Processing ".concat(filename, "..."));
                          ify = new qx.tool.compiler.Es6ify(filename);
                          ify.set({
                            arrowFunctions: _this.argv.arrowFunctions,
                            overwrite: _this.argv.overwrite,
                            singleLineBlocks: _this.argv.singleLineBlocks
                          });
                          _context.n = 2;
                          return ify.transform();
                        case 2:
                          return _context.a(2);
                      }
                    }, _callee);
                  }));
                  return function processFile(_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                if (!_this.argv.gitPreCommit) {
                  _context3.n = 17;
                  break;
                }
                _context3.n = 6;
                return qx.tool.utils.Utils.runCommand(process.cwd(), "git", "diff", "--cached", "--name-only", "--diff-filter=ACMR");
              case 6:
                result = _context3.v;
                if (!(result.exitCode != 0)) {
                  _context3.n = 7;
                  break;
                }
                qx.tool.compiler.Console.error("Failed to run 'git diff': ".concat(JSON.stringify(result, null, 2)));
                process.exit(1);
                return _context3.a(2);
              case 7:
                lines = result.output.split(/\n/).filter(function (str) {
                  return !!str.match(/^source\/class\/.*\.js$/);
                });
                _iterator2 = _createForOfIteratorHelper(lines);
                _context3.p = 8;
                _iterator2.s();
              case 9:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.n = 13;
                  break;
                }
                filename = _step2.value;
                _context3.n = 10;
                return processFile(filename);
              case 10:
                _context3.n = 11;
                return qx.tool.utils.Utils.runCommand(process.cwd(), "git", "add", filename);
              case 11:
                result = _context3.v;
                if (!(result.exitCode != 0)) {
                  _context3.n = 12;
                  break;
                }
                qx.tool.compiler.Console.error("Failed to run 'git add ".concat(filename, "': ").concat(JSON.stringify(result, null, 2)));
                process.exit(1);
                return _context3.a(2);
              case 12:
                _context3.n = 9;
                break;
              case 13:
                _context3.n = 15;
                break;
              case 14:
                _context3.p = 14;
                _t3 = _context3.v;
                _iterator2.e(_t3);
              case 15:
                _context3.p = 15;
                _iterator2.f();
                return _context3.f(15);
              case 16:
                process.exit(0);
              case 17:
                _scanImpl = /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(filename) {
                    var basename, stat, _files, i, subname;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          basename = path.basename(filename);
                          _context2.n = 1;
                          return fs.promises.stat(filename);
                        case 1:
                          stat = _context2.v;
                          if (!(stat.isFile() && basename.match(/\.js$/))) {
                            _context2.n = 3;
                            break;
                          }
                          _context2.n = 2;
                          return processFile(filename);
                        case 2:
                          _context2.n = 7;
                          break;
                        case 3:
                          if (!(stat.isDirectory() && (basename == "." || basename[0] != "."))) {
                            _context2.n = 7;
                            break;
                          }
                          _context2.n = 4;
                          return fs.promises.readdir(filename);
                        case 4:
                          _files = _context2.v;
                          i = 0;
                        case 5:
                          if (!(i < _files.length)) {
                            _context2.n = 7;
                            break;
                          }
                          subname = path.join(filename, _files[i]);
                          _context2.n = 6;
                          return _scanImpl(subname);
                        case 6:
                          i++;
                          _context2.n = 5;
                          break;
                        case 7:
                          return _context2.a(2);
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
                _context3.p = 18;
                _iterator = _asyncIterator(files);
              case 19:
                _context3.n = 20;
                return _iterator.next();
              case 20:
                if (!(_iteratorAbruptCompletion = !(_step = _context3.v).done)) {
                  _context3.n = 22;
                  break;
                }
                file = _step.value;
                _context3.n = 21;
                return _scanImpl(file);
              case 21:
                _iteratorAbruptCompletion = false;
                _context3.n = 19;
                break;
              case 22:
                _context3.n = 24;
                break;
              case 23:
                _context3.p = 23;
                _t4 = _context3.v;
                _didIteratorError = true;
                _iteratorError = _t4;
              case 24:
                _context3.p = 24;
                _context3.p = 25;
                if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
                  _context3.n = 26;
                  break;
                }
                _context3.n = 26;
                return _iterator["return"]();
              case 26:
                _context3.p = 26;
                if (!_didIteratorError) {
                  _context3.n = 27;
                  break;
                }
                throw _iteratorError;
              case 27:
                return _context3.f(26);
              case 28:
                return _context3.f(24);
              case 29:
                return _context3.a(2);
            }
          }, _callee3, null, [[25,, 26, 28], [18, 23, 24, 29], [8, 14, 15, 16], [2, 4]]);
        }))();
      })
    }
  });
  qx.tool.cli.commands.Es6ify.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Es6ify.js.map?dt=1782967161261