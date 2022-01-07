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
     * Solve the 2 dimensional linear equation
     * <pre>
     *    ( A00 A01 ) (x0) = (y0)
     *    ( A10 A11 ) (x1)   (y1)
     * </pre>
     * @param {number} A00
     * @param {number} A10
     * @param {number} A01
     * @param {number} A11
     * @param {number} y0
     * @param {number} y1
     * @returns {number[]}
     */
    solve2d: function (A00, A10, A01, A11, y0, y1) {
      const detInv = 1 / (A00 * A11 - A01 * A10);
      return [ (y0 * A11 - A01 * y1) * detInv, (A00 * y1 - y0 * A10) * detInv ];
    },

    /**
     * Solve the 3 dimensional linear equation
     * <pre>
     *    ( A00 A01 A02 ) (x0)   (y0)
     *    ( A10 A11 A12 ) (x1) = (y1)
     *    ( A20 A21 A22 ) (x2)   (y2)
     * </pre>
     * @param {number} A00
     * @param {number} A10
     * @param {number} A20
     * @param {number} A01
     * @param {number} A11
     * @param {number} A21
     * @param {number} A02
     * @param {number} A12
     * @param {number} A22
     * @param {number} y0
     * @param {number} y1
     * @param {number} y2
     * @returns {number[]}
     */
    solve3d: function (A00, A10, A20, A01, A11, A21, A02, A12, A22, y0, y1, y2) {
      function det(A00, A10, A20, A01, A11, A21, A02, A12, A22) { // eslint-disable-line
        return A00*A11*A22 + A01*A12*A20 + A02*A10*A21 - A20*A11*A02 - A21*A12*A00 - A22*A10*A01;
      }
      const detInv = 1/det(A00, A10, A20, A01, A11, A21, A02, A12, A22);
      return [
        det(y0 , y1 , y2 , A01, A11, A21, A02, A12, A22) * detInv, // eslint-disable-line
        det(A00, A10, A20, y0 , y1 , y2 , A02, A12, A22) * detInv, // eslint-disable-line
        det(A00, A10, A20, A01, A11, A21, y0 , y1 , y2 ) * detInv  // eslint-disable-line
      ];
    },

    /**
     * calculate the intersection point between lines 1-2 and 3-4 as well as
     * points 3 and 4 are on different sides of the line 1-2
     * @param {{x: number, y: number}} p1
     * @param {{x: number, y: number}} p2
     * @param {{x: number, y: number}} p3
     * @param {{x: number, y: number}} p4
     * @returns {{x: number, y: number, factors: number[]}}
     */
    intersect: function(p1, p2, p3, p4) {
      const x12 = p2.x-p1.x;
      const y12 = p2.y-p1.y;
      const x34 = p4.x-p3.x;
      const y34 = p4.y-p3.y;
      const x31 = p1.x-p3.x;
      const y31 = p1.y-p3.y;
      const factors = cv.util.Color.solve2d(x34, y34, -x12, -y12, x31, y31);
      return {x:p3.x+factors[0]*x34, y:p3.y+factors[0]*y34, factors:factors};
    },

    /**
     * Get the CIE xy coordinates for a light wavelength.
     * Algorithm as of: http://jcgt.org/published/0002/02/01/
     * @param {number} wave wavelength in nanometers
     * @returns {{x: number, y: number}}
     */
    wavelength2xy: function (wave) {
      const x_t1 = (wave-442.0)*((wave<442.0)?0.0624:0.0374);
      const x_t2 = (wave-599.8)*((wave<599.8)?0.0264:0.0323);
      const x_t3 = (wave-501.1)*((wave<501.1)?0.0490:0.0382);
      const X = 0.362*Math.exp(-0.5*x_t1*x_t1) + 1.056*Math.exp(-0.5*x_t2*x_t2) - 0.065*Math.exp(-0.5*x_t3*x_t3);
      const y_t1 = (wave-568.8)*((wave<568.8)?0.0213:0.0247);
      const y_t2 = (wave-530.9)*((wave<530.9)?0.0613:0.0322);
      const Y = 0.821*Math.exp(-0.5*y_t1*y_t1) + 0.286*Math.exp(-0.5*y_t2*y_t2);
      const z_t1 = (wave-437.0)*((wave<437.0)?0.0845:0.0278);
      const z_t2 = (wave-459.0)*((wave<459.0)?0.0385:0.0725);
      const Z= 1.217*Math.exp(-0.5*z_t1*z_t1) + 0.681*Math.exp(-0.5*z_t2*z_t2);
      return { x: X/(X+Y+Z), y: Y/(X+Y+Z) };
    },

    /**
     * Get the CIE xy coordinates for a white given its temperature
     * @param {number} T temperature in Kelvin, 1667 K <= T <= 25000 K
     * @returns {{x: number, y: number}}
     */
    temperature2xy: function (T) {
      T = Math.max(1667, Math.min(T, 25000));
      let x = T <= 4000
        ? ((-0.2661239e9 / T - 0.2343589e6) / T + 0.8776956e3) / T + 0.179910
        : ((-3.0258469e9 / T + 2.1070379e6) / T + 0.2226347e3) / T + 0.240390;
      return {
        x: x,
        y: T <= 2222
          ? ((-1.1063814 * x - 1.34811020) * x + 2.18555832) * x - 0.20219683
          : T <= 4000
          ? ((-0.9549476 * x - 1.37418593) * x + 2.09137015) * x - 0.16748867
          : (( 3.0817580 * x - 5.87338670) * x + 3.75112997) * x - 0.37001483 // eslint-disable-line space-in-parens
      };
    },

    /**
     * Convert xy coordinates to sRGB (D65) for display on the screen, including
     * gamma correction and simple gamut mapping
     * @param {{x: number, y: number}} xy The `x` and `y` values of the xyY color
     * @param {number} Y The `Y` value of the xyY color
     * @returns {{r: number, g: number, b: number}}
     */
    xy2sRGB: function (xy, Y = 1) {
      const X = Y * xy.x / xy.y;
      const Z = Y * (1-xy.x-xy.y) / xy.y;
      const R =  3.2404542*X -1.5371385*Y -0.4985314*Z;
      const G = -0.9692660*X +1.8760108*Y +0.0415560*Z;
      const B =  0.0556434*X -0.2040259*Y +1.0572252*Z;
      const scale = 1 / Math.max(1, R, G, B); // very simple gamut mapping
      const gamma = u => u<=0.0031308 ? (12.92*u) : (1.055*u**(1/2.4) - 0.055);
      return {
        r: gamma(Math.max(R * scale, 0)),
        g: gamma(Math.max(G * scale, 0)),
        b: gamma(Math.max(B * scale, 0))
      };
    },

    /**
     * Convert a color component to a real world value by applying the dim curve
     * @param {number} component the color component (i.e. r, g or b value) to convert
     * @param {(string|number[])} curve -the curve type (`log` or `exp`), an one element array with the gamma value or an array with the lookup table
     * @param {number} scale the maximal number of the real world value, usually 1, 100 or 255
     * @returns {number}
     */
    curve: function (component, curve, scale) {
      if (component <= 0) {
        return Array.isArray(curve) ? curve[0]*scale : 0;
      }
      if (component >= 1) {
        return Array.isArray(curve) ? curve[curve.length-1]*scale : scale;
      }
      if (curve === 'log') {
        return scale * Math.max(0, Math.min(1-Math.log10(component)/(-3), 1));
      }
      if (curve === 'exp') {
        return scale * Math.max(0, Math.min(10 ** (-3 * (1-component)), 1));
      }
      if (curve.length === 1) {
        return scale * component ** (1/curve[0]);
      }
      // otherwise: table conversion
      const spacing = 1 / (curve.length - 1); // the distance between two values
      const position = component / spacing;
      const lower  = Math.max(Math.floor(position), 0);
      const higher = Math.min(Math.ceil(position), curve.length - 1);
      const alpha = position - lower;
      return scale * (curve[lower] * (1-alpha) + curve[higher] * alpha);
    },

    /**
     * Convert a real world value to a color component by applying the inverse dim curve
     * @param {number} value
     * @param {(string|number[])} curve -the curve type (`log` or `exp`), an one element array with the gamma value or an array with the lookup table
     * @param {number} scale
     * @returns {number}
     */
    invCurve: function (value, curve, scale) {
      if (value <= 0) {
        return 0;
      }
      if (value >= scale) {
        return 1;
      }
      if (curve === 'log') {
        return Math.max(0, Math.min(10 ** (-3 * (1-value/scale)), 1));
      }
      if (curve === 'exp') {
        return Math.max(0, Math.min(1-Math.log10(value/scale)/(-3), 1));
      }
      if (curve.length === 1) {
        return curve[0] > 0 ? (value/scale) ** curve[0] : 0;
      }
      // otherwise: table conversion
      let normalized = value/scale;
      let higher = curve.findIndex(x => (x>normalized));
      if (higher < 0) {
        // nothing found -> limit to highest index
        higher = curve.length - 1;
      }
      let lower = Math.max(higher-1, 0);
      if (lower === higher) {
        return lower / (curve.length-1);
      }
      let ratio = (normalized-curve[lower]) / (curve[higher]-curve[lower]);
      return Math.min((lower + ratio)/(curve.length-1), 1);
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
   * @param {{x: number, y: number, Y: number}} [Rxy]
   * @param {{x: number, y: number, Y: number}} [Gxy]
   * @param {{x: number, y: number, Y: number}} [Bxy]
   * @param {{x: number, y: number, Y: number}} [Wxy]
   */
  construct: function (Rxy = undefined, Gxy = undefined, Bxy = undefined, Wxy = undefined) {
    this.__R = Rxy === undefined ? { x: 0.64, y: 0.33, Y: 0.2126 } : Rxy; // default: sRGB
    this.__G = Gxy === undefined ? { x: 0.30, y: 0.60, Y: 0.7152 } : Gxy;
    this.__B = Bxy === undefined ? { x: 0.15, y: 0.06, Y: 0.0722 } : Bxy;

    if (this.__R.Y === undefined) {
      this.__R.Y = 1;
    }
    if (this.__G.Y === undefined) {
      this.__G.Y = 1;
    }
    if (this.__B.Y === undefined) {
      this.__B.Y = 1;
    }
    if (this.__W.Y === undefined) {
      this.__W.Y = 1;
    }

    // normalize luminances
    let normFac = 1 / (this.__R.Y + this.__G.Y + this.__B.Y);
    this.__R.Y *= normFac;
    this.__G.Y *= normFac;
    this.__B.Y *= normFac;

    // precalculate X and Z
    this.__R.X = this.__R.x * this.__R.Y / this.__R.y;
    this.__R.Z = (1 - this.__R.x - this.__R.y) * this.__R.Y / this.__R.y;
    this.__G.X = this.__G.x * this.__G.Y / this.__G.y;
    this.__G.Z = (1 - this.__G.x - this.__G.y) * this.__G.Y / this.__G.y;
    this.__B.X = this.__B.x * this.__B.Y / this.__B.y;
    this.__B.Z = (1 - this.__B.x - this.__B.y) * this.__B.Y / this.__B.y;

    if (undefined !== Wxy) {
      this.__W = Wxy;
      this.__W.X = this.__W.x * this.__W.Y / this.__W.y;
      this.__W.Z = (1 - this.__W.x - this.__W.y) * this.__W.Y / this.__W.y;
    } else {
      this.__W = {
        X: this.__R.X + this.__G.X + this.__B.X,
        Y: this.__R.Y + this.__G.Y + this.__B.Y,
        Z: this.__R.Z + this.__G.Z + this.__B.Z
      };
      this.__W.x = this.__W.X / (this.__W.X + this.__W.Y + this.__W.Z);
      this.__W.y = this.__W.Y / (this.__W.X + this.__W.Y + this.__W.Z);
    }

    // start color is a complete unsaturated red hue that is black:
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
    __R: undefined,
    __G: undefined,
    __B: undefined,
    __W: undefined,

    // the color itself
    /**
     * CIE 1931 XYZ color space: x of xyY
     * @type {number}
     */
    __x: 1/3,
    /**
     * CIE 1931 XYZ color space: y of xyY
     * @type {number}
     */
    __y: 1/3,
    /**
     * CIE 1931 XYZ color space: Y of xyY or XYZ - normalized to be between 0...1
     * @type {number}
     */
    __Y: 0,

    // derived color representations, cached to allow partial change
    /**
     * HSV color space - h, s and v are normalized to the range 0...1
     * @type {{h: number, s: number, v: number}}
     */
    __hsv: undefined,
    /**
     * HSV color space - last known value of h
     * @type {number}
     */
    __h_last: 0,
    /**
     * RGB color space - r, g and b are normalized to the range 0...1
     * @type {{r: number, g: number, b: number}}
     */
    __rbg: undefined,
    /**
     * RGBW color space - r, g, b and w are normalized to the range 0...1
     * @type {{r: number, g: number, b: number, w: number}}
     */
    __rbgw: undefined,
    /**
     * Color temperature in Kelvin
     * @type {number}
     */
    __T: undefined,
    /**
     * L*a*b* color space - with L in 0...100, a* and b* in roughly -150...150
     * @type {{L: number, a: number, b: number}}
     */
    __Lab: undefined,
    /**
     * L*C*h° color space - with L in 0...1 instead of 0...100; C in 0...1 instead of 0...150
     * @type {{L: number, C: number, h: number}}
     */
    __LCh: undefined,

    /**
     * Get X, Y, Z from this color
     * @private
     * @returns {{X: number, Y: number, Z: number}}
     */
    __getXYZ: function() {
       return {
         X: this.__x * (this.__Y / Math.max(0.001, this.__y)),
         Y: this.__Y,
         Z: (1 - this.__x - this.__y) * (this.__Y / Math.max(0.001, this.__y))
       };
    },
    /**
     * Set internal __x, __y and __Y from XYZ color
     * @private
     * @param {number} X
     * @param {number} Y
     * @param {number} Z
     */
    __setXYZ: function(X, Y, Z) {
      const XYZ = X + Y + Z;
      // best guess for a total black: completely unsaturated, i.e. the white point
      this.__x = XYZ > 0 ? X / XYZ : this.__W.x;
      this.__y = XYZ > 0 ? Y / XYZ : this.__W.y;
      this.__Y = Y;
    },

    /**
     * move x and y to be inside the color range that the R, G and B span
     * @private
     * @param {number} x
     * @param {number} y
     * @returns {{x: number, y: number}}
     */
    __gamutMap: function(x = this.__x, y = this.__y) {
      // is x-y on the same side of the R-G axis as the white point?
      let iRG = cv.util.Color.intersect(this.__R, this.__G, this.__W, {x:x, y:y});
      if (iRG.factors[0] >=0 && iRG.factors[0] <= 1) {
        // no -> move it to be on the line
        x = iRG.x;
        y = iRG.y;
      }
      // is x-y on the same side of the G-B axis as the white point?
      let iGB = cv.util.Color.intersect(this.__G, this.__B, this.__W, {x:x, y:y});
      if (iGB.factors[0] >=0 && iGB.factors[0] <= 1) {
        // no -> move it to be on the line
        x = iGB.x;
        y = iGB.y;
      }
      // is x-y on the same side of the B-R axis as the white point?
      let iBR = cv.util.Color.intersect(this.__B, this.__R, this.__W, {x:x, y:y});
      if (iBR.factors[0] >=0 && iBR.factors[0] <= 1) {
        // no -> move it to be on the line
        x = iBR.x;
        y = iBR.y;
      }
      return {x: x, y: y};
    },

    // make derived color valid
    __validateHSV: function (force) {
      /**
       * solve a special set of equations:
       * <pre>
       *    A1 * x*y*z + B1 * y*z + C1 * z = D1
       *    A2 * x*y*z + B2 * y*z + C2 * z = D2
       *    A3 * x*y*z + B3 * y*z + C3 * z = D3
       * </pre>
       * Wolfram Language code: Solve[{C1 z + B1 y z + A1 x y z == D1, C2 z + B2 y z + A2 x y z == D2, C3 z + B3 y z + A3 x y z == D3}, {x, y, z}]
       *
       * @param {number} A1
       * @param {number} A2
       * @param {number} A3
       * @param {number} B1
       * @param {number} B2
       * @param {number} B3
       * @param {number} C1
       * @param {number} C2
       * @param {number} C3
       * @param {number} D1
       * @param {number} D2
       * @param {number} D3
       * @returns {number[]}
       */
      function solve(A1, A2, A3, B1, B2, B3, C1, C2, C3, D1, D2, D3) {
        return [
          ( B1*C2*D3 - B1*C3*D2 - B2*C1*D3 + B2*C3*D1 + B3*C1*D2 - B3*C2*D1)/(-A1*C2*D3 + A1*C3*D2 + A2*C1*D3 - A2*C3*D1 - A3*C1*D2 + A3*C2*D1), // eslint-disable-line
          ( A1*C2*D3 - A1*C3*D2 - A2*C1*D3 + A2*C3*D1 + A3*C1*D2 - A3*C2*D1)/(-A1*B2*D3 + A1*B3*D2 + A2*B1*D3 - A2*B3*D1 - A3*B1*D2 + A3*B2*D1), // eslint-disable-line
          (-A1*B2*D3 + A1*B3*D2 + A2*B1*D3 - A2*B3*D1 - A3*B1*D2 + A3*B2*D1)/(-A1*B2*C3 + A1*B3*C2 + A2*B1*C3 - A2*B3*C1 - A3*B1*C2 + A3*B2*C1)  // eslint-disable-line
        ];
      }

      if (this.__hsv === undefined || force) {
        if (this.__Y < 1e-4) {
          this.__hsv = { h: this.__h_last, s: 0, v: this.__Y };
          return;
        }

        const colorAdd = function(a, b) {
          const X = a.X + b.X;
          const Y = a.Y + b.Y;
          const Z = a.Z + b.Z;
          return {x: X/(X+Y+Z), y: Y/(X+Y+Z), X:X, Y:Y, Z:Z};
        };
        const hues = [this.__R, this.__G, this.__B, this.__R];
        const thisXYZ = {X:this.__x*this.__Y/this.__y, Y:this.__Y, Z: (1-this.__x-this.__y)*this.__Y/this.__y};

        if ((this.__x-this.__W.x)**2 + (this.__y-this.__W.y)**2 < 1e-6) {
          // color is white
          this.__hsv = { h: this.__h_last, s:0, v: this.__Y };
          return;
        }
        for (let i = 0; i<3; i++) {
          const inter1 = cv.util.Color.intersect(hues[i], colorAdd(hues[i], hues[i+1]), this.__W, {x:this.__x, y:this.__y});
          const inter2 = cv.util.Color.intersect(colorAdd(hues[i], hues[i+1]), hues[i+1], this.__W, {x:this.__x, y:this.__y});
          // hues[i] -> (hues[i]+hues[i+1])
          const fac = solve(
            hues[i+1].X, hues[i+1].Y, hues[i+1].Z,
            hues[i].X - this.__W.X, hues[i].Y - this.__W.Y, hues[i].Z - this.__W.Z,
            this.__W.X, this.__W.Y, this.__W.Z,
            thisXYZ.X, thisXYZ.Y, thisXYZ.Z
          );
          if (inter1.factors[0]>=0 && inter1.factors[1]>=0 && inter1.factors[1]<=1) {
            this.__hsv = { h: 2*i/6+fac[0]/6, s: fac[1], v: fac[2] };
            this.__h_last = this.__hsv.h;
            break;
          }

          // (hues[i]+hues[i+1]) -> hues[i+1]
          const fac2 = solve(
            -hues[i].X, -hues[i].Y, -hues[i].Z,
            hues[i].X + hues[i+1].X - this.__W.X, hues[i].Y + hues[i+1].Y - this.__W.Y, hues[i].Z + hues[i+1].Z - this.__W.Z,
            this.__W.X, this.__W.Y, this.__W.Z,
            thisXYZ.X, thisXYZ.Y, thisXYZ.Z
        );
        if (inter2.factors[0]>=0 && inter2.factors[1]>=0 && inter2.factors[1]<=1) {
          this.__hsv = { h: (2*i+1)/6+fac2[0]/6, s: fac2[1], v: fac2[2] };
          this.__h_last = this.__hsv.h;
          break;
        }
        this.__hsv = { h: 0, s: 0, v: this.__Y };
        this.__h_last = this.__hsv.h;
        }
      }
    },

    __validateRGB: function (force) {
      if (this.__rgb === undefined || force) {
        this.__rgb = {};
        const {X, Y, Z} = this.__getXYZ();
        [this.__rgb.r, this.__rgb.g, this.__rgb.b] = cv.util.Color.solve3d(
          this.__R.X, this.__R.Y, this.__R.Z,
          this.__G.X, this.__G.Y, this.__G.Z,
          this.__B.X, this.__B.Y, this.__B.Z,
          X, Y, Z
        );
        // scale and clamp:
        let max = Math.max(this.__rgb.r, this.__rgb.g, this.__rgb.b);
        if (max < 1) {
          max = 1;
        }
        this.__rgb.r = Math.max(0, this.__rgb.r / max);
        this.__rgb.g = Math.max(0, this.__rgb.g / max);
        this.__rgb.b = Math.max(0, this.__rgb.b / max);
      }
    },

    __validateRGBW: function (force) {
      if (this.__rgbw === undefined || force) {
        const {X, Y, Z} = this.__getXYZ();
        let w2rgb = cv.util.Color.solve3d(
          this.__R.X, this.__R.Y, this.__R.Z,
          this.__G.X, this.__G.Y, this.__G.Z,
          this.__B.X, this.__B.Y, this.__B.Z,
          this.__W.X, this.__W.Y, this.__W.Z
        );
        this.__rgbw = {};
        [this.__rgbw.r, this.__rgbw.g, this.__rgbw.b] = cv.util.Color.solve3d(
          this.__R.X, this.__R.Y, this.__R.Z,
          this.__G.X, this.__G.Y, this.__G.Z,
          this.__B.X, this.__B.Y, this.__B.Z,
          X, Y, Z
        );
        this.__rgbw.w = Math.min(this.__rgbw.r/w2rgb[0], this.__rgbw.g/w2rgb[1], this.__rgbw.b/w2rgb[2]);
        this.__rgbw.r -= this.__rgbw.w * w2rgb[0];
        this.__rgbw.g -= this.__rgbw.w * w2rgb[1];
        this.__rgbw.b -= this.__rgbw.w * w2rgb[2];

        // scale and clamp:
        let max = Math.max(this.__rgbw.r, this.__rgbw.g, this.__rgbw.b, this.__rgbw.w);
        if (max < 1) {
          max = 1;
        }
        this.__rgbw.r = Math.max(0, this.__rgbw.r / max);
        this.__rgbw.g = Math.max(0, this.__rgbw.g / max);
        this.__rgbw.b = Math.max(0, this.__rgbw.b / max);
        this.__rgbw.w = Math.max(0, this.__rgbw.w / max);
      }
    },

    __validateT: function (force) {
      // getting the color temperature from xy is only giving the correlated
      // color temperature, the temperature of the Planckian radiator whose
      // perceived color most closely resembles that of a given stimulus at the
      // same brightness and under specified viewing conditions
      // This formula works for CCT between 2000 K and 12500 K.
      if (this.__T === undefined || force) {
        const n = (this.__x - 0.3320) / (this.__y - 0.1858);
        const T = ((-449 * n + 3525) * n - 6823.3) * n + 5520.33;
        this.__T = Math.max(2000, Math.min(T, 12500));
      }
    },

    __validateLab: function (force) {
      if (this.__Lab === undefined || force) {
        const Xn = this.__W.X;
        const Yn = this.__W.Y;
        const Zn = this.__W.Z;
        const {X, Y, Z} = this.__getXYZ();
        const f = function(t) {
          if (t < 216/24389) {
            return (24389/27*t+16)/116;
          }
          return t**(1/3);
        };
        this.__Lab = {
          L: 116 * f(Y/Yn) - 16,
          a: 500 * (f(X/Xn) - f(Y/Yn)),
          b: 200 * (f(Y/Yn) - f(Z/Zn))
        };
      }
    },

    __validateLCh: function (force) {
      this.__validateLab();
      if (this.__LCh === undefined || force) {
        this.__LCh = {
          L: this.__Lab.L / 100, // map to 0...1
          C: Math.sqrt(this.__Lab.a**2 + this.__Lab.b**2) / 150, // map to 0...1
          h: (Math.atan2(this.__Lab.b, this.__Lab.a)/(2*Math.PI)+1)%1 // map angle to 0...1
        };
      }
    },

    /**
     * Invalidate all cached values but the one to keep
     * @private
     * @param {string} keep
     * @param {string} [keep2]
     */
    __invalidateBut(keep, keep2 = '') {
      [
        '__rgb',
        '__rgbw',
        '__hsv',
        '__Lab',
        '__LCh',
        '__T'
      ].forEach(cache => {
        if (cache !== keep && cache !== keep2) {
          this[cache] = undefined;
        }
      });
    },

    // synchronise xyY
    __syncHSV2xy: function () {
      // first step: get maximum saturated RGB values
      let r; let g; let b; let u; let d;         // eslint-disable-line max-statements-per-line
      if (this.__hsv.h < 1/6) {
        let u = (this.__hsv.h - 0/6) * 6;
        r = 1; g = u; b = 0;                     // eslint-disable-line max-statements-per-line
      } else if (this.__hsv.h < 2/6) {
        u = (this.__hsv.h - 1/6) * 6; d = 1-u;   // eslint-disable-line max-statements-per-line
        r = d; g = 1; b = 0;                     // eslint-disable-line max-statements-per-line
      } else if (this.__hsv.h < 3/6) {
        let u = (this.__hsv.h - 2/6) * 6;
        r = 0; g = 1; b = u;                     // eslint-disable-line max-statements-per-line
      } else if (this.__hsv.h < 4/6) {
        u = (this.__hsv.h - 3/6) * 6; d = 1-u;   // eslint-disable-line max-statements-per-line
        r = 0; g = d; b = 1;                     // eslint-disable-line max-statements-per-line
      } else if (this.__hsv.h < 5/6) {
        u = (this.__hsv.h - 4/6) * 6;
        r = u; g = 0; b = 1;                     // eslint-disable-line max-statements-per-line
      } else {
        u = (this.__hsv.h - 5/6) * 6; d = 1-u;   // eslint-disable-line max-statements-per-line
        r = 1; g = 0; b = d;                     // eslint-disable-line max-statements-per-line
      }

      // second step: blend with white to take saturation into account and scale with brightness
      const X = ((this.__R.X * r + this.__G.X * g + this.__B.X * b) * this.__hsv.s + (1-this.__hsv.s) * this.__W.X) * this.__hsv.v;
      const Y = ((this.__R.Y * r + this.__G.Y * g + this.__B.Y * b) * this.__hsv.s + (1-this.__hsv.s) * this.__W.Y) * this.__hsv.v;
      const Z = ((this.__R.Z * r + this.__G.Z * g + this.__B.Z * b) * this.__hsv.s + (1-this.__hsv.s) * this.__W.Z) * this.__hsv.v;
      this.__setXYZ(X, Y, Z);
      this.__invalidateBut('__hsv');
    },

    __syncRGB2xy: function () {
      this.__Y = Math.max(this.__rgb.r, this.__rgb.g, this.__rgb.b);
      if (this.__Y > 0) {
        const X = this.__R.X * this.__rgb.r + this.__G.X * this.__rgb.g + this.__B.X * this.__rgb.b;
        const Y = this.__R.Y * this.__rgb.r + this.__G.Y * this.__rgb.g + this.__B.Y * this.__rgb.b;
        const Z = this.__R.Z * this.__rgb.r + this.__G.Z * this.__rgb.g + this.__B.Z * this.__rgb.b;
        this.__setXYZ(X, Y, Z);
      } // else: do nothing and keep the current x and y to be able to restore it's value when just the brightness will be increased again
      this.__invalidateBut('__rgb');
    },

    __syncRGBW2xy: function () {
      this.__Y = Math.max(this.__rgbw.r, this.__rgbw.g, this.__rgbw.b, this.__rgbw.w);
      if (this.__Y > 0) {
        const X = this.__R.X * this.__rgbw.r + this.__G.X * this.__rgbw.g + this.__B.X * this.__rgbw.b + this.__W.X * this.__rgbw.w;
        const Y = this.__R.Y * this.__rgbw.r + this.__G.Y * this.__rgbw.g + this.__B.Y * this.__rgbw.b + this.__W.Y * this.__rgbw.w;
        const Z = this.__R.Z * this.__rgbw.r + this.__G.Z * this.__rgbw.g + this.__B.Z * this.__rgbw.b + this.__W.Z * this.__rgbw.w;
        this.__setXYZ(X, Y, Z);
      } // else: do nothing and keep the current x and y to be able to restore it's value when just the brightness will be increased again
      this.__invalidateBut('__rgbw');
    },

    __syncT2xy: function () {
      let xy = cv.util.Color.temperature2xy(this.__T);
      this.__x = xy.x;
      this.__y = xy.y;
      this.__invalidateBut('__T');
    },

    __syncY2xy: function () {
      this.__invalidateBut('__T');
    },

    __syncLab2xy: function (keepLCh = false) {
      const Xn = this.__W.X;
      const Yn = this.__W.Y;
      const Zn = this.__W.Z;
      const fInv = function(t) {
        if (t < 6/29) {
          return 3*(6/29)**2*(t-4/29);
        }
        return t**3;
      };
      const Lab = this.__Lab;
      const L16 = (Lab.L + 16)/116;
      const X = Xn * fInv(L16 + Lab.a/500);
      const Y = Yn * fInv(L16);
      const Z = Zn * fInv(L16 - Lab.b/200);
      this.__setXYZ(X, Y, Z);

      this.__invalidateBut('__Lab', keepLCh?'__LCh':'');
    },

    __syncLCh2xy: function () {
      this.__Lab = {
        L: this.__LCh.L * 100,
        a: this.__LCh.C * Math.cos(this.__LCh.h*2*Math.PI) * 150,
        b: this.__LCh.C * Math.sin(this.__LCh.h*2*Math.PI) * 150
      };
      this.__syncLab2xy(true);
    },

    /**
     * Change the color by changing one of it's components.
     *
     * Expected values are:
     * - h, s, v: 0...1
     * - r, g, b, w: 0...1
     * - T: 1667...25000 Kelvin
     * - x, y, Y: 0...1
     * - L, C, h: 0...1
     *
     * @param {string} component
     * @param {(number|number[]|{h:number,s:number,v:number}|{r:number,g:number,b:number,w:number}|{x:number,y:number,Y:number})} value
     */
    changeComponent: function(component, value) {
      /**
       * Clamp the value to the given range
       * @param {number} value
       * @param {number} [min]
       * @param {number} [max]
       * @returns {number}
       */
      function clamp(value, min=0, max=1) {
        return Math.min(Math.max(min, value), max);
      }

      switch (component) {
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

        case 'RGB-r':
        case 'RGB-g':
        case 'RGB-b':
          this.__validateRGB();
          this.__rgb[component.split('-')[1]] = clamp(value);
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

        case 'RGBW-r':
        case 'RGBW-g':
        case 'RGBW-b':
        case 'RGBW-w':
          this.__validateRGBW();
          this.__rgbw[component.split('-')[1]] = clamp(value);
          this.__syncRGBW2xy();
          break;

        case 'rgbw':
          this.__rgbw = {
            r: clamp(value.r),
            g: clamp(value.g),
            b: clamp(value.b),
            w: clamp(value.w)
          };
          this.__syncRGBW2xy();
          break;

        case 'T':
          this.__T = Math.max(1667, Math.min(value, 25000));
          this.__syncT2xy();
          break;

        case 'x':
          this.__x = clamp(value);
          this.__invalidateBut(''); // all precalculated colors are invalid now
          break;

        case 'y':
          this.__y = clamp(value);
          this.__invalidateBut(''); // all precalculated colors are invalid now
          break;

        case 'xy':
          this.__x = clamp(value.x);
          this.__y = clamp(value.y);
          this.__invalidateBut(''); // all precalculated colors are invalid now
          break;

        case 'Y':
          this.__Y = clamp(value);
          this.__syncY2xy();
          break;

        case 'xyY':
          this.__x = clamp(value.x);
          this.__y = clamp(value.y);
          this.__Y = clamp(value.Y);
          this.__invalidateBut(''); // all precalculated colors are invalid now
          break;

        case 'LCh-L':
        case 'LCh-C':
        case 'LCh-h':
          this.__validateLCh();
          this.__LCh[component.split('-')[1]] = clamp(value);
          this.__syncLCh2xy();
          break;

        case 'LCh-CL':
          this.__validateLCh();
          this.__LCh.C = clamp(value[0]);
          this.__LCh.L = clamp(value[1]);
          this.__syncLCh2xy();
          break;
      }
    },

    /**
     * Set the internal value to the given HSV value without a check.
     * THIS IS FOR INTERNAL USE ONLY! DO NOT USE!
     * @private
     * @param {{h: number, s: number, v: number}} hsv
     */
    _forceHSV: function (hsv) {
      this.__hsv = hsv;
      this.__syncHSV2xy();
    },
    _forceLCh: function (LCh) {
      this.__LCh = LCh;
      this.__syncLCh2xy();
    },

    /**
     * Get the value(s) of the specified component
     *
     * Value ranges are:
     * - h, s, v: 0...1
     * - r, g, b, w: 0...1
     * - T: 1667...25000 Kelvin
     * - x, y, Y: 0...1
     * - L, a, b: 0...100 for `L` and roughly -150...150 for `a` and `b`
     * - L, C, h: 0...1
     *
     * @param {string} component
     * @param {boolean} gamutMap
     * @param {boolean} force
     * @returns {(number|{x:number, y:number}|{h:number,s:number,v:number}|{r:number,g:number,b:number}|{r:number,g:number,b:number,w:number}|{L:number,a:number,b:number}|{L:number,C:number,h:number})}
     */
    getComponent: function (component, gamutMap = true, force = false) {
      const clamp = (min, x, max) => Number.isFinite(x) ? (gamutMap ? Math.max(min, Math.min(x, max)) : x) : 0;

      switch (component) {
        case 'xy':
          return {x: clamp(0, this.__x, 1), y: clamp(0, this.__y, 1)};
        case 'Y':
          return clamp(0, this.__Y, 1);
        case 'xyY':
          return {x: clamp(0, this.__x, 1), y: clamp(0, this.__y, 1), Y: clamp(0, this.__Y, 1)};

        case 'h':
        case 's':
        case 'v':
          this.__validateHSV(force);
          return clamp(0, this.__hsv[component], 1);

        case 'hsv':
          this.__validateHSV(force);
          return {
            h: clamp(0, this.__hsv.h, 1),
            s: clamp(0, this.__hsv.s, 1),
            v: clamp(0, this.__hsv.v, 1)
          };

        case 'RGB-r':
        case 'RGB-g':
        case 'RGB-b': {
          this.__validateRGB(force);
          const map = gamutMap ? 1 / Math.max(this.__rgb.r, this.__rgb.g, this.__rgb.b, 1) : 1;
          return map * this.__rgb[component.split('-')[1]];
        }

        case 'rgb': {
          this.__validateRGB(force);
          const map = gamutMap ? 1 / Math.max(this.__rgb.r, this.__rgb.g, this.__rgb.b, 1) : 1;
          return {
            r: map * this.__rgb.r,
            g: map * this.__rgb.g,
            b: map * this.__rgb.b
          };
        }

        case 'RGBW-r':
        case 'RGBW-g':
        case 'RGBW-b':
        case 'RGBW-w': {
          this.__validateRGBW(force);
          const map = gamutMap ? 1 / Math.max(this.__rgbw.r, this.__rgbw.g, this.__rgbw.b, this.__rgbw.w, 1) : 1;
          return map * this.__rgbw[component.split('-')[1]];
        }

        case 'rgbw': {
          this.__validateRGBW(force);
          const map = gamutMap ? 1 / Math.max(this.__rgbw.r, this.__rgbw.g, this.__rgbw.b, this.__rgbw.w, 1) : 1;
          return {
            r: map * this.__rgbw.r,
            g: map * this.__rgbw.g,
            b: map * this.__rgbw.b,
            w: map * this.__rgbw.w
          };
        }

        case 'T':
          this.__validateT(force);
          return clamp(1667, this.__T, 25000);

        case 'Lab':
          this.__validateLab(force);
          return this.__Lab;

        case 'LCh-L':
        case 'LCh-C':
        case 'LCh-h':
          this.__validateLCh(force);
          return clamp(0, this.__LCh[component.split('-')[1]], 1);

        case 'LCh':
          this.__validateLCh(force);
          return {
            L: clamp(0, this.__LCh.L, 1),
            C: clamp(0, this.__LCh.C, 1),
            h: clamp(0, this.__LCh.h, 1)
          };
      }

      return undefined; // unknown component
    },

    /**
     * Return a copy from this color
     * @returns {cv.util.Color}
     */
    copy: function () {
      return Object.assign(new cv.util.Color(), this);
    },

    /**
     * Calculate the distance (difference) between this color and the otherColor
     * in Lab color space, i.e. calculate the Delta E.
     * @param {cv.util.Color} otherColor
     * @returns {number}
     */
    delta: function (otherColor) {
      this.__validateLab();
      otherColor.__validateLab();
      const Lab = otherColor.__Lab;
      const dL = this.__Lab.L - Lab.L;
      const da = this.__Lab.a - Lab.a;
      const db = this.__Lab.b - Lab.b;
      return Math.sqrt(dL*dL + da*da + db*db);
    },

    /**
     * Create a new color by calculating (1-ratio)*thisColor + ratio*otherColor.
     * The blending is done by mixing the LCh coordinates.
     * otherColor must have the same base colors xy coordinates, as this
     * is not checked or even enforced doing a blend between such different
     * colors will create an undesired result.
     * @param {cv.util.Color} otherColor
     * @param {number} ratio
     * @returns {cv.util.Color}
     */
    blend: function (otherColor, ratio) {
      this.__validateLCh();
      otherColor.__validateLCh();
      const b = (x, y) => ((1-ratio)*x + ratio*y);
      const c = this.copy();
      const c1 = this.__LCh;
      const c2 = otherColor.__LCh;
      const s = Math.abs(c2.h-c1.h+1) > Math.abs(c2.h-c1.h);
      const e = Math.abs(c2.h-c1.h-1) > Math.abs(c2.h-c1.h);

      c._forceLCh({
        h: b(c1.h+s, c2.h+e)%1, // handle 360° === 0° to always take shortest distance
        L: b(c1.L, c2.L),
        C: b(c1.C, c2.C)
      });
      return c;
    }
  }
});
