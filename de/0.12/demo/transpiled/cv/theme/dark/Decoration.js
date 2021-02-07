(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "osparc.theme.common.Decoration": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Decoration.js 
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
  qx.Theme.define("cv.theme.dark.Decoration", {
    extend: osparc.theme.common.Decoration,
    decorations: {
      "window-caption-active": {},
      'cv-editor-config-section': {
        style: {
          width: 1,
          color: 'material-textfield'
        }
      },
      'cv-snackbar-msg': {
        style: {
          backgroundColor: 'button'
        }
      },
      'cv-snackbar-msg-error': {
        style: {
          backgroundColor: 'material-textfield-invalid'
        }
      },
      'cv-toolbar': {
        style: {
          width: [1, 0, 1, 0],
          color: 'background-main'
        }
      },
      'file-action-button': {
        style: {
          width: 1,
          color: 'text'
        }
      },
      'cv-start-section-title': {
        style: {
          width: [1, 0, 0, 0],
          color: 'text-placeholder'
        }
      },
      'open-file-tabs': {
        style: {
          shadowSpreadRadius: 0,
          shadowBlurRadius: 4,
          shadowHorizontalLength: 1,
          shadowVerticalLength: 1,
          shadowColor: 'rgba(255, 255, 255, 0.1)'
        }
      },
      'cv-file-item-add-file': {
        style: {
          width: 1,
          color: 'text',
          style: 'dashed'
        }
      }
    }
  });
  cv.theme.dark.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1612691011679