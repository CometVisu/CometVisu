(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.tangible.Font": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Font.js
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
   * Font definitions
   */
  qx.Theme.define('cv.theme.dark.Font', {
    extend: qx.theme.tangible.Font,
    fonts: {
      "default": {
        size: 13,
        family: ['sans-serif'],
        color: 'text-primary-on-surface',
        sources: [{
          family: 'Roboto',
          source: ['qx/font/Roboto/roboto-v18-latin_latin-ext-regular.eot', 'qx/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2', 'qx/font/Roboto/roboto-v18-latin_latin-ext-regular.woff', 'qx/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf']
        }]
      },
      bold: {
        size: 13,
        family: ['sans-serif'],
        bold: true,
        color: 'text-primary-on-surface',
        sources: [{
          family: 'Roboto',
          source: ['qx/font/Roboto/roboto-v18-latin_latin-ext-700.eot', 'qx/font/Roboto/roboto-v18-latin_latin-ext-700.woff2', 'qx/font/Roboto/roboto-v18-latin_latin-ext-700.woff', 'qx/font/Roboto/roboto-v18-latin_latin-ext-700.ttf']
        }]
      },
      italic: {
        size: 13,
        family: ['sans-serif'],
        color: 'text-primary-on-surface',
        italic: true,
        sources: [{
          family: 'Roboto',
          source: ['osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf']
        }]
      },
      title: {
        size: 18,
        family: ['sans-serif'],
        color: 'text-primary-on-surface',
        sources: [{
          family: 'Roboto',
          source: ['osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf']
        }]
      },
      small: {
        size: 12,
        family: ['sans-serif'],
        color: 'text-primary-on-surface',
        sources: [{
          family: 'Roboto',
          source: ['osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf']
        }]
      },
      subtitle: {
        size: 16,
        family: ['sans-serif'],
        color: 'text-primary-on-surface',
        sources: [{
          family: 'Roboto',
          source: ['osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff', 'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf']
        }]
      }
    }
  });
  cv.theme.dark.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1705596690689