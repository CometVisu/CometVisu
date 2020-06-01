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

   * Base2
     http://code.google.com/p/base2/
     Version 0.9

     Copyright:
       (c) 2006-2007, Dean Edwards

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

     Authors:
       * Dean Edwards

************************************************************************ */


/**
 * CSS class name support for HTML elements. Supports multiple class names
 * for each element. Can query and apply class names to HTML elements.
 */
qx.Bootstrap.define("qx.bom.element.Class",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** @type {RegExp} Regular expressions to split class names */
    __splitter : /\s+/g,

    /** @type {RegExp} String trim regular expression. */
    __trim : /^\s+|\s+$/g,

    /**
     * Adds a className to the given element
     * If successfully added the given className will be returned
     *
     * @signature function(element, name)
     * @param element {Element} The element to modify
     * @param name {String} The class name to add
     * @return {String} The added classname (if so)
     */
    add :{
      "native" : function(element, name)
      {
        if (name.length > 0) {
          element.classList.add(name);
        }

        return name;
      },

      "default" : function(element, name)
      {
        if (!this.has(element, name)) {
          element.className += (element.className ? " " : "") + name;
        }

        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],


    /**
     * Adds multiple classes to the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to add.
     * @return {String} The resulting class name which was applied
     */
    addClasses :{
      "native" : function(element, classes)
      {
        for (var i=0; i<classes.length; i++) {
          if (classes[i].length > 0) {
            element.classList.add(classes[i]);
          }
        }
        return element.className;
      },

      "default" : function(element, classes)
      {
        var keys = {};
        var result;

        var old = element.className;
        if (old)
        {
          result = old.split(this.__splitter);
          for (var i=0, l=result.length; i<l; i++) {
            keys[result[i]] = true;
          }

          for (var i=0, l=classes.length; i<l; i++)
          {
            if (!keys[classes[i]]) {
              result.push(classes[i]);
            }
          }
        }
        else {
          result = classes;
        }

        return element.className = result.join(" ");
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],


    /**
     * Gets the classname of the given element
     *
     * @param element {Element} The element to query
     * @return {String} The retrieved classname
     */
    get : function(element) {
      var className = element.className;
      if(typeof className.split !== 'function')
      {
        if(typeof className === 'object')
        {
          if(qx.Bootstrap.getClass(className) == 'SVGAnimatedString')
          {
            className = className.baseVal;
          }
          else
          {
            if (qx.core.Environment.get("qx.debug")) {
              qx.log.Logger.warn(this, "className for element " + element + " cannot be determined");
            }
            className = '';
          }
        }
        if(typeof className === 'undefined')
        {
          if (qx.core.Environment.get("qx.debug")) {
            qx.log.Logger.warn(this, "className for element " + element + " is undefined");
          }
          className = '';
        }
      }
      return className;
    },


    /**
     * Whether the given element has the given className.
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to check
     * @param name {String} The class name to check for
     * @return {Boolean} true when the element has the given classname
     */
    has : {
      "native" : function(element, name) {
        return element.classList.contains(name);
      },

      "default" : function(element, name)
      {
        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        return regexp.test(element.className);
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],


    /**
     * Removes a className from the given element
     *
     * @signature function(element, name)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to remove
     * @return {String} The removed class name
     */
    remove : {
      "native" : function(element, name)
      {
        element.classList.remove(name);
        return name;
      },

      "default" : function(element, name)
      {
        var regexp = new RegExp("(^|\\s)" + name + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");

        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],


    /**
     * Removes multiple classes from the given element
     *
     * @signature function(element, classes)
     * @param element {Element} DOM element to modify
     * @param classes {String[]} List of classes to remove.
     * @return {String} The resulting class name which was applied
     */
    removeClasses : {
      "native" : function(element, classes)
      {
        for (var i=0; i<classes.length; i++) {
          element.classList.remove(classes[i]);
        }
        return element.className;
      },

      "default" : function(element, classes)
      {
        var reg = new RegExp("\\b" + classes.join("\\b|\\b") + "\\b", "g");
        return element.className = element.className.replace(reg, "").replace(this.__trim, "").replace(this.__splitter, " ");
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"],


    /**
     * Replaces the first given class name with the second one
     *
     * @param element {Element} The DOM element to modify
     * @param oldName {String} The class name to remove
     * @param newName {String} The class name to add
     * @return {String} The added class name
     */
    replace : function(element, oldName, newName)
    {
      if (!this.has(element, oldName)) {
        return "";
      }

      this.remove(element, oldName);
      return this.add(element, newName);
    },


    /**
     * Toggles a className of the given element
     *
     * @signature function(element, name, toggle)
     * @param element {Element} The DOM element to modify
     * @param name {String} The class name to toggle
     * @param toggle {Boolean?null} Whether to switch class on/off. Without
     *    the parameter an automatic toggling would happen.
     * @return {String} The class name
     */
    toggle : {
      "native" : function(element, name, toggle)
      {
        if (toggle === undefined) {
          element.classList.toggle(name);
        } else {
          toggle ? this.add(element, name) : this.remove(element, name);
        }
        return name;
      },

      "default" : function(element, name, toggle)
      {
        if (toggle == null) {
          toggle = !this.has(element, name);
        }

        toggle ? this.add(element, name) : this.remove(element, name);
        return name;
      }
    }[qx.core.Environment.get("html.classlist") ? "native" : "default"]
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
