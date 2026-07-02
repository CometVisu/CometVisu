function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.cli.commands.Serve": {
        "construct": true,
        "require": true
      },
      "qx.tool.cli.commands.Compile": {},
      "qx.core.Assert": {},
      "qx.tool.cli.api.Test": {},
      "qx.tool.compiler.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2020 Henner Kollmann
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project"s top-level directory for details.
  
  
  ************************************************************************ */
  var fs = require("fs");
  var path = require("path");
  var _process = require("process");

  /**
   * Compiles the project, serves it up as a web page (default, can be turned off),
   * and dispatches the "runTests" event.
   *
   * All tests that should be run need to register themselves by the
   * test command. This is usually done in a `compile.js` file by either
   *
   * - adding a listener for the "runTests" event fired on the command
   * instance  in the `load()` method of the class extending {@link
   * qx.tool.cli.api.CompilerApi} or {@link qx.tool.cli.api.CompilerApi}.
   *
   * - or by implementing a `beforeTests()` method in the class
   * extending {@link qx.tool.cli.api.CompilerApi}
   *
   * The event and/or method is called with a {@link qx.event.type.Data}
   * containing the command instance.
   *
   */
  qx.Class.define("qx.tool.cli.commands.Test", {
    extend: qx.tool.cli.commands.Serve,
    statics: {
      /**
       * The name of the file containing the compile config for the testrunner
       * defaults to "compile-test.json"
       */
      CONFIG_FILENAME: "compile-test.json",
      YARGS_BUILDER: {
        "fail-fast": {
          describe: "Exit on first failing test",
          "default": false,
          type: "boolean"
        },
        "disable-webserver": {
          describe: "Disables the start of the webserver",
          "default": false,
          type: "boolean"
        }
      },
      getYargsCommand: function getYargsCommand() {
        return {
          command: "test",
          describe: "run test for current project",
          builder: function () {
            var res = Object.assign({}, qx.tool.cli.commands.Compile.YARGS_BUILDER, qx.tool.cli.commands.Serve.YARGS_BUILDER, qx.tool.cli.commands.Test.YARGS_BUILDER);
            delete res.watch;
            delete res["machine-readable"];
            delete res["feedback"];
            delete res["show-startpage"];
            delete res["rebuild-startpage"];
            return res;
          }()
        };
      }
    },
    events: {
      /**
       * Fired to start tests.
       *
       * The event data is the command instance:
       *  cmd: {qx.tool.cli.commands.Test}
       */
      runTests: "qx.event.type.Data"
    },
    construct: function construct(argv) {
      qx.tool.cli.commands.Serve.constructor.call(this, argv);
      this.__P_482_0 = [];
      this.addListener("changeExitCode", function (evt) {
        var exitCode = evt.getData();
        // overwrite error code only in case of errors
        if (exitCode !== 0 && argv.failFast) {
          _process.exit(Math.min(255, exitCode));
        }
      });
    },
    properties: {
      /**
       * The exit code of all tests.
       *
       */
      exitCode: {
        check: "Number",
        event: "changeExitCode",
        nullable: false,
        init: 0
      },
      /**
       * Is the webserver instance needed for the test?
       */
      needsServer: {
        check: "Boolean",
        nullable: false,
        init: false
      }
    },
    members: {
      /**
       * @var {Array}
       */
      __P_482_0: null,
      /**
       * add a test object and listens for the change of exitCode property
       * @param {qx.tool.cli.api.Test} test
       */
      addTest: function addTest(test) {
        var _this = this;
        qx.core.Assert.assertInstance(test, qx.tool.cli.api.Test);
        test.addListenerOnce("changeExitCode", function (evt) {
          var exitCode = evt.getData();
          // handle result and inform user
          if (exitCode === 0) {
            if (test.getName() && !_this.argv.quiet) {
              qx.tool.compiler.Console.info("Test '".concat(test.getName(), "' passed."));
            }
          } else if (test.getName()) {
            qx.tool.compiler.Console.error("Test '".concat(test.getName(), "' failed with exit code ").concat(exitCode, "."));
          }
          // overwrite error code only in case of errors
          if (exitCode !== 0) {
            if (test.getFailFast()) {
              _this.argv.failFast = true;
            }
            _this.setExitCode(exitCode);
          }
        });
        this.__P_482_0.push(test);
        return test;
      },
      /**
       * @Override
       */
      process: function process() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this2.argv.watch = false;
                _this2.argv["machine-readable"] = false;
                _this2.argv["feedback"] = false;
                _this2.argv["show-startpage"] = false;
                // check for special test compiler config
                if (!_this2.argv.configFile && fs.existsSync(path.join(_process.cwd(), qx.tool.cli.commands.Test.CONFIG_FILENAME))) {
                  _this2.argv.configFile = qx.tool.cli.commands.Test.CONFIG_FILENAME;
                }
                _this2.addListener("making", function () {
                  if (!_this2.hasListener("runTests") && _this2.__P_482_0.length === 0 && (!_this2.getCompilerApi() || typeof _this2.getCompilerApi().beforeTests != "function")) {
                    qx.tool.compiler.Console.error("No tests are registered! You need to either register tests, or install a testrunner.\n             See documentation at https://qooxdoo.org/docs/#/development/testing/");
                    _process.exit(1);
                  }
                });
                _this2.addListener("afterStart", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                  var _iterator, _step, test, _t;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.p = _context.n) {
                      case 0:
                        qx.tool.compiler.Console.info("Running unit tests");
                        if (_this2.argv.verbose) {
                          console.log(_this2.argv);
                        }
                        _context.n = 1;
                        return _this2.fireDataEventAsync("runTests", _this2);
                      case 1:
                        if (!(_this2.getCompilerApi() && typeof _this2.getCompilerApi().beforeTests == "function")) {
                          _context.n = 2;
                          break;
                        }
                        _context.n = 2;
                        return _this2.getCompilerApi().beforeTests(_this2);
                      case 2:
                        _iterator = _createForOfIteratorHelper(_this2.__P_482_0);
                        _context.p = 3;
                        _iterator.s();
                      case 4:
                        if ((_step = _iterator.n()).done) {
                          _context.n = 6;
                          break;
                        }
                        test = _step.value;
                        qx.tool.compiler.Console.info("Running ".concat(test.getName()));
                        _context.n = 5;
                        return test.execute();
                      case 5:
                        _context.n = 4;
                        break;
                      case 6:
                        _context.n = 8;
                        break;
                      case 7:
                        _context.p = 7;
                        _t = _context.v;
                        _iterator.e(_t);
                      case 8:
                        _context.p = 8;
                        _iterator.f();
                        return _context.f(8);
                      case 9:
                        // for bash exitcode is not allowed to be more then 255!
                        // We must exit the process here because serve runs infinite!
                        _process.exit(Math.min(255, _this2.getExitCode()));
                      case 10:
                        return _context.a(2);
                    }
                  }, _callee, null, [[3, 7, 8, 9]]);
                })));
                if (!_this2.__P_482_1()) {
                  _context2.n = 2;
                  break;
                }
                _context2.n = 1;
                return qx.tool.cli.commands.Test.superclass.prototype.process.call(_this2);
              case 1:
                _context2.n = 4;
                break;
              case 2:
                _context2.n = 3;
                return qx.tool.cli.commands.Compile.prototype.process.call(_this2);
              case 3:
                _context2.n = 4;
                return _this2.fireDataEventAsync("afterStart");
              case 4:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      __P_482_1: function __P_482_1() {
        return !this.argv.disableWebserver && (this.getNeedsServer() || this.__P_482_0.some(function (test) {
          return test.getNeedsServer();
        }));
      }
    }
  });
  qx.tool.cli.commands.Test.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Test.js.map?dt=1782967161528