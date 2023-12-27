function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
      this.initConfig(resource);
      this.init();
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      urlRegex: /^(flux|openhab|rrd|demo):\/\/((\w+)@)?([^\/]+)(\/[^?]*)?\??(.*)/
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      config: {
        transform: '_parseResourceUrl',
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
      _url: null,
      init: function init() {
        if (!this._initialized) {
          this._init();
          this._initialized = true;
        }
      },
      _parseResourceUrl: function _parseResourceUrl(url) {
        var match = cv.io.timeseries.AbstractTimeSeriesSource.urlRegex.exec(url);
        this._url = url;
        if (match) {
          return {
            type: match[1],
            authority: match[3],
            name: match[4],
            path: match[5],
            params: match[6] ? match[6].split('&').reduce(function (map, entry) {
              var _entry$split = entry.split('='),
                _entry$split2 = _slicedToArray(_entry$split, 2),
                key = _entry$split2[0],
                value = _entry$split2[1];
              map[key] = value;
              return map;
            }, {}) : {}
          };
        }
        this.error('invalid url ' + url + ' this source will not be usable!');
        return null;
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

//# sourceMappingURL=AbstractTimeSeriesSource.js.map?dt=1703705698567