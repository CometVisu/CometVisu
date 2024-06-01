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
      "qx.io.request.Xhr": {},
      "cv.data.Model": {},
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
    extend: cv.io.AbstractClient,
    implement: cv.io.IClient,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(type, backendUrl) {
      cv.io.AbstractClient.constructor.call(this);
      this.initialAddresses = [];
      this._type = type;
      this._backendUrl = backendUrl || '/rest/';
      this.__P_750_0 = {};
      this.__P_750_1 = {};
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_750_2: null,
      _type: null,
      _backendUrl: null,
      __P_750_3: null,
      __P_750_0: null,
      __P_750_1: null,
      __P_750_4: null,
      getBackend: function getBackend() {
        return {};
      },
      getBackendUrl: function getBackendUrl() {
        return this._backendUrl;
      },
      getType: function getType() {
        return this._type;
      },
      // not used / needed in this client
      setInitialAddresses: function setInitialAddresses(addresses) {},
      getResourcePath: function getResourcePath(name, map) {
        if (name === 'charts' && map && map.src) {
          var parts = map.src.split(':');
          var item = parts.pop();
          var url = this._backendUrl + 'persistence/items/' + item;
          var params = [];
          if (parts.length > 0) {
            params.push('serviceId=' + parts[0]);
          }
          if (map.start) {
            var endTime = map.end ? this.__P_750_5(map.end) : new Date();
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
                case 'week':
                  interval = 604800000;
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
            params.push('starttime=' + startTime.toISOString().split('.')[0] + 'Z');
            params.push('endtime=' + endTime.toISOString().split('.')[0] + 'Z');
          }
          url += '?' + params.join('&');
          return url;
        } else if (name === 'rsslog') {
          return this._backendUrl + 'persistence/items/' + map.item;
        }
        return null;
      },
      __P_750_5: function __P_750_5(time) {
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
      processChartsData: function processChartsData(response, config) {
        if (response && response.data) {
          var data = response.data;
          var newRrd = [];
          var scaling = config && Object.prototype.hasOwnProperty.call(config, 'scaling') ? config.scaling : 1.0;
          var offset = config && Object.prototype.hasOwnProperty.call(config, 'offset') && Number.isFinite(config.offset) ? config.offset * 1000 : 0;
          var lastValue;
          var value;
          for (var j = 0, l = data.length; j < l; j++) {
            value = parseFloat(data[j].state) * scaling;
            if (value !== lastValue) {
              newRrd.push([data[j].time + offset, value]);
            }
            lastValue = value;
          }
          return newRrd;
        }
        this.error('invalid chart data response');
        return [];
      },
      /**
       * Auth basic authentication header to request
       * @param req {qx.io.request.Xhr}
       * @private
       */
      authorize: function authorize(req) {
        if (this.__P_750_3) {
          req.setRequestHeader('Authorization', this.__P_750_3);
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
      __P_750_6: function __P_750_6(type, state) {
        switch (type.toLowerCase()) {
          case 'decimal':
          case 'percent':
          case 'number':
          case 'dimmer':
            return parseInt(state) > 0;
          case 'color':
            return state !== '0,0,0';
          case 'rollershutter':
            return state === '0';
          case 'contact':
            return state === 'OPENED';
          case 'onoff':
          case 'switch':
            return state === 'ON';
          default:
            return null;
        }
      },
      subscribe: function subscribe(addresses, filters) {
        var _this = this;
        // send first request to get all states once
        var req = this.createAuthorizedRequest('items?fields=name,state,stateDescription,members,type,label&recursive=true');
        this.setDataReceived(false);
        req.addListener('success', function (e) {
          var req = e.getTarget();
          var res = req.getResponse();
          var update = {};
          var model = cv.data.Model.getInstance();
          res.forEach(function (entry) {
            if (entry.members && Array.isArray(entry.members)) {
              // this is a group
              var active = 0;
              var map = {};
              entry.members.forEach(function (obj) {
                map[obj.name] = {
                  type: obj.type.toLowerCase(),
                  state: obj.state,
                  stateDescription: obj.stateDescription,
                  label: obj.label,
                  name: obj.name,
                  active: false
                };
                // register member addresses in model
                model.addAddress(obj.name, null, _this.getName());
                if (_this.__P_750_6(obj.type, obj.state)) {
                  active++;
                  map[obj.name].active = true;
                }
                if (!Object.prototype.hasOwnProperty.call(_this.__P_750_1, obj.name)) {
                  _this.__P_750_1[obj.name] = [entry.name];
                } else {
                  _this.__P_750_1[obj.name].push(entry.name);
                }
                return map;
              });
              _this.__P_750_0[entry.name] = {
                members: map,
                active: active
              };
              update['number:' + entry.name] = active;
              update['members:' + entry.name] = Object.values(map);
            }
            update[entry.name] = entry.state;
            if (entry.stateDescription && entry.stateDescription.options) {
              update['options:' + entry.name] = entry.stateDescription.options;
            }
          }, _this);
          _this.update(update);
          _this.__P_750_4 = addresses;
          _this.setDataReceived(true);
        });
        // Send request
        req.send();

        // create sse session
        this.running = true;
        if (!cv.report.Record.REPLAYING) {
          var things = addresses.filter(function (addr) {
            return addr.split(':').length > 3;
          });
          var topic = 'openhab/items/*/statechanged';
          if (things.length > 0) {
            topic = 'openhab/*/*/*changed';
            // request current states
            var thingsReq = this.createAuthorizedRequest('things?summary=true');
            thingsReq.addListener('success', function (e) {
              var res = e.getTarget().getResponse();
              var update = {};
              res.forEach(function (entry) {
                if (things.includes(entry.UID)) {
                  update[entry.UID] = entry.statusInfo.status;
                }
              });
              _this.update(update);
            });
            thingsReq.send();
          }
          if (!this.eventSource) {
            this.eventSource = new EventSource(this._backendUrl + 'events?topics=' + topic);

            // add default listeners
            this.eventSource.addEventListener('message', this.handleMessage.bind(this), false);
            this.eventSource.addEventListener('error', this.handleError.bind(this), false);

            // add additional listeners
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
        }
      },
      addSubscription: function addSubscription(address) {
        if (!this.__P_750_4) {
          this.__P_750_4 = [address];
        } else if (!this.__P_750_4.includes(address)) {
          this.__P_750_4.push(address);
        }
      },
      terminate: function terminate() {
        this.debug('terminating connection');
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
          this.setConnected(false);
        }
      },
      handleMessage: function handleMessage(payload) {
        var _this2 = this;
        if (payload.type === 'message') {
          this.record('read', {
            type: payload.type,
            name: this.getName(),
            data: payload.data
          });
          var data = JSON.parse(payload.data);
          if (data.type === 'ItemStateChangedEvent' || data.type === 'GroupItemStateChangedEvent') {
            //extract item name from topic
            var update = {};
            var item = data.topic.split('/')[2];
            var change = JSON.parse(data.payload);
            update[item] = change.value;
            // check if this Item is part of any group
            if (Object.prototype.hasOwnProperty.call(this.__P_750_1, item)) {
              var groupNames = this.__P_750_1[item];
              groupNames.forEach(function (groupName) {
                var group = _this2.__P_750_0[groupName];
                var active = 0;
                group.members[item].state = change.value;
                Object.keys(group.members).forEach(function (memberName) {
                  var member = group.members[memberName];
                  if (_this2.__P_750_6(member.type, member.state)) {
                    active++;
                    member.active = true;
                  } else {
                    member.active = false;
                  }
                });
                group.active = active;
                update['number:' + groupName] = active;
                update['members:' + groupName] = Object.values(group.members);
              });
            }
            this.update(update);
          } else if (data.type === 'ThingStatusInfoChangedEvent') {
            //extract item name from topic
            var _update = {};
            var _item = data.topic.split('/')[2];
            var _change = JSON.parse(data.payload);
            if (Array.isArray(_change)) {
              // [newState, oldState]
              _change = _change[0];
            }
            _update[_item] = _change.status;
            this.update(_update);
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
        var _this3 = this;
        if (credentials && credentials.username) {
          // just saving the credentials for later use as we are using basic authentication
          this.__P_750_3 = 'Basic ' + btoa(credentials.username + ':' + (credentials.password || ''));
        }
        this.setDataReceived(false);
        // no login needed we just do a request to the if the backend is reachable
        var req = this.createAuthorizedRequest();
        req.addListener('success', function (e) {
          var req = e.getTarget();
          _this3.setServer(req.getResponseHeader('Server'));
          if (callback) {
            callback.call(context);
          }
        });
        // Send request
        req.send();
      },
      getLastError: function getLastError() {
        return this.__P_750_2;
      },
      restart: function restart(fullRestart) {
        if (fullRestart) {
          // re-read all states
          if (this.__P_750_4) {
            this.subscribe(this.__P_750_4);
          } else {
            this.debug('no subscribed addresses, skip reading all states.');
          }
        }
      },
      update: function update(json) {},
      record: function record(type, data) {},
      showError: function showError(type, message, args) {},
      getProviderData: function getProviderData(name, format) {
        return null;
      },
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

//# sourceMappingURL=Rest.js.map?dt=1717235421517