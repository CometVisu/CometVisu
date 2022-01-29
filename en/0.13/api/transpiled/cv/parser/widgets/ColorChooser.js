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
      "cv.util.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ColorChooser.js 
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
   * Widget to be able to select a color.
   */
  qx.Class.define('cv.parser.widgets.ColorChooser', {
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
        data.baseColors = {
          // default to sRGB color space with D65 white point
          r: {
            x: 0.64,
            y: 0.33,
            Y: 0.2126
          },
          g: {
            x: 0.30,
            y: 0.60,
            Y: 0.7152
          },
          b: {
            x: 0.15,
            y: 0.06,
            Y: 0.0722
          },
          w: {
            x: 0.3127,
            y: 0.3290,
            Y: 1
          }
        };
        var r_x = xml.getAttribute('r_x');
        var r_y = xml.getAttribute('r_y');
        var r_wavelength = xml.getAttribute('r_wavelength');
        var r_strength = xml.getAttribute('r_strength');
        var r_curve = xml.getAttribute('r_curve');
        var r_scale = xml.getAttribute('r_scale');
        var g_x = xml.getAttribute('g_x');
        var g_y = xml.getAttribute('g_y');
        var g_wavelength = xml.getAttribute('g_wavelength');
        var g_strength = xml.getAttribute('g_strength');
        var g_curve = xml.getAttribute('g_curve');
        var g_scale = xml.getAttribute('g_scale');
        var b_x = xml.getAttribute('b_x');
        var b_y = xml.getAttribute('b_y');
        var b_wavelength = xml.getAttribute('b_wavelength');
        var b_strength = xml.getAttribute('b_strength');
        var b_curve = xml.getAttribute('b_curve');
        var b_scale = xml.getAttribute('b_scale');
        var w_x = xml.getAttribute('w_x');
        var w_y = xml.getAttribute('w_y');
        var w_strength = xml.getAttribute('w_strength');
        var w_curve = xml.getAttribute('w_curve');
        var w_scale = xml.getAttribute('w_scale');

        if (r_wavelength) {
          var xy = cv.util.Color.wavelength2xy(parseFloat(r_wavelength));
          data.baseColors.r.x = xy.x;
          data.baseColors.r.y = xy.y;
        }

        if (r_x) {
          data.baseColors.r.x = parseFloat(r_x);
        }

        if (r_y) {
          data.baseColors.r.y = parseFloat(r_y);
        }

        if (r_strength) {
          data.baseColors.r.Y = parseFloat(r_strength);
        }

        data.baseColors.r.scale = r_scale ? parseFloat(r_scale) : 100;

        switch (r_curve) {
          case 'exponential':
            data.baseColors.r.curve = 'exp';
            break;

          case 'logarithmic':
            data.baseColors.r.curve = 'log';
            break;

          case 'linear':
          case null:
            data.baseColors.r.curve = [1];
            break;

          default:
            data.baseColors.r.curve = r_curve.split(';').map(function (x) {
              return parseFloat(x);
            });
        }

        if (g_wavelength) {
          var _xy = cv.util.Color.wavelength2xy(parseFloat(g_wavelength));

          data.baseColors.g.x = _xy.x;
          data.baseColors.g.y = _xy.y;
        }

        if (g_x) {
          data.baseColors.g.x = parseFloat(g_x);
        }

        if (g_y) {
          data.baseColors.g.y = parseFloat(g_y);
        }

        if (g_strength) {
          data.baseColors.g.Y = parseFloat(g_strength);
        }

        data.baseColors.g.scale = g_scale ? parseFloat(g_scale) : 100;

        switch (g_curve) {
          case 'exponential':
            data.baseColors.g.curve = 'exp';
            break;

          case 'logarithmic':
            data.baseColors.g.curve = 'log';
            break;

          case 'linear':
          case null:
            data.baseColors.g.curve = [1];
            break;

          default:
            data.baseColors.g.curve = g_curve.split(';').map(function (x) {
              return parseFloat(x);
            });
        }

        if (b_wavelength) {
          var _xy2 = cv.util.Color.wavelength2xy(parseFloat(b_wavelength));

          data.baseColors.b.x = _xy2.x;
          data.baseColors.b.y = _xy2.y;
        }

        if (b_x) {
          data.baseColors.b.x = parseFloat(b_x);
        }

        if (b_y) {
          data.baseColors.b.y = parseFloat(b_y);
        }

        if (b_strength) {
          data.baseColors.b.Y = parseFloat(b_strength);
        }

        data.baseColors.b.scale = b_scale ? parseFloat(b_scale) : 100;

        switch (b_curve) {
          case 'exponential':
            data.baseColors.b.curve = 'exp';
            break;

          case 'logarithmic':
            data.baseColors.b.curve = 'log';
            break;

          case 'linear':
          case null:
            data.baseColors.b.curve = [1];
            break;

          default:
            data.baseColors.b.curve = b_curve.split(';').map(function (x) {
              return parseFloat(x);
            });
        }

        if (w_x) {
          data.baseColors.w.x = parseFloat(w_x);
        }

        if (w_y) {
          data.baseColors.w.y = parseFloat(w_y);
        }

        if (w_strength) {
          data.baseColors.w.Y = parseFloat(w_strength);
        }

        data.baseColors.w.scale = w_scale ? parseFloat(w_scale) : 100;

        switch (w_curve) {
          case 'exponential':
            data.baseColors.w.curve = 'exp';
            break;

          case 'logarithmic':
            data.baseColors.w.curve = 'log';
            break;

          case 'linear':
          case null:
            data.baseColors.w.curve = [1];
            break;

          default:
            data.baseColors.w.curve = w_curve.split(';').map(function (x) {
              return parseFloat(x);
            });
        }

        return data;
      },
      makeAddressListFn: function makeAddressListFn(src, transform, mode, variant) {
        return [true, new Set(['r', 'g', 'b']).has(variant) ? 'RGB-' + variant : variant];
      },
      getAttributeToPropertyMappings: function getAttributeToPropertyMappings() {
        return {
          'controls': {
            'default': 'triangle'
          },
          'send_on_finish': {
            target: 'sendOnFinish',
            'default': false,
            transform: function transform(value) {
              return value === 'true';
            }
          }
        };
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler('colorchooser', statics);
    }
  });
  cv.parser.widgets.ColorChooser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ColorChooser.js.map?dt=1643469598091