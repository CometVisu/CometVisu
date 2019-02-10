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
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A Collection of utility functions to escape and unescape strings.
 */
qx.Bootstrap.define("qx.bom.String",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** Mapping of HTML entity names to the corresponding char code */
    TO_CHARCODE :
    {
      "quot"     : 34, // " - double-quote
      "amp"      : 38, // &
      "lt"       : 60, // <
      "gt"       : 62, // >

      // http://www.w3.org/TR/REC-html40/sgml/entities.html
      // ISO 8859-1 characters
      "nbsp"     : 160, // no-break space
      "iexcl"    : 161, // inverted exclamation mark
      "cent"     : 162, // cent sign
      "pound"    : 163, // pound sterling sign
      "curren"   : 164, // general currency sign
      "yen"      : 165, // yen sign
      "brvbar"   : 166, // broken (vertical) bar
      "sect"     : 167, // section sign
      "uml"      : 168, // umlaut (dieresis)
      "copy"     : 169, // copyright sign
      "ordf"     : 170, // ordinal indicator, feminine
      "laquo"    : 171, // angle quotation mark, left
      "not"      : 172, // not sign
      "shy"      : 173, // soft hyphen
      "reg"      : 174, // registered sign
      "macr"     : 175, // macron
      "deg"      : 176, // degree sign
      "plusmn"   : 177, // plus-or-minus sign
      "sup2"     : 178, // superscript two
      "sup3"     : 179, // superscript three
      "acute"    : 180, // acute accent
      "micro"    : 181, // micro sign
      "para"     : 182, // pilcrow (paragraph sign)
      "middot"   : 183, // middle dot
      "cedil"    : 184, // cedilla
      "sup1"     : 185, // superscript one
      "ordm"     : 186, // ordinal indicator, masculine
      "raquo"    : 187, // angle quotation mark, right
      "frac14"   : 188, // fraction one-quarter
      "frac12"   : 189, // fraction one-half
      "frac34"   : 190, // fraction three-quarters
      "iquest"   : 191, // inverted question mark
      "Agrave"   : 192, // capital A, grave accent
      "Aacute"   : 193, // capital A, acute accent
      "Acirc"    : 194, // capital A, circumflex accent
      "Atilde"   : 195, // capital A, tilde
      "Auml"     : 196, // capital A, dieresis or umlaut mark
      "Aring"    : 197, // capital A, ring
      "AElig"    : 198, // capital AE diphthong (ligature)
      "Ccedil"   : 199, // capital C, cedilla
      "Egrave"   : 200, // capital E, grave accent
      "Eacute"   : 201, // capital E, acute accent
      "Ecirc"    : 202, // capital E, circumflex accent
      "Euml"     : 203, // capital E, dieresis or umlaut mark
      "Igrave"   : 204, // capital I, grave accent
      "Iacute"   : 205, // capital I, acute accent
      "Icirc"    : 206, // capital I, circumflex accent
      "Iuml"     : 207, // capital I, dieresis or umlaut mark
      "ETH"      : 208, // capital Eth, Icelandic
      "Ntilde"   : 209, // capital N, tilde
      "Ograve"   : 210, // capital O, grave accent
      "Oacute"   : 211, // capital O, acute accent
      "Ocirc"    : 212, // capital O, circumflex accent
      "Otilde"   : 213, // capital O, tilde
      "Ouml"     : 214, // capital O, dieresis or umlaut mark
      "times"    : 215, // multiply sign
      "Oslash"   : 216, // capital O, slash
      "Ugrave"   : 217, // capital U, grave accent
      "Uacute"   : 218, // capital U, acute accent
      "Ucirc"    : 219, // capital U, circumflex accent
      "Uuml"     : 220, // capital U, dieresis or umlaut mark
      "Yacute"   : 221, // capital Y, acute accent
      "THORN"    : 222, // capital THORN, Icelandic
      "szlig"    : 223, // small sharp s, German (sz ligature)
      "agrave"   : 224, // small a, grave accent
      "aacute"   : 225, // small a, acute accent
      "acirc"    : 226, // small a, circumflex accent
      "atilde"   : 227, // small a, tilde
      "auml"     : 228, // small a, dieresis or umlaut mark
      "aring"    : 229, // small a, ring
      "aelig"    : 230, // small ae diphthong (ligature)
      "ccedil"   : 231, // small c, cedilla
      "egrave"   : 232, // small e, grave accent
      "eacute"   : 233, // small e, acute accent
      "ecirc"    : 234, // small e, circumflex accent
      "euml"     : 235, // small e, dieresis or umlaut mark
      "igrave"   : 236, // small i, grave accent
      "iacute"   : 237, // small i, acute accent
      "icirc"    : 238, // small i, circumflex accent
      "iuml"     : 239, // small i, dieresis or umlaut mark
      "eth"      : 240, // small eth, Icelandic
      "ntilde"   : 241, // small n, tilde
      "ograve"   : 242, // small o, grave accent
      "oacute"   : 243, // small o, acute accent
      "ocirc"    : 244, // small o, circumflex accent
      "otilde"   : 245, // small o, tilde
      "ouml"     : 246, // small o, dieresis or umlaut mark
      "divide"   : 247, // divide sign
      "oslash"   : 248, // small o, slash
      "ugrave"   : 249, // small u, grave accent
      "uacute"   : 250, // small u, acute accent
      "ucirc"    : 251, // small u, circumflex accent
      "uuml"     : 252, // small u, dieresis or umlaut mark
      "yacute"   : 253, // small y, acute accent
      "thorn"    : 254, // small thorn, Icelandic
      "yuml"     : 255, // small y, dieresis or umlaut mark

      // Latin Extended-B
      "fnof"     : 402, // latin small f with hook = function= florin, U+0192 ISOtech

      // Greek
      "Alpha"    : 913, // greek capital letter alpha, U+0391
      "Beta"     : 914, // greek capital letter beta, U+0392
      "Gamma"    : 915, // greek capital letter gamma,U+0393 ISOgrk3
      "Delta"    : 916, // greek capital letter delta,U+0394 ISOgrk3
      "Epsilon"  : 917, // greek capital letter epsilon, U+0395
      "Zeta"     : 918, // greek capital letter zeta, U+0396
      "Eta"      : 919, // greek capital letter eta, U+0397
      "Theta"    : 920, // greek capital letter theta,U+0398 ISOgrk3
      "Iota"     : 921, // greek capital letter iota, U+0399
      "Kappa"    : 922, // greek capital letter kappa, U+039A
      "Lambda"   : 923, // greek capital letter lambda,U+039B ISOgrk3
      "Mu"       : 924, // greek capital letter mu, U+039C
      "Nu"       : 925, // greek capital letter nu, U+039D
      "Xi"       : 926, // greek capital letter xi, U+039E ISOgrk3
      "Omicron"  : 927, // greek capital letter omicron, U+039F
      "Pi"       : 928, // greek capital letter pi, U+03A0 ISOgrk3
      "Rho"      : 929, // greek capital letter rho, U+03A1

      // there is no Sigmaf, and no U+03A2 character either
      "Sigma"    : 931, // greek capital letter sigma,U+03A3 ISOgrk3
      "Tau"      : 932, // greek capital letter tau, U+03A4
      "Upsilon"  : 933, // greek capital letter upsilon,U+03A5 ISOgrk3
      "Phi"      : 934, // greek capital letter phi,U+03A6 ISOgrk3
      "Chi"      : 935, // greek capital letter chi, U+03A7
      "Psi"      : 936, // greek capital letter psi,U+03A8 ISOgrk3
      "Omega"    : 937, // greek capital letter omega,U+03A9 ISOgrk3
      "alpha"    : 945, // greek small letter alpha,U+03B1 ISOgrk3
      "beta"     : 946, // greek small letter beta, U+03B2 ISOgrk3
      "gamma"    : 947, // greek small letter gamma,U+03B3 ISOgrk3
      "delta"    : 948, // greek small letter delta,U+03B4 ISOgrk3
      "epsilon"  : 949, // greek small letter epsilon,U+03B5 ISOgrk3
      "zeta"     : 950, // greek small letter zeta, U+03B6 ISOgrk3
      "eta"      : 951, // greek small letter eta, U+03B7 ISOgrk3
      "theta"    : 952, // greek small letter theta,U+03B8 ISOgrk3
      "iota"     : 953, // greek small letter iota, U+03B9 ISOgrk3
      "kappa"    : 954, // greek small letter kappa,U+03BA ISOgrk3
      "lambda"   : 955, // greek small letter lambda,U+03BB ISOgrk3
      "mu"       : 956, // greek small letter mu, U+03BC ISOgrk3
      "nu"       : 957, // greek small letter nu, U+03BD ISOgrk3
      "xi"       : 958, // greek small letter xi, U+03BE ISOgrk3
      "omicron"  : 959, // greek small letter omicron, U+03BF NEW
      "pi"       : 960, // greek small letter pi, U+03C0 ISOgrk3
      "rho"      : 961, // greek small letter rho, U+03C1 ISOgrk3
      "sigmaf"   : 962, // greek small letter final sigma,U+03C2 ISOgrk3
      "sigma"    : 963, // greek small letter sigma,U+03C3 ISOgrk3
      "tau"      : 964, // greek small letter tau, U+03C4 ISOgrk3
      "upsilon"  : 965, // greek small letter upsilon,U+03C5 ISOgrk3
      "phi"      : 966, // greek small letter phi, U+03C6 ISOgrk3
      "chi"      : 967, // greek small letter chi, U+03C7 ISOgrk3
      "psi"      : 968, // greek small letter psi, U+03C8 ISOgrk3
      "omega"    : 969, // greek small letter omega,U+03C9 ISOgrk3
      "thetasym" : 977, // greek small letter theta symbol,U+03D1 NEW
      "upsih"    : 978, // greek upsilon with hook symbol,U+03D2 NEW
      "piv"      : 982, // greek pi symbol, U+03D6 ISOgrk3

      // General Punctuation
      "bull"     : 8226, // bullet = black small circle,U+2022 ISOpub

      // bullet is NOT the same as bullet operator, U+2219
      "hellip"   : 8230, // horizontal ellipsis = three dot leader,U+2026 ISOpub
      "prime"    : 8242, // prime = minutes = feet, U+2032 ISOtech
      "Prime"    : 8243, // double prime = seconds = inches,U+2033 ISOtech
      "oline"    : 8254, // overline = spacing overscore,U+203E NEW
      "frasl"    : 8260, // fraction slash, U+2044 NEW

      // Letterlike Symbols
      "weierp"   : 8472, // script capital P = power set= Weierstrass p, U+2118 ISOamso
      "image"    : 8465, // blackletter capital I = imaginary part,U+2111 ISOamso
      "real"     : 8476, // blackletter capital R = real part symbol,U+211C ISOamso
      "trade"    : 8482, // trade mark sign, U+2122 ISOnum
      "alefsym"  : 8501, // alef symbol = first transfinite cardinal,U+2135 NEW

      // alef symbol is NOT the same as hebrew letter alef,U+05D0 although the same glyph could be used to depict both characters
      // Arrows
      "larr"     : 8592, // leftwards arrow, U+2190 ISOnum
      "uarr"     : 8593, // upwards arrow, U+2191 ISOnum-->
      "rarr"     : 8594, // rightwards arrow, U+2192 ISOnum
      "darr"     : 8595, // downwards arrow, U+2193 ISOnum
      "harr"     : 8596, // left right arrow, U+2194 ISOamsa
      "crarr"    : 8629, // downwards arrow with corner leftwards= carriage return, U+21B5 NEW
      "lArr"     : 8656, // leftwards double arrow, U+21D0 ISOtech

      // ISO 10646 does not say that lArr is the same as the 'is implied by' arrow but also does not have any other character for that function. So ? lArr can be used for 'is implied by' as ISOtech suggests
      "uArr"     : 8657, // upwards double arrow, U+21D1 ISOamsa
      "rArr"     : 8658, // rightwards double arrow,U+21D2 ISOtech

      // ISO 10646 does not say this is the 'implies' character but does not have another character with this function so ?rArr can be used for 'implies' as ISOtech suggests
      "dArr"     : 8659, // downwards double arrow, U+21D3 ISOamsa
      "hArr"     : 8660, // left right double arrow,U+21D4 ISOamsa

      // Mathematical Operators
      "forall"   : 8704, // for all, U+2200 ISOtech
      "part"     : 8706, // partial differential, U+2202 ISOtech
      "exist"    : 8707, // there exists, U+2203 ISOtech
      "empty"    : 8709, // empty set = null set = diameter,U+2205 ISOamso
      "nabla"    : 8711, // nabla = backward difference,U+2207 ISOtech
      "isin"     : 8712, // element of, U+2208 ISOtech
      "notin"    : 8713, // not an element of, U+2209 ISOtech
      "ni"       : 8715, // contains as member, U+220B ISOtech

      // should there be a more memorable name than 'ni'?
      "prod"     : 8719, // n-ary product = product sign,U+220F ISOamsb

      // prod is NOT the same character as U+03A0 'greek capital letter pi' though the same glyph might be used for both
      "sum"      : 8721, // n-ary summation, U+2211 ISOamsb

      // sum is NOT the same character as U+03A3 'greek capital letter sigma' though the same glyph might be used for both
      "minus"    : 8722, // minus sign, U+2212 ISOtech
      "lowast"   : 8727, // asterisk operator, U+2217 ISOtech
      "radic"    : 8730, // square root = radical sign,U+221A ISOtech
      "prop"     : 8733, // proportional to, U+221D ISOtech
      "infin"    : 8734, // infinity, U+221E ISOtech
      "ang"      : 8736, // angle, U+2220 ISOamso
      "and"      : 8743, // logical and = wedge, U+2227 ISOtech
      "or"       : 8744, // logical or = vee, U+2228 ISOtech
      "cap"      : 8745, // intersection = cap, U+2229 ISOtech
      "cup"      : 8746, // union = cup, U+222A ISOtech
      "int"      : 8747, // integral, U+222B ISOtech
      "there4"   : 8756, // therefore, U+2234 ISOtech
      "sim"      : 8764, // tilde operator = varies with = similar to,U+223C ISOtech

      // tilde operator is NOT the same character as the tilde, U+007E,although the same glyph might be used to represent both
      "cong"     : 8773, // approximately equal to, U+2245 ISOtech
      "asymp"    : 8776, // almost equal to = asymptotic to,U+2248 ISOamsr
      "ne"       : 8800, // not equal to, U+2260 ISOtech
      "equiv"    : 8801, // identical to, U+2261 ISOtech
      "le"       : 8804, // less-than or equal to, U+2264 ISOtech
      "ge"       : 8805, // greater-than or equal to,U+2265 ISOtech
      "sub"      : 8834, // subset of, U+2282 ISOtech
      "sup"      : 8835, // superset of, U+2283 ISOtech

      // note that nsup, 'not a superset of, U+2283' is not covered by the Symbol font encoding and is not included. Should it be, for symmetry?It is in ISOamsn  --> <!ENTITY nsub": 8836,  //not a subset of, U+2284 ISOamsn
      "sube"     : 8838, // subset of or equal to, U+2286 ISOtech
      "supe"     : 8839, // superset of or equal to,U+2287 ISOtech
      "oplus"    : 8853, // circled plus = direct sum,U+2295 ISOamsb
      "otimes"   : 8855, // circled times = vector product,U+2297 ISOamsb
      "perp"     : 8869, // up tack = orthogonal to = perpendicular,U+22A5 ISOtech
      "sdot"     : 8901, // dot operator, U+22C5 ISOamsb

      // dot operator is NOT the same character as U+00B7 middle dot
      // Miscellaneous Technical
      "lceil"    : 8968, // left ceiling = apl upstile,U+2308 ISOamsc
      "rceil"    : 8969, // right ceiling, U+2309 ISOamsc
      "lfloor"   : 8970, // left floor = apl downstile,U+230A ISOamsc
      "rfloor"   : 8971, // right floor, U+230B ISOamsc
      "lang"     : 9001, // left-pointing angle bracket = bra,U+2329 ISOtech

      // lang is NOT the same character as U+003C 'less than' or U+2039 'single left-pointing angle quotation mark'
      "rang"     : 9002, // right-pointing angle bracket = ket,U+232A ISOtech

      // rang is NOT the same character as U+003E 'greater than' or U+203A 'single right-pointing angle quotation mark'
      // Geometric Shapes
      "loz"      : 9674, // lozenge, U+25CA ISOpub

      // Miscellaneous Symbols
      "spades"   : 9824, // black spade suit, U+2660 ISOpub

      // black here seems to mean filled as opposed to hollow
      "clubs"    : 9827, // black club suit = shamrock,U+2663 ISOpub
      "hearts"   : 9829, // black heart suit = valentine,U+2665 ISOpub
      "diams"    : 9830, // black diamond suit, U+2666 ISOpub

      // Latin Extended-A
      "OElig"    : 338, //  -- latin capital ligature OE,U+0152 ISOlat2
      "oelig"    : 339, //  -- latin small ligature oe, U+0153 ISOlat2

      // ligature is a misnomer, this is a separate character in some languages
      "Scaron"   : 352, //  -- latin capital letter S with caron,U+0160 ISOlat2
      "scaron"   : 353, //  -- latin small letter s with caron,U+0161 ISOlat2
      "Yuml"     : 376, //  -- latin capital letter Y with diaeresis,U+0178 ISOlat2

      // Spacing Modifier Letters
      "circ"     : 710, //  -- modifier letter circumflex accent,U+02C6 ISOpub
      "tilde"    : 732, // small tilde, U+02DC ISOdia

      // General Punctuation
      "ensp"     : 8194, // en space, U+2002 ISOpub
      "emsp"     : 8195, // em space, U+2003 ISOpub
      "thinsp"   : 8201, // thin space, U+2009 ISOpub
      "zwnj"     : 8204, // zero width non-joiner,U+200C NEW RFC 2070
      "zwj"      : 8205, // zero width joiner, U+200D NEW RFC 2070
      "lrm"      : 8206, // left-to-right mark, U+200E NEW RFC 2070
      "rlm"      : 8207, // right-to-left mark, U+200F NEW RFC 2070
      "ndash"    : 8211, // en dash, U+2013 ISOpub
      "mdash"    : 8212, // em dash, U+2014 ISOpub
      "lsquo"    : 8216, // left single quotation mark,U+2018 ISOnum
      "rsquo"    : 8217, // right single quotation mark,U+2019 ISOnum
      "sbquo"    : 8218, // single low-9 quotation mark, U+201A NEW
      "ldquo"    : 8220, // left double quotation mark,U+201C ISOnum
      "rdquo"    : 8221, // right double quotation mark,U+201D ISOnum
      "bdquo"    : 8222, // double low-9 quotation mark, U+201E NEW
      "dagger"   : 8224, // dagger, U+2020 ISOpub
      "Dagger"   : 8225, // double dagger, U+2021 ISOpub
      "permil"   : 8240, // per mille sign, U+2030 ISOtech
      "lsaquo"   : 8249, // single left-pointing angle quotation mark,U+2039 ISO proposed
      // lsaquo is proposed but not yet ISO standardized
      "rsaquo"   : 8250, // single right-pointing angle quotation mark,U+203A ISO proposed
      // rsaquo is proposed but not yet ISO standardized
      "euro"     : 8364 //  -- euro sign, U+20AC NEW
    },


    /**
     * Escapes the characters in a <code>String</code> using HTML entities.
     *
     * For example: <tt>"bread" & "butter"</tt> => <tt>&amp;quot;bread&amp;quot; &amp;amp; &amp;quot;butter&amp;quot;</tt>.
     * Supports all known HTML 4.0 entities, including funky accents.
     *
     * * <a href="http://www.w3.org/TR/REC-html32#latin1">HTML 3.2 Character Entities for ISO Latin-1</a>
     * * <a href="http://www.w3.org/TR/REC-html40/sgml/entities.html">HTML 4.0 Character entity references</a>
     * * <a href="http://www.w3.org/TR/html401/charset.html#h-5.3">HTML 4.01 Character References</a>
     * * <a href="http://www.w3.org/TR/html401/charset.html#code-position">HTML 4.01 Code positions</a>
     *
     * @param str {String} the String to escape
     * @return {String} a new escaped String
     * @see #unescape
     */
    escape : function(str) {
      return qx.util.StringEscape.escape(str, qx.bom.String.FROM_CHARCODE);
    },


    /**
     * Unescapes a string containing entity escapes to a string
     * containing the actual Unicode characters corresponding to the
     * escapes. Supports HTML 4.0 entities.
     *
     * For example, the string "&amp;lt;Fran&amp;ccedil;ais&amp;gt;"
     * will become "&lt;Fran&ccedil;ais&gt;"
     *
     * If an entity is unrecognized, it is left alone, and inserted
     * verbatim into the result string. e.g. "&amp;gt;&amp;zzzz;x" will
     * become "&gt;&amp;zzzz;x".
     *
     * @param str {String} the String to unescape, may be null
     * @return {var} a new unescaped String
     * @see #escape
     */
    unescape : function(str) {
      return qx.util.StringEscape.unescape(str, qx.bom.String.TO_CHARCODE);
    },


    /**
     * Converts a plain text string into HTML.
     * This is similar to {@link #escape} but converts new lines to
     * <tt>&lt:br&gt:</tt> and preserves whitespaces.
     *
     * @param str {String} the String to convert
     * @return {String} a new converted String
     * @see #escape
     */
    fromText : function(str)
    {
      return qx.bom.String.escape(str).replace(/(  |\n)/g, function(chr)
      {
        var map =
        {
          "  " : " &nbsp;",
          "\n" : "<br>"
        };

        return map[chr] || chr;
      });
    },


    /**
     * Converts HTML to plain text.
     *
     * * Strips all HTML tags
     * * converts <tt>&lt:br&gt:</tt> to new line
     * * unescapes HTML entities
     *
     * @param str {String} HTML string to converts
     * @return {String} plain text representation of the HTML string
     */
    toText : function(str)
    {
      return qx.bom.String.unescape(str.replace(/\s+|<([^>])+>/gi, function(chr)
      //return qx.bom.String.unescape(str.replace(/<\/?[^>]+(>|$)/gi, function(chr)
      {
        if (chr.indexOf("<br") === 0) {
          return "\n";
        } else if (chr.length > 0 && chr.replace(/^\s*/, "").replace(/\s*$/, "") == "") {
          return " ";
        } else {
          return "";
        }
      }));
    }
  },



  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    /** Mapping of char codes to HTML entity names */
    statics.FROM_CHARCODE = qx.lang.Object.invert(statics.TO_CHARCODE)
;  }
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Generic escaping and unescaping of DOM strings.
 *
 * {@link qx.bom.String} for (un)escaping of HTML strings.
 * {@link qx.xml.String} for (un)escaping of XML strings.
 */
qx.Bootstrap.define("qx.util.StringEscape",
{
  statics :
  {
    /**
     * generic escaping method
     *
     * @param str {String} string to escape
     * @param charCodeToEntities {Map} entity to charcode map
     * @return {String} escaped string
     */
    escape : function(str, charCodeToEntities)
    {
      var entity, result = "";

      for (var i=0, l=str.length; i<l; i++)
      {
        var chr = str.charAt(i);
        var code = chr.charCodeAt(0);

        if (charCodeToEntities[code]) {
          entity = "&" + charCodeToEntities[code] + ";";
        }
        else
        {
          if (code > 0x7F) {
            entity = "&#" + code + ";";
          } else {
            entity = chr;
          }
        }

        result += entity;
      }

      return result;
    },


    /**
     * generic unescaping method
     *
     * @param str {String} string to unescape
     * @param entitiesToCharCode {Map} charcode to entity map
     * @return {String} unescaped string
     */
    unescape : function(str, entitiesToCharCode)
    {
      return str.replace(/&[#\w]+;/gi, function(entity)
      {
        var chr = entity;
        var entity = entity.substring(1, entity.length - 1);
        var code = entitiesToCharCode[entity];

        if (code) {
          chr = String.fromCharCode(code);
        }
        else
        {
          if (entity.charAt(0) == '#')
          {
            if (entity.charAt(1).toUpperCase() == 'X')
            {
              code = entity.substring(2);

              // match hex number
              if (code.match(/^[0-9A-Fa-f]+$/gi)) {
                chr = String.fromCharCode(parseInt(code, 16));
              }
            }
            else
            {
              code = entity.substring(1);

              // match integer
              if (code.match(/^\d+$/gi)) {
                chr = String.fromCharCode(parseInt(code, 10));
              }
            }
          }
        }

        return chr;
      });
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
