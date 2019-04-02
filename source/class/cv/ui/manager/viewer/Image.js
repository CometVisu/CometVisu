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
    this.addListener('resize', this._scaleImage, this);
    this._scaleImage();
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
        new qx.util.DeferredCall(this._scaleImage, this).schedule();
      } else {
        control.resetIcon();
        control.resetLabel();
      }
    },

    _scaleImage: function () {
      var bounds = this.getBounds();
      var icon = this.getChildControl('image').getChildControl('icon');
      var iconBounds = icon.getBounds();
      var paddingX = 10;
      var paddingY = 20;
      if (bounds && iconBounds && iconBounds.width && iconBounds.height) {
        // calculate new max sizes is necessary
        var availableHeight = bounds.height - paddingY * 2;
        var availableWidth = bounds.width - paddingX * 2;
        var diffX = iconBounds.width - availableWidth;
        var diffY = iconBounds.height - availableHeight;
        if (diffX > 0 || diffY > 0) {
          var aspectRatio = iconBounds.width / iconBounds.height;
          var newHeight = availableHeight;
          var newWidth = availableHeight * aspectRatio;
          if (newWidth > availableWidth) {
            newWidth = availableWidth;
            newHeight = availableWidth / aspectRatio;
          }
          this.getChildControl('image').getChildControl('icon').set({
            maxWidth: Math.floor(newWidth),
            maxHeight: Math.floor(newHeight),
            scale: true
          });
        }

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
           control.getChildControl('icon').addListener('resize', this._scaleImage, this);
           break;
       }

       return control || this.base(arguments, id);
    }
  }
});
