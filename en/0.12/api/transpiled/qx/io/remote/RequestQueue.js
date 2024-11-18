(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.client.Transport": {
        "require": true
      },
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
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.event.Timer": {
        "construct": true
      },
      "qx.io.remote.Exchange": {},
      "qx.lang.Array": {},
      "qx.event.Registration": {},
      "qx.event.type.Event": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "io.maxrequests": {
          "load": true,
          "className": "qx.bom.client.Transport"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 Derrell Lipman
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Derrell Lipman (derrell)
  
  ************************************************************************ */

  /**
   * Handles scheduling of requests to be sent to a server.
   *
   * This class is a singleton and is used by qx.io.remote.Request to schedule its
   * requests. It should not be used directly.
   *
   * NOTE: Instances of this class must be disposed of after use
   *
   * @internal
   * @require(qx.bom.client.Transport)
   */
  qx.Class.define("qx.io.remote.RequestQueue", {
    type: "singleton",
    extend: qx.core.Object,
    implement: [qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_222_0 = [];
      this.__P_222_1 = [];
      this.__P_222_2 = 0; // timeout handling

      this.__P_222_3 = new qx.event.Timer(500);

      this.__P_222_3.addListener("interval", this._oninterval, this);
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      /**
       * Indicates whether queue is enabled or not.
       */
      enabled: {
        init: true,
        check: "Boolean",
        apply: "_applyEnabled"
      },

      /**
       * The maximum number of total requests.
       */
      maxTotalRequests: {
        check: "Integer",
        nullable: true
      },

      /**
       * Maximum number of parallel requests.
       */
      maxConcurrentRequests: {
        check: "Integer",
        init: qx.core.Environment.get("io.maxrequests")
      },

      /**
       * Default timeout for remote requests in milliseconds.
       */
      defaultTimeout: {
        check: "Integer",
        init: 5000
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_222_0: null,
      __P_222_1: null,
      __P_222_2: null,
      __P_222_3: null,

      /*
      ---------------------------------------------------------------------------
        QUEUE HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Get a list of queued requests
       *
       * @return {qx.io.remote.Request[]} The list of queued requests
       */
      getRequestQueue: function getRequestQueue() {
        return this.__P_222_0;
      },

      /**
       * Get a list of active queued requests, each one wrapped in an instance of
       * {@link qx.io.remote.Exchange}
       *
       * @return {qx.io.remote.Exchange[]} The list of active queued requests, each one
       *   wrapped in an instance of {@link qx.io.remote.Exchange}
       */
      getActiveQueue: function getActiveQueue() {
        return this.__P_222_1;
      },

      /**
       * Generates debug output
       */
      _debug: function _debug() {},

      /**
       * Checks the queue if any request is left to send and uses the transport
       * layer to send the open requests.
       * This method calls itself until every request in the queue is send.
       *
       */
      _check: function _check() {
        // Debug output
        this._debug(); // Check queues and stop timer if not needed anymore


        if (this.__P_222_1.length == 0 && this.__P_222_0.length == 0) {
          this.__P_222_3.stop();
        } // Checking if enabled


        if (!this.getEnabled()) {
          return;
        } // Checking active queue fill


        if (this.__P_222_0.length == 0 || this.__P_222_0[0].isAsynchronous() && this.__P_222_1.length >= this.getMaxConcurrentRequests()) {
          return;
        } // Checking number of total requests


        if (this.getMaxTotalRequests() != null && this.__P_222_2 >= this.getMaxTotalRequests()) {
          return;
        }

        var vRequest = this.__P_222_0.shift();

        var vTransport = new qx.io.remote.Exchange(vRequest); // Increment counter

        this.__P_222_2++; // Add to active queue

        this.__P_222_1.push(vTransport); // Debug output


        this._debug(); // Establish event connection between qx.io.remote.Exchange and me.


        vTransport.addListener("sending", this._onsending, this);
        vTransport.addListener("receiving", this._onreceiving, this);
        vTransport.addListener("completed", this._oncompleted, this);
        vTransport.addListener("aborted", this._oncompleted, this);
        vTransport.addListener("timeout", this._oncompleted, this);
        vTransport.addListener("failed", this._oncompleted, this); // Store send timestamp

        vTransport._start = new Date().valueOf(); // Send

        vTransport.send(); // Retry

        if (this.__P_222_0.length > 0) {
          this._check();
        }
      },

      /**
       * Removes a transport object from the active queue and disposes the
       * transport object in order stop the request.
       *
       * @param vTransport {qx.io.remote.Exchange} Transport object
       */
      _remove: function _remove(vTransport) {
        // Remove from active transports
        qx.lang.Array.remove(this.__P_222_1, vTransport); // Dispose transport object

        vTransport.dispose(); // Check again

        this._check();
      },

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLING
      ---------------------------------------------------------------------------
      */
      __P_222_4: 0,

      /**
       * Listens for the "sending" event of the transport object and increases
       * the counter for active requests.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onsending: function _onsending(e) {
        e.getTarget().getRequest()._onsending(e);
      },

      /**
       * Listens for the "receiving" event of the transport object and delegate
       * the event to the current request object.
       *
       * @param e {qx.event.type.Event} event object
       */
      _onreceiving: function _onreceiving(e) {
        e.getTarget().getRequest()._onreceiving(e);
      },

      /**
       * Listens for the "completed" event of the transport object and decreases
       * the counter for active requests.
       *
       * @param e {qx.event.type.Event} event object
       */
      _oncompleted: function _oncompleted(e) {
        // delegate the event to the handler method of the request depending
        // on the current type of the event ( completed|aborted|timeout|failed )
        var request = e.getTarget().getRequest();
        var requestHandler = "_on" + e.getType(); // remove the request from the queue,
        // keep local reference, see [BUG #4422]

        this._remove(e.getTarget()); // It's possible that the request handler can fail, possibly due to
        // being sent garbage data. We want to prevent that from crashing
        // the program, but instead display an error.


        try {
          if (request[requestHandler]) {
            request[requestHandler](e);
          }
        } catch (ex) {
          this.error("Request " + request + " handler " + requestHandler + " threw an error: ", ex); // Issue an "aborted" event so the application gets notified.
          // If that too fails, or if there's no "aborted" handler, ignore it.

          try {
            if (request["_onaborted"]) {
              var event = qx.event.Registration.createEvent("aborted", qx.event.type.Event);
              request["_onaborted"](event);
            }
          } catch (ex1) {}
        }
      },

      /*
      ---------------------------------------------------------------------------
        TIMEOUT HANDLING
      ---------------------------------------------------------------------------
      */

      /**
       * Listens for the "interval" event of the transport object and checks
       * if the active requests are timed out.
       *
       * @param e {qx.event.type.Event} event object
       */
      _oninterval: function _oninterval(e) {
        var vActive = this.__P_222_1;

        if (vActive.length == 0) {
          this.__P_222_3.stop();

          return;
        }

        var vCurrent = new Date().valueOf();
        var vTransport;
        var vRequest;
        var vDefaultTimeout = this.getDefaultTimeout();
        var vTimeout;
        var vTime;

        for (var i = vActive.length - 1; i >= 0; i--) {
          vTransport = vActive[i];
          vRequest = vTransport.getRequest();

          if (vRequest.isAsynchronous()) {
            vTimeout = vRequest.getTimeout(); // if timer is disabled...

            if (vTimeout == 0) {
              // then ignore it.
              continue;
            }

            if (vTimeout == null) {
              vTimeout = vDefaultTimeout;
            }

            vTime = vCurrent - vTransport._start;

            if (vTime > vTimeout) {
              this.warn("Timeout: transport " + vTransport.toHashCode());
              this.warn(vTime + "ms > " + vTimeout + "ms");
              vTransport.timeout();
            }
          }
        }
      },

      /*
      ---------------------------------------------------------------------------
        MODIFIERS
      ---------------------------------------------------------------------------
      */
      // property apply
      _applyEnabled: function _applyEnabled(value, old) {
        if (value) {
          this._check();
        }

        this.__P_222_3.setEnabled(value);
      },

      /*
      ---------------------------------------------------------------------------
        CORE METHODS
      ---------------------------------------------------------------------------
      */

      /**
       * Add the request to the pending requests queue.
       *
       * @param vRequest {var} The request
       */
      add: function add(vRequest) {
        vRequest.setState("queued");

        if (vRequest.isAsynchronous()) {
          this.__P_222_0.push(vRequest);
        } else {
          this.__P_222_0.unshift(vRequest);
        }

        this._check();

        if (this.getEnabled()) {
          this.__P_222_3.start();
        }
      },

      /**
       * Remove the request from the pending requests queue.
       *
       *  The underlying transport of the request is forced into the aborted
       *  state ("aborted") and listeners of the "aborted"
       *  signal are notified about the event. If the request isn't in the
       *  pending requests queue, this method is a noop.
       *
       * @param vRequest {var} The request
       */
      abort: function abort(vRequest) {
        var vTransport = vRequest.getTransport();

        if (vTransport) {
          vTransport.abort();
        } else if (this.__P_222_0.includes(vRequest)) {
          qx.lang.Array.remove(this.__P_222_0, vRequest);
        }
      }
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeArray("__P_222_1");

      this._disposeObjects("__P_222_3");

      this.__P_222_0 = null;
    }
  });
  qx.io.remote.RequestQueue.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RequestQueue.js.map?dt=1731946681934