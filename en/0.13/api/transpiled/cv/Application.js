function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
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
   * @asset(sentry/bundle.min.js)
   * @asset(sentry/bundle.tracing.min.js)
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
        var isOpenHAB = header ? header.startsWith('Jetty') : false;
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
          this._relResourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')).substring(baseUrl.length + 1) + '/';
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
        var info = "\n  _____                     ___      ___\n / ____|                   | \\ \\    / (_)\n| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n| |    / _ \\| '_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n-----------------------------------------------------------\n ©2010-" + new Date().getFullYear() + ' Christian Mayer and the CometVisu contributers.\n' + ' Version: ' + cv.Version.VERSION + '\n';
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

        // run svg4everybody to support SVG sprites in older browsers
        svg4everybody();

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
      },
      /**
       * Internal initialization method
       */
      __P_2_3: function __P_2_3() {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                qx.event.Registration.addListener(window, 'unload', function () {
                  cv.io.Client.stopAll();
                }, _this4);
                qx.bom.Lifecycle.onReady( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
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
                  cv.io.BackendConnections.initBackendClient();

                  // load part for structure
                  structure = cv.Config.getStructure();
                  _this5.debug('loading structure ' + structure);
                  engine.loadParts([structure]).then(function () {
                    _this5.loadPlugins();
                  });
                  engine.addListenerOnce('changeReady', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
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
                      styles.push(style.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign));
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
        } else {
          var isOpenHab = this.isServedByOpenhab();
          var url = isOpenHab ? cv.io.rest.Client.getBaseUrl() + '/environment' : cv.io.rest.Client.getBaseUrl().split('/').slice(0, -1).join('/') + '/environment.php';
          var xhr = new qx.io.request.Xhr(url);
          xhr.set({
            method: 'GET',
            accept: 'application/json'
          });
          xhr.addListenerOnce('success', function (e) {
            var req = e.getTarget();
            var env = req.getResponse();
            if (typeof env === 'string' && env.startsWith('<?php')) {
              // no php support
              _this7.setServerHasPhpSupport(false);
              _this7.error('Disabling manager due to missing PHP support.');
              _this7.setManagerDisabled(true);
              _this7.setManagerDisabledReason(qx.locale.Manager.tr('Your server does not support PHP'));
              _this7.setManagerChecked(true);
            } else {
              // is this is served by native openHAB server, we do not have native PHP support, only the basic
              // rest api is available, but nothing else that needs PHP (like some plugin backend code)
              _this7.setServerHasPhpSupport(!isOpenHab);
              _this7.setServerPhpVersion(env.phpversion);
              _this7.setServer(env.SERVER_SOFTWARE);
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
                Sentry.configureScope(function (scope) {
                  if ('server_release' in env) {
                    scope.setTag('server.release', env.server_release);
                  }
                  if ('server_branch' in env) {
                    scope.setTag('server.branch', env.server_branch);
                  }
                  if ('server_id' in env) {
                    scope.setTag('server.id', env.server_id);
                  }
                });
              }
            }
          });
          xhr.addListener('statusError', function (e) {
            _this7.setManagerChecked(true);
          });
          xhr.send();
        }
      },
      close: function close() {
        this.setActive(false);
        var client = cv.io.BackendConnections.getClient();
        if (client) {
          client.terminate();
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

//# sourceMappingURL=Application.js.map?dt=1677345905480