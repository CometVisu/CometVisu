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

    _init() {
      const resourceUrl = this.getUrl();
      this._timeFormat = new qx.util.format.DateFormat('dd.MM.yyyy HH:mm');
      this._defaultResolution = 300;
      this._defaultFunc = 'AVERAGE';
      if (resourceUrl) {
        // we need the file name case-sensitive (and upper case letters get lost be the url parser)
        let match = /.*:\/\/([\w\-:]+@)?([^\/?]+).*/.exec(this.getRawUrl());
        let fileName = resourceUrl.hostname;
        if (match) {
          fileName = match[2];
        }
        this._baseRequestConfig = {
          url: `/cgi-bin/rrdfetch?rrd=${fileName}.rrd`,
          proxy: false,
          options: {}
        };
        for (const [key, value] of resourceUrl.searchParams) {
          this._baseRequestConfig.url += `&${key}=${value}`;
        }
        if (!resourceUrl.searchParams.has('res')) {
          this._baseRequestConfig.url += `&res=${this._defaultResolution}`;
        }
        if (!resourceUrl.searchParams.has('ds')) {
          this._baseRequestConfig.url += `&ds=${this._defaultFunc}`;
        }
      } else {
        this._baseRequestConfig = {
          url: '',
          proxy: false,
          options: {}
        };
      }
    },

    getRequestConfig(start, end, series, offset) {
      const config = Object.assign({}, this._baseRequestConfig);
      let rrdStart = `now-${offset+1}${series}`;
      let rrdEnd = 'now';
      if (offset > 0) {
        rrdEnd = `now-${offset}${series}`;
      }
      config.url += `&start=${rrdStart}&end=${rrdEnd}`;
      return config;
    },

    processResponse(response) {
      return response;
    }
  }
});
