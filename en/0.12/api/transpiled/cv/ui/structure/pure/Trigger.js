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
      "cv.ui.common.Operate": {
        "require": true
      },
      "cv.ui.common.HasAnimatedButton": {
        "require": true
      },
      "cv.ui.common.BasicUpdate": {
        "require": true
      },
      "cv.ui.common.HandleLongpress": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Trigger.js 
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
   * Adds a button to the visu with which exactly a defined value for a short,
   * as well as a defined value for a long key pressure, can be sent to the BUS,
   * e.g. for recalling and storing scenes or driving roller blinds. (Short = stop, long = drive).
   * The address for short and long term may vary.
   *
   * @author Christian Mayer
   * @since 2012
   */
  qx.Class.define('cv.ui.structure.pure.Trigger', {
    extend: cv.ui.structure.AbstractWidget,
    include: [cv.ui.common.Operate, cv.ui.common.HasAnimatedButton, cv.ui.common.BasicUpdate, cv.ui.common.HandleLongpress],

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      sendValue: {
        check: "String",
        init: "0"
      },
      shortValue: {
        check: "String",
        init: "0"
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _onDomReady: function _onDomReady() {
        cv.ui.structure.pure.Trigger.prototype._onDomReady.base.call(this);

        this.defaultUpdate(undefined, this.getSendValue(), this.getDomElement());
      },
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      },

      /**
       * Handle a short tap event and send the value for short pressing the trigger to the backend.
       * If there is no short threshold set, this send the value for long presses to the backend.
       */
      _action: function _action() {
        var value = this.getShortThreshold() > 0 || this.isShortDefault() ? this.getShortValue() : this.getSendValue();
        this.sendToBackend(value, function (address) {
          return !!(address[2] & 1);
        });
      },

      /**
       * Handle a long tap event and send the value for long pressing the trigger to the backend.
       */
      _onLongTap: function _onLongTap() {
        this.sendToBackend(this.getSendValue(), function (address) {
          return !!(address[2] & 2);
        });
      }
    }
  });
  cv.ui.structure.pure.Trigger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Trigger.js.map?dt=1589123551372