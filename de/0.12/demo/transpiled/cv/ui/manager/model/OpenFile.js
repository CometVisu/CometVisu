(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Data model for currently opened files, a combination of cv.ui.manager.model.FileItem and a certain FileHandler.
   */
  qx.Class.define('cv.ui.manager.model.OpenFile', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(file, handlerId) {
      qx.core.Object.constructor.call(this);

      if (file) {
        this.setFile(file);
      }

      if (handlerId) {
        this.setHandlerId(handlerId);
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      file: {
        check: 'cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles',
        nullable: true,
        event: 'changeFile',
        apply: '_applyFile'
      },
      handlerId: {
        check: '!!qx.Class.getByName(value)',
        nullable: true,
        apply: '_maintainIcon'
      },

      /**
       * The opening state: permanent false behaves like a quick preview, where
       * the current file content is replaces by the next selected file on single click.
       * In permanent mode a new tab will be created, which content will not be replaced.
       */
      permanent: {
        check: 'Boolean',
        init: false,
        event: 'changePermanent'
      },

      /**
       * Icon to show in e.g. the File-Tab
       */
      icon: {
        check: 'String',
        init: '',
        event: 'changeIcon'
      },
      closeable: {
        check: 'Boolean',
        init: true,
        event: 'changeCloseable'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __ibid: null,
      _applyFile: function _applyFile(value, old) {
        if (old) {
          old.removeListener('changeModified', this._maintainPermanent, this);
          old.removeRelatedBindings(this);
          this.__ibid = null;
        }

        if (value) {
          value.addListener('changeModified', this._maintainPermanent, this);
        }

        this._maintainIcon();
      },
      _maintainIcon: function _maintainIcon() {
        // use the handlers icon is there is one, otherwise the file items icon
        var file = this.getFile();

        if (this.getHandlerId() && file) {
          var handlerClass = qx.Class.getByName(this.getHandlerId());

          if (handlerClass && handlerClass.ICON) {
            this.setIcon(handlerClass.ICON);

            if (this.__ibid) {
              file.removeBinding(this.__ibid);
              this.__ibid = null;
            }
          } else {
            this.__ibid = file.bind('icon', this, 'icon');
          }
        } else {
          this.resetIcon();
        }
      },
      _maintainPermanent: function _maintainPermanent() {
        if (this.getFile().isModified() && !this.isPermanent()) {
          // change to permanent once we have a modification
          this.setPermanent(true);
        }
      }
    }
  });
  cv.ui.manager.model.OpenFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenFile.js.map?dt=1591014032292