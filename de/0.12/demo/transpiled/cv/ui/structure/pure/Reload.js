(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.util.Location": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Reload.js 
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
   * With the reload widget, the visu is added a switch, which allows to reload the full visu in the browser.
   *
   * @author Christian Mayer
   * @since 2014
   */
  qx.Class.define('cv.ui.structure.pure.Reload', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Update],

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden, return undefined to prevent widget from being renderered into DOM
      getDomString: function getDomString() {
        return;
      },
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return;
      },
      _update: function _update(address, data) {
        var value = this.defaultValueHandling(address, data);

        if (value > 0) {
          cv.util.Location.reload(true);
        }
      }
    }
  });
  cv.ui.structure.pure.Reload.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Reload.js.map?dt=1589727206952