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
  construct(file, handlerId) {
    super();
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
    __ibid: null,

    _applyFile(value, old) {
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

    _maintainIcon() {
      // use the handlers icon is there is one, otherwise the file items icon
      const file = this.getFile();
      if (this.getHandlerId() && file) {
        const handlerClass = qx.Class.getByName(this.getHandlerId());
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

    _maintainPermanent() {
      if (this.getFile().isModified() && !this.isPermanent()) {
        // change to permanent once we have a modification
        this.setPermanent(true);
      }
    },

    save(callback, overrideHash) {
      const file = this.getFile();
      const handlerId = this.getHandlerId();
      let fileHandler;
      if (handlerId) {
        fileHandler =
          cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandlerById(
            handlerId
          );
      } else {
        fileHandler =
          cv.ui.manager.control.FileHandlerRegistry.getInstance().getFileHandler(
            file
          );
      }
      if (file.isModified()) {
        if (
          fileHandler &&
          fileHandler.instance &&
          qx.Interface.objectImplements(
            fileHandler.instance,
            cv.ui.manager.editor.IEditor
          )
        ) {
          fileHandler.instance.save(callback, overrideHash);
        }
      }
    }
  }
});
