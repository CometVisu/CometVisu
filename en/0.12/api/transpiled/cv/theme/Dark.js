(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "cv.theme.dark.Color": {
        "require": true
      },
      "cv.theme.dark.Decoration": {
        "require": true
      },
      "cv.theme.dark.Font": {
        "require": true
      },
      "cv.theme.dark.Icon": {
        "require": true
      },
      "cv.theme.dark.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Dark.js 
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
   * Basic theme for QX-UI relevant parts (should be seen as equilavent to designglobals.css, not design specific
   * but something like the common sense of all designs)
   */
  qx.Theme.define("cv.theme.Dark", {
    meta: {
      color: cv.theme.dark.Color,
      decoration: cv.theme.dark.Decoration,
      font: cv.theme.dark.Font,
      icon: cv.theme.dark.Icon,
      appearance: cv.theme.dark.Appearance
    }
  });
  cv.theme.Dark.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Dark.js.map?dt=1592777074139