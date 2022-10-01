function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Color.js 
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
      solve2d: function solve2d(A00, A10, A01, A11, y0, y1) {
        var detInv = 1 / (A00 * A11 - A01 * A10);
        return [(y0 * A11 - A01 * y1) * detInv, (A00 * y1 - y0 * A10) * detInv];
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
      solve3d: function solve3d(A00, A10, A20, A01, A11, A21, A02, A12, A22, y0, y1, y2) {
        function det(A00, A10, A20, A01, A11, A21, A02, A12, A22) {
          // eslint-disable-line
          return A00 * A11 * A22 + A01 * A12 * A20 + A02 * A10 * A21 - A20 * A11 * A02 - A21 * A12 * A00 - A22 * A10 * A01;
        }

        var detInv = 1 / det(A00, A10, A20, A01, A11, A21, A02, A12, A22);
        return [det(y0, y1, y2, A01, A11, A21, A02, A12, A22) * detInv, // eslint-disable-line
        det(A00, A10, A20, y0, y1, y2, A02, A12, A22) * detInv, // eslint-disable-line
        det(A00, A10, A20, A01, A11, A21, y0, y1, y2) * detInv // eslint-disable-line
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
      intersect: function intersect(p1, p2, p3, p4) {
        var x12 = p2.x - p1.x;
        var y12 = p2.y - p1.y;
        var x34 = p4.x - p3.x;
        var y34 = p4.y - p3.y;
        var x31 = p1.x - p3.x;
        var y31 = p1.y - p3.y;
        var factors = cv.util.Color.solve2d(x34, y34, -x12, -y12, x31, y31);
        return {
          x: p3.x + factors[0] * x34,
          y: p3.y + factors[0] * y34,
          factors: factors
        };
      },

      /**
       * Get the CIE xy coordinates for a light wavelength.
       * Algorithm as of: http://jcgt.org/published/0002/02/01/
       * @param {number} wave wavelength in nanometers
       * @returns {{x: number, y: number}}
       */
      wavelength2xy: function wavelength2xy(wave) {
        var x_t1 = (wave - 442.0) * (wave < 442.0 ? 0.0624 : 0.0374);
        var x_t2 = (wave - 599.8) * (wave < 599.8 ? 0.0264 : 0.0323);
        var x_t3 = (wave - 501.1) * (wave < 501.1 ? 0.0490 : 0.0382);
        var X = 0.362 * Math.exp(-0.5 * x_t1 * x_t1) + 1.056 * Math.exp(-0.5 * x_t2 * x_t2) - 0.065 * Math.exp(-0.5 * x_t3 * x_t3);
        var y_t1 = (wave - 568.8) * (wave < 568.8 ? 0.0213 : 0.0247);
        var y_t2 = (wave - 530.9) * (wave < 530.9 ? 0.0613 : 0.0322);
        var Y = 0.821 * Math.exp(-0.5 * y_t1 * y_t1) + 0.286 * Math.exp(-0.5 * y_t2 * y_t2);
        var z_t1 = (wave - 437.0) * (wave < 437.0 ? 0.0845 : 0.0278);
        var z_t2 = (wave - 459.0) * (wave < 459.0 ? 0.0385 : 0.0725);
        var Z = 1.217 * Math.exp(-0.5 * z_t1 * z_t1) + 0.681 * Math.exp(-0.5 * z_t2 * z_t2);
        return {
          x: X / (X + Y + Z),
          y: Y / (X + Y + Z)
        };
      },

      /**
       * Get the CIE xy coordinates for a white given its temperature
       * @param {number} T temperature in Kelvin, 1667 K <= T <= 25000 K
       * @returns {{x: number, y: number}}
       */
      temperature2xy: function temperature2xy(T) {
        T = Math.max(1667, Math.min(T, 25000));
        var x = T <= 4000 ? ((-0.2661239e9 / T - 0.2343589e6) / T + 0.8776956e3) / T + 0.179910 : ((-3.0258469e9 / T + 2.1070379e6) / T + 0.2226347e3) / T + 0.240390;
        return {
          x: x,
          y: T <= 2222 ? ((-1.1063814 * x - 1.34811020) * x + 2.18555832) * x - 0.20219683 : T <= 4000 ? ((-0.9549476 * x - 1.37418593) * x + 2.09137015) * x - 0.16748867 : ((3.0817580 * x - 5.87338670) * x + 3.75112997) * x - 0.37001483 // eslint-disable-line space-in-parens

        };
      },

      /**
       * Convert xy coordinates to sRGB (D65) for display on the screen, including
       * gamma correction and simple gamut mapping
       * @param {{x: number, y: number}} xy The `x` and `y` values of the xyY color
       * @param {number} Y The `Y` value of the xyY color
       * @returns {{r: number, g: number, b: number}}
       */
      xy2sRGB: function xy2sRGB(xy) {
        var Y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var X = Y * xy.x / xy.y;
        var Z = Y * (1 - xy.x - xy.y) / xy.y;
        var R = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
        var G = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z;
        var B = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;
        var scale = 1 / Math.max(1, R, G, B); // very simple gamut mapping

        var gamma = function gamma(u) {
          return u <= 0.0031308 ? 12.92 * u : 1.055 * Math.pow(u, 0.4166666666666667) - 0.055;
        };

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
      curve: function curve(component, _curve, scale) {
        if (component <= 0) {
          return Array.isArray(_curve) && _curve.length > 1 ? _curve[0] * scale : 0;
        }

        if (component >= 1) {
          return Array.isArray(_curve) && _curve.length > 1 ? _curve[_curve.length - 1] * scale : scale;
        }

        if (_curve === 'log') {
          return scale * Math.max(0, Math.min(1 - Math.log10(component) / -3, 1));
        }

        if (_curve === 'exp') {
          return scale * Math.max(0, Math.min(Math.pow(10, -3 * (1 - component)), 1));
        }

        if (_curve.length === 1) {
          return scale * Math.pow(component, 1 / _curve[0]);
        } // otherwise: table conversion


        var spacing = 1 / (_curve.length - 1); // the distance between two values

        var position = component / spacing;
        var lower = Math.max(Math.floor(position), 0);
        var higher = Math.min(Math.ceil(position), _curve.length - 1);
        var alpha = position - lower;
        return scale * (_curve[lower] * (1 - alpha) + _curve[higher] * alpha);
      },

      /**
       * Convert a real world value to a color component by applying the inverse dim curve
       * @param {number} value
       * @param {(string|number[])} curve -the curve type (`log` or `exp`), an one element array with the gamma value or an array with the lookup table
       * @param {number} scale
       * @returns {number}
       */
      invCurve: function invCurve(value, curve, scale) {
        if (value <= 0) {
          return 0;
        }

        if (value >= scale) {
          return 1;
        }

        if (curve === 'log') {
          return Math.max(0, Math.min(Math.pow(10, -3 * (1 - value / scale)), 1));
        }

        if (curve === 'exp') {
          return Math.max(0, Math.min(1 - Math.log10(value / scale) / -3, 1));
        }

        if (curve.length === 1) {
          return curve[0] > 0 ? Math.pow(value / scale, curve[0]) : 0;
        } // otherwise: table conversion


        var normalized = value / scale;
        var higher = curve.findIndex(function (x) {
          return x > normalized;
        });

        if (higher < 0) {
          // nothing found -> limit to highest index
          higher = curve.length - 1;
        }

        var lower = Math.max(higher - 1, 0);

        if (lower === higher) {
          return lower / (curve.length - 1);
        }

        var ratio = (normalized - curve[lower]) / (curve[higher] - curve[lower]);
        return Math.min((lower + ratio) / (curve.length - 1), 1);
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
    construct: function construct() {
      var Rxy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var Gxy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var Bxy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var Wxy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      this.__P_522_0 = Rxy === undefined ? {
        x: 0.64,
        y: 0.33,
        Y: 0.2126
      } : Rxy; // default: sRGB

      this.__P_522_1 = Gxy === undefined ? {
        x: 0.30,
        y: 0.60,
        Y: 0.7152
      } : Gxy;
      this.__P_522_2 = Bxy === undefined ? {
        x: 0.15,
        y: 0.06,
        Y: 0.0722
      } : Bxy;

      if (this.__P_522_0.Y === undefined) {
        this.__P_522_0.Y = 1;
      }

      if (this.__P_522_1.Y === undefined) {
        this.__P_522_1.Y = 1;
      }

      if (this.__P_522_2.Y === undefined) {
        this.__P_522_2.Y = 1;
      } // normalize luminances


      var normFac = 1 / (this.__P_522_0.Y + this.__P_522_1.Y + this.__P_522_2.Y);
      this.__P_522_0.Y *= normFac;
      this.__P_522_1.Y *= normFac;
      this.__P_522_2.Y *= normFac; // precalculate X and Z

      this.__P_522_0.X = this.__P_522_0.x * this.__P_522_0.Y / this.__P_522_0.y;
      this.__P_522_0.Z = (1 - this.__P_522_0.x - this.__P_522_0.y) * this.__P_522_0.Y / this.__P_522_0.y;
      this.__P_522_1.X = this.__P_522_1.x * this.__P_522_1.Y / this.__P_522_1.y;
      this.__P_522_1.Z = (1 - this.__P_522_1.x - this.__P_522_1.y) * this.__P_522_1.Y / this.__P_522_1.y;
      this.__P_522_2.X = this.__P_522_2.x * this.__P_522_2.Y / this.__P_522_2.y;
      this.__P_522_2.Z = (1 - this.__P_522_2.x - this.__P_522_2.y) * this.__P_522_2.Y / this.__P_522_2.y;

      if (undefined !== Wxy) {
        this.__P_522_3 = Wxy;

        if (this.__P_522_3.Y === undefined) {
          this.__P_522_3.Y = 1;
        }

        this.__P_522_3.X = this.__P_522_3.x * this.__P_522_3.Y / this.__P_522_3.y;
        this.__P_522_3.Z = (1 - this.__P_522_3.x - this.__P_522_3.y) * this.__P_522_3.Y / this.__P_522_3.y;
      } else {
        this.__P_522_3 = {
          X: this.__P_522_0.X + this.__P_522_1.X + this.__P_522_2.X,
          Y: this.__P_522_0.Y + this.__P_522_1.Y + this.__P_522_2.Y,
          Z: this.__P_522_0.Z + this.__P_522_1.Z + this.__P_522_2.Z
        };
        this.__P_522_3.x = this.__P_522_3.X / (this.__P_522_3.X + this.__P_522_3.Y + this.__P_522_3.Z);
        this.__P_522_3.y = this.__P_522_3.Y / (this.__P_522_3.X + this.__P_522_3.Y + this.__P_522_3.Z);
      } // start color is a complete unsaturated red hue that is black:


      this.__P_522_4 = {
        h: 0,
        s: 0,
        v: 0
      };

      this.__P_522_5();
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // the base colors defining the color space of this color
      __P_522_0: undefined,
      __P_522_1: undefined,
      __P_522_2: undefined,
      __P_522_3: undefined,
      // the color itself

      /**
       * CIE 1931 XYZ color space: x of xyY
       * @type {number}
       */
      __P_522_6: 0.3333333333333333,

      /**
       * CIE 1931 XYZ color space: y of xyY
       * @type {number}
       */
      __P_522_7: 0.3333333333333333,

      /**
       * CIE 1931 XYZ color space: Y of xyY or XYZ - normalized to be between 0...1
       * @type {number}
       */
      __P_522_8: 0,
      // derived color representations, cached to allow partial change

      /**
       * HSV color space - h, s and v are normalized to the range 0...1
       * @type {{h: number, s: number, v: number}}
       */
      __P_522_4: undefined,

      /**
       * HSV color space - last known value of h
       * @type {number}
       */
      __P_522_9: 0,

      /**
       * LCh color space - last known value of h
       * @type {number}
       */
      __P_522_10: 0,

      /**
       * RGB color space - r, g and b are normalized to the range 0...1
       * @type {{r: number, g: number, b: number}}
       */
      __P_522_11: undefined,

      /**
       * RGBW color space - r, g, b and w are normalized to the range 0...1
       * @type {{r: number, g: number, b: number, w: number}}
       */
      __P_522_12: undefined,

      /**
       * Color temperature in Kelvin
       * @type {number}
       */
      __P_522_13: undefined,

      /**
       * L*a*b* color space - with L in 0...100, a* and b* in roughly -150...150
       * @type {{L: number, a: number, b: number}}
       */
      __P_522_14: undefined,

      /**
       * L*C*h° color space - with L in 0...1 instead of 0...100; C in 0...1 instead of 0...150
       * @type {{L: number, C: number, h: number}}
       */
      __P_522_15: undefined,

      /**
       * Get X, Y, Z from this color
       * @private
       * @returns {{X: number, Y: number, Z: number}}
       */
      __P_522_16: function __P_522_16() {
        return {
          X: this.__P_522_6 * (this.__P_522_8 / Math.max(0.001, this.__P_522_7)),
          Y: this.__P_522_8,
          Z: (1 - this.__P_522_6 - this.__P_522_7) * (this.__P_522_8 / Math.max(0.001, this.__P_522_7))
        };
      },

      /**
       * Set internal __x, __y and __Y from XYZ color
       * @private
       * @param {number} X
       * @param {number} Y
       * @param {number} Z
       */
      __P_522_17: function __P_522_17(X, Y, Z) {
        var XYZ = X + Y + Z; // best guess for a total black: completely unsaturated, i.e. the white point

        this.__P_522_6 = XYZ > 0 ? X / XYZ : this.__P_522_3.x;
        this.__P_522_7 = XYZ > 0 ? Y / XYZ : this.__P_522_3.y;
        this.__P_522_8 = Y;
      },

      /**
       * move x and y to be inside the color range that the R, G and B span
       * @private
       * @param {number} x
       * @param {number} y
       * @returns {{x: number, y: number}}
       */
      __P_522_18: function __P_522_18() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.__P_522_6;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.__P_522_7;
        // is x-y on the same side of the R-G axis as the white point?
        var iRG = cv.util.Color.intersect(this.__P_522_0, this.__P_522_1, this.__P_522_3, {
          x: x,
          y: y
        });

        if (iRG.factors[0] >= 0 && iRG.factors[0] <= 1) {
          // no -> move it to be on the line
          x = iRG.x;
          y = iRG.y;
        } // is x-y on the same side of the G-B axis as the white point?


        var iGB = cv.util.Color.intersect(this.__P_522_1, this.__P_522_2, this.__P_522_3, {
          x: x,
          y: y
        });

        if (iGB.factors[0] >= 0 && iGB.factors[0] <= 1) {
          // no -> move it to be on the line
          x = iGB.x;
          y = iGB.y;
        } // is x-y on the same side of the B-R axis as the white point?


        var iBR = cv.util.Color.intersect(this.__P_522_2, this.__P_522_0, this.__P_522_3, {
          x: x,
          y: y
        });

        if (iBR.factors[0] >= 0 && iBR.factors[0] <= 1) {
          // no -> move it to be on the line
          x = iBR.x;
          y = iBR.y;
        }

        return {
          x: x,
          y: y
        };
      },
      // make derived color valid
      __P_522_19: function __P_522_19(force) {
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
          return [(B1 * C2 * D3 - B1 * C3 * D2 - B2 * C1 * D3 + B2 * C3 * D1 + B3 * C1 * D2 - B3 * C2 * D1) / (-A1 * C2 * D3 + A1 * C3 * D2 + A2 * C1 * D3 - A2 * C3 * D1 - A3 * C1 * D2 + A3 * C2 * D1), // eslint-disable-line
          (A1 * C2 * D3 - A1 * C3 * D2 - A2 * C1 * D3 + A2 * C3 * D1 + A3 * C1 * D2 - A3 * C2 * D1) / (-A1 * B2 * D3 + A1 * B3 * D2 + A2 * B1 * D3 - A2 * B3 * D1 - A3 * B1 * D2 + A3 * B2 * D1), // eslint-disable-line
          (-A1 * B2 * D3 + A1 * B3 * D2 + A2 * B1 * D3 - A2 * B3 * D1 - A3 * B1 * D2 + A3 * B2 * D1) / (-A1 * B2 * C3 + A1 * B3 * C2 + A2 * B1 * C3 - A2 * B3 * C1 - A3 * B1 * C2 + A3 * B2 * C1) // eslint-disable-line
          ];
        }

        if (this.__P_522_4 === undefined || force) {
          if (this.__P_522_8 < 1e-4) {
            this.__P_522_4 = {
              h: this.__P_522_9,
              s: 0,
              v: this.__P_522_8
            };
            return;
          }

          var colorAdd = function colorAdd(a, b) {
            var X = a.X + b.X;
            var Y = a.Y + b.Y;
            var Z = a.Z + b.Z;
            return {
              x: X / (X + Y + Z),
              y: Y / (X + Y + Z),
              X: X,
              Y: Y,
              Z: Z
            };
          };

          var hues = [this.__P_522_0, this.__P_522_1, this.__P_522_2, this.__P_522_0];
          var thisXYZ = {
            X: this.__P_522_6 * this.__P_522_8 / this.__P_522_7,
            Y: this.__P_522_8,
            Z: (1 - this.__P_522_6 - this.__P_522_7) * this.__P_522_8 / this.__P_522_7
          };

          if (Math.pow(this.__P_522_6 - this.__P_522_3.x, 2) + Math.pow(this.__P_522_7 - this.__P_522_3.y, 2) < 1e-6) {
            // color is white
            this.__P_522_4 = {
              h: this.__P_522_9,
              s: 0,
              v: this.__P_522_8
            };
            return;
          }

          for (var i = 0; i < 3; i++) {
            var inter1 = cv.util.Color.intersect(hues[i], colorAdd(hues[i], hues[i + 1]), this.__P_522_3, {
              x: this.__P_522_6,
              y: this.__P_522_7
            });
            var inter2 = cv.util.Color.intersect(colorAdd(hues[i], hues[i + 1]), hues[i + 1], this.__P_522_3, {
              x: this.__P_522_6,
              y: this.__P_522_7
            }); // hues[i] -> (hues[i]+hues[i+1])

            var fac = solve(hues[i + 1].X, hues[i + 1].Y, hues[i + 1].Z, hues[i].X - this.__P_522_3.X, hues[i].Y - this.__P_522_3.Y, hues[i].Z - this.__P_522_3.Z, this.__P_522_3.X, this.__P_522_3.Y, this.__P_522_3.Z, thisXYZ.X, thisXYZ.Y, thisXYZ.Z);

            if (inter1.factors[0] >= 0 && inter1.factors[1] >= 0 && inter1.factors[1] <= 1) {
              this.__P_522_4 = {
                h: 2 * i / 6 + fac[0] / 6,
                s: fac[1],
                v: fac[2]
              };
              this.__P_522_9 = this.__P_522_4.h;
              break;
            } // (hues[i]+hues[i+1]) -> hues[i+1]


            var fac2 = solve(-hues[i].X, -hues[i].Y, -hues[i].Z, hues[i].X + hues[i + 1].X - this.__P_522_3.X, hues[i].Y + hues[i + 1].Y - this.__P_522_3.Y, hues[i].Z + hues[i + 1].Z - this.__P_522_3.Z, this.__P_522_3.X, this.__P_522_3.Y, this.__P_522_3.Z, thisXYZ.X, thisXYZ.Y, thisXYZ.Z);

            if (inter2.factors[0] >= 0 && inter2.factors[1] >= 0 && inter2.factors[1] <= 1) {
              this.__P_522_4 = {
                h: (2 * i + 1) / 6 + fac2[0] / 6,
                s: fac2[1],
                v: fac2[2]
              };
              this.__P_522_9 = this.__P_522_4.h;
              break;
            }

            this.__P_522_4 = {
              h: 0,
              s: 0,
              v: this.__P_522_8
            };
            this.__P_522_9 = this.__P_522_4.h;
          }
        }
      },
      __P_522_20: function __P_522_20(force) {
        if (this.__P_522_21 === undefined || force) {
          this.__P_522_21 = {};

          var _this$__P_522_ = this.__P_522_16(),
              X = _this$__P_522_.X,
              Y = _this$__P_522_.Y,
              Z = _this$__P_522_.Z;

          var _cv$util$Color$solve = cv.util.Color.solve3d(this.__P_522_0.X, this.__P_522_0.Y, this.__P_522_0.Z, this.__P_522_1.X, this.__P_522_1.Y, this.__P_522_1.Z, this.__P_522_2.X, this.__P_522_2.Y, this.__P_522_2.Z, X, Y, Z);

          var _cv$util$Color$solve2 = _slicedToArray(_cv$util$Color$solve, 3);

          this.__P_522_21.r = _cv$util$Color$solve2[0];
          this.__P_522_21.g = _cv$util$Color$solve2[1];
          this.__P_522_21.b = _cv$util$Color$solve2[2];
          // scale and clamp:
          var max = Math.max(this.__P_522_21.r, this.__P_522_21.g, this.__P_522_21.b);

          if (max < 1) {
            max = 1;
          }

          this.__P_522_21.r = Math.max(0, this.__P_522_21.r / max);
          this.__P_522_21.g = Math.max(0, this.__P_522_21.g / max);
          this.__P_522_21.b = Math.max(0, this.__P_522_21.b / max);
        }
      },
      __P_522_22: function __P_522_22(force) {
        if (this.__P_522_23 === undefined || force) {
          var _this$__P_522_2 = this.__P_522_16(),
              X = _this$__P_522_2.X,
              Y = _this$__P_522_2.Y,
              Z = _this$__P_522_2.Z;

          var w2rgb = cv.util.Color.solve3d(this.__P_522_0.X, this.__P_522_0.Y, this.__P_522_0.Z, this.__P_522_1.X, this.__P_522_1.Y, this.__P_522_1.Z, this.__P_522_2.X, this.__P_522_2.Y, this.__P_522_2.Z, this.__P_522_3.X, this.__P_522_3.Y, this.__P_522_3.Z);
          this.__P_522_23 = {};

          var _cv$util$Color$solve3 = cv.util.Color.solve3d(this.__P_522_0.X, this.__P_522_0.Y, this.__P_522_0.Z, this.__P_522_1.X, this.__P_522_1.Y, this.__P_522_1.Z, this.__P_522_2.X, this.__P_522_2.Y, this.__P_522_2.Z, X, Y, Z);

          var _cv$util$Color$solve4 = _slicedToArray(_cv$util$Color$solve3, 3);

          this.__P_522_23.r = _cv$util$Color$solve4[0];
          this.__P_522_23.g = _cv$util$Color$solve4[1];
          this.__P_522_23.b = _cv$util$Color$solve4[2];
          this.__P_522_23.w = Math.min(this.__P_522_23.r / w2rgb[0], this.__P_522_23.g / w2rgb[1], this.__P_522_23.b / w2rgb[2]);
          this.__P_522_23.r -= this.__P_522_23.w * w2rgb[0];
          this.__P_522_23.g -= this.__P_522_23.w * w2rgb[1];
          this.__P_522_23.b -= this.__P_522_23.w * w2rgb[2]; // scale and clamp:

          var max = Math.max(this.__P_522_23.r, this.__P_522_23.g, this.__P_522_23.b, this.__P_522_23.w);

          if (max < 1) {
            max = 1;
          }

          this.__P_522_23.r = Math.max(0, this.__P_522_23.r / max);
          this.__P_522_23.g = Math.max(0, this.__P_522_23.g / max);
          this.__P_522_23.b = Math.max(0, this.__P_522_23.b / max);
          this.__P_522_23.w = Math.max(0, this.__P_522_23.w / max);
        }
      },
      __P_522_24: function __P_522_24(force) {
        // getting the color temperature from xy is only giving the correlated
        // color temperature, the temperature of the Planckian radiator whose
        // perceived color most closely resembles that of a given stimulus at the
        // same brightness and under specified viewing conditions
        // This formula works for CCT between 2000 K and 12500 K.
        if (this.__P_522_13 === undefined || force) {
          var n = (this.__P_522_6 - 0.3320) / (this.__P_522_7 - 0.1858);
          var T = ((-449 * n + 3525) * n - 6823.3) * n + 5520.33;
          this.__P_522_13 = Math.max(2000, Math.min(T, 12500));
        }
      },
      __P_522_25: function __P_522_25(force) {
        if (this.__P_522_14 === undefined || force) {
          var Xn = this.__P_522_3.X;
          var Yn = this.__P_522_3.Y;
          var Zn = this.__P_522_3.Z;

          var _this$__P_522_3 = this.__P_522_16(),
              X = _this$__P_522_3.X,
              Y = _this$__P_522_3.Y,
              Z = _this$__P_522_3.Z;

          var f = function f(t) {
            if (t < 0.008856451679035631) {
              return (903.2962962962963 * t + 16) / 116;
            }

            return Math.pow(t, 0.3333333333333333);
          };

          this.__P_522_14 = {
            L: 116 * f(Y / Yn) - 16,
            a: 500 * (f(X / Xn) - f(Y / Yn)),
            b: 200 * (f(Y / Yn) - f(Z / Zn))
          };
        }
      },
      __P_522_26: function __P_522_26(force) {
        this.__P_522_25();

        if (this.__P_522_15 === undefined || force) {
          this.__P_522_15 = {
            L: this.__P_522_14.L / 100,
            // map to 0...1
            C: Math.sqrt(Math.pow(this.__P_522_14.a, 2) + Math.pow(this.__P_522_14.b, 2)) / 150,
            // map to 0...1
            h: (Math.atan2(this.__P_522_14.b, this.__P_522_14.a) / (2 * Math.PI) + 1) % 1 // map angle to 0...1

          };

          if (this.__P_522_15.C < 1e-5) {
            this.__P_522_15.h = this.__P_522_10;
          } else {
            this.__P_522_10 = this.__P_522_15.h;
          }
        }
      },

      /**
       * Invalidate all cached values but the one to keep
       * @private
       * @param {string} keep
       * @param {string} [keep2]
       */
      __P_522_27: function __P_522_27(keep) {
        var _this = this;

        var keep2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        ["__P_522_21", "__P_522_23", "__P_522_4", "__P_522_14", "__P_522_15", "__P_522_13"].forEach(function (cache) {
          if (cache !== keep && cache !== keep2) {
            _this[cache] = undefined;
          }
        });
      },
      // synchronise xyY
      __P_522_5: function __P_522_5() {
        // first step: get maximum saturated RGB values
        var r;
        var g;
        var b;
        var u;
        var d; // eslint-disable-line max-statements-per-line

        if (this.__P_522_4.h < 0.16666666666666666) {
          var _u = (this.__P_522_4.h - 0) * 6;

          r = 1;
          g = _u;
          b = 0; // eslint-disable-line max-statements-per-line
        } else if (this.__P_522_4.h < 0.3333333333333333) {
          u = (this.__P_522_4.h - 0.16666666666666666) * 6;
          d = 1 - u; // eslint-disable-line max-statements-per-line

          r = d;
          g = 1;
          b = 0; // eslint-disable-line max-statements-per-line
        } else if (this.__P_522_4.h < 0.5) {
          var _u2 = (this.__P_522_4.h - 0.3333333333333333) * 6;

          r = 0;
          g = 1;
          b = _u2; // eslint-disable-line max-statements-per-line
        } else if (this.__P_522_4.h < 0.6666666666666666) {
          u = (this.__P_522_4.h - 0.5) * 6;
          d = 1 - u; // eslint-disable-line max-statements-per-line

          r = 0;
          g = d;
          b = 1; // eslint-disable-line max-statements-per-line
        } else if (this.__P_522_4.h < 0.8333333333333334) {
          u = (this.__P_522_4.h - 0.6666666666666666) * 6;
          r = u;
          g = 0;
          b = 1; // eslint-disable-line max-statements-per-line
        } else {
          u = (this.__P_522_4.h - 0.8333333333333334) * 6;
          d = 1 - u; // eslint-disable-line max-statements-per-line

          r = 1;
          g = 0;
          b = d; // eslint-disable-line max-statements-per-line
        } // second step: blend with white to take saturation into account and scale with brightness


        var X = ((this.__P_522_0.X * r + this.__P_522_1.X * g + this.__P_522_2.X * b) * this.__P_522_4.s + (1 - this.__P_522_4.s) * this.__P_522_3.X) * this.__P_522_4.v;
        var Y = ((this.__P_522_0.Y * r + this.__P_522_1.Y * g + this.__P_522_2.Y * b) * this.__P_522_4.s + (1 - this.__P_522_4.s) * this.__P_522_3.Y) * this.__P_522_4.v;
        var Z = ((this.__P_522_0.Z * r + this.__P_522_1.Z * g + this.__P_522_2.Z * b) * this.__P_522_4.s + (1 - this.__P_522_4.s) * this.__P_522_3.Z) * this.__P_522_4.v;

        this.__P_522_17(X, Y, Z);

        this.__P_522_27("__P_522_4");
      },
      __P_522_28: function __P_522_28() {
        this.__P_522_8 = Math.max(this.__P_522_21.r, this.__P_522_21.g, this.__P_522_21.b);

        if (this.__P_522_8 > 0) {
          var X = this.__P_522_0.X * this.__P_522_21.r + this.__P_522_1.X * this.__P_522_21.g + this.__P_522_2.X * this.__P_522_21.b;
          var Y = this.__P_522_0.Y * this.__P_522_21.r + this.__P_522_1.Y * this.__P_522_21.g + this.__P_522_2.Y * this.__P_522_21.b;
          var Z = this.__P_522_0.Z * this.__P_522_21.r + this.__P_522_1.Z * this.__P_522_21.g + this.__P_522_2.Z * this.__P_522_21.b;

          this.__P_522_17(X, Y, Z);
        } // else: do nothing and keep the current x and y to be able to restore it's value when just the brightness will be increased again


        this.__P_522_27("__P_522_21");
      },
      __P_522_29: function __P_522_29() {
        this.__P_522_8 = Math.max(this.__P_522_23.r, this.__P_522_23.g, this.__P_522_23.b, this.__P_522_23.w);

        if (this.__P_522_8 > 0) {
          var X = this.__P_522_0.X * this.__P_522_23.r + this.__P_522_1.X * this.__P_522_23.g + this.__P_522_2.X * this.__P_522_23.b + this.__P_522_3.X * this.__P_522_23.w;
          var Y = this.__P_522_0.Y * this.__P_522_23.r + this.__P_522_1.Y * this.__P_522_23.g + this.__P_522_2.Y * this.__P_522_23.b + this.__P_522_3.Y * this.__P_522_23.w;
          var Z = this.__P_522_0.Z * this.__P_522_23.r + this.__P_522_1.Z * this.__P_522_23.g + this.__P_522_2.Z * this.__P_522_23.b + this.__P_522_3.Z * this.__P_522_23.w;

          this.__P_522_17(X, Y, Z);
        } // else: do nothing and keep the current x and y to be able to restore it's value when just the brightness will be increased again


        this.__P_522_27("__P_522_23");
      },
      __P_522_30: function __P_522_30() {
        var xy = cv.util.Color.temperature2xy(this.__P_522_13);
        this.__P_522_6 = xy.x;
        this.__P_522_7 = xy.y;

        this.__P_522_27("__P_522_13");
      },
      __P_522_31: function __P_522_31() {
        this.__P_522_27("__P_522_13");
      },
      __P_522_32: function __P_522_32() {
        var keepLCh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var Xn = this.__P_522_3.X;
        var Yn = this.__P_522_3.Y;
        var Zn = this.__P_522_3.Z;

        var fInv = function fInv(t) {
          if (t < 0.20689655172413793) {
            return 3 * Math.pow(0.20689655172413793, 2) * (t - 0.13793103448275862);
          }

          return Math.pow(t, 3);
        };

        var Lab = this.__P_522_14;
        var L16 = (Lab.L + 16) / 116;
        var X = Xn * fInv(L16 + Lab.a / 500);
        var Y = Yn * fInv(L16);
        var Z = Zn * fInv(L16 - Lab.b / 200);

        this.__P_522_17(X, Y, Z);

        this.__P_522_27("__P_522_14", keepLCh ? "__P_522_15" : '');
      },
      __P_522_33: function __P_522_33() {
        this.__P_522_14 = {
          L: this.__P_522_15.L * 100,
          a: this.__P_522_15.C * Math.cos(this.__P_522_15.h * 2 * Math.PI) * 150,
          b: this.__P_522_15.C * Math.sin(this.__P_522_15.h * 2 * Math.PI) * 150
        };

        this.__P_522_32(true);
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
      changeComponent: function changeComponent(component, value) {
        /**
         * Clamp the value to the given range
         * @param {number} value
         * @param {number} [min]
         * @param {number} [max]
         * @returns {number}
         */
        function clamp(value) {
          var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          return Math.min(Math.max(min, value), max);
        }

        switch (component) {
          case 'h':
          case 's':
          case 'v':
            this.__P_522_19();

            this.__P_522_4[component] = clamp(value);

            this.__P_522_5();

            break;

          case 'sv':
            this.__P_522_19();

            this.__P_522_4.s = clamp(value[0]);
            this.__P_522_4.v = clamp(value[1]);

            this.__P_522_5();

            break;

          case 'hsv':
            this.__P_522_4 = {
              h: clamp(value.h),
              s: clamp(value.s),
              v: clamp(value.v)
            };

            this.__P_522_5();

            break;

          case 'RGB-r':
          case 'RGB-g':
          case 'RGB-b':
            this.__P_522_20();

            this.__P_522_21[component.split('-')[1]] = clamp(value);

            this.__P_522_28();

            break;

          case 'rgb':
            this.__P_522_21 = {
              r: clamp(value.r),
              g: clamp(value.g),
              b: clamp(value.b)
            };

            this.__P_522_28();

            break;

          case 'RGBW-r':
          case 'RGBW-g':
          case 'RGBW-b':
          case 'RGBW-w':
            this.__P_522_22();

            this.__P_522_23[component.split('-')[1]] = clamp(value);

            this.__P_522_29();

            break;

          case 'rgbw':
            this.__P_522_23 = {
              r: clamp(value.r),
              g: clamp(value.g),
              b: clamp(value.b),
              w: clamp(value.w)
            };

            this.__P_522_29();

            break;

          case 'T':
            this.__P_522_13 = Math.max(1667, Math.min(value, 25000));

            this.__P_522_30();

            break;

          case 'x':
            this.__P_522_6 = clamp(value);

            this.__P_522_27(''); // all precalculated colors are invalid now


            break;

          case 'y':
            this.__P_522_7 = clamp(value);

            this.__P_522_27(''); // all precalculated colors are invalid now


            break;

          case 'xy':
            this.__P_522_6 = clamp(value.x);
            this.__P_522_7 = clamp(value.y);

            this.__P_522_27(''); // all precalculated colors are invalid now


            break;

          case 'Y':
            this.__P_522_8 = clamp(value);

            this.__P_522_31();

            break;

          case 'xyY':
            this.__P_522_6 = clamp(value.x);
            this.__P_522_7 = clamp(value.y);
            this.__P_522_8 = clamp(value.Y);

            this.__P_522_27(''); // all precalculated colors are invalid now


            break;

          case 'LCh-L':
          case 'LCh-C':
            this.__P_522_26();

            this.__P_522_15[component.split('-')[1]] = clamp(value);

            this.__P_522_33();

            break;

          case 'LCh-h':
            this.__P_522_26();

            this.__P_522_15[component.split('-')[1]] = clamp(value);
            this.__P_522_10 = this.__P_522_15.h;

            this.__P_522_33();

            break;

          case 'LCh-CL':
            this.__P_522_26();

            this.__P_522_15.C = clamp(value[0]);
            this.__P_522_15.L = clamp(value[1]);

            this.__P_522_33();

            break;
        }
      },

      /**
       * Set the internal value to the given HSV value without a check.
       * THIS IS FOR INTERNAL USE ONLY! DO NOT USE!
       * @private
       * @param {{h: number, s: number, v: number}} hsv
       */
      _forceHSV: function _forceHSV(hsv) {
        this.__P_522_4 = hsv;

        this.__P_522_5();
      },
      _forceLCh: function _forceLCh(LCh) {
        this.__P_522_15 = LCh;

        this.__P_522_33();
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
      getComponent: function getComponent(component) {
        var gamutMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var clamp = function clamp(min, x, max) {
          return Number.isFinite(x) ? gamutMap ? Math.max(min, Math.min(x, max)) : x : 0;
        };

        switch (component) {
          case 'xy':
            return {
              x: clamp(0, this.__P_522_6, 1),
              y: clamp(0, this.__P_522_7, 1)
            };

          case 'Y':
            return clamp(0, this.__P_522_8, 1);

          case 'xyY':
            return {
              x: clamp(0, this.__P_522_6, 1),
              y: clamp(0, this.__P_522_7, 1),
              Y: clamp(0, this.__P_522_8, 1)
            };

          case 'h':
          case 's':
          case 'v':
            this.__P_522_19(force);

            return clamp(0, this.__P_522_4[component], 1);

          case 'hsv':
            this.__P_522_19(force);

            return {
              h: clamp(0, this.__P_522_4.h, 1),
              s: clamp(0, this.__P_522_4.s, 1),
              v: clamp(0, this.__P_522_4.v, 1)
            };

          case 'RGB-r':
          case 'RGB-g':
          case 'RGB-b':
            {
              this.__P_522_20(force);

              var map = gamutMap ? 1 / Math.max(this.__P_522_21.r, this.__P_522_21.g, this.__P_522_21.b, 1) : 1;
              return map * this.__P_522_21[component.split('-')[1]];
            }

          case 'rgb':
            {
              this.__P_522_20(force);

              var _map = gamutMap ? 1 / Math.max(this.__P_522_21.r, this.__P_522_21.g, this.__P_522_21.b, 1) : 1;

              return {
                r: _map * this.__P_522_21.r,
                g: _map * this.__P_522_21.g,
                b: _map * this.__P_522_21.b
              };
            }

          case 'RGBW-r':
          case 'RGBW-g':
          case 'RGBW-b':
          case 'RGBW-w':
            {
              this.__P_522_22(force);

              var _map2 = gamutMap ? 1 / Math.max(this.__P_522_23.r, this.__P_522_23.g, this.__P_522_23.b, this.__P_522_23.w, 1) : 1;

              return _map2 * this.__P_522_23[component.split('-')[1]];
            }

          case 'rgbw':
            {
              this.__P_522_22(force);

              var _map3 = gamutMap ? 1 / Math.max(this.__P_522_23.r, this.__P_522_23.g, this.__P_522_23.b, this.__P_522_23.w, 1) : 1;

              return {
                r: _map3 * this.__P_522_23.r,
                g: _map3 * this.__P_522_23.g,
                b: _map3 * this.__P_522_23.b,
                w: _map3 * this.__P_522_23.w
              };
            }

          case 'T':
            this.__P_522_24(force);

            return clamp(1667, this.__P_522_13, 25000);

          case 'Lab':
            this.__P_522_25(force);

            return this.__P_522_14;

          case 'LCh-L':
          case 'LCh-C':
          case 'LCh-h':
            this.__P_522_26(force);

            return clamp(0, this.__P_522_15[component.split('-')[1]], 1);

          case 'LCh':
            this.__P_522_26(force);

            return {
              L: clamp(0, this.__P_522_15.L, 1),
              C: clamp(0, this.__P_522_15.C, 1),
              h: clamp(0, this.__P_522_15.h, 1)
            };
        }

        return undefined; // unknown component
      },

      /**
       * Return a copy from this color
       * @returns {cv.util.Color}
       */
      copy: function copy() {
        return Object.assign(new cv.util.Color(), this);
      },

      /**
       * Calculate the distance (difference) between this color and the otherColor
       * in Lab color space, i.e. calculate the Delta E.
       * @param {cv.util.Color} otherColor
       * @returns {number}
       */
      delta: function delta(otherColor) {
        this.__P_522_25();

        otherColor.__P_522_25();

        var Lab = otherColor.__P_522_14;
        var dL = this.__P_522_14.L - Lab.L;
        var da = this.__P_522_14.a - Lab.a;
        var db = this.__P_522_14.b - Lab.b;
        return Math.sqrt(dL * dL + da * da + db * db);
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
      blend: function blend(otherColor, ratio) {
        this.__P_522_26();

        otherColor.__P_522_26();

        var b = function b(x, y) {
          return (1 - ratio) * x + ratio * y;
        };

        var c = this.copy();
        var c1 = this.__P_522_15;
        var c2 = otherColor.__P_522_15;
        var s = Math.abs(c2.h - c1.h + 1) > Math.abs(c2.h - c1.h);
        var e = Math.abs(c2.h - c1.h - 1) > Math.abs(c2.h - c1.h);

        c._forceLCh({
          h: b(c1.h + s, c2.h + e) % 1,
          // handle 360° === 0° to always take shortest distance
          L: b(c1.L, c2.L),
          C: b(c1.C, c2.C)
        });

        return c;
      }
    }
  });
  cv.util.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1664613655861