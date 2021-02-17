(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "osparc.theme.common.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Appearance.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
  qx.Theme.define("cv.theme.dark.Appearance", {
    extend: osparc.theme.common.Appearance,
    appearances: {
      'cv-start': 'widget',
      'cv-start/configs-header': {
        style: function style() {
          return {
            margin: [20, 10, 0, 10],
            decorator: 'cv-start-section-title'
          };
        }
      },
      'cv-start/configs-title': {
        style: function style() {
          return {
            iconPosition: 'right',
            font: 'title',
            marginLeft: 10,
            allowGrowX: true
          };
        }
      },
      'cv-start/configs-toolbar': {
        style: function style() {
          return {};
        }
      },
      'cv-start/misc-title': {
        style: function style() {
          return {
            iconPosition: 'right',
            font: 'title',
            margin: [20, 10, 0, 10],
            paddingTop: 5,
            cursor: 'pointer',
            allowGrowX: true,
            decorator: 'cv-start-section-title'
          };
        }
      },
      'cv-start/demo-configs-title': 'cv-start/misc-title',
      'cv-start/media-title': 'cv-start/configs-title',
      'cv-start/media-toolbar': 'cv-start/configs-toolbar',
      'cv-start/media-header': 'cv-start/configs-header',
      'cv-file-item': {
        include: 'listitem',
        alias: 'listitem',
        style: function style(states) {
          return {
            iconPosition: states.list ? 'left' : 'top',
            show: states.list ? 'label' : 'both',
            font: states.list ? 'default' : 'small',
            width: states.list ? 500 : 160,
            backgroundColor: states.hovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          };
        }
      },
      'cv-file-item/atom/label': {
        include: 'atom/label',
        style: function style() {
          return {
            alignY: 'middle',
            allowGrowY: true
          };
        }
      },
      'cv-file-item/atom/icon': {
        include: 'atom/icon',
        style: function style() {
          return {
            width: 70,
            height: 70,
            scale: true
          };
        }
      },
      'cv-file-item/action-menu': 'menu',
      'cv-file-item/download-button': {
        include: 'button',
        alias: 'button',
        style: function style() {
          return {
            height: 30,
            show: 'icon'
          };
        }
      },
      'cv-file-item/action-button': 'cv-file-item/download-button',
      'cv-file-item/open-button': 'cv-file-item/download-button',
      'cv-file-item/edit-button': 'cv-file-item/download-button',
      'cv-icon': 'cv-file-item',
      'cv-icon/icon': {
        include: 'atom/icon',
        style: function style() {
          return {
            width: 70,
            height: 70
          };
        }
      },
      'cv-file-item-add-file': {
        include: 'cv-file-item',
        alias: 'cv-file-item',
        style: function style(states) {
          return {
            decorator: 'cv-file-item-add-file',
            opacity: states.hovered ? 1.0 : 0.5,
            cursor: 'pointer'
          };
        }
      },
      'open-file-item': {
        alias: "atom",
        style: function style(states) {
          var padding = [2, 5, 2, 5];

          if (states.lead) {
            padding = [1, 4, 1, 4];
          }

          if (states.dragover) {
            padding[2] -= 1;
          }

          var backgroundColor;

          if (states.selected) {
            backgroundColor = "background-selected";

            if (states.disabled) {
              backgroundColor += "-disabled";
            }
          }

          return {
            backgroundColor: backgroundColor,
            textColor: states.selected ? "text-selected" : undefined,
            decorator: states.lead ? "lead-item" : states.dragover ? "dragover" : undefined,
            opacity: states.drag ? 0.5 : undefined,
            height: 26,
            padding: padding,
            margin: 0
          };
        }
      },
      'open-file-item/label': {
        include: 'listitem/label',
        style: function style() {
          return {
            alignY: 'middle'
          };
        }
      },
      'open-file-item/icon': {
        alias: 'listitem/icon',
        style: function style() {
          return {
            alignY: 'middle',
            padding: [0, 8]
          };
        }
      },
      'open-file-item/close': {
        style: function style() {
          return {
            padding: 8,
            cursor: 'pointer',
            alignY: 'middle'
          };
        }
      },
      'open-with-button': {
        include: 'menu-button',
        alias: 'menu-button',
        style: function style(states) {
          return {
            font: states["default"] ? 'bold' : 'default'
          };
        }
      },
      'list': {
        style: function style() {
          return {
            decorator: null
          };
        }
      },
      'cv-editor-config': {
        style: function style() {
          return {
            padding: 10
          };
        }
      },
      'cv-editor-config-section': {
        style: function style() {
          return {
            padding: 10,
            decorator: 'cv-editor-config-section',
            marginBottom: 10
          };
        }
      },
      'cv-editor-config-option': {
        style: function style() {
          return {
            marginBottom: 10
          };
        }
      },
      'cv-config-textfield': {
        include: 'textfield',
        alias: 'textfield',
        style: function style() {
          return {
            minWidth: 300
          };
        }
      },
      'cv-editor-config-section/section-title': {
        style: function style() {
          return {
            font: 'title',
            marginRight: 20
          };
        }
      },
      'cv-editor-config-section/options-title': 'cv-editor-config-section/section-title',
      'cv-editor-config-section/name': 'cv-config-textfield',
      'cv-editor-config-section/list': {
        include: 'list',
        alias: 'list',
        style: function style() {
          return {
            height: null
          };
        }
      },
      'cv-editor-config-option/value-title': {
        style: function style() {
          return {
            allowGrowX: true,
            font: 'subtitle'
          };
        }
      },
      'cv-editor-config-option/key-title': 'cv-editor-config-option/value-title',
      // snackbar components
      'cv-snackbar': {
        style: function style() {
          return {
            zIndex: 1000
          };
        }
      },
      'cv-snackbar/list': {
        style: function style() {
          return {
            height: null,
            width: 400,
            minWidth: 300
          };
        }
      },
      'cv-snackbar-msg': {
        style: function style() {
          return {
            marginTop: 10,
            padding: 10,
            textColor: 'text',
            decorator: 'cv-snackbar-msg'
          };
        }
      },
      'cv-snackbar-msg/content': {
        style: function style() {
          return {
            allowGrowX: true
          };
        }
      },
      'cv-snackbar-msg/close': {
        style: function style() {
          return {
            cursor: 'pointer'
          };
        }
      },
      'cv-toolbar': {
        include: 'toolbar',
        alias: 'toolbar',
        style: function style() {
          return {// decorator: 'cv-toolbar'
          };
        }
      },
      'cv-toolbar-button': {
        include: 'toolbar-button',
        alias: 'toolbar-button',
        style: function style() {
          return {// margin: 1
          };
        }
      },
      'image-viewer': {},
      'image-viewer/scroll': 'scrollarea',
      'image-viewer/image': {
        include: 'atom',
        alias: 'atom',
        style: function style() {
          return {
            iconPosition: 'top',
            gap: 10,
            center: true
          };
        },
        'image-viewer/image/label': {
          style: function style() {
            return {
              margin: 10
            };
          }
        }
      },
      'fs-tree-item': {
        include: 'virtual-tree-folder',
        alias: 'virtual-tree-folder',
        style: function style(states) {
          return {
            font: states.temporary ? 'italic' : 'default'
          };
        }
      },
      'fs-tree-item/icon': {
        include: 'virtual-tree-folder/icon',
        alias: 'virtual-tree-folder/icon',
        style: function style(states) {
          return {
            textColor: states.error ? 'invalid-color' : null
          };
        }
      },
      'cv-file-contextmenu': 'menu',
      'cv-file-contextmenu/open-with-button': 'menu-button',
      'cv-file-contextmenu/compare-with-button': 'menu-button',
      'open-files-tabs': {
        style: function style() {
          return {
            height: 34,
            padding: 0,
            marginBottom: 5,
            decorator: 'open-file-tabs'
          };
        }
      }
    }
  });
  cv.theme.dark.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1613588131786