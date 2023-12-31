(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.ui.manager.control.ActionDispatcher": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* GlobalState.js
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
   * Global singleton that hold some states that are relevant for many parts of the manager.
   */
  qx.Class.define('cv.ui.manager.core.GlobalState', {
    extend: qx.core.Object,
    type: 'singleton',
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      openedFocusedFile: {
        check: 'cv.ui.manager.model.FileItem || cv.ui.manager.model.CompareFiles',
        nullable: true,
        event: 'changeOpenedFocusedFile',
        apply: '_applyFile'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyFile: function _applyFile() {
        cv.ui.manager.control.ActionDispatcher.getInstance().updateBarButtons();
      }
    }
  });
  cv.ui.manager.core.GlobalState.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GlobalState.js.map?dt=1704036748467