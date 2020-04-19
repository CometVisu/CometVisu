/* UpdateRateLimiter.js
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
 * UpdateRateLimiter
 *
 * @author ChristianMayer
 * @since 2020
 */

/**
 * Helper function to allow widgets animate a displayed property with a
 * limited speed of change to look smoother for the user.
 */
qx.Class.define('cv.util.UpdateRateLimiter',{
  extend: qx.core.Object,
  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function (displayRatioFn, context = window) {
    this.base(arguments);
    this.setDisplayRatioFn(displayRatioFn);
    this.__displayRatioFnContext = context;
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
      check: "Number",
      init: 2
    },
    expDampSpeed: {
      // factor for exponential dampening
      check: "Number",
      init: 0.1
    },
    epsilon: {
      // a difference between current and target ratio smaller than the epsilon
      // will be immediately closed
      check: "Number",
      init: 0.001
    },
    displayRatioFn: {
      check: "Function"
    }
  },
  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __animationFrame: undefined,
    __displayRatioFnContext: undefined,
    __currentRatio: 0.0,
    __targetRatio: 0.0,
    /**
     * Set the value to a new value.
     * @param {Number} targetRatio the new value.
     * @param {Boolean} instant skip animation when true
     */
    setTo: function (targetRatio, instant= false) {
      let now = performance.now();

      this.__targetRatio = targetRatio;
      if(instant) {
        this.__currentRatio = targetRatio;
      }
      if (this.__animationFrame === undefined) {
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
      let nextRatio =  this.__targetRatio * this.getExpDampSpeed() + this.__currentRatio * (1 - this.getExpDampSpeed());
      let delta = nextRatio - this.__currentRatio;
      if (Math.abs(delta) > this.getLinearRateLimit) {
        nextRatio = Math.sign(delta) * this.getLinearRateLimit;
      }
      if (Math.abs(nextRatio - this.__targetRatio) < this.getEpsilon()) {
        nextRatio = this.__targetRatio;
      }
      this.__currentRatio = nextRatio;

      this.getDisplayRatioFn().call(this.__displayRatioFnContext, this.__currentRatio);

      if (this.__currentRatio !== this.__targetRatio) {
        this.__animationFrame = window.requestAnimationFrame((time)=>{this.__animate(time, thistime);});
      } else {
        this.__animationFrame = undefined;
      }
    }
  }
});
