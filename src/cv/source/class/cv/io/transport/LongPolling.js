qx.Class.define('cv.io.transport.LongPolling', {
  extend: cv.Object,

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    doRestart: false, // are we currently in a restart, e.g. due to the watchdog
    xhr: false, // the ongoing AJAX request
    lastIndex: -1,    // index returned by the last request
    retryCounter: 0,      // count number of retries (reset with each valid response)
    sessionId: null,
    session: null,

    /**
     * This function gets called once the communication is established
     * and this.session information is available.
     *
     * @param json
     * @param connect (boolean) wether to start the connection or not
     * @method handlethis.session
     */
    handleSession: function (json, connect) {
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
      if (this.session.initialAddresses.length) {
        this.xhr = $.ajax({
          url: this.session.getResourcePath("read"),
          dataType: 'json',
          context: this,
          data: this.session.buildRequest(this.session.initialAddresses) + '&t=0',
          success: this.handleReadStart,
          beforeSend: this.beforeSend
        });
      } else {
        // old behaviour -> start full query
        this.xhr = $.ajax({
          url: this.session.getResourcePath("read"),
          dataType: 'json',
          context: this,
          data: this.session.buildRequest() + '&t=0',
          success: this.handleRead,
          error: this.handleError,
          beforeSend: this.beforeSend
        });
      }
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
        this.session.dataReceived = false;
        if (this.running) { // retry initial request
          this.retryCounter++;
          this.xhr = $.ajax({
            url: this.session.getResourcePath("read"),
            dataType: 'json',
            context: this,
            data: this.session.buildRequest() + '&t=0',
            success: this.handleRead,
            error: this.handleError,
            beforeSend: this.beforeSend
          });
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
        this.session.dataReceived = true;
      }

      if (this.running) { // keep the requests going
        this.retryCounter++;
        this.xhr = $.ajax({
          url: this.session.getResourcePath("read"),
          dataType: 'json',
          context: this,
          data: this.session.buildRequest() + '&i=' + this.lastIndex,
          success: this.handleRead,
          error: this.handleError,
          beforeSend: this.beforeSend
        });
        this.session.watchdog.ping();
      }
    },

    handleReadStart: function (json) {
      if (!json && (-1 == this.lastIndex)) {
        this.session.dataReceived = false;
        if (this.running) { // retry initial request
          this.xhr = $.ajax({
            url: this.session.getResourcePath("read"),
            dataType: 'json',
            context: this,
            data: this.session.buildRequest(this.session.initialAddresses) + '&t=0',
            success: this.handleReadStart,
            beforeSend: this.beforeSend
          });
          this.session.watchdog.ping();
        }
        return;
      }
      if (json && !this.doRestart) {
        this.readResendHeaderValues();
        this.session.update(json.d);
        this.session.dataReceived = true;
      }
      if (this.running) { // keep the requests going, but only
        // request
        // addresses-startPageAddresses
        var diffAddresses = [];
        for (var i = 0; i < this.session.addresses.length; i++) {
          if ($.inArray(this.addresses[i],
              this.session.initialAddresses) < 0)
            diffAddresses.push(this.session.addresses[i]);
        }
        this.xhr = $.ajax({
          url: this.session.getResourcePath("read"),
          dataType: 'json',
          context: this,
          data: this.session.buildRequest(diffAddresses) + '&t=0',
          success: this.handleRead,
          error: this.handleError,
          beforeSend: this.beforeSend
        });
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