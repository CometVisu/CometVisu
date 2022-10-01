(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.viewer.Folder": {
        "construct": true,
        "require": true
      },
      "qx.locale.Manager": {
        "require": true
      },
      "cv.theme.dark.Images": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.core.IconAtom": {},
      "qx.data.controller.List": {},
      "cv.IconHandler": {},
      "cv.IconConfig": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
    construct: function construct() {
      this._disableFileEvents = true;
      cv.ui.manager.viewer.Folder.constructor.call(this, true);
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
      _getDelegate: function _getDelegate() {
        return {
          createItem: function createItem() {
            return new cv.ui.manager.core.IconAtom();
          },
          bindItem: function bindItem(controller, item, index) {
            controller.bindProperty('', 'model', null, item, index);
          }
        };
      },
      _onFilter: function _onFilter() {
        var filterString = this.getChildControl('filter').getValue();
        var filtered = this.getModel().filter(function (entry) {
          return entry[0].includes(filterString);
        });

        this._controller.setModel(filtered);
      },
      _applyFile: function _applyFile(file, old) {
        if (file) {
          var container = this.getChildControl('list');

          if (!this._controller) {
            this._controller = new qx.data.controller.List(null, container);

            this._controller.setDelegate(this._getDelegate());
          }

          var model = this.getModel();
          var handler = cv.IconHandler.getInstance(); // as the file is just a fake file, we do not really care about it

          Object.keys(cv.IconConfig.DB).forEach(function (name) {
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
  cv.ui.manager.viewer.Icons.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Icons.js.map?dt=1664609790837