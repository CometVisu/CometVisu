/* TransformOpenHab.js 
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
 * Transformations for the openHAB backend
 * 
 * @author Tobias Bräutigam
 * @since 2012
 */
define( ['TransformDefault'], function(Transform ) {
  "use strict";
  
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
    }
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
    }
  },
  'number' : {
    name : "OH_Number",
    encode : function(phy) {
      return parseFloat(phy);
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return 0;
      return parseFloat(str);
    }
  },
  'string' : {
    name : "OH_String",
    encode : function(phy) {
      return phy;
    },
    decode : function(str) {
      return str;
    }
  },
  'datetime' : {
    name : "OH_DateTime",
    encode : function(phy) {
      if (phy instanceof Date) {
        return phy.toLocaleDateString();
      } else {
        return phy;
      }
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return '-';
      var date = new Date(Date.parse(str));
      return date;
    }
  },
  'time' : {
    name : "OH_Time",
    encode : function(phy) {
      if (phy instanceof Date) {
        return phy.toLocaleTimeString();
      } else {
        return phy;
      }
    },
    decode : function(str) {
      if (str=="NaN" || str=='Uninitialized') return '-';
      var date = new Date();
      var parts = str.split(":");
      date.setHours(parseInt(parts[0]));
      date.setMinutes(parseInt(parts[1]));
      date.setSeconds(parseInt(parts[2]));
      return date;
    }
  },
  'color' : {
    name : "OH_Color",
    encode : function(rgb) {
      var max, min, h, s, v, d;
      var r = rgb[0]/255, g = rgb[1]/255, b = rgb[2]/255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      v = max;
      d = max - min;
      s = max === 0 ? 0 : d / max;
      if (max === min) {
        h = 0; // achromatic
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      // map top 360,100,100
      h = Math.round(h * 3600)/10;
      s = Math.round(s * 1000)/10;
      v = Math.round(v * 1000)/10;
      return [h, s, v];
    },
    decode : function(hsbString) {
      // decode HSV/HSB to RGB
      var hsb = hsbString.split(",");
      var h = parseFloat(hsb[0]), s = parseFloat(hsb[1]), v = parseFloat(hsb[2]);
      var r, g, b, i, f, p, q, t;

      // h = h / 360;
      if (v === 0) { return [0, 0, 0]; }
      s = s / 100;
      v = v / 100;
      h = h / 60;
      i = Math.floor(h);
      f = h - i;
      p = v * (1 - s);
      q = v * (1 - (s * f));
      t = v * (1 - (s * (1 - f)));
      if (i === 0) {
        r = v; g = t; b = p;
      } else if (i === 1) {
        r = q; g = v; b = p;
      } else if (i === 2) {
        r = p; g = v; b = t;
      } else if (i === 3) {
        r = p; g = q; b = v;
      } else if (i === 4) {
        r = t; g = p; b = v;
      } else if (i === 5) {
        r = v; g = p; b = q;
      }
      r = Math.floor(r * 255);
      g = Math.floor(g * 255);
      b = Math.floor(b * 255);
      return [r, g, b];
    }
  }
});

}); // end define
