/* Stylings.js 
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


/**
 * Stylings
 *
 * @author tobiasb
 * @since 2016
 */

qx.Class.define("cv.ui.Stylings", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    __stylings: { },

    getStylings: function() {
      return this.__stylings;
    },

    setStylings: function(map) {
      this.__stylings = map;
    },

    addStyling: function (name, styling) {
      this.__stylings[name] = styling;
    },

    getStyling: function (name) {
      return this.__stylings[name];
    },

    hasStyling: function(name) {
      return this.__stylings.hasOwnProperty(name);
    }
  }
});