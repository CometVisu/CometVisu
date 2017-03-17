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

    _onPhaseChange: function(ev) {
      if (ev.getData() === "load") {
        // response has been received (successful or not) -> log it
        var headers = {};
          this.getAllResponseHeaders().trim().split("\r\n").forEach(function(entry){
          var parts = entry.split(": ");
          headers[parts[0]] = parts[1];
        });
        cv.report.Record.record(cv.report.Record.XHR, "response", {
          url: cv.report.Record.normalizeUrl(this._getConfiguredUrl()),
          method: this.getMethod(),
          status: this.getStatus(),
          requestData: this.getRequestData(),
          headers: headers,
          body: this.getTransport().responseText
        });
      }
    }
  }
});