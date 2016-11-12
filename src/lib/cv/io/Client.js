/* CometVisuClient.js
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
 * @module lib/CometVisuClient
 * @exports ComentVisuClient
 * @requires dependencies/jquery
 * @author Christan Mayer
 * @author Tobias Bräutigam
 * @since 0.5.3 (initial contribution) 0.10.0 (major refactoring)
 */
define( ['jquery', 'joose', 'lib/cv/io/transport/LongPolling', 'lib/cv/io/transport/Sse'], function( $ ) {
  "use strict";

  /**
   * The Client handles all communication issues to supply the user
   * ob this object with reliable realtime data.
   * Itself it can be seen as the session layer (layer 5) according to the OSI
   * model.
   *
   * @class Client
   * @constructor
   * @alias module:Client
   */
  Class('cv.io.Client', {
    isa: cv.Object,

    my: {
      have: {
        // used for backwards compability
        backendNameAliases: {
          'cgi-bin': 'default',
          'oh': 'openhab',
          'oh2': 'openhab2'
        },
        // setup of the different known backends
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
                $.ajax({
                  url: this.getResourcePath('read'),
                  dataType: 'json',
                  context: this,
                  beforeSend: this.beforeSend
                });
                if (oldValue != undefined) {
                  this.headers["X-Atmosphere-Transport"] = oldValue;
                } else {
                  delete this.headers["X-Atmosphere-Transport"];
                }
              }
            }
          }
        }
      }
    },

    has: {
      backendName: { is: 'ro' },
      backend: { is: 'ro' },
      watchdog: { is: 'ro' },
      addresses: { is: 'ro', init: Joose.I.Array }, // the subscribed addresses
      initialAddresses: { is: 'ro', init: Joose.I.Array }, // the addresses which should be loaded before the subscribed addresses
      filters: { is: 'ro', init: Joose.I.Array }, // the subscribed filters

      user : { is: 'ro', init: '' }, // the current user
      pass : { is: 'ro', init: '' }, // the current password
      device : { is: 'ro', init: '' }, // the current device ID
      running : { is: 'ro', init: false }, // is the communication running at the moment?
      currentTransport: { is: 'ro' }, // the currently used transport layer
      loginSettings : { is: 'ro', init: Joose.I.Object },
      dataReceived : { is: 'ro', init: false }, // needed to be able to check if the incoming update is the initial answer or a successing update

      headers: { is: 'ro', init: Joose.I.Object}
    },

    after: {
      initialize: function() {
        this.loginSettings = {
          loggedIn: false,
          callbackAfterLoggedIn: null,
          context: null,
          loginOnlyMode: false // login only for backend configuration, do not start address subscription
        };

        // init default settings
        if (this.my.backendNameAliases[this.backendName]) {
          this.backendName = this.my.backendNameAliases[this.backendName];
        }

        if (this.backendName && this.backendName !== 'default') {
          if ($.isPlainObject(this.backendName)) {
            // override default settings
            this.backend = $.extend({}, this.my.backends['default'], this.backendName);
          } else if (this.my.backends[this.backendName]) {
            // merge backend settings into default backend
            this.backend = $.extend({}, this.my.backends['default'], this.my.backends[this.backendName]);
          }
        } else {
          this.backend = this.my.backends['default'];
        }

        this.watchdog = new cv.io.Watchdog();
        this.watchdog.setClient(this);
      }
    },

    methods: {
      setBackend: function(newBackend) {
        // override default settings
        this.backend = $.extend({}, this.backends['default'], newBackend);
        if (this.backend.transport === 'sse' && this.backend.transportFallback) {
          if (window.EventSource === undefined) {
            // browser does not support EventSource object => use fallback
            // transport + settings
            $.extend(this.backend, this.backend.transportFallback);
          }
        }
        // add trailing slash to baseURL if not set
        if (this.backend.baseURL && this.backend.baseURL.substr(-1) !== "/") {
          this.backend.baseURL += "/";
        }
        switch(this.backend.transport) {
          case "long-polling":
            this.currentTransport = new cv.io.transport.LongPolling(this);
            break;
          case "sse":
            this.currentTransport = new cv.io.transport.Sse(this);
            break;
        }

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
       * @method readResendHeaderValues
       */
      readResendHeaderValues : function () {
        for (var headerName in this.resendHeaders) {
          this.resendHeaders[headerName] = this.xhr.getResponseHeader(headerName);
        }
      },

      /* return the relative path to a resource on the currently used backend
       *
       * @method getResourcePath
       *
       * @param name
       *          {String} Name of the resource (e.g. login, read, write, rrd)
       * @returns {String} relative path to the resource
       */
      getResourcePath : function (name) {
        return backend.baseURL + backend.resources[name];
      },

      /**
       * Subscribe to the addresses in the parameter. The second parameter
       * (filter) is optional
       *
       * @param addresses
       * @param filters
       * @method subscribe
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
            this.currentTransport.connect();
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
       * @param loginOnly (boolean) if true only login and backend configuration, no subscription to addresses (default: false)
       * @param callback (Function) cakk this function when login is done
       * @param context (Object) context for the callback (this)
       * @method login
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
  
          $.ajax({
            url: initPath ? initPath : this.getResourcePath("login"),
            dataType: 'json',
            context: this,
            data: request,
            success: this.handleLogin
          });
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
       * @param json
       */
      handleLogin : function (json) {
        // read backend configuration if send by backend
        if (json.c) {
          self.backend = $.extend(self.backend, json.c); // assign itself to run setter
        }
        this.dataReceived = false;
        if (this.loginSettings.loginOnly) {
          this.currentTransport.handleSession(json, false);
        } else {
          this.currentTransport.handleSession(json, true);
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
       * @method stop
       */
      stop : function () {
        this.running = false;
        if (this.currentTransport.abort) {
          this.currentTransport.abort();
        }
        this.loginSettings.loggedIn = false;
      },
  
      /**
       * Build the URL part that contains the addresses and filters
       * @method buildRequest
       * @param addresses
       * @return {String}
       */
      buildRequest : function (addresses) {
        addresses = addresses ? addresses : this.addresses;
        var
          requestAddresses = (addresses.length) ? 'a='
          + addresses.join('&a=') : '',
          requestFilters = (this.filters.length) ? 'f='
          + this.filters.join('&f=') : '';
        return 's=' + this.session + '&' + requestAddresses
          + ((addresses.length && this.filters.length) ? '&' : '')
          + requestFilters;
      },
  
      /**
       * This function sends a value
       * @param address
       * @param value
       * @method write
       */
      write : function (address, value) {
        /**
         * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
         * could maybe selective based on UserAgent but isn't that costly on writes
         */
        var ts = new Date().getTime();
        $.ajax({
          url: this.getResourcePath("write"),
          dataType: 'json',
          context: this,
          data: 's=' + this.session + '&a=' + address + '&v=' + value + '&ts=' + ts
        });
      },

      update: function(json) {}
    }
  });
});