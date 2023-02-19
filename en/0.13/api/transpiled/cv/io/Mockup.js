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
      "cv.io.AbstractClient": {
        "construct": true,
        "require": true
      },
      "cv.io.IClient": {
        "require": true
      },
      "cv.io.Client": {
        "construct": true
      },
      "cv.data.Model": {
        "construct": true
      },
      "qx.io.request.Xhr": {},
      "cv.Config": {},
      "qx.dev.unit.Sinon": {},
      "qx.dev.FakeServer": {},
      "qx.util.Uri": {},
      "cv.report.Record": {},
      "qx.log.Logger": {},
      "qx.event.Timer": {},
      "cv.Transform": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Mockup.js
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

  /**
   * Mockup simulating a backend + client for the Cometvisu protocol
   *
   * @author Tobias Bräutigam
   * @since 2016
   */
  /* istanbul ignore next */
  qx.Class.define('cv.io.Mockup', {
    extend: cv.io.AbstractClient,
    implement: cv.io.IClient,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      var _this = this;
      cv.io.AbstractClient.constructor.call(this);
      cv.io.Client.CLIENTS.push(this);
      // make some functions accessible for the protractor runner
      window._receive = this.receive.bind(this);
      var model = cv.data.Model.getInstance();
      window._widgetDataGet = model.getWidgetData.bind(model);
      window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
      window.writeHistory = [];
      var testMode = false;
      if (typeof testMode === 'string' && testMode !== 'true') {
        this.__P_522_0(testMode);
      }
      this.addresses = [];
      var file = this._resources['simulation'];
      if (file) {
        this.__P_522_0(file);
      } else {
        this.addListener('resourcePathAdded', function (ev) {
          switch (ev.getData()) {
            case 'simulation':
              {
                var _file = _this._resources['simulation'];
                if (_file) {
                  _this.__P_522_0(_file);
                }
                break;
              }
          }
        });
      }
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      dataReceived: {
        check: 'Boolean',
        init: true
      },
      server: {
        check: 'String',
        init: 'Mockup'
      },
      connected: {
        check: 'Boolean',
        init: true,
        event: 'changeConnected'
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_522_1: false,
      __P_522_2: false,
      backendName: 'mockup',
      addresses: null,
      __P_522_3: null,
      __P_522_4: null,
      __P_522_5: 0,
      __P_522_6: null,
      getType: function getType() {
        return this.backendName;
      },
      __P_522_0: function __P_522_0(file) {
        var _this2 = this;
        // load the demo data to fill the visu with some values
        var r = new qx.io.request.Xhr(file);
        r.addListener('success', function (e) {
          cv.Config.initialDemoData = e.getTarget().getResponse();
          _this2.__P_522_1 = true;
          _this2.__P_522_7();
        });
        r.send();
      },
      __P_522_7: function __P_522_7() {
        var _this3 = this;
        this.__P_522_3 = cv.Config.initialDemoData.xhr;

        // we need to adjust the timestamps of the chart data
        var now = Date.now();
        for (var url in this.__P_522_3) {
          if (url.startsWith('rrd')) {
            this.__P_522_3[url].forEach(function (d) {
              var data = d.body;
              var offset = now - data[data.length - 1][0];
              data.forEach(function (entry) {
                return entry[0] += offset;
              });
            });
          } else if (url.startsWith('resource/plugin/rsslog.php')) {
            this.__P_522_3[url].forEach(function (d) {
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
              var xhr = that.defake(this, xhrArgs);
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
          } else if (method === 'GET' && (url.indexOf('resource/visu_config') >= 0 || url.indexOf('resource/demo/visu_config') >= 0 || url.indexOf('resource/hidden-schema.json') >= 0 || url.indexOf('resource/manager/') >= 0) || url.startsWith(_this3.getResourcePath('charts'))) {
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
          if (!parsed.host || parsed.host === window.location.host) {
            url = cv.report.Record.normalizeUrl(request.url);
            if (url.startsWith(window.location.pathname)) {
              url = url.substr(window.location.pathname.length - 1);
            }
          }
          if (!this.__P_522_3[url] || this.__P_522_3[url].length === 0) {
            qx.log.Logger.error(this, '404: no logged responses for URI ' + url + ' found');
          } else {
            qx.log.Logger.debug(this, 'faking response for ' + url);
            var response = '';
            if (this.__P_522_3[url].length === 1) {
              response = this.__P_522_3[url][0];
            } else {
              // multiple responses recorded use them as LIFO stack
              response = this.__P_522_3[url].shift();
            }
            if (request.readyState === 4 && request.status === 404) {
              // This is a hack, sometimes the request has a 404 status and send readystate
              // the response would fail if we do not override it here
              request.readyState = 1;
            }
            request.respond(response.status, response.headers, JSON.stringify(response.body));
          }
        }.bind(this));
        this.__P_522_8();
      },
      defake: function defake(fakeXhr, xhrArgs) {
        // eslint-disable-next-line new-cap
        var xhr = new sinon.xhr.workingXHR();
        ['open', 'setRequestHeader', 'send', 'abort', 'getResponseHeader', 'getAllResponseHeaders', 'addEventListener', 'overrideMimeType', 'removeEventListener'].forEach(function (method) {
          fakeXhr[method] = function () {
            return xhr[method].apply(xhr, arguments);
          };
        });
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
        var stateChange = function stateChange() {
          fakeXhr.readyState = xhr.readyState;
          if (xhr.readyState >= sinon.FakeXMLHttpRequest.HEADERS_RECEIVED) {
            copyAttrs(['status', 'statusText']);
          }
          if (xhr.readyState >= sinon.FakeXMLHttpRequest.LOADING) {
            copyAttrs(['responseText']);
          }
          if (xhr.readyState === sinon.FakeXMLHttpRequest.DONE) {
            copyAttrs(['responseXML']);
          }
          if (fakeXhr.onreadystatechange) {
            fakeXhr.onreadystatechange({
              target: fakeXhr
            });
          }
        };
        if (xhr.addEventListener) {
          var _loop = function _loop(event) {
            // eslint-disable-next-line no-prototype-builtins
            if (fakeXhr.eventListeners.hasOwnProperty(event)) {
              fakeXhr.eventListeners[event].forEach(function (handler) {
                xhr.addEventListener(event, handler);
              });
            }
          };
          for (var event in fakeXhr.eventListeners) {
            _loop(event);
          }
          xhr.addEventListener('readystatechange', stateChange);
        } else {
          xhr.onreadystatechange = stateChange;
        }
        return xhr;
      },
      /**
       * This function gets called once the communication is established and session information is available
       * @param json
       */
      receive: function receive(json) {
        if (json) {
          cv.io.Client.CLIENTS.forEach(function (client) {
            client.update(json.d);
          });
        }
      },
      login: function login(loginOnly, credentials, callback, context) {
        if (callback) {
          callback.call(context);
        }
      },
      _registerSimulations: function _registerSimulations(simulations) {
        this.__P_522_6 = {};
        Object.keys(simulations).forEach(function (mainAddress) {
          var simulation = simulations[mainAddress];
          this.__P_522_6[mainAddress] = simulation;
          if (Object.prototype.hasOwnProperty.call(simulation, 'additionalAddresses')) {
            simulation.additionalAddresses.forEach(function (addr) {
              this.__P_522_6[addr] = simulation;
            }, this);
          }
        }, this);
      },
      _startSequence: function _startSequence() {
        if (this.__P_522_4.length <= this.__P_522_5) {
          // start again
          this.__P_522_5 = 0;
        }
        qx.event.Timer.once(function () {
          this.receive({
            i: new Date().getTime(),
            d: this.__P_522_4[this.__P_522_5].data
          });
          this.__P_522_5++;
          this._startSequence();
        }, this, this.__P_522_4[this.__P_522_5].delay);
      },
      _processSimulation: function _processSimulation(address, value) {
        var _this4 = this;
        var simulation = this.__P_522_6[address];
        if (!simulation) {
          return;
        }
        if (this.__P_522_2 && address in this._addressConfigs) {
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
            } else if (this.__P_522_2 && simulation.targetAddress in this._addressConfigs) {
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
                if (_this4.__P_522_2 && simulation.targetAddress in _this4._addressConfigs) {
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
      /**
       * Subscribe to the addresses in the parameter
       * @param addresses
       */
      subscribe: function subscribe(addresses) {
        this.addresses = addresses ? addresses : [];
        this.__P_522_8();
      },
      __P_522_8: function __P_522_8() {
        var _this5 = this;
        if (cv.Config.initialDemoData && this.addresses.length > 0) {
          if (cv.Config.initialDemoData.encodeFirst) {
            this.__P_522_2 = true;
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
            var _loop2 = function _loop2(ga) {
              if (ga in _this5._addressConfigs) {
                // startValues
                var sim = cv.Config.initialDemoData.simulations[ga];
                var mapping = function mapping(valueArray) {
                  return valueArray.map(function (val) {
                    if (val.indexOf('|') >= 0) {
                      var _val$split = val.split('|'),
                        _val$split2 = _slicedToArray(_val$split, 2),
                        startAddress = _val$split2[0],
                        startVal = _val$split2[1];
                      if (startAddress in _this5._addressConfigs) {
                        return startAddress + '|' + cv.Transform.encodeBusAndRaw(_this5._addressConfigs[ga], startVal).raw;
                      }
                      return val;
                    }
                    return cv.Transform.encodeBusAndRaw(_this5._addressConfigs[ga], val).raw;
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
          this.receive({
            i: new Date().getTime(),
            d: cv.Config.initialDemoData.states
          });
          if (cv.Config.initialDemoData.sequence) {
            this.__P_522_4 = cv.Config.initialDemoData.sequence;
            this._startSequence();
          }
          if (cv.Config.initialDemoData.simulations) {
            this._registerSimulations(cv.Config.initialDemoData.simulations);
          }
          cv.Config.initialDemoData = null;
        }
      },
      __P_522_9: function __P_522_9(address, value) {
        if (/\d{1,2}\/\d{1,2}\/\d{1,2}/.test(address)) {
          if (/^[\da-fA-F]+$/.test(value)) {
            if (value.length <= 2) {
              value = '' + (parseInt(value, 16) & 63);
            } else {
              value = value.substring(2);
            }
          }
        }
        return value;
      },
      /**
       * This function sends a value
       * @param address
       * @param value
       */
      write: function write(address, value) {
        if (cv.report.Record.REPLAYING === true) {
          // do nothing in replay mode
          return;
        }
        var ts = new Date().getTime();
        // store in window, to make it accessible for protractor
        var lastWrite = {
          address: address,
          value: value,
          ts: ts
        };
        value = this.__P_522_9(address, value);
        if (this.__P_522_6 && Object.prototype.hasOwnProperty.call(this.__P_522_6, address)) {
          this._processSimulation(address, value);
        } else {
          // send update
          var answer = {
            i: ts,
            d: {}
          };
          lastWrite.transformedValue = value;
          answer.d[address] = value;
          this.debug('sending value: ' + value + ' to address: ' + address);
          this.receive(answer);
        }
        // store in window, to make it accessible for protractor
        window.writeHistory.push(lastWrite);
      },
      restart: function restart() {},
      stop: function stop() {},
      getResourcePath: function getResourcePath(name, map) {
        if (cv.Config.testMode) {
          // fallback to old behaviour just for screenshot generation / testing
          if (name === 'charts' && map && map.src) {
            return name + '/' + map.src;
          }
          return name;
        }
        var basePath = '';
        if (Object.prototype.hasOwnProperty.call(this._resources, name)) {
          basePath = this._resources[name];
          if (basePath && !basePath.endsWith('/')) {
            basePath += '/';
          }
        }
        if (name === 'charts' && map && map.src) {
          return basePath + map.src;
        }
        return basePath;
      },
      getLastError: function getLastError() {
        return null;
      },
      getBackend: function getBackend() {
        return {};
      },
      authorize: function authorize(req) {},
      terminate: function terminate() {},
      update: function update(json) {},
      record: function record(type, data) {},
      showError: function showError(type, message, args) {},
      // not used / needed in this client
      setInitialAddresses: function setInitialAddresses(addresses) {},
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {
        return false;
      },
      processChartsData: function processChartsData(data) {
        return data;
      },
      hasProvider: function hasProvider(name) {
        return false;
      },
      getProviderUrl: function getProviderUrl(name) {
        return null;
      },
      getProviderConvertFunction: function getProviderConvertFunction(name, format) {
        return null;
      },
      getProviderData: function getProviderData(name, format) {
        return null;
      }
    }
  });
  cv.io.Mockup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mockup.js.map?dt=1676809334294