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
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Toggle.js
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
   * The toggle widget is similar to the switch, but it can take more than two states.
   * Can be used to change the operating modes of the heating system.
   * Each time the toggle is pressed, the toggle takes the next possible state.
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.Toggle', {
    extend: cv.ui.structure.pure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.Update, cv.ui.common.HasAnimatedButton],
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      },
      /**
       * Get the value that should be send to backend after the action has been triggered
       * @return {var}
       */
      getActionValue: function getActionValue() {
        return this.getNextMappedValue(this.getBasicValue(), this.getMapping());
      }
    }
  });
  cv.ui.structure.pure.Toggle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Toggle.js.map?dt=1677345914829