function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Config": {},
      "cv.data.Model": {},
      "cv.Application": {},
      "cv.report.Record": {},
      "qx.core.Init": {},
      "cv.io.System": {},
      "qx.log.Logger": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {},
      "cv.io.Client": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* BackendConnections.js
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
   * Global factory for backend connections.
   */
  qx.Class.define('cv.io.BackendConnections', {
    type: 'static',
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      __P_533_0: {},
      __P_533_1: null,
      __P_533_2: null,
      __P_533_3: false,
      __P_533_4: null,
      __P_533_5: {},
      __P_533_6: {},
      addClassLoadedListener: function addClassLoadedListener(className, callback) {
        if (!this.__P_533_5[className]) {
          this.__P_533_5[className] = [];
        }
        if (!this.__P_533_5[className].includes(callback)) {
          this.__P_533_5[className].push(callback);
        }
      },
      registerClientClass: function registerClientClass(name, Clazz) {
        if (!this.__P_533_6[name]) {
          this.__P_533_6[name] = Clazz;
          if (this.__P_533_5[name]) {
            var _iterator = _createForOfIteratorHelper(this.__P_533_5[name]),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var cb = _step.value;
                cb();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        }
      },
      isRegistered: function isRegistered(name) {
        return !!this.__P_533_6[name];
      },
      /**
       * Initialize all {@link cv.io.IClient} clients for backend communication,
       * return the default one (for backwards compability)
       */
      initBackendClients: function initBackendClients() {
        if (cv.Config.testMode === true || window.cvTestMode === true) {
          if (cv.Config.testMode === true) {
            cv.data.Model.getInstance().setDefaultBackendName('simulated');
          }
          return this.addBackendClient(cv.data.Model.getInstance().getDefaultBackendName(), 'simulated');
        }
        var backendNames = (cv.Config.URL.backend || cv.Config.configSettings.backend || cv.Config.server.backend || 'default').split(',');
        var backendKnxdUrl = cv.Config.URL.backendKnxdUrl || cv.Config.configSettings.backendKnxdUrl || cv.Config.server.backendKnxdUrl;
        var backendMQTTUrl = cv.Config.URL.backendMQTTUrl || cv.Config.configSettings.backendMQTTUrl || cv.Config.server.backendMQTTUrl;
        var backendOpenHABUrl = cv.Config.URL.backendOpenHABUrl || cv.Config.configSettings.backendOpenHABUrl || cv.Config.server.backendOpenHABUrl;
        var defaultName = cv.data.Model.getInstance().getDefaultBackendName() || 'main';
        var defaultClient;
        var defaultType;
        switch (backendNames[0]) {
          case 'knxd':
          case 'default':
          default:
            defaultType = 'knxd';
            defaultClient = this.addBackendClient(defaultName, defaultType, backendKnxdUrl, 'server');
            break;
          case 'mqtt':
            defaultType = 'mqtt';
            defaultClient = this.addBackendClient(defaultName, defaultType, backendMQTTUrl, 'server');
            break;
          case 'openhab':
          case 'openhab2':
          case 'oh':
          case 'oh2':
            defaultType = 'openhab';
            defaultClient = this.addBackendClient(defaultName, defaultType, backendOpenHABUrl, 'server');
            break;
        }

        // check if we need to create more clients
        for (var i = 1; i < backendNames.length; i++) {
          switch (backendNames[i]) {
            case 'knxd':
            case 'default':
              if (backendKnxdUrl && defaultType !== 'knxd') {
                this.addBackendClient('knxd', 'knxd', backendKnxdUrl, 'server');
              }
              break;
            case 'mqtt':
              if (defaultType !== 'mqtt') {
                this.addBackendClient('mqtt', 'mqtt', backendMQTTUrl, 'server');
              }
              break;
            case 'openhab':
              if (backendKnxdUrl && defaultType !== 'openhab') {
                this.addBackendClient('openhab', 'openhab', backendOpenHABUrl, 'server');
              }
              break;
          }
        }
        return defaultClient;
      },
      addBackendClient: function addBackendClient(name, type, backendUrl, source) {
        var _this = this;
        if (name === 'system') {
          throw Error('"system" is not allowed as a backend name');
        }
        if (this.__P_533_0[name]) {
          this.__P_533_0[name].dispose();
          delete this.__P_533_0[name];
        }
        var Clazz = this.__P_533_6[type];
        var client = Clazz ? new Clazz(type, backendUrl) : cv.Application.createClient(type, backendUrl);
        if (source) {
          client.configuredIn = source;
        }
        this.__P_533_0[name] = client;
        client.setName(name);
        var model = cv.data.Model.getInstance();
        client.addListener('changeConnected', function (ev) {
          var data = {};
          // convert to internal state used for boolean values
          data["backend:".concat(name, ":connected")] = ev.getData() ? 1 : 0;
          // this is a value the system backend
          model.updateFrom('system', data);
        });
        client.update = function (data) {
          return model.updateFrom(name, data);
        }; // override clients update function
        if (cv.Config.reporting) {
          var recordInstance = cv.report.Record.getInstance();
          client.record = function (p, d) {
            recordInstance.record(cv.report.Record.BACKEND, p, d, {
              name: name,
              type: type
            });
          };
        }
        client.showError = this._handleClientError.bind(this);
        if (cv.Config.sentryEnabled && window.Sentry) {
          Sentry.configureScope(function (scope) {
            scope.setTag('backend.' + name, type);
            var webServer = client.getServer();
            if (webServer) {
              scope.setTag('server.backend.' + name, webServer);
            }
            if (name === 'main' && cv.Config.configServer) {
              scope.setTag('server.web.main', cv.Config.configServer);
            }
          });
          client.addListener('changedServer', function () {
            return _this._updateClientScope(name);
          });
        }
        if (!this.__P_533_4) {
          var app = qx.core.Init.getApplication();
          if (app) {
            this.__P_533_4 = app.addListener('changeActive', this._onActiveChanged, this);
          }
        }

        // show connection state in NotificationCenter
        client.addListener('changeConnected', function () {
          return _this._checkBackendConnection(name);
        });
        return client;
      },
      removeClient: function removeClient(client) {
        for (var name in this.__P_533_0) {
          if (this.__P_533_0[name] === client) {
            delete this.__P_533_0[name];
            break;
          }
        }
      },
      /**
       * Checks if a backend by that name is already registered
       * @param name {String} name of the backend
       * @return {boolean}
       */
      hasClient: function hasClient(name) {
        return Object.prototype.hasOwnProperty.call(this.__P_533_0, name);
      },
      /**
       * Get the backend client by name, if the name is not set the default backend is used.
       * Usually that is the backend client created by initBackendClients().
       * @param backendName {String?} name of the backend
       */
      getClient: function getClient(backendName) {
        if (backendName === 'system') {
          if (!this.hasClient('system')) {
            this.__P_533_0.system = new cv.io.System();
          }
          return this.__P_533_0.system;
        }
        if (!backendName) {
          backendName = cv.data.Model.getInstance().getDefaultBackendName();
        }
        if (!this.__P_533_0[backendName]) {
          if (cv.Config.testMode) {
            // in testMode the client might not have been initialized yet
            return this.addBackendClient('simulated', 'simulated');
          }
          // backendName might be a type
          return this.getClientByType(backendName);
        }
        return this.__P_533_0[backendName];
      },
      getClientByType: function getClientByType(type) {
        if (type === 'system') {
          if (!this.hasClient('system')) {
            this.__P_533_0.system = new cv.io.System();
          }
          return this.__P_533_0.system;
        }
        var client;
        for (var name in this.__P_533_0) {
          client = this.__P_533_0[name];
          if (client.getType() === type) {
            return client;
          }
        }
        return null;
      },
      getClients: function getClients() {
        return this.__P_533_0;
      },
      initSystemBackend: function initSystemBackend() {
        // make sure that we have a "system" backend
        if (!this.hasClient('system')) {
          this.__P_533_0.system = new cv.io.System();
        }
        var client = this.__P_533_0.system;
        var addressesToSubscribe = cv.data.Model.getInstance().getAddresses('system');
        if (addressesToSubscribe.length !== 0) {
          client.subscribe(addressesToSubscribe);
        }
      },
      /**
       * Start retrieving data from backend
       */
      startInitialRequests: function startInitialRequests() {
        var _this2 = this;
        Object.getOwnPropertyNames(this.__P_533_0).forEach(function (name) {
          _this2.startInitialRequest(name);
        });
      },
      startInitialRequest: function startInitialRequest(name) {
        var client = this.getClient(name);
        if (cv.Config.enableAddressQueue) {
          // identify addresses on startpage
          client.setInitialAddresses(cv.Application.structureController.getInitialAddresses(name));
        }
        var addressesToSubscribe = cv.data.Model.getInstance().getAddresses(name);
        if (addressesToSubscribe.length !== 0) {
          client.subscribe(addressesToSubscribe);
        }
      },
      _onActiveChanged: function _onActiveChanged() {
        var _this3 = this;
        var app = qx.core.Init.getApplication();
        if (app.isActive()) {
          if (this.__P_533_2) {
            this.__P_533_2.dispose();
            this.__P_533_2 = null;
          }
          Object.getOwnPropertyNames(this.__P_533_0).forEach(function (backendName) {
            var client = _this3.__P_533_0[backendName];
            if (!client.isConnected() && _this3.__P_533_3) {
              // reconnect
              qx.log.Logger.debug(_this3, "restarting ".concat(backendName, " backend connection"));
              client.restart(true);
            }
          });

          // wait for 3 seconds before checking the backend connection
          if (!this.__P_533_1) {
            this.__P_533_1 = new qx.event.Timer(3000);
            this.__P_533_1.addListener('interval', function () {
              if (app.isActive()) {
                Object.getOwnPropertyNames(_this3.__P_533_0).forEach(_this3._checkBackendConnection, _this3);
              }
              _this3.__P_533_1.dispose();
              _this3.__P_533_1 = null;
            });
          }
          this.__P_533_1.restart();
        } else {
          if (this.__P_533_1) {
            this.__P_533_1.dispose();
            this.__P_533_1 = null;
          }
          if (!this.__P_533_2) {
            // disconnect after 60 secs
            this.__P_533_2 = new qx.event.Timer(60000);
            this.__P_533_2.addListener('interval', function () {
              Object.getOwnPropertyNames(_this3.__P_533_0).forEach(function (name) {
                var client = _this3.getClient(name);
                if (client.isConnected()) {
                  client.terminate();
                }
              });
              _this3.__P_533_2.dispose();
              _this3.__P_533_2 = null;
            });
          }
          this.__P_533_2.restart();
        }
      },
      _checkBackendConnection: function _checkBackendConnection(name) {
        var client = this.getClient(name);
        var connected = client.isConnected();
        var message = {
          topic: 'cv.client.connection.' + name,
          title: qx.locale.Manager.tr('Connection error'),
          severity: 'urgent',
          unique: true,
          deletable: false,
          condition: !connected && this.__P_533_3 && qx.core.Init.getApplication().isActive()
        };
        var lastError = client.getLastError();
        if (!connected) {
          if (lastError && Date.now() - lastError.time < 100) {
            message.message = qx.locale.Manager.tr('Error requesting %1: %2 - %3.', lastError.url, lastError.code, lastError.text);
          } else {
            message.message = qx.locale.Manager.tr('Connection to backend "%1" is lost.', name);
          }
          message.actions = {
            link: [{
              title: qx.locale.Manager.tr('Restart connection'),
              action: function action() {
                client.restart();
              }
            }]
          };
        } else {
          this.__P_533_3 = true;
        }
        cv.core.notifications.Router.dispatchMessage(message.topic, message);
      },
      _updateClientScope: function _updateClientScope(name) {
        var client = this.getClient(name);
        Sentry.configureScope(function (scope) {
          var webServer = client.getServer();
          if (webServer) {
            scope.setTag('server.backend.' + name, webServer);
          }
        });
      },
      _handleClientError: function _handleClientError(errorCode, varargs) {
        varargs = Array.prototype.slice.call(arguments, 1);
        varargs = JSON.stringify(varargs[0], null, 2);
        // escape HTML:
        var div = document.createElement('div');
        div.innerText = varargs;
        varargs = div.innerHTML;
        var notification;
        switch (errorCode) {
          case cv.io.Client.ERROR_CODES.PROTOCOL_MISSING_VERSION:
            notification = {
              topic: 'cv.error',
              title: qx.locale.Manager.tr('CometVisu protocol error'),
              message: qx.locale.Manager.tr('The backend did send an invalid response to the %1Login%2 request: missing protocol version.', '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">', '</a>') + '<br/>' + qx.locale.Manager.tr('Please try to fix the problem in the backend.') + '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + varargs + '</pre></div>',
              severity: 'urgent',
              unique: true,
              deletable: false
            };
            break;
          case cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I:
            notification = {
              topic: 'cv.error',
              title: qx.locale.Manager.tr('CometVisu protocol error'),
              message: qx.locale.Manager.tr('The backend did send an invalid response to a %1read%2 request: Missing "i" value.', '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">', '</a>') + '<br/>' + qx.locale.Manager.tr('Please try to fix the problem in the backend.') + '<br/><br/><strong>' + qx.locale.Manager.tr('Backend-Response:') + '</strong><pre>' + varargs + '</pre></div>',
              severity: 'urgent',
              unique: true,
              deletable: false
            };
            break;
        }
        if (notification) {
          cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
        }
      }
    }
  });
  cv.io.BackendConnections.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BackendConnections.js.map?dt=1692560744009