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

    _init() {
      const resourceUrl = this.getUrl();
      if (resourceUrl) {
        this._baseRequestConfig = {
          url: `/cgi-bin/rrdfetch?rrd=${resourceUrl.hostname}.rrd'`,
          proxy: false,
          options: {}
        }
        for (const [key, value] of resourceUrl.searchParams) {
          this._baseRequestConfig.url += `&${key}=${value}`
        }
      } else {
        this._baseRequestConfig = {
          url: '',
          proxy: false,
          options: {}
        }
      }
    },

    getRequestConfig(start, end) {
      const config = Object.assign(this._baseRequestConfig, {});
      config.url += `&start=${start}&end=${end}`;
      return config;
    },

    processResponse(response) {
      return response;
    }
  }
});
