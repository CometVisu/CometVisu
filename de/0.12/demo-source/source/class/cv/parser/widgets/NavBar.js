/* NavBar.js 
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
 *
 */
qx.Class.define('cv.parser.widgets.NavBar', {
  type: "static",
  
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      cv.parser.WidgetParser.parseChildren(xml, path, flavour, pageType);
      return data;
    },

    createDefaultWidget: function (widgetType, n, path) {

      var classes = "navbar clearfix";
      if (qx.bom.element.Attribute.get(n, 'flavour')) {
        classes += " flavour_" + qx.bom.element.Attribute.get(n, 'flavour');
      }// sub design choice

      // store scope globally
      var id = path.split("_");
      id.pop();
      var pos = qx.bom.element.Attribute.get(n, 'position') || 'left';
      cv.data.Model.getInstance().setWidgetData(id.join('_') + '_' + pos + '_navbar', {
        'scope': cv.parser.widgets.NavBar._transformScope(qx.bom.element.Attribute.get(n, 'scope'))
      });

      return cv.data.Model.getInstance().setWidgetData(cv.parser.WidgetParser.getStoragePath(n, path), {
        'path': path,
        'classes': classes,
        '$$type': widgetType
      });
    },

    _transformScope: function(value) {
      value = parseInt(value);
      if (value >= 0) {
        return value;
      } else {
        return -1;
      }
    },

    getAttributeToPropertyMappings: function () {
      return {
        'scope': {"default": -1, transform: cv.parser.widgets.NavBar._transformScope},
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
    cv.parser.WidgetParser.addHandler("navbar", statics);
  }
});