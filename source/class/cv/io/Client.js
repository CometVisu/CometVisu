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
 *
 * @author Christan Mayer
 * @author Tobias Bräutigam
 * @since 0.5.3 (initial contribution) 0.10.0 (major refactoring)
 */

/**
 * The Client handles all communication issues to supply the user
 * ob this object with reliable realtime data.
 * Itthis.it can be seen as the session layer (layer 5) according to the OSI
 * model.
 */
qx.Class.define('cv.io.Client', {
  extend: qx.core.Object,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(backendName, backendUrl) {
    this.backend = {};
    this.loginSettings = {
      loggedIn: false,
      callbackAfterLoggedIn: null,
      context: null,
      loginOnlyMode: false // login only for backend configuration, do not start address subscription
    };

    // init default settings
    if (cv.io.Client.backendNameAliases[backendName]) {
      this.backendName = cv.io.Client.backendNameAliases[backendName];
    }

    if (backendName && backendName !== 'default') {
      if (qx.lang.Type.isObject(backendName)) {
        // override default settings
        this.setBackend(backendName);
      } else if (cv.io.Client.backends[backendName]) {
        // merge backend settings into default backend
        this.setBackend(cv.io.Client.backends[backendName]);
      }
    } else {
      this.setBackend(cv.io.Client.backends['default']);
    }

    this.backendName = backendName;
    this.backendUrl = backendUrl;

    this.watchdog = new cv.io.Watchdog();
    this.watchdog.setClient(this);
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    // used for backwards compability
    backendNameAliases: {
      'cgi-bin': 'default',
      'oh': 'openhab',
      'oh2': 'openhab2'
    },
    // setup of the different known backends (openhab2 configures itself by sending the config with the login response
    // so no defaults are defined here
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
        maxConnectionAge: 60 * 1000, // in milliseconds - restart if last read is older
        maxDataAge: 3200 * 1000, // in milliseconds - reload all data when last successful read is older (should be faster than the index overflow at max data rate, i.e. 2^16 @ 20 tps for KNX TP)
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
          onClose: function () {
            // send an close request to the openHAB server
            var oldValue = this.headers["X-Atmosphere-Transport"];
            this.headers["X-Atmosphere-Transport"] = "close";
            var ajaxRequest = new qx.io.request.Xhr(this.getResourcePath('read'));
            this.beforeSend(ajaxRequest);
            ajaxRequest.send();
            if (oldValue != undefined) {
              this.headers["X-Atmosphere-Transport"] = oldValue;
            } else {
              delete this.headers["X-Atmosphere-Transport"];
            }
          }
        }
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
     * is the communication running at the moment?
     */
    running : {
      check: "Boolean",
      init: false
    },

    /**
     * needed to be able to check if the incoming update is the initial answer or a successing update
     */
    dataReceived : {
      check: "Boolean",
      init: false
    },
    /**
     * the currently used transport layer
     */
    currentTransport: {
      init: null
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    watchdog: null,
    backend: null,
    backendName: null,
    backendUrl: null,
    addresses: [], // the subscribed addresses
    initialAddresses: [], // the addresses which should be loaded before the subscribed addresses
    filters: [], // the subscribed filters
    user : '', // the current user
    pass : '', // the current password
    device : '', // the current device ID
    session: null, // current session ID

    loginSettings : {},
    headers: { init: {} },

    setBackend: function(newBackend) {
      // override default settings
      var backend = qx.lang.Object.mergeWith(qx.lang.Object.clone(cv.io.Client.backends['default']), newBackend);
      this.backend = backend;
      if (backend.transport === 'sse' && backend.transportFallback) {
        if (window.EventSource === undefined) {
          // browser does not support EventSource object => use fallback
          // transport + settings
          qx.lang.Object.mergeWith(backend, backend.transportFallback);
        }
      }
      // add trailing slash to baseURL if not set
      if (backend.baseURL && backend.baseURL.substr(-1) !== "/") {
        backend.baseURL += "/";
      }
      switch(backend.transport) {
        case "long-polling":
          this.setCurrentTransport(new cv.io.transport.LongPolling(this));
          break;
        case "sse":
          this.setCurrentTransport(new cv.io.transport.Sse(this));
          break;
      }
      if (this.backend.name === "openHAB") {
        // use the fallback parser
        qx.util.ResponseParser.PARSER.json = cv.io.parser.Json.parse;
      }
    },

    getBackend: function() {
      return this.backend;
    },
    /**
     * manipulates the header of the current ajax query before it is been send to the server
     */
    beforeSend : function (xhr) {
      for (var headerName in this.resendHeaders) {
        if (this.resendHeaders[headerName] != undefined)
          xhr.setRequestHeader(headerName, this.resendHeaders[headerName]);
      }
      for (var headerName in this.headers) {
        if (this.headers[headerName] != undefined)
          xhr.setRequestHeader(headerName, this.headers[headerName]);
      }
    },

    /**
     * read the header values of a response and stores them to the resendHeaders array
     *
     */
    readResendHeaderValues : function () {
      for (var headerName in this.resendHeaders) {
        this.resendHeaders[headerName] = this.xhr.getResponseHeader(headerName);
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
    getResourcePath : function (name) {
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
    subscribe : function (addresses, filters) {
      var startCommunication = !this.addresses.length; // start when
      // addresses were
      // empty
      this.addresses = addresses ? addresses : [];
      this.filters = filters ? filters : [];

      if (!addresses.length) {
        this.stop(); // stop when new addresses are empty
      }
      else if (startCommunication) {
        if (this.loginSettings.loginOnly === true) {
          // connect to the backend
          this.getCurrentTransport().connect();
          // start the watchdog
          this.watchdog.start(5);
          this.loginSettings.loginOnly = false;
        }
        else {
          this.login(true);
        }
      }
    },

    /**
     * This function starts the communication by a login and then runs the
     * ongoing communication task
     *
     * @param loginOnly {Boolean} if true only login and backend configuration, no subscription to addresses (default: false)
     * @param callback {Function} call this function when login is done
     * @param context {Object} context for the callback (this)
     *
     */
    login : function (loginOnly, callback, context) {
      if (this.loginSettings.loggedIn === false) {
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
        var ajaxRequest = new qx.io.request.Xhr(this.backendUrl ? this.backendUrl : this.getResourcePath("login"));
        ajaxRequest.set({
          accept: "application/json",
          requestData: request
        });
        ajaxRequest.addListener("success", this.handleLogin, this);
        ajaxRequest.send();
      } else if (this.loginSettings.callbackAfterLoggedIn) {
        // call callback immediately
        this.loginSettings.callbackAfterLoggedIn.call(this.loginSettings.context);
        this.loginSettings.callbackAfterLoggedIn = null;
        this.loginSettings.context = null;
      }
    },

    /**
     * Handles login response, applies backend configuration if send by
     * backend and forwards to the configurated transport handleSession
     * function
     *
     * @param ev {Event} the 'success' event from the XHR request
     */
    handleLogin : function (ev) {
      var json = ev.getTarget().getResponse();
      if (qx.lang.Type.isString(json)) {
        json = qx.lang.Json.parse(json);
      }
      // read backend configuration if send by backend
      if (json.c) {
        this.setBackend(qx.lang.Object.mergeWith(this.getBackend(), json.c));
      }
      if (json.s) {
        this.session = json.s;
      }
      this.setDataReceived(false);
      if (this.loginSettings.loginOnly) {
        this.getCurrentTransport().handleSession(ev, false);
      } else {
        this.getCurrentTransport().handleSession(ev, true);
        // once the connection is set up, start the watchdog
        this.watchdog.start(5);
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
    stop : function () {
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
    buildRequest : function (addresses) {
      return {
        a: addresses ? addresses : this.addresses,
        f: this.filters,
        s: this.session
      }
    },

    /**
     * This function sends a value
     * @param address {String} address to send the value to
     * @param value {String} value to send
     *
     */
    write : function (address, value) {
      /**
       * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
       * could maybe selective based on UserAgent but isn't that costly on writes
       */
      var ts = new Date().getTime();
      var ajaxRequest = new qx.io.request.Xhr(qx.util.Uri.appendParamsToUrl(this.getResourcePath("write"), 's=' + this.session + '&a=' + address + '&v=' + value + '&ts=' + ts));
      ajaxRequest.set({
        accept: "application/json, text/javascript, */*; q=0.01"
      });
      ajaxRequest.send();
    },

    /**
     * Restart the connection
     */
    restart: function() {
      this.getCurrentTransport().restart();
    },

    update: function(json) {}
  }
});