/* Slide.js 
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
qx.Class.define('cv.parser.widgets.Slide', {
  type: 'static',

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
      const data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path);

      let datatype_min;
      let datatype_max;
      Array.from(xml.children).filter(function(m) {
 return m.matches('address'); 
}).forEach(function(elem) {
        const transform = elem.getAttribute('transform');
        if (cv.Transform.registry[transform] && cv.Transform.registry[transform].range) {
          if (!(datatype_min > cv.Transform.registry[transform].range.min)) { // jshint ignore:line
            datatype_min = cv.Transform.registry[transform].range.min;
          }
          if (!(datatype_max < cv.Transform.registry[transform].range.max)) { // jshint ignore:line
            datatype_max = cv.Transform.registry[transform].range.max;
          }
        }
      });
      const min = parseFloat(xml.getAttribute('min') || datatype_min || 0);
      const max = parseFloat(xml.getAttribute('max') || datatype_max || 100);

      data.min = min;
      data.max = max;
      return data;
    },

    getAttributeToPropertyMappings: function () {
      return {
        'step': {'default': 0.5, transform: parseFloat},
        'send_on_finish': {
          target: 'sendOnFinish',
          'default': false,
          transform: function(value) {
            return value === 'true';
          }
        }
      };
    }
  },

  defer: function (statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler('slide', statics);
  }
});
