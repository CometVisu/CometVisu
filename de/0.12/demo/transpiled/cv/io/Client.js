function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.io.transport.LongPolling": {},
      "cv.io.transport.Sse": {},
      "qx.util.ResponseParser": {},
      "cv.io.parser.Json": {},
      "qx.util.Uri": {},
      "qx.io.request.Xhr": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */

    /**
     * @param backendName {String} name of the backend
     * @param backendUrl {String} URL of the login resource
     */
    construct: function construct(backendName, backendUrl) {
      qx.core.Object.constructor.call(this);
      cv.io.Client.CLIENTS.push(this);
      this.backend = {};
      this.loginSettings = {
        loggedIn: false,
        callbackAfterLoggedIn: null,
        context: null,
        loginOnly: false // login only for backend configuration, do not start address subscription

      }; // init default settings

      if (cv.io.Client.backendNameAliases[backendName]) {
        this.backendName = cv.io.Client.backendNameAliases[backendName];
      } else {
        this.backendName = backendName;
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

      this.backendUrl = backendUrl;
      this.addresses = [];
      this.initialAddresses = [];
      this.filters = [];
      this.user = '';
      this.pass = '';
      this.device = '';
      this.headers = {};
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
      stopAll: function stopAll() {
        this.CLIENTS.forEach(function (client) {
          client.stop();
        });
      },
      // used for backwards compability
      backendNameAliases: {
        'cgi-bin': 'default',
        'oh': 'openhab',
        'oh2': 'openhab2'
      },
      // setup of the different known backends (openhab2 configures itself by sending the config
      // with the login response so no defaults are defined here
      backends: {
        'default': {
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
          // in milliseconds - reload all data when last successful
          // read is older (should be faster than the index overflow at max data rate,
          // i.e. 2^16 @ 20 tps for KNX TP)
          maxRetries: 3,
          // amount of connection retries for temporary server failures
          hooks: {}
        },
        'openhab': {
          name: 'openHAB',
          baseURL: '/services/cv/',
          // keep the e.g. atmosphere tracking-id if there is one
          resendHeaders: {
            'X-Atmosphere-tracking-id': undefined
          },
          // fixed headers that are send everytime
          headers: {
            'X-Atmosphere-Transport': 'long-polling'
          },
          hooks: {
            onClose: function onClose() {
              // send an close request to the openHAB server
              var oldValue = this.headers["X-Atmosphere-Transport"];
              this.headers["X-Atmosphere-Transport"] = "close";
              this.doRequest(this.getResourcePath('read'), null, null, null, {
                beforeSend: this.beforeSend
              });

              if (oldValue !== undefined) {
                this.headers["X-Atmosphere-Transport"] = oldValue;
              } else {
                delete this.headers["X-Atmosphere-Transport"];
              }
            }
          }
        },
        "openhab2": {
          name: "openHAB2",
          baseURL: "/rest/cv/",
          transport: "sse"
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
        check: "Boolean",
        init: false,
        event: "changeRunning"
      },

      /**
       * Is the client connected to a backend at the moment?
       */
      connected: {
        check: "Boolean",
        init: false,
        event: "changeConnected",
        apply: "_applyConnected"
      },

      /**
       * needed to be able to check if the incoming update is the initial answer or a successing update
       */
      dataReceived: {
        check: "Boolean",
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
        check: "String",
        nullable: true,
        event: 'changedServer'
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
      backendUrl: null,
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
      __lastError: null,
      // property apply
      _applyConnected: function _applyConnected(value) {
        if (value === true) {
          this.__lastError = null;
        }
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
        } // add trailing slash to baseURL if not set


        if (backend.baseURL && backend.baseURL.substr(-1) !== "/") {
          backend.baseURL += "/";
        }

        var currentTransport = this.getCurrentTransport();

        switch (backend.transport) {
          case "long-polling":
            if (!(currentTransport instanceof cv.io.transport.LongPolling)) {
              // replace old transport
              if (currentTransport) {
                currentTransport.dispose();
              }

              this.setCurrentTransport(new cv.io.transport.LongPolling(this));
            }

            break;

          case "sse":
            if (!(currentTransport instanceof cv.io.transport.Sse)) {
              // replace old transport
              if (currentTransport) {
                currentTransport.dispose();
              }

              this.setCurrentTransport(new cv.io.transport.Sse(this));
            }

            break;
        }

        if (this.backend.name === "openHAB") {
          // use the fallback parser
          qx.util.ResponseParser.PARSER.json = cv.io.parser.Json.parse;
        }
      },
      getBackend: function getBackend() {
        return this.backend;
      },

      /**
       * manipulates the header of the current ajax query before it is been send to the server
       */
      beforeSend: function beforeSend(xhr) {
        for (var headerName in this.resendHeaders) {
          if (this.resendHeaders[headerName] !== undefined) {
            xhr.setRequestHeader(headerName, this.resendHeaders[headerName]);
          }
        }

        for (headerName in this.headers) {
          if (this.headers[headerName] !== undefined) {
            xhr.setRequestHeader(headerName, this.headers[headerName]);
          }
        }
      },

      /* return the relative path to a resource on the currently used backend
       *
       *
       *
       * @param name
       *          {String} Name of the resource (e.g. login, read, write, rrd)
       * @return {String} relative path to the resource
       */
      getResourcePath: function getResourcePath(name) {
        return this.backend.baseURL + this.backend.resources[name];
      },

      /**
       * Subscribe to the addresses in the parameter. The second parameter
       * (filter) is optional
       *
       * @param addresses {Array?} addresses to subscribe to
       * @param filters {Array?} Filters
       *
       */
      subscribe: function subscribe(addresses, filters) {
        var startCommunication = !this.addresses.length; // start when
        // addresses were
        // empty

        this.addresses = addresses ? addresses : [];
        this.filters = filters ? filters : [];

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

      /**
       * This function starts the communication by a login and then runs the
       * ongoing communication task
       *
       * @param loginOnly {Boolean} if true only login and backend configuration, no subscription
       *                            to addresses (default: false)
       * @param callback {Function} call this function when login is done
       * @param context {Object} context for the callback (this)
       *
       */
      login: function login(loginOnly, callback, context) {
        if (!this.loginSettings.loggedIn) {
          this.loginSettings.loginOnly = !!loginOnly;
          this.loginSettings.callbackAfterLoggedIn = callback;
          this.loginSettings.context = context;
          var request = {};

          if ('' !== this.user) {
            request.u = this.user;
          }

          if ('' !== this.pass) {
            request.p = this.pass;
          }

          if ('' !== this.device) {
            request.d = this.device;
          }

          this.doRequest(this.backendUrl ? this.backendUrl : this.getResourcePath("login"), request, this.handleLogin, this);
        } else if (this.loginSettings.callbackAfterLoggedIn) {
          // call callback immediately
          this.loginSettings.callbackAfterLoggedIn.call(this.loginSettings.context);
          this.loginSettings.callbackAfterLoggedIn = null;
          this.loginSettings.context = null;
        }
      },

      /**
       * Get the json response from the parameter received from the used XHR transport
       */
      getResponse: function getResponse(args) {
        var ev = args[0];

        if (!ev) {
          return null;
        }

        var json = ev.getTarget().getResponse();

        if (!json) {
          return null;
        }

        if (typeof json === 'string') {
          json = cv.io.parser.Json.parse(json);
        }

        return json;
      },
      getResponseHeader: function getResponseHeader(args, name) {
        if (!args[0]) {
          return null;
        }

        return args[0].getTarget().getResponseHeader(name);
      },
      getQueryString: function getQueryString(data) {
        var prefix = "";
        var suffix = "";

        if (data) {
          Object.getOwnPropertyNames(data).forEach(function (key) {
            if (key === "i" || key === "t") {
              prefix += key + "=" + data[key] + "&";
            } else if (Array.isArray(data[key])) {
              suffix += key + "=" + data[key].join("&" + key + "=") + "&";
            } else {
              suffix += key + "=" + data[key] + "&";
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
       * Creates an XHR request. The request type depends von the "cv.xhr" environment setting
       * (currently "qx" and "jquery" are supported)
       * @param url {String} URI
       * @param data {Map} request data
       * @param callback {Function} success callback
       * @param context {Object} context fot the callback
       * @return {qx.io.request.Xhr|jQuery}
       */
      doRequest: function doRequest(url, data, callback, context, options) {
        // append data to URL
        var qs = "";

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
              var qxEventName = 'error' !== eventName ? eventName : 'statusError';
              ajaxRequest.addListener(qxEventName, options.listeners[eventName], context);
            });
            delete options.listeners;
          }
        }

        ajaxRequest.set(Object.assign({
          accept: "application/json"
        }, options || {}));

        if (callback) {
          ajaxRequest.addListener("success", callback, context);
        }

        ajaxRequest.addListener("statusError", this._onError, this);
        ajaxRequest.send();
        return ajaxRequest;
      },

      /**
       * Handle errors from qooxdoos XHR request
       * @param ev {Event}
       */
      _onError: function _onError(ev) {
        var req = ev.getTarget();

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
        this.fireDataEvent("changeConnected", false);
      },

      /**
       * Get the last recorded error
       *
       * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
       */
      getLastError: function getLastError() {
        return this.__lastError;
      },

      /**
       * Handles login response, applies backend configuration if send by
       * backend and forwards to the configurated transport handleSession
       * function
       *
       * Parameter vary dependent from the XHR type used
       * qx (Qooxdoo):
       *   ev {Event} the 'success' event from the XHR request
       *
       * jQuery:
       *   data {Object} The JSON data returned from the server
       *   textStatus {String} a string describing the status
       *   request {Object} the jqXHR object
       */
      handleLogin: function handleLogin() {
        var args = Array.prototype.slice.call(arguments, 0);
        var json = this.getResponse(args); // read backend configuration if send by backend

        if (json.c) {
          this.setBackend(Object.assign(this.getBackend(), json.c));
        }

        this.session = json.s || "SESSION";
        this.setServer(this.getResponseHeader(args, "Server"));
        this.setDataReceived(false);

        if (this.loginSettings.loginOnly) {
          this.getCurrentTransport().handleSession(args, false);
        } else {
          this.getCurrentTransport().handleSession(args, true);
        }

        this.loginSettings.loggedIn = true;

        if (this.loginSettings.callbackAfterLoggedIn) {
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
       *
       * @param addresses {Array}
       * @return {Map}
       */
      buildRequest: function buildRequest(addresses, asString) {
        if (asString === true) {
          // return as query string
          var qs = "s=" + this.session;
          addresses = addresses ? addresses : this.addresses;
          qs += "&a=" + addresses.join("&a=");

          if (this.filters.length) {
            qs += "&f=" + this.filters.join("&f=");
          }

          return qs;
        } else {
          var data = {
            s: this.session
          };
          addresses = addresses || this.addresses;

          if (addresses && addresses.length) {
            data.a = addresses;
          }

          if (this.filters.length) {
            data.f = this.filters;
          }

          return data;
        }
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
        this.doRequest(this.getResourcePath("write"), {
          s: this.session,
          a: address,
          v: value,
          ts: ts
        }, null, null, {
          accept: "application/json, text/javascript, */*; q=0.01"
        });
      },

      /**
       * Restart the connection
       */
      restart: function restart(full) {
        this.getCurrentTransport().restart(full);
      },
      update: function update(json) {},
      // jshint ignore:line

      /**
       * Can be overridden to record client communication with backend
       * @param type {String} type of event to record
       * @param data {Object} data to record
       */
      record: function record(type, data) {},
      // jshint ignore:line

      /**
       * Can be overridden to provide an error handler for client errors
       * @param type {Number} one of cv.io.Client.ERROR_CODES
       * @param message {String} detailed error message
       * @param args
       */
      showError: function showError(type, message, args) {} // jshint ignore:line

    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      this.stop();
    }
  });
  cv.io.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1589223269787