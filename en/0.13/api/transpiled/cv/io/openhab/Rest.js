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
      "qx.io.request.Xhr": {},
      "cv.report.Record": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Rest.js 
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
   * openHAB Rest client, that uses the native openHAB REST-API directly and does not
   * need the openHAB-cometvisu binding to be installed
   */
  qx.Class.define('cv.io.openhab.Rest', {
    extend: qx.core.Object,
    implement: cv.io.IClient,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(backendName, backendUrl) {
      qx.core.Object.constructor.call(this);
      this.initialAddresses = [];
      this._backendName = backendName;
      this._backendUrl = backendUrl || '/rest/';
      this.__P_487_0 = {};
      this.__P_487_1 = {};
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: false,
        event: 'changeConnected'
      },
      server: {
        check: 'String',
        nullable: true,
        event: 'changedServer'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_487_2: null,
      _backendName: null,
      _backendUrl: null,
      __P_487_3: null,
      __P_487_0: null,
      __P_487_1: null,
      getBackend: function getBackend() {
        return {};
      },
      // not used / needed in this client
      setInitialAddresses: function setInitialAddresses(addresses) {},
      getResourcePath: function getResourcePath(name, map) {
        if (name === 'charts' && map && map.src) {
          var url = this._backendUrl + 'persistence/items/' + map.src;
          var params = [];

          if (map.start) {
            var endTime = map.end ? this.__P_487_4(map.end) : new Date();
            var startTime = new Date();
            var match = /^end-([\d]*)([\w]+)$/.exec(map.start);

            if (match) {
              var amount = parseInt(match[1]) || 1;
              var interval = 0;

              switch (match[2]) {
                case 'second':
                  interval = 1000;
                  break;

                case 'minute':
                  interval = 60000;
                  break;

                case 'hour':
                  interval = 3600000;
                  break;

                case 'day':
                  interval = 86400000;
                  break;

                case 'month':
                  interval = 2592000000;
                  break;

                case 'year':
                  interval = 31536000000;
                  break;
              }

              startTime.setTime(endTime.getTime() - amount * interval);
            } else if (/^[\d]+$/.test(map.start)) {
              startTime.setTime(parseInt(map.start) * 1000);
            }

            params.push('starttime=' + startTime.toISOString());
            params.push('endtime=' + endTime.toISOString());
          }

          url += '?' + params.join('&');
          return url;
        }

        return null;
      },
      __P_487_4: function __P_487_4(time) {
        if (time === 'now') {
          return new Date();
        } else if (/^[\d]+$/.test(time)) {
          var d = new Date();
          d.setTime(parseInt(time) * 1000);
          return d;
        }

        return null;
      },
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {
        return true;
      },
      processChartsData: function processChartsData(response) {
        var data = response.data;
        var newRrd = new Array(data.length);

        for (var j = 0, l = data.length; j < l; j++) {
          newRrd[j] = [data[j].time, parseFloat(data[j].state)];
        }

        return newRrd;
      },

      /**
       * Auth basic authentication header to request
       * @param req {qx.io.request.Xhr}
       * @private
       */
      authorize: function authorize(req) {
        if (this.__P_487_3) {
          req.setRequestHeader('Authorization', this.__P_487_3);
        }
      },

      /**
       * Creates an authorized request to the backend with a relative path
       * @param url {String?} appended to the backends base path
       * @param method {String?} HTTP method type (GET is the default)
       * @return A XHR request {qx.io.request.Xhr}
       */
      createAuthorizedRequest: function createAuthorizedRequest(url, method) {
        var req = new qx.io.request.Xhr(this._backendUrl + (url || ''), method);
        this.authorize(req);
        return req;
      },
      __P_487_5: function __P_487_5(type, state) {
        switch (type) {
          case 'Decimal':
          case 'Percent':
          case 'Number':
          case 'Dimmer':
            return parseInt(state) > 0;

          case 'Rollershutter':
            return state === '0';

          case 'Contact':
            return state === 'OPENED';

          case 'OnOff':
          case 'Switch':
            return state === 'ON';

          default:
            return null;
        }
      },
      subscribe: function subscribe(addresses, filters) {
        // send first request to get all states once
        var req = this.createAuthorizedRequest('items?fields=name,state,members,type&recursive=true');
        req.addListener('success', function (e) {
          var req = e.getTarget();
          var res = req.getResponse();
          var update = {};
          res.forEach(function (entry) {
            var _this = this;

            if (entry.members && Array.isArray(entry.members)) {
              // this is a group
              var active = 0;
              var map = {};
              entry.members.forEach(function (obj) {
                map[obj.name] = {
                  type: obj.type,
                  state: obj.state
                };

                if (_this.__P_487_5(obj.type, obj.state)) {
                  active++;
                }

                if (!Object.prototype.hasOwnProperty.call(_this.__P_487_1, obj.name)) {
                  _this.__P_487_1[obj.name] = [entry.name];
                } else {
                  _this.__P_487_1[obj.name].push(entry.name);
                }

                return map;
              });
              this.__P_487_0[entry.name] = {
                members: map,
                active: active
              };
              update['number:' + entry.name] = active;
            }

            update[entry.name] = entry.state;
          }, this);
          this.update(update);
        }, this); // Send request

        req.send(); // create sse session

        this.running = true;

        if (!cv.report.Record.REPLAYING) {
          this.eventSource = new EventSource(this._backendUrl + 'events?topics=openhab/items/*/statechanged'); // add default listeners

          this.eventSource.addEventListener('message', this.handleMessage.bind(this), false);
          this.eventSource.addEventListener('error', this.handleError.bind(this), false); // add additional listeners
          //Object.getOwnPropertyNames(this.__additionalTopics).forEach(this.__addRecordedEventListener, this);

          this.eventSource.onerror = function () {
            this.error('connection lost');
            this.setConnected(false);
          }.bind(this);

          this.eventSource.onopen = function () {
            this.debug('connection established');
            this.setConnected(true);
          }.bind(this);
        }
      },
      terminate: function terminate() {
        this.debug('terminating connection');

        if (this.eventSource) {
          this.eventSource.close();
        }
      },
      handleMessage: function handleMessage(payload) {
        var _this2 = this;

        if (payload.type === 'message') {
          this.record('read', {
            type: payload.type,
            data: payload.data
          });
          var data = JSON.parse(payload.data);

          if (data.type === 'ItemStateChangedEvent' || data.type === 'GroupItemStateChangedEvent') {
            //extract item name from topic
            var update = {};
            var item = data.topic.split('/')[2];
            var change = JSON.parse(data.payload);
            update[item] = change.value; // check if this Item is part of any group

            if (Object.prototype.hasOwnProperty.call(this.__P_487_1, item)) {
              var groupNames = this.__P_487_1[item];
              groupNames.forEach(function (groupName) {
                var group = _this2.__P_487_0[groupName];
                var active = 0;
                group.members[item].value = change.value;
                Object.keys(group.members).forEach(function (memberName) {
                  var member = group.members[memberName];

                  if (_this2.__P_487_5(member.type, member.value)) {
                    active++;
                  }
                });
                group.active = active;
                update['number:' + groupName] = active;
              });
            }

            this.update(update);
          }
        }
      },
      write: function write(address, value) {
        var req = this.createAuthorizedRequest('items/' + address, 'POST');
        req.setRequestHeader('Content-Type', 'text/plain');
        req.setRequestData('' + value);
        req.send();
      },
      handleError: function handleError(error) {
        this.error(error);
      },
      login: function login(loginOnly, credentials, callback, context) {
        if (credentials && credentials.username) {
          // just saving the credentials for later use as we are using basic authentication
          this.__P_487_3 = 'Basic ' + btoa(credentials.username + ':' + (credentials.password || ''));
        } // no login needed we just do a request to the if the backend is reachable


        var req = this.createAuthorizedRequest();
        req.addListener('success', function (e) {
          var req = e.getTarget();
          this.setServer(req.getResponseHeader('Server'));

          if (callback) {
            callback.call(context);
          }
        }, this); // Send request

        req.send();
      },
      getLastError: function getLastError() {
        return this.__P_487_2;
      },
      restart: function restart(full) {
        this.error('Not implemented');
      },
      update: function update(json) {},
      // jshint ignore:line
      record: function record(type, data) {},
      showError: function showError(type, message, args) {},
      hasProvider: function hasProvider(name) {
        return ['addresses', 'rrd'].includes(name);
      },
      getProviderUrl: function getProviderUrl(name) {
        switch (name) {
          case 'addresses':
            return this._backendUrl + 'items?fields=name,type,label';

          case 'rrd':
            return this._backendUrl + 'persistence/items';

          default:
            return null;
        }
      },
      getProviderConvertFunction: function getProviderConvertFunction(name, format) {
        switch (name) {
          case 'addresses':
            return function (result) {
              var data;

              if (format === 'monaco') {
                return result.map(function (entry) {
                  return {
                    label: entry.name,
                    insertText: entry.name,
                    detail: entry.type,
                    kind: window.monaco.languages.CompletionItemKind.Value
                  };
                });
              }

              data = {};
              result.forEach(function (element) {
                var type = element.type ? element.type.split(':')[0] : '';

                if (!Object.prototype.hasOwnProperty.call(data, type)) {
                  data[type] = [];
                }

                var entry = {
                  value: element.name,
                  label: element.label || ''
                };

                if (type) {
                  entry.hints = {
                    transform: 'OH:' + type.toLowerCase()
                  };
                }

                data[type].push(entry);
              });
              return data;
            };

          case 'rrd':
            return function (result) {
              if (format === 'monaco') {
                return result.map(function (element) {
                  return {
                    insertText: element,
                    label: element,
                    kind: window.monaco.languages.CompletionItemKind.EnumMember
                  };
                });
              }

              return result.map(function (element) {
                return {
                  value: element,
                  label: element
                };
              });
            };

          default:
            return null;
        }
      }
    }
  });
  cv.io.openhab.Rest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rest.js.map?dt=1648710511758