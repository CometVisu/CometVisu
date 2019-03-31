/**
 * Show images.
 */
qx.Class.define('cv.ui.manager.viewer.Image', {
  extend: qx.ui.core.Widget,
  implement: [
    cv.ui.manager.editor.IEditor,
    cv.ui.manager.IActionHandler
  ],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.Grow());

  },

  /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
  properties: {
    file: {
      check: 'cv.ui.manager.model.FileItem',
      nullable: true,
      apply: '_applyFile'
    },

    appearance: {
      refine: true,
      init: 'image-viewer'
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
    TITLE: qx.locale.Manager.tr('Show image'),
    ICON: cv.theme.dark.Images.getIcon('image', 18)
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    canHandleAction: function () {
      return false;
    },
    handleAction: function () {},

    _applyFile: function (file) {
      var control = this.getChildControl('image');
      if (file) {
        control.setIcon(file.getServerPath());
        control.setLabel(file.getFullPath());
      } else {
        control.resetIcon();
        control.resetLabel();
      }
    },

    save: function () {},

    getCurrentContent: function () {},

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'scroll':
           control = new qx.ui.container.Scroll();
           this._add(control);
           break;

         case 'image':
           control = new qx.ui.basic.Atom();
           this.getChildControl('scroll').add(control);
           break;
       }

       return control || this.base(arguments, id);
    }
  }
});
