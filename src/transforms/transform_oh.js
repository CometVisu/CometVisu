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

define( ['transform_default'], function( Transform ) {
  
hueToRGB = function (m1, m2, h) {
    h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
    return m1;
  };

/**
 * This class defines the default transforms: encode: transform JavaScript to
 * bus value decode: transform bus to JavaScript value
 */
Transform.addTransform('OH', {
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
      if (phy == 1) return 'DOWN';
      else if (phy == 0)  return 'UP';
      else return phy;
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return 0;
      else if (str=="UP") return 0;
      else if (str=="DOWN") return 1;
      else return str;
    },
  },
  'dimmer' : {
    name : "OH_Dimmer",
    encode : function(phy) {
      return parseInt(phy);  
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return 0;
      else if (str=="ON") return 100;
      else if (str=="OFF") return 0;
      else return parseInt(str);
    },
  },
  'number' : {
    name : "OH_Number",
    encode : function(phy) {
      return parseFloat(phy);
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return 0;
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
  'color' : {
    name : "OH_Color",
    encode : function(rgb) {
      var min, max, delta, h, s, l;
      var r = rgb[0]/100, g = rgb[1]/100, b = rgb[2]/100;
      console.log(rgb);
      min = Math.min(r, Math.min(g, b));
      max = Math.max(r, Math.max(g, b));
      delta = max - min;
      l = max;
      s = delta/l;
      h = 0;
      if (delta > 0) {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
      }
      return [h*360, s*100, l*100];
    },
    decode : function(hsb) {
      var m1, m2;
      var h = hsb[0]/360, s = hsb[1]/100, b = hsb[2]/100;
      console.log("HSB: "+hsb);
      // convert from hsb to hsl
      var l = 0.5*b*(2-s);
      m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
      m1 = l * 2 - m2;
      return [hueToRGB(m1, m2, h+0.33333),
          hueToRGB(m1, m2, h),
          hueToRGB(m1, m2, h-0.33333)];
    },
  },
});

}); // end define
