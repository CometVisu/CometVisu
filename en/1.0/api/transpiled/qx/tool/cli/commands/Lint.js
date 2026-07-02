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
      "qx.tool.utils.Promisify": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.cli.commands.Command": {
        "require": true
      },
      "qx.tool.cli.Cli": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.utils.Utils": {},
      "qx.Promise": {},
      "qx.tool.compiler.app.Library": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Christian Boulanger and others
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project"s top-level directory for details.
  
     Authors:
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  var _require = require("eslint"),
    ESLint = _require.ESLint;
  var fs = qx.tool.utils.Promisify.fs;
  var path = require("path");
  var replaceInFile = require("replace-in-file");
  qx.Class.define("qx.tool.cli.commands.Lint", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "lint [files...]",
          describe: "runs eslint on the current application or as set of single files.",
          builder: {
            fix: {
              describe: "runs eslint with --fix"
            },
            "fix-jsdoc-params": {
              describe: "changes the order or @param name and {Type} to make it compatible for the generator ('name-first') or with JSDoc linting ('type-first').",
              choices: ["off", "name-first", "type-first"],
              "default": "off"
            },
            "use-eslintrc": {
              describe: "Use the .eslintrc file for configuration, if it exists",
              type: "boolean",
              "default": true
            },
            cache: {
              describe: "operate only on changed files",
              type: "boolean",
              "default": false
            },
            warnAsError: {
              alias: "w",
              describe: "handle warnings as error"
            },
            "print-config": {
              alias: "p",
              describe: "print the eslint configuration"
            },
            format: {
              alias: "f",
              describe: "use a specific output format",
              "default": "codeframe"
            },
            outputFile: {
              alias: "o",
              describe: "specify file to which the report will be written",
              nargs: 1,
              requiresArg: true,
              type: "string"
            },
            verbose: {
              alias: "v",
              describe: "enables additional progress output to console",
              type: "boolean"
            },
            quiet: {
              alias: "q",
              describe: "No output"
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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var files, i, helperFilePath, config, lintOptions, linter, fileConfig, report, _iterator, _step, r, outputFormat, formatter, s, maxDefaultFormatErrorCount, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                files = _this.argv.files || [];
                if (files.length === 0) {
                  files.push("source/class/**/*.js");
                }
                for (i = 0; i < files.length; i++) {
                  files[i] = path.join(process.cwd(), files[i]);
                }
                _context.n = 1;
                return _this.__P_478_0(files);
              case 1:
                helperFilePath = require.main.path;
              case 2:
                if (!true) {
                  _context.n = 5;
                  break;
                }
                _context.n = 3;
                return fs.existsAsync(path.join(helperFilePath, "node_modules"));
              case 3:
                if (!_context.v) {
                  _context.n = 4;
                  break;
                }
                return _context.a(3, 5);
              case 4:
                helperFilePath = path.dirname(helperFilePath);
                _context.n = 2;
                break;
              case 5:
                config = qx.tool.cli.Cli.getInstance().getParsedArgs();
                lintOptions = config.eslintConfig || {};
                lintOptions["extends"] = lintOptions["extends"] || ["@qooxdoo/qx/browser"];
                _t = Object;
                _t2 = lintOptions.globals || {};
                _context.n = 6;
                return _this.__P_478_1(config);
              case 6:
                lintOptions.globals = _t.assign.call(_t, _t2, _context.v);
                lintOptions.parser = "@babel/eslint-parser";
                lintOptions.parserOptions = lintOptions.parserOptions || {};
                lintOptions.parserOptions.requireConfigFile = false;
                lintOptions.parserOptions.babelOptions = {
                  cwd: helperFilePath,
                  plugins: ["@babel/plugin-syntax-jsx"],
                  parserOpts: {
                    allowSuperOutsideMethod: true
                  }
                };
                lintOptions.parserOptions.sourceType = "script";
                linter = new ESLint({
                  cwd: helperFilePath,
                  cache: _this.argv.cache || false,
                  baseConfig: lintOptions,
                  useEslintrc: _this.argv.useEslintrc,
                  fix: _this.argv.fix
                });
                if (!_this.argv.printConfig) {
                  _context.n = 8;
                  break;
                }
                _context.n = 7;
                return linter.calculateConfigForFile(files[0]);
              case 7:
                fileConfig = _context.v;
                qx.tool.compiler.Console.info(JSON.stringify(fileConfig, null, "  "));
                _context.n = 17;
                break;
              case 8:
                _context.n = 9;
                return linter.lintFiles(files);
              case 9:
                report = _context.v;
                report.errorCount = 0;
                report.warningCount = 0;
                _iterator = _createForOfIteratorHelper(report);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    r = _step.value;
                    report.errorCount += r.errorCount;
                    report.warningCount += r.warningCount;
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                if (!_this.argv.fix) {
                  _context.n = 10;
                  break;
                }
                _context.n = 10;
                return ESLint.outputFixes(report);
              case 10:
                if (!(report.errorCount > 0 || report.warningCount > 0)) {
                  _context.n = 16;
                  break;
                }
                outputFormat = _this.argv.format || "codeframe";
                _context.n = 11;
                return linter.loadFormatter(outputFormat);
              case 11:
                formatter = _context.v;
                s = formatter.format(report); // If there are too many errors, the pretty formatter is appallingly slow so if the
                // user has not specified a format, change to compact mode
                maxDefaultFormatErrorCount = 150;
                if (report.errorCount + report.warningCount > maxDefaultFormatErrorCount) {
                  if (!_this.argv.format) {
                    qx.tool.compiler.Console.info("Total errors and warnings exceed ".concat(maxDefaultFormatErrorCount, ", switching to \"compact\" style report"));
                    outputFormat = "compact";
                  } else {
                    qx.tool.compiler.Console.info("Total errors and warnings exceed ".concat(maxDefaultFormatErrorCount, ", the report may take some time to generate."));
                  }
                }
                if (!_this.argv.outputFile) {
                  _context.n = 13;
                  break;
                }
                if (_this.argv.verbose) {
                  qx.tool.compiler.Console.info("Report to be written to ".concat(_this.argv.outputFile));
                }
                _context.n = 12;
                return fs.writeFileAsync(_this.argv.outputFile, s, "UTF-8").then(function () {
                  if (_this.argv.verbose) {
                    qx.tool.compiler.Console.info("Report written to ".concat(_this.argv.outputFile));
                  }
                })["catch"](function (e) {
                  return qx.tool.compiler.Console.error("Error writing report to ".concat(_this.argv.outputFile, ":") + e.message);
                });
              case 12:
                _context.n = 15;
                break;
              case 13:
                if (!(report.errorCount > 0 || _this.argv.warnAsError)) {
                  _context.n = 14;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError(s);
              case 14:
                qx.tool.compiler.Console.info(s);
              case 15:
                _context.n = 17;
                break;
              case 16:
                qx.tool.compiler.Console.info("No errors found!");
              case 17:
                return _context.a(2);
            }
          }, _callee);
        }))();
      }),
      /**
       * Scan all libraries and add the namespace to globals
       * @param {Object} data
       * @return {Promise<void>}
       */
      __P_478_1: function __P_478_1(data) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var result;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                result = {};
                if (!data.libraries) {
                  _context3.n = 1;
                  break;
                }
                _context3.n = 1;
                return qx.Promise.all(data.libraries.map(/*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(dir) {
                    var lib, s, libs;
                    return _regenerator().w(function (_context2) {
                      while (1) switch (_context2.n) {
                        case 0:
                          _context2.n = 1;
                          return qx.tool.compiler.app.Library.createLibrary(dir);
                        case 1:
                          lib = _context2.v;
                          s = lib.getNamespace();
                          libs = s.split(".");
                          result[libs[0]] = false;
                        case 2:
                          return _context2.a(2);
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 1:
                return _context3.a(2, result);
            }
          }, _callee3);
        }))();
      },
      /**
       * Apply fixes before linting code
       * @return {Promise<void>}
       * @private
       */
      __P_478_0: function __P_478_0(files) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var fixParams, regex, replaceInFiles;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                fixParams = _this2.argv.fixJsdocParams;
                if (!(fixParams && fixParams !== "off")) {
                  _context4.n = 1;
                  break;
                }
                regex = fixParams === "type-first" ? /@param\s+([\w$]+)\s+({[\w|[\]{}<>?. ]+})/g : /@param\s+({[\w|[\]{}<>?. ]+})\s+([\w$]+)/g;
                replaceInFiles = {
                  files: files,
                  from: regex,
                  to: "@param $2 $1"
                };
                _context4.n = 1;
                return replaceInFile(replaceInFiles);
              case 1:
                return _context4.a(2);
            }
          }, _callee4);
        }))();
      }
    }
  });
  qx.tool.cli.commands.Lint.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Lint.js.map?dt=1782967161343