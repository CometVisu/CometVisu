define(['joose'], function() {

  Class("cv.io.Watchdog", {

      has: {
        last: { is: 'rw', init: Joose.I.Now },
        hardLast : { is: 'r' },
        client: { is: 'rw' }
      },

      methods: {

        aliveCheckFunction : function () {
          var now = new Date();
          if (now - this.last < this.client.getBackend().maxConnectionAge && this.client.getCurrentTransport().isConnectionRunning())
            return;
          this.client.getCurrentTransport().restart(now - this.hardLast > this.client.getBackend().maxDataAge);
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
}); // end define