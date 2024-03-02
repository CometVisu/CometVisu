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
  construct(type, backendUrl) {
    super();
    this.initialAddresses = [];
    this._type = type;
    this._backendUrl = backendUrl || '/rest/';
    this.__groups = {};
    this.__memberLookup = {};
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
    __lastError: null,
    _type: null,
    _backendUrl: null,
    __token: null,
    __groups: null,
    __memberLookup: null,
    __subscribedAddresses: null,

    getBackend() {
      return {};
    },

    getBackendUrl() {
      return this._backendUrl;
    },

    getType() {
      return this._type;
    },

    // not used / needed in this client
    setInitialAddresses(addresses) {},

    getResourcePath(name, map) {
      if (name === 'charts' && map && map.src) {
        const parts = map.src.split(':');
        const item = parts.pop();
        let url = this._backendUrl + 'persistence/items/' + item;
        const params = [];
        if (parts.length > 0) {
          params.push('serviceId=' + parts[0]);
        }
        if (map.start) {
          let endTime = map.end ? this.__convertTimes(map.end) : new Date();
          let startTime = new Date();
          const match = /^end-([\d]*)([\w]+)$/.exec(map.start);
          if (match) {
            const amount = parseInt(match[1]) || 1;
            let interval = 0;
            switch (match[2]) {
              case 'second':
                interval = 1000;
                break;
              case 'minute':
                interval = 60000;
                break;
              case 'hour':
                interval = 60 * 60000;
                break;
              case 'day':
                interval = 24 * 60 * 60000;
                break;
              case 'week':
                interval = 7 * 24 * 60 * 60000;
                break;
              case 'month':
                interval = 30 * 24 * 60 * 60000;
                break;
              case 'year':
                interval = 365 * 24 * 60 * 60000;
                break;
            }

            startTime.setTime(endTime.getTime() - amount * interval);
          } else if (/^[\d]+$/.test(map.start)) {
            startTime.setTime(parseInt(map.start) * 1000);
          }

          params.push('starttime=' + startTime.toISOString().split('.')[0]+'Z');
          params.push('endtime=' + endTime.toISOString().split('.')[0]+'Z');
        }

        url += '?' + params.join('&');
        return url;
      } else if (name === 'rsslog') {
        return this._backendUrl + 'persistence/items/' + map.item;
      }
      return null;
    },

    __convertTimes(time) {
      if (time === 'now') {
        return new Date();
      } else if (/^[\d]+$/.test(time)) {
        let d = new Date();
        d.setTime(parseInt(time) * 1000);
        return d;
      }
      return null;
    },

    hasCustomChartsDataProcessor() {
      return true;
    },

    processChartsData(response, config) {
      if (response && response.data) {
        const data = response.data;
        const newRrd = [];
        const scaling = config && Object.prototype.hasOwnProperty.call(config, 'scaling') ? config.scaling : 1.0;
        const offset = config && Object.prototype.hasOwnProperty.call(config, 'offset') && Number.isFinite(config.offset) ? config.offset * 1000 : 0;
        let lastValue;
        let value;
        for (let j = 0, l = data.length; j < l; j++) {
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
    authorize(req) {
      if (this.__token) {
        req.setRequestHeader('Authorization', this.__token);
      }
    },

    /**
     * Creates an authorized request to the backend with a relative path
     * @param url {String?} appended to the backends base path
     * @param method {String?} HTTP method type (GET is the default)
     * @return A XHR request {qx.io.request.Xhr}
     */
    createAuthorizedRequest(url, method) {
      const req = new qx.io.request.Xhr(this._backendUrl + (url || ''), method);
      this.authorize(req);
      return req;
    },

    __isActive(type, state) {
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

    subscribe(addresses, filters) {
      // send first request to get all states once
      const req = this.createAuthorizedRequest('items?fields=name,state,stateDescription,members,type,label&recursive=true');
      this.setDataReceived(false);
      req.addListener('success', e => {
        const req = e.getTarget();

        const res = req.getResponse();
        const update = {};
        const model = cv.data.Model.getInstance();
        res.forEach(entry => {
          if (entry.members && Array.isArray(entry.members)) {
            // this is a group
            let active = 0;
            const map = {};
            entry.members.forEach(obj => {
              map[obj.name] = {
                type: obj.type.toLowerCase(),
                state: obj.state,
                stateDescription: obj.stateDescription,
                label: obj.label,
                name: obj.name,
                active: false
              };
              // register member addresses in model
              model.addAddress(obj.name, null, this.getName());

              if (this.__isActive(obj.type, obj.state)) {
                active++;
                map[obj.name].active = true;
              }
              if (!Object.prototype.hasOwnProperty.call(this.__memberLookup, obj.name)) {
                this.__memberLookup[obj.name] = [entry.name];
              } else {
                this.__memberLookup[obj.name].push(entry.name);
              }
              return map;
            });
            this.__groups[entry.name] = {
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
        }, this);
        this.update(update);
        this.__subscribedAddresses = addresses;
        this.setDataReceived(true);
      });
      // Send request
      req.send();

      // create sse session
      this.running = true;
      if (!cv.report.Record.REPLAYING) {
        const things = addresses.filter(addr => addr.split(':').length > 3);
        let topic = 'openhab/items/*/statechanged';
        if (things.length > 0) {
          topic = 'openhab/*/*/*changed';
          // request current states
          const thingsReq = this.createAuthorizedRequest('things?summary=true');
          thingsReq.addListener('success', e => {
            const res = e.getTarget().getResponse();
            const update = {};
            res.forEach(entry => {
              if (things.includes(entry.UID)) {
                update[entry.UID] = entry.statusInfo.status;
              }
            });
            this.update(update);
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

    addSubscription(address) {
      if (!this.__subscribedAddresses) {
        this.__subscribedAddresses = [address];
      } else if (!this.__subscribedAddresses.includes(address)) {
        this.__subscribedAddresses.push(address);
      }
    },

    terminate() {
      this.debug('terminating connection');
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
        this.setConnected(false);
      }
    },

    handleMessage(payload) {
      if (payload.type === 'message') {
        this.record('read', { type: payload.type, name: this.getName(), data: payload.data });
        const data = JSON.parse(payload.data);
        if (data.type === 'ItemStateChangedEvent' || data.type === 'GroupItemStateChangedEvent') {
          //extract item name from topic
          const update = {};
          const item = data.topic.split('/')[2];
          const change = JSON.parse(data.payload);
          update[item] = change.value;
          // check if this Item is part of any group
          if (Object.prototype.hasOwnProperty.call(this.__memberLookup, item)) {
            const groupNames = this.__memberLookup[item];
            groupNames.forEach(groupName => {
              const group = this.__groups[groupName];
              let active = 0;
              group.members[item].state = change.value;
              Object.keys(group.members).forEach(memberName => {
                const member = group.members[memberName];
                if (this.__isActive(member.type, member.state)) {
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
          const update = {};
          const item = data.topic.split('/')[2];
          let change = JSON.parse(data.payload);
          if (Array.isArray(change)) {
            // [newState, oldState]
            change = change[0];
          }
          update[item] = change.status;
          this.update(update);
        }
      }
    },

    write(address, value) {
      const req = this.createAuthorizedRequest('items/' + address, 'POST');
      req.setRequestHeader('Content-Type', 'text/plain');
      req.setRequestData('' + value);
      req.send();
    },

    handleError(error) {
      this.error(error);
    },

    login(loginOnly, credentials, callback, context) {
      if (credentials && credentials.username) {
        // just saving the credentials for later use as we are using basic authentication
        this.__token = 'Basic ' + btoa(credentials.username + ':' + (credentials.password || ''));
      }
      this.setDataReceived(false);
      // no login needed we just do a request to the if the backend is reachable
      const req = this.createAuthorizedRequest();
      req.addListener('success', e => {
        const req = e.getTarget();
        this.setServer(req.getResponseHeader('Server'));
        if (callback) {
          callback.call(context);
        }
      });
      // Send request
      req.send();
    },

    getLastError() {
      return this.__lastError;
    },
    restart(fullRestart) {
      if (fullRestart) {
        // re-read all states
        if (this.__subscribedAddresses) {
          this.subscribe(this.__subscribedAddresses);
        } else {
          this.debug('no subscribed addresses, skip reading all states.');
        }
      }
    },

    update(json) {},
    record(type, data) {},
    showError(type, message, args) {},

    getProviderData: function (name, format) {
      return null;
    },

    hasProvider(name) {
      return ['addresses', 'rrd'].includes(name);
    },
    getProviderUrl(name) {
      switch (name) {
        case 'addresses':
          return this._backendUrl + 'items?fields=name,type,label';
        case 'rrd':
          return this._backendUrl + 'persistence/items';
        default:
          return null;
      }
    },
    getProviderConvertFunction(name, format) {
      switch (name) {
        case 'addresses':
          return function (result) {
            let data;
            if (format === 'monaco') {
              return result.map(entry => ({
                label: entry.name,
                insertText: entry.name,
                detail: entry.type,
                kind: window.monaco.languages.CompletionItemKind.Value
              }));
            }
            data = {};
            result.forEach(element => {
              const type = element.type ? element.type.split(':')[0] : '';
              if (!Object.prototype.hasOwnProperty.call(data, type)) {
                data[type] = [];
              }
              const entry = {
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
              return result.map(element => ({
                insertText: element,
                label: element,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              }));
            }
            return result.map(element => ({
              value: element,
              label: element
            }));
          };
        default:
          return null;
      }
    }
  }
});
