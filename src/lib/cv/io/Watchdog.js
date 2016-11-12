define(['joose'], function() {
  Class("cv.utils.Watchdog", {

      has: {
        last: { is: 'rw', init: Joose.I.Now },
        hardLast : { is: 'r' },
        client: {}
      },

      methods: {

        aliveCheckFunction : function () {
          var now = new Date();
          if (now - this.last < this.client.getMaxConnectionAge() && this.client.getTransport().isConnectionRunning())
            return;
          this.client.getTransport().restart(now - this.hardLast > this.client.getMaxDataAge());
          this.last = now;
        },

        start: function (watchdogTimer) {
          setInterval(this.aliveCheckFunction, watchdogTimer * 1000);
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