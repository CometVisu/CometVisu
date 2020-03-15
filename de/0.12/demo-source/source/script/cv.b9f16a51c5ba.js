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

************************************************************************ */

/**
 * A button which is toggle-able for toolbars.
 */
qx.Class.define("qx.ui.toolbar.CheckBox",
{
  extend : qx.ui.form.ToggleButton,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, icon)
  {
    this.base(arguments, label, icon);

    // Toolbar buttons should not support the keyboard events
    this.removeListener("keydown", this._onKeyDown);
    this.removeListener("keyup", this._onKeyUp);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "toolbar-button"
    },

    show :
    {
      refine : true,
      init : "inherit"
    },

    focusable :
    {
      refine : true,
      init : false
    }
  },

  members : {
    // overridden
    _applyVisibility : function(value, old) {
      this.base(arguments, value, old);
      // trigger a appearance recalculation of the parent
      var parent = this.getLayoutParent();
      if (parent && parent instanceof qx.ui.toolbar.PartContainer) {
        qx.ui.core.queue.Appearance.add(parent);
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
     * Andreas Ecker (ecker)
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * Radio buttons are used to manage a single selection. Radio buttons only
 * make sense used in a group of two or more of them. They are managed (connected)
 * to a {@link qx.ui.form.RadioGroup} to handle the selection.
 */
qx.Class.define("qx.ui.toolbar.RadioButton",
{
  extend : qx.ui.toolbar.CheckBox,
  include : [qx.ui.form.MModelProperty],
  implement : [qx.ui.form.IModel, qx.ui.form.IRadioItem],




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // overridden
    _applyValue : function(value, old)
    {
      this.base(arguments, value, old);

      if (value)
      {
        var grp = this.getGroup();
        if (grp) {
          grp.setSelection([this]);
        }
      }
    },


    // overridden
    _onExecute : function(e) {
      var grp = this.getGroup();
      if (grp && grp.getAllowEmptySelection()) {
        this.toggleValue();
      } else {
        this.setValue(true);
      }
    }
  }
});
