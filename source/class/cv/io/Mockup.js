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
  construct: function() {
    this.base(arguments);
    cv.io.Client.CLIENTS.push(this);
    // make some functions accessible for the protactor runner
    window._receive = this.receive.bind(this);
    const model = cv.data.Model.getInstance();
    window._widgetDataGet = model.getWidgetData.bind(model);
    window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
    window.writeHistory = [];

    const testMode = qx.core.Environment.get('cv.testMode');
    if (typeof testMode === 'string' && testMode !== 'true') {
      this.__loadTestData();
    }
    this.addresses = [];
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    dataReceived : {
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
    __xhr: null,
    __sequence: null,
    __sequenceIndex: 0,
    __simulations: null,

    __loadTestData: function () {
      // load the demo data to fill the visu with some values
      const r = new qx.io.request.Xhr(qx.core.Environment.get('cv.testMode'));
      r.addListener('success', function (e) {
        cv.Config.initialDemoData = e.getTarget().getResponse();
        this.__applyTestData();
      }, this);
      r.send();
    },

    __applyTestData: function () {
      this.__xhr = cv.Config.initialDemoData.xhr;

      const that = this;

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
          let xhrArgs = arguments;
          let defake = sinon.FakeXMLHttpRequest.filters.some(function(filter) {
            return filter.call(this, xhrArgs);
          });
          if (defake) {
            const xhr = that.defake(this, xhrArgs);
            xhr.open.apply(xhr, xhrArgs);
            xhr.setRequestHeader('Accept', 'text/*, image/*');
            return;
          }
        }
        this.readyStateChange(sinon.FakeXMLHttpRequest.OPENED);
      };

      // configure server
      qx.dev.FakeServer.getInstance().addFilter(function (args) {
        const method = args[0];
        const url = args[1];
        if (url.startsWith('https://sentry.io')) {
          return true;
        } else if (method === 'GET' && (
          url.indexOf('resource/visu_config') >= 0 ||
          url.indexOf('resource/demo/visu_config') >= 0 ||
          url.indexOf('resource/hidden-schema.json') >= 0 ||
          url.indexOf('resource/manager/') >= 0
        )) {
          return true;
        } else if (method === 'GET' && /rest\/manager\/index.php\/fs\?path=.+\.[\w]+$/.test(url)) {
          // change url to avoid API access and do a real request
          const path = url.split('=').pop();
          const suffix = path.startsWith('demo/') ? '' : 'config/';
          args[1] = window.location.pathname + 'resource/' + suffix + path;
          return true;
        }
        return false;
      }, this);
      const server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(function (request) {
        const parsed = qx.util.Uri.parseUri(request.url);
        let url = request.url;
        if (!parsed.host || parsed.host === window.location.host) {
          url = cv.report.Record.normalizeUrl(request.url);
          if (url.startsWith(window.location.pathname)) {
            url = url.substr(window.location.pathname.length-1);
          }
        }
        if (!this.__xhr[url] || this.__xhr[url].length === 0) {
          qx.log.Logger.error(this, '404: no logged responses for URI ' + url + ' found');
        } else {
          qx.log.Logger.debug(this, 'faking response for ' + url);
          let response = '';
          if (this.__xhr[url].length === 1) {
            response = this.__xhr[url][0];
          } else {
            // multiple responses recorded use them as LIFO stack
            response = this.__xhr[url].shift();
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

    defake: function(fakeXhr, xhrArgs) {
      // eslint-disable-next-line new-cap
      const xhr = new sinon.xhr.workingXHR();
      ['open', 'setRequestHeader', 'send', 'abort', 'getResponseHeader',
          'getAllResponseHeaders', 'addEventListener', 'overrideMimeType', 'removeEventListener'].forEach(function(method) {
          fakeXhr[method] = function() {
            return xhr[method].apply(xhr, arguments);
          };
        });

      const copyAttrs = function(args) {
        args.forEach(function(attr) {
          try {
            fakeXhr[attr] = xhr[attr];
          } catch (e) {
            if (!/MSIE 6/.test(navigator.userAgent)) {
             throw e;
            }
          }
        });
      };

      const stateChange = function() {
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
          fakeXhr.onreadystatechange({ target: fakeXhr });
        }
      };
      if (xhr.addEventListener) {
        for (let event in fakeXhr.eventListeners) {
          // eslint-disable-next-line no-prototype-builtins
          if (fakeXhr.eventListeners.hasOwnProperty(event)) {
            fakeXhr.eventListeners[event].forEach(function(handler) {
              xhr.addEventListener(event, handler);
            });
          }
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
    receive: function (json) {
      if (json) {
        cv.io.Client.CLIENTS.forEach(function (client) {
          client.update(json.d);
        });
      }
    },

    login: function (loginOnly, credentials, callback, context) {
      if (callback) {
        callback.call(context);
        if (qx.core.Environment.get('cv.testMode')) {
          if (cv.Config.initialDemoData) {
            this.receive({
              i: new Date().getTime(),
              d: cv.Config.initialDemoData.states
            });

            if (cv.Config.initialDemoData.sequence) {
              this.__sequence = cv.Config.initialDemoData.sequence;
              this._startSequence();
            }
            if (cv.Config.initialDemoData.simulations) {
              this._registerSimulations(cv.Config.initialDemoData.simulations);
            }
            cv.Config.initialDemoData = null;
          }
        }
      }
    },

    _registerSimulations: function (simulations) {
      this.__simulations = {};
      Object.keys(simulations).forEach(function (mainAddress) {
        const simulation = simulations[mainAddress];
        this.__simulations[mainAddress] = simulation;
        if (Object.prototype.hasOwnProperty.call(simulation, 'additionalAddresses')) {
          simulation.additionalAddresses.forEach(function (addr) {
            this.__simulations[addr] = simulation;
          }, this);
        }
      }, this);
    },

    _startSequence: function () {
      if (this.__sequence.length <= this.__sequenceIndex) {
        // start again
        this.__sequenceIndex = 0;
      }
      qx.event.Timer.once(function () {
        this.receive({
          i: new Date().getTime(),
          d: this.__sequence[this.__sequenceIndex].data
        });
        this.__sequenceIndex++;
        this._startSequence();
      }, this, this.__sequence[this.__sequenceIndex].delay);
    },

    _processSimulation: function (address, value) {
      const simulation = this.__simulations[address];
      if (!simulation) {
        return;
      }
      let start = false;
      let stop = false;
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
          let initValue = cv.data.Model.getInstance().getState(simulation.targetAddress);
          if (initValue === undefined) {
            initValue = 0;
          }
          simulation.value = initValue;

          if (simulation.timer) {
            simulation.timer.stop();
          } else {
            simulation.timer = new qx.event.Timer(simulation.interval || 100);
            const stepSize = simulation.stepSize || 10;
            simulation.timer.addListener('interval', function () {
              let newValue = simulation.value;
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
              const update = {
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
    subscribe: function (addresses) {
      this.addresses = addresses ? addresses : [];
    },

    /**
     * This function sends a value
     * @param address
     * @param value
     */
    write: function (address, value) {
      if (cv.report.Record.REPLAYING === true) {
        // do nothing in replay mode
        return;
      }
      const ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      window.writeHistory.push({
        address: address,
        value: value,
        ts: ts
      });

      if (this.__simulations && Object.prototype.hasOwnProperty.call(this.__simulations, address)) {
        this._processSimulation(address, value);
      } else {
        // send update
        const answer = {
          i: ts,
          d: {}
        };
        answer.d[address] = value;
        this.debug('sending value: ' + value + ' to address: ' + address);
        this.receive(answer);
      }
    },

    restart: function() {},

    stop: function () {},

    getResourcePath: function (name) {
      return name;
    },

    getLastError: function () {
      return null;
    },

    getBackend: function () {
      return {};
    },

    authorize: function (req) {
    },

    terminate: function () {},

    update: function(json) {},
    record: function(type, data) {},
    showError: function(type, message, args) {},

    // not used / needed in this client
    setInitialAddresses: function(addresses) {
    },

    hasCustomChartsDataProcessor : function () {
      return false;
    },
    processChartsData : function (data) {
      return data;
    },
    hasProvider: function (name) {
      return false;
    },
    getProviderUrl: function (name) {
      return null;
    },
    getProviderConvertFunction : function (name, format) {
      return null;
    }
  }
});
