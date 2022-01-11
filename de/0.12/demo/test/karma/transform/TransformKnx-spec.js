/* TransformKnx-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Test the knx specific transforms
 * @param day
 * @param hour
 * @param minute
 * @param second
 * @author Christian Mayer
 * @since 2016
 */
function targetTime(day, hour, minute, second) {
  var date = new Date(); // assume today as in the original transform code
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(second);
  if (day > 0) {
    var dayShift = (day - date.getDay()) % 7;
    date.setDate(date.getDate() + dayShift);
  }
  return date;
}
/**
 * @param day
 * @param month 1 based, i.e. 1 === Jan, 2 == Feb
 * @param year
 */
function targetDate(day, month, year) {
  return new Date(year, month-1, day);
}

var testcases = [
  { transform: 'DPT:1', type: 'encode', source: 0, target: '80' },
  { transform: 'DPT:1', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1.001', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1.002', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1.003', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1.008', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1.009', type: 'encode', source: 1, target: '81' },
  { transform: 'DPT:1', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:1', type: 'decode', source: '01', target: 1 },
  { transform: 'DPT:1.001', type: 'decode', source: '01', target: 1 },
  { transform: 'DPT:1.002', type: 'decode', source: '01', target: 1 },
  { transform: 'DPT:1.003', type: 'decode', source: '01', target: 1 },
  { transform: 'DPT:1.008', type: 'decode', source: '01', target: 1 },
  { transform: 'DPT:1.009', type: 'decode', source: '01', target: 1 },

  // dummy tests for dummy implementation
  { transform: 'DPT:2', type: 'encode', source: 0, target: '80' },
  { transform: 'DPT:2', type: 'decode', source: '00', target: 0 },

  { transform: 'DPT:3.007', type: 'encode', source: -101, target: '80' },
  { transform: 'DPT:3.007', type: 'encode', source: -100, target: '81' },
  { transform: 'DPT:3.007', type: 'encode', source:   -1, target: '87' },
  { transform: 'DPT:3.007', type: 'encode', source: -0.1, target: '80' },
  { transform: 'DPT:3.007', type: 'encode', source:  0.1, target: '88', noInt: true },
  { transform: 'DPT:3.007', type: 'encode', source:    1, target: '8f' },
  { transform: 'DPT:3.007', type: 'encode', source:  100, target: '89' },
  { transform: 'DPT:3.007', type: 'encode', source:  101, target: '88' },
  { transform: 'DPT:3.007', type: 'decode', source: '00', target: -200 },
  { transform: 'DPT:3.007', type: 'decode', source: '01', target: -100 },
  { transform: 'DPT:3.007', type: 'decode', source: '07', target: -100/2**(7-1) },
  { transform: 'DPT:3.007', type: 'decode', source: '08', target:  200 },
  { transform: 'DPT:3.007', type: 'decode', source: '09', target:  100 },
  { transform: 'DPT:3.007', type: 'decode', source: '0f', target:  100/2**(7-1) },
  { transform: 'DPT:3.008', type: 'encode', source:  -50, target: '82' },
  { transform: 'DPT:3.008', type: 'encode', source:   50, target: '8a' },
  { transform: 'DPT:3.008', type: 'decode', source: '02', target:  -50 },
  { transform: 'DPT:3.008', type: 'decode', source: '0a', target:   50 },
  { transform: 'DPT:3', type: 'encode', source:  -50, target: '82' },
  { transform: 'DPT:3', type: 'encode', source:   50, target: '8a' },
  { transform: 'DPT:3', type: 'decode', source: '02', target:  -50 },
  { transform: 'DPT:3', type: 'decode', source: '0a', target:   50 },

  { transform: 'DPT:4', type: 'encode', source: 'a', target: '8061', noNumber: true },
  { transform: 'DPT:4.001', type: 'encode', source: 'a', target: '8061', noNumber: true },
  { transform: 'DPT:4', type: 'decode', source: '61', target: 'a' },
  { transform: 'DPT:4.001', type: 'decode', source: '61', target: 'a' },

  { transform: 'DPT:5.001', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:5.001', type: 'encode', source: 100, target: '80ff' },
  { transform: 'DPT:5.001', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:5.001', type: 'decode', source: 'ff', target: 100 },
  { transform: 'DPT:5.003', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:5.003', type: 'encode', source: 100, target: '8047' },
  { transform: 'DPT:5.003', type: 'encode', source: 360, target: '80ff' },
  { transform: 'DPT:5.003', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:5.003', type: 'decode', source: 'ff', target: 360 },
  { transform: 'DPT:5.004', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:5.004', type: 'encode', source: 100, target: '8064' },
  { transform: 'DPT:5.004', type: 'encode', source: 255, target: '80ff' },
  { transform: 'DPT:5.004', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:5.004', type: 'decode', source: 'ff', target: 255 },
  { transform: 'DPT:5', type: 'encode', source: 100, target: '8064' },
  { transform: 'DPT:5', type: 'decode', source: 'ff', target: 255 },
  { transform: 'DPT:5.010', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:5.010', type: 'encode', source: 100, target: '8064' },
  { transform: 'DPT:5.010', type: 'encode', source: 255, target: '80ff' },
  { transform: 'DPT:5.010', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:5.010', type: 'decode', source: 'ff', target: 255 },

  { transform: 'DPT:6.001', type: 'encode', source: -128, target: '8080' },
  { transform: 'DPT:6.001', type: 'encode', source: -1, target: '80ff' },
  { transform: 'DPT:6.001', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:6.001', type: 'encode', source: 100, target: '8064' },
  { transform: 'DPT:6.001', type: 'encode', source: 127, target: '807f' },
  { transform: 'DPT:6.001', type: 'decode', source: '80', target: -128 },
  { transform: 'DPT:6.001', type: 'decode', source: 'ff', target: -1 },
  { transform: 'DPT:6.001', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:6.001', type: 'decode', source: '64', target: 100 },
  { transform: 'DPT:6.001', type: 'decode', source: '7f', target: 127 },
  { transform: 'DPT:6', type: 'encode', source: 100, target: '8064' },
  { transform: 'DPT:6', type: 'decode', source: '64', target: 100 },

  { transform: 'DPT:7.001', type: 'encode', source: 0, target: '800000' },
  { transform: 'DPT:7.001', type: 'encode', source: 100, target: '800064' },
  { transform: 'DPT:7.001', type: 'encode', source: 65535, target: '80ffff' },
  { transform: 'DPT:7.001', type: 'decode', source: '0000', target: 0 },
  { transform: 'DPT:7.001', type: 'decode', source: '0064', target: 100 },
  { transform: 'DPT:7.001', type: 'decode', source: 'ffff', target: 65535 },
  { transform: 'DPT:7.600', type: 'encode', source: 3000, target: '800bb8' },
  { transform: 'DPT:7.600', type: 'decode', source: '0bb8', target: 3000 },
  { transform: 'DPT:7', type: 'encode', source: 100, target: '800064' },
  { transform: 'DPT:7', type: 'decode', source: '0064', target: 100 },

  { transform: 'DPT:8.001', type: 'encode', source: -32768, target: '808000' },
  { transform: 'DPT:8.001', type: 'encode', source: -1, target: '80ffff' },
  { transform: 'DPT:8.001', type: 'encode', source: 0, target: '800000' },
  { transform: 'DPT:8.001', type: 'encode', source: 100, target: '800064' },
  { transform: 'DPT:8.001', type: 'encode', source: 32767, target: '807fff' },
  { transform: 'DPT:8.001', type: 'decode', source: '8000', target: -32768 },
  { transform: 'DPT:8.001', type: 'decode', source: 'ffff', target: -1 },
  { transform: 'DPT:8.001', type: 'decode', source: '0000', target: 0 },
  { transform: 'DPT:8.001', type: 'decode', source: '0064', target: 100 },
  { transform: 'DPT:8.001', type: 'decode', source: '7fff', target: 32767 },
  { transform: 'DPT:8', type: 'encode', source: 100, target: '800064' },
  { transform: 'DPT:8', type: 'decode', source: '0064', target: 100 },

  { transform: 'DPT:9.001', type: 'encode', source: -272.96, target: '80a156', noInt: true },
  { transform: 'DPT:9.001', type: 'encode', source: -1, target: '80879c' },
  { transform: 'DPT:9.001', type: 'encode', source: 0, target: '800000' },
  { transform: 'DPT:9.001', type: 'encode', source: 0.01, target: '800001', noInt: true },
  { transform: 'DPT:9.001', type: 'encode', source: 1, target: '800064' },
  { transform: 'DPT:9.001', type: 'encode', source: 670433.28, target: '807ffe', noInt: true },
  { transform: 'DPT:9.001', type: 'decode', source: 'a156', target: -272.96 },
  { transform: 'DPT:9.001', type: 'decode', source: '879c', target: -1 },
  { transform: 'DPT:9.001', type: 'decode', source: '0000', target: 0 },
  { transform: 'DPT:9.001', type: 'decode', source: '0001', target: 0.01 },
  { transform: 'DPT:9.001', type: 'decode', source: '0064', target: 1 },
  { transform: 'DPT:9.001', type: 'decode', source: '7ffe', target: 670433.28 },
  { transform: 'DPT:9', type: 'encode', source: 1, target: '800064' },
  { transform: 'DPT:9', type: 'decode', source: '0064', target: 1 },
  { transform: 'DPT:9.020', type: 'encode', source: -670433.28, target: '80f802', noInt: true },

  { transform: 'DPT:10.001', type: 'encode', source: new Date(0, 0, 0, 0, 0, 0), target: '80000000', noNumber: true },
  { transform: 'DPT:10.001', type: 'encode', source: new Date(0, 0, 0, 1, 2, 3), target: '80010203', noNumber: true },
  { transform: 'DPT:10.001', type: 'encode', source: new Date(2, 0, 0, 0, 0, 0), target: '80400000', noNumber: true },
  { transform: 'DPT:10.001', type: 'decode', source: '000000', target: targetTime(0, 0, 0, 0), isDate: true },
  { transform: 'DPT:10.001', type: 'decode', source: '010203', target: targetTime(0, 1, 2, 3), isDate: true },
  { transform: 'DPT:10.001', type: 'decode', source: '400000', target: targetTime(2, 0, 0, 0), isDate: true },

  { transform: 'DPT:11.001', type: 'decode', source: '01015a', target: targetDate(1, 1, 1990), isDate: true },
  { transform: 'DPT:11.001', type: 'decode', source: '010163', target: targetDate(1, 1, 1999), isDate: true },
  { transform: 'DPT:11.001', type: 'decode', source: '010100', target: targetDate(1, 1, 2000), isDate: true },
  { transform: 'DPT:11.001', type: 'decode', source: '010159', target: targetDate(1, 1, 2089), isDate: true },

  { transform: 'DPT:12.001', type: 'encode', source: 0, target: '8000000000' },
  { transform: 'DPT:12.001', type: 'encode', source: 100, target: '8000000064' },
  { transform: 'DPT:12.001', type: 'encode', source: 65535, target: '800000ffff' },
  { transform: 'DPT:12.001', type: 'encode', source: 4294967295, target: '80ffffffff', noInt: true }, // for Int this equals -1
  { transform: 'DPT:12.001', type: 'decode', source: '00000000', target: 0 },
  { transform: 'DPT:12.001', type: 'decode', source: '00000064', target: 100 },
  { transform: 'DPT:12.001', type: 'decode', source: '0000ffff', target: 65535 },
  { transform: 'DPT:12.001', type: 'decode', source: 'ffffffff', target: 4294967295 },
  { transform: 'DPT:12', type: 'encode', source: 100, target: '8000000064' },
  { transform: 'DPT:12', type: 'decode', source: '00000064', target: 100 },

  { transform: 'DPT:13.001', type: 'encode', source: -2147483648, target: '8080000000' },
  { transform: 'DPT:13.001', type: 'encode', source: -32768, target: '80ffff8000' },
  { transform: 'DPT:13.001', type: 'encode', source: -1, target: '80ffffffff' },
  { transform: 'DPT:13.001', type: 'encode', source: 0, target: '8000000000' },
  { transform: 'DPT:13.001', type: 'encode', source: 100, target: '8000000064' },
  { transform: 'DPT:13.001', type: 'encode', source: 32767, target: '8000007fff' },
  { transform: 'DPT:13.001', type: 'encode', source: 65535, target: '800000ffff' },
  { transform: 'DPT:13.001', type: 'encode', source: 2147483647, target: '807fffffff' },
  { transform: 'DPT:13.001', type: 'decode', source: '80000000', target: -2147483648 },
  { transform: 'DPT:13.001', type: 'decode', source: 'ffff8000', target: -32768 },
  { transform: 'DPT:13.001', type: 'decode', source: 'ffffffff', target: -1 },
  { transform: 'DPT:13.001', type: 'decode', source: '00000000', target: 0 },
  { transform: 'DPT:13.001', type: 'decode', source: '00000064', target: 100 },
  { transform: 'DPT:13.001', type: 'decode', source: '00007fff', target: 32767 },
  { transform: 'DPT:13.001', type: 'decode', source: '7fffffff', target: 2147483647 },
  { transform: 'DPT:13', type: 'encode', source: 100, target: '8000000064' },
  { transform: 'DPT:13', type: 'decode', source: '00000064', target: 100 },

  { transform: 'DPT:14.001', type: 'decode', source: 'bf800000', target: -1 },
  { transform: 'DPT:14.001', type: 'decode', source: '00000000', target: Math.pow(2, -127) },
  { transform: 'DPT:14.001', type: 'decode', source: '3f800000', target: 1 },
  { transform: 'DPT:14.001', type: 'decode', source: '501502f9', target: 1e10 },
  { transform: 'DPT:14', type: 'decode', source: '3f800000', target: 1 },

  { transform: 'DPT:16.001', type: 'encode', source: '', target: '800000000000000000000000000000', noNumber: true },
  { transform: 'DPT:16.001', type: 'encode', source: 'abc', target: '806162630000000000000000000000', noNumber: true },
  { transform: 'DPT:16.001', type: 'encode', source: 'abcdefghijklmn', target: '806162636465666768696a6b6c6d6e', noNumber: true },
  { transform: 'DPT:16.001', type: 'decode', source: '0000000000000000000000000000', target: '' },
  { transform: 'DPT:16.001', type: 'decode', source: '6162630000000000000000000000', target: 'abc' },
  { transform: 'DPT:16.001', type: 'decode', source: '6162636465666768696a6b6c6d6e', target: 'abcdefghijklmn' },
  { transform: 'DPT:16', type: 'encode', source: 'abcdefghijklmn', target: '806162636465666768696a6b6c6d6e', noNumber: true },
  { transform: 'DPT:16.000', type: 'encode', source: 'abcdefghijklmn', target: '806162636465666768696a6b6c6d6e', noNumber: true },
  { transform: 'DPT:16', type: 'decode', source: '6162636465666768696a6b6c6d6e', target: 'abcdefghijklmn' },
  { transform: 'DPT:16.000', type: 'decode', source: '6162636465666768696a6b6c6d6e', target: 'abcdefghijklmn' },

  { transform: 'DPT:17.001', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:17.001', type: 'encode', source: 10, target: '800a' },
  { transform: 'DPT:17.001', type: 'encode', source: 63, target: '803f' },
  { transform: 'DPT:17.001', type: 'decode', source: '00', target: 0 },
  { transform: 'DPT:17.001', type: 'decode', source: '3f', target: 63 },
  { transform: 'DPT:17', type: 'encode', source: 10, target: '800a' },

  { transform: 'DPT:18.001', type: 'encode', source: 1, target: '8000' },
  { transform: 'DPT:18.001', type: 'encode', source: 11, target: '800a' },
  { transform: 'DPT:18.001', type: 'encode', source: 64, target: '803f' },
  { transform: 'DPT:18.001', type: 'encode', source: 129, target: '8080' },
  { transform: 'DPT:18.001', type: 'encode', source: 139, target: '808a' },
  { transform: 'DPT:18.001', type: 'encode', source: 192, target: '80bf' },
  { transform: 'DPT:18.001', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:18.001', type: 'encode', source: 255, target: '80bf' },
  { transform: 'DPT:18.001', type: 'decode', source: '00', target: 1 },
  { transform: 'DPT:18.001', type: 'decode', source: '3f', target: 64 },
  { transform: 'DPT:18.001', type: 'decode', source: '80', target: 128+1 },
  { transform: 'DPT:18.001', type: 'decode', source: 'bf', target: 128+64 },
  { transform: 'DPT:18', type: 'encode', source: 11, target: '800a' },

  { transform: 'DPT:20.102', type: 'encode', source: 'auto', target: '8000', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 'comfort', target: '8001', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 'standby', target: '8002', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 'economy', target: '8003', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 'building_protection', target: '8004', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 1, target: '8001', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 2, target: '8002', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 3, target: '8003', noNumber: true },
  { transform: 'DPT:20.102', type: 'encode', source: 4, target: '8004', noNumber: true },
  { transform: 'DPT:20.102', type: 'decode', source: '00', target: 'auto' },
  { transform: 'DPT:20.102', type: 'decode', source: '01', target: 'comfort' },
  { transform: 'DPT:20.102', type: 'decode', source: '02', target: 'standby' },
  { transform: 'DPT:20.102', type: 'decode', source: '03', target: 'economy' },
  { transform: 'DPT:20.102', type: 'decode', source: '04', target: 'building_protection' },

  { transform: 'DPT:24.001', type: 'encode', source: 'Test string', target: '805465737420737472696e6700', noNumber: true },
  { transform: 'DPT:24.001', type: 'decode', source: '5465737420737472696e67', target: 'Test string' },

  { transform: 'DPT:26.001', type: 'encode', source: 1, target: '8000' },
  { transform: 'DPT:26.001', type: 'encode', source: 11, target: '800a' },
  { transform: 'DPT:26.001', type: 'encode', source: 64, target: '803f' },
  { transform: 'DPT:26.001', type: 'encode', source: 65, target: '8040' },
  { transform: 'DPT:26.001', type: 'encode', source: 75, target: '804a' },
  { transform: 'DPT:26.001', type: 'encode', source: 128, target: '807f' },
  { transform: 'DPT:26.001', type: 'encode', source: 0, target: '8000' },
  { transform: 'DPT:26.001', type: 'encode', source: 255, target: '807f' },
  { transform: 'DPT:26.001', type: 'decode', source: '00', target: 1 },
  { transform: 'DPT:26.001', type: 'decode', source: '3f', target: 64 },
  { transform: 'DPT:26.001', type: 'decode', source: '40', target: 64+1 },
  { transform: 'DPT:26.001', type: 'decode', source: '7f', target: 64+64 },
  { transform: 'DPT:26', type: 'encode', source: 11, target: '800a' },

  { transform: 'DPT:225', type: 'encode', source: 0, target: '80000000' },
  { transform: 'DPT:225', type: 'encode', source: 0xffffff, target: '80ffffff' },
  { transform: 'DPT:225', type: 'decode', source: '000000', target: 0 },
  { transform: 'DPT:225', type: 'decode', source: 'ffffff', target: 0xffffff },
  { transform: 'DPT:225.001', type: 'encode', source: new Map(
      [['period', 0], ['percent', 0]]
    ), target: '80000000', noNumber: true },
  { transform: 'DPT:225.001', type: 'encode', source: new Map(
      [['period', 65535], ['percent', 100]]
    ), target: '80ffffff', noNumber: true },
  { transform: 'DPT:225.001', type: 'decode', source: '000000', target: new Map(
      [['period', 0], ['percent', 0]]
    ), noNumber: true },
  { transform: 'DPT:225.001', type: 'decode', source: 'ffffff', target: new Map(
      [['period', 65535], ['percent', 100]]
    ), noNumber: true },

  { transform: 'DPT:232', type: 'encode', source: [ 0, 0, 0], target: '80000000', noNumber: true },
  { transform: 'DPT:232', type: 'encode', source: [100, 100, 100], target: '80ffffff', noNumber: true },
  { transform: 'DPT:232', type: 'decode', source: '000000', target: [ 0, 0, 0], noNumber: true },
  { transform: 'DPT:232', type: 'decode', source: 'ffffff', target: [100, 100, 100], noNumber: true },
  { transform: 'DPT:232.600', type: 'encode', source: new Map(
      [['r', 0], ['g', 0], ['b', 0]]
    ), target: '80000000', noNumber: true },
  { transform: 'DPT:232.600', type: 'encode', source: new Map(
      [['r', 20], ['g', 40], ['b', 60]]
    ), target: '80336699', noNumber: true },
  { transform: 'DPT:232.600', type: 'encode', source: new Map(
      [['r', 100], ['g', 100], ['b', 100]]
    ), target: '80ffffff', noNumber: true },
  { transform: 'DPT:232.600', type: 'decode', source: '000000', target: new Map(
      [['r', 0], ['g', 0], ['b', 0]]
    ), noNumber: true },
  { transform: 'DPT:232.600', type: 'decode', source: '336699', target: new Map(
      [['r', 20], ['g', 40], ['b', 60]]
    ), noNumber: true },
  { transform: 'DPT:232.600', type: 'decode', source: 'ffffff', target: new Map(
      [['r', 100], ['g', 100], ['b', 100]]
    ), noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'encode', source: new Map(
      [['h', 0], ['s', 0], ['v', 0]]
    ), target: '80000000', noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'encode', source: new Map(
      [['h', 72], ['s', 40], ['v', 60]]
    ), target: '80336699', noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'encode', source: new Map(
      [['h', 360], ['s', 100], ['v', 100]]
    ), target: '80ffffff', noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'decode', source: '000000', target: new Map(
      [['h', 0], ['s', 0], ['v', 0]]
    ), noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'decode', source: '336699', target: new Map(
      [['h', 72], ['s', 40], ['v', 60]]
    ), noNumber: true },
  { transform: 'DPT:232.600HSV', type: 'decode', source: 'ffffff', target: new Map(
      [['h', 360], ['s', 100], ['v', 100]]
    ), noNumber: true },

  { transform: 'DPT:242.600', type: 'encode', source: 'foo', target: '80000000000000', noNumber: true }, // test misuse robustness
  { transform: 'DPT:242.600', type: 'encode', source: 0, target: '80000000000001' }, // test misuse robustness
  { transform: 'DPT:242.600', type: 'encode', source: new Map(
      [['x', 0], ['y', 0], ['Y', 0], ['cValid', false], ['YValid', false]]
    ), target: '80000000000000', noNumber: true },
  { transform: 'DPT:242.600', type: 'encode', source: new Map(
      [['x', 0.5], ['y', 0.25], ['Y', 12.5], ['cValid', true ], ['YValid', false]]
    ), target: '80800040002002', noNumber: true },
  { transform: 'DPT:242.600', type: 'encode', source: new Map(
      [['x', 1], ['y', 1], ['Y', 100], ['cValid', true ], ['YValid', true ]]
    ), target: '80ffffffffff03', noNumber: true },
  { transform: 'DPT:242.600', type: 'decode', source: '000000000000', target: new Map(
      [['x', 0], ['y', 0], ['Y', 0], ['cValid', false], ['YValid', false]]
    ), noNumber: true },
  { transform: 'DPT:242.600', type: 'decode', source: '7fff3fff1f02', target: new Map(
      [['x', 0x7fff/0xffff], ['y', 0x3fff/0xffff], ['Y', 100*0x1f/0xff], ['cValid', true ], ['YValid', false]]
    ), noNumber: true },
  { transform: 'DPT:242.600', type: 'decode', source: 'ffffffffff03', target: new Map(
      [['x', 1], ['y', 1], ['Y', 100], ['cValid', true ], ['YValid', true ]]
    ), noNumber: true },

  { transform: 'DPT:251.600', type: 'encode', source: 0, target: '80000000000000' }, // test misuse robustness
  { transform: 'DPT:251.600', type: 'encode', source: new Map(
    [['r', 0], ['g', 0], ['b', 0], ['w', 0], ['rValid', false], ['gValid', false], ['bValid', false], ['wValid', false]]
    ), target: '80000000000000', noNumber: true },
  { transform: 'DPT:251.600', type: 'encode', source: new Map(
    [['r', 20], ['g', 40], ['b', 60], ['w', 80], ['rValid', true ], ['gValid', false], ['bValid', true ], ['wValid', false]]
    ), target: '80336699cc000a', noNumber: true },
  { transform: 'DPT:251.600', type: 'encode', source: new Map(
    [['r', 100], ['g', 100], ['b', 100], ['w', 100], ['rValid', true ], ['gValid', true ], ['bValid', true ], ['wValid', true ]]
    ), target: '80ffffffff000f', noNumber: true },
  { transform: 'DPT:251.600', type: 'decode', source: '000000000000', target: new Map(
      [['r', 0], ['g', 0], ['b', 0], ['w', 0], ['rValid', false], ['gValid', false], ['bValid', false], ['wValid', false]]
    ), noNumber: true },
  { transform: 'DPT:251.600', type: 'decode', source: '336699cc000a', target: new Map(
      [['r', 20], ['g', 40], ['b', 60], ['w', 80], ['rValid', true ], ['gValid', false], ['bValid', true ], ['wValid', false]]
    ), noNumber: true },
  { transform: 'DPT:251.600', type: 'decode', source: 'ffffffff000f', target: new Map(
      [['r', 100], ['g', 100], ['b', 100], ['w', 100], ['rValid', true ], ['gValid', true ], ['bValid', true ], ['wValid', true ]]
    ), noNumber: true }
];

describe('checking knx transforms', function() {
  // run testcases
  testcases.forEach(function(testcase, index) {
    const source = testcase.source instanceof Map ? JSON.stringify(Object.fromEntries([...testcase.source])) : testcase.source;
    it('should transform ' + testcase.transform + ' ' + testcase.type + ' "' + source + '" (test #' + index + ')', function() {
      switch (testcase.type) {
        case 'encode':
          // test direct
          expect(cv.Transform.encode(testcase.transform, testcase.source)).toEqual(testcase.target);
          if (!testcase.noNumber) {
            // test integer
            if (!testcase.noInt) {
              expect(cv.Transform.encode(testcase.transform, testcase.source|0)).toEqual(testcase.target);
            }
            // test float
            expect(cv.Transform.encode(testcase.transform, +testcase.source)).toEqual(testcase.target);
            // test string
            expect(cv.Transform.encode(testcase.transform, testcase.source+'')).toEqual(testcase.target);
          }
          break;

        case 'decode':
          if (testcase.isDate) {
            expect(cv.Transform.decode(testcase.transform, testcase.source)+'').toEqual(testcase.target+'');
          } else {
            expect(cv.Transform.decode(testcase.transform, testcase.source)).toEqual(testcase.target);
          }
          break;
      }
    });
  });
});
