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
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* CompareFiles.js 
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
   *
   */
  qx.Class.define('cv.ui.manager.model.CompareFiles', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(original, modified) {
      qx.core.Object.constructor.call(this);
      this.setOriginalFile(original);
      this.setModifiedFile(modified);
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      originalFile: {
        check: 'cv.ui.manager.model.FileItem',
        event: 'changeOriginal'
      },
      modifiedFile: {
        check: 'cv.ui.manager.model.FileItem',
        event: 'changeModifiedFile',
        apply: '_applyModifiedFile'
      },
      permanent: {
        check: 'Boolean',
        init: true
      },
      name: {
        check: 'String',
        init: '',
        event: 'changeName'
      },
      type: {
        check: 'String',
        init: 'file'
      },
      modified: {
        check: 'Boolean',
        init: false,
        event: 'changeModified'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      isRelated: function isRelated(path) {
        return this.getOriginalFile().getFullPath() === path || this.getModifiedFile().getFullPath() === path;
      },
      isConfigFile: function isConfigFile() {
        return this.getModifiedFile().isConfigFile();
      },
      getFullPath: function getFullPath() {
        return this.getOriginalFile().getFullPath();
      },
      _applyModifiedFile: function _applyModifiedFile() {
        this.setName(qx.locale.Manager.tr('Diff: %1', this.getModifiedFile().getName()));
      },
      getParent: function getParent() {
        return this.getModifiedFile().getParent();
      },
      isWriteable: function isWriteable() {
        return this.getModifiedFile().isWriteable();
      },
      isTrash: function isTrash() {
        return this.getModifiedFile().isTrash();
      },
      isInTrash: function isInTrash() {
        return this.getModifiedFile().isInTrash();
      },
      isFake: function isFake() {
        return this.getModifiedFile().isFake();
      },
      isTemporary: function isTemporary() {
        return this.getModifiedFile().isTemporary() || this.getOriginalFile().isTemporary();
      },
      isMounted: function isMounted() {
        return this.getModifiedFile().isMounted() || this.getOriginalFile().isMounted();
      },

      /**
       * Returns a fake URI that can be used to identify the file.
       * Used by monaco editor as model URI.
       * @returns {Uri}
       */
      getUri: function getUri() {
        return 'cv://' + this.getOriginalFile().getFullPath() + '+' + this.getModifiedFile().getFullPath();
      }
    }
  });
  cv.ui.manager.model.CompareFiles.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CompareFiles.js.map?dt=1648713959798