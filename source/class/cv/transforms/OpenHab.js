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
    isUndefined: function (value) {
      return ['NaN', 'Uninitialized', 'NULL', 'UNDEF', undefined, null].indexOf(value) >= 0;
    }
  },


  /**
   * This class defines the default transforms: encode: transform JavaScript to
   * bus value decode: transform bus to JavaScript value
   */
  defer: function () {
    cv.Transform.addTransform('OH', {
      'switch': {
        name: 'OH_Switch',
        encode: function (phy) {
          // using == comparisons to make sure that e.g. 1 equals "1"
          return phy == 1 ? 'ON' : 'OFF'; // jshint ignore:line
        },
        decode: function (string) {
          if (cv.transforms.OpenHab.isUndefined(string)) {
            return 0;
          }
          return (string === 'ON' || parseInt(string) > 0) ? 1 : 0;
        }
      },
      'playPause': {
        name: 'OH_PlayPause',
        encode: function (phy) {
          // using == comparisons to make sure that e.g. 1 equals "1"
          return phy == 1 ? 'PLAY' : 'PAUSE'; // jshint ignore:line
        },
        decode: function (string) {
          if (cv.transforms.OpenHab.isUndefined(string)) {
            return 0;
          }
          return (string === 'PLAY' || parseInt(string) > 0) ? 1 : 0;
        }
      },
      'contact': {
        name: 'OH_Contact',
        encode: function (phy) {
          // using == comparisons to make sure that e.g. 1 equals "1"
          return phy == 1 ? 'OPEN' : 'CLOSED'; // jshint ignore:line
        },
        decode: function (string) {
          if (cv.transforms.OpenHab.isUndefined(string)) {
            return 0;
          }
          return string === 'OPEN' ? 1 : 0;
        }
      },
      'rollershutter': {
        name: 'OH_RollerShutter',
        encode: function (phy) {
          // using == comparisons to make sure that e.g. 1 equals "1"
          // noinspection EqualityComparisonWithCoercionJS
          if (phy == -1) {
            return 'STOP';
          }
          // noinspection EqualityComparisonWithCoercionJS
          if (phy == 1 || phy == 100) {
            return 'DOWN';
          }
          // noinspection EqualityComparisonWithCoercionJS
          if (phy == 0) { // eslint-disable-line no-lonely-if
            return 'UP';
          }
          return phy;
        },
        decode: function (str) {
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
        encode: function (phy) {
          return parseInt(phy);
        },
        decode: function (str) {
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
        encode: function (phy) {
          return parseFloat(phy);
        },
        decode: function (str) {
          if (cv.transforms.OpenHab.isUndefined(str)) {
            return 0;
          }
          return parseFloat(str);
        }
      },
      'string': {
        name: 'OH_String',
        encode: function (phy) {
          return phy;
        },
        decode: function (str) {
          if (cv.transforms.OpenHab.isUndefined(str)) {
            return '';
          }
          return str;
        }
      },
      'datetime': {
        name: 'OH_DateTime',
        applyInTestMode: true,
        encode: function (phy) {
          if (phy instanceof Date) {
            return phy.toLocaleDateString();
          }
          return phy;
        },
        decode: function (str) {
          if (cv.transforms.OpenHab.isUndefined(str)) {
            return '-';
          }
          return new Date(Date.parse(str));
        }
      },
      'time': {
        name: 'OH_Time',
        applyInTestMode: true,
        encode: function (phy) {
          if (phy instanceof Date) {
            return phy.toLocaleTimeString();
          }
          return phy;
        },
        decode: function (str) {
          if (cv.transforms.OpenHab.isUndefined(str)) {
            return '-';
          }
          const date = new Date();
          const parts = str.split(':');
          date.setHours(parseInt(parts[0]));
          date.setMinutes(parseInt(parts[1]));
          date.setSeconds(parseInt(parts[2]));
          return date;
        }
      },
      'color': {
        name: 'OH_Color',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '0, 0, 0';
          }
          let hsv = [
            phy.get('h') || 0,
            phy.get('s') || 0,
            phy.get('v') || 0
          ];
          return hsv.join(', ');
        },
        decode: function (hsbString) {
          if (cv.transforms.OpenHab.isUndefined(hsbString)) {
            return new Map([['h', 0], ['s', 0], ['v', 0]]);
          }
          // decode HSV/HSB to RGB
          let hsv = hsbString.split(',').map(parseFloat);
          return new Map([['h', hsv[0]], ['s', hsv[1]], ['v', hsv[2]]]);
        }
      },
      'thing-status': {
        name: 'OH_Thing',
        encode: function (val) {
          return val ? 'ONLINE' : 'OFFLINE';
        },
        decode: function (val) {
          return val === 'ONLINE';
        }
      }
    });
  }
});
