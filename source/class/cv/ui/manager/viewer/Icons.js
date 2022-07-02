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
  construct: function () {
    this._disableFileEvents = true;
    this.base(arguments, true);
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
    _getDelegate: function () {
      return {
        createItem: function () {
          return new cv.ui.manager.core.IconAtom();
        },

        bindItem: function (controller, item, index) {
          controller.bindProperty('', 'label', null, item, index);
        }
      };
    },

    _onFilter: function () {
      const filterString = this.getChildControl('filter').getValue();
      const filtered = this.getModel().filter(function (name) {
        return name.includes(filterString);
      });
      this._controller.setModel(filtered);
    },

    _applyFile: function(file, old) {
      if (file) {
        const container = this.getChildControl('list');
        if (!this._controller) {
          this._controller = new qx.data.controller.List(null, container);
          this._controller.setDelegate(this._getDelegate());
        }
        const model = this.getModel();
        // as the file is just a fake file, we do not really care about it
        Object.keys(cv.IconConfig.DB).filter(function (name) {
          const entry = cv.IconConfig.DB[name];
          return entry['*'] && entry['*']['*'] && qx.lang.Type.isFunction(entry['*']['*']['*']);
        }).forEach(function (name) {
          model.push(name);
        }, this);
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
