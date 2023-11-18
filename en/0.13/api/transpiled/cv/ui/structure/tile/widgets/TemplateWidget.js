(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   *
   */
  qx.Class.define('cv.ui.structure.tile.widgets.TemplateWidget', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      widget: {
        refine: true,
        init: true
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _checkEnvironment: function _checkEnvironment() {
        this._headerFooterParent = this._element;
      },
      _getTileParent: function _getTileParent() {
        if (!this._tileElement) {
          this._tileElement = this._element.querySelector(':scope > cv-tile');
        }
        return this._tileElement;
      }
    }
  });
  cv.ui.structure.tile.widgets.TemplateWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TemplateWidget.js.map?dt=1700345585717