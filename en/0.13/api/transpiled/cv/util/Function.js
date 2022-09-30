(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Function.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * Utility module to give some support to work with functions.
   */
  qx.Class.define('cv.util.Function', {
    statics: {
      /**
       * Like qx.util.Function.throttle with additional support to abort the throttling.
       * @param callback {function} the callback which should be executed in the given interval
       * @param interval {number} Interval in milliseconds
       * @param options {object} the keys are <code>leading</code> and <code>trailing</code> to control the
       * executing of the callback precisely. Default values are <code>true</code> for both options.
       * @param context
       * @return {object} with 2 keys <code>call</code> a wrapper function which <em>shields</em> the given callback function
       * <code>abort</code> abort throttling and skip the trailing value
       */
      throttle: function throttle(callback, interval, options, context) {
        if (typeof options === 'undefined') {
          options = {};
        }

        var args;
        var result;
        var timeout = null;
        var previous = 0;

        var later = function later() {
          previous = options.leading === false ? 0 : new Date();
          timeout = null;
          result = callback.apply(context, args);
        };

        return {
          abort: function abort() {
            if (timeout) {
              window.clearTimeout(timeout);
              timeout = null;
            }
          },
          call: function call() {
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
  cv.util.Function.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Function.js.map?dt=1664557371058