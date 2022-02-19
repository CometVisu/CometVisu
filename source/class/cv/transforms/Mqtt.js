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
          return phy.toString();
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
          return Math.round(phy.getTime()/1000).toString();
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
          date.setHours(parseInt(str.substr(0, 2)));
          date.setMinutes(parseInt(str.substr(3, 2)));
          date.setSeconds(parseInt(str.substr(6, 2)));
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
      }
    });
  }
});
