(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.AbstractClient": {
        "construct": true,
        "require": true
      },
      "cv.io.IClient": {
        "require": true
      },
      "cv.io.Client": {
        "construct": true
      },
      "cv.data.Model": {
        "construct": true
      },
      "cv.data.Simulation": {
        "construct": true
      },
      "cv.report.Record": {},
      "cv.Config": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct() {
      var _this = this;
      cv.io.AbstractClient.constructor.call(this);
      cv.io.Client.CLIENTS.push(this);
      // make some functions accessible for the protractor runner
      window._receive = this.receive.bind(this);
      var model = cv.data.Model.getInstance();
      window._widgetDataGet = model.getWidgetData.bind(model);
      window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
      window.writeHistory = [];
      var testMode = false;
      if (typeof testMode === 'string' && testMode !== 'true') {
        this.setConnected(false);
        this.__P_749_0 = new cv.data.Simulation(testMode, this);
      }
      this.addresses = [];
      var file = this._resources['simulation'];
      if (file) {
        this.setConnected(false);
        this.__P_749_0 = new cv.data.Simulation(file, this);
      } else {
        this.addListener('resourcePathAdded', function (ev) {
          switch (ev.getData()) {
            case 'simulation':
              {
                var _file = _this._resources['simulation'];
                if (_file) {
                  _this.setConnected(false);
                  _this.__P_749_0 = new cv.data.Simulation(_file, _this);
                }
                break;
              }
          }
        });
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
      __P_749_1: null,
      __P_749_0: null,
      getType: function getType() {
        return this.backendName;
      },
      /**
       * This function gets called once the communication is established and session information is available
       * @param json
       */
      receive: function receive(json) {
        if (json) {
          cv.io.Client.CLIENTS.forEach(function (client) {
            client.update(json.d);
          });
        }
      },
      login: function login(loginOnly, credentials, callback, context) {
        var _this2 = this;
        if (callback) {
          if (this.__P_749_0 && !this.__P_749_0.isInitialized()) {
            this.__P_749_0.addListenerOnce('changeInitialized', function () {
              _this2.setConnected(true);
              _this2.debug('(delayed) logged in to mockup client');
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
      subscribe: function subscribe(addresses) {
        this.addresses = addresses ? addresses : [];
        if (this.__P_749_0) {
          this.__P_749_0.prepareTestData(this.addresses);
        }
      },
      addSubscription: function addSubscription(address) {
        if (!this.addresses.includes(address)) {
          this.addresses.push(address);
        }
      },
      __P_749_2: function __P_749_2(address, value) {
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
      write: function write(address, value) {
        if (cv.report.Record.REPLAYING === true) {
          // do nothing in replay mode
          return;
        }
        var ts = new Date().getTime();
        // store in window, to make it accessible for protractor
        var lastWrite = {
          address: address,
          value: value,
          ts: ts
        };
        value = this.__P_749_2(address, value);
        if (!this.__P_749_0 || !this.__P_749_0.onWrite(address, value)) {
          // send update
          var answer = {
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
      restart: function restart() {},
      stop: function stop() {},
      getResourcePath: function getResourcePath(name, map) {
        if (cv.Config.testMode) {
          // fallback to old behaviour just for screenshot generation / testing
          if (name === 'charts' && map && map.src) {
            return name + '/' + map.src;
          }
          return name;
        }
        var basePath = '';
        if (Object.prototype.hasOwnProperty.call(this._resources, name)) {
          basePath = this._resources[name];
          if (basePath && !basePath.endsWith('/')) {
            basePath += '/';
          }
        }
        if (name === 'charts' && map && map.src) {
          if (map.src.startsWith('generator:')) {
            // the generator also might need the start/end values
            var path = basePath + map.src + '?';
            for (var key in map) {
              path += "&".concat(key, "=").concat(map[key]);
            }
            return path;
          }
          return basePath + map.src;
        }
        return basePath;
      },
      getLastError: function getLastError() {
        return null;
      },
      getBackend: function getBackend() {
        return {};
      },
      authorize: function authorize(req) {},
      terminate: function terminate() {},
      update: function update(json) {},
      record: function record(type, data) {},
      showError: function showError(type, message, args) {},
      // not used / needed in this client
      setInitialAddresses: function setInitialAddresses(addresses) {},
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {
        return false;
      },
      processChartsData: function processChartsData(data) {
        return data;
      },
      hasProvider: function hasProvider(name) {
        return false;
      },
      getProviderUrl: function getProviderUrl(name) {
        return null;
      },
      getProviderConvertFunction: function getProviderConvertFunction(name, format) {
        return null;
      },
      getProviderData: function getProviderData(name, format) {
        return null;
      }
    }
  });
  cv.io.Mockup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mockup.js.map?dt=1722151863210