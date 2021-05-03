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
    c.changeComponent('r', 1);
    c.changeComponent('g', 0);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 1);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.30, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.60, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 0);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.15, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.06, 4);
    c.changeComponent('r', 1);
    c.changeComponent('g', 1);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.3127, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.3290, 4);
  });

  it('should create Color with non default values but no white', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 } );
    expect(c.getComponent('hsv')).toEqual({h: 0, s: 0, v: 0});
    c.changeComponent('r', 1);
    c.changeComponent('g', 0);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.65, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.34, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 1);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.61, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 0);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.16, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.07, 4);
    c.changeComponent('r', 1);
    c.changeComponent('g', 1);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.3305, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.3535, 4);
  });

  it('should create Color with non default values including white', function() {
    let c = new cv.util.Color( { x: 0.65, y: 0.34, Y: 0.2126 }, { x: 0.31, y: 0.61, Y: 0.7152 }, { x: 0.16, y: 0.07, Y: 0.0722 }, { x: 0.31, y: 0.32, Y: 1 } );
    expect(c.getComponent('hsv')).toEqual({h: 0, s: 0, v: 0});
    c.changeComponent('r', 1);
    c.changeComponent('g', 0);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.65, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.34, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 1);
    c.changeComponent('b', 0);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.61, 4);
    c.changeComponent('r', 0);
    c.changeComponent('g', 0);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.16, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.07, 4);
    /* TODO
    c.changeComponent('r', 1);
    c.changeComponent('g', 1);
    c.changeComponent('b', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.31, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.32, 4);
     */
  });

  it('should work with RGB colors', function() {
    let c = new cv.util.Color();
    c.changeComponent('r', 0);
    c.changeComponent('g', 0);
    c.changeComponent('b', 0);
    expect(c.getComponent('Y')).toBeCloseTo(0, 4);
    expect(c.getComponent('r')).toBeCloseTo(0, 4);
    expect(c.getComponent('g')).toBeCloseTo(0, 4);
    expect(c.getComponent('b')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);

    c.changeComponent('r', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('r')).toBeCloseTo(0.5, 4);
    expect(c.getComponent('g')).toBeCloseTo(0, 4);
    expect(c.getComponent('b')).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').r).toBeCloseTo(0.5, 4);
    expect(c.getComponent('rgb').g).toBeCloseTo(0, 4);
    expect(c.getComponent('rgb').b).toBeCloseTo(0, 4);

    c.changeComponent('r', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.64, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.33, 4);
    expect(c.getComponent('r')).toBeCloseTo(1, 4);
    expect(c.getComponent('g')).toBeCloseTo(0, 4);
    expect(c.getComponent('b')).toBeCloseTo(0, 4);
    let rgb100 = c.getComponent('rgb', true);
    expect(rgb100.r).toBeCloseTo(1, 4);
    expect(rgb100.g).toBeCloseTo(0, 4);
    expect(rgb100.b).toBeCloseTo(0, 4);

    c.changeComponent('g', 1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    expect(c.getComponent('r')).toBeCloseTo(1, 4);
    expect(c.getComponent('g')).toBeCloseTo(1, 4);
    expect(c.getComponent('b')).toBeCloseTo(0, 4);
    let rgb110 = c.getComponent('rgb', true);
    expect(rgb110.r).toBeCloseTo(1, 4);
    expect(rgb110.g).toBeCloseTo(1, 4);
    expect(rgb110.b).toBeCloseTo(0, 4);

    c.changeComponent('r', 0.9);
    c.changeComponent('g', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.582041, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.376026, 4);
    let rgb910 = c.getComponent('rgb', true);
    expect(rgb910.r).toBeCloseTo(0.9, 4);
    expect(rgb910.g).toBeCloseTo(0.1, 4);
    expect(rgb910.b).toBeCloseTo(0, 4);
    c.changeComponent('r', 0.5);
    c.changeComponent('g', 0.5);
    expect(c.getComponent('xy').x).toBeCloseTo(0.419320, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.505246, 4);
    let rgb550 = c.getComponent('rgb', true);
    expect(rgb550.r).toBeCloseTo(0.5, 4);
    expect(rgb550.g).toBeCloseTo(0.5, 4);
    expect(rgb550.b).toBeCloseTo(0, 4);
    c.changeComponent('b', 0.1);
    expect(c.getComponent('xy').x).toBeCloseTo(0.388124, 4);
    expect(c.getComponent('xy').y).toBeCloseTo(0.453671, 4);
    let rgb551 = c.getComponent('rgb', true);
    expect(rgb551.r).toBeCloseTo(0.5, 4);
    expect(rgb551.g).toBeCloseTo(0.5, 4);
    expect(rgb551.b).toBeCloseTo(0.1, 4);
  });
});
