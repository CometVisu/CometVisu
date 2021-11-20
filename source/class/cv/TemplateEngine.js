/* TemplateEngine.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 *
 */
qx.Class.define('cv.TemplateEngine', {
  extend: qx.core.Object,
  type: 'singleton',

  construct: function() {
    // this.base(arguments);
    this.lazyPlugins = ['plugin-openhab'];

    this.__partQueue = new qx.data.Array();
    this._domFinishedQueue = [];
    this.__partQueue.addListener('changeLength', function(ev) {
      this.setPartsLoaded(ev.getData() === 0);
    }, this);

    this.defaults = {widget: {}, plugin: {}};
    const group = new qx.ui.command.Group();
    this.setCommands(group);
    const app = qx.core.Init.getApplication();
    if (app) {
      // application is not available in tests
      const manager = app.getCommandManager();
      manager.add(group);
      manager.setActive(group);
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Shortcut access to client
     */
    getClient: function () {
      return this.getInstance().visu;
    }
  },

  properties: {

    /**
     * Shows the loading state of the parts
     */
    partsLoaded: {
      check: 'Boolean',
      init: false,
      apply: '_applyLoaded',
      event: 'changePartsLoaded'
    },

    /**
     * Shows the loading state of the scripts
     */
    scriptsLoaded: {
      check: 'Boolean',
      init: false,
      apply: '_applyLoaded'
    },

    /**
     * Shows the initialization state of the TemplateEngine. It gets until when all
     * external stuff (pars, scripts, etc.) has been loaded.
     */
    ready: {
      check: 'Boolean',
      init: false,
      event: 'changeReady',
      apply: '_applyReady'
    },

    domFinished: {
      check: 'Boolean',
      init: false,
      apply: '_applyDomFinished',
      event: 'changeDomFinished'
    },

    commands: {
      check: 'qx.ui.command.Group',
      nullable: true
    },
    
    // sent after the client is logged in to the backend
    loggedIn: {
      check: 'Boolean',
      init: false,
      event: 'changeLoggedIn'
    },

    // highlight a widget
    highlightedWidget: {
      check: 'String',
      nullable: true,
      apply: '_applyHighlightedWidget'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    // if true the whole widget reacts on click events
    // if false only the actor in the widget reacts on click events
    bindClickToWidget : false,
    /**
     * Structure where a design can set a default value that a widget or plugin
     * can use.
     * This is especially important for design relevant information like colors
     * that can not be set though CSS.
     *
     * Usage: this.defaults.plugin.foo = {bar: 'baz'};
     */
    defaults : null,

    visu : null,

    pluginsToLoadCount : 0,
    xml : null,

    __partQueue: null,
    _domFinishedQueue: null,

    // plugins that do not need to be loaded to proceed with the initial setup
    lazyPlugins: null,
    __activeChangedTimer: null,
    __hasBeenConnected: false,

    /**
     * Load parts (e.g. plugins, structure)
     *
     * @param parts {String[]|String} parts to load
     */
    loadParts: function(parts) {
      if (!Array.isArray(parts)) {
        parts = [parts];
      }
      const loadLazyParts = this.lazyPlugins.filter(function (part) {
        return parts.indexOf(part) >= 0;
      });
      if (loadLazyParts.length) {
        parts = parts.filter(function(p) {
          return !loadLazyParts.includes(p);
        });
      }
      this.__partQueue.append(parts);
      qx.io.PartLoader.require(parts, function(states) {
        parts.forEach(function(part, idx) {
          if (states[idx] === 'complete') {
            this.debug('successfully loaded part '+part);
            if (part.startsWith('structure-')) {
              cv.Config.loadedStructure = part.substring(10);
              qx.core.Init.getApplication().setStructureLoaded(true);
            }
            this.__partQueue.remove(part);
          } else {
            this.error('error loading part '+part);
          }
        }, this);
      }, this);

      // load the lazy plugins no one needs to wait for
      qx.io.PartLoader.require(loadLazyParts, function(states) {
        loadLazyParts.forEach(function(part, idx) {
          if (states[idx] === 'complete') {
            this.debug('successfully loaded part '+part);
          } else {
            this.error('error loading part '+part);
          }
        }, this);
      }, this);
    },

    // property apply
    _applyReady: function(value) {
      if (value === true) {
        this.setupUI();
      }
    },

    // property apply
    _applyLoaded: function(value, old, name) {
      this.debug(name+' is '+value+' now');
      if (this.isPartsLoaded() && this.isScriptsLoaded()) {
        this.setReady(true);
      }
    },

    // property apply
    _applyDomFinished: function(value) {
      if (value) {
        qx.event.message.Bus.dispatchByName('setup.dom.finished');
        // flush the queue
        this._domFinishedQueue.forEach(function(entry) {
          const callback = entry.shift();
          const context = entry.shift();
          callback.apply(context, entry);
        }, this);
        this._domFinishedQueue = [];
      }
    },

    /**
     * Adds a callback to a queue which is executed after DOM has been rendered
     * @param callback {Function}
     * @param context {Object}
     */
    executeWhenDomFinished: function(callback, context) {
      if (!this.isDomFinished()) {
        // queue callback
        this._domFinishedQueue.push(Array.prototype.slice.call(arguments));
      } else {
        callback.apply(context, Array.prototype.slice.call(arguments, 2));
      }
    },

    /**
     * Please use {cv.data.Model.getInstance().addAddress()} instead
     * @param address
     * @param id
     * @deprecated since version 0.11.0 Please use {cv.data.Model.getInstance().addAddress()} instead
     */
    addAddress: function (address, id) {
      this.warn('addAddress is deprecated! Please use cv.data.Model.getInstance().addAddress() instead');
      cv.data.Model.getInstance().addAddress(address, id);
    },

    /**
     * Please use {cv.data.Model.getInstance().getAddresses()} instead
     * @deprecated since version 0.11.0 Please use {cv.data.Model.getInstance().getAddresses()} instead
     */
    getAddresses: function () {
      this.warn('getAddresses is deprecated! Please use cv.data.Model.getInstance().getAddresses() instead');
      return cv.data.Model.getInstance().getAddresses();
    },

    /**
     * Initialize the {@link cv.io.Client} for backend communication
     */
    initBackendClient: function () {
      let backendName = cv.Config.configSettings.backend || cv.Config.backend;
      let backendUrl = cv.Config.configSettings.backendUrl || cv.Config.backendUrl;
      const mapping = {
        oh: 'openhab',
        oh2: 'openhab2'
      };
      if (Object.prototype.hasOwnProperty.call(mapping, backendName)) {
        backendName = mapping[backendName];
      }
      this.visu = cv.Application.createClient(backendName, backendUrl);

      const model = cv.data.Model.getInstance();
      this.visu.update = model.update.bind(model); // override clients update function
      if (cv.Config.reporting) {
        const recordInstance = cv.report.Record.getInstance();
        this.visu.record = function(p, d) {
         recordInstance.record(cv.report.Record.BACKEND, p, d);
        };
      }
      this.visu.showError = this._handleClientError.bind(this);
      this.visu.user = 'demo_user'; // example for setting a user
      const visu = this.visu;

      if (cv.Config.sentryEnabled && window.Sentry) {
        Sentry.configureScope(function (scope) {
          scope.setTag('backend', visu.backendName);
          const webServer = visu.getServer();
          if (webServer) {
            scope.setTag('server.backend', webServer);
          }
          if (cv.Config.configServer) {
            scope.setTag('server.web', cv.Config.configServer);
          }
        });
        visu.addListener('changedServer', this._updateClientScope, this);
      }
      const app = qx.core.Init.getApplication();
      app.addListener('changeActive', this._onActiveChanged, this);

      // show connection state in NotificationCenter
      this.visu.addListener('changeConnected', this._checkBackendConnection, this);
    },

    _onActiveChanged: function () {
      const app = qx.core.Init.getApplication();
      if (app.isActive()) {
        if (!this.visu.isConnected() && this.__hasBeenConnected) {
          // reconnect
          this.visu.restart(true);
        }
        // wait for 3 seconds before checking the backend connection
        if (!this.__activeChangedTimer) {
          this.__activeChangedTimer = new qx.event.Timer(3000);
          this.__activeChangedTimer.addListener('interval', function () {
            if (app.isActive()) {
              this._checkBackendConnection();
            }
            this.__activeChangedTimer.stop();
          }, this);
        }
        this.__activeChangedTimer.restart();
      } else {
        this._checkBackendConnection();
      }
    },

    _checkBackendConnection: function () {
      const connected = this.visu.isConnected();
      const message = {
        topic: 'cv.client.connection',
        title: qx.locale.Manager.tr('Connection error'),
        severity: 'urgent',
        unique: true,
        deletable: false,
        condition: !connected && this.__hasBeenConnected && qx.core.Init.getApplication().isActive()
      };
      const lastError = this.visu.getLastError();
      if (!connected) {
        if (lastError && (Date.now() - lastError.time) < 100) {
          message.message = qx.locale.Manager.tr('Error requesting %1: %2 - %3.', lastError.url, lastError.code, lastError.text);
        } else {
          message.message = qx.locale.Manager.tr('Connection to backend is lost.');
        }
      } else {
        this.__hasBeenConnected = true;
      }
      cv.core.notifications.Router.dispatchMessage(message.topic, message);
    },

    _updateClientScope: function () {
      const visu = this.visu;
      Sentry.configureScope(function (scope) {
        const webServer = visu.getServer();
        if (webServer) {
          scope.setTag('server.backend', webServer);
        }
      });
    },

    _handleClientError: function (errorCode, varargs) {
      varargs = Array.prototype.slice.call(arguments, 1);
      varargs = JSON.stringify(varargs[0], null, 2);
      // escape HTML:
      let div = document.createElement('div');
      div.innerText = varargs;
      varargs = div.innerHTML;
      let notification;
      switch (errorCode) {
        case cv.io.Client.ERROR_CODES.PROTOCOL_MISSING_VERSION:
          notification = {
            topic: 'cv.error',
            title: qx.locale.Manager.tr('CometVisu protocol error'),
            message:  qx.locale.Manager.tr('The backend did send an invalid response to the %1Login%2 request: missing protocol version.',
              '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
              '</a>') + '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
            '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + varargs + '</pre></div>',
            severity: 'urgent',
            unique: true,
            deletable: false
          };
          break;

        case cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I:
          notification = {
            topic: 'cv.error',
            title: qx.locale.Manager.tr('CometVisu protocol error'),
            message:  qx.locale.Manager.tr('The backend did send an invalid response to a %1read%2 request: Missing "i" value.',
              '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
              '</a>') + '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
              '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + varargs +'</pre></div>',
            severity: 'urgent',
            unique: true,
            deletable: false
          };
          break;
      }
      if (notification) {
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
      }
    },

    /**
     * Read basic settings and meta-section from config document
     * @param done {Function} called when done
     */
    parse(done) {
      /*
       * First, we try to get a design by url. Secondly, we try to get a predefined
       */
      // read predefined design in config
      const settings = cv.Config.configSettings;
      // all config files must have a root with some attributes to be able to detect at least the design
      // if not provides via URL, because the design is needed to detect the structure that can load the config
      const rootNode = this.xml.documentElement;

      const predefinedDesign = rootNode.getAttribute('design');
      // design by url
      // design by config file
      if (!cv.Config.clientDesign && !settings.clientDesign) {
        if (predefinedDesign) {
          settings.clientDesign = predefinedDesign;
        } else {
          // selection dialog
          this.selectDesign();
        }
      }

      if (rootNode.getAttribute('backend') !== null) {
        settings.backend = rootNode.getAttribute('backend');
      }
      if (rootNode.getAttribute('backend-url') !== null) {
        settings.backendUrl = rootNode.getAttribute('backend-url');
      }

      if (rootNode.getAttribute('token') !== null) {
        settings.credentials.token = rootNode.getAttribute('token');
      }
      if (rootNode.getAttribute('username') !== null) {
        settings.credentials.username = rootNode.getAttribute('username');
      }
      if (rootNode.getAttribute('password') !== null) {
        settings.credentials.password = rootNode.getAttribute('password');
      }
      this.initBackendClient();

      settings.screensave_time = rootNode.getAttribute('screensave_time');
      if (settings.screensave_time) {
        settings.screensave_time = parseInt(settings.screensave_time, 10);
      }
      settings.screensave_page = rootNode.getAttribute('screensave_page');

      if (rootNode.getAttribute('max_mobile_screen_width') !== null) {
        settings.maxMobileScreenWidth = rootNode.getAttribute('max_mobile_screen_width');
      }

      const globalClass = rootNode.getAttribute('class');
      if (globalClass !== null) {
        document.querySelector('body').classList.add(globalClass);
      }

      settings.scriptsToLoad = [];
      settings.stylesToLoad = [];
      const design = cv.Config.getDesign();
      if (design) {
        let baseUri = 'designs/' + design;
        settings.stylesToLoad.push(baseUri + '/basic.css');
        this.debug('cv.Config.mobileDevice: ' + cv.Config.mobileDevice);
        if (cv.Config.mobileDevice) {
          settings.stylesToLoad.push(baseUri + '/mobile.css');
          document.querySelector('body').classList.add('mobile');
        }
        settings.stylesToLoad.push(baseUri + '/custom.css');
        settings.scriptsToLoad.push('designs/' + design + '/design_setup.js');

        cv.util.ScriptLoader.getInstance().addListenerOnce('designError', function (ev) {
          if (ev.getData() === design) {
            this.error('Failed to load "' + design + '" design! Falling back to simplified "' + cv.Config.loadedStructure + '"');

            baseUri = 'designs/' + cv.Config.loadedStructure;
            const alternativeStyles = [baseUri + '/basic.css'];
            if (cv.Config.mobileDevice) {
              alternativeStyles.push(baseUri + '/mobile.css');
            }
            alternativeStyles.push(baseUri + '/custom.css');
            cv.util.ScriptLoader.getInstance().addStyles(alternativeStyles);
            cv.util.ScriptLoader.getInstance().addScripts(baseUri + '/design_setup.js');
          }
        }, this);
      }
      // load structure-part
      this.loadParts([cv.Config.getStructure()]);

      const app = qx.core.Init.getApplication();

      if (app.isStructureLoaded()) {
        cv.Application.structureController.parseSettings(this.xml);
        cv.Application.structureController.preParse(this.xml).then(done);
      } else {
        app.addListenerOnce('changeStructureLoaded', () => {
          cv.Application.structureController.parseSettings(this.xml);
          cv.Application.structureController.preParse(this.xml).then(done);
        });
      }
    },

    /**
     * Main setup to get everything running and show the initial UI page.
     */
    setupUI: function () {
      // and now setup the UI
      this.debug('setup');

      // login to backend as it might change some settings needed for further processing
      this.visu.login(true, cv.Config.configSettings.credentials, function () {
        this.debug('logged in');
        this.setLoggedIn(true);
        cv.Application.structureController.createUI(this.xml);
        this.xml = null; // not needed anymore - free the space
        this.startInitialRequest();
        this.startScreensaver();
        if (qx.core.Environment.get('qx.aspects')) {
          qx.dev.Profile.stop();
          qx.dev.Profile.showResults(50);
        }
      }, this);
    },

    /**
     * Start the screensaver if a screensave time is set
     */
    startScreensaver: function() {
      if (typeof cv.Config.configSettings.screensave_time === 'number') {
        this.screensave = new qx.event.Timer(cv.Config.configSettings.screensave_time * 1000);
        this.screensave.addListener('interval', cv.Application.structureController.doScreenSave, cv.Application.structureController);
        this.screensave.start();
        qx.event.Registration.addListener(window, 'useraction', this.screensave.restart, this.screensave);
      }
    },

    /**
     * Start retrieving data from backend
     */
    startInitialRequest: function() {
      if (qx.core.Environment.get('qx.debug')) {
        cv.report.Replay.start();
      }
      if (cv.Config.enableAddressQueue) {
        // identify addresses on startpage
        this.visu.setInitialAddresses(cv.Application.structureController.getInitialAddresses());
      }
      const addressesToSubscribe = cv.data.Model.getInstance().getAddresses();
      if (addressesToSubscribe.length !== 0) {
        this.visu.subscribe(addressesToSubscribe);
      }
    },

    _applyHighlightedWidget: function (value, old) {
      if (old) {
        const oldElement = document.getElementById(old);
        if (oldElement) {
          oldElement.classList.remove('highlightedWidget');
        }
      }
      if (value) {
        const element = document.getElementById(value);
        if (element) {
          element.classList.add('highlightedWidget');
        }
      }
    },

    selectDesign: function () {
      const body = document.querySelector('body');

      document.querySelectorAll('body > *').forEach(function(elem) {
        elem.style.display = 'none';
      }, this);
      body.style['background-color'] = 'black';


      const div = qx.dom.Element.create('div', {id: 'designSelector'});
      Object.entries({
        background: '#808080',
        width: '400px',
        color: 'white',
        margin: 'auto',
        padding: '0.5em'
      }).forEach(function(key_value) {
        body.style[key_value[0]]=key_value[1];
      });
      div.innerHTML = 'Loading ...';

      body.appendChild(div);

      const store = new qx.data.store.Json(qx.util.ResourceManager.getInstance().toUri('designs/get_designs.php'));

      store.addListener('loaded', function () {
        let html = '<h1>Please select design</h1>';
        html += '<p>The Location/URL will change after you have chosen your design. Please bookmark the new URL if you do not want to select the design every time.</p>';

        div.innerHTML = html;

        store.getModel().forEach(function(element) {
          const myDiv = qx.dom.Element.create('div', {
            cursor: 'pointer',
            padding: '0.5em 1em',
            borderBottom: '1px solid black',
            margin: 'auto',
            width: '262px',
            position: 'relative'
          });

          myDiv.innerHTML = '<div style="font-weight: bold; margin: 1em 0 .5em;">Design: ' + element + '</div>';
          myDiv.innerHTML += '<iframe src="'+qx.util.ResourceManager.getInstance().toUri('designs/design_preview.html')+'?design=' + element + '" width="160" height="90" border="0" scrolling="auto" frameborder="0" style="z-index: 1;"></iframe>';
          myDiv.innerHTML += '<img width="60" height="30" src="'+qx.util.ResourceManager.getInstance().toUri('demo/media/arrow.png')+'" alt="select" border="0" style="margin: 60px 10px 10px 30px;"/>';

          div.appendChild(myDiv);


          const tDiv = qx.dom.Element.create('div', {
            background: 'transparent',
            position: 'absolute',
            height: '90px',
            width: '160px',
            zIndex: 2
          });
          const pos = document.querySelector('iframe').getBoundingClientRect();
          Object.entries({
            left: pos.left + 'px',
            top: pos.top + 'px'
          }).forEach(function(key_value) {
	     tDiv.style[key_value[0]]=key_value[1]; 
	  });
          myDiv.appendChild(tDiv);

          qx.event.Registration.addListener(myDiv, 'pointerover', function() {
            myDiv.style.background = '#bbbbbb';
          }, this);

          qx.event.Registration.addListener(myDiv, 'pointerout', function() {
            myDiv.style.background = 'transparent';
          }, this);

          qx.event.Registration.addListener(myDiv, 'tap', function() {
            let href = document.location.href;
            if (document.location.hash) {
              href = href.split('#')[0];
            }
            if (document.location.search === '') {
              document.location.href = href + '?design=' + element;
            } else {
              document.location.href = href + '&design=' + element;
            }
          });
        });
      });
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects('__activeChangedTimer');
  }
});
