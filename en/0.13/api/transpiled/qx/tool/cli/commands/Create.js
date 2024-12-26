function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      "qx.tool.cli.commands.Command": {
        "require": true
      },
      "qx.tool.utils.Utils": {},
      "qx.tool.config.Utils": {},
      "qx.tool.compiler.Console": {}
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
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (info@bibliograph.org, @cboulanger)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */
  var fs = require("fs");
  var path = require("upath");
  var inquirer = require("inquirer");

  /**
   * Create a new qooxdoo project. This will assemble the information needed to create the
   * new project by the following ways, in order of precedence:
   * 1. use parameters passed to the CLI command via the options
   * 2. if available, retrieve the info from the given environment
   * 3. ask the user the missing values interactively, offering default values where available
   * The variables needed are stored in the templates/template_vars.js file, together
   * with some metadata.
   *
   * Issues: automatic determination of qooxdoo path doesn't work yet.
   */
  qx.Class.define("qx.tool.cli.commands.Create", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "create <application namespace> [options]",
          describe: "create a new qooxdoo project",
          builder: {
            type: {
              alias: "t",
              describe: "Type of the application to create. Must be one of " + this.getSkeletonNames().join(", "),
              nargs: 1,
              requiresArg: true,
              type: "string"
            },
            out: {
              alias: "o",
              describe: "Output directory for the application content."
            },
            namespace: {
              alias: "s",
              describe: "Top-level namespace."
            },
            name: {
              alias: "n",
              describe: "Name of application/library (defaults to namespace)."
            },
            theme: {
              describe: "The name of the theme to be used.",
              "default": "indigo"
            },
            icontheme: {
              describe: "The name of the icon theme to be used.",
              "default": "Tango"
            },
            noninteractive: {
              alias: "I",
              describe: "Do not prompt for missing values"
            },
            verbose: {
              alias: "v",
              describe: "Verbose logging"
            }
          }
        };
      },
      /**
       * Returns the names of the skeleton directories in the template folder
       * @returns {string[]}
       */
      getSkeletonNames: function getSkeletonNames() {
        // need access to an non static method...
        var dir = path.join(qx.tool.utils.Utils.getTemplateDir(), "skeleton");
        var res = fs.readdirSync(dir).filter(function (entry) {
          try {
            return fs.existsSync("".concat(dir, "/").concat(entry, "/Manifest.tmpl.json"));
          } catch (e) {
            return false;
          }
        });
        return res;
      }
    },
    members: {
      /**
       * Creates a new qooxdoo application
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var argv, data, questions, values, template_vars, template_vars_path, _iterator, _step, var_name, v, deflt, message, answers, _iterator2, _step2, _var_name, value, authors, appdir, parentDir, app_type, skeleton_dir, that, traverseFileSystem;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                traverseFileSystem = function _traverseFileSystem(sourceDir, targetDir) {
                  var files = fs.readdirSync(sourceDir);
                  var _iterator3 = _createForOfIteratorHelper(files),
                    _step3;
                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      var part = _step3.value;
                      var sourceFile = path.join(sourceDir, part);
                      var stats = fs.statSync(sourceFile);
                      if (stats.isFile()) {
                        var targetFile = path.join(targetDir, part.replace(/\.tmpl/, ""));
                        if (sourceFile.includes(".tmpl")) {
                          // template file
                          var template = fs.readFileSync(sourceFile, "utf-8");
                          for (var var_name in values) {
                            template = template.replace(new RegExp("\\${".concat(var_name, "}"), "g"), values[var_name]);
                          }
                          if (argv.verbose) {
                            qx.tool.compiler.Console.info(">>> Creating ".concat(targetFile, " from template ").concat(sourceFile, "..."));
                          }
                          // that.log(template);
                          if (fs.existsSync(targetFile)) {
                            throw new qx.tool.utils.Utils.UserError("".concat(targetFile, " already exists."));
                          }
                          fs.writeFileSync(targetFile, template, "utf-8");
                        } else {
                          // normal file
                          if (argv.verbose) {
                            qx.tool.compiler.Console.info(">>> Copying ".concat(sourceFile, " to ").concat(targetFile, "..."));
                          }
                          fs.copyFileSync(sourceFile, targetFile);
                        }
                      } else if (stats.isDirectory()) {
                        var newTargetDir = targetDir;
                        // replace "custon" with namespace, creating namespaced folders in the "class" dir, but not anywhere else
                        var parts = part === "custom" ? values.namespace.split(/\./) : [part];
                        var _iterator4 = _createForOfIteratorHelper(parts),
                          _step4;
                        try {
                          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                            var _part = _step4.value;
                            newTargetDir = path.join(newTargetDir, _part);
                            fs.mkdirSync(newTargetDir);
                          }
                        } catch (err) {
                          _iterator4.e(err);
                        } finally {
                          _iterator4.f();
                        }
                        traverseFileSystem(sourceFile, newTargetDir);
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                };
                // init
                argv = _this.argv;
                data = {};
                questions = [];
                values = {}; // qooxdoo path
                _context.next = 7;
                return _this.getQxPath();
              case 7:
                data.qooxdoo_path = _context.sent;
                _context.prev = 8;
                _context.next = 11;
                return qx.tool.config.Utils.getLibraryVersion(data.qooxdoo_path);
              case 11:
                data.qooxdoo_version = _context.sent;
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](8);
                qx.tool.compiler.Console.error(_context.t0.message);
                throw new qx.tool.utils.Utils.UserError("Cannot find qooxdoo framework folder.");
              case 18:
                // get map of metdata on variables that need to be inserted in the templates
                data.template_dir = qx.tool.utils.Utils.getTemplateDir();
                data.getLibraryVersion = qx.tool.config.Utils.getLibraryVersion.bind(qx.tool.config.Utils);
                template_vars_path = path.join(qx.tool.utils.Utils.getTemplateDir(), "template_vars");
                template_vars = require(template_vars_path)(argv, data);

                // prepare inquirer question data
                _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(template_vars));
                _context.prev = 23;
                _iterator.s();
              case 25:
                if ((_step = _iterator.n()).done) {
                  _context.next = 41;
                  break;
                }
                var_name = _step.value;
                v = template_vars[var_name];
                deflt = typeof v["default"] === "function" ? v["default"]() : v["default"]; // we have a final value that doesn't need to be asked for / confirmed.
                if (!(v.value !== undefined)) {
                  _context.next = 32;
                  break;
                }
                values[var_name] = typeof v.value === "function" ? v.value.call(values) : v.value;
                return _context.abrupt("continue", 39);
              case 32:
                if (!argv.noninteractive) {
                  _context.next = 37;
                  break;
                }
                if (!(v.optional || deflt)) {
                  _context.next = 36;
                  break;
                }
                values[var_name] = deflt;
                return _context.abrupt("continue", 39);
              case 36:
                throw new qx.tool.utils.Utils.UserError("Cannot skip required value for '".concat(var_name, "'."));
              case 37:
                // ask user
                message = "Please enter ".concat(v.description, " ").concat(v.optional ? "(optional)" : "", ":");
                questions.push({
                  type: v.type || "input",
                  choices: v.choices,
                  name: var_name,
                  message: message,
                  "default": v["default"],
                  validate: v.validate || function (answer, hash) {
                    return true;
                  }
                });
              case 39:
                _context.next = 25;
                break;
              case 41:
                _context.next = 46;
                break;
              case 43:
                _context.prev = 43;
                _context.t1 = _context["catch"](23);
                _iterator.e(_context.t1);
              case 46:
                _context.prev = 46;
                _iterator.f();
                return _context.finish(46);
              case 49:
                _context.prev = 49;
                _context.next = 52;
                return inquirer.prompt(questions);
              case 52:
                answers = _context.sent;
                _context.next = 58;
                break;
              case 55:
                _context.prev = 55;
                _context.t2 = _context["catch"](49);
                throw new qx.tool.utils.Utils.UserError(_context.t2.message);
              case 58:
                // finalize values
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(template_vars));
                _context.prev = 59;
                _iterator2.s();
              case 61:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 83;
                  break;
                }
                _var_name = _step2.value;
                value = values[_var_name]; // combine preset and inquirer data
                if (answers[_var_name] !== undefined) {
                  value = answers[_var_name];
                }

                // handle special cases
                _context.t3 = _var_name;
                _context.next = _context.t3 === "namespace" ? 68 : _context.t3 === "locales" ? 71 : _context.t3 === "authors" ? 73 : 80;
                break;
              case 68:
                if (value.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*\.?)+$/)) {
                  _context.next = 70;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Illegal characters in namespace \"".concat(value, ".\""));
              case 70:
                return _context.abrupt("break", 80);
              case 71:
                value = JSON.stringify(value.split(/,/).map(function (locale) {
                  return locale.trim();
                }));
                return _context.abrupt("break", 80);
              case 73:
                if (!(value === undefined)) {
                  _context.next = 76;
                  break;
                }
                values.author_map = "[]";
                return _context.abrupt("break", 80);
              case 76:
                authors = value.split(/,/).map(function (a) {
                  return a.trim();
                });
                values.author_map = JSON.stringify(authors.map(function (author) {
                  var parts = author.split(/ /);
                  var email = parts.pop();
                  return {
                    name: parts.join(" "),
                    email: email
                  };
                }), null, 2);
                value = authors.join("\n" + " ".repeat(12));
                return _context.abrupt("break", 80);
              case 80:
                // update value
                values[_var_name] = value;
              case 81:
                _context.next = 61;
                break;
              case 83:
                _context.next = 88;
                break;
              case 85:
                _context.prev = 85;
                _context.t4 = _context["catch"](59);
                _iterator2.e(_context.t4);
              case 88:
                _context.prev = 88;
                _iterator2.f();
                return _context.finish(88);
              case 91:
                // create application folder if it doesn't exist
                appdir = path.normalize(values.out);
                if (fs.existsSync(appdir)) {
                  _context.next = 104;
                  break;
                }
                parentDir = path.dirname(appdir);
                if (fs.existsSync(parentDir)) {
                  _context.next = 96;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Invalid directory ".concat(appdir));
              case 96:
                _context.prev = 96;
                fs.accessSync(parentDir, fs.constants.W_OK);
                _context.next = 103;
                break;
              case 100:
                _context.prev = 100;
                _context.t5 = _context["catch"](96);
                throw new qx.tool.utils.Utils.UserError("Directory ".concat(parentDir, " is not writable."));
              case 103:
                fs.mkdirSync(appdir);
              case 104:
                // skeleton dir might come from options or was input interactively
                app_type = argv.type || values.type;
                skeleton_dir = path.join(data.template_dir, "skeleton", app_type);
                if (!(argv.type && !fs.existsSync(skeleton_dir))) {
                  _context.next = 108;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Application type '".concat(argv.type, "' does not exist or has not been implemented yet."));
              case 108:
                // copy template, replacing template vars
                that = _this;
                // go
                traverseFileSystem.bind(_this)(skeleton_dir, appdir);
              case 110:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[8, 14], [23, 43, 46, 49], [49, 55], [59, 85, 88, 91], [96, 100]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands.Create.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Create.js.map?dt=1735222436188