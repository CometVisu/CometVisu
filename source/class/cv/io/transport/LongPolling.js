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
  extend: cv.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  /**
   *
   * @param client {cv.io.Client}
   */
  construct: function(client) {
    this.session = client;
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    doRestart: false, // are we currently in a restart, e.g. due to the watchdog
    xhr: null, // the ongoing AJAX request
    lastIndex: -1,    // index returned by the last request
    retryCounter: 0,      // count number of retries (reset with each valid response)
    sessionId: null,
    session: null,
    running: null,

    /**
     * This function gets called once the communication is established
     * and this.session information is available.
     *
     * @param json
     * @param connect (boolean) wether to start the connection or not
     * @method handlethis.session
     */
    handleSession: function (ev, connect) {
      var json = qx.lang.Json.parse(ev.getTarget().getResponse());
      this.sessionId = json.s;
      this.version = json.v.split('.', 3);

      if (0 < parseInt(this.version[0])
        || 1 < parseInt(this.version[1]))
        this.error('ERROR CometVisu Client: too new protocol version ('
          + json.v + ') used!');

      if (connect) {
        this.connect();
      }
    },

    connect: function () {
      this.running = true;
      // send first request
      this.xhr = new qx.io.request.Xhr(this.session.getResourcePath("read"));
      this.xhr.set({
        accept: "application/json",
        method: "GET",
        beforeSend: this.beforeSend.bind(this)
      });
      this.xhr.addListener("error", this.handleError, this);
      if (this.session.initialAddresses.length) {
        this.xhr.set({
          requestData: this.session.buildRequest(this.session.initialAddresses) + '&t=0'
        });
        this.xhr.addListener("success", this.handleReadStart, this);
      } else {
        // old behaviour -> start full query
        this.xhr.set({
          requestData: this.session.buildRequest() + '&t=0'
        });
        this.xhr.addListener("success", this.handleRead, this);
      }
      this.xhr.send();
    },
    /**
     * This function gets called once the communication is established
     * and this.session information is available
     *
     * @method handleRead
     * @param json
     */
    handleRead: function (json) {
      if (this.doRestart || (!json && (-1 == this.lastIndex))) {
        this.session.setDataReceived(false);
        if (this.running) { // retry initial request
          this.retryCounter++;
          this.xhr.send();
          this.session.watchdog.ping(true);
        }
        return;
      }

      if (json && !this.doRestart) {
        this.lastIndex = json.i;
        var data = json.d;
        this.readResendHeaderValues();
        this.session.update(data);
        this.retryCounter = 0;
        this.session.setDataReceived(true);
      }

      if (this.running) { // keep the requests going
        this.retryCounter++;
        this.xhr.set({
          requestData: this.session.buildRequest() + '&i=' + this.lastIndex
        });
        this.xhr.send();
        this.session.watchdog.ping();
      }
    },

    handleReadStart: function (json) {
      if (!json && (-1 == this.lastIndex)) {
        this.session.setDataReceived(false);
        if (this.running) { // retry initial request
          this.xhr.send();
          this.session.watchdog.ping();
        }
        return;
      }
      if (json && !this.doRestart) {
        this.readResendHeaderValues();
        this.session.update(json.d);
        this.session.setDataReceived(true);
      }
      if (this.running) { // keep the requests going, but only
        // request
        // addresses-startPageAddresses
        var diffAddresses = [];
        for (var i = 0; i < this.session.addresses.length; i++) {
          if (qx.lang.Array.contains(this.session.addresses[i],
              this.session.initialAddresses) < 0)
            diffAddresses.push(this.session.addresses[i]);
        }

        this.xhr.set({
          data: this.session.buildRequest(diffAddresses) + '&t=0'
        });
        this.xhr.removeListener("success", this.handleReadStart, this);
        this.xhr.addListener("success", this.handleRead, this);
        this.xhr.send();
        this.session.watchdog.ping();
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
    handleError: function (xhr, str, excptObj) {
      if (this.running && xhr.readyState != 4
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
        this.error('Error! Type: "' + str + '" ExceptionObject: "'
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
    beforeSend: function (xhr) {
      for (var headerName in this.resendHeaders) {
        if (this.resendHeaders[headerName] != undefined)
          xhr.setRequestHeader(headerName,
            this.resendHeaders[headerName]);
      }
      for (var headerName in this.headers) {
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
    readResendHeaderValues: function () {
      for (var headerName in this.resendHeaders) {
        this.resendHeaders[headerName] = this.xhr
          .getResponseHeader(headerName);
      }
    },

    /**
     * Check if the connection is still running.
     */
    isConnectionRunning: function () {
      return true;
    },

    /**
     * Restart the read request, e.g. when the watchdog kicks in
     *
     * @method restart
     * @param {bool} doFullReload reload all data and not only restart connection
     */
    restart: function (doFullReload) {
      if (doFullReload)
        this.lastIndex = -1; // reload all data

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
    abort: function () {
      if (this.xhr && this.xhr.abort) {
        this.xhr.abort();

        if (this.session.backend && this.session.backend.hooks.onClose) {
          this.session.backend.hooks.onClose.bind(this);
        }
      }
    }
  }
});