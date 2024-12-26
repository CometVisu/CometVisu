/*
 * Copyright (c) 2024, Christian Mayer and the CometVisu contributors.
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
 * Base class for plugins that can be used as time series sources.
 * @since 2024
 * @author Tobias Bräutigam
 */
qx.Class.define('cv.io.timeseries.Plugin', {
  extend: cv.io.timeseries.AbstractTimeSeriesSource,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    _registry: {},

    registerPlugin(type, clazz) {
      this._registry[type] = clazz;
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _plugin: null,

    _init() {
      const config = this.getConfig();
      if (!Object.prototype.hasOwnProperty.call(cv.io.timeseries.Plugin._registry, config.subType)) {
        throw new Error('Unknown plugin type: ' + config.subType);
      }
      this._plugin = new cv.io.timeseries.Plugin._registry[config.subType](config, this._chart);
    },

    /**
     * Options to configure the builtin fetch function.
     *
     * @typedef {object} FetchRequestConfig
     * @property {string} url The URL to fetch the data from
     * @property {object} options Further options for the fetch request
     * @property {boolean} proxy If the request should be proxied
     */

    /**
     * Disables the builtin fetch function and calls the plugins fetchData method instead.
     *
     * @typedef {object} OwnFetchRequestConfig
     * @property {boolean} fetch - Disables the builtin fetch function
     */

    /**
     * Generate the request configuration for the chart component or disable it if the plugin
     * fetches the data itself.
     * @param {number} start - start time as unix timestamp
     * @param {number} end - end time as unix timestamp
     * @param {string} series - series name e.g. 'day', 'month', 'year'
     * @param {number} offset - series offset, can be used together with series to calculate the start date e.g. series: day, offset: 1 -> start = end - 1 day
     * @returns {FetchRequestConfig|OwnFetchRequestConfig}
     */
    getRequestConfig(start, end, series, offset) {
      return this._plugin.getRequestConfig(start, end, series, offset);
    },

    /**
     * If the plugin request the data from an external source this function is called.
     * getRequestConfig() must return {fetch: false} to disable the charts builtin data fetching and
     * call this function instead.
     * @param {number} start - start time as unix timestamp
     * @param {number} end - end time as unix timestamp
     * @param {string} series - series name e.g. 'day', 'month', 'year'
     * @param {number} offset - series offset, can be used together with series to calculate the start date e.g. series: day, offset: 1 -> start = end - 1 day
     * @returns {Promise<*>}
     */
    async fetchData(start, end, series, offset) {
      return this._plugin.fetchData(start, end, series, offset);
    },

    /**
     * Process the response data before it is used in the chart.
     * If the plugin has a processResponse method it will be used.
     * @param {any} data
     * @returns {any}
     */
    processResponse(data) {
      if (this._plugin && typeof this._plugin.processResponse === 'function') {
        return this._plugin.processResponse(data);
      }
      return data;
    }
  }
});
