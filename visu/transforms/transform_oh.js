/* transform_knx.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This class defines the default transforms: encode: transform JavaScript to
 * bus value decode: transform bus to JavaScript value
 */
addTransform('OH', {
  'switch' : {
    name : 'OH_Switch',
    encode : function(phy) {
      return phy == 1 ? 'ON' : 'OFF';
    },
    decode : function(string) {
      return (string == "ON" || parseInt(string) > 0) ? 1 : 0;
    }
  },
  'contact' : {
    name : 'OH_Contact',
    encode : function(phy) {
      return phy == 1 ? 'OPEN' : 'CLOSED';
    },
    decode : function(string) {
      return string == "OPEN" ? 1 : 0;
    }
  },
  'rollershutter' : {
    name : "OH_RollerShutter",
    encode : function(phy) {
      if (phy == 1)
        return 'DOWN';
      else if (phy == 0)
        return 'UP';
      else
        return phy;
    },
    decode : function(str) {
      if (str == "NaN" || str == 'Uninitialized')
        return 0;
      else if (str == "UP")
        return 0;
      else if (str == "DOWN")
        return 1;
      else
        return str;
    },
  },
  'dimmer' : {
    name : "OH_Dimmer",
    encode : function(phy) {
      return parseInt(phy);
    },
    decode : function(str) {
      if (str == "NaN" || str == 'Uninitialized')
        return 0;
      else if (str == "ON")
        return 100;
      else if (str == "OFF")
        return 0;
      else
        return parseInt(str);
    },
  },
  'number' : {
    name : "OH_Number",
    encode : function(phy) {
      return parseFloat(phy);
    },
    decode : function(str) {
      if (str == "NaN" || str == 'Uninitialized')
        return 0;
      return parseFloat(str);
    },
  },
  'string' : {
    name : "OH_String",
    encode : function(phy) {
      return phy;
    },
    decode : function(str) {
      return str;
    },
  },
});
