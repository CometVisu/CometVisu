(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.manager.model.FileItem": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* IEditor.js
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
   * Interface all file editors must implement.
   */
  qx.Interface.define('cv.ui.manager.editor.IEditor', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      file: {
        check: 'cv.ui.manager.model.FileItem',
        nullable: true,
        apply: '_loadFile'
      },
      /**
       * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
       */
      external: {
        check: 'Boolean',
        init: false
      },
      /**
       * If the handler needs some time to initialize before it can accept a file, this should be set false until the handler is ready
       */
      ready: {
        check: 'Boolean',
        init: true,
        event: 'changeReady'
      }
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      TITLE: ''
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      save: function save() {},
      getCurrentContent: function getCurrentContent() {}
    }
  });
  cv.ui.manager.editor.IEditor.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IEditor.js.map?dt=1673093839105