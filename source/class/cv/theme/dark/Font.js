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
  extend : osparc.theme.common.Font,

  fonts : {
    'italic': {
      size: 13,
      family: ['sans-serif'],
      color: 'text',
      italic: true,
      sources: [
        {
          family: 'Roboto',
          source: [
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf'
          ]
        }
      ]
    },
    'title': {
      size: 18,
      family: ['sans-serif'],
      color: 'text',
      sources: [
        {
          family: 'Roboto',
          source: [
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf'
          ]
        }
      ]
    },
    'small': {
      size: 12,
      family: ['sans-serif'],
      color: 'text',
      sources: [
        {
          family: 'Roboto',
          source: [
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf'
          ]
        }
      ]
    },
    'subtitle': {
      size: 16,
      family: ['sans-serif'],
      color: 'text',
      sources: [
        {
          family: 'Roboto',
          source: [
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.eot',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff2',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.woff',
            'osparc/theme/font/Roboto/roboto-v18-latin_latin-ext-regular.ttf'
          ]
        }
      ]
    }//,
    // "MaterialIcons": {
    //   size: 32,
    //   lineHeight: 1,
    //   comparisonString : "\uf1e3\uf1f7\uf11b\uf19d",
    //   family: ["MaterialIcons"],
    //   sources: [
    //     {
    //       family: "MaterialIcons",
    //       mapping: "iconfont/material/MaterialIcons-Regular.json",
    //       source: [
    //         "iconfont/material/MaterialIcons-Regular.eot",
    //         "iconfont/material/MaterialIcons-Regular.woff2",
    //         "iconfont/material/MaterialIcons-Regular.woff",
    //         "iconfont/material/MaterialIcons-Regular.ttf"
    //       ]
    //     }
    //   ]
    // }
  }
});
