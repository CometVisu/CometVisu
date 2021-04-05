/* Color.js 
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
 * Color
 *
 * @author ChristianMayer
 * @since 2021
 */

qx.Class.define('cv.util.Color', {
  extend: qx.core.Object,
  
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Solve the 2 dimenstional linear equation
     * ( A00 A01 ) (x0) = (y0)
     * ( A10 A11 ) (x1)   (y1)
     * @param A00
     * @param A10
     * @param A01
     * @param A11
     * @param y0
     * @param y1
     */
    solve2d: function (A00, A10, A01, A11, y0, y1 ) {
      let detInv = 1 / (A00 * A11 - A01 * A10);
      return [ (y0 * A11 - A01 * y1) * detInv, (A00 * y1 - y0 * A10) * detInv ];
    },

    /**
     * Get the CIE xy coordinates for a light wavelength.
     * Algorithm as of: http://jcgt.org/published/0002/02/01/
     * @param wave wavelength in nanometers
     */
    wavelength2xy: function (wave) {
      let
        x_t1 = (wave-442.0)*((wave<442.0)?0.0624:0.0374),
        x_t2 = (wave-599.8)*((wave<599.8)?0.0264:0.0323),
        x_t3 = (wave-501.1)*((wave<501.1)?0.0490:0.0382),
        X= 0.362*Math.exp(-0.5*x_t1*x_t1) + 1.056*Math.exp(-0.5*x_t2*x_t2) - 0.065*Math.exp(-0.5*x_t3*x_t3),
        y_t1 = (wave-568.8)*((wave<568.8)?0.0213:0.0247),
        y_t2 = (wave-530.9)*((wave<530.9)?0.0613:0.0322),
        Y= 0.821*Math.exp(-0.5*y_t1*y_t1) + 0.286*Math.exp(-0.5*y_t2*y_t2),
        z_t1 = (wave-437.0)*((wave<437.0)?0.0845:0.0278),
        z_t2 = (wave-459.0)*((wave<459.0)?0.0385:0.0725),
        Z= 1.217*Math.exp(-0.5*z_t1*z_t1) + 0.681*Math.exp(-0.5*z_t2*z_t2);
      return { x: X/(X+Y+Z), y: Y/(X+Y+Z) };
    },

    /**
     * Get the CIE xy coordinates for a white given its temperature
     * @param T temperature in Kelvin, 1667 K <= T <= 25000 K
     */
    temperature2xy: function (T) {
      T = Math.max( 1667, Math.min( T, 25000 ));
      let x = T <= 4000
        ? ((-0.2661239e9 / T - 0.2343589e6) / T + 0.8776956e3) / T + 0.179910
        : ((-3.0258469e9 / T + 2.1070379e6) / T + 0.2226347e3) / T + 0.240390;
      return {
        x: x,
        y: T <= 2222
          ? ((-1.1063814 * x - 1.34811020) * x + 2.18555832) * x - 0.20219683
          : T <= 4000
          ? ((-0.9549476 * x - 1.37418593) * x + 2.09137015) * x - 0.16748867
          : (( 3.0817580 * x - 5.87338670) * x + 3.75112997) * x - 0.37001483
      };
    }
  },
  
  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */

  /**
   * Construct a color with given primary colors and an optional white
   * channel.
   * When no coordinates are give they default to the sRGB coordinates.
   * @param Rxy
   * @param Gxy
   * @param Bxy
   * @param Wxy
   */
  construct: function (Rxy = undefined, Gxy = undefined, Bxy = undefined, Wxy = undefined) {
    this.__R = Rxy === undefined ? { x: 0.64, y: 0.33 } : Rxy;
    this.__G = Gxy === undefined ? { x: 0.30, y: 0.60 } : Gxy;
    this.__B = Bxy === undefined ? { x: 0.15, y: 0.06 } : Bxy;
    if( undefined !== Wxy ) {
      this.__W = Wxy;
    } else {
      this.__W = {
        x: (this.__R.x + this.__G.x + this.__B.x)/3,
        y: (this.__R.y + this.__G.y + this.__B.y)/3 
      };
    }
    
    // start color is a complete unsaturated red that is black:
    this.__hsv = { h: 0, s: 0, v: 0 };
    this.__syncHSV2xy();
  },
  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // the base colors defining the color space of this color
    __R: { x: 1.0, y: 0.0 },
    __G: { x: 0.0, y: 1.0 },
    __B: { x: 0.0, y: 0.0 },
    __W: { x: 1/3, y: 1/3 },

    // the color itself
    __x: 1/3,
    __y: 1/3,
    __Y: 0,

    // derived color representations
    __hsv: undefined,
    __rbg: undefined,
    __T: undefined,

    // make derived color valid
    __validateHSV: function (force) {
      if( this.__hsv === undefined || force ) {
        let
          hDir_x = this.__x - this.__W.x,
          hDir_y = this.__y - this.__W.y;

        this.__hsv = { h: 0, s: 0, v: this.__Y };
        if( hDir_x !== 0 || hDir_y !== 0 ) {
          // color-base.w = r+g+b-w; r||g||b===0; anderer ===1/(r+g+b);letzer in [0;1]
          let
            RGx = this.__R.x - this.__G.x,
            RGy = this.__R.y - this.__G.y,
            WGx = this.__W.x - this.__G.x,
            WGy = this.__W.y - this.__G.y,
            rg = cv.util.Color.solve2d(RGx, RGy, -hDir_x, -hDir_y, WGx, WGy),
            GBx = this.__G.x - this.__B.x,
            GBy = this.__G.y - this.__B.y,
            WBx = this.__W.x - this.__B.x,
            WBy = this.__W.y - this.__B.y,
            gb = cv.util.Color.solve2d(GBx, GBy, -hDir_x, -hDir_y, WBx, WBy),
            BRx = this.__B.x - this.__R.x,
            BRy = this.__B.y - this.__R.y,
            WRx = this.__W.x - this.__R.x,
            WRy = this.__W.y - this.__R.y,
            br = cv.util.Color.solve2d(BRx, BRy, -hDir_x, -hDir_y, WRx, WRy);
          if (0 <= rg[0] && rg[0] <= 1 && rg[1] > 0) {
            if (rg[0] > 0.5) {
              this.__hsv.h = (1 - rg[0]) / rg[0] / 6;
            } else {
              this.__hsv.h = (1 - rg[0] / (1 - rg[0])) / 6 + 1/6;
            }
            this.__hsv.s = 1 / rg[1];
          } else if (0 <= gb[0] && gb[0] <= 1 && gb[1] > 0) {
            if(gb[0] > 0.5) {
              this.__hsv.h = (1-gb[0])/gb[0]/6 + 2/6;
            } else {
              this.__hsv.h = (1-gb[0]/(1-gb[0]))/6 + 3/6;
            }
            this.__hsv.s = 1/gb[1];
          } else {
            if(br[0] > 0.5) {
              this.__hsv.h = (1-br[0])/br[0]/6 + 4/6;
            } else {
              this.__hsv.h = (1-br[0]/(1-br[0]))/6 + 5/6;
            }
            this.__hsv.s = 1/br[1];
          }
        }
      }
    },

    __validateRGB: function (force) {
      if( this.__rgb === undefined || force ) {
        this.__rgb = { r: 0, g: 0, b: 0 };
        let
          RBx = this.__R.x - this.__B.x,
          RBy = this.__R.y - this.__B.y,
          GBx = this.__G.x - this.__B.x,
          GBy = this.__G.y - this.__B.y,
          cBx = this.__x - this.__B.x,
          cBy = this.__y - this.__B.y,
          rg = cv.util.Color.solve2d(RBx, RBy, GBx, GBy, cBx, cBy),
          r = rg[0],
          g = rg[1],
          b = 1 - r - g,
          max = Math.max(r,g,b);
        r *= this.__Y/max;
        g *= this.__Y/max;
        b *= this.__Y/max;
        this.__rgb.r = r;
        this.__rgb.g = g;
        this.__rgb.b = b;
      }
    },

    __validateRGBW: function () {
      // not finally developed yet, it's here to not get lost:
      /*
        let
          s = Math.max( color.s, 1e-5 ),
          RBx = base.r.x - base.b.x,
          RBy = base.r.y - base.b.y,
          GBx = base.g.x - base.b.x,
          GBy = base.g.y - base.b.y,
          cBx = (color.x-(1-s)*base.w.x)/s - base.b.x,
          cBy = (color.y-(1-s)*base.w.y)/s - base.b.y,
          rg = cv.ui.structure.pure.ColorChooser2.solve2d(RBx, RBy, GBx, GBy, cBx, cBy);
        
        let r =  rg[0], g = rg[1], b = 1-rg[0]-rg[1];
        r = (r * s + (1-s)) * color.v;
        g = (g * s + (1-s)) * color.v;
        b = (b * s + (1-s)) * color.v;
        */
    },

    __validateT: function (force) {
      // getting the color temperature from xy is only giving the correlated
      // color temperature, the temperature of the Planckian radiator whose
      // perceived color most closely resembles that of a given stimulus at the
      // same brightness and under specified viewing conditions
      // This formula works for CCT between 2000 K and 12500 K.
      if( this.__T === undefined || force ) {
        let 
          n = (this.__x - 0.3320) / (this.__y - 0.1858),
          T = ((-449 * n + 3525) * n - 6823.3) * n + 5520.33;
        this.__T = Math.max( 2000, Math.min( T, 12500 ));
      }
    },
    
    // synchronise xyY
    __syncHSV2xy: function () {
      // first step: get maximum saturated RGB values
      let u = (this.__hsv.h%(1/6))*6, d = 1-u; // up/down ramps
      let r = 0, g = 0, b = 0;
      if(this.__hsv.h < 1/6) {
        r = 1; g = u; b = 0;
      } else if(this.__hsv.h < 2/6) {
        r = d; g = 1; b = 0;
      } else if(this.__hsv.h < 3/6) {
        r = 0; g = 1; b = u;
      } else if(this.__hsv.h < 4/6) {
        r = 0; g = d; b = 1;
      } else if(this.__hsv.h < 5/6) {
        r = u; g = 0; b = 1;
      } else {
        r = 1; g = 0; b = d;
      }
      let norm = 1 / (r+g+b);
      r *= norm;
      g *= norm;
      b *= norm;

      // second step: blend with white to take saturation into account and scale with brightness
      this.__x = (r * this.__R.x + g * this.__G.x + b * this.__B.x) * this.__hsv.s + (1-this.__hsv.s) * this.__W.x;
      this.__y = (r * this.__R.y + g * this.__G.y + b * this.__B.y) * this.__hsv.s + (1-this.__hsv.s) * this.__W.y;
      this.__Y = this.__hsv.v;
      this.__rgb = undefined;
      this.__T = undefined;
    },

    __syncRGB2xy: function () {
      let rgbInv = 1 / (this.__rgb.r + this.__rgb.g + this.__rgb.b);
      this.__x = (this.__rgb.r * this.__R.x + this.__rgb.g * this.__G.x + this.__rgb.b * this.__B.x) * rgbInv;
      this.__y = (this.__rgb.r * this.__R.y + this.__rgb.g * this.__G.y + this.__rgb.b * this.__B.y) * rgbInv;
      this.__Y = Math.max( this.__rgb.r, this.__rgb.g, this.__rgb.b );
      this.__hsv = undefined;
      this.__T = undefined;
    },

    __syncT2xy: function () {
      let xy = cv.util.Color.temperature2xy( this.__T );
      this.__x = xy.x;
      this.__y = xy.y;
      this.__hsv = undefined;
      this.__rgb = undefined;
    },

    /**
     * Change the color by changing one of it's components
     * @param component
     * @param value
     */
    changeComponent: function( component, value ) {
      function clamp(x) { return Math.min(Math.max(0,x),1); }

      switch( component ) {
        case 'h':
        case 's':
        case 'v':
          this.__validateHSV();
          this.__hsv[component] = clamp(value);
          this.__syncHSV2xy();
          break;

        case 'sv':
          this.__validateHSV();
          this.__hsv.s = clamp(value[0]);
          this.__hsv.v = clamp(value[1]);
          this.__syncHSV2xy();
          break;
          
        case 'hsv':
          this.__hsv = {
            h: clamp(value.h),
            s: clamp(value.s),
            v: clamp(value.v)
          };
          this.__syncHSV2xy();
          break;

        case 'r':
        case 'g':
        case 'b':
          this.__validateRGB();
          this.__rgb[component] = clamp(value);
          this.__syncRGB2xy();
          break;

        case 'rgb':
          this.__rgb = {
            r: clamp(value.r),
            g: clamp(value.g),
            b: clamp(value.b)
          };
          this.__syncRGB2xy();
          break;

        case 'T':
          this.__T = Math.max( 1667, Math.min( value, 25000 ) );
          this.__syncT2xy();
          break;

        case 'xy':
          this.__x = clamp(value.x);
          this.__y = clamp(value.y);
          this.__hsv = undefined;
          this.__rgb = undefined;
          break;
      }
    },

    getComponent: function (component) {
      switch(component) {
        case 'h':
        case 's':
        case 'v':
          this.__validateHSV();
          return this.__hsv[component];

        case 'hsv':
          this.__validateHSV();
          return this.__hsv;

        case 'r':
        case 'g':
        case 'b':
          this.__validateRGB();
          return this.__rgb[component];

        case 'rgb':
          this.__validateRGB();
          return this.__rgb;

        case 'T':
          this.__validateT();
          return this.__T;
      }
    },

    /**
     * Return a copy from this color
     */
    copy: function () {
      return qx.lang.Object.clone( this );
    },

    /**
     * Calculate the distance (difference) between this color and the otherColor.
     * The result will be a number between 0.0 and 1.0
     * @param otherColor
     */
    delta: function (otherColor) {
      this.__validateHSV();
      let
        hsv = otherColor.getComponent('hsv'),
        dh = this.__hsv.h - hsv.h,
        ds = this.__hsv.s - hsv.s,
        dv = this.__hsv.v - hsv.v;
      return Math.sqrt(Math.min((dh-1)**2, dh*dh, (dh+1)**2) + ds*ds + dv*dv);
    },

    /**
     * Create a new color by calculating (1-ratio)*thisColor + ratio*otherColor.
     * The blending is done by mixing the HSV coordinates.
     * otherColor must have the same base colors xy coordinates, as this
     * is not checked or even enforced doing a blend between such different
     * colors will create an undesired result.
     * @param {cv.ui.Color} otherColor
     * @param {Number} ratio
     */
    blend: function (otherColor, ratio) {
      let
        b = (x,y) => ((1-ratio)*x + ratio*y),
        c = this.copy(),
        c1 = this.getComponent('hsv'),
        c2 = otherColor.getComponent('hsv'),
        s = Math.abs(c2.h-c1.h+1) > Math.abs(c2.h-c1.h),
        e = Math.abs(c2.h-c1.h-1) > Math.abs(c2.h-c1.h);

      c.changeComponent('hsv', {
        h: b(c1.h+s,c2.h+e)%1, // handle 360° === 0° to always take shortest distance
        s: b(c1.s,c2.s),
        v: b(c1.v,c2.v)
      });
      return c;
    }
  }
});