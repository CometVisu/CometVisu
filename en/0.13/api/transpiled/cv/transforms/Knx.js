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
   * @author Christian Mayer
   * @since 2010
   */
  qx.Class.define('cv.transforms.Knx', {
    type: 'static',
    defer: function defer() {
      cv.Transform.addTransform('DPT', {
        /**
         * This class defines the default transforms:
         *   encode: transform JavaScript to bus value
         *   decode: transform bus to JavaScript value
         */
        '1': {
          name: '1 bit',
          lname: {
            'de': '1 Bit',
            'en': '1 bit'
          },
          range: {
            min: 0,
            max: 1
          },
          unit: '-',
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
        '1.001': {
          link: '1',
          name: 'DPT_Switch',
          lname: {
            'de': 'Aus-An-Schalter',
            'en': 'off on switch'
          }
        },
        '1.002': {
          link: '1',
          name: 'DPT_Bool',
          lname: {
            'de': 'Boolscher-Wert',
            'en': 'boolean value'
          }
        },
        '1.003': {
          link: '1',
          name: 'DPT_Enable',
          lname: {
            'de': 'Disable / Enable',
            'en': 'disable / enable'
          }
        },
        '1.008': {
          link: '1',
          name: 'DPT_UpDown',
          lname: {
            'de': 'Hoch-Runter-Schalter',
            'en': 'up down switch'
          }
        },
        '1.009': {
          link: '1',
          name: 'DPT_OpenClose',
          lname: {
            'de': 'Auf-Zu-Schalter',
            'en': 'open close switch'
          }
        },
        '2': {
          link: '1',
          name: '2 bit',
          lname: {
            'de': '2 Bit',
            'en': '2 bit'
          },
          range: {
            min: 0,
            max: 3
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 3).toString(16);
            return {
              bus: '8' + val,
              raw: '0' + val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '3': {
          name: '4 bit',
          lname: {
            'de': '4 Bit',
            'en': '4 bit'
          },
          range: {
            min: -100,
            max: 100
          },
          unit: '-',
          encode: function encode(phy) {
            phy = +phy; // enforce number

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

            var up = phy > 0;
            var stepCode = 7 - Math.floor(Math.log2(Math.abs(phy)));
            var val = (stepCode | up * 8).toString(16);
            return {
              bus: '8' + val,
              raw: '0' + val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var val = parseInt(hex, 16);
            var up = (val & 8) > 0;
            return (up * 2 - 1) * 100 / Math.pow(2, (val & 7) - 1);
          }
        },
        '3.007': {
          link: '3',
          name: 'DPT_Control_Dimming',
          lname: {
            'de': 'Dimmen',
            'en': 'dimming'
          }
        },
        '3.008': {
          link: '3',
          name: 'DPT_Control_Blinds',
          lname: {
            'de': 'Beschattungssteuerung',
            'en': 'blind control'
          }
        },
        '4': {
          name: 'char',
          lname: {
            'de': 'Zeichen',
            'en': 'char'
          },
          unit: '-',
          encode: function encode(phy) {
            var val = ('' + phy).charCodeAt(0).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return String.fromCharCode(parseInt(hex, 16));
          }
        },
        '4.001': {
          name: 'DPT_Char_ASCII',
          link: '4'
        },
        '5': {
          name: '8 bit unsigned',
          lname: {
            'de': '8 Bit vorzeichenloser Integer',
            'en': '8 bit unsigned integer'
          },
          range: {
            min: 0,
            max: 255
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 255).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '5.001': {
          name: 'DPT_Scaling',
          lname: {
            'de': 'Prozentwert',
            'en': 'percentage'
          },
          range: {
            min: 0.0,
            max: 100.0
          },
          unit: '%',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 100, 2.55).toString(16).padStart(2, '0');
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
          lname: {
            'de': 'Winkel',
            'en': 'angle'
          },
          range: {
            min: 0.0,
            max: 360.0
          },
          unit: '°',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 360, 0.7083333333333334).toString(16).padStart(2, '0');
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
          link: '5',
          name: 'DPT_Percent_U8',
          lname: {
            'de': 'Prozentwert',
            'en': 'percentage'
          },
          unit: '%'
        },
        '5.010': {
          link: '5',
          name: 'DPT_Value_1_Ucount',
          lname: {
            'de': 'Zähler',
            'en': 'counter'
          },
          unit: '-'
        },
        '6': {
          name: '8 bit signed',
          lname: {
            'de': '8 Bit vorzeichenbehafteter Integer',
            'en': '8 bit signed integer'
          },
          range: {
            min: -128,
            max: 127
          },
          unit: '-',
          encode: function encode(phy) {
            phy = cv.Transform.clipInt(-128, phy, 127);
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
        '6.001': {
          link: '6',
          name: 'DPT_Percent_V8',
          lname: {
            'de': 'Prozentwert mit Vorzeichen',
            'en': 'percentage with sign'
          },
          unit: '%'
        },
        '6.010': {
          link: '6',
          name: 'DPT_Value_1_Count',
          lname: {
            'de': 'Zähler mit Vorzeichen',
            'en': 'counter with sign'
          }
        },
        '7': {
          name: '2 byte unsigned',
          lname: {
            'de': '2 Byte vorzeichenloser Integer',
            'en': '2 byte unsigned integer'
          },
          range: {
            min: 0,
            max: 0xffff
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 0xffff).toString(16).padStart(4, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '7.001': {
          link: '7',
          name: 'DPT_Value_2_Ucount'
        },
        '7.600': {
          link: '7',
          name: 'DPT_Absolute_Colour_Temperature',
          unit: 'K'
        },
        '8': {
          name: '2 byte signed',
          lname: {
            'de': '2 Byte vorzeichenbehafteter Integer',
            'en': '2 byte signed integer'
          },
          range: {
            min: -0x8000,
            max: 0x7fff
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(-0x8000, phy, 0x7fff);
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
        '8.001': {
          link: '8',
          name: 'DPT_Value_2_Count'
        },
        '9': {
          name: '2 byte float',
          lname: {
            'de': '2 Byte Gleitkommazahl',
            'en': '2 byte float value'
          },
          range: {
            min: -671088.64,
            max: 670433.28
          },
          unit: '-',
          encode: function encode(phy) {
            if (undefined === phy || isNaN(phy)) {
              return '7fff';
            }

            var sign = +phy < 0 ? 0x8000 : 0;
            var mant = Math.round(+phy * 100.0);
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
            if (parseInt(hex, 16) === 0x7fff) {
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
        '9.001': {
          link: '9',
          name: 'DPT_Value_Temp',
          lname: {
            'de': 'Temperatur',
            'en': 'temperature'
          },
          unit: '°C'
        },
        '9.004': {
          link: '9',
          name: 'DPT_Value_Lux',
          lname: {
            'de': 'Beleuchtungsstärke',
            'en': 'illuminance'
          },
          unit: 'Lux'
        },
        '9.007': {
          link: '9',
          name: 'DPT_Value_Humidity',
          lname: {
            'de': 'Luftfeuchtigkeit',
            'en': 'humidity'
          },
          unit: '%'
        },
        '9.008': {
          link: '9',
          name: 'DPT_Value_AirQuality',
          lname: {
            'de': 'Luftqualität',
            'en': 'air quality'
          },
          unit: 'ppm'
        },
        '9.020': {
          link: '9',
          name: 'DPT_Value_Volt',
          lname: {
            'de': 'Spannung',
            'en': 'voltage'
          },
          unit: 'mV'
        },
        '9.021': {
          link: '9',
          name: 'DPT_Value_Curr',
          lname: {
            'de': 'Strom',
            'en': 'current'
          },
          unit: 'mA'
        },
        '10.001': {
          name: 'DPT_TimeOfDay',
          lname: {
            'de': 'Zeit',
            'en': 'time'
          },
          unit: '-',
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
          lname: {
            'de': 'Datum',
            'en': 'date'
          },
          unit: '-',
          encode: function encode() {// FIXME
          },
          decode: function decode(hex) {
            var year = parseInt(hex.substr(4, 2), 16) & 0x7F;
            return new Date(year < 90 ? year + 2000 : year + 1900, //1990 - 2089
            (parseInt(hex.substr(2, 2), 16) & 0x0F) - 1, parseInt(hex.substr(0, 2), 16) & 0x1F);
          }
        },
        '12': {
          name: '4 byte unsigned',
          lname: {
            'de': '4 Byte vorzeichenloser Integer',
            'en': '4 byte unsigned integer'
          },
          range: {
            min: 0,
            max: 0xffffffff
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 0xffffffff).toString(16).padStart(8, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '12.001': {
          link: '12',
          name: 'DPT_Value_4_Ucount'
        },
        '13': {
          name: '4 byte signed',
          lname: {
            'de': '4 Byte vorzeichenbehafteter Integer',
            'en': '4 byte signed integer'
          },
          range: {
            min: -0x80000000,
            max: 0x7fffffff
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(-0x80000000, phy, 0x7fffffff);
            val = val < 0 ? val + 4294967296 : val;
            val = Math.round(val).toString(16).padStart(8, '0');
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
        '13.001': {
          link: '13',
          name: 'DPT_Value_4_Count'
        },
        '14': {
          name: '4 byte float',
          lname: {
            'de': '4 Byte Gleitkommazahl IEEE 754 (nur Dekodieren)',
            'en': '4 byte float IEEE 754 (only decode)'
          },
          unit: '-',
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
        '14.001': {
          link: '14',
          name: 'DPT_Value_Acceleration_Angular'
        },
        '16': {
          name: 'DPT_String_ASCII',
          lname: {
            'de': '14 Byte Text ASCII',
            'en': '14 byte text ASCII'
          },
          unit: '-',
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
            var val = '';
            var chars;

            for (var i = 0; i < 28; i += 2) {
              chars = parseInt(hex.substr(i, 2), 16);

              if (chars > 0) {
                val += String.fromCharCode(chars);
              }
            }

            return val;
          }
        },
        '16.000': {
          link: '16'
        },
        '16.001': {
          link: '16',
          name: 'DPT_String_8859_1',
          lname: {
            'de': '14 Byte Text ISO-8859-1',
            'en': '14 byte text ISO-8859-1'
          }
        },
        '17': {
          link: '18',
          name: 'DPT_SceneNumber',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          range: {
            min: 1,
            max: 64
          },
          unit: '-'
        },
        '17.001': {
          link: '18'
        },
        '18': {
          name: 'DPT_SceneControl',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          range: {
            min: 1,
            max: 192
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy - 1, 191).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) + 1;
          }
        },
        '18.001': {
          link: '18'
        },
        '20.102': {
          name: 'DPT_HVACMode',
          lname: {
            'de': 'KONNEX Betriebsart',
            'en': 'HVAC mode'
          },
          range: {
            'enum': ['auto', 'comfort', 'standby', 'economy', 'building_protection']
          },
          unit: '-',
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
            'de': 'Variabler String ISO-8859-1',
            'en': 'variable String ISO-8859-1'
          },
          unit: '-',
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
            var val = '';
            var chars;

            for (var i = 0; i < hex.length; i += 2) {
              chars = parseInt(hex.substr(i, 2), 16);

              if (chars > 0) {
                val += String.fromCharCode(chars);
              }
            }

            return val;
          }
        },
        '26': {
          name: 'DPT_SceneInfo',
          lname: {
            'en': 'Scene Number',
            'de': 'Szenen Nummer'
          },
          range: {
            min: 1.0,
            max: 128
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy - 1, 127).toString(16).padStart(2, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16) + 1;
          }
        },
        '26.001': {
          link: '26'
        },
        '225': {
          name: '3 byte unsigned',
          lname: {
            'de': '3 Byte vorzeichenloser Integer',
            'en': '3 byte unsigned integer'
          },
          range: {
            min: 0x0,
            max: 0xffffff
          },
          unit: '-',
          encode: function encode(phy) {
            var val = cv.Transform.clipInt(0, phy, 0xffffff).toString(16).padStart(6, '0');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return parseInt(hex, 16);
          }
        },
        '225.001': {
          name: 'DPT_ScalingSpeed',
          lname: {
            'de': 'Skalierungsgeschwindigkeit',
            'en': 'scaling speed'
          },
          unit: '-',
          encode: function encode(phy) {
            var period = phy.get('period') || 0;
            var percent = phy.get('percent') || 0;
            var val = [cv.Transform.clipInt(0, period, 0xffff).toString(16).padStart(4, '0'), cv.Transform.clipInt(0, percent, 100, 2.55).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return new Map([['period', parseInt(hex.substr(0, 4), 16)], ['percent', parseInt(hex.substr(4, 2), 16) * 100 / 255.0]]);
          }
        },
        '232': {
          name: '3xDPT_Scaling',
          lname: {
            'de': 'Drei Prozentwerte',
            'en': 'three percentages'
          },
          range: {
            min: 0.0,
            max: 100.0
          },
          unit: '%',
          encode: function encode(phy) {
            var val = [cv.Transform.clipInt(0, phy[0], 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, phy[1], 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, phy[2], 100, 2.55).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return [parseInt(hex.substr(0, 2), 16) * 100 / 255.0, parseInt(hex.substr(2, 2), 16) * 100 / 255.0, parseInt(hex.substr(4, 2), 16) * 100 / 255.0];
          }
        },
        '232.600': {
          name: 'DPT_Colour_RGB',
          lname: {
            'de': 'RGB-Farbe',
            'en': 'rgb color'
          },
          range: {
            min: 0.0,
            max: 100.0
          },
          unit: '%',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000',
                raw: '000000'
              };
            }

            var r = phy.get('r') || 0;
            var g = phy.get('g') || 0;
            var b = phy.get('b') || 0;
            var val = [cv.Transform.clipInt(0, r, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, g, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, b, 100, 2.55).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return new Map([['r', parseInt(hex.substr(0, 2), 16) * 100 / 255.0], ['g', parseInt(hex.substr(2, 2), 16) * 100 / 255.0], ['b', parseInt(hex.substr(4, 2), 16) * 100 / 255.0]]);
          }
        },
        '232.600HSV': {
          name: 'DPT_Colour_HSV_inofficial',
          lname: {
            'de': 'HSV-Farbe (inoffiziell)',
            'en': 'hsv color (inofficial)'
          },
          unit: '-',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000',
                raw: '000000'
              };
            }

            var h = phy.get('h') || 0;
            var s = phy.get('s') || 0;
            var v = phy.get('v') || 0;
            var val = [cv.Transform.clipInt(0, h, 360, 0.7083333333333334).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, s, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, v, 100, 2.55).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            return new Map([['h', parseInt(hex.substr(0, 2), 16) * 360 / 255.0], ['s', parseInt(hex.substr(2, 2), 16) * 100 / 255.0], ['v', parseInt(hex.substr(4, 2), 16) * 100 / 255.0]]);
          }
        },
        '242.600': {
          name: 'DPT_Colour_xyY',
          lname: {
            'de': 'xyY-Farbe',
            'en': 'xyY color'
          },
          unit: '-',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              if (!isFinite(phy)) {
                return {
                  bus: '80000000000000',
                  raw: '000000000000'
                };
              }

              phy = new Map([['Y', +phy]]);
            }

            var cValid = phy.has('x') && phy.has('y') && (phy.has('cValid') ? phy.get('cValid') : Number.isFinite(phy.get('x')) && Number.isFinite(phy.get('y')));
            var YValid = phy.has('Y') && (phy.has('YValid') ? phy.get('YValid') : Number.isFinite(phy.get('Y')));
            var x = phy.get('x') || 0;
            var y = phy.get('y') || 0;
            var Y = phy.get('Y') || 0;
            var val = [cv.Transform.clipInt(0, x, 1, 65535).toString(16).padStart(4, '0'), cv.Transform.clipInt(0, y, 1, 65535).toString(16).padStart(4, '0'), cv.Transform.clipInt(0, Y, 100, 2.55).toString(16).padStart(2, '0'), (cValid * 2 + YValid * 1).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var valid = parseInt(hex[11], 16);
            return new Map([['x', parseInt(hex.substr(0, 4), 16) / 65535.0], ['y', parseInt(hex.substr(4, 4), 16) / 65535.0], ['Y', parseInt(hex.substr(8, 2), 16) * 100 / 255.0], ['cValid', (valid & 2) > 0], ['YValid', (valid & 1) > 0]]);
          }
        },
        '251.600': {
          name: 'DPT_Colour_RGBW',
          lname: {
            'de': 'RGBW-Farbe',
            'en': 'rgbw color'
          },
          range: {
            min: 0.0,
            max: 100.0
          },
          unit: '%',
          encode: function encode(phy) {
            if (!(phy instanceof Map)) {
              return {
                bus: '80000000000000',
                raw: '000000000000'
              };
            }

            var rValid = phy.has('r') && Number.isFinite(phy.get('r')) && (phy.has('rValid') ? phy.get('rValid') : true);
            var gValid = phy.has('g') && Number.isFinite(phy.get('g')) && (phy.has('gValid') ? phy.get('gValid') : true);
            var bValid = phy.has('b') && Number.isFinite(phy.get('b')) && (phy.has('bValid') ? phy.get('bValid') : true);
            var wValid = phy.has('w') && Number.isFinite(phy.get('w')) && (phy.has('wValid') ? phy.get('wValid') : true);
            var r = phy.get('r') || 0;
            var g = phy.get('g') || 0;
            var b = phy.get('b') || 0;
            var w = phy.get('w') || 0;
            var val = [cv.Transform.clipInt(0, r, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, g, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, b, 100, 2.55).toString(16).padStart(2, '0'), cv.Transform.clipInt(0, w, 100, 2.55).toString(16).padStart(2, '0'), '00', (rValid * 8 + gValid * 4 + bValid * 2 + wValid * 1).toString(16).padStart(2, '0')].join('');
            return {
              bus: '80' + val,
              raw: val.toUpperCase()
            };
          },
          decode: function decode(hex) {
            var valid = parseInt(hex[11], 16);
            return new Map([['r', parseInt(hex.substr(0, 2), 16) * 100 / 255.0], ['g', parseInt(hex.substr(2, 2), 16) * 100 / 255.0], ['b', parseInt(hex.substr(4, 2), 16) * 100 / 255.0], ['w', parseInt(hex.substr(6, 2), 16) * 100 / 255.0], ['rValid', (valid & 8) > 0], ['gValid', (valid & 4) > 0], ['bValid', (valid & 2) > 0], ['wValid', (valid & 1) > 0]]);
          }
        }
      });
    }
  });
  cv.transforms.Knx.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Knx.js.map?dt=1664441184668