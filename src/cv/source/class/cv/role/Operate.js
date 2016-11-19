/* _common.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

qx.Mixin.define("cv.role.Operate", {

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    /**
     * Action performed when the widget got clicked, sends data to the backend
     *
     * @method action
     * @param {String} path - Internal path of the widget
     * @param {Element} actor - DOMElement
     * @param {Boolean} isCanceled - If true the action does nothing
     */
    action: function (path, actor, isCanceled, event) {
      if (isCanceled) return;
      if (this.getActionValue) {
        this.sendToBackend(this.getActionValue(path, actor, isCanceled, event));
      }
    },

    downaction: function () {

    },

    /**
     * Send the given value to all writeable addresses known to this widget
     *
     * @method sendToBackend
     * @param value
     * @param filter {Function} optional filter function for addresses
     */
    sendToBackend: function (value, filter) {
      if (this.getAddress) {
        var list = this.getAddress();
        for (var id in list) {
          if (list.hasOwnProperty(id)) {
            var address = list[id];
            if (!!(address[1] & 2) && (!filter || filter(address))) {
              cv.TemplateEngine.getInstance().visu.write(id, cv.Transform.encode(address[0], value));
            }
          }
        }
      }
    }
  }
});