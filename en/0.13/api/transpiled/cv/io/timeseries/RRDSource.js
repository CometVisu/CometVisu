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
      "qx.util.format.DateFormat": {}
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
   * Handle queries to an RRD
   */
  qx.Class.define('cv.io.timeseries.RRDSource', {
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
      _timeFormat: null,
      _defaultResolution: null,
      _defaultFunc: null,
      _init: function _init() {
        var resourceUrl = this.getUrl();
        this._timeFormat = new qx.util.format.DateFormat('dd.MM.yyyy HH:mm');
        this._defaultResolution = 300;
        this._defaultFunc = 'AVERAGE';
        if (resourceUrl) {
          // we need the file name case-sensitive (and upper case letters get lost be the url parser)
          var match = /.*:\/\/([\w\-:]+@)?([^\/?]+).*/.exec(this.getRawUrl());
          var fileName = resourceUrl.hostname;
          if (match) {
            fileName = match[2];
          }
          this._baseRequestConfig = {
            url: "/cgi-bin/rrdfetch?rrd=".concat(fileName, ".rrd"),
            proxy: false,
            options: {}
          };
          var _iterator = _createForOfIteratorHelper(resourceUrl.searchParams),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];
              this._baseRequestConfig.url += "&".concat(key, "=").concat(value);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          if (!resourceUrl.searchParams.has('res')) {
            this._baseRequestConfig.url += "&res=".concat(this._defaultResolution);
          }
          if (!resourceUrl.searchParams.has('ds')) {
            this._baseRequestConfig.url += "&ds=".concat(this._defaultFunc);
          }
        } else {
          this._baseRequestConfig = {
            url: '',
            proxy: false,
            options: {}
          };
        }
      },
      getRequestConfig: function getRequestConfig(start, end, series, offset) {
        var config = Object.assign({}, this._baseRequestConfig);
        var rrdStart = "now-".concat(offset + 1).concat(series);
        var rrdEnd = 'now';
        if (offset > 0) {
          rrdEnd = "now-".concat(offset).concat(series);
        }
        config.url += "&start=".concat(rrdStart, "&end=").concat(rrdEnd);
        return config;
      },
      processResponse: function processResponse(response) {
        return response;
      }
    }
  });
  cv.io.timeseries.RRDSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RRDSource.js.map?dt=1691935456257