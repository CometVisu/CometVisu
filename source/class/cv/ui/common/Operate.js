/* Operate.js 
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
 * Provides methods for widgets that can be controlled by the user.
 * Usually this operation includes sending values to the backend.
 */
qx.Mixin.define("cv.ui.common.Operate", {

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    /**
     * Action performed when the widget got clicked, sends data to the backend
     *
     * @param event {Event} tap event
     */
    action: function (event) {
      if (this._skipNextEvent === event.getType()) {
        this._skipNextEvent = null;
        return;
      }
      if (this._action) {
        this._action(event);
      } else {
        if (this.getActionValue) {
          this.sendToBackend(this.getActionValue(event));
        }
      }
      if (event.getBubbles()) {
        event.stopPropagation();
      }
    },

    /**
     * Handles pointerdown events
     * @param event {Event} pointerdown event
     */
    downaction: function(event) {
      if (this._downaction) {
        this._downaction(event);
      }
      if (event.getBubbles()) {
        event.stopPropagation();
      }
    },

    /**
     * Send the given value to all writeable addresses known to this widget
     *
     * @param value {var} value to send
     * @param filter {Function} optional filter function for addresses
     */
    sendToBackend: function (value, filter) {
      if (this.getAddress) {
        var list = this.getAddress();
        for (var id in list) {
          if (list.hasOwnProperty(id)) {
            var address = list[id];
            if (cv.data.Model.isWriteAddress(address) && (!filter || filter(address))) {
              cv.TemplateEngine.getInstance().visu.write(id, cv.Transform.encode(address[0], value));
            }
          }
        }
      }
    }
  }
});