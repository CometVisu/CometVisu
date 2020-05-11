(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Audio.js 
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
   * Parse &lt;audio;gt; config elements
   */
  qx.Class.define('cv.parser.widgets.Audio', {
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
       * @return {Map} extracted data from config element as key/value map
       */
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path);
        return data;
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
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          src: {},
          id: {},
          width: {},
          height: {},
          autoplay: {
            transform: function transform(value) {
              return value === "autoplay" || value === "true";
            }
          },
          loop: {
            transform: function transform(value) {
              return value === "loop" || value === "true";
            }
          },
          thresholdValue: {
            "default": 1
          }
        };
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler("audio", statics);
    }
  });
  cv.parser.widgets.Audio.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Audio.js.map?dt=1589219652310