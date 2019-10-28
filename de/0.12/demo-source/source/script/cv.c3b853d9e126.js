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
 * This is a cross browser wrapper for requestAnimationFrame. For further
 * information about the feature, take a look at spec:
 * http://www.w3.org/TR/animation-timing/
 *
 * This class offers two ways of using this feature. First, the plain
 * API the spec describes.
 *
 * Here is a sample usage:
 * <pre class='javascript'>var start = Date.now();
 * var cb = function(time) {
 *   if (time >= start + duration) {
 *     // ... do some last tasks
 *   } else {
 *     var timePassed = time - start;
 *     // ... calculate the current step and apply it
 *     qx.bom.AnimationFrame.request(cb, this);
 *   }
 * };
 * qx.bom.AnimationFrame.request(cb, this);
 * </pre>
 *
 * Another way of using it is to use it as an instance emitting events.
 *
 * Here is a sample usage of that API:
 * <pre class='javascript'>var frame = new qx.bom.AnimationFrame();
 * frame.on("end", function() {
 *   // ... do some last tasks
 * }, this);
 * frame.on("frame", function(timePassed) {
 *   // ... calculate the current step and apply it
 * }, this);
 * frame.startSequence(duration);
 * </pre>
 *
 * @require(qx.lang.normalize.Date)
 */
qx.Bootstrap.define("qx.bom.AnimationFrame",
{
  extend : qx.event.Emitter,

  events : {
    /** Fired as soon as the animation has ended. */
    "end" : undefined,

    /**
     * Fired on every frame having the passed time as value
     * (might be a float for higher precision).
     */
    "frame" : "Number"
  },

  members : {
    __canceled : false,

    /**
     * Method used to start a series of animation frames. The series will end as
     * soon as the given duration is over.
     *
     * @param duration {Number} The duration the sequence should take.
     *
     * @ignore(performance.*)
     */
    startSequence : function(duration) {
      this.__canceled = false;

      var start = (window.performance && performance.now) ? (performance.now() + qx.bom.AnimationFrame.__start) : Date.now();
      var cb = function(time) {
        if (this.__canceled) {
          this.id = null;
          return;
        }

        // final call
        if (time >= start + duration) {
          this.emit("end");
          this.id = null;
        } else {
          var timePassed = Math.max(time - start, 0);
          this.emit("frame", timePassed);
          this.id = qx.bom.AnimationFrame.request(cb, this);
        }
      };

      this.id = qx.bom.AnimationFrame.request(cb, this);
    },


    /**
     * Cancels a started sequence of frames. It will do nothing if no
     * sequence is running.
     */
    cancelSequence : function() {
      this.__canceled = true;
    }
  },

  statics :
  {
    /**
     * The default time in ms the timeout fallback implementation uses.
     */
    TIMEOUT : 30,


    /**
     * Calculation of the predefined timing functions. Approximation of the real
     * bezier curves has been used for easier calculation. This is good and close
     * enough for the predefined functions like <code>ease</code> or
     * <code>linear</code>.
     *
     * @param func {String} The defined timing function. One of the following values:
     *   <code>"ease-in"</code>, <code>"ease-out"</code>, <code>"linear"</code>,
     *   <code>"ease-in-out"</code>, <code>"ease"</code>.
     * @param x {Integer} The percent value of the function.
     * @return {Integer} The calculated value
     */
    calculateTiming : function(func, x) {
      if (func == "ease-in") {
        var a = [3.1223e-7, 0.0757, 1.2646, -0.167, -0.4387, 0.2654];
      } else if (func == "ease-out") {
        var a = [-7.0198e-8, 1.652, -0.551, -0.0458, 0.1255, -0.1807];
      } else if (func == "linear") {
        return x;
      } else if (func == "ease-in-out") {
        var a = [2.482e-7, -0.2289, 3.3466, -1.0857, -1.7354, 0.7034];
      } else {
        // default is 'ease'
        var a = [-0.0021, 0.2472, 9.8054, -21.6869, 17.7611, -5.1226];
      }

      // A 6th grade polynomial has been used as approximation of the original
      // bezier curves  described in the transition spec
      // http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
      // (the same is used for animations as well)
      var y = 0;
      for (var i=0; i < a.length; i++) {
        y += a[i] * Math.pow(x, i);
      };
      return y;
    },


    /**
     * Request for an animation frame. If the native <code>requestAnimationFrame</code>
     * method is supported, it will be used. Otherwise, we use timeouts with a
     * 30ms delay. The HighResolutionTime will be used if supported but the time given
     * to the callback will still be a timestamp starting at 1 January 1970 00:00:00 UTC.
     *
     * @param callback {Function} The callback function which will get the current
     *   time as argument (which could be a float for higher precision).
     * @param context {var} The context of the callback.
     * @return {Number} The id of the request.
     */
    request : function(callback, context) {
      var req = qx.core.Environment.get("css.animation.requestframe");

      var cb = function(time) {
        // check for high resolution time
        if (time < 1e10) {
          time = qx.bom.AnimationFrame.__start + time;
        }

        time = time || Date.now();
        callback.call(context, time);
      };
      if (req) {
        return window[req](cb);
      } else {
        // make sure to use an indirection because setTimeout passes a
        // number as first argument as well
        return window.setTimeout(function() {
          cb();
        }, qx.bom.AnimationFrame.TIMEOUT);
      }
    }
  },

  /**
   * @ignore(performance.timing.*)
   */
  defer : function(statics) {
    // check and use the high resolution start time if available
    statics.__start = window.performance && performance.timing && performance.timing.navigationStart;
    // if not, simply use the current time
    if (!statics.__start) {
      statics.__start = Date.now();
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
     * Daniel Wagner (d_wagner)

************************************************************************ */
/**
 * Internal class which contains the checks used by {@link qx.core.Environment}.
 * All checks in here are marked as internal which means you should never use
 * them directly.
 *
 * This class contains checks related to Stylesheet objects.
 *
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.Stylesheet",
{
  statics:
  {
    /**
     * Returns a stylesheet to be used for feature checks
     *
     * @return {StyleSheet} Stylesheet element
     */
    __getStylesheet : function()
    {
      if (!qx.bom.client.Stylesheet.__stylesheet) {
        qx.bom.client.Stylesheet.__stylesheet = qx.bom.Stylesheet.createElement();
      }
      return qx.bom.client.Stylesheet.__stylesheet;
    },


    /**
     * Check for IE's non-standard document.createStyleSheet function.
     * In IE9 (standards mode), the typeof check returns "function" so false is
     * returned. This is intended since IE9 supports the DOM-standard
     * createElement("style") which should be used instead.
     *
     * @internal
     * @return {Boolean} <code>true</code> if the browser supports
     * document.createStyleSheet
     */
    getCreateStyleSheet : function()
    {
      return typeof document.createStyleSheet === "object";
    },


    /**
     * Check for stylesheet.insertRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if insertRule is supported
     */
    getInsertRule : function()
    {
      return typeof qx.bom.client.Stylesheet.__getStylesheet().insertRule === "function";
    },


    /**
     * Check for stylesheet.deleteRule. Legacy IEs do not support this.
     *
     * @internal
     * @return {Boolean} <code>true</code> if deleteRule is supported
     */
    getDeleteRule : function()
    {
      return typeof qx.bom.client.Stylesheet.__getStylesheet().deleteRule === "function";
    },


    /**
     * Decides whether to use the legacy IE-only stylesheet.addImport or the
     * DOM-standard stylesheet.insertRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.addImport is supported
     */
    getAddImport : function()
    {
      return (typeof qx.bom.client.Stylesheet.__getStylesheet().addImport === "object");
    },


    /**
     * Decides whether to use the legacy IE-only stylesheet.removeImport or the
     * DOM-standard stylesheet.deleteRule('@import [...]')
     *
     * @internal
     * @return {Boolean} <code>true</code> if stylesheet.removeImport is supported
     */
    getRemoveImport : function()
    {
      return (typeof qx.bom.client.Stylesheet.__getStylesheet().removeImport === "object");
    }
  },



  defer : function (statics) {
    qx.core.Environment.add("html.stylesheet.createstylesheet", statics.getCreateStyleSheet);
    qx.core.Environment.add("html.stylesheet.insertrule", statics.getInsertRule);
    qx.core.Environment.add("html.stylesheet.deleterule", statics.getDeleteRule);
    qx.core.Environment.add("html.stylesheet.addimport", statics.getAddImport);
    qx.core.Environment.add("html.stylesheet.removeimport", statics.getRemoveImport);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Andreas Junghans (lucidcake)

************************************************************************ */

/**
 * Cross-browser wrapper to work with CSS stylesheets.
 * @require(qx.bom.client.Stylesheet)
 */
qx.Bootstrap.define("qx.bom.Stylesheet",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Include a CSS file
     *
     * <em>Note:</em> Using a resource ID as the <code>href</code> parameter
     * will no longer be supported. Call
     * <code>qx.util.ResourceManager.getInstance().toUri(href)</code> to get
     * valid URI to be used with this method.
     *
     * @param href {String} Href value
     * @param doc {Document?} Document to modify
     */
    includeFile : function(href, doc)
    {
      if (!doc) {
        doc = document;
      }

      var el = doc.createElement("link");
      el.type = "text/css";
      el.rel = "stylesheet";
      el.href = href;

      var head = doc.getElementsByTagName("head")[0];
      head.appendChild(el);
    },


    /**
     * Create a new Stylesheet node and append it to the document
     *
     * @param text {String?} optional string of css rules
     * @return {StyleSheet} the generates stylesheet element
     */
    createElement : function(text)
    {
      if (qx.core.Environment.get("html.stylesheet.createstylesheet")) {
        var sheet = document.createStyleSheet();

        if (text) {
          sheet.cssText = text;
        }

        return sheet;
      }
      else {
        var elem = document.createElement("style");
        elem.type = "text/css";

        if (text) {
          elem.appendChild(document.createTextNode(text));
        }

        document.getElementsByTagName("head")[0].appendChild(elem);
        return elem.sheet;
      }
    },


    /**
     * Insert a new CSS rule into a given Stylesheet
     *
     * @param sheet {Object} the target Stylesheet object
     * @param selector {String} the selector
     * @param entry {String} style rule
     */
    addRule : function(sheet, selector, entry)
    {
      if (qx.core.Environment.get('qx.debug')) {
        var msg = "qx.bom.Stylesheet.addRule: The rule '" + entry + "' for the selector '" + selector +
        "' must not be enclosed in braces";
        qx.core.Assert.assertFalse(/^\s*?\{.*?\}\s*?$/.test(entry), msg);
      }

      if (qx.core.Environment.get("html.stylesheet.insertrule")) {
        sheet.insertRule(selector + "{" + entry + "}", sheet.cssRules.length);
      }
      else {
        sheet.addRule(selector, entry);
      }
    },


    /**
     * Remove a CSS rule from a stylesheet
     *
     * @param sheet {Object} the Stylesheet
     * @param selector {String} the Selector of the rule to remove
     */
    removeRule : function(sheet, selector)
    {
      if (qx.core.Environment.get("html.stylesheet.deleterule")) {
        var rules = sheet.cssRules;
        var len = rules.length;

        for (var i=len-1; i>=0; --i)
        {
          if (rules[i].selectorText == selector) {
            sheet.deleteRule(i);
          }
        }
      }
      else {
        var rules = sheet.rules;
        var len = rules.length;

        for (var i=len-1; i>=0; --i)
        {
          if (rules[i].selectorText == selector) {
            sheet.removeRule(i);
          }
        }
      }
    },


    /**
     * Remove the given sheet from its owner.
     * @param sheet {Object} the stylesheet object
     */
    removeSheet : function(sheet) {
      var owner = sheet.ownerNode ? sheet.ownerNode : sheet.owningElement;
      qx.dom.Element.removeChild(owner, owner.parentNode);
    },


    /**
     * Remove all CSS rules from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     */
    removeAllRules : function(sheet)
    {
      if (qx.core.Environment.get("html.stylesheet.deleterule")) {
        var rules = sheet.cssRules;
        var len = rules.length;

        for (var i=len-1; i>=0; i--) {
          sheet.deleteRule(i);
        }
      } else {
        var rules = sheet.rules;
        var len = rules.length;

        for (var i=len-1; i>=0; i--) {
          sheet.removeRule(i);
        }
      }
    },


    /**
     * Add an import of an external CSS file to a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the external stylesheet file
     */
    addImport : function(sheet, url)
    {
      if (qx.core.Environment.get("html.stylesheet.addimport")) {
        sheet.addImport(url);
      }
      else {
        sheet.insertRule('@import "' + url + '";', sheet.cssRules.length);
      }
    },


    /**
     * Removes an import from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     * @param url {String} URL of the imported CSS file
     */
    removeImport : function(sheet, url)
    {
      if (qx.core.Environment.get("html.stylesheet.removeimport")) {
        var imports = sheet.imports;
        var len = imports.length;

        for (var i=len-1; i>=0; i--)
        {
          if (imports[i].href == url ||
          imports[i].href == qx.util.Uri.getAbsolute(url))
          {
            sheet.removeImport(i);
          }
        }
      }
      else {
        var rules = sheet.cssRules;
        var len = rules.length;

        for (var i=len-1; i>=0; i--)
        {
          if (rules[i].href == url) {
            sheet.deleteRule(i);
          }
        }
      }
    },


    /**
     * Remove all imports from a stylesheet
     *
     * @param sheet {Object} the stylesheet object
     */
    removeAllImports : function(sheet)
    {
      if (qx.core.Environment.get("html.stylesheet.removeimport")) {
        var imports = sheet.imports;
        var len = imports.length;

        for (var i=len-1; i>=0; i--) {
          sheet.removeImport(i);
        }
      }
      else {
        var rules = sheet.cssRules;
        var len = rules.length;

        for (var i=len-1; i>=0; i--)
        {
          if (rules[i].type == rules[i].IMPORT_RULE) {
            sheet.deleteRule(i);
          }
        }
      }
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
 * Manages children structures of an element. Easy and convenient APIs
 * to insert, remove and replace children.
 */
qx.Bootstrap.define("qx.dom.Element",
{
  statics :
  {
    /**
     * Whether the given <code>child</code> is a child of <code>parent</code>
     *
     * @param parent {Element} parent element
     * @param child {Node} child node
     * @return {Boolean} true when the given <code>child</code> is a child of <code>parent</code>
     */
    hasChild : function(parent, child) {
      return child.parentNode === parent;
    },


    /**
     * Whether the given <code>element</code> has children.
     *
     * @param element {Element} element to test
     * @return {Boolean} true when the given <code>element</code> has at least one child node
     */
    hasChildren : function(element) {
      return !!element.firstChild;
    },


    /**
     * Whether the given <code>element</code> has any child elements.
     *
     * @param element {Element} element to test
     * @return {Boolean} true when the given <code>element</code> has at least one child element
     */
    hasChildElements : function(element)
    {
      element = element.firstChild;

      while(element)
      {
        if (element.nodeType === 1) {
          return true;
        }

        element = element.nextSibling;
      }

      return false;
    },


    /**
     * Returns the parent element of the given element.
     *
     * @param element {Element} Element to find the parent for
     * @return {Element} The parent element
     */
    getParentElement : function(element) {
      return element.parentNode;
    },


    /**
     * Checks if the <code>element</code> is in the DOM, but note that
     * the method is very expensive!
     *
     * @param element {Element} The DOM element to check.
     * @param win {Window} The window to check for.
     * @return {Boolean} <code>true</code> if the <code>element</code> is in
     *          the DOM, <code>false</code> otherwise.
     */
    isInDom :function(element, win)
    {
      if (!win) {
        win = window;
      }

      var domElements = win.document.getElementsByTagName(element.nodeName);

      for (var i=0, l=domElements.length; i<l; i++)
      {
        if (domElements[i] === element) {
          return true;
        }
      }

      return false;
    },



    /*
    ---------------------------------------------------------------------------
      INSERTION
    ---------------------------------------------------------------------------
    */

    /**
     * Inserts <code>node</code> at the given <code>index</code>
     * inside <code>parent</code>.
     *
     * @param node {Node} node to insert
     * @param parent {Element} parent element node
     * @param index {Integer} where to insert
     * @return {Boolean} returns true (successful)
     */
    insertAt : function(node, parent, index)
    {
      var ref = parent.childNodes[index];

      if (ref) {
        parent.insertBefore(node, ref);
      } else {
        parent.appendChild(node);
      }

      return true;
    },


    /**
     * Insert <code>node</code> into <code>parent</code> as first child.
     * Indexes of other children will be incremented by one.
     *
     * @param node {Node} Node to insert
     * @param parent {Element} parent element node
     * @return {Boolean} returns true (successful)
     */
    insertBegin : function(node, parent)
    {
      if (parent.firstChild) {
        this.insertBefore(node, parent.firstChild);
      } else {
        parent.appendChild(node);
      }
      return true;
    },


    /**
     * Insert <code>node</code> into <code>parent</code> as last child.
     *
     * @param node {Node} Node to insert
     * @param parent {Element} parent element node
     * @return {Boolean} returns true (successful)
     */
    insertEnd : function(node, parent) {
      parent.appendChild(node);
      return true;
    },


    /**
     * Inserts <code>node</code> before <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertBefore : function(node, ref)
    {
      ref.parentNode.insertBefore(node, ref);
      return true;
    },


    /**
     * Inserts <code>node</code> after <code>ref</code> in the same parent.
     *
     * @param node {Node} Node to insert
     * @param ref {Node} Node which will be used as reference for insertion
     * @return {Boolean} returns true (successful)
     */
    insertAfter : function(node, ref)
    {
      var parent = ref.parentNode;

      if (ref == parent.lastChild) {
        parent.appendChild(node);
      } else {
        return this.insertBefore(node, ref.nextSibling);
      }

      return true;
    },





    /*
    ---------------------------------------------------------------------------
      REMOVAL
    ---------------------------------------------------------------------------
    */

    /**
     * Removes the given <code>node</code> from its parent element.
     *
     * @param node {Node} Node to remove
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    remove : function(node)
    {
      if (!node.parentNode) {
        return false;
      }

      node.parentNode.removeChild(node);
      return true;
    },


    /**
     * Removes the given <code>node</code> from the <code>parent</code>.
     *
     * @param node {Node} Node to remove
     * @param parent {Element} parent element which contains the <code>node</code>
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    removeChild : function(node, parent)
    {
      if (node.parentNode !== parent) {
        return false;
      }

      parent.removeChild(node);
      return true;
    },


    /**
     * Removes the node at the given <code>index</code>
     * from the <code>parent</code>.
     *
     * @param index {Integer} position of the node which should be removed
     * @param parent {Element} parent DOM element
     * @return {Boolean} <code>true</code> when node was successfully removed,
     *   otherwise <code>false</code>
     */
    removeChildAt : function(index, parent)
    {
      var child = parent.childNodes[index];

      if (!child) {
        return false;
      }

      parent.removeChild(child);
      return true;
    },





    /*
    ---------------------------------------------------------------------------
      REPLACE
    ---------------------------------------------------------------------------
    */

    /**
     * Replaces <code>oldNode</code> with <code>newNode</code> in the current
     * parent of <code>oldNode</code>.
     *
     * @param newNode {Node} DOM node to insert
     * @param oldNode {Node} DOM node to remove
     * @return {Boolean} <code>true</code> when node was successfully replaced
     */
    replaceChild : function(newNode, oldNode)
    {
      if (!oldNode.parentNode) {
        return false;
      }

      oldNode.parentNode.replaceChild(newNode, oldNode);
      return true;
    },


    /**
     * Replaces the node at <code>index</code> with <code>newNode</code> in
     * the given parent.
     *
     * @param newNode {Node} DOM node to insert
     * @param index {Integer} position of old DOM node
     * @param parent {Element} parent DOM element
     * @return {Boolean} <code>true</code> when node was successfully replaced
     */
    replaceAt : function(newNode, index, parent)
    {
      var oldNode = parent.childNodes[index];

      if (!oldNode) {
        return false;
      }

      parent.replaceChild(newNode, oldNode);
      return true;
    },


    /**
     * Stores helper element for element creation in WebKit
     *
     * @internal
     */
    __helperElement : {},



    /**
     * Creates and returns a DOM helper element.
     *
     * @param win {Window?} Window to create the element for
     * @return {Element} The created element node
     */
    getHelperElement : function (win)
    {
      if (!win) {
        win = window;
      }

      // key is needed to allow using different windows
      var key = win.location.href;

      if (!qx.dom.Element.__helperElement[key])
      {
        var helper = qx.dom.Element.__helperElement[key] = win.document.createElement("div");

        // innerHTML will only parsed correctly if element is appended to document
        if (qx.core.Environment.get("engine.name") == "webkit")
        {
          helper.style.display = "none";

          win.document.body.appendChild(helper);
        }
      }

      return qx.dom.Element.__helperElement[key];
    },


    /**
     * Creates a DOM element.
     *
     * @param name {String} Tag name of the element
     * @param attributes {Map?} Map of attributes to apply
     * @param win {Window?} Window to create the element for
     * @return {Element} The created element node
     */
    create : function(name, attributes, win)
    {
      if (!win) {
        win = window;
      }

      if (!name) {
        throw new Error("The tag name is missing!");
      }

      var element = win.document.createElement(name);

      for (var key in attributes)
      {
        qx.bom.element.Attribute.set(element, key, attributes[key]);
      }

      return element;
    },


    /**
     * Removes all content from the given element
     *
     * @param element {Element} element to clean
     * @return {String} empty string (new HTML content)
     */
    empty : function(element) {
      return element.innerHTML = "";
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
     * Sebastian Werner (wpbasti)
     * Alexander Steitz (aback)

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
 * Attribute/Property handling for DOM HTML elements.
 *
 * Also includes support for HTML properties like <code>checked</code>
 * or <code>value</code>. This feature set is supported cross-browser
 * through one common interface and is independent of the differences between
 * the multiple implementations.
 *
 * Supports applying text and HTML content using the attribute names
 * <code>text</code> and <code>html</code>.
 */
qx.Bootstrap.define("qx.bom.element.Attribute",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /** Internal map of attribute conversions */
    __hints :
    {
      // Name translation table (camelcase is important for some attributes)
      names :
      {
        "class"     : "className",
        "for"       : "htmlFor",
        html        : "innerHTML",
        text        : qx.core.Environment.get("html.element.textcontent") ? "textContent" : "innerText",
        colspan     : "colSpan",
        rowspan     : "rowSpan",
        valign      : "vAlign",
        datetime    : "dateTime",
        accesskey   : "accessKey",
        tabindex    : "tabIndex",
        maxlength   : "maxLength",
        readonly    : "readOnly",
        longdesc    : "longDesc",
        cellpadding : "cellPadding",
        cellspacing : "cellSpacing",
        frameborder : "frameBorder",
        usemap      : "useMap"
      },

      // Attributes which are only applyable on a DOM element (not using compile())
      runtime :
      {
        "html" : 1,
        "text" : 1
      },

      // Attributes which are (forced) boolean
      bools :
      {
        compact  : 1,
        nowrap   : 1,
        ismap    : 1,
        declare  : 1,
        noshade  : 1,
        checked  : 1,
        disabled : 1,
        readOnly : 1,
        multiple : 1,
        selected : 1,
        noresize : 1,
        defer    : 1,
        allowTransparency : 1
      },

      // Interpreted as property (element.property)
      property :
      {
        // Used by qx.html.Element
        $$element       : 1,
        $$elementObject : 1,

        // Used by qx.ui.core.Widget
        $$widget        : 1,
        $$widgetObject  : 1,

        // Native properties
        checked     : 1,
        readOnly    : 1,
        multiple    : 1,
        selected    : 1,
        value       : 1,
        maxLength   : 1,
        className   : 1,
        innerHTML   : 1,
        innerText   : 1,
        textContent : 1,
        htmlFor     : 1,
        tabIndex    : 1
      },

      qxProperties :
      {
        $$widget : 1,
        $$widgetObject : 1,
        $$element : 1,
        $$elementObject : 1
      },

      // Default values when "null" is given to a property
      propertyDefault :
      {
        disabled : false,
        checked : false,
        readOnly : false,
        multiple : false,
        selected : false,
        value : "",
        className : "",
        innerHTML : "",
        innerText : "",
        textContent : "",
        htmlFor : "",
        tabIndex : 0,
        maxLength: qx.core.Environment.select("engine.name", {
          "mshtml" : 2147483647,
          "webkit": 524288,
          "default": -1
        })
      },


      // Properties which can be removed to reset them
      removeableProperties :
      {
        disabled: 1,
        multiple: 1,
        maxLength: 1
      }
    },


    /**
     * Compiles an incoming attribute map to a string which
     * could be used when building HTML blocks using innerHTML.
     *
     * This method silently ignores runtime attributes like
     * <code>html</code> or <code>text</code>.
     *
     * @param map {Map} Map of attributes. The key is the name of the attribute.
     * @return {String} Returns a compiled string ready for usage.
     */
    compile : function(map)
    {
      var html = [];
      var runtime = this.__hints.runtime;

      for (var key in map)
      {
        if (!runtime[key]) {
          html.push(key, "='", map[key], "'");
        }
      }

      return html.join("");
    },


    /**
     * Returns the value of the given HTML attribute
     *
     * @param element {Element} The DOM element to query
     * @param name {String} Name of the attribute
     * @return {var} The value of the attribute
     */
    get : function(element, name)
    {
      var hints = this.__hints;
      var value;

      // normalize name
      name = hints.names[name] || name;

      // respect properties
      if (hints.property[name])
      {
        value = element[name];

        if (typeof hints.propertyDefault[name] !== "undefined" &&
            value == hints.propertyDefault[name])
        {
          // only return null for all non-boolean properties
          if (typeof hints.bools[name] === "undefined") {
            return null;
          } else {
            return value;
          }
        }
      } else { // fallback to attribute
        value = element.getAttribute(name);

        // All modern browsers interpret "" as true but not IE8, which set the property to "" reset
        if (hints.bools[name] && !(qx.core.Environment.get("engine.name") == "mshtml" &&
        parseInt(qx.core.Environment.get("browser.documentmode"), 10) <= 8 )) {
          return qx.Bootstrap.isString(value); // also respect empty strings as true
        }
      }

      if (hints.bools[name]) {
        return !!value;
      }

      return value;
    },


    /**
     * Sets an HTML attribute on the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     * @param value {var} New value of the attribute
     */
    set : function(element, name, value)
    {
      if (typeof value === "undefined") {
        return;
      }

      var hints = this.__hints;

      // normalize name
      name = hints.names[name] || name;

      // respect booleans
      if (hints.bools[name] && !qx.lang.Type.isBoolean(value)) {
        value = qx.lang.Type.isString(value);
      }

      // apply attribute
      // only properties which can be applied by the browser or qxProperties
      // otherwise use the attribute methods
      if (hints.property[name] && (!(element[name] === undefined) || hints.qxProperties[name]))
      {
        // resetting the attribute/property
        if (value == null)
        {
          // for properties which need to be removed for a correct reset
          if (hints.removeableProperties[name])
          {
            element.removeAttribute(name);
            return;
          } else if (typeof hints.propertyDefault[name] !== "undefined") {
            value = hints.propertyDefault[name];
          }
        }

        element[name] = value;
      }
      else
      {
        if ((hints.bools[name] || value === null) &&
          name.indexOf("data-") !== 0)
        {
          if (value === true) {
          element.setAttribute(name, name);
          } else if (value === false || value === null) {
            element.removeAttribute(name);
          }
        }
        else if (value === null) {
          element.removeAttribute(name);
        }
        else {
          element.setAttribute(name, value);
        }
      }
    },


    /**
     * Resets an HTML attribute on the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     */
    reset : function(element, name) {
      if (name.indexOf("data-") === 0) {
        element.removeAttribute(name);
      } else {
        this.set(element, name, null);
      }
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
 * Responsible for checking all relevant animation properties.
 *
 * Spec: http://www.w3.org/TR/css3-animations/
 *
 * @require(qx.bom.Stylesheet)
 * @internal
 */
qx.Bootstrap.define("qx.bom.client.CssAnimation",
{
  statics : {
    /**
     * Main check method which returns an object if CSS animations are
     * supported. This object contains all necessary keys to work with CSS
     * animations.
     * <ul>
     *  <li><code>name</code> The name of the css animation style</li>
     *  <li><code>play-state</code> The name of the play-state style</li>
     *  <li><code>start-event</code> The name of the start event</li>
     *  <li><code>iteration-event</code> The name of the iteration event</li>
     *  <li><code>end-event</code> The name of the end event</li>
     *  <li><code>fill-mode</code> The fill-mode style</li>
     *  <li><code>keyframes</code> The name of the keyframes selector.</li>
     * </ul>
     *
     * @internal
     * @return {Object|null} The described object or null, if animations are
     *   not supported.
     */
    getSupport : function() {
      var name = qx.bom.client.CssAnimation.getName();
      if (name != null) {
        return {
          "name" : name,
          "play-state" : qx.bom.client.CssAnimation.getPlayState(),
          "start-event" : qx.bom.client.CssAnimation.getAnimationStart(),
          "iteration-event" : qx.bom.client.CssAnimation.getAnimationIteration(),
          "end-event" : qx.bom.client.CssAnimation.getAnimationEnd(),
          "fill-mode" : qx.bom.client.CssAnimation.getFillMode(),
          "keyframes" : qx.bom.client.CssAnimation.getKeyFrames()
        };
      }
      return null;
    },


    /**
     * Checks for the 'animation-fill-mode' CSS style.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getFillMode : function() {
      return qx.bom.Style.getPropertyName("AnimationFillMode");
    },



    /**
     * Checks for the 'animation-play-state' CSS style.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getPlayState : function() {
      return qx.bom.Style.getPropertyName("AnimationPlayState");
    },


    /**
     * Checks for the style name used for animations.
     * @internal
     * @return {String|null} The name of the style or null, if the style is
     *   not supported.
     */
    getName : function() {
      return qx.bom.Style.getPropertyName("animation");
    },


    /**
     * Checks for the event name of animation start.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationStart : function() {
      // special handling for mixed prefixed / unprefixed implementations
      if (qx.bom.Event.supportsEvent(window, "webkitanimationstart")) {
        return "webkitAnimationStart";
      }
      var mapping = {
        "msAnimation" : "MSAnimationStart",
        "WebkitAnimation" : "webkitAnimationStart",
        "MozAnimation" : "animationstart",
        "OAnimation" : "oAnimationStart",
        "animation" : "animationstart"
      };

      return mapping[this.getName()];
    },


    /**
     * Checks for the event name of animation end.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationIteration : function() {
      // special handling for mixed prefixed / unprefixed implementations
      if (qx.bom.Event.supportsEvent(window, "webkitanimationiteration")) {
        return "webkitAnimationIteration";
      }
      var mapping = {
        "msAnimation" : "MSAnimationIteration",
        "WebkitAnimation" : "webkitAnimationIteration",
        "MozAnimation" : "animationiteration",
        "OAnimation" : "oAnimationIteration",
        "animation" : "animationiteration"
      };

      return mapping[this.getName()];
    },


    /**
     * Checks for the event name of animation end.
     * @internal
     * @return {String} The name of the event.
     */
    getAnimationEnd : function() {
      // special handling for mixed prefixed / unprefixed implementations
      if (qx.bom.Event.supportsEvent(window, "webkitanimationend")) {
        return "webkitAnimationEnd";
      }
      var mapping = {
        "msAnimation" : "MSAnimationEnd",
        "WebkitAnimation" : "webkitAnimationEnd",
        "MozAnimation" : "animationend",
        "OAnimation" : "oAnimationEnd",
        "animation" : "animationend"
      };

      return mapping[this.getName()];
    },


    /**
     * Checks what selector should be used to add keyframes to stylesheets.
     * @internal
     * @return {String|null} The name of the selector or null, if the selector
     *   is not supported.
     */
    getKeyFrames : function() {
      var prefixes = qx.bom.Style.VENDOR_PREFIXES;
      var keyFrames = [];
      for (var i=0; i < prefixes.length; i++) {
        var key = "@" + qx.bom.Style.getCssName(prefixes[i]) + "-keyframes";
        keyFrames.push(key);
      };
      keyFrames.unshift("@keyframes");

      var sheet = qx.bom.Stylesheet.createElement();
      for (var i=0; i < keyFrames.length; i++) {
        try {
          qx.bom.Stylesheet.addRule(sheet, keyFrames[i] + " name", "");
          return keyFrames[i];
        } catch (e) {}
      };

      return null;
    },


    /**
     * Checks for the requestAnimationFrame method and return the prefixed name.
     * @internal
     * @return {String|null} A string the method name or null, if the method
     *   is not supported.
     */
    getRequestAnimationFrame : function() {
      var choices = [
        "requestAnimationFrame",
        "msRequestAnimationFrame",
        "webkitRequestAnimationFrame",
        "mozRequestAnimationFrame",
        "oRequestAnimationFrame" // currently unspecified, so we guess the name!
      ];
      for (var i=0; i < choices.length; i++) {
        if (window[choices[i]] != undefined) {
          return choices[i];
        }
      };

      return null;
    }
  },


  defer : function(statics) {
    qx.core.Environment.add("css.animation", statics.getSupport);
    qx.core.Environment.add("css.animation.requestframe", statics.getRequestAnimationFrame);
  }
});
