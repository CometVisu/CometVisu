function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var website;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _this.argv.watch = true;
                _this.argv["machine-readable"] = false;
                _this.argv["feedback"] = false;

                // build website if it hasn't been built yet.
                website = new qx.tool.utils.Website();
                _context.next = 6;
                return fs.existsAsync(website.getTargetDir());
              case 6:
                if (_context.sent) {
                  _context.next = 12;
                  break;
                }
                qx.tool.compiler.Console.info(">>> Building startpage...");
                _context.next = 10;
                return website.rebuildAll();
              case 10:
                _context.next = 13;
                break;
              case 12:
                if (_this.argv.rebuildStartpage) {
                  website.startWatcher();
                }
              case 13:
                _this.addListenerOnce("made", function () {
                  _this.runWebServer();
                });
                return _context.abrupt("return", qx.tool.cli.commands.Serve.superclass.prototype.process.call(_this));
              case 15:
              case "end":
                return _context.stop();
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
        return this.__P_470_0;
      },
      /**
       * Runs the web server
       */
      runWebServer: function runWebServer() {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var makers, apps, defaultMaker, firstMaker, config, app, website, s, appsData, server;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
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
                _this2.__P_470_0 = _this2.argv.showStartpage;
                if (_this2.__P_470_0 === undefined || _this2.__P_470_0 === null) {
                  _this2.__P_470_0 = defaultMaker === null;
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
                if (_this2.__P_470_0) {
                  _context2.next = 16;
                  break;
                }
                app.use("/", express["static"](defaultMaker.getTarget().getOutputDir()));
                _context2.next = 29;
                break;
              case 16:
                _context2.next = 18;
                return qx.tool.config.Utils.getQxPath();
              case 18:
                s = _context2.sent;
                _context2.next = 21;
                return fs.existsAsync(path.join(s, "docs"));
              case 21:
                if (_context2.sent) {
                  _context2.next = 23;
                  break;
                }
                s = path.dirname(s);
              case 23:
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
              case 29:
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
              case 33:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      __P_470_0: null
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

//# sourceMappingURL=Serve.js.map?dt=1729101251602