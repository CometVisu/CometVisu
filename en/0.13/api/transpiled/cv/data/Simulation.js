function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qx.io.request.Xhr": {},
      "cv.Config": {},
      "qx.dev.unit.Sinon": {},
      "qx.dev.FakeServer": {},
      "qx.util.Uri": {},
      "cv.report.Record": {},
      "qx.log.Logger": {},
      "cv.Transform": {},
      "qx.event.Timer": {},
      "cv.data.Model": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Handles all status update simulation used together with the cv.io.Mockup backend e.g. in the demo configs
   */
  qx.Class.define('cv.data.Simulation', {
    extend: qx.core.Object,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(configFile, client) {
      qx.core.Object.constructor.call(this);
      this._client = client;
      // override PHP support check, because the responses are faked
      qx.core.Init.getApplication().setServerHasPhpSupport(true);
      this.init(configFile);
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      initialized: {
        check: 'Boolean',
        init: false,
        event: 'changeInitialized'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * @var {cv.io.Mockup}
       */
      _client: null,
      __P_557_0: null,
      __P_557_1: false,
      __P_557_2: null,
      __P_557_3: 0,
      _addressConfigs: null,
      init: function init(configFile) {
        var _this = this;
        // load the demo data to fill the visu with some values
        var r = new qx.io.request.Xhr(configFile);
        r.addListener('success', function (e) {
          cv.Config.initialDemoData = e.getTarget().getResponse();
          _this.__P_557_4();
          _this.setInitialized(true);
          _this.debug('simulator data has been loaded');
        });
        r.addListener('fail', function () {
          _this.error('failed parsing demo data');
        });
        r.send();
      },
      __P_557_4: function __P_557_4() {
        var _this2 = this;
        this.__P_557_5 = cv.Config.initialDemoData.xhr;

        // we need to adjust the timestamps of the chart data
        var now = Date.now();
        for (var url in this.__P_557_5) {
          if (url.startsWith('rrd')) {
            this.__P_557_5[url].forEach(function (d) {
              var data = d.body;
              var offset = now - data[data.length - 1][0];
              data.forEach(function (entry) {
                return entry[0] += offset;
              });
            });
          } else if (url.startsWith('resource/plugin/rsslog.php')) {
            this.__P_557_5[url].forEach(function (d) {
              var data = d.body.responseData.feed.entries;
              var date = new Date();
              date.setDate(date.getDate() - 1);
              data.forEach(function (entry) {
                entry.publishedDate = date.toUTCString();
                date.setTime(date.getTime() + 3600000);
              });
            });
          }
        }
        var that = this;
        var sinon = qx.dev.unit.Sinon.getSinon();
        sinon.sandbox = sinon;

        // override sinons filter handling to be able to manipulate the target URL from the filter
        // eslint-disable-next-line consistent-return
        sinon.FakeXMLHttpRequest.prototype.open = function open(method, url, async, username, password) {
          this.method = method;
          this.url = url;
          this.async = typeof async == 'boolean' ? async : true;
          this.username = username;
          this.password = password;
          this.responseText = null;
          this.responseXML = null;
          this.requestHeaders = {};
          this.sendFlag = false;
          if (sinon.FakeXMLHttpRequest.useFilters === true) {
            var xhrArgs = arguments;
            var defake = sinon.FakeXMLHttpRequest.filters.some(function (filter) {
              return filter.call(this, xhrArgs);
            });
            if (defake) {
              var xhr = that.deFake(this, xhrArgs);
              xhr.open.apply(xhr, xhrArgs);
              xhr.setRequestHeader('Accept', 'text/*, image/*');
              return;
            }
          }
          this.readyStateChange(sinon.FakeXMLHttpRequest.OPENED);
        };

        // configure server
        qx.dev.FakeServer.getInstance().addFilter(function (args) {
          var method = args[0];
          var url = args[1];
          if (url.startsWith('https://sentry.io')) {
            return true;
          } else if (method === 'GET' && (url.indexOf('resource/visu_config') >= 0 || url.indexOf('resource/demo/visu_config') >= 0 || url.indexOf('resource/hidden-schema.json') >= 0 || url.indexOf('resource/manager/') >= 0) || url.startsWith(_this2._client.getResourcePath('charts')) && !url.startsWith(_this2._client.getResourcePath('charts') + 'generator:')) {
            return true;
          } else if (method === 'GET' && /rest\/manager\/index.php\/fs\?path=.+\.[\w]+$/.test(url)) {
            // change url to avoid API access and do a real request
            var path = url.split('=').pop();
            var suffix = path.startsWith('demo/') ? '' : 'config/';
            args[1] = window.location.pathname + 'resource/' + suffix + path;
            return true;
          }
          return false;
        });
        var server = qx.dev.FakeServer.getInstance().getFakeServer();
        server.respondWith(function (request) {
          var parsed = qx.util.Uri.parseUri(request.url);
          var url = request.url;
          if (url.startsWith(this._client.getResourcePath('charts') + 'generator:')) {
            var generatorName = parsed.path.split('generator:').pop();
            request.respond(200, {
              'Content-type': 'application/json'
            }, JSON.stringify(this.generate(generatorName, parsed.queryKey)));
            return;
          }
          if (!parsed.host || parsed.host === window.location.host) {
            url = cv.report.Record.normalizeUrl(request.url);
            if (url.startsWith(window.location.pathname)) {
              url = url.substr(window.location.pathname.length - 1);
            }
          }
          if (!this.__P_557_5[url] || this.__P_557_5[url].length === 0) {
            qx.log.Logger.error(this, '404: no logged responses for URI ' + url + ' found');
          } else {
            qx.log.Logger.debug(this, 'faking response for ' + url);
            var response = '';
            if (this.__P_557_5[url].length === 1) {
              response = this.__P_557_5[url][0];
            } else {
              // multiple responses recorded use them as LIFO stack
              response = this.__P_557_5[url].shift();
            }
            if (request.readyState === 4 && request.status === 404) {
              // This is a hack, sometimes the request has a 404 status and send readystate
              // the response would fail if we do not override it here
              request.readyState = 1;
            }
            var body = response.body;
            if (response.headers && response.headers['Content-type'] === 'application/json') {
              body = JSON.stringify(response.body);
            }
            request.respond(response.status, response.headers, body);
          }
        }.bind(this));
      },
      onWrite: function onWrite(address, value) {
        if (this.__P_557_0 && Object.prototype.hasOwnProperty.call(this.__P_557_0, address)) {
          this._processSimulation(address, value);
          return true;
        }
        return false;
      },
      _registerSimulations: function _registerSimulations(simulations) {
        this.__P_557_0 = {};
        Object.keys(simulations).forEach(function (mainAddress) {
          var simulation = simulations[mainAddress];
          this.__P_557_0[mainAddress] = simulation;
          if (Object.prototype.hasOwnProperty.call(simulation, 'additionalAddresses')) {
            simulation.additionalAddresses.forEach(function (addr) {
              this.__P_557_0[addr] = simulation;
            }, this);
          }
        }, this);
      },
      _registerGenerators: function _registerGenerators(generators) {
        var _this3 = this;
        this.__P_557_6 = generators;
        var _loop = function _loop() {
          var gen = _this3.__P_557_6[name];
          gen.interval = setInterval(function () {
            var data = {};
            var value = gen.targetValue + (Math.random() - 0.5) * gen.deviation * 2;
            if (_this3.__P_557_1 && _this3._addressConfigs[gen.address]) {
              value = cv.Transform.encodeBusAndRaw(_this3._addressConfigs[gen.address], value).raw;
            }
            data[gen.address] = value;
            _this3._client.receive({
              i: new Date().getTime(),
              d: data
            });
          }, gen.interval);
        };
        for (var name in this.__P_557_6) {
          _loop();
        }
      },
      generate: function generate(name, options) {
        var generator = this.__P_557_6 ? this.__P_557_6[name] : null;
        var data = [];
        if (generator) {
          if (options) {
            // currently only end=now and start=end-??? is implemented
            var end = Date.now();
            var start = Date.now();
            if (options.start) {
              var match = /end-(\d+)(hour|day|month)/.exec(options.start);
              if (match) {
                var interval = 0;
                switch (match[2]) {
                  case 'hour':
                    interval = 3600000;
                    break;
                  case 'day':
                    interval = 86400000;
                    break;
                  case 'month':
                    // this is not really precise, but good enough to fake some data
                    interval = 2592000000;
                    break;
                }
                start -= parseInt(match[1]) * interval;
              }
            }
            var val = 0;
            for (var i = start; i <= end; i += generator.resolution) {
              val = generator.targetValue + (Math.random() - 0.5) * generator.deviation * 2;
              data.push([i, val]);
            }
          } else {
            // generate only a single value
            return generator.targetValue + (Math.random() - 0.5) * generator.deviation * 2;
          }
        }
        return data;
      },
      _startSequence: function _startSequence() {
        if (this.__P_557_2.length <= this.__P_557_3) {
          // start again
          this.__P_557_3 = 0;
        }
        qx.event.Timer.once(function () {
          this._client.receive({
            i: new Date().getTime(),
            d: this.__P_557_2[this.__P_557_3].data
          });
          this.__P_557_3++;
          this._startSequence();
        }, this, this.__P_557_2[this.__P_557_3].delay);
      },
      _processSimulation: function _processSimulation(address, value) {
        var _this4 = this;
        var simulation = this.__P_557_0[address];
        if (!simulation) {
          return;
        }
        if (this.__P_557_1 && address in this._addressConfigs) {
          value = cv.Transform.encodeBusAndRaw(this._addressConfigs[address], value).raw;
        }
        var start = false;
        var stop = false;
        if (Object.prototype.hasOwnProperty.call(simulation, 'startValues')) {
          // try the more specific matches with address included
          start = simulation.startValues.indexOf(address + '|' + value) >= 0;
          if (Object.prototype.hasOwnProperty.call(simulation, 'stopValues')) {
            stop = simulation.stopValues.indexOf(address + '|' + value) >= 0;
          }
          if (!stop) {
            // the more general ones
            start = simulation.startValues.indexOf(value) >= 0;
            stop = simulation.startValues.indexOf(value) >= 0;
          }
        }
        if (start) {
          // start simulation
          if (simulation.type === 'shutter') {
            simulation.direction = value === '00' ? 'up' : 'down';
            var initValue = cv.data.Model.getInstance().getState(simulation.targetAddress);
            if (initValue === undefined) {
              initValue = 0;
            } else if (this.__P_557_1 && simulation.targetAddress in this._addressConfigs) {
              initValue = cv.Transform.decode(this._addressConfigs[simulation.targetAddress], initValue);
            }
            simulation.value = initValue;
            if (simulation.timer) {
              simulation.timer.stop();
            } else {
              simulation.timer = new qx.event.Timer(simulation.interval || 100);
              var stepSize = simulation.stepSize || 10;
              simulation.timer.addListener('interval', function () {
                var newValue = simulation.value;
                if (simulation.direction === 'up') {
                  // drive up
                  newValue = simulation.value + stepSize;
                  if (newValue > 100) {
                    simulation.timer.stop();
                    return;
                  }
                } else {
                  // drive down
                  newValue = simulation.value - stepSize;
                  if (newValue < 0) {
                    simulation.timer.stop();
                    return;
                  }
                }
                var update = {
                  i: new Date().getTime(),
                  d: {}
                };
                var sendValue = newValue;
                if (_this4.__P_557_1 && simulation.targetAddress in _this4._addressConfigs) {
                  sendValue = cv.Transform.encodeBusAndRaw(_this4._addressConfigs[simulation.targetAddress], newValue).raw;
                }
                update.d[simulation.targetAddress] = sendValue;
                _this4.receive(update);
                if (simulation.value !== newValue) {
                  simulation.value = newValue;
                }
              });
            }
            simulation.timer.start();
          }
        } else if (stop) {
          // stop simulation
          if (simulation.timer) {
            simulation.timer.stop();
          }
        }
      },
      prepareTestData: function prepareTestData(addresses) {
        var _this5 = this;
        if (cv.Config.initialDemoData && addresses.length > 0) {
          if (cv.Config.initialDemoData.encodeFirst) {
            this.__P_557_1 = true;
            // connect address data from widgets first
            this._addressConfigs = {};
            var widgetData = cv.data.Model.getInstance().getWidgetDataModel();
            for (var id in widgetData) {
              if (widgetData[id].address) {
                this._addressConfigs = Object.assign(this._addressConfigs, widgetData[id].address);
              }
            }
            // lookup cv-address elements (tile structure)
            var _iterator = _createForOfIteratorHelper(document.querySelectorAll('cv-address')),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var addressElement = _step.value;
                this._addressConfigs[addressElement.textContent.trim()] = {
                  transform: addressElement.getAttribute('transform')
                };
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            for (var ga in cv.Config.initialDemoData.states) {
              if (ga in this._addressConfigs) {
                cv.Config.initialDemoData.states[ga] = cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], cv.Config.initialDemoData.states[ga]).raw;
              }
            }
            var _iterator2 = _createForOfIteratorHelper(cv.Config.initialDemoData.sequence),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var seq = _step2.value;
                for (var _ga2 in seq.data) {
                  if (_ga2 in this._addressConfigs) {
                    seq.data[_ga2] = cv.Transform.encodeBusAndRaw(this._addressConfigs[_ga2], seq.data[_ga2]).raw;
                  }
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            var _loop2 = function _loop2(_ga) {
              if (_ga in _this5._addressConfigs) {
                // startValues
                var sim = cv.Config.initialDemoData.simulations[_ga];
                var mapping = function mapping(valueArray) {
                  return valueArray.map(function (val) {
                    if (val.indexOf('|') >= 0) {
                      var _val$split = val.split('|'),
                        _val$split2 = _slicedToArray(_val$split, 2),
                        startAddress = _val$split2[0],
                        startVal = _val$split2[1];
                      if (startAddress in _this5._addressConfigs) {
                        return startAddress + '|' + cv.Transform.encodeBusAndRaw(_this5._addressConfigs[_ga], startVal).raw;
                      }
                      return val;
                    }
                    return cv.Transform.encodeBusAndRaw(_this5._addressConfigs[_ga], val).raw;
                  });
                };
                sim.startValues = mapping(sim.startValues);
                sim.stopValues = mapping(sim.stopValues);
              }
            };
            for (var _ga in cv.Config.initialDemoData.simulations) {
              _loop2(_ga);
            }
          }
          this._client.receive({
            i: new Date().getTime(),
            d: cv.Config.initialDemoData.states
          });
          if (cv.Config.initialDemoData.sequence) {
            this.__P_557_2 = cv.Config.initialDemoData.sequence;
            this._startSequence();
          }
          if (cv.Config.initialDemoData.simulations) {
            this._registerSimulations(cv.Config.initialDemoData.simulations);
          }
          if (cv.Config.initialDemoData.generators) {
            this._registerGenerators(cv.Config.initialDemoData.generators);
          }
          cv.Config.initialDemoData = null;
        }
      },
      deFake: function deFake(fakeXhr, xhrArgs) {
        // eslint-disable-next-line new-cap
        var xhr = new sinon.xhr.workingXHR();
        ['open', 'setRequestHeader', 'abort', 'getResponseHeader', 'getAllResponseHeaders', 'addEventListener', 'overrideMimeType', 'removeEventListener'].forEach(function (method) {
          fakeXhr[method] = function () {
            return xhr[method].apply(xhr, arguments);
          };
        });
        fakeXhr.send = function () {
          // Ref: https://xhr.spec.whatwg.org/#the-responsetype-attribute
          if (xhr.responseType !== fakeXhr.responseType) {
            xhr.responseType = fakeXhr.responseType;
          }
          return xhr.send.apply(xhr, arguments);
        };
        var copyAttrs = function copyAttrs(args) {
          args.forEach(function (attr) {
            try {
              fakeXhr[attr] = xhr[attr];
            } catch (e) {
              if (!/MSIE 6/.test(navigator.userAgent)) {
                throw e;
              }
            }
          });
        };
        var stateChangeStart = function stateChangeStart() {
          fakeXhr.readyState = xhr.readyState;
          if (xhr.readyState >= sinon.FakeXMLHttpRequest.HEADERS_RECEIVED) {
            copyAttrs(['status', 'statusText']);
          }
          if (xhr.readyState >= sinon.FakeXMLHttpRequest.LOADING) {
            copyAttrs(['responseText']);
          }
          if (xhr.readyState === sinon.FakeXMLHttpRequest.DONE && (xhr.responseType === '' || xhr.responseType === 'document')) {
            copyAttrs(['responseXML']);
          }
        };
        var stateChangeEnd = function stateChangeEnd() {
          if (fakeXhr.onreadystatechange) {
            // eslint-disable-next-line no-useless-call
            fakeXhr.onreadystatechange.call(fakeXhr, {
              target: fakeXhr,
              currentTarget: fakeXhr
            });
          }
        };
        var stateChange = function stateChange() {
          stateChangeStart();
          stateChangeEnd();
        };
        if (xhr.addEventListener) {
          xhr.addEventListener('readystatechange', stateChangeStart);
          var _loop3 = function _loop3(event) {
            // eslint-disable-next-line no-prototype-builtins
            if (fakeXhr.eventListeners.hasOwnProperty(event)) {
              fakeXhr.eventListeners[event].forEach(function (handler) {
                xhr.addEventListener(event, handler.listener, {
                  capture: handler.capture,
                  once: handler.once
                });
              });
            }
          };
          for (var event in fakeXhr.eventListeners) {
            _loop3(event);
          }
          xhr.addEventListener('readystatechange', stateChangeEnd);
        } else {
          xhr.onreadystatechange = stateChange;
        }
        return xhr;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_557_0 = null;
      this._addressConfigs = null;
      this.__P_557_2 = null;
      this._client = null;
    }
  });
  cv.data.Simulation.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Simulation.js.map?dt=1677345963258