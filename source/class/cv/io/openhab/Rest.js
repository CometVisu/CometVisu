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
  construct: function (backendName, backendUrl) {
    this.base(arguments);
    this.initialAddresses = [];
    this._backendName = backendName;
    this._backendUrl = backendUrl || '/rest';
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
    _backendName: null,
    _backendUrl: null,
    __token: null,
    __groups: null,
    __memberLookup: null,

    getBackend: function () {
      return {};
    },

    // not used / needed in this client
    setInitialAddresses: function(addresses) {
    },

    getResourcePath : function (name, map) {
      if (name === 'charts' && map && map.src) {
        let url = this._backendUrl + 'persistence/items/' + map.src;
        const params = [];
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
              case 'month':
                interval = 30 * 24 * 60 * 60000;
                break;
              case 'year':
                interval = 365 * 24 * 60 * 60000;
                break;
            }
            startTime.setTime(endTime.getTime() - (amount * interval));
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

    __convertTimes: function (time) {
      if (time === 'now') {
        return new Date();
      } else if (/^[\d]+$/.test(time)) {
        let d = new Date();
        d.setTime(parseInt(time) * 1000);
        return d;
      }
      return null;
    },

    hasCustomChartsDataProcessor : function () {
      return true;
    },

    processChartsData : function (response) {
      const data = response.data;
      const newRrd = new Array(data.length);
      for (let j = 0, l = data.length; j < l; j++) {
        newRrd[j] = [data[j].time, parseFloat(data[j].state)];
      }
      return newRrd;
    },

    /**
     * Auth basic authentication header to request
     * @param req {qx.io.request.Xhr}
     * @private
     */
    authorize: function (req) {
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
    createAuthorizedRequest: function (url, method) {
      const req = new qx.io.request.Xhr(this._backendUrl + (url || ''), method);
      this.authorize(req);
      return req;
    },

    __isActive: function (type, state) {
      switch (type) {
        case 'Decimal':
        case 'Percent':
        case 'Number':
        case 'Dimmer':
          return parseInt(state) > 0;

        case 'Color':
          return state !== '0,0,0';

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

    subscribe : function (addresses, filters) {
      // send first request to get all states once
      const req = this.createAuthorizedRequest('items?fields=name,state,members,type&recursive=true');
      req.addListener('success', function(e) {
        const req = e.getTarget();

        const res = req.getResponse();
        const update = {};
        res.forEach(function(entry) {
          if (entry.members && Array.isArray(entry.members)) {
            // this is a group
            let active = 0;
            const map = {};
            entry.members.forEach(obj => {
              map[obj.name] = {type: obj.type, state: obj.state};
              if (this.__isActive(obj.type, obj.state)) {
                active++;
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
          }
          update[entry.name] = entry.state;
        }, this);
        this.update(update);
      }, this);
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
    },

    terminate: function () {
      this.debug('terminating connection');
      if (this.eventSource) {
        this.eventSource.close();
      }
    },

    handleMessage: function(payload) {
      if (payload.type === 'message') {
        this.record('read', {type: payload.type, data: payload.data});
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
                }
              });
              group.active = active;
              update['number:' + groupName] = active;
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

    write: function (address, value) {
      const req = this.createAuthorizedRequest('items/' + address, 'POST');
      req.setRequestHeader('Content-Type', 'text/plain');
      req.setRequestData('' + value);
      req.send();
    },

    handleError: function (error) {
      this.error(error);
    },

    login : function (loginOnly, credentials, callback, context) {
      if (credentials && credentials.username) {
        // just saving the credentials for later use as we are using basic authentication
        this.__token = 'Basic ' + btoa(credentials.username + ':' + (credentials.password || ''));
      }
      // no login needed we just do a request to the if the backend is reachable
      const req = this.createAuthorizedRequest();
      req.addListener('success', function(e) {
        const req = e.getTarget();
        this.setServer(req.getResponseHeader('Server'));
        if (callback) {
          callback.call(context);
        }
      }, this);
      // Send request
      req.send();
    },

    getLastError: function() {
      return this.__lastError;
    },
    restart: function(full) {
      this.error('Not implemented');
    },

    update: function(json) {}, // jshint ignore:line
    record: function(type, data) {},
    showError: function(type, message, args) {},

    hasProvider: function (name) {
      return ['addresses', 'rrd'].includes(name);
    },
    getProviderUrl: function (name) {
      switch (name) {
        case 'addresses':
          return this._backendUrl + 'items?fields=name,type,label';
        case 'rrd':
          return this._backendUrl + 'persistence/items';
        default:
          return null;
      }
    },
    getProviderConvertFunction : function (name, format) {
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
              return result.map(element => ({insertText: element, label: element, kind: window.monaco.languages.CompletionItemKind.EnumMember}));
            } 
              return result.map(element => ({value: element, label: element}));
          };
        default:
          return null;
      }
    }
  }
});
