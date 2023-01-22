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
    __clients: {},
    __activeChangedTimer: null,
    __disconnectTimer: null,
    __hasBeenConnected: false,
    __activeChangeListenerId: null,

    /**
     * Initialize the {@link cv.io.Client} for backend communication
     */
    initBackendClient() {
      if (cv.Config.testMode === true || window.cvTestMode === true) {
        return this.addBackendClient('main', 'simulated');
      }
      let backendName = (
        cv.Config.URL.backend ||
        cv.Config.configSettings.backend ||
        cv.Config.server.backend ||
        'default'
      ).split(',')[0];
      const backendKnxdUrl =
        cv.Config.URL.backendKnxdUrl || cv.Config.configSettings.backendKnxdUrl || cv.Config.server.backendKnxdUrl;
      const backendMQTTUrl =
        cv.Config.URL.backendMQTTUrl || cv.Config.configSettings.backendMQTTUrl || cv.Config.server.backendMQTTUrl;
      const backendOpenHABUrl =
        cv.Config.URL.backendOpenHABUrl ||
        cv.Config.configSettings.backendOpenHABUrl ||
        cv.Config.server.backendOpenHABUrl;

      switch (backendName) {
        case 'knxd':
        case 'default':
        default:
          return this.addBackendClient('main', 'knxd', backendKnxdUrl, 'server');

        case 'mqtt':
          return this.addBackendClient('main', 'mqtt', backendMQTTUrl, 'server');

        case 'openhab':
        case 'openhab2':
        case 'oh':
        case 'oh2':
          return this.addBackendClient('main', 'openhab', backendOpenHABUrl, 'server');
      }
    },

    addBackendClient(name, type, backendUrl, source) {
      if (name === 'system') {
        throw Error('"system" is not allowed as a backend name');
      }
      if (this.__clients[name]) {
        this.__clients[name].dispose();
        delete this.__clients[name];
      }
      const client = cv.Application.createClient(type, backendUrl);
      if (source) {
        client.configuredIn = source;
      }
      this.__clients[name] = client;
      const model = cv.data.Model.getInstance();
      client.addListener('changeConnected', ev => {
        const data = {};
        // convert to internal state used for boolean values
        data[`backend:${name}:connected`] = ev.getData() ? 1 : 0;
        // this is a value the system backend
        model.updateFrom('system', data);
      });
      client.update = data => model.updateFrom(name, data); // override clients update function
      if (cv.Config.reporting) {
        const recordInstance = cv.report.Record.getInstance();
        client.record = function (p, d) {
          recordInstance.record(cv.report.Record.BACKEND, p, d);
        };
      }
      client.showError = this._handleClientError.bind(this);

      if (cv.Config.sentryEnabled && window.Sentry) {
        Sentry.configureScope(function (scope) {
          scope.setTag('backend.' + name, type);
          const webServer = client.getServer();
          if (webServer) {
            scope.setTag('server.backend.' + name, webServer);
          }
          if (name === 'main' && cv.Config.configServer) {
            scope.setTag('server.web.main', cv.Config.configServer);
          }
        });
        client.addListener('changedServer', () => this._updateClientScope(name));
      }
      if (!this.__activeChangeListenerId) {
        const app = qx.core.Init.getApplication();
        if (app) {
          this.__activeChangeListenerId = app.addListener(
            'changeActive',
            this._onActiveChanged,
            this
          );
        }
      }

      // show connection state in NotificationCenter
      client.addListener('changeConnected', () => this._checkBackendConnection(name));

      return client;
    },

    removeClient(client) {
      for (let name in this.__clients) {
        if (this.__clients[name] === client) {
          delete this.__clients[name];
          break;
        }
      }
    },

    /**
     * Checks if a backend by that name is already registered
     * @param name {String} name of the backend
     * @return {boolean}
     */
    hasClient(name) {
      return Object.prototype.hasOwnProperty.call(this.__clients, name);
    },

    /**
     * Get the backend client by name, if the name is not set the default backend is used.
     * Usually that is the backend client created by initBackendClient().
     * @param backendName {String?} name of the backend
     */
    getClient(backendName) {
      if (backendName === 'system') {
        if (!this.hasClient('system')) {
          this.__clients.system = new cv.io.System();
        }
        return this.__clients.system;
      }
      if (!backendName) {
        backendName = cv.data.Model.getInstance().getDefaultBackendName();
      }
      if (!this.__clients[backendName] && cv.Config.testMode) {
        // in testMode the client might not have been initialized yet
        return this.addBackendClient('main', 'simulated');
      }
      return this.__clients[backendName];
    },

    initSystemBackend() {
      // make sure that we have a "system" backend
      if (!this.hasClient('system')) {
        this.__clients.system = new cv.io.System();
      }
      const client = this.__clients.system;
      const addressesToSubscribe = cv.data.Model.getInstance().getAddresses('system');
      if (addressesToSubscribe.length !== 0) {
        client.subscribe(addressesToSubscribe);
      }
    },

    /**
     * Start retrieving data from backend
     */
    startInitialRequest() {
      if (qx.core.Environment.get('qx.debug')) {
        cv.report.Replay.start();
      }
      Object.getOwnPropertyNames(this.__clients).forEach(name => {
        const client = this.getClient(name);
        if (cv.Config.enableAddressQueue) {
          // identify addresses on startpage
          client.setInitialAddresses(cv.Application.structureController.getInitialAddresses(name));
        }
        const addressesToSubscribe = cv.data.Model.getInstance().getAddresses(name);
        if (addressesToSubscribe.length !== 0) {
          client.subscribe(addressesToSubscribe);
        }
      });
    },

    _onActiveChanged() {
      const app = qx.core.Init.getApplication();
      if (app.isActive()) {
        if (this.__disconnectTimer) {
          this.__disconnectTimer.dispose();
          this.__disconnectTimer = null;
        }
        Object.getOwnPropertyNames(this.__clients).forEach(backendName => {
          const client = this.__clients[backendName];
          if (!client.isConnected() && this.__hasBeenConnected) {
            // reconnect
            qx.log.Logger.debug(this, `restarting ${backendName} backend connection`);

            client.restart(true);
          }
        });

        // wait for 3 seconds before checking the backend connection
        if (!this.__activeChangedTimer) {
          this.__activeChangedTimer = new qx.event.Timer(3000);
          this.__activeChangedTimer.addListener('interval', () => {
            if (app.isActive()) {
              Object.getOwnPropertyNames(this.__clients).forEach(this._checkBackendConnection, this);
            }
            this.__activeChangedTimer.dispose();
            this.__activeChangedTimer = null;
          });
        }
        this.__activeChangedTimer.restart();
      } else {
        if (this.__activeChangedTimer) {
          this.__activeChangedTimer.dispose();
          this.__activeChangedTimer = null;
        }
        if (!this.__disconnectTimer) {
          // disconnect after 60 secs
          this.__disconnectTimer = new qx.event.Timer(60000);
          this.__disconnectTimer.addListener('interval', () => {
            Object.getOwnPropertyNames(this.__clients).forEach(name => {
              const client = this.getClient(name);
              if (client.isConnected()) {
                client.terminate();
              }
            });
            this.__disconnectTimer.dispose();
            this.__disconnectTimer = null;
          });
        }
        this.__disconnectTimer.restart();
      }
    },

    _checkBackendConnection(name) {
      const client = this.getClient(name);
      const connected = client.isConnected();
      const message = {
        topic: 'cv.client.connection.' + name,
        title: qx.locale.Manager.tr('Connection error'),
        severity: 'urgent',
        unique: true,
        deletable: false,
        condition: !connected && this.__hasBeenConnected && qx.core.Init.getApplication().isActive()
      };

      const lastError = client.getLastError();
      if (!connected) {
        if (lastError && Date.now() - lastError.time < 100) {
          message.message = qx.locale.Manager.tr(
            'Error requesting %1: %2 - %3.',
            lastError.url,
            lastError.code,
            lastError.text
          );
        } else {
          message.message = qx.locale.Manager.tr('Connection to backend "%1" is lost.', name);
        }
        message.actions = {
          link: [
            {
              title: qx.locale.Manager.tr('Restart connection'),
              action() {
                client.restart();
              }
            }
          ]
        };
      } else {
        this.__hasBeenConnected = true;
      }
      cv.core.notifications.Router.dispatchMessage(message.topic, message);
    },

    _updateClientScope(name) {
      const client = this.getClient(name);
      Sentry.configureScope(function (scope) {
        const webServer = client.getServer();
        if (webServer) {
          scope.setTag('server.backend.' + name, webServer);
        }
      });
    },

    _handleClientError(errorCode, varargs) {
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
            message:
              qx.locale.Manager.tr(
                'The backend did send an invalid response to the %1Login%2 request: missing protocol version.',
                '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
                '</a>'
              ) +
              '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
              '<br/><br/><strong>' +
              qx.locale.Manager.tr('Backend-Response:') +
              '</strong><pre>' +
              varargs +
              '</pre></div>',
            severity: 'urgent',
            unique: true,
            deletable: false
          };

          break;

        case cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I:
          notification = {
            topic: 'cv.error',
            title: qx.locale.Manager.tr('CometVisu protocol error'),
            message:
              qx.locale.Manager.tr(
                'The backend did send an invalid response to a %1read%2 request: Missing "i" value.',
                '<a href="https://github.com/CometVisu/CometVisu/wiki/Protocol#Login" target="_blank">',
                '</a>'
              ) +
              '<br/>' +
              qx.locale.Manager.tr('Please try to fix the problem in the backend.') +
              '<br/><br/><strong>' +
              qx.locale.Manager.tr('Backend-Response:') +
              '</strong><pre>' +
              varargs +
              '</pre></div>',
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
