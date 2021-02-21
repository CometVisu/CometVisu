(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ConfigCache": {},
      "cv.report.Record": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * This mixin patches {qx.io.request.Xhr} to get noticed about every XHR request to record its response.
   */
  qx.Mixin.define('cv.report.utils.MXhrHook', {
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      this.addListener("changePhase", this._onPhaseChange, this);
    },

    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      PENDING: {}
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_507_0: null,

      /**
       * Calculate Hash code for current request
       */
      getRequestHash: function getRequestHash() {
        return cv.ConfigCache.hashCode(cv.report.Record.normalizeUrl(this._getConfiguredUrl()) + this.getMethod() + JSON.stringify(this.getRequestData()));
      },
      _onPhaseChange: function _onPhaseChange(ev) {
        var hash = this.getRequestHash();
        var delay;

        if (ev.getData() === "opened") {
          this.__P_507_0 = Date.now(); // calculate Hash value for request

          cv.report.Record.record(cv.report.Record.XHR, "request", {
            url: cv.report.Record.normalizeUrl(this._getConfiguredUrl()),
            hash: hash
          });

          if (!cv.report.utils.MXhrHook.PENDING[hash]) {
            cv.report.utils.MXhrHook.PENDING[hash] = [];
          }

          cv.report.utils.MXhrHook.PENDING[hash].push(cv.report.Record.normalizeUrl(this._getConfiguredUrl()));
        } else if (ev.getData() === "load") {
          if (!this.__P_507_0) {
            this.error("response received without sendTime set. Not possible to calculate correct delay");
          } // response has been received (successful or not) -> log it


          var headers = {};
          this.getAllResponseHeaders().trim().split("\r\n").forEach(function (entry) {
            var parts = entry.split(": ");
            headers[parts[0]] = parts[1];
          });
          delay = Date.now() - this.__P_507_0; // log the trigger that triggers the server responses
          // do not log 404 answers as the fake server sends them automatically
          // end the logged ones break the replay for some reason

          if (this.getStatus() !== 404) {
            cv.report.Record.record(cv.report.Record.XHR, "response", {
              url: cv.report.Record.normalizeUrl(this._getConfiguredUrl()),
              method: this.getMethod(),
              status: this.getStatus(),
              delay: delay,
              requestData: this.getRequestData(),
              headers: headers,
              body: this.getTransport().responseText,
              hash: hash,
              phase: "load"
            });
          }

          this.__P_507_0 = null; // delete pending request

          cv.report.utils.MXhrHook.PENDING[hash].shift();

          if (cv.report.utils.MXhrHook.PENDING[hash].length === 0) {
            delete cv.report.utils.MXhrHook.PENDING[hash];
          }
        } else if (ev.getData() === "abort") {
          delay = Date.now() - this.__P_507_0; // request aborted, maybe by watchdog

          cv.report.Record.record(cv.report.Record.XHR, "response", {
            url: cv.report.Record.normalizeUrl(this._getConfiguredUrl()),
            delay: delay,
            hash: hash,
            phase: "abort"
          }); // delete pending request

          cv.report.utils.MXhrHook.PENDING[hash].shift();

          if (cv.report.utils.MXhrHook.PENDING[hash].length === 0) {
            delete cv.report.utils.MXhrHook.PENDING[hash];
          }
        }
      }
    }
  });
  cv.report.utils.MXhrHook.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MXhrHook.js.map?dt=1613908133613