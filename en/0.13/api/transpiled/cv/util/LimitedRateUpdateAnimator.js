(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* LimitedRateUpdateAnimator.js
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
   * LimitedRateUpdateAnimator
   *
   * @author ChristianMayer
   * @since 2020
   */

  /**
   * Helper function to allow widgets animate a displayed property with a
   * limited speed of change to look smoother for the user.
   *
   * This class can either animate a number (e.g. used as a ratio) or a class
   * when it has these methods:
   * * value1.delta(value2)       - return a number that is proportional to the difference
   * * value1.blend(value2,ratio) - return a new value that is the ratio dependent blend
   * * value.copy()               - return a copy of the value
   */
  qx.Class.define('cv.util.LimitedRateUpdateAnimator', {
    extend: qx.core.Object,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    /**
     * Create a new animated display where an object will be smoothly transitioned
     * from its current position to a new target position.
     *
     * @param displayFn {Function} Callback function that does the displaying
     * @param context The context `this` of the callback function
     * @param displayFnParameters Optional additional parameter that will be passed to the callback function
     */
    construct: function construct(displayFn) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
      var displayFnParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      qx.core.Object.constructor.call(this);
      this.setDisplayFn(displayFn);
      this.__P_775_0 = context;
      this.__P_775_1 = displayFnParameters;
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      if (this.__P_775_2 !== undefined) {
        window.cancelAnimationFrame(this.__P_775_2);
        this.__P_775_2 = undefined;
      }
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      linearRateLimit: {
        // in ratio/second
        check: 'Number',
        init: 2
      },
      expDampTimeConstant: {
        // time constant for exponential dampening
        check: 'Number',
        init: 0.01
      },
      epsilon: {
        // a difference between current and target value smaller than the epsilon
        // will be immediately closed
        check: 'Number',
        init: 0.001
      },
      displayFn: {
        check: 'Function'
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_775_2: undefined,
      __P_775_0: undefined,
      __P_775_1: undefined,
      __P_775_3: undefined,
      __P_775_4: undefined,
      /**
       * Set animation speed by defining the (typical) maximal range.
       * An animation of the full ``range`` will require about 0.5 to 1 second
       * and have a linear as well as an exponential damped part at the end.
       * The ``epsilon`` can also be stated explicitly or it will be derived
       * from the ``range``.
       * @param {Number} range (typical) maximal range for the animation
       * @param {Number} [epsilon] end the animation when the remaining delta is smaller
       */
      setAnimationSpeed: function setAnimationSpeed(range, epsilon) {
        if (epsilon !== undefined) {
          this.setEpsilon(epsilon);
        } else {
          this.setEpsilon(range / 1000);
        }
        this.setLinearRateLimit(2 * range);
        // Note: as the exponential dampening is working on a ratio it doesn't
        // need to be changed here and the default of 0.01 is fine:
        this.setExpDampTimeConstant(0.01);
      },
      /**
       * Set the value to a new value.
       * @param {Number} targetValue the new value.
       * @param {Boolean} instant skip animation when true
       * @param {Boolean} show skip display update when false
       */
      setTo: function setTo(targetValue) {
        var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var show = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var now = performance.now();
        this.__P_775_4 = targetValue;
        if (instant || this.__P_775_3 === undefined) {
          this.__P_775_3 = targetValue;
        }
        if (this.__P_775_2 === undefined && show) {
          this.__P_775_5(now, now - 10);
        }
      },
      /**
       * Internal implementation of the animation and value setting.
       * @param {DOMHighResTimeStamp} thistime
       * @param {DOMHighResTimeStamp} lasttime
       * @private
       */
      __P_775_5: function __P_775_5(thistime, lasttime) {
        var _this = this;
        var isNumber = typeof this.__P_775_3 === 'number';
        var dt = Math.max(0, (thistime - lasttime) / 1000); // in seconds - clamp negative dt
        var maxLinearDelta = this.getLinearRateLimit() * dt;
        var alpha = Math.max(0, Math.min(Math.exp(-dt / this.getExpDampTimeConstant()), 1));
        var nextValue = isNumber ? this.__P_775_4 * alpha + this.__P_775_3 * (1 - alpha) : this.__P_775_3.blend(this.__P_775_4, alpha);
        var delta = isNumber ? nextValue - this.__P_775_3 : this.__P_775_3.delta(nextValue);
        var notFinished = true;
        if (Math.abs(delta) > maxLinearDelta) {
          nextValue = isNumber ? this.__P_775_3 + Math.sign(delta) * maxLinearDelta : this.__P_775_3.blend(this.__P_775_4, alpha * maxLinearDelta / delta);
        }
        if (isNumber && Math.abs(nextValue - this.__P_775_4) < this.getEpsilon() || !isNumber && nextValue.delta(this.__P_775_4) < this.getEpsilon()) {
          nextValue = this.__P_775_4;
          notFinished = false;
        }
        this.__P_775_3 = isNumber ? nextValue : nextValue.copy();
        this.getDisplayFn().call(this.__P_775_0, this.__P_775_3, this.__P_775_1);
        if (notFinished) {
          this.__P_775_2 = window.requestAnimationFrame(function (time) {
            _this.__P_775_5(time, thistime);
          });
        } else {
          this.__P_775_2 = undefined;
        }
      }
    }
  });
  cv.util.LimitedRateUpdateAnimator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LimitedRateUpdateAnimator.js.map?dt=1717235423732