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
 * This mixin defines the <code>contentPadding</code> property, which is used
 * by widgets like the window or group box, which must have a property, which
 * defines the padding of an inner pane.
 *
 * The including class must implement the method
 * <code>_getContentPaddingTarget</code>, which must return the widget on which
 * the padding should be applied.
 */
qx.Mixin.define("qx.ui.core.MContentPadding",
{
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Top padding of the content pane */
    contentPaddingTop :
    {
      check : "Integer",
      init : 0,
      apply : "_applyContentPadding",
      themeable : true
    },

    /** Right padding of the content pane */
    contentPaddingRight :
    {
      check : "Integer",
      init : 0,
      apply : "_applyContentPadding",
      themeable : true
    },

    /** Bottom padding of the content pane */
    contentPaddingBottom :
    {
      check : "Integer",
      init : 0,
      apply : "_applyContentPadding",
      themeable : true
    },

    /** Left padding of the content pane */
    contentPaddingLeft :
    {
      check : "Integer",
      init : 0,
      apply : "_applyContentPadding",
      themeable : true
    },

    /**
     * The 'contentPadding' property is a shorthand property for setting 'contentPaddingTop',
     * 'contentPaddingRight', 'contentPaddingBottom' and 'contentPaddingLeft'
     * at the same time.
     *
     * If four values are specified they apply to top, right, bottom and left respectively.
     * If there is only one value, it applies to all sides, if there are two or three,
     * the missing values are taken from the opposite side.
     */
    contentPadding :
    {
      group : [
        "contentPaddingTop", "contentPaddingRight",
        "contentPaddingBottom", "contentPaddingLeft"
      ],
      mode  : "shorthand",
      themeable : true
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * @type {Map} Maps property names of content padding to the setter of the padding
     *
     * @lint ignoreReferenceField(__contentPaddingSetter)
     */
    __contentPaddingSetter :
    {
      contentPaddingTop : "setPaddingTop",
      contentPaddingRight : "setPaddingRight",
      contentPaddingBottom : "setPaddingBottom",
      contentPaddingLeft : "setPaddingLeft"
    },


    /**
     * @type {Map} Maps property names of content padding to the themed setter of the padding
     *
     * @lint ignoreReferenceField(__contentPaddingThemedSetter)
     */
    __contentPaddingThemedSetter :
    {
      contentPaddingTop : "setThemedPaddingTop",
      contentPaddingRight : "setThemedPaddingRight",
      contentPaddingBottom : "setThemedPaddingBottom",
      contentPaddingLeft : "setThemedPaddingLeft"
    },


    /**
     * @type {Map} Maps property names of content padding to the resetter of the padding
     *
     * @lint ignoreReferenceField(__contentPaddingResetter)
     */
    __contentPaddingResetter :
    {
      contentPaddingTop : "resetPaddingTop",
      contentPaddingRight : "resetPaddingRight",
      contentPaddingBottom : "resetPaddingBottom",
      contentPaddingLeft : "resetPaddingLeft"
    },


    // property apply
    _applyContentPadding : function(value, old, name, variant)
    {
      var target = this._getContentPaddingTarget();

      if (value == null)
      {
        var resetter = this.__contentPaddingResetter[name];
        target[resetter]();
      }
      else
      {
        // forward the themed sates if case the apply was invoked by a theme
        if (variant == "setThemed" || variant == "resetThemed") {
          var setter = this.__contentPaddingThemedSetter[name];
          target[setter](value);
        } else {
          var setter = this.__contentPaddingSetter[name];
          target[setter](value);
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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Container, which allows vertical and horizontal scrolling if the contents is
 * larger than the container.
 *
 * Note that this class can only have one child widget. This container has a
 * fixed layout, which cannot be changed.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   // create scroll container
 *   var scroll = new qx.ui.container.Scroll().set({
 *     width: 300,
 *     height: 200
 *   });
 *
 *   // add a widget which is larger than the container
 *   scroll.add(new qx.ui.core.Widget().set({
 *     width: 600,
 *     minWidth: 600,
 *     height: 400,
 *     minHeight: 400
 *   }));
 *
 *   this.getRoot().add(scroll);
 * </pre>
 *
 * This example creates a scroll container and adds a widget, which is larger
 * than the container. This will cause the container to display vertical
 * and horizontal toolbars.
 *
 * *External Documentation*
 *
 * <a href='http://manual.qooxdoo.org/${qxversion}/pages/widget/scroll.html' target='_blank'>
 * Documentation of this widget in the qooxdoo manual.</a>
 */
qx.Class.define("qx.ui.container.Scroll",
{
  extend : qx.ui.core.scroll.AbstractScrollArea,
  include : [qx.ui.core.MContentPadding],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param content {qx.ui.core.LayoutItem?null} The content widget of the scroll
   *    container.
   */
  construct : function(content)
  {
    this.base(arguments);

    if (content) {
      this.add(content);
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Sets the content of the scroll container. Scroll containers
     * may only have one child, so it always replaces the current
     * child with the given one.
     *
     * @param widget {qx.ui.core.Widget} Widget to insert
     */
    add : function(widget) {
      this.getChildControl("pane").add(widget);
    },


    /**
     * Returns the content of the scroll area.
     *
     * @param widget {qx.ui.core.Widget} Widget to remove
     */
    remove : function(widget) {
      this.getChildControl("pane").remove(widget);
    },


    /**
     * Returns the content of the scroll container.
     *
     * Scroll containers may only have one child. This
     * method returns an array containing the child or an empty array.
     *
     * @return {Object[]} The child array
     */
    getChildren : function() {
      return this.getChildControl("pane").getChildren();
    },


    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getChildControl("pane");
    }
  }
});
