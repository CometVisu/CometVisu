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
      "cv.Transform": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Slide.js
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
  qx.Class.define('cv.parser.pure.widgets.Slide', {
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
        var datatype_min;
        var datatype_max;
        Array.from(xml.children).filter(function (m) {
          return m.matches('address');
        }).forEach(function (elem) {
          var transform = elem.getAttribute('transform');
          if (cv.Transform.registry[transform] && cv.Transform.registry[transform].range) {
            if (!(datatype_min > cv.Transform.registry[transform].range.min)) {
              datatype_min = cv.Transform.registry[transform].range.min;
            }
            if (!(datatype_max < cv.Transform.registry[transform].range.max)) {
              datatype_max = cv.Transform.registry[transform].range.max;
            }
          }
        });
        var min = parseFloat(xml.getAttribute('min') || datatype_min || 0);
        var max = parseFloat(xml.getAttribute('max') || datatype_max || 100);
        data.min = min;
        data.max = max;
        return data;
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          step: {
            "default": 0.5,
            transform: parseFloat
          },
          send_on_finish: {
            target: 'sendOnFinish',
            "default": false,
            transform: function transform(value) {
              return value === 'true';
            }
          }
        };
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.pure.WidgetParser.addHandler('slide', statics);
    }
  });
  cv.parser.pure.widgets.Slide.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Slide.js.map?dt=1703705654769