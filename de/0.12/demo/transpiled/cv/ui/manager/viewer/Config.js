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
      "qx.ui.embed.Iframe": {},
      "qx.ui.basic.Atom": {}
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
      },
      target: {
        check: ['iframe', 'window'],
        init: 'window'
      },
      external: {
        refine: true,
        init: true
      },
      connectToWindow: {
        check: 'Boolean',
        init: false,
        apply: '_applyConnectToWindow'
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
      _windowRef: null,
      _applyConnectToWindow: function _applyConnectToWindow(value) {
        this.setExternal(!value);
      },
      _applyFile: function _applyFile(file, old) {
        if (old && old.isConfigFile()) {
          qx.event.message.Bus.unsubscribe(old.getBusTopic(), this._onChange, this);
        }

        if (file) {
          if (file.isConfigFile()) {
            var configName = cv.ui.manager.model.FileItem.getConfigName(file.getFullPath());
            var url = qx.util.Uri.getAbsolute(qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/..') + '?config=' + (configName || '');

            if (this.getTarget() === 'iframe') {
              url += '&preview=1';
              var control = this.getChildControl('iframe');
              control.setSource(url);
              control.show();
              var hint = this.getChildControl('hint', true);

              if (hint && hint.isVisible()) {
                hint.exclude();
              }
            } else {
              var ref = window.open(url, configName);

              if (this.isConnectToWindow()) {
                this._windowRef = ref;
                this._windowRef.onbeforeunload = this._onClose.bind(this);

                var _hint = this.getChildControl('hint');

                _hint.show();

                var iframe = this.getChildControl('iframe', true);

                if (iframe && iframe.isVisible()) {
                  iframe.exclude();
                }
              } else {
                // no connection close this immediately
                this._onClose();

                return;
              }
            }

            qx.event.message.Bus.subscribe(file.getBusTopic(), this._onChange, this);
          } else {
            cv.ui.manager.snackbar.Controller.error(this.tr('%1 is no configuration file', file.getFullPath()));
          }
        } else {
          if (this.hasChildControl('iframe')) {
            this.getChildControl('iframe').exclude();
          }

          if (this.hasChildControl('hint')) {
            this.getChildControl('hint').exclude();
          }

          if (this._windowRef) {
            this._windowRef.close();
          }
        }
      },
      _onChange: function _onChange(ev) {
        var data = ev.getData();

        if (data.type === 'contentChanged') {
          if (this.hasChildControl('iframe')) {
            this.getChildControl('iframe').reload();
          } else if (this._windowRef) {
            this._windowRef.reload();
          }
        }
      },
      _onClose: function _onClose() {
        if (this._windowRef) {
          console.log(this, 'close', this.getFile().getFullPath());
          qx.event.message.Bus.dispatchByName('cv.manager.action.close', this.getFile());
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

          case 'hint':
            control = new qx.ui.basic.Atom(this.tr('This configuration has been opened in another window. When you close this file, the window will also be closed. Click here top jump the the window.'));
            control.set({
              center: true,
              font: 'title'
            });
            control.addListener('tap', function () {
              if (this._windowRef) {
                this._windowRef.focus();
              }
            }, this);
            this.getChildControl('scroll').add(control);
            break;
        }

        return control || cv.ui.manager.viewer.Config.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._windowRef = null;
    }
  });
  cv.ui.manager.viewer.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1619884690658