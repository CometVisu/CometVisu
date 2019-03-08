/* Font.js 
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


/**
 * Font definitions
 * @asset(iconfont/material/MaterialIcons-Regular.eot)
 * @asset(iconfont/material/MaterialIcons-Regular.ttf)
 * @asset(iconfont/material/MaterialIcons-Regular.woff)
 * @asset(iconfont/material/MaterialIcons-Regular.woff2)
 * @asset(iconfont/material/MaterialIcons-Regular.json)
 */
qx.Theme.define("cv.theme.dark.Font",
{
  extend : osparc.theme.osparcdark.Font,

  fonts : {
    // "default" :
    // {
    //   size : 13,
    //   family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    // },
    //
    // "bold" :
    //   {
    //     size : 13,
    //     family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"],
    //     bold: true
    //   },
    //
    // "subtext" :
    // {
    //   size : 12,
    //   family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    // },
    //
    // "title" :
    // {
    //   size : 18,
    //   bold : true,
    //   family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    // }
    "MaterialIcons": {
      size: 32,
      lineHeight: 1,
      comparisonString : "\uf1e3\uf1f7\uf11b\uf19d",
      family: ["MaterialIcons"],
      sources: [
        {
          family: "MaterialIcons",
          mapping: "iconfont/material/MaterialIcons-Regular.json",
          source: [
            "iconfont/material/MaterialIcons-Regular.eot",
            "iconfont/material/MaterialIcons-Regular.woff2",
            "iconfont/material/MaterialIcons-Regular.woff",
            "iconfont/material/MaterialIcons-Regular.ttf"
          ]
        }
      ]
    }
  }
});