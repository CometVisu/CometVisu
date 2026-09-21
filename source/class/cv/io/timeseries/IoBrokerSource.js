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
 * Time series source for the ioBroker backend. In contrast to the other sources the
 * data is not fetched from an URL, it is requested over the already established backend
 * connection, therefore the builtin fetching is disabled and fetchData() is used.
 *
 * The resource url is <code>iobroker://&lt;state.id&gt;</code>, the backend connection to
 * use can be named in front of it: <code>iobroker://&lt;backend&gt;@&lt;state.id&gt;</code>.
 */
qx.Class.define('cv.io.timeseries.IoBrokerSource', {
  extend: cv.io.timeseries.AbstractTimeSeriesSource,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Maps the consolidationFunction values the diagrams use to the aggregate values
     * of the ioBroker history adapters.
     */
    AGGREGATIONS: {
      AVERAGE: 'average',
      MEAN: 'average',
      MIN: 'min',
      MAX: 'max',
      TOTAL: 'total',
      SUM: 'total',
      COUNT: 'count',
      INTEGRAL: 'integral',
      MINMAX: 'minmax',
      NONE: 'none'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _historyOptions: null,
    __unbekannt: false,

    /**
     * Options for the next getHistory requests, e.g. aggregate and step. They are merged
     * over the parameters of the resource url.
     * @param options {Map?}
     */
    setHistoryOptions(options) {
      this._historyOptions = options;
    },

    /**
     * Translates a consolidationFunction into the aggregate value of the ioBroker history
     * adapters. Values that are already ioBroker names are passed through.
     * @param cFunc {String}
     * @return {String|undefined}
     */
    _getAggregate(cFunc) {
      if (!cFunc) {
        return undefined;
      }

      const known = cv.io.timeseries.IoBrokerSource.AGGREGATIONS;
      const upper = ('' + cFunc).toUpperCase();
      if (Object.prototype.hasOwnProperty.call(known, upper)) {
        return known[upper];
      }

      const lower = ('' + cFunc).toLowerCase();
      for (const name in known) {
        if (known[name] === lower) {
          return lower;
        }
      }

      this.error(`ioBroker has no aggregation for consolidationFunction "${cFunc}", using "average"`);

      return 'average';
    },

    /**
     * The options for a getHistory request, built from the resource url parameters and
     * the options set by the chart.
     * @return {Map}
     */
    _getHistoryOptions() {
      const resourceConf = this.getConfig();
      const options = Object.assign({}, resourceConf ? resourceConf.params : {}, this._historyOptions || {});

      if (options.aggregate) {
        options.aggregate = this._getAggregate(options.aggregate);
      }
      if (options.step) {
        const step = parseInt(options.step, 10);
        if (step > 0) {
          options.step = step;
        } else {
          delete options.step;
        }
      }
      // fillMissing decides what happens with the gaps the recording adapter marks with
      // null values, e.g. the ones written when it is started or stopped. ioBroker either
      // includes them (false) or replaces them with the last known value (true), and an
      // included null makes the whole aggregation interval around it null:
      //   none              -> included, so an interval containing a gap becomes a gap
      //   previous, linear  -> replaced, the graph is drawn through the gap
      if (options.fill) {
        options.ignoreNull = options.fill !== 'none';
        delete options.fill;
      }
      if (options.aggregate === 'none') {
        // "none" has to be sent, leaving it out lets ioBroker fall back to its own default.
        // Without aggregation there are no intervals, so asking for a step would only
        // produce empty interval markers instead of the stored values.
        delete options.step;
      }

      return options;
    },

    /**
     * The data is requested over the backend connection, this disables the builtin
     * fetching of the chart components and makes them call fetchData() instead.
     * @param start {String} start time
     * @param end {String?} end time
     * @param series {String?} series name
     * @param offset {Number?} series offset
     * @return {{fetch: boolean}}
     */
    getRequestConfig(start, end, series, offset) {
      return {
        fetch: false,
        url: '',
        options: {},
        proxy: false
      };
    },

    /**
     * The connection this source reads from. It is the one named in the resource url,
     * the default backend connection when none is named.
     * @return {cv.io.IClient?}
     */
    getClient() {
      const resourceConf = this.getConfig();
      const client = cv.io.BackendConnections.getClient(resourceConf ? resourceConf.authority : undefined);

      if (!client || client.getType() !== 'iobroker') {
        return null;
      }

      return client;
    },

    /**
     * The state id this source reads. It is percent encoded in the resource url, as it
     * may contain characters that are structural there ("#", "?", "/").
     * @return {String}
     */
    getStateId() {
      const resourceConf = this.getConfig();
      if (!resourceConf) {
        return '';
      }

      try {
        return decodeURIComponent(resourceConf.name);
      } catch (e) {
        // not encoded at all, use it as it is
        return resourceConf.name;
      }
    },

    /**
     * Resolves once the client is connected. The history can only be requested over an
     * established connection, and the charts usually ask for their data while the backend
     * connection is still being set up.
     * @param client {cv.io.IClient}
     * @param timeout {Number} how long to wait in milliseconds
     * @return {Promise}
     */
    _whenConnected(client, timeout = 30000) {
      if (client.isConnected()) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        let listenerId = null;
        let timer = null;

        let activeListenerId = null;
        const app = qx.core.Init.getApplication();

        const done = error => {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          client.removeListenerById(listenerId);
          if (activeListenerId !== null && app) {
            app.removeListenerById(activeListenerId);
            activeListenerId = null;
          }
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };

        // While the application is inactive the backend connections are terminated on
        // purpose and only re-established when it becomes active again. Counting down a
        // timeout during that time would fail a request nobody can see anyway, so the
        // timer only runs while the application is active.
        const startTimer = () => {
          if (timer || (app && !app.isActive())) {
            return;
          }
          timer = setTimeout(() => {
            done(new Error(`no connection to the ioBroker backend after ${timeout / 1000}s`));
          }, timeout);
        };

        if (app) {
          activeListenerId = app.addListener('changeActive', ev => {
            if (ev.getData()) {
              startTimer();
            } else if (timer) {
              clearTimeout(timer);
              timer = null;
            }
          });
        }

        listenerId = client.addListener('changeConnected', ev => {
          if (ev.getData()) {
            done();
          }
        });

        startTimer();
      });
    },

    /**
     * Request the recorded values from the ioBroker backend.
     * @param start {String} start time, e.g. "end-3day" or a unix timestamp
     * @param end {String?} end time, "now" when not set
     * @param series {String?} series name, unused
     * @param offset {Number?} series offset, unused
     * @return {Promise<Array>}
     */
    async fetchData(start, end, series, offset) {
      const resourceConf = this.getConfig();
      if (!resourceConf) {
        return [];
      }

      const client = this.getClient();
      if (!client) {
        const name = resourceConf.authority;
        this.error(
          `${name ? `backend connection "${name}"` : 'the default backend connection'} is no ioBroker ` +
            `connection, no history data for "${this.getStateId()}"`
        );

        return [];
      }

      // the charts request their data while the backend connection may still be opening
      await this._whenConnected(client);

      const timeRange = this.getTimeRange(start, end);
      if (!timeRange.start) {
        this.error(`cannot determine a time range from "${start}", no history data for "${this.getStateId()}"`);

        return [];
      }

      const options = this._getHistoryOptions();
      try {
        return await client.getHistory(this.getStateId(), timeRange.start, timeRange.end, options);
      } catch (e) {
        const message = e && e.message ? e.message : '' + e;
        // isConnected() can still report true while the socket is not OPEN yet (or already
        // closing), in which case getHistory rejects with "not connected" instead of sending.
        // Treat both as a transient connection problem and retry; only a real request failure
        // (e.g. "getHistory ... failed") is surfaced.
        const connectionProblem = !client.isConnected() || message.includes('not connected');
        if (!connectionProblem) {
          // the request itself failed, retrying would not change that
          throw e;
        }

        // the connection was not ready (dropped in flight, or the socket not OPEN yet); it gets
        // re-established automatically, so wait for it and give the request one more try
        this.debug('connection not ready during the history request, retrying after the reconnect');
        await this._whenConnected(client);

        return client.getHistory(this.getStateId(), timeRange.start, timeRange.end, options);
      }
    },

    /**
     * Converts the ioBroker history entries into the [timestamp, value] pairs the charts use.
     * @param data {Array} entries with a "ts" and a "val"
     * @return {Array}
     */
    processResponse(data) {
      if (!Array.isArray(data)) {
        this.error('invalid history data response');

        return [];
      }

      // a null marks a gap in the recording. Keeping it lets the graph show that gap,
      // dropping it draws a line straight through, which is what "linear" asks for.
      // With fillMissing="none" ioBroker returns them, otherwise they are already replaced.
      const keepGaps = this._historyOptions && this._historyOptions.fill === 'none';

      return data
        .filter(entry => entry && (keepGaps || (entry.val !== null && entry.val !== undefined)))
        .map(entry => [entry.ts, this._toNumber(entry.val)]);
    },

    /**
     * A chart can only draw numbers, while an ioBroker datapoint may deliver a boolean or
     * a string. Booleans and the usual textual spellings of them are converted, everything
     * else that is not a number becomes a gap, which is still readable in the graph, while
     * a NaN from parseFloat would not be.
     * @param value {var} value of a history entry
     * @return {Number|null}
     */
    _toNumber(value) {
      if (value === null || value === undefined) {
        return null;
      }
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'boolean') {
        return value ? 1 : 0;
      }

      const text = ('' + value).trim();
      if (text !== '' && !isNaN(Number(text))) {
        return Number(text);
      }

      // The words come from the ebus datapoints, which spell out their value
      // lists: PhaseOrder is { error: 0, ok: 7 }, PhaseStatus is
      // { missing: 0, present: 1 } for each of the three phases.
      const wahr = ['true', 'yes', 'on', 'ja', 'an', 'ein', 'ok', 'present'];
      const falsch = ['false', 'no', 'off', 'nein', 'aus', 'error', 'missing'];
      const klein = text.toLowerCase();
      if (wahr.includes(klein)) {
        return 1;
      }
      if (falsch.includes(klein)) {
        return 0;
      }

      if (!this.__unbekannt) {
        this.__unbekannt = true;
        this.error(`cannot draw the value "${text}" of ${this.getStateId()} in a chart, it is not a number`);
      }

      return null;
    }
  }
});
