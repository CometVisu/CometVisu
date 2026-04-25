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

  construct(chart) {
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
    this.__domains = new Map();
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
    times: null, // X
    values: null, // Y
    keys: null, // Z
    titles: null, // T
    indices: null, // I
    _chart: null,

    lineData: null,
    lineTimes: null,
    lineValues: null,
    lineKeys: null,
    lineIndices: null,

    __domains: null,

    setData(data) {
      this.data = data;      // Omit any data from v-/h-line-datasets
      const chartKeys = new Set();
      let hasLineData = false;
      for (let i = 0; i < data.length; i++) {
        const ds = this._chart.getDataset(data[i].key);
        if (!(ds instanceof cv.ui.structure.tile.components.chart.LineDataset)) {
          chartKeys.add(data[i].key);
        } else {
          hasLineData = true; 
        }
        data[i].time = Math.floor(Number(data[i].time) / 1000) * 1000; // round ms to full seconds, they are not needed and create problems bar charts
      }
      this.indices = d3.range(data.length).filter(i => chartKeys.has(data[i].key));
      this.data = data.filter(d => chartKeys.has(d.key));
      this.keys = d3.map(data.filter(d => chartKeys.has(d.key)), d => d.key); // given d in data, returns the (categorical) z-value
      this.titles = d3.map(data.filter(d => chartKeys.has(d.key)), d => d.src);
      this.times = d3.map(data.filter(d => chartKeys.has(d.key)), d => d.time); // given d in data, returns the (temporal) x-value
      this.values = d3.map(data.filter(d => chartKeys.has(d.key)), d => d.value); // given d in data, returns the (quantitative) y-value

      if (hasLineData) {
        this.lineIndices = d3.range(this.data.length).filter(i => !chartKeys.has(this.keys[i]));
        this.lineData = data.filter(d => !chartKeys.has(d.key));
        this.lineKeys = d3.map(data.filter(d => !chartKeys.has(d.key)), d => d.key);
        this.lineTitles = d3.map(data.filter(d => !chartKeys.has(d.key)), d => d.src);
        this.lineTimes = d3.map(data.filter(d => !chartKeys.has(d.key)), d => d.time);
        this.lineValues = d3.map(data.filter(d => !chartKeys.has(d.key)), d => d.value);
      } else {
        this.lineIndices = [];
        this.lineData = [];
        this.lineKeys = [];
        this.lineTitles = [];
        this.lineTimes = [];
        this.lineValues = [];
      }

      this.__domains.clear();
    },

    /**
     * Interpolates the data for the given time interval. Used to
     * convert a time-base series of data for a d3.scaleBand as its
     * used in bar charts
     * @param {'hour'|'day'|'week'|'month'|'year'} series 
     */
    interpolate(series) {
      let intervalFunction = null;
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

      
      let lastTime = 0;
      let lastKey;
      for (let i = 0; i < this.times.length; i++) {
        const time = this.times[i];
        const key = this.keys[i];
        if (lastTime > 0 && lastKey === key) {
          const gapTimes = intervalFunction.every(1).range(new Date(lastTime), new Date(time));
          gapTimes.pop(); // remove last one as its our current time
          if (gapTimes.length > 1) {
            this.times.splice(i, 0, ...gapTimes.map(t => t.getTime()));
            this.values.splice(i, 0, ...gapTimes.map(() => 0));
            this.keys.splice(i, 0, ...gapTimes.map(() => key));
            this.data.splice(i, 0, ...gapTimes.map(t => ({
              key: key,
              src: this.titles[i - 1],
              time: t.getTime(),
              value: 0
            })));
            this.titles.splice(i, 0, ...gapTimes.map(() => this.titles[i - 1]));
            this.indices.splice(i, 0, ...gapTimes.map((_, k) => i+k));
          }
        }
        lastTime = time;
        lastKey = key;
      }
      this.__domains.clear();
    },

    append(data) {
      if (this.times[this.times.length - 1] > data.time) {
        // do not accept times that are older that our last one
        return false;
      }
      if (this.times[this.times.length - 1] === data.time) {
        // replace last value instead of adding one
        this.values[this.values.length - 1] = data.value;
        this.__domains.delete('value');
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

        this.__domains.clear();
      }
      return true;
    },

    _applyMinMax() {
      // invalidate values min/max
      this.__domains.delete('values');
    },

    getTimesDomain() {
      if (!this.__domains.has('times')) {
        this.__domains.set('times', d3.extent(this.times));
      }
      return this.__domains.get('times');
    },

    getValuesDomain() {
      if (!this.__domains.has('values')) {
        let minVal = 0;
        let maxVal = 0;
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
        this.__domains.set('values', [minVal, maxVal]);
      }
      return this.__domains.get('values');
    },

    getKeysDomain() {
      if (!this.__domains.has('keys')) {
        this.__domains.set('keys', new d3.InternSet(this.keys));
      }
      return this.__domains.get('keys');
    },

    getIndicesForKey(key, onlyWithValues = true) {
      if (this.lineKeys.includes(key)) {
        return this.getLineIndicesForKey(key, onlyWithValues);
      }
      const indices = [];
      for (let i = 0; i < this.keys.length; i++) {
        if (this.keys[i] === key && (!onlyWithValues || this.values[i] !== undefined)) {
          indices.push(i);
        }
      }
      return indices;
    },

    getLineIndicesForKey(key, onlyWithValues = true) {
      const indices = [];
      for (let i = 0; i < this.lineKeys.length; i++) {
        if (this.lineKeys[i] === key && (!onlyWithValues || this.lineValues[i] !== undefined)) {
          indices.push(i);
        }
      }
      return indices;
    }
  }
});
