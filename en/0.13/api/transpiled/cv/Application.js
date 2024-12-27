function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Native": {
        "construct": true,
        "require": true
      },
      "qx.ui.command.GroupManager": {
        "construct": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.io.PartLoader": {
        "construct": true
      },
      "qx.bom.PageVisibility": {
        "construct": true
      },
      "qx.io.request.Xhr": {
        "construct": true
      },
      "qx.util.Uri": {},
      "qx.util.LibraryManager": {},
      "cv.io.Client": {},
      "cv.Config": {},
      "cv.io.Mockup": {},
      "cv.io.openhab.Rest": {},
      "cv.io.mqtt.Client": {},
      "qx.bom.Blocker": {},
      "cv.ConfigCache": {},
      "qx.event.GlobalError": {
        "require": true
      },
      "cv.report.Record": {},
      "cv.Version": {},
      "qx.ui.command.Command": {},
      "cv.TemplateEngine": {},
      "cv.log.appender.Native": {},
      "qx.bom.Stylesheet": {},
      "qx.util.ResourceManager": {},
      "qx.event.Registration": {},
      "cv.core.notifications.Router": {},
      "qx.event.Timer": {},
      "qx.event.message.Bus": {},
      "qx.bom.History": {},
      "cv.data.FileWorker": {},
      "qx.log.Logger": {},
      "qx.core.Init": {},
      "qx.core.WindowError": {},
      "qx.dev.StackTrace": {},
      "cv.ui.PopupHandler": {},
      "cv.util.Location": {},
      "qx.bom.Lifecycle": {},
      "cv.ui.NotificationCenter": {},
      "cv.ui.ToastManager": {},
      "cv.util.ConfigLoader": {},
      "cv.util.ScriptLoader": {},
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "cv.ui.structure.WidgetFactory": {},
      "qx.Part": {},
      "cv.io.rest.Client": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.globalErrorHandling": {
          "load": true,
          "className": "qx.event.GlobalError"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Application.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * This is the main application class of the CometVisu.
   *
   * @asset(demo/*)
   * @asset(designs/*)
   * @asset(icons/*)
   * @asset(sentry/*)
   * @asset(test/*)
   *
   * @require(qx.bom.Html,cv.ui.PopupHandler)
   */
  qx.Class.define('cv.Application', {
    extend: qx.application.Native,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      var _this = this;
      qx.application.Native.constructor.call(this);
      this.__P_2_0 = false;
      this.initCommandManager(new qx.ui.command.GroupManager());
      var lang = qx.locale.Manager.getInstance().getLanguage();
      if (qx.io.PartLoader.getInstance().hasPart(lang)) {
        qx.io.PartLoader.require([lang]);
      }
      var pageVis = qx.bom.PageVisibility.getInstance();
      pageVis.addListener('change', function () {
        _this.setActive(pageVis.getVisibilityState() === 'visible');
      });

      // install global shortcut for opening the manager
      if (window.parent && typeof window.parent.showManager === 'function') {
        window.showManager = window.parent.showManager;
      } else {
        window.showManager = this.showManager.bind(this);
      }
      if (window.parent && typeof window.parent.showConfigErrors === 'function') {
        window.showConfigErrors = window.parent.showConfigErrors;
      } else {
        window.showConfigErrors = this.showConfigErrors.bind(this);
      }

      // check HTTP server by requesting a small file
      var xhr = new qx.io.request.Xhr('version');
      xhr.set({
        method: 'GET'
      });
      var check = function check(e) {
        var req = e.getTarget();
        var header = req.getResponseHeader('Server');
        var isOpenHAB = false;
        if (header) {
          isOpenHAB = header.startsWith('Jetty');
        } else {
          header = req.getResponseHeader('X-CometVisu-Backend-Name');
          isOpenHAB = header === 'openhab';
        }
        _this.setServedByOpenhab(isOpenHAB);
        _this.setServerChecked(true);
      };
      xhr.addListenerOnce('success', check, this);
      xhr.addListenerOnce('statusError', check, this);
      xhr.addListenerOnce('error', function (e) {
        var req = e.getTarget();
        _this.error('error checking server environment needed to setup the REST url', req.getStatus());
      });
      xhr.send();
    },
    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      consoleCommands: [],
      __P_2_1: null,
      /**
       * Controller from the loaded structure injects itself here when loaded
       */
      structureController: null,
      _relResourcePath: null,
      _fullResourcePath: null,
      getRelativeResourcePath: function getRelativeResourcePath(fullPath) {
        if (!this._relResourcePath) {
          var baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
          this._relResourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')).substring(baseUrl.length + 1);
          if (!this._relResourcePath.endsWith('/')) {
            this._relResourcePath += '/';
          }
        }
        if (fullPath === true) {
          if (!this._fullResourcePath) {
            this._fullResourcePath = window.location.pathname.split('/').slice(0, -1).join('/') + '/' + this._relResourcePath;
          }
          return this._fullResourcePath;
        }
        return this._relResourcePath;
      },
      /**
       * Client factory method -> create a client
       * @param {...any} args
       * @return {cv.io.Client|cv.io.Mockup}
       */
      createClient: function createClient() {
        var Client = cv.io.Client;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (cv.Config.testMode === true || window.cvTestMode === true || args[0] === 'simulated') {
          Client = cv.io.Mockup;
        } else if (args[0] === 'openhab') {
          Client = cv.io.openhab.Rest;
          if (cv.Config.getStructure() === 'structure-pure' && !cv.Config.pluginsToLoad.includes('plugin-openhab')) {
            cv.Config.configSettings.pluginsToLoad.push('plugin-openhab');
          }
          if (args[1] && args[1].endsWith('/cv/l/')) {
            // we only need the rest path not the login resource
            args[1] = args[1].substring(0, args[1].indexOf('cv/'));
          }
        } else if (args[0] === 'mqtt') {
          Client = cv.io.mqtt.Client;
        }
        return _construct(Client, args);
      },
      /**
       * Register shortcuts to useful commands the user can execute in the browser console
       * @param shortcutName {String} command name used to install the command in the global namespace
       * @param command {Function} command to execute
       * @param help {String} some documentation about the command
       */
      registerConsoleCommand: function registerConsoleCommand(shortcutName, command, help) {
        // install command
        if (!(shortcutName in window)) {
          window[shortcutName] = command;
          this.consoleCommands.push(shortcutName + '() - ' + help);
        }
      }
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      root: {
        nullable: true
      },
      /**
       * true when structure part has been loaded
       */
      structureLoaded: {
        check: 'Boolean',
        init: false,
        event: 'changeStructureLoaded',
        apply: '_applyStructureLoaded'
      },
      commandManager: {
        check: 'qx.ui.command.GroupManager',
        deferredInit: true
      },
      active: {
        check: 'Boolean',
        init: true,
        event: 'changeActive'
      },
      inManager: {
        check: 'Boolean',
        init: false,
        apply: '_applyInManager'
      },
      managerDisabled: {
        check: 'Boolean',
        init: false,
        event: 'changeManagerDisabled'
      },
      managerDisabledReason: {
        check: 'String',
        nullable: true
      },
      managerChecked: {
        check: 'Boolean',
        init: false,
        apply: '_applyManagerChecked'
      },
      /**
       * Mobile device detection (small screen)
       */
      mobile: {
        check: 'Boolean',
        init: false,
        event: 'changeMobile',
        apply: '_applyMobile'
      },
      serverChecked: {
        check: 'Boolean',
        init: false,
        event: 'serverCheckedChanged'
      },
      servedByOpenhab: {
        check: 'Boolean',
        init: false
      },
      serverHasPhpSupport: {
        check: 'Boolean',
        init: false,
        event: 'serverHasPhpSupportChanged'
      },
      serverPhpVersion: {
        check: 'String',
        nullable: true
      },
      server: {
        check: 'String',
        nullable: true
      }
    },
    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

    members: {
      _blocker: null,
      __P_2_0: null,
      _isCached: null,
      /**
       * Toggle the {@link qx.bom.Blocker} visibility
       * @param val {Boolean}
       */
      block: function block(val) {
        if (val) {
          if (!this._blocker) {
            this._blocker = new qx.bom.Blocker();
            this._blocker.setBlockerColor('#000000');
            this._blocker.setBlockerOpacity('0.2');
          }
          this._blocker.block();
        } else if (this._blocker) {
          this._blocker.unblock();
        }
      },
      _applyMobile: function _applyMobile(value) {
        // maintain old value for compatibility
        if (value && !document.body.classList.contains('mobile')) {
          document.body.classList.add('mobile');
        } else if (!value && document.body.classList.contains('mobile')) {
          document.body.classList.remove('mobile');
        }
      },
      isReady: function isReady() {
        return this.__P_2_0;
      },
      _applyManagerChecked: function _applyManagerChecked(value) {
        if (value && cv.Config.loadManager) {
          this.showManager(cv.Config.managerOptions.action, cv.Config.managerOptions.data);
        }
      },
      /**
       * This method contains the initial application code and gets called
       * during startup of the application
       */
      main: function main() {
        var _this2 = this;
        cv.ConfigCache.init();
        if (this.isServerChecked()) {
          this._checkBackend();
        } else {
          this.addListenerOnce('serverCheckedChanged', this._checkBackend, this);
        }
        qx.event.GlobalError.setErrorHandler(this.__P_2_2, this);
        document.body.classList.add('loading');
        cv.report.Record.prepare();
        var info = "\n  _____                     ___      ___\n / ____|                   | \\ \\    / (_)\n| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n| |    / _ \\| '_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n-----------------------------------------------------------\n ©2010-" + new Date().getFullYear() + ' Christian Mayer and the CometVisu contributors.\n' + ' Version: ' + cv.Version.VERSION + '\n';
        if (cv.Application.consoleCommands.length) {
          info += '\n Available commands:\n    ' + cv.Application.consoleCommands.join('\n    ') + '\n';
        }
        info += '-----------------------------------------------------------\n\n';

        // eslint-disable-next-line no-console
        console.log(info);

        // add command to load and open the manager
        var manCommand = new qx.ui.command.Command('Ctrl+M');
        cv.TemplateEngine.getInstance().getCommands().add('open-manager', manCommand);
        manCommand.addListener('execute', function () {
          return _this2.showManager();
        });
        this.registerServiceWorker();
        // Call super class
        cv.Application.superclass.prototype.main.call(this);
        this.block(true);

        // support native logging capabilities, e.g. Firebug for Firefox
        //noinspection BadExpressionStatementJS,JSHint
        cv.log.appender.Native;

        // Enable logging in debug variant

        /*
         -------------------------------------------------------------------------
         Below is your actual application code...
         -------------------------------------------------------------------------
         */
        // in debug mode load the uncompressed unobfuscated scripts
        qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?' + Date.now() : ''));
        this.__P_2_3();
        if (typeof cv.Config.mobileDevice === 'boolean') {
          this.setMobile(cv.Config.mobileDevice);
        }
        this._onResize(null, true);
        qx.event.Registration.addListener(window, 'resize', this._onResize, this);
      },
      hideManager: function hideManager() {
        if (Object.prototype.hasOwnProperty.call(cv.ui, 'manager')) {
          var ManagerMain = cv.ui['manager']['Main'];
          // only do something when the singleton is already created
          if (ManagerMain.constructor.$$instance) {
            ManagerMain.getInstance().setVisible(false);
          }
        }
      },
      /**
       * @param action {String} manager event that can be handled by cv.ui.manager.Main._onManagerEvent()
       * @param data {String|Map} path of file that action should executed on or a Map of options
       */
      showManager: function showManager(action, data) {
        if (this.isManagerDisabled()) {
          var notification = {
            topic: 'cv.manager.error',
            target: 'popup',
            title: qx.locale.Manager.tr('Manager is not available'),
            message: this.getManagerDisabledReason(),
            severity: 'high',
            deletable: true
          };
          cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
        } else {
          qx.io.PartLoader.require(['manager'], function (states) {
            // break dependency
            var ManagerMain = cv.ui['manager']['Main'];
            var firstCall = !ManagerMain.constructor.$$instance;
            var manager = ManagerMain.getInstance();
            if (!firstCall) {
              manager.setVisible(!manager.getVisible());
            } else {
              // initially bind manager visibility
              manager.bind('visible', this, 'inManager');
            }
            if (manager.getVisible() && action && data) {
              // delay this a little bit, give the manager some time to settle
              qx.event.Timer.once(function () {
                qx.event.message.Bus.dispatchByName('cv.manager.' + action, data);
              }, this, 1000);
            }
          }, this);
        }
      },
      _applyInManager: function _applyInManager(value) {
        if (value) {
          qx.bom.History.getInstance().addToHistory('manager', qx.locale.Manager.tr('Manager') + ' - CometVisu');
          this.block(false);
          if (document.body.classList.contains('loading')) {
            document.body.classList.remove('loading');
          }
        } else {
          qx.bom.History.getInstance().addToHistory('', 'CometVisu');
        }
      },
      showConfigErrors: function showConfigErrors(configName, options) {
        configName = configName ? 'visu_config_' + configName + '.xml' : 'visu_config.xml';
        var handlerId = options && options.upgradeVersion ? 'cv.ui.manager.editor.Diff' : 'cv.ui.manager.editor.Source';
        var data = {
          file: configName,
          handler: handlerId,
          handlerOptions: Object.assign({
            jumpToError: true
          }, options ? options : {})
        };
        if (this.isInManager()) {
          qx.event.message.Bus.dispatchByName('cv.manager.openWith', data);
        } else {
          this.showManager('openWith', data);
        }
        // remove any config error messages shown
        cv.core.notifications.Router.dispatchMessage('cv.config.error', {
          topic: 'cv.config.error',
          condition: false
        });
      },
      validateConfig: function validateConfig(configName) {
        var _this3 = this;
        var worker = cv.data.FileWorker.getInstance();
        var displayConfigName = configName;
        if (configName) {
          configName = '_' + configName;
        } else {
          configName = '';
          displayConfigName = 'default';
        }
        var notification = {
          topic: 'cv.config.validation',
          severity: 'normal',
          deletable: true,
          unique: true
        };
        cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
          target: 'toast',
          message: qx.locale.Manager.tr('Validating configuration file...')
        }));
        var res = qx.util.ResourceManager.getInstance();
        var configPath = "config/visu_config".concat(configName, ".xml");
        var url = '';
        if (!res.has(configPath) && res.has("demo/visu_config".concat(configName, ".xml"))) {
          url = res.toUri("demo/visu_config".concat(configName, ".xml"));
        }
        if (!url) {
          url = res.toUri(configPath);
        }
        worker.validateConfig(url).then(function (res) {
          // remove the toast information
          cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
            target: 'toast',
            condition: false
          }));
          if (res === true) {
            // show result message as dialog
            cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
              target: 'popup',
              message: qx.locale.Manager.tr('The %1 configuration has no errors!', displayConfigName),
              icon: 'message_ok'
            }));
          } else {
            // show result message as dialog
            qx.log.Logger.error(_this3, res);
            cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
              target: 'popup',
              message: qx.locale.Manager.tr('The %1 configuration has %2 errors!', displayConfigName, res.length),
              actions: {
                link: [{
                  title: qx.locale.Manager.tr('Show errors'),
                  action: function action() {
                    qx.core.Init.getApplication().showConfigErrors(configName);
                  }
                }]
              },
              severity: 'high',
              icon: 'message_attention'
            }));
          }
        })["catch"](function (err) {
          _this3.error(err);
        });
      },
      __P_2_2: function __P_2_2(ex) {
        // connect client data for Bug-Report
        var exString = '';
        var maxTraceLength = 2000;
        if (ex.getSourceException && ex.getSourceException()) {
          ex = ex.getSourceException();
        } else if (ex instanceof qx.core.WindowError) {
          exString = ex.toString() + '\nin ' + ex.getUri() + ' line ' + ex.getLineNumber();
        }
        if (!exString) {
          exString = ex.name + ': ' + ex.message;
          if (ex.fileName) {
            exString += '\n in file ' + ex.fileName;
          }
          if (ex.lineNumber) {
            exString += '\n line ' + ex.lineNumber;
          }
          if (ex.description) {
            exString += '\n Description: ' + ex.description;
          }
          try {
            var lastLine = '';
            var repeated = 0;
            var nStack = '';
            qx.dev.StackTrace.getStackTraceFromError(ex).forEach(function (entry) {
              if (lastLine === entry) {
                if (repeated === 0) {
                  // count first occurance too
                  repeated = 2;
                } else {
                  repeated++;
                }
              } else if (repeated > 0) {
                nStack += ' [repeated ' + repeated + ' times]';
                nStack += '\n\t' + entry;
                repeated = 0;
              } else {
                nStack += '\n\t' + entry;
                lastLine = entry;
              }
            }, this);
            if (repeated > 0) {
              nStack += ' [repeated ' + repeated + ' times]';
            }
            if (nStack) {
              exString += '\nNormalized Stack: ' + nStack.substring(0, maxTraceLength) + '\n';
              if (nStack.length > maxTraceLength) {
                exString += 'Stacktrace has been cut off\n';
              }
            }
            if (exString.length + ex.stack.length < maxTraceLength) {
              exString += '\nOriginal Stack: ' + ex.stack + '\n';
            }
          } catch (exc) {
            if (ex.stack) {
              exString += '\nStack: ' + ex.stack.substring(0, maxTraceLength) + '\n';
              if (ex.stack.length > maxTraceLength) {
                exString += 'Stacktrace has been cut off\n';
              }
            }
          }
        }
        var notification = {
          topic: 'cv.error',
          target: cv.ui.PopupHandler,
          title: qx.locale.Manager.tr('An error occured'),
          message: '<pre>' + (exString || ex.stack) + '</pre>',
          severity: 'urgent',
          deletable: false,
          actions: {
            optionGroup: {
              title: qx.locale.Manager.tr('Enable on reload:'),
              options: []
            },
            link: [{
              title: qx.locale.Manager.tr('Reload'),
              type: 'reload',
              action: function action(ev) {
                var parent = ev.getTarget().parentNode;
                while (parent) {
                  if (parent.id === 'notification-center' || parent.classList.contains('popup')) {
                    break;
                  }
                  parent = parent.parentNode;
                }
                var box = parent.querySelector('#enableReporting');
                var url = window.location.href.split('#').shift();
                if (box && box.checked) {
                  // reload with reporting enabled
                  url = qx.util.Uri.appendParamsToUrl(url, 'reporting=true');
                }
                box = parent.querySelector('#reportErrors');
                if (box && box.checked) {
                  // reload with automatic error reporting enabled
                  url = qx.util.Uri.appendParamsToUrl(url, 'reportErrors=true');
                }
                cv.util.Location.setHref(url);
              },
              needsConfirmation: false
            }]
          }
        };

        // reload with reporting checkbox
        var link = '';
        if (!cv.Config.reporting) {
          if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
            link = ' <a href="https://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reporting-session-aufzeichnen" target="_blank" title="Hilfe">(?)</a>';
          }
          notification.actions.optionGroup.options.push({
            title: qx.locale.Manager.tr('Action recording') + link,
            name: 'enableReporting'
          });
        }
        {
          if (window.Sentry) {
            // Sentry has been loaded -> add option to send the error
            notification.actions.link.push({
              title: qx.locale.Manager.tr('Send error to sentry.io'),
              type: 'sentry',
              action: function action() {
                Sentry.captureException(ex);
              },
              needsConfirmation: false,
              deleteMessageAfterExecution: true
            });
          } else {
            link = '';
            if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
              link = ' <a href="https://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reportErrors" target="_blank" title="Hilfe">(?)</a>';
            }
            notification.actions.optionGroup.options.push({
              title: qx.locale.Manager.tr('Error reporting (on sentry.io)') + link,
              name: 'reportErrors',
              style: 'margin-left: 18px'
            });
          }
        }
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      },
      throwError: qx.core.Environment.select('qx.globalErrorHandling', {
        "true": function _true() {
          window.onerror(new Error('test error'));
        },
        "false": null
      }),
      _onResize: function _onResize() {
        if (cv.Config.mobileDevice === undefined) {
          this.setMobile(window.innerWidth < cv.Config.maxMobileScreenWidth);
        }
      },
      _applyStructureLoaded: function _applyStructureLoaded() {
        if (!cv.Config.cacheUsed) {
          var body = document.querySelector('body');
          // load empty HTML structure
          body.innerHTML = cv.Application.structureController.getHtmlStructure();
        }
        cv.Application.structureController.updateSentryScope();
      },
      /**
       * Internal initialization method
       */
      __P_2_3: function __P_2_3() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                window.addEventListener('pagehide', function () {
                  cv.io.Client.stopAll();
                });
                qx.bom.Lifecycle.onReady(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                  var configLoader;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        // init notification router
                        cv.core.notifications.Router.getInstance();
                        _this4._isCached = false;
                        if (!cv.Config.enableCache) {
                          _context.next = 6;
                          break;
                        }
                        _context.next = 5;
                        return cv.ConfigCache.isCached();
                      case 5:
                        _this4._isCached = _context.sent;
                      case 6:
                        if (_this4._isCached) {
                          // load settings
                          _this4.debug('using cache');
                          cv.ConfigCache.restore();
                        }
                        // initialize NotificationCenter
                        cv.ui.NotificationCenter.getInstance();
                        cv.ui.ToastManager.getInstance();
                        if (!window.cvTestMode && !cv.Config.loadManager) {
                          configLoader = new cv.util.ConfigLoader();
                          configLoader.load(_this4.bootstrap, _this4);
                        }
                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                })));

                // reaction on browser back button
                qx.bom.History.getInstance().addListener('request', function (e) {
                  var anchor = e.getData();
                  if (_this4.isInManager() && anchor !== 'manager') {
                    _this4.hideManager();
                  } else if (!_this4.isInManager() && anchor === 'manager') {
                    _this4.showManager();
                  } else if (cv.Application.structureController) {
                    cv.Application.structureController.onHistoryRequest(anchor);
                  }
                });
              case 3:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      /**
       * Initialize the content
       * @param xml {Document} XML configuration retrieved from backend
       */
      bootstrap: function bootstrap(xml) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
          var engine, loader, cacheValid, structure, styles, scripts, _engine;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _this5.debug('bootstrapping');
                engine = cv.TemplateEngine.getInstance();
                loader = cv.util.ScriptLoader.getInstance();
                engine.setConfigSource(xml);
                loader.bind('finished', engine, 'scriptsLoaded');
                if (!_this5._isCached) {
                  _context4.next = 10;
                  break;
                }
                _context4.next = 8;
                return cv.ConfigCache.isValid(null, engine.getConfigHash());
              case 8:
                cacheValid = _context4.sent;
                if (!cacheValid) {
                  _this5.debug('cache is invalid re-parse xml');
                  // cache invalid
                  cv.Config.cacheUsed = false;
                  cv.ConfigCache.clear();
                  //empty model
                  cv.data.Model.getInstance().resetWidgetDataModel();
                  cv.data.Model.getInstance().resetAddressList();
                } else {
                  // loaded cache is still valid
                  cv.report.Record.logCache();
                  cv.Config.cacheUsed = true;
                  cv.Config.lazyLoading = true;
                  cv.io.BackendConnections.initBackendClients();

                  // load part for structure
                  structure = cv.Config.getStructure();
                  _this5.debug('loading structure ' + structure);
                  engine.loadParts([structure]).then(function () {
                    _this5.loadPlugins();
                  });
                  engine.addListenerOnce('changeReady', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                    var data;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return cv.Application.structureController.getInitialPageId();
                        case 2:
                          cv.Config.treePath = _context3.sent;
                          data = cv.data.Model.getInstance().getWidgetData('id_');
                          cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
                        case 5:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  })));
                  // check if the current design settings overrides the cache one
                  if (cv.Config.clientDesign && cv.Config.clientDesign !== cv.Config.configSettings.clientDesign) {
                    // we have to replace the cached design scripts styles to load
                    styles = [];
                    cv.Config.configSettings.stylesToLoad.forEach(function (style) {
                      if (typeof style === 'string') {
                        styles.push(style.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign));
                      } else if (_typeof(style) === 'object' && style.uri) {
                        style.uri = style.uri.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign);
                        styles.push(style);
                      }
                    }, _this5);
                    _this5.loadStyles(styles);
                    scripts = [];
                    cv.Config.configSettings.scriptsToLoad.forEach(function (style) {
                      scripts.push(style.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign));
                    }, _this5);
                    _this5.loadScripts(scripts);
                  } else {
                    _this5.loadStyles();
                    _this5.loadScripts();
                  }
                }
              case 10:
                if (cv.Config.cacheUsed) {
                  _context4.next = 20;
                  break;
                }
                _this5.debug('start parsing config file');
                _engine = cv.TemplateEngine.getInstance();
                _context4.next = 15;
                return _engine.parse();
              case 15:
                _this5.loadPlugins();
                _this5.loadStyles();
                _this5.loadScripts();
                _this5.debug('done');
                if (cv.Config.enableCache && cv.Application.structureController.supports('cache')) {
                  // cache dom + data when everything is ready
                  qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                    cv.ConfigCache.dump(xml, _engine.getConfigHash());
                  }, _this5);
                }
              case 20:
                _this5.__P_2_0 = true;
              case 21:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }))();
      },
      /**
       * Load CSS styles
       * @param styles {Array?}
       */
      loadStyles: function loadStyles(styles) {
        if (!styles) {
          styles = cv.Config.configSettings.stylesToLoad;
        }
        if (styles.length) {
          document.body.classList.add('loading-styles');
          var loader = cv.util.ScriptLoader.getInstance();
          loader.addListenerOnce('stylesLoaded', function () {
            document.body.classList.remove('loading');
            document.body.classList.remove('loading-styles');
          });
          loader.addStyles(styles);
        }
      },
      /**
       * Load Javascript source files
       * @param scripts {Array?}
       */
      loadScripts: function loadScripts(scripts) {
        if (!scripts) {
          scripts = cv.Config.configSettings.scriptsToLoad;
        }
        if (scripts.length > 0) {
          cv.util.ScriptLoader.getInstance().addScripts(scripts);
        }
      },
      /**
       * Load plugins
       */
      loadPlugins: function loadPlugins() {
        var _this6 = this;
        var plugins = cv.Config.configSettings.pluginsToLoad.slice();
        cv.Config.pluginsToLoad.forEach(function (name) {
          if (!plugins.includes(name)) {
            plugins.push(name);
          }
        });
        if (plugins.length > 0) {
          var standalonePlugins = [];
          var engine = cv.TemplateEngine.getInstance();
          var partsLoaded = engine.getPartsLoaded();
          var allPluginsQueued = false;
          this.debug('loading plugins');
          if (!partsLoaded) {
            engine.addListener('changePartsLoaded', function (ev) {
              if (ev.getData() === true) {
                _this6.debug('plugins loaded');
                partsLoaded = true;
                if (allPluginsQueued) {
                  qx.event.Timer.once(function () {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }, _this6, 0);
                }
              }
            });
          }
          var parts = qx.Part.getInstance().getParts();
          var partPlugins = [];
          var path = cv.Application.getRelativeResourcePath();
          plugins.forEach(function (plugin) {
            if (Object.prototype.hasOwnProperty.call(parts, plugin)) {
              partPlugins.push(plugin);
            } else if (!plugin.startsWith('plugin-')) {
              // a real path
              standalonePlugins.push(plugin);
            } else {
              standalonePlugins.push(path + '/plugins/' + plugin.replace('plugin-', '') + '/index.js');
            }
          });
          // load part plugins
          engine.loadParts(partPlugins);
          if (standalonePlugins.length > 0) {
            // load standalone plugins after the structure parts has been loaded
            // because they need the classes provided by it
            if (this.getStructureLoaded()) {
              cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
            } else {
              var lid = this.addListener('changeStructureLoaded', function (ev) {
                if (ev.getData() === true) {
                  allPluginsQueued = true;
                  _this6.debug('loading standalone plugins');
                  cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
                  if (partsLoaded) {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }
                  _this6.removeListenerById(lid);
                }
              });
            }
          } else {
            allPluginsQueued = true;
            qx.event.Timer.once(function () {
              cv.util.ScriptLoader.getInstance().setAllQueued(true);
            }, this, 0);
          }
        } else {
          this.debug('no plugins to load => all scripts queued');
          cv.util.ScriptLoader.getInstance().setAllQueued(true);
        }
      },
      __P_2_4: function __P_2_4(serverVersionId, constraint) {
        var match = /^(>=|<|>|<=|\^)(\d+)\.(\d+)\.?(\d+)?$/.exec(constraint);
        if (match) {
          var operator = match[1];
          var majorConstraint = parseInt(match[2]);
          var hasMinorVersion = match[3] !== undefined;
          var minorConstraint = hasMinorVersion ? parseInt(match[3]) : 0;
          var hasPatchVersion = match[4] !== undefined;
          var patchConstraint = hasPatchVersion ? parseInt(match[4]) : 0;
          var constraintId = 10000 * majorConstraint + 100 * minorConstraint + patchConstraint;
          var maxId = 10000 * majorConstraint + (hasMinorVersion ? 100 * minorConstraint : 999) + (hasPatchVersion ? patchConstraint : 99);
          // incomplete implementation of: https://getcomposer.org/doc/articles/versions.md#writing-version-constraints
          switch (operator) {
            case '>=':
              if (serverVersionId < constraintId) {
                return true;
              }
              break;
            case '>':
              if (serverVersionId <= constraintId) {
                return true;
              }
              break;
            case '<=':
              if (serverVersionId > maxId) {
                return true;
              }
              break;
            case '<':
              if (serverVersionId >= maxId) {
                return true;
              }
              break;
            case '^':
              if (serverVersionId < constraintId || serverVersionId > 10000 * (majorConstraint + 1)) {
                return true;
              }
              break;
            case '~':
              if (serverVersionId < constraintId || hasPatchVersion ? serverVersionId > 10000 * (majorConstraint + 1) : serverVersionId > 10000 * majorConstraint + 100 * (patchConstraint + 1)) {
                return true;
              }
              break;
          }
        }
        return false;
      },
      _checkBackend: function _checkBackend() {
        var _this7 = this;
        if (cv.Config.testMode === true) {
          this.setManagerChecked(true);
          this.setServerHasPhpSupport(true);
        } else {
          var isOpenHab = this.isServedByOpenhab();
          var url = isOpenHab ? cv.io.rest.Client.getBaseUrl() + '/environment' : cv.io.rest.Client.getBaseUrl().split('/').slice(0, -1).join('/') + '/environment.php';
          var xhr = new qx.io.request.Xhr(url);
          xhr.set({
            method: 'GET',
            accept: 'application/json'
          });
          var failedCheck = function failedCheck(errorText, disableReason) {
            _this7.setServerHasPhpSupport(false);
            _this7.error(errorText);
            _this7.setManagerDisabled(true);
            _this7.setManagerDisabledReason(disableReason);
            _this7.setManagerChecked(true);
          };
          xhr.addListenerOnce('success', function (e) {
            var req = e.getTarget();
            var env = req.getResponse();
            if (_typeof(env) !== 'object') {
              if (typeof env === 'string' && env.startsWith('<?php')) {
                // no php support
                failedCheck(qx.locale.Manager.tr('Disabling manager due to missing PHP support.'), qx.locale.Manager.tr('Your server does not support PHP.'));
              } else {
                // generic php error
                failedCheck(qx.locale.Manager.tr('Disabling manager due to failed PHP request querying the environment.'), qx.locale.Manager.tr('Failed PHP request querying the environment.'));
              }
            } else {
              // is this is served by native openHAB server, we do not have native PHP support, only the basic
              // rest api is available, but nothing else that needs PHP (like some plugin backend code)
              _this7.setServerHasPhpSupport(!isOpenHab);
              _this7.setServerPhpVersion(env.phpversion);
              _this7.setServer(env.SERVER_SOFTWARE);
              if (Object.prototype.hasOwnProperty.call(env, 'requiresAuth')) {
                cv.io.rest.Client.AUTH_REQUIRED = env.requiresAuth === true;
              }
              var serverVersionId = env.PHP_VERSION_ID;
              var orParts = env.required_php_version.split('||').map(function (e) {
                return e.trim();
              });
              var passed = orParts.map(function (orConstraint) {
                var andParts = orConstraint.split(/(\s+|&{2})/).map(function (e) {
                  return e.trim();
                });
                // pass when no failed andPart has been found
                return !andParts.some(function (constraint) {
                  return _this7.__P_2_4(serverVersionId, constraint);
                });
              });
              // one of the OR constraints need to pass
              var enable = passed.some(function (res) {
                return res === true;
              });
              if (enable) {
                _this7.info('Manager available for PHP version', env.phpversion);
              } else {
                _this7.error('Disabling manager due to PHP version mismatch. Installed:', env.phpversion, 'required:', env.required_php_version);
                _this7.setManagerDisabled(true);
                _this7.setManagerDisabledReason(qx.locale.Manager.tr('Your system does not provide the required PHP version for the manager. Installed: %1, required: %2', env.phpversion, env.required_php_version));
              }
              _this7.setManagerChecked(true);
              if (window.Sentry) {
                if ('server_release' in env) {
                  Sentry.setTag('server.release', env.server_release);
                }
                if ('server_branch' in env) {
                  Sentry.setTag('server.branch', env.server_branch);
                }
                if ('server_id' in env) {
                  Sentry.setTag('server.id', env.server_id);
                }
              }
            }
          });
          xhr.addListener('statusError', function (e) {
            failedCheck(qx.locale.Manager.tr('Disabling manager due to failed PHP request querying the environment.'), qx.locale.Manager.tr('Failed PHP request querying the environment.'));
          });
          xhr.send();
        }
      },
      close: function close() {
        this.setActive(false);
        var clients = cv.io.BackendConnections.getClients();
        for (var name in clients) {
          clients[name].terminate();
        }
      },
      /**
       * Install the service-worker if possible
       */
      registerServiceWorker: function registerServiceWorker() {
        if (cv.Config.useServiceWorker === true) {
          var workerFile = 'ServiceWorker.js';
          navigator.serviceWorker.register(workerFile).then(function (reg) {
            this.debug('ServiceWorker successfully registered for scope ' + reg.scope);

            // configure service worker
            var configMessage = {
              command: 'configure',
              message: {
                forceReload: cv.Config.forceReload,
                debug: false
              }
            };
            if (reg.active) {
              reg.active.postMessage(configMessage);
            } else {
              navigator.serviceWorker.ready.then(function (ev) {
                ev.active.postMessage(configMessage);
              });
            }
          }.bind(this))["catch"](function (err) {
            this.error('Error registering service-worker: ', err);
          }.bind(this));
        } else if (navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
            this.debug('unregistering existing service workers');
            registrations.forEach(function (registration) {
              registration.unregister();
            });
          }.bind(this));
        }
      }
    }
  });
  cv.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1735341754617