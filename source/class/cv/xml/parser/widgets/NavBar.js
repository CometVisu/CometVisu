/* NavBar.js 
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
qx.Class.define('cv.xml.parser.widgets.NavBar', {
  extend: cv.xml.parser.AbstractBasicWidget,
  
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {

    createDefaultWidget: function (widgetType, n, path, flavour, pageType) {

      var classes = "navbar clearfix";
      if (qx.bom.element.Attribute.get(n, 'flavour')) {
        classes += " flavour_" + qx.bom.element.Attribute.get(n, 'flavour');
      }// sub design choice

      // store scope globally
      var id = path.split("_");
      id.pop();
      var pos = qx.bom.element.Attribute.get(n, 'position') || 'left';
      cv.data.Model.getInstance().setWidgetData(id.join('_') + '_' + pos + '_navbar', {
        'scope': parseFloat(qx.bom.element.Attribute.get(n, 'scope')) || -1
      });

      return cv.data.Model.getInstance().setWidgetData(cv.role.HasChildren.getStoragePath(n, path), {
        'path': path,
        'classes': classes,
        '$$type': widgetType
      });
    },

    getAttributeToPropertyMappings: function () {
      return {
        'scope': {"default": -1, transform: parseFloat},
        'name': {},
        'dynamic': {
          transform: function (value) {
            return value === "true";
          }
        },
        'width': {"default": "300"},
        'position': {"default": 'left'}
      };
    }
  },
  
  defer: function(statics) {
    cv.xml.Parser.addHandler("navbar", statics);
    cv.xml.Parser.addHook("navbar", "after", cv.role.HasChildren.parseChildren, cv.role.HasChildren);
  }
});