/* PushButton.js 
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
 * Adds a button to the visu that sends a defined value to the BUS when you press and release.
 * E.g. pushing a 1 and releasing a 0. This makes it possible, for example,
 * to simulate a push button to open and close a garage door, blinds or blinds.
 *
 * @since 2013
 */
qx.Class.define('cv.ui.structure.pure.PushButton', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Update],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    'downValue': {check: "String", init: "1"},
    'upValue': {check: "String", init: "0"}
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // overridden
    _getInnerDomString: function () {
      return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    },

    // overridden
    initListeners: function() {
      this.addElementListener("pointerdown", this._onPointerDown, this);
      this.addElementListener("pointerup", this._onPointerUp, this);
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     *
     * @param value {any} incoming data (already transformed + mapped)
     */
    handleUpdate: function (value) {
      var actor = this.getActor();
      // compare against the unmapped value
      value = "" + this.getBasicValue();
      var off = this.getUpValue();
      actor.classList.remove(value === off ? 'switchPressed' : 'switchUnpressed');
      actor.classList.add(value === off ? 'switchUnpressed' : 'switchPressed');
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     *
     *
     */
    getActionValue: function (event) {
      if (event.type === "pointerup") {
        return this.getUpValue();
      } else {
        return this.getDownValue();
      }
    },

    _onPointerUp: function () {
      var sendValue = this.getUpValue();
      this.sendToBackend(sendValue, function (address) {
        return (!address[2] || address[2] === "up");
      });
    },

    _onPointerDown: function () {
      var sendValue = this.getDownValue();
      this.sendToBackend(sendValue, function (address) {
        return (!address[2] || address[2] === "down");
      });
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("pushbutton", statics);
  }
});