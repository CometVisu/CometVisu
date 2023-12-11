/* Backend.js
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
 * <cv-backend> Custom element to define a backend connection
 */
qx.Class.define('cv.ui.structure.tile.elements.Backend', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _name: null,
    __applyValues: null,

    _init() {
      const element = this._element;
      const type = element.getAttribute('type');
      const uriString = element.hasAttribute('uri') ? element.getAttribute('uri') : '';
      let uri;
      if (uriString) {
        try {
          uri = new URL(uriString, window.location.origin + window.location.pathname);
        } catch (e) {
          this.error('Error parsing uri: ' + uriString);
        }
      }

      if (type) {
        let credentials = null;
        if (element.hasAttribute('username')) {
          credentials = {
            username: element.getAttribute('username'),
            password: element.getAttribute('password') || ''
          };
        } else if (uri && uri.username) {
          credentials = {
            username: uri.username,
            password: uri.password
          };
        }
        const model = cv.data.Model.getInstance();
        let backendUrl = uri ? uri.toString() : null;
        let backendUrlConfigKey;
        switch (type) {
          case 'knxd':
            backendUrlConfigKey = 'backendKnxdUrl';
            break;
          case 'openhab':
            backendUrlConfigKey = 'backendOpenHABUrl';
            break;
          case 'mqtt':
            backendUrlConfigKey = 'backendMQTTUrl';
            break;
          case 'iobroker':
            backendUrlConfigKey = 'backendIoBrokerUrl';
            break;
        }

        if (backendUrlConfigKey) {
          // override by URL settings
          if (cv.Config.URL[backendUrlConfigKey]) {
            backendUrl = cv.Config.URL[backendUrlConfigKey];
          } else if (!backendUrl && cv.Config.server[backendUrlConfigKey]) {
            backendUrl = cv.Config.server[backendUrlConfigKey];
          }
        }
        let name = type;
        if (element.hasAttribute('name')) {
          name = element.getAttribute('name');
        } else if (!cv.io.BackendConnections.hasClient('main')) {
          // we need one main backend
          name = 'main';
        } else if (cv.io.BackendConnections.getClient('main').configuredIn === 'config') {
          qx.log.Logger.warn(
            this,
            `there is already a backend registered with name "main" and type ${type} skipping this one`
          );

          return;
        }
        qx.log.Logger.debug(this, 'init backend', name);
        if (cv.io.BackendConnections.hasClient(name)) {
          const notification = {
            topic: 'cv.config.error',
            title: qx.locale.Manager.tr('Config error'),
            message: qx.locale.Manager.tr('There already exists a backend named: "%1"', name),

            severity: 'urgent',
            unique: true,
            deletable: true
          };

          cv.core.notifications.Router.dispatchMessage(notification.topic, notification);

          return;
        }
        const client = cv.io.BackendConnections.addBackendClient(name, type, backendUrl, 'config');

        this._client = client;
        this._name = name;
        this.__applyValues = [];
        client.update = data => model.updateFrom(name, data); // override clients update function

        for (const data of element.querySelectorAll(':scope > cv-resource')) {
          client.setResourcePath(data.getAttribute('name'), data.textContent.trim());
        }

        client.login(true, credentials, () => {
          this.debug(name, 'connected');
          if (element.hasAttribute('default') && element.getAttribute('default') === 'true') {
            model.setDefaultBackendName(name);
          }
          const doSubscribe = () => {
            for (const [address, value] of this.__applyValues) {
              this.debug(name, 'apply update', address, value);
              model.onUpdate(address, value, name);
            }
            const addressesToSubscribe = model.getAddresses(name);
            this.debug(name, 'subscribing to', addressesToSubscribe.length, 'addresses');

            if (addressesToSubscribe.length !== 0) {
              client.subscribe(addressesToSubscribe);
            }
          };
          if (cv.TemplateEngine.getInstance().isDomFinished()) {
            doSubscribe();
          } else {
            qx.event.message.Bus.subscribe(
              'setup.dom.finished',
              function () {
                doSubscribe();
              },
              this
            );
          }
        });
      } else {
        this.error('<cv-backend> must have a type attribute');
      }
    },

    _disconnected() {
      if (this._client) {
        const model = cv.data.Model.getInstance();
        if (this._element.hasAttribute('default') && this._element.getAttribute('default') === 'true') {
          model.resetDefaultBackendName();
        }
        this._client.terminate();
        cv.io.BackendConnections.removeClient(this._client);
        this._client.dispose();
        this._client = null;
      }
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'backend',
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});
