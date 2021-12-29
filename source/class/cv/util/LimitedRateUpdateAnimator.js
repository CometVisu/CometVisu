/* LimitedRateUpdateAnimator.js
 *
 * copyright (c) 2020-2020, Christian Mayer and the CometVisu contributers.
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
  construct: function (displayFn, context = window, displayFnParameters = undefined) {
    this.base(arguments);
    this.setDisplayFn(displayFn);
    this.__displayFnContext = context;
    this.__displayFnParameters = displayFnParameters;
  },
  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct: function() {
    if (this.__animationFrame !== undefined) {
      window.cancelAnimationFrame(this.__animationFrame);
      this.__animationFrame = undefined;
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
    __animationFrame: undefined,
    __displayFnContext: undefined,
    __displayFnParameters: undefined,
    __currentValue: undefined,
    __targetValue: undefined,
    /**
     * Set the value to a new value.
     * @param {Number} targetValue the new value.
     * @param {Boolean} instant skip animation when true
     * @param {Boolean} show skip display update when false
     */
    setTo: function (targetValue, instant = false, show = true) {
      let now = performance.now();

      this.__targetValue = targetValue;
      if (instant || this.__currentValue === undefined) {
        this.__currentValue = targetValue;
      }
      if (this.__animationFrame === undefined && show) {
        this.__animate(now, now - 10);
      }
    },

    /**
     * Internal implementation of the animation and value setting.
     * @param {DOMHighResTimeStamp} thistime
     * @param {DOMHighResTimeStamp} lasttime
     * @private
     */
    __animate: function (thistime, lasttime) {
      let isNumber = typeof this.__currentValue === 'number';
      let dt = Math.max(0, (thistime - lasttime) / 1000); // in seconds - clamp negative dt
      let maxLinearDelta = this.getLinearRateLimit() * dt;
      let alpha = Math.max(0, Math.min(Math.exp(-dt / this.getExpDampTimeConstant()), 1));
      let nextValue = isNumber
          ? this.__targetValue * alpha + this.__currentValue * (1 - alpha)
          : this.__currentValue.blend( this.__targetValue, alpha );
      let delta = isNumber
          ? nextValue - this.__currentValue
          : this.__currentValue.delta(nextValue);
      let notFinished = true;
      if (Math.abs(delta) > maxLinearDelta) {
        nextValue = isNumber
          ? this.__currentValue + Math.sign(delta) * maxLinearDelta
          : this.__currentValue.blend( this.__targetValue, alpha * maxLinearDelta / delta );
      }
      if ((isNumber && Math.abs(nextValue - this.__targetValue) < this.getEpsilon()) ||
          (!isNumber && nextValue.delta(this.__targetValue) < this.getEpsilon())) {
        nextValue = this.__targetValue;
        notFinished = false;
      }
      this.__currentValue = isNumber ? nextValue : nextValue.copy();

      this.getDisplayFn().call(this.__displayFnContext, this.__currentValue, this.__displayFnParameters);

      if (notFinished) {
        this.__animationFrame = window.requestAnimationFrame((time)=>{this.__animate(time, thistime);});
      } else {
        this.__animationFrame = undefined;
      }
    }
  }
});
