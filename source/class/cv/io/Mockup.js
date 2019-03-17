/* Mockup.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
    var model = cv.data.Model.getInstance();
    window._widgetDataGet = model.getWidgetData.bind(model);
    window._getWidgetDataModel = model.getWidgetDataModel.bind(model);
    window.writeHistory = [];

    if (qx.core.Environment.get('cv.testMode') && cv.Config.initialDemoData && cv.Config.initialDemoData.xhr) {
      this.__xhr = cv.Config.initialDemoData.xhr;
      // configure server
      var server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(function (request) {
        var url = cv.report.Record.normalizeUrl(request.url);
        if (url.indexOf("nocache=") >= 0) {
          url = url.replace(/[\?|&]nocache=[0-9]+/, "");
        }
        if (!this.__xhr[url] || this.__xhr[url].length === 0) {
          qx.log.Logger.error(this, "404: no logged responses for URI " + url + " found");
        } else {
          qx.log.Logger.debug(this, "faking response for " + url);
          var response = "";
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
          request.respond(response.status, response.headers, qx.lang.Json.stringify(response.body));
        }
      }.bind(this));
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
      check: "Boolean",
      init: true
    },
    server: {
      check: "String",
      init: "Mockup"
    },
    connected: {
      check: "Boolean",
      init: true,
      event: "changeConnected"
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    addresses: null,
    __xhr: null,
    __sequence: null,
    __sequenceIndex: 0,
    __simulations: null,

    /**
     * This function gets called once the communication is established and session information is available
     *
     */
    receive: function (json) {
      if (json) {
        cv.io.Client.CLIENTS.forEach(function (client) {
          client.update(json.d);
        });
      }
    },

    login: function (loginOnly, callback, context) {
      if (callback) {
        callback.call(context);
        if (qx.core.Environment.get('cv.testMode')) {
          if (cv.Config.initialDemoData) {
            this.receive({
              i: new Date().getTime(),
              d: cv.Config.initialDemoData.states
            });
            if (cv.Config.initialDemoData.xhr) {
              this.__xhr = cv.Config.initialDemoData.xhr;
              // configure server
              qx.dev.FakeServer.getInstance().addFilter(function (method, url) {
                return url.startsWith('https://sentry.io');
              }, this);
              var server = qx.dev.FakeServer.getInstance().getFakeServer();
              server.respondWith(function (request) {
                var url = cv.report.Record.normalizeUrl(request.url);
                if (url.indexOf("nocache=") >= 0) {
                  url = url.replace(/[\?|&]nocache=[0-9]+/, "");
                }
                if (!this.__xhr[url] || this.__xhr[url].length === 0) {
                  qx.log.Logger.error(this, "404: no logged responses for URI " + url + " found");
                } else {
                  qx.log.Logger.debug(this, "faking response for " + url);
                  var response = "";
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
                  request.respond(response.status, response.headers, qx.lang.Json.stringify(response.body));
                }
              }.bind(this));
            }

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
        var simulation = simulations[mainAddress];
        this.__simulations[mainAddress] = simulation;
        if (simulation.hasOwnProperty("additionalAddresses")) {
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
      var simulation = this.__simulations[address];
      if (!simulation) {
        return;
      }
      var start = false;
      var stop = false;
      if (simulation.hasOwnProperty('startValues')) {
        // try the more specific matches with address included
        start = simulation.startValues.indexOf(address + "|" + value) >= 0;
        if (simulation.hasOwnProperty('stopValues')) {
          stop = simulation.stopValues.indexOf(address + "|" + value) >= 0;
        }
        if (!stop) {
          // the the more general ones
          start = simulation.startValues.indexOf(value) >= 0;
          stop = simulation.startValues.indexOf(value) >= 0;
        }
      }
      if (start) {
        // start simulation
        if (simulation.type === "shutter") {
          simulation.direction = value === "0" ? "up" : "down";
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
            simulation.timer.addListener("interval", function () {
              var newValue = simulation.value;
              if (simulation.direction === "up") {
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
     *
     */
    subscribe: function (addresses) {
      this.addresses = addresses ? addresses : [];
    },

    /**
     * This function sends a value
     *
     */
    write: function (address, value) {
      if (cv.report.Record.REPLAYING === true) {
        // do nothing in replay mode
        return;
      }
      var ts = new Date().getTime();
      // store in window, to make it accessible for protractor
      window.writeHistory.push({
        address: address,
        value: value,
        ts: ts
      });

      if (this.__simulations && this.__simulations.hasOwnProperty(address)) {
        this._processSimulation(address, value);
      } else {
        // send update
        var answer = {
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
    }
  }
});