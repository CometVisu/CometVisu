/*
 * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Base class for all time series sources. These classes handle building
 * and processing data from an external time series source to be able
 * to use it in a CometVisu chart component.
 */
qx.Class.define('cv.io.timeseries.AbstractTimeSeriesSource', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(resource) {
    super();
    this.initRawUrl(resource);
    try {
      // in browser only http(s) URLs can be parsed
      const url = new URL('http://' + resource.split('://').pop());
      this.initUrl(url);
    } catch (e) {
      this.error('invalid url '+ resource + ' this source will not be usable!');
      this.initUrl(null);
    }
    this.init();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    url: {
      check: 'URL',
      deferredInit: true,
      nullable: true
    },
    rawUrl: {
      check: 'String',
      deferredInit: true,
      nullable: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _initialized: null,

    init() {
      if (!this._initialized) {
        this._init();
        this._initialized = true;
      }
    },

    _init() {},
    _applySeries() {},

    /**
     * Returns configuration options for a cv.io.Fetch request
     * @param start {Date} start time
     * @param end {Date?} optional end time, if not set its "now"
     * @param series {'hour'|'day'|'week'|'month'|'year'}
     * @param offset {Number} series offset
     * @return {{proxy: boolean, options: {}, url: string}}
     */
    getRequestConfig(start, end, series, offset) {
      return {
        url: '',
        options: {},
        proxy: true
      }
    },

    processResponse(data) {
      return data;
    },

    getTimeRange(start, end) {
      const res = {
        start: null,
        end: null
      }
      if (start) {
        let endTime = end ? this._convertTimes(end) : new Date();
        let startTime = new Date();
        const match = /^end-([\d]*)([\w]+)$/.exec(start);
        if (match) {
          const amount = parseInt(match[1]) || 1;
          let interval = 0;
          switch (match[2]) {
            case 'second':
              interval = 1000;
              break;
            case 'minute':
              interval = 60000;
              break;
            case 'hour':
              interval = 60 * 60000;
              break;
            case 'day':
              interval = 24 * 60 * 60000;
              break;
            case 'week':
              interval = 7 * 24 * 60 * 60000;
              break;
            case 'month':
              interval = 30 * 24 * 60 * 60000;
              break;
            case 'year':
              interval = 365 * 24 * 60 * 60000;
              break;
          }

          startTime.setTime(endTime.getTime() - amount * interval);
        } else if (/^[\d]+$/.test(start)) {
          startTime.setTime(parseInt(start) * 1000);
        }
        res.start = startTime;
        res.end = endTime;
      }
      return res;
    },

    _convertTimes(time) {
      if (time === 'now') {
        return new Date();
      } else if (/^[\d]+$/.test(time)) {
        let d = new Date();
        d.setTime(parseInt(time) * 1000);
        return d;
      }
      return null;
    }
  },
});
