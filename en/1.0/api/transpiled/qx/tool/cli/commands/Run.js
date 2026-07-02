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
      "qx.tool.cli.commands.Compile": {
        "require": true
      },
      "qx.tool.compiler.Console": {
        "defer": "runtime"
      },
      "qx.tool.utils.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var path = require("upath");
  var _process = require("process");

  /**
   * Runs a server application
   */
  qx.Class.define("qx.tool.cli.commands.Run", {
    extend: qx.tool.cli.commands.Compile,
    statics: {
      YARGS_BUILDER: {
        inspect: {
          describe: "Whether to start node for debugging (ie with the --inspect argument)",
          type: "boolean",
          "default": false
        },
        "inspect-brk": {
          describe: "Whether to start node for debugging and break immediately (ie with the --inspect-brk argument)",
          type: "boolean",
          "default": false
        }
      },
      getYargsCommand: function getYargsCommand() {
        return {
          command: "run [configFile]",
          describe: "runs a server application (written in node) with continuous compilation, using compile.json",
          builder: Object.assign({}, qx.tool.cli.commands.Compile.YARGS_BUILDER, qx.tool.cli.commands.Run.YARGS_BUILDER)
        };
      }
    },
    members: {
      /*
       * @Override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var config, maker, app, target, scriptname, args, debug, cmd, restartNeeded;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _this.argv.watch = true;
                _this.argv["machine-readable"] = false;
                _this.argv["feedback"] = false;
                _context2.n = 1;
                return qx.tool.cli.commands.Run.superclass.prototype.process.call(_this);
              case 1:
                config = _this.getCompilerApi().getConfiguration();
                if (!config.run) {
                  qx.tool.compiler.Console.print("qx.tool.cli.run.noRunConfig");
                  _process.exit(1);
                }
                if (!config.run.application) {
                  qx.tool.compiler.Console.print("qx.tool.cli.run.noAppName");
                  _process.exit(1);
                }
                maker = null;
                app = null;
                _this.getMakers().forEach(function (tmp) {
                  var apps = tmp.getApplications().filter(function (app) {
                    return app.getName() == config.run.application;
                  });
                  if (apps.length) {
                    if (maker) {
                      qx.tool.compiler.Console.print("qx.tool.cli.run.tooManyMakers");
                      _process.exit(1);
                    }
                    if (apps.length != 1) {
                      qx.tool.compiler.Console.print("qx.tool.cli.run.tooManyApplications");
                      _process.exit(1);
                    }
                    maker = tmp;
                    app = apps[0];
                  }
                });
                if (!app) {
                  qx.tool.compiler.Console.print("qx.tool.cli.run.noAppName");
                  _process.exit(1);
                }
                if (app.getType() != "node") {
                  qx.tool.compiler.Console.print("qx.tool.cli.run.mustBeNode");
                  _process.exit(1);
                }
                target = maker.getTarget();
                scriptname = path.join(target.getApplicationRoot(app), "index.js");
                args = config.run.arguments || "";
                debug = "";
                if (_this.argv["inspect-brk"]) {
                  debug = " --inspect-brk";
                } else if (_this.argv["inspect"]) {
                  debug = " --inspect";
                }
                cmd = "node".concat(debug, " ").concat(scriptname, " ").concat(args);
                restartNeeded = true;
                _this.addListener("making", function (evt) {
                  restartNeeded = false;
                });
                _this.addListener("writtenApplication", function (evt) {
                  if (app === evt.getData()) {
                    restartNeeded = true;
                  }
                });

                /* eslint-disable @qooxdoo/qx/no-illegal-private-usage */
                _this.addListener("made", /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
                    var child, _t;
                    return _regenerator().w(function (_context) {
                      while (1) switch (_context.p = _context.n) {
                        case 0:
                          if (!_this.__P_480_0) {
                            _context.n = 5;
                            break;
                          }
                          if (restartNeeded) {
                            _context.n = 1;
                            break;
                          }
                          return _context.a(2);
                        case 1:
                          _context.p = 1;
                          _context.n = 2;
                          return qx.tool.utils.Utils.killTree(_this.__P_480_0.pid);
                        case 2:
                          _context.n = 4;
                          break;
                        case 3:
                          _context.p = 3;
                          _t = _context.v;
                        case 4:
                          _this.__P_480_0 = null;
                        case 5:
                          console.log("Starting application: " + cmd);
                          child = _this.__P_480_0 = require("child_process").exec(cmd);
                          child.stdout.setEncoding("utf8");
                          child.stdout.on("data", function (data) {
                            console.log(data);
                          });
                          child.stderr.setEncoding("utf8");
                          child.stderr.on("data", function (data) {
                            console.error(data);
                          });
                          child.on("close", function (code) {
                            console.log("Application has terminated");
                            this.__P_480_0 = null;
                          });
                          child.on("error", function (err) {
                            console.error("Application has failed: " + err);
                          });
                        case 6:
                          return _context.a(2);
                      }
                    }, _callee, null, [[1, 3]]);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      }
    },
    defer: function defer(statics) {
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.run.noRunConfig": "Cannot run anything because the config.json does not have a `run` configuration",
        "qx.tool.cli.run.noAppName": "Cannot run anything because the config.json does not specify a unique application name",
        "qx.tool.cli.run.mustBeNode": "The application %1 is not a node application (only node applications are supported)",
        "qx.tool.cli.run.tooManyMakers": "Cannot run anything because multiple targets are detected",
        "qx.tool.cli.run.tooManyApplications": "Cannot run anything because multiple applications are detected"
      }, "error");
    }
  });
  qx.tool.cli.commands.Run.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Run.js.map?dt=1782967161454