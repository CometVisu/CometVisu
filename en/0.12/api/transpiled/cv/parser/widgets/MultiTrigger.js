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

  /* MultiTrigger.js 
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
  qx.Class.define('cv.parser.widgets.MultiTrigger', {
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
        var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
        cv.parser.WidgetParser.parseFormat(xml, path);
        cv.parser.WidgetParser.parseAddress(xml, path, this.makeAddressListFn);
        var buttonRegex = /^button([\d]+)(label|value)$/;
        var buttonConfig = {};

        for (var i = 0; i < xml.attributes.length; i++) {
          var attrib = xml.attributes[i];
          var match = buttonRegex.exec(attrib.name);

          if (match) {
            if (!Object.prototype.hasOwnProperty.call(buttonConfig, match[1])) {
              buttonConfig[match[1]] = {};
            }

            buttonConfig[match[1]][match[2]] = attrib.value;
          }
        } // parse buttons


        var buttons = xml.querySelectorAll('buttons > button');

        for (i = 0; i < buttons.length; i++) {
          buttonConfig[i + 1] = {
            value: buttons[i].textContent
          };

          if (buttons[i].hasAttribute('label')) {
            buttonConfig[i + 1].label = buttons[i].getAttribute('label');
          }
        }

        data.buttonConfiguration = buttonConfig;
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          showstatus: {
            transform: function transform(value) {
              return value === 'true';
            }
          },
          elementsPerLine: {
            transform: parseInt,
            'default': 2
          }
        };
      },
      makeAddressListFn: function makeAddressListFn(src, transform, mode, variant) {
        return [true, variant];
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler('multitrigger', statics);
    }
  });
  cv.parser.widgets.MultiTrigger.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MultiTrigger.js.map?dt=1650119454618