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
    defer: function defer() {
      cv.Transform.addTransform('MQTT', {
        'number': {
          name: "MQTT_Number",
          encode: function encode(phy) {
            return phy.toString();
          },
          decode: function decode(str) {
            return parseFloat(str);
          }
        },
        'string': {
          name: "MQTT_String",
          encode: function encode(phy) {
            return phy.toString();
          },
          decode: function decode(str) {
            return str.toString();
          }
        },
        'json': {
          name: "MQTT_JSON",
          encode: function encode(phy, parameter) {
            if (typeof parameter === 'string') {
              var _parameter$match;

              var ret_pre = '',
                  ret_post = ''; // split on "." but not on "\." to allow the dot to be escaped

              (_parameter$match = parameter.match(/(\\\.|[^.])+/g)) === null || _parameter$match === void 0 ? void 0 : _parameter$match.forEach(function (e) {
                ret_pre += '{"' + e.replace('\\.', '.') + '":';
                ret_post += '}';
              });
              return ret_pre + (typeof phy === 'string' ? '"' + phy + '"' : phy) + ret_post;
            }

            return phy.toString();
          },
          decode: function decode(str, parameter) {
            var json = JSON.parse(str);

            if (typeof parameter === 'string') {
              var _parameter$match2;

              // split on "." but not on "\." to allow the dot to be escaped
              (_parameter$match2 = parameter.match(/(\\\.|[^.])+/g)) === null || _parameter$match2 === void 0 ? void 0 : _parameter$match2.forEach(function (e) {
                json = json[e.replace('\\.', '.')];
              });
            }

            return json;
          }
        }
      });
    }
  });
  cv.transforms.Mqtt.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mqtt.js.map?dt=1625668962499