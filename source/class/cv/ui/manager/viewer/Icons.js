/* Icons.js
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
 * Shows the available icons.
 */
qx.Class.define('cv.ui.manager.viewer.Icons', {
  extend: cv.ui.manager.viewer.Folder,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    this._disableFileEvents = true;
    super(true);
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: /^CometVisu-Icons$/i,
    TITLE: qx.locale.Manager.tr('Show icons'),
    ICON: cv.theme.dark.Images.getIcon('icons', 18)
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _getDelegate() {
      return {
        createItem() {
          return new cv.ui.manager.core.IconAtom();
        },

        bindItem(controller, item, index) {
          controller.bindProperty('', 'model', null, item, index);
        }
      };
    },

    _onFilter() {
      const filterString = this.getChildControl('filter').getValue();
      const filtered = this.getModel().filter(function (entry) {
        return entry[0].includes(filterString);
      });
      this._controller.setModel(filtered);
    },

    _applyFile(file, old) {
      if (file) {
        const container = this.getChildControl('list');
        if (!this._controller) {
          this._controller = new qx.data.controller.List(null, container);
          this._controller.setDelegate(this._getDelegate());
        }
        const model = this.getModel();
        const handler = cv.IconHandler.getInstance();
        // as the file is just a fake file, we do not really care about it
        Object.keys(cv.IconConfig.DB).forEach(name => {
          model.push([name, handler.getIconSource(name, 'icon-preview')]);
        });
        if (this.getChildControl('filter').getValue() || this.getPermanentFilter()) {
          this._onFilter();
        } else {
          this._controller.setModel(model);
        }
      } else if (this._controller) {
        this._controller.resetModel();
      }
    }
  }
});
