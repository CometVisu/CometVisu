(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "construct": true,
        "require": true
      },
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.Emitter": {
        "require": true
      },
      "qx.bom.client.CssAnimation": {
        "construct": true,
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "css.animation": {
          "construct": true,
          "className": "qx.bom.client.CssAnimation"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  /**
   * This is a simple handle, which will be returned when an animation is
   * started using the {@link qx.bom.element.Animation#animate} method. It
   * basically controls the animation.
   *
   * @ignore(qx.bom.element.AnimationJs)
   */
  qx.Bootstrap.define("qx.bom.element.AnimationHandle", {
    extend: qx.event.Emitter,
    construct: function construct() {
      var css = qx.core.Environment.get("css.animation");
      this.__P_129_0 = css && css["play-state"];
      this.__P_129_1 = true;
      this.addListenerOnce("end", this.__P_129_2, this);
    },
    events: {
      /** Fired when the animation started via {@link qx.bom.element.Animation}. */
      "start": "Element",

      /**
       * Fired when the animation started via {@link qx.bom.element.Animation} has
       * ended.
       */
      "end": "Element",

      /** Fired on every iteration of the animation. */
      "iteration": "Element"
    },
    members: {
      __P_129_0: null,
      __P_129_1: false,
      __P_129_3: false,

      /**
       * Accessor of the playing state.
       * @return {Boolean} <code>true</code>, if the animations is playing.
       */
      isPlaying: function isPlaying() {
        return this.__P_129_1;
      },

      /**
       * Accessor of the ended state.
       * @return {Boolean} <code>true</code>, if the animations has ended.
       */
      isEnded: function isEnded() {
        return this.__P_129_3;
      },

      /**
       * Accessor of the paused state.
       * @return {Boolean} <code>true</code>, if the animations is paused.
       */
      isPaused: function isPaused() {
        return this.el.style[this.__P_129_0] == "paused";
      },

      /**
       * Pauses the animation, if running. If not running, it will be ignored.
       */
      pause: function pause() {
        if (this.el) {
          this.el.style[this.__P_129_0] = "paused";
          this.el.$$animation.__P_129_1 = false; // in case the animation is based on JS

          if (this.animationId && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.pause(this);
          }
        }
      },

      /**
       * Resumes an animation. This does not start the animation once it has ended.
       * In this case you need to start a new Animation.
       */
      play: function play() {
        if (this.el) {
          this.el.style[this.__P_129_0] = "running";
          this.el.$$animation.__P_129_1 = true; // in case the animation is based on JS

          if (this.i != undefined && qx.bom.element.AnimationJs) {
            qx.bom.element.AnimationJs.play(this);
          }
        }
      },

      /**
       * Stops the animation if running.
       */
      stop: function stop() {
        if (this.el && qx.core.Environment.get("css.animation") && !this.jsAnimation) {
          this.el.style[this.__P_129_0] = "";
          this.el.style[qx.core.Environment.get("css.animation").name] = "";
          this.el.$$animation.__P_129_1 = false;
          this.el.$$animation.__P_129_3 = true;
        } // in case the animation is based on JS
        else if (this.jsAnimation) {
            this.stopped = true;
            qx.bom.element.AnimationJs.stop(this);
          }
      },

      /**
       * Set the animation state to ended
       */
      __P_129_2: function __P_129_2() {
        this.__P_129_1 = false;
        this.__P_129_3 = true;
      }
    }
  });
  qx.bom.element.AnimationHandle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AnimationHandle.js.map?dt=1664613615321