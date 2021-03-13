/* Mqtt.js
 * 
 * copyright (c) 2010-2021, Christian Mayer and the CometVisu contributers.
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
  type: "static",

  /**
   * This class defines the default transforms: encode: transform JavaScript to
   * bus value decode: transform bus to JavaScript value
   */
  defer: function() {
    cv.Transform.addTransform('MQTT', {
      'number': {
        name: "MQTT_Number",
        encode: function (phy) {
          return phy.toString();
        },
        decode: function (str) {
          return parseFloat(str);
        }
      },
      'string': {
        name: "MQTT_String",
        encode: function (phy) {
          return phy.toString();
        },
        decode: function (str) {
          return str.toString();
        }
      },
      'json': {
        name: "MQTT_JSON",
        encode: function (phy, parameter) {
          if( typeof parameter === 'string' ) {
            let
              ret_pre = '',
              ret_post = '';
            // split on "." but not on "\." to allow the dot to be escaped
            parameter.split(/(?<!\\)\./).forEach(
              (e)=>{
                ret_pre += '{"' + e.replace('\\.', '.') + '":';
                ret_post += '}';
              }
            );
            return ret_pre + (typeof phy === 'string' ? '"'+phy+'"' : phy) + ret_post;
          }
          return phy.toString();
        },
        decode: function (str, parameter) {
          let json = JSON.parse(str);
          if( typeof parameter === 'string' ) {
            // split on "." but not on "\." to allow the dot to be escaped
            parameter.split(/(?<!\\)\./).forEach(
              (e)=>{json = json[e.replace('\\.', '.')];}
            );
          }
          return json;
        }
      }
    });
  }
});