/**
 * This mixin patches {qx.io.request.Xhr} during replaying mode of reporting to add the delays to the responses
 * and unqueue aborted responses
 */
qx.Mixin.define("cv.report.utils.MXhrReplayHook", {
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
      var response = cv.report.utils.FakeServer.getResponse(this._getConfiguredUrl());
      if (!response) {
        // no logged response found might be an 404
        return;
      }
      if (ev.getData() === "opened") {
        console.log("delaying response for "+this._getConfiguredUrl()+" by "+response.delay);
        qx.dev.FakeServer.getInstance().getFakeServer().autoRespondAfter = response ? response.delay : 10;
      } else if (ev.getData() === "abort") {
        if (response.phase === "abort") {
          cv.report.utils.FakeServer.unqueueResponse(this._getConfiguredUrl());
        }
      }
    }
  }
});
