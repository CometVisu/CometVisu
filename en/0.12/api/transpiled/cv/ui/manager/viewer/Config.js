(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.viewer.AbstractViewer": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.message.Bus": {},
      "cv.ui.manager.model.FileItem": {},
      "qx.util.Uri": {},
      "qx.util.LibraryManager": {},
      "cv.ui.manager.snackbar.Controller": {},
      "qx.ui.embed.Iframe": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      cv.ui.manager.viewer.AbstractViewer.constructor.call(this);

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
      SUPPORTED_FILES: /^(demo)?\/?visu_config.*\.xml/,
      TITLE: qx.locale.Manager.tr('Config viewer'),
      ICON: cv.theme.dark.Images.getIcon('preview', 18)
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyFile: function _applyFile(file, old) {
        var control = this.getChildControl('iframe');

        if (old && old.isConfigFile()) {
          qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
        }

        if (file) {
          if (file.isConfigFile()) {
            var configName = cv.ui.manager.model.FileItem.getConfigName(file.getFullPath());
            var url = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/..') + '?config=' + (configName || '') + '&preview=1';
            control.setSource(url);
            control.show();
            qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
          } else {
            cv.ui.manager.snackbar.Controller.error(this.tr('%1 is no configuration file', file.getFullPath()));
          }
        } else {
          control.exclude();
        }
      },
      _onChange: function _onChange(ev) {
        var data = ev.getData();

        if (data.type === 'contentChanged') {
          this.getChildControl('iframe').reload();
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'iframe':
            control = new qx.ui.embed.Iframe();
            control.exclude();
            this.getChildControl('scroll').add(control);
            break;
        }

        return control || cv.ui.manager.viewer.Config.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  cv.ui.manager.viewer.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1589400484473