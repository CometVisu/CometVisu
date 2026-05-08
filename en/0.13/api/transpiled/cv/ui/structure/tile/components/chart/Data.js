function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.ui.structure.tile.components.chart.LineDataset": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Data.js
   *
   * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.Data', {
    extend: qx.core.Object,
    construct: function construct(chart) {
      qx.core.Object.constructor.call(this);
      this.data = [];
      this.times = [];
      this.values = [];
      this.keys = [];
      this.titles = [];
      this.lineIndices = [];
      this.lineData = [];
      this.lineKeys = [];
      this.lineTitles = [];
      this.lineTimes = [];
      this.lineValues = [];
      this._chart = chart;
      this.__P_90_0 = new Map();
    },
    properties: {
      minY: {
        check: 'Number',
        nullable: true,
        apply: '_applyMinMax'
      },
      maxY: {
        check: 'Number',
        nullable: true,
        apply: '_applyMinMax'
      }
    },
    members: {
      data: null,
      times: null,
      // X
      values: null,
      // Y
      keys: null,
      // Z
      titles: null,
      // T
      indices: null,
      // I
      _chart: null,
      lineData: null,
      lineTimes: null,
      lineValues: null,
      lineKeys: null,
      lineIndices: null,
      __P_90_0: null,
      setData: function setData(data) {
        var _this = this;
        this.data = data; // Omit any data from v-/h-line-datasets
        var chartKeys = new Set();
        var hasLineData = false;
        for (var i = 0; i < data.length; i++) {
          var ds = this._chart.getDataset(data[i].key);
          if (!(ds instanceof cv.ui.structure.tile.components.chart.LineDataset)) {
            chartKeys.add(data[i].key);
          } else {
            hasLineData = true;
          }
          data[i].time = Math.floor(Number(data[i].time) / 1000) * 1000; // round ms to full seconds, they are not needed and create problems bar charts
        }
        this.indices = d3.range(data.length).filter(function (i) {
          return chartKeys.has(data[i].key);
        });
        this.data = data.filter(function (d) {
          return chartKeys.has(d.key);
        });
        this.keys = d3.map(data.filter(function (d) {
          return chartKeys.has(d.key);
        }), function (d) {
          return d.key;
        }); // given d in data, returns the (categorical) z-value
        this.titles = d3.map(data.filter(function (d) {
          return chartKeys.has(d.key);
        }), function (d) {
          return d.src;
        });
        this.times = d3.map(data.filter(function (d) {
          return chartKeys.has(d.key);
        }), function (d) {
          return d.time;
        }); // given d in data, returns the (temporal) x-value
        this.values = d3.map(data.filter(function (d) {
          return chartKeys.has(d.key);
        }), function (d) {
          return d.value;
        }); // given d in data, returns the (quantitative) y-value

        if (hasLineData) {
          this.lineIndices = d3.range(this.data.length).filter(function (i) {
            return !chartKeys.has(_this.keys[i]);
          });
          this.lineData = data.filter(function (d) {
            return !chartKeys.has(d.key);
          });
          this.lineKeys = d3.map(data.filter(function (d) {
            return !chartKeys.has(d.key);
          }), function (d) {
            return d.key;
          });
          this.lineTitles = d3.map(data.filter(function (d) {
            return !chartKeys.has(d.key);
          }), function (d) {
            return d.src;
          });
          this.lineTimes = d3.map(data.filter(function (d) {
            return !chartKeys.has(d.key);
          }), function (d) {
            return d.time;
          });
          this.lineValues = d3.map(data.filter(function (d) {
            return !chartKeys.has(d.key);
          }), function (d) {
            return d.value;
          });
        } else {
          this.lineIndices = [];
          this.lineData = [];
          this.lineKeys = [];
          this.lineTitles = [];
          this.lineTimes = [];
          this.lineValues = [];
        }
        this.__P_90_0.clear();
      },
      /**
       * Interpolates the data for the given time interval. Used to
       * convert a time-base series of data for a d3.scaleBand as its
       * used in bar charts
       * @param {'hour'|'day'|'week'|'month'|'year'} series 
       */
      interpolate: function interpolate(series) {
        var _this2 = this;
        var intervalFunction = null;
        switch (series) {
          case 'hour':
            intervalFunction = d3.timeMinute;
            break;
          case 'day':
            intervalFunction = d3.timeHour;
            break;
          case 'week':
            intervalFunction = d3.timeDay;
            break;
          case 'month':
            intervalFunction = d3.timeDay;
            break;
          case 'year':
            intervalFunction = d3.timeMonth;
        }
        var lastTime = 0;
        var lastKey;
        var _loop = function _loop(i) {
          var time = _this2.times[i];
          var key = _this2.keys[i];
          if (lastTime > 0 && lastKey === key) {
            var gapTimes = intervalFunction.every(1).range(new Date(lastTime), new Date(time));
            gapTimes.pop(); // remove last one as its our current time
            if (gapTimes.length > 1) {
              var _this2$times, _this2$values, _this2$keys, _this2$data, _this2$titles, _this2$indices;
              (_this2$times = _this2.times).splice.apply(_this2$times, [i, 0].concat(_toConsumableArray(gapTimes.map(function (t) {
                return t.getTime();
              }))));
              (_this2$values = _this2.values).splice.apply(_this2$values, [i, 0].concat(_toConsumableArray(gapTimes.map(function () {
                return 0;
              }))));
              (_this2$keys = _this2.keys).splice.apply(_this2$keys, [i, 0].concat(_toConsumableArray(gapTimes.map(function () {
                return key;
              }))));
              (_this2$data = _this2.data).splice.apply(_this2$data, [i, 0].concat(_toConsumableArray(gapTimes.map(function (t) {
                return {
                  key: key,
                  src: _this2.titles[i - 1],
                  time: t.getTime(),
                  value: 0
                };
              }))));
              (_this2$titles = _this2.titles).splice.apply(_this2$titles, [i, 0].concat(_toConsumableArray(gapTimes.map(function () {
                return _this2.titles[i - 1];
              }))));
              (_this2$indices = _this2.indices).splice.apply(_this2$indices, [i, 0].concat(_toConsumableArray(gapTimes.map(function (_, k) {
                return i + k;
              }))));
            }
          }
          lastTime = time;
          lastKey = key;
        };
        for (var i = 0; i < this.times.length; i++) {
          _loop(i);
        }
        this.__P_90_0.clear();
      },
      append: function append(data) {
        if (this.times[this.times.length - 1] > data.time) {
          // do not accept times that are older that our last one
          return false;
        }
        if (this.times[this.times.length - 1] === data.time) {
          // replace last value instead of adding one
          this.values[this.values.length - 1] = data.value;
          this.__P_90_0["delete"]('value');
        } else {
          this.times.push(data.time);
          this.values.push(data.value);
          this.keys.push(data.key);
          this.titles.push(data.src);
          this.data.push(data);

          // cleanup
          this.times.shift();
          this.values.shift();
          this.keys.shift();
          this.data.shift();
          this.titles.shift();
          this.__P_90_0.clear();
        }
        return true;
      },
      _applyMinMax: function _applyMinMax() {
        // invalidate values min/max
        this.__P_90_0["delete"]('values');
      },
      getTimesDomain: function getTimesDomain() {
        if (!this.__P_90_0.has('times')) {
          this.__P_90_0.set('times', d3.extent(this.times));
        }
        return this.__P_90_0.get('times');
      },
      getValuesDomain: function getValuesDomain() {
        if (!this.__P_90_0.has('values')) {
          var minVal = 0;
          var maxVal = 0;
          if (this.getMinY() !== null) {
            minVal = this.getMinY();
          } else {
            minVal = this.values.length > 0 ? d3.min(this.values) : 0;
            if (minVal > 1.0) {
              minVal -= 1;
            }
          }
          if (this.getMaxY() !== null) {
            maxVal = this.getMaxY();
          } else {
            maxVal = this.values.length > 0 ? d3.max(this.values) : 0;
            if (maxVal > 1.0) {
              // add some inner chart padding
              maxVal += 1;
            } else {
              maxVal += 0.1;
            }
          }
          this.__P_90_0.set('values', [minVal, maxVal]);
        }
        return this.__P_90_0.get('values');
      },
      getKeysDomain: function getKeysDomain() {
        if (!this.__P_90_0.has('keys')) {
          this.__P_90_0.set('keys', new d3.InternSet(this.keys));
        }
        return this.__P_90_0.get('keys');
      },
      getIndicesForKey: function getIndicesForKey(key) {
        var onlyWithValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (this.lineKeys.includes(key)) {
          return this.getLineIndicesForKey(key, onlyWithValues);
        }
        var indices = [];
        for (var i = 0; i < this.keys.length; i++) {
          if (this.keys[i] === key && (!onlyWithValues || this.values[i] !== undefined)) {
            indices.push(i);
          }
        }
        return indices;
      },
      getLineIndicesForKey: function getLineIndicesForKey(key) {
        var onlyWithValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var indices = [];
        for (var i = 0; i < this.lineKeys.length; i++) {
          if (this.lineKeys[i] === key && (!onlyWithValues || this.lineValues[i] !== undefined)) {
            indices.push(i);
          }
        }
        return indices;
      }
    }
  });
  cv.ui.structure.tile.components.chart.Data.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Data.js.map?dt=1778272816970