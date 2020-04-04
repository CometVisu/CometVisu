/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Wrapper for {@link qx.bom.element.AnimationCss} and
 * {@link qx.bom.element.AnimationJs}. It offers the public API and decides using
 * feature checks either to use CSS animations or JS animations.
 *
 * If you use this class, the restrictions of the JavaScript animations apply.
 * This means that you can not use transforms and custom bezier timing functions.
 */
qx.Bootstrap.define("qx.bom.element.Animation",
{
  statics : {

    /**
     * This function takes care of the feature check and starts the animation.
     * It takes a DOM element to apply the animation to, and a description.
     * The description should be a map, which could look like this:
     *
     * <pre class="javascript">
     * {
     *   "duration": 1000,
     *   "keep": 100,
     *   "keyFrames": {
     *     0 : {"opacity": 1, "scale": 1},
     *     100 : {"opacity": 0, "scale": 0}
     *   },
     *   "origin": "50% 50%",
     *   "repeat": 1,
     *   "timing": "ease-out",
     *   "alternate": false,
     *   "delay" : 2000
     * }
     * </pre>
     *
     * *duration* is the time in milliseconds one animation cycle should take.
     *
     * *keep* is the key frame to apply at the end of the animation. (optional)
     *   Keep in mind that the keep key is reversed in case you use an reverse
     *   animation or set the alternate key and a even repeat count.
     *
     * *keyFrames* is a map of separate frames. Each frame is defined by a
     *   number which is the percentage value of time in the animation. The value
     *   is a map itself which holds css properties or transforms
     *   {@link qx.bom.element.Transform} (Transforms only for CSS Animations).
     *
     * *origin* maps to the transform origin {@link qx.bom.element.Transform#setOrigin}
     *   (Only for CSS animations).
     *
     * *repeat* is the amount of time the animation should be run in
     *   sequence. You can also use "infinite".
     *
     * *timing* takes one of the predefined value:
     *   <code>ease</code> | <code>linear</code> | <code>ease-in</code>
     *   | <code>ease-out</code> | <code>ease-in-out</code> |
     *   <code>cubic-bezier(&lt;number&gt;, &lt;number&gt;, &lt;number&gt;, &lt;number&gt;)</code>
     *   (cubic-bezier only available for CSS animations)
     *
     * *alternate* defines if every other animation should be run in reverse order.
     *
     * *delay* is the time in milliseconds the animation should wait before start.
     *
     * @param el {Element} The element to animate.
     * @param desc {Map} The animations description.
     * @param duration {Integer?} The duration in milliseconds of the animation
     *   which will override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} AnimationHandle instance to control
     *   the animation.
     */
    animate : function(el, desc, duration) {
      var onlyCssKeys = qx.bom.element.Animation.__hasOnlyCssKeys(el, desc.keyFrames);

      if (qx.core.Environment.get("css.animation") && onlyCssKeys) {
        return qx.bom.element.AnimationCss.animate(el, desc, duration);
      } else {
        return qx.bom.element.AnimationJs.animate(el, desc, duration);
      }
    },


    /**
     * Starts an animation in reversed order. For further details, take a look at
     * the {@link #animate} method.
     * @param el {Element} The element to animate.
     * @param desc {Map} The animations description.
     * @param duration {Integer?} The duration in milliseconds of the animation
     *   which will override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} AnimationHandle instance to control
     *   the animation.
     */
    animateReverse : function(el, desc, duration) {
      var onlyCssKeys = qx.bom.element.Animation.__hasOnlyCssKeys(el, desc.keyFrames);
      if (qx.core.Environment.get("css.animation") && onlyCssKeys) {
        return qx.bom.element.AnimationCss.animateReverse(el, desc, duration);
      } else {
        return qx.bom.element.AnimationJs.animateReverse(el, desc, duration);
      }
    },


    /**
     * Detection helper which detects if only CSS keys are in
     * the animations key frames.
     * @param el {Element} The element to check for the styles.
     * @param keyFrames {Map} The keyFrames of the animation.
     * @return {Boolean} <code>true</code> if only css properties are included.
     */
    __hasOnlyCssKeys : function(el, keyFrames) {
      var keys = [];
      for (var nr in keyFrames) {
        var frame = keyFrames[nr];
        for (var key in frame) {
          if (keys.indexOf(key) == -1) {
            keys.push(key);
          }
        }
      }

      var transformKeys = ["scale", "rotate", "skew", "translate"];
      for (var i=0; i < keys.length; i++) {
        var key = qx.lang.String.camelCase(keys[i]);
        if (!(key in el.style)) {
          // check for transform keys
          if (transformKeys.indexOf(keys[i]) != -1) {
            continue;
          }
          // check for prefixed keys
          if (qx.bom.Style.getPropertyName(key)) {
            continue;
          }
          return false;
        }
      };
      return true;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * This class is responsible for applying CSS3 animations to plain DOM elements.
 *
 * The implementation is mostly a cross-browser wrapper for applying the
 * animations, including transforms. If the browser does not support
 * CSS animations, but you have set a keep frame, the keep frame will be applied
 * immediately, thus making the animations optional.
 *
 * The API aligns closely to the spec wherever possible.
 *
 * http://www.w3.org/TR/css3-animations/
 *
 * {@link qx.bom.element.Animation} is the class, which takes care of the
 * feature detection for CSS animations and decides which implementation
 * (CSS or JavaScript) should be used. Most likely, this implementation should
 * be the one to use.
 */
qx.Bootstrap.define("qx.bom.element.AnimationCss",
{
  statics : {
    // initialization
    __sheet : null,
    __rulePrefix : "Anni",
    __id : 0,
    /** Static map of rules */
    __rules : {},

    /** The used keys for transforms. */
    __transitionKeys : {
      "scale": true,
      "rotate" : true,
      "skew" : true,
      "translate" : true
    },

    /** Map of cross browser CSS keys. */
    __cssAnimationKeys : qx.core.Environment.get("css.animation"),


    /**
     * This is the main function to start the animation in reverse mode.
     * For further details, take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animateReverse : function(el, desc, duration) {
      return this._animate(el, desc, duration, true);
    },

    /**
     * This is the main function to start the animation. For further details,
     * take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animate : function(el, desc, duration) {
      return this._animate(el, desc, duration, false);
    },


    /**
     * Internal method to start an animation either reverse or not.
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @param reverse {Boolean} <code>true</code>, if the animation should be
     *   reversed.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    _animate : function(el, desc, duration, reverse) {
      this.__normalizeDesc(desc);

      // debug validation
      if (qx.core.Environment.get("qx.debug")) {
        this.__validateDesc(desc);
      }

      // reverse the keep property if the animation is reverse as well
      var keep = desc.keep;
      if (keep != null && (reverse || (desc.alternate && desc.repeat % 2 == 0))) {
        keep = 100 - keep;
      }

      if (!this.__sheet) {
        this.__sheet = qx.bom.Stylesheet.createElement();
      }
      var keyFrames = desc.keyFrames;

      if (duration == undefined) {
        duration = desc.duration;
      }

      // if animations are supported
      if (this.__cssAnimationKeys != null) {
        var name = this.__addKeyFrames(keyFrames, reverse);

        var style =
          name + " " +
          duration + "ms " +
          desc.timing + " " +
          (desc.delay ? desc.delay + "ms " : "") +
          desc.repeat + " " +
          (desc.alternate ? "alternate" : "");

        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["start-event"], this.__onAnimationStart);
        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["iteration-event"], this.__onAnimationIteration);
        qx.bom.Event.addNativeListener(el, this.__cssAnimationKeys["end-event"], this.__onAnimationEnd);

        if (qx.core.Environment.get("qx.debug")) {
          if (qx.bom.element.Style.get(el, "display") == "none") {
            qx.log.Logger.warn(el, "Some browsers will not animate elements with display==none");
          }
        }

        el.style[qx.lang.String.camelCase(this.__cssAnimationKeys["name"])] = style;
        // use the fill mode property if available and suitable
        if (keep && keep == 100 && this.__cssAnimationKeys["fill-mode"]) {
          el.style[this.__cssAnimationKeys["fill-mode"]] = "forwards";
        }
      }

      var animation = new qx.bom.element.AnimationHandle();
      animation.desc = desc;
      animation.el = el;
      animation.keep = keep;
      el.$$animation = animation;

      // additional transform keys
      if (desc.origin != null) {
        qx.bom.element.Transform.setOrigin(el, desc.origin);
      }

      // fallback for browsers not supporting animations
      if (this.__cssAnimationKeys == null) {
        window.setTimeout(function() {
          qx.bom.element.AnimationCss.__onAnimationEnd({target: el});
        }, 0);
      }

      return animation;
    },


    /**
     * Handler for the animation start.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationStart : function(e) {
      if (e.target.$$animation) {
        e.target.$$animation.emit("start", e.target);
      }
    },


    /**
     * Handler for the animation iteration.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationIteration : function(e)
    {
      // It could happen that an animation end event is fired before an
      // animation iteration appears [BUG #6928]
      if (e.target != null && e.target.$$animation != null) {
        e.target.$$animation.emit("iteration", e.target);
      }
    },


    /**
     * Handler for the animation end.
     * @param e {Event} The native event from the browser.
     */
    __onAnimationEnd : function(e) {
      var el = e.target;
      var animation = el.$$animation;

      // ignore events when already cleaned up
      if (!animation) {
        return;
      }

      var desc = animation.desc;

      if (qx.bom.element.AnimationCss.__cssAnimationKeys != null) {
        // reset the styling
        var key = qx.lang.String.camelCase(
          qx.bom.element.AnimationCss.__cssAnimationKeys["name"]
        );
        el.style[key] = "";

        qx.bom.Event.removeNativeListener(
          el,
          qx.bom.element.AnimationCss.__cssAnimationKeys["name"],
          qx.bom.element.AnimationCss.__onAnimationEnd
        );
      }

      if (desc.origin != null) {
        qx.bom.element.Transform.setOrigin(el, "");
      }

      qx.bom.element.AnimationCss.__keepFrame(el, desc.keyFrames[animation.keep]);

      el.$$animation = null;
      animation.el = null;
      animation.ended = true;

      animation.emit("end", el);
    },


    /**
     * Helper method which takes an element and a key frame description and
     * applies the properties defined in the given frame to the element. This
     * method is used to keep the state of the animation.
     * @param el {Element} The element to apply the frame to.
     * @param endFrame {Map} The description of the end frame, which is basically
     *   a map containing CSS properties and values including transforms.
     */
    __keepFrame : function(el, endFrame) {
      // keep the element at this animation step
      var transforms;
      for (var style in endFrame) {
        if (style in qx.bom.element.AnimationCss.__transitionKeys) {
          if (!transforms) {
            transforms = {};
          }
          transforms[style] = endFrame[style];
        } else {
          el.style[qx.lang.String.camelCase(style)] = endFrame[style];
        }
      }

      // transform keeping
      if (transforms) {
        qx.bom.element.Transform.transform(el, transforms);
      }
    },


    /**
     * Preprocessing of the description to make sure every necessary key is
     * set to its default.
     * @param desc {Map} The description of the animation.
     */
    __normalizeDesc : function(desc) {
      if (!desc.hasOwnProperty("alternate")) {
        desc.alternate = false;
      }
      if (!desc.hasOwnProperty("keep")) {
        desc.keep = null;
      }
      if (!desc.hasOwnProperty("repeat")) {
        desc.repeat = 1;
      }
      if (!desc.hasOwnProperty("timing")) {
        desc.timing = "linear";
      }
      if (!desc.hasOwnProperty("origin")) {
        desc.origin = null;
      }
    },


    /**
     * Debugging helper to validate the description.
     * @signature function(desc)
     * @param desc {Map} The description of the animation.
     */
    __validateDesc : qx.core.Environment.select("qx.debug", {
      "true" : function(desc) {
        var possibleKeys = [
          "origin", "duration", "keep", "keyFrames", "delay",
          "repeat", "timing", "alternate"
        ];

        // check for unknown keys
        for (var name in desc) {
          if (!(possibleKeys.indexOf(name) != -1)) {
            qx.Bootstrap.warn("Unknown key '" + name + "' in the animation description.");
          }
        };

        if (desc.keyFrames == null) {
          qx.Bootstrap.warn("No 'keyFrames' given > 0");
        } else {
          // check the key frames
          for (var pos in desc.keyFrames) {
            if (pos < 0 || pos > 100) {
              qx.Bootstrap.warn("Keyframe position needs to be between 0 and 100");
            }
          }
        }
      },

      "default" : null
    }),


    /**
     * Helper to add the given frames to an internal CSS stylesheet. It parses
     * the description and adds the key frames to the sheet.
     * @param frames {Map} A map of key frames that describe the animation.
     * @param reverse {Boolean} <code>true</code>, if the key frames should
     *   be added in reverse order.
     * @return {String} The generated name of the keyframes rule.
     */
    __addKeyFrames : function(frames, reverse) {
      var rule = "";

      // for each key frame
      for (var position in frames) {
        rule += (reverse ? -(position - 100) : position) + "% {";

        var frame = frames[position];
        var transforms;
        // each style
        for (var style in frame) {
          if (style in this.__transitionKeys) {
            if (!transforms) {
              transforms = {};
            }
            transforms[style] = frame[style];
          } else {
            var propName = qx.bom.Style.getPropertyName(style);
            var prefixed = (propName !== null) ?
              qx.bom.Style.getCssName(propName) : "";
            rule += (prefixed || style) + ":" + frame[style] + ";";
          }
        }

        // transform handling
        if (transforms) {
          rule += qx.bom.element.Transform.getCss(transforms);
        }

        rule += "} ";
      }

      // cached shorthand
      if (this.__rules[rule]) {
        return this.__rules[rule];
      }

      var name = this.__rulePrefix + this.__id++;
      var selector = this.__cssAnimationKeys["keyframes"] + " " + name;
      qx.bom.Stylesheet.addRule(this.__sheet, selector, rule);

      this.__rules[rule] = name;

      return name;
    },


    /**
     * Internal helper to reset the cache.
     */
    __clearCache: function() {
      this.__id = 0;
      if (this.__sheet) {
        this.__sheet.ownerNode.remove();
        this.__sheet = null;
        this.__rules = {};
      }
    }
  },


  defer : function(statics) {
    // iOS 8 seems to stumble over the old sheet object on tab
    // changes or leaving the browser [BUG #8986]
    if (qx.core.Environment.get("os.name") === "ios" &&
      parseInt(qx.core.Environment.get("os.version")) >= 8
    ) {
      document.addEventListener("visibilitychange", function() {
        if (!document.hidden) {
          statics.__clearCache();
        }
      }, false);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * Contains methods to control and query the element's box-sizing property.
 *
 * Supported values:
 *
 * * "content-box" = W3C model (dimensions are content specific)
 * * "border-box" = Microsoft model (dimensions are box specific incl. border and padding)
 */
qx.Bootstrap.define("qx.bom.element.BoxSizing",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** @type {Map} Internal data structure for __usesNativeBorderBox() */
    __nativeBorderBox :
    {
      tags :
      {
        button : true,
        select : true
      },

      types :
      {
        search : true,
        button : true,
        submit : true,
        reset : true,
        checkbox : true,
        radio : true
      }
    },


    /**
     * Whether the given elements defaults to the "border-box" Microsoft model in all cases.
     *
     * @param element {Element} DOM element to query
     * @return {Boolean} true when the element uses "border-box" independently from the doctype
     */
    __usesNativeBorderBox : function(element)
    {
      var map = this.__nativeBorderBox;
      return map.tags[element.tagName.toLowerCase()] || map.types[element.type];
    },


    /**
     * Compiles the given box sizing into a CSS compatible string.
     *
     * @param value {String} Valid CSS box-sizing value
     * @return {String} CSS string
     */
    compile : function(value)
    {
      if (qx.core.Environment.get("css.boxsizing")) {
        var prop = qx.bom.Style.getCssName(qx.core.Environment.get("css.boxsizing"));
        return prop + ":" + value + ";";
      }
      else {
        if (qx.core.Environment.get("qx.debug")) {
          qx.log.Logger.warn(this, "This client does not support dynamic modification of the boxSizing property.");
          qx.log.Logger.trace();
        }
      }
    },


    /**
     * Returns the box sizing for the given element.
     *
     * @param element {Element} The element to query
     * @return {String} Box sizing value of the given element.
     */
    get : function(element)
    {
      if (qx.core.Environment.get("css.boxsizing")) {
        return qx.bom.element.Style.get(element, "boxSizing", null, false) || "";
      }

      if (qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(element)))
      {
        if (!this.__usesNativeBorderBox(element)) {
          return "content-box";
        }
      }

      return "border-box";
    },


    /**
     * Applies a new box sizing to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New box sizing value to set
     */
    set : function(element, value)
    {
      if (qx.core.Environment.get("css.boxsizing")) {
        // IE8 bombs when trying to apply an unsupported value
        try {
          element.style[qx.core.Environment.get("css.boxsizing")] = value;
        } catch(ex) {
          if (qx.core.Environment.get("qx.debug")) {
            qx.log.Logger.warn(this, "This client does not support the boxSizing value", value);
          }
        }
      }
      else {
        if (qx.core.Environment.get("qx.debug")) {
          qx.log.Logger.warn(this, "This client does not support dynamic modification of the boxSizing property.");
        }
      }
    },


    /**
     * Removes the local box sizing applied to the element
     *
     * @param element {Element} The element to modify
     */
    reset : function(element) {
      this.set(element, "");
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */


/**
 * Contains methods to control and query the element's cursor property
 */
qx.Bootstrap.define("qx.bom.element.Cursor",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** Internal helper structure to map cursor values to supported ones */
    __map : {},


    /**
     * Compiles the given cursor into a CSS compatible string.
     *
     * @param cursor {String} Valid CSS cursor name
     * @return {String} CSS string
     */
    compile : function(cursor) {
      return "cursor:" + (this.__map[cursor] || cursor) + ";";
    },


    /**
     * Returns the computed cursor style for the given element.
     *
     * @param element {Element} The element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {String} Computed cursor value of the given element.
     */
    get : function(element, mode) {
      return qx.bom.element.Style.get(element, "cursor", mode, false);
    },


    /**
     * Applies a new cursor style to the given element
     *
     * @param element {Element} The element to modify
     * @param value {String} New cursor value to set
     */
    set : function(element, value) {
      element.style.cursor = this.__map[value] || value;
    },


    /**
     * Removes the local cursor style applied to the element
     *
     * @param element {Element} The element to modify
     */
    reset : function(element) {
      element.style.cursor = "";
    }
  },


  defer : function(statics) {
    // < IE 9
    if (qx.core.Environment.get("engine.name") == "mshtml" &&
         ((parseFloat(qx.core.Environment.get("engine.version")) < 9 ||
          qx.core.Environment.get("browser.documentmode") < 9) &&
          !qx.core.Environment.get("browser.quirksmode"))
    ) {
      statics.__map["nesw-resize"] = "ne-resize";
      statics.__map["nwse-resize"] = "nw-resize";
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Christian Hagendorn (chris_schmidt)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */


/**
 * Cross-browser opacity support.
 *
 * Optimized for animations (contains workarounds for typical flickering
 * in some browsers). Reduced class dependencies for optimal size and
 * performance.
 */
qx.Bootstrap.define("qx.bom.element.Opacity",
{
  statics :
  {
    /**
     * Compiles the given opacity value into a cross-browser CSS string.
     * Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @signature function(opacity)
     * @param opacity {Float} A float number between 0 and 1
     * @return {String} CSS compatible string
     */
    compile : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(opacity)
      {
        if (opacity >= 1) {
          opacity = 1;
        }

        if (opacity < 0.00001) {
          opacity = 0;
        }

        if (qx.core.Environment.get("css.opacity")) {
          return "opacity:" + opacity + ";";
        } else {
          return "zoom:1;filter:alpha(opacity=" + (opacity * 100) + ");";
        }
      },

      "default" : function(opacity)
      {
        return "opacity:" + opacity + ";";
      }
    }),


    /**
     * Sets opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param opacity {Float} A float number between 0 and 1
     * @signature function(element, opacity)
     */
    set : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(element, opacity)
      {
        if (qx.core.Environment.get("css.opacity")) {
          element.style.opacity = opacity;
        } else {
          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);

          if (opacity >= 1) {
            opacity = 1;
          }

          if (opacity < 0.00001) {
            opacity = 0;
          }

          // IE has trouble with opacity if it does not have layout (hasLayout)
          // Force it by setting the zoom level
          if (!element.currentStyle || !element.currentStyle.hasLayout) {
            element.style.zoom = 1;
          }

          // Remove old alpha filter and add new one
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + opacity * 100 + ")";
        }
      },

      "default" : function(element, opacity) {
        element.style.opacity = opacity;
      }
    }),


    /**
     * Resets opacity of given element.
     *
     * @param element {Element} DOM element to modify
     * @signature function(element)
     */
    reset : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(element)
      {
        if (qx.core.Environment.get("css.opacity"))
        {
          element.style.opacity = "";
        } else {
          // Read in computed filter
          var filter = qx.bom.element.Style.get(element, "filter", qx.bom.element.Style.COMPUTED_MODE, false);

          // Remove old alpha filter
          element.style.filter = filter.replace(/alpha\([^\)]*\)/gi, "");
        }
      },

      "default" : function(element) {
        element.style.opacity = "";
      }
    }),


    /**
     * Gets computed opacity of given element. Accepts numbers between zero and one
     * where "0" means transparent, "1" means opaque.
     *
     * @param element {Element} DOM element to modify
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Float} A float number between 0 and 1
     * @signature function(element, mode)
     */
    get : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(element, mode)
      {
        if (qx.core.Environment.get("css.opacity"))
        {
          var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);

          if (opacity != null) {
            return parseFloat(opacity);
          }

          return 1.0;
        }
        else
        {
          var filter = qx.bom.element.Style.get(element, "filter", mode, false);

          if (filter)
          {
            var opacity = filter.match(/alpha\(opacity=(.*)\)/);

            if (opacity && opacity[1]) {
              return parseFloat(opacity[1]) / 100;
            }
          }

          return 1.0;
        }
      },

      "default" : function(element, mode)
      {
        var opacity = qx.bom.element.Style.get(element, "opacity", mode, false);

        if (opacity != null) {
          return parseFloat(opacity);
        }

        return 1.0;
      }
    })
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

************************************************************************ */

/**
 * Contains methods to control and query the element's clip property
 *
 * @require(qx.lang.normalize.String)
 */
qx.Bootstrap.define("qx.bom.element.Clip",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Compiles the given clipping into a CSS compatible string. This
     * is a simple square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param map {Map}  Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     * @return {String} CSS compatible string
     */
    compile : function(map)
    {
      if (!map) {
        return "clip:auto;";
      }

      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;

      var right, bottom;

      if (left == null)
      {
        right = (width == null ? "auto" : width + "px");
        left = "auto";
      }
      else
      {
        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      }

      if (top == null)
      {
        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      }
      else
      {
        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      }

      return "clip:rect(" + top + "," + right + "," + bottom + "," + left + ");";
    },


    /**
     * Gets the clipping of the given element.
     *
     * @param element {Element} DOM element to query
     * @param mode {Number} Choose one of the modes {@link qx.bom.element.Style#COMPUTED_MODE},
     *   {@link qx.bom.element.Style#CASCADED_MODE}, {@link qx.bom.element.Style#LOCAL_MODE}.
     *   The computed mode is the default one.
     * @return {Map} Map which contains <code>left</code>, <code>top</code>
     *   <code>width</code> and <code>height</code> of the clipped area.
     *   Each one could be null or any integer value.
     */
    get : function(element, mode)
    {
      var clip = qx.bom.element.Style.get(element, "clip", mode, false);

      var left, top, width, height;
      var right, bottom;

      if (typeof clip === "string" && clip !== "auto" && clip !== "")
      {
        clip = clip.trim();

        // Do not use "global" here. This will break Firefox because of
        // an issue that the lastIndex will not be reset on separate calls.
        if (/\((.*)\)/.test(clip))
        {
          var result = RegExp.$1;

          // Process result
          // Some browsers store values space-separated, others comma-separated.
          // Handle both cases by means of feature-detection.
          if (/,/.test(result)) {
            var split = result.split(",");
          }
          else
          {
            var split = result.split(" ");
          }

          top = split[0].trim();
          right = split[1].trim();
          bottom = split[2].trim();
          left = split[3].trim();

          // Normalize "auto" to null
          if (left === "auto") {
            left = null;
          }

          if (top === "auto") {
            top = null;
          }

          if (right === "auto") {
            right = null;
          }

          if (bottom === "auto") {
            bottom = null;
          }

          // Convert to integer values
          if (top != null) {
            top = parseInt(top, 10);
          }

          if (right != null) {
            right = parseInt(right, 10);
          }

          if (bottom != null) {
            bottom = parseInt(bottom, 10);
          }

          if (left != null) {
            left = parseInt(left, 10);
          }

          // Compute width and height
          if (right != null && left != null) {
            width = right - left;
          } else if (right != null) {
            width = right;
          }

          if (bottom != null && top != null) {
            height = bottom - top;
          } else if (bottom != null) {
            height = bottom;
          }
        }
        else
        {
          throw new Error("Could not parse clip string: " + clip);
        }
      }

      // Return map when any value is available.
      return {
        left : left || null,
        top : top || null,
        width : width || null,
        height : height || null
      };
    },


    /**
     * Sets the clipping of the given element. This is a simple
     * square which describes the visible area of an DOM element.
     * Changing the clipping does not change the dimensions of
     * an element.
     *
     * @param element {Element} DOM element to modify
     * @param map {Map} A map with one or more of these available keys:
     *   <code>left</code>, <code>top</code>, <code>width</code>, <code>height</code>.
     */
    set : function(element, map)
    {
      if (!map)
      {
        element.style.clip = "rect(auto,auto,auto,auto)";
        return;
      }

      var left = map.left;
      var top = map.top;
      var width = map.width;
      var height = map.height;

      var right, bottom;

      if (left == null)
      {
        right = (width == null ? "auto" : width + "px");
        left = "auto";
      }
      else
      {
        right = (width == null ? "auto" : left + width + "px");
        left = left + "px";
      }

      if (top == null)
      {
        bottom = (height == null ? "auto" : height + "px");
        top = "auto";
      }
      else
      {
        bottom = (height == null ? "auto" : top + height + "px");
        top = top + "px";
      }

      element.style.clip = "rect(" + top + "," + right + "," + bottom + "," + left + ")";
    },


    /**
     * Resets the clipping of the given DOM element.
     *
     * @param element {Element} DOM element to modify
     */
    reset : function(element) {
      element.style.clip = "rect(auto, auto, auto, auto)";
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The purpose of this class is to contain all checks about css.
 *
 * This class is used by {@link qx.core.Environment} and should not be used
 * directly. Please check its class comment for details how to use it.
 *
 * @internal
 * @ignore(WebKitCSSMatrix)
 * @require(qx.bom.Style)
 */
qx.Bootstrap.define("qx.bom.client.Css",
{
  statics :
  {
    __WEBKIT_LEGACY_GRADIENT : null,

    /**
     * Checks what box model is used in the current environment.
     * @return {String} It either returns "content" or "border".
     * @internal
     */
    getBoxModel : function() {
      var content = qx.bom.client.Engine.getName() !== "mshtml" ||
        !qx.bom.client.Browser.getQuirksMode() ;

      return content ? "content" : "border";
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>textOverflow</code> style property.
     *
     * @return {String|null} textOverflow property name or <code>null</code> if
     * textOverflow is not supported.
     * @internal
     */
    getTextOverflow : function() {
      return qx.bom.Style.getPropertyName("textOverflow");
    },


    /**
     * Checks if a placeholder could be used.
     * @return {Boolean} <code>true</code>, if it could be used.
     * @internal
     */
    getPlaceholder : function() {
      var i = document.createElement("input");
      return "placeholder" in i;
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>appearance</code> style property.
     *
     * @return {String|null} appearance property name or <code>null</code> if
     * appearance is not supported.
     * @internal
     */
    getAppearance : function() {
      return qx.bom.Style.getPropertyName("appearance");
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderRadius</code> style property.
     *
     * @return {String|null} borderRadius property name or <code>null</code> if
     * borderRadius is not supported.
     * @internal
     */
    getBorderRadius : function() {
      return qx.bom.Style.getPropertyName("borderRadius");
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxShadow</code> style property.
     *
     * @return {String|null} boxShadow property name or <code>null</code> if
     * boxShadow is not supported.
     * @internal
     */
    getBoxShadow : function() {
      return qx.bom.Style.getPropertyName("boxShadow");
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>borderImage</code> style property.
     *
     * @return {String|null} borderImage property name or <code>null</code> if
     * borderImage is not supported.
     * @internal
     */
    getBorderImage : function() {
      return qx.bom.Style.getPropertyName("borderImage");
    },

    /**
     * Returns the type of syntax this client supports for its CSS border-image
     * implementation. Some browsers do not support the "fill" keyword defined
     * in the W3C draft (http://www.w3.org/TR/css3-background/) and will not
     * show the border image if it's set. Others follow the standard closely and
     * will omit the center image if "fill" is not set.
     *
     * @return {Boolean|null} <code>true</code> if the standard syntax is supported.
     * <code>null</code> if the supported syntax could not be detected.
     * @internal
     */
    getBorderImageSyntax : function() {
      var styleName = qx.bom.client.Css.getBorderImage();
      if (!styleName) {
        return null;
      }

      var el = document.createElement("div");

      if (styleName === "borderImage") {
        // unprefixed implementation: check individual properties
        el.style[styleName] = 'url("foo.png") 4 4 4 4 fill stretch';
        if (el.style.borderImageSource.indexOf("foo.png") >= 0 &&
            el.style.borderImageSlice.indexOf("4 fill") >= 0 &&
            el.style.borderImageRepeat.indexOf("stretch") >= 0)
        {
          return true;
        }
      }
      else {
        // prefixed implementation, assume no support for "fill"
        el.style[styleName] = 'url("foo.png") 4 4 4 4 stretch';
        // serialized value is unreliable, so just a simple check
        if (el.style[styleName].indexOf("foo.png") >= 0) {
          return false;
        }
      }

      // unable to determine syntax
      return null;
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userSelect</code> style property.
     *
     * @return {String|null} userSelect property name or <code>null</code> if
     * userSelect is not supported.
     * @internal
     */
    getUserSelect : function() {
      return qx.bom.Style.getPropertyName("userSelect");
    },


    /**
     * Returns the (possibly vendor-prefixed) value for the
     * <code>userSelect</code> style property that disables selection. For Gecko,
     * "-moz-none" is returned since "none" only makes the target element appear
     * as if its text could not be selected
     *
     * @internal
     * @return {String|null} the userSelect property value that disables
     * selection or <code>null</code> if userSelect is not supported
     */
    getUserSelectNone : function() {
      var styleProperty = qx.bom.client.Css.getUserSelect();
      if (styleProperty) {
        var el = document.createElement("span");
        el.style[styleProperty] = "-moz-none";
        return el.style[styleProperty] === "-moz-none" ? "-moz-none" : "none";
      }
      return null;
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>userModify</code> style property.
     *
     * @return {String|null} userModify property name or <code>null</code> if
     * userModify is not supported.
     * @internal
     */
    getUserModify : function() {
      return qx.bom.Style.getPropertyName("userModify");
    },


    /**
     * Returns the vendor-specific name of the <code>float</code> style property
     *
     * @return {String|null} <code>cssFloat</code> for standards-compliant
     * browsers, <code>styleFloat</code> for legacy IEs, <code>null</code> if
     * the client supports neither property.
     * @internal
     */
    getFloat : function() {
      var style = document.documentElement.style;
      return style.cssFloat !== undefined ? "cssFloat" :
        style.styleFloat !== undefined ? "styleFloat" : null;
    },


    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>linear-gradient</code>.
     * http://dev.w3.org/csswg/css3-images/#linear-gradients
     *
     * @return {String|null} Prefixed linear-gradient name or <code>null</code>
     * if linear gradients are not supported
     * @internal
     */
    getLinearGradient : function()
    {
      qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = false;
      var value = "linear-gradient(0deg, #fff, #000)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);

      if (!style) {
        //try old WebKit syntax (versions 528 - 534.16)
        value = "-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))";
        var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value, false);
        if (style) {
          qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT = true;
        }
      }

      // not supported
      if (!style) {
        return null;
      }

      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },


    /**
     * Returns <code>true</code> if the browser supports setting gradients
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     * http://msdn.microsoft.com/en-us/library/ms532997(v=vs.85).aspx
     *
     * @return {Boolean} <code>true</code> if supported.
     * @internal
     */
    getFilterGradient : function() {
      return qx.bom.client.Css.__isFilterSupported(
        "DXImageTransform.Microsoft.Gradient",
        "startColorStr=#550000FF, endColorStr=#55FFFF00");
    },


    /**
     * Returns the (possibly vendor-prefixed) name this client uses for
     * <code>radial-gradient</code>.
     *
     * @return {String|null} Prefixed radial-gradient name or <code>null</code>
     * if radial gradients are not supported
     * @internal
     */
    getRadialGradient : function()
    {
      var value = "radial-gradient(0px 0px, cover, red 50%, blue 100%)";
      var el = document.createElement("div");
      var style = qx.bom.Style.getAppliedStyle(el, "backgroundImage", value);
      if (!style) {
        return null;
      }
      var match = /(.*?)\(/.exec(style);
      return match ? match[1] : null;
    },


    /**
     * Checks if **only** the old WebKit (version < 534.16) syntax for
     * linear gradients is supported, e.g.
     * <code>linear-gradient(0deg, #fff, #000)</code>
     *
     * @return {Boolean} <code>true</code> if the legacy syntax must be used
     * @internal
     */
    getLegacyWebkitGradient : function()
    {
      if (qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT === null) {
        qx.bom.client.Css.getLinearGradient();
      }
      return qx.bom.client.Css.__WEBKIT_LEGACY_GRADIENT;
    },

    /**
     * Checks if rgba colors can be used:
     * http://www.w3.org/TR/2010/PR-css3-color-20101028/#rgba-color
     *
     * @return {Boolean} <code>true</code>, if rgba colors are supported.
     * @internal
     */
    getRgba : function() {
      var el;
      try {
        el = document.createElement("div");
      } catch (ex) {
        el = document.createElement();
      }

      // try catch for IE
      try {
        el.style["color"] = "rgba(1, 2, 3, 0.5)";
        if (el.style["color"].indexOf("rgba") != -1) {
          return true;
        }
      } catch (ex) {}

      return false;
    },


    /**
     * Returns the (possibly vendor-prefixed) name the browser uses for the
     * <code>boxSizing</code> style property.
     *
     * @return {String|null} boxSizing property name or <code>null</code> if
     * boxSizing is not supported.
     * @internal
     */
    getBoxSizing : function() {
      return qx.bom.Style.getPropertyName("boxSizing");
    },


    /**
     * Returns the browser-specific name used for the <code>display</code> style
     * property's <code>inline-block</code> value.
     *
     * @internal
     * @return {String|null}
     */
    getInlineBlock : function() {
      var el = document.createElement("span");
      el.style.display = "inline-block";
      if (el.style.display == "inline-block") {
        return "inline-block";
      }
      el.style.display = "-moz-inline-box";
      if (el.style.display !== "-moz-inline-box") {
        return "-moz-inline-box";
      }
      return null;
    },


    /**
     * Checks if CSS opacity is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if opacity is supported
     */
    getOpacity : function() {
      return (typeof document.documentElement.style.opacity == "string");
    },


    /**
     * Checks if CSS texShadow is supported
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getTextShadow : function()
    {
      return !!qx.bom.Style.getPropertyName("textShadow");
    },


    /**
     * Returns <code>true</code> if the browser supports setting text shadow
     * using the filter style. This usually only applies for IE browsers
     * starting from IE5.5.
     *
     * @internal
     * @return {Boolean} <code>true</code> if textShadow is supported
     */
    getFilterTextShadow : function()
    {
      return qx.bom.client.Css.__isFilterSupported(
        "DXImageTransform.Microsoft.Shadow",
        "color=#666666,direction=45");
    },


    /**
     * Checks if the given filter is supported.
     *
     * @param filterClass {String} The name of the filter class
     * @param initParams {String} Init values for the filter
     * @return {Boolean} <code>true</code> if the given filter is supported
     */
    __isFilterSupported : function(filterClass, initParams)
    {
      var supported = false;
      var value = "progid:" + filterClass + "(" + initParams + ");";
      var el = document.createElement("div");
      document.body.appendChild(el);
      el.style.filter = value;

      if (el.filters && el.filters.length > 0 &&
        el.filters.item(filterClass).enabled == true)
      {
        supported = true;
      }
      document.body.removeChild(el);

      return supported;
    },


    /**
     * Checks if the Alpha Image Loader must be used to display transparent PNGs.
     *
     * @return {Boolean} <code>true</code> if the Alpha Image Loader is required
     */
    getAlphaImageLoaderNeeded : function()
    {
      return qx.bom.client.Engine.getName() == "mshtml" &&
             qx.bom.client.Browser.getDocumentMode() < 9;
    },


    /**
     * Checks if pointer events are available.
     *
     * @internal
     * @return {Boolean} <code>true</code> if pointer events are supported.
     */
    getPointerEvents : function() {
      var el = document.documentElement;
      // Check if browser reports that pointerEvents is a known style property
      if ("pointerEvents" in el.style) {
        // The property is defined in Opera and IE9 but setting it has no effect
        var initial = el.style.pointerEvents;
        el.style.pointerEvents = "auto";
        // don't assume support if a nonsensical value isn't ignored
        el.style.pointerEvents = "foo";
        var supported = el.style.pointerEvents == "auto";
        el.style.pointerEvents = initial;

        return supported;

      }
      return false;
    },


    /**
     * Returns which Flexbox syntax is supported by the browser.
     * <code>display: box;</code> old 2009 version of Flexbox.
     * <code>display: flexbox;</code> tweener phase in 2011.
     * <code>display: flex;</code> current specification.
     * @internal
     * @return {String} <code>flex</code>,<code>flexbox</code>,<code>box</code> or <code>null</code>
     */
    getFlexboxSyntax : function() {
      var detectedSyntax = null;

      var detector = document.createElement("detect");
      var flexSyntax = [{
        value: "flex",
        syntax: "flex"
      }, {
        value: "-ms-flexbox",
        syntax: "flexbox"
      }, {
        value: "-webkit-flex",
        syntax: "flex"
      }];

      for (var i = 0; i < flexSyntax.length; i++) {
        // old IEs will throw an "Invalid argument" exception here
        try {
          detector.style.display = flexSyntax[i].value;
        } catch(ex) {
          return null;
        }
        if (detector.style.display === flexSyntax[i].value) {
          detectedSyntax = flexSyntax[i].syntax;
          break;
        }
      }

      detector = null;

      return detectedSyntax;
    }
  },



  defer : function(statics) {
    qx.core.Environment.add("css.textoverflow", statics.getTextOverflow);
    qx.core.Environment.add("css.placeholder", statics.getPlaceholder);
    qx.core.Environment.add("css.borderradius", statics.getBorderRadius);
    qx.core.Environment.add("css.boxshadow", statics.getBoxShadow);
    qx.core.Environment.add("css.gradient.linear", statics.getLinearGradient);
    qx.core.Environment.add("css.gradient.filter", statics.getFilterGradient);
    qx.core.Environment.add("css.gradient.radial", statics.getRadialGradient);
    qx.core.Environment.add("css.gradient.legacywebkit", statics.getLegacyWebkitGradient);
    qx.core.Environment.add("css.boxmodel", statics.getBoxModel);
    qx.core.Environment.add("css.rgba", statics.getRgba);
    qx.core.Environment.add("css.borderimage", statics.getBorderImage);
    qx.core.Environment.add("css.borderimage.standardsyntax", statics.getBorderImageSyntax);
    qx.core.Environment.add("css.usermodify", statics.getUserModify);
    qx.core.Environment.add("css.userselect", statics.getUserSelect);
    qx.core.Environment.add("css.userselect.none", statics.getUserSelectNone);
    qx.core.Environment.add("css.appearance", statics.getAppearance);
    qx.core.Environment.add("css.float", statics.getFloat);
    qx.core.Environment.add("css.boxsizing", statics.getBoxSizing);
    qx.core.Environment.add("css.inlineblock", statics.getInlineBlock);
    qx.core.Environment.add("css.opacity", statics.getOpacity);
    qx.core.Environment.add("css.textShadow", statics.getTextShadow);
    qx.core.Environment.add("css.textShadow.filter", statics.getFilterTextShadow);
    qx.core.Environment.add("css.alphaimageloaderneeded", statics.getAlphaImageLoaderNeeded);
    qx.core.Environment.add("css.pointerevents", statics.getPointerEvents);
    qx.core.Environment.add("css.flexboxSyntax", statics.getFlexboxSyntax);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Prototype JS
     http://www.prototypejs.org/
     Version 1.5

     Copyright:
       (c) 2006-2007, Prototype Core Team

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Prototype Core Team

   ----------------------------------------------------------------------

     Copyright (c) 2005-2008 Sam Stephenson

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge,
     publish, distribute, sublicense, and/or sell copies of the Software,
     and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
     MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
     DEALINGS IN THE SOFTWARE.

************************************************************************ */

/**
 * Style querying and modification of HTML elements.
 *
 * Automatically normalizes cross-browser differences for setting and reading
 * CSS attributes. Optimized for performance.
 *
 * @require(qx.lang.String)
 * @require(qx.bom.client.Css)

 * @require(qx.bom.element.Clip#set)
 * @require(qx.bom.element.Cursor#set)
 * @require(qx.bom.element.Opacity#set)
 * @require(qx.bom.element.BoxSizing#set)

 * @require(qx.bom.element.Clip#get)
 * @require(qx.bom.element.Cursor#get)
 * @require(qx.bom.element.Opacity#get)
 * @require(qx.bom.element.BoxSizing#get)

 * @require(qx.bom.element.Clip#reset)
 * @require(qx.bom.element.Cursor#reset)
 * @require(qx.bom.element.Opacity#reset)
 * @require(qx.bom.element.BoxSizing#reset)

 * @require(qx.bom.element.Clip#compile)
 * @require(qx.bom.element.Cursor#compile)
 * @require(qx.bom.element.Opacity#compile)
 * @require(qx.bom.element.BoxSizing#compile)
 */
qx.Bootstrap.define("qx.bom.element.Style",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    __styleNames : null,

    __cssNames : null,

    /**
     * Detect vendor specific properties.
     */
    __detectVendorProperties : function()
    {
      var styleNames = {
        "appearance" : qx.core.Environment.get("css.appearance"),
        "userSelect" : qx.core.Environment.get("css.userselect"),
        "textOverflow" : qx.core.Environment.get("css.textoverflow"),
        "borderImage" : qx.core.Environment.get("css.borderimage"),
        "float" : qx.core.Environment.get("css.float"),
        "userModify" : qx.core.Environment.get("css.usermodify"),
        "boxSizing" : qx.core.Environment.get("css.boxsizing")
      };

      this.__cssNames = {};
      for (var key in qx.lang.Object.clone(styleNames)) {
        if (!styleNames[key]) {
          delete styleNames[key];
        }
        else {
          if (key === 'float') {
            this.__cssNames['cssFloat'] = key;
          } else {
            this.__cssNames[key] = qx.bom.Style.getCssName(styleNames[key]);
          }
        }
      }

      this.__styleNames = styleNames;
    },


    /**
     * Gets the (possibly vendor-prefixed) name of a style property and stores
     * it to avoid multiple checks.
     *
     * @param name {String} Style property name to check
     * @return {String|null} The client-specific name of the property, or
     * <code>null</code> if it's not supported.
     */
    __getStyleName : function(name)
    {
      var styleName = qx.bom.Style.getPropertyName(name);
      if (styleName) {
        this.__styleNames[name] = styleName;
      }
      return styleName;
    },


    /**
     * Mshtml has proprietary pixel* properties for locations and dimensions
     * which return the pixel value. Used by getComputed() in mshtml variant.
     *
     * @internal
     */
    __mshtmlPixel :
    {
      width : "pixelWidth",
      height : "pixelHeight",
      left : "pixelLeft",
      right : "pixelRight",
      top : "pixelTop",
      bottom : "pixelBottom"
    },

    /**
     * Whether a special class is available for the processing of this style.
     *
     * @internal
     */
    __special :
    {
      clip : qx.bom.element.Clip,
      cursor : qx.bom.element.Cursor,
      opacity : qx.bom.element.Opacity,
      boxSizing : qx.bom.element.BoxSizing
    },


    /*
    ---------------------------------------------------------------------------
      COMPILE SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Compiles the given styles into a string which can be used to
     * concat a HTML string for innerHTML usage.
     *
     * @param map {Map} Map of style properties to compile
     * @return {String} Compiled string of given style properties.
     */
    compile : function(map)
    {
      var html = [];
      var special = this.__special;
      var cssNames = this.__cssNames;
      var name, value;

      for (name in map)
      {
        // read value
        value = map[name];
        if (value == null) {
          continue;
        }

        // normalize name
        name = this.__cssNames[name] || name;

        // process special properties
        if (special[name]) {
          html.push(special[name].compile(value));
        } else {
          if (!cssNames[name]) {
            cssNames[name] = qx.bom.Style.getCssName(name);
          }
          html.push(cssNames[name], ":", value === "" ? "\"\"" : value, ";");
        }
      }

      return html.join("");
    },

    /*
    ---------------------------------------------------------------------------
      CSS TEXT SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Set the full CSS content of the style attribute
     *
     * @param element {Element} The DOM element to modify
     * @param value {String} The full CSS string
     */
    setCss : function(element, value)
    {
      element.setAttribute("style", value);
    },


    /**
     * Returns the full content of the style attribute.
     *
     * @param element {Element} The DOM element to query
     * @return {String} the full CSS string
     * @signature function(element)
     */
    getCss : function(element)
    {
      return element.getAttribute("style");
    },





    /*
    ---------------------------------------------------------------------------
      STYLE ATTRIBUTE SUPPORT
    ---------------------------------------------------------------------------
    */

    /**
     * Checks whether the browser supports the given CSS property.
     *
     * @param propertyName {String} The name of the property
     * @return {Boolean} Whether the property id supported
     */
    isPropertySupported : function(propertyName)
    {
      return (
        this.__special[propertyName] ||
        this.__styleNames[propertyName] ||
        propertyName in document.documentElement.style
      );
    },


    /** @type {Integer} Computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     */
    COMPUTED_MODE : 1,


    /** @type {Integer} Cascaded value of a style property. */
    CASCADED_MODE : 2,


    /**
     * @type {Integer} Local value of a style property. Ignores inheritance cascade.
     *   Does not interpret values.
     */
    LOCAL_MODE : 3,


    /**
     * Sets the value of a style property
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param value {var} The value for the given style
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     */
    set : function(element, name, value, smart)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        qx.core.Assert.assertElement(element, "Invalid argument 'element'");
        qx.core.Assert.assertString(name, "Invalid argument 'name'");
        if (smart !== undefined) {
          qx.core.Assert.assertBoolean(smart, "Invalid argument 'smart'");
        }
      }


      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;

      // special handling for specific properties
      // through this good working switch this part costs nothing when
      // processing non-smart properties
      if (smart!==false && this.__special[name]) {
        this.__special[name].set(element, value);
      } else {
        element.style[name] = value !== null ? value : "";
      }
    },


    /**
     * Convenience method to modify a set of styles at once.
     *
     * @param element {Element} The DOM element to modify
     * @param styles {Map} a map where the key is the name of the property
     *    and the value is the value to use.
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     */
    setStyles : function(element, styles, smart)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        qx.core.Assert.assertElement(element, "Invalid argument 'element'");
        qx.core.Assert.assertMap(styles, "Invalid argument 'styles'");
        if (smart !== undefined) {
          qx.core.Assert.assertBoolean(smart, "Invalid argument 'smart'");
        }
      }

      // inline calls to "set" and "reset" because this method is very
      // performance critical!
      var styleNames = this.__styleNames;
      var special = this.__special;

      var style = element.style;

      for (var key in styles)
      {
        var value = styles[key];
        var name = styleNames[key] || this.__getStyleName(key) || key;

        if (value === undefined)
        {
          if (smart!==false && special[name]) {
            special[name].reset(element);
          } else {
            style[name] = "";
          }
        }
        else
        {
          if (smart!==false && special[name]) {
            special[name].set(element, value);
          } else {
            style[name] = value !== null ? value : "";
          }
        }
      }
    },


    /**
     * Resets the value of a style property
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     */
    reset : function(element, name, smart)
    {
      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;

      // special handling for specific properties
      if (smart!==false && this.__special[name]) {
        this.__special[name].reset(element);
      } else {
        element.style[name] = "";
      }
    },


    /**
     * Gets the value of a style property.
     *
     * *Computed*
     *
     * Returns the computed value of a style property. Compared to the cascaded style,
     * this one also interprets the values e.g. translates <code>em</code> units to
     * <code>px</code>.
     *
     * *Cascaded*
     *
     * Returns the cascaded value of a style property.
     *
     * *Local*
     *
     * Ignores inheritance cascade. Does not interpret values.
     *
     * @signature function(element, name, mode, smart)
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the style attribute (js variant e.g. marginTop, wordSpacing)
     * @param mode {Number} Choose one of the modes {@link #COMPUTED_MODE}, {@link #CASCADED_MODE},
     *   {@link #LOCAL_MODE}. The computed mode is the default one.
     * @param smart {Boolean?true} Whether the implementation should automatically use
     *    special implementations for some properties
     * @return {var} The value of the property
     */
    get : function(element, name, mode, smart)
    {
      // normalize name
      name = this.__styleNames[name] || this.__getStyleName(name) || name;

      // special handling
      if (smart!==false && this.__special[name]) {
        return this.__special[name].get(element, mode);
      }

      // switch to right mode
      switch(mode)
      {
        case this.LOCAL_MODE:
          return element.style[name] || "";

        case this.CASCADED_MODE:
          // Currently only supported by Opera and Internet Explorer
          if (element.currentStyle) {
            return element.currentStyle[name] || "";
          }

          throw new Error("Cascaded styles are not supported in this browser!");

        default:
          // Opera, Mozilla and Safari 3+ also have a global getComputedStyle which is identical
          // to the one found under document.defaultView.

          // The problem with this is however that this does not work correctly
          // when working with frames and access an element of another frame.
          // Then we must use the <code>getComputedStyle</code> of the document
          // where the element is defined.

          var doc = qx.dom.Node.getDocument(element);
          var getStyle = doc.defaultView ? doc.defaultView.getComputedStyle : undefined;

          if (getStyle !== undefined)
          {
            // Support for the DOM2 getComputedStyle method
            //
            // Safari >= 3 & Gecko > 1.4 expose all properties to the returned
            // CSSStyleDeclaration object. In older browsers the function
            // "getPropertyValue" is needed to access the values.
            //
            // On a computed style object all properties are read-only which is
            // identical to the behavior of MSHTML's "currentStyle".

            var computed = getStyle(element, null);
            // All relevant browsers expose the configured style properties to
            // the CSSStyleDeclaration objects
            if (computed && computed[name]) {
              return computed[name];
            }
          }
          else
          {
            // if the element is not inserted into the document "currentStyle"
            // may be undefined. In this case always return the local style.
            if (!element.currentStyle) {
              return element.style[name] || "";
            }

            // Read cascaded style. Shorthand properties like "border" are not available
            // on the currentStyle object.
            var currentStyle = element.currentStyle[name] || element.style[name] || "";

            // Pixel values are always OK
            if (/^-?[\.\d]+(px)?$/i.test(currentStyle)) {
              return currentStyle;
            }

            // Try to convert non-pixel values
            var pixel = this.__mshtmlPixel[name];
            if (pixel && (pixel in element.style))
            {
              // Backup local and runtime style
              var localStyle = element.style[name];

              // Overwrite local value with cascaded value
              // This is needed to have the pixel value setup
              element.style[name] = currentStyle || 0;

              // Read pixel value and add "px"
              var value = element.style[pixel] + "px";

              // Recover old local value
              element.style[name] = localStyle;

              // Return value
              return value;
            }

            // Just the current style
            return currentStyle;
          }

          return element.style[name] || "";
      }
    }
  },

  defer : function(statics) {
    statics.__detectVendorProperties();
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)

   ======================================================================

   This class contains code based on the following work:

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */

/**
 * Includes library functions to work with the current document.
 */
qx.Bootstrap.define("qx.bom.Document",
{
  statics :
  {
    /**
     * Whether the document is in quirks mode (e.g. non XHTML, HTML4 Strict or missing doctype)
     *
     * @signature function(win)
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in quirks mode
     */
    isQuirksMode : qx.core.Environment.select("engine.name",
    {
      "mshtml" : function(win)
      {
        if(qx.core.Environment.get("engine.version") >= 8) {
          return (win||window).document.documentMode === 5;
        } else {
          return (win||window).document.compatMode !== "CSS1Compat";
        }
      },

      "webkit" : function(win)
      {
        if (document.compatMode === undefined)
        {
          var el = (win||window).document.createElement("div");
          el.style.cssText = "position:absolute;width:0;height:0;width:1";
          return el.style.width === "1px" ? true : false;
        } else {
          return (win||window).document.compatMode !== "CSS1Compat";
        }
      },

      "default" : function(win) {
        return (win||window).document.compatMode !== "CSS1Compat";
      }
    }),


    /**
     * Whether the document is in standard mode (e.g. XHTML, HTML4 Strict or doctype defined)
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} true when containing document is in standard mode
     */
    isStandardMode : function(win) {
      return !this.isQuirksMode(win);
    },


    /**
     * Returns the width of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollWidth</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is wider than the document the viewport width is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollWidth</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getWidth : function(win)
    {
      var doc = (win||window).document;
      var view = qx.bom.Viewport.getWidth(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollWidth : doc.body.scrollWidth;
      return Math.max(scroll, view);
    },


    /**
     * Returns the height of the document.
     *
     * Internet Explorer in standard mode stores the proprietary <code>scrollHeight</code> property
     * on the <code>documentElement</code>, but in quirks mode on the body element. All
     * other known browsers simply store the correct value on the <code>documentElement</code>.
     *
     * If the viewport is higher than the document the viewport height is returned.
     *
     * As the html element has no visual appearance it also can not scroll. This
     * means that we must use the body <code>scrollHeight</code> in all non mshtml clients.
     *
     * Verified to correctly work with:
     *
     * * Mozilla Firefox 2.0.0.4
     * * Opera 9.2.1
     * * Safari 3.0 beta (3.0.2)
     * * Internet Explorer 7.0
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The height of the actual document (which includes the body and its margin).
     *
     * NOTE: Opera 9.5x and 9.6x have wrong value for the scrollWidth property,
     * if an element use negative value for top and left to be outside the viewport!
     * See: http://bugzilla.qooxdoo.org/show_bug.cgi?id=2869
     */
    getHeight : function(win)
    {
      var doc = (win||window).document;
      var view = qx.bom.Viewport.getHeight(win);
      var scroll = this.isStandardMode(win) ? doc.documentElement.scrollHeight : doc.body.scrollHeight;
      return Math.max(scroll, view);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Sebastian Fastner (fastner)
     * Tino Butz (tbtz)

   ======================================================================

   This class contains code based on the following work:

   * Unify Project

     Homepage:
       http://unify-project.org

     Copyright:
       2009-2010 Deutsche Telekom AG, Germany, http://telekom.com

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   * Yahoo! UI Library
       http://developer.yahoo.com/yui
       Version 2.2.0

     Copyright:
       (c) 2007, Yahoo! Inc.

     License:
       BSD: http://developer.yahoo.com/yui/license.txt

   ----------------------------------------------------------------------

     http://developer.yahoo.com/yui/license.html

     Copyright (c) 2009, Yahoo! Inc.
     All rights reserved.

     Redistribution and use of this software in source and binary forms,
     with or without modification, are permitted provided that the
     following conditions are met:

     * Redistributions of source code must retain the above copyright
       notice, this list of conditions and the following disclaimer.
     * Redistributions in binary form must reproduce the above copyright
       notice, this list of conditions and the following disclaimer in
       the documentation and/or other materials provided with the
       distribution.
     * Neither the name of Yahoo! Inc. nor the names of its contributors
       may be used to endorse or promote products derived from this
       software without specific prior written permission of Yahoo! Inc.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
     FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
     COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
     INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
     STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
     OF THE POSSIBILITY OF SUCH DAMAGE.

************************************************************************ */

/**
 * Includes library functions to work with the client's viewport (window).
 * Orientation related functions are point to window.top as default.
 */
qx.Bootstrap.define("qx.bom.Viewport",
{
  statics :
  {
    /**
     * Returns the current width of the viewport (excluding the vertical scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The width of the viewable area of the page (excluding scrollbars).
     */
    getWidth : function(win)
    {
      var win = win || window;
      var doc = win.document;
      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientWidth : doc.body.clientWidth;
    },


    /**
     * Returns the current height of the viewport (excluding the horizontal scrollbar
     * if present).
     *
     * @param win {Window?window} The window to query
     * @return {Integer} The Height of the viewable area of the page (excluding scrollbars).
     */
    getHeight : function(win)
    {
      var win = win || window;
      var doc = win.document;

      // [BUG #7785] Document element's clientHeight is calculated wrong on iPad iOS7
      if(qx.core.Environment.get("os.name") == "ios" && window.innerHeight != doc.documentElement.clientHeight) {
        return window.innerHeight;
      }

      return qx.bom.Document.isStandardMode(win) ? doc.documentElement.clientHeight : doc.body.clientHeight;
    },


    /**
     * Returns the scroll position of the viewport
     *
     * All clients except IE < 9 support the non-standard property <code>pageXOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollLeft</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from left edge, always a positive integer or zero
     */
    getScrollLeft : function(win)
    {
      var win = win ? win : window;

      if (typeof win.pageXOffset !== "undefined") {
        return win.pageXOffset;
      }

      // Firefox is using 'documentElement.scrollLeft' and Chrome is using
      // 'document.body.scrollLeft'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollLeft || doc.body.scrollLeft;
    },


    /**
     * Returns the scroll position of the viewport
     *
     * All clients except MSHTML support the non-standard property <code>pageYOffset</code>.
     * As this is easier to evaluate we prefer this property over <code>scrollTop</code>.
     * Since the window could differ from the one the application is running in, we can't
     * use a one-time environment check to decide which property to use.
     *
     * @param win {Window?window} The window to query
     * @return {Integer} Scroll position in pixels from top edge, always a positive integer or zero
     */
    getScrollTop : function(win)
    {
      var win = win ? win : window;

      if (typeof win.pageYOffset !== "undefined") {
        return win.pageYOffset;
      }

      // Firefox is using 'documentElement.scrollTop' and Chrome is using
      // 'document.body.scrollTop'. For the other value each browser is returning
      // 0, so we can use this check to get the positive value without using specific
      // browser checks.
      var doc = win.document;
      return doc.documentElement.scrollTop || doc.body.scrollTop;
    },


    /**
     * Returns an orientation normalizer value that should be added to device orientation
     * to normalize behaviour on different devices.
     *
     * @param win {Window} The window to query
     * @return {Map} Orientation normalizing value
     */
    __getOrientationNormalizer : function(win)
    {
      // Calculate own understanding of orientation (0 = portrait, 90 = landscape)
      var currentOrientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      var deviceOrientation  = win.orientation;
      if (deviceOrientation == null || Math.abs( deviceOrientation % 180 ) == currentOrientation) {
        // No device orientation available or device orientation equals own understanding of orientation
        return {
          "-270":  90,
          "-180": 180,
           "-90": -90,
             "0":   0,
            "90":  90,
           "180": 180,
           "270": -90
        };
      } else {
        // Device orientation is not equal to own understanding of orientation
        return {
          "-270": 180,
          "-180": -90,
           "-90":   0,
             "0":  90,
            "90": 180,
           "180": -90,
           "270":   0
        };
      }
    },


    // Cache orientation normalizer map on start
    __orientationNormalizer : null,


    /**
     * Returns the current orientation of the viewport in degree.
     *
     * All possible values and their meaning:
     *
     * * <code>-90</code>: "Landscape"
     * * <code>0</code>: "Portrait"
     * * <code>90</code>: "Landscape"
     * * <code>180</code>: "Portrait"
     *
     * @param win {Window?window.top} The window to query. (Default = top window)
     * @return {Integer} The current orientation in degree
     */
    getOrientation : function(win)
    {
      // Set window.top as default, because orientationChange event is only fired top window
      var win = win||window.top;
      // The orientation property of window does not have the same behaviour over all devices
      // iPad has 0degrees = Portrait, Playbook has 90degrees = Portrait, same for Android Honeycomb
      //
      // To fix this an orientationNormalizer map is calculated on application start
      //
      // The calculation of getWidth and getHeight returns wrong values if you are in an input field
      // on iPad and rotate your device!
      var orientation = win.orientation;
      if (orientation == null) {
        // Calculate orientation from window width and window height
        orientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      } else {
        if (this.__orientationNormalizer == null) {
          this.__orientationNormalizer = this.__getOrientationNormalizer(win);
        }
        // Normalize orientation value
        orientation = this.__orientationNormalizer[orientation];
      }
      return orientation;
    },


    /**
     * Whether the viewport orientation is currently in landscape mode.
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in landscape mode.
     */
    isLandscape : function(win) {
      var orientation = this.getOrientation(win);
      return orientation === -90 || orientation === 90;
    },


    /**
     * Whether the viewport orientation is currently in portrait mode.
     *
     * @param win {Window?window} The window to query
     * @return {Boolean} <code>true</code> when the viewport orientation
     *     is currently in portrait mode.
     */
    isPortrait : function(win)
    {
      var orientation = this.getOrientation(win);
      return orientation === 0 || orientation === 180;
    }
  }
});
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
qx.Bootstrap.define("qx.bom.element.AnimationHandle",
{
  extend : qx.event.Emitter,


  construct : function() {
    var css = qx.core.Environment.get("css.animation");
    this.__playState = css && css["play-state"];
    this.__playing = true;
    this.addListenerOnce("end", this.__setEnded, this);
  },


  events: {
    /** Fired when the animation started via {@link qx.bom.element.Animation}. */
    "start" : "Element",

    /**
     * Fired when the animation started via {@link qx.bom.element.Animation} has
     * ended.
     */
    "end" : "Element",

    /** Fired on every iteration of the animation. */
    "iteration" : "Element"
  },


  members :
  {
    __playState : null,
    __playing : false,
    __ended : false,


    /**
     * Accessor of the playing state.
     * @return {Boolean} <code>true</code>, if the animations is playing.
     */
    isPlaying : function() {
      return this.__playing;
    },


    /**
     * Accessor of the ended state.
     * @return {Boolean} <code>true</code>, if the animations has ended.
     */
    isEnded : function() {
      return this.__ended;
    },


    /**
     * Accessor of the paused state.
     * @return {Boolean} <code>true</code>, if the animations is paused.
     */
    isPaused : function() {
      return this.el.style[this.__playState] == "paused";
    },


    /**
     * Pauses the animation, if running. If not running, it will be ignored.
     */
    pause : function() {
      if (this.el) {
        this.el.style[this.__playState] = "paused";
        this.el.$$animation.__playing = false;
        // in case the animation is based on JS
        if (this.animationId && qx.bom.element.AnimationJs) {
          qx.bom.element.AnimationJs.pause(this);
        }
      }
    },


    /**
     * Resumes an animation. This does not start the animation once it has ended.
     * In this case you need to start a new Animation.
     */
    play : function() {
      if (this.el) {
        this.el.style[this.__playState] = "running";
        this.el.$$animation.__playing = true;
        // in case the animation is based on JS
        if (this.i != undefined && qx.bom.element.AnimationJs) {
          qx.bom.element.AnimationJs.play(this);
        }
      }
    },


    /**
     * Stops the animation if running.
     */
    stop : function() {
      if (this.el && qx.core.Environment.get("css.animation") && !this.jsAnimation) {
        this.el.style[this.__playState] = "";
        this.el.style[qx.core.Environment.get("css.animation").name] = "";
        this.el.$$animation.__playing = false;
        this.el.$$animation.__ended = true;
      }
      // in case the animation is based on JS
      else if (this.jsAnimation) {
        this.stopped = true;
        qx.bom.element.AnimationJs.stop(this);
      }
    },

    /**
     * Set the animation state to ended
     */
    __setEnded : function(){
      this.__playing = false;
      this.__ended = true;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * This class offers the same API as the CSS3 animation layer in
 * {@link qx.bom.element.AnimationCss} but uses JavaScript to fake the behavior.
 *
 * {@link qx.bom.element.Animation} is the class, which takes care of the
 * feature detection for CSS animations and decides which implementation
 * (CSS or JavaScript) should be used. Most likely, this implementation should
 * be the one to use.
 *
 * @ignore(qx.bom.element.Style.*)
 * @use(qx.bom.element.AnimationJs#play)
 */
qx.Bootstrap.define("qx.bom.element.AnimationJs",
{
  statics :
  {
    /**
     * The maximal time a frame should take.
     */
    __maxStepTime : 30,

    /**
     * The supported CSS units.
     */
    __units : ["%", "in", "cm", "mm", "em", "ex", "pt", "pc", "px"],

    /** The used keys for transforms. */
    __transitionKeys : {
      "scale": true,
      "rotate" : true,
      "skew" : true,
      "translate" : true
    },

    /**
     * This is the main function to start the animation. For further details,
     * take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animate : function(el, desc, duration) {
      return this._animate(el, desc, duration, false);
    },


    /**
     * This is the main function to start the animation in reversed mode.
     * For further details, take a look at the documentation of the wrapper
     * {@link qx.bom.element.Animation}.
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    animateReverse : function(el, desc, duration) {
      return this._animate(el, desc, duration, true);
    },


    /**
     * Helper to start the animation, either in reversed order or not.
     *
     * @param el {Element} The element to animate.
     * @param desc {Map} Animation description.
     * @param duration {Integer?} The duration of the animation which will
     *   override the duration given in the description.
     * @param reverse {Boolean} <code>true</code>, if the animation should be
     *   reversed.
     * @return {qx.bom.element.AnimationHandle} The handle.
     */
    _animate : function(el, desc, duration, reverse) {
      // stop if an animation is already running
      if (el.$$animation) {
        return el.$$animation;
      }

      desc = qx.lang.Object.clone(desc, true);

      if (duration == undefined) {
        duration = desc.duration;
      }

      var keyFrames = desc.keyFrames;

      var keys = this.__getOrderedKeys(keyFrames);
      var stepTime = this.__getStepTime(duration, keys);
      var steps = parseInt(duration / stepTime, 10);

      this.__normalizeKeyFrames(keyFrames, el);

      var delta = this.__calculateDelta(steps, stepTime, keys, keyFrames, duration, desc.timing);
      var handle = new qx.bom.element.AnimationHandle();
      handle.jsAnimation = true;

      if (reverse) {
        delta.reverse();
        handle.reverse = true;
      }

      handle.desc = desc;
      handle.el = el;
      handle.delta = delta;
      handle.stepTime = stepTime;
      handle.steps = steps;
      el.$$animation = handle;

      handle.i = 0;
      handle.initValues = {};
      handle.repeatSteps = this.__applyRepeat(steps, desc.repeat);

      var delay = desc.delay || 0;
      var self = this;
      handle.delayId = window.setTimeout(function() {
        handle.delayId = null;
        self.play(handle);
      }, delay);
      return handle;
    },


    /**
     * Try to normalize the keyFrames by adding the default / set values of the
     * element.
     * @param keyFrames {Map} The map of key frames.
     * @param el {Element} The element to animate.
     */
    __normalizeKeyFrames : function(keyFrames, el) {
      // collect all possible keys and its units
      var units = {};
      for (var percent in keyFrames) {
        for (var name in keyFrames[percent]) {
          // prefixed key calculation
          var prefixed = qx.bom.Style.getPropertyName(name);
          if (prefixed && prefixed != name) {
            var prefixedName = qx.bom.Style.getCssName(prefixed);
            keyFrames[percent][prefixedName] = keyFrames[percent][name];
            delete keyFrames[percent][name];
            name = prefixedName;
          }
          // check for the available units
          if (units[name] == undefined) {
            var item = keyFrames[percent][name];
            if (typeof item == "string") {
              units[name] = this.__getUnit(item);
            } else {
              units[name] = "";
            }
          }
        };
      }
      // add all missing keys
      for (var percent in keyFrames) {
        var frame = keyFrames[percent];
        for (var name in units) {
          if (frame[name] == undefined) {
            if (name in el.style) {
              // get the computed style if possible
              if (window.getComputedStyle) {
                frame[name] = window.getComputedStyle(el, null)[name];
              } else {
                frame[name] = el.style[name];
              }
            } else {
              frame[name] = el[name];
            }
            // if its a unit we know, set 0 as fallback
            if (frame[name] === "" && this.__units.indexOf(units[name]) != -1) {
              frame[name] = "0" + units[name];
            }
          }
        };
      };
    },


    /**
     * Checks for transform keys and returns a cloned frame
     * with the right transform style set.
     * @param frame {Map} A single key frame of the description.
     * @return {Map} A modified clone of the given frame.
     */
    __normalizeKeyFrameTransforms : function(frame) {
      frame = qx.lang.Object.clone(frame);
      var transforms;
      for (var name in frame) {
        if (name in this.__transitionKeys) {
          if (!transforms) {
            transforms = {};
          }
          transforms[name] = frame[name];
          delete frame[name];
        }
      };
      if (transforms) {
        var transformStyle = qx.bom.element.Transform.getCss(transforms).split(":");
        if (transformStyle.length > 1) {
          frame[transformStyle[0]] = transformStyle[1].replace(";", "");
        }
      }
      return frame;
    },


    /**
     * Precalculation of the delta which will be applied during the animation.
     * The whole deltas will be calculated prior to the animation and stored
     * in a single array. This method takes care of that calculation.
     *
     * @param steps {Integer} The amount of steps to take to the end of the
     *   animation.
     * @param stepTime {Integer} The amount of milliseconds each step takes.
     * @param keys {Array} Ordered list of keys in the key frames map.
     * @param keyFrames {Map} The map of key frames.
     * @param duration {Integer} Time in milliseconds the animation should take.
     * @param timing {String} The given timing function.
     * @return {Array} An array containing the animation deltas.
     */
    __calculateDelta : function(steps, stepTime, keys, keyFrames, duration, timing) {
      var delta = new Array(steps);

      var keyIndex = 1;
      delta[0] = this.__normalizeKeyFrameTransforms(keyFrames[0]);
      var last = keyFrames[0];
      var next = keyFrames[keys[keyIndex]];
      var stepsToNext = Math.floor(keys[keyIndex] / (stepTime / duration * 100));

      var calculationIndex = 1; // is used as counter for the timing calculation
      // for every step
      for (var i=1; i < delta.length; i++) {
        // switch key frames if we crossed a percent border
        if (i * stepTime / duration * 100 > keys[keyIndex]) {
          last = next;
          keyIndex++;
          next = keyFrames[keys[keyIndex]];
          stepsToNext = Math.floor(keys[keyIndex] / (stepTime / duration * 100)) - stepsToNext;
          calculationIndex = 1;
        }

        delta[i] = {};

        var transforms;
        // for every property
        for (var name in next) {
          var nItem = next[name] + "";

          // transform values
          if (name in this.__transitionKeys) {
            if (!transforms) {
              transforms = {};
            }

            if (qx.Bootstrap.isArray(last[name])) {
              if (!qx.Bootstrap.isArray(next[name])) {
                next[name] = [next[name]];
              }
              transforms[name] = [];
              for (var j = 0; j < next[name].length; j++) {
                var item = next[name][j] + "";
                var x = calculationIndex / stepsToNext;
                transforms[name][j] = this.__getNextValue(item, last[name], timing, x);
              }
            } else {
              var x = calculationIndex / stepsToNext;
              transforms[name] = this.__getNextValue(nItem, last[name], timing, x);
            }

          // color values
          } else if (nItem.charAt(0) == "#") {
            // get the two values from the frames as RGB arrays
            var value0 = qx.util.ColorUtil.cssStringToRgb(last[name]);
            var value1 = qx.util.ColorUtil.cssStringToRgb(nItem);
            var stepValue = [];
            // calculate every color channel
            for (var j=0; j < value0.length; j++) {
              var range = value0[j] - value1[j];
              var x = calculationIndex / stepsToNext;
              var timingX = qx.bom.AnimationFrame.calculateTiming(timing, x);
              stepValue[j] = parseInt(value0[j] - range * timingX, 10);
            }

            delta[i][name] = qx.util.ColorUtil.rgbToHexString(stepValue);

          } else if (!isNaN(parseFloat(nItem))) {
            var x = calculationIndex / stepsToNext;
            delta[i][name] = this.__getNextValue(nItem, last[name], timing, x);
          } else {
            delta[i][name] = last[name] + "";
          }
        }
        // save all transformations in the delta values
        if (transforms) {
          var transformStyle = qx.bom.element.Transform.getCss(transforms).split(":");
          if (transformStyle.length > 1) {
            delta[i][transformStyle[0]] = transformStyle[1].replace(";", "");
          }
        }

        calculationIndex++;
      }
      // make sure the last key frame is right
      delta[delta.length -1] = this.__normalizeKeyFrameTransforms(keyFrames[100]);

      return delta;
    },


    /**
     * Ties to parse out the unit of the given value.
     *
     * @param item {String} A CSS value including its unit.
     * @return {String} The unit of the given value.
     */
    __getUnit : function(item) {
      return item.substring((parseFloat(item) + "").length, item.length);
    },


    /**
     * Returns the next value based on the given arguments.
     *
     * @param nextItem {String} The CSS value of the next frame
     * @param lastItem {String} The CSS value of the last frame
     * @param timing {String} The timing used for the calculation
     * @param x {Number} The x position of the animation on the time axis
     * @return {String} The calculated value including its unit.
     */
    __getNextValue : function(nextItem, lastItem, timing, x) {
      var range = parseFloat(nextItem) - parseFloat(lastItem);
      return (parseFloat(lastItem) + range * qx.bom.AnimationFrame.calculateTiming(timing, x)) + this.__getUnit(nextItem);
    },


    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to play
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */
    play : function(handle) {
      handle.emit("start", handle.el);
      var id = window.setInterval(function() {
        handle.repeatSteps--;
        var values = handle.delta[handle.i % handle.steps];
        // save the init values
        if (handle.i === 0) {
          for (var name in values) {
            if (handle.initValues[name] === undefined) {
              // animate element property
              if (handle.el[name] !== undefined) {
                handle.initValues[name] = handle.el[name];
              }
              // animate CSS property
              else if (qx.bom.element.Style) {
                handle.initValues[name] = qx.bom.element.Style.get(
                  handle.el, qx.lang.String.camelCase(name)
                );
              } else {
                handle.initValues[name] = handle.el.style[qx.lang.String.camelCase(name)];
              }
            }
          }
        }
        qx.bom.element.AnimationJs.__applyStyles(handle.el, values);

        handle.i++;
        // iteration condition
        if (handle.i % handle.steps == 0) {
          handle.emit("iteration", handle.el);
          if (handle.desc.alternate) {
            handle.delta.reverse();
          }
        }
        // end condition
        if (handle.repeatSteps < 0) {
          qx.bom.element.AnimationJs.stop(handle);
        }
      }, handle.stepTime);

      handle.animationId = id;

      return handle;
    },


    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to pause
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */

    pause : function(handle) {
      // stop the interval
      window.clearInterval(handle.animationId);
      handle.animationId = null;

      return handle;
    },


    /**
     * Internal helper for the {@link qx.bom.element.AnimationHandle} to stop
     * the animation.
     * @internal
     * @param handle {qx.bom.element.AnimationHandle} The hand which
     *   represents the animation.
     * @return {qx.bom.element.AnimationHandle} The handle for chaining.
     */
    stop : function(handle) {
      var desc = handle.desc;
      var el = handle.el;
      var initValues = handle.initValues;
      if (handle.animationId) {
        window.clearInterval(handle.animationId);
      }

      // clear the delay if the animation has not been started
      if (handle.delayId) {
        window.clearTimeout(handle.delayId);
      }

      // check if animation is already stopped
      if (el == undefined) {
        return handle;
      }

      // if we should keep a frame
      var keep = desc.keep;
      if (keep != undefined && !handle.stopped) {
        if (handle.reverse || (desc.alternate && desc.repeat && desc.repeat % 2 == 0)) {
          keep = 100 - keep;
        }
        this.__applyStyles(el, this.__normalizeKeyFrameTransforms(desc.keyFrames[keep]));
      } else {
        this.__applyStyles(el, initValues);
      }

      el.$$animation = null;
      handle.el = null;
      handle.ended = true;
      handle.animationId = null;

      handle.emit("end", el);

      return handle;
    },


    /**
     * Takes care of the repeat key of the description.
     * @param steps {Integer} The number of steps one iteration would take.
     * @param repeat {Integer|String} It can be either a number how often the
     * animation should be repeated or the string 'infinite'.
     * @return {Integer} The number of steps to animate.
     */
    __applyRepeat : function(steps, repeat) {
      if (repeat == undefined) {
        return steps;
      }
      if (repeat == "infinite") {
        return Number.MAX_VALUE;
      }
      return steps * repeat;
    },


    /**
     * Central method to apply css styles and element properties.
     * @param el {Element} The DOM element to apply the styles.
     * @param styles {Map} A map containing styles and values.
     */
    __applyStyles : function(el, styles) {
      for (var key in styles) {
        // ignore undefined values (might be a bad detection)
        if (styles[key] === undefined) {
          continue;
        }

        // apply element property value - only if a CSS property
        // is *not* available
        if (typeof el.style[key] === "undefined" && key in el) {
          el[key] = styles[key];
          continue;
        }

        var name = qx.bom.Style.getPropertyName(key) || key;
        if (qx.bom.element.Style) {
          qx.bom.element.Style.set(el, name, styles[key]);
        } else {
          el.style[name] = styles[key];
        }
      }
    },


    /**
     * Dynamic calculation of the steps time considering a max step time.
     * @param duration {Number} The duration of the animation.
     * @param keys {Array} An array containing the ordered set of key frame keys.
     * @return {Integer} The best suited step time.
     */
    __getStepTime : function(duration, keys) {
      // get min difference
      var minDiff = 100;
      for (var i=0; i < keys.length - 1; i++) {
        minDiff = Math.min(minDiff, keys[i+1] - keys[i]);
      };

      var stepTime = duration * minDiff / 100;
      while (stepTime > this.__maxStepTime) {
        stepTime = stepTime / 2;
      }
      return Math.round(stepTime);
    },


    /**
     * Helper which returns the ordered keys of the key frame map.
     * @param keyFrames {Map} The map of key frames.
     * @return {Array} An ordered list of keys.
     */
    __getOrderedKeys : function(keyFrames) {
      var keys = Object.keys(keyFrames);
      for (var i=0; i < keys.length; i++) {
        keys[i] = parseInt(keys[i], 10);
      };
      keys.sort(function(a,b) {return a-b;});
      return keys;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * Responsible for checking all relevant CSS transform properties.
 *
 * Specs:
 * http://www.w3.org/TR/css3-2d-transforms/
 * http://www.w3.org/TR/css3-3d-transforms/
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssTransform",
{
  statics :
  {
    /**
     * Main check method which returns an object if CSS animations are
     * supported. This object contains all necessary keys to work with CSS
     * animations.
     * <ul>
     *  <li><code>name</code> The name of the css transform style</li>
     *  <li><code>style</code> The name of the css transform-style style</li>
     *  <li><code>origin</code> The name of the transform-origin style</li>
     *  <li><code>3d</code> Whether 3d transforms are supported</li>
     *  <li><code>perspective</code> The name of the perspective style</li>
     *  <li><code>perspective-origin</code> The name of the perspective-origin style</li>
     *  <li><code>backface-visibility</code> The name of the backface-visibility style</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or null, if animations are
     *   not supported.
     */
    getSupport : function() {
      var name = qx.bom.client.CssTransform.getName();
      if (name != null) {
        return {
          "name" : name,
          "style" : qx.bom.client.CssTransform.getStyle(),
          "origin" : qx.bom.client.CssTransform.getOrigin(),
          "3d" : qx.bom.client.CssTransform.get3D(),
          "perspective" : qx.bom.client.CssTransform.getPerspective(),
          "perspective-origin" : qx.bom.client.CssTransform.getPerspectiveOrigin(),
          "backface-visibility" : qx.bom.client.CssTransform.getBackFaceVisibility()
        };
      }
      return null;
    },

    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getStyle : function() {
      return qx.bom.Style.getPropertyName("transformStyle");
    },


    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspective : function() {
      return qx.bom.Style.getPropertyName("perspective");
    },


    /**
     * Checks for the style name used to set the perspective origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPerspectiveOrigin : function() {
      return qx.bom.Style.getPropertyName("perspectiveOrigin");
    },


    /**
     * Checks for the style name used to set the backface visibility.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getBackFaceVisibility : function() {
      return qx.bom.Style.getPropertyName("backfaceVisibility");
    },


    /**
     * Checks for the style name used to set the transform origin.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getOrigin : function() {
      return qx.bom.Style.getPropertyName("transformOrigin");
    },


    /**
     * Checks for the style name used for transforms.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getName : function() {
      return qx.bom.Style.getPropertyName("transform");
    },


    /**
     * Checks if 3D transforms are supported.
     * @internal
     * @return {Boolean} <code>true</code>, if 3D transformations are supported
     */
    get3D : function() {
      return qx.bom.client.CssTransform.getPerspective() != null;
    }
  },



  defer : function(statics) {
    qx.core.Environment.add("css.transform", statics.getSupport);
    qx.core.Environment.add("css.transform.3d", statics.get3D);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * This class is responsible for applying CSS3 transforms to plain DOM elements.
 * The implementation is mostly a cross browser wrapper for applying the
 * transforms.
 * The API is keep to the spec as close as possible.
 *
 * http://www.w3.org/TR/css3-3d-transforms/
 */
qx.Bootstrap.define("qx.bom.element.Transform",
{
  statics :
  {
    /** Internal storage of the CSS names */
    __cssKeys : qx.core.Environment.get("css.transform"),


    /**
     * Method to apply multiple transforms at once to the given element. It
     * takes a map containing the transforms you want to apply plus the values
     * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
     * The values can be either singular, which means a single value will
     * be added to the CSS. If you give an array, the values will be split up
     * and each array entry will be used for the X, Y or Z dimension in that
     * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
     * double the size in X direction and half the size in Y direction.
     * The values can be either singular, which means a single value will
     * be added to the CSS. If you give an array, the values will be join to
     * a string.
     * 3d suffixed properties will be taken for translate and scale if they are
     * available and an array with three values is given.
     * Make sure your browser supports all transformations you apply.
     *
     * @param el {Element} The element to apply the transformation.
     * @param transforms {Map} The map containing the transforms and value.
     */
    transform : function(el, transforms) {
      var transformCss = this.getTransformValue(transforms);
      if (this.__cssKeys != null) {
        var style = this.__cssKeys["name"];
        el.style[style] = transformCss;
      }
    },


    /**
     * Translates the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
     */
    translate : function(el, value) {
      this.transform(el, {translate: value});
    },


    /**
     * Scales the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {Number|Array} The value to scale.
     */
    scale : function(el, value) {
      this.transform(el, {scale: value});
    },


    /**
     * Rotates the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
     */
    rotate : function(el, value) {
      this.transform(el, {rotate: value});
    },


    /**
     * Skews the given element by the given value. For further details, take
     * a look at the {@link #transform} method.
     * @param el {Element} The element to apply the transformation.
     * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
     */
    skew : function(el, value) {
      this.transform(el, {skew: value});
    },


    /**
     * Converts the given map to a string which could be added to a css
     * stylesheet.
     * @param transforms {Map} The transforms map. For a detailed description,
     * take a look at the {@link #transform} method.
     * @return {String} The CSS value.
     */
    getCss : function(transforms) {
      var transformCss = this.getTransformValue(transforms);
      if (this.__cssKeys != null) {
        var style = this.__cssKeys["name"];
        return qx.bom.Style.getCssName(style) + ":" + transformCss + ";";
      }
      return "";
    },


    /**
     * Sets the transform-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     */
    setOrigin : function(el, value) {
      if (this.__cssKeys != null) {
        el.style[this.__cssKeys["origin"]] = value;
      }
    },


    /**
     * Returns the transform-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getOrigin : function(el) {
      if (this.__cssKeys != null) {
        return el.style[this.__cssKeys["origin"]];
      }
      return "";
    },


    /**
     * Sets the transform-style property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
     */
    setStyle : function(el, value) {
      if (this.__cssKeys != null) {
        el.style[this.__cssKeys["style"]] = value;
      }
    },


    /**
     * Returns the transform-style property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, either <code>flat</code> or
     *   <code>preserve-3d</code>.
     */
    getStyle : function(el) {
      if (this.__cssKeys != null) {
        return el.style[this.__cssKeys["style"]];
      }
      return "";
    },


    /**
     * Sets the perspective property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     * @param el {Element} The dom element to set the property.
     * @param value {Number} The perspective layer. Numbers between 100
     *   and 5000 give the best results.
     */
    setPerspective : function(el, value) {
      if (this.__cssKeys != null) {
        el.style[this.__cssKeys["perspective"]] = value + "px";
      }
    },


    /**
     * Returns the perspective property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>500</code>
     */
    getPerspective : function(el) {
      if (this.__cssKeys != null) {
        return el.style[this.__cssKeys["perspective"]];
      }
      return "";
    },


    /**
     * Sets the perspective-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     * @param el {Element} The dom element to set the property.
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     */
    setPerspectiveOrigin : function(el, value) {
      if (this.__cssKeys != null) {
        el.style[this.__cssKeys["perspective-origin"]] = value;
      }
    },


    /**
     * Returns the perspective-origin property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     * @param el {Element} The dom element to read the property.
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getPerspectiveOrigin : function(el) {
      if (this.__cssKeys != null) {
        var value = el.style[this.__cssKeys["perspective-origin"]];
        if (value != "") {
          return value;
        } else {
          var valueX = el.style[this.__cssKeys["perspective-origin"] + "X"];
          var valueY = el.style[this.__cssKeys["perspective-origin"] + "Y"];
          if (valueX != "") {
            return valueX + " " + valueY;
          }
        }
      }
      return "";
    },


    /**
     * Sets the backface-visibility property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     * @param el {Element} The dom element to set the property.
     * @param value {Boolean} <code>true</code> if the backface should be visible.
     */
    setBackfaceVisibility : function(el, value) {
      if (this.__cssKeys != null) {
        el.style[this.__cssKeys["backface-visibility"]] = value ? "visible" : "hidden";
      }
    },


    /**
     * Returns the backface-visibility property of the given element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     * @param el {Element} The dom element to read the property.
     * @return {Boolean} <code>true</code>, if the backface is visible.
     */
    getBackfaceVisibility : function(el) {
      if (this.__cssKeys != null) {
        return el.style[this.__cssKeys["backface-visibility"]] == "visible";
      }
      return true;
    },


    /**
     * Converts the given transforms map to a valid CSS string.
     *
     * @param transforms {Map} A map containing the transforms.
     * @return {String} The CSS transforms.
     */
    getTransformValue : function(transforms) {
      var value = "";
      var properties3d = ["translate", "scale"];

      for (var property in transforms) {
        var params = transforms[property];

        // if an array is given
        if (qx.Bootstrap.isArray(params)) {
          // use 3d properties for translate and scale if all 3 parameter are given
          if (params.length === 3 &&
            properties3d.indexOf(property) > -1 &&
            qx.core.Environment.get("css.transform.3d")
          ) {
            value += this._compute3dProperty(property, params);
          }

          // use axis related properties
          else {
            value += this._computeAxisProperties(property, params);
          }

        // case for single values given
        } else {
          // single value case
          value += property + "(" + params + ") ";
        }
      }

      return value.trim();
    },


    /**
     * Helper function to create 3d property.
     *
     * @param property {String} Property of transform, e.g. translate
     * @param params {Array} Array with three values, each one stands for an axis.
     *
     * @return {String} Computed property and its value
     */
    _compute3dProperty : function(property, params)
    {
      var cssValue = "";
      property += "3d";

      for (var i=0; i < params.length; i++) {
        if (params[i] == null) {
          params[i] = 0;
        }
      }

      cssValue += property + "(" + params.join(", ") + ") ";

      return cssValue;
    },


    /**
     * Helper function to create axis related properties.
     *
     * @param property {String} Property of transform, e.g. rotate
     * @param params {Array} Array with values, each one stands for an axis.
     *
     * @return {String} Computed property and its value
     */
    _computeAxisProperties : function(property, params)
    {
      var value = "";
      var dimensions = ["X", "Y", "Z"];
      for (var i=0; i < params.length; i++) {
        if (params[i] == null ||
          (i == 2 && !qx.core.Environment.get("css.transform.3d"))) {
          continue;
        }
        value += property + dimensions[i] + "(";
        value += params[i];
        value += ") ";
      }

      return value;
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Christian Hagendorn (cs)

************************************************************************ */

/**
 * Methods to convert colors between different color spaces.
 *
 * @ignore(qx.theme.*)
 * @ignore(qx.Class)
 * @ignore(qx.Class.*)
 */
qx.Bootstrap.define("qx.util.ColorUtil",
{
  statics :
  {
    /**
     * Regular expressions for color strings
     */
    REGEXP :
    {
      hex3 : /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6 : /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      rgb : /^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,
      rgba : /^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/
    },


    /**
     * CSS3 system color names.
     */
    SYSTEM :
    {
      activeborder        : true,
      activecaption       : true,
      appworkspace        : true,
      background          : true,
      buttonface          : true,
      buttonhighlight     : true,
      buttonshadow        : true,
      buttontext          : true,
      captiontext         : true,
      graytext            : true,
      highlight           : true,
      highlighttext       : true,
      inactiveborder      : true,
      inactivecaption     : true,
      inactivecaptiontext : true,
      infobackground      : true,
      infotext            : true,
      menu                : true,
      menutext            : true,
      scrollbar           : true,
      threeddarkshadow    : true,
      threedface          : true,
      threedhighlight     : true,
      threedlightshadow   : true,
      threedshadow        : true,
      window              : true,
      windowframe         : true,
      windowtext          : true
    },


    /**
     * Named colors, only the 16 basic colors plus the following ones:
     * transparent, grey, magenta, orange and brown
     */
    NAMED :
    {
      black       : [ 0, 0, 0 ],
      silver      : [ 192, 192, 192 ],
      gray        : [ 128, 128, 128 ],
      white       : [ 255, 255, 255 ],
      maroon      : [ 128, 0, 0 ],
      red         : [ 255, 0, 0 ],
      purple      : [ 128, 0, 128 ],
      fuchsia     : [ 255, 0, 255 ],
      green       : [ 0, 128, 0 ],
      lime        : [ 0, 255, 0 ],
      olive       : [ 128, 128, 0 ],
      yellow      : [ 255, 255, 0 ],
      navy        : [ 0, 0, 128 ],
      blue        : [ 0, 0, 255 ],
      teal        : [ 0, 128, 128 ],
      aqua        : [ 0, 255, 255 ],

      // Additional values
      transparent : [ -1, -1, -1 ],
      magenta     : [ 255, 0, 255 ],   // alias for fuchsia
      orange      : [ 255, 165, 0 ],
      brown       : [ 165, 42, 42 ]
    },


    /**
     * Whether the incoming value is a named color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a named color
     */
    isNamedColor : function(value) {
      return this.NAMED[value] !== undefined;
    },


    /**
     * Whether the incoming value is a system color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a system color
     */
    isSystemColor : function(value) {
      return this.SYSTEM[value] !== undefined;
    },


    /**
     * Whether the color theme manager is loaded. Generally
     * part of the GUI of qooxdoo.
     *
     * @return {Boolean} <code>true</code> when color theme support is ready.
     **/
    supportsThemes : function() {
      if (qx.Class) {
        return qx.Class.isDefined("qx.theme.manager.Color");
      }
      return false;
    },


    /**
     * Whether the incoming value is a themed color.
     *
     * @param value {String} the color value to test
     * @return {Boolean} true if the color is a themed color
     */
    isThemedColor : function(value)
    {
      if (!this.supportsThemes()) {
        return false;
      }

      if (qx.theme && qx.theme.manager && qx.theme.manager.Color) {
        return qx.theme.manager.Color.getInstance().isDynamic(value);
      }
      return false;
    },


    /**
     * Try to convert an incoming string to an RGB array.
     * Supports themed, named and system colors, but also RGB strings,
     * hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {Array} returns an array of red, green, blue on a successful transformation
     * @throws {Error} if the string could not be parsed
     */
    stringToRgb : function(str)
    {
      if (this.supportsThemes() && this.isThemedColor(str)) {
        str = qx.theme.manager.Color.getInstance().resolveDynamic(str);
      }

      if (this.isNamedColor(str))
      {
        return this.NAMED[str].concat();
      }
      else if (this.isSystemColor(str))
      {
        throw new Error("Could not convert system colors to RGB: " + str);
      }
      else if (this.isRgbaString(str)) {
        return this.__rgbaStringToRgb(str);
      }
      else if (this.isRgbString(str))
      {
        return this.__rgbStringToRgb();
      }
      else if (this.isHex3String(str))
      {
        return this.__hex3StringToRgb();
      }
      else if (this.isHex6String(str))
      {
        return this.__hex6StringToRgb();
      }

      throw new Error("Could not parse color: " + str);
    },


    /**
     * Try to convert an incoming string to an RGB array.
     * Support named colors, RGB strings, hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {Array} returns an array of red, green, blue on a successful transformation
     * @throws {Error} if the string could not be parsed
     */
    cssStringToRgb : function(str)
    {
      if (this.isNamedColor(str))
      {
        return this.NAMED[str];
      }
      else if (this.isSystemColor(str))
      {
        throw new Error("Could not convert system colors to RGB: " + str);
      }
      else if (this.isRgbString(str))
      {
        return this.__rgbStringToRgb();
      }
      else if (this.isRgbaString(str))
      {
        return this.__rgbaStringToRgb();
      }
      else if (this.isHex3String(str))
      {
        return this.__hex3StringToRgb();
      }
      else if (this.isHex6String(str))
      {
        return this.__hex6StringToRgb();
      }

      throw new Error("Could not parse color: " + str);
    },


    /**
     * Try to convert an incoming string to an RGB string, which can be used
     * for all color properties.
     * Supports themed, named and system colors, but also RGB strings,
     * hex3 and hex6 values.
     *
     * @param str {String} any string
     * @return {String} a RGB string
     * @throws {Error} if the string could not be parsed
     */
    stringToRgbString : function(str) {
      return this.rgbToRgbString(this.stringToRgb(str));
    },


    /**
     * Converts a RGB array to an RGB string
     *
     * @param rgb {Array} an array with red, green and blue values and optionally
     * an alpha value
     * @return {String} an RGB string
     */
    rgbToRgbString : function(rgb) {
      return "rgb" + (rgb[3] !== undefined ? "a" : "") +  "(" + rgb.join(",") + ")";
    },


    /**
     * Converts a RGB array to an hex6 string
     *
     * @param rgb {Array} an array with red, green and blue
     * @return {String} a hex6 string (#xxxxxx)
     */
    rgbToHexString : function(rgb)
    {
      return (
        "#" +
        qx.lang.String.pad(rgb[0].toString(16).toUpperCase(), 2) +
        qx.lang.String.pad(rgb[1].toString(16).toUpperCase(), 2) +
        qx.lang.String.pad(rgb[2].toString(16).toUpperCase(), 2)
      );
    },


    /**
     * Detects if a string is a valid qooxdoo color
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid qooxdoo color
     */
    isValidPropertyValue : function(str) {
      return (
        this.isThemedColor(str) ||
        this.isNamedColor(str) ||
        this.isHex3String(str) ||
        this.isHex6String(str) ||
        this.isRgbString(str) ||
        this.isRgbaString(str));
    },


    /**
     * Detects if a string is a valid CSS color string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid CSS color string
     */
    isCssString : function(str) {
      return (
        this.isSystemColor(str) ||
        this.isNamedColor(str) ||
        this.isHex3String(str) ||
        this.isHex6String(str) ||
        this.isRgbString(str) ||
        this.isRgbaString(str));
    },


    /**
     * Detects if a string is a valid hex3 string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid hex3 string
     */
    isHex3String : function(str) {
      return this.REGEXP.hex3.test(str);
    },


    /**
     * Detects if a string is a valid hex6 string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid hex6 string
     */
    isHex6String : function(str) {
      return this.REGEXP.hex6.test(str);
    },


    /**
     * Detects if a string is a valid RGB string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid RGB string
     */
    isRgbString : function(str) {
      return this.REGEXP.rgb.test(str);
    },


    /**
     * Detects if a string is a valid RGBA string
     *
     * @param str {String} any string
     * @return {Boolean} true when the incoming value is a valid RGBA string
     */
    isRgbaString : function(str) {
      return this.REGEXP.rgba.test(str);
    },


    /**
     * Converts a regexp object match of a rgb string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __rgbStringToRgb : function()
    {
      var red = parseInt(RegExp.$1, 10);
      var green = parseInt(RegExp.$2, 10);
      var blue = parseInt(RegExp.$3, 10);

      return [red, green, blue];
    },

   /**
    * Converts a regexp object match of a rgba string to an RGB array.
    *
    * @return {Array} an array with red, green, blue
    */
    __rgbaStringToRgb : function()
    {
      var red = parseInt(RegExp.$1, 10);
      var green = parseInt(RegExp.$2, 10);
      var blue = parseInt(RegExp.$3, 10);
      var alpha = parseFloat(RegExp.$4, 10);

      if (red === 0 && green === 0 & blue === 0 && alpha === 0) {
        return [-1, -1, -1];
      }

      return [red, green, blue];
    },


    /**
     * Converts a regexp object match of a hex3 string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __hex3StringToRgb : function()
    {
      var red = parseInt(RegExp.$1, 16) * 17;
      var green = parseInt(RegExp.$2, 16) * 17;
      var blue = parseInt(RegExp.$3, 16) * 17;

      return [red, green, blue];
    },


    /**
     * Converts a regexp object match of a hex6 string to an RGB array.
     *
     * @return {Array} an array with red, green, blue
     */
    __hex6StringToRgb : function()
    {
      var red = (parseInt(RegExp.$1, 16) * 16) + parseInt(RegExp.$2, 16);
      var green = (parseInt(RegExp.$3, 16) * 16) + parseInt(RegExp.$4, 16);
      var blue = (parseInt(RegExp.$5, 16) * 16) + parseInt(RegExp.$6, 16);

      return [red, green, blue];
    },


    /**
     * Converts a hex3 string to an RGB array
     *
     * @param value {String} a hex3 (#xxx) string
     * @return {Array} an array with red, green, blue
     */
    hex3StringToRgb : function(value)
    {
      if (this.isHex3String(value)) {
        return this.__hex3StringToRgb(value);
      }

      throw new Error("Invalid hex3 value: " + value);
    },


    /**
     * Converts a hex3 (#xxx) string to a hex6 (#xxxxxx) string.
     *
     * @param value {String} a hex3 (#xxx) string
     * @return {String} The hex6 (#xxxxxx) string or the passed value when the
     *   passed value is not an hex3 (#xxx) value.
     */
    hex3StringToHex6String : function(value)
    {
      if (this.isHex3String(value)) {
        return this.rgbToHexString(this.hex3StringToRgb(value));
      }
      return value;
    },


    /**
     * Converts a hex6 string to an RGB array
     *
     * @param value {String} a hex6 (#xxxxxx) string
     * @return {Array} an array with red, green, blue
     */
    hex6StringToRgb : function(value)
    {
      if (this.isHex6String(value)) {
        return this.__hex6StringToRgb(value);
      }

      throw new Error("Invalid hex6 value: " + value);
    },


    /**
     * Converts a hex string to an RGB array
     *
     * @param value {String} a hex3 (#xxx) or hex6 (#xxxxxx) string
     * @return {Array} an array with red, green, blue
     */
    hexStringToRgb : function(value)
    {
      if (this.isHex3String(value)) {
        return this.__hex3StringToRgb(value);
      }

      if (this.isHex6String(value)) {
        return this.__hex6StringToRgb(value);
      }

      throw new Error("Invalid hex value: " + value);
    },


    /**
     * Convert RGB colors to HSB
     *
     * @param rgb {Number[]} red, blue and green as array
     * @return {Array} an array with hue, saturation and brightness
     */
    rgbToHsb : function(rgb)
    {
      var hue, saturation, brightness;

      var red = rgb[0];
      var green = rgb[1];
      var blue = rgb[2];

      var cmax = (red > green) ? red : green;

      if (blue > cmax) {
        cmax = blue;
      }

      var cmin = (red < green) ? red : green;

      if (blue < cmin) {
        cmin = blue;
      }

      brightness = cmax / 255.0;

      if (cmax != 0) {
        saturation = (cmax - cmin) / cmax;
      } else {
        saturation = 0;
      }

      if (saturation == 0)
      {
        hue = 0;
      }
      else
      {
        var redc = (cmax - red) / (cmax - cmin);
        var greenc = (cmax - green) / (cmax - cmin);
        var bluec = (cmax - blue) / (cmax - cmin);

        if (red == cmax) {
          hue = bluec - greenc;
        } else if (green == cmax) {
          hue = 2.0 + redc - bluec;
        } else {
          hue = 4.0 + greenc - redc;
        }

        hue = hue / 6.0;

        if (hue < 0) {
          hue = hue + 1.0;
        }
      }

      return [ Math.round(hue * 360), Math.round(saturation * 100), Math.round(brightness * 100) ];
    },


    /**
     * Convert HSB colors to RGB
     *
     * @param hsb {Number[]} an array with hue, saturation and brightness
     * @return {Integer[]} an array with red, green, blue
     */
    hsbToRgb : function(hsb)
    {
      var i, f, p, r, t;

      var hue = hsb[0] / 360;
      var saturation = hsb[1] / 100;
      var brightness = hsb[2] / 100;

      if (hue >= 1.0) {
        hue %= 1.0;
      }

      if (saturation > 1.0) {
        saturation = 1.0;
      }

      if (brightness > 1.0) {
        brightness = 1.0;
      }

      var tov = Math.floor(255 * brightness);
      var rgb = {};

      if (saturation == 0.0)
      {
        rgb.red = rgb.green = rgb.blue = tov;
      }
      else
      {
        hue *= 6.0;

        i = Math.floor(hue);

        f = hue - i;

        p = Math.floor(tov * (1.0 - saturation));
        r = Math.floor(tov * (1.0 - (saturation * f)));
        t = Math.floor(tov * (1.0 - (saturation * (1.0 - f))));

        switch(i)
        {
          case 0:
            rgb.red = tov;
            rgb.green = t;
            rgb.blue = p;
            break;

          case 1:
            rgb.red = r;
            rgb.green = tov;
            rgb.blue = p;
            break;

          case 2:
            rgb.red = p;
            rgb.green = tov;
            rgb.blue = t;
            break;

          case 3:
            rgb.red = p;
            rgb.green = r;
            rgb.blue = tov;
            break;

          case 4:
            rgb.red = t;
            rgb.green = p;
            rgb.blue = tov;
            break;

          case 5:
            rgb.red = tov;
            rgb.green = p;
            rgb.blue = r;
            break;
        }
      }

      return [rgb.red, rgb.green, rgb.blue];
    },


    /**
     * Creates a random color.
     *
     * @return {String} a valid qooxdoo/CSS rgb color string.
     */
    randomColor : function()
    {
      var r = Math.round(Math.random() * 255);
      var g = Math.round(Math.random() * 255);
      var b = Math.round(Math.random() * 255);

      return this.rgbToRgbString([r, g, b]);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The part loader knows about all generated packages and parts.
 *
 * It contains functionality to load parts and to retrieve part instances.
 */
qx.Class.define("qx.io.PartLoader",
{
  type : "singleton",
  extend : qx.core.Object,


  construct : function()
  {
    this.base(arguments);


    var loader = this._loader = qx.Part.getInstance();

    var self = this;
    loader.onpart = function(part) {
      if (part.getReadyState() == "complete") {
        self.fireDataEvent("partLoaded", part);
      } else {
        self.fireDataEvent("partLoadingError", part.getName());
      }
    };
  },


  events :
  {
    /**
     * Fired if a parts was loaded. The data of the event instance point to the
     * loaded part instance.
     */
    "partLoaded" : "qx.event.type.Data",

    /**
     * Fired if a part could not be loaded. The event's
     * {@link qx.event.type.Data#getData} method returns the name of the failed
     * part.
     */
    "partLoadingError" : "qx.event.type.Data"
  },


  statics :
  {
    /**
     * Loads one or more parts asynchronously. The callback is called after all
     * parts and their dependencies are fully loaded. If the parts are already
     * loaded the callback is called immediately.
     *
     * @param partNames {String[]} List of parts names to load as defined in the
     *    config file at compile time.
     * @param callback {Function} Function to execute on completion.
     *   The function has one parameter which is an array of ready states of
     *   the parts specified in the partNames argument.
     * @param self {Object?window} Context to execute the given function in
     */
    require : function(partNames, callback, self) {
      this.getInstance().require(partNames, callback, self);
    }
  },


  members :
  {
    /**
     * Loads one or more parts asynchronously. The callback is called after all
     * parts and their dependencies are fully loaded. If the parts are already
     * loaded the callback is called immediately.
     *
     * @param partNames {String|String[]} List of parts names to load as defined
     *    in the config file at compile time. The method also accepts a single
     *    string as parameter to only load one part.
     * @param callback {Function} Function to execute on completion
     * @param self {Object?window} Context to execute the given function in
     */
    require : function(partNames, callback, self) {
      this._loader.require(partNames, callback, self);
    },


    /**
     * Get the part instance of the part with the given name.
     *
     * @param name {String} Name of the part as defined in the config file at
     *    compile time.
     * @return {qx.io.part.Part} The corresponding part instance
     */
    getPart : function(name) {
      return this.getParts()[name];
    },


    /**
     * Checks if a part with the given name is available.
     * @param name {String} Name of the part as defined in the config file at
     *    compile time.
     * @return {Boolean} <code>true</code>, if the part is available
     */
    hasPart : function(name) {
      return this.getPart(name) !== undefined;
    },


    /**
     * Returns a map of all known parts.
     * @return {Map} Map containing all parts.
     */
    getParts : function() {
      return this._loader.getParts();
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The part loader knows about all generated packages and parts.
 *
 * It contains functionality to load parts.
 */
qx.Bootstrap.define("qx.Part",
{
  // !! Careful when editing this file. Do not extend the dependencies !!

  /**
   * @param loader {Object} The data structure from the boot script about all
   *   known parts and packages. Usually <code>qx.$$loader</code>.
   */
  construct : function(loader)
  {
    // assert: boot part has a single package
    var bootPackageKey = loader.parts[loader.boot][0];

    this.__loader = loader;

    // initialize the pseudo event listener maps
    this.__partListners = {};
    this.__packageListeners = {};
    this.__packageClosureListeners = {};

    // create the packages
    this.__packages = {};
    for (var key in loader.packages)
    {
      var pkg = new qx.io.part.Package(
        this.__decodeUris(loader.packages[key].uris), key, key==bootPackageKey
      );
      this.__packages[key] = pkg;
    };

    // create the parts
    this.__parts = {};
    var parts = loader.parts;
    var closureParts = loader.closureParts || {};

    for (var name in parts)
    {
      var pkgKeys = parts[name];
      var packages = [];
      for (var i = 0; i < pkgKeys.length; i++) {
        packages.push(this.__packages[pkgKeys[i]]);
      }

      // check for closure loading
      if (closureParts[name]) {
        var part = new qx.io.part.ClosurePart(name, packages, this);
      } else {
        var part = new qx.io.part.Part(name, packages, this);
      }

      this.__parts[name] = part;
    }
  },


  statics :
  {
    /**
     * Default timeout in ms for the error handling of the closure loading.
     */
    TIMEOUT : 7500,


    /**
     * Get the default part loader instance
     *
     * @return {qx.Part} the default part loader
     */
    getInstance : function()
    {
      if (!this.$$instance) {
        this.$$instance = new this(qx.$$loader);
      }
      return this.$$instance;
    },


    /**
     * Loads one or more parts asynchronously. The callback is called after all
     * parts and their dependencies are fully loaded. If the parts are already
     * loaded the callback is called immediately.
     *
     * @param partNames {String[]} List of parts names to load as defined in the
     *    config file at compile time.
     * @param callback {Function} Function to execute on completion
     * @param self {Object?window} Context to execute the given function in
     */
    require : function(partNames, callback, self) {
      this.getInstance().require(partNames, callback, self);
    },


    /**
     * Preloads one or more closure parts but does not execute them. This means
     * the closure (the whole code of the part) is already loaded but not
     * executed so you can't use the classes in the the part after a preload.
     * If you want to execute them, just use the regular {@link #require}
     * function.
     *
     * @param partNames {String[]} List of parts names to preload as defined
     *   in the config file at compile time.
     */
    preload : function(partNames) {
      this.getInstance().preload(partNames);
    },


    /**
     * Loaded closure packages have to call this method to indicate
     * successful loading and to get their closure stored.
     *
     * @param id {String} The id of the package.
     * @param closure {Function} The wrapped code of the package.
     */
    $$notifyLoad : function(id, closure) {
      this.getInstance().saveClosure(id, closure);
    }
  },


  members :
  {
    __loader : null,
    __packages : null,
    __parts : null,
    __packageClosureListeners : null,


    /**
     * This method is only for testing purposes! Don't use it!
     *
     * @internal
     * @param pkg {qx.io.part.Package} The package to add to the internal
     *   registry of packages.
     */
    addToPackage : function(pkg) {
      this.__packages[pkg.getId()] = pkg;
    },


    /**
     * Internal helper method to save the closure and notify that the load.
     *
     * @internal
     * @param id {String} The hash of the package.
     * @param closure {Function} The code of the package wrappen into a closure.
     */
    saveClosure : function(id, closure)
    {
      // search for the package
      var pkg = this.__packages[id];

      // error if no package could be found
      if (!pkg) {
        throw new Error("Package not available: " + id);
      }

      // save the closure in the package itself
      pkg.saveClosure(closure);

      // call the listeners
      var listeners = this.__packageClosureListeners[id];
      if (!listeners) {
        return;
      }
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]("complete", id);
      }
      // get rid of all closure package listeners for that package
      this.__packageClosureListeners[id] = [];
    },


    /**
     * Internal method for testing purposes which returns the internal parts
     * store.
     *
     * @internal
     * @return {Array} An array of parts.
     */
    getParts : function() {
      return this.__parts;
    },


    /**
     * Loads one or more parts asynchronously. The callback is called after all
     * parts and their dependencies are fully loaded. If the parts are already
     * loaded the callback is called immediately.
     *
     * @param partNames {String|String[]} List of parts names to load as defined
     *   in the config file at compile time. The method also accepts a single
     *   string as parameter to only load one part.
     * @param callback {Function} Function to execute on completion.
     *   The function has one parameter which is an array of ready states of
     *   the parts specified in the partNames argument.
     * @param self {Object?window} Context to execute the given function in
     */
    require : function(partNames, callback, self)
    {
      var callback = callback || function() {};
      var self = self || window;

      if (qx.Bootstrap.isString(partNames)) {
        partNames = [partNames];
      }

      var parts = [];
      for (var i=0; i<partNames.length; i++) {
        var part = this.__parts[partNames[i]];
        if (part === undefined) {
          var registeredPartNames = qx.Bootstrap.keys(this.getParts());
          throw new Error('Part "' + partNames[i] + '" not found in parts (' +
            registeredPartNames.join(', ') + ')');
        } else {
          parts.push(part);
        }
      }

      var partsLoaded = 0;
      var onLoad = function() {
        partsLoaded += 1;
        // done?
        if (partsLoaded >= parts.length) {
          // gather the ready states of the parts
          var states = [];
          for (var i = 0; i < parts.length; i++) {
            states.push(parts[i].getReadyState());
          }
          callback.call(self, states);
        }
      };

      for (var i=0; i<parts.length; i++) {
        parts[i].load(onLoad, this);
      }
    },


    /**
     * Preloader for the given part.
     *
     * @param partNames {String} The hash of the part to preload.
     * @param callback {Function} Function to execute on completion.
     *   The function has one parameter which is an array of ready states of
     *   the parts specified in the partNames argument.
     * @param self {Object?window} Context to execute the given function in
     */
    preload : function(partNames, callback, self)
    {
      if (qx.Bootstrap.isString(partNames)) {
        partNames = [partNames];
      }

      var partsPreloaded = 0;
      for (var i=0; i<partNames.length; i++) {

        this.__parts[partNames[i]].preload(function() {
          partsPreloaded++;

          if (partsPreloaded >= partNames.length) {
            // gather the ready states of the parts
            var states = [];
            for (var i = 0; i < partNames.length; i++) {
              states.push(this.__parts[partNames[i]].getReadyState());
            };
            if (callback) {
              callback.call(self, states);
            }
          };
        }, this);
      }
    },


    /**
     * Get the URI lists of all packages
     *
     * @return {String[][]} Array of URI lists for each package
     */
    __getUris : function()
    {
      var packages = this.__loader.packages;
      var uris = [];
      for (var key in packages) {
        uris.push(this.__decodeUris(packages[key].uris));
      }
      return uris;
    },


    /**
     * Decodes a list of source URIs. The function is defined in the loader
     * script.
     *
     * @signature function(compressedUris)
     * @param compressedUris {String[]} Array of compressed URIs
     * @return {String[]} decompressed URIs
     */
    __decodeUris : qx.$$loader.decodeUris,


    /*
    ---------------------------------------------------------------------------
      PART
    ---------------------------------------------------------------------------
    */

    __partListners : null,


    /**
     * Register callback, which is called after the given part has been loaded
     * or fails with an error. After the call the listener is removed.
     *
     * @internal
     *
     * @param part {Object} Part to load
     * @param callback {Object} the listener
     */
    addPartListener : function(part, callback)
    {
      var key = part.getName();
      if (!this.__partListners[key]) {
        this.__partListners[key] = [];
      }
      this.__partListners[key].push(callback);
    },


    /**
     * If defined this method is called after each part load.
     */
    onpart : null,


    /**
     * This method is called after a part has been loaded or failed to load.
     * It calls all listeners for this part.
     *
     * @internal
     * @param part {Object} The loaded part
     */
    notifyPartResult : function(part)
    {
      var key = part.getName();

      var listeners = this.__partListners[key];
      if (listeners)
      {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](part.getReadyState());
        }
        this.__partListners[key] = [];
      }

      if (typeof this.onpart === "function") {
        this.onpart(part);
      }
    },


    /*
    ---------------------------------------------------------------------------
      PACKAGE
    ---------------------------------------------------------------------------
    */

    __packageListeners : null,


    /**
     * Register callback, which is called after the given package has been loaded
     * or fails with an error. After the call the listener is removed.
     *
     * @internal
     *
     * @param pkg {Object} Package to load
     * @param callback {Object} the listener
     */
    addPackageListener : function(pkg, callback)
    {
      var key = pkg.getId();
      if (!this.__packageListeners[key]) {
        this.__packageListeners[key] = [];
      }
      this.__packageListeners[key].push(callback);
    },


    /**
     * This method is called after a packages has been loaded or failed to load.
     * It calls all listeners for this package.
     *
     * @internal
     * @param pkg {Object} The loaded package
     */
    notifyPackageResult : function(pkg)
    {
      var key = pkg.getId();

      var listeners = this.__packageListeners[key];
      if (!listeners) {
        return;
      }
      for (var i=0; i<listeners.length; i++) {
        listeners[i](pkg.getReadyState());
      }
      this.__packageListeners[key] = [];
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The Package wraps a list of related script URLs, which are required by one
 * or more parts.
 *
 * @internal
 * @ignore(qx.util.ResourceManager)
 */
qx.Bootstrap.define("qx.io.part.Package",
{
  /**
   * @param urls {String[]} A list of script URLs
   * @param id {var} Unique package hash key
   * @param loaded {Boolean?false} Whether the package is already loaded
   */
  construct : function(urls, id, loaded)
  {
    this.__readyState = loaded ? "complete" : "initialized";
    this.__urls = urls;
    this.__id = id;
  },


  members :
  {
    __readyState : null,
    __urls : null,
    __id : null,
    __closure : null,
    __loadWithClosure : null,
    __timeoutId : null,
    __notifyPackageResult : null,


    /**
     * Get the package ID.
     *
     * @return {String} The package id
     */
    getId : function() {
      return this.__id;
    },


    /**
     * Get the ready state of the package. The value is one of
     * <ul>
     * <li>
     *   <b>initialized</b>: The package is initialized. The {@link #load}
     *   method has not yet been called
     * </li>
     * <li><b>loading</b>: The package is still loading.</li>
     * <li><b>complete</b>: The package has been loaded successfully</li>
     * <li><b>cached</b>: The package is loaded but is not executed
     *   (for closure parts)</li>
     * </li>
     *
     * @return {String} The ready state.
     */
    getReadyState : function() {
      return this.__readyState;
    },


    /**
     * Returns the urlsstored stored in the package.
     *
     * @internal
     * @return {String[]} An array of urls of this package.
     */
    getUrls : function() {
      return this.__urls;
    },


    /**
     * Method for storing the closure for this package. This is only relevant
     * if a {@link qx.io.part.ClosurePart} is used.
     *
     * @param closure {Function} The code of this package wrapped in a closure.
     */
    saveClosure : function(closure)
    {
      if (this.__readyState == "error") {
        return;
      }

      this.__closure = closure;

      if (!this.__loadWithClosure) {
        this.execute();
      } else {
        clearTimeout(this.__timeoutId);
        this.__readyState = "cached";
        this.__notifyPackageResult(this);
      }
    },


    /**
     * Executes the stored closure. This is only relevant if a
     * {@link qx.io.part.ClosurePart} is used.
     */
    execute : function()
    {
      if (this.__closure)
      {
        this.__closure();
        delete this.__closure;
      }

      if (qx.$$packageData[this.__id])
      {
        this.__importPackageData(qx.$$packageData[this.__id]);
        delete qx.$$packageData[this.__id];
      }
      this.__readyState = "complete";
    },


    /**
     * Load method if the package loads a closure. This is only relevant if a
     * {@link qx.io.part.ClosurePart} is used.
     *
     * @param notifyPackageResult {Function} The callback if all scripts are
     *   done loading in this package.
     * @param self {Object?} The context of the callback.
     */
    loadClosure : function(notifyPackageResult, self)
    {
      if (this.__readyState !== "initialized") {
        return;
      }

      this.__loadWithClosure = true;

      this.__readyState = "loading";

      this.__notifyPackageResult = qx.Bootstrap.bind(notifyPackageResult, self);

      this.__loadScriptList(
        this.__urls,
        function() {},
        function() {
          this.__readyState = "error";
          notifyPackageResult.call(self, this);
        },
        this
      );

      var pkg = this;
      this.__timeoutId = setTimeout(function() {
        pkg.__readyState = "error";
        notifyPackageResult.call(self, pkg);
      }, qx.Part.TIMEOUT);
    },


    /**
     * Load the part's script URLs in the correct order.
     *
     * @param notifyPackageResult {Function} The callback if all scripts are
     *   done loading in this package.
     * @param self {Object?} The context of the callback.
     */
    load : function(notifyPackageResult, self)
    {
      if (this.__readyState !== "initialized") {
        return;
      }

      this.__loadWithClosure = false;

      this.__readyState = "loading";

      this.__loadScriptList(
        this.__urls,
        function() {
          this.__readyState = "complete";
          this.execute();
          notifyPackageResult.call(self, this);
        },
        function() {
          this.__readyState = "error";
          notifyPackageResult.call(self, this);
        },
        this
      );
    },


    /**
     * Loads a list of scripts in the correct order.
     *
     * @param urlList {String[]} List of script urls
     * @param callback {Function} Function to execute on completion
     * @param errBack {Function} Function to execute on error
     * @param self {Object?window} Context to execute the given function in
     */
    __loadScriptList : function(urlList, callback, errBack, self)
    {
      if (urlList.length == 0)
      {
        callback.call(self);
        return;
      }

      var urlsLoaded = 0;
      var self = this;
      var loadScripts = function(urls)
      {
        if (urlsLoaded >= urlList.length)
        {
          callback.call(self);
          return;
        }

        var loader = new qx.bom.request.Script();
        loader.open("GET", urls.shift());

        loader.onload = function()
        {
          urlsLoaded += 1;
          loader.dispose();

          // Important to use engine detection directly to keep the minimal
          // package size small [BUG #5068]
          if ((qx.bom.client.Engine.getName() == "webkit"))
          {
            // force asynchronous load
            // Safari fails with an "maximum recursion depth exceeded" error if it is
            // called sync.
            setTimeout(function()
            {
              loadScripts.call(self, urls, callback, self);
            }, 0);
          }
          else
          {
            loadScripts.call(self, urls, callback, self);
          }
        };

        loader.onerror = function() {
          if (self.__readyState == "loading") {
            clearTimeout(self.__timeoutId);
            loader.dispose();
            return errBack.call(self);
          }
        };

        // Force loading script asynchronously (IE may load synchronously)
        window.setTimeout(function() {
          loader.send();
        });
      };

      loadScripts(urlList.concat());
    },


    /**
     * Import the data of a package. The function is defined in the loader
     * script.
     *
     * @signature function(packageData)
     * @param packageData {Map} Map of package data categories ("resources",...)
     */
    __importPackageData : qx.$$loader.importPackageData
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/**
 * Script loader with interface similar to
 * <a href="http://www.w3.org/TR/XMLHttpRequest/">XmlHttpRequest</a>.
 *
 * The script loader can be used to load scripts from arbitrary sources.
 * <span class="desktop">
 * For JSONP requests, consider the {@link qx.bom.request.Jsonp} transport
 * that derives from the script loader.
 * </span>
 *
 * <div class="desktop">
 * Example:
 *
 * <pre class="javascript">
 *  var req = new qx.bom.request.Script();
 *  req.onload = function() {
 *    // Script is loaded and parsed and
 *    // globals set are available
 *  }
 *
 *  req.open("GET", url);
 *  req.send();
 * </pre>
 * </div>
 *
 * @ignore(qx.core, qx.core.Environment.*)
 * @require(qx.bom.request.Script#_success)
 * @require(qx.bom.request.Script#abort)
 * @require(qx.bom.request.Script#dispose)
 * @require(qx.bom.request.Script#isDisposed)
 * @require(qx.bom.request.Script#getAllResponseHeaders)
 * @require(qx.bom.request.Script#getResponseHeader)
 * @require(qx.bom.request.Script#setDetermineSuccess)
 * @require(qx.bom.request.Script#setRequestHeader)
 *
 * @group (IO)
 */

qx.Bootstrap.define("qx.bom.request.Script",
{
	implement: [ qx.core.IDisposable ],

  construct : function()
  {
    this.__initXhrProperties();

    this.__onNativeLoadBound = qx.Bootstrap.bind(this._onNativeLoad, this);
    this.__onNativeErrorBound = qx.Bootstrap.bind(this._onNativeError, this);
    this.__onTimeoutBound = qx.Bootstrap.bind(this._onTimeout, this);

    this.__headElement = document.head || document.getElementsByTagName( "head" )[0] ||
                         document.documentElement;

    this._emitter = new qx.event.Emitter();

    // BUGFIX: Browsers not supporting error handler
    // Set default timeout to capture network errors
    //
    // Note: The script is parsed and executed, before a "load" is fired.
    this.timeout = this.__supportsErrorHandler() ? 0 : 15000;
  },


  events : {
    /** Fired at ready state changes. */
    "readystatechange" : "qx.bom.request.Script",

    /** Fired on error. */
    "error" : "qx.bom.request.Script",

    /** Fired at loadend. */
    "loadend" : "qx.bom.request.Script",

    /** Fired on timeouts. */
    "timeout" : "qx.bom.request.Script",

    /** Fired when the request is aborted. */
    "abort" : "qx.bom.request.Script",

    /** Fired on successful retrieval. */
    "load" : "qx.bom.request.Script"
  },


  members :
  {

    /**
     * @type {Number} Ready state.
     *
     * States can be:
     * UNSENT:           0,
     * OPENED:           1,
     * LOADING:          2,
     * LOADING:          3,
     * DONE:             4
     *
     * Contrary to {@link qx.bom.request.Xhr#readyState}, the script transport
     * does not receive response headers. For compatibility, another LOADING
     * state is implemented that replaces the HEADERS_RECEIVED state.
     */
    readyState: null,

    /**
     * @type {Number} The status code.
     *
     * Note: The script transport cannot determine the HTTP status code.
     */
    status: null,

    /**
     * @type {String} The status text.
     *
     * The script transport does not receive response headers. For compatibility,
     * the statusText property is set to the status casted to string.
     */
    statusText: null,

    /**
     * @type {Number} Timeout limit in milliseconds.
     *
     * 0 (default) means no timeout.
     */
    timeout: null,

    /**
     * @type {Function} Function that is executed once the script was loaded.
     */
    __determineSuccess: null,


    /**
     * Add an event listener for the given event name.
     *
     * @param name {String} The name of the event to listen to.
     * @param listener {Function} The function to execute when the event is fired
     * @param ctx {var?} The context of the listener.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    on: function(name, listener, ctx) {
      this._emitter.on(name, listener, ctx);
      return this;
    },


    /**
     * Initializes (prepares) request.
     *
     * @param method {String}
     *   The HTTP method to use.
     *   This parameter exists for compatibility reasons. The script transport
     *   does not support methods other than GET.
     * @param url {String}
     *   The URL to which to send the request.
     */
    open: function(method, url) {
      if (this.__disposed) {
        return;
      }

      // Reset XHR properties that may have been set by previous request
      this.__initXhrProperties();

      this.__abort = null;
      this.__url = url;

      if (this.__environmentGet("qx.debug.io")) {
        qx.Bootstrap.debug(qx.bom.request.Script, "Open native request with " +
          "url: " + url);
      }

      this._readyStateChange(1);
    },

    /**
     * Appends a query parameter to URL.
     *
     * This method exists for compatibility reasons. The script transport
     * does not support request headers. However, many services parse query
     * parameters like request headers.
     *
     * Note: The request must be initialized before using this method.
     *
     * @param key {String}
     *  The name of the header whose value is to be set.
     * @param value {String}
     *  The value to set as the body of the header.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    setRequestHeader: function(key, value) {
      if (this.__disposed) {
        return null;
      }

      var param = {};

      if (this.readyState !== 1) {
        throw new Error("Invalid state");
      }

      param[key] = value;
      this.__url = qx.util.Uri.appendParamsToUrl(this.__url, param);
      return this;
    },

    /**
     * Sends request.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    send: function() {
      if (this.__disposed) {
        return null;
      }

      var script = this.__createScriptElement(),
          head = this.__headElement,
          that = this;

      if (this.timeout > 0) {
        this.__timeoutId = window.setTimeout(this.__onTimeoutBound, this.timeout);
      }

      if (this.__environmentGet("qx.debug.io")) {
        qx.Bootstrap.debug(qx.bom.request.Script, "Send native request");
      }

      // Attach script to DOM
      head.insertBefore(script, head.firstChild);

      // The resource is loaded once the script is in DOM.
      // Assume HEADERS_RECEIVED and LOADING and dispatch async.
      window.setTimeout(function() {
        that._readyStateChange(2);
        that._readyStateChange(3);
      });
      return this;
    },

    /**
     * Aborts request.
     * @return {qx.bom.request.Script} Self for chaining.
     */
    abort: function() {
      if (this.__disposed) {
        return null;
      }

      this.__abort = true;
      this.__disposeScriptElement();
      this._emit("abort");
      return this;
    },


    /**
     * Helper to emit events and call the callback methods.
     * @param event {String} The name of the event.
     */
    _emit: function(event) {
      this["on" + event]();
      this._emitter.emit(event, this);
    },


    /**
     * Event handler for an event that fires at every state change.
     *
     * Replace with custom method to get informed about the communication progress.
     */
    onreadystatechange: function() {},

    /**
     * Event handler for XHR event "load" that is fired on successful retrieval.
     *
     * Note: This handler is called even when an invalid script is returned.
     *
     * Warning: Internet Explorer < 9 receives a false "load" for invalid URLs.
     * This "load" is fired about 2 seconds after sending the request. To
     * distinguish from a real "load", consider defining a custom check
     * function using {@link #setDetermineSuccess} and query the status
     * property. However, the script loaded needs to have a known impact on
     * the global namespace. If this does not work for you, you may be able
     * to set a timeout lower than 2 seconds, depending on script size,
     * complexity and execution time.
     *
     * Replace with custom method to listen to the "load" event.
     */
    onload: function() {},

    /**
     * Event handler for XHR event "loadend" that is fired on retrieval.
     *
     * Note: This handler is called even when a network error (or similar)
     * occurred.
     *
     * Replace with custom method to listen to the "loadend" event.
     */
    onloadend: function() {},

    /**
     * Event handler for XHR event "error" that is fired on a network error.
     *
     * Note: Some browsers do not support the "error" event.
     *
     * Replace with custom method to listen to the "error" event.
     */
    onerror: function() {},

    /**
    * Event handler for XHR event "abort" that is fired when request
    * is aborted.
    *
    * Replace with custom method to listen to the "abort" event.
    */
    onabort: function() {},

    /**
    * Event handler for XHR event "timeout" that is fired when timeout
    * interval has passed.
    *
    * Replace with custom method to listen to the "timeout" event.
    */
    ontimeout: function() {},

    /**
     * Get a single response header from response.
     *
     * Note: This method exists for compatibility reasons. The script
     * transport does not receive response headers.
     *
     * @param key {String}
     *  Key of the header to get the value from.
     * @return {String|null} Warning message or <code>null</code> if the request
     * is disposed
     */
    getResponseHeader: function(key) {
      if (this.__disposed) {
        return null;
      }

      if (this.__environmentGet("qx.debug")) {
        qx.Bootstrap.debug("Response header cannot be determined for " +
          "requests made with script transport.");
      }
      return "unknown";
    },

    /**
     * Get all response headers from response.
     *
     * Note: This method exists for compatibility reasons. The script
     * transport does not receive response headers.
     * @return {String|null} Warning message or <code>null</code> if the request
     * is disposed
     */
    getAllResponseHeaders: function() {
      if (this.__disposed) {
        return null;
      }

      if (this.__environmentGet("qx.debug")) {
        qx.Bootstrap.debug("Response headers cannot be determined for" +
          "requests made with script transport.");
      }

      return "Unknown response headers";
    },

    /**
     * Determine if loaded script has expected impact on global namespace.
     *
     * The function is called once the script was loaded and must return a
     * boolean indicating if the response is to be considered successful.
     *
     * @param check {Function} Function executed once the script was loaded.
     *
     */
    setDetermineSuccess: function(check) {
      this.__determineSuccess = check;
    },

    /**
     * Dispose object.
     */
    dispose: function() {
      var script = this.__scriptElement;

      if (!this.__disposed) {

        // Prevent memory leaks
        if (script) {
          script.onload = script.onreadystatechange = null;
          this.__disposeScriptElement();
        }

        if (this.__timeoutId) {
          window.clearTimeout(this.__timeoutId);
        }

        this.__disposed = true;
      }
    },


    /**
     * Check if the request has already beed disposed.
     * @return {Boolean} <code>true</code>, if the request has been disposed.
     */
    isDisposed : function() {
      return !!this.__disposed;
    },


    /*
    ---------------------------------------------------------------------------
      PROTECTED
    ---------------------------------------------------------------------------
    */

    /**
     * Get URL of request.
     *
     * @return {String} URL of request.
     */
    _getUrl: function() {
      return this.__url;
    },

    /**
     * Get script element used for request.
     *
     * @return {Element} Script element.
     */
    _getScriptElement: function() {
      return this.__scriptElement;
    },

    /**
     * Handle timeout.
     */
    _onTimeout: function() {
      this.__failure();

      if (!this.__supportsErrorHandler()) {
        this._emit("error");
      }

      this._emit("timeout");

      if (!this.__supportsErrorHandler()) {
        this._emit("loadend");
      }
    },

    /**
     * Handle native load.
     */
    _onNativeLoad: function() {
      var script = this.__scriptElement,
          determineSuccess = this.__determineSuccess,
          that = this;

      // Aborted request must not fire load
      if (this.__abort) {
        return;
      }

      // BUGFIX: IE < 9
      // When handling "readystatechange" event, skip if readyState
      // does not signal loaded script
      if (this.__environmentGet("engine.name") === "mshtml" &&
          this.__environmentGet("browser.documentmode") < 9) {
        if (!(/loaded|complete/).test(script.readyState)) {
          return;
        } else {
          if (this.__environmentGet("qx.debug.io")) {
            qx.Bootstrap.debug(qx.bom.request.Script, "Received native readyState: loaded");
          }
        }
      }

      if (this.__environmentGet("qx.debug.io")) {
        qx.Bootstrap.debug(qx.bom.request.Script, "Received native load");
      }

      // Determine status by calling user-provided check function
      if (determineSuccess) {

        // Status set before has higher precedence
        if (!this.status) {
          this.status = determineSuccess() ? 200 : 500;
        }

      }

      if (this.status === 500) {
        if (this.__environmentGet("qx.debug.io")) {
          qx.Bootstrap.debug(qx.bom.request.Script, "Detected error");
        }
      }

      if (this.__timeoutId) {
        window.clearTimeout(this.__timeoutId);
      }

      window.setTimeout(function() {
        that._success();
        that._readyStateChange(4);
        that._emit("load");
        that._emit("loadend");
      });
    },

    /**
     * Handle native error.
     */
    _onNativeError: function() {
      this.__failure();
      this._emit("error");
      this._emit("loadend");
    },

    /*
    ---------------------------------------------------------------------------
      PRIVATE
    ---------------------------------------------------------------------------
    */

    /**
     * @type {Element} Script element
     */
    __scriptElement: null,

    /**
     * @type {Element} Head element
     */
    __headElement: null,

    /**
     * @type {String} URL
     */
    __url: "",

    /**
     * @type {Function} Bound _onNativeLoad handler.
     */
    __onNativeLoadBound: null,

    /**
     * @type {Function} Bound _onNativeError handler.
     */
    __onNativeErrorBound: null,

    /**
     * @type {Function} Bound _onTimeout handler.
     */
    __onTimeoutBound: null,

    /**
     * @type {Number} Timeout timer iD.
     */
    __timeoutId: null,

    /**
     * @type {Boolean} Whether request was aborted.
     */
    __abort: null,

    /**
     * @type {Boolean} Whether request was disposed.
     */
    __disposed: null,

    /*
    ---------------------------------------------------------------------------
      HELPER
    ---------------------------------------------------------------------------
    */

    /**
     * Initialize properties.
     */
    __initXhrProperties: function() {
      this.readyState = 0;
      this.status = 0;
      this.statusText = "";
    },

    /**
     * Change readyState.
     *
     * @param readyState {Number} The desired readyState
     */
    _readyStateChange: function(readyState) {
      this.readyState = readyState;
      this._emit("readystatechange");
    },

    /**
     * Handle success.
     */
    _success: function() {
      this.__disposeScriptElement();
      this.readyState = 4;

      // By default, load is considered successful
      if (!this.status) {
        this.status = 200;
      }

      this.statusText = "" + this.status;
    },

    /**
     * Handle failure.
     */
    __failure: function() {
      this.__disposeScriptElement();
      this.readyState = 4;
      this.status = 0;
      this.statusText = null;
    },

    /**
     * Looks up whether browser supports error handler.
     *
     * @return {Boolean} Whether browser supports error handler.
     */
    __supportsErrorHandler: function() {
      var isLegacyIe = this.__environmentGet("engine.name") === "mshtml" &&
        this.__environmentGet("browser.documentmode") < 9;

      var isOpera = this.__environmentGet("engine.name") === "opera";

      return !(isLegacyIe || isOpera);
    },

    /**
     * Create and configure script element.
     *
     * @return {Element} Configured script element.
     */
    __createScriptElement: function() {
      var script = this.__scriptElement = document.createElement("script");

      script.src = this.__url;
      script.onerror = this.__onNativeErrorBound;
      script.onload = this.__onNativeLoadBound;

      // BUGFIX: IE < 9
      // Legacy IEs do not fire the "load" event for script elements.
      // Instead, they support the "readystatechange" event
      if (this.__environmentGet("engine.name") === "mshtml" &&
          this.__environmentGet("browser.documentmode") < 9) {
        script.onreadystatechange = this.__onNativeLoadBound;
      }

      return script;
    },

    /**
     * Remove script element from DOM.
     */
    __disposeScriptElement: function() {
      var script = this.__scriptElement;

      if (script && script.parentNode) {
        this.__headElement.removeChild(script);
      }
    },

    /**
     * Proxy Environment.get to guard against env not being present yet.
     *
     * @param key {String} Environment key.
     * @return {var} Value of the queried environment key
     * @lint environmentNonLiteralKey(key)
     */
    __environmentGet: function(key) {
      if (qx && qx.core && qx.core.Environment) {
        return qx.core.Environment.get(key);
      } else {
        if (key === "engine.name") {
          return qx.bom.client.Engine.getName();
        }

        if (key === "browser.documentmode") {
          return qx.bom.client.Browser.getDocumentMode();
        }

        if (key == "qx.debug.io") {
          return false;
        }

        throw new Error("Unknown environment key at this phase");
      }
    }
  },

  defer: function() {
    if (qx && qx.core && qx.core.Environment) {
      qx.core.Environment.add("qx.debug.io", false);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Wrapper for a part as defined in the config file. This class knows about all
 * packages the part depends on and provides functionality to load the part.
 *
 * @internal
 */
qx.Bootstrap.define("qx.io.part.Part",
{
  /**
   * @param name {String} Name of the part as defined in the config file at
   *    compile time.
   * @param packages {qx.io.part.Package[]} List of dependent packages
   * @param loader {qx.Part} The loader of this part.
   */
  construct : function(name, packages, loader)
  {
    this.__name = name;
    this._readyState = "complete";
    this._packages = packages;
    this._loader = loader;

    for (var i=0; i<packages.length; i++)
    {
      if (packages[i].getReadyState() !== "complete")
      {
        this._readyState = "initialized";
        break;
      }
    }
  },


  members :
  {
    _readyState : null,
    _loader : null,
    _packages : null,
    __name : null,


    /**
     * Get the ready state of the part. The value is one of
     * <ul>
     * <li>
     *   <b>initialized</b>: The part is initialized. The {@link #load}
     *   method has not yet been called
     * </li>
     * <li><b>loading</b>: The part is still loading.</li>
     * <li><b>complete</b>: The part has been loaded successfully</li>
     * </li>
     *
     * @return {String} The ready state.
     */
    getReadyState : function() {
      return this._readyState;
    },


    /**
     * The part name as defined in the config file
     *
     * @return {String} The part name
     */
    getName : function() {
      return this.__name;
    },


    /**
     * Internal helper for testing purposes.
     * @internal
     * @return {qx.io.part.Package[]} All contained packages in an array.
     */
    getPackages : function()
    {
      return this._packages;
    },


    /**
     * Method for preloading this part.
     * Empty implementation! Regular parts can not be preloaded.
     *
     * @param callback {Function} Callback for the preload.
     * @param self {Object?} The context of the callback.
     */
    preload : function(callback, self) {
      // Just do nothing because you can not preload regular parts.
      // Also, loading the part here is not a good idea because it could break
      // the load order of the packages if someone uses preload right after
      // loading another part. So we just invoke the callback async.
      if (callback) {
        window.setTimeout(function() {
          callback.call(self, this);
        }, 0);
      }
    },


    /**
     * Loads the part asynchronously. The callback is called after the part and
     * its dependencies are fully loaded. If the part is already loaded the
     * callback is called immediately.
     *
     * @internal
     *
     * @param callback {Function} Function to execute on completion
     * @param self {Object?window} Context to execute the given function in
     */
    load : function(callback, self)
    {
       if (this._checkCompleteLoading(callback, self)) {
         return;
       };

      this._readyState = "loading";

      if (callback) {
        this._appendPartListener(callback, self, this);
      }

      var part = this;
      var onLoad = function() {
        part.load();
      };

      for (var i=0; i<this._packages.length; i++)
      {
        var pkg = this._packages[i];
        switch (pkg.getReadyState())
        {
          case "initialized":
            this._loader.addPackageListener(pkg, onLoad);
            pkg.load(this._loader.notifyPackageResult, this._loader);
            return;

          case "loading":
            this._loader.addPackageListener(pkg, onLoad);
            return;

          case "complete":
            break;

          case "error":
            this._markAsCompleted("error");
            return;

          default:
            throw new Error("Invalid case! " + pkg.getReadyState());
        }
      }

      this._markAsCompleted("complete");
    },


    /**
     * Helper for appending a listener for this part.
     *
     * @param callback {Function} The function to call when the part is loaded.
     * @param self {Object?} The context of the callback.
     * @param part {qx.io.part.Part|qx.io.part.ClosurePart} The part to listen
     *   to.
     */
    _appendPartListener : function(callback, self, part)
    {
      var that = this;
      this._loader.addPartListener(this, function() {
        that._signalStartup();
        callback.call(self, part._readyState);
      });
    },


    /**
     * Helper for marking the part as complete.
     *
     * @param readyState {String} The new ready state.
     */
    _markAsCompleted : function(readyState)
    {
      this._readyState = readyState;
      this._loader.notifyPartResult(this);
    },



    /**
     * Method used to start up the application in case not all parts
     * necessary to initialize the application are in the boot part. [BUG #3793]
     */
    _signalStartup : function() {
      // signal the application startup if not already done
      if (!qx.$$loader.applicationHandlerReady) {
        qx.$$loader.signalStartup();
      }
    },


    /**
     * Helper for checking if the part is loaded completely.
     *
     * @param callback {Function} The function to be called if the part has
     *   been loaded completely.
     * @param self {Object} The context of the callback function.
     * @return {Boolean} true, if the part is loading, complete or has an error.
     */
    _checkCompleteLoading : function(callback, self)
    {
      // check if its already loaded
      var readyState = this._readyState;
      if (readyState == "complete" || readyState == "error") {
        if (callback) {
          var that = this;
          setTimeout(function() {
            that._signalStartup();
            callback.call(self, readyState);
          }, 0);
        }
        return true;
      }
      // add a listener if it is currently loading
      else if (readyState == "loading" && callback)
      {
        this._appendPartListener(callback, self, this);
        return true;
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Wrapper for a part as defined in the config file. This class knows about all
 * packages the part depends on and provides functionality to load the part.
 *
 * @internal
 */
qx.Bootstrap.define("qx.io.part.ClosurePart",
{
  extend : qx.io.part.Part,

  /**
   * @param name {String} Name of the part as defined in the config file at
   *    compile time.
   * @param packages {qx.io.part.Package[]} List of dependent packages
   * @param loader {qx.Part} The loader of this part.
   */
  construct : function(name, packages, loader)
  {
    qx.io.part.Part.call(this, name, packages, loader);
  },


  members :
  {
    __packagesToLoad : 0,


    // overridden
    preload : function(callback, self)
    {
      // store how many packages are already preloaded
      var packagesLoaded = 0;
      var that = this;

      for (var i = 0; i < this._packages.length; i++)
      {
        var pkg = this._packages[i];
        if (pkg.getReadyState() == "initialized") {

          pkg.loadClosure(function(pkg) {
            packagesLoaded++;
            that._loader.notifyPackageResult(pkg);
            // everything loaded?
            if (packagesLoaded >= that._packages.length && callback) {
              callback.call(self);
            }
          }, this._loader);
        }
      }
    },


    /**
     * Loads the closure part including all its packages. The loading will
     * be done parallel. After all packages are available, the closures are
     * executed in the correct order.
     *
     * @param callback {Function} The function to call after the loading.
     * @param self {Object?} The context of the callback.
     */
    load : function(callback, self)
    {
      if (this._checkCompleteLoading(callback, self)) {
        return;
      };

      this._readyState = "loading";

      if (callback) {
        this._appendPartListener(callback, self, this);
      }

      this.__packagesToLoad = this._packages.length;

      for (var i = 0; i < this._packages.length; i++)
      {
        var pkg = this._packages[i];
        var pkgReadyState = pkg.getReadyState();

        // trigger loading
        if (pkgReadyState == "initialized") {
          pkg.loadClosure(this._loader.notifyPackageResult, this._loader);
        }

        // Listener for package changes
        if (pkgReadyState == "initialized" || pkgReadyState == "loading")
        {
          this._loader.addPackageListener(
            pkg,
            qx.Bootstrap.bind(this._onPackageLoad, this, pkg)
          );
        }
        else if (pkgReadyState == "error")
        {
          this._markAsCompleted("error");
          return;
        }
        else {
          // "complete" and "cached"
          this.__packagesToLoad--;
        }
      }

      // execute closures in case everything is already loaded/cached
      if (this.__packagesToLoad <= 0) {
        this.__executePackages();
      }
    },


    /**
     * Executes the packages in their correct order and marks the part as
     * complete after execution.
     */
    __executePackages : function()
    {
      for (var i = 0; i < this._packages.length; i++) {
        this._packages[i].execute();
      }
      this._markAsCompleted("complete");
    },


    /**
     * Handler for every package load. It checks for errors and decreases the
     * packages to load. If all packages has been loaded, it invokes the
     * execution.
     *
     * @param pkg {qx.io.part.Package} The loaded package.
     */
    _onPackageLoad : function(pkg)
    {
      // if the part already has an error, ignore the callback
      if (this._readyState == "error") {
        return;
      }

      // one error package results in an error part
      if (pkg.getReadyState() == "error") {
        this._markAsCompleted("error");
        return;
      }

      // every package could be loaded -> execute the closures
      this.__packagesToLoad--;
      if (this.__packagesToLoad <= 0) {
        this.__executePackages();
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/**
 * A simple message bus singleton.
 * The message bus registers subscriptions and notifies subscribers when
 * a matching message is dispatched
 */
qx.Class.define("qx.event.message.Bus",
{
  type : "singleton",

  extend : qx.core.Object,

  statics :
  {

    /**
     * gets the hash map of message subscriptions
     *
     * @return {Map} with registered subscriptions. The key is the
     *    <code>message</code> and the value is a map with <code>{subscriber: {Function},
     *    context: {Object|null}}</code>.
     */
    getSubscriptions : function() {
      return this.getInstance().getSubscriptions();
    },


    /**
     * subscribes to a message
     *
     * @param message {String} name of message, can be truncated by *
     * @param subscriber {Function} subscribing callback function
     * @param context {Object} The execution context of the callback (i.e. "this")
     * @return {Boolean} Success
     */
    subscribe : function(message, subscriber, context)
    {
      return this.getInstance().subscribe(message, subscriber, context);

    },

    /**
     * checks if subscription is already present
     * if you supply the callback function, match only the exact message monitor
     * otherwise match all monitors that have the given message
     *
     * @param message {String} Name of message, can be truncated by *
     * @param subscriber {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether monitor is present or not
     */
    checkSubscription : function(message, subscriber, context)
    {
      return this.getInstance().checkSubscription(message, subscriber, context);
    },

    /**
     * unsubscribe a listening method
     * if you supply the callback function and execution context,
     * remove only this exact subscription
     * otherwise remove all subscriptions
     *
     * @param message {String} Name of message, can be truncated by *
     * @param subscriber {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether monitor was removed or not
     */
    unsubscribe : function(message, subscriber, context)
    {
      return this.getInstance().unsubscribe(message, subscriber, context);
    },

    /**
     * dispatch message and call subscribed functions
     *
     * @param msg {qx.event.message.Message} message which is being dispatched
     * @return {Boolean} <code>true</code> if the message was dispatched,
     *    <code>false</code> otherwise.
     */
    dispatch : function(msg)
    {
      return this.getInstance().dispatch.apply(this.getInstance(), arguments);
    },

    /**
     * Dispatches a new message by supplying the name of the
     * message and its data.
     *
     * @param name {String} name of the message
     * @param data {var} Any type of data to attach
     *
     * @return {Boolean} <code>true</code> if the message was dispatched,
     *    <code>false</code> otherwise.
     */
    dispatchByName : function(name, data)
    {
      return this.getInstance().dispatchByName.apply(this.getInstance(), arguments);
    }
  },

  /**
   * constructor
   */
  construct : function()
  {
    /*
     * message subscriptions database
     */
    this.__subscriptions = {};
  },

  members :
  {
    __subscriptions : null,


    /**
     * gets the hash map of message subscriptions
     *
     * @return {Map} with registered subscriptions. The key is the
     *    <code>message</code> and the value is a map with <code>{subscriber: {Function},
     *    context: {Object|null}}</code>.
     */
    getSubscriptions : function() {
      return this.__subscriptions;
    },


    /**
     * subscribes to a message
     *
     * @param message {String} name of message, can be truncated by *
     * @param subscriber {Function} subscribing callback function
     * @param context {Object} The execution context of the callback (i.e. "this")
     * @return {Boolean} Success
     */
    subscribe : function(message, subscriber, context)
    {
      if (!message || typeof subscriber != "function")
      {
        this.error("Invalid parameters! "+ [message, subscriber, context]);

        return false;
      }

      var sub = this.getSubscriptions();

      if (this.checkSubscription(message))
      {
        if (this.checkSubscription(message, subscriber, context))
        {
          this.warn("Object method already subscribed to " + message);
          return false;
        }

        // add a subscription
        sub[message].push(
        {
          subscriber : subscriber,
          context    : context || null
        });

        return true;
      }
      else
      {
        // create a subscription
        sub[message] = [ {
          subscriber : subscriber,
          context    : context || null
        } ];

        return true;
      }
    },


    /**
     * checks if subscription is already present
     * if you supply the callback function, match only the exact message monitor
     * otherwise match all monitors that have the given message
     *
     * @param message {String} Name of message, can be truncated by *
     * @param subscriber {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether monitor is present or not
     */
    checkSubscription : function(message, subscriber, context)
    {
      var sub = this.getSubscriptions();

      if (!sub[message] || sub[message].length === 0) {
        return false;
      }

      if (subscriber)
      {
        for (var i=0; i<sub[message].length; i++)
        {
          if (sub[message][i].subscriber === subscriber && sub[message][i].context === (context || null)) {
            return true;
          }
        }

        return false;
      }

      return true;
    },


    /**
     * unsubscribe a listening method
     * if you supply the callback function and execution context,
     * remove only this exact subscription
     * otherwise remove all subscriptions
     *
     * @param message {String} Name of message, can be truncated by *
     * @param subscriber {Function} Callback Function
     * @param context {Object} execution context
     * @return {Boolean} Whether monitor was removed or not
     */
    unsubscribe : function(message, subscriber, context)
    {
       var sub = this.getSubscriptions();
       var subscrList = sub[message];
       if (subscrList) {
         if (!subscriber) {
           sub[message] = null;
           delete sub[message];
           return true;
         } else {
           if (! context) {
             context = null;
           }
           var i = subscrList.length;
           var subscription;
           do {
             subscription = subscrList[--i];
             if (subscription.subscriber === subscriber && subscription.context === context) {
               subscrList.splice(i, 1);
               if (subscrList.length === 0) {
                 sub[message] = null;
                 delete sub[message];
               }
               return true;
             }
           } while (i);
         }
       }
       return false;
    },

    /**
     * dispatch message and call subscribed functions
     *
     * @param msg {qx.event.message.Message} message which is being dispatched
     * @return {Boolean} <code>true</code> if the message was dispatched,
     *    <code>false</code> otherwise.
     */
    dispatch : function(msg)
    {
      var sub = this.getSubscriptions();
      var msgName = msg.getName();
      var dispatched = false;

      for (var key in sub)
      {
        var pos = key.indexOf("*");

        if (pos > -1)
        {
          // use of wildcard
          if (pos === 0 || key.substr(0, pos) === msgName.substr(0, pos))
          {
            this.__callSubscribers(sub[key], msg);
            dispatched = true;
          }
        }
        else
        {
          // exact match
          if (key === msgName)
          {
            this.__callSubscribers(sub[msgName], msg);
            dispatched = true;
          }
        }
      }

      return dispatched;
    },

    /**
     * Dispatches a new message by supplying the name of the
     * message and its data.
     *
     * @param name {String} name of the message
     * @param data {var} Any type of data to attach
     *
     * @return {Boolean} <code>true</code> if the message was dispatched,
     *    <code>false</code> otherwise.
     */
    dispatchByName : function(name, data)
    {
      var message = new qx.event.message.Message(name, data);

      // Dispatch the message
      var ret = this.dispatch(message);

      // We instantiated this message, so it's our responsibility to dispose it.
      message.dispose();
      message = null;

      // Let 'em know whether this message was dispatched to any subscribers.
      return ret;
    },


    /**
     * Call subscribers with passed message.
     *
     * Each currently-subscribed subscriber function will be called in
     * turn. Any requests to unsubscribe a subscriber from the list, while
     * processing the currently-subscribed subscriber functions, will take
     * effect after all currently-subscribed subscriber functions have been
     * processed.
     *
     * @param subscribers {Array} subscribers to call
     * @param msg {qx.event.message.Message} message for subscribers
     */
    __callSubscribers : function(subscribers, msg)
    {
      // (Shallow) clone the subscribers array in case one of them alters the
      // list, e.g., by unsubscribing
      subscribers = subscribers.slice();

      for (var i=0; i<subscribers.length; i++)
      {
        var subscriber = subscribers[i].subscriber;
        var context = subscribers[i].context;

        // call message monitor subscriber
        if (context && context.isDisposed)
        {
          if (context.isDisposed())
          {
            subscribers.splice(i, 1);
            i--;
          }
          else
          {
            subscriber.call(context, msg);
          }
        }
        else
        {
          subscriber.call(context, msg);
        }
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/**
 * A message to be dispatched on the message bus.
 */
qx.Class.define("qx.event.message.Message",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param name {String} The name of the message
   * @param data {var} Any type of data to attach
   */
  construct : function(name, data)
  {
    this.base(arguments);

    if (name != null) {
      this.setName(name);
    }

    if (data != null) {
      this.setData(data);
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Event name of the message. Based on this name the message is dispatched
     * to the event listeners.
     */
    name :
    {
      check       : "String"
    },

    /**
     * Any data the sender wants to pass with the event.
     */
    data :
    {
      init        : null,
      nullable    : true
    },

    /**
     * A reference to the sending object.
     */
    sender :
    {
      check       : "Object",
      nullable    : true
    }
  },

  destruct : function()
  {
    this.setData(null);
    this.setSender(null);
  }
});


