/* PageJump.js 
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
 *
 */
qx.Class.define('cv.xml.parser.widgets.PageJump', {
  extend: cv.xml.parser.AbstractBasicWidget,
  include: [
    cv.role.HasChildren,
    cv.role.HasAnimatedButton
  ],

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    afterParse: function(xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      var widgetInfo = qx.bom.Selector.query('widgetinfo > *', xml)[0];
      if (widgetInfo!==undefined) {
        data.classes += " infoaction";
      }
    },
    getAttributeToPropertyMappings: function () {
      return {
        'target'      : { 'default': '0' },
        'active_scope': { target: 'activeScope', 'default': 'target' },
        'name'        : {},
        'path'        : { target: 'targetPath' }
      };
    }
  },

  defer: function(statics) {
    // register the parser
    cv.xml.Parser.addHandler("pagejump", statics);
    cv.xml.Parser.addHook("pagejump", "after", statics.afterParse, statics);
    cv.xml.Parser.addHook("pagejump", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
  }
});
