/* Mockup.js
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
 * Mockup simulating a backend + client for the Cometvisu protocol
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
/* istanbul ignore next */
qx.Class.define('cv.io.Mockup', {
  extend: cv.io.AbstractClient,
  implement: cv.io.IClient,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
    super();
    cv.io.Client.CLIENTS.push(this);
    // make some functions accessible for the protractor runner
    window._receive = this.receive.bind(this);
    const model = cv.data.Model.getInstance();
    window._widgetDataGet = model.getWidgetData.bind(model);
    window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
    window.writeHistory = [];

    const testMode = qx.core.Environment.get('cv.testMode');
    if (typeof testMode === 'string' && testMode !== 'true') {
      this.setConnected(false);
      this.__simulation = new cv.data.Simulation(testMode, this);
    }
    this.addresses = [];

    let file = this._resources['simulation'];
    if (file) {
      this.setConnected(false);
      this.__simulation = new cv.data.Simulation(file, this);
    } else {
      this.addListener('resourcePathAdded', ev => {
        switch (ev.getData()) {
          case 'simulation': {
            const file = this._resources['simulation'];
            if (file) {
              this.setConnected(false);
              this.__simulation = new cv.data.Simulation(file, this);
            }
            break;
          }
        }
      });
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    server: {
      check: 'String',
      init: 'Mockup'
    },

    connected: {
      check: 'Boolean',
      init: true,
      event: 'changeConnected'
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    backendName: 'mockup',
    addresses: null,
    __xhr: null,
    __simulation: null,

    getType() {
      return this.backendName;
    },


    /**
     * This function gets called once the communication is established and session information is available
     * @param json
     */
    receive(json) {
      if (json) {
        cv.io.Client.CLIENTS.forEach(function (client) {
          client.update(json.d);
        });
      }
    },

    login(loginOnly, credentials, callback, context) {
      if (callback) {
        if (this.__simulation && !this.__simulation.isInitialized()) {
          this.__simulation.addListenerOnce('changeInitialized', () => {
            this.setConnected(true);
            this.debug('(delayed) logged in to mockup client');
            callback.call(context);
          });
        } else {
          this.setConnected(true);
          this.debug('logged in to mockup client');
          callback.call(context);
        }
      }
    },

    /**
     * Subscribe to the addresses in the parameter
     * @param addresses
     */
    subscribe(addresses) {
      this.addresses = addresses ? addresses : [];
      if (this.__simulation) {
        this.__simulation.prepareTestData(this.addresses);
      }
    },

    addSubscription(address) {
      if (!this.addresses.includes(address)) {
        this.addresses.push(address);
      }
    },

    __decode(address, value) {
      if (/\d{1,2}\/\d{1,2}\/\d{1,2}/.test(address)) {
        if (/^[\da-fA-F]+$/.test(value)) {
          if (value.length <= 2) {
            value = '' + (parseInt(value, 16) & 63);
          } else {
            value = value.substring(2);
          }
        }
      }
      return value;
    },

    /**
     * This function sends a value
     * @param address
     * @param value
     */
    write(address, value) {
      if (cv.report.Record.REPLAYING === true) {
        // do nothing in replay mode
        return;
      }
      const ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      const lastWrite = {
        address: address,
        value: value,
        ts: ts
      };

      value = this.__decode(address, value);

      if (!this.__simulation || !this.__simulation.onWrite(address, value)) {
        // send update
        const answer = {
          i: ts,
          d: {}
        };
        lastWrite.transformedValue = value;
        answer.d[address] = value;
        this.debug('sending value: ' + value + ' to address: ' + address);
        this.receive(answer);
      }
      // store in window, to make it accessible for protractor
      window.writeHistory.push(lastWrite);
    },

    restart() {},

    stop() {},

    getResourcePath(name, map) {
      if (cv.Config.testMode) {
        // fallback to old behaviour just for screenshot generation / testing
        if (name === 'charts' && map && map.src) {
          return name + '/' + map.src;
        }
        return name;
      }
      let basePath = '';
      if (Object.prototype.hasOwnProperty.call(this._resources, name)) {
        basePath = this._resources[name];
        if (basePath && !basePath.endsWith('/')) {
          basePath += '/';
        }
      }
      if (name === 'charts' && map && map.src) {
        if (map.src.startsWith('generator:')) {
          // the generator also might need the start/end values
          let path = basePath + map.src + '?';
          for (const key in map) {
            path += `&${key}=${map[key]}`;
          }
          return path;
        }
        return basePath + map.src;
      }
      return basePath;
    },

    getLastError() {
      return null;
    },

    getBackend() {
      return {};
    },

    authorize(req) {},

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
    getProviderConvertFunction(name, format) {
      return null;
    },
    getProviderData : function (name, format) {
      return null;
    }
  }
});
