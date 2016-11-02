define(['joose'], function() {
  Class("cv.utils.Timer", {
    my: {
      has: {
        intervals: { is: 'rw', init: {} }
      },

      methods: {
        once: function(callback, context, delay) {
          setTimeout(callback, delay || 0).bind(context || this);
        },

        start: function(interval, callback, context) {
          if (!this.intervals[interval]) {
            this.intervals[interval] = {
              id: setInterval(function() {
                this._onInterval(interval);
              }.bind(this), interval),
              listeners: []
            }
          }
          this.intervals[interval].listeners.push([callback, context]);
        },

        _onInterval: function(interval) {
          Joose.A.each(this.intervals[interval].listeners, function(entry) {
            entry[0].call(entry[1] || this);
          }, this);
        },

        stop: function (interval, callback, context) {
          if (!this.intervals[interval]) {
            return;
          }
          for (var i=this.intervals[interval].listeners.length; i >= 0; i--) {
            var entry = this.intervals[interval].listeners[i];
            if (entry[0] === callback && entry[1] === context) {
              this.intervals[interval].listeners.remove(i);
            }
          }
          if (this.intervals[interval].listeners.length === 0) {
            clearTimeout(this.intervals[interval].id);
            delete this.intervals[interval];
          }
        },

        stopAll: function() {
          Joose.A.each(this.intervals, function(entry) {
            clearTimeout(entry.id);
          }, this);
          this.intervals = {};
        }
      }
    }
  });
}); // end define