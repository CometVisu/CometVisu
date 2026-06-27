/* Dataset.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 */

qx.Class.define('cv.ui.structure.tile.components.chart.Dataset', {
  extend: qx.core.Object,
  include: [
    cv.util.MStringTransforms
  ],

  /**
   * 
   * @param {HTMLElement} element 
   * @param {cv.ui.structure.tile.components.Chart} chart
   */
  construct(element, chart) {
    super();
    this._element = element;
    this._chart = chart;
    this._init();
  },

  properties: {
    src: {
      check: 'String',
      init: ''
    },
    key: {
      check: 'String',
      init: ''
    },
    chartType: {
      check: ['line', 'bar', 'stacked-bar', 'h-line', 'v-line'],
      init: 'line'
    },
    type: {
      check: ['flux', 'openhab', 'rrd', 'demo', 'plugin'],
      nullable: true,
      apply: '_applyType'
    },
    subType: {
      check: 'String',
      init: ''
    },
    showArea: {
      check: 'Boolean',
      init: false,
      transform: '_parseBoolean'
    },
    color: {
      check: 'String',
      init: '#FF9900',
      event: 'colorChanged'
    },
    title: {
      check: 'String',
      init: ''
    },
    curve: {
      check: ['linear', 'step', 'basis', 'natural'],
      init: 'linear'
    },
    aggregationInterval: {
      check: 'Number',
      init: 0
    },
    source: {
      check: 'cv.io.timeseries.AbstractTimeSeriesSource',
      init: null
    },
    gradient: {
      check: 'Boolean',
      init: false,
      transform: '_parseBoolean'
    },
    showValue: {
      check: 'Boolean',
      init: true,
      transform: '_parseBoolean'
    }
  },

  members: {
    /*
    * @type {HTMLElement}
    */
    _element: null,
    /*
    * @type {cv.ui.structure.tile.components.Chart}
    */
    _chart: null,
    __srcHash: null,
    _lastRefresh: null,

    /**
     * Load data from the source
     * @param start {Date} start time
     * @param end {Date?} optional end time, if not set its "now"
     * @param series {'hour'|'day'|'week'|'month'|'year'}
     * @param offset {Number} series offset
     * @param {*} options 
     * @returns {Promise<Array>}
     */
    async fetch(start, end, series, offset, options) {
      const source = this.getSource();
      if (!source) {
        return [];
      }
      const config = source.getRequestConfig(start, end, series, offset);
      let url = config.url;
      let proxy = config.proxy;
      options = Object.assign({}, options, config.options);

      if (config.fetch === false) {
        // data retrieval is handled by the source itself
        return source.fetchData(start, end, series, offset)
          .then(data => {
            this.debug('data successfully loaded by source');
            if (source) {
              data = source.processResponse(data);
            }
            this._lastRefresh = Date.now();
            return this._convertData(data || []);
          })
          .catch(err => {
            this._onStatusError(url, err);
            return [];
          });
      }

      if (url) {
        this.debug('loading', url);
        return cv.io.Fetch.cachedFetch(url, options, proxy, cv.io.BackendConnections.getClient())
          .then(data => {
            this.debug('successfully loaded', url);
            if (source) {
              data = source.processResponse(data);
            }
            this._lastRefresh = Date.now();
            return this._convertData(data);
          })
          .catch(err => {
            this._onStatusError(url, err);
            return [];
          });
      }
      return [];
    },

    _init() {
      let attr;
      let name;
      let value;
      for (let i = 0; i < this._element.attributes.length; i++) {
        attr = this._element.attributes.item(i);
        // CamelCase attribute names
        name = attr.name
          .split('-')
          .map((part, i) => {
            if (i > 0) {
              return `${part.substring(0, 1).toUpperCase()}${part.substring(1)}`;
            }
            return part;
          })
          .join('');
        value = attr.value;
        if (value === 'true' || value === 'false') {
          value = value === 'true';
        } else if (/^\d+$/.test(value)) {
          value = parseInt(value);
        } else if (/^[\d.]+$/.test(value)) {
          value = parseFloat(value);
        }
        this.set(name, value);
      }
      let type = this.getSrc().split('://')[0].toLowerCase();
      if (type.startsWith('plugin+')) {
        this.setSubType(type.substring(7));
        type = type.substring(0, 6);
      }
      if (type !== '') {
        this.setType(type);
      } else {
        this.resetType();
      }
    },

    _applyType(type) {
      const src = this.getSrc();
      let key = src;
      let source = null;
      switch (type) {
        case 'flux':
          source = new cv.io.timeseries.FluxSource(src, this._chart);
          if (source.isInline()) {
            const fluxQuery = this._element.textContent.trim();
            key = cv.ConfigCache.hashCode(fluxQuery).toString();
            source.setQueryTemplate(fluxQuery);
          }
          break;

        case 'openhab':
          source = new cv.io.timeseries.OpenhabPersistenceSource(src, this._chart);
          break;

        case 'rrd':
          source = new cv.io.timeseries.RRDSource(src, this._chart._chart);
          break;

        case 'demo':
          source = new cv.io.timeseries.DemoSource(src, this);
          break;

        case 'plugin':
          source = new cv.io.timeseries.Plugin(src, this._chart);
          break;

        default:
          this.error('unknown chart data source type ' + type);
          break;
      }
      this.setKey(key);
      this.setSource(source);
    },

    _onStatusError(key, err) {
      cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
        title: qx.locale.Manager.tr('Communication error'),
        severity: 'urgent',
        message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), JSON.stringify(err))
      });

      this.error('Chart _onStatusError', this, key, err);
    },

    _convertData(data) {
      const mins = this.getAggregationInterval() > 0 ? this.getAggregationInterval() * 60 * 1000 : 0;
      return data.filter(e => e !== null).map(e => {
        let [time, value] = e;
        return {
          key: this.getKey(),
          src: this.getSrc(),
          time: mins > 0
            ? Math.round(time / mins) * mins : time,
          value
        };
      });
    },

    elementName() {
      return this._element.localName;
    }
  },

  destruct() {
    const source = this.getSource();
    if (source && source.dispose && (!source.isDisposed || !source.isDisposed())) {
      source.dispose();
    }
    this._chart = null;
    this._element = null;
  }
});
