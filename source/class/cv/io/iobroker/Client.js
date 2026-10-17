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
    MEMBERS
  ***********************************************
  */
  members: {
    _type: null,
    __subscribedAddresses: null,
    __connection: null,
    __pendingRequests: null,
    __credentials: null,
    __terminated: false,

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
      return this.__sendMessageResponse('getStates', addresses);
    },

    /**
     * Read the recorded history of a state. This needs one of the ioBroker history
     * adapters (history, sql, influxdb) to be enabled for that state.
     * @param address {String} state id
     * @param start {Date} beginning of the time range
     * @param end {Date} end of the time range
     * @param options {Map?} additional getHistory options, e.g. count, aggregate or step
     * @return {Promise<Array>} the recorded entries, each with a "ts" and a "val"
     */
    async getHistory(address, start, end, options) {
      if (!this.isConnected() || !this.__isSocketOpen()) {
        // fail fast before reaching a send() on a socket that is not OPEN; the diagram source
        // treats this as a transient disconnect and retries after the reconnect
        throw new Error('not connected to ' + this._backendUrl);
      }

      const response = await this.__sendMessageResponse(
        'getHistory',
        address,
        Object.assign(
          {
            start: start.getTime(),
            end: end.getTime(),
            count: 10000,
            ignoreNull: true
          },
          // no aggregate default here, it would override what the caller deliberately left out
          options || {}
        )
      );

      // the ioBroker socket api answers with the arguments of its (error, result) callback
      const [error, result] = response || [];
      if (error) {
        throw new Error('getHistory for ' + address + ' failed: ' + error);
      }

      return result || [];
    },

    __serverSetState(address, value) {
      this.__sendMessage('setState', address, value);
    },

    __serverSubscribeStates(addresses) {
      this.__sendMessage('subscribeStates', addresses);
    },

    async __subscribeStates() {
      if ((!this.isConnected()) || (!this.__subscribedAddresses.length)) {
        return;
      }

      await this.__subscribeAddresses(this.__subscribedAddresses);
    },

    /**
     * Subscribe to the given addresses and publish their current states. ioBrokers
     * subscribeStates adds to the already subscribed patterns and ignores duplicates,
     * so this can be called incrementally.
     * @param addresses {Array} addresses to subscribe to
     */
    async __subscribeAddresses(addresses) {
      this.__serverSubscribeStates(addresses);

      let response;
      try {
        response = await this.__serverGetStates(addresses);
      } catch (e) {
        this.error('getStates request failed:', e.message || e);
        return;
      }

      // the ioBroker socket api answers with the arguments of its (error, states) callback
      const [error, states] = response || [];
      if (error) {
        this.error('getStates failed:', error);
        return;
      }

      let newStates = {};

      for (let id in states) {
        if (states[id]) {
          newStates[id] = states[id].val;
        }
      }

      this.update(newStates);
    },

    /**
     * Whether there is a connection that can carry a message right now. The library queues
     * what is sent while it is reconnecting, but a request would then wait for an answer that
     * only the lost connection could have given.
     * @return {Boolean}
     */
    __isSocketOpen() {
      return !!this.__connection && this.__connection.connected === true;
    },

    /**
     * Send a message without expecting an answer.
     * @param name {String} name of the ioBroker socket command
     * @param args {Array} arguments of that command
     */
    __sendMessage(name, ...args) {
      if (!this.__isSocketOpen()) {
        // the caller state (e.g. subscriptions) is re-established on the next 'connect'
        this.debug('not sending "' + name + '", socket is not open');
        return;
      }
      this.__connection.emit(name, ...args);
    },

    /**
     * Send a message and wait for the answer of the backend.
     *
     * The library correlates request and answer, the pending promises are only tracked to be
     * able to settle them when the connection goes away - the answer could only have come over
     * the connection that is gone.
     *
     * @param name {String} name of the ioBroker socket command
     * @param args {Array} arguments of that command
     * @return {Promise<Array>} the arguments the backend passed to its callback
     */
    __sendMessageResponse(name, ...args) {
      return new Promise((resolve, reject) => {
        if (!this.__isSocketOpen()) {
          reject(new Error('not connected to ' + this._backendUrl));
          return;
        }

        const request = { resolve: resolve, reject: reject };
        this.__pendingRequests.push(request);

        /**
         * Hand the callback arguments of the backend to the caller.
         * @param response {Array} arguments of the ioBroker callback, e.g. (error, result)
         */
        const answer = (...response) => {
          const idx = this.__pendingRequests.indexOf(request);
          if (idx < 0) {
            // already settled by a lost connection
            return;
          }
          this.__pendingRequests.splice(idx, 1);
          resolve(response);
        };

        this.__connection.emit(name, ...args, answer);
      });
    },

    /**
     * Open the connection to the backend, using the socket client library that the backend
     * itself publishes.
     *
     * @param callback {Function?} called once the connection is ready
     * @param context {Object?} context for the callback
     */
    async __initiateConnection(callback = null, context = null) {
      if (this.__connection) {
        // never leave a second socket behind, its close handler would reject the
        // pending requests of the new one
        this.__closeQuietly();
      }
      this.__terminated = false;

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

      let io;
      try {
        io = await cv.io.iobroker.SocketLibrary.load(this._backendUrl);
      } catch (error) {
        onFailure({
          errorMessage: error.message || error.toString(),
          errorCode: 'login -> ' + cv.io.iobroker.SocketLibrary.getOrigin(this._backendUrl) + '/socket.io.js'
        });

        return;
      }

      if (this.__terminated) {
        // terminate() was called while the library was still loading
        return;
      }

      let socket;
      try {
        socket = io.connect(this.__connectionUrl(), { name: 'CometVisu' });
      } catch (error) {
        onFailure({
          errorMessage: error.toString(),
          errorCode: 'login -> ' + this._backendUrl
        });

        return;
      }
      this.__connection = socket;

      /**
       * Everything the backend knows about was subscribed on the connection that was lost, so
       * it all has to be subscribed again. On the very first connect there is nothing yet.
       */
      const ready = () => {
        if (this.__connection !== socket) {
          return;
        }
        this.setConnected(true);
        this.__subscribeStates();

        if (callback) {
          callback.call(context);
          callback = null;
        }
      };

      socket.on('connect', ready);
      socket.on('reconnect', ready);

      socket.on('disconnect', () => {
        if (this.__connection !== socket) {
          // a previous socket that has already been replaced, it must not touch
          // the connection that took its place
          return;
        }
        // the library reconnects on its own, only the local state has to follow
        this.setConnected(false);
        this.__rejectPendingRequests('connection to ' + this._backendUrl + ' closed');
      });

      socket.on('error', error => {
        this.debug('SOCK ERROR', error);
      });

      socket.on('reauthenticate', () => {
        // The server rejected us. Do not reconnect: ioBroker locks an account out for up to an
        // hour after a few failed attempts. When the visualisation is served by that very
        // server, its login page can take over; otherwise report and stop.
        this.__terminated = true;
        this.__closeQuietly();

        const origin = cv.io.iobroker.SocketLibrary.getOrigin(this._backendUrl);
        if (origin === window.location.origin) {
          window.location.href =
            origin + '/login/index.html?href=' + encodeURI(window.location.href.replace(window.location.origin, ''));

          return;
        }

        onFailure({
          errorMessage: 'Authentication failed!',
          errorCode: 'login -> ' + this._backendUrl
        });
      });

      socket.on('stateChange', (id, state) => {
        if (state && state.ts === state.lc) {
          this.update({ [id]: state.val });
        }
      });
    },

    /**
     * The url to hand to the socket client library.
     *
     * It is http(s), not ws(s): socket.io-client expects it that way, and the @iobroker/ws client
     * turns it into ws(s) itself. Only the credentials are added to the query, the connection needs
     * nothing else from the backend url.
     *
     * @return {String}
     */
    __connectionUrl() {
      const url = cv.io.iobroker.SocketLibrary.getOrigin(this._backendUrl) + this._backendUrl.pathname;
      const credentials = this.__credentials || {};
      const query = [];

      // url-encoded, so credentials containing any character (& = # % + or whitespace) survive the
      // query transport - the ioBroker authentication gate reads them with decodeURIComponent()
      if (credentials.username) {
        query.push(`user=${encodeURIComponent(credentials.username)}`);
      }
      if (credentials.password) {
        query.push(`pass=${encodeURIComponent(credentials.password)}`);
      }

      return query.length ? `${url}?${query.join('&')}` : url;
    },

    /**
     * Reject all requests that are still waiting for a response. Without this they would
     * never settle, as the answer can only arrive over the connection that is gone.
     * @param reason {String} why the requests cannot be answered anymore
     */
    __rejectPendingRequests(reason) {
      const pending = this.__pendingRequests;
      this.__pendingRequests = [];

      for (const request of pending) {
        request.reject(new Error(reason));
      }
    },

    /**
     * Drop the connection and everything that was waiting on it.
     * @param closeConnection {Boolean?} whether the socket itself still has to be closed
     */
    __closeConnection(closeConnection = true) {
      if (this.__connection) {
        if (closeConnection) {
          // destroy() also stops the reconnect the library would otherwise start
          this.__connection.destroy();
        }

        this.setConnected(false);
        this.__connection = null;
      }

      this.__rejectPendingRequests('connection to ' + this._backendUrl + ' closed');
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
     * Add a single subscription
     * @param address {String}
     */
    addSubscription(address) {
      if (!this.__subscribedAddresses) {
        this.__subscribedAddresses = [address];
      } else if (this.__subscribedAddresses.includes(address)) {
        return;
      } else {
        this.__subscribedAddresses.push(address);
      }

      if (this.isConnected()) {
        // the connection is already established, subscribe this address right away,
        // otherwise it would not receive any updates until the next subscribe() call
        this.__subscribeAddresses([address]);
      }
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
      await this.__initiateConnection(callback, context);
    },

    /**
     * Client is able to authorize a request, by knowing the credentials.
     * The credentials are part of the backends connection URL, they cannot be
     * applied to an arbitrary request, so this client cannot authorize one.
     * @return {Boolean}
     */
    canAuthorize() {
      return false;
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
    getResourcePath(name, params) {
      // this backend provides none of them, the callers check for null explicitly
      return null;
    },

    /**
     * This client provides an own processor for charts data
     * @return {Boolean}
     */
    hasCustomChartsDataProcessor() {
      return false;
    },

    /**
     * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
     * @param data {var}
     */
    processChartsData(data) {
      return data;
    },

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
     * Re-establish the connection. Every reconnect is a full one, the server side
     * subscriptions belong to the connection that was lost and are renewed as soon as
     * the new one is ready.
     * @param full {Boolean?} unused, kept for the cv.io.IClient signature
     */
    restart(full) {
      this.__closeQuietly();
      this.__initiateConnection();
    },

    /**
     * Close the connection without the handlers of the old socket touching the new one.
     */
    __closeQuietly() {
      const socket = this.__connection;
      this.__connection = null;
      if (socket) {
        socket.destroy();
      }
      this.setConnected(false);
      this.__rejectPendingRequests('connection to ' + this._backendUrl + ' closed');
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
      this.__terminated = true;
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
