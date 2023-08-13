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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
    construct: function construct(resource) {
      qx.core.Object.constructor.call(this);
      this.initRawUrl(resource);
      try {
        // in browser only http(s) URLs can be parsed
        var url = new URL('http://' + resource.split('://').pop());
        this.initUrl(url);
      } catch (e) {
        this.error('invalid url ' + resource + ' this source will not be usable!');
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
      init: function init() {
        if (!this._initialized) {
          this._init();
          this._initialized = true;
        }
      },
      _init: function _init() {},
      _applySeries: function _applySeries() {},
      /**
       * Returns configuration options for a cv.io.Fetch request
       * @param start {Date} start time
       * @param end {Date?} optional end time, if not set its "now"
       * @param series {'hour'|'day'|'week'|'month'|'year'}
       * @param offset {Number} series offset
       * @return {{proxy: boolean, options: {}, url: string}}
       */
      getRequestConfig: function getRequestConfig(start, end, series, offset) {
        return {
          url: '',
          options: {},
          proxy: true
        };
      },
      processResponse: function processResponse(data) {
        return data;
      },
      getTimeRange: function getTimeRange(start, end) {
        var res = {
          start: null,
          end: null
        };
        if (start) {
          var endTime = end ? this._convertTimes(end) : new Date();
          var startTime = new Date();
          var match = /^end-([\d]*)([\w]+)$/.exec(start);
          if (match) {
            var amount = parseInt(match[1]) || 1;
            var interval = 0;
            switch (match[2]) {
              case 'second':
                interval = 1000;
                break;
              case 'minute':
                interval = 60000;
                break;
              case 'hour':
                interval = 3600000;
                break;
              case 'day':
                interval = 86400000;
                break;
              case 'week':
                interval = 604800000;
                break;
              case 'month':
                interval = 2592000000;
                break;
              case 'year':
                interval = 31536000000;
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
      _convertTimes: function _convertTimes(time) {
        if (time === 'now') {
          return new Date();
        } else if (/^[\d]+$/.test(time)) {
          var d = new Date();
          d.setTime(parseInt(time) * 1000);
          return d;
        }
        return null;
      }
    }
  });
  cv.io.timeseries.AbstractTimeSeriesSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractTimeSeriesSource.js.map?dt=1691935457853