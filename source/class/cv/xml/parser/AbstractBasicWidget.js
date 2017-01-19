/* AbstractBasicWidget.js 
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
qx.Class.define('cv.xml.parser.AbstractBasicWidget', {
  extend: qx.core.Object,

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Define ENUM of maturity levels for features, so that e.g. the editor can
     * ignore some widgets when they are not supported yet
     */
    Maturity : {
      release: 0,
      development: 1
    },

    /**
     * Parse the widgets XML confuguration
     * @param element {Element} the widgets XML Element from the config file
     * @param path {String} internal path to the widget
     * @param flavour {String} inherited flavour
     * @param pageType {String} text, 2d or 3d the parent page type
     * @return {Map} the extracted information, that is stored in the data model
     */
    parse: function (element, path, flavour, pageType) {
      return cv.data.Model.getInstance().setWidgetData( path, {
        'path': path,
        '$$type': cv.xml.Parser.getElementType(element),
        'pageType': pageType
      });
    },

    /**
     * Returns a map with definitions for the XML Parser to map XML-Attribute values
     * to properties e.g
     * <pre>{
         *  <attribute-name>: {
         *    target: <property-name>,
         *    default: <default-value>,
         *    transform: <callback to transform the value to the desired value>
         *  }
         * }</pre>
     * @return {Object}
     */
    getAttributeToPropertyMappings: function() {
      return null;
    }
  }
});
