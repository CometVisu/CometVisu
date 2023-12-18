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
        var resourceConf = this.getConfig();
        this._timeFormat = new qx.util.format.DateFormat('dd.MM.yyyy HH:mm');
        this._defaultResolution = 300;
        this._defaultFunc = 'AVERAGE';
        if (resourceConf) {
          var fileName = resourceConf.name;
          this._baseRequestConfig = {
            url: "/cgi-bin/rrdfetch?rrd=".concat(fileName, ".rrd"),
            proxy: false,
            options: {}
          };
          for (var key in resourceConf.params) {
            this._baseRequestConfig.url += "&".concat(key, "=").concat(resourceConf.params[key]);
          }
          if (!Object.prototype.hasOwnProperty.call(resourceConf.params, 'res')) {
            this._baseRequestConfig.url += "&res=".concat(this._defaultResolution);
          }
          if (!Object.prototype.hasOwnProperty.call(resourceConf.params, 'ds')) {
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

//# sourceMappingURL=RRDSource.js.map?dt=1702901342734