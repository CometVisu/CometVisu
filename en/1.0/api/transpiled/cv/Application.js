function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
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
      "cv.util.ScriptLoader": {},
      "qx.core.WindowError": {},
      "qx.dev.StackTrace": {},
      "cv.util.Location": {},
      "qx.bom.Lifecycle": {},
      "cv.ui.NotificationCenter": {},
      "cv.ui.ToastManager": {},
      "cv.util.ConfigLoader": {},
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "cv.ui.structure.WidgetFactory": {},
      "qx.Part": {},
      "cv.io.rest.Client": {},
      "qx.bom.client.Html": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.globalErrorHandling": {
          "load": true,
          "className": "qx.event.GlobalError"
        },
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Application.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   * @asset(libs/source-map.min.js)
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
      /**
       * Get the path to the resources.
       * As it is a directory, it will end with a '/'.
       * @param fullPath {boolean?} Get the full path when true
       * @return {string}
       */
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
      __P_2_2: 0,
      _isCached: null,
      __P_2_3: null,
      __P_2_4: null,
      __P_2_5: false,
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
        qx.event.GlobalError.setErrorHandler(this.__P_2_6, this);
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
        this.__P_2_7();
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
      __P_2_8: function __P_2_8(message) {
        return '<pre>' + message + '</pre>';
      },
      __P_2_9: function __P_2_9(fileName) {
        return Boolean(fileName) && !['<anonymous>', 'native'].includes(fileName) && !fileName.startsWith('eval') && /\.js(?:[?#]|$)/.test(fileName);
      },
      __P_2_10: function __P_2_10(line) {
        if (!line) {
          return null;
        }
        var trimmed = line.trim();
        var match = /^at\s+(.*?)\s+\((.+):(\d+):(\d+)\)$/.exec(trimmed);
        if (match) {
          return {
            functionName: match[1],
            fileName: match[2],
            lineNumber: parseInt(match[3], 10),
            columnNumber: parseInt(match[4], 10)
          };
        }
        match = /^at\s+(.+):(\d+):(\d+)$/.exec(trimmed);
        if (match) {
          return {
            functionName: null,
            fileName: match[1],
            lineNumber: parseInt(match[2], 10),
            columnNumber: parseInt(match[3], 10)
          };
        }
        match = /^(.*?)@(.+):(\d+):(\d+)$/.exec(trimmed);
        if (match) {
          return {
            functionName: match[1] || null,
            fileName: match[2],
            lineNumber: parseInt(match[3], 10),
            columnNumber: parseInt(match[4], 10)
          };
        }
        return null;
      },
      __P_2_11: function __P_2_11(url) {
        try {
          return new URL(url, window.location.href).toString();
        } catch (error) {
          return null;
        }
      },
      __P_2_12: function __P_2_12(scriptUrl) {
        var url = new URL(scriptUrl, window.location.href);
        url.pathname += '.map';
        return url.toString();
      },
      __P_2_13: function __P_2_13(source, scriptUrl) {
        var pathMarkers = ['/source/class/', '/client/source/class/', '/node_modules/@qooxdoo/framework/source/class/'];
        for (var _i = 0, _pathMarkers = pathMarkers; _i < _pathMarkers.length; _i++) {
          var marker = _pathMarkers[_i];
          var markerPosition = source.indexOf(marker);
          if (markerPosition !== -1) {
            return source.substring(markerPosition + marker.length);
          }
        }
        try {
          var resolved = new URL(source, scriptUrl);
          if (resolved.origin === window.location.origin) {
            return resolved.pathname.startsWith('/') ? resolved.pathname.substring(1) : resolved.pathname;
          }
          return resolved.toString();
        } catch (error) {
          return source;
        }
      },
      __P_2_14: function __P_2_14(source) {
        return source.includes('/node_modules/@qooxdoo/framework/source/class/') || source.startsWith('qx/');
      },
      __P_2_15: function __P_2_15(frame) {
        var normalizedUrl = this.__P_2_11(frame.fileName);
        var fileName = frame.fileName;
        if (normalizedUrl) {
          try {
            var url = new URL(normalizedUrl);
            fileName = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
          } catch (error) {
            fileName = frame.fileName;
          }
        }
        var location = fileName + ':' + frame.lineNumber;
        if (frame.columnNumber !== null) {
          location += ':' + frame.columnNumber;
        }
        return '\t' + (frame.functionName || '<anonymous>') + ' (' + location + ')';
      },
      __P_2_16: function __P_2_16() {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var scriptUrl;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (!(window.sourceMap && window.sourceMap.SourceMapConsumer)) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, true);
              case 1:
                if (!_this4.__P_2_5) {
                  _context.n = 2;
                  break;
                }
                return _context.a(2, false);
              case 2:
                if (!_this4.__P_2_4) {
                  scriptUrl = qx.util.ResourceManager.getInstance().toUri('libs/source-map.min.js');
                  _this4.__P_2_4 = cv.util.ScriptLoader.includeScript(scriptUrl).then(function () {
                    return Boolean(window.sourceMap && window.sourceMap.SourceMapConsumer);
                  })["catch"](function (error) {
                    _this4.debug('failed to load source-map runtime', error);
                    _this4.__P_2_5 = true;
                    return false;
                  });
                }
                return _context.a(2, _this4.__P_2_4);
            }
          }, _callee);
        }))();
      },
      __P_2_17: function __P_2_17(scriptUrl) {
        var _this5 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var response, mapData;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return window.fetch(_this5.__P_2_12(scriptUrl));
              case 1:
                response = _context2.v;
                if (response.ok) {
                  _context2.n = 2;
                  break;
                }
                throw new Error('failed to load source map for ' + scriptUrl + ': ' + response.status);
              case 2:
                _context2.n = 3;
                return response.json();
              case 3:
                mapData = _context2.v;
                return _context2.a(2, new window.sourceMap.SourceMapConsumer(mapData));
            }
          }, _callee2);
        }))();
      },
      __P_2_18: function __P_2_18(scriptUrl) {
        var _this6 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var hasSourceMapSupport, normalizedUrl;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                _context3.n = 1;
                return _this6.__P_2_16();
              case 1:
                hasSourceMapSupport = _context3.v;
                if (hasSourceMapSupport) {
                  _context3.n = 2;
                  break;
                }
                return _context3.a(2, null);
              case 2:
                normalizedUrl = _this6.__P_2_11(scriptUrl);
                if (normalizedUrl) {
                  _context3.n = 3;
                  break;
                }
                return _context3.a(2, null);
              case 3:
                if (!_this6.__P_2_3) {
                  _this6.__P_2_3 = {};
                }
                if (!Object.prototype.hasOwnProperty.call(_this6.__P_2_3, normalizedUrl)) {
                  _this6.__P_2_3[normalizedUrl] = _this6.__P_2_17(normalizedUrl)["catch"](function (error) {
                    _this6.debug('failed to load source map', normalizedUrl, error);
                    return null;
                  });
                }
                return _context3.a(2, _this6.__P_2_3[normalizedUrl]);
            }
          }, _callee3);
        }))();
      },
      __P_2_19: function __P_2_19(frame) {
        var _this7 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var scriptUrl, consumer, originalPosition;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                if (_this7.__P_2_9(frame.fileName)) {
                  _context4.n = 1;
                  break;
                }
                return _context4.a(2, null);
              case 1:
                scriptUrl = _this7.__P_2_11(frame.fileName);
                if (scriptUrl) {
                  _context4.n = 2;
                  break;
                }
                return _context4.a(2, null);
              case 2:
                _context4.n = 3;
                return _this7.__P_2_18(scriptUrl);
              case 3:
                consumer = _context4.v;
                if (consumer) {
                  _context4.n = 4;
                  break;
                }
                return _context4.a(2, null);
              case 4:
                originalPosition = consumer.originalPositionFor({
                  line: frame.lineNumber,
                  column: Math.max(frame.columnNumber - 1, 0)
                });
                if (!(!originalPosition || !originalPosition.source || !originalPosition.line)) {
                  _context4.n = 5;
                  break;
                }
                return _context4.a(2, null);
              case 5:
                return _context4.a(2, {
                  functionName: originalPosition.name || frame.functionName || '<anonymous>',
                  source: _this7.__P_2_13(originalPosition.source, scriptUrl),
                  sourceType: _this7.__P_2_14(originalPosition.source) ? 'framework' : 'application',
                  lineNumber: originalPosition.line,
                  columnNumber: originalPosition.column !== null ? originalPosition.column + 1 : null
                });
            }
          }, _callee4);
        }))();
      },
      __P_2_20: function __P_2_20(ex) {
        var _this8 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
          var frames, mappedFrames, unresolvedFrames, _iterator, _step, frame, mappedFrame, applicationFrames, _t;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.p = _context5.n) {
              case 0:
                if (!(!ex || !ex.stack)) {
                  _context5.n = 1;
                  break;
                }
                return _context5.a(2, null);
              case 1:
                frames = ex.stack.split('\n').map(_this8.__P_2_10, _this8).filter(Boolean);
                if (!(frames.length === 0)) {
                  _context5.n = 2;
                  break;
                }
                return _context5.a(2, null);
              case 2:
                mappedFrames = [];
                unresolvedFrames = [];
                _iterator = _createForOfIteratorHelper(frames);
                _context5.p = 3;
                _iterator.s();
              case 4:
                if ((_step = _iterator.n()).done) {
                  _context5.n = 7;
                  break;
                }
                frame = _step.value;
                _context5.n = 5;
                return _this8.__P_2_19(frame);
              case 5:
                mappedFrame = _context5.v;
                if (mappedFrame) {
                  mappedFrames.push(mappedFrame);
                } else if (_this8.__P_2_9(frame.fileName)) {
                  unresolvedFrames.push(frame);
                }
              case 6:
                _context5.n = 4;
                break;
              case 7:
                _context5.n = 9;
                break;
              case 8:
                _context5.p = 8;
                _t = _context5.v;
                _iterator.e(_t);
              case 9:
                _context5.p = 9;
                _iterator.f();
                return _context5.f(9);
              case 10:
                applicationFrames = mappedFrames.filter(function (frame) {
                  return frame.sourceType === 'application';
                });
                if (!(applicationFrames.length > 0)) {
                  _context5.n = 11;
                  break;
                }
                return _context5.a(2, applicationFrames.slice(0, 8).map(function (frame) {
                  var sourceLocation = frame.source + ':' + frame.lineNumber;
                  if (frame.columnNumber !== null) {
                    sourceLocation += ':' + frame.columnNumber;
                  }
                  return '\t' + frame.functionName + ' (' + sourceLocation + ')';
                }).join('\n'));
              case 11:
                if (!(unresolvedFrames.length > 0)) {
                  _context5.n = 12;
                  break;
                }
                return _context5.a(2, ['No sourcemap entries for the top generated stack frames:', unresolvedFrames.slice(0, 4).map(_this8.__P_2_15, _this8).join('\n')].join('\n'));
              case 12:
                if (!(mappedFrames.length > 0)) {
                  _context5.n = 13;
                  break;
                }
                return _context5.a(2, ['Only framework-internal frames could be resolved:', mappedFrames.slice(0, 4).map(function (frame) {
                  var sourceLocation = frame.source + ':' + frame.lineNumber;
                  if (frame.columnNumber !== null) {
                    sourceLocation += ':' + frame.columnNumber;
                  }
                  return '\t' + frame.functionName + ' (' + sourceLocation + ')';
                }).join('\n')].join('\n'));
              case 13:
                return _context5.a(2, null);
            }
          }, _callee5, null, [[3, 8, 9, 10]]);
        }))();
      },
      __P_2_21: function __P_2_21(ex, exString, notification, sequence) {
        var _this9 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
          var mappedStack, _t2;
          return _regenerator().w(function (_context6) {
            while (1) switch (_context6.p = _context6.n) {
              case 0:
                _context6.p = 0;
                _context6.n = 1;
                return _this9.__P_2_20(ex);
              case 1:
                mappedStack = _context6.v;
                if (!(!mappedStack || sequence !== _this9.__P_2_2)) {
                  _context6.n = 2;
                  break;
                }
                return _context6.a(2);
              case 2:
                notification.message = _this9.__P_2_8(exString + '\nMapped Stack:\n' + mappedStack);
                cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
                _context6.n = 4;
                break;
              case 3:
                _context6.p = 3;
                _t2 = _context6.v;
                _this9.debug('failed to remap stack trace', _t2);
              case 4:
                return _context6.a(2);
            }
          }, _callee6, null, [[0, 3]]);
        }))();
      },
      __P_2_6: function __P_2_6(ex) {
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
        var sequence = ++this.__P_2_2;
        var notification = {
          topic: 'cv.error.' + sequence,
          target: 'popup',
          title: qx.locale.Manager.tr('An error occured'),
          message: this.__P_2_8(exString || ex.stack),
          severity: 'urgent',
          unique: true,
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
        this.__P_2_21(ex, exString || ex.stack, notification, sequence);
      },
      throwError: qx.core.Environment.select('qx.globalErrorHandling', {
        "true": function _true() {
          qx.event.Timer.once(function () {
            throw new Error('sourcemap test');
          }, this, 100);
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
      __P_2_7: function __P_2_7() {
        var _this0 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                window.addEventListener('pagehide', function () {
                  cv.io.Client.stopAll();
                });
                qx.bom.Lifecycle.onReady(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
                  var configLoader;
                  return _regenerator().w(function (_context7) {
                    while (1) switch (_context7.n) {
                      case 0:
                        // init notification router
                        cv.core.notifications.Router.getInstance();
                        _this0._isCached = false;
                        if (!cv.Config.enableCache) {
                          _context7.n = 2;
                          break;
                        }
                        _context7.n = 1;
                        return cv.ConfigCache.isCached();
                      case 1:
                        _this0._isCached = _context7.v;
                      case 2:
                        if (_this0._isCached) {
                          // load settings
                          _this0.debug('using cache');
                          cv.ConfigCache.restore();
                        }
                        // initialize NotificationCenter
                        cv.ui.NotificationCenter.getInstance();
                        cv.ui.ToastManager.getInstance();
                        if (!window.cvTestMode && !cv.Config.loadManager) {
                          configLoader = new cv.util.ConfigLoader();
                          configLoader.load(_this0.bootstrap, _this0);
                        }
                      case 3:
                        return _context7.a(2);
                    }
                  }, _callee7);
                })));

                // reaction on browser back button
                qx.bom.History.getInstance().addListener('request', function (e) {
                  var anchor = e.getData();
                  if (_this0.isInManager() && anchor !== 'manager') {
                    _this0.hideManager();
                  } else if (!_this0.isInManager() && anchor === 'manager') {
                    _this0.showManager();
                  } else if (cv.Application.structureController) {
                    cv.Application.structureController.onHistoryRequest(anchor);
                  }
                });
              case 1:
                return _context8.a(2);
            }
          }, _callee8);
        }))();
      },
      /**
       * Initialize the content
       * @param xml {Document} XML configuration retrieved from backend
       */
      bootstrap: function bootstrap(xml) {
        var _this1 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
          var engine, loader, cacheValid, structure, styles, scripts, _engine;
          return _regenerator().w(function (_context0) {
            while (1) switch (_context0.n) {
              case 0:
                _this1.debug('bootstrapping');
                engine = cv.TemplateEngine.getInstance();
                loader = cv.util.ScriptLoader.getInstance();
                engine.setConfigSource(xml);
                loader.bind('finished', engine, 'scriptsLoaded');
                if (!_this1._isCached) {
                  _context0.n = 2;
                  break;
                }
                _context0.n = 1;
                return cv.ConfigCache.isValid(null, engine.getConfigHash());
              case 1:
                cacheValid = _context0.v;
                if (!cacheValid) {
                  _this1.debug('cache is invalid re-parse xml');
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
                  _this1.debug('loading structure ' + structure);
                  engine.loadParts([structure]).then(function () {
                    _this1.loadPlugins();
                  });
                  engine.addListenerOnce('changeReady', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
                    var data;
                    return _regenerator().w(function (_context9) {
                      while (1) switch (_context9.n) {
                        case 0:
                          _context9.n = 1;
                          return cv.Application.structureController.getInitialPageId();
                        case 1:
                          cv.Config.treePath = _context9.v;
                          data = cv.data.Model.getInstance().getWidgetData('id_');
                          cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
                        case 2:
                          return _context9.a(2);
                      }
                    }, _callee9);
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
                    }, _this1);
                    _this1.loadStyles(styles);
                    scripts = [];
                    cv.Config.configSettings.scriptsToLoad.forEach(function (style) {
                      scripts.push(style.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign));
                    }, _this1);
                    _this1.loadScripts(scripts);
                  } else {
                    _this1.loadStyles();
                    _this1.loadScripts();
                  }
                }
              case 2:
                if (cv.Config.cacheUsed) {
                  _context0.n = 4;
                  break;
                }
                _this1.debug('start parsing config file');
                _engine = cv.TemplateEngine.getInstance();
                _context0.n = 3;
                return _engine.parse();
              case 3:
                _this1.loadPlugins();
                _this1.loadStyles();
                _this1.loadScripts();
                _this1.debug('done');
                if (cv.Config.enableCache && cv.Application.structureController.supports('cache')) {
                  // cache dom + data when everything is ready
                  qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                    cv.ConfigCache.dump(xml, _engine.getConfigHash());
                  }, _this1);
                }
              case 4:
                _this1.__P_2_0 = true;
              case 5:
                return _context0.a(2);
            }
          }, _callee0);
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
        var _this10 = this;
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
                _this10.debug('plugins loaded');
                partsLoaded = true;
                if (allPluginsQueued) {
                  qx.event.Timer.once(function () {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }, _this10, 0);
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
              standalonePlugins.push(path + 'plugins/' + plugin.replace('plugin-', '') + '/index.js');
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
                  _this10.debug('loading standalone plugins');
                  cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
                  if (partsLoaded) {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }
                  _this10.removeListenerById(lid);
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
      __P_2_22: function __P_2_22(serverVersionId, constraint) {
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
        var _this11 = this;
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
            _this11.setServerHasPhpSupport(false);
            _this11.error(errorText);
            _this11.setManagerDisabled(true);
            _this11.setManagerDisabledReason(disableReason);
            _this11.setManagerChecked(true);
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
              _this11.setServerHasPhpSupport(!isOpenHab);
              _this11.setServerPhpVersion(env.phpversion);
              _this11.setServer(env.SERVER_SOFTWARE);
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
                  return _this11.__P_2_22(serverVersionId, constraint);
                });
              });
              // one of the OR constraints need to pass
              var enable = passed.some(function (res) {
                return res === true;
              });
              if (enable) {
                _this11.info('Manager available for PHP version', env.phpversion);
              } else {
                _this11.error('Disabling manager due to PHP version mismatch. Installed:', env.phpversion, 'required:', env.required_php_version);
                _this11.setManagerDisabled(true);
                _this11.setManagerDisabledReason(qx.locale.Manager.tr('Your system does not provide the required PHP version for the manager. Installed: %1, required: %2', env.phpversion, env.required_php_version));
              }
              _this11.setManagerChecked(true);
              if (env.custom_visu_config_xsd_missing === true && !localStorage.getItem('cv.custom_visu_config_xsd_missing')) {
                _this11.warn('custom_visu_config.xsd is missing, using default one as fallback');
                var notification = {
                  topic: 'cv.info.custom_visu_config_xsd_missing',
                  target: 'popup',
                  title: qx.locale.Manager.tr('Missing file "custom_visu_config.xsd"'),
                  message: qx.locale.Manager.tr('The file "custom_visu_config.xsd" is missing in your config-folder. Do you want to create a default file now? This file is needed for full tile-config validation support.'),
                  unique: true,
                  actions: {
                    link: [{
                      title: qx.locale.Manager.tr('Ignore'),
                      type: 'ignore',
                      action: function action(ev) {
                        if (qx.core.Environment.get('html.storage.local')) {
                          localStorage.setItem('cv.custom_visu_config_xsd_missing', 'true');
                        }
                      },
                      needsConfirmation: false
                    }, {
                      title: qx.locale.Manager.tr('Yes'),
                      type: 'copy',
                      action: function action(ev) {
                        cv.io.rest.Client.getFsClient().copySync({
                          src: 'resource/custom_visu_config.xsd',
                          target: 'custom_visu_config.xsd',
                          force: false
                        }, function (err) {
                          if (err) {
                            this.error('Failed to copy default custom_visu_config.xsd', err);
                          }
                        }, this);
                      },
                      needsConfirmation: false
                    }]
                  }
                };
                if (cv.TemplateEngine.getInstance().isDomFinished()) {
                  cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
                } else {
                  qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                    cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
                  }, _this11);
                }
              }
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

//# sourceMappingURL=Application.js.map?dt=1782705764857