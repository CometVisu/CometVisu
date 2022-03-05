/* Mqtt.js 
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
 * Transformations for the MQTT backend
 * 
 * @author Christian Mayer
 * @since 2021
 */
qx.Class.define('cv.transforms.Mqtt', {
  type: 'static',

  /**
   * This class defines the default transforms: encode: transform JavaScript to
   * bus value decode: transform bus to JavaScript value
   */
  defer: function() {
    cv.Transform.addTransform('MQTT', {
      'number': {
        name: 'MQTT_Number',
        encode: function (phy) {
          return parseFloat(phy);
        },
        decode: function (str) {
          return parseFloat(str);
        }
      },

      'string': {
        name: 'MQTT_String',
        encode: function (phy) {
          return phy.toString();
        },
        decode: function (str) {
          return str.toString();
        }
      },

      'unixtime': {
        name: 'MQTT_unixtime',
        encode: function (phy) {
          return Math.round(phy.getTime()/1000);
        },
        decode: function (str) {
          return new Date(parseFloat(str)*1000);
        }
      },

      'timestring': {
        name: 'MQTT_timestring',
        encode: function (phy) {
          return phy.toTimeString().split(' ')[0];
        },
        decode: function (str) {
          const date = new Date(); // assume today
          date.setHours(
            parseInt(str.substr(0, 2)),
            parseInt(str.substr(3, 2)),
            parseInt(str.substr(6, 2)),
            0
          );
          return date;
        }
      },

      'datetime': {
        name: 'MQTT_datetime',
        encode: function (phy) {
          return phy.toISOString();
        },
        decode: function (str) {
          return new Date(str);
        }
      },

      'color_xy': {
        name: 'MQTT_color_xy',
        lname: {
          'de': 'xy-Farbe',
          'en': 'xy color'
        },
        example: '{"x":0.123,"y":0.123}',
        unit: '-',
        encode: function (phy) {
          return {
            'x': phy.get('x'),
            'y': phy.get('y')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['x', parseFloat(value.x)],
            ['y', parseFloat(value.y)],
            ['cValid', true]
          ]);
        }
      },

      'color_xyY': {
        name: 'MQTT_color_xyY',
        lname: {
          'de': 'xyY-Farbe',
          'en': 'xyY color'
        },
        example: '{"x":0.123,"y":0.123,"Y":100}',
        unit: '-',
        encode: function (phy) {
          return {
            'x': phy.get('x'),
            'y': phy.get('y'),
            'Y': phy.get('Y')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['x', parseFloat(value.x)],
            ['y', parseFloat(value.y)],
            ['Y', parseFloat(value.Y)],
            ['cValid', true],
            ['YValid', true]
          ]);
        }
      },

      'color_hsv': {
        name: 'MQTT_color_hsv',
        lname: {
          'de': 'HSV-Farbe als Zeichenkette',
          'en': 'HSV color as string'
        },
        example: '360,100,100',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '';
          }
          return [phy.get('h'), phy.get('s'), phy.get('v')].join(',');
        },
        decode: function (str) {
          const value = str.split(',');
          return new Map([
            ['h', parseFloat(value[0])],
            ['s', parseFloat(value[1])],
            ['v', parseFloat(value[2])]
          ]);
        }
      },

      'color_h_s_v': {
        name: 'MQTT_color_h_s_v',
        lname: {
          'de': 'HSV-Farbe',
          'en': 'HSV color'
        },
        example: '{"h":360,"s":100,"v":100}',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return {};
          }
          return {
            'h': phy.get('h'),
            's': phy.get('s'),
            'v': phy.get('v')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['h', parseFloat(value.h)],
            ['s', parseFloat(value.s)],
            ['v', parseFloat(value.v)]
          ]);
        }
      },

      'color_hsl': {
        name: 'MQTT_color_hsl',
        lname: {
          'de': 'HSL-Farbe als Zeichenkette',
          'en': 'HSL color as string'
        },
        example: '360,100,100',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '';
          }
          return [phy.get('h'), phy.get('s'), phy.get('v')].join(',');
        },
        decode: function (str) {
          const value = str.split(',');
          return new Map([
            ['h', parseFloat(value[0])],
            ['s', parseFloat(value[1])],
            ['v', parseFloat(value[2])]
          ]);
        }
      },

      'color_h_s_l': {
        name: 'MQTT_color_h_s_l',
        lname: {
          'de': 'HSL-Farbe',
          'en': 'HSL color'
        },
        example: '{"h":360,"s":100,"l":100}',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '{}';
          }
          return {
            'h': phy.get('h'),
            's': phy.get('s'),
            'l': phy.get('v')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['h', parseFloat(value.h)],
            ['s', parseFloat(value.s)],
            ['v', parseFloat(value.l)]
          ]);
        }
      },

      'color_rgb': {
        name: 'MQTT_color_rgb',
        lname: {
          'de': 'RGB-Farbe als Zeichenkette',
          'en': 'RGB color as string'
        },
        example: '100,100,100',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '';
          }
          return [phy.get('r'), phy.get('g'), phy.get('b')].join(',');
        },
        decode: function (str) {
          const value = str.split(',');
          return new Map([
            ['r', parseFloat(value[0])],
            ['g', parseFloat(value[1])],
            ['b', parseFloat(value[2])]
          ]);
        }
      },

      'color_r_g_b': {
        name: 'MQTT_color_r_g_b',
        lname: {
          'de': 'RGB-Farbe',
          'en': 'RGB color'
        },
        example: '{"r":100,"g":100,"b":100}',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '{}';
          }
          return {
            'r': phy.get('r'),
            'g': phy.get('g'),
            'b': phy.get('b')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['r', parseFloat(value.r)],
            ['g', parseFloat(value.g)],
            ['b', parseFloat(value.b)]
          ]);
        }
      },

      'color_rgbw': {
        name: 'MQTT_color_rgbw',
        lname: {
          'de': 'RGBW-Farbe als Zeichenkette',
          'en': 'RGBW color as string'
        },
        example: '100,100,100,100',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '';
          }
          return [phy.get('r'), phy.get('g'), phy.get('b'), phy.get('w')].join(',');
        },
        decode: function (str) {
          const value = str.split(',');
          return new Map([
            ['r', parseFloat(value[0])],
            ['g', parseFloat(value[1])],
            ['b', parseFloat(value[2])],
            ['w', parseFloat(value[3])]
          ]);
        }
      },

      'color_r_g_b_w': {
        name: 'MQTT_color_r_g_b_w',
        lname: {
          'de': 'RGBW-Farbe',
          'en': 'RGBW color'
        },
        example: '{"r":100,"g":100,"b":100,"w":100}',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '{}';
          }
          return {
            'r': phy.get('r'),
            'g': phy.get('g'),
            'b': phy.get('b'),
            'w': phy.get('w')
          };
        },
        decode: function (str) {
          const value = typeof str === 'string' ? JSON.parse(str) : str;
          return new Map([
            ['r', parseFloat(value.r)],
            ['g', parseFloat(value.g)],
            ['b', parseFloat(value.b)],
            ['w', parseFloat(value.w)]
          ]);
        }
      },

      'color_rgb_hex': {
        name: 'MQTT_color_rgb_hex',
        lname: {
          'de': 'RGB-Farbe',
          'en': 'RGB color'
        },
        example: '#11FF88',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '#000000';
          }
          return [
            '#',
            cv.Transform.clipInt(0, phy.get('r'), 255, 255 / 100).toString(16).padStart(2, '0'),
            cv.Transform.clipInt(0, phy.get('g'), 255, 255 / 100).toString(16).padStart(2, '0'),
            cv.Transform.clipInt(0, phy.get('b'), 255, 255 / 100).toString(16).padStart(2, '0')
          ].join('');
        },
        decode: function (str) {
          return new Map([
            ['r', parseInt(str.substr(1, 2), 16) * 100 / 255.0],
            ['g', parseInt(str.substr(3, 2), 16) * 100 / 255.0],
            ['b', parseInt(str.substr(5, 2), 16) * 100 / 255.0]
          ]);
        }
      },

      'color_rgbw_hex': {
        name: 'MQTT_color_rgbw_hex',
        lname: {
          'de': 'RGBW-Farbe',
          'en': 'RGBW color'
        },
        example: '#11FF88AA',
        unit: '-',
        encode: function (phy) {
          if (!(phy instanceof Map)) {
            return '#00000000';
          }
          return [
            '#',
            cv.Transform.clipInt(0, phy.get('r'), 255, 255 / 100).toString(16).padStart(2, '0'),
            cv.Transform.clipInt(0, phy.get('g'), 255, 255 / 100).toString(16).padStart(2, '0'),
            cv.Transform.clipInt(0, phy.get('b'), 255, 255 / 100).toString(16).padStart(2, '0'),
            cv.Transform.clipInt(0, phy.get('w'), 255, 255 / 100).toString(16).padStart(2, '0')
          ].join('');
        },
        decode: function (str) {
          return new Map([
            ['r', parseInt(str.substr(1, 2), 16) * 100 / 255.0],
            ['g', parseInt(str.substr(3, 2), 16) * 100 / 255.0],
            ['b', parseInt(str.substr(5, 2), 16) * 100 / 255.0],
            ['w', parseInt(str.substr(7, 2), 16) * 100 / 255.0]
          ]);
        }
      }
    });
  }
});
