(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Icon.js 
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
  qx.Theme.define("cv.theme.dark.Icon", {
    aliases: {
      "dialog.icon.cancel": "@MaterialIcons/cancel/18",
      "dialog.icon.ok": "@MaterialIcons/check/18",
      "dialog.icon.info": "@MaterialIcons/info/18",
      "dialog.icon.error": "@MaterialIcons/error/18",
      "dialog.icon.warning": "@MaterialIcons/warning/18"
    }
  });
  cv.theme.dark.Icon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Icon.js.map?dt=1613591254940