function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
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
      "cv.ui.layout.ResizeHandler": {},
      "cv.ConfigCache": {},
      "qx.event.GlobalError": {},
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
      "cv.ui.structure.WidgetFactory": {},
      "qx.Part": {},
      "qx.bom.client.Html": {
        "require": true
      },
      "cv.io.rest.Client": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.storage.local": {
          "className": "qx.bom.client.Html"
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

      qx.bom.PageVisibility.getInstance().addListener('change', function () {
        this.setActive(qx.bom.PageVisibility.getInstance().getVisibilityState() === 'visible');
      }, this); // install global shortcut for opening the manager

      if (window.parent && typeof window.parent.showManager === 'function') {
        window.showManager = window.parent.showManager;
      } else {
        window.showManager = this.showManager.bind(this);
      }

      if (window.parent && typeof window.parent.showConfigErrors === 'function') {
        window.showConfigErrors = window.parent.showConfigErrors;
      } else {
        window.showConfigErrors = this.showConfigErrors.bind(this);
      } // check HTTP server by requesting a small file


      var xhr = new qx.io.request.Xhr('version');
      xhr.set({
        method: 'GET'
      });

      var check = function check(e) {
        var req = e.getTarget();
        var server = req.getResponseHeader('Server');
        var isOpenHAB = server ? server.startsWith('Jetty') : false;

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
      HTML_STRUCT: '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer" class="clearfix"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>',
      consoleCommands: [],
      __P_2_1: null,
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

        if (cv.Config.testMode === true || window.cvTestMode === true) {
          Client = cv.io.Mockup;
        } else if (args[0] === 'openhab') {
          Client = cv.io.openhab.Rest;

          if (!cv.Config.pluginsToLoad.includes('plugin-openhab')) {
            cv.Config.pluginsToLoad.push('plugin-openhab');
          }

          if (args[1] && args[1].endsWith('/cv/l/')) {
            // we only need the rest path not the login resource
            args[1] = args[1].substring(0, args[1].indexOf('cv/'));
          }
        } else if (args[0] === 'mqtt') {
          Client = cv.io.mqtt.Client;
        }

        args.unshift(null);
        return new (Function.prototype.bind.apply(Client, args))(); // jshint ignore:line
      },

      /**
       * Register shortcuts to usefull commands the user can execute in the browser console
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
        event: 'changeStructureLoaded'
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

        if (this.__P_2_0) {
          cv.ui.layout.ResizeHandler.invalidateNavbar();
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
        cv.report.Record.prepare();
        var info = "\n  _____                     ___      ___\n / ____|                   | \\ \\    / (_)\n| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n| |    / _ \\| '_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n-----------------------------------------------------------\n ©2010-" + new Date().getFullYear() + ' Christian Mayer and the CometVisu contributers.\n' + ' Version: ' + cv.Version.VERSION + '\n';

        if (cv.Application.consoleCommands.length) {
          info += "\n Available commands:\n    " + cv.Application.consoleCommands.join('\n    ') + '\n';
        }

        info += '-----------------------------------------------------------\n\n'; // eslint-disable-next-line no-console

        console.log(info); // add command to load and open the manager

        var manCommand = new qx.ui.command.Command('Ctrl+M');
        cv.TemplateEngine.getInstance().getCommands().add('open-manager', manCommand);
        manCommand.addListener('execute', function () {
          return _this2.showManager();
        }, this);
        this.registerServiceWorker();
        // Call super class
        cv.Application.prototype.main.base.call(this);
        this.block(true); // run svg4everybody to support SVG sprites in older browsers

        svg4everybody(); // support native logging capabilities, e.g. Firebug for Firefox
        //noinspection BadExpressionStatementJS,JSHint

        cv.log.appender.Native; // Enable logging in debug variant

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
          var ManagerMain = cv.ui['manager']['Main']; // only do something when the singleton is already created

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
          qx.io.PartLoader.require(['manager'], function () {
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
        } // remove any config error messages shown


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
        }; // reload with reporting checkbox

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
      throwError: function throwError() {
        window.onerror(new Error('test error'));
      },
      _onResize: function _onResize(ev, init) {
        if (cv.Config.mobileDevice === undefined) {
          this.setMobile(window.innerWidth < cv.Config.maxMobileScreenWidth);
        }

        if (!init && this.__P_2_0) {
          cv.ui.layout.ResizeHandler.invalidateScreensize();
        }
      },

      /**
       * Internal initialization method
       */
      __P_2_3: function __P_2_3() {
        qx.event.Registration.addListener(window, 'unload', function () {
          cv.io.Client.stopAll();
        }, this);
        qx.bom.Lifecycle.onReady( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var body, isCached, configLoader;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // init notification router
                  cv.core.notifications.Router.getInstance();
                  body = document.querySelector('body');
                  isCached = false;

                  if (!cv.Config.enableCache) {
                    _context.next = 7;
                    break;
                  }

                  _context.next = 6;
                  return cv.ConfigCache.isCached();

                case 6:
                  isCached = _context.sent;

                case 7:
                  if (isCached) {
                    // load settings
                    this.debug('using cache');
                    cv.ConfigCache.restore(); // initialize NotificationCenter

                    cv.ui.NotificationCenter.getInstance();
                    cv.ui.ToastManager.getInstance();
                  } else {
                    // load empty HTML structure
                    body.innerHTML = cv.Application.HTML_STRUCT; // initialize NotificationCenter

                    cv.ui.NotificationCenter.getInstance();
                    cv.ui.ToastManager.getInstance();
                  }

                  if (!cv.Config.loadManager) {
                    configLoader = new cv.util.ConfigLoader();
                    configLoader.load(this.bootstrap, this);
                  }

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        })), this); // reaction on browser back button

        qx.bom.History.getInstance().addListener('request', function (e) {
          var anchor = e.getData();

          if (this.isInManager() && anchor !== 'manager') {
            this.hideManager();
          } else if (!this.isInManager() && anchor === 'manager') {
            this.showManager();
          } else if (anchor) {
            cv.TemplateEngine.getInstance().scrollToPage(anchor, 0, true);
          }
        }, this);
      },

      /**
       * Initialize the content
       * @param xml {Document} XML configuration retrieved from backend
       */
      bootstrap: function () {
        var _bootstrap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(xml) {
          var engine, loader, isCached, xmlHash, cacheValid, structure, styles, scripts;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.debug('bootstrapping');
                  engine = cv.TemplateEngine.getInstance();
                  loader = cv.util.ScriptLoader.getInstance();
                  engine.xml = xml;
                  loader.addListenerOnce('finished', function () {
                    engine.setScriptsLoaded(true);
                  }, this);
                  isCached = false;

                  if (!cv.Config.enableCache) {
                    _context2.next = 11;
                    break;
                  }

                  _context2.next = 9;
                  return cv.ConfigCache.isCached();

                case 9:
                  isCached = _context2.sent;
                  xmlHash = cv.ConfigCache.toHash(xml);

                case 11:
                  if (!isCached) {
                    _context2.next = 16;
                    break;
                  }

                  _context2.next = 14;
                  return cv.ConfigCache.isValid(null, xmlHash);

                case 14:
                  cacheValid = _context2.sent;

                  if (!cacheValid) {
                    this.debug('cache is invalid re-parse xml'); // cache invalid

                    cv.Config.cacheUsed = false;
                    cv.ConfigCache.clear(); // load empty HTML structure

                    document.body.innerHTML = cv.Application.HTML_STRUCT; //empty model

                    cv.data.Model.getInstance().resetWidgetDataModel();
                    cv.data.Model.getInstance().resetAddressList();
                  } else {
                    // loaded cache is still valid
                    cv.report.Record.logCache();
                    cv.Config.cacheUsed = true;
                    cv.Config.lazyLoading = true;
                    engine.initBackendClient();

                    this.__P_2_4(); // load part for structure


                    structure = cv.Config.getStructure();
                    this.debug('loading structure ' + structure);
                    engine.loadParts([structure], function (states) {
                      if (states === 'complete') {
                        this.debug(structure + ' has been loaded');
                        this.setStructureLoaded(true);
                      } else {
                        this.error(structure + ' could not be loaded');
                        this.setStructureLoaded(false);
                      }
                    }, this);
                    engine.addListenerOnce('changeReady', function () {
                      // create the objects
                      cv.Config.treePath = cv.Config.initialPage;
                      var data = cv.data.Model.getInstance().getWidgetData('id_');
                      cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
                    }, this); // check if the current design settings overrides the cache one

                    this.loadPlugins();

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
                      }, this);
                      this.loadStyles(styles);
                      scripts = [];
                      cv.Config.configSettings.scriptsToLoad.forEach(function (style) {
                        scripts.push(style.replace('designs/' + cv.Config.configSettings.clientDesign, 'designs/' + cv.Config.clientDesign));
                      }, this);
                      this.loadScripts(scripts);
                    } else {
                      this.loadStyles();
                      this.loadScripts();
                    }
                  }

                case 16:
                  if (!cv.Config.cacheUsed) {
                    this.debug('starting');

                    this.__P_2_4();

                    engine.parseXML(xml, function () {
                      this.loadPlugins();
                      this.loadStyles();
                      this.loadScripts();
                      this.debug('done');

                      if (cv.Config.enableCache) {
                        // cache dom + data when everything is ready
                        qx.event.message.Bus.subscribe('setup.dom.finished', function () {
                          cv.ConfigCache.dump(xml, xmlHash);
                        }, this);
                      }

                      this.__P_2_0 = true;
                    }.bind(this));
                  } else {
                    this.__P_2_0 = true;
                  }

                case 17:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function bootstrap(_x) {
          return _bootstrap.apply(this, arguments);
        }

        return bootstrap;
      }(),

      /**
       * Load CSS styles
       * @param styles {Array?}
       */
      loadStyles: function loadStyles(styles) {
        if (!styles) {
          styles = cv.Config.configSettings.stylesToLoad;
        }

        if (styles.length) {
          cv.util.ScriptLoader.getInstance().addStyles(styles);
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
        var plugins = cv.Config.configSettings.pluginsToLoad.slice();
        cv.Config.pluginsToLoad.forEach(function (name) {
          if (!plugins.includes(name)) {
            plugins.push(name);
          }
        });

        if (plugins.length > 0) {
          var standalonePlugins = [];
          var partsLoaded = false;
          var allPluginsQueued = false;
          this.debug('loading plugins');
          var engine = cv.TemplateEngine.getInstance();
          engine.addListener('changePartsLoaded', function (ev) {
            if (ev.getData() === true) {
              this.debug('plugins loaded');
              partsLoaded = true;

              if (allPluginsQueued) {
                qx.event.Timer.once(function () {
                  cv.util.ScriptLoader.getInstance().setAllQueued(true);
                }, this, 0);
              }
            }
          }, this);
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
          }); // load part plugins

          engine.loadParts(partPlugins);

          if (standalonePlugins.length > 0) {
            // load standalone plugins after the structure parts has been loaded
            // because they use need the classes provided by it
            if (this.getStructureLoaded()) {
              cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
            } else {
              var lid = this.addListener('changeStructureLoaded', function (ev) {
                if (ev.getData() === true) {
                  allPluginsQueued = true;
                  this.debug('loading standalone plugins');
                  cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);

                  if (partsLoaded) {
                    cv.util.ScriptLoader.getInstance().setAllQueued(true);
                  }

                  this.removeListenerById(lid);
                }
              }, this);
            }
          } else {
            allPluginsQueued = true;
          }
        } else {
          this.debug('no plugins to load => all scripts queued');
          cv.util.ScriptLoader.getInstance().setAllQueued(true);
        }
      },
      __P_2_4: function __P_2_4() {
        var startpage = 'id_';

        if (cv.Config.startpage) {
          startpage = cv.Config.startpage;

          if (qx.core.Environment.get('html.storage.local') === true) {
            if (startpage === 'remember') {
              startpage = localStorage.getItem('lastpage');
              cv.Config.rememberLastPage = true;

              if (typeof startpage !== 'string' || startpage.substr(0, 3) !== 'id_') {
                startpage = 'id_'; // fix obvious wrong data
              }
            } else if (startpage === 'noremember') {
              localStorage.removeItem('lastpage');
              startpage = 'id_';
              cv.Config.rememberLastPage = false;
            }
          }
        } else {
          var req = qx.util.Uri.parseUri(window.location.href);

          if (req.anchor && req.anchor.substring(0, 3) === 'id_') {
            startpage = req.anchor;
          }
        }

        if (startpage.match(/^id_[0-9_]*$/) !== null) {
          cv.Config.initialPage = startpage;
        } else {
          // wait for DOM to be ready and detect the page id then
          qx.event.message.Bus.subscribe('setup.dom.finished.before', function () {
            cv.Config.initialPage = cv.TemplateEngine.getInstance().getPageIdByPath(startpage) || 'id_';
          });
        }
      },
      _checkBackend: function _checkBackend() {
        var _this4 = this;

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
              this.setServerHasPhpSupport(false);
              this.error('Disabling manager due to missing PHP support.');
              this.setManagerDisabled(true);
              this.setManagerDisabledReason(qx.locale.Manager.tr('Your server does not support PHP'));
              this.setManagerChecked(true);
            } else {
              // is this is served by native openHAB server, we do not have native PHP support, only the basic
              // rest api is available, but nothing else that needs PHP (like some plugin backend code)
              this.setServerHasPhpSupport(!isOpenHab);
              var serverVersionId = env.PHP_VERSION_ID; //const [major, minor] = env.phpversion.split('.').map(ver => parseInt(ver));

              var disable = false;

              if (Object.prototype.hasOwnProperty.call(env, 'required_php_version')) {
                var parts = env.required_php_version.split(' ');
                disable = parts.some(function (constraint) {
                  var match = /^(>=|<|>|<=|\^)(\d+)\.(\d+)\.?(\d+)?$/.exec(constraint);

                  if (match) {
                    var operator = match[1];
                    var majorConstraint = parseInt(match[2]);
                    var hasMinorVersion = match[3] !== undefined;
                    var minorConstraint = hasMinorVersion ? parseInt(match[3]) : 0;
                    var hasPatchVersion = match[4] !== undefined;
                    var patchConstraint = hasPatchVersion ? parseInt(match[4]) : 0;
                    var constraintId = 10000 * majorConstraint + 100 * minorConstraint + patchConstraint;
                    var maxId = 10000 * majorConstraint + (hasMinorVersion ? 100 * minorConstraint : 999) + (hasPatchVersion ? patchConstraint : 99); // incomplete implementation of: https://getcomposer.org/doc/articles/versions.md#writing-version-constraints

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
                });

                if (disable) {
                  this.error('Disabling manager due to PHP version mismatch. Installed:', env.phpversion, 'required:', env.required_php_version);
                  this.setManagerDisabled(true);
                  this.setManagerDisabledReason(qx.locale.Manager.tr('Your system does not provide the required PHP version for the manager. Installed: %1, required: %2', env.phpversion, env.required_php_version));
                } else {
                  this.info('Manager available for PHP version', env.phpversion);
                }
              }
            }

            this.setManagerChecked(true);

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
          }, this);
          xhr.addListener('statusError', function (e) {
            _this4.setManagerChecked(true);
          });
          xhr.send();
        }
      },
      close: function close() {
        this.setActive(false);
        var client = cv.TemplateEngine.getClient();

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
            this.debug('ServiceWorker successfully registered for scope ' + reg.scope); // configure service worker

            var configMessage = {
              'command': 'configure',
              'message': {
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

//# sourceMappingURL=Application.js.map?dt=1702898789217