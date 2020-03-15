/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * Utility for checking the type of a variable.
 * It adds a <code>type</code> key static to q and offers the given method.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.Type", {
  statics : {
    /**
     * Get the internal class of the value. The following classes are possible:
     * <pre>
     * <code>"String"</code>,
     * <code>"Array"</code>,
     * <code>"Object"</code>,
     * <code>"RegExp"</code>,
     * <code>"Number"</code>,
     * <code>"Boolean"</code>,
     * <code>"Date"</code>,
     * <code>"Function"</code>,
     * <code>"Error"</code>
     * </pre>
     * @attachStatic {qxWeb, type.get}
     * @signature function(value)
     * @param value {var} Value to get the class for.
     * @return {String} The internal class of the value.
     */
    get : qx.Bootstrap.getClass
  },


  defer : function(statics) {
    qxWeb.$attachAll(this, "type");
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
 * This class is responsible for applying CSS3 transforms to the collection.
 * The implementation is mostly a cross browser wrapper for applying the
 * transforms.
 * The API is keep to the spec as close as possible.
 *
 * http://www.w3.org/TR/css3-3d-transforms/
 */
qx.Bootstrap.define("qx.module.Transform",
{
  members :
  {
    /**
     * Method to apply multiple transforms at once to the given element. It
     * takes a map containing the transforms you want to apply plus the values
     * e.g.<code>{scale: 2, rotate: "5deg"}</code>.
     * The values can be either singular, which means a single value will
     * be added to the CSS. If you give an array, the values will be split up
     * and each array entry will be used for the X, Y or Z dimension in that
     * order e.g. <code>{scale: [2, 0.5]}</code> will result in a element
     * double the size in X direction and half the size in Y direction.
     * Make sure your browser supports all transformations you apply.
     *
     * @attach {qxWeb}
     * @param transforms {Map} The map containing the transforms and value.
     * @return {qxWeb} This reference for chaining.
     */
    transform : function(transforms) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.transform(el, transforms);
      });
      return this;
    },


    /**
     * Translates by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {qxWeb}
     * @param value {String|Array} The value to translate e.g. <code>"10px"</code>.
     * @return {qxWeb} This reference for chaining.
     */
    translate : function(value) {
      return this.transform({translate: value});
    },


    /**
     * Scales by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {qxWeb}
     * @param value {Number|Array} The value to scale.
     * @return {qxWeb} This reference for chaining.
     */
    scale : function(value) {
      return this.transform({scale: value});
    },


    /**
     * Rotates by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {qxWeb}
     * @param value {String|Array} The value to rotate e.g. <code>"90deg"</code>.
     * @return {qxWeb} This reference for chaining.
     */
    rotate : function(value) {
      return this.transform({rotate: value});
    },


    /**
     * Skews by the given value. For further details, take
     * a look at the {@link #transform} method.
     *
     * @attach {qxWeb}
     * @param value {String|Array} The value to skew e.g. <code>"90deg"</code>.
     * @return {qxWeb} This reference for chaining.
     */
    skew : function(value) {
      return this.transform({skew: value});
    },


    /**
     * Sets the transform-origin property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     *
     * @attach {qxWeb}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {qxWeb} This reference for chaining.
     */
    setTransformOrigin : function(value) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.setOrigin(el, value);
      });
      return this;
    },


    /**
     * Returns the transform-origin property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-origin-property
     *
     * @attach {qxWeb}
     * @return {String} The set property, e.g. <code>50% 50%</code> or null,
     *   of the collection is empty.
     */
    getTransformOrigin : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Transform.getOrigin(this[0]);
      }
      return "";
    },


    /**
     * Sets the transform-style property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     *
     * @attach {qxWeb}
     * @param value {String} Either <code>flat</code> or <code>preserve-3d</code>.
     * @return {qxWeb} This reference for chaining.
     */
    setTransformStyle : function(value) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.setStyle(el, value);
      });
      return this;
    },


    /**
     * Returns the transform-style property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#transform-style-property
     *
     * @attach {qxWeb}
     * @return {String} The set property, either <code>flat</code> or
     *   <code>preserve-3d</code>.
     */
    getTransformStyle : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Transform.getStyle(this[0]);
      }
      return "";
    },


    /**
     * Sets the perspective property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     *
     * @attach {qxWeb}
     * @param value {Number} The perspective layer. Numbers between 100
     *   and 5000 give the best results.
     * @return {qxWeb} This reference for chaining.
     */
    setTransformPerspective : function(value) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.setPerspective(el, value);
      });
      return this;
    },


    /**
     * Returns the perspective property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-property
     *
     * @attach {qxWeb}
     * @return {String} The set property, e.g. <code>500</code>
     */
    getTransformPerspective : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Transform.getPerspective(this[0]);
      }
      return "";
    },


    /**
     * Sets the perspective-origin property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     *
     * @attach {qxWeb}
     * @param value {String} CSS position values like <code>50% 50%</code> or
     *   <code>left top</code>.
     * @return {qxWeb} This reference for chaining.
     */
    setTransformPerspectiveOrigin : function(value) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.setPerspectiveOrigin(el, value);
      });
      return this;
    },


    /**
     * Returns the perspective-origin property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#perspective-origin-property
     *
     * @attach {qxWeb}
     * @return {String} The set property, e.g. <code>50% 50%</code>
     */
    getTransformPerspectiveOrigin : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Transform.getPerspectiveOrigin(this[0]);
      }
      return "";
    },


    /**
     * Sets the backface-visibility property.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     *
     * @attach {qxWeb}
     * @param value {Boolean} <code>true</code> if the backface should be visible.
     * @return {qxWeb} This reference for chaining.
     */
    setTransformBackfaceVisibility : function(value) {
      this._forEachElement(function(el) {
        qx.bom.element.Transform.setBackfaceVisibility(el, value);
      });
      return this;
    },


    /**
     * Returns the backface-visibility property of the first element.
     *
     * Spec: http://www.w3.org/TR/css3-3d-transforms/#backface-visibility-property
     *
     * @attach {qxWeb}
     * @return {Boolean} <code>true</code>, if the backface is visible.
     */
    getTransformBackfaceVisibility : function() {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Transform.getBackfaceVisibility(this[0]);
      }
      return "";
    }
  },


  defer : function(statics) {
    qxWeb.$attachAll(this);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2014 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * Normalization for pointer events. Pointer events are hardware-agnostic and
 * will be fired regardless of which input type of input device is used (e.g. mouse or touchscreen).
 *
 * @require(qx.module.Event)
 * @require(qx.module.event.Pointer#getPointerType) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getViewportLeft) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getViewportTop) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getDocumentLeft) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getDocumentTop) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getScreenLeft) // static code analysis - this method has to referenced
 * @require(qx.module.event.Pointer#getScreenTop) // static code analysis - this method has to referenced
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Pointer", {
  statics :
  {
    /**
     * List of event types to be normalized
     */
    TYPES : ["pointerdown", "pointerup", "pointermove", "pointercancel", "pointerover", "pointerout"],


    /**
     * Returns the device type which the event triggered. This can be one
     * of the following strings: <code>mouse</code>, <code>pen</code>
     * or <code>touch</code>.
     *
     * @return {String} The type of the pointer.
     */
    getPointerType : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the horizontal coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The horizontal mouse position
     */
    getViewportLeft : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the vertical coordinate at which the event occurred relative
     * to the viewport.
     *
     * @return {Number} The vertical mouse position
     * @signature function()
     */
    getViewportTop : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the horizontal position at which the event occurred relative to the
     * left of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The horizontal mouse position in the document.
     */
    getDocumentLeft : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the vertical position at which the event occurred relative to the
     * top of the document. This property takes into account any scrolling of
     * the page.
     *
     * @return {Number} The vertical mouse position in the document.
     */
    getDocumentTop : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the horizontal coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The horizontal mouse position on the screen.
     */
    getScreenLeft : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Get the vertical coordinate at which the event occurred relative to
     * the origin of the screen coordinate system.
     *
     * Note: This value is usually not very useful unless you want to
     * position a native popup window at this coordinate.
     *
     * @return {Number} The vertical mouse position on the screen.
     */
    getScreenTop : function() {
      // stub for documentation. Implementation is in qx.event.type.dom.Pointer
      return false;
    },


    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element)
    {
      if (!event) {
        return event;
      }

      qx.event.type.dom.Pointer.normalize(event);
      return event;
    }
  },

  defer : function(statics) {
    qxWeb.$registerEventNormalization(qx.module.event.Pointer.TYPES, statics.normalize);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */

/**
 * HTML templating module. This is a wrapper for mustache.js which is a
 * "framework-agnostic way to render logic-free views".
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 */
qx.Bootstrap.define("qx.module.Template", {
  statics :
  {
    /**
     * Helper method which provides direct access to templates stored as HTML in
     * the DOM. The DOM node with the given ID will be treated as a template,
     * parsed and a new DOM element will be returned containing the parsed data.
     * Keep in mind that templates can only have one root element.
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @attachStatic{qxWeb, template.get}
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {qxWeb} Collection containing a single DOM element with the parsed
     * template data.
     */
    get : function(id, view, partials) {
      var el = qx.bom.Template.get(id, view, partials);
      el = qx.module.Template.__wrap(el);
      return qxWeb.$init([el], qxWeb);
    },

    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit <a href="https://github.com/janl/mustache.js">mustache.js</a>.
     *
     * @attachStatic{qxWeb, template.render}
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render : function(template, view, partials) {
      return qx.bom.Template.render(template, view, partials);
    },

    /**
     * Combines {@link #render} and {@link #get}. Input is equal to {@link #render}
     * and output is equal to {@link #get}. The advantage over {@link #get}
     * is that you don't need a HTML template but can use a template
     * string and still get a collection. Keep in mind that templates
     * can only have one root element.
     *
     * @attachStatic{qxWeb, template.renderToNode}
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {qxWeb} Collection containing a single DOM element with the parsed
     * template data.
     */
    renderToNode : function(template, view, partials) {
      var el = qx.bom.Template.renderToNode(template, view, partials);
      el = qx.module.Template.__wrap(el);
      return qxWeb.$init([el], qxWeb);
    },


    /**
     * If the given node is a DOM text node, wrap it in a span element and return
     * the wrapper.
     * @param el {Node} a DOM node
     * @return {Element} Original element or wrapper
     */
    __wrap : function(el) {
      if (qxWeb.isTextNode(el)) {
        var wrapper = document.createElement("span");
        wrapper.appendChild(el);
        el = wrapper;
      }
      return el;
    }
  },


  defer : function(statics) {
    qxWeb.$attachAll(this, "template");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)

************************************************************************ */
/**
 * Utility module to give some support to work with strings.
 *
 * *Info:* The <pre class='javascript'>trim</pre> method is available as <a href="#String">Polyfill</a>.
 *
 * @group (Utilities)
 */
qx.Bootstrap.define("qx.module.util.String", {
  statics : {
    /**
     * Converts a hyphenated string (separated by '-') to camel case.
     *
     * @attachStatic {qxWeb, string.camelCase}
     * @param str {String} hyphenated string
     * @return {String} camelcase string
     */
    camelCase : function(str) {
      return qx.lang.String.camelCase.call(qx.lang.String, str);
    },


    /**
     * Converts a camelcased string to a hyphenated (separated by '-') string.
     *
     * @attachStatic {qxWeb, string.hyphenate}
     * @param str {String} camelcased string
     * @return {String} hyphenated string
     */
    hyphenate : function(str) {
      return qx.lang.String.hyphenate.call(qx.lang.String, str);
    },


    /**
     * Convert the first character of the string to upper case.
     *
     * @attachStatic {qxWeb, string.firstUp}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with an upper case first character
     */
    firstUp : qx.lang.String.firstUp,


    /**
     * Convert the first character of the string to lower case.
     *
     * @attachStatic {qxWeb, string.firstLow}
     * @signature function(str)
     * @param str {String} the string
     * @return {String} the string with a lower case first character
     */
    firstLow : qx.lang.String.firstLow,


    /**
     * Check whether the string starts with the given substring.
     *
     * @attachStatic {qxWeb, string.startsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string starts with the given substring
     */
    startsWith : function (fullstr, substr) {
      return fullstr.startsWith(substr);
    },


    /**
     * Check whether the string ends with the given substring.
     *
     * @attachStatic {qxWeb, string.endsWith}
     * @signature function(fullstr, substr)
     * @param fullstr {String} the string to search in
     * @param substr {String} the substring to look for
     * @return {Boolean} whether the string ends with the given substring
     */
    endsWith : function (fullstr, substr) {
      return fullstr.endsWith(substr);
    },


    /**
     * Escapes all chars that have a special meaning in regular expressions.
     *
     * @attachStatic {qxWeb, string.escapeRegexpChars}
     * @signature function(str)
     * @param str {String} the string where to escape the chars.
     * @return {String} the string with the escaped chars.
     */
    escapeRegexpChars : qx.lang.String.escapeRegexpChars,


    /**
     * Escapes the characters in a <code>String</code> using HTML entities.
     * Supports all known HTML 4.0 entities, including funky accents.
     *
     * @attachStatic {qxWeb, string.escapeHtml}
     * @signature function(str)
     * @param str {String} the String to escape
     * @return {String} a new escaped String
     */
    escapeHtml : qx.bom.String.escape
  },


  defer : function(statics) {
    qxWeb.$attachAll(this, "string");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Romeo Kenfack (rkenfack)

************************************************************************ */

/**
 * Module for handling of HTML5 data-* attributes
 */
qx.Bootstrap.define("qx.module.Dataset", {

  members: {

    /**
     * Sets an HTML "data-*" attribute on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Name of the attribute [CamelCase variant]
     * @param value {var} New value of the attribute
     * @return {qxWeb} The collection for chaining
     */
    setData : function(name, value)
    {
      this._forEachElement(function(item) {
        qx.bom.element.Dataset.set(item, name, value);
      });

      return this;
    },


    /**
     *
     * Returns the value of the given HTML "data-*" attribute for the first item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Name of the attribute [CamelCase variant]
     * @return {var} The value of the attribute
     *
     */
    getData : function(name)
    {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Dataset.get(this[0], name);
      }
    },

    /**
     * Returns a map containing all the HTML "data-*" attributes of the specified element
     *
     * @attach {qxWeb}
     * @return {Map} The map containing the "data-*" attributes
     *
     */
    getAllData : function()
    {
      if (this[0] && this[0].nodeType === 1) {
        return qx.bom.element.Dataset.getAll(this[0]);
      }
      return {};
    },


    /**
    * Checks if any element in the collection has a "data-*" attribute
    * @return {Boolean} True if any element in the collection has a "data-*" attribute
    */
    hasData : function() {
      return qx.bom.element.Dataset.hasData(this[0]);
    },


    /**
     * Remove an HTML "data-*" attribute on each item in the collection
     *
     * @attach {qxWeb}
     * @param name {String} Name of the attribute
     * @return {qxWeb} The collection for chaining
     */
    removeData : function(name)
    {
      this._forEachElement(function(item) {
        qx.bom.element.Dataset.remove(item, name);
      });

      return this;
    }

  },

  defer : function(statics)
  {
    qxWeb.$attachAll(this);

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

   Author:
     * Gabriel Munteanu (gabios)

************************************************************************ */


/**
 * Data-* attribute handling for DOM HTML elements.
 *
 * This feature set is supported cross-browser
 * through one common interface and is independent of the differences between
 * the multiple implementations.
 *
 */
qx.Bootstrap.define("qx.bom.element.Dataset",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /**
     * Sets a data attribute on the given DOM element.
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute [CamelCase variant]
     * @param value {var} New value of the attribute
     */
    set : function(element, name, value) {
      if (element.dataset) {
        name = qx.lang.String.camelCase(name);
        if ((value === null) || (value == undefined)) {
           delete element.dataset[name];
        } else {
          element.dataset[name] = value;
        }
      } else {
        if ((value === null) || (value == undefined)) {
          qx.bom.element.Attribute.reset(element, "data-" + qx.lang.String.hyphenate(name));
        } else {
          qx.bom.element.Attribute.set(element, "data-" + qx.lang.String.hyphenate(name), value);
        }
      }
    },


    /**
     * Returns the value of the given HTML "data-*" attribute
     *
     * @param element {Element} The DOM element to query
     * @param name {String} Name of the attribute [CamelCase variant]
     * @return {var} The value of the attribute
     *
     */
    get : function(element, name) {
      if (element.dataset) {
        name = qx.lang.String.camelCase(name);
        return (!element.dataset[name] ? undefined : element.dataset[name]);
      } else {
        var attrName = "data-" + qx.lang.String.hyphenate(name);
        return element.hasAttribute(attrName) ?
          qx.bom.element.Attribute.get(element, attrName) : undefined;
      }
    },


    /**
     * Returns a map containing all the HTML "data-*" attributes of the specified element
     *
     * @param element {Element} The DOM element to query
     * @return {Map} The map containing all the "data-*" attributes
     */
    getAll : function(element) {
      if (element.dataset) {
        return element.dataset;
      } else {
        var res = {}, attr = element.attributes;
        for (var i=0; i < attr.length; i++) {
          if (attr[i].name.match(RegExp("^data-(.*)"))) {
            var key = RegExp.$1;
            res[qx.lang.String.camelCase(key)] = element.getAttribute(attr[i].name);
          }
        }
        return res;
      }
    },


    /**
    * Checks if any element in the collection has a "data-*" attribute
    * @param element {Element} The DOM Element to check the presence of data-* attributes on.
    * @return {Boolean} True if any element in the collection has a "data-*" attribute
    */
    hasData : function(element)
    {
      return Object.keys(qxWeb(element).getAllData()).length > 0;
    },


    /**
     * Remove an HTML "data-*" attribute from the given DOM element
     *
     * @param element {Element} The DOM element to modify
     * @param name {String} Name of the attribute
     */
    remove : function(element, name) {
      this.set(element, name, undefined);
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * Common normalizations for native events
 *
 * @require(qx.module.Event)
 * @require(qx.bom.Event#getTarget)
 * @require(qx.bom.Event#getRelatedTarget)
 *
 * @group (Event_Normalization)
 */
qx.Bootstrap.define("qx.module.event.Native", {
  statics :
  {
    /**
     * List of event types to be normalized
     */
    TYPES : ["*"],


    /**
     * List of qx.bom.Event methods to be attached to native event objects
     * @internal
     */
    FORWARD_METHODS : ["getTarget", "getRelatedTarget"],


    /**
     * List of qx.module.event.Native methods to be attached to native event objects
     * @internal
     */
    BIND_METHODS : ["preventDefault", "stopPropagation", "getType"],


    /**
     * Prevent the native default behavior of the event.
     */
    preventDefault : function()
    {
      try {
        // this allows us to prevent some key press events in IE.
        // See bug #1049
        this.keyCode = 0;
      } catch(ex) {}

      this.returnValue = false;
    },


    /**
     * Stops the event's propagation to the element's parent
     */
    stopPropagation : function()
    {
      this.cancelBubble = true;
    },


    /**
     * Returns the event's type
     *
     * @return {String} event type
     */
    getType : function()
    {
      return this._type || this.type;
    },


    /**
     * Returns the target of the event.
     *
     * @signature function ()
     * @return {Object} Any valid native event target
     */
    getTarget : function() {},


    /**
     * Computes the related target from the native DOM event
     *
     * @signature function ()
     * @return {Element} The related target
     */
    getRelatedTarget : function() {},


    /**
     * Computes the current target from the native DOM event. Emulates the current target
     * for all browsers without native support (like older IEs).
     *
     * @signature function ()
     * @return {Element} The current target
     */
    getCurrentTarget : function() {},

    /**
     * Manipulates the native event object, adding methods if they're not
     * already present
     *
     * @param event {Event} Native event object
     * @param element {Element} DOM element the listener was attached to
     * @return {Event} Normalized event object
     * @internal
     */
    normalize : function(event, element) {
      if (!event) {
        return event;
      }
      var fwdMethods = qx.module.event.Native.FORWARD_METHODS;
      for (var i=0, l=fwdMethods.length; i<l; i++) {
        event[fwdMethods[i]] = qx.bom.Event[fwdMethods[i]].bind(null, event);
      }

      var bindMethods = qx.module.event.Native.BIND_METHODS;
      for (var i=0, l=bindMethods.length; i<l; i++) {
        if (typeof event[bindMethods[i]] != "function") {
          event[bindMethods[i]] = qx.module.event.Native[bindMethods[i]].bind(event);
        }
      }

      event.getCurrentTarget = function()
      {
        return event.currentTarget || element;
      };

      return event;
    }
  },

  defer : function(statics) {
    qxWeb.$registerEventNormalization(statics.TYPES, statics.normalize);
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * This is the base collection for all widgets and offers a good foundation
 * for all widgets including enabled state handling, config and template storage
 * and event handling to name a few key features.
 *
 * @require(qx.module.Dataset)
 * @require(qx.module.util.String)
 * @require(qx.module.event.Native)
 *
 * @group (Widget)
 */
qx.Bootstrap.define("qx.ui.website.Widget", {
  extend : qxWeb,
  
  implement: [ qx.core.IDisposable ],

  statics : {

    /**
     * Factory method for the widget which converts a standard
     * collection into a collection of widgets.
     *
     * @return {qx.ui.website.Widget} A widget.
     *
     * @attach {qxWeb}
     */
    widget : function() {
      var widget = new qx.ui.website.Widget(this);
      widget.init();
      return widget;
    },


    /**
     * Creates a new collection from the given argument. This can either be an
     * HTML string, a single DOM element or an array of elements
     *
     * @param html {String|Element[]} HTML string or DOM element(s)
     * @return {qxWeb} Collection of elements
     */
    create : function(html) {
      return new qx.ui.website.Widget(qxWeb.create(html));
    },


    /**
     * Fetches elements with a data attribute named <code>data-qx-class</code>
     * containing the class name of the desired widget and initializes them as
     * widgets.
     *
     * @param selector {String?} Optional selector expression or filter function to
     * restrict the list of elements
     * @attachStatic {qxWeb}
     */
    initWidgets : function(selector) {
      var elements = qxWeb("*[data-qx-class]");
      if (selector) {
        elements = elements.filter(selector);
      }
      elements._forEachElementWrapped(function(widget) {
        widget.init();
      });
    },


    /**
     * Returns a wrapper Array that maps the widget API available on
     * the first item in the current collection to all items in the
     * collection.
     *
     * @attach {qxWeb}
     * @return {qxWeb[]} Collection of widgets
     */
    toWidgetCollection: function() {
      var args = this.toArray().map(function(el) { return qxWeb(el); });

      // Set the context for the 'bind' call (will be replaced by new)
      Array.prototype.unshift.call(args, null);
      // Create temporary constructor with bound arguments
      var Temp = qx.core.Wrapper.bind.apply(qx.core.Wrapper, args);

      return new Temp();
    }
  },


  construct : function(selector, context) {
    var col = this.base(arguments, selector, context);
    if (col.length > 1) {
      throw new Error("The collection must not contain more than one element.");
    }
    Array.prototype.push.apply(this, Array.prototype.slice.call(col, 0, col.length));
  },


  members : {
    __cssPrefix : null,


    /**
     * Responsible for initializing of the widget. This checks for the data attribute
     * named <code>data-qx-class</code> and initializes the widget if necessary.
     * @return {Boolean} <code>true</code> if the widget has been initialized
     */
    init : function() {
      if (this.getProperty("$$qx-widget-initialized")) {
        return false;
      }
      this.setAttribute("data-qx-class", this.classname);
      this.addClass("qx-widget");
      this.addClass(this.getCssPrefix());
      this.setProperty("$$qx-widget-initialized", true);
      if(this[0]) {
        this[0].$widget = this;
      }
      return true;
    },


    /**
     * Return the proper CSS prefix for the current widget. This prefix is
     * based on the current classname.
     *
     * @return {String} The CSS prefix for the current object.
     */
    getCssPrefix : function() {
      if (!this.__cssPrefix) {
        var split = this.classname.split(".");
        this.__cssPrefix = "qx-" + split[split.length - 1].toLowerCase();
      }
      return this.__cssPrefix;
    },


    /**
     * Changes the enabled state of the current collection, which means all
     * widgets in the collection. This sets the disabled attribute on the
     * elements and all its children.
     *
     * @param value {Boolean} The enabled value.
     * @return {qx.ui.website.Widget} The collection for chaining
     */
    setEnabled : function(value) {
      this.setAttribute("disabled", !value);
      this.find("*").setAttribute("disabled", !value);
      return this;
    },


    /**
     * Returns weather the first widget in the collection is enabled or not.
     *
     * @return {Boolean} The enabled state of the collection.
     */
    getEnabled : function() {
      return !this.getAttribute("disabled");
    },


    /**
     * Setter for the widget-specific templates. The available templates can
     * be found in the documentation of the corresponding widget. The templates
     * will be rendered using
     * <a href='https://github.com/janl/mustache.js/'>mustache.js</a>.
     *
     * Please keep in mind to call {@link #render} after you change any
     * template or config setting.
     *
     * @param name {String} The name of the template.
     * @param template {String} The template string.
     *
     * @return {qx.ui.website.Widget} The widget instance for chaining.
     */
    setTemplate : function(name, template) {
      return this._setData("templates", name, template);
    },


    /**
     * Setter for the widget-specific config. The available config settings can
     * be found in the documentation of the corresponding widget. Each config
     * setting can be set in the markup as data-attribute, prefixed with
     * <code>data-qx</code> e.g. <code>data-qx-length="5"</code>.
     *
     * Please keep in mind to call {@link #render} after you change any
     * template or config setting.
     *
     * @param name {String} The name of the config setting.
     * @param config {var} The value of the config setting.
     * @return {qx.ui.website.Widget} The widget instance for chaining.
     */
    setConfig : function(name, config) {
      return this._setData("config", name, config);
    },


    /**
     * Helper to set either config or template values.
     *
     * @param type {String} Either <code>templates</code> or <code>config</code>.
     * @param name {String} The name for the value to store.
     * @param data {var} The data to store.
     * @return {qx.ui.website.Widget} The widget instance for chaining.
     */
    _setData : function(type, name, data) {
      if (!this["$$storage_" + type]) {
        this["$$storage_" + type] = {};
      }
      this["$$storage_" + type][name] = data;

      return this;
    },


    /**
     * Returns the used template. This includes custom templates
     * as the default templates defined by the widgets.
     *
     * @param name {String} The name of the template.
     * @return {String} The template string or <code>undefined</code>.
     */
    getTemplate : function(name) {
      return this._getData("templates", name);
    },


    /**
     * Returns the config setting currently in use for the given widget.
     * This can either be the user set config value, the value set in
     * the markup via data-attribute, the widgets default config value or
     * <code>undefined</code>, if non is set.
     *
     * @param name {String} The name of the config.
     * @return {var} The value of the config or <code>undefined</code>.
     */
    getConfig : function(name) {
      return this._getData("config", name);
    },


    /**
     * Internal helper for querying the values for templates and configs. In the
     * case of a config value, the method also reads the corresponding data-attribute
     * for possible values.
     *
     * @param type {String} Either <code>templates</code> or <code>config</code>.
     * @param name {String} The name for the value to fetch.
     * @return {var} The value store for the given arguments.
     */
    _getData : function(type, name) {
      var storage = this["$$storage_" + type];
      var item;

      if (storage) {
        item = storage[name];
      }

      if (item === undefined && type == "config") {
        var attribName = "qx" + qxWeb.string.firstUp(type) +
          qxWeb.string.firstUp(name);
        item = this.getData(attribName);

        // not defined HTML attributes result in 'null' values
        if (!this[0] || (!this[0].dataset && item === null)) {
          item = undefined;
        }

        try {
          item = JSON.parse(item);
        } catch(e) {}
      }

      if (item === undefined && this.constructor["_" + type]) {
        return this.constructor["_" + type][name];
      }

      return item;
    },


    /**
     * The render method is responsible for applying changed config
     * and template settings. This method is usually overridden and specified
     * by the subclassing widgets like the slider or tabs.
     *
     * @return {qx.ui.website.Widget} The widget collection for chaining.
     */
    render : function() {
      // empty method
      return this;
    },


    /**
     * Dispose the widget, making sure all objects are ready for
     * garbage collection. This mainly means deleting connections to the
     * DOM including event listeners.
     * @return {qxWeb} Plain qxWeb collection
     */
    dispose : function() {
      this.removeAttribute("data-qx-class");
      this.setProperty("config", undefined);
      this.setProperty("templates", undefined);
      var contextProperty = this.classname.replace(/\./g, "-") + "-context";
      this.setProperty(contextProperty, undefined);
      this.setProperty("$$qx-widget-initialized", undefined);
      this.removeClass("qx-widget");
      this.removeClass(this.getCssPrefix());

      for (var name in this.constructor.$$events) {
        this.allOff(name);
      }

      this[0].$widget = null;

      return qxWeb.$init(this, qxWeb);
    }
  },


  defer : function(statics) {
    qxWeb.$attach({
      widget: statics.widget,
      toWidgetCollection : statics.toWidgetCollection
    });
    qxWeb.$attachStatic({
      initWidgets : statics.initWidgets
    });
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2014-2015 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */
/**
 * Generic wrapper instance which wrapps a set of objects and forwards the API of
 * the first object to all objects in the array.
 */
qx.Bootstrap.define("qx.core.Wrapper", {
  extend : Array,
  construct : function() {
    for (var i=0, l=arguments.length; i<l; i++) {
      this.push(arguments[i]);
    }

    var firstItem = arguments[0];
    for (var name in firstItem) {

      if (this[name] !== undefined) {
        continue;
      }

      if (firstItem[name] instanceof Function) {
        this[name] = function(name) {
          var firstReturnValue;

          var args = Array.prototype.slice.call(arguments, 0);
          args.shift();

          this.forEach(function(item) {
            var returnValue = item[name].apply(item, args);
            if (firstReturnValue === undefined) {
              firstReturnValue = returnValue;
            }
          });

          // return the collection if the return value was the collection
          if (firstReturnValue === this[0]) {
            return this;
          }
          return firstReturnValue;
        }.bind(this, name);
      } else {
        Object.defineProperty(this, name, {
          enumerable: true,
          get: function(name) {
            return this[name];
          }.bind(firstItem, name),
          set: function(name, value) {
            this.forEach(function(item) {
              item[name] = value;
            });
          }.bind(this, name)
        });
      }
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2013 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (wittemann)
     * Daniel Wagner (danielwagner)

************************************************************************ */

/**
 * The Slider control is used to select a numerical value from a given range.
 * It supports custom minimum/maximum values, step sizes and offsets (which limit
 * the knob's range).
 *
 * <h2>Markup</h2>
 * The Slider contains a single button element (the knob), which will be
 * created if it's not already present.
 *
 * <h2>CSS Classes</h2>
 * <table>
 *   <thead>
 *     <tr>
 *       <td>Class Name</td>
 *       <td>Applied to</td>
 *       <td>Description</td>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>qx-slider</code></td>
 *       <td>Container element</td>
 *       <td>Identifies the Slider widget</td>
 *     </tr>
 *     <tr>
 *       <td><code>qx-slider-knob</code></td>
 *       <td>Slider knob (button)</td>
 *       <td>Identifies and styles the Slider's draggable knob</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h2 class="widget-markup">Generated DOM Structure</h2>
 *
 * @require(qx.module.event.Pointer)
 * @require(qx.module.Transform)
 * @require(qx.module.Template)
 * @require(qx.module.util.Type)
 *
 *
 * @group (Widget)
 */
qx.Bootstrap.define("qx.ui.website.Slider",
{
  extend : qx.ui.website.Widget,

  statics : {
    /**
     * *step*
     *
     * The steps can be either a number or an array of predefined steps. In the
     * case of a number, it defines the amount of each step. In the case of an
     * array, the values of the array will be used as step values.
     *
     * Default value: <pre>1</pre>
     *
     *
     * *minimum*
     *
     * The minimum value of the slider. This will only be used if no explicit
     * steps are given.
     *
     * Default value: <pre>0 </pre>
     *
     *
     * *maximum*
     *
     * The maximum value of the slider. This will only be used if no explicit
     * steps are given.
     *
     * Default value: <pre>100</pre>
     *
     *
     * *offset*
     *
     * The amount of pixel the slider should be position away from its left and
     * right border.
     *
     * Default value: <pre>0 </pre>
     */
    _config : {
      minimum : 0,
      maximum : 100,
      offset : 0,
      step : 1
    },


    /**
     * *knobContent*
     *
     * The content of the knob element.
     *
     * Default value: <pre>{{value}}</pre>
     */
    _templates : {
      knobContent : "{{value}}"
    },


    /**
     * Factory method which converts the current collection into a collection of
     * slider widgets.
     *
     * @param value {Number?} The initial value of each slider widget
     * @param step {Number|Array?} The step config value to configure the step
     * width or the steps as array of numbers.
     * @return {qx.ui.website.Slider} A new Slider collection.
     * @attach {qxWeb}
     */
    slider : function(value, step) {
      var slider = new qx.ui.website.Slider(this);
      slider.init();
      if (typeof step !== "undefined") {
        slider.setConfig("step", step);
      }
      if (typeof value !== "undefined") {
        slider.setValue(value);
      } else {
        slider.setValue(slider.getConfig("minimum"));
      }

      return slider;
    }
  },

  construct : function(selector, context) {
    this.base(arguments, selector, context);
  },

  events :
  {
    /** Fired at each value change */
    "changeValue" : "Number",

    /** Fired with each pointer move event */
    "changePosition" : "Number"
  },


  members :
  {
    __dragMode : null,
    _value : 0,

    init : function() {
      if (!this.base(arguments)) {
        return false;
      }

      var cssPrefix = this.getCssPrefix();

      if (!this.getValue()) {
        var step = this.getConfig("step");
        var defaultVal= qxWeb.type.get(step) == "Array" ? step[0] : this.getConfig("minimum");
        this._value = defaultVal;
      }

      this.on("pointerup", this._onSliderPointerUp, this)
      .on("focus", this._onSliderFocus, this)
      .setStyle("touch-action", "pan-y");
      qxWeb(document).on("pointerup", this._onDocPointerUp, this);
      qxWeb(window).on("resize", this._onWindowResize, this);

      if (this.getChildren("." + cssPrefix + "-knob").length === 0) {
        this.append(qx.ui.website.Widget.create("<button>")
        .addClass(cssPrefix + "-knob"));
      }

      this.getChildren("." + cssPrefix + "-knob")
      .setAttributes({
        "draggable": "false",
        "unselectable": "true"
      })
      .setHtml(this._getKnobContent())
      .on("pointerdown", this._onPointerDown, this)
      .on("dragstart", this._onDragStart, this)
      .on("focus", this._onKnobFocus, this)
      .on("blur", this._onKnobBlur, this);
      this.render();

      return true;
    },


    /**
     * Returns the current value of the slider
     *
     * @return {Integer} slider value
     */
    getValue : function() {
      return this._value;
    },

    /**
     * Sets the current value of the slider.
     *
     * @param value {Integer} new value of the slider
     *
     * @return {qx.ui.website.Slider} The collection for chaining
     */
    setValue : function(value)
    {
      if (qxWeb.type.get(value) != "Number") {
        throw Error("Please provide a Number value for 'value'!");
      }

      var step = this.getConfig("step");
      if (qxWeb.type.get(step) != "Array") {
        var min = this.getConfig("minimum");
        var max = this.getConfig("maximum");
        if (value < min) {
          value = min;
        }
        if (value > max) {
          value = max;
        }
        if (qxWeb.type.get(step) == "Number") {
          value = Math.round(value / step) * step;
        }
      }

      this._value = value;

      if (qxWeb.type.get(step) != "Array" || step.indexOf(value) != -1) {
        this.__valueToPosition(value);
        this.getChildren("." + this.getCssPrefix() + "-knob")
          .setHtml(this._getKnobContent());
        this.emit("changeValue", value);
      }

      return this;
    },


    render : function() {
      var step = this.getConfig("step");
      if (qxWeb.type.get(step) == "Array") {
        this._getPixels();
        if (step.indexOf(this.getValue()) == -1) {
          this.setValue(step[0]);
        } else {
          this.setValue(this.getValue());
        }
      } else if (qxWeb.type.get(step) == "Number") {
        this.setValue(Math.round(this.getValue() / step) * step);
      } else {
        this.setValue(this.getValue());
      }
      this.getChildren("." + this.getCssPrefix() + "-knob")
        .setHtml(this._getKnobContent());

      return this;
    },


    /**
     * Returns the content that should be displayed in the knob
     * @return {String} knob content
     */
    _getKnobContent : function() {
      return qxWeb.template.render(
        this.getTemplate("knobContent"), {value: this.getValue()}
      );
    },


    /**
     * Returns half of the slider knob's width, used for positioning
     * @return {Integer} half knob width
     */
    _getHalfKnobWidth : function() {
      var knobWidth = this.getChildren("." + this.getCssPrefix() + "-knob").getWidth();
      return Math.round(parseFloat(knobWidth / 2));
    },


    /**
     * Returns the boundaries (in pixels) of the slider's range of motion
     * @return {Map} a map with the keys <code>min</code> and <code>max</code>
     */
    _getDragBoundaries : function()
    {
      var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
      var paddingRight = Math.ceil(parseFloat(this.getStyle("paddingRight")) || 0);
      var offset = this.getConfig("offset");
      return {
        min : this.getOffset().left + offset + paddingLeft,
        max : this.getOffset().left + this.getWidth() - offset - paddingRight
      };
    },


    /**
     * Creates a lookup table to get the pixel values for each slider step
     * and computes the "breakpoint" between two steps in pixel.
     *
     * @return {Integer[]} list of pixel values
     */
    _getPixels : function()
    {
      var step = this.getConfig("step");
      if (qxWeb.type.get(step) != "Array") {
        return [];
      }

      var dragBoundaries = this._getDragBoundaries();
      var pixel = [];

      // First pixel value is fixed
      pixel.push(dragBoundaries.min);

      var lastIndex = step.length-1;

      var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
      var paddingRight = Math.ceil(parseFloat(this.getStyle("paddingRight")) || 0);

      //The width really used by the slider (drag area)
      var usedWidth = this.getWidth() - (this.getConfig("offset") * 2) - paddingLeft - paddingRight;

      //The width of a single slider step
      var stepWidth = usedWidth/(step[lastIndex] - step[0]);

      var stepCount = 0;

      for(var i=1, j=step.length-1; i<j; i++){
        stepCount = step[i] - step[0];
        pixel.push(Math.round(stepCount*stepWidth) + dragBoundaries.min);
      }

      // Last pixel value is fixed
      pixel.push(dragBoundaries.max);

      return pixel;
    },


    /**
    * Returns the nearest existing slider value according to he position of the knob element.
    * @param position {Integer} The current knob position in pixels
    * @return {Integer} The next position to snap to
    */
    _getNearestValue : function(position) {
      var pixels = this._getPixels();
      if (pixels.length === 0) {

        var dragBoundaries = this._getDragBoundaries();
        var availableWidth = dragBoundaries.max - dragBoundaries.min;
        var relativePosition = position - dragBoundaries.min;
        var fraction = relativePosition / availableWidth;
        var min = this.getConfig("minimum");
        var max = this.getConfig("maximum");
        var result = (max - min) * fraction + min;
        if (result < min) {
          result = min;
        }
        if (result > max) {
          result = max;
        }
        var step = this.getConfig("step");
        if (qxWeb.type.get(step) == "Number") {
          result = Math.round(result / step) * step;
        }
        return result;
      }

      var currentIndex = 0, before = 0, after = 0;
      for (var i=0, j=pixels.length; i<j; i++) {
        if (position >= pixels[i]) {
          currentIndex = i;
          before = pixels[i];
          after = pixels[i+1] || before;
        } else {
          break;
        }
      }

      currentIndex = Math.abs(position - before) <=  Math.abs(position - after) ? currentIndex : currentIndex + 1;

      return this.getConfig("step")[currentIndex];
    },


    /**
     * Reads the pointer's position and sets slider value to the nearest step.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onSliderPointerUp : function(e) {
      if ((e.getDocumentLeft() === 0 && e.getDocumentTop() === 0) ||
        !this.getEnabled()) {
        return;
      }
      this.setValue(this._getNearestValue(e.getDocumentLeft()));
    },


    /**
     * Listener for the pointerdown event. Initializes drag or tracking mode.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onPointerDown : function(e) {
      // this can happen if the user releases the button while dragging outside
      // of the browser viewport
      if (this.__dragMode) {
        return;
      }

      this.__dragMode = true;

      qxWeb(document.documentElement).on("pointermove", this._onPointerMove, this)
      .setStyle("cursor", "pointer");

      e.stopPropagation();
    },


    /**
     * Listener for the pointerup event. Used for cleanup of previously
     * initialized modes.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onDocPointerUp : function(e) {
      if (this.__dragMode === true) {
        // Cleanup status flags
        delete this.__dragMode;

        this.__valueToPosition(this.getValue());

        qxWeb(document.documentElement).off("pointermove", this._onPointerMove, this)
        .setStyle("cursor", "auto");
        e.stopPropagation();
      }
    },


    /**
     * Listener for the pointermove event for the knob. Only used in drag mode.
     *
     * @param e {qx.event.Emitter} Incoming event object
     */
    _onPointerMove : function(e) {
      e.preventDefault();

      if (this.__dragMode) {
        var dragPosition = e.getDocumentLeft();
        var dragBoundaries = this._getDragBoundaries();
        var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
        var positionKnob = dragPosition - this.getOffset().left - this._getHalfKnobWidth() - paddingLeft;

        if (dragPosition >= dragBoundaries.min && dragPosition <= dragBoundaries.max) {
          this.setValue(this._getNearestValue(dragPosition));
          if (positionKnob > 0) {
            this._setKnobPosition(positionKnob);
            this.emit("changePosition", positionKnob);
          }
        }
        e.stopPropagation();
      }
    },


    /**
     * Prevents drag event propagation
     * @param e {Event} e drag start event
     */
    _onDragStart : function(e) {
      e.stopPropagation();
      e.preventDefault();
    },


    /**
     * Delegates the Slider's focus to the knob
     * @param e {Event} focus event
     */
    _onSliderFocus : function(e) {
      this.getChildren("." + this.getCssPrefix() + "-knob").focus();
    },


    /**
     * Attaches the event listener for keyboard support to the knob on focus
     * @param e {Event} focus event
     */
    _onKnobFocus : function(e) {
      this.getChildren("." + this.getCssPrefix() + "-knob")
        .on("keydown", this._onKeyDown, this);
    },


    /**
     * Removes the event listener for keyboard support from the knob on blur
     * @param e {Event} blur event
     */
    _onKnobBlur : function(e) {
      this.getChildren("." + this.getCssPrefix() + "-knob")
        .off("keydown", this._onKeyDown, this);
    },


    /**
     * Moves the knob if the left or right arrow key is pressed
     * @param e {Event} keydown event
     */
    _onKeyDown : function(e) {
      var newValue;
      var currentValue = this.getValue();
      var step = this.getConfig("step");
      var stepType = qxWeb.type.get(step);
      var key = e.getKeyIdentifier();
      var idx;
      if (key == "Right") {
        if (stepType === "Array") {
          idx = step.indexOf(currentValue);
          if (idx !== undefined) {
            newValue = step[idx + 1] || currentValue;
          }
        } else if (stepType === "Number") {
          newValue = currentValue + step;
        }
        else {
          newValue = currentValue + 1;
        }
      }
      else if (key == "Left") {
        if (stepType === "Array") {
          idx = step.indexOf(currentValue);
          if (idx !== undefined) {
            newValue = step[idx - 1] || currentValue;
          }
        } else if (stepType === "Number") {
          newValue = currentValue - step;
        }
        else {
          newValue = currentValue - 1;
        }
      } else {
        return;
      }

      this.setValue(newValue);
    },


    /**
    * Applies the horizontal position
    * @param x {Integer} the position to move to
    */
    _setKnobPosition : function(x) {
      var knob = this.getChildren("." + this.getCssPrefix() + "-knob");
      if (qxWeb.env.get("css.transform")) {
        knob.translate([x + "px", 0, 0]);
      } else {
        knob.setStyle("left", x + "px");
      }
    },


    /**
     * Listener for window resize events. This listener method resets the
     * calculated values which are used to position the slider knob.
     */
    _onWindowResize : function() {
      if (qxWeb.type.get(this.getConfig("step")) == "Array") {
        this._getPixels();
      }
      this.__valueToPosition(this._value);
    },


    /**
     * Positions the slider knob to the given value and fires the "changePosition"
     * event with the current position as integer.
     *
     * @param value {Integer} slider step value
     */
    __valueToPosition : function(value)
    {
      var pixels = this._getPixels();
      var paddingLeft = Math.ceil(parseFloat(this.getStyle("paddingLeft")) || 0);
      var valueToPixel;
      if (pixels.length > 0) {
        // Get the pixel value of the current step value
        valueToPixel = pixels[this.getConfig("step").indexOf(value)] - paddingLeft;
      } else {
        var dragBoundaries = this._getDragBoundaries();
        var availableWidth = dragBoundaries.max - dragBoundaries.min;
        var range = this.getConfig("maximum") - this.getConfig("minimum");
        var fraction = (value - this.getConfig("minimum")) / range;
        valueToPixel = (availableWidth * fraction) + dragBoundaries.min - paddingLeft;
      }

      // relative position is necessary here
      var position = valueToPixel - this.getOffset().left - this._getHalfKnobWidth();
      this._setKnobPosition(position);

      this.emit("changePosition", position);
    },


    dispose : function()
    {
      qxWeb(document).off("pointerup", this._onDocPointerUp, this);
      qxWeb(window).off("resize", this._onWindowResize, this);
      this.off("pointerup", this._onSliderPointerUp, this)
      .off("focus", this._onSliderFocus, this);
      this.getChildren("." + this.getCssPrefix() + "-knob")
      .off("pointerdown", this._onPointerDown, this)
      .off("dragstart", this._onDragStart, this)
      .off("focus", this._onKnobFocus, this)
      .off("blur", this._onKnobBlur, this)
      .off("keydown", this._onKeyDown, this);

      this.setHtml("");

      return this.base(arguments);
    }
  },


  // Make the slider widget available as a qxWeb module
  defer : function(statics) {
    qxWeb.$attach({slider : statics.slider});
  }
});
