/*
 * Copyright (c) 2023-2026, Christian Mayer and the CometVisu contributors.
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
    _fileName: null,
    _params: null,
    _queryTemplate: null,
    _timeFormat: null,
    _defaultResolution: null,
    _defaultFunc: null,

    _init() {
      const resourceConf = this.getConfig();
      this._timeFormat = new qx.util.format.DateFormat('dd.MM.yyyy HH:mm');
      this._defaultResolution = 300;
      this._defaultFunc = 'AVERAGE';
      if (resourceConf) {
        this._fileName = resourceConf.name;
        this._params = Object.assign({}, resourceConf.params);
        if (!Object.prototype.hasOwnProperty.call(this._params, 'res')) {
          this._params.res = this._defaultResolution;
        }
        if (!Object.prototype.hasOwnProperty.call(this._params, 'ds')) {
          this._params.ds = this._defaultFunc;
        }
      } else {
        this._fileName = '';
        this._params = {};
      }
    },

    /**
     * Build the request config, resolving the base URL from the backend client
     * at call time so that it reflects the current backend.baseURL (which may
     * have been updated by the login response after construction).
     * @param start
     * @param end
     * @param series
     * @param offset
     */
    getRequestConfig(start, end, series, offset) {
      const client = cv.io.BackendConnections.getClient();
      const baseUrl = client ? client.getResourcePath('rrd') : '/cgi-bin/rrdfetch';
      let url = `${baseUrl}?rrd=${this._fileName}.rrd`;
      for (const key in this._params) {
        url += `&${key}=${this._params[key]}`;
      }
      const rrdStart = `now-${offset + 1}${series}`;
      const rrdEnd = offset > 0 ? `now-${offset}${series}` : 'now';
      url += `&start=${rrdStart}&end=${rrdEnd}`;
      return {
        url: url,
        proxy: false,
        options: {}
      };
    },

    processResponse(response) {
      return response;
    }
  }
});
