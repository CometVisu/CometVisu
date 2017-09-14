/* BodyBlocker.js 
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


//noinspection JSUnusedGlobalSymbols
qx.Class.define('cv.ui.BodyBlocker', {
  extend: qx.bom.Blocker,
  type: "singleton",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function () {
    this.base(arguments);
    this.setBlockerOpacity(0.5);
    this.setBlockerColor("#000000");
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __body: null,
    __counter: 0,

    block: function() {
      this.base(arguments, this.__getBody());
      this.__counter++;

      qx.bom.Selector.query("#centerContainer, #navbarTop, #top, #navbarBottom").forEach(function(elem) {
        qx.bom.element.Class.add(elem, "blurred");
      });
    },

    unblock: function() {
      this.__counter--;
      if (this.__counter <= 0) {
        this.base(arguments);
      }
      qx.bom.Selector.query("#centerContainer, #navbarTop, #top, #navbarBottom").forEach(function(elem) {
        qx.bom.element.Class.remove(elem, "blurred");
      });
    },

    __getBody: function() {
      if (!this.__body) {
        this.__body = qx.bom.Selector.query("body")[0];
      }
      return this.__body;
    }
  }
});
