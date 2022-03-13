/* Client.js 
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
 * MQTT client
 */
qx.Class.define('cv.io.mqtt.Client', {
  extend: qx.core.Object,
  implement: cv.io.IClient,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (type, backendUrl) {
    this.base(arguments);
    this.initialAddresses = [];
    this._type = type;
    this._backendUrl = new URL(backendUrl || document.URL.replace(/.*:\/\/([^\/:]*)(:[0-9]*)?\/.*/, 'ws://$1:8083/'));
    this.__groups = {};
    this.__memberLookup = {};
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: 'Boolean',
      init: false,
      event: 'changeConnected'
    },

    server: {
      check: 'String',
      nullable: true,
      event: 'changedServer'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /*
     * @var {Paho.MQTT.Client}
     */
    _client: null,
    _type: null,

    /**
     * Returns the current backend configuration
     * @return {Map}
     */
    getBackend: function() {
      return {};
    },

    getType() {
      return this._type;
    },

    /**
     * Returns true, when the backend provides a special data provider for this kins of data
     * @param name {String}
     * @return {Boolean}
     */
    hasProvider: function (name) {
      return false;
    },

    /**
     * URL to the provided data
     * @param name
     * @return {String}
     */
    getProviderUrl: function (name) {
      return null;
    },

    /**
     * Mapping function the convert the data from the backend to a format the CometVisu data provider consumer can process.
     * @param name {String}
     */
    getProviderConvertFunction : function (name) {
      return null;
    },

    /**
     * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
     * This can be used to increase the init state loading speed by sending an initial request with a smaller
     * subset of addresses to the backend and send the rest later.
     * @param addresses {Array}
     */
    setInitialAddresses: function(addresses) {
    },

    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     *
     * @param addresses {Array?} addresses to subscribe to
     * @param filters {Array?} Filters
     *
     */
    subscribe : function (addresses, filters) {
      addresses.forEach(value => this._client.subscribe(value));
    },

    /**
     * This function starts the communication by a login and then runs the
     * ongoing communication task
     *
     * @param loginOnly {Boolean} if true only login and backend configuration, no subscription
     *                            to addresses (default: false)
     * @param credentials {Map} map with "username" and "password" (optional)
     * @param callback {Function} call this function when login is done
     * @param context {Object} context for the callback (this)
     *
     */
    login : function (loginOnly, credentials, callback, context) {
      let self = this;

      /**
       * @param param
       */
      function onConnect(param) {
        self.setConnected(true);
        if (callback) {
          callback.call(context);
        }
      }

      /**
       * @param param
       */
      function onFailure(param) {
        self.setConnected(false);
        let n = cv.core.notifications.Router.getInstance();
        n.dispatchMessage('cv.client.connection', {
          title: 'MQTT: ' + qx.locale.Manager.tr('Connection error'),
          message: param.errorMessage + '<br/>\nCode: ' + param.errorCode,
          severity: 'urgent',
          unique: true,
          deletable: false
        }, 'popup');
      }

      let options = {
        reconnect: true,
        timeout: 10,
        onSuccess: onConnect,
        onFailure: onFailure
      };

      if (this._backendUrl.username !== '') {
        options.userName = this._backendUrl.username;
      }
      if (this._backendUrl.password !== '') {
        options.password = this._backendUrl.password;
      }

      try {
        this._client = new Paho.MQTT.Client(this._backendUrl.toString(), 'CometVisu_' + Math.random().toString(16).substr(2, 8));
      } catch (e) {
        self.error('MQTT Client error:', e);
        self.setConnected(false);
        return;
      }

      this._client.onConnectionLost = function (responseObject) {
        self.warn('Connection Lost: ' + responseObject.errorMessage, responseObject);
        self.setConnected(false);
      };

      this._client.onMessageArrived = function (message) {
        let update = {};
        update[message.topic] = message.payloadString;
        self.update(update);
      };

      try {
        this._client.connect(options);
      } catch (e) {
        onFailure({
          errorMessage: e.toString(),
          errorCode: 'login -> _client.connect(' + this._backendUrl + ')'
        });
      }
    },

    /**
     * Authorize a Request by adding the necessary headers.
     * @param req {qx.io.request.Xhr}
     */
    authorize: function (req) {},

    /**
     * return the relative path to a resource on the currently used backend
     *
     * @param name {String} Name of the resource (e.g. login, read, write, rrd)
     * @param params {Map?} optional data needed to generate the resource path
     * @return {String|null} relative path to the resource, returns `null` when the backend does not provide that resource
     */
    getResourcePath : function (name, params) {},

    /**
     * This client provides an own processor for charts data
     * @return {Boolean}
     */
    hasCustomChartsDataProcessor : function () {},

    /**
     * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
     * @param data {var}
     */
    processChartsData : function (data) {},

    /**
     * This function sends a value
     * @param address {String} address to send the value to
     * @param value {String} value to send
     * @param options {Object} optional options, depending on backend
     *
     */
    write : function (address, value, options) {
      if (this.isConnected()) {
        let message = new Paho.MQTT.Message(value.toString());
        message.destinationName = address;
        if (options.qos !== undefined) {
          message.qos = options.qos;
        }
        if (options.retain !== undefined) {
          message.retained = options.retain;
        }
        this._client.send(message);
      }
    },

    /**
     * Get the last recorded error
     *
     * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
     */
    getLastError: function() {},

    /**
     * Restart the connection
     * @param full
     */
    restart: function(full) {},

    /**
     * Handle the incoming state updates. This method is not implemented by the client itself.
     * It is injected by the project using the client.
     * @param json
     */
    update: function(json) {}, // jshint ignore:line

    /**
     * Can be overridden to record client communication with backend
     * @param type {String} type of event to record
     * @param data {Object} data to record
     */
    record: function(type, data) {},

    /**
     * Can be overridden to provide an error handler for client errors
     * @param type {Number} one of cv.io.Client.ERROR_CODES
     * @param message {String} detailed error message
     * @param args
     */
    showError: function(type, message, args) {},

    terminate: function () {
      if (this.isConnected()) {
        this._client.disconnect();
      }
    },

    /**
     * Destructor
     */
    destruct: function () {
      if (this.isConnected()) {
        this._client.disconnect();
      }
      this._client = null;
    }
  }

});
