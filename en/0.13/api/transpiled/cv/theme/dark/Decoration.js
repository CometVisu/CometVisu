(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.tangible.Decoration": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Decoration.js
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

  qx.Theme.define('cv.theme.dark.Decoration', {
    extend: qx.theme.tangible.Decoration,
    decorations: {
      'window-caption-active': {},
      'main-dark': {
        style: {
          width: 1,
          color: 'button-border'
        }
      },
      'cv-editor-config-section': {
        style: {
          width: 1,
          color: 'primary-focused'
        }
      },
      'cv-snackbar-msg': {
        style: {
          backgroundColor: 'primary'
        }
      },
      'cv-snackbar-msg-error': {
        style: {
          backgroundColor: 'error-focused'
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
          color: 'text-on-primary'
        }
      },
      'cv-start-section-title': {
        style: {
          width: [1, 0, 0, 0],
          color: 'text-on-secondary'
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
          color: 'text-on-primary',
          style: 'dashed'
        }
      },
      'round-button': {
        style: {
          width: 2,
          radius: 32,
          color: 'text-hint-on-surface',
          backgroundColor: 'primary',
          shadowSpreadRadius: 0,
          shadowBlurRadius: 4,
          shadowHorizontalLength: 1,
          shadowVerticalLength: 1,
          shadowColor: 'rgba(255, 255, 255, 0.1)'
        }
      },
      'round-button-hovered': {
        include: 'round-button',
        style: {
          width: 4,
          color: 'primary-hovered'
        }
      }
    }
  });
  cv.theme.dark.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1735222454387