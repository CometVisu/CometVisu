/**
 * Utility module to give some support to work with functions.
 */
qx.Class.define("cv.util.Function", {

  statics: {
    /**
     * Like qx.util.Function.throttle with additional support to abort the throttling.
     *
     * @param callback {Function} the callback which should be executed in the given interval
     * @param interval {Number} Interval in milliseconds
     * @param options {Map} the keys are <code>leading</code> and <code>trailing</code> to control the
     * executing of the callback precisely. Default values are <code>true</code> for both options.
     * @return {Map} with 2 keys <code>call</code> a wrapper function which <em>shields</em> the given callback function
     *                <code>abort</code> abort throttling and skip the trailing value
     */
    throttle: function (callback, interval, options, context) {
      if (typeof options === "undefined") {
        options = {};
      }

      var args, result;
      var timeout = null;
      var previous = 0;

      var later = function () {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = callback.apply(context, args);
      };

      return {
        abort: function () {
          if (timeout) {
            window.clearTimeout(timeout);
            timeout = null;
          }
        },
        call: function () {
          var now = new Date();
          if (!previous && options.leading === false) {
            previous = now;
          }

          var remaining = interval - (now - previous);
          args = arguments;
          if (remaining <= 0) {
            window.clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = callback.apply(context, args);
          } else if (!timeout && options.trailing !== false) {
            timeout = window.setTimeout(later, remaining);
          }
          return result;
        }
      };
    }
  }
});
