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
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var argv, data, questions, values, template_vars, template_vars_path, _iterator, _step, var_name, v, deflt, message, answers, _iterator2, _step2, _var_name, value, authors, appdir, parentDir, app_type, skeleton_dir, that, traverseFileSystem, _t, _t2, _t3, _t4, _t5, _t6;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
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
                _context.n = 1;
                return _this.getQxPath();
              case 1:
                data.qooxdoo_path = _context.v;
                _context.p = 2;
                _context.n = 3;
                return qx.tool.config.Utils.getLibraryVersion(data.qooxdoo_path);
              case 3:
                data.qooxdoo_version = _context.v;
                _context.n = 5;
                break;
              case 4:
                _context.p = 4;
                _t = _context.v;
                qx.tool.compiler.Console.error(_t.message);
                throw new qx.tool.utils.Utils.UserError("Cannot find qooxdoo framework folder.");
              case 5:
                // get map of metdata on variables that need to be inserted in the templates
                data.template_dir = qx.tool.utils.Utils.getTemplateDir();
                data.getLibraryVersion = qx.tool.config.Utils.getLibraryVersion.bind(qx.tool.config.Utils);
                template_vars_path = path.join(qx.tool.utils.Utils.getTemplateDir(), "template_vars");
                template_vars = require(template_vars_path)(argv, data);

                // prepare inquirer question data
                _iterator = _createForOfIteratorHelper(Object.getOwnPropertyNames(template_vars));
                _context.p = 6;
                _iterator.s();
              case 7:
                if ((_step = _iterator.n()).done) {
                  _context.n = 12;
                  break;
                }
                var_name = _step.value;
                v = template_vars[var_name];
                deflt = typeof v["default"] === "function" ? v["default"]() : v["default"]; // we have a final value that doesn't need to be asked for / confirmed.
                if (!(v.value !== undefined)) {
                  _context.n = 8;
                  break;
                }
                values[var_name] = typeof v.value === "function" ? v.value.call(values) : v.value;
                return _context.a(3, 11);
              case 8:
                if (!argv.noninteractive) {
                  _context.n = 10;
                  break;
                }
                if (!(v.optional || deflt)) {
                  _context.n = 9;
                  break;
                }
                values[var_name] = deflt;
                return _context.a(3, 11);
              case 9:
                throw new qx.tool.utils.Utils.UserError("Cannot skip required value for '".concat(var_name, "'."));
              case 10:
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
              case 11:
                _context.n = 7;
                break;
              case 12:
                _context.n = 14;
                break;
              case 13:
                _context.p = 13;
                _t2 = _context.v;
                _iterator.e(_t2);
              case 14:
                _context.p = 14;
                _iterator.f();
                return _context.f(14);
              case 15:
                _context.p = 15;
                _context.n = 16;
                return inquirer.prompt(questions);
              case 16:
                answers = _context.v;
                _context.n = 18;
                break;
              case 17:
                _context.p = 17;
                _t3 = _context.v;
                throw new qx.tool.utils.Utils.UserError(_t3.message);
              case 18:
                // finalize values
                _iterator2 = _createForOfIteratorHelper(Object.getOwnPropertyNames(template_vars));
                _context.p = 19;
                _iterator2.s();
              case 20:
                if ((_step2 = _iterator2.n()).done) {
                  _context.n = 28;
                  break;
                }
                _var_name = _step2.value;
                value = values[_var_name]; // combine preset and inquirer data
                if (answers[_var_name] !== undefined) {
                  value = answers[_var_name];
                }

                // handle special cases
                _t4 = _var_name;
                _context.n = _t4 === "namespace" ? 21 : _t4 === "locales" ? 23 : _t4 === "authors" ? 24 : 26;
                break;
              case 21:
                if (value.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*\.?)+$/)) {
                  _context.n = 22;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Illegal characters in namespace \"".concat(value, ".\""));
              case 22:
                return _context.a(3, 26);
              case 23:
                value = JSON.stringify(value.split(/,/).map(function (locale) {
                  return locale.trim();
                }));
                return _context.a(3, 26);
              case 24:
                if (!(value === undefined)) {
                  _context.n = 25;
                  break;
                }
                values.author_map = "[]";
                return _context.a(3, 26);
              case 25:
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
                return _context.a(3, 26);
              case 26:
                // update value
                values[_var_name] = value;
              case 27:
                _context.n = 20;
                break;
              case 28:
                _context.n = 30;
                break;
              case 29:
                _context.p = 29;
                _t5 = _context.v;
                _iterator2.e(_t5);
              case 30:
                _context.p = 30;
                _iterator2.f();
                return _context.f(30);
              case 31:
                // create application folder if it doesn't exist
                appdir = path.normalize(values.out);
                if (fs.existsSync(appdir)) {
                  _context.n = 35;
                  break;
                }
                parentDir = path.dirname(appdir);
                if (fs.existsSync(parentDir)) {
                  _context.n = 32;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Invalid directory ".concat(appdir));
              case 32:
                _context.p = 32;
                fs.accessSync(parentDir, fs.constants.W_OK);
                _context.n = 34;
                break;
              case 33:
                _context.p = 33;
                _t6 = _context.v;
                throw new qx.tool.utils.Utils.UserError("Directory ".concat(parentDir, " is not writable."));
              case 34:
                fs.mkdirSync(appdir);
              case 35:
                // skeleton dir might come from options or was input interactively
                app_type = argv.type || values.type;
                skeleton_dir = path.join(data.template_dir, "skeleton", app_type);
                if (!(argv.type && !fs.existsSync(skeleton_dir))) {
                  _context.n = 36;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Application type '".concat(argv.type, "' does not exist or has not been implemented yet."));
              case 36:
                // copy template, replacing template vars
                that = _this;
                // go
                traverseFileSystem.bind(_this)(skeleton_dir, appdir);
              case 37:
                return _context.a(2);
            }
          }, _callee, null, [[32, 33], [19, 29, 30, 31], [15, 17], [6, 13, 14, 15], [2, 4]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands.Create.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Create.js.map?dt=1782705792036