qx.Class.define("cv.io.Watchdog", {
  extend: cv.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.last = Date.now();
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    client: {
      check: "cv.io.Client",
      nullable: true,
      init: null
    }
  },


  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    last: null,
    hardLast: null,

    aliveCheckFunction: function () {
      var now = new Date();
      if (now - this.last < this.getClient().getBackend().maxConnectionAge && this.getClient().getCurrentTransport().isConnectionRunning())
        return;
      this.getClient().getCurrentTransport().restart(now - this.hardLast > this.getClient().getBackend().maxDataAge);
      this.last = now;
    },

    start: function (watchdogTimer) {
      setInterval(this.aliveCheckFunction.bind(this), watchdogTimer * 1000);
    },

    ping: function (fullReload) {
      this.last = new Date();
      if (fullReload) {
        this.hardLast = this.last;
      }
    }
  }
});