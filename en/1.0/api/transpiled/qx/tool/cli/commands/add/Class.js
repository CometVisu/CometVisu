function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
  /**
   * Add a new class file to the current project, based on a template.
   *
   * Syntax: `qx add class <classname> [--type=template_name] [--extend=extended_class] [--import] [--from-pkg=package_name]`
   * If omitted, `--type` defaults to "default". The path to the template file will be calculated as follows:
   * 1. transform template_name to ${template_name}.tmpl.js
   * 2. check if this file exists in the "templates/class" folder
   *    a. of a package, if the --from-pkg paramater wass passed (not implemented)
   *    b. otherwise, of the current project
   *    c. finally, of the CLI library
   *
   * If the --import flag is set, copy the template to the templates/class folder of the current project,
   * so it can be customized and used instead of the one shipped with the CLI.
   *
   * If you place a file named `header.js` in the root of your project, this header will be used verbatim
   * as the ${header} template variable instead of the generic header template, which is populated with
   * information from Manifest.json
   *
   * (Package support is not yet implemented)
   *
   */
  qx.Class.define("qx.tool.cli.commands.add.Class", {
    extend: qx.tool.cli.commands.Command,
    statics: {
      getYargsCommand: function getYargsCommand() {
        return {
          command: "class <classname> [options]",
          describe: "adds a new class file to the current project, based on a template.",
          builder: {
            type: {
              alias: "t",
              describe: "the type of the class (optional).",
              "default": "default"
            },
            extend: {
              alias: "e",
              describe: "the base class of the new class"
            },
            "import": {
              describe: "import the template to the `templates/class` folder of the current project, where it can be customized"
            },
            force: {
              alias: "f",
              describe: "overwrite an existing file"
            }
          }
        };
      }
    },
    members: {
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var argv, manifestConfig, manifestData, values, class_namespaces, manifest_namepaces, template_name, template_path, potential_dirs, found, _i, _potential_dirs, dir, template, header_template, header_template_path, var_name, final_content, _var_name, relative_path, absolute_path, file_exists, local_templates_path, local_copy_path, _t, _t2;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                argv = _this.argv; // read Manifest.json
                _context.n = 1;
                return qx.tool.config.Manifest.getInstance().load();
              case 1:
                manifestConfig = _context.v;
                manifestData = manifestConfig.getData(); // prepare template vars
                values = Object.assign({}, manifestData.info, manifestData.provides); // @todo Add support for authors, ask interactively if author info should be taken
                // from Manifest or entered manually, then create string representation to insert.
                values.authors = "";
                values.classname = argv.classname;
                values.extend = argv.extend ? argv.extend : "qx.core.Object";

                // @todo ask interactively for copyright holder, create a setting in Manifest.json
                values.copyright = new Date().getFullYear();

                // check top-level namespace
                class_namespaces = argv.classname.split(/\./);
                manifest_namepaces = values.namespace.split(/\./);
                if (!(class_namespaces[0] !== manifest_namepaces[0])) {
                  _context.n = 2;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Invalid top namespace '".concat(class_namespaces[0], "'. Must be '").concat(manifest_namepaces[0], "'."));
              case 2:
                // get path to the template file
                template_name = argv.type;
                potential_dirs = [
                // 1. in the templates/class dir of the current project
                path.join(_process.cwd(), "templates"),
                // 2. in the templates/class dir of cli
                qx.tool.utils.Utils.getTemplateDir()
                // 3. @todo: in a package's templates dir
                ];
                found = false;
                _i = 0, _potential_dirs = potential_dirs;
              case 3:
                if (!(_i < _potential_dirs.length)) {
                  _context.n = 6;
                  break;
                }
                dir = _potential_dirs[_i];
                template_path = path.join(dir, "class", template_name + ".tmpl.js");
                _context.n = 4;
                return fs.existsAsync(template_path);
              case 4:
                if (!_context.v) {
                  _context.n = 5;
                  break;
                }
                found = true;
                return _context.a(3, 6);
              case 5:
                _i++;
                _context.n = 3;
                break;
              case 6:
                if (found) {
                  _context.n = 7;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Template ".concat(template_name, " does not exist."));
              case 7:
                _context.n = 8;
                return fs.readFileAsync(template_path, "utf-8");
              case 8:
                template = _context.v;
                header_template_path = path.join(_process.cwd(), "header.js");
                try {
                  header_template = fs.readFileSync(header_template_path, "utf-8");
                } catch (e) {
                  // if none exists, use header template in the same folder as the template itself
                  header_template_path = path.join(path.dirname(template_path), "header.tmpl.js");
                  try {
                    header_template = fs.readFileSync(header_template_path, "utf-8");
                  } catch (e) {}
                }
                if (header_template) {
                  // replace template vars in header
                  if (header_template_path.includes(".tmpl.js")) {
                    for (var_name in values) {
                      header_template = header_template.replace(new RegExp("\\${".concat(var_name, "}"), "g"), values[var_name]);
                    }
                  }
                  values.header = header_template;
                }

                // replace template vars
                final_content = template;
                for (_var_name in values) {
                  final_content = final_content.replace(new RegExp("\\${".concat(_var_name, "}"), "g"), values[_var_name]);
                }
                // check if file already exists
                relative_path = path.join.apply(path, ["source", "class"].concat(_toConsumableArray(class_namespaces))) + ".js";
                absolute_path = path.join(_process.cwd(), relative_path);
                file_exists = false;
                try {
                  fs.accessSync(absolute_path);
                  file_exists = true;
                } catch (e) {}
                if (!(file_exists && !argv.force)) {
                  _context.n = 9;
                  break;
                }
                throw new qx.tool.utils.Utils.UserError("Class file ".concat(relative_path, " already exists. Use --force to overwrite it"));
              case 9:
                _context.p = 9;
                fs.mkdirSync(path.dirname(absolute_path), {
                  recursive: true,
                  mode: 493
                });
                _context.n = 10;
                return fs.writeFileAsync(absolute_path, final_content, "utf-8");
              case 10:
                _context.n = 12;
                break;
              case 11:
                _context.p = 11;
                _t = _context.v;
                throw new qx.tool.utils.Utils.UserError("Cannot write to ".concat(absolute_path, ": ").concat(_t.message));
              case 12:
                if (!argv["import"]) {
                  _context.n = 16;
                  break;
                }
                local_templates_path = path.join(_process.cwd(), "templates", "class");
                local_copy_path = path.join(local_templates_path, path.basename(template_path));
                _context.p = 13;
                fs.mkdirSync(path.dirname(local_templates_path), {
                  recursive: true,
                  mode: 493
                });
                _context.n = 14;
                return fs.writeFileAsync(local_copy_path, template, "utf-8");
              case 14:
                _context.n = 16;
                break;
              case 15:
                _context.p = 15;
                _t2 = _context.v;
                throw new qx.tool.utils.Utils.UserError("Cannot copy template to ".concat(local_templates_path, ": ").concat(_t2.message));
              case 16:
                return _context.a(2);
            }
          }, _callee, null, [[13, 15], [9, 11]]);
        }))();
      }
    }
  });
  qx.tool.cli.commands.add.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1782705792537