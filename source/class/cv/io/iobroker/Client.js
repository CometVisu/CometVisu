/* Client.js
 *
 * copyright (c) 2010-2023, Christian Mayer and the CometVisu contributers.
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
 * ioBroker client
 */
qx.Class.define('cv.io.iobroker.Client', {
  extend: cv.io.AbstractClient,
  implement: cv.io.IClient,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(type, backendUrl) {
    super();
    this.initialAddresses = [];
    this._type = type;
    this._backendUrl = new URL(backendUrl || document.URL.replace(/.*:\/\/([^\/:]*)(:[0-9]*)?\/.*/, 'ws://$1:8083/'));
    this.__subscribedAddresses = [];
    this.__pendingRequests = [];
    this.__credentials = { username: null, password: null };
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
    _type: null,
    __subscribedAddresses: null,
    __nextMessageId: 1,
    __connection: null,
    __pendingRequests: null,
    __credentials: null,

    /**
     * Returns the current backend configuration
     * @return {Map}
     */
    getBackend() {
      return {};
    },

    getType() {
      return this._type;
    },

    /**
     * Returns true, when the backend provides a special data provider for this kind of data
     * @param name {String}
     * @return {Boolean}
     */
    hasProvider(name) {
      return false;
    },

    /**
     * URL to the provided data
     * @param name
     * @return {String}
     */
    getProviderUrl(name) {
      return null;
    },

    /**
     * Mapping function to convert the data from the backend to a format the CometVisu data provider consumer can process.
     * @param name {String}
     */
    getProviderConvertFunction(name) {
      return null;
    },

    getProviderData: function (name, format) {
      return null;
    },

    /**
     * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
     * This can be used to increase the init state loading speed by sending an initial request with a smaller
     * subset of addresses to the backend and send the rest later.
     * @param addresses {Array}
     */
    setInitialAddresses(addresses) {
      this.__subscribedAddresses = addresses;
    },

    __serverGetStates(addresses) {
      return this.__send_message('getStates', addresses);
    },

    __serverSetState(address, value) {
      return this.__send_message('setState', address, value);
    },

    __serverSubscribeStates(addresses) {
      return this.__send_message('subscribeStates', addresses);
    },

    async __subscribeStates() {
      if ((!this.isConnected()) || (!this.__subscribedAddresses.length)) {
        return; 
      }

      await this.__serverSubscribeStates(this.__subscribedAddresses);

      const states = await this.__serverGetStates(this.__subscribedAddresses);
      let newStates = {};

      for (let id in states[1]) {
        if (states[1][id]) {
          newStates[id] = states[1][id].val; 
        }
      }

      this.update(newStates);
    },

    __send_message(name, ...args) {
      let request = {
        id: this.__nextMessageId++,
        resolve: null
      };

      const promise = new Promise((resolve, reject) => {
        request.resolve = resolve;

        this.__pendingRequests.push(request);
      });

      this.__connection.send(JSON.stringify([3, request.id, name, [...args]]));

      return promise;
    },

    __initiateConnection(callback = null, context = null) {
      /**
       * @param param
       */
      const onFailure = param => {
        this.setConnected(false);
        let n = cv.core.notifications.Router.getInstance();
        n.dispatchMessage(
          'cv.client.connection',
          {
            title: 'ioBroker: ' + qx.locale.Manager.tr('Connection error'),
            message: param.errorMessage + '<br/>\nCode: ' + param.errorCode,
            severity: 'urgent',
            unique: true,
            deletable: false
          },

          'popup'
        );
      };

      try {
        let queryString = `sid=${Date.now()}`;

        if (this.__credentials.username) {
          queryString += `&user=${this.__credentials.username}`; 
        }

        if (this.__credentials.password) {
          queryString += `&pass=${this.__credentials.password}`; 
        }

        // FIXME: Implement proper query param patching of user/pass
        this.__connection = new window.WebSocket(`${this._backendUrl.protocol}//${this._backendUrl.host}${this._backendUrl.pathname}?${queryString}`);

        this.__connection.onerror = event => {  
          this.debug('SOCK ERROR', event);
        };
        this.__connection.onclose = event => {
          this.debug('SOCK CLOSE', event);
          this.setConnected(false);
          this.__connection = null;
        };
        this.__connection.onmessage = async event => {
          const [type, id, name, args] = JSON.parse(event.data);

          switch (type) {
            case 0: /* MESSAGE */
              switch (name) {
                case '___ready___':
                  this.setConnected(true);

                  if (callback) {
                    callback.call(context); 
                  }
                  break;
                case 'reauthenticate':
                  onFailure({
                    errorMessage: 'Authentication failed!',
                    errorCode: 'login -> WebSocket(' + this._backendUrl + ')'
                  });          
                  break;
                case 'stateChange':
                  if (args[1].ts === args[1].lc) {
                    this.update({ [args[0]]: args[1].val }); 
                  }
                  break;
                default:
                  this.debug('Unknown message name:', name);
                  break;
              }
              break;
            case 1: /* PING */
              this.__connection.send(JSON.stringify([2]));
              break;
            case 3: /* CALLBACK */
            {
              const requestIdx = this.__pendingRequests.findIndex(entry => entry.id === id);

              if (requestIdx < 0) {
                break; 
              }

              const request = this.__pendingRequests[requestIdx];

              this.__pendingRequests.splice(requestIdx, 1);
              request.resolve(args);
              break;
            }
            default:
              this.debug('UNKNOWN SOCK MSG', event, type, id, name, args);
              break;
          }
        };
      } catch (error) {
        onFailure({
          errorMessage: error.toString(),
          errorCode: 'login -> WebSocket(' + this._backendUrl + ')'
        });
      }
    },

    __closeConnection() {
      if (this.isConnected()) {
        this.__connection.close();
        this.setConnected(false);
        this.__connection = null;
      }
    },

    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     *
     * @param addresses {Array?} addresses to subscribe to
     * @param filters {Array?} Filters
     *
     */
    async subscribe(addresses, filters) {
      this.__subscribedAddresses = addresses;
      this.__subscribeStates();
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
    async login(loginOnly, credentials, callback, context) {
      this.__credentials = credentials;
      this.__initiateConnection(callback, context);
    },

    /**
     * Authorize a Request by adding the necessary headers.
     * @param req {qx.io.request.Xhr}
     */
    authorize(req) {},

    /**
     * return the relative path to a resource on the currently used backend
     *
     * @param name {String} Name of the resource (e.g. login, read, write, rrd)
     * @param params {Map?} optional data needed to generate the resource path
     * @return {String|null} relative path to the resource, returns `null` when the backend does not provide that resource
     */
    getResourcePath(name, params) {},

    /**
     * This client provides an own processor for charts data
     * @return {Boolean}
     */
    hasCustomChartsDataProcessor() {},

    /**
     * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
     * @param data {var}
     */
    processChartsData(data) {},

    /**
     * This function sends a value
     * @param address {String} address to send the value to
     * @param value {String} value to send
     * @param options {Object} optional options, depending on backend
     *
     */
    write(address, value, options) {
      if (!this.isConnected()) {
        return; 
      }
  
      this.__serverSetState(address, { val: value, ack: false });
    },

    /**
     * Get the last recorded error
     *
     * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
     */
    getLastError() {},

    /**
     * Restart the connection
     * @param full
     */
    restart(full) {
      this.debug('FIXME: RESTART', full); // This needs proper retry logic
      this.__initiateConnection();
    },

    /**
     * Handle the incoming state updates. This method is not implemented by the client itself.
     * It is injected by the project using the client.
     * @param json
     */
    update(json) {},

    /**
     * Can be overridden to record client communication with backend
     * @param type {String} type of event to record
     * @param data {Object} data to record
     */
    record(type, data) {},

    /**
     * Can be overridden to provide an error handler for client errors
     * @param type {Number} one of cv.io.Client.ERROR_CODES
     * @param message {String} detailed error message
     * @param args
     */
    showError(type, message, args) {},

    terminate() {
      this.__closeConnection();
    },

    /**
     * Destructor
     */
    destruct() {
      this.__closeConnection();
    }
  }
});
