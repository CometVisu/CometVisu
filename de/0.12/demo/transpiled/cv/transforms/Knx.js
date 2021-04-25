(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Transform": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Knx.js 
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
   * @author Christian Mayer
   * @since 2010
   */
  qx.Class.define('cv.transforms.Knx', {
    type: "static",
    defer: function defer() {
      cv.Transform.addTransform('DPT', {
        /**
         * This class defines the default transforms:
         *   encode: transform JavaScript to bus value
         *   decode: transform bus to JavaScript value
         */
        '1.001': {
          name: 'DPT_Switch',
          encode: function encode(phy) {
            phy = +phy; // cast to number

            return {
              bus: phy ? '81' : '80',
              raw: phy ? '01' : '00'
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '1': {
          link: '1.001'
        },
        '1.002': {
          link: '1.001'
        },
        '1.003': {
          link: '1.001'
        },
        '1.008': {
          link: '1.001'
        },
        '1.009': {
          link: '1.001'
        },
        '2': {
          link: '1.001'
        },
        '3.007': {
          name: 'DPT_Control_Dimming',
          encode: function encode(phy) {
            phy = parseFloat(phy);

            if (phy < -100 || phy > -1 && phy <= 0) {
              return {
                bus: '80',
                raw: '00'
              }; // down: stop
            }

            if (phy > 100 || phy > 0 && phy < 1) {
              return {
                bus: '88',
                raw: '08'
              }; // up: stop
            }

            var up = phy > 0,
                stepCode = 7 - Math.floor(Math.log2(Math.abs(phy))),
                val = (stepCode | up * 8).toString(16);
            return {
              bus: '8' + val,
              raw: '0' + val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16),
                up = (val & 8) > 0;
            return (up * 2 - 1) * 100 / Math.pow(2, (val & 7) - 1);
          }
        },
        '3.008': {
          name: 'DPT_Control_Blinds',
          link: '3.007'
        },
        '3': {
          link: '3.007'
        },
        '4.001': {
          name: 'DPT_Char_ASCII',
          encode: function encode(phy) {
            var val = phy.charCodeAt(0).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return String.fromCharCode(parseInt(hex, 16));
          }
        },
        '4': {
          link: '4.001'
        },
        '5.001': {
          name: 'DPT_Scaling',
          unit: '%',
          range: {
            min: 0.0,
            max: 100.0
          },
          encode: function encode(phy) {
            var val = parseInt(phy * 255 / 100).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) * 100 / 255.0;
          }
        },
        '5.003': {
          name: 'DPT_Angle',
          unit: '°',
          range: {
            min: 0.0,
            max: 360.0
          },
          encode: function encode(phy) {
            var val = parseInt(phy * 255 / 360).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) * 360 / 255.0;
          }
        },
        '5.004': {
          name: 'DPT_Percent_U8',
          unit: '%',
          range: {
            min: 0.0,
            max: 255.0
          },
          encode: function encode(phy) {
            var val = parseInt(cv.Transform.clip(0, phy, 255)).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '5.010': {
          link: '5.004',
          name: 'DPT_Value_1_Ucount',
          unit: '-'
        },
        '5': {
          link: '5.004',
          name: '8-Bit Unsigned Value'
        },
        '6.001': {
          name: 'DPT_Percent_V8',
          encode: function encode(phy) {
            phy = parseInt(cv.Transform.clip(-128, phy, 127));
            var val = phy < 0 ? phy + 256 : phy;
            val = val.toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16);
            return val > 127 ? val - 256 : val;
          }
        },
        '6': {
          link: '6.001'
        },
        '7.001': {
          name: 'DPT_Value_2_Ucount',
          encode: function encode(phy) {
            var val = parseInt(phy).toString(16).padStart(4, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '7.600': {
          name: 'DPT_Absolute_Colour_Temperature',
          unit: 'K',
          link: '7.001'
        },
        '7': {
          link: '7.001'
        },
        '8.001': {
          name: 'DPT_Value_2_Count',
          encode: function encode(phy) {
            var val = parseInt(phy);
            val = val < 0 ? val + 65536 : val;
            val = val.toString(16).padStart(4, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16);
            return val > 32767 ? val - 65536 : val;
          }
        },
        '8': {
          link: '8.001'
        },
        '9.001': {
          name: 'DPT_Value_Temp',
          encode: function encode(phy) {
            if (undefined === phy || isNaN(phy)) {
              return '7fff';
            }

            var sign = phy < 0 ? 0x8000 : 0;
            var mant = Math.round(phy * 100.0);
            var exp = 0;

            while (Math.abs(mant) > 2047) {
              mant >>= 1;
              exp++;
            }

            var val = (sign | exp << 11 | mant & 0x07ff).toString(16).padStart(4, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            if (0x7fff === parseInt(hex, 16)) {
              return NaN;
            }

            var bin1 = parseInt(hex.substr(0, 2), 16);
            var bin2 = parseInt(hex.substr(2, 2), 16);
            var sign = parseInt(bin1 & 0x80);
            var exp = parseInt(bin1 & 0x78) >> 3;
            var mant = parseInt((bin1 & 0x7) << 8 | bin2);

            if (sign !== 0) {
              mant = -(~(mant - 1) & 0x7ff);
            }

            return (1 << exp) * 0.01 * mant;
          }
        },
        '9.004': {
          link: '9.001'
        },
        '9.007': {
          link: '9.001'
        },
        '9.008': {
          link: '9.001'
        },
        '9.020': {
          link: '9.001'
        },
        '9.021': {
          link: '9.001'
        },
        '9': {
          link: '9.001'
        },
        '10.001': {
          name: 'DPT_TimeOfDay',
          encode: function encode(phy) {
            var val = ((phy.getDay() << 5) + phy.getHours()).toString(16).padStart(2, '0');
            val += phy.getMinutes().toString(16).padStart(2, '0');
            val += phy.getSeconds().toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var date = new Date(); // assume today

            date.setHours(parseInt(hex.substr(0, 2), 16) & 0x1F);
            date.setMinutes(parseInt(hex.substr(2, 2), 16));
            date.setSeconds(parseInt(hex.substr(4, 2), 16)); // as KNX thinks the day of the week belongs to the time, but JavaScript
            // doesn't, tweak the date till it fits...

            var day = (parseInt(hex.substr(0, 2), 16) & 0xE0) >> 5;

            if (day > 0) {
              var dayShift = (day - date.getDay()) % 7;
              date.setDate(date.getDate() + dayShift);
            }

            return date;
          }
        },
        '11.001': {
          name: 'DPT_Date',
          encode: function encode() {// FIXME
          },
          decode: function decode(hex) {
            var year = parseInt(hex.substr(4, 2), 16) & 0x7F;
            return new Date(year < 90 ? year + 2000 : year + 1900, //1990 - 2089
            (parseInt(hex.substr(2, 2), 16) & 0x0F) - 1, parseInt(hex.substr(0, 2), 16) & 0x1F);
          }
        },
        '12.001': {
          name: 'DPT_Value_4_Ucount',
          encode: function encode(phy) {
            var val = parseInt(phy).toString(16).padStart(8, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '12': {
          link: '12.001'
        },
        '13.001': {
          name: 'DPT_Value_4_Count',
          encode: function encode(phy) {
            var val = parseInt(phy);
            val = val < 0 ? val + 4294967296 : val;
            val = val.toString(16).padStart(8, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16);
            return val > 2147483647 ? val - 4294967296 : val;
          }
        },
        '13': {
          link: '13.001'
        },
        '14.001': {
          name: 'DPT_Value_Acceleration_Angular',
          encode: function encode() {//FIXME: unimplemented (jspack?)
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16);
            var sign = val & 0x80000000 ? -1 : 1;
            var exp = ((val & 0x7F800000) >> 23) - 127;
            var mant = val & 0x007FFFFF | 0x00800000;
            return sign * Math.pow(2, exp) * (mant / (1 << 23));
          }
        },
        '14': {
          link: '14.001',
          name: '4 byte float',
          lname: {
            'de': '4 Byte Gleitkommazahl'
          },
          unit: '-'
        },
        '16.001': {
          name: 'DPT_String_8859_1',
          lname: {
            'de': '14 Byte Text ISO-8859-1'
          },
          encode: function encode(phy) {
            var val = '';
            phy += ''; // force datatype String

            for (var i = 0; i < 14; i++) {
              var c = phy.charCodeAt(i);
              val += c ? (c < 16 ? '0' : '') + c.toString(16) : '00';
            }

            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = "";
            var chars;

            for (var i = 0; i < 28; i = i + 2) {
              chars = parseInt(hex.substr(i, 2), 16);

              if (chars > 0) {
                val += String.fromCharCode(chars);
              }
            }

            return val;
          }
        },
        '16.000': {
          link: '16.001',
          name: 'DPT_String_ASCII',
          lname: {
            'de': '14 Byte Text ASCII'
          },
          unit: '-'
        },
        '16': {
          link: '16.001',
          name: 'DPT_String_ASCII',
          lname: {
            'de': '14 Byte Text ASCII'
          },
          unit: '-'
        },
        '17.001': {
          link: '5.004',
          name: 'DPT_SceneNumber',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-'
        },
        '17': {
          link: '5.004',
          name: 'DPT_SceneNumber',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-'
        },
        '18.001': {
          name: 'DPT_SceneControl',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-',
          range: {
            min: 1.0,
            max: 192
          },
          encode: function encode(phy) {
            var val = parseInt(cv.Transform.clip(0, phy - 1, 191)).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) + 1;
          }
        },
        '18': {
          link: '18.001',
          name: 'DPT_SceneControl',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-'
        },
        '26.001': {
          name: 'DPT_SceneInfo',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-',
          range: {
            min: 1.0,
            max: 128
          },
          encode: function encode(phy) {
            var val = parseInt(cv.Transform.clip(0, phy - 1, 127)).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) + 1;
          }
        },
        '26': {
          link: '26.001',
          name: 'DPT_SceneInfo',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          unit: '-'
        },
        '20.102': {
          name: 'DPT_HVACMode',
          lname: {
            'de': 'KONNEX Betriebsart'
          },
          unit: '-',
          range: {
            'enum': ['auto', 'comfort', 'standby', 'economy', 'building_protection']
          },
          encode: function encode(phy) {
            var val;

            switch (phy) {
              case 1:
              case 'comfort':
                val = 1;
                break;

              case 2:
              case 'standby':
                val = 2;
                break;

              case 3:
              case 'economy':
                val = 3;
                break;

              case 4:
              case 'building_protection':
                val = 4;
                break;

              default:
                // actually "case 0:" / "auto"
                val = 0;
            }

            val = val.toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            switch (parseInt(hex, 16)) {
              case 1:
                return 'comfort';

              case 2:
                return 'standby';

              case 3:
                return 'economy';

              case 4:
                return 'building_protection';

              default:
                // actually "case 0:"
                return 'auto';
            }
          }
        },

        /* DPT24.001 is probably not fully correct as it can also hold
         multiple strings sep. by \x00 as array according to 3.7.2 DPT v1.07
         but there is no other reference, even not in ETS4
         so this gives basic support for now, there is also missing a max-length
         check in encode.
         In wiregate DPT24.001 has the same basic support with PL38
         */
        '24.001': {
          name: 'DPT_VarString_8859_1',
          lname: {
            'de': 'variable String ISO-8859-1'
          },
          encode: function encode(phy) {
            var val = '';

            for (var i = 0; i < phy.length; i++) {
              var c = phy.charCodeAt(i);
              val += c ? (c < 16 ? '0' : '') + c.toString(16) : '00';
            }
            /* terminating \x00 */


            val += '00';
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = "";
            var chars;

            for (var i = 0; i < hex.length; i = i + 2) {
              chars = parseInt(hex.substr(i, 2), 16);

              if (chars > 0) {
                val += String.fromCharCode(chars);
              }
            }

            return val;
          }
        },
        '225.001': {
          name: 'DPT_ScalingSpeed',
          encode: function encode(phy) {
            var period = phy.get('period') || 0,
                percent = phy.get('percent') || 0,
                val = [parseInt(period).toString(16).padStart(4, '0'), parseInt(percent * 255 / 100).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return new Map([['period', parseInt(hex.substr(0, 4), 16)], ['percent', parseInt(hex.substr(4, 2), 16) * 100 / 255.0]]);
          }
        },
        '225': {
          name: 'DPT_U24',
          unit: '-',
          range: {
            min: 0x0,
            max: 0xfff
          },
          encode: function encode(phy) {
            var val = parseInt(cv.Transform.clip(0, phy, 0xffffff)).toString(16).padStart(6, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '232.600': {
          name: 'DPT_Colour_RGB',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000',
                raw: '000000'
              };
            }

            var r = phy.get('r') || 0,
                g = phy.get('g') || 0,
                b = phy.get('b') || 0,
                val = [parseInt(r * 255 / 100).toString(16).padStart(2, '0'), parseInt(g * 255 / 100).toString(16).padStart(2, '0'), parseInt(b * 255 / 100).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return new Map([['r', parseInt(hex.substr(0, 2), 16) * 100 / 255.0], ['g', parseInt(hex.substr(2, 2), 16) * 100 / 255.0], ['b', parseInt(hex.substr(4, 2), 16) * 100 / 255.0]]);
          }
        },
        '232': {
          name: 'DPT_3U8',
          encode: function encode(phy) {
            var val = [parseInt(phy[0] * 255 / 100).toString(16).padStart(2, '0'), parseInt(phy[1] * 255 / 100).toString(16).padStart(2, '0'), parseInt(phy[2] * 255 / 100).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return [parseInt(hex.substr(0, 2), 16) * 100 / 255.0, parseInt(hex.substr(2, 2), 16) * 100 / 255.0, parseInt(hex.substr(4, 2), 16) * 100 / 255.0];
          }
        },
        '242.600': {
          name: 'DPT_Colour_xyY',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000000000',
                raw: '000000000000'
              };
            }

            var cValid = phy.has('x') && phy.has('y') && (phy.get('cValid') || false),
                bValid = phy.has('b') && (phy.get('bValid') || false),
                x = phy.get('x') || 0,
                y = phy.get('y') || 0,
                b = phy.get('b') || 0,
                val = [parseInt(x * 65535).toString(16).padStart(4, '0'), parseInt(y * 65535).toString(16).padStart(4, '0'), parseInt(b * 255 / 100).toString(16).padStart(2, '0'), (cValid * 2 + bValid * 1).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var valid = parseInt(hex[11], 16);
            return new Map([['x', parseInt(hex.substr(0, 4), 16) / 65535.0], ['y', parseInt(hex.substr(4, 4), 16) / 65535.0], ['b', parseInt(hex.substr(8, 2), 16) * 100 / 255.0], ['cValid', (valid & 2) > 0], ['bValid', (valid & 1) > 0]]);
          }
        },
        '251.600': {
          name: 'DPT_Colour_RGBW',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000000000',
                raw: '000000000000'
              };
            }

            var rValid = phy.has('r') && (phy.get('rValid') || false),
                gValid = phy.has('g') && (phy.get('gValid') || false),
                bValid = phy.has('b') && (phy.get('bValid') || false),
                wValid = phy.has('w') && (phy.get('wValid') || false),
                r = phy.get('r') || 0,
                g = phy.get('g') || 0,
                b = phy.get('b') || 0,
                w = phy.get('w') || 0,
                val = [parseInt(r * 255 / 100).toString(16).padStart(2, '0'), parseInt(g * 255 / 100).toString(16).padStart(2, '0'), parseInt(b * 255 / 100).toString(16).padStart(2, '0'), parseInt(w * 255 / 100).toString(16).padStart(2, '0'), '00', (rValid * 8 + gValid * 4 + bValid * 2 + wValid * 1).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var valid = parseInt(hex[11], 16);
            return new Map([['r', parseInt(hex.substr(0, 2), 16) * 100 / 255.0], ['g', parseInt(hex.substr(2, 2), 16) * 100 / 255.0], ['b', parseInt(hex.substr(4, 2), 16) * 100 / 255.0], ['w', parseInt(hex.substr(6, 2), 16) * 100 / 255.0], ['rValid', (valid & 8) > 0], ['gValid', (valid & 4) > 0], ['bValid', (valid & 2) > 0], ['wValid', (valid & 1) > 0]]);
          }
        },

        /* 9 Zeilen:
        },
        '.001' : {
        name  : '',
        encode: function( phy ){
        return phy;
        },
        decode: function( hex ){
        return hex;
        }
        }
        /*/
        /////////////////////////////////////////////////

        /* 3 Zeilen:
        }
        '': {
        link  : '.001'
        },
        */
        'temp dummy': {
          link: '1.001'
        }
      });
    }
  });
  cv.transforms.Knx.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Knx.js.map?dt=1619362517133