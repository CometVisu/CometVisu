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
  construct() {
    super();
    cv.io.Client.CLIENTS.push(this);
    // make some functions accessible for the protractor runner
    window._receive = this.receive.bind(this);
    const model = cv.data.Model.getInstance();
    window._widgetDataGet = model.getWidgetData.bind(model);
    window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
    window.writeHistory = [];

    const testMode = qx.core.Environment.get('cv.testMode');
    if (typeof testMode === 'string' && testMode !== 'true') {
      this.__loadTestData(testMode);
    }
    this.addresses = [];

    let file = this._resources['simulation'];
    if (file) {
      this.__loadTestData(file);
    } else {
      this.addListener('resourcePathAdded', ev => {
        switch (ev.getData()) {
          case 'simulation':
            const file = this._resources['simulation'];
            if (file) {
              this.__loadTestData(file);
            }
            break;
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
    __simulating: false,
    __encodeSimulatedStates: false,
    backendName: 'mockup',
    addresses: null,
    __xhr: null,
    __sequence: null,
    __sequenceIndex: 0,
    __simulations: null,

    getType() {
      return this.backendName;
    },

    __loadTestData(file) {
      // load the demo data to fill the visu with some values
      const r = new qx.io.request.Xhr(file);
      r.addListener('success', e => {
        cv.Config.initialDemoData = e.getTarget().getResponse();
        this.__simulating = true;
        this.__applyTestData();
      });
      r.send();
    },

    __applyTestData() {
      this.__xhr = cv.Config.initialDemoData.xhr;

      // we need to adjust the timestamps of the chart data
      const now = Date.now();
      for (let url in this.__xhr) {
        if (url.startsWith('rrd')) {
          this.__xhr[url].forEach(d => {
            const data = d.body;
            const offset = now - data[data.length - 1][0];
            data.forEach(entry => (entry[0] += offset));
          });
        } else if (url.startsWith('resource/plugin/rsslog.php')) {
          this.__xhr[url].forEach(d => {
            const data = d.body.responseData.feed.entries;
            let date = new Date();
            date.setDate(date.getDate() - 1);
            data.forEach(entry => {
              entry.publishedDate = date.toUTCString();
              date.setTime(date.getTime() + 60 * 60 * 1000);
            });
          });
        }
      }

      const that = this;
      const sinon = qx.dev.unit.Sinon.getSinon();
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
          let xhrArgs = arguments;
          let defake = sinon.FakeXMLHttpRequest.filters.some(function (filter) {
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
      qx.dev.FakeServer.getInstance().addFilter((args) => {
        const method = args[0];
        const url = args[1];
        if (url.startsWith('https://sentry.io')) {
          return true;
        } else if (
          method === 'GET' &&
          (url.indexOf('resource/visu_config') >= 0 ||
            url.indexOf('resource/demo/visu_config') >= 0 ||
            url.indexOf('resource/hidden-schema.json') >= 0 ||
            url.indexOf('resource/manager/') >= 0) ||
            url.startsWith(this.getResourcePath('charts'))
        ) {
          return true;
        } else if (method === 'GET' && /rest\/manager\/index.php\/fs\?path=.+\.[\w]+$/.test(url)) {
          // change url to avoid API access and do a real request
          const path = url.split('=').pop();
          const suffix = path.startsWith('demo/') ? '' : 'config/';
          args[1] = window.location.pathname + 'resource/' + suffix + path;
          return true;
        }
        return false;
      });
      const server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(
        function (request) {
          const parsed = qx.util.Uri.parseUri(request.url);
          let url = request.url;
          if (!parsed.host || parsed.host === window.location.host) {
            url = cv.report.Record.normalizeUrl(request.url);
            if (url.startsWith(window.location.pathname)) {
              url = url.substr(window.location.pathname.length - 1);
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
              // the response would fail if we do not override it here
              request.readyState = 1;
            }
            request.respond(response.status, response.headers, JSON.stringify(response.body));
          }
        }.bind(this)
      );
      this.__prepareTestData();
    },

    defake(fakeXhr, xhrArgs) {
      // eslint-disable-next-line new-cap
      const xhr = new sinon.xhr.workingXHR();
      [
        'open',
        'setRequestHeader',
        'send',
        'abort',
        'getResponseHeader',
        'getAllResponseHeaders',
        'addEventListener',
        'overrideMimeType',
        'removeEventListener'
      ].forEach(function (method) {
        fakeXhr[method] = function () {
          return xhr[method].apply(xhr, arguments);
        };
      });

      const copyAttrs = function (args) {
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

      const stateChange = function () {
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
            fakeXhr.eventListeners[event].forEach(function (handler) {
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
    receive(json) {
      if (json) {
        cv.io.Client.CLIENTS.forEach(function (client) {
          client.update(json.d);
        });
      }
    },

    login(loginOnly, credentials, callback, context) {
      if (callback) {
        callback.call(context);
      }
    },

    _registerSimulations(simulations) {
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

    _startSequence() {
      if (this.__sequence.length <= this.__sequenceIndex) {
        // start again
        this.__sequenceIndex = 0;
      }
      qx.event.Timer.once(
        function () {
          this.receive({
            i: new Date().getTime(),
            d: this.__sequence[this.__sequenceIndex].data
          });

          this.__sequenceIndex++;
          this._startSequence();
        },
        this,
        this.__sequence[this.__sequenceIndex].delay
      );
    },

    _processSimulation(address, value) {
      const simulation = this.__simulations[address];
      if (!simulation) {
        return;
      }
      if (this.__encodeSimulatedStates && address in this._addressConfigs) {
        value = cv.Transform.encodeBusAndRaw(this._addressConfigs[address], value).raw;
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
          // the more general ones
          start = simulation.startValues.indexOf(value) >= 0;
          stop = simulation.startValues.indexOf(value) >= 0;
        }
      }
      if (start) {
        // start simulation
        if (simulation.type === 'shutter') {
          simulation.direction = value === '00' ? 'up' : 'down';
          let initValue = cv.data.Model.getInstance().getState(simulation.targetAddress);
          if (initValue === undefined) {
            initValue = 0;
          } else if (this.__encodeSimulatedStates && simulation.targetAddress in this._addressConfigs) {
            initValue = cv.Transform.decode(this._addressConfigs[simulation.targetAddress], initValue);
          }
          simulation.value = initValue;

          if (simulation.timer) {
            simulation.timer.stop();
          } else {
            simulation.timer = new qx.event.Timer(simulation.interval || 100);
            const stepSize = simulation.stepSize || 10;
            simulation.timer.addListener('interval', () => {
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
              let sendValue = newValue;
              if (this.__encodeSimulatedStates && simulation.targetAddress in this._addressConfigs) {
                sendValue = cv.Transform.encodeBusAndRaw(this._addressConfigs[simulation.targetAddress], newValue).raw;
              }

              update.d[simulation.targetAddress] = sendValue;
              this.receive(update);
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
    subscribe(addresses) {
      this.addresses = addresses ? addresses : [];
      this.__prepareTestData();
    },

    __prepareTestData() {
      if (cv.Config.initialDemoData && this.addresses.length > 0) {
        if (cv.Config.initialDemoData.encodeFirst) {
          this.__encodeSimulatedStates = true;
          // connect address data from widgets first
          this._addressConfigs = {};
          const widgetData = cv.data.Model.getInstance().getWidgetDataModel();
          for (const id in widgetData) {
            if (widgetData[id].address) {
              this._addressConfigs = Object.assign(this._addressConfigs, widgetData[id].address);
            }
          }
          // lookup cv-address elements (tile structure)
          for (const addressElement of document.querySelectorAll('cv-address')) {
            this._addressConfigs[addressElement.textContent.trim()] = {
              transform: addressElement.getAttribute('transform')
            }
          }

          for (let ga in cv.Config.initialDemoData.states) {
            if (ga in this._addressConfigs) {
              cv.Config.initialDemoData.states[ga] = cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], cv.Config.initialDemoData.states[ga]).raw;
            }
          }
          for (const seq of cv.Config.initialDemoData.sequence) {
            for (const ga in seq.data) {
              if (ga in this._addressConfigs) {
                seq.data[ga] = cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], seq.data[ga]).raw;
              }
            }
          }
          for (const ga in cv.Config.initialDemoData.simulations) {
            if (ga in this._addressConfigs) {
              // startValues
              const sim = cv.Config.initialDemoData.simulations[ga];
              const mapping = valueArray => {
                return valueArray.map(val => {
                  if (val.indexOf('|') >= 0) {
                    const [startAddress, startVal] = val.split('|');
                    if (startAddress in this._addressConfigs) {
                      return startAddress + '|' + cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], startVal).raw;
                    }
                    return val;
                  } else {
                    return cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], val).raw;
                  }
                });
              }
              sim.startValues = mapping(sim.startValues);
              sim.stopValues = mapping(sim.stopValues);
            }
          }
        }
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
        console.log(cv.Config.initialDemoData);
        cv.Config.initialDemoData = null;
      }
    },

    __decode(address, value) {
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
    write(address, value) {
      if (cv.report.Record.REPLAYING === true) {
        // do nothing in replay mode
        return;
      }
      const ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      const lastWrite = {
        address: address,
        value: value,
        ts: ts
      };

      value = this.__decode(address, value);

      if (this.__simulations && Object.prototype.hasOwnProperty.call(this.__simulations, address)) {
        this._processSimulation(address, value);
      } else {
        // send update
        const answer = {
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

    restart() {},

    stop() {},

    getResourcePath(name, map) {
      if (cv.Config.testMode) {
        // fallback to old behaviour just for screenshot generation / testing
        if (name === 'charts' && map && map.src) {
          return name + '/' + map.src;
        }
        return name;
      }
      let basePath = '';
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

    getLastError() {
      return null;
    },

    getBackend() {
      return {};
    },

    authorize(req) {},

    terminate() {},

    update(json) {},
    record(type, data) {},
    showError(type, message, args) {},

    // not used / needed in this client
    setInitialAddresses(addresses) {},

    hasCustomChartsDataProcessor() {
      return false;
    },
    processChartsData(data) {
      return data;
    },
    hasProvider(name) {
      return false;
    },
    getProviderUrl(name) {
      return null;
    },
    getProviderConvertFunction(name, format) {
      return null;
    },
    getProviderData : function (name, format) {
      return null;
    }
  }
});
