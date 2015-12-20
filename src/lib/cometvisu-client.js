/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * The JavaScript library that implements the CometVisu protocol.
 * 
 * @module CometVisu Client
 * @title CometVisu Client
 * @reqires jQuery
 */
define([], function() {
  "use strict";

  /**
   * Class that handles the communicaton of the client
   * 
   * @class CometVisu
   * @constructor foo
   * @param backend {String} name of the backend (cgi-bin|default|oh|openhab|oh2|openhab2)
   * @param initPath {String|null} optional path to login ressource
   */
  function CometVisu(backend, initPath) {
    this.initPath = initPath;

    // used for backwards compability
    this.aliases = {
        'cgi-bin' : 'default',
        'oh'      : 'openhab',
        'oh2'     : 'openhab2'
    };
    if (this.aliases[backend]) {
      backend = this.aliases[backend];
    }

    this.backends = {
        'default' : {
          name      : 'default',
          baseURL   : '/cgi-bin/',
          transport : 'long-polling',
          resources : {
            login     : 'l',
            read      : 'r',
            write     : 'w',
            rrd       : 'rrdfetch'
          },
          hooks     : {}
        },
        'openhab' : {
          name          : 'openHAB',
          baseURL       : '/services/cv/',
          // keep the e.g. atmosphere tracking-id if there is one
          resendHeaders : {
            'X-Atmosphere-tracking-id' : undefined
          },
          // fixed headers that are send everytime
          headers       : {
            'X-Atmosphere-Transport' : 'long-polling'
          },
          hooks         : {
            onClose : function() {
              // send an close request to the openHAB server
              var oldValue = this.headers["X-Atmosphere-Transport"];
              this.headers["X-Atmosphere-Transport"] = "close";
              $.ajax({
                url         : this.config.baseURL + this.config.resources.read,
                dataType    : 'json',
                context     : this,
                beforeSend  : this.beforeSend
              });
              if (oldValue != undefined) {
                this.headers["X-Atmosphere-Transport"] = oldValue;
              } else {
                delete this.headers["X-Atmosphere-Transport"];
              }
            }
          }
        }
    };
    // init default settings
    this.config = this.backends['default'];
    if (backend && backend !== 'default') {
      if ($.isPlainObject(backend)) {
        // override default settings
        $.extend(this.config, backend);
      } else if (this.backends[backend]) {
        // merge backend settings into this.config
        $.extend(this.config, this.backends[backend]);
      }
    }

    var thisCometVisu = this;
    this.addresses = []; // the subscribed addresses
    this.initialAddresses = []; // the addresses which should be loaded
    // before the subscribed addresses
    this.filters = []; // the subscribed filters
    this.user = ''; // the current user
    this.pass = ''; // the current password
    this.device = ''; // the current device ID
    this.running = false; // is the communication running at the moment?
    this.currentTransport; // the currently used transport layer

    this.setInitialAddresses = function(addresses) {
      this.initialAddresses = addresses;
    },

    /**
     * return the relative path to a resource on the currently used backend
     * 
     * @method getResourcePath
     * 
     * @param name
     *          {String} Name of the resource (e.g. login, read, write, rrd)
     * @returns {String} relative path to the resource
     */
    this.getResourcePath = function(name) {
      return this.config.baseURL + this.config.resources[name];
    };

    /**
     * Called once after backend setting is created to do some custom
     * settings if neccessary
     * 
     * @method checkSettings
     */
    this.checkSettings = function() {
      if (this.config.transport === 'sse' && this.config.transportFallback) {
        if (window.EventSource === undefined) {
          // browser does not support EventSource object => use fallback
          // transport + settings
          $.extend(this.config, this.config.transportFallback);
        }
      }
      // add trailing slash to baseURL if not set
      if (this.config.baseURL && !this.config.baseURL.endsWith("/")) {
        this.config.baseURL += "/";
      }
      this.currentTransport = this.transport[this.config.transport];
    };
    this.checkSettings();

    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     * 
     * @param addresses
     * @param filters
     * @method subscribe
     */
    this.subscribe = function(addresses, filters) {
      // initialize transport and use the transport object as context for
      // itself
      this.currentTransport.init.bind(this.currentTransport);

      var startCommunication = !this.addresses.length; // start when
      // addresses were
      // empty
      this.addresses = addresses ? addresses : [];
      this.filters = filters ? filters : [];

      if (!addresses.length)
        this.stop(); // stop when new addresses are empty
      else if (startCommunication)
        this.login();
    };

    /**
     * This function starts the communication by a login and then runs the
     * ongoing communication task
     * 
     * @method login
     */
    this.login = function() {
      var request = {};
      if ('' !== this.user)
        request.u = this.user;
      if ('' !== this.pass)
        request.p = this.pass;
      if ('' !== this.device)
        request.d = this.device;

      $.ajax({
        url       : this.initPath ? this.initPath : this.getResourcePath("login"),
            dataType  : 'json',
            context   : this,
            data      : request,
            success   : this.handleLogin
      });
    };

    /**
     * Handles login response, applies backend configuration if send by
     * backend and forwards to the configurated transport handleSession
     * function
     * 
     * @param json
     */
    this.handleLogin = function(json) {
      // read backend configuration if send by backend
      if (json.c) {
        $.extend(this.config, json.c);
        this.checkSettings();
      }
      // bind context object (this) to the handleSession function
      var bound = this.currentTransport.handleSession.bind(this.currentTransport);
      // call the bound function
      bound(json);
    };

  /**
   * This function sends a value
   * @method write
   */
  this.write = function( address, value )
  {
    /**
     * This function stops an ongoing connection
     * 
     * @method stop
     */
    this.stop = function() {
      this.running = false;
      if (this.currentTransport.abort) {
        this.currentTransport.abort();
      }
    };

    this.transport = {
        'long-polling' : {
          doRestart         : false, // are we currently in a restart, e.g. due to the watchdog
          xhr               : false, // the ongoing AJAX request
          watchdogTimer     : 5, // in Seconds - the alive check interval of the watchdog
          maxConnectionAge  : 60, // in Seconds - restart if last read is older
          maxDataAge        : 3200, // in Seconds - reload all data when last successful read is older (should be faster than the index overflow at max data rate, i.e. 2^16 @ 20 tps for KNX TP)
          lastIndex         : -1, // index returned by the last request
          retryCounter      : 0, // count number of retries (reset with each valid response)

          init : function() {
            this.watchdog();
          },

          watchdog : function() {
            var last = new Date();
            var hardLast = last;
            var aliveCheckFunction = function() {
              var now = new Date();
              if (now - last < this.maxConnectionAge * 1000)
                return;
              if (now - hardLast > this.maxDataAge * 1000)
                thislastIndex = -1; // reload all data
              this.restart();
              last = now;
            };
            setInterval(aliveCheckFunction.bind(this), this.watchdogTimer * 1000);
            return {
              ping : function() {
                // delete last;
                last = new Date();
                if (!this.doRestart) {
                  // delete hardLast;
                  hardLast = last;
                }
              }.bind(this)
            };
          },

          /**
           * This function gets called once the communication is established
           * and session information is available.
           * 
           * @param json
           * @method handleSession
           */
          handleSession : function(json) {
            thisCometVisu.session = json.s;
            thisCometVisu.version = json.v.split('.', 3);

            if (0 < parseInt(thisCometVisu.version[0])
                || 1 < parseInt(thisCometVisu.version[1]))
              alert('ERROR CometVisu Client: too new protocol version ('
                  + json.v + ') used!');

            // send first request
            thisCometVisu.running = true;
            if (thisCometVisu.initialAddresses.length) {
              this.xhr = $.ajax({
                url         : thisCometVisu.getResourcePath("read"),
                dataType    : 'json',
                context     : this,
                data        : thisCometVisu.buildRequest(thisCometVisu.initialAddresses) + '&t=0',
                success     : this.handleReadStart,
                beforeSend  : this.beforeSend
              });
            } else {
              // old behaviour -> start full query
              this.xhr = $.ajax({
                url         : thisCometVisu.getResourcePath("read"),
                dataType    : 'json',
                context     : this,
                data        : thisCometVisu.buildRequest() + '&t=0',
                success     : this.handleRead,
                error       : this.handleError,
                beforeSend  : this.beforeSend
              });
            }
          },
          /**
           * This function gets called once the communication is established
           * and session information is available
           * 
           * @method handleRead
           * @param json
           */
          handleRead : function(json) {
            if (!json && (-1 == this.lastIndex)) {
              if (thisCometVisu.running) { // retry initial request
                this.retryCounter++;
                this.xhr = $.ajax({
                  url : thisCometVisu.getResourcePath("read"),
                  dataType : 'json',
                  context : this,
                  data : thisCometVisu.buildRequest() + '&t=0',
                  success : this.handleRead,
                  error : this.handleError,
                  beforeSend : this.beforeSend
                });
                this.watchdog.ping();
              }
              return;
            }

            if (json && !this.doRestart) {
              this.lastIndex = json.i;
              var data = json.d;
              this.readResendHeaderValues();
              thisCometVisu.update(data);
              this.retryCounter = 0;
            }

            if (thisCometVisu.running) { // keep the requests going
              this.retryCounter++;
              this.xhr = $.ajax({
                url         : thisCometVisu.getResourcePath("read"),
                dataType    : 'json',
                context     : this,
                data        : thisCometVisu.buildRequest() + '&i=' + this.lastIndex,
                success     : this.handleRead,
                error       : this.handleError,
                beforeSend  : this.beforeSend
              });
              this.watchdog.ping();
            }
          },

          handleReadStart : function(json) {
            if (!json && (-1 == this.lastIndex)) {
              if (thisCometVisu.running) { // retry initial request
                this.xhr = $.ajax({
                  url         : thisCometVisu.getResourcePath("read"),
                  dataType    : 'json',
                  context     : this,
                  data        : thisCometVisu.buildRequest(thisCometVisu.initialAddresses) + '&t=0',
                  success     : this.handleReadStart,
                  beforeSend  : this.beforeSend
                });
                this.watchdog.ping();
              }
              return;
            }
            if (json && !this.doRestart) {
              this.readResendHeaderValues();
              thisCometVisu.update(json.d);
            }
            if (thisCometVisu.running) { // keep the requests going, but only
              // request
              // addresses-startPageAddresses
              var diffAddresses = [];
              for (var i = 0; i < thisCometVisu.addresses.length; i++) {
                if ($.inArray(thisCometVisu.addresses[i],
                    thisCometVisu.initialAddresses) < 0)
                  diffAddresses.push(thisCometVisu.addresses[i]);
              }
              this.xhr = $.ajax({
                url         : thisCometVisu.getResourcePath("read"),
                dataType    : 'json',
                context     : this,
                data        : thisCometVisu.buildRequest(diffAddresses) + '&t=0',
                success     : this.handleRead,
                error       : this.handleError,
                beforeSend  : this.beforeSend
              });
              this.watchdog.ping();
            }
          },

          /**
           * This function gets called on an error FIXME: this should be a
           * prototype, so that the application developer can override it
           * 
           * @method handleError
           * @param xhr
           * @param str
           * @param excptObj
           */
          handleError : function(xhr, str, excptObj) {
            if (thisCometVisu.running && xhr.readyState != 4
                && !this.doRestart && xhr.status !== 0) // ignore error when
              // connection is
              // irrelevant
            {
              var readyState = 'UNKNOWN';
              switch (xhr.readyState) {
                case 0:
                  readyState = 'UNINITIALIZED';
                  break;
                case 1:
                  readyState = 'LOADING';
                  break;
                case 2:
                  readyState = 'LOADED';
                  break;
                case 3:
                  readyState = 'INTERACTIVE';
                  break;
                case 4:
                  readyState = 'COMPLETED';
                  break;
              }
              alert('Error! Type: "' + str + '" ExceptionObject: "'
                  + excptObj + '" readyState: ' + readyState);
            }
          },

          /**
           * manipulates the header of the current ajax query before it is
           * been send to the server
           * 
           * @param xhr
           * @method beforeSend
           */
          beforeSend : function(xhr) {
            for ( var headerName in this.resendHeaders) {
              if (this.resendHeaders[headerName] != undefined)
                xhr.setRequestHeader(headerName,
                    this.resendHeaders[headerName]);
            }
            for ( var headerName in this.headers) {
              if (this.headers[headerName] != undefined)
                xhr.setRequestHeader(headerName, this.headers[headerName]);
            }
          },

          /**
           * read the header values of a response and stores them to the
           * resendHeaders array
           * 
           * @method readResendHeaderValues
           */
          readResendHeaderValues : function() {
            for ( var headerName in this.resendHeaders) {
              this.resendHeaders[headerName] = this.xhr
              .getResponseHeader(headerName);
            }
          },

          /**
           * Restart the read request, e.g. when the watchdog kicks in
           * 
           * @method restart
           */
          restart : function() {
            this.doRestart = true;
            this.abort();
            this.handleRead(); // restart
            this.doRestart = false;
          },
          /**
           * Abort the read request properly
           * 
           * @method restart
           */
          abort : function() {
            if (this.xhr && this.xhr.abort) {
              this.xhr.abort();

              if (this.config && this.config.hooks.onClose) {
                this.config.hooks.onClose.bind(this);
              }
            }
          }
        },
        'sse' : {
          watchdogTimer : 5, // in Seconds - the alive check interval of the watchdog

          init : function() {
          },

          watchdog : function() {
            var aliveCheckFunction = function() {
              if (this.eventSource.readyState === EventSource.CLOSED) {
                console.log("connection closed => restarting");
                this.connect();
              }
            };
            setInterval(aliveCheckFunction.bind(this),
                this.watchdogTimer * 1000);
          },
          /**
           * This function gets called once the communication is established
           * and session information is available
           * 
           * @method handleSession
           */
          handleSession : function(json) {
            thisCometVisu.session = json.s;
            thisCometVisu.version = json.v.split('.', 3);

            if (0 < parseInt(thisCometVisu.version[0])
                || 1 < parseInt(thisCometVisu.version[1]))
              alert('ERROR CometVisu Client: too new protocol version ('
                  + json.v + ') used!');

            this.connect();
          },

          /**
           * Establish the SSE connection
           */
          connect : function() {
            // send first request
            thisCometVisu.running = true;
            this.eventSource = new EventSource(thisCometVisu
                .getResourcePath("read")
                + "?" + thisCometVisu.buildRequest());
            this.eventSource.addEventListener('message', this.handleMessage,
                false);
            this.eventSource.addEventListener('error', this.handleError,
                false);
            this.eventSource.onerror = function(event) {
              console.log("connection lost");
            };
            this.eventSource.onopen = function(event) {
              console.log("connection established");
            };
            this.watchdog();
          },

          /**
           * Handle messages send from server as Server-Sent-Event
           */
          handleMessage : function(e) {
            var json = JSON.parse(e.data);
            var data = json.d;
            thisCometVisu.update(data);
          },

          /**
           * Handle errors
           */
          handleError : function(e) {
            if (e.readyState == EventSource.CLOSED) {
              // Connection was closed.
              thisCometVisu.running = false;
              // reconnect
              connect();
            }
          }
        }
    };

    /**
     * Build the URL part that contains the addresses and filters
     * @method buildRequest
     * @param addresses
     * @return {String} 
     */
    this.buildRequest = function(addresses) {
      addresses = addresses ? addresses : this.addresses;
      var requestAddresses = (addresses.length) ? 'a='
          + addresses.join('&a=') : '';
          var requestFilters = (this.filters.length) ? 'f='
              + this.filters.join('&f=') : '';
              return 's=' + this.session + '&' + requestAddresses
              + ((addresses.length && this.filters.length) ? '&' : '')
              + requestFilters;
    };

    /**
     * This function sends a value
     * @param address
     * @param value
     * @method write
     */
    this.write = function(address, value) {
      /**
       * ts is a quirk to fix wrong caching on some Android-tablets/Webkit;
       * could maybe selective based on UserAgent but isn't that costly on writes
       */
      var ts = new Date().getTime();
      $.ajax({
        url       : this.getResourcePath("write"),
        dataType  : 'json',
        context   : this,
        data      : 's=' + this.session + '&a=' + address + '&v=' + value + '&ts=' + ts
      });
    };
  };

  CometVisu.prototype.update = function(json) {
  };

  return CometVisu;
});