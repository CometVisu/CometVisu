/* IoBrokerSource-spec.js
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
 * Unit tests for cv.io.timeseries.IoBrokerSource
 */
describe('testing cv.io.timeseries.IoBrokerSource', function () {
  let source;

  beforeEach(function () {
    source = new cv.io.timeseries.IoBrokerSource('iobroker://' + encodeURIComponent('test.0.datapoint'));
  });

  afterEach(function () {
    source = null;
  });

  it('should decode the (percent encoded) state id from the resource url', function () {
    const s = new cv.io.timeseries.IoBrokerSource('iobroker://' + encodeURIComponent('ebus.0.Broadcast#x'));
    expect(s.getStateId()).toEqual('ebus.0.Broadcast#x');
  });

  describe('_toNumber', function () {
    it('keeps numbers and maps booleans', function () {
      expect(source._toNumber(42)).toEqual(42);
      expect(source._toNumber(-1.5)).toEqual(-1.5);
      expect(source._toNumber(true)).toEqual(1);
      expect(source._toNumber(false)).toEqual(0);
    });

    it('turns numeric strings into numbers', function () {
      expect(source._toNumber('42')).toEqual(42);
      expect(source._toNumber(' -1.5 ')).toEqual(-1.5);
    });

    it('returns null for a gap (null/undefined)', function () {
      expect(source._toNumber(null)).toBeNull();
      expect(source._toNumber(undefined)).toBeNull();
    });

    it('converts the textual boolean spellings, including the ebus values', function () {
      ['true', 'yes', 'on', 'ja', 'an', 'ein', 'ok', 'present', 'OK', 'Present'].forEach(function (v) {
        expect(source._toNumber(v)).toEqual(1);
      });
      ['false', 'no', 'off', 'nein', 'aus', 'error', 'missing', 'ERROR', 'Missing'].forEach(function (v) {
        expect(source._toNumber(v)).toEqual(0);
      });
    });

    it('returns null for a non-numeric, unknown string (drawn as a gap)', function () {
      expect(source._toNumber('some text')).toBeNull();
    });
  });

  describe('processResponse', function () {
    it('maps history entries to [ts, value] pairs', function () {
      const out = source.processResponse([
        { ts: 1000, val: 21.5 },
        { ts: 2000, val: 'ok' },
        { ts: 3000, val: false }
      ]);
      expect(out).toEqual([
        [1000, 21.5],
        [2000, 1],
        [3000, 0]
      ]);
    });

    it('drops null gaps by default', function () {
      const out = source.processResponse([
        { ts: 1000, val: 1 },
        { ts: 2000, val: null },
        { ts: 3000, val: 2 }
      ]);
      expect(out).toEqual([
        [1000, 1],
        [3000, 2]
      ]);
    });

    it('keeps the null gaps when fillMissing is "none"', function () {
      source.setHistoryOptions({ fill: 'none' });
      const out = source.processResponse([
        { ts: 1000, val: 1 },
        { ts: 2000, val: null },
        { ts: 3000, val: 2 }
      ]);
      expect(out).toEqual([
        [1000, 1],
        [2000, null],
        [3000, 2]
      ]);
    });

    it('returns an empty array for an invalid response', function () {
      expect(source.processResponse(null)).toEqual([]);
      expect(source.processResponse('nonsense')).toEqual([]);
    });
  });

  describe('_getAggregate', function () {
    it('maps consolidation functions to ioBroker aggregations', function () {
      expect(source._getAggregate('MINMAX')).toEqual('minmax');
      expect(source._getAggregate('MEAN')).toEqual('average');
      expect(source._getAggregate('AVERAGE')).toEqual('average');
      expect(source._getAggregate('MIN')).toEqual('min');
      expect(source._getAggregate('NONE')).toEqual('none');
    });

    it('passes through values that are already ioBroker names', function () {
      expect(source._getAggregate('minmax')).toEqual('minmax');
      expect(source._getAggregate('integral')).toEqual('integral');
    });

    it('falls back to "average" for an unknown function', function () {
      expect(source._getAggregate('bogus')).toEqual('average');
    });
  });

  describe('_getHistoryOptions', function () {
    it('translates the aggregate and parses the step', function () {
      source.setHistoryOptions({ aggregate: 'MINMAX', step: '300000' });
      const opts = source._getHistoryOptions();
      expect(opts.aggregate).toEqual('minmax');
      expect(opts.step).toEqual(300000);
    });

    it('maps fillMissing to ignoreNull', function () {
      source.setHistoryOptions({ fill: 'none' });
      expect(source._getHistoryOptions().ignoreNull).toBe(false);
      source.setHistoryOptions({ fill: 'linear' });
      expect(source._getHistoryOptions().ignoreNull).toBe(true);
    });

    it('drops the step for aggregate "none"', function () {
      source.setHistoryOptions({ aggregate: 'NONE', step: '300000' });
      const opts = source._getHistoryOptions();
      expect(opts.aggregate).toEqual('none');
      expect(opts.step).toBeUndefined();
    });

    it('drops a non-positive step', function () {
      source.setHistoryOptions({ aggregate: 'AVERAGE', step: '0' });
      expect(source._getHistoryOptions().step).toBeUndefined();
    });
  });

  describe('getTimeRange', function () {
    it('resolves a relative "end-Nunit" start against the end', function () {
      const range = source.getTimeRange('end-3day', 'now');
      expect(range.start instanceof Date).toBe(true);
      expect(range.end instanceof Date).toBe(true);
      const diffDays = (range.end.getTime() - range.start.getTime()) / (24 * 60 * 60000);
      expect(Math.round(diffDays)).toEqual(3);
    });

    it('reads a unix timestamp start', function () {
      const range = source.getTimeRange('1600000000', 'now');
      expect(range.start.getTime()).toEqual(1600000000 * 1000);
    });

    it('returns nulls without a start', function () {
      expect(source.getTimeRange(null)).toEqual({ start: null, end: null });
    });
  });
});
