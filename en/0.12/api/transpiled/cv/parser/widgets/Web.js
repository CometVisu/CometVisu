(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.Config": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Web.js 
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
  qx.Class.define('cv.parser.widgets.Web', {
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
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path);
        cv.parser.WidgetParser.parseRefresh(xml, path);
        var ga = xml.getAttribute("ga");

        if (ga) {
          cv.data.Model.getInstance().addAddress(ga);

          if (cv.Config.backend.substr(0, 2) === "oh") {
            data.address['_' + ga] = ['OH:switch', 'OFF'];
          } else {
            data.address['_' + ga] = ['DPT:1.001', 0];
          }
        }

        return data;
      },

      /**
       * Returns a mapping to map XML-Attributes to properties to help the parser to parse the config element.
       * @return {Map}
       */
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          address: {},
          width: {},
          height: {},
          frameborder: {
            transform: function transform(value) {
              return value === "true";
            }
          },
          background: {},
          src: {},
          scrolling: {}
        };
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler("web", statics);
    }
  });
  cv.parser.widgets.Web.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Web.js.map?dt=1586896742042