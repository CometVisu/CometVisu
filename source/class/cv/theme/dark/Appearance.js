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
  extend : osparc.theme.osparcdark.Appearance,

  appearances : {
    'cv-icon': {
      include: 'atom',
      alias: 'atom',

      style: function () {
        return  {
          iconPosition: 'top',
          font: 'small',
          width: 100,
          height: 100
        };
      }
    },
    'cv-icon/icon': {
      include: 'atom/icon',
      style: function () {
        return  {
          width: 70,
          height: 70
        };
      }
    },
    'open-file-item': {
      alias: "atom",

      style: function (states) {
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

      style: function () {
        return {
          alignY: 'middle'
        };
      }
    },
    'open-file-item/icon': {
      alias: 'listitem/icon',
      style: function () {
        return {
          alignY: 'middle',
          paddingRight: 8
        };
      }
    },
    'open-file-item/close': {

      style: function () {
        return {
          padding: 8,
          cursor: 'pointer',
          alignY: 'middle'
        };
      }
    },

    'list': {
      style: function () {
        return {
          decorator: null
        };
      }
    },

    'cv-editor-config': {
      style: function () {
        return {
          padding: 10
        };
      }
    },

    'cv-editor-config-section': {
      style: function () {
        return {
          padding: 10,
          decorator: 'cv-editor-config-section',
          marginBottom: 10
        };
      }
    },

    'cv-editor-config-option': {
      style: function () {
        return {
          marginBottom: 10
        };
      }
    },

    'cv-config-textfield': {
      include: 'textfield',
      alias: 'textfield',

      style: function () {
        return {
          minWidth: 300
        };
      }
    },

    'cv-editor-config-section/section-title': {
      style: function () {
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

      style: function() {
        return {
          height: null
        };
      }
    },
    'cv-editor-config-option/value-title': {
      style: function () {
        return {
          allowGrowX: true,
          font: 'subtitle'
        };
      }
    },
    'cv-editor-config-option/key-title': 'cv-editor-config-option/value-title',

    // snackbar components
    'cv-snackbar': {
      style: function () {
        return {
          zIndex: 1000
        };
      }
    },

    'cv-snackbar/list': {
      style: function () {
        return {
          height: null,
          width: 400,
          minWidth: 300
        };
      }
    },

    'cv-snackbar-msg': {
      style: function () {
        return {
          marginTop: 10,
          padding: 10,
          textColor: 'text',
          decorator: 'cv-snackbar-msg'
        };
      }
    },

    'cv-snackbar-msg/content': {
      style: function () {
        return {
          allowGrowX: true
        };
      }
    },

    'cv-snackbar-msg/close': {
      style: function () {
        return {
          cursor: 'pointer'
        };
      }
    },
    'cv-toolbar': {
      include: 'toolbar',
      alias: 'toolbar',

      style: function () {
        return {
          // decorator: 'cv-toolbar'
        };
      }
    },
    'cv-toolbar-button': {
      include: 'toolbar-button',
      alias: 'toolbar-button',

      style: function () {
        return {
          // margin: 1
        };
      }
    },

    'image-viewer': {},
    'image-viewer/scroll': 'scrollarea',
    'image-viewer/image': {
      include: 'atom',
      alias: 'atom',

      style: function () {
        return {
          iconPosition: 'top',
          gap: 10,
          center: true
        };
      },
      'image-viewer/image/label': {
        style: function () {
          return {
            margin: 10
          };
        }
      }
    },

    'fs-tree-item': {
      include: 'virtual-tree-folder',
      alias: 'virtual-tree-folder',

      style: function (states) {
        return {
          font: states.temporary ? 'italic' : 'default'
        };
      }
    },

    'fs-tree-item/icon': {
      include: 'virtual-tree-folder/icon',
      alias: 'virtual-tree-folder/icon',

      style: function(states) {
        return {
          textColor: states.error ? 'invalid-color' : null
        };
      }
    },
    'cv-filesystem': {},
    'cv-filesystem/open-with-button': 'menu-button',
    'cv-filesystem/compare-with-button': 'menu-button'
  }
});