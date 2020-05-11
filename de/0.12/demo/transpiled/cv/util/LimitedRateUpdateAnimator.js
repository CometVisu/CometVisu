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
     * @param displayRatioFn {Function} Callback function that does the displaying
     * @param context The context `this` of the callback function
     * @param displayRatioFnParameters Optional additional parameter that will be passed to the callback function
     */
    construct: function construct(displayRatioFn) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
      var displayRatioFnParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      qx.core.Object.constructor.call(this);
      this.setDisplayRatioFn(displayRatioFn);
      this.__displayRatioFnContext = context;
      this.__displayRatioFnParameters = displayRatioFnParameters;
    },

    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
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
      expDampTimeConstant: {
        // time constant for exponential dampening
        check: "Number",
        init: 0.01
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
      __displayRatioFnParameters: undefined,
      __currentRatio: 0.0,
      __targetRatio: 0.0,

      /**
       * Set the value to a new value.
       * @param {Number} targetRatio the new value.
       * @param {Boolean} instant skip animation when true
       */
      setTo: function setTo(targetRatio) {
        var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var now = performance.now();
        this.__targetRatio = targetRatio;

        if (instant) {
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
      __animate: function __animate(thistime, lasttime) {
        var _this = this;

        var dt = (thistime - lasttime) / 1000; // in seconds

        var maxLinearDelta = this.getLinearRateLimit() * dt;
        var alpha = Math.exp(-dt / this.getExpDampTimeConstant());
        var nextRatio = this.__targetRatio * alpha + this.__currentRatio * (1 - alpha);
        var delta = nextRatio - this.__currentRatio;

        if (Math.abs(delta) > maxLinearDelta) {
          nextRatio = this.__currentRatio + Math.sign(delta) * maxLinearDelta;
        }

        if (Math.abs(nextRatio - this.__targetRatio) < this.getEpsilon()) {
          nextRatio = this.__targetRatio;
        }

        this.__currentRatio = nextRatio;
        this.getDisplayRatioFn().call(this.__displayRatioFnContext, this.__currentRatio, this.__displayRatioFnParameters);

        if (this.__currentRatio !== this.__targetRatio) {
          this.__animationFrame = window.requestAnimationFrame(function (time) {
            _this.__animate(time, thistime);
          });
        } else {
          this.__animationFrame = undefined;
        }
      }
    }
  });
  cv.util.LimitedRateUpdateAnimator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LimitedRateUpdateAnimator.js.map?dt=1589219666128