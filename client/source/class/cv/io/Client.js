/* Client.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
'use strict';

/**
 * The JavaScript library that implements the CometVisu protocol.
 * The Client handles all communication issues to supply the user
 * of this object with reliable realtime data.
 * It can be seen as the session layer (layer 5) according to the OSI
 * model.
 *
 * @author Christan Mayer
 * @author Tobias Bräutigam
 * @since 0.5.3 (initial contribution) 0.10.0+0.11.0 (major refactoring)
 *
 * @ignore($)
 */
qx.Class.define('cv.io.Client', {
  extend: qx.core.Object,
  implement: cv.io.IClient,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  /**
   * @param backendName {String} name of the backend
   * @param backendLoginUrl {String} URL of the login resource
   */
  construct(backendName, backendLoginUrl) {
    super();
    cv.io.Client.CLIENTS.push(this);
    this.backend = {};
    this.loginSettings = {
      loggedIn: false,
      callbackAfterLoggedIn: null,
      context: null,
      loginOnly: false // login only for backend configuration, do not start address subscription
    };

    // init default settings
    if (cv.io.Client.backendNameAliases[backendName]) {
      backendName = cv.io.Client.backendNameAliases[backendName];
    }
    this.backendName = backendName;
    switch (this.backendName) {
      case 'default':
        this._type = 'knxd';
        break;

      case 'openhab':
        this._type = 'openhab';
        break;
    }

    if (backendName && backendName !== 'default') {
      if (typeof backendName === 'object') {
        // override default settings
        this.setBackend(backendName);
      } else if (cv.io.Client.backends[backendName]) {
        // merge backend settings into default backend
        this.setBackend(cv.io.Client.backends[backendName]);
      }
    } else {
      this.setBackend(cv.io.Client.backends['default']);
    }

    this.backendLoginUrl = backendLoginUrl;

    this.addresses = [];
    this.initialAddresses = [];
    this.filters = [];
    this.user = '';
    this.pass = '';
    this.device = '';
    this.headers = {};
    this.resendHeaders = {};

    this.delayedRestart = qx.util.Function.debounce(this.restart.bind(this), 50);
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    CLIENTS: [],
    TEST_MODE: false,
    ERROR_CODES: {
      CONNECTION: 1,
      PROTOCOL_MISSING_VERSION: 10,
      PROTOCOL_INVALID_READ_RESPONSE: 50,
      PROTOCOL_INVALID_READ_RESPONSE_MISSING_I: 51
    },

    /**
     * Stop all running clients
     */
    stopAll() {
      this.CLIENTS.forEach(function (client) {
        client.stop();
      });
    },

    // used for backwards compability
    backendNameAliases: {
      knxd: 'default',
      'cgi-bin': 'default',
      oh: 'openhab',
      oh2: 'openhab'
    },

    // setup of the different known backends (openhab2 configures itself by sending the config
    // with the login response so no defaults are defined here
    backends: {
      default: {
        name: 'default',
        baseURL: '/cgi-bin/',
        transport: 'long-polling',
        resources: {
          login: 'l',
          read: 'r',
          write: 'w',
          rrd: 'rrdfetch'
        },

        maxConnectionAge: 60 * 1000, // in milliseconds - restart if last read is older
        maxDataAge: 3200 * 1000, // in milliseconds - reload all data when the last successful
        // read is older (should be faster than the index overflow at max data rate,
        // i.e. 2^16 @ 20 tps for KNX TP)
        maxRetries: 3, // number of connection retries for temporary server failures
        hooks: {}
      },

      openhab: {
        name: 'openHAB',
        baseURL: '/rest/cv/',
        transport: 'sse'
      }
    }
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    /**
     * Is the communication running at the moment?
     */
    running: {
      check: 'Boolean',
      init: false,
      event: 'changeRunning'
    },

    /**
     * Is the client connected to a backend at the moment?
     */
    connected: {
      check: 'Boolean',
      init: false,
      event: 'changeConnected',
      apply: '_applyConnected'
    },

    /**
     * needed to be able to check if the incoming update is the initial answer or a successing update
     */
    dataReceived: {
      check: 'Boolean',
      init: false
    },

    /**
     * the currently used transport layer
     */
    currentTransport: {
      init: null
    },

    /**
     * The server we are currently speaking to (read from the login response)
     */
    server: {
      check: 'String',
      nullable: true,
      event: 'changedServer'
    },

    name: {
      check: 'String',
      nullable: true
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    backend: null,
    backendName: null,
    _type: null,
    backendLoginUrl: null,
    addresses: null, // the subscribed addresses
    initialAddresses: null, // the addresses which should be loaded before the subscribed addresses
    filters: null, // the subscribed filters
    user: null, // the current user
    pass: null, // the current password
    device: null, // the current device ID
    session: null, // current session ID

    loginSettings: null,
    headers: null,
    resendHeaders: null,
    __lastError: null,

    getType() {
      return this._type;
    },

    /**
     * Method to call when the `connected` property is set
     * @param value {boolean}
     * @private
     */
    _applyConnected(value) {
      if (value === true) {
        this.__lastError = null;
      }
      this.record('connected', value);
    },

    setInitialAddresses(addresses) {
      this.initialAddresses = addresses;
    },

    setBackend(newBackend) {
      // override default settings
      const backend = Object.assign({}, cv.io.Client.backends['default'], newBackend);

      this.backend = backend;
      if (backend.transport === 'sse' && backend.transportFallback) {
        if (window.EventSource === undefined) {
          // browser does not support EventSource object => use fallback
          // transport + settings
          Object.assign(backend, backend.transportFallback);
        }
      }
      // add trailing slash to baseURL if not set
      if (backend.baseURL && backend.baseURL.slice(-1) !== '/') {
        backend.baseURL += '/';
      }
      const currentTransport = this.getCurrentTransport();
      switch (backend.transport) {
        case 'long-polling':
          if (!(currentTransport instanceof cv.io.transport.LongPolling)) {
            // replace old transport
            if (currentTransport) {
              currentTransport.dispose();
            }
            this.setCurrentTransport(new cv.io.transport.LongPolling(this));
          }
          break;
        case 'sse':
          if (!(currentTransport instanceof cv.io.transport.Sse)) {
            // replace old transport
            if (currentTransport) {
              currentTransport.dispose();
            }
            this.setCurrentTransport(new cv.io.transport.Sse(this));
          }
          break;
      }

      if (this.backend.name === 'openHAB') {
        // use the fallback parser
        qx.util.ResponseParser.PARSER.json = cv.io.parser.Json.parse;
      }
    },

    getBackend() {
      return this.backend;
    },

    /**
     * manipulates the header of the current ajax query before it will be sent to the server
     * @param xhr
     */
    beforeSend(xhr) {
      for (const headerName in this.resendHeaders) {
        if (this.resendHeaders[headerName] !== undefined) {
          xhr.setRequestHeader(headerName, this.resendHeaders[headerName]);
        }
      }
      for (const headerName in this.headers) {
        if (this.headers[headerName] !== undefined) {
          xhr.setRequestHeader(headerName, this.headers[headerName]);
        }
      }
    },

    getResourcePath(name, map) {
      return Object.prototype.hasOwnProperty.call(this.backend.resources, name)
        ? this.backend.baseURL + this.backend.resources[name]
        : null;
    },

    setResourcePath(name, path) {
      this.backend.resources[name] = path;
    },

    hasCustomChartsDataProcessor() {
      return false;
    },
    processChartsData(data) {
      return data;
    },

    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     *
     * @param addresses {Array?} addresses to subscribe to
     * @param filters {Array?} Filters
     *
     */
    subscribe(addresses = [], filters = []) {
      const startCommunication = !this.addresses.length; // start when
      // addresses were empty
      this.addresses = addresses;
      this.filters = filters;

      if (!addresses.length) {
        this.stop(); // stop when new addresses are empty
      } else if (startCommunication) {
        if (this.loginSettings.loginOnly === true) {
          // connect to the backend
          this.getCurrentTransport().connect();
          this.loginSettings.loginOnly = false;
        } else {
          this.login(false);
        }
      }
    },

    addSubscription(address) {
      if (!this.addresses.includes()) {
        this.addresses.push(address);
        if (this.isConnected()) {
          this.delayedRestart();
        }
      }
    },

    /**
     * This function starts the communication by a login and then runs the
     * ongoing communication task
     *
     * @param loginOnly {Boolean} if true only login and backend configuration, no subscription
     *                            to addresses (default: false)
     * @param credentials {Object?} not used in this client
     * @param callback {Function?} call this function when login is done
     * @param context {Object?} context for the callback (this)
     *
     */
    login(loginOnly, credentials, callback, context) {
      if (!this.loginSettings.loggedIn) {
        this.loginSettings.loginOnly = !!loginOnly;
        this.loginSettings.callbackAfterLoggedIn = callback;
        this.loginSettings.context = context;
        const request = {};
        if (this.user !== '') {
          request.u = this.user;
        }
        if (this.pass !== '') {
          request.p = this.pass;
        }
        if (this.device !== '') {
          request.d = this.device;
        }
        this.doRequest(
          this.backendLoginUrl ?? this.getResourcePath('login'),
          request,
          this.handleLogin,
          this
        );
      } else if (typeof this.loginSettings.callbackAfterLoggedIn === 'function') {
        // call callback immediately
        this.loginSettings.callbackAfterLoggedIn.call(this.loginSettings.context);

        this.loginSettings.callbackAfterLoggedIn = null;
        this.loginSettings.context = null;
      }
    },

    /**
     * Get the json response from the parameter received from the used XHR transport
     */
    getResponse: qx.core.Environment.select('cv.xhr', {
      jquery(args) {
        let data = args[0];
        if (data && $.type(data) === 'string') {
          data = cv.io.parser.Json.parse(data);
        }
        return data;
      },

      /**
       *
       * @param ev {[qx.event.type.Event]}
       * @return {*|null}
       */
      qx(ev) {
        if (!ev[0]) {
          return null;
        }
        let json = ev[0].getTarget().getResponse();
        if (!json) {
          return null;
        }
        if (typeof json === 'string') {
          json = cv.io.parser.Json.parse(json);
        }
        return json;
      }
    }),

    getResponseHeader: qx.core.Environment.select('cv.xhr', {
      jquery(args, name) {
        return args[2].getResponseHeader(name);
      },
      qx(args, name) {
        if (!args[0]) {
          return null;
        }
        return args[0].getTarget().getResponseHeader(name);
      }
    }),

    getQueryString(data) {
      let prefix = '';
      let suffix = '';
      if (data) {
        Object.getOwnPropertyNames(data).forEach(function (key) {
          if (key === 'i' || key === 't') {
            prefix += key + '=' + data[key] + '&';
          } else if (Array.isArray(data[key])) {
            suffix += key + '=' + data[key].join('&' + key + '=') + '&';
          } else {
            suffix += key + '=' + data[key] + '&';
          }
        });
        if (suffix.length) {
          suffix = suffix.substring(0, suffix.length - 1);
        } else if (prefix.length) {
          prefix = prefix.substring(0, prefix.length - 1);
        }
      }
      return prefix + suffix;
    },

    /**
     * Creates an XHR request. The request type depends on the "cv.xhr" environment setting
     * (currently "qx" and "jquery" are supported)
     * @param url {String} URI
     * @param data {Object} request data
     * @param callback {Function} success callback
     * @param context {Object} context for the callback
     * @return {qx.io.request.Xhr|jQuery}
     */
    doRequest: qx.core.Environment.select('cv.xhr', {
      jquery(url, data, callback, context, options) {
        let qs = '';
        if (data) {
          qs = this.getQueryString(data);
          url = qx.util.Uri.appendParamsToUrl(url, qs);
        }
        let config = {
          url: url,
          dataType: 'json',
          context: context,
          success: callback
        };

        if (options) {
          if (options.listeners) {
            config = $.extend(config, options.listeners);
            delete options.listeners;
          }
        }
        config = $.extend(config, options ?? {});
        const request = new cv.io.request.Jquery(config);
        request.send();
        return request;
      },
      qx(url, data, callback, context, options) {
        // append data to URL
        let qs = '';
        if (data) {
          qs = this.getQueryString(data);
          url = qx.util.Uri.appendParamsToUrl(url, qs);
        }
        const ajaxRequest = new qx.io.request.Xhr(url);
        if (options) {
          if (options.beforeSend) {
            this.beforeSend(ajaxRequest);
            delete options.beforeSend;
          }
          if (options.listeners) {
            Object.getOwnPropertyNames(options.listeners).forEach(function (eventName) {
              const qxEventName = eventName !== 'error' ? eventName : 'statusError';
              ajaxRequest.addListener(qxEventName, options.listeners[eventName], context);
            });
            delete options.listeners;
          }
        }
        ajaxRequest.set(
          Object.assign(
            {
              accept: 'application/json'
            },

            options ?? {}
          )
        );

        if (callback) {
          ajaxRequest.addListener('success', callback, context);
        }
        ajaxRequest.addListener('statusError', this._onError, this);
        ajaxRequest.send();
        return ajaxRequest;
      }
    }),

    /**
     * Handle errors from qooxdoos XHR request
     * @param ev {Event}
     */
    _onError(ev) {
      const req = ev.getTarget();
      if (req.serverErrorHandled) {
        return; // ignore error when already handled
      }
      this.__lastError = {
        code: req.getStatus(),
        text: req.getStatusText(),
        response: req.getResponse(),
        url: req.getUrl(),
        time: Date.now()
      };

      this.setConnected(false);
      this.fireDataEvent('changeConnected', false);
    },

    /**
     * Get the last recorded error
     *
     * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
     */
    getLastError() {
      return this.__lastError;
    },

    /**
     * Handles login response, applies backend configuration if send by
     * backend and forwards to the configured transport handleSession
     * function
     *
     * Parameter varies depending on the XHR type used
     * qx (Qooxdoo):
     *   ev {Event} the 'success' event from the XHR request
     *
     * jQuery:
     *   data {Object} The JSON data returned from the server
     *   textStatus {String} a string describing the status
     *   request {Object} the jqXHR object
     */
    handleLogin() {
      const args = Array.prototype.slice.call(arguments, 0);
      const json = this.getResponse(args);
      // read backend configuration if send by backend
      if (json.c) {
        this.setBackend(Object.assign(this.getBackend(), json.c));
      }
      this.session = json.s ?? 'SESSION';
      this.setServer(this.getResponseHeader(args, 'Server'));

      this.setDataReceived(false);
      if (this.loginSettings.loginOnly) {
        this.getCurrentTransport().handleSession(args, false);
      } else {
        this.getCurrentTransport().handleSession(args, true);
      }
      this.loginSettings.loggedIn = true;
      if (typeof this.loginSettings.callbackAfterLoggedIn === 'function') {
        this.loginSettings.callbackAfterLoggedIn.call(this.loginSettings.context);

        this.loginSettings.callbackAfterLoggedIn = null;
        this.loginSettings.context = null;
      }
    },

    /**
     * This function stops an ongoing connection
     *
     */
    stop() {
      this.setRunning(false);
      if (this.getCurrentTransport().abort) {
        this.getCurrentTransport().abort();
      }
      this.loginSettings.loggedIn = false;
    },

    /**
     * Build the URL part that contains the addresses and filters
     * @param addresses {Array?}
     * @param asString {boolean?}
     * @return {Object}
     */
    buildRequest(addresses, asString = false) {
      if (asString === true) {
        // return as query string
        let qs = 's=' + this.session;
        addresses ??= this.addresses;
        qs += '&a=' + addresses.join('&a=');
        if (this.filters.length) {
          qs += '&f=' + this.filters.join('&f=');
        }
        return qs;
      }
      const data = {
        s: this.session
      };

      addresses ??= this.addresses;
      if (addresses && addresses.length) {
        data.a = addresses;
      }
      if (this.filters.length) {
        data.f = this.filters;
      }
      return data;
    },

    /**
     * This function sends a value
     * @param address {String} address to send the value to
     * @param value {String} value to send
     *
     */
    write(address, value) {
      /**
       * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
       * could maybe selective based on UserAgent but isn't that costly on writes
       */
      const ts = new Date().getTime();
      this.doRequest(
        this.getResourcePath('write'),
        {
          s: this.session,
          a: address,
          v: value,
          ts: ts
        },

        null,
        null,
        {
          accept: 'application/json, text/javascript, */*; q=0.01'
        }
      );
    },

    // this client does not implement an authorization
    authorize(req) {},

    canAuthorize() {
      return false;
    },

    /**
     * Restart the connection
     * @param full
     */
    restart(full) {
      this.getCurrentTransport().restart(full);
    },

    terminate() {
      this.getCurrentTransport().abort();
    },

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

    hasProvider(name) {
      return false;
    },
    getProviderUrl(name) {
      return null;
    },
    getProviderConvertFunction(name, format) {
      return null;
    },
    getProviderData: function (name, format) {
      return null;
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    this.stop();
  }
});
