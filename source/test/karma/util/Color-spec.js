/* Color-spec.js
 *
 * copyright (c) 2021-2021, Christian Mayer and the CometVisu contributers.
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
 * Test the color class.
 * Reference values are derived from http://www.brucelindbloom.com/index.html?ColorCalculator.html
 *
 * @author Christian Mayer
 * @since 2021
 */
describe('checking color class', function() {
  it('should create Color with default values', function() {
    let c = new cv.util.Color();
    expect(c.getComponent('hsv')).toEqual({h: 0, s: 0, v: 0});
    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.30, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.60, 4);
    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.15, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.06, 4);
    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.3127, 4); // sRGB white point D65
    expect(c.getComponent('xy').y).toBeCloseTo(0.3290, 4); // sRGB white point D65
  });

  it('should create Color with non default values but no white', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 } );
    expect(c.getComponent('hsv')).toEqual({h: 0, s: 0, v: 0});
    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.65, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.34, 4);
    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.61, 4);
    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.16, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.07, 4);
    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.3305, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.3535, 4);
  });

  it('should create Color with non default values including white', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 }, { x: 0.31, y: 0.32, Y: 1 } );
    expect(c.getComponent('hsv')).toEqual({h: 0, s: 0, v: 0});
    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.65, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.34, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.61, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.16, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.07, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);

    c.changeComponent('RGB-r', 1);
    c.changeComponent('RGB-g', 1);
    c.changeComponent('RGB-b', 1);
    expect(c.getComponent('xy').x).not.toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).not.toBeCloseTo(0.32, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);

    c.changeComponent('RGBW-r', 0);
    c.changeComponent('RGBW-g', 0);
    c.changeComponent('RGBW-b', 0);
    c.changeComponent('RGBW-w', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.32, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(1, 4);
  });

  it('should work with RGB colors', function() {
    let c = new cv.util.Color();
    c.changeComponent('RGB-r', 0);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 0);
    expect(c.getComponent('Y')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);

    c.changeComponent('RGB-r', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0.5, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('RGB-r', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);
    let rgb100 = c.getComponent('rgb', true);
    expect(rgb100.r).toBeCloseTo(1, 4);
    expect(rgb100.g).toBeCloseTo(0, 4);
    expect(rgb100.b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    rgb100 = c.getComponent('rgb', true);
    expect(rgb100.r).toBeCloseTo(1, 4);
    expect(rgb100.g).toBeCloseTo(0, 4);
    expect(rgb100.b).toBeCloseTo(0, 4);

    c.changeComponent('RGB-g', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);
    let rgb110 = c.getComponent('rgb', true);
    expect(rgb110.r).toBeCloseTo(1, 4);
    expect(rgb110.g).toBeCloseTo(1, 4);
    expect(rgb110.b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    rgb110 = c.getComponent('rgb', true);
    expect(rgb110.r).toBeCloseTo(1, 4);
    expect(rgb110.g).toBeCloseTo(1, 4);
    expect(rgb110.b).toBeCloseTo(0, 4);

    c.changeComponent('RGB-r', 0.9);
    c.changeComponent('RGB-g', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.582041, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.376026, 4);
    let rgb910 = c.getComponent('rgb', true);
    expect(rgb910.r).toBeCloseTo(0.9, 4);
    expect(rgb910.g).toBeCloseTo(0.1, 4);
    expect(rgb910.b).toBeCloseTo(0, 4);
    c.changeComponent('RGB-r', 0.5);
    c.changeComponent('RGB-g', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    let rgb550 = c.getComponent('rgb', true);
    expect(rgb550.r).toBeCloseTo(0.5, 4);
    expect(rgb550.g).toBeCloseTo(0.5, 4);
    expect(rgb550.b).toBeCloseTo(0, 4);
    c.changeComponent('RGB-b', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.388124, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.453671, 4);
    let rgb551 = c.getComponent('rgb', true);
    expect(rgb551.r).toBeCloseTo(0.5, 4);
    expect(rgb551.g).toBeCloseTo(0.5, 4);
    expect(rgb551.b).toBeCloseTo(0.1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    rgb551 = c.getComponent('rgb', true);
    expect(rgb551.r).toBeCloseTo(0.5, 4);
    expect(rgb551.g).toBeCloseTo(0.5, 4);
    expect(rgb551.b).toBeCloseTo(0.1, 4);

    c.changeComponent('rgb', {r:0.1, g:0.2, b:0.3});
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.3, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.3, 4);
  });

  it('should work with RGB colors and non standard white', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 }, { x: 0.31, y: 0.32, Y: 1 } );
    c.changeComponent('RGB-r', 0.5);
    c.changeComponent('RGB-g', 0);
    c.changeComponent('RGB-b', 0);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('RGB-g', 0.5);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('RGB-b', 0.5);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('xy').x).not.toBeCloseTo(0.31, 4); // the set R, G and B most likely won't add up to W when given
    expect(c.getComponent('xy').y).not.toBeCloseTo(0.32, 4); // the set R, G and B most likely won't add up to W when given
    expect(c.getComponent('xy').x).toBeCloseTo(0.33046, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.35346, 4);
  });

  it('should work with RGBW colors', function() {
    // R, G and B is standard, W is different
    let c = new cv.util.Color( { x: 0.64, y: 0.33, Y: 0.2126 }, { x: 0.30, y: 0.60, Y: 0.7152 }, { x: 0.15, y: 0.06, Y: 0.0722 }, { x: 0.31, y: 0.32, Y: 1 } );
    c.changeComponent('RGBW-r', 0);
    c.changeComponent('RGBW-g', 0);
    c.changeComponent('RGBW-b', 0);
    c.changeComponent('RGBW-w', 0);
    expect(c.getComponent('Y')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);

    c.changeComponent('RGBW-r', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0.5, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);

    c.changeComponent('RGBW-r', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    let rgb100 = c.getComponent('rgb', true);
    expect(rgb100.r).toBeCloseTo(1, 4);
    expect(rgb100.g).toBeCloseTo(0, 4);
    expect(rgb100.b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    rgb100 = c.getComponent('rgb', true);
    expect(rgb100.r).toBeCloseTo(1, 4);
    expect(rgb100.g).toBeCloseTo(0, 4);
    expect(rgb100.b).toBeCloseTo(0, 4);

    c.changeComponent('RGBW-g', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    let rgb110 = c.getComponent('rgb', true);
    expect(rgb110.r).toBeCloseTo(1, 4);
    expect(rgb110.g).toBeCloseTo(1, 4);
    expect(rgb110.b).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    rgb110 = c.getComponent('rgb', true);
    expect(rgb110.r).toBeCloseTo(1, 4);
    expect(rgb110.g).toBeCloseTo(1, 4);
    expect(rgb110.b).toBeCloseTo(0, 4);

    c.changeComponent('RGBW-r', 0.9);
    c.changeComponent('RGBW-g', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.582041, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.376026, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.9, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    c.changeComponent('RGBW-r', 0.5);
    c.changeComponent('RGBW-g', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0, 4);
    c.changeComponent('RGBW-b', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.388124, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.453671, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0.0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    c.changeComponent('RGBW-w', 0.2);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0.2, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0.2, 4);

    c.changeComponent('rgb', {r:0.1, g:0.2, b:0.3});
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.3, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0.1, 2); // will only roughly be the right value
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.3, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(0.1, 2); // will only roughly be the right value
  });

  it('should work with HSV colors', function() {
    let c = new cv.util.Color();
    c.changeComponent('h', 0);
    c.changeComponent('s', 0);
    c.changeComponent('v', 0);
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(0, 4);
    expect(c.getComponent('v')).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(0, 4);
    expect(c.getComponent('v')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('v', 1);
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(0, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(0, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);

    c.changeComponent('s', 1);
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('h', 1);
    expect(c.getComponent('h')).toBeCloseTo(1, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h') - (c.getComponent('h') > 0.5 ? 1 : 0)).toBeCloseTo(0, 4); // wrap to 0
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('h', 0.5);
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);
    expect(c.getComponent('xy').x).toBeCloseTo(0.224656, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.328760, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);

    c.changeComponent('sv', [0.5, 0.4]);
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('v')).toBeCloseTo(0.4, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('v')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.4, 4);

    c.changeComponent('hsv', {h: 2/6, s: 0.4, v: 0.3});
    expect(c.getComponent('h')).toBeCloseTo(2/6, 4);
    expect(c.getComponent('s')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('v')).toBeCloseTo(0.3, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(2/6, 4);
    expect(c.getComponent('s')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('v')).toBeCloseTo(0.3, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.18, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.3, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0.18, 4);
  });

  it('should create Color with non default values including white and work with HSV colors', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 }, { x: 0.31, y: 0.32, Y: 1 } );
    c.changeComponent('s', 1);
    c.changeComponent('v', 1);
    c.changeComponent('h', 0.5);
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(1, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);

    c.changeComponent('s', 0);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('h')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('s')).toBeCloseTo(0, 4);
    expect(c.getComponent('v')).toBeCloseTo(1, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0.7277, 4); // given W does not match R+G+B
    expect(c.getComponent('RGB-g')).toBeCloseTo(0.7316, 4); // given W does not match R+G+B
    expect(c.getComponent('RGB-b')).toBeCloseTo(1, 4);      // given W does not match R+G+B
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(1, 4);
  });

  it('should work with color temperature', function() {
    // this test uses a little relaxed precision requirements as the data source
    // might contain slight differences
    let c = new cv.util.Color();
    c.changeComponent('T', 1667);
    expect(c.getComponent('xy').x).toBeCloseTo(0.565045, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.402741, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(1667, 4);

    c.changeComponent('T', 2500);
    expect(c.getComponent('xy').x).toBeCloseTo(0.476996, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.413676, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(2500, 4);

    c.changeComponent('T', 4000);
    expect(c.getComponent('xy').x).toBeCloseTo(0.380440, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.376747, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(4000, 4);

    c.changeComponent('T', 25000);
    expect(c.getComponent('xy').x).toBeCloseTo(0.252520, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.252218, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(25000, 4);

    c.changeComponent('T', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.565045, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.402741, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(1667, 4);

    c.changeComponent('T', 100000);
    expect(c.getComponent('xy').x).toBeCloseTo(0.252520, 3);
    expect(c.getComponent('xy').y).toBeCloseTo(0.252218, 3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('T')).toBeCloseTo(25000, 4);

    c.changeComponent('RGB-r', 1.00);
    c.changeComponent('RGB-g', 0.85);
    c.changeComponent('RGB-b', 0.27);
    expect(c.getComponent('T')).toBeCloseTo(4150, 0);

    // new color with a white with a temperature of (roughly) 6500 K
    const D65_XYZ = {X: 0.95047, Y: 1.00000, Z: 1.08883};
    const D65_xyY = {x: D65_XYZ.X/(D65_XYZ.X+D65_XYZ.Y+D65_XYZ.Z), y: D65_XYZ.Y/(D65_XYZ.X+D65_XYZ.Y+D65_XYZ.Z), Y:1};
    // AdobeRGB 1998 values, to test a not standard color, and still use published values as a reference
    let c2= new cv.util.Color( { x: 0.64, y: 0.33, Y: 0.297361 }, { x: 0.21, y: 0.71, Y: 0.627355 }, { x: 0.15, y: 0.06, Y: 0.075285 }, D65_xyY );
    c2.changeComponent('RGB-r', 1);
    c2.changeComponent('RGB-g', 1);
    c2.changeComponent('RGB-b', 1);
    expect(c2.getComponent('T')).toBeCloseTo(6504, 0); // D65 is closer to 6504 K than 6500 K :)

    c2.changeComponent('RGBW-r', 0);
    c2.changeComponent('RGBW-g', 0);
    c2.changeComponent('RGBW-b', 0);
    c2.changeComponent('RGBW-w', 1);
    expect(c2.getComponent('T')).toBeCloseTo(6504, 0); // D65 is closer to 6504 K than 6500 K :)
  });

  it('should work with LCh colors', function() {
    const D65_XYZ = {X: 0.95047, Y: 1.00000, Z: 1.08883};
    const D65_xyY = {x: D65_XYZ.X/(D65_XYZ.X+D65_XYZ.Y+D65_XYZ.Z), y: D65_XYZ.Y/(D65_XYZ.X+D65_XYZ.Y+D65_XYZ.Z), Y:1};
    // AdobeRGB 1998 values, to test a not standard color, and still use published values as a reference
    let c = new cv.util.Color( { x: 0.64, y: 0.33, Y: 0.297361 }, { x: 0.21, y: 0.71, Y: 0.627355 }, { x: 0.15, y: 0.06, Y: 0.075285 }, D65_xyY );
    c.changeComponent('LCh-L', 0);
    c.changeComponent('LCh-C', 0);
    c.changeComponent('LCh-h', 0);
    expect(c.getComponent('LCh-L')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('Lab').L).toBeCloseTo(0, 3);
    expect(c.getComponent('Lab').a).toBeCloseTo(0, 3);
    expect(c.getComponent('Lab').b).toBeCloseTo(0, 3);
    expect(c.getComponent('xy').x).toBeCloseTo(D65_xyY.x, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(D65_xyY.y, 4);
    expect(c.getComponent('Y')).toBeCloseTo(0, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-b')).toBeCloseTo(0, 4);

    c.changeComponent('LCh-L', 1);
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('Lab').L).toBeCloseTo(100, 4);
    expect(c.getComponent('Lab').a).toBeCloseTo(0, 4);
    expect(c.getComponent('Lab').b).toBeCloseTo(0, 4);
    expect(c.getComponent('xy').x).toBeCloseTo(D65_xyY.x, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(D65_xyY.y, 4);
    expect(c.getComponent('Y')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-r')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-g')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-b')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGBW-w')).toBeCloseTo(1, 4);

    c.changeComponent('LCh-C', 1);
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('Lab').L).toBeCloseTo(100, 4);
    expect(c.getComponent('Lab').a).toBeCloseTo(150, 4);
    expect(c.getComponent('Lab').b).toBeCloseTo(0, 4);
    expect(c.getComponent('xy').x).toBeCloseTo(0.499923, 4); // sRGB white point D65
    expect(c.getComponent('xy').y).toBeCloseTo(0.239406, 4); // sRGB white point D65
    expect(c.getComponent('Y')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo( 3.322491/3.322491, 3); // linear RGB
    expect(c.getComponent('RGB-g')).toBeCloseTo( 0       /3.322491, 3); // linear RGB, clamp of -0.102746
    expect(c.getComponent('RGB-b')).toBeCloseTo( 1.015299/3.322491, 3); // linear RGB

    c.changeComponent('LCh-h', 0.25); // LCh-h = 0.25 === CIE LCh h = 90°
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.25, 4);
    expect(c.getComponent('Lab').L).toBeCloseTo(100, 4);
    expect(c.getComponent('Lab').a).toBeCloseTo(0, 4);
    expect(c.getComponent('Lab').b).toBeCloseTo(150, 4);
    expect(c.getComponent('xy').x).toBeCloseTo(0.483089, 4); // sRGB white point D65
    expect(c.getComponent('xy').y).toBeCloseTo(0.508264, 4); // sRGB white point D65
    expect(c.getComponent('Y')).toBeCloseTo(1, 4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(1, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.25, 4);
    expect(c.getComponent('RGB-r')).toBeCloseTo( 1.369449/1.369449, 3); // linear RGB
    expect(c.getComponent('RGB-g')).toBeCloseTo( 0.955460/1.369449, 3); // linear RGB
    expect(c.getComponent('RGB-b')).toBeCloseTo( 0       /1.369449, 3); // linear RGB, clamp of -0.088333

    // check bijectivity
    c.changeComponent('LCh-L', 0.1);
    c.changeComponent('LCh-C', 0.2);
    c.changeComponent('LCh-h', 0.3);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(0.1, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.3, 4);

    c.changeComponent('LCh-L', 0.4);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0.2, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.3, 4);

    c.changeComponent('LCh-C', 0.5);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.3, 4);

    c.changeComponent('LCh-h', 0.6);
    c.changeComponent('xy', c.getComponent('xy')); // force validation of color
    expect(c.getComponent('LCh-L')).toBeCloseTo(0.4, 4);
    expect(c.getComponent('LCh-C')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('LCh-h')).toBeCloseTo(0.6, 4);
  });

  it('should convert a wavelength to xy coordiantes', function() {
    // As a reference the xy coordinates according to CIE 15: Technical Report: Colorimetry, 3rd edition:
    // 460 nm: 0.14396, 0.02970
    // 500 nm: 0.00817, 0.53842
    // 520 nm: 0.07430, 0.83380
    // 540 nm: 0.22962, 0.75433
    // 620 nm: 0.69150, 0.30834
    // As the algorithm in Color.js is a fit the unit test is against the fit
    let answer = cv.util.Color.wavelength2xy(460);
    expect(answer.x).toBeCloseTo(0.14001, 5);
    expect(answer.y).toBeCloseTo(0.02789, 5);

    answer = cv.util.Color.wavelength2xy(500);
    expect(answer.x).toBeCloseTo(0.00392, 5);
    expect(answer.y).toBeCloseTo(0.54574, 5);

    answer = cv.util.Color.wavelength2xy(520);
    expect(answer.x).toBeCloseTo(0.08103, 5);
    expect(answer.y).toBeCloseTo(0.82037, 5);

    answer = cv.util.Color.wavelength2xy(540);
    expect(answer.x).toBeCloseTo(0.22483, 5);
    expect(answer.y).toBeCloseTo(0.75912, 5);

    answer = cv.util.Color.wavelength2xy(620);
    expect(answer.x).toBeCloseTo(0.69550, 5);
    expect(answer.y).toBeCloseTo(0.30450, 5);
  });

  it('should convert xy to sRGB', function() {
    let answer = cv.util.Color.xy2sRGB({x: 0.312727, y: 0.329023}); // implicit Y = 1
    expect(answer.r).toBeCloseTo(1.0, 3);
    expect(answer.g).toBeCloseTo(1.0, 3);
    expect(answer.b).toBeCloseTo(1.0, 3);

    answer = cv.util.Color.xy2sRGB({x: 0.2, y: 0.2}, 0.2);
    expect(answer.r).toBeCloseTo(0.225306, 3);
    expect(answer.g).toBeCloseTo(0.491527, 3);
    expect(answer.b).toBeCloseTo(0.800490, 3);
  });

  it('should convert according to a curve', function() {
    // test out of range
    expect(cv.util.Color.curve(-1, '', 100)).toBeCloseTo(0.0, 4);
    expect(cv.util.Color.curve( 2, '', 100)).toBeCloseTo(100.0, 4);

    expect(cv.util.Color.curve(0.5, 'log', 100)).toBeCloseTo(89.9657, 4);
    expect(cv.util.Color.curve(0.5, 'exp', 100)).toBeCloseTo( 3.1623, 4);
    expect(cv.util.Color.curve(0.5, [1]  , 255)).toBeCloseTo(127.5, 4);
    expect(cv.util.Color.curve(0.5, [2.2], 255)).toBeCloseTo(186.0837, 4);
    let curve = [0, 0.2, 0.4, 0.7, 1];
    expect(cv.util.Color.curve(0.0, curve, 100)).toBeCloseTo(0, 4);
    expect(cv.util.Color.curve(0.1, curve, 100)).toBeCloseTo(8, 4);
    expect(cv.util.Color.curve(0.2, curve, 100)).toBeCloseTo(16, 4);
    expect(cv.util.Color.curve(0.3, curve, 100)).toBeCloseTo(24, 4);
    expect(cv.util.Color.curve(0.4, curve, 100)).toBeCloseTo(32, 4);
    expect(cv.util.Color.curve(0.5, curve, 100)).toBeCloseTo(40, 4);
    expect(cv.util.Color.curve(0.6, curve, 100)).toBeCloseTo(52, 4);
    expect(cv.util.Color.curve(0.7, curve, 100)).toBeCloseTo(64, 4);
    expect(cv.util.Color.curve(0.8, curve, 100)).toBeCloseTo(76, 4);
    expect(cv.util.Color.curve(0.9, curve, 100)).toBeCloseTo(88, 4);
    expect(cv.util.Color.curve(1.0, curve, 100)).toBeCloseTo(100, 4);
  });

  it('should convert according to a inverted curve', function() {
    // test out of range
    expect(cv.util.Color.invCurve(-1, '', 100)).toBeCloseTo(0.0, 4);
    expect(cv.util.Color.invCurve( 101, '', 100)).toBeCloseTo(1.0, 4);

    expect(cv.util.Color.invCurve(89.9657, 'log', 100)).toBeCloseTo(0.5, 4);
    expect(cv.util.Color.invCurve( 3.1623, 'exp', 100)).toBeCloseTo(0.5, 4);
    expect(cv.util.Color.invCurve(127.5, [1]  , 255)).toBeCloseTo(0.5, 4);
    expect(cv.util.Color.invCurve(186.0837, [2.2], 255)).toBeCloseTo(0.5, 4);
    let curve = [0, 0.2, 0.4, 0.7, 1];
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.0, curve, 100), curve, 100)).toBeCloseTo(0.0, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.1, curve, 100), curve, 100)).toBeCloseTo(0.1, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.2, curve, 100), curve, 100)).toBeCloseTo(0.2, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.3, curve, 100), curve, 100)).toBeCloseTo(0.3, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.4, curve, 100), curve, 100)).toBeCloseTo(0.4, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.5, curve, 100), curve, 100)).toBeCloseTo(0.5, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.6, curve, 100), curve, 100)).toBeCloseTo(0.6, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.7, curve, 100), curve, 100)).toBeCloseTo(0.7, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.8, curve, 100), curve, 100)).toBeCloseTo(0.8, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(0.9, curve, 100), curve, 100)).toBeCloseTo(0.9, 4);
    expect(cv.util.Color.invCurve(cv.util.Color.curve(1.0, curve, 100), curve, 100)).toBeCloseTo(1.0, 4);
  });

  it('should solve 2D equations', function() {
    let answer = cv.util.Color.solve2d(1, 0, 0, 1, 2, 3);
    expect(answer[0]).toBeCloseTo(2, 5);
    expect(answer[1]).toBeCloseTo(3, 5);

    answer = cv.util.Color.solve2d(1, 1, 0, 1, 2, 3);
    expect(answer[0]).toBeCloseTo(2, 5);
    expect(answer[0]+answer[1]).toBeCloseTo(3, 5);
  });

  it('should solve 3D equations', function() {
    let answer = cv.util.Color.solve3d(1, 0, 0, 0, 1, 0, 0, 0, 1, 2, 3, 4);
    expect(answer[0]).toBeCloseTo(2, 5);
    expect(answer[1]).toBeCloseTo(3, 5);
    expect(answer[2]).toBeCloseTo(4, 5);

    answer = cv.util.Color.solve3d(1, 1, 1, 0, 1, 0, 0, 0, 1, 2, 3, 4);
    expect(answer[0]).toBeCloseTo(2, 5);
    expect(answer[0]+answer[1]).toBeCloseTo(3, 5);
    expect(answer[0]+answer[2]).toBeCloseTo(4, 5);
  });
});
