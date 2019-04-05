/**
 * Show rendered configs.
 */
qx.Class.define('cv.ui.manager.viewer.Config', {
  extend: cv.ui.manager.viewer.AbstractViewer,

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
    appearance: {
      refine: true,
      init: 'config-viewer'
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /visu_config.*\.xml/,
    TITLE: qx.locale.Manager.tr('Config viewer'),
    ICON: cv.theme.dark.Images.getIcon('preview', 18)
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _applyFile: function (file) {
      var control = this.getChildControl('iframe');
      if (file) {
        if (file.isConfigFile()) {
          var configName = cv.ui.manager.model.FileItem.getConfigName(file.getFullPath());
          var url = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri')+ '/..') + '?config=' + (configName || '');
          control.setSource(url);
          control.show();
        } else {
          cv.ui.manager.snackbar.Controller.error(this.tr('%1 is no configuration file', file.getFullPath()));
        }
      } else {
        control.exclude();
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'iframe':
           control = new qx.ui.embed.Iframe();
           control.exclude();
           this.getChildControl('scroll').add(control);
           break;
       }

       return control || this.base(arguments, id);
    }
  }
});
