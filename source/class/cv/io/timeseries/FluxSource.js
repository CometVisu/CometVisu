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

    isInline() {
      return this._isInline;
    },

    _init() {
      const config = this.getConfig();
      if (config) {
        const bucket = config.name;
        const options = {
          method: 'POST',
          'config-section': 'influx',
          searchParams: {
            org: config.authority
          }
        };
        // for inline bucket the query template is defined in the config and is provided externally
        if (bucket !== 'inline') {
          const parts = config.path.substring(1).split('/');
          const measurement = parts.shift();
          const field = parts.shift() || 'value';
          const queryParts = [
            `from(bucket:"${bucket}")`,
            '|> range($$RANGE$$)',
            `|> filter(fn: (r) => r._measurement == "${measurement}" and r._field == "${field}")`
          ];
          const additional = {};
          const allowedAg = ['fn', 'every', 'column', 'createEmpty', 'location', 'offset', 'period', 'timeDst', 'timeSrc'];
          for (const key in config.params) {
            if (key.startsWith('ag-')) {
              if (allowedAg.includes(key.substring(3))) {
                if (!Object.prototype.hasOwnProperty.call(additional, 'aggregateWindow')) {
                  additional.aggregateWindow = {};
                }
                additional.aggregateWindow[key.substring(3)] = config.params[key];
              } else {
                this.error(`skipping invalid aggregationWindow parameter ${key.substring(3)}`);
              }
            }
          }
          if (Object.prototype.hasOwnProperty.call(additional, 'aggregateWindow')) {
            if (Object.prototype.hasOwnProperty.call(additional.aggregateWindow, 'every')) {
              let parts = [];
              for (const key in additional.aggregateWindow) {
                parts.push(`${key}: ${additional.aggregateWindow[key]}`);
              }
              // use default
              if (!Object.prototype.hasOwnProperty.call(additional.aggregateWindow, 'fn')) {
                parts.push('fn: mean');
              }
              queryParts.push(`|> aggregateWindow(${parts.join(', ')})`);
            } else {
              this.error('aggregateWindow is missing "every" and/or "fn" parameter -> skipped.');
            }
          }

          this._queryTemplate = queryParts.join('\n  ');
        } else {
          this._isInline = true;
        }
        this._baseRequestConfig = {
          url: this._url,
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

    setQueryTemplate(template) {
      this._queryTemplate = template;
    },

    _getAgWindowEveryForSeries(series) {
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

    getRequestConfig(start, end, series) {
      const config = Object.assign({}, this._baseRequestConfig);
      const timeRange = this.getTimeRange(start, end);
      let range = 'start: -1d';
      if (timeRange.start) {
        range = `start: ${timeRange.start.toISOString().split('.')[0]+'Z'}, stop: ${timeRange.end.toISOString().split('.')[0]+'Z'}`;
      }
      // add time range to the resource url to make the request cache work
      config.url += `&range=${encodeURIComponent(range)}`;
      config.options.requestData = this._queryTemplate.replace('$$RANGE$$', range);
      if (!config.options.requestData.includes('aggregateWindow')) {
        // get aggregation from series
        config.options.requestData += `\n  |> aggregateWindow(every: ${this._getAgWindowEveryForSeries(series)}, fn: mean)`;
      }
      return config;
    },

    /**
     * Converts response from openHAB persistence service
     * @param response {String}
     * @returns {(number|number)[][]|*[]}
     */
    processResponse(response) {
      const lines = response.replace(/\r/g, '').trim().split('\n');
      let fields = lines.shift().split(',');
      const res = [];
      const timeIndex = fields.indexOf('_time');
      const valueIndex = fields.indexOf('_value');
      if (timeIndex < 0 || valueIndex < 0) {
        qx.log.Logger.error(this, 'missing _time or _value field in flux response: ' + fields.join(','));
        return res;
      }
      let value;
      let lineEntries;
      let date;
      for (let line of lines) {
        lineEntries = line.split(',');
        if (lineEntries[valueIndex]) {
          value = parseFloat(lineEntries[valueIndex]);
          date = new Date(lineEntries[timeIndex]);
          res.push([date.getTime(), value]);
        }
      }
      return res;
    }
  }
});
