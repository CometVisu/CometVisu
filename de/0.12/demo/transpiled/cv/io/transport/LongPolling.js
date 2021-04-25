(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.io.Watchdog": {
        "construct": true
      },
      "cv.io.Client": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* LongPolling.js 
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
  qx.Class.define('cv.io.transport.LongPolling', {
    extend: qx.core.Object,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */

    /**
     *
     * @param client {cv.io.Client}
     */
    construct: function construct(client) {
      this.client = client;
      this.watchdog = new cv.io.Watchdog();
      this.watchdog.setClient(client);
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      watchdog: null,
      doRestart: false,
      // are we currently in a restart, e.g. due to the watchdog
      xhr: null,
      // the ongoing AJAX request
      lastIndex: -1,
      // index returned by the last request
      retryCounter: 0,
      // count number of retries (reset with each valid response)
      retryServerErrorCounter: 0,
      // count number of successive temporary server errors
      sessionId: null,
      client: null,
      running: null,

      /**
       * This function gets called once the communication is established
       * and this.client information is available.
       *
       * @param args {Array} arguments from the XHR response callback
       * @param connect {Boolean} whether to start the connection or not
       */
      handleSession: function handleSession(args, connect) {
        var json = this.client.getResponse(args);
        this.sessionId = json.s;

        if (!json.hasOwnProperty('v')) {
          this.error('CometVisu protocol error: missing protocol version');
          this.client.showError(cv.io.Client.ERROR_CODES.PROTOCOL_MISSING_VERSION, json);
        } else {
          this.version = json.v.split('.', 3);

          if (0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1])) {
            this.error('ERROR CometVisu Client: too new protocol version (' + json.v + ') used!');
          }

          if (connect) {
            this.connect();
          }
        }
      },
      connect: function connect() {
        this.running = true; // send first request

        var data = [];
        var successCallback = null;

        if (this.client.initialAddresses.length) {
          data = this.client.buildRequest(this.client.initialAddresses);
          successCallback = this.handleReadStart;
        } else {
          // old behaviour -> start full query
          data = this.client.buildRequest();
          successCallback = this.handleRead;
        }

        this.__P_156_0(data, successCallback);

        this.watchdog.start(5);
      },
      __P_156_0: function __P_156_0(data, callback) {
        data = data || this.client.buildRequest();
        callback = callback || this.handleRead;
        data.t = 0;
        var options = {
          beforeSend: this.beforeSend.bind(this),
          listeners: {
            error: this.handleError
          }
        };
        this.xhr = this.client.doRequest(this.client.getResourcePath("read"), data, callback, this, options);
      },

      /**
       * This function gets called once the communication is established
       * and this.client information is available
       */
      handleRead: function handleRead() {
        var json = this.client.getResponse(Array.prototype.slice.call(arguments, 0));

        if (this.doRestart || !json && -1 === this.lastIndex) {
          this.client.setDataReceived(false);

          if (this.running) {
            // retry initial request
            var delay = 100 * Math.pow(this.retryCounter, 2);
            this.retryCounter++;

            if (this.doRestart) {
              // planned restart, only inform user
              this.info("restarting XHR read requests in " + delay + " ms");
            } else {
              this.error("restarting XHR read requests in " + delay + " ms");
            }

            if (!this.watchdog.isActive()) {
              // watchdog has been stopped in the abort function -> restart it
              this.watchdog.start(5);
            }

            qx.event.Timer.once(function () {
              this.__P_156_0();

              this.watchdog.ping(true);
            }, this, delay);
          }

          return;
        }

        var data;

        if (json && !this.doRestart) {
          if (!json.hasOwnProperty('i')) {
            this.error('CometVisu protocol error: backend responded to a read request without an "i"-parameter');
            this.client.showError(cv.io.Client.ERROR_CODES.PROTOCOL_INVALID_READ_RESPONSE_MISSING_I, json);
            return;
          }

          this.lastIndex = json.i;
          data = json.d;
          this.readResendHeaderValues();
          this.client.update(data);
          this.retryCounter = 0;
          this.client.setDataReceived(true);
          this.client.setConnected(true);
        }

        this.retryServerErrorCounter = 0; // server has successfully responded

        if (this.running) {
          // keep the requests going
          this.retryCounter++;
          data = this.client.buildRequest();
          data.i = this.lastIndex;
          var url = this.xhr.getUrl().split("?").shift() + "?" + this.client.getQueryString(data);
          this.xhr.setUrl(url);
          this.xhr.send();
          this.watchdog.ping();
        }
      },
      handleReadStart: function handleReadStart() {
        var json = this.client.getResponse(Array.prototype.slice.call(arguments, 0));

        if (!json && -1 === this.lastIndex) {
          this.client.setDataReceived(false);

          if (this.running) {
            // retry initial request
            this.xhr.send();
            this.watchdog.ping();
          }

          return;
        }

        if (json && !this.doRestart) {
          this.readResendHeaderValues();
          this.client.update(json.d);
          this.client.setDataReceived(true);
          this.client.setConnected(true);
        }

        this.retryServerErrorCounter = 0; // server has successfully responded

        if (this.running) {
          // keep the requests going, but only
          // request
          // addresses-startPageAddresses
          var diffAddresses = [];

          for (var i = 0; i < this.client.addresses.length; i++) {
            if (!this.client.initialAddresses.includes(this.client.addresses[i])) {
              diffAddresses.push(this.client.addresses[i]);
            }
          }

          var data = this.client.buildRequest(diffAddresses);
          data.t = 0;
          var url = this.xhr.getUrl().split("?").shift() + "?" + this.client.getQueryString(data);
          this.xhr.setUrl(url);
          this.xhr.removeListener("success", this.handleReadStart, this);
          this.xhr.addListener("success", this.handleRead, this);
          this.xhr.send();
          this.watchdog.ping();
        }
      },

      /**
       * This function gets called on an error
       *
       *
       * @param ev {Event}
       */
      handleError: function handleError(ev) {
        var req = ev.getTarget(); // check for temporary server errors and retry a few times

        if ([408, 444, 499, 502, 503, 504].indexOf(req.getStatus()) >= 0 && this.retryServerErrorCounter < this.client.backend.maxRetries) {
          this.info('Temporary connection problem (status: ' + req.getStatus() + ') - retry count: ' + this.retryServerErrorCounter);
          this.retryServerErrorCounter++;
          req.serverErrorHandled = true;
          this.restart();
          return;
        } // ignore error when connection is irrelevant


        if (this.running && req.getReadyState() !== 4 && !this.doRestart && req.getStatus() !== 0) {
          this.error('Error! Type: "' + req.getResponse() + '" readyState: ' + req.getStatusText());
          this.client.setConnected(false);
        }
      },

      /**
       * manipulates the header of the current ajax query before it is
       * been send to the server
       *
       * @param xhr {Object} the native XHR object
       *
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

      /**
       * read the header values of a response and stores them to the
       * resendHeaders array
       */
      readResendHeaderValues: function readResendHeaderValues() {
        for (var headerName in this.resendHeaders) {
          this.resendHeaders[headerName] = this.xhr.getResponseHeader(headerName);
        }
      },

      /**
       * Check if the connection is still running.
       */
      isConnectionRunning: function isConnectionRunning() {
        return true;
      },

      /**
       * Restart the read request, e.g. when the watchdog kicks in
       *
       * @param doFullReload {Boolean} reload all data and not only restart connection
       */
      restart: function restart(doFullReload) {
        if (doFullReload) {
          this.lastIndex = -1; // reload all data
        }

        this.doRestart = true;
        this.abort();
        this.handleRead(); // restart

        this.doRestart = false;
      },

      /**
       * Abort the read request properly
       *
       */
      abort: function abort() {
        if (this.xhr && this.xhr.abort) {
          this.xhr.abort();
          this.xhr = null;

          if (this.client.backend && this.client.backend.hooks.onClose) {
            this.client.backend.hooks.onClose.bind(this);
          }
        }

        this.watchdog.stop();
      }
    }
  });
  cv.io.transport.LongPolling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LongPolling.js.map?dt=1619362531106