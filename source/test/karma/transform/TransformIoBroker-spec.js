/* TransformIoBroker-spec.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Test the ioBroker transforms
 */
describe('checking ioBroker transforms', function () {
  // referencing the class makes sure it is loaded and its defer() has registered the IOB transforms
  it('should treat the ioBroker "no value" markers as undefined', function () {
    ['NaN', 'Uninitialized', 'NULL', 'UNDEF', undefined, null].forEach(function (v) {
      expect(cv.transforms.IoBroker.isUndefined(v)).toBe(true);
    });
    expect(cv.transforms.IoBroker.isUndefined(0)).toBe(false);
    expect(cv.transforms.IoBroker.isUndefined('abc')).toBe(false);
  });

  it('should transform IOB_Number values', function () {
    expect(cv.Transform.encode({ transform: 'IOB:number' }, 42)).toEqual(42);
    expect(cv.Transform.encode({ transform: 'IOB:number' }, '42')).toEqual(42); // misuse robustness
    expect(cv.Transform.encode({ transform: 'IOB:number' }, -1.5)).toEqual(-1.5);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, 42)).toEqual(42);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, '42')).toEqual(42);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, -1.5)).toEqual(-1.5);
  });

  it('should decode the ioBroker "no value" markers as 0 for IOB_Number', function () {
    expect(cv.Transform.decode({ transform: 'IOB:number' }, null)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, undefined)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, 'NULL')).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:number' }, 'Uninitialized')).toEqual(0);
  });

  it('should transform IOB_String values', function () {
    expect(cv.Transform.encode({ transform: 'IOB:string' }, 'abc')).toEqual('abc');
    expect(cv.Transform.encode({ transform: 'IOB:string' }, 12)).toEqual('12'); // misuse robustness
    expect(cv.Transform.decode({ transform: 'IOB:string' }, 'abc')).toEqual('abc');
    expect(cv.Transform.decode({ transform: 'IOB:string' }, 12)).toEqual('12');
  });

  it('should decode the ioBroker "no value" markers as an empty string for IOB_String', function () {
    expect(cv.Transform.decode({ transform: 'IOB:string' }, null)).toEqual('');
    expect(cv.Transform.decode({ transform: 'IOB:string' }, undefined)).toEqual('');
    expect(cv.Transform.decode({ transform: 'IOB:string' }, 'UNDEF')).toEqual('');
  });

  it('should encode IOB_Switch to a boolean (ioBroker switches are boolean datapoints)', function () {
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, 1)).toBe(true);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, '1')).toBe(true);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, true)).toBe(true);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, 'true')).toBe(true);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, 0)).toBe(false);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, '0')).toBe(false);
    expect(cv.Transform.encode({ transform: 'IOB:switch' }, false)).toBe(false);
  });

  it('should decode IOB_Switch to 1 or 0', function () {
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, true)).toEqual(1);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, 1)).toEqual(1);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, '1')).toEqual(1);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, 'true')).toEqual(1);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, false)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, 0)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, '0')).toEqual(0);
  });

  it('should decode the ioBroker "no value" markers as 0 for IOB_Switch', function () {
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, null)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, undefined)).toEqual(0);
    expect(cv.Transform.decode({ transform: 'IOB:switch' }, 'NULL')).toEqual(0);
  });
});
