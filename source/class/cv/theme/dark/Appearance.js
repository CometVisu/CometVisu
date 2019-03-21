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
    'open-file-item': {
      include: 'listitem',
      alias: 'listitem',

      style: function () {
        return {
          iconPosition: 'right',
          gap: 0,
          height: 25,
          padding: [0, 0, 0, 10],
          margin: 0,
          icon: osparc.theme.osparcdark.Image.URLS['tabview-close']
        };
      }
    },
    'open-file-item/icon': {
      include: 'listitem/icon',

      style: function () {
        return {
          padding: 10
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
          width: 300,
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
    }
  }
});