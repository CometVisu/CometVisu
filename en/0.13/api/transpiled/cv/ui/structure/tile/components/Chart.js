function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.util.ScriptLoader": {},
      "qx.util.ResourceManager": {},
      "qx.event.Timer": {},
      "qx.locale.Manager": {},
      "cv.io.BackendConnections": {},
      "cv.io.Fetch": {},
      "cv.util.String": {},
      "cv.core.notifications.Router": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Chart.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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

  /* eslint-disable arrow-body-style */

  /**
   * Shows an chart.
   * @asset(libs/d3.min.js)
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.Chart', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.ui.structure.tile.MVisibility,

    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      JS_LOADED: new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
          var check, timer, counter;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  check = function check() {
                    return _typeof(window.d3) === 'object';
                  };

                  _context.next = 3;
                  return cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));

                case 3:
                  if (!check()) {
                    timer = new qx.event.Timer(50);
                    counter = 0;
                    timer.addListener('interval', function () {
                      counter++;

                      if (check()) {
                        resolve(true);
                      } else if (counter > 5) {
                        reject(new Error('Error loaded d3 library'));
                      }
                    });
                  } else {
                    resolve(true);
                  }

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()).then(function () {
        if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
          // localize
          d3.formatDefaultLocale({
            'decimal': ',',
            'thousands': '.',
            'grouping': [3],
            'currency': ['€', '']
          });
          d3.timeFormatDefaultLocale({
            'dateTime': '%A, der %e. %B %Y, %X',
            'date': '%d.%m.%Y',
            'time': '%H:%M:%S',
            'periods': ['AM', 'PM'],
            'days': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            'shortDays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            'shortMonths': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
          });
        }
      }),
      CONFIG: null
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: ['axis-mixed', 'bar', 'line', 'scatter', 'pie', 'percentage'],
        init: 'line'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _downloadedImage: null,
      _url: null,
      _headers: null,
      _request: null,
      _chart: null,
      _width: null,
      _height: null,
      _loaded: null,
      _dataSetConfigs: null,
      _init: function _init() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var element;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  element = _this._element;

                  if (element.hasAttribute('type')) {
                    _this.setType(element.getAttribute('type'));
                  }

                  _context2.next = 4;
                  return cv.ui.structure.tile.components.Chart.JS_LOADED;

                case 4:
                  if (_this.isVisible()) {
                    _this._loadData();
                  }

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      _applyVisible: function _applyVisible(value) {
        if (value && _typeof(window.d3) === 'object') {
          this._loadData();
        }
      },
      _loadData: function _loadData() {
        var _this2 = this;

        if (this._loaded && Date.now() - this._loaded < 300000) {
          // don't reload within 5 minutes
          return;
        }

        var client = cv.io.BackendConnections.getClient();
        var url;

        var dataSets = this._element.querySelectorAll(':scope > dataset');

        var promises = [];
        this._dataSetConfigs = {};

        var _iterator = _createForOfIteratorHelper(dataSets),
            _step;

        try {
          var _loop = function _loop() {
            var dataSet = _step.value;
            var ts = {
              showArea: true,
              color: '#FF9900',
              type: dataSet.getAttribute('type') || 'line',
              start: 'end-1day',
              end: 'now',
              xFormat: _this2._element.getAttribute('x-format') || '%H:%M',
              xTicks: d3.timeHour.every(4)
            };
            var attr = void 0;
            var name = void 0;
            var value = void 0;

            for (var i = 0; i < dataSet.attributes.length; i++) {
              attr = dataSet.attributes.item(i); // CamelCase attribute names

              name = attr.name.split('-').map(function (part, i) {
                if (i > 0) {
                  return "".concat(part.substring(0, 1).toUpperCase()).concat(part.substring(1));
                }

                return part;
              }).join('');
              value = attr.value;

              if (name === 'series') {
                switch (value) {
                  case 'hour':
                    ts.xTicks = d3.timeMinute.every(5);
                    ts.start = 'end-1' + value;
                    break;

                  case 'day':
                    ts.xTicks = d3.timeHour.every(4);
                    ts.start = 'end-1' + value;
                    break;

                  case 'week':
                    ts.xTicks = d3.timeDay.every(1);
                    ts.start = 'end-1' + value;
                    break;

                  case 'month':
                    ts.xTicks = d3.timeDay.every(5);
                    ts.start = 'end-1' + value;
                    break;

                  case 'year':
                    ts.xTicks = d3.timeDay.every(31);
                    ts.start = 'end-1' + value;
                    break;
                }
              } else {
                if (value === 'true' || value === 'false') {
                  value = value === 'true';
                } else if (/^\d+$/.test(value)) {
                  value = parseInt(value);
                } else if (/^[\d.]+$/.test(value)) {
                  value = parseFloat(value);
                }

                ts[name] = value;
              }
            }

            var start = new Date();
            start.setTime(start.getTime() - 86400000);
            url = client.getResourcePath('charts', {
              src: ts.src,
              start: ts.start,
              end: ts.end
            });

            if (!url) {
              return "continue";
            }

            _this2._dataSetConfigs[ts.src] = ts;
            promises.push(cv.io.Fetch.fetch(url, null, false, client).then(function (data) {
              if (client.hasCustomChartsDataProcessor(data)) {
                data = client.processChartsData(data, ts);
              }

              return {
                data: data,
                ts: ts
              };
            })["catch"](function (err) {
              _this2._onStatusError(ts, url, err);
            }));
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();

            if (_ret === "continue") continue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        Promise.all(promises).then(function (responses) {
          _this2._onSuccess(responses);
        });
      },
      _onSuccess: function _onSuccess(data) {
        var _this3 = this;

        if (!this.isVisible()) {
          return;
        }

        var chartData = [];

        var _iterator2 = _createForOfIteratorHelper(data),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entry = _step2.value;
            var tsdata = entry.data;

            if (tsdata !== null) {
              var _iterator3 = _createForOfIteratorHelper(tsdata),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var _step3$value = _slicedToArray(_step3.value, 2),
                      time = _step3$value[0],
                      value = _step3$value[1];

                  chartData.push({
                    src: entry.ts.src,
                    time: time,
                    value: value
                  });
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        var minVal = d3.min(chartData, function (d) {
          return +d.value;
        });
        var maxVal = d3.max(chartData, function (d) {
          return +d.value;
        }) + 1;

        if (minVal > 1.0) {
          minVal -= 1;
        }

        var format = this._element.hasAttribute('y-format') ? this._element.getAttribute('y-format') : '%s';
        this._chart = this._lineChart(chartData, {
          x: function x(d) {
            return d.time;
          },
          y: function y(d) {
            return d.value;
          },
          z: function z(d) {
            return d.src;
          },
          color: function color(d) {
            return d && _this3._dataSetConfigs[d].color;
          },
          title: function title(d) {
            return cv.util.String.sprintf(format, d.value);
          },
          //yLabel: ts.unit,
          xDomain: d3.extent(chartData, function (d) {
            return d.time;
          }),
          yDomain: [minVal, maxVal],
          showArea: function showArea(d) {
            return _this3._dataSetConfigs[d].showArea;
          },
          mixBlendMode: 'normal',
          xFormat: this.multiTimeFormat([['.%L', function (d) {
            return d.getMilliseconds();
          }], [':%S', function (d) {
            return d.getSeconds();
          }], ['%H:%M', function (d) {
            return d.getMinutes();
          }], ['%H', function (d) {
            return d.getHours();
          }], ['%a %d', function (d) {
            return d.getDay() && d.getDate() !== 1;
          }], ['%b %d', function (d) {
            return d.getDate() !== 1;
          }], ['%B', function (d) {
            return d.getMonth();
          }], ['%Y', function () {
            return true;
          }]])
        });
        this._loaded = Date.now();
      },
      multiTimeFormat: function multiTimeFormat(formatsArray) {
        /**
        * @param date
        */
        function multiFormat(date) {
          var i = 0;
          var found = false;
          var fmt = '%c';

          while (!found && i < formatsArray.length) {
            found = formatsArray[i][1](date);

            if (found) {
              fmt = formatsArray[i][0];
            }

            i++;
          }

          return fmt;
        }

        return function (date) {
          return d3.timeFormat(multiFormat(date))(date);
        };
      },
      _onStatusError: function _onStatusError(ts, key, err) {
        cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
          title: qx.locale.Manager.tr('Communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), err)
        });
        this.error('Chart _onStatusError', ts, key, err);
      },

      /**
       * Copyright 2021 Observable, Inc.
       * Released under the ISC license.
       * https://observablehq.com/@d3/multi-line-chart
       *
       * @param data
       * @param c
       * @private
       */
      _lineChart: function _lineChart(data, c) {
        if (!cv.ui.structure.tile.components.Chart.CONFIG) {
          cv.ui.structure.tile.components.Chart.CONFIG = {
            x: function x(d) {
              return d[0];
            },
            // given d in data, returns the (temporal) x-value
            y: function y(d) {
              return d[1];
            },
            // given d in data, returns the (quantitative) y-value
            z: function z() {
              return 1;
            },
            // given d in data, returns the (categorical) z-value
            title: undefined,
            // given d in data, returns the title text
            defined: undefined,
            // for gaps in data
            curve: d3.curveLinear,
            // method of interpolation between points
            marginTop: 24,
            // top margin, in pixels
            marginRight: 24,
            // right margin, in pixels
            marginBottom: 24,
            // bottom margin, in pixels
            marginLeft: 30,
            // left margin, in pixels
            width: 392,
            // outer width, in pixels
            height: 192,
            // outer height, in pixels
            xType: d3.scaleTime,
            // type of x-scale
            xDomain: undefined,
            // [xmin, xmax]
            xRange: undefined,
            // [left, right]
            xFormat: undefined,
            // a format specifier string for the x-axis
            yType: d3.scaleLinear,
            // type of y-scale
            yDomain: undefined,
            // [ymin, ymax]
            yRange: undefined,
            // [bottom, top]
            yFormat: undefined,
            // a format specifier string for the y-axis
            yLabel: undefined,
            // a label for the y-axis
            zDomain: undefined,
            // array of z-values
            color: 'currentColor',
            // stroke color of line, as a constant or a function of *z*
            strokeLinecap: undefined,
            // stroke line cap of line
            strokeLinejoin: undefined,
            // stroke line join of line
            strokeWidth: 1.5,
            // stroke width of line
            strokeOpacity: undefined,
            // stroke opacity of line
            mixBlendMode: 'multiply',
            // blend mode of lines
            showArea: undefined,
            // show area below the line,
            xPadding: 0.1 // amount of x-range to reserve to separate bars

          };
        }

        var config = Object.assign({}, cv.ui.structure.tile.components.Chart.CONFIG, c);
        config.xRange = [config.marginLeft, config.width - config.marginRight]; // [left, right]

        config.yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]
        // Compute values.

        var X = d3.map(data, config.x);
        var Y = d3.map(data, config.y);
        var Z = d3.map(data, config.z);
        var O = d3.map(data, function (d) {
          return d;
        });

        if (config.defined === undefined) {
          config.defined = function (d, i) {
            return !isNaN(X[i]) && !isNaN(Y[i]);
          };
        } //const D = d3.map(data, config.defined);
        // Compute default domains, and unique the z-domain.


        if (config.xDomain === undefined) {
          config.xDomain = d3.extent(X);
        }

        if (config.yDomain === undefined) {
          config.yDomain = [0, d3.max(Y, function (d) {
            return typeof d === 'string' ? +d : d;
          })];
        }

        if (config.zDomain === undefined) {
          config.zDomain = Z;
        }

        config.zDomain = new d3.InternSet(config.zDomain); // Omit any data not present in the z-domain.

        var I = d3.range(X.length).filter(function (i) {
          return config.zDomain.has(Z[i]);
        }); // Construct scales and axes.

        var xScale = config.xType(config.xDomain, config.xRange);
        var yScale = config.yType(config.yDomain, config.yRange);
        var xAxis = d3.axisBottom(xScale).ticks(config.width / 80).tickSizeOuter(0).tickFormat(config.xFormat);
        var yAxis = d3.axisLeft(yScale).ticks(config.height / 60, config.yFormat); // Compute titles.

        var T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);
        d3.select(this._element).select('svg').remove();
        var linePath;

        var pointerMoved = function pointerMoved(event) {
          var _d3$pointer = d3.pointer(event),
              _d3$pointer2 = _slicedToArray(_d3$pointer, 2),
              xm = _d3$pointer2[0],
              ym = _d3$pointer2[1];

          var i = d3.least(I, function (i) {
            return Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym);
          }); // closest point

          dot.attr('transform', "translate(".concat(xScale(X[i]), ",").concat(yScale(Y[i]), ")"));

          if (T) {
            dot.select('text').text(T[i]);
          }

          svg.property('value', O[i]).dispatch('input', {
            bubbles: true
          });
        };

        var pointerEntered = function pointerEntered() {
          dot.attr('display', null);
        };

        var pointerLeft = function pointerLeft() {
          dot.attr('display', 'none');
          svg.node().value = null;
          svg.dispatch('input', {
            bubbles: true
          });
        };

        var svg = d3.select(this._element).append('svg').attr('width', config.width).attr('height', config.height).attr('viewBox', [0, 0, config.width, config.height]).attr('style', 'max-width: 100%; height: auto; height: intrinsic;').style('-webkit-tap-highlight-color', 'transparent').on('pointerenter', pointerEntered).on('pointermove', pointerMoved).on('pointerleave', pointerLeft).on('touchmove', function (event) {
          var y = event.targetTouches[0].clientY;

          if (linePath) {
            var pathRect = linePath.node().getBoundingClientRect();

            if (y > pathRect.y && y < pathRect.y + pathRect.height) {
              event.preventDefault();
            }
          }
        }, {
          passive: false
        });
        svg.append('g').attr('transform', "translate(0,".concat(config.height - config.marginBottom, ")")).call(xAxis);
        svg.append('g').attr('transform', "translate(".concat(config.marginLeft, ",0)")).call(yAxis).call(function (g) {
          return g.select('.domain').remove();
        }).call(function (g) {
          return g.append('text').attr('x', -config.marginLeft).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text(config.yLabel);
        });
        var lineGroups = new Map();
        var areaGroups = new Map();
        var barGroups = new Map();

        var _iterator4 = _createForOfIteratorHelper(I),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var i = _step4.value;
            var key = Z[i];

            if (typeof config.showArea === 'function' && config.showArea(key)) {
              if (!areaGroups.has(key)) {
                areaGroups.set(key, []);
              }

              areaGroups.get(key).push(i);
            }

            switch (this._dataSetConfigs[key].type) {
              case 'line':
                if (!lineGroups.has(key)) {
                  lineGroups.set(key, []);
                }

                lineGroups.get(key).push(i);
                break;

              case 'bar':
                if (!barGroups.has(key)) {
                  barGroups.set(key, []);
                }

                barGroups.get(key).push(i);
                break;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (lineGroups.size > 0) {
          // Construct a line generator.
          var line = d3.line() //.defined(i => D[i])
          .curve(config.curve).x(function (i) {
            return xScale(X[i]);
          }).y(function (i) {
            return yScale(Y[i]);
          });
          linePath = svg.append('g').attr('fill', 'none').attr('stroke', typeof config.color === 'string' ? config.color : null).attr('stroke-linecap', config.strokeLinecap).attr('stroke-linejoin', config.strokeLinejoin).attr('stroke-width', config.strokeWidth).attr('stroke-opacity', config.strokeOpacity).selectAll('path').data(lineGroups).join('path').style('mix-blend-mode', config.mixBlendMode).attr('stroke', typeof config.color === 'function' ? function (p) {
            return config.color(p[0]);
          } : null).attr('d', function (d) {
            return line(d[1]);
          });
        } // Add the area


        if (areaGroups.size > 0) {
          var area = d3.area() //.defined(i => D[i])
          .curve(config.curve).x(function (i) {
            return xScale(X[i]);
          }).y0(function () {
            return config.yRange[0];
          }).y1(function (i) {
            return yScale(Y[i]);
          });
          svg.append('g').attr('stroke', 'none').attr('fill', typeof config.color === 'string' ? config.color + '30' : null).selectAll('path').data(areaGroups).join('path').style('mix-blend-mode', config.mixBlendMode).attr('fill', typeof config.color === 'function' ? function (p) {
            return config.color(p[0]) + '30';
          } : null).attr('d', function (d) {
            return area(d[1]);
          });
        }

        if (barGroups.size > 0) {
          var xBarScale = d3.scaleBand().domain(X).range(config.xRange).padding(config.xPadding);
          svg.append('g').selectAll('g').data(barGroups).join('g').attr('fill', typeof config.color === 'function' ? function (d) {
            return config.color(d[0]) + '30';
          } : null).selectAll('rect').data(function (d) {
            return d[1].map(function (val) {
              return {
                key: d[0],
                value: val
              };
            });
          }).join('rect').attr('x', function (d) {
            return xBarScale(X[d.value]);
          }).attr('y', function (d) {
            return yScale(Y[d.value]);
          }).attr('height', function (d) {
            return config.yRange[0] - yScale(Y[d.value]);
          }).attr('width', xBarScale.bandwidth());
        }

        var dot = svg.append('g').attr('display', 'none').attr('fill', 'currentColor');
        dot.append('circle').attr('r', 2.5);
        dot.append('text').attr('font-family', 'sans-serif').attr('font-size', 10).attr('text-anchor', 'middle').attr('y', -8);
        return Object.assign(svg.node(), {
          value: null
        });
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._chart = null;
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'chart', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Chart.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Chart.js.map?dt=1664784615016