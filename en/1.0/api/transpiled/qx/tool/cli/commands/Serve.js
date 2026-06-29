function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      "qx.tool.cli.commands.Compile": {
        "require": true
      },
      "qx.tool.utils.Website": {},
      "qx.tool.compiler.Console": {
        "defer": "runtime"
      },
      "qx.tool.config.Utils": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Ltd
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  var path = require("upath");
  var process = require("process");
  var express = require("express");
  var http = require("http");
  var fs = qx.tool.utils.Promisify.fs;
  require("app-module-path").addPath(process.cwd() + "/node_modules");
  /**
   * Compiles the project and serves it up as a web page
   */
  qx.Class.define("qx.tool.cli.commands.Serve", {
    extend: qx.tool.cli.commands.Compile,
    statics: {
      YARGS_BUILDER: {
        "listen-port": {
          alias: "p",
          describe: "The port for the web browser to listen on",
          type: "number",
          "default": 8080
        },
        "show-startpage": {
          alias: "S",
          describe: "Show the startpage with the list of applications and additional information",
          type: "boolean",
          "default": null
        },
        "rebuild-startpage": {
          alias: "R",
          describe: "Rebuild the startpage with the list of applications and additional information",
          type: "boolean",
          "default": false
        }
      },
      getYargsCommand: function getYargsCommand() {
        return {
          command: "serve",
          describe: "runs a webserver to run the current application with continuous compilation, using compile.json",
          builder: function () {
            var res = Object.assign({}, qx.tool.cli.commands.Compile.YARGS_BUILDER, qx.tool.cli.commands.Serve.YARGS_BUILDER);
            delete res.watch;
            return res;
          }()
        };
      }
    },
    events: {
      /**
       * Fired before server start
       *
       * The event data is an object with the following properties:
       *   server: the http server
       *   application: the used express server instance
       *   outputdir: the qooxdoo app output dir
       */
      beforeStart: "qx.event.type.Data",
      /**
       * Fired when server is started
       */
      afterStart: "qx.event.type.Event"
    },
    members: {
      /*
       * @Override
       */
      process: function process() {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var website;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this.argv.watch = true;
                _this.argv["machine-readable"] = false;
                _this.argv["feedback"] = false;

                // build website if it hasn't been built yet.
                website = new qx.tool.utils.Website();
                _context.n = 1;
                return fs.existsAsync(website.getTargetDir());
              case 1:
                if (_context.v) {
                  _context.n = 3;
                  break;
                }
                qx.tool.compiler.Console.info(">>> Building startpage...");
                _context.n = 2;
                return website.rebuildAll();
              case 2:
                _context.n = 4;
                break;
              case 3:
                if (_this.argv.rebuildStartpage) {
                  website.startWatcher();
                }
              case 4:
                _this.addListenerOnce("made", function () {
                  _this.runWebServer();
                });
                return _context.a(2, qx.tool.cli.commands.Serve.superclass.prototype.process.call(_this));
            }
          }, _callee);
        }))();
      },
      /**
       *
       * returns the showStartpage flag
       *
       */
      showStartpage: function showStartpage() {
        return this.__P_481_0;
      },
      /**
       * Runs the web server
       */
      runWebServer: function runWebServer() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var makers, apps, defaultMaker, firstMaker, config, app, website, s, appsData, server;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                makers = _this2.getMakers().filter(function (maker) {
                  return maker.getApplications().some(function (app) {
                    return app.getStandalone();
                  });
                });
                apps = [];
                defaultMaker = null;
                firstMaker = null;
                makers.forEach(function (maker) {
                  maker.getApplications().forEach(function (app) {
                    if (app.isBrowserApp() && app.getStandalone()) {
                      apps.push(app);
                      if (firstMaker === null) {
                        firstMaker = maker;
                      }
                      if (defaultMaker === null && app.getWriteIndexHtmlToRoot()) {
                        defaultMaker = maker;
                      }
                    }
                  });
                });
                if (!defaultMaker && apps.length === 1) {
                  defaultMaker = firstMaker;
                }
                _this2.__P_481_0 = _this2.argv.showStartpage;
                if (_this2.__P_481_0 === undefined || _this2.__P_481_0 === null) {
                  _this2.__P_481_0 = defaultMaker === null;
                }
                config = _this2.getCompilerApi().getConfiguration();
                app = express();
                app.use(function (req, res, next) {
                  res.set({
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
                    "Content-Security-Policy": "default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src * data: blob: 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src * data: blob: ; style-src * data: blob: 'unsafe-inline'; font-src * data: blob: 'unsafe-inline';"
                  });
                  next();
                });
                website = new qx.tool.utils.Website();
                if (_this2.__P_481_0) {
                  _context2.n = 1;
                  break;
                }
                app.use("/", express["static"](defaultMaker.getTarget().getOutputDir()));
                _context2.n = 5;
                break;
              case 1:
                _context2.n = 2;
                return qx.tool.config.Utils.getQxPath();
              case 2:
                s = _context2.v;
                _context2.n = 3;
                return fs.existsAsync(path.join(s, "docs"));
              case 3:
                if (_context2.v) {
                  _context2.n = 4;
                  break;
                }
                s = path.dirname(s);
              case 4:
                app.use("/docs", express["static"](path.join(s, "docs")));
                app.use("/apps", express["static"](path.join(s, "apps")));
                app.use("/", express["static"](website.getTargetDir()));
                appsData = [];
                makers.forEach(function (maker) {
                  var target = maker.getTarget();
                  var out = path.normalize("/" + target.getOutputDir());
                  app.use(out, express["static"](target.getOutputDir()));
                  appsData.push({
                    target: {
                      type: target.getType(),
                      outputDir: out
                    },
                    apps: maker.getApplications().filter(function (app) {
                      return app.getStandalone();
                    }).map(function (app) {
                      return {
                        isBrowser: app.isBrowserApp(),
                        name: app.getName(),
                        type: app.getType(),
                        title: app.getTitle() || app.getName(),
                        appClass: app.getClassName(),
                        description: app.getDescription(),
                        outputPath: target.getProjectDir(app) // no trailing slash or link will break
                      };
                    })
                  });
                });
                app.get("/serve.api/apps.json", function (req, res) {
                  res.set("Content-Type", "application/json");
                  res.send(JSON.stringify(appsData, null, 2));
                });
              case 5:
                server = http.createServer(app);
                _this2.fireDataEvent("beforeStart", {
                  server: server,
                  application: app,
                  outputdir: defaultMaker.getTarget().getOutputDir()
                });
                server.on("error", function (e) {
                  if (e.code === "EADDRINUSE") {
                    qx.tool.compiler.Console.print("qx.tool.cli.serve.webAddrInUse", config.serve.listenPort);
                    process.exit(1);
                  } else {
                    qx.tool.compiler.Console.log("Error when starting web server: " + e);
                  }
                });
                server.listen(config.serve.listenPort, function () {
                  qx.tool.compiler.Console.print("qx.tool.cli.serve.webStarted", "http://localhost:" + config.serve.listenPort);
                  _this2.fireEvent("afterStart");
                });
              case 6:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      __P_481_0: null
    },
    defer: function defer(statics) {
      qx.tool.compiler.Console.addMessageIds({
        "qx.tool.cli.serve.webStarted": "Web server started, please browse to %1",
        "qx.tool.cli.serve.webAddrInUse": "Web server cannot start because port %1 is already in use"
      });
    }
  });
  qx.tool.cli.commands.Serve.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Serve.js.map?dt=1782705792405