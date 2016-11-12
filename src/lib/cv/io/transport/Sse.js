
define( ['joose'], function( ) {
  "use strict";
  
  Class('cv.io.transport.Sse', {
    
    have: {
      running           : false,
      sessionId         : null,
      session           : null,
      eventSource       : null
    },
    
    methods: {
      /**
       * This function gets called once the communication is established
       * and session information is available
       *
       * @param connect (boolean) wether to start the connection or not
       * @method handleSession
       */
      handleSession : function(json, connect) {
        this.sessionId = json.s;
        this.version = json.v.split('.', 3);

        if (0 < parseInt(this.version[0])
          || 1 < parseInt(this.version[1]))
          alert('ERROR CometVisu Client: too new protocol version ('
            + json.v + ') used!');

        if (connect) {
          this.connect();
        }
      },

      /**
       * Establish the SSE connection
       */
      connect : function() {
        // send first request
        this.running = true;
        this.session.dataReceived = false;
        this.eventSource = new EventSource(this.session.getResourcePath("read") + "?" + this.session.buildRequest());
        this.eventSource.addEventListener('message', this.handleMessage, false);
        this.eventSource.addEventListener('error', this.handleError, false);
        this.eventSource.onerror = function() {
          console.log("connection lost");
        };
        this.eventSource.onopen = function() {
          console.log("connection established");
        };
        this.session.watchdog.ping();
      },

      /**
       * Handle messages send from server as Server-Sent-Event
       */
      handleMessage : function(e) {
        var json = JSON.parse(e.data);
        var data = json.d;
        this.session.watchdog.ping();
        this.session.update(data);
        this.session.dataReceived = true;
      },

      /**
       * Handle errors
       */
      handleError : function(e) {
        if (e.readyState === EventSource.CLOSED) {
          // Connection was closed.
          this.running = false;
          // reconnect
          this.connect();
        }
      },

      /**
       * Check if the connection is still running.
       *
       * @returns {Boolean}
       */
      isConnectionRunning : function() {
        return this.eventSource.readyState === EventSource.OPEN;
      },

      /**
       * Restart the read request, e.g. when the watchdog kicks in
       *
       * @method restart
       */
      restart : function() {
        this.abort();
        this.connect();
      },

      /**
       * Abort the read request properly
       *
       * @method restart
       */
      abort : function() {
        if (this.isConnectionRunning() === true) {
          this.eventSource.close();
        }
      }
    }
  })
});