/* Trigger.js 
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
qx.Class.define('cv.parser.widgets.Trigger', {
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
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
      return data;
    },

    getAttributeToPropertyMappings: function () {
      return {
        'value'      : { target: 'sendValue' , "default": "0" },
        'shorttime'  : { target: 'shortThreshold', "default": -1, transform: parseFloat},
        'shortvalue' : { target: 'shortValue', "default": "0" },
        'send-long-on-release' : {target: 'sendLongOnRelease', transform: function (value) {
            return value ? value === "true" : true;
        }}
      };
    },

    makeAddressListFn: function( src, transform, mode, variant ) {
      // Bit 0 = short, Bit 1 = button => 1|2 = 3 = short + button
      return [ true, variant === 'short' ? 1 : (variant === 'button' ? 2 : 1|2) ];
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("trigger", statics);
  }
});