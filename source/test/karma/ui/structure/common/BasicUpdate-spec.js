/* basucUpdate-spec.js
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

describe('testing the basic update mixin', function() {
  afterEach(function() {
    delete cv.Config.configSettings.mappings.test;
  });

  it('should test the mapping', function () {
    cv.Config.addMapping('test', {
      '0': 'OFF',
      '1': 'ON',
      'defaultValue': -1
    });
    var trigger = new cv.ui.structure.pure.Trigger({
      path: 'id_0',
      $$type: 'trigger',
      value: '0'
    });

    expect(trigger.applyMapping('0', 'test')).toBe('OFF');
    expect(trigger.applyMapping('1', 'test')).toBe('ON');
    expect(trigger.applyMapping(0, 'test')).toBe('OFF');
    expect(trigger.applyMapping(1, 'test')).toBe('ON');
    expect(trigger.applyMapping(null, 'test')).toBe(-1);
  });

  it('should test the range mapping', function () {
    cv.Config.addMapping('test', {
      'range': {
        '0': [99, 'range1'],
        '100': [1000, 'range2']
      }
    });
    var trigger = new cv.ui.structure.pure.Trigger({
      path: 'id_0',
      $$type: 'trigger',
      value: '0'
    });

    expect(trigger.applyMapping('0', 'test')).toBe('range1');
    expect(trigger.applyMapping('50', 'test')).toBe('range1');
    expect(trigger.applyMapping(0, 'test')).toBe('range1');
    expect(trigger.applyMapping(50, 'test')).toBe('range1');
    expect(trigger.applyMapping('100', 'test')).toBe('range2');
    expect(trigger.applyMapping('150', 'test')).toBe('range2');
    expect(trigger.applyMapping(100, 'test')).toBe('range2');
    expect(trigger.applyMapping(150, 'test')).toBe('range2');
    expect(trigger.applyMapping(1500, 'test')).toBe(1500);
  });

  it('should test the NULL and * mapping', function () {
    cv.Config.addMapping('test', {
      'NULL': 'no value',
      '*': 'catch all'
    });
    var trigger = new cv.ui.structure.pure.Trigger({
      path: 'id_0',
      $$type: 'trigger',
      value: '0'
    });

    expect(trigger.applyMapping(null, 'test')).toBe('no value');
    expect(trigger.applyMapping('0', 'test')).toBe('catch all');
    expect(trigger.applyMapping('test', 'test')).toBe('catch all');
    expect(trigger.applyMapping(undefined, 'test')).toBe('catch all');
  });

  it('should test the formula mapping', function () {
    cv.Config.addMapping('test', {
      'formula': function(val) {
        return val + 10;
      }
    });
    var trigger = new cv.ui.structure.pure.Trigger({
      path: 'id_0',
      $$type: 'trigger',
      value: '0'
    });

    expect(trigger.applyMapping(10, 'test')).toBe(20);
  });
});
