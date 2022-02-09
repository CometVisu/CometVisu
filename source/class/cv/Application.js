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
qx.Class.define('cv.Application',
{
  extend : qx.application.Native,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.__appReady = false;
    this.initCommandManager(new qx.ui.command.GroupManager());
    const lang = qx.locale.Manager.getInstance().getLanguage();
    if (qx.io.PartLoader.getInstance().hasPart(lang)) {
      qx.io.PartLoader.require([lang]);
    }

    qx.bom.PageVisibility.getInstance().addListener('change', function () {
      this.setActive(qx.bom.PageVisibility.getInstance().getVisibilityState() === 'visible');
    }, this);

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
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    HTML_STRUCT: '<div id="top" class="loading"><div class="nav_path">-</div></div><div id="navbarTop" class="loading"></div><div id="centerContainer"><div id="navbarLeft" class="loading page"></div><div id="main" style="position:relative; overflow: hidden;" class="loading"><div id="pages" style="position:relative;clear:both;"><!-- all pages will be inserted here --></div></div><div id="navbarRight" class="loading page"></div></div><div id="navbarBottom" class="loading"></div><div id="bottom" class="loading"><hr /><div class="footer"></div></div>',
    consoleCommands: [],
    __commandManager: null,
    _relResourcePath: null,
    _fullResourcePath: null,

    getRelativeResourcePath(fullPath) {
      if (!this._relResourcePath) {
        const baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
        this._relResourcePath = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')).substring(baseUrl.length+1) + '/';
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
    createClient: function(...args) {
      let Client = cv.io.Client;
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
    registerConsoleCommand: function(shortcutName, command, help) {
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
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _blocker: null,
    __appReady: null,

    /**
     * Toggle the {@link qx.bom.Blocker} visibility
     * @param val {Boolean}
     */
    block: function(val) {
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

    _applyMobile: function (value) {
      // maintain old value for compatibility
      if (value && !document.body.classList.contains('mobile')) {
        document.body.classList.add('mobile');
      } else if (!value && document.body.classList.contains('mobile')) {
        document.body.classList.remove('mobile');
      }
      if (this.__appReady) {
        cv.ui.layout.ResizeHandler.invalidateNavbar();
      }
    },

    _applyManagerChecked: function(value) {
      if (value && cv.Config.request.queryKey.manager) {
        const action = cv.Config.request.queryKey.open ? 'open' : '';
        const data = cv.Config.request.queryKey.open ? cv.Config.request.queryKey.open : undefined;
        this.showManager(action, data);
      }
    },

    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function() {
      cv.ConfigCache.init();
      this._checkBackend();
      qx.event.GlobalError.setErrorHandler(this.__globalErrorHandler, this);
      if (qx.core.Environment.get('qx.debug')) {
        if (typeof replayLog !== 'undefined' && replayLog) {
          cv.report.Replay.prepare(replayLog);
        }
      }
      cv.report.Record.prepare();

      let info = '\n' +
        '  _____                     ___      ___\n' +
        ' / ____|                   | \\ \\    / (_)\n' +
        '| |     ___  _ __ ___   ___| |\\ \\  / / _ ___ _   _\n' +
        '| |    / _ \\| \'_ ` _ \\ / _ \\ __\\ \\/ / | / __| | | |\n' +
        '| |___| (_) | | | | | |  __/ |_ \\  /  | \\__ \\ |_| |\n' +
        ' \\_____\\___/|_| |_| |_|\\___|\\__| \\/   |_|___/\\__,_|\n' +
        '-----------------------------------------------------------\n' +
        ' ©2010-' + (new Date().getFullYear()) + ' Christian Mayer and the CometVisu contributers.\n' +
        ' Version: ' + cv.Version.VERSION + '\n';

      if (cv.Application.consoleCommands.length) {
        info += '\n Available commands:\n'+
          '    '+cv.Application.consoleCommands.join('\n    ')+'\n';
      }

      info += '-----------------------------------------------------------\n\n';

      // eslint-disable-next-line no-console
      console.log(info);

      // add command to load and open the manager
      const manCommand = new qx.ui.command.Command('Ctrl+M');
      cv.TemplateEngine.getInstance().getCommands().add('open-manager', manCommand);
      manCommand.addListener('execute', () => this.showManager(), this);
      this.registerServiceWorker();

      if (qx.core.Environment.get('qx.aspects')) {
        qx.dev.Profile.stop();
        qx.dev.Profile.start();
      }
      // Call super class
      this.base(arguments);
      this.block(true);

      // run svg4everybody to support SVG sprites in older browsers
      svg4everybody();

      // support native logging capabilities, e.g. Firebug for Firefox
      //noinspection BadExpressionStatementJS,JSHint
      cv.log.appender.Native;

      // Enable logging in debug variant
      if (qx.core.Environment.get('qx.debug')) {
        // support additional cross-browser console. Press F7 to toggle visibility
        //noinspection BadExpressionStatementJS,JSHint
        qx.log.appender.Console;
      }

      /*
       -------------------------------------------------------------------------
       Below is your actual application code...
       -------------------------------------------------------------------------
       */
      // in debug mode load the uncompressed unobfuscated scripts
      qx.bom.Stylesheet.includeFile(qx.util.ResourceManager.getInstance().toUri('designs/designglobals.css') + (cv.Config.forceReload === true ? '?'+Date.now() : ''));

      this.__init();
      if (typeof cv.Config.mobileDevice === 'boolean') {
        this.setMobile(cv.Config.mobileDevice);
      }
      this._onResize(null, true);
      qx.event.Registration.addListener(window, 'resize', this._onResize, this);
    },

    hideManager: function () {
      if (Object.prototype.hasOwnProperty.call(cv.ui, 'manager')) {
        const ManagerMain = cv.ui['manager']['Main'];
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
    showManager: function (action, data) {
      if (this.isManagerDisabled()) {
        const notification = {
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
          const engine = cv.TemplateEngine.getInstance();
          if (!engine.isLoggedIn() && !action) {
            // never start the manager before we are logged in, as the login response might contain information about the REST API URL
            engine.addListenerOnce('changeLoggedIn', () => this.showManager());
            return;
          }
          const ManagerMain = cv.ui['manager']['Main'];
          const firstCall = !ManagerMain.constructor.$$instance;
          const manager = ManagerMain.getInstance();
          if (!action && !firstCall) {
            manager.setVisible(!manager.getVisible());
          } else if (firstCall) {
            // initially bind manager visibility
            manager.bind('visible', this, 'inManager');
          }

          if (manager.getVisible() && action && data) {
            // delay this a little bit, give the manager some time to settle
            qx.event.Timer.once(() => {
              qx.event.message.Bus.dispatchByName('cv.manager.' + action, data);
            }, this, 1000);
          }
        }, this);
      }
    },

    _applyInManager: function (value) {
      if (value) {
        qx.bom.History.getInstance().addToHistory('manager', qx.locale.Manager.tr('Manager') + ' - CometVisu');
      }
    },

    showConfigErrors: function(configName, options) {
      configName = configName ? 'visu_config_'+configName+'.xml' : 'visu_config.xml';
      const handlerId = options && options.upgradeVersion ? 'cv.ui.manager.editor.Diff' : 'cv.ui.manager.editor.Source';
      const data = {
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

    validateConfig: function (configName) {
      const worker = cv.data.FileWorker.getInstance();
      let displayConfigName = configName;
      if (configName) {
        configName = '_' + configName;
      } else {
        configName = '';
        displayConfigName = 'default';
      }
      let notification = {
        topic: 'cv.config.validation',
        severity: 'normal',
        deletable: true,
        unique: true
      };
      cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
        target: 'toast',
        message: qx.locale.Manager.tr('Validating configuration file...')
      }));
      const res = qx.util.ResourceManager.getInstance();
      let configPath = `config/visu_config${configName}.xml`;
      let url = '';
      if (!res.has(configPath) && res.has(`demo/visu_config${configName}.xml`)) {
        url = res.toUri(`demo/visu_config${configName}.xml`);
      }
      if (!url) {
        url = res.toUri(configPath);
      }
      worker.validateConfig(url).then(res => {
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
          qx.log.Logger.error(this, res);
          cv.core.notifications.Router.dispatchMessage(notification.topic, Object.assign({}, notification, {
            target: 'popup',
            message: qx.locale.Manager.tr('The %1 configuration has %2 errors!', displayConfigName, res.length),
            actions: {
              link: [
                {
                  title: qx.locale.Manager.tr('Show errors'),
                  action: function () {
                    qx.core.Init.getApplication().showConfigErrors(configName);
                  }
                }]
            },
            severity: 'high',
            icon: 'message_attention'
          }));
        }
      }).catch(err => {
        this.error(err);
      });
    },

    __globalErrorHandler: function(ex) {
      // connect client data for Bug-Report
      let exString = '';
      const maxTraceLength = 2000;
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
          let lastLine = '';
          let repeated = 0;
          let nStack = '';
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

      const notification = {
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
          link: [
            {
              title: qx.locale.Manager.tr('Reload'),
              action: function (ev) {
                let parent = ev.getTarget().parentNode;
                while (parent) {
                  if (parent.id === 'notification-center' || parent.classList.contains('popup')) {
                    break;
                  }
                  parent = parent.parentNode;
                }
                let box = parent.querySelector('#enableReporting');
                let url = window.location.href.split('#').shift();
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
            }
          ]
        }
      };
      // reload with reporting checkbox
      let link = '';
      if (!cv.Config.reporting) {
        if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
          link = ' <a href="https://cometvisu.org/CometVisu/de/latest/manual/config/url-params.html#reporting-session-aufzeichnen" target="_blank" title="Hilfe">(?)</a>';
        }
        notification.actions.optionGroup.options.push({
          title: qx.locale.Manager.tr('Action recording') + link,
          name: 'enableReporting'
        });
      }

      if (qx.core.Environment.get('cv.sentry')) {
        if (window.Sentry) {
          // Sentry has been loaded -> add option to send the error
          notification.actions.link.push(
            {
              title: qx.locale.Manager.tr('Send error to sentry.io'),
              action: function () {
                Sentry.captureException(ex);
              },
              needsConfirmation: false,
              deleteMessageAfterExecution: true
            }
          );
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
          // notification.message+='<div class="actions"><input class="reportErrors" type="checkbox" value="true"/>'+qx.locale.Manager.tr("Enable error reporting")+link+'</div>';
        }
      }
      cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
    },

    throwError: qx.core.Environment.select('qx.globalErrorHandling', {
      'true':  function () {
        window.onerror(new Error('test error'));
      },
      'false': null
    }),

    _onResize: function (ev, init) {
      if (cv.Config.mobileDevice === undefined) {
        this.setMobile(window.innerWidth < cv.Config.maxMobileScreenWidth);
      }
      if (!init && this.__appReady) {
        cv.ui.layout.ResizeHandler.invalidateScreensize();
      }
    },

    /**
     * Internal initialization method
     */
    __init: function() {
      qx.event.Registration.addListener(window, 'unload', function () {
        cv.io.Client.stopAll();
      }, this);
      qx.bom.Lifecycle.onReady(async function () {
        // init notification router
        cv.core.notifications.Router.getInstance();
        let body = document.querySelector('body');
        let isCached = false;
        if (cv.Config.enableCache) {
          isCached = await cv.ConfigCache.isCached();
        }
        if (isCached) {
          // load settings
          this.debug('using cache');
          cv.ConfigCache.restore();
          // initialize NotificationCenter
          cv.ui.NotificationCenter.getInstance();
          cv.ui.ToastManager.getInstance();
        } else {
          // load empty HTML structure
          body.innerHTML = cv.Application.HTML_STRUCT;
          // initialize NotificationCenter
          cv.ui.NotificationCenter.getInstance();
          cv.ui.ToastManager.getInstance();
        }
        let configLoader = new cv.util.ConfigLoader();
        configLoader.load(this.bootstrap, this);
      }, this);

      // reaction on browser back button
      qx.bom.History.getInstance().addListener('request', function(e) {
        const anchor = e.getData();
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
    bootstrap: async function(xml) {
      this.debug('bootstrapping');
      const engine = cv.TemplateEngine.getInstance();
      const loader = cv.util.ScriptLoader.getInstance();

      engine.xml = xml;
      loader.addListenerOnce('finished', function() {
        engine.setScriptsLoaded(true);
      }, this);
      let isCached = false;
      let xmlHash;
      if (cv.Config.enableCache) {
        isCached = await cv.ConfigCache.isCached();
        xmlHash = cv.ConfigCache.toHash(xml);
      }

      if (isCached) {
        // check if cache is still valid
        const cacheValid = await cv.ConfigCache.isValid(null, xmlHash);
        if (!cacheValid) {
          this.debug('cache is invalid re-parse xml');
          // cache invalid
          cv.Config.cacheUsed = false;
          cv.ConfigCache.clear();

          // load empty HTML structure
          document.body.innerHTML = cv.Application.HTML_STRUCT;

          //empty model
          cv.data.Model.getInstance().resetWidgetDataModel();
          cv.data.Model.getInstance().resetAddressList();
        } else {
          // loaded cache is still valid
          cv.report.Record.logCache();
          cv.Config.cacheUsed = true;
          cv.Config.lazyLoading = true;
          engine.initBackendClient();
          this.__detectInitialPage();

          // load part for structure
          const structure = cv.Config.getStructure();
          this.debug('loading structure '+structure);
          engine.loadParts([structure], function(states) {
            if (states === 'complete') {
              this.debug(structure + ' has been loaded');
              this.setStructureLoaded(true);
            } else {
              this.error(structure + ' could not be loaded');
              this.setStructureLoaded(false);
            }
          }, this);

          engine.addListenerOnce('changeReady', function() {
            // create the objects
            cv.Config.treePath = cv.Config.initialPage;
            const data = cv.data.Model.getInstance().getWidgetData('id_');
            cv.ui.structure.WidgetFactory.createInstance(data.$$type, data);
          }, this);
          // check if the current design settings overrides the cache one
          this.loadPlugins();
          if (cv.Config.clientDesign && cv.Config.clientDesign !== cv.Config.configSettings.clientDesign) {
            // we have to replace the cached design scripts styles to load
            const styles = [];
            cv.Config.configSettings.stylesToLoad.forEach(function(style) {
              styles.push(style.replace('designs/'+cv.Config.configSettings.clientDesign, 'designs/'+cv.Config.clientDesign));
            }, this);
            this.loadStyles(styles);

            const scripts = [];
            cv.Config.configSettings.scriptsToLoad.forEach(function(style) {
              scripts.push(style.replace('designs/'+cv.Config.configSettings.clientDesign, 'designs/'+cv.Config.clientDesign));
            }, this);
            this.loadScripts(scripts);
          } else {
            this.loadStyles();
            this.loadScripts();
          }
        }
      }
      if (!cv.Config.cacheUsed) {
        this.debug('starting');
        this.__detectInitialPage();
        engine.parseXML(xml, function () {
          this.loadPlugins();
          this.loadStyles();
          this.loadScripts();
          this.debug('done');

          if (cv.Config.enableCache) {
            // cache dom + data when everything is ready
            qx.event.message.Bus.subscribe('setup.dom.finished', function() {
              cv.ConfigCache.dump(xml, xmlHash);
            }, this);
          }
          this.__appReady = true;
        }.bind(this));
      } else {
        this.__appReady = true;
      }
    },

    /**
     * Load CSS styles
     * @param styles {Array?}
     */
    loadStyles: function(styles) {
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
    loadScripts: function(scripts) {
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
    loadPlugins: function() {
      const plugins = cv.Config.configSettings.pluginsToLoad.slice();
      cv.Config.pluginsToLoad.forEach(name => {
        if (!plugins.includes(name)) {
          plugins.push(name);
        }
      });
      if (plugins.length > 0) {
        const standalonePlugins = [];
        let partsLoaded = false;
        let allPluginsQueued = false;
        this.debug('loading plugins');
        const engine = cv.TemplateEngine.getInstance();
        engine.addListener('changePartsLoaded', function(ev) {
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
        const parts = qx.Part.getInstance().getParts();
        const partPlugins = [];
        const path = cv.Application.getRelativeResourcePath();
        plugins.forEach(function(plugin) {
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
          // because they use need the classes provided by it
          if (this.getStructureLoaded()) {
            cv.util.ScriptLoader.getInstance().addScripts(standalonePlugins);
          } else {
            const lid = this.addListener('changeStructureLoaded', function (ev) {
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

    __detectInitialPage: function() {
      let startpage = 'id_';
      if (cv.Config.startpage) {
        startpage = cv.Config.startpage;
        if (qx.core.Environment.get('html.storage.local') === true) {
          if (startpage === 'remember') {
            startpage = localStorage.getItem('lastpage');
            cv.Config.rememberLastPage = true;
            if (typeof (startpage) !== 'string' || startpage.substr(0, 3) !== 'id_') {
              startpage = 'id_'; // fix obvious wrong data
            }
          } else if (startpage === 'noremember') {
            localStorage.removeItem('lastpage');
            startpage = 'id_';
            cv.Config.rememberLastPage = false;
          }
        }
      } else {
        const req = qx.util.Uri.parseUri(window.location.href);
        if (req.anchor && req.anchor.substring(0, 3) === 'id_') {
          startpage = req.anchor;
        }
      }
      if (startpage.match(/^id_[0-9_]*$/) !== null) {
        cv.Config.initialPage = startpage;
      } else {
        // wait for DOM to be ready and detect the page id then
        qx.event.message.Bus.subscribe('setup.dom.finished.before', function() {
          cv.Config.initialPage = cv.TemplateEngine.getInstance().getPageIdByPath(startpage) || 'id_';
        });
      }
    },

    _checkBackend: function () {
      if (cv.Config.testMode === true) {
        this.setManagerChecked(true);
      } else {
        const url = cv.io.rest.Client.getBaseUrl().split('/').slice(0, -1).join('/') + '/environment.php';
        const xhr = new qx.io.request.Xhr(url);
        xhr.set({
          method: 'GET',
          accept: 'application/json'
        });
        xhr.addListenerOnce('success', function (e) {
          const req = e.getTarget();
          const env = req.getResponse();
          const serverVersionId = env.PHP_VERSION_ID;
          //const [major, minor] = env.phpversion.split('.').map(ver => parseInt(ver));
          const parts = env.required_php_version.split(' ');
          const disable = parts.some(constraint => {
            const match = /^(>=|<|>|<=|\^)(\d+)\.(\d+)\.?(\d+)?$/.exec(constraint);
            if (match) {
              const operator = match[1];
              const majorConstraint = parseInt(match[2]);
              const hasMinorVersion = match[3] !== undefined;
              const minorConstraint = hasMinorVersion ? parseInt(match[3]) : 0;
              const hasPatchVersion = match[4] !== undefined;
              const patchConstraint = hasPatchVersion ? parseInt(match[4]) : 0;
              const constraintId = 10000 * majorConstraint + 100 * minorConstraint + patchConstraint;
              const maxId = 10000 * majorConstraint + (hasMinorVersion ? 100 * minorConstraint : 999) + (hasPatchVersion ? patchConstraint : 99);
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
                  if (serverVersionId < constraintId || serverVersionId > 10000 *(majorConstraint+1)) {
                    return true;
                  }
                  break;
                case '~':
                  if (serverVersionId < constraintId || hasPatchVersion ? serverVersionId > 10000 * (majorConstraint+1) : serverVersionId > (10000 *(majorConstraint) + 100 * (patchConstraint+1))) {
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
        xhr.addListener('statusError', e => {
          this.setManagerChecked(true);
        });
        xhr.send();
      }
    },

    close: function () {
      const client = cv.TemplateEngine.getClient();
      if (client) {
        client.terminate();
      }
    },

    /**
     * Install the service-worker if possible
     */
    registerServiceWorker: function() {
      if (cv.Config.useServiceWorker === true) {
        const workerFile = 'ServiceWorker.js';
        navigator.serviceWorker.register(workerFile).then(function(reg) {
          this.debug('ServiceWorker successfully registered for scope '+reg.scope);

          // configure service worker
          var configMessage = {
            'command': 'configure',
            'message': {
              forceReload: cv.Config.forceReload,
              debug: qx.core.Environment.get('qx.debug')
            }
          };

          if (reg.active) {
            reg.active.postMessage(configMessage);
          } else {
            navigator.serviceWorker.ready.then(function(ev) {
              ev.active.postMessage(configMessage);
            });
          }
        }.bind(this)).catch(function(err) {
          this.error('Error registering service-worker: ', err);
        }.bind(this));
      } else if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          this.debug('unregistering existing service workers');
          registrations.forEach(function (registration) {
            registration.unregister();
          });
        }.bind(this));
      }
    }
  }
});
