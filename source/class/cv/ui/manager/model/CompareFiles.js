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
  construct: function (original, modified) {
    this.base(arguments);
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
    isRelated: function (path) {
      return this.getOriginalFile().getFullPath() === path || this.getModifiedFile().getFullPath() === path;
    },

    isConfigFile: function () {
      return this.getModifiedFile().isConfigFile();
    },

    getFullPath: function () {
      return this.getOriginalFile().getFullPath();
    },

    _applyModifiedFile: function () {
      this.setName(qx.locale.Manager.tr('Diff: %1', this.getModifiedFile().getName()));
    },

    getParent: function () {
      return this.getModifiedFile().getParent();
    },

    isWriteable: function () {
      return this.getModifiedFile().isWriteable();
    },

    isTrash: function () {
      return this.getModifiedFile().isTrash();
    },

    isInTrash: function () {
      return this.getModifiedFile().isInTrash();
    },

    isFake: function () {
      return this.getModifiedFile().isFake();
    },

    isTemporary: function () {
      return this.getModifiedFile().isTemporary() || this.getOriginalFile().isTemporary();
    },

    isMounted: function () {
      return this.getModifiedFile().isMounted() || this.getOriginalFile().isMounted();
    },

    /**
     * Returns a fake URI that can be used to identify the file.
     * Used by monaco editor as model URI.
     * @returns {Uri}
     */
    getUri: function () {
      return 'cv://' + this.getOriginalFile().getFullPath() + '+' + this.getModifiedFile().getFullPath();
    }
  }
});
