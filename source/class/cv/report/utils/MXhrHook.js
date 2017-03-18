/**
 * This mixin patches {qx.io.request.Xhr} to get noticed about every XHR request to record its response.
 */
qx.Mixin.define('cv.report.utils.MXhrHook', {
  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.addListener("changePhase", this._onPhaseChange, this);
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __sendTime: null,

    _onPhaseChange: function(ev) {
      if (ev.getData() === "opened") {
        this.__sendTime = Date.now();

      } else if (ev.getData() === "load") {
        if (this.__sendTime) {
          this.error("response received without sendTime set. Not possible to calculate correct delay");
        }
        // response has been received (successful or not) -> log it
        var headers = {};
        this.getAllResponseHeaders().trim().split("\r\n").forEach(function(entry){
          var parts = entry.split(": ");
          headers[parts[0]] = parts[1];
        });
        var delay = Date.now() - this.__sendTime;

        // log the trigger that triggers the server responses

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
            body: this.getTransport().responseText
          });
        }
        this.__sendTime = null;
      }
    }
  }
});