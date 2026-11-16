/* Client.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.io.IClient": {
        "require": true
      },
      "qx.util.Function": {
        "construct": true
      },
      "cv.io.transport.LongPolling": {},
      "cv.io.transport.Sse": {},
      "qx.util.ResponseParser": {},
      "cv.io.parser.Json": {},
      "qx.util.Uri": {},
      "cv.io.request.Jquery": {},
      "qx.io.request.Xhr": {},
      "qx.event.Timer": {},
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {},
      "qx.util.format.DateFormat": {},
      "qx.locale.Date": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "cv.xhr": {
          "load": true
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct(backendName, backendLoginUrl) {
      qx.core.Object.constructor.call(this);
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
        if (_typeof(backendName) === 'object') {
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

      // When a backend URL is explicitly provided, derive the initial baseURL
      // from it so that resource URLs (rrd, read, write) are correct even before
      // the login response is processed. backendLoginUrl is the full path to the
      // login resource (e.g. "/proxy/visugit/cgi-bin/l"), so strip the last
      // segment to get the base path (e.g. "/proxy/visugit/cgi-bin/").
      // The login response's c.baseURL will override this if it differs
      // (handled in handleLogin()).
      if (backendLoginUrl) {
        var lastSlash = backendLoginUrl.lastIndexOf('/');
        this.backend.baseURL = lastSlash >= 0 ? backendLoginUrl.substring(0, lastSlash + 1) : backendLoginUrl + '/';
      }
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
        BACKEND_ERROR: 20,
        BACKEND_ERROR_MAX_RETRIES: 21,
        PROTOCOL_INVALID_READ_RESPONSE: 50,
        PROTOCOL_INVALID_READ_RESPONSE_MISSING_I: 51
      },
      /**
       * Interval in ms used to refresh the outage duration of the knxd message
       */
      KNXD_STATUS_REFRESH_INTERVAL: 10000,
      /**
       * Stop all running clients
       */
      stopAll: function stopAll() {
        this.CLIENTS.forEach(function (client) {
          client.stop();
        });
      },
      /**
       * Extract the knxd availability report from a backend response.
       *
       * While the connection of the backend to the KNX bus (knxd) is lost, the
       * knxd based backend (cometvisu-knxd-fcgi) adds a "knxd" field to its /r
       * and /w responses:
       *
       *   "knxd": {"ok": false, "since": <unix time of the outage start>,
       *            "lastOk": <unix time of the last successful connection>}
       *
       * The field is absent as long as knxd is reachable. The backend answers
       * read requests with HTTP 503 in that state, but the body still contains
       * the last values it has received.
       *
       * @param response {Object|String|null} parsed or raw response body
       * @return {Object|null} the knxd status or `null` if no outage is reported
       */
      getKnxdStatus: function getKnxdStatus(response) {
        var json = response;
        if (typeof json === 'string') {
          try {
            json = JSON.parse(json);
          } catch (e) {
            return null;
          }
        }
        if (json && _typeof(json) === 'object' && json.knxd && json.knxd.ok === false) {
          return json.knxd;
        }
        return null;
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
        "default": {
          name: 'default',
          baseURL: '/cgi-bin/',
          transport: 'long-polling',
          resources: {
            login: 'l',
            read: 'r',
            write: 'w',
            rrd: 'rrdfetch'
          },
          maxConnectionAge: 60000,
          // in milliseconds - restart if last read is older
          maxDataAge: 3200000,
          // in milliseconds - reload all data when the last successful
          // read is older (should be faster than the index overflow at max data rate,
          // i.e. 2^16 @ 20 tps for KNX TP)
          maxRetries: 3,
          // number of connection retries for temporary server failures
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
      addresses: null,
      // the subscribed addresses
      initialAddresses: null,
      // the addresses which should be loaded before the subscribed addresses
      filters: null,
      // the subscribed filters
      user: null,
      // the current user
      pass: null,
      // the current password
      device: null,
      // the current device ID
      session: null,
      // current session ID

      loginSettings: null,
      headers: null,
      resendHeaders: null,
      __P_769_0: null,
      __P_769_1: false,
      __P_769_2: null,
      __P_769_3: null,
      /** timer that keeps the knxd outage duration up to date */
      _knxdTimer: null,
      getType: function getType() {
        return this._type;
      },
      /**
       * Method to call when the `connected` property is set
       * @param value {boolean}
       * @private
       */
      _applyConnected: function _applyConnected(value) {
        if (value === true) {
          this.__P_769_0 = null;
        }
        this.record('connected', value);
      },
      setInitialAddresses: function setInitialAddresses(addresses) {
        this.initialAddresses = addresses;
      },
      setBackend: function setBackend(newBackend) {
        // override default settings
        var backend = Object.assign({}, cv.io.Client.backends['default'], newBackend);
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
        var currentTransport = this.getCurrentTransport();
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
      getBackend: function getBackend() {
        return this.backend;
      },
      /**
       * manipulates the header of the current ajax query before it will be sent to the server
       * @param xhr
       */
      beforeSend: function beforeSend(xhr) {
        for (var headerName in this.resendHeaders) {
          if (this.resendHeaders[headerName] !== undefined) {
            xhr.setRequestHeader(headerName, this.resendHeaders[headerName]);
          }
        }
        for (var _headerName in this.headers) {
          if (this.headers[_headerName] !== undefined) {
            xhr.setRequestHeader(_headerName, this.headers[_headerName]);
          }
        }
      },
      getResourcePath: function getResourcePath(name, map) {
        return Object.prototype.hasOwnProperty.call(this.backend.resources, name) ? this.backend.baseURL + this.backend.resources[name] : null;
      },
      setResourcePath: function setResourcePath(name, path) {
        this.backend.resources[name] = path;
      },
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {
        return false;
      },
      processChartsData: function processChartsData(data) {
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
      subscribe: function subscribe() {
        var addresses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var filters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var startCommunication = !this.addresses.length; // start when
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
      addSubscription: function addSubscription(address) {
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
      login: function login(loginOnly, credentials, callback, context) {
        if (!this.loginSettings.loggedIn) {
          var _this$backendLoginUrl;
          this.loginSettings.loginOnly = !!loginOnly;
          this.loginSettings.callbackAfterLoggedIn = callback;
          this.loginSettings.context = context;
          var request = {};
          if (this.user !== '') {
            request.u = this.user;
          }
          if (this.pass !== '') {
            request.p = this.pass;
          }
          if (this.device !== '') {
            request.d = this.device;
          }
          this.doRequest((_this$backendLoginUrl = this.backendLoginUrl) !== null && _this$backendLoginUrl !== void 0 ? _this$backendLoginUrl : this.getResourcePath('login'), request, this.handleLogin, this);
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
        jquery: function jquery(args) {
          var data = args[0];
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
        qx: function qx(ev) {
          if (!ev[0]) {
            return null;
          }
          var json = ev[0].getTarget().getResponse();
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
        jquery: function jquery(args, name) {
          return args[2].getResponseHeader(name);
        },
        qx: function qx(args, name) {
          if (!args[0]) {
            return null;
          }
          return args[0].getTarget().getResponseHeader(name);
        }
      }),
      getQueryString: function getQueryString(data) {
        var prefix = '';
        var suffix = '';
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
        jquery: function jquery(url, data, callback, context, options) {
          var qs = '';
          if (data) {
            qs = this.getQueryString(data);
            url = qx.util.Uri.appendParamsToUrl(url, qs);
          }
          var config = {
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
          config = $.extend(config, options !== null && options !== void 0 ? options : {});
          var request = new cv.io.request.Jquery(config);
          request.send();
          return request;
        },
        qx: function (_qx) {
          function qx(_x, _x2, _x3, _x4, _x5) {
            return _qx.apply(this, arguments);
          }
          qx.toString = function () {
            return _qx.toString();
          };
          return qx;
        }(function (url, data, callback, context, options) {
          // append data to URL
          var qs = '';
          if (data) {
            qs = this.getQueryString(data);
            url = qx.util.Uri.appendParamsToUrl(url, qs);
          }
          var ajaxRequest = new qx.io.request.Xhr(url);
          if (options) {
            if (options.beforeSend) {
              this.beforeSend(ajaxRequest);
              delete options.beforeSend;
            }
            if (options.listeners) {
              Object.getOwnPropertyNames(options.listeners).forEach(function (eventName) {
                var qxEventName = eventName !== 'error' ? eventName : 'statusError';
                ajaxRequest.addListener(qxEventName, options.listeners[eventName], context);
              });
              delete options.listeners;
            }
          }
          ajaxRequest.set(Object.assign({
            accept: 'application/json'
          }, options !== null && options !== void 0 ? options : {}));
          if (callback) {
            ajaxRequest.addListener('success', callback, context);
          }
          ajaxRequest.addListener('statusError', this._onError, this);
          ajaxRequest.send();
          return ajaxRequest;
        })
      }),
      /**
       * Handle errors from qooxdoos XHR request
       * @param ev {Event}
       */
      _onError: function _onError(ev) {
        var req = ev.getTarget();
        if (req.serverErrorHandled) {
          return; // ignore error when already handled
        }
        this.__P_769_0 = {
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
      getLastError: function getLastError() {
        return this.__P_769_0;
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
      handleLogin: function handleLogin() {
        var _json$s;
        var args = Array.prototype.slice.call(arguments, 0);
        var json = this.getResponse(args);
        // read backend configuration if send by backend
        if (json.c) {
          this.setBackend(Object.assign(this.getBackend(), json.c));
        }
        this.session = (_json$s = json.s) !== null && _json$s !== void 0 ? _json$s : 'SESSION';
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
      stop: function stop() {
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
      buildRequest: function buildRequest(addresses) {
        var asString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (asString === true) {
          // return as query string
          var qs = 's=' + this.session;
          addresses !== null && addresses !== void 0 ? addresses : addresses = this.addresses;
          qs += '&a=' + addresses.join('&a=');
          if (this.filters.length) {
            qs += '&f=' + this.filters.join('&f=');
          }
          return qs;
        }
        var data = {
          s: this.session
        };
        addresses !== null && addresses !== void 0 ? addresses : addresses = this.addresses;
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
      write: function write(address, value) {
        /**
         * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
         * could maybe selective based on UserAgent but isn't that costly on writes
         */
        var ts = new Date().getTime();
        this.doRequest(this.getResourcePath('write'), {
          s: this.session,
          a: address,
          v: value,
          ts: ts
        }, null, null, {
          accept: 'application/json, text/javascript, */*; q=0.01',
          listeners: {
            error: this._onWriteError.bind(this)
          }
        });
      },
      /**
       * Report the knxd availability contained in a backend response. Both the
       * transports (read requests) and the write requests use this, therefore
       * the state is kept here. Notifications are only sent when the state
       * changes, i.e. when an outage starts or when knxd is back.
       *
       * @param response {Object|String|null} parsed or raw response body
       * @return {String|null} 'outage' if a new outage has been reported,
       *   'recovery' if knxd is reachable again, `null` if nothing changed
       */
      reportKnxdStatus: function reportKnxdStatus(response) {
        var knxd = cv.io.Client.getKnxdStatus(response);
        var wasUnavailable = this.__P_769_1;
        this.__P_769_1 = !!knxd;
        if (!knxd) {
          if (wasUnavailable) {
            // the "knxd" field is absent while knxd is reachable
            this.__P_769_2 = null;
            this.__P_769_4();
            return 'recovery';
          }
          return null;
        }
        // the backend repeats the same status until knxd is back, report it once
        var reported = this.__P_769_2;
        if (!reported || reported.since !== knxd.since || reported.lastOk !== knxd.lastOk) {
          var since = Number(knxd.since);
          this.__P_769_2 = {
            since: Number.isFinite(since) && since > 0 ? since : Math.floor(Date.now() / 1000),
            lastOk: Number(knxd.lastOk) || 0
          };
          this.__P_769_5();
          return 'outage';
        }
        return null;
      },
      /**
       * Get the notification topic used for the knxd availability of this client.
       *
       * @return {String}
       */
      _getKnxdTopic: function _getKnxdTopic() {
        return 'cv.client.knxd.' + (this.getName() || 'main');
      },
      /**
       * Show the knxd outage message in the notification center and keep it
       * updated, so that the user can see for how long the connection to the bus
       * is already lost. The message heals itself: it is removed as soon as the
       * backend reports knxd again (see {@link #__hideKnxdOutage}).
       */
      __P_769_5: function __P_769_5() {
        var _this = this;
        this.__P_769_6();
        if (!this._knxdTimer) {
          var refreshTimer = new qx.event.Timer(cv.io.Client.KNXD_STATUS_REFRESH_INTERVAL);
          refreshTimer.addListener('interval', function () {
            return _this.__P_769_6();
          });
          refreshTimer.start();
          this._knxdTimer = refreshTimer;
        }
      },
      /**
       * Remove the knxd outage message from the notification center.
       */
      __P_769_4: function __P_769_4() {
        if (this._knxdTimer) {
          this._knxdTimer.stop();
          this._knxdTimer.dispose();
          this._knxdTimer = null;
        }
        // dispatching the message with a false condition removes it
        var topic = this._getKnxdTopic();
        cv.core.notifications.Router.dispatchMessage(topic, {
          topic: topic,
          unique: true,
          condition: false
        });
      },
      /**
       * Build and dispatch the notification center message for the current knxd
       * outage. Dispatching it again with the same topic replaces the already
       * shown message (see `unique`).
       */
      __P_769_6: function __P_769_6() {
        var status = this.__P_769_2;
        if (!status) {
          return;
        }
        var downSince = status.since * 1000;
        var duration = Math.max(0, (Date.now() - downSince) / 1000);
        var topic = this._getKnxdTopic();
        cv.core.notifications.Router.dispatchMessage(topic, {
          topic: topic,
          title: qx.locale.Manager.tr('KNX bus connection lost'),
          message: qx.locale.Manager.tr('The backend "%1" has lost the connection to the KNX bus (knxd). The values shown are the last ones that have been received.', this.getName() || 'main') + '<br/><br/><strong>' + qx.locale.Manager.tr('No connection to knxd since %1 (%2 ago).', this.__P_769_7().format(new Date(downSince)), this._formatDuration(duration)) + '</strong>',
          severity: 'high',
          unique: true,
          deletable: false,
          condition: true
        });
      },
      /**
       * Format a duration in seconds for the message text, e.g. "1 h 5 min 3 s".
       *
       * @param seconds {Number} duration in seconds
       * @return {String}
       * @protected
       */
      _formatDuration: function _formatDuration(seconds) {
        var total = Math.max(0, Math.round(seconds));
        var hours = Math.floor(total / 3600);
        var minutes = Math.floor(total % 3600 / 60);
        var parts = [];
        if (hours > 0) {
          parts.push(qx.locale.Manager.tr('%1 h', hours));
        }
        if (hours > 0 || minutes > 0) {
          parts.push(qx.locale.Manager.tr('%1 min', minutes));
        }
        parts.push(qx.locale.Manager.tr('%1 s', total % 60));
        return parts.join(' ');
      },
      /**
       * Get the (lazily created) formatter for the outage start time.
       *
       * @return {qx.util.format.DateFormat}
       */
      __P_769_7: function __P_769_7() {
        if (!this.__P_769_3) {
          this.__P_769_3 = new qx.util.format.DateFormat(qx.locale.Date.getTimeFormat('short'));
        }
        return this.__P_769_3;
      },
      /**
       * Handle errors of write requests. When the backend cannot reach knxd it
       * answers with HTTP 503 and reports the knxd outage in the response body.
       * That is no connection problem of the CometVisu itself, so it must not
       * be reported as such but as a knxd outage instead.
       *
       * @param ev {qx.event.type.Event|Object} the 'statusError' event (qooxdoo)
       *   or the XHR object (jQuery)
       * @protected
       */
      _onWriteError: function _onWriteError(ev) {
        var isEvent = ev && typeof ev.getTarget === 'function';
        var req = isEvent ? ev.getTarget() : ev;
        var response = null;
        if (req) {
          if (typeof req.getResponse === 'function') {
            response = req.getResponse();
          } else if (req.responseJSON) {
            response = req.responseJSON;
          } else if (typeof req.responseText === 'string') {
            response = req.responseText;
          }
        }
        if (cv.io.Client.getKnxdStatus(response)) {
          req.serverErrorHandled = true; // keep the connection alive
          this.reportKnxdStatus(response);
        }
      },
      // this client does not implement an authorization
      authorize: function authorize(req) {},
      canAuthorize: function canAuthorize() {
        return false;
      },
      /**
       * Restart the connection
       * @param full
       */
      restart: function restart(full) {
        this.getCurrentTransport().restart(full);
      },
      terminate: function terminate() {
        this.getCurrentTransport().abort();
      },
      update: function update(json) {},
      /**
       * Can be overridden to record client communication with backend
       * @param type {String} type of event to record
       * @param data {Object} data to record
       */
      record: function record(type, data) {},
      /**
       * Can be overridden to provide an error handler for client errors
       * @param type {Number} one of cv.io.Client.ERROR_CODES
       * @param message {String} detailed error message
       * @param args
       */
      showError: function showError(type, message, args) {},
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
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      if (this._knxdTimer) {
        this._knxdTimer.stop();
        this._knxdTimer.dispose();
        this._knxdTimer = null;
      }
      if (this.__P_769_3) {
        this.__P_769_3.dispose();
        this.__P_769_3 = null;
      }
      this.stop();
    }
  });
  cv.io.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1794845785319