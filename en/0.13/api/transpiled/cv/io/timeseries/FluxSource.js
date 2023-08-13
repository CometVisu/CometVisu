function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.timeseries.AbstractTimeSeriesSource": {
        "require": true
      },
      "qx.log.Logger": {}
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
   * Handle queries to an InfluxDB over the flux API
   */
  qx.Class.define('cv.io.timeseries.FluxSource', {
    extend: cv.io.timeseries.AbstractTimeSeriesSource,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _backendUrl: null,
      _baseRequestConfig: null,
      _queryTemplate: null,
      _isInline: null,
      isInline: function isInline() {
        return this._isInline;
      },
      _init: function _init() {
        var resourceUrl = this.getUrl();
        if (resourceUrl) {
          var parts = resourceUrl.pathname.substring(1).split('/');
          var bucket = resourceUrl.hostname;
          var options = {
            method: 'POST',
            'config-section': 'influx',
            searchParams: {
              org: resourceUrl.username
            }
          };
          // for inline bucket the query template is defined in the config and is provided externally
          if (bucket !== 'inline') {
            var measurement = parts.shift();
            var field = parts.shift() || 'value';
            var queryParts = ["from(bucket:\"".concat(bucket, "\")"), '|> range($$RANGE$$)', "|> filter(fn: (r) => r._measurement == \"".concat(measurement, "\" and r._field == \"").concat(field, "\")")];
            var additional = {};
            var allowedAg = ['fn', 'every', 'column', 'createEmpty', 'location', 'offset', 'period', 'timeDst', 'timeSrc'];
            var _iterator = _createForOfIteratorHelper(resourceUrl.searchParams),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _slicedToArray(_step.value, 2),
                  _key = _step$value[0],
                  value = _step$value[1];
                if (_key.startsWith('ag-')) {
                  if (allowedAg.includes(_key.substring(3))) {
                    if (!Object.prototype.hasOwnProperty.call(additional, 'aggregateWindow')) {
                      additional.aggregateWindow = {};
                    }
                    additional.aggregateWindow[_key.substring(3)] = value;
                  } else {
                    this.error("skipping invalid aggregationWindow parameter ".concat(_key.substring(3)));
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            if (Object.prototype.hasOwnProperty.call(additional, 'aggregateWindow')) {
              if (Object.prototype.hasOwnProperty.call(additional.aggregateWindow, 'every')) {
                var _parts = [];
                for (var key in additional.aggregateWindow) {
                  _parts.push("".concat(key, ": ").concat(additional.aggregateWindow[key]));
                }
                // use default
                if (!Object.prototype.hasOwnProperty.call(additional.aggregateWindow, 'fn')) {
                  _parts.push('fn: mean');
                }
                queryParts.push("|> aggregateWindow(".concat(_parts.join(', '), ")"));
              } else {
                this.error('aggregateWindow is missing "every" and/or "fn" parameter -> skipped.');
              }
            }
            this._queryTemplate = queryParts.join('\n  ');
          } else {
            this._isInline = true;
          }
          this._baseRequestConfig = {
            url: resourceUrl.toString(),
            proxy: true,
            options: options
          };
        } else {
          this._baseRequestConfig = {
            url: '',
            proxy: false,
            options: {}
          };
        }
      },
      setQueryTemplate: function setQueryTemplate(template) {
        this._queryTemplate = template;
      },
      _getAgWindowEveryForSeries: function _getAgWindowEveryForSeries(series) {
        switch (series) {
          case 'hour':
            return '1m';
          case 'day':
            return '1h';
          case 'week':
            return '6h';
          case 'month':
            return '1d';
          case 'year':
            return '1mo';
          default:
            return '1d';
        }
      },
      getRequestConfig: function getRequestConfig(start, end, series) {
        var config = Object.assign({}, this._baseRequestConfig);
        var timeRange = this.getTimeRange(start, end);
        var range = 'start: -1d';
        if (timeRange.start) {
          range = "start: ".concat(timeRange.start.toISOString().split('.')[0] + 'Z', ", stop: ").concat(timeRange.end.toISOString().split('.')[0] + 'Z');
        }
        // add time range to the resource url to make the request cache work
        config.url += "&range=".concat(encodeURIComponent(range));
        config.options.requestData = this._queryTemplate.replace('$$RANGE$$', range);
        if (!config.options.requestData.includes('aggregateWindow')) {
          // get aggregation from series
          config.options.requestData += "\n  |> aggregateWindow(every: ".concat(this._getAgWindowEveryForSeries(series), ", fn: mean)");
        }
        return config;
      },
      /**
       * Converts response from openHAB persistence service
       * @param response {String}
       * @returns {(number|number)[][]|*[]}
       */
      processResponse: function processResponse(response) {
        var lines = response.replace(/\r/g, '').trim().split('\n');
        var fields = lines.shift().split(',');
        var res = [];
        var timeIndex = fields.indexOf('_time');
        var valueIndex = fields.indexOf('_value');
        if (timeIndex < 0 || valueIndex < 0) {
          qx.log.Logger.error(this, 'missing _time or _value field in flux response: ' + fields.join(','));
          return res;
        }
        var value;
        var lineEntries;
        var date;
        var _iterator2 = _createForOfIteratorHelper(lines),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var line = _step2.value;
            lineEntries = line.split(',');
            if (lineEntries[valueIndex]) {
              value = parseFloat(lineEntries[valueIndex]);
              date = new Date(lineEntries[timeIndex]);
              res.push([date.getTime(), value]);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return res;
      }
    }
  });
  cv.io.timeseries.FluxSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FluxSource.js.map?dt=1691935456179