(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* HandleLongpress.js
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

  qx.Mixin.define('cv.ui.common.HandleLongpress', {
    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      shortThreshold: {
        check: 'Number',
        init: -1
      },
      shortDefault: {
        check: 'Boolean',
        init: false
      },
      // is true use short value if no threshold is set, otherwise use long

      /**
       * true: send the long value after the mouse button is released
       * false: send the long value when the time since the button is pressed is greater than shortThreshold before the button is released
       */
      sendLongOnRelease: {
        check: 'Boolean',
        init: true
      }
    }
  });
  cv.ui.common.HandleLongpress.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HandleLongpress.js.map?dt=1702901342399