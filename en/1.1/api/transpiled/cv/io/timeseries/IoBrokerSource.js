function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "cv.io.BackendConnections": {},
      "qx.core.Init": {}
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
      __P_8_0: false,
      /**
       * Options for the next getHistory requests, e.g. aggregate and step. They are merged
       * over the parameters of the resource url.
       * @param options {Map?}
       */
      setHistoryOptions: function setHistoryOptions(options) {
        this._historyOptions = options;
      },
      /**
       * Translates a consolidationFunction into the aggregate value of the ioBroker history
       * adapters. Values that are already ioBroker names are passed through.
       * @param cFunc {String}
       * @return {String|undefined}
       */
      _getAggregate: function _getAggregate(cFunc) {
        if (!cFunc) {
          return undefined;
        }
        var known = cv.io.timeseries.IoBrokerSource.AGGREGATIONS;
        var upper = ('' + cFunc).toUpperCase();
        if (Object.prototype.hasOwnProperty.call(known, upper)) {
          return known[upper];
        }
        var lower = ('' + cFunc).toLowerCase();
        for (var name in known) {
          if (known[name] === lower) {
            return lower;
          }
        }
        this.error("ioBroker has no aggregation for consolidationFunction \"".concat(cFunc, "\", using \"average\""));
        return 'average';
      },
      /**
       * The options for a getHistory request, built from the resource url parameters and
       * the options set by the chart.
       * @return {Map}
       */
      _getHistoryOptions: function _getHistoryOptions() {
        var resourceConf = this.getConfig();
        var options = Object.assign({}, resourceConf ? resourceConf.params : {}, this._historyOptions || {});
        if (options.aggregate) {
          options.aggregate = this._getAggregate(options.aggregate);
        }
        if (options.step) {
          var step = parseInt(options.step, 10);
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
      getRequestConfig: function getRequestConfig(start, end, series, offset) {
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
      getClient: function getClient() {
        var resourceConf = this.getConfig();
        var client = cv.io.BackendConnections.getClient(resourceConf ? resourceConf.authority : undefined);
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
      getStateId: function getStateId() {
        var resourceConf = this.getConfig();
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
      _whenConnected: function _whenConnected(client) {
        var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;
        if (client.isConnected()) {
          return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
          var listenerId = null;
          var timer = null;
          var activeListenerId = null;
          var app = qx.core.Init.getApplication();
          var done = function done(error) {
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
          var startTimer = function startTimer() {
            if (timer || app && !app.isActive()) {
              return;
            }
            timer = setTimeout(function () {
              done(new Error("no connection to the ioBroker backend after ".concat(timeout / 1000, "s")));
            }, timeout);
          };
          if (app) {
            activeListenerId = app.addListener('changeActive', function (ev) {
              if (ev.getData()) {
                startTimer();
              } else if (timer) {
                clearTimeout(timer);
                timer = null;
              }
            });
          }
          listenerId = client.addListener('changeConnected', function (ev) {
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
      fetchData: function fetchData(start, end, series, offset) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var resourceConf, client, name, timeRange, options, message, connectionProblem, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                resourceConf = _this.getConfig();
                if (resourceConf) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, []);
              case 1:
                client = _this.getClient();
                if (client) {
                  _context.n = 2;
                  break;
                }
                name = resourceConf.authority;
                _this.error("".concat(name ? "backend connection \"".concat(name, "\"") : 'the default backend connection', " is no ioBroker ") + "connection, no history data for \"".concat(_this.getStateId(), "\""));
                return _context.a(2, []);
              case 2:
                _context.n = 3;
                return _this._whenConnected(client);
              case 3:
                timeRange = _this.getTimeRange(start, end);
                if (timeRange.start) {
                  _context.n = 4;
                  break;
                }
                _this.error("cannot determine a time range from \"".concat(start, "\", no history data for \"").concat(_this.getStateId(), "\""));
                return _context.a(2, []);
              case 4:
                options = _this._getHistoryOptions();
                _context.p = 5;
                _context.n = 6;
                return client.getHistory(_this.getStateId(), timeRange.start, timeRange.end, options);
              case 6:
                return _context.a(2, _context.v);
              case 7:
                _context.p = 7;
                _t = _context.v;
                message = _t && _t.message ? _t.message : '' + _t; // isConnected() can still report true while the socket is not OPEN yet (or already
                // closing), in which case getHistory rejects with "not connected" instead of sending.
                // Treat both as a transient connection problem and retry; only a real request failure
                // (e.g. "getHistory ... failed") is surfaced.
                connectionProblem = !client.isConnected() || message.includes('not connected');
                if (connectionProblem) {
                  _context.n = 8;
                  break;
                }
                throw _t;
              case 8:
                // the connection was not ready (dropped in flight, or the socket not OPEN yet); it gets
                // re-established automatically, so wait for it and give the request one more try
                _this.debug('connection not ready during the history request, retrying after the reconnect');
                _context.n = 9;
                return _this._whenConnected(client);
              case 9:
                return _context.a(2, client.getHistory(_this.getStateId(), timeRange.start, timeRange.end, options));
            }
          }, _callee, null, [[5, 7]]);
        }))();
      },
      /**
       * Converts the ioBroker history entries into the [timestamp, value] pairs the charts use.
       * @param data {Array} entries with a "ts" and a "val"
       * @return {Array}
       */
      processResponse: function processResponse(data) {
        var _this2 = this;
        if (!Array.isArray(data)) {
          this.error('invalid history data response');
          return [];
        }

        // a null marks a gap in the recording. Keeping it lets the graph show that gap,
        // dropping it draws a line straight through, which is what "linear" asks for.
        // With fillMissing="none" ioBroker returns them, otherwise they are already replaced.
        var keepGaps = this._historyOptions && this._historyOptions.fill === 'none';
        return data.filter(function (entry) {
          return entry && (keepGaps || entry.val !== null && entry.val !== undefined);
        }).map(function (entry) {
          return [entry.ts, _this2._toNumber(entry.val)];
        });
      },
      /**
       * A chart can only draw numbers, while an ioBroker datapoint may deliver a boolean or
       * a string. Booleans and the usual textual spellings of them are converted, everything
       * else that is not a number becomes a gap, which is still readable in the graph, while
       * a NaN from parseFloat would not be.
       * @param value {var} value of a history entry
       * @return {Number|null}
       */
      _toNumber: function _toNumber(value) {
        if (value === null || value === undefined) {
          return null;
        }
        if (typeof value === 'number') {
          return value;
        }
        if (typeof value === 'boolean') {
          return value ? 1 : 0;
        }
        var text = ('' + value).trim();
        if (text !== '' && !isNaN(Number(text))) {
          return Number(text);
        }

        // The words come from the ebus datapoints, which spell out their value
        // lists: PhaseOrder is { error: 0, ok: 7 }, PhaseStatus is
        // { missing: 0, present: 1 } for each of the three phases.
        var truthy = ['true', 'yes', 'on', 'ja', 'an', 'ein', 'ok', 'present'];
        var falsy = ['false', 'no', 'off', 'nein', 'aus', 'error', 'missing'];
        var lower = text.toLowerCase();
        if (truthy.includes(lower)) {
          return 1;
        }
        if (falsy.includes(lower)) {
          return 0;
        }
        if (!this.__P_8_0) {
          this.__P_8_0 = true;
          this.error("cannot draw the value \"".concat(text, "\" of ").concat(this.getStateId(), " in a chart, it is not a number"));
        }
        return null;
      }
    }
  });
  cv.io.timeseries.IoBrokerSource.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IoBrokerSource.js.map?dt=1794845744730