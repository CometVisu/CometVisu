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
   *
   */
  qx.Class.define('cv.io.timeseries.OpenhabPersistenceSource', {
    extend: cv.io.timeseries.AbstractTimeSeriesSource,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _backendUrl: null,
      _baseRequestConfig: null,
      _item: null,
      getRequestConfig: function getRequestConfig(start, end) {
        var config = {
          url: '',
          options: {},
          proxy: false
        };
        var resourceConf = this.getConfig();
        if (!resourceConf) {
          return config;
        }
        if (!this._baseRequestConfig) {
          if (!this._backendUrl) {
            var client = cv.io.BackendConnections.getClientByType('openhab');
            if (!client) {
              // use the default
              this._backendUrl = '/rest/';
            } else {
              this._backendUrl = client.getBackendUrl();
            }
          }
          var itemName = resourceConf.name;
          var baseUrl = this._backendUrl + 'persistence/items/' + itemName;
          var _params = [];
          if (resourceConf.authority) {
            _params.push('serviceId=' + resourceConf.authority);
          }
          this._baseRequestConfig = {
            baseUrl: baseUrl,
            params: _params
          };
        }
        var url = this._baseRequestConfig.baseUrl;
        var params = this._baseRequestConfig.params.slice();
        var timeRange = this.getTimeRange(start, end);
        if (timeRange.start) {
          params.push('starttime=' + timeRange.start.toISOString().split('.')[0] + 'Z');
          params.push('endtime=' + timeRange.end.toISOString().split('.')[0] + 'Z');
        }
        url += '?' + params.join('&');
        config.url = url;
        return config;
      },
      /**
       * Converts response from openHAB persistence service
       * @param response
       * @returns {(number|number)[][]|*[]}
       */
      processResponse: function processResponse(response) {
        if (response) {
          if (response.data) {
            var data = response.data;
            var newRrd = [];
            var lastValue;
            var value;
            for (var j = 0, l = data.length; j < l; j++) {
              value = parseFloat(data[j].state);
              if (value !== lastValue) {
                newRrd.push([data[j].time, value]);
              }
              lastValue = value;
            }
            return newRrd;
          } else if (Array.isArray(response)) {
            return response;
          }
        }
        this.error('invalid chart data response');
        return [];
      },
      __P_558_0: function __P_558_0(time) {
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
  cv.io.timeseries.OpenhabPersistenceSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OpenhabPersistenceSource.js.map?dt=1705596690606