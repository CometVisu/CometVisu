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
      "cv.io.BackendConnections": {}
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
   * Only for demo configs, load chart data directly from a json file or s generator
   */
  qx.Class.define('cv.io.timeseries.DemoSource', {
    extend: cv.io.timeseries.AbstractTimeSeriesSource,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _client: null,
      _src: null,
      _init: function _init() {
        this._client = cv.io.BackendConnections.getClientByType('mockup');
        this._src = this._url.split('://').pop().replace('@', ':');
        this._baseRequestConfig = {
          url: '',
          proxy: false,
          options: {}
        };
      },
      getRequestConfig: function getRequestConfig(start, end, series, offset) {
        var config = this._baseRequestConfig;
        config.url = this._client.getResourcePath('charts', {
          src: this._src,
          start: start,
          end: end,
          series: series,
          offset: offset
        });
        return config;
      },
      processResponse: function processResponse(response) {
        return response;
      }
    }
  });
  cv.io.timeseries.DemoSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DemoSource.js.map?dt=1692560747162