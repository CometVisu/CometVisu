(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.pure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Info.js 
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
   * Adds a dynamic field to the visu that can represent values from the BUS
   * (e.g. 14-byte text or temperature measurements).
   *
   * @widgetexample <settings>
   *   <caption>Show temperature in degree celsius</caption>
   *   <screenshot name="info_temp">
   *     <data address="0/0/0">19</data>
   *   </screenshot>
   * </settings>
   * <info format="%.1f °C">
   *   <label>outside temperature</label>
   *   <address transform="DPT:9.001">0/0/0</address>
   * </info>
   *
   * @author Christian Mayer
   * @since 0.8.0 (2012)
   */
  qx.Class.define('cv.ui.structure.pure.Info', {
    extend: cv.ui.structure.pure.AbstractWidget,
    include: cv.ui.common.Update,

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor"><div class="value">-</div></div>';
      }
    }
  });
  cv.ui.structure.pure.Info.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Info.js.map?dt=1664617280492