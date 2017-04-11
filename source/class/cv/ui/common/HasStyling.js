/* HasStyling.js 
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


qx.Mixin.define("cv.ui.common.HasStyling", {

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    styling: {
      check: "String",
      init: null,
      nullable: true
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    applyStyling: function (value) {
      var sty = cv.Config.getStyling(this.getStyling());
      if (sty) {
        var e = qx.bom.Selector.query('.actor:has(".value")', this.getDomElement())[0];
        qx.bom.element.Class.removeClasses(e, sty.classnames.split(" ")); // remove only styling classes
        if (!this._findValue(value, false, e, sty) && sty.defaultValue !== undefined) {
          this._findValue(sty.defaultValue, true, e, sty);
        }
      }
    },

    _findValue: function (value, findExact, element, styling) {
      if (undefined === value) {
        return false;
      }
      if (styling[value]) { // fixed value
        qx.bom.element.Class.add(element, styling[value]);
        return true;
      }
      else {
        var range = styling.range;
        if (findExact && range[value]) {
          qx.bom.element.Class.add(element, range[value][1]);
          return true;
        }
        var valueFloat = parseFloat(value);
        for (var min in range) {
          if (min > valueFloat) { continue; }
          if (range[min][0] < valueFloat) { continue; }// check max
          qx.bom.element.Class.add(element, range[min][1]);
          return true;
        }
      }
      return false;
    }
  }
});