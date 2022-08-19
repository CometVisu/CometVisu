(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Images.js 
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
   * Some icon definitions.
   */
  qx.Class.define('cv.theme.dark.Images', {
    type: 'static',

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      ICONS: {
        'new': '@MaterialIcons/add',
        'new-file': '@MaterialIcons/note_add',
        'new-folder': '@MaterialIcons/create_new_folder',
        'save': '@MaterialIcons/save',
        'delete': '@MaterialIcons/delete',
        'close': '@MaterialIcons/close',
        'quit': '@MaterialIcons/exit_to_app',
        'undo': '@MaterialIcons/undo',
        'redo': '@MaterialIcons/redo',
        'hidden-config': '@MaterialIcons/settings',
        'reload': '@MaterialIcons/sync',
        'out-of-sync': '@MaterialIcons/sync_problem',
        'add': '@MaterialIcons/add',
        'mounted-folder': '@MaterialIcons/folder_special',
        'folder': '@MaterialIcons/folder',
        'folder-open': '@MaterialIcons/folder_open',
        'file': '@MaterialIcons/insert_drive_file',
        'download': '@MaterialIcons/cloud_download',
        'upload': '@MaterialIcons/cloud_upload',
        'rename': '@MaterialIcons/text_rotation_none',
        'compare': '@MaterialIcons/compare_arrows',
        'preview': '@MaterialIcons/remove_red_eye',
        'trash': '@MaterialIcons/delete',
        'open': '@MaterialIcons/open_in_browser',
        'open-with': '@MaterialIcons/open_with',
        'validate': '@MaterialIcons/spellcheck',
        'valid': '@MaterialIcons/check_circle',
        'error': '@MaterialIcons/error',
        'image': '@MaterialIcons/image',
        'text': '@MaterialIcons/format_align_left',
        'xml': '@MaterialIcons/ballot',
        'icons': '@MaterialIcons/image_search',
        'home': '@MaterialIcons/home',
        'edit': '@MaterialIcons/edit',
        'menu': '@MaterialIcons/menu',
        'drop-down': '@MaterialIcons/arrow_drop_down',
        'drop-up': '@MaterialIcons/arrow_drop_up',
        'clone-file': '@MaterialIcons/file_copy',
        'listViewMode': '@MaterialIcons/view_headline',
        'previewMode': '@MaterialIcons/view_module',
        'drag-handle': '@MaterialIcons/drag_indicator',
        'expert': '@MaterialIcons/explicit',
        'text-fields': '@MaterialIcons/text_fields',
        'comment-fields': '@MaterialIcons/settings_ethernet',
        'view': '@MaterialIcons/visibility',
        'cut': '@MaterialIcons/content_cut',
        'copy': '@MaterialIcons/content_copy',
        'paste': '@MaterialIcons/content_paste',
        'help': '@MaterialIcons/help',
        'code': '@MaterialIcons/code'
      },
      getIcon: function getIcon(name, size) {
        return Object.prototype.hasOwnProperty.call(this.ICONS, name) ? this.ICONS[name] + '/' + size : '@MaterialIcons/' + name + '/' + size;
      }
    }
  });
  cv.theme.dark.Images.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Images.js.map?dt=1660930433870