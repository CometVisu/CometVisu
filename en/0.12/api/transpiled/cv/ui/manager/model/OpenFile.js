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
      },
      "cv.ui.manager.control.FileHandlerRegistry": {},
      "qx.Interface": {},
      "cv.ui.manager.editor.IEditor": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* OpenFile.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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
      handlerOptions: {
        check: 'Map',
        nullable: true
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
      __P_42_0: null,
      _applyFile: function _applyFile(value, old) {
        if (old) {
          old.removeListener('changeModified', this._maintainPermanent, this);
          old.removeRelatedBindings(this);
          this.__P_42_0 = null;
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

            if (this.__P_42_0) {
              file.removeBinding(this.__P_42_0);
              this.__P_42_0 = null;
            }
          } else {
            this.__P_42_0 = file.bind('icon', this, 'icon');
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
      },
      save: function save(callback, overrideHash) {
        var file = this.getFile();
        var handlerId = this.getHandlerId();
        var fileHandler;

        if (handlerId) {
          fileHandler = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandlerById(handlerId);
        } else {
          fileHandler = cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(file);
        }

        if (file.isModified()) {
          if (fileHandler && fileHandler.instance && qx.Interface.objectImplements(fileHandler.instance, cv.ui.manager.editor.IEditor)) {
            fileHandler.instance.save(callback, overrideHash);
          }
        }
      }
    }
  });
  cv.ui.manager.model.OpenFile.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenFile.js.map?dt=1647153218102