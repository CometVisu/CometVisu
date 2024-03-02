(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Web.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
  qx.Class.define('cv.parser.pure.widgets.Web', {
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
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.pure.WidgetParser.parseFormat(xml, path);
        cv.parser.pure.WidgetParser.parseAddress(xml, path);
        cv.parser.pure.WidgetParser.parseRefresh(xml, path);
        var ga = xml.getAttribute('ga');
        if (ga) {
          cv.data.Model.getInstance().addAddress(ga);
          var defaultClient = cv.io.BackendConnections.getClient();
          if (defaultClient) {
            switch (defaultClient.getType()) {
              case 'knxd':
                data.address['_' + ga] = {
                  transform: 'DPT:1.001',
                  mode: 0
                };
                break;
              case 'openhab':
                data.address['_' + ga] = {
                  transform: 'OH:switch',
                  mode: 'OFF'
                };
                break;
              default:
                qx.log.Logger.error(this, 'web-widget address does not support backends of type', defaultClient.getType());
                break;
            }
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
              return value === 'true';
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
      cv.parser.pure.WidgetParser.addHandler('web', statics);
    }
  });
  cv.parser.pure.widgets.Web.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Web.js.map?dt=1709410134213