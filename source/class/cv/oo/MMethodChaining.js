/* MMethodChaining.js 
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


//noinspection JSUnusedGlobalSymbols
/**
 * MMethodChaining
 *
 * @author tobiasb
 * @since 2016
 */

qx.Mixin.define('cv.oo.MMethodChaining', {

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __chain: {
      before: {},
      after: {}
    },

    addBeforeMethod: function(name, callback, context) {
      this.__addMethod("before", name, callback, context);
    },

    addAfterMethod: function(name, callback, context) {
      this.__addMethod("after", name, callback, context);
    },

    __addMethod: function(type, name, callback, context) {
      if (!this.__chain[type][name]) {
        this.__chain[type][name] = [];
      }
      this.__chain[type][name].push([callback, context]);
    },

    processBeforeChain: function(name) {
      this.__processChain("before", name);
    },

    processAfterChain: function(name) {
      this.__processChain("after", name);
    },

    __processChain: function() {
      if (!this.__chain[arguments[0]][arguments[1]]) {
        return;
      }
      var type = [].splice.call(arguments, 0, 1);
      var name = [].splice.call(arguments, 0, 1);
      var args = arguments;
      this.__chain[type][name].forEach(function(entry) {
        if (this === entry[1]) {
          entry[0].apply(this, args);
        }
      }, this);
    }
  }
});