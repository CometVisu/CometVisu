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
  construct(configFile, client) {
    super();
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
    __simulations: null,
    __encodeSimulatedStates: false,
    __sequence: null,
    __sequenceIndex: 0,
    _addressConfigs: null,

    init(configFile) {
      // load the demo data to fill the visu with some values
      const r = new qx.io.request.Xhr(configFile);
      r.addListener('success', e => {
        cv.Config.initialDemoData = e.getTarget().getResponse();
        this.__applyTestData();
        this.setInitialized(true);
        this.debug('simulator data has been loaded');
      });
      r.addListener('fail', () => {
        this.error('failed parsing demo data');
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
            const xhr = that.deFake(this, xhrArgs);
            xhr.open.apply(xhr, xhrArgs);
            xhr.setRequestHeader('Accept', 'text/*, image/*');
            return;
          }
        }
        this.readyStateChange(sinon.FakeXMLHttpRequest.OPENED);
      };

      // configure server
      qx.dev.FakeServer.getInstance().addFilter(args => {
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
          (url.startsWith(this._client.getResourcePath('charts')) && !url.startsWith(this._client.getResourcePath('charts') + 'generator:'))
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
          if (url.startsWith(this._client.getResourcePath('charts') + 'generator:')) {
            const generatorName = parsed.path.split('generator:').pop();
            request.respond(200, {'Content-type': 'application/json'}, JSON.stringify(this.generate(generatorName, parsed.queryKey)));
            return;
          }
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
            let body = response.body;
            if (response.headers && response.headers['Content-type'] === 'application/json') {
              body = JSON.stringify(response.body);
            }
            request.respond(response.status, response.headers, body);
          }
        }.bind(this)
      );
    },

    onWrite(address, value) {
      if (this.__simulations && Object.prototype.hasOwnProperty.call(this.__simulations, address)) {
        this._processSimulation(address, value);
        return true;
      }
      return false;
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

    _registerGenerators(generators) {
      this.__generators = generators;
      for (const name in this.__generators) {
        const gen = this.__generators[name];
        gen.interval = setInterval(() => {
          const data = {};
          let value = gen.targetValue + (Math.random() - 0.5) * gen.deviation * 2;
          if (this.__encodeSimulatedStates && this._addressConfigs[gen.address]) {
            value = cv.Transform.encodeBusAndRaw(this._addressConfigs[gen.address], value).raw;
          }
          data[gen.address] = value;
          this._client.receive({
            i: new Date().getTime(),
            d: data
          });
        }, gen.interval);
      }
    },

    generate(name, options) {
      const generator = this.__generators ? this.__generators[name] : null;
      const data = [];
      if (generator) {
        if (options) {
          // currently only end=now and start=end-??? is implemented
          let end = Date.now();
          let start = Date.now();
          if (options.start) {
            const match = /end-(\d+)(hour|day|month)/.exec(options.start);
            if (match) {
              let interval = 0;
              switch (match[2]) {
                case 'hour':
                  interval = 60 * 60 * 1000;
                  break;
                case 'day':
                  interval = 24 * 60 * 60 * 1000;
                  break;
                case 'month':
                  // this is not really precise, but good enough to fake some data
                  interval = 30 * 24 * 60 * 60 * 1000;
                  break;
              }
              start -= parseInt(match[1]) * interval;
            }
          }
          let val = 0;
          for (let i = start; i <= end; i += generator.resolution) {
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

    _startSequence() {
      if (this.__sequence.length <= this.__sequenceIndex) {
        // start again
        this.__sequenceIndex = 0;
      }
      qx.event.Timer.once(
        function () {
          this._client.receive({
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


    prepareTestData(addresses) {
      if (cv.Config.initialDemoData && addresses.length > 0) {
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
            };
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
              const mapping = valueArray => valueArray.map(val => {
                if (val.indexOf('|') >= 0) {
                  const [startAddress, startVal] = val.split('|');
                  if (startAddress in this._addressConfigs) {
                    return startAddress + '|' + cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], startVal).raw;
                  }
                  return val;
                }
                return cv.Transform.encodeBusAndRaw(this._addressConfigs[ga], val).raw;
              });
              sim.startValues = mapping(sim.startValues);
              sim.stopValues = mapping(sim.stopValues);
            }
          }
        }
        this._client.receive({
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
        if (cv.Config.initialDemoData.generators) {
          this._registerGenerators(cv.Config.initialDemoData.generators);
        }
        cv.Config.initialDemoData = null;
      }
    },

    deFake(fakeXhr, xhrArgs) {
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
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__simulations = null;
    this._addressConfigs = null;
    this.__sequence = null;
    this._client = null;
  }
});
