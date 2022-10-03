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
      "qx.dev.FakeServer": {},
      "qx.util.Uri": {},
      "cv.report.Record": {},
      "qx.log.Logger": {},
      "qx.event.Timer": {}
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
    extend: qx.core.Object,
    implement: cv.io.IClient,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      cv.io.Client.CLIENTS.push(this); // make some functions accessible for the protractor runner

      window._receive = this.receive.bind(this);
      var model = cv.data.Model.getInstance();
      window._widgetDataGet = model.getWidgetData.bind(model);
      window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
      window.writeHistory = [];
      var testMode = false;

      if (typeof testMode === 'string' && testMode !== 'true') {
        this.__P_506_0();
      }

      this.addresses = [];
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
      backendName: 'mockup',
      addresses: null,
      __P_506_1: null,
      __P_506_2: null,
      __P_506_3: 0,
      __P_506_4: null,
      getType: function getType() {
        return this.backendName;
      },
      __P_506_0: function __P_506_0() {
        // load the demo data to fill the visu with some values
        var r = new qx.io.request.Xhr(false);
        r.addListener('success', function (e) {
          cv.Config.initialDemoData = e.getTarget().getResponse();

          this.__P_506_5();
        }, this);
        r.send();
      },
      __P_506_5: function __P_506_5() {
        this.__P_506_1 = cv.Config.initialDemoData.xhr; // we need to adjust the timestamps of the chart data

        var now = Date.now();

        for (var url in this.__P_506_1) {
          if (url.startsWith('rrd')) {
            this.__P_506_1[url].forEach(function (d) {
              var data = d.body;
              var offset = now - data[data.length - 1][0];
              data.forEach(function (entry) {
                return entry[0] += offset;
              });
            });
          } else if (url.startsWith('resource/plugin/rsslog.php')) {
            this.__P_506_1[url].forEach(function (d) {
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

        var that = this; // override sinons filter handling to be able to manipulate the target URL from the filter
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
        }; // configure server


        qx.dev.FakeServer.getInstance().addFilter(function (args) {
          var method = args[0];
          var url = args[1];

          if (url.startsWith('https://sentry.io')) {
            return true;
          } else if (method === 'GET' && (url.indexOf('resource/visu_config') >= 0 || url.indexOf('resource/demo/visu_config') >= 0 || url.indexOf('resource/hidden-schema.json') >= 0 || url.indexOf('resource/manager/') >= 0)) {
            return true;
          } else if (method === 'GET' && /rest\/manager\/index.php\/fs\?path=.+\.[\w]+$/.test(url)) {
            // change url to avoid API access and do a real request
            var path = url.split('=').pop();
            var suffix = path.startsWith('demo/') ? '' : 'config/';
            args[1] = window.location.pathname + 'resource/' + suffix + path;
            return true;
          }

          return false;
        }, this);
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

          if (!this.__P_506_1[url] || this.__P_506_1[url].length === 0) {
            qx.log.Logger.error(this, '404: no logged responses for URI ' + url + ' found');
          } else {
            qx.log.Logger.debug(this, 'faking response for ' + url);
            var response = '';

            if (this.__P_506_1[url].length === 1) {
              response = this.__P_506_1[url][0];
            } else {
              // multiple responses recorded use them as LIFO stack
              response = this.__P_506_1[url].shift();
            }

            if (request.readyState === 4 && request.status === 404) {
              // This is a hack, sometimes the request has a 404 status and send readystate
              // the respond would fail if we do not override it here
              request.readyState = 1;
            }

            request.respond(response.status, response.headers, JSON.stringify(response.body));
          }
        }.bind(this));
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
        this.__P_506_4 = {};
        Object.keys(simulations).forEach(function (mainAddress) {
          var simulation = simulations[mainAddress];
          this.__P_506_4[mainAddress] = simulation;

          if (Object.prototype.hasOwnProperty.call(simulation, 'additionalAddresses')) {
            simulation.additionalAddresses.forEach(function (addr) {
              this.__P_506_4[addr] = simulation;
            }, this);
          }
        }, this);
      },
      _startSequence: function _startSequence() {
        if (this.__P_506_2.length <= this.__P_506_3) {
          // start again
          this.__P_506_3 = 0;
        }

        qx.event.Timer.once(function () {
          this.receive({
            i: new Date().getTime(),
            d: this.__P_506_2[this.__P_506_3].data
          });
          this.__P_506_3++;

          this._startSequence();
        }, this, this.__P_506_2[this.__P_506_3].delay);
      },
      _processSimulation: function _processSimulation(address, value) {
        var simulation = this.__P_506_4[address];

        if (!simulation) {
          return;
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
            // the the more general ones
            start = simulation.startValues.indexOf(value) >= 0;
            stop = simulation.startValues.indexOf(value) >= 0;
          }
        }

        if (start) {
          // start simulation
          if (simulation.type === 'shutter') {
            simulation.direction = value === '0' ? 'up' : 'down';
            var initValue = cv.data.Model.getInstance().getState(simulation.targetAddress);

            if (initValue === undefined) {
              initValue = 0;
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
                update.d[simulation.targetAddress] = newValue;
                this.receive(update);

                if (simulation.value !== newValue) {
                  simulation.value = newValue;
                }
              }, this);
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

        var ts = new Date().getTime(); // store in window, to make it accessible for protractor

        var lastWrite = {
          address: address,
          value: value,
          ts: ts
        };

        if (this.__P_506_4 && Object.prototype.hasOwnProperty.call(this.__P_506_4, address)) {
          this._processSimulation(address, value);
        } else {
          // send update
          var answer = {
            i: ts,
            d: {}
          };

          if (/\d{1,2}\/\d{1,2}\/\d{1,2}/.test(address)) {
            if (/^[\da-fA-F]+$/.test(value)) {
              if (value.length <= 2) {
                value = '' + (parseInt(value, 16) & 63);
              } else {
                value = value.substring(2);
              }

              lastWrite.transformedValue = value;
            }
          }

          answer.d[address] = value;
          this.debug('sending value: ' + value + ' to address: ' + address);
          this.receive(answer);
        } // store in window, to make it accessible for protractor


        window.writeHistory.push(lastWrite);
      },
      restart: function restart() {},
      stop: function stop() {},
      getResourcePath: function getResourcePath(name) {
        if (name === 'charts') {
          return null;
        }

        return name;
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
      }
    }
  });
  cv.io.Mockup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mockup.js.map?dt=1664784654046