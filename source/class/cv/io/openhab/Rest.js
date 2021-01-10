/* Rest.js
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
    this._backendUrl = backendUrl || "/rest";
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    user: {
      check: "String",
      nullable: false
    },
    connected: {
      check: "Boolean",
      init: false,
      event: "changeConnected"
    },

    server: {
      check: "String",
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

    // not used / needed in this client
    setInitialAddresses: function(addresses) {
    },

    /**
     * Auth basic authentication header to request
     * @param req {qx.io.request.Xhr}
     * @private
     */
    authorize: function (req) {
      if (this.__token) {
        req.setRequestHeader("Authorization", this.__token);
      }
    },

    createAuthorizedRequest: function (url, method) {
      const req = new qx.io.request.Xhr(this._backendUrl + (url || ""), method);
      this.authorize(req);
      return req;
    },

    subscribe : function (addresses, filters) {
      // send first request to get all states once
      const req = this.createAuthorizedRequest("items?fields=name,state");
      req.addListener("success", function(e) {
        const req = e.getTarget();

        const res = req.getResponse();
        const update = res.reduce(function(map, obj) {
          map[obj.name] = obj.state;
          return map;
        }, {});
        this.update(update);
      }, this);
      // Send request
      req.send();

      // create sse session
      this.running = true;
      this.eventSource = new EventSource(this._backendUrl + "events?topics=openhab/items/*/statechanged");

      // add default listeners
      this.eventSource.addEventListener('message', this.handleMessage.bind(this), false);
      this.eventSource.addEventListener('error', this.handleError.bind(this), false);
      // add additional listeners
      //Object.getOwnPropertyNames(this.__additionalTopics).forEach(this.__addRecordedEventListener, this);
      this.eventSource.onerror = function () {
        this.error("connection lost");
        this.setConnected(false);
      }.bind(this);
      this.eventSource.onopen = function () {
        this.debug("connection established");
        this.setConnected(true);
      }.bind(this);
    },

    handleMessage: function(payload) {
      if (payload.type === "message") {
        const data = JSON.parse(payload.data);
        if (data.type === "ItemStateChangedEvent") {
          //extract item name from topic
          const update = {}
          const item = data.topic.split("/")[2];
          const change = JSON.parse(data.payload);
          update[item] = change.value;
          this.update(update);
        }
      }
    },

    write: function (address, value) {
      const req = this.createAuthorizedRequest("items/" + address, "POST");
      req.setRequestHeader("Content-Type", "text/plain");
      req.setRequestData(value);
      req.send();
    },

    handleError: function (error) {
      this.error(error);
    },

    login : function (loginOnly, credentials, callback, context) {
      if (credentials && credentials.username) {
        // just saving the credentials for later use as we are using basic authentication
        this.__token = "Basic " + btoa(credentials.username + ":" + (credentials.password || ""));
      }
      // no login needed we just do a request to the if the backend is reachable
      const req = this.createAuthorizedRequest();
      req.addListener("success", function(e) {
        const req = e.getTarget();
        this.setServer(req.getResponseHeader("Server"));
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
      console.log("Not implemented");
    },

    update: function(json) {}, // jshint ignore:line
    record: function(type, data) {},
    showError: function(type, message, args) {}
  }
});
