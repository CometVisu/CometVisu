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
      "qx.tool.config.Manifest": {},
      "qx.tool.utils.Utils": {}
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
  
  ************************************************************************ */

  var fs = require("fs");
  var _process = require("process");
  var path = require("upath");
  var inquirer = require("inquirer");
  /**
   * Add a new script file to the current project, to be loaded by the qooxdoo boot loader
   *
   * Syntax: `qx add script path/to/script.js`
   *
   */
  qx.Class.define("qx.tool.cli.commands.add.Script", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "script <scriptpath> [options]",
          describe: "adds a new script file to the current project, to be loaded before application startup.",
          builder: {
            resourcedir: {
              describe: "The subdirectory of the resource folder in which to place the file",
              alias: "d",
              "default": "js"
            },
            rename: {
              describe: "Rename the file to the given name",
              alias: "r"
            },
            undo: {
              describe: "Removes the file that would normally be added with the given arguments",
              alias: "z"
            },
            noninteractive: {
              alias: "I",
              describe: "Do not prompt user"
            }
          }
        };
      }
    },
    members: {
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var manifestModel, namespace, script_path, script_name, resource_dir_path, resource_file_path, external_res_path, question, answer, script_list, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.config.Manifest.getInstance().load();
              case 1:
                manifestModel = _context.v;
                namespace = manifestModel.getValue("provides.namespace");
                script_path = _this.argv.scriptpath;
                script_name = path.basename(script_path);
                resource_dir_path = path.join(_process.cwd(), "source", "resource", namespace, _this.argv.resourcedir);
                resource_file_path = path.join(resource_dir_path, _this.argv.rename || script_name);
                external_res_path = path.join(namespace, _this.argv.resourcedir, _this.argv.rename || script_name); // validate file paths
                if (script_path.endsWith(".js")) {
                  _context.n = 2;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("File doesn't seem to be a javascript file.");
              case 2:
                _context.n = 3;
                return fs.existsAsync(script_path);
              case 3:
                _t = !_context.v;
                if (!_t) {
                  _context.n = 4;
                  break;
                }
                _t = !_this.argv.undo;
              case 4:
                if (!_t) {
                  _context.n = 5;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("File does not exist: ".concat(script_path));
              case 5:
                _context.n = 6;
                return fs.existsAsync(resource_file_path);
              case 6:
                _t2 = _context.v;
                if (!_t2) {
                  _context.n = 7;
                  break;
                }
                _t2 = !_this.argv.undo;
              case 7:
                if (!_t2) {
                  _context.n = 9;
                  break;
                }
                if (_this.argv.noninteractive) {
                  _context.n = 9;
                  break;
                }
                question = {
                  type: "confirm",
                  name: "doOverwrite",
                  message: "Script already exists and will be overwritten. Do you want to proceed?",
                  "default": "y"
                };
                _context.n = 8;
                return inquirer.prompt(question);
              case 8:
                answer = _context.v;
                if (!answer.doOverwrite) {
                  _process.exit(0);
                }
              case 9:
                // check manifest structure
                script_list = manifestModel.getValue("externalResources.script") || [];
                if (!_this.argv.undo) {
                  _context.n = 12;
                  break;
                }
                // undo, i.e. remove file from resource folder and Manifest
                if (script_list.includes(external_res_path)) {
                  script_list = script_list.filter(function (elem) {
                    return elem !== external_res_path;
                  });
                }
                _context.n = 10;
                return fs.existsAsync(resource_file_path);
              case 10:
                if (!_context.v) {
                  _context.n = 11;
                  break;
                }
                _context.n = 11;
                return fs.unlinkAsync(resource_file_path);
              case 11:
                _context.n = 16;
                break;
              case 12:
                _context.n = 13;
                return fs.existsAsync(resource_dir_path);
              case 13:
                if (_context.v) {
                  _context.n = 14;
                  break;
                }
                fs.mkdirSync(resource_dir_path, {
                  recursive: true,
                  mode: 493
                });
              case 14:
                _context.n = 15;
                return fs.copyFileAsync(script_path, resource_file_path);
              case 15:
                if (!script_list.includes(external_res_path)) {
                  script_list.push(external_res_path);
                }
              case 16:
                // save
                _this.debug(script_list);
                _context.n = 17;
                return manifestModel.setValue("externalResources.script", script_list).save();
              case 17:
                return _context.a(2);
            }
          }, _callee);
        }))();
      }
    }
  });
  qx.tool.cli.commands.add.Script.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Script.js.map?dt=1782595070328