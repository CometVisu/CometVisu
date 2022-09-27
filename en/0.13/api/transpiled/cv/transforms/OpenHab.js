(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Transform": {
        "defer": "runtime"
      },
      "qx.util.ColorUtil": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* OpenHab.js 
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
   * Transformations for the openHAB backend
   *
   * @author Tobias Bräutigam
   * @since 2012
   */
  qx.Class.define('cv.transforms.OpenHab', {
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      isUndefined: function isUndefined(value) {
        return ['NaN', 'Uninitialized', 'NULL', 'UNDEF', undefined, null].indexOf(value) >= 0;
      }
    },

    /**
     * This class defines the default transforms: encode: transform JavaScript to
     * bus value decode: transform bus to JavaScript value
     */
    defer: function defer() {
      cv.Transform.addTransform('OH', {
        'switch': {
          name: 'OH_Switch',
          encode: function encode(phy) {
            // using == comparisons to make sure that e.g. 1 equals "1"
            return phy == 1 ? 'ON' : 'OFF'; // jshint ignore:line
          },
          decode: function decode(string) {
            if (cv.transforms.OpenHab.isUndefined(string)) {
              return 0;
            }

            return string === 'ON' || parseInt(string) > 0 ? 1 : 0;
          }
        },
        'playPause': {
          name: 'OH_PlayPause',
          encode: function encode(phy) {
            // using == comparisons to make sure that e.g. 1 equals "1"
            return phy == 1 ? 'PLAY' : 'PAUSE'; // jshint ignore:line
          },
          decode: function decode(string) {
            if (cv.transforms.OpenHab.isUndefined(string)) {
              return 0;
            }

            return string === 'PLAY' || parseInt(string) > 0 ? 1 : 0;
          }
        },
        'contact': {
          name: 'OH_Contact',
          encode: function encode(phy) {
            // using == comparisons to make sure that e.g. 1 equals "1"
            return phy == 1 ? 'OPEN' : 'CLOSED'; // jshint ignore:line
          },
          decode: function decode(string) {
            if (cv.transforms.OpenHab.isUndefined(string)) {
              return 0;
            }

            return string === 'OPEN' ? 1 : 0;
          }
        },
        'rollershutter': {
          name: 'OH_RollerShutter',
          encode: function encode(phy) {
            // using == comparisons to make sure that e.g. 1 equals "1"
            // noinspection EqualityComparisonWithCoercionJS
            if (phy == -1) {
              return 'STOP';
            } // noinspection EqualityComparisonWithCoercionJS


            if (phy == 1 || phy == 100) {
              return 'DOWN';
            } // noinspection EqualityComparisonWithCoercionJS


            if (phy == 0) {
              // eslint-disable-line no-lonely-if
              return 'UP';
            }

            return phy;
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return undefined;
            } else if (str === 'UP' || str === '0') {
              return 0;
            } else if (str === 'DOWN' || str === '100') {
              return 100;
            } else if (str === 'STOP') {
              return -1;
            }

            return str;
          }
        },
        'dimmer': {
          name: 'OH_Dimmer',
          encode: function encode(phy) {
            return parseInt(phy);
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return 0;
            } else if (str === 'ON') {
              return 100;
            } else if (str === 'OFF') {
              return 0;
            }

            return parseInt(str);
          }
        },
        'number': {
          name: 'OH_Number',
          encode: function encode(phy) {
            return parseFloat(phy);
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return 0;
            }

            return parseFloat(str);
          }
        },
        'string': {
          name: 'OH_String',
          encode: function encode(phy) {
            return phy;
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return '';
            }

            return str;
          }
        },
        'datetime': {
          name: 'OH_DateTime',
          applyInTestMode: true,
          encode: function encode(phy) {
            if (phy instanceof Date) {
              return phy.toLocaleDateString();
            }

            return phy;
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return '-';
            }

            return new Date(Date.parse(str));
          }
        },
        'time': {
          name: 'OH_Time',
          applyInTestMode: true,
          encode: function encode(phy) {
            if (phy instanceof Date) {
              return phy.toLocaleTimeString();
            }

            return phy;
          },
          decode: function decode(str) {
            if (cv.transforms.OpenHab.isUndefined(str)) {
              return '-';
            }

            var date = new Date();
            var parts = str.split(':');
            date.setHours(parseInt(parts[0]));
            date.setMinutes(parseInt(parts[1]));
            date.setSeconds(parseInt(parts[2]));
            return date;
          }
        },
        'color': {
          name: 'OH_Color',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return '0, 0, 0';
            }

            if (phy.has('h') && phy.has('s') && phy.has('v')) {
              var hsv = [phy.get('h') || 0, phy.get('s') || 0, phy.get('v') || 0];
              return hsv.join(', ');
            } else if (phy.has('r') && phy.has('g') && phy.has('b')) {
              var rgb = [phy.get('r') || 0, phy.get('g') || 0, phy.get('b') || 0];
              return qx.util.ColorUtil.rgbToHsb(rgb).join(', ');
            }

            return '0, 0, 0';
          },
          decode: function decode(hsbString, variant) {
            if (cv.transforms.OpenHab.isUndefined(hsbString)) {
              return variant === 'rgb' ? new Map([['r', 0], ['g', 0], ['b', 0]]) : new Map([['h', 0], ['s', 0], ['v', 0]]);
            } // decode HSV/HSB to RGB


            if (variant === 'rgb') {
              // decode HSV/HSB to RGB
              var rgb = qx.util.ColorUtil.hsbToRgb(hsbString.split(','));
              return new Map([['r', rgb[0]], ['g', rgb[1]], ['b', rgb[2]]]);
            }

            var hsv = hsbString.split(',').map(parseFloat);
            return new Map([['h', hsv[0]], ['s', hsv[1]], ['v', hsv[2]]]);
          }
        },
        'thing-status': {
          name: 'OH_Thing',
          encode: function encode(val) {
            return val ? 'ONLINE' : 'OFFLINE';
          },
          decode: function decode(val) {
            return val === 'ONLINE';
          }
        }
      });
    }
  });
  cv.transforms.OpenHab.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenHab.js.map?dt=1664297867142