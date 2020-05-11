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
        'previewMode': '@MaterialIcons/view_module'
      },
      getIcon: function getIcon(name, size) {
        return this.ICONS.hasOwnProperty(name) ? this.ICONS[name] + '/' + size : '@MaterialIcons/' + name + '/' + size;
      }
    }
  });
  cv.theme.dark.Images.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Images.js.map?dt=1589219112981