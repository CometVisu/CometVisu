/**
 * Atom with cv.ui.manager.viewer.SvgIcon instead ob an qx.ui.basic.Image
 */
qx.Class.define('cv.ui.manager.core.IconAtom', {
  extend: qx.ui.basic.Atom,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-icon'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyLabel: function (value) {
      this.base(arguments, value);
      this.getChildControl('icon').setName(value);
    },

    /**
     * Updates the visibility of the icon
     */
    _handleIcon : function()
    {
      if (!this.getChildControl('icon').getName() || this.getShow() === "label") {
        this._excludeChildControl("icon");
      } else {
        this._showChildControl("icon");
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'icon':
           control = new cv.ui.manager.viewer.SvgIcon();
           control.setAnonymous(true);
           this._addAt(control, 0);
           break;
       }

       return control || this.base(arguments, id);
    }
  }
});
