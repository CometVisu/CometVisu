/* BasicUpdate-spec.js 
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
  });  it('should show a placeholder for values that have not been received yet', function () {
    var info = new cv.ui.structure.pure.Info({
      path: 'id_0',
      $$type: 'info',
      format: '%1$.1f °C => %2$.1f °C',
      address: {
        'first': { formatPos: 1 },
        'second': { formatPos: 2 }
      }
    });

    // the values arrive one address at a time, the known one is shown right away
    expect(info.applyFormat('first', 19)).toBe('19.0 °C => - °C');
    expect(info.applyFormat('second', 21)).toBe('19.0 °C => 21.0 °C');
    // an update of a single address keeps both values
    expect(info.applyFormat('first', 20)).toBe('20.0 °C => 21.0 °C');
  });

  it('should show a placeholder for a missing string value', function () {
    var info = new cv.ui.structure.pure.Info({
      path: 'id_0',
      $$type: 'info',
      format: '%1$s / %2$s',
      address: {
        'first': { formatPos: 1 },
        'second': { formatPos: 2 }
      }
    });

    expect(info.applyFormat('first', 'on')).toBe('on / -');
  });

  it('should keep a literal percent sign', function () {
    var info = new cv.ui.structure.pure.Info({
      path: 'id_0',
      $$type: 'info',
      format: '%1$d %% of %2$d',
      address: {
        'first': { formatPos: 1 },
        'second': { formatPos: 2 }
      }
    });

    expect(info.applyFormat('first', 40)).toBe('40 % of -');
    expect(info.applyFormat('second', 100)).toBe('40 % of 100');
  });

  it('should format a single value without positions as before', function () {
    var info = new cv.ui.structure.pure.Info({
      path: 'id_0',
      $$type: 'info',
      format: '%.1f °C',
      address: { 'only': { formatPos: 1 } }
    });

    expect(info.applyFormat('only', 19)).toBe('19.0 °C');
  });

  it('should only replace the placeholders of missing positions', function () {
    var replace = cv.ui.common.BasicUpdate.replaceMissingFormatValues;
    var format = '%1$.1f °C => %2$.1f °C';
    // index 0 holds the format itself, so the values start at index 1
    expect(replace(format, [format, 19, 21], '-')).toBe(format);
    expect(replace(format, [format, 19], '-')).toBe('%1$.1f °C => - °C');
    expect(replace(format, [format], '-')).toBe('- °C => - °C');
    expect(replace('%.1f °C', [format], '-')).toBe('%.1f °C');
  });
  it('should hand out a fresh placeholder regex for every scan', function () {
    // A global regex keeps its own lastIndex. Sharing one instance would make a scan that was left
    // half way move the starting point of the next one.
    var first = cv.ui.common.BasicUpdate.placeholderRegex();
    var second = cv.ui.common.BasicUpdate.placeholderRegex();

    expect(first).not.toBe(second);
    expect(first.global).toBe(true);
    expect(cv.ui.common.BasicUpdate.PLACEHOLDER_REGEX.global).toBe(false);

    first.exec('%1$s %2$s');

    expect(first.lastIndex).toBeGreaterThan(0);
    expect(cv.ui.common.BasicUpdate.placeholderRegex().lastIndex).toBe(0);
  });

  it('should recognize exactly the placeholders that sprintf-js recognizes', function () {
    // Our regex is a copy of the placeholder syntax of sprintf-js. This test compares it against
    // that library's own parser, so an update that changes the syntax fails here instead of making
    // replaceMissingFormatValues() silently miss or mangle placeholders.
    expect(typeof sprintf.parse).toBe('function');

    // ask the installed version which conversion characters it accepts, so the corpus grows
    // automatically when a newer version adds some (1.1.x added 't', 'T' and 'v')
    var supported = 'bcdiefgjostTuvxX'.split('').filter(function (type) {
      try {
        sprintf.parse('%1$' + type);
        return true;
      } catch (e) {
        return false;
      }
    });
    expect(supported.length).toBeGreaterThan(0);

    var formats = supported.map(function (type) {
      return '%1$' + type;
    });
    formats = formats.concat([
      '%s',
      '%1$s',
      '%2$s %1$s',
      '%1$.1f °C => %2$.1f °C',
      '%1$+d',
      '%1$05d',
      "%1$'x8d",
      '%1$-8s|',
      '%1$8.3f',
      '%(name)s',
      '%(a.b)s %(c)d',
      'no placeholder at all',
      '%% literal',
      '%1$d %% of %2$d'
    ]);

    // what sprintf-js itself considers a placeholder - the node shape differs between versions
    // (1.0.x hands out the raw match array, 1.1.x an object), the syntax is what matters here
    var placeholdersOfSprintfJs = function (format) {
      return sprintf.parse(format)
        .filter(function (node) {
          return typeof node !== 'string';
        })
        .map(function (node) {
          return Array.isArray(node)
            ? { text: node[0], position: node[1] }
            : { text: node.placeholder, position: node.param_no };
        });
    };

    // what our own regex finds, "%%" is a literal on both sides
    var placeholdersOfRegex = function (format) {
      var found = [];
      var regex = cv.ui.common.BasicUpdate.placeholderRegex();
      var match = regex.exec(format);
      while (match !== null) {
        if (match[0] !== '%%') {
          found.push({ text: match[0], position: match[1] });
        }
        match = regex.exec(format);
      }
      return found;
    };

    var total = 0;
    formats.forEach(function (format) {
      var expected = placeholdersOfSprintfJs(format);
      total += expected.length;
      expect(placeholdersOfRegex(format)).toEqual(expected, 'differing placeholders for ' + format);
    });
    // guard against a test that silently compares nothing
    expect(total).toBeGreaterThan(formats.length);
  });
});
