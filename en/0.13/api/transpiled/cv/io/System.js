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
      "qx.event.message.Bus": {
        "construct": true
      },
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "cv.Application": {},
      "cv.io.rest.Client": {},
      "qx.io.request.Xhr": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* System.js 
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
   * A backend client to handle internal system states.
   * With this backend you get access to e.g. backend connection states, currently shown page in the UI and can
   * trigger some things like:
   * - Restart a backend connection
   * - navigate to another page
   * - reload the browser
   * - trigger HTTP requests
   */
  qx.Class.define('cv.io.System', {
    extend: qx.core.Object,
    implement: cv.io.IClient,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.addresses = [];
      qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
    },

    /*
    ***********************************************
     PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: true,
        event: 'changeConnected'
      },

      /**
       * The server the client is currently speaking to
       */
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
      backendName: 'system',
      addresses: null,
      _onPageChange: function _onPageChange(ev) {
        var page = ev.getData();
        var data = {};
        data['nav:current-page'] = page.getAttribute('id');
        cv.data.Model.getInstance().updateFrom('system', data);
      },
      getType: function getType() {
        return this.backendName;
      },
      receive: function receive(json) {},
      login: function login(loginOnly, credentials, callback, context) {
        if (callback) {
          callback.call(context);
        }
      },
      subscribe: function subscribe(addresses, filters) {
        this.addresses = addresses ? addresses : [];
      },
      write: function write(address, value, options) {
        if (address) {
          var parts = address.split(':');
          var target = parts.shift();

          if (target === 'backend') {
            var name = parts.shift();
            var backend = name === 'system' ? this : cv.io.BackendConnections.getClient(name);

            if (backend) {
              switch (value) {
                case 'restart':
                  backend.restart(true);
                  break;

                default:
                  this.warn('unhandled backend action:', value);
              }
            }
          } else if (target === 'browser') {
            var url;

            switch (value) {
              case 'reload':
                window.location.reload();
                break;

              case 'forced-reload':
                url = new URL(window.location.href);
                url.searchParams.set('forceReload', 'true');
                window.location.replace(url.toString());
                break;

              default:
                this.warn('unhandled browser action:', value);
            }
          } else if (target === 'nav') {
            var action = parts.shift();

            switch (action) {
              case 'current-page':
                cv.Application.structureController.scrollToPage(value);
                break;
            }
          } else if (target === 'theme') {
            var theme = value;
            document.documentElement.setAttribute('data-theme', theme);
            var model = cv.data.Model.getInstance();
            model.onUpdate('theme', theme, 'system');
          } else if (target === 'http' || target === 'https') {
            // send HTTP request, ignore the answer
            if (parts.length >= 2 && parts[0] === 'proxy') {
              var _url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);

              _url.searchParams.set('url', target + ':' + parts[1]);

              address = _url.toString();
            }

            var xhr = new qx.io.request.Xhr(address);
            xhr.send();
          } else if (target === 'state') {
            // just write the value to the states to update Listeners
            cv.data.Model.getInstance().onUpdate(address, value, 'system');
          }
        }
      },
      restart: function restart() {},
      stop: function stop() {},
      getResourcePath: function getResourcePath(name, params) {
        if (name === 'charts') {
          return null;
        }

        return name;
      },
      getLastError: function getLastError() {
        return null;
      },
      getBackend: function getBackend() {
        return new Map();
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
  cv.io.System.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=System.js.map?dt=1664549004440