/* System.js
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
 * A backend client to handle internal system states.
 * With this backend you get access to e.g. backend connection states, currently shown page in the UI and can
 * trigger some things like:
 * - Restart a backend connection
 * - navigate to another page
 * - reload the browser
 * - trigger HTTP requests
 */
qx.Class.define('cv.io.System', {
  extend: cv.io.AbstractClient,
  implement: cv.io.IClient,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this.addresses = [];
    this.__persistedTargets = {
      theme: '_applyTheme',
      'client:id': '_applyCid'
    };
    qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);

    // set client id
    this.setCid(cv.Config.clientID);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    // system backend is always connected
    connected: {
      refine: true,
      init: true
    },
    cid: {
      check: 'String',
      nullable: true,
      apply: '_applyCid'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    backendName: 'system',
    addresses: null,
    implementedAddresses: null,
    __persistedTargets: null,

    _onPageChange(ev) {
      const page = ev.getData();
      const data = {};
      data['nav:current-page'] = page.getAttribute('id');
      cv.data.Model.getInstance().updateFrom('system', data);
    },

    _applyCid(value) {
      const data = {};
      data['client:id'] = value;
      cv.data.Model.getInstance().updateFrom('system', data);
    },

    getType() {
      return this.backendName;
    },

    receive(json) {},

    login(loginOnly, credentials, callback, context) {
      if (callback) {
        callback.call(context);
      }
    },

    subscribe(addresses, filters) {
      this.addresses = addresses ? addresses : [];
      if (qx.core.Environment.get('html.storage.local')) {
        let value;
        for (const name in this.__persistedTargets) {
          value = localStorage.getItem('system:' + name);
          if (value) {
            const func = this[this.__persistedTargets[name]];
            if (typeof func === 'function') {
              func(value);
            } else {
              this.error(name + 'is no function');
            }
          }
        }
      }
    },

    addSubscription(address) {
      if (!this.addresses.includes(address)) {
        this.addresses.push(address);
      }
    },

    write(address, value, options) {
      if (address) {
        const parts = address.split(':');
        const target = parts.shift();
        if (target === 'backend') {
          const name = parts.shift();
          const backend = name === 'system' ? this : cv.io.BackendConnections.getClient(name);
          if (backend) {
            switch (value) {
              case 'restart':
                backend.restart(true);
                break;

              default:
                this.warn('unhandled backend action:', value);
            }
          }
        } else if (target === 'browser') {
          let url;
          switch (value) {
            case 'reload':
              window.location.reload();
              break;

            case 'forced-reload':
              url = new URL(window.location.href);
              url.searchParams.set('forceReload', 'true');
              window.location.replace(url.toString());
              break;

            default:
              this.warn('unhandled browser action:', value);
          }
        } else if (target === 'nav') {
          const action = parts.shift();
          switch (action) {
            case 'current-page':
              cv.Application.structureController.scrollToPage(value);
              break;
          }
        } else if (target === 'theme') {
          this._applyTheme(value);
        } else if (target === 'http' || target === 'https') {
          // send HTTP request, ignore the answer
          if (parts.length >= 2 && parts[0] === 'proxy') {
            const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);

            url.searchParams.set('url', target + ':' + parts[1]);
            address = url.toString();
          }
          const xhr = new qx.io.request.Xhr(address);
          xhr.send();
        } else if (target === 'state' || target === 'notification') {
          // just write the value to the states to update Listeners
          cv.data.Model.getInstance().onUpdate(address, value, 'system');
        }

        if (qx.core.Environment.get('html.storage.local') && target in this.__persistedTargets) {
          localStorage.setItem('system:' + target, value);
        }
      }
    },

    _applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      cv.data.Model.getInstance().onUpdate('theme', theme, 'system');
    },

    restart() {},

    stop() {},

    getResourcePath(name, params) {
      if (name === 'charts') {
        return null;
      }
      return name;
    },

    getLastError() {
      return null;
    },

    getBackend() {
      return new Map();
    },

    authorize(req) {},
    canAuthorize() {
      return false;
    },

    terminate() {},

    update(json) {},
    record(type, data) {},
    showError(type, message, args) {},

    // not used / needed in this client
    setInitialAddresses(addresses) {},

    hasCustomChartsDataProcessor() {
      return false;
    },
    processChartsData(data) {
      return data;
    },
    hasProvider(name) {
      return false;
    },
    getProviderUrl(name) {
      return null;
    },

    getProviderData(name, format) {
      if (name === 'addresses') {
        let data = null;
        if (format === 'monaco') {
          data = this.implementedAddresses.map(name => ({
            label: name,
            insertText: name,
            kind: window.monaco.languages.CompletionItemKind.Value
          }));
        } else {
          data = this.implementedAddresses.map(name => ({
            label: name,
            value: name
          }));
        }
        return Promise.resolve(data);
      }
      return null;
    },

    getProviderConvertFunction(name, format) {
      return null;
    }
  }
});
